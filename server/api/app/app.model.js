'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false }
});

AppSchema.static('receiveReqData', function(reqBody) {
  if (isNativeApp(reqBody)) {
    return reqBody.data.request;
  }
  return reqBody;
});

// errorCode: 0 => success, 1 => error
AppSchema.static('makeResData', function(resObject, reqBody, errorCode) {
  errorCode = errorCode || 0; // set default value 0 if null
  if (isNativeApp(reqBody)) {
    return {
      "data": {
        "common": {
          "error": errorCode
        },
        "response": resObject
      }
    };
  }
  return resObject;
});

AppSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (! this.created_at) { this.created_at = now; }
  next();
});

function isNativeApp(reqBody) {
  if ('data' in reqBody) {
    if ('common' in reqBody.data) {
      if ('device' in reqBody.data.common) {
        if (reqBody.data.common.device === '1') return true;
      }
    }
  }
  return false;
}

module.exports = mongoose.model('App', AppSchema);
