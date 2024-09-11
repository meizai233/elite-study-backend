/**
 * @param {*} searchUser 获取全部用户
 */
const AdminService = require("../service/AdminService");

const BarrageController = {
  async searchUser(req, res) {
    let { condition } = req.params;
    let { page, size } = req.query;
    let handleRes = await AdminService.searchUser({ condition, page, size });
    res.send(handleRes);
  },
};

module.exports = BarrageController;
