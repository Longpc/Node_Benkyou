'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: {type: String, index: {unique: true}},
  password: String,
  department: String,
  sex: String,
  occupation: String,
});

module.exports = mongoose.model('User', UserSchema);
