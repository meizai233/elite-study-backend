const core = require("@huaweicloud/huaweicloud-sdk-core");
const {
  ShowAssetDetailRequest,
  VodClient,
  CreateAssetByFileUploadReq,
  CreateAssetByFileUploadRequest,
  ConfirmAssetUploadReq,
  ConfirmAssetUploadRequest,
  ConfirmAssetUploadReqStatusEnum,
} = require("@huaweicloud/huaweicloud-sdk-vod");

class HuaweiCloud {
  static AK = "5B8X4AMLNBYLTZMUR9QN";
  static SK = "AWX1fLNLRH5xELzqww0HUTTVcMpT4qAMLcSIfnT5";
  static PROJECT_ID = "0145a1b477ac40b2b3792712c09f7b0c";
  static REGION = " cn-north-4";
  static ENDPOINT = "https://vod.cn-north-4.myhuaweicloud.com";

  static getVodClient() {
    const credentials = new core.BasicCredentials().withAk(this.AK).withSk(this.SK).withProjectId(this.PROJECT_ID);
    const client = VodClient.newBuilder().withCredential(credentials).withEndpoint(this.ENDPOINT).build();
    return client;
  }
  // 获取视频播放地址

  static async getVideoUrl(assetId) {
    const request = new ShowAssetDetailRequest();
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

  // 上传视频 20M以下
  // 待办 fileBuffer是啥
  static async uploadVideo({ fileBuffer, name, type }) {
    let VodClient = HuaweiCloud.getVodClient();
    // 待办 这俩是啥
    let uploadReq = new CreateAssetByFileUploadReq();
    let uploadRequest = new CreateAssetByFileUploadRequest();

    // 设置视频类型名称和标题
    uploadReq.withVideoType(type.split("/").pop().toUpperCase()).withVideoName(name).withTitle(name);
    // 设置请求体
    uploadRequest.withBody(uploadReq);
    // 创建文件上传任务，获取临时令牌
    let tempObs = await VodClient.createAssetByFileUpload(uploadRequest);
    // 获取资源id
    debugger;
    let assetId = tempObs.asset_id;
    // 获取文件上传地址
    let videoUploadUrl = tempObs.video_upload_url;
    // 上传文件
    // 待办 fileBuffer是啥
    let { status } = await request.put(videoUploadUrl, fileBuffer, {
      headers: { "Content-Type": type },
    });
    // 如果上传文件失败，返回错误信息
    if (status !== 200) {
      console.error("上传视频失败");
      return;
    }

    // 创建文件确认请求
    let confirmReq = new ConfirmAssetUploadReq();
    let confirmRequest = new ConfirmAssetUploadRequest();
    // 设置文件状态和资源ID
    confirmReq.withStatus(ConfirmAssetUploadReqStatusEnum.CREATED).withAssetId(assetId);
    // 设置请求体
    confirmRequest.withBody(confirmReq);
    // 确认文件上传
    await vodClient.confirmAssetUpload(confirmRequest);
    // 返回资源ID
    return assetId;
  }
}
module.exports = HuaweiCloud;
