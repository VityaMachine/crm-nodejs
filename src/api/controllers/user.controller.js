const UserModel = require("../models/user.model");

const userDataGetter = require("../../utils/userDataGetter");

const bcryptjs = require("bcryptjs");

class UserController {
  async changeUserRole(req, res, next) {
    try {
      const authorizedUser = req.user;

      if (authorizedUser.user_role !== "administrator") {
        throw new Error("Have no permission for this action");
      }

      const usernameToUpdate = req.body.username;

      const userToChange = await UserModel.findOne({
        where: {
          username: usernameToUpdate,
        },
      });

      if (!userToChange) {
        res.status(404).send({ message: `user ${usernameToUpdate} not found` });
      }

      const roles = ["administrator", "moderator", "user"];

      const newRole = req.body.new_role;

      if (!roles.includes(newRole)) {
        res
          .status(500)
          .send({ message: `select one of next roles: ${roles.join(", ")}` });
      }

      if (userToChange.user_role === "administrator") {
        throw new Error("Have no permission for this action");
      }

      await UserModel.update(
        {
          user_role: newRole,
        },
        {
          where: {
            username: usernameToUpdate,
          },
        }
      );

      const updatedUser = await UserModel.findOne({
        where: {
          username: usernameToUpdate,
        },
      });

      res.status(201).send({ message: "Successful role change" });
    } catch (error) {
      next(error);
    }
  }

  async changeUserPassword(req, res, next) {
    try {
      const user = req.user;

      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;

      const isPasswordValid = await bcryptjs.compare(
        oldPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).send({ message: `Wrong old password` });
      }

      const isNewPasswordValid = await bcryptjs.compare(
        newPassword,
        user.password
      );

      if (isNewPasswordValid) {
        return res
          .status(400)
          .send({ message: `New password cant be equal to old password` });
      }

      const newPassHash = await bcryptjs.hash(newPassword, 3);

      await UserModel.update(
        {
          password: newPassHash,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.status(200).send({ message: "Successful password change" });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = req.user;
      res.status(200).send(userDataGetter(user));
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const user = req.user;

      if (user.user_role !== "administrator") {
        throw new Error("Have no permissions for this action");
      }

      const usersArray = await UserModel.findAll({});

      const arrayToSend = usersArray.map((el) => userDataGetter(el));

      res.send(arrayToSend);
    } catch (error) {
      next(error);
    }
  }

  async getUserByName(req, res, next) {
    try {
      const user = req.user;
      const targetUserName = req.params.username;

      if (user.user_role !== "administrator") {
        throw new Error("Have no permissions for this action");
      }

      const targetUser = await UserModel.findOne({
        where: {
          username: targetUserName,
        },
      });

      if (!targetUser) {
        res.status(404).send({ message: `User ${targetUserName} not found` });
      }

      res.status(200).send(userDataGetter(targetUser));
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = req.user;
      const targetUserId = req.params.id;

      if (user.user_role !== "administrator") {
        throw new Error("Have no permissions for this action");
      }

      const targetUser = await UserModel.findByPk(targetUserId);

      if (!targetUser) {
        res
          .status(404)
          .send({ message: `User with id: ${targetUserId} not found` });
      }

      res.status(200).send(userDataGetter(targetUser));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
