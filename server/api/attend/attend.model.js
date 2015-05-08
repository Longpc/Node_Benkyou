'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendSchema = new Schema({
  user_id: { type: [Schema.Types.ObjectId], required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  disabled: { type: Boolean, required: true, default: false }
});

AttendSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Attend', AttendSchema);
