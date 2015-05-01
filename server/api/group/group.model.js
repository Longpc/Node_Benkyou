'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  date: { type: Date, required: true },
  leader_id: { type: Schema.Types.ObjectId, ref: 'User' },
  user_ids: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  disabled: { type: Boolean, required: true, default: false }
});

GroupSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Group', GroupSchema);
