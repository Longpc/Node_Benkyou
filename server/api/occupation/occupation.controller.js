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

// Get a single occupation
exports.show = function(req, res) {
  Occupation.findById(req.params.id, function (err, occupation) {
    if(err) { return handleError(res, err); }
    if(!occupation) { return res.send(404); }
    return res.json(occupation);
  });
};

// Creates a new occupation in the DB.
exports.create = function(req, res) {
  Occupation.create(req.body, function(err, occupation) {
    if(err) { return handleError(res, err); }
    return res.json(201, occupation);
  });
};

// Updates an existing occupation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Occupation.findById(req.params.id, function (err, occupation) {
    if (err) { return handleError(res, err); }
    if(!occupation) { return res.send(404); }
    var updated = _.merge(occupation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, occupation);
    });
  });
};

// Deletes a occupation from the DB.
exports.destroy = function(req, res) {
  Occupation.findById(req.params.id, function (err, occupation) {
    if(err) { return handleError(res, err); }
    if(!occupation) { return res.send(404); }
    occupation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}