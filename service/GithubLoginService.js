const redisConfig = require("../config/redisConfig");
const axios = require("axios");

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
};

module.exports = GithubLoginService;
