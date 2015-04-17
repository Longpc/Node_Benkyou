'use strict';

var _ = require('lodash');
var Department = require('./department.model');

// Get list of departments
exports.index = function(req, res) {
  Department.find(function (err, departments) {
    if(err) { return handleError(res, err); }
    return res.json(200, departments);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
