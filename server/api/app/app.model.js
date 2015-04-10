'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

AppSchema.static('receiveReqData', function(req) {
  if (isNativeApp(req.body)) {
    return req.body.data.request;
  }
  return req.body;
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

module.exports = mongoose.model('App', AppSchema);

function isNativeApp(reqBody) {
  if ('data' in reqBody) {
    if ('common' in reqBody.data) {
      if ('error' in reqBody.common) {
        if (reqBody.common.error === 1) return true;
      }
    }
  }
  return false;
}
