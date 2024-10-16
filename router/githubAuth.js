var express = require("express");
var passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
const router = express.Router();

var GITHUB_CLIENT_ID = "--insert-github-client-id-here--";
var GITHUB_CLIENT_SECRET = "--insert-github-client-secret-here--";

// 批量换成const
passport.use(
  new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8888/api/github_login/v1/redirect",
  }),
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());

router.get();
