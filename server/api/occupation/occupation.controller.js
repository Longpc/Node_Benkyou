'use strict';

var _ = require('lodash');
var Occupation = require('./occupation.model');
var AppController = require('../app/app.controller');

// Get list of occupations
exports.index = function(req, res) {
  Occupation.find(function (err, occupations) {
    if(err) { return handleError(res, err); }
    if(err) { return AppController.prototype.handleError(res, err); }
    return res.json(200, occupations);
  });
};
