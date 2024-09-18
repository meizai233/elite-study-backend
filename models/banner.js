const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Banner', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img_url: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    pc_link: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    h5_link: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    expired: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    del: {
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
    tableName: 'banner',
    timestamps: false
  });
};
