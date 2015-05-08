'use strict';

var _ = require('lodash');
var moment = require('moment');
var config = require('../../config/environment/');
var Attend = require('./attend.model');
var AppController = require('../app/app.controller');

// Get status of attends
exports.show = function(req, res) {
  var startOfMonth = moment().startOf('month');
  var endOfMonth = moment().endOf('month');

  var query = {
    user_id: req.body.id,
    disabled: false,
    created_at: {
      $gt: startOfMonth,
      $lt: endOfMonth
    }
  };

  // 来月の参加しない状態（active: false）のレコード件数を取得
  Attend.count(query, function (err, count) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    if(count === 0) { return res.json(200, {result: config.api.attend.yes}); } // 参加
    return res.json(200, {result: config.api.attend.no}); // 不参加
  });
};

// Upsert a  attend in the DB.
exports.upsert = function(req, res) {
  var reqData = AppController.prototype.receiveReqData(req.body);
  // status: 1 => 参加から不参加
  // status: 2 => 不参加から参加
  var changedStatus = (reqData.status === config.api.attend.yes) ? false : true;
  var startOfMonth = moment().startOf('month');
  var endOfMonth = moment().endOf('month');

  Attend.findOne({user_id: reqData.id, created_at: {$gt: startOfMonth, $lt: endOfMonth}}, function(err, attend) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    if(attend) {
      attend.disabled = changedStatus;
      attend.save(function (err) {
        if(err) { return AppController.prototype.handleError(res, err, req.body); }
        return res.json(200, AppController.prototype.makeResData({result: reqData.status}, req.body));
      });
    } else {
      Attend.create({user_id: reqData.id, disabled: changedStatus}, function(err, attend) {
        if(err) { return AppController.prototype.handleError(res, err, req.body); }
        return res.json(200, AppController.prototype.makeResData({result: reqData.status}, req.body));
      });
    }
  });
};
