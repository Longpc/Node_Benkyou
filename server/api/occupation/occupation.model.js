'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OccupationSchema = new Schema({
  name: String,
  english_name: String
});

module.exports = mongoose.model('Occupation', OccupationSchema);
