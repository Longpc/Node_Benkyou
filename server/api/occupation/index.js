'use strict';

var express = require('express');
var controller = require('./occupation.controller');

var router = express.Router();

// web only
router.get('/', controller.index);

module.exports = router;
