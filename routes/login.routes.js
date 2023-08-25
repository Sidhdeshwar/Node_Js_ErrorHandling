const express = require("express");
const router = express.Router();
const {loginController} = require("../controller/index.controller");

router.route("/").get(loginController.checkLogin).post(loginController.postUser);

module.exports = router