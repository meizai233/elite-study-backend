const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_order', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    user_head_img: {
      type: DataTypes.STRING(524),
      allowNull: true
    },
    out_trade_no: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    transaction_no: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    order_state: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: true
    },
    pay_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    pay_type: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    product_type: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    product_title: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    product_img: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    is_comment: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount_type: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    del: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notify_time: {
      type: DataTypes.DATE,
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
    tableName: 'product_order',
    timestamps: false
  });
};
