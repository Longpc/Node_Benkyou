// グループ作成の流れ
// 1. 参加するユーザ一覧を取得
// 2. ランダムに100通りの組合せを作成
// 3. 関数を作成し, 組合せのコストを計算
// (メモリを考えると1ずつ通り生成してコスト計算していった方がよい)
// 4. 最小のコストの組合せを選択
// node create_group.js

console.log('start');

var batch = require('../batch.js');
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

const n = 100;
const member = 5;

// 参加するユーザ一覧を取得
// Todo: 参加するユーザーのみに絞り込む必要あり
User.find({}, null, { timeout: false }, function(err, users) {
  var minCost = 1000000;
  var bestGroup = [];
  for (var i = 0; i < n; i++) {
    var cost = 0;
    groups = createRandomGroup(users); // blocking function
    groups.forEach(function(group) {
      cost += calcCostByGroup(group); // blocking function
    });
    if (cost < minCost) {
      minCost = cost;
      bestGroup = groups;
    }
  }

  // bestGroupをDBへ保存
  bestGroup.forEach(function(bg, i) {
    var user_ids = bg.map(function(v) { return v.id; });
    var write_blog = (i == 0) ? true : false;
    var date = new Date();
    newGroup = {
      date: date,
      write_blog: write_blog,
      user_ids: user_ids
    };
    Group.create(newGroup, function(err, group) {
      if (err) { console.log(err); }
      console.log('group created');
      User.update({_id: {$in: user_ids}}, {$push: {group_ids: group.id}}, {multi: true}, function(err, user){
        if (err) { console.log(err); }
      });
    });
  });
});

// ユーザーをシャッフルした後, 最後から5人ずつグループを作成していく
// ユーザーが5人未満になったら, すでにできているグループに1人ずつ追加していく
// これだと20人未満の場合, グループが上手く作成できない可能性がある
function createRandomGroup(users) {
  groups = [];
  num = users.length;
  target = 0;
  shuffled_users = shuffle(users);

  while (num > 0) {
    if (num >= member) {
      groups.push(shuffled_users.slice(num - member, num));
      num -= member;
    } else {
      groups[target].push(shuffled_users[num - 1]);
      num--;
      target++;
    }
  }
  return groups;
}

function calcCostByGroup(group) {
  cost = 0;
  group.forEach(function(g, i) {
    for (var j = i + 1; j < group.length; j++) {
      if (g.sex == group[j].sex) { cost += 1; }
      if (g.occupation == group[j].occupation) { cost += 2; }
      if (g.department == group[j].department) { cost += 3; }
    }
  });
  return cost;
}

// Fisher-Yates shuffle
function shuffle(array) {
  var num = array.length, t, i;
  while (num) {
    i = Math.floor(Math.random() * num--);
    t = array[num];
    array[num] = array[i];
    array[i] = t;
  }
  return array;
}
