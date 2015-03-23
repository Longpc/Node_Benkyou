// グループの中からリーダーを1人選び, DBに保存するバッチスクリプト
// node select-leader.js

console.log('start');

var batchFile = require('./../batch');
var batch = batchFile.batch;
var local =  batchFile.local;
var request = require('request');
var roomId = local.CHATWORK_ROOM_ID // シャッフルランチグループチャット
var options = {
  url: 'https://api.chatwork.com/v1/rooms/' + roomId + '/messages',
  headers: { 'X-ChatWorkToken' : local.CHATWORK_API_TOKEN },
  form: {
    body: '[info][title]今月のシャッフルランチのグループが決定しました[/title]皆様\n\nお疲れ様です, 今月のシャッフルランチのグループが決定しました.\n\n下記サイトからグループをご確認した後,\nチャットワークでグループを作成し, ランチの日時・場所を決定してください.[/info]', // Todo: Add site url
  },
  json: true
};

request.post(options, function (error, response, body) {
  console.log(body);
  console.log('finish');
});
