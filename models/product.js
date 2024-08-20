const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    old_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_type: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    uv: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    buy_num: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    course_level: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    episode_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    player: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tdk: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    ali_zip_url: {
      type: DataTypes.STRING(524),
      allowNull: true
    },
    bd_zip_url: {
      type: DataTypes.STRING(524),
      allowNull: true
    },
    note_url: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    del: {
      type: DataTypes.INTEGER,
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
    total_point: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    content_point: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    easy_point: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    logic_point: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false
  });
};
