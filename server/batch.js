/**
 * Main batch file
 * 以降バッチスクリプトを作成する場合は, これをrequireする
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// batch.js
var Batch = require('batch')
  , batch = new Batch;

batch.concurrency(4);

module.exports.batch = batch;
