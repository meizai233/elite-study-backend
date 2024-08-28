const DB = require("../config/sequelize");
const BackCode = require("../utils/BackCode");

const TeacherService = {
  list: async () => {
    const list = await DB.teacher.findAll();
    return BackCode.buildSuccessAndData({ data: list });
  },
};

module.exports = TeacherService;
