const md5 = require("blueimp-md5");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/jwtSecretKey");

class SecreteTool {
  static md5(query) {
    return md5(query);
  }

  // jwt生成token
  static jwtSign(query, time) {
    return jwt.sign(query, jwtSecretKey, { expiresIn: time });
  }
  // jwt能够还原出加密之前的数据吗？为什么哈希函数不能还原
  // jwt解密token
  static jwtVerify(query) {
    return jwt.verify(query, jwtSecretKey);
  }
}

module.exports = SecreteTool;
