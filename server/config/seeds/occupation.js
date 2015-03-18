var Occupation = require('../../api/occupation/occupation.model');

Occupation.find({}).remove(function() {
  Occupation.create({
    name : '役員・部長・室長',
    english_name : 'executive'
  }, {
    name : 'デザイナー',
    english_name : 'designer'
  }, {
    name : 'クライアントエンジニア',
    english_name : 'client'
  },  {
    name : 'サーバーエンジニア',
    english_name : 'server'
  },  {
    name : '総合職',
    english_name : 'general'
  });
});
