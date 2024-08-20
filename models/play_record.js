const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('play_record', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    current_episode_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    learn_ids: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pay_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'play_record',
    timestamps: false
  });
};
