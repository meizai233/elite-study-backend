const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductCard', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    summay: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    row_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    column_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_list: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    card_type: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'product_card',
    timestamps: false
  });
};
