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
  // jwt解密token
  static jwtVerify(query) {
    if (query === null) return false;
    return jwt.verify(query, jwtSecretKey);
  }
}

module.exports = SecreteTool;
