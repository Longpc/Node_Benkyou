/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/flow          ->  show
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var App = require('../app/app.model.js');
var Thing = require('./thing.model');
var Department = require('../department/department.model');
var Occupation = require('../occupation/occupation.model');
var Blog = require('../blog/blog.model');
var Attend = require('../attend/attend.model');

// Get list of departments and occupations
exports.index = function(req, res) {
  Department.find(function (err, departments) {
    if(err) { return handleError(res, err, req.body); }
    Occupation.find(function (err, occupations) {
      if(err) { return handleError(res, err, req.body); }
      var resData = {
        "departments": departments,
        "occupations": occupations
      };
      return res.json(200, App.makeResData(resData, req.body));
    });
  });
};

// Get list of things
exports.show = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err, req.body); }
    return res.json(200, App.makeResData(things, req.body));
  });
};

exports.info = function(req, res) {
  var data = App.receiveReqData(req.body);
  Blog.find()
    .populate('user_id', 'name')
    .exec(function (err, blogs) {
      if(err) { return handleError(res, err, req.body); }

      var jtime = moment().utc().add(9, 'hours').add(1, 'months');
      var query = {
        user_id: data.id,
        active: false,
        year: jtime.year(),
        month: jtime.month() + 1
      };

      // 来月の参加しない状態（active: false）のレコード件数を取得
      Attend.count(data, function (err, count) {
        if(err) { return handleError(res, err, req.body); }
        var result = (count === 0) ? 1 : 2;
        var resData = {
          'result': 1,
          'blogs': blogs,
          'attend': result
        };
        return res.json(200, App.makeResData(resData, req.body));
      });
    });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, 1));
}
