const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const DataController = require("../controllers/data.controller");
const RestaurantValidators = require("../validators/restaurant.validators");

router.post(
  "/",
  AuthController.authorize,
  RestaurantValidators.newProduct,
  DataController.addNewProduct
);

router.get("/", DataController.getAllProducts);

router.get("/q=", DataController.getProductByQuery);

router.get("/:productId", DataController.getProductById);

router.patch(
  "/:productId",
  AuthController.authorize,
  RestaurantValidators.updateProduct,
  DataController.updateProductById
);

router.delete(
  "/:productId",
  AuthController.authorize,
  DataController.deleteProductById
);

module.exports = router;
