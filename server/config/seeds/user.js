var User = require('../../api/user/user.model');
var faker = require('faker');
var config = require('../environment');

const n = 100; // テストデータの数
const sex = ['男性', '女性'];

faker.locale = 'ja';

User.find({}).remove(function() {
  for (var i = 0; i < n; i++) {
    User.create({
      name : faker.name.findName(),
      email: faker.internet.email(),
      sex: sex[Math.round(Math.random())],
      password: faker.internet.password(),
      department: config.department[Math.floor(Math.random() * config.department.length)].name,
      occupation: config.occupation[Math.floor(Math.random() * config.occupation.length)].name
    });
  }
});
