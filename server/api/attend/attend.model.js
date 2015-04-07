'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendSchema = new Schema({
  user_id: [Schema.Types.ObjectId],
  active: Boolean,
  year: Number,
  month: Number
});

module.exports = mongoose.model('Attend', AttendSchema);
