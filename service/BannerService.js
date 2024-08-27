const DB = require("../config/sequelize");
const BackCode = require("../utils/BackCode");

const BannerService = {
  list: async (location) => {
    const data = await DB.banner.findOne({ where: { location } });
    return BackCode.buildSuccessAndData({ data });
  },
};
module.exports = BannerService;
