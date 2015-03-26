'use strict';

var _ = require('lodash');
var Attend = require('./attend.model');

// Get list of attends
exports.index = function(req, res) {
  Attend.find(function (err, attends) {
    if(err) { return handleError(res, err); }
    return res.json(200, attends);
  });
};

// Get a single attend
exports.show = function(req, res) {
  Attend.findById(req.params.id, function (err, attend) {
    if(err) { return handleError(res, err); }
    if(!attend) { return res.send(404); }
    return res.json(attend);
  });
};

// Creates a new attend in the DB.
exports.create = function(req, res) {
  Attend.create(req.body, function(err, attend) {
    if(err) { return handleError(res, err); }
    return res.json(201, attend);
  });
};

// Updates an existing attend in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attend.findById(req.params.id, function (err, attend) {
    if (err) { return handleError(res, err); }
    if(!attend) { return res.send(404); }
    var updated = _.merge(attend, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attend);
    });
  });
};

// Deletes a attend from the DB.
exports.destroy = function(req, res) {
  Attend.findById(req.params.id, function (err, attend) {
    if(err) { return handleError(res, err); }
    if(!attend) { return res.send(404); }
    attend.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}