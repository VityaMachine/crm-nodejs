const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const VideoModel = sequelize.define(
  "video",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    productName: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    productDescription: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    productLink: {
      type: Sequelize.STRING(500),
      allowNull: false,
      defaultValue: 0,
    },
    productImageUrl: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    keywords: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    postedUser: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    updatedUser: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "VIDEO_PRODUCTS",
  }
);

module.exports = VideoModel;
