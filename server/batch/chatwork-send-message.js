// チャットワークAPIでグループが決定したことを通知するスクリプト

var request = require('request');
var batchFile = require('./../batch');
var batch = batchFile.batch;
var local =  batchFile.local;

exports.sendMessage = function(done) {
  var options = {
    url: 'https://api.chatwork.com/v1/rooms/' + local.CHATWORK_ROOM_ID + '/messages',
    headers: { 'X-ChatWorkToken' : local.CHATWORK_API_TOKEN },
    form: {
      body: '[info][title]今月のシャッフルランチのグループが決定しました[/title]皆様\n\nお疲れ様です, 今月のシャッフルランチのグループが決定しました.\n\n下記サイトからグループをご確認した後,\nチャットワークでグループを作成し, ランチの日時・場所を決定してください.[/info]', // Todo: Add site url
    },
    json: true
  };

  request.post(options, function (error, response, body) {
    if (error) { console.log(error); }
    done(null);
  });
}
