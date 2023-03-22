const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/user.controller");
const UserValidators = require("../validators/user.validators");

router.patch("/role", AuthController.authorize, UserController.changeUserRole);

router.patch(
  "/password",
  AuthController.authorize,
  UserValidators.updateUserPassword,
  UserController.changeUserPassword
);

router.get('/current', AuthController.authorize, UserController.getCurrentUser)

router.get('/all', AuthController.authorize, UserController.getAllUsers)

router.get('/name/:username', AuthController.authorize, UserController.getUserByName)

router.get('/id/:id', AuthController.authorize, UserController.getUserById)

module.exports = router;
