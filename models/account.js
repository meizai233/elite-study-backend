const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Account', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "名字"
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "年龄"
    },
    hobby: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "爱好"
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    head_img: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    learn_time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    slogan: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
