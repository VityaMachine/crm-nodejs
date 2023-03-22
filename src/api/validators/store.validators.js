const Joi = require("joi");

class StoreValidators {
  newProduct(req, res, next) {
    const newProductRules = Joi.object({
      productName: Joi.string().required(),
      productPrice: Joi.number().required(),
      productImageUrl: Joi.string(),
      productDescription: Joi.string(),
      keywords: Joi.string().required(),
      quantity: Joi.number(),
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
      productPrice: Joi.number(),
      productImageUrl: Joi.string(),
      productDescription: Joi.string(),
      keywords: Joi.string(),
      quantity: Joi.number(),
    });

    const validationResult = newProductRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }
    next();
  }
}

module.exports = new StoreValidators();
