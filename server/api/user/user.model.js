'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var crypto = require('crypto');
var Puid = require('puid');
var puid = new Puid();

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  department: { type : String, required: true },
  sex: { type: String, required: true },
  occupation: { type: String, required: true },
  uuid: { type: String, required: true, default: puid.generate() },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  disabled: { type: Boolean, required: true, default: false }
});

UserSchema.static('createHash', function(password) {
  if (!password) { return ''; }
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
