/**
 * @param {*} searchUser 获取用户
 * @param {*} deleteUser 删除某个用户
 * @param {*} updateUser 修改某个用户
 * @param {*} searchOrder 获取订单
 */
const AdminService = require("../service/AdminService");

const BarrageController = {
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

  async searchOrder(req, res) {
    let { condition } = req.params;
    let { page, size, gmt_start, gmt_end } = req.query;
    let handleRes = await AdminService.searchOrder({ condition, page, size, gmt_start, gmt_end });
    res.send(handleRes);
  },
};

module.exports = BarrageController;
