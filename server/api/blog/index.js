'use strict';

var express = require('express');
var controller = require('./blog.controller');

var router = express.Router();

// web only
router.get('/', controller.index);
router.post('/post', controller.create);

// native only
router.get('/:id', controller.show);
router.post('/', controller.createNative);

module.exports = router;
