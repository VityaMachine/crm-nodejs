const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const UserValidators = require("../validators/user.validators");

router.post("/sign-up", UserValidators.newUser, AuthController.signUp);

router.post("/sign-in", AuthController.signIn);

router.patch("/logout", AuthController.authorize, AuthController.logout);

module.exports = router;
