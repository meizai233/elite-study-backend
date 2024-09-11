require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const { jwtSecretKey } = require("./config/jwtSecretKey");
const DB = require("./config/sequelize");
const BackCode = require("./utils/BackCode");
const CodeEnum = require("./utils/CodeEnum");
const SecretTool = require("./utils/SecretTool");
const { Op } = require("sequelize");
const redisConfig = require("./config/redisConfig");
const ScheduleTool = require("./utils/ScheduleTool");

app.use(cors());
// 解析json数据格式
app.use(bodyParser.json());
// 解析urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: false }));

// 用户认证中间件
// 这个中间件会解析和验证请求头中的 JWT，并将其解码后的用户信息添加到 req.user 对象上
// Authorization: Bearer <your_jwt_token>
// app.use(
//   jwt({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({
//     path: [
//       /^\/api\/notify\/v1/, // 验证码通知接口排除
//       /^\/api\/user\/v1\/register/, // 注册接口排除
// /^\/api\/user\/v1\/login/,  // 验证码通知接口排除
//       /^\/api\/github_login\/v1/, //第三方登录接口排除
//       /^\/api\/user\/v1\/forget/,  // 设置密码接口排除
// /^\/api\/banner\/v1/,  // 验证码通知接口排除
// /^\/api\/product\/v1/,  // 验证码通知接口排除
// /^\/api\/order\/v1\/latest/,  // 课程购买动态接口排除
// /^\/api\/comment\/v1\/page/,  //评论列表
//     ],
//   })
// );
// 视频播放的接口
const getPlayUrlRouter = require("./router/getPlayUrl");
app.use("/api/getPlayUrl/v1", getPlayUrlRouter);

// 搜索相关接口
const searchController = require("./router/search");
app.use("/api/search/v1", searchController);

// 验证码相关接口
const notifyRouter = require("./router/notify.js");
app.use("/api/notify/v1", notifyRouter);

// 用户相关接口
const userRouter = require("./router/user.js");
app.use("/api/user/v1", userRouter);

// github登录相关接口
const githubLoginRouter = require("./router/githubLogin.js");
app.use("/api/github_login/v1", githubLoginRouter);

// banner接口
const bannerRouter = require("./router/banner.js");
app.use("/api/banner/v1", bannerRouter);

// 视频课程接口
const productRouter = require("./router/product.js");
app.use("/api/product/v1", productRouter);

// 讲师相关的接口
const teacherRouter = require("./router/teacher");
app.use("/api/teacher/v1", teacherRouter);

// 错误中间件
app.use((err, req, res, next) => {
  // 未登录的错误
  if (err.name === "UnauthorizedError") {
    return res.send(BackCode.buildResult(CodeEnum.ACCOUNT_UNLOGIN));
  }
  // 其他的错误
  res.send(BackCode.buildError({ msg: err.message }));
});

// 订单相关的接口
const orderRouter = require("./router/order.js");
app.use("/api/order/v1", orderRouter);

// 评论相关的接口
const commentRouter = require("./router/comment");
app.use("/api/comment/v1", commentRouter);

// 管理员权限校验
const checkIsAdmin = (req, res, next) => {
  // 判断有没有登录
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ").pop();
    let userInfo = SecretTool.jwtVerify(token);
    console.log(userInfo);
    // 登录了判断相关权限是否正确
    //
    if (userInfo && userInfo.role === "ADMIN") {
      next();
      return;
    }
    res.send(BackCode.buildError(CodeEnum.ADMIN_NOT_ROLE));
  } else {
    res.send(BackCode.buildError(CodeEnum.ACCOUNT_UNLOGIN));
  }
};

// 后台管理系统相关的接口
const adminRouter = require("./router/admin.js");
app.use("/api/admin/v1", checkIsAdmin, adminRouter);

// 每天凌晨2点更新统计昨天用户观看视频时长
ScheduleTool.dayJob(2, async () => {
  // 1.计算昨日的日期
  let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  // 2.统计昨天有观看视频的用户，并且去重
  let onlyRecord = await DB.DurationRecord.findAll({
    attributes: [[DB.sequelize.fn("DISTINCT", DB.sequelize.col("account_id")), "accountId"]],
    where: { gmt_modified: { [Op.gt]: yesterday } },
    raw: true,
  });
  // 3.根据用户id计算每个用户总观看时长
  let itemRecord = onlyRecord.map(async (item) => {
    item["duration"] = await DB.DurationRecord.sum("duration", { where: { account_id: item.accountId } });
    return item;
  });
  // 4.转成普通数组
  let itemRecordList = await Promise.all(itemRecord);
  // 5.遍历每个用户更新总观看时长
  itemRecordList.map(async (item) => {
    await DB.Account.update({ learn_time: item.duration }, { where: { id: item.accountId } });
  });
});

app.listen(8888, () => {
  console.log("服务启动在：http://127.0.0.1:8888");
});
