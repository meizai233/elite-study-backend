const core = require("@huaweicloud/huaweicloud-sdk-core");
const vod = require("@huaweicloud/huaweicloud-sdk-vod/v1/public-api");

class HuaweiCloud {
  static AK = "5B8X4AMLNBYLTZMUR9QN";
  static SK = "AWX1fLNLRH5xELzqww0HUTTVcMpT4qAMLcSIfnT5";
  static PROJECT_ID = "0145a1b477ac40b2b3792712c09f7b0c";
  static REGION = " cn-north-4";
  static ENDPOINT = "https://vod.cn-north-4.myhuaweicloud.com";

  static getVodClient() {
    const credentials = new core.BasicCredentials().withAk(this.AK).withSk(this.SK).withProjectId(this.PROJECT_ID);
    const client = vod.VodClient.newBuilder().withCredential(credentials).withEndpoint(this.ENDPOINT).build();
    return client;
  }
  // 获取视频播放地址

  static async getVideoUrl(assetId) {
    const request = new vod.ShowAssetDetailRequest();
    request.assetId = assetId;
    let client = HuaweiCloud.getVodClient();
    const detail = await client.showAssetDetail(request);
    let outputs = detail.transcode_info?.output; //transcode转码生成文件信息
    if (!outputs || outputs.length <= 0) return [""];
    let urlList = [];
    for (let output of outputs) {
      let { bit_rate, duration, video_size } = output.meta_data;
      bit_rate > 0 && duration && duration > 0 && video_size > 0 && urlList.push(output.url);
    }
    return urlList;
  }
}
module.exports = HuaweiCloud;
