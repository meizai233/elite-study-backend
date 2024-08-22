/**
 * @params register 注册接口
 * @params forget 设置密码接口
 * @params login 登录接口
 */

const UserService = require("../service/UserService.js");
const UserController = {
  register: async (req, res) => {
    let { phone, code } = req.body;
    let handleRes = await UserService.register(phone, code);
    res.send(handleRes);
  },
  forget: async (req, res) => {
    let handleRes = await UserService.forget(req);
    res.send(handleRes);
  },
  login: async (req, res) => {
    let handleRes = await UserService.login(req);
    // 待办 这里返回了token 前端如何拿到
    res.send(handleRes);
  },
};

module.exports = UserController;
