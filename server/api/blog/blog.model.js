'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  place: { type: String, required: true },
  date: { type: String, required: true },
  member: { type: String, required: true },
  comment: { type: String, required: true },
  image_path: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  disabled: { type: Boolean, required: true, default: false }
});

BlogSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
