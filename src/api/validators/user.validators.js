const Joi = require("joi");

class UserValidators {
  newUser(req, res, next) {
    const passPattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );



    const newUserRules = Joi.object({
      username: Joi.string().min(5).required(),
      password: Joi.string().min(8).regex(passPattern).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      firstName: Joi.string().required(),
      secondName: Joi.string(),
      birthdate: Joi.string(),
    });

    const validationResult = newUserRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }
    next();
  }

  updateUser(req, res, next) {
    const passPattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );


    const updUserRules = Joi.object({
      password: Joi.string().min(8).regex(passPattern),
      firstName: Joi.string(),
      secondName: Joi.string(),
      birthdate: Joi.string(),
      userRole: Joi.string(),
    });

    const validationResult = updUserRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }

    next();
  }

  updateUserPassword(req, res, next) {
    const passPattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    const updUserRules = Joi.object({
      oldPassword: Joi.string().min(8).regex(passPattern).required(),
      newPassword: Joi.string().min(8).regex(passPattern).required(),
    });

    const validationResult = updUserRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }

    next();
  }
}

module.exports = new UserValidators();
