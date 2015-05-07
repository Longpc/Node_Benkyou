'use strict';

var _ = require('lodash');
var moment = require('moment');
var config = require('../../config/environment/');
var App = require('../app/app.model');
var Group = require('./group.model');
var User = require('../user/user.model');

// Get a single group
exports.show = function(req, res) {
  var reqData = App.receiveReqData(req.body);
  var startOfMonth = moment().utc().add(9, 'hours').startOf('month');
  var endOfMonth = moment().utc().add(9, 'hours').endOf('month');
  var data = {
    user_ids: reqData.id,
    date: {
      "$gte": startOfMonth,
      "$lte": endOfMonth
    }
  };

  Group.findOne(data)
    .populate('leader_id')
    .populate('user_ids')
    .exec(function (err, group) {
      var groupData;
      if(err) { return handleError(res, err, req.body); }
      if (group) {
        group.user_ids.forEach(function(m, i) {
          if (m.id === group.leader_id.id) { group.user_ids.splice(i, 1); }
        });
        groupData = {
          result: config.api.result.success,
          group: group
        };
      } else {
        groupData = {
          result: config.api.result.error
        };
      }
      return res.json(200, App.makeResData(groupData, req.body));
    });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, config.api.code.error));
}
