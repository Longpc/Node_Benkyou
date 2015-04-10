'use strict';

var express = require('express');
var controller = require('./attend.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.upsert);

module.exports = router;
