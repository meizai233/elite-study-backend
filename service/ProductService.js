const DB = require("../config/sequelize");
const BackCode = require("../utils/BackCode");
const { Op, QueryTypes } = require("sequelize");
const SecretTool = require("../utils/SecretTool");
const CodeEnum = require("../utils/CodeEnum");
const { getUserInfo } = require("../utils/LoginTool");

const ProductService = {
  // 查询课程分类
  // 一级分类，二级分类，把二级分类添加到对应的一级分类下
  category: async () => {
    // // 无关联查询实现方案
    // 查询pid为0
    // debugger;
    // let parentList = await DB.Category.findAll({ where: { pid: 0 }, order: [["id"]], raw: true });
    // // 查询父分类不为pid的
    // let childList = await DB.Category.findAll({ where: { pid: { [Op.ne]: 0 } }, order: [["id"]], raw: true });
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
    let categoryList = await DB.Category.findAll({
      where: { pid: 0 },
      order: [["id"]],
      include: [{ model: DB.Category, as: "subCategoryList" }],
    });

    return BackCode.buildSuccessAndData({ data: categoryList });
  },
  card: async () => {
    let cardList = await DB.ProductCard.findAll({ raw: true });
    // 遍历热门课程，查找课程总表里的详细信息
    // 由于查找是异步 返回promise数组
    let list = cardList.map(async (item) => {
      // 查找product_card热门课程里的product
      item.product_list = await DB.Product.findAll({ where: { id: item.product_list.split(",") }, raw: true });
      return item;
    });
    // 并发查找
    let lastList = await Promise.all(list);
    return BackCode.buildSuccessAndData({ data: lastList });
  },
  query_by_cid: async (req) => {
    let { cpid, cid, page, size } = req.body;
    if (!(page && size)) return BackCode.buildError({ msg: "缺少必要的参数" });

    // 当前从第几个算起
    page = (page - 1) * size;

    // 判断分类和方向是否为空
    let sqlId = cid || cpid || null;

    // 原始的关联查询课程列表
    let productListSql = `SELECT p.* FROM product p LEFT JOIN category_product c ON c.product_id=p.id ${sqlId ? "WHERE c.category_id=?" : ""} group by p.id ORDER BY p.gmt_create DESC LIMIT ?,?`;

    // 传递几个参数进sql判断
    let productListQuery = sqlId ? [sqlId, page, size] : [page, size];

    // sequelize原始查询
    let productList = await DB.sequelize.query(productListSql, {
      replacements: productListQuery,
      type: QueryTypes.SELECT,
    });

    // 通过子查询课程总数
    // groupby 合并分组
    let totalSql = `select count(*) as total_record from (SELECT p.id FROM product p LEFT JOIN category_product c ON c.product_id=p.id ${
      sqlId ? "WHERE c.category_id=?" : ""
    } group by p.id) temp_table`;

    // sequelize原始查询总数
    let totalRes = await DB.sequelize.query(totalSql, {
      replacements: [sqlId],
      type: QueryTypes.SELECT,
    });

    // 总数
    let total_record = totalRes[0].total_record;

    // 计算总页数
    let total_page = null;
    total_record / size == 0 ? (total_page = total_record / size) : (total_page = Math.ceil(total_record / size));

    return BackCode.buildSuccessAndData({ data: { current_data: productList, total_page, total_record } });
  },
  detail: async (req) => {
    let { id } = req.query;
    if (!id) return BackCode.buildError({ msg: "缺少必要参数" });
    // 查询product以及
    let productDetail = await DB.Product.findOne({
      where: { id },
      include: [{ model: DB.Teacher, as: "teacherDetail" }],
    });
    return BackCode.buildSuccessAndData({ data: { ...productDetail.toJSON(), bd_zip_url: "", note_url: "" } });
  },
  material_by_id: async (req) => {
    let { id } = req.query;
    let userInfo = getUserInfo(req);
    // 判断是否购买
    let orderList = await DB.ProductOrder.findAll({
      where: { product_id: id, account_id: userInfo.id, order_state: "PAY" },
      raw: true,
    });
    if (orderList.length > 0) {
      let productDetail = await DB.Product.findOne({
        attributes: ["bd_zip_url", "node_url"],
        where: { id },
      });
      return BackCode.buildSuccessAndData({ data: productDetail });
    } else {
      return BackCode.buildSuccessAndData({ data: productDetail });
      // return BackCode.buildError(CodeEnum.PRODUCT_NO_PAY);
    }
  },
  chapter: async (req) => {
    let { id } = req.query;
    if (!id) return BackCode.buildError({ msg: "缺少必要参数" });
    let chapterList = await DB.Chapter.findAll({ where: { product_id: id }, order: [["ordered"]], raw: true });
    let episodeList = await DB.Episode.findAll({ where: { product_id: id }, order: [["ordered"]], raw: true });
    // 将课程的集生层对象数组插入到章数据元素中
    chapterList.map((item) => {
      item["episodeList"] = [];
      episodeList.map((subItem) => {
        if (subItem.chapter_id === item.id) {
          return item["episodeList"].push(subItem);
        }
      });
    });
    return BackCode.buildSuccessAndData({ data: chapterList });
  },
};
module.exports = ProductService;
