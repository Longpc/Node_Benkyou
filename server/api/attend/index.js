'use strict';

var express = require('express');
var controller = require('./attend.controller');

var router = express.Router();

// web only
router.post('/', controller.show);
// web and native
router.post('/change', controller.upsert);

module.exports = router;
