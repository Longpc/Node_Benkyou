// グループの中からリーダーを1人選び, DBに保存するバッチスクリプト
// node select_leader.js

console.log('start');

var batch = require('../batch.js');
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

const deferrent_hours = -9;
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var startOfMonth = new Date(year, month, null, deferrent_hours);
var startOfNextMonth = new Date(year, month + 1, null, deferrent_hours);

console.log(date);
console.log(startOfMonth);
console.log(startOfNextMonth);

// 今月のグループを取得
Group.find({date: {$gt: startOfMonth}, date: {$lt: startOfNextMonth}}, function(err, groups) {
  if (err) { console.log(err); }
  groups.forEach(function(group) {
    var minCount = 10000;
    var leader_id;
    group.user_ids.forEach(function(uid, i) {
      Group.count({"leader_id": uid}, function(err, count) {
        if (err) { console.log(err); }
        if (count < minCount) {
          minCount = count;
          leader_id = uid;
        }
        if (i == group.user_ids.length - 1) { // ループが最後まで回ったら
          Group.update({_id: group._id}, {leader_id: leader_id}, function(err) {
            if (err) { console.log(err); }
            console.log('leader_id updated');
          });
        }
      });
    });
  });
});
