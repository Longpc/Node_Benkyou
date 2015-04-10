'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.post('/islogged', controller.islogged);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;
