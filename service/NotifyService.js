/**
 * @param {*} captcha 图形验证码服务
 * @param {*} sendCode 手机验证码服务
 */

const svgCaptcha = require("svg-captcha");
const redisConfig = require("../config/redisConfig");
const { sendMsgCode } = require("../config/aliyunMessage");
const dayjs = require("dayjs");
const BackCode = require("../utils/BackCode");

const NotifyService = {
  captcha: async (key, type) => {
    let captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 1, // 干扰线
      background: "#aaa", // 背景颜色
    });
    // 缓存到redis里
    // redisConfig.set("captcha", captcha.text, 600);
    redisConfig.set(`${type}:captcha:` + key, captcha.text, 600);

    return captcha.data;
  },

  // 1检查手机验证码是否已经过期
  // 2检查是否触发图形验证码 且图形验证码是否填写一致
  // 3发送手机验证码，一个存在code，一个存在over（表示是否过期）
  // 4 发送完手机验证码之后 图形验证码就已经失效了 需要删除
  sendCode: async (mobile, captcha, type, key, randomCode) => {
    // 60秒内不能重复获取
    // 将 检查手机验证码是否过期 和 存储手机验证码 两个操作放在一起
    // 节约空间 保证原子性
    if (await redisConfig.exists(`${type}:code:` + mobile)) {
      let dateRedis = dayjs(Number((await redisConfig.get(`${type}:code:` + mobile)).split("_")[0]));
      // 若存储时间+60秒小于当前时间 表示过期
      if (dayjs(Date.now()).diff(dateRedis, "second") <= 60) {
        return BackCode.buildResult(CodeEnum.CODE_LIMITED);
      }
    }

    // 是否有图形验证 在redis查找是否存在
    if (!(await redisConfig.exists(`${type}:captcha:` + key))) {
      return BackCode.buildError({ msg: "请发送图形验证码" });
    }
    if (!captcha) {
      return BackCode.buildError({ msg: "缺少captcha参数" });
    }

    // 对比用户的图形验证码和redis储存的是否一致
    let captchaRedis = await redisConfig.get(`${type}:captcha:` + key);
    if (!(captcha.toLowerCase() === captchaRedis.toLowerCase())) {
      return BackCode.buildError({ msg: "图形验证码错误" });
    }

    // 发送手机验证码
    let codeRes = (await sendMsgCode(mobile, randomCode)).data;
    // 把存储时间+验证码一并存入
    let randomCodeTime = `${Date.now()}_${randomCode}`;
    redisConfig.set(`${type}:code:` + mobile, randomCodeTime, 600);

    // 删除图形验证码
    redisConfig.del(`${type}:captcha:` + key);

    if (codeRes.code == "200") {
      return BackCode.buildSuccessAndMsg({ msg: "发送成功" });
    } else {
      return BackCode.buildError({ msg: "发送失败" });
    }
  },
};

module.exports = NotifyService;
