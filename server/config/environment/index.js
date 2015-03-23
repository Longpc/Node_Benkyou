'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'shufflelunch-secret'
  },

  session_timeout: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // for a week

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  occupation: [
    {name: '役員・部長・室長', english_name: 'executive'},
    {name: 'デザイナー', english_name: 'designer'},
    {name: 'クライアントエンジニア', english_name: 'client'},
    {name: 'サーバーエンジニア', english_name: 'server'},
    {name: '総合職', english_name: 'general'}
  ],

  department: [
    {name: 'エクスカリバーグループ', english_name: 'ex'},
    {name: 'ポケットナイツグループ', english_name: 'pocket'},
    {name: '店ません！グループ', english_name: 'shop'},
    {name: '戦レガ', english_name: 'nobunaga'},
    {name: 'クリプトラクトグループ', english_name: 'cryptract'},
    {name: 'フォードグループ', english_name: 'ford'},
    {name: 'COO直轄室', english_name: 'coo'},
    {name: 'イノベーションラボ', english_name: 'innovation'},
    {name: '事業部', english_name: 'division'},
    {name: '経理グループ', english_name: 'account'},
    {name: '内部監査室', english_name: 'audit'},
    {name: '経営管理部', english_name: 'management'},
    {name: '財務グループ', english_name: 'finance'},
    {name: '技術統括室', english_name: 'technology'},
    {name: '事業開発部', english_name: 'development'},
    {name: 'マーケティング統括室', english_name: 'marketing'},
    {name: 'デザイン統括', english_name: 'design'}
  ],

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
