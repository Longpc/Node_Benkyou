'use strict';

var _ = require('lodash');
var Department = require('./department.model');
var AppController = require('../app/app.controller');

// Get list of departments
exports.index = function(req, res) {
  Department.find(function (err, departments) {
    if(err) { return AppController.prototype.handleError(res, err); }
    return res.json(200, departments);
  });
};
