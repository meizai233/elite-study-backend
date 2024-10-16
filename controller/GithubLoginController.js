/**
 * @param
 */
const axios = require("axios");
const GithubLoginService = require("../service/GithubLoginService.js");

const GithubLoginController = {
  github_insert: async (req, res) => {
    // 从oauth服务器拿到授权码
    const { code } = req.query;
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const tokenResponse = await axios({
      method: "post",
      url: "https://github.com/login/oauth/access_token?" + `client_id=${clientID}&` + `client_secret=${clientSecret}&` + `code=${code}`,
      headers: {
        accept: "application/json",
      },
    });

    // 拿到token 存储到数据库
    const accessToken = tokenResponse.data.access_token;
    GithubLoginService.github_insert(accessToken);

    // 请求用户信息 直接返回 重定向
    const userInfo = await GithubLoginService.get_user_info(accessToken);
    await GithubLoginService.gh_register(userInfo);
    const token = await GithubLoginService.gh_login(userInfo);
    res.set("Authorization", `Bearer ${token}`);

    const redirect_uri = `${process.env.BASE_URL}/?oauth=1&username=${userInfo.login}`;

    res.redirect(redirect_uri);
  },
};

module.exports = GithubLoginController;
