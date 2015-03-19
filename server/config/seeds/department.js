var Department = require('../../api/department/department.model');

var names = ['エクスカリバーグループ', 'ポケットナイツグループ', '店ません！グループ', '戦レガ', 'クリプトラクトグループ', 'フォードグループ', 'COO直轄室', 'イノベーションラボ', '事業部', '経理グループ', '内部監査室', '経営管理部', '財務グループ', '技術統括室', '事業開発部', 'マーケティング統括室', 'デザイン統括'];
var english_names = ['ex', 'pocket', 'shop', 'nobunaga', 'cryptract', 'ford', 'coo', 'innovation', 'division', 'account', 'audit', 'management', 'finance', 'technology', 'development', 'marketing', 'design'];

Department.find({}).remove(function() {
  for (var i = 0; i < names.length; i++) {
    Department.create({
      name : names[i],
      english_name : english_names[i]
    });
  }
});
