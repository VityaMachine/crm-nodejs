const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/api/routers/auth.router.js",
  "./src/api/routers/user.router.js",
  "./src/api/routers/restaurant.router.js",
  "./src/api/routers/store.router.js",
  "./src/api/routers/video.router.js",
];

swaggerAutogen(outputFile, endpointsFiles);
