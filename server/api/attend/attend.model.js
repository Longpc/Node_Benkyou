'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  date: Date,
});

module.exports = mongoose.model('Attend', AttendSchema);
