class GetUserInfoTool {
  // 获取用户ip
  // 待办 这里能拿到ip吗
  static getIp(req) {
    // let ip = req.ip.match(/\d+.\d+.\d+.\d+./).join(".");
    // mock
    let ip = "36.111.36.146";
    return ip;
  }

  // 获取用户设备
  static getUserAgent(req) {
    let useragent = req.headers["user-agent"];
    return useragent;
  }
}
module.exports = GetUserInfoTool;
