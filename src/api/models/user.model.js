const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const UserModel = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    secondName: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    birthdate: {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    user_role: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "moderator",
    },
  },
  {
    tableName: "USERS",
  }
);

module.exports = UserModel;
