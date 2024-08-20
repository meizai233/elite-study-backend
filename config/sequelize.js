const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");

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
module.exports = { ...models, sequelize };
