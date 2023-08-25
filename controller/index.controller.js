const customerController = require("./customer.controller");
const productController = require("./product.controller");
const aggregationController = require("./aggregation-pipeline.controller");
const loginController = require("./login.controller");
const imagesController = require("./images.controller")

module.exports = { customerController,productController,aggregationController, loginController, imagesController }