const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category_product', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    category_id: {
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
    tableName: 'category_product',
    timestamps: false
  });
};
