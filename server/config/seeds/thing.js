var Thing = require('../../api/thing/thing.model');

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
