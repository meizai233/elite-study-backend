const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BulletScreen', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    episode_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    head_img: {
      type: DataTypes.STRING(524),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    style: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    play_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    source_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    target_url: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    del: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bullet_screen',
    timestamps: false
  });
};
