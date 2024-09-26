const BackCode = require("../utils/BackCode");
const CodeEnum = require("../utils/CodeEnum");
const DB = require("../config/sequelize");
const DBTool = require("../utils/DBTool");

const BannerService = {
  // 用户相关
  searchUser: async ({ condition, page, size }) => {
    const whereOptions = DBTool.generateWhereOptions({
      condition,
      searchFields: ["username", "phone"],
    });
    let result = await DBTool.paginate(DB.Account, { where: whereOptions, page, size });
    // 判空
    if (result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  deleteUser: async (id) => {
    let data = await DB.Account.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    await data.update({ del: 1 });
    return BackCode.buildSuccess();
  },
  updateUser: async (id, updated_details) => {
    let data = await DB.Account.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    await data.update(updated_details);
    return BackCode.buildSuccess();
  },
  // 订单相关
  searchOrder: async ({ condition, page, size, gmt_start, gmt_end }) => {
    const whereOptions = DBTool.generateWhereOptions({
      condition,
      gmt_start,
      gmt_end,
      searchFields: ["product_title", "username"],
    });

    let result = await DBTool.paginate(DB.ProductOrder, { where: whereOptions, page, size });
    if (!result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.ORDER_UNDEFINED);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  // 课程相关
  searchProduct: async ({ condition, page, size }) => {
    const whereOptions = DBTool.generateWhereOptions({ condition, searchFields: ["title"] });

    let result = await DBTool.paginate(DB.Product, { where: whereOptions, page, size });
    if (!result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  updateProduct: async (id, updated_details) => {
    let data = await DB.Product.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    await data.update(updated_details);
    return BackCode.buildSuccess();
  },
  deleteProduct: async (id) => {
    let data = await DB.Product.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    await data.update({ del: 1 });
    return BackCode.buildSuccess();
  },
};

module.exports = BannerService;
