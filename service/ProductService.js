const DB = require("../config/sequelize");
const BackCode = require("../utils/BackCode");
const { Op } = require("sequelize");

const ProductService = {
  // 查询课程分类
  // 一级分类，二级分类，把二级分类添加到对应的一级分类下
  category: async () => {
    // // 无关联查询实现方案
    // 查询pid为0
    // debugger;
    // let parentList = await DB.category.findAll({ where: { pid: 0 }, order: [["id"]], raw: true });
    // // 查询父分类不为pid的
    // let childList = await DB.category.findAll({ where: { pid: { [Op.ne]: 0 } }, order: [["id"]], raw: true });
    // debugger;

    // // 手动map一遍
    // parentList.map((item) => {
    //   item["subCategoryList"] = [];
    //   childList.map((subItem) => {
    //     if (subItem.pid === item.id) {
    //       return item.subCategoryList.push(subItem);
    //     }
    //   });
    // });
    // return BackCode.buildSuccessAndData({ data: parentList });

    // 关联查询
    let categoryList = await DB.category.findAll({
      where: { pid: 0 },
      order: [["id"]],
      include: [{ model: DB.category, as: "subCategoryList" }],
    });

    return BackCode.buildSuccessAndData({ data: categoryList });
  },
};
module.exports = ProductService;
