const express = require("express");
const router = express.Router();
const githubLoginController = require("../controller/GithubLoginController.js");

// github第三方登录
router.get("/redirect", githubLoginController.github_insert);

module.exports = router;
