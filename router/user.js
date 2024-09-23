const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController.js");

// 注册接口
router.post("/register", UserController.register);

// 设置密码接口
router.post("/forget", UserController.forget);

// 账号密码登录接口
router.post("/login", UserController.login);

// 用户信息接口
router.get("/detail", UserController.detail);

// 待办 什么时候调用的学习时长？？
// 上报学习时长
router.post("/duration_record", UserController.duration_record);
// 用户播放记录
router.post("/play_record", UserController.play_record);

module.exports = router;
