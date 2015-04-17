'use strict';

var _ = require('lodash');
var moment = require('moment');
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
    .exec(function (err, groups) {
      if(err) { return handleError(res, err, req.body); }
      if (groups) {
        groups.user_ids.forEach(function(m, i) {
          if (m.id === groups.leader_id.id) { groups.user_ids.splice(i, 1); }
        });
      }
      var groupData = {
        result: 1,
        group: groups
      };
      return res.json(200, App.makeResData(groupData, req.body, 0));
    });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, 1));
}
