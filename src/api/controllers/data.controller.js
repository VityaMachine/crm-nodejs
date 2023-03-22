const UserModel = require("../models/user.model");

const RestaurantModel = require("../models/restaurant.model");
const StoreModel = require("../models/store.model");
const VideoModel = require("../models/video.model");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { v4: uuidv4 } = require("uuid");

class DataController {
  async addNewProduct(req, res, next) {
    try {
      const user = req.user;

      if (
        user.user_role !== "administrator" &&
        user.user_role !== "moderator"
      ) {
        throw new Error("Have no permissions for this action");
      }

      const originUrl = req.originalUrl;
      const newProduct = {
        ...req.body,
        uuid: uuidv4(),
        postedUser: user.username,
      };

      let result;

      if (originUrl.includes("restaurant")) {
        result = await RestaurantModel.create(newProduct);
      }

      if (originUrl.includes("store")) {
        result = await StoreModel.create(newProduct);
      }

      if (originUrl.includes("video")) {
        result = await VideoModel.create(newProduct);
      }

      if (!result) {
        return res.status(404).send("Wrond request. Data not found");
      }

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const originUrl = req.originalUrl;

      let result;

      if (originUrl.includes("restaurant")) {
        result = await RestaurantModel.findAll({});
      }

      if (originUrl.includes("store")) {
        result = await StoreModel.findAll({});
      }

      if (originUrl.includes("video")) {
        result = await VideoModel.findAll({});
      }

      if (!result) {
        return res.status(404).send("Wrond request. Data not found");
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const productId = req.params.productId;

      const originUrl = req.originalUrl;

      let result;

      if (originUrl.includes("restaurant")) {
        result = await RestaurantModel.findOne({
          where: { uuid: productId },
        });
      }

      if (originUrl.includes("store")) {
        result = await StoreModel.findOne({
          where: { uuid: productId },
        });
      }

      if (originUrl.includes("video")) {
        result = await VideoModel.findOne({
          where: { uuid: productId },
        });
      }

      if (!result) {
        return res.status(404).send("Wrond request. Data not found");
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductByQuery(req, res, next) {
    try {
      const queryParams = req.query;

      const originUrl = req.originalUrl;

      const dbRequestParams = {
        where: {},
      };

      const reqFields = Object.keys(queryParams);

      const checkedReqFields = reqFields.filter((field) => {
        if (
          field === "productName" ||
          field === "keywords" ||
          field === "ingredients"
        ) {
          return true;
        }
        return false;
      });

      checkedReqFields.forEach((field) => {
        dbRequestParams.where[field] = {
          [Op.like]: `%${queryParams[field]}%`,
        };
      });

      let result;

      if (originUrl.includes("restaurant")) {
        result = await RestaurantModel.findAll(dbRequestParams);
      }

      if (originUrl.includes("store")) {
        result = await StoreModel.findAll(dbRequestParams);
      }

      if (originUrl.includes("video")) {
        result = await VideoModel.findAll(dbRequestParams);
      }

      if (!result) {
        return res.status(404).send("Wrond request. Data not found");
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const user = req.user;
      const productId = req.params.productId;
      const originUrl = req.originalUrl;

      if (
        user.user_role !== "administrator" &&
        user.user_role !== "moderator"
      ) {
        throw new Error("Have no permissions for this action");
      }

      let oldProduct;


      if(originUrl.includes('restaurant')) {
        oldProduct = await RestaurantModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if(originUrl.includes('store')) {
        oldProduct = await StoreModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if(originUrl.includes('video')) {
        oldProduct = await VideoModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if (!oldProduct) {
        throw new Error(`Product with id ${productId} not found`);
      }

      const postedUser = await UserModel.findOne({
        where: {
          username: oldProduct.postedUser,
        },
      });

      if (
        (postedUser.user_role === "administrator") &
        (postedUser.user_role !== user.user_role)
      ) {
        throw new Error("Have no permissions for this action");
      }

      let result;

      const newStopList = req.body.quantity > 0 ? false : true;
      const updData = { ...req.body, stopList: newStopList };

      if (originUrl.includes("restaurant")) {
        await RestaurantModel.update(
          { ...updData, updatedUser: user.username },
          {
            where: {
              uuid: productId,
            },
          }
        );

        result = await RestaurantModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if (originUrl.includes("store")) {
        await StoreModel.update(
          { ...updData, updatedUser: user.username },
          {
            where: {
              uuid: productId,
            },
          }
        );

        result = await StoreModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if (originUrl.includes("video")) {
        await VideoModel.update(
          { ...updData, updatedUser: user.username },
          {
            where: {
              uuid: productId,
            },
          }
        );

        result = await VideoModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if (!result) {
        return res.status(404).send("Wrond request. Data not found");
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const user = req.user;
      const productId = req.params.productId;
      const originUrl = req.originalUrl;

      if (
        user.user_role !== "administrator" &&
        user.user_role !== "moderator"
      ) {
        throw new Error("Have no permissions for this action");
      }

      let oldProduct;


      if(originUrl.includes('restaurant')) {
        oldProduct = await RestaurantModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if(originUrl.includes('store')) {
        oldProduct = await StoreModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if(originUrl.includes('video')) {
        oldProduct = await VideoModel.findOne({
          where: {
            uuid: productId,
          },
        });
      }

      if (!oldProduct) {
        throw new Error(`Product with id ${productId} not found`);
      }

      const postedUser = await UserModel.findOne({
        where: {
          username: oldProduct.postedUser,
        },
      });

      if (
        (postedUser.user_role === "administrator") &
        (postedUser.user_role !== user.user_role)
      ) {
        throw new Error("Have no permissions for this action");
      }

      if (originUrl.includes("restaurant")) {
        await RestaurantModel.destroy({
          where: {
            uuid: productId,
          },
        });
      }

      if (originUrl.includes("store")) {
        await StoreModel.destroy({
          where: {
            uuid: productId,
          },
        });
      }

      if (originUrl.includes("video")) {
        await VideoModel.destroy({
          where: {
            uuid: productId,
          },
        });
      }


      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DataController();
