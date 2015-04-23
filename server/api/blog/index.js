'use strict';

var express = require('express');
var controller = require('./blog.controller');

var router = express.Router();

// web only
router.get('/', controller.index);

// native only
router.get('/:id', controller.show);

// web and native
router.post('/', controller.create);

module.exports = router;
