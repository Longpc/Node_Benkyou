// グループの中からリーダーを1人選び, DBに保存するバッチスクリプト

var moment = require('moment');
var async = require('async')
var batch = require('../batch.js').batch;
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

var startOfMonth = moment().utc().add(9, 'hours').startOf('month');
var endOfMonth = moment().utc().add(9, 'hours').endOf('month');

// 今月のグループを取得
exports.selectLeader = function(messageFunction, done) {
  Group.find({date: {$gt: startOfMonth}, date: {$lt: endOfMonth}}, function(err, groups) {
    if (err) { console.log(err); }
    async.each(groups, function(group, callback) {
      var minCount = 10000;
      var leaderId;
      group.user_ids.forEach(function(uid, i) {
        Group.count({leader_id: uid}, function(err, count) {
          if (err) { console.log(err); }
          if (count < minCount) {
            minCount = count;
            leaderId = uid;
          }
          if (i == group.user_ids.length - 1) { // ループが最後まで回ったら
            Group.update({_id: group._id}, {leader_id: leaderId}, function(err) {
              if (err) { console.log(err); }
              callback();
            });
          }
        });
      });
    }, function(err) {
      if (err) { console.log(err); }
      console.log('Select leader finished successfly');
      messageFunction(done);
    });
  });
}
