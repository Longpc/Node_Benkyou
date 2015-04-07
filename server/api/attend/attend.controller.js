'use strict';

var _ = require('lodash');
var moment = require('moment');
var Attend = require('./attend.model');

// Get list of attends
exports.index = function(req, res) {
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: req.query.user_id,
    active: false,
    year: jtime.year(),
    month: jtime.month() + 1
  };

  // 来月の参加しない状態（active: false）のレコード件数を取得
  Attend.count(data, function (err, count) {
    if(err) { return handleError(res, err); }
    if(count == 0) { return res.json(1); } // 参加
    return res.json(2); // 不参加
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

// Upsert a  attend in the DB.
exports.upsert = function(req, res) {
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: req.body.user_id,
    year: jtime.year(),
    month: jtime.month() + 1
  };
  // status: 1 => 参加から不参加
  // status: 2 => 不参加から参加
  var changedStatus = (req.body.status == 1) ? false : true;

  Attend.update(data, {$set: {active: changedStatus}}, {upsert: true, multi: false}, function(err, attend) {
    if(err) { return handleError(res, err); }
    return res.json(req.body.status);
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
