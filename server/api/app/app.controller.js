'use strict';

var _ = require('lodash');
var config = require('../../config/environment/');
var App = require('./app.model');

// Base Controller
function AppController() {
}

AppController.prototype.handleError = function(res, err, reqBody) {
  return res.json(500, this.makeResData(err, reqBody, config.api.code.error));
};

AppController.prototype.receiveReqData = function(reqBody) {
  if (isNativeApp(reqBody)) {
    return reqBody.data.request;
  }
  return reqBody;
};

// errorCode: '0' => success, '1' => error
AppController.prototype.makeResData = function(resObject, reqBody, errorCode) {
  errorCode = errorCode || '0'; // set default value 0 if null
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
};

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

module.exports = AppController;
