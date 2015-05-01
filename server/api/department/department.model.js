'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: { type: String, required: true },
  english_name: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  disabled: { type: Boolean, required:true, default: false }
});

DepartmentSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

module.exports = mongoose.model('Department', DepartmentSchema);
