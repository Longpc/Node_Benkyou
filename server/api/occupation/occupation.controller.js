'use strict';

var _ = require('lodash');
var Occupation = require('./occupation.model');

// Get list of occupations
exports.index = function(req, res) {
  Occupation.find(function (err, occupations) {
    if(err) { return handleError(res, err); }
    return res.json(200, occupations);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
