// admin.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController.js");
const multer = require("multer");
const path = require("node:path");

const uploadImg = multer({ dest: path.join(__dirname, "../temp_imgs") });
const uploadVideo = multer({ dest: path.join(__dirname, "../temp_videos") });

/**
 * 用户相关
 */
// 查询全部用户接口
router.get("/user", AdminController.searchUser);

// 条件查询用户接口
router.get("/user/:condition", AdminController.searchUser);

// 删除某个用户接口
router.delete("/user/:id", AdminController.deleteUser);

// 修改某个用户接口
router.put("/user/:id", AdminController.updateUser);

/**
 * 订单相关
 */
// 查询全部订单
router.get("/order", AdminController.searchOrder);

// 条件查询订单
router.get("/order/:condition", AdminController.searchOrder);

/**
 * 课程相关
 */
// 查询全部课程
router.get("/product", AdminController.searchProduct);

// 条件查询课程
router.get("/product/:condition", AdminController.searchProduct);

// 修改课程接口
router.put("/product/:id", AdminController.updateProduct);

// 删除课程接口
router.delete("/product/:id", AdminController.deleteProduct);

// 创建课程接口
router.post("/product", uploadImg.single("cover_img"), AdminController.addProduct);

/**
 * 视频相关
 */
// 获取视频字节数接口
router.post("/upload/check", AdminController.uploadCheck);

// 分片上传接口 上传到本地服务器
router.post("/upload/chunk", uploadVideo.single("chunk"), AdminController.uploadChunk);

// 视频上传接口
router.post("/upload/hwcloud", AdminController.uploadHWCloud);

module.exports = router;
