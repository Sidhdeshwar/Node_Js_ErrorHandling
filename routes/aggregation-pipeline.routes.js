
const {aggregationController} = require("../controller/index.controller")

const express = require('express');
const router = express.Router();

router.route('/').get(aggregationController.aggreState);
router.route('/:startMonth/:endMonth').get(aggregationController.unwindState);

module.exports = router;