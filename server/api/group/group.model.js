'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  date: Date,
  write_blog: Boolean,
  leader_id: Schema.Types.ObjectId,
  user_ids: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Group', GroupSchema);
