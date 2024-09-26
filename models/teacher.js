const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Teacher', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    head_img: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    wechat_qrcode: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    pay_qrcode: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    point: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(4056),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    online: {
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
    tableName: 'teacher',
    timestamps: false
  });
};
