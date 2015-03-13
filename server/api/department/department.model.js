'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: String,
  english_name: String
});

module.exports = mongoose.model('Department', DepartmentSchema);
