const DB = require("../config/sequelize");

const getUserInfo = async function (req) {
  let token = req.headers.authorization?.split(" ").pop() || null;
  let userInfo;
  if (!token) {
    userInfo = await DB.Account.findOne({ where: { id: 0 } });
  } else {
    userInfo = SecretTool.jwtVerify(token);
  }
  return userInfo;
};

module.exports = {
  getUserInfo,
};
