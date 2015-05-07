'use strict';

var _ = require('lodash');
var config = require('../../config/environment/');
var App = require('../app/app.model');
var User = require('./user.model');

// Creates a new user in the DB.
exports.create = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.count({email: data.user.email}, function(err, count) {
    if(err) { return handleError(res, err, req.body); }
    if (count !== 0) { return res.json(200, App.makeResData({result: config.api.result.email}, req.body)); }

    data.user.password = User.createHash(data.user.password);
    User.create(data.user, function(err, user) {
      if(err) { return handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: config.api.result.success,
        user: user
      };
      return res.json(201, App.makeResData(userData, req.body));
    });
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  var data = App.receiveReqData(req.body)
  if(data._id) { delete data._id; }

  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err, req.body); }
    if (!user) { return handleError(res, err, req.body); }
    var updated = _.merge(user, data);
    updated.save(function (err) {
      if (err) { return handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: config.api.result.success,
        user: updated
      };
      return res.json(200, App.makeResData(userData, req.body));
    });
  });
};

exports.islogged = function(req, res) {
  var user = req.session.user;
  if (user == '') {
    user = req.session.user = {};
    return res.json(200);
  }
  return res.json(200, user);
};

exports.login = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.findOne({email: data.email, password: User.createHash(data.password)}, function(err, user) {
    if (err) { return handleError(res, err, req.body); }
    if (!user) {
      return res.json(200, App.makeResData({result: config.api.result.password}, req.body));
    }

    req.session.user = user;
    var userData = {
      result: config.api.result.success,
      user: user
    };
    return res.json(200, App.makeResData(userData, req.body));
  });
};

exports.auto = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.findOne({ uuid: req.body.data.common.token }, function(err, user) {
    if (err) { return handleError(res, err, req.body); }
    if (!user) {
      return res.json(200, App.makeResData({result: config.api.result.error}, req.body));
    }

    req.session.user = user;
    var userData = {
      result: config.api.result.success,
      user: user
    };
    return res.json(200, App.makeResData(userData, req.body));
  });
};

exports.checkEmail = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.count({email: data.email}, function(err, count) {
    if (err) { return handleError(res, err, req.body); }
    if (count !== 0) {
      return res.json(200, App.makeResData({result: config.api.result.error}, req.body));
    }
    return res.json(200, App.makeResData({result: config.api.result.success}, req.body));
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.json(200, {result: config.api.result.success});
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, config.api.code.error));
}
