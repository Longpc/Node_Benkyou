'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  image_path: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false }
});

ThingSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Thing', ThingSchema);
