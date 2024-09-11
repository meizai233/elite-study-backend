const BackCode = require("../utils/BackCode");
const CodeEnum = require("../utils/CodeEnum");
const DB = require("../config/sequelize");
const DBTool = require("../utils/DBTool");

const BannerService = {
  searchUser: async ({ condition, page, size }) => {
    const whereOptions = DBTool.generateWhereOptions({
      condition,
      searchFields: ["username", "phone"],
    });
    console.log(whereOptions);
    let result = await DBTool.paginate(DB.account, { where: whereOptions, page, size });
    // 判空
    if (result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
};

module.exports = BannerService;
