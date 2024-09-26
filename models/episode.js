const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Episode', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(524),
      allowNull: true
    },
    ordered: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hwyun_id: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    aliyun_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    free: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'episode',
    timestamps: false
  });
};
