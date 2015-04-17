'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

// web and native
router.post('/', controller.show);

module.exports = router;
