/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs');
var dir = __dirname + '/seeds/';

fs.readdir(dir, function(err, files) {
  files.forEach(function (file) {
    require(dir + file);
  });
});
