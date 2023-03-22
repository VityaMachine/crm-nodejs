const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const RestaurantModel = sequelize.define(
  "Restaurant",
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
    productWeiht: {
      type: Sequelize.FLOAT(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    ingredients: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    productPrice: {
      type: Sequelize.FLOAT(18, 2),
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

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stopList: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: "RESTAURANT_PRODUCTS",
  }
);

module.exports = RestaurantModel;
