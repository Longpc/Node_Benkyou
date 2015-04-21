'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

// native only
router.post('/', controller.index);
router.post('/info', controller.info);
// web only
router.get('/flow', controller.show);

module.exports = router;
