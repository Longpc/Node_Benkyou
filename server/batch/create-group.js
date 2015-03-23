// グループ作成の流れ
// 1. 参加するユーザ一覧を取得
// 2. ランダムに100通りの組合せを作成
// 3. 関数を作成し, 組合せのコストを計算
// (メモリを考えると1ずつ通り生成してコスト計算していった方がよい)
// 4. 最小のコストの組合せを選択
// node create-group.js

console.log('start');

var batch = require('../batch').batch;
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

const N = 100; // ランダムに組合せを作成する回数
const MEMBER_CHANGE_VALUE = 20;
const MEMBER_LIMIT = 8;

// 参加するユーザ一覧を取得
// Todo: 参加するユーザーのみに絞り込む必要あり
User.find({}, null, { timeout: false }, function(err, users) {
  var minCost = 1000000;
  var bestGroup = [];
  var userCount = users.length;
  if (userCount < MEMBER_LIMIT) {
    process.exit();
  }
  var member = (userCount < MEMBER_CHANGE_VALUE) ? 4 : 5;
  for (var i = 0; i < N; i++) {
    var cost = 0;
    groups = createRandomGroup(users, member); // blocking function
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
    var userIds = bg.map(function(v) { return v.id; });
    var writeBlog = (i == 0) ? true : false;
    var date = new Date();
    newGroup = {
      date: date,
      write_blog: writeBlog,
      user_ids: userIds
    };
    Group.create(newGroup, function(err, group) {
      if (err) { console.log(err); }
      console.log('group created');
      User.update({_id: {$in: userIds}}, {$push: {group_ids: group.id}}, {multi: true}, function(err, user){
        if (err) { console.log(err); }
      });
    });
  });
});

// ユーザーをシャッフルした後, 最後からm人ずつグループを作成していく
// ユーザーがm人未満になったら, すでにできているグループに1人ずつ追加していく
function createRandomGroup(users, member) {
  groups = [];
  num = users.length;
  target = 0;
  shuffledUsers = shuffle(users);

  while (num > 0) {
    if (num >= member) {
      groups.push(shuffledUsers.slice(num - member, num));
      num -= member;
    } else {
      groups[target].push(shuffledUsers[num - 1]);
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
      if (g.occupation == group[j].occupation) {
        if (g.occupation == '役員・部長・室長') {
          cost += 10; // 役員が同じグループに入ったらコストを高く設定
        } else {
          cost += 2;
        }
      }
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
