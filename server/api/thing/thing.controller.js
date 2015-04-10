/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/flow          ->  show
 */

'use strict';

var _ = require('lodash');
var App = require('../app/app.model.js');
var Thing = require('./thing.model');
var Department = require('../department/department.model');
var Occupation = require('../occupation/occupation.model');

// Get list of departments and occupations
exports.index = function(req, res) {
  Department.find(function (err, departments) {
    if(err) { return handleError(res, err, device); }
    Occupation.find(function (err, occupations) {
      if(err) { return handleError(res, err, device); }
      var resData = {
        "departments": departments,
        "occupations": occupations
      };
      return res.json(200, App.makeResData(resData, req.body));
    });
  });
};

// Get list of things
exports.show = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err, device); }
    return res.json(200, App.makeResData(things, req.body));
  });
};

function handleError(res, err, device) {
  return res.json(500, App.makeResData(err, device, 1));
}
