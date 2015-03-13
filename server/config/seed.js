/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Department = require('../api/department/department.model');
var Occupation = require('../api/occupation/occupation.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : '会員登録',
    image_path : 'assets/images/cafe.jpg'
  }, {
    name : '毎月１日にグループ・リーダー・共有係をメールで通知',
    image_path : 'assets/images/cafe.jpg'
  }, {
    name : 'チャットワークでランチの日時と場所を決定',
    image_path : 'assets/images/cafe.jpg'
  },  {
    name : '実際にランチ',
    image_path : 'assets/images/cafe.jpg'
  },  {
    name : '共有係（全体で１月に１人）はシャッフルランチの様子をアップ',
    image_path : 'assets/images/cafe.jpg'
  });
});

Department.find({}).remove(function() {
  Department.create({
    name : 'エクスカリバーグループ',
    english_name : 'ex'
  }, {
    name : 'ポケットナイツグループ',
    english_name : 'pocket'
  }, {
    name : '店ません！グループ',
    english_name : 'shop'
  },  {
    name : '戦レガ',
    english_name : 'nobunaga'
  },  {
    name : 'クリプトラクトグループ',
    english_name : 'cryptract'
  }, {
    name : 'フォードグループ',
    english_name : 'ford'
  },  {
    name : 'COO直轄室',
    english_name : 'coo'
  },  {
    name : 'イノベーションラボ',
    english_name : 'innovation'
  }, {
    name : '事業部',
    english_name : 'division'
  },  {
    name : '経理グループ',
    english_name : 'account'
  },  {
    name : '内部監査室',
    english_name : 'audit'
  }, {
    name : '経営管理部',
    english_name : 'management'
  },  {
    name : '財務グループ',
    english_name : 'finance'
  },  {
    name : '技術統括室',
    english_name : 'technology'
  }, {
    name : '事業開発部',
    english_name : 'development'
  },  {
    name : 'マーケティング統括室',
    english_name : 'marketing'
  },  {
    name : 'デザイン統括',
    english_name : 'design'
  });
});

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
