const Joi = require("joi");

class StoreValidators {
  newProduct(req, res, next) {
    const newProductRules = Joi.object({
      productName: Joi.string().required(),
      productLink: Joi.string().required(),
      productImageUrl: Joi.string(),
      productDescription: Joi.string(),
      keywords: Joi.string().required(),
    });

    const validationResult = newProductRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }
    next();
  }

  updateProduct(req, res, next) {
    const newProductRules = Joi.object({
      productName: Joi.string(),
      productLink: Joi.string(),
      productImageUrl: Joi.string(),
      productDescription: Joi.string(),
      keywords: Joi.string(),
    });

    const validationResult = newProductRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }
    next();
  }
}

module.exports = new StoreValidators();
