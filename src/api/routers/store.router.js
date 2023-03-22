const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const DataController = require("../controllers/data.controller");
const StoreValidators = require("../validators/store.validators");

router.post(
  "/",
  AuthController.authorize,
  StoreValidators.newProduct,
  DataController.addNewProduct
);

router.get("/", DataController.getAllProducts);

router.get("/q=", DataController.getProductByQuery);

router.get("/:productId", DataController.getProductById);

router.patch(
  "/:productId",
  AuthController.authorize,
  StoreValidators.updateProduct,
  DataController.updateProductById
);

router.delete(
  "/:productId",
  AuthController.authorize,
  DataController.deleteProductById
);

module.exports = router;
