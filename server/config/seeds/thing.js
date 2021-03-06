var Thing = require('../../api/thing/thing.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'ユーザー登録',
    image_path : 'assets/images/icon_user.png'
  }, {
    name : '毎月１日にグループ・リーダーをチャットワークで通知',
    image_path : 'assets/images/icon_email.png'
  }, {
    name : 'チャットワークでランチの日時と場所を決定',
    image_path : 'assets/images/icon_chatwork.png'
  },  {
    name : '実際にランチ',
    image_path : 'assets/images/icon_lunch.png'
  },  {
    name : 'ランチの様子をアップしましょう',
    image_path : 'assets/images/icon_upload.png'
  });
});
