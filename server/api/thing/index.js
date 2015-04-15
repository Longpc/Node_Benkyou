'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/flow', controller.show);
router.post('/info', controller.info);

module.exports = router;
