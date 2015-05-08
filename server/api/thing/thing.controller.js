/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/flow         ->  show
 * GET     /thing/info          ->  info
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var config = require('../../config/environment/');
var Thing = require('./thing.model');
var Department = require('../department/department.model');
var Occupation = require('../occupation/occupation.model');
var Blog = require('../blog/blog.model');
var Attend = require('../attend/attend.model');
var AppController = require('../app/app.controller');

// Get list of departments and occupations
exports.index = function(req, res) {
  Department.find(function (err, departments) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    Occupation.find(function (err, occupations) {
      if(err) { return AppController.prototype.handleError(res, err, req.body); }
      var resData = {
        "departments": departments,
        "occupations": occupations
      };
      return res.json(200, AppController.prototype.makeResData(resData, req.body));
    });
  });
};

// Get list of things
exports.show = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    return res.json(200, AppController.prototype.makeResData(things, req.body));
  });
};

exports.info = function(req, res) {
  var data = AppController.prototype.receiveReqData(req.body);
  Blog.find()
    .populate('user_id', 'name')
    .sort({ created_at: -1 }).limit(10)
    .exec(function (err, blogs) {
      if(err) { return AppController.prototype.handleError(res, err, req.body); }

      // commentが20文字より長い場合は20文字にカット
      blogs.forEach(function(value, i) {
        if (blogs[i].comment.length > 20) { blogs[i].comment.substr(0, 20); }
      });

      var jtime = moment().utc().add(9, 'hours').add(1, 'months');
      var query = {
        user_id: data.id,
        active: false,
        year: jtime.year(),
        month: jtime.month() + 1
      };

      // 来月の参加しない状態（active: false）のレコード件数を取得
      Attend.count(data, function (err, count) {
        if(err) { return AppController.prototype.handleError(res, err, req.body); }
        var result = (count === 0) ? config.api.attend.yes : config.api.attend.no;
        var resData = {
          'result': config.api.result.success,
          'blogs': blogs,
          'attend': result
        };
        return res.json(200, AppController.prototype.makeResData(resData, req.body));
      });
    });
};
