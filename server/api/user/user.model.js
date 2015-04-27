'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var crypto = require('crypto');
var Puid = require('puid');
var puid = new Puid();

var UserSchema = new Schema({
  name: String,
  email: {type: String, index: {unique: true}},
  password: String,
  department: String,
  sex: String,
  occupation: String,
  uuid: { type: String, default: puid.generate() },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false }
});

UserSchema.static('createHash', function(password) {
  var planeText = 'Plane Text';
  var cipher = crypto.createCipher('aes192', password);
  cipher.update(planeText, 'utf8', 'hex');
  return cipher.final('hex');
});

UserSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});


module.exports = mongoose.model('User', UserSchema);
