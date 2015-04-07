'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  date: Date,
  write_blog: Boolean,
  leader_id: { type: Schema.Types.ObjectId, ref: 'User' },
  user_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Group', GroupSchema);
