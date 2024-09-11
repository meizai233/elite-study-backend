// admin.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController.js");

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

module.exports = router;
