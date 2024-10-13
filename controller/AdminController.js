/**
 * @param {*} searchUser 获取用户
 * @param {*} deleteUser 删除某个用户
 * @param {*} updateUser 修改某个用户

 * @param {*} searchOrder 获取订单

 * @param {*} searchProduct 获取课程
 * @param {*} updateProduct 修改课程
 * @param {*} deleteProduct 删除课程
 * @param {*} addProduct 创建课程

 * @param {*} uploadCheck 获取视频字节数
 * @param {*} uploadChunk 分片上传
 */
const AdminService = require("../service/AdminService");

const BarrageController = {
  // 用户相关
  async searchUser(req, res) {
    let { condition } = req.params;
    let { page, size } = req.query;
    let handleRes = await AdminService.searchUser({ condition, page, size });
    res.send(handleRes);
  },
  async deleteUser(req, res) {
    let { id } = req.params;
    let handleRes = await AdminService.deleteUser(id);
    res.send(handleRes);
  },
  async updateUser(req, res) {
    let { id } = req.params;
    let updated_details = req.body;
    let handleRes = await AdminService.updateUser(id, updated_details);
    res.send(handleRes);
  },
  // 订单相关
  async searchOrder(req, res) {
    let { condition } = req.params;
    let { page, size, gmt_start, gmt_end } = req.query;
    let handleRes = await AdminService.searchOrder({ condition, page, size, gmt_start, gmt_end });
    res.send(handleRes);
  },
  // 课程相关
  async searchProduct(req, res) {
    let { condition } = req.params;
    let { page, size } = req.query;
    let handleRes = await AdminService.searchProduct({ condition, page, size });
    res.send(handleRes);
  },
  async updateProduct(req, res) {
    let { id } = req.params;
    let updated_details = req.body;
    let handleRes = await AdminService.updateProduct(id, updated_details);
    res.send(handleRes);
  },
  async deleteProduct(req, res) {
    let { id } = req.params;
    let handleRes = await AdminService.deleteProduct(id);
    res.send(handleRes);
  },
  async addProduct(req, res) {
    let { new_details, chapters } = req.body;
    let handleRes = await AdminService.addProduct({ new_details, chapters, file: req.file });
    res.send(handleRes);
  },
  // 视频相关
  async uploadCheck(req, res) {
    let { hash, type } = req.body;
    let handleRes = await AdminService.uploadCheck({ hash, type });
    res.send(handleRes);
  },
  async uploadChunk(req, res) {
    let { size, hash, title, type } = req.body;
    let handleRes = await AdminService.uploadChunk({ size, hash, title, type, chunk: req.file });
    res.send(handleRes);
  },
  async uploadHWCloud(req, res) {
    let { type, title, episodeId } = req.body;
    let handleRes = await AdminService.uploadHWCloud({ type, title, episodeId });
    res.send(handleRes);
  },
};

module.exports = BarrageController;
