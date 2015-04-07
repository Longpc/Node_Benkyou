// グループの中からリーダーを1人選び, DBに保存するバッチスクリプト
// node select-leader.js

console.log('start');

var moment = require('moment');
var batch = require('../batch.js').batch;
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

var startOfMonth = moment().utc().add(9, 'hours').startOf('month');
var endOfMonth = moment().utc().add(9, 'hours').endOf('month');

console.log(startOfMonth._d);
console.log(endOfMonth._d);

// 今月のグループを取得
Group.find({date: {$gt: startOfMonth}, date: {$lt: endOfMonth}}, function(err, groups) {
  if (err) { console.log(err); }
  groups.forEach(function(group) {
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
            console.log('leader_id updated');
          });
        }
      });
    });
  });
});
