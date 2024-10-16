const express = require("express");
const router = express.Router();
const githubLoginService = require("../service/GithubLoginService.js");
var GitHubStrategy = require("passport-github2").Strategy;
var passport = require("passport");
var session = require("express-session");
const SecreteTool = require("../utils/SecretTool.js");
const DB = require("../config/sequelize");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = require("../config/github.js");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// 批量换成const
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // accessToken 暂时不需要存储
      process.nextTick(function () {
        // 将accessToken存放进入数据库 以便请求其他信息使用
        githubLoginService.github_insert(accessToken);
        return done(null, profile);
      });
    }
  )
);
router.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

// github第三方登录
router.get("/auth", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/callback", passport.authenticate("github", { failureRedirect: "/" }), async function (req, res) {
  debugger;
  const userProfile = req.user;
  const token = SecreteTool.jwtSign(userProfile, "168h");
  // 拿到token后 检查是否已经注册
  const { id, username, photos } = userProfile;
  let userInfo = await DB.Account.findAll({ where: { id }, raw: true });
  // 如果未注册
  if (userInfo.length === 0) {
    userInfo = {
      id,
      username,
      head_img: photos[0].value,
    };

    // 将用户信息插入数据库
    await DB.Account.create({ ...userInfo });
  }
  const redirect_uri = `${process.env.BASE_URL}/?token=${token}`;
  res.redirect(redirect_uri); // 重定向时附加 token
});

module.exports = router;
