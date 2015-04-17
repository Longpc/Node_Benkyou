'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

// web and native
router.post('/', controller.create);
router.post('/login', controller.login);
router.put('/:id', controller.update);

// web only
router.post('/islogged', controller.islogged);
router.post('/logout', controller.logout);

module.exports = router;
