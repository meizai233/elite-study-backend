const redisConfig = require("../config/redisConfig");
const axios = require("axios");
const DB = require("../config/sequelize");
const RandomTool = require("../utils/RandomTool");
const SecretTool = require("../utils/SecretTool");
const BackCode = require("../utils/BackCode");

const GithubLoginService = {
  github_insert: (accessToken) => {
    redisConfig.set(`github:token:${accessToken}`, "1", 600 * 24);
    return true;
  },
  get_user_info: async (accessToken) => {
    // 带上令牌 a网站向b网站请求数据
    const result = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });

    return result.data;
  },
  gh_register: async (userInfo) => {
    // 新建一个gh table
    let existId = await DB.GhAccount.findAll({ where: { id: userInfo.id }, raw: true });
    if (existId.length) {
      return { code: -1, msg: "已有账号" };
    }

    // 随机生成头像和昵称
    let avatar = RandomTool.randomAvatar();
    let name = userInfo.login;

    // 将用户信息插入数据库
    await DB.GhAccount.create({ username: name, head_img: avatar, id: userInfo.id });
    return { code: 0 };
  },
  gh_login: async (userInfo) => {
    // 拼接token的用户信息，除去密码
    let existUser = await DB.GhAccount.findAll({ where: { id: userInfo.id }, raw: true });

    let user = { ...existUser, pwd: "" };
    //生成token
    let token = SecretTool.jwtSign(user, "168h");
    return BackCode.buildSuccessAndData({ data: `Bearer ${token}` });
  },
  detail: async (req) => {
    // 拿到token jwt验证 数据库中查找
    let token = req.headers.authorization.split(" ").pop();
    let userInfo = SecretTool.jwtVerify(token);
    let userDetail = await DB.GhAccount.findOne({ where: { id: userInfo.id }, raw: true });
    return BackCode.buildSuccessAndData({ data: { ...userDetail, pwd: "" } });
  },
};

module.exports = GithubLoginService;
