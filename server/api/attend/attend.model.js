'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendSchema = new Schema({
  user_id: [Schema.Types.ObjectId],
  active: Boolean,
  year: Number,
  month: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false }
});

AttendSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Attend', AttendSchema);
