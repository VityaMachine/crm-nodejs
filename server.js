const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const UserModel = require("./src/api/models/user.model");

const RestaurantModel = require("./src/api/models/restaurant.model");
const StoreModel = require("./src/api/models/store.model");
const VideoModel = require("./src/api/models/video.model");

require("dotenv").config();

const authRouter = require("./src/api/routers/auth.router");
const userRouter = require("./src/api/routers/user.router");
const restaurantRouter = require("./src/api/routers/restaurant.router");
const storeRouter = require("./src/api/routers/store.router");
const videoRouter = require("./src/api/routers/video.router");

/* Class version */
class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initSequelizeModels();
    this.initRoutes();
    this.intiErrorHandlers();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    const formatsLogger =
      this.server.get("env") === "development" ? "dev" : "short";
    this.server.use(logger(formatsLogger));
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

  }

  initSequelizeModels() {
    UserModel.sync();
    RestaurantModel.sync();
    StoreModel.sync();
    VideoModel.sync();
  }

  initRoutes() {
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    this.server.use("/api/auth/", authRouter);
    this.server.use("/api/user/", userRouter);

    this.server.use("/api/restaurant/", restaurantRouter);
    this.server.use("/api/store/", storeRouter);
    this.server.use("/api/video/", videoRouter);
  }

  intiErrorHandlers() {
    this.server.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    this.server.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("server started at port: ", process.env.PORT);
    });
  }
}

module.exports = Server;
