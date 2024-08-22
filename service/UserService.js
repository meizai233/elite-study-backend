const DB = require("../config/sequelize");
const redisConfig = require("../config/redisConfig");
const RandomTool = require("../utils/RandomTool");
const SecretTool = require("../utils/SecretTool");

const UserService = {
  register: async (phone, code) => {
    // 手机号注册查重
    let existPhone = await DB.account.findAll({ where: { phone } });
    if (existPhone.length > 0) {
      return { code: -1, msg: "手机号已经注册" };
    }

    // 获取redis中的验证码和用户传入的进行对比
    if (await redisConfig.exists("register:code:" + phone)) {
      let codeRes = (await redisConfig.get("register:code:" + phone)).split("_")[1];
      if (!(code == codeRes)) {
        return { code: -1, msg: "短信验证码不正确" };
      }
    } else {
      return { code: -1, msg: "请先获取短信验证码" };
    }

    // 随机生成头像和昵称
    let avatar = RandomTool.randomAvatar();
    let name = RandomTool.randomName();

    // 生成token 7天过期
    let user = { avatar, name, phone };
    let token = SecretTool.jwtSign(user, "168h");

    // 将用户信息插入数据库
    await DB.account.create({ username: name, head_img: avatar, phone });
    return { code: 0, data: `Bearer ${token}` };
  },

  forget: async (req) => {
    let { phone, password, code } = req.body;
    // 判断code在redis中是否存在
    // 待办 change code 是什么
    let codeExist = await redisConfig.exists("change:code:" + phone);
    if (!codeExist) return BackCode.buildError({ msg: "请先获取手机验证码" });
    // 判断redis中code和用户code是否相等
    let codeRes = (await redisConfig.get("change:code:" + phone)).split("_")[1];
    if (!(code === codeRes)) return BackCode.buildError({ msg: "手机验证码不正确" });

    pwd = SecretTool.md5(password);
    await DB.Account.update({ pwd }, { where: { phone } });
    return BackCode.buildSuccessAndMsg({ msg: "修改成功" });
  },
};

module.exports = UserService;
