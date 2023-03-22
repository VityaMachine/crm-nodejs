const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

require("dotenv").config();

class AuthController {
  async signUp(req, res, next) {
    try {
      const registeredUsers = await UserModel.findAll({});

      const usedUsersArray = registeredUsers.map((user) => user.username);
      const usedEmailArray = registeredUsers.map((user) => user.email);

      const newUser = req.body;

      if (usedUsersArray.includes(newUser.username)) {
        throw new Error(`User ${newUser.username} is already registered`);
      }

      if (usedEmailArray.includes(newUser.email)) {
        throw new Error(`Email ${newUser.email} is already registered`);
      }

      newUser.password = await bcryptjs.hash(newUser.password, 3);

      const result = await UserModel.create(newUser);

      const resSend = {};

      resSend.id = result.dataValues.id;
      resSend.login = result.dataValues.login;
      resSend.email = result.dataValues.email;

      return res.status(201).send(resSend);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;

      const targetUser = await UserModel.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: username }],
        },
      });

      if (!targetUser) {
        return res.status(401).send({ message: `User ${username} not found` });
      }

      if (!password) {
        return res.status(401).send({ message: `Wrong password` });
      }

      const isPasswordValid = await bcryptjs.compare(
        password,
        targetUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).send({ message: `Wrong password` });
      }

      const jwtToken = jwt.sign(
        { userId: targetUser.id },
        process.env.JWT_SECRET
      );

      await UserModel.update(
        {
          token: jwtToken,
        },
        {
          where: {
            id: targetUser.id,
          },
        }
      );

      // const result = await UserModel.findByPk(targetUser.id);

      return res.send({ token: jwtToken });
    } catch (error) {
      next(error);
    }
  }

  async authorize(req, res, next) {
    try {
      const authorizationHeader = req.get("Authorization");

      if (!authorizationHeader) {
        return res.status(403).send({ message: "Unauthorized" });
      }

      const token = authorizationHeader.replace("Bearer ", "");

      const userId = await jwt.verify(token, process.env.JWT_SECRET).userId;

      if (!userId) {
        return res.status(403).send({ message: "Wrong authorization data" });
      }

      const user = await UserModel.findByPk(userId);

      if (!user || !user.token) {
        return res.status(403).send({ message: "Unauthorized" });
      }



      req.user = user.dataValues;
      req.token = token;

      next();
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const user = req.user;

      console.log(user);

      await UserModel.update(
        {
          token: null,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      return res.status(204).send("Logged out");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
