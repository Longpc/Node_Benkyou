'use strict';

var _ = require('lodash');
var moment = require('moment');
var config = require('../../config/environment/');
var Attend = require('./attend.model');
var AppController = require('../app/app.controller');

// Get list of attends
exports.show = function(req, res) {
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: req.body.id,
    active: false,
    year: jtime.year(),
    month: jtime.month() + 1
  };

  // 来月の参加しない状態（active: false）のレコード件数を取得
  Attend.count(data, function (err, count) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    if(count === 0) { return res.json(200, {result: config.api.attend.yes}); } // 参加
    return res.json(200, {result: config.api.attend.no}); // 不参加
  });
};

// Upsert a  attend in the DB.
exports.upsert = function(req, res) {
  var reqData = AppController.prototype.receiveReqData(req.body);
  var jtime = moment().utc().add(9, 'hours').add(1, 'months');
  var data = {
    user_id: reqData.id,
    year: jtime.year(),
    month: jtime.month() + 1
  };
  // status: 1 => 参加から不参加
  // status: 2 => 不参加から参加
  var changedStatus = (reqData.status === config.api.attend.yes) ? false : true;

  Attend.update(data, {$set: {active: changedStatus}}, {upsert: true, multi: false}, function(err, attend) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    var resData = {result: reqData.status};
    return res.json(200, AppController.prototype.makeResData(resData, req.body));
  });
};
