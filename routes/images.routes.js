const express = require("express");
const router = express.Router();
const { imagesController } = require("../controller/index.controller");

router
  .route("/").post(
    imagesController.uploadFileMiddleware.single("sid_profile"),
    imagesController.postImage
  );

module.exports = router;
