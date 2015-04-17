'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  name: String,
  email: {type: String, index: {unique: true}},
  password: String,
  department: String,
  sex: String,
  occupation: String,
});

UserSchema.static('createHash', function(password) {
  var planeText = 'Plane Text';
  var cipher = crypto.createCipher('aes192', password);
  cipher.update(planeText, 'utf8', 'hex');
  return cipher.final('hex');
});

module.exports = mongoose.model('User', UserSchema);
