'use strict';

var _ = require('lodash');
var moment = require('moment');
var App = require('../app/app.model');
var Attend = require('./attend.model');

// Get list of attends
exports.show = function(req, res) {
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: req.params.id,
    active: false,
    year: jtime.year(),
    month: jtime.month() + 1
  };

  // 来月の参加しない状態（active: false）のレコード件数を取得
  Attend.count(data, function (err, count) {
    if(err) { return handleError(res, err, req.body); }
    if(count === 0) { return res.json(200, { 'result': 1 }); } // 参加
    return res.json(200, { 'result': 2 }); // 不参加
  });
};

// Upsert a  attend in the DB.
exports.upsert = function(req, res) {
  var reqData = App.receiveReqData(req.body);
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: reqData.user_id,
    year: jtime.year(),
    month: jtime.month() + 1
  };
  // status: 1 => 参加から不参加
  // status: 2 => 不参加から参加
  var changedStatus = (reqData.status === 1) ? false : true;

  Attend.update(data, {$set: {active: changedStatus}}, {upsert: true, multi: false}, function(err, attend) {
    if(err) { return handleError(res, err, req.body); }
    var resData = { 'result': reqData.status };
    return res.json(resData);
  });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, 1));
}
