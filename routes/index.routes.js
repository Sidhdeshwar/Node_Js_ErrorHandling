const express = require("express");

const productRoute = require("./product.routes");
const aggregationRoute = require("./aggregation-pipeline.routes")

const  router = express.Router();

const defaultRoutes = [
  {
    path: "/products",
    route: productRoute,
  },
  {
    path:"/aggre-pipeline",
    route: aggregationRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
