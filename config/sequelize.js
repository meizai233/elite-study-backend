const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const Category = require("../models/category");

const sequelize = new Sequelize("eliteStudy", "root", "xdclass.net168", {
  host: "47.121.207.171",
  dialect: "mysql",
  // connectTimeout: 30000,
  port: 3306,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("数据库链接成功");
  } catch (error) {
    console.log("数据库链接失败：", error);
  }
})();

const models = initModels(sequelize);

// category与自身表的一对多关系模型
models.Category.hasMany(models.Category, { foreignKey: "pid", as: "subCategoryList" });
models.Category.belongsTo(models.Category, { foreignKey: "pid" });

// teacher和product表的一对多关系模型
models.Teacher.hasMany(models.Product, { foreignKey: "teacher_id" });
models.Product.belongsTo(models.Teacher, { foreignKey: "teacher_id", as: "teacherDetail" });

module.exports = { ...models, sequelize };
