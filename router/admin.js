// admin.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController.js");

const multer = require("multer");
const path = require("node:path");
const uploadImg = multer({ dest: path.join(__dirname, "../temp_imgs") });

// 查询全部用户接口
router.get("/user", AdminController.searchUser);

// 条件查询用户接口
router.get("/user/:condition", AdminController.searchUser);

// 删除某个用户接口
router.delete("/user/:id", AdminController.deleteUser);

// 修改某个用户接口
router.put("/user/:id", AdminController.updateUser);

// 查询全部订单
router.get("/order", AdminController.searchOrder);

// 条件查询订单
router.get("/order/:condition", AdminController.searchOrder);

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

module.exports = router;
