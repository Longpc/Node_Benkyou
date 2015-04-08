'use strict';

var _ = require('lodash');
var moment = require('moment');
var Group = require('./group.model');
var User = require('../user/user.model');

// Get list of groups
exports.index = function(req, res) {
  var startOfMonth = moment().utc().add(9, 'hours').startOf('month');
  var endOfMonth = moment().utc().add(9, 'hours').endOf('month');
  var data = {
    user_ids: req.query.user_id,
    date: {
      "$gte": startOfMonth,
      "$lte": endOfMonth
    }
  };

  Group.findOne(data)
    .populate('leader_id')
    .populate('user_ids')
    .exec(function (err, groups) {
      if(err) { return handleError(res, err); }
      return res.json(groups);
    });
};

// Get a single group
exports.show = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    return res.json(group);
  });
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    return res.json(201, group);
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Group.findById(req.params.id, function (err, group) {
    if (err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    group.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
