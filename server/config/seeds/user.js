var User = require('../../api/user/user.model');
var faker = require('faker');

const n = 100; // テストデータの数
const sex = ['男性', '女性'];
var departments = ['エクスカリバーグループ', 'ポケットナイツグループ', '店ません！グループ', '戦レガ', 'クリプトラクトグループ', 'フォードグループ', 'COO直轄室', 'イノベーションラボ', '事業部', '経理グループ', '内部監査室', '経営管理部', '財務グループ', '技術統括室', '事業開発部', 'マーケティング統括室', 'デザイン統括'];
var occupations = ['役員・部長・室長', 'デザイナー', 'クライアントエンジニア', 'サーバーエンジニア', '総合職'];

faker.locale = 'ja';

User.find({}).remove(function() {
  for (var i = 0; i < n; i++) {
    User.create({
      name : faker.name.findName(),
      email: faker.internet.email(),
      sex: sex[Math.round(Math.random())],
      password: faker.internet.password(),
      department: departments[Math.floor(Math.random() * departments.length)],
      occupation: occupations[Math.floor(Math.random() * occupations.length)]
    });
  }
});
