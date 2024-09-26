var DataTypes = require("sequelize").DataTypes;
var _Account = require("./account");
var _Banner = require("./banner");
var _BulletScreen = require("./bullet_screen");
var _Category = require("./category");
var _CategoryOrg = require("./category_org");
var _CategoryProduct = require("./category_product");
var _Chapter = require("./chapter");
var _ChapterOrg = require("./chapter_org");
var _Class = require("./class");
var _Club = require("./club");
var _Comment = require("./comment");
var _CourseAnswer = require("./course_answer");
var _CourseNote = require("./course_note");
var _CourseQuestion = require("./course_question");
var _Desk = require("./desk");
var _DurationRecord = require("./duration_record");
var _Episode = require("./episode");
var _EpisodeOrg = require("./episode_org");
var _Favorite = require("./favorite");
var _GhAccount = require("./gh_account");
var _PlayRecord = require("./play_record");
var _Product = require("./product");
var _ProductOrder = require("./product-order");
var _ProductCard = require("./product_card");
var _ProductOrder = require("./product_order");
var _ProductOrg = require("./product_org");
var _Student = require("./student");
var _Teacher = require("./teacher");
var _TempProducts = require("./temp_products");
var _UserLog = require("./user_log");

function initModels(sequelize) {
  var Account = _Account(sequelize, DataTypes);
  var Banner = _Banner(sequelize, DataTypes);
  var BulletScreen = _BulletScreen(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var CategoryOrg = _CategoryOrg(sequelize, DataTypes);
  var CategoryProduct = _CategoryProduct(sequelize, DataTypes);
  var Chapter = _Chapter(sequelize, DataTypes);
  var ChapterOrg = _ChapterOrg(sequelize, DataTypes);
  var Class = _Class(sequelize, DataTypes);
  var Club = _Club(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var CourseAnswer = _CourseAnswer(sequelize, DataTypes);
  var CourseNote = _CourseNote(sequelize, DataTypes);
  var CourseQuestion = _CourseQuestion(sequelize, DataTypes);
  var Desk = _Desk(sequelize, DataTypes);
  var DurationRecord = _DurationRecord(sequelize, DataTypes);
  var Episode = _Episode(sequelize, DataTypes);
  var EpisodeOrg = _EpisodeOrg(sequelize, DataTypes);
  var Favorite = _Favorite(sequelize, DataTypes);
  var GhAccount = _GhAccount(sequelize, DataTypes);
  var PlayRecord = _PlayRecord(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var ProductOrder = _ProductOrder(sequelize, DataTypes);
  var ProductCard = _ProductCard(sequelize, DataTypes);
  var ProductOrder = _ProductOrder(sequelize, DataTypes);
  var ProductOrg = _ProductOrg(sequelize, DataTypes);
  var Student = _Student(sequelize, DataTypes);
  var Teacher = _Teacher(sequelize, DataTypes);
  var TempProducts = _TempProducts(sequelize, DataTypes);
  var UserLog = _UserLog(sequelize, DataTypes);


  return {
    Account,
    Banner,
    BulletScreen,
    Category,
    CategoryOrg,
    CategoryProduct,
    Chapter,
    ChapterOrg,
    Class,
    Club,
    Comment,
    CourseAnswer,
    CourseNote,
    CourseQuestion,
    Desk,
    DurationRecord,
    Episode,
    EpisodeOrg,
    Favorite,
    GhAccount,
    PlayRecord,
    Product,
    ProductOrder,
    ProductCard,
    ProductOrder,
    ProductOrg,
    Student,
    Teacher,
    TempProducts,
    UserLog,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
