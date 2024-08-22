/**
 * @param
 */
const axios = require("axios");
const GithubLoginService = require("../service/GithubLoginService.js");

const GithubLoginController = {
  github_insert: async (req, res) => {
    debugger;
    // 从oauth服务器拿到授权码
    const { code } = req.query;
    const clientID = "Ov23liWh8vNNqJCysokZ";
    const clientSecret = "43251ba696a0ebad6ded78b8e5b738f246d37c6a";

    const tokenResponse = await axios({
      method: "post",
      url: "https://github.com/login/oauth/access_token?" + `client_id=${clientID}&` + `client_secret=${clientSecret}&` + `code=${code}`,
      headers: {
        accept: "application/json",
      },
    });
    debugger;

    // 拿到token 存储到数据库
    const accessToken = tokenResponse.data.access_token;
    GithubLoginService.github_insert(accessToken);
    GithubLoginService.get_user_info(accessToken);
    // 请求用户信息
    const userInfo = console.log("accessToken", accessToken);

    // 进行1个重定向的操作
    // 这个重定向 应该定向到前端？？
    res.redirect(`/?userName=${userInfo.login}`);
    // 后面可以优化 自动设置refresh时间 刷新等
  },
};

module.exports = GithubLoginController;
