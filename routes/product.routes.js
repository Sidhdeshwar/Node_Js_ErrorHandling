const express = require("express");
const router = express.Router();

const {productController} = require("../controller/index.controller");
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.postProduct);
router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);



module.exports = router;
