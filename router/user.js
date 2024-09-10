const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController.js");
const multer = require("multer");
const upload = multer({ dest: "tempImg/" });

// 注册接口
router.post("/register", UserController.register);

// 设置密码接口
router.post("/forget", UserController.forget);
// 账号密码登录接口
router.post("/login", UserController.login);
// 用户信息接口
router.get("/detail", UserController.detail);
// 个人头像修改
// 待办 调试参考：https://help.aliyun.com/zh/oss/developer-reference/installation-7?spm=a2c4g.11186623.0.preDoc.674a32ef6YAWVl
// 待办原因：用户上传头像的前端界面未实现，实现后再调试

router.post("/update_img", upload.single("headImg"), UserController.update_img);
// 个人资料修改
router.post("/update", UserController.update);

module.exports = router;
