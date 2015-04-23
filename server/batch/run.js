/**
 * Runi batch file
 * create-group, select-leader, chatwork-send-message内の関数を一括実行
 */

var batchFile = require('./../batch');
var batch = batchFile.batch;

var group = require('./create-group');
var leader = require('./select-leader');
var message = require('./chatwork-send-message');

batch.push(function(done) {
  group.createGroup(leader.selectLeader, message.sendMessage, done);
});

batch.end(function(err, results) {
  if (err) { console.log(err); }
  console.log('Batch script finished successfly');
  process.exit();
});
