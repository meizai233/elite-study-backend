const OSS = require("ali-oss");
const fs = require("fs");
const { resolve } = require("path");
const aliossConfig = require("../config/alioss");

class AliossTool {
  static getClient() {
    return new OSS({ ...aliossConfig });
  }

  static async uploadImagesToOSS(file) {
    debugger;
    const path = "user_file/" + file.originalname.split(".").shift() + "-" + Date.now() + "." + file.mimetype.split("/").pop();
    const localPath = resolve(__dirname, `../tempImg/${file.filename}`);
    // 将图片url推送到阿里云oss
    await AliossTool.putOSS(localPath, path);
    // 删除本地图片
    fs.unlinkSync(localPath);
    return aliossConfig.accessUrl + path;
  }
  // 上传方法

  static async putOSS(img, uploadName) {
    const client = await AliossTool.getClient();
    try {
      await client.put(uploadName, img);
    } catch (err) {
      throw new Error("上传失败", err);
    }
  }
}
module.exports = AliossTool;
