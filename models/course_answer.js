const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CourseAnswer', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    head_img: {
      type: DataTypes.STRING(526),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    uv: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    up: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    episode_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    del: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_answer',
    timestamps: false
  });
};
