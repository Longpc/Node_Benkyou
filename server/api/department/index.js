'use strict';

var express = require('express');
var controller = require('./department.controller');

var router = express.Router();

// web only
router.get('/', controller.index);

module.exports = router;
