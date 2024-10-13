const BackCode = require("../utils/BackCode");
const CodeEnum = require("../utils/CodeEnum");
const DB = require("../config/sequelize");
const DBTool = require("../utils/DBTool");
const path = require("node:path");
const fs = require("node:fs");
const HuaweiCloud = require("../config/huaweiCloud");

const BannerService = {
  // 用户相关
  searchUser: async ({ condition, page, size }) => {
    const whereOptions = DBTool.generateWhereOptions({
      condition,
      searchFields: ["username", "phone"],
    });
    console.log(whereOptions);
    let result = await DBTool.paginate(DB.Account, { where: whereOptions, page, size });
    // 判空
    if (result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  deleteUser: async (id) => {
    let data = await DB.Account.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    await data.update({ del: 1 });
    return BackCode.buildSuccess();
  },
  updateUser: async (id, updated_details) => {
    let data = await DB.Account.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.ACCOUNT_UNREGISTER);
    }
    await data.update(updated_details);
    return BackCode.buildSuccess();
  },
  // 订单相关
  searchOrder: async ({ condition, page, size, gmt_start, gmt_end }) => {
    const whereOptions = DBTool.generateWhereOptions({
      condition,
      gmt_start,
      gmt_end,
      searchFields: ["product_title", "username"],
    });

    let result = await DBTool.paginate(DB.ProductOrder, { where: whereOptions, page, size });
    if (!result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.ORDER_UNDEFINED);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  // 课程相关
  searchProduct: async ({ condition, page, size }) => {
    const whereOptions = DBTool.generateWhereOptions({ condition, searchFields: ["title"] });

    let result = await DBTool.paginate(DB.Product, { where: whereOptions, page, size });
    if (!result.current_data.length === 0) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    return BackCode.buildSuccessAndData({ data: result });
  },
  updateProduct: async (id, updated_details) => {
    let data = await DB.Product.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    await data.update(updated_details);
    return BackCode.buildSuccess();
  },
  deleteProduct: async (id) => {
    let data = await DB.Product.findOne({ where: { id } });
    if (!data) {
      return BackCode.buildError(CodeEnum.COURSE_UNDEFINED);
    }
    await data.update({ del: 1 });
    return BackCode.buildSuccess();
  },
  addProduct: async ({ file, details, chapters }) => {
    // 上传章集、统计集数
    async function createChaptersAndEpisodes(productId, t) {
      let episodeNum = 0;
      debugger;
      for (let i = 0; i < chapters.length; i++) {
        const chapterData = { product_id: productId, ordered: i + 1, ...chapters[i] };
        const chapter = await DB.Chapter.create(chapterData, { transaction: t });

        for (let j = 0; j < chapterData.epsidoes.length; j++) {
          const episodeData = {
            product_id: productId,
            chapter_id: chapter.id,
            ordered: j + 1,
            ...chapterData.epsidoes[j],
          };
          await DB.Episode.create(episodeData, { transaction: t });
          episodeNum++;
        }
      }
      return episodeNum;
    }

    // 1.开始一个事务并将其保存到变量中
    const t = await DB.sequelize.transaction();

    try {
      const cover_img = await AliossTool.uploadImagesToOSS(file);
      // 创建一个产品
      const product = await DB.Product.create(
        {
          ...details,
          cover_img,
          product_type: "COURSE",
          uv: 0,
          del: 0,
          buy_num: 0,
          episode_num: 0,
          player: "HWYUN",
          total_point: 8.8,
          easy_point: 8.8,
          logic_point: 8.8,
          content_point: 8.8,
        },
        { transaction: t }
      );

      const episodeNum = await createChaptersAndEpisodes(product.id, t);
      // 更新该产品的章节
      await product.update({ episode_num: episodeNum }, { transaction: t });
      // 提交事务
      await t.commit();
      return BackCode.buildSuccess();
    } catch (e) {
      await t.rollback();
      return BackCode.buildError({ msg: error });
    }
  },
  // 视频相关
  // 前端检查上传的视频是否已经上传过，如果上传过则返回已经上传的字节数
  uploadCheck: async ({ hash, type }) => {
    debugger;
    let uploadedBytes = 0; // 用于存储已上传字节数的变量
    // 上传的临时文件路径
    const tempFilePath = path.join(__dirname, "../temp_videos", `${hash}.${type.split("/").pop()}`);

    // 如果文件存在，则修改为文件大小
    if (fs.existsSync(tempFilePath)) uploadedBytes = fs.statSync(tempFilePath).size;
    else fs.createWriteStream(tempFilePath); // 不存在则创建个文件，以便后续使用

    // 返回已上传的字节数
    return BackCode.buildSuccessAndData({ data: { uploadedBytes } });
  },
  uploadChunk: async ({ size, hash, title, type, chunk: _chunk }) => {
    // 上传的临时文件路径，我们默认所有的请求都是检查过的，所以这个文件必定存在
    const tempFilePath = path.join(__dirname, "../temp_videos", `${hash}.${type}`);
    // 读取当前上传的chunk(切片)
    const chunk = fs.readFileSync(_chunk.path);

    // 将切片写入到临时文件里面
    // flag a === 追加内容
    fs.writeFileSync(tempFilePath, chunk, { flag: "a" });
    const stats = fs.statSync(tempFilePath);
    const uploadedBytes = stats.size; // 获取最新的已上传的字节数

    // 如果上传的字节数大于等于size，则说明上传完成，将临时文件移动到合并文件夹
    if (uploadedBytes >= size) {
      const mergedFilePath = path.join(__dirname, "../temp_videos/merged", `${title}`);
      fs.renameSync(tempFilePath, mergedFilePath);
      debugger;
      // 因为可能存在文件占用的问题，rename不一定能够删除原有的临时文件，所以我们要设置一个延时删除
      setTimeout(() => {
        fs.existsSync(tempFilePath) && fs.unlinkSync(tempFilePath);
      }, 1000);
    }
    // 删除已合并的chunk
    fs.unlinkSync(_chunk.path);
    return BackCode.buildSuccessAndData({ data: { uploadedBytes } });
  },

  // 将文件上传到华为云
  uploadHWCloud: async ({ title, type, episodeId }) => {
    debugger;
    // 从已经merged的文件夹中拿文件
    const mergedFilePath = path.join(__dirname, "../temp_videos/merged", `${title}.${type.split("/").pop()}`);
    // 如果待上传华为云的文件不存在则返回错误
    if (!fs.existsSync(mergedFilePath)) {
      return BackCode.buildError({ msg: "请先上传文件" });
    }
    // 读取文件内容
    const toUploadFileBuffer = fs.readFileSync(mergedFilePath);
    // 上传到华为云，获取上传后的媒资id
    const assetsId = await HuaweiCloud.uploadVideo({ fileBuffer: toUploadFileBuffer, name: title, type });
    // 如果没有找到要修改的episodeId，则返回错误
    const episode = DB.Episode.findOne({ where: { id: episodeId } });
    if (!episode) {
      return BackCode.buildError({ msg: "找不到episodeId，请重试" });
    }
    // 将华为云的媒资id存入到数据库中
    await DB.Episode.update({ hwyun_id: assetsId }, { where: { id: episodeId } });
    // 删除本地的文件
    fs.unlinkSync(mergedFilePath);
    return BackCode.buildSuccessAndMsg({ msg: "视频上传成功" });
  },
};

module.exports = BannerService;
