'use strict';

var _ = require('lodash');
var config = require('../../config/environment/');
var User = require('./user.model');
var AppController = require('../app/app.controller');

// Creates a new user in the DB.
exports.create = function(req, res) {
  var data = AppController.prototype.receiveReqData(req.body);
  User.count({email: data.user.email}, function(err, count) {
    if(err) { return AppController.prototype.handleError(res, err, req.body); }
    if (count !== 0) { return res.json(200, AppController.prototype.makeResData({result: config.api.result.email}, req.body)); }

    data.user.password = User.createHash(data.user.password);
    User.create(data.user, function(err, user) {
      if(err) { return AppController.prototype.handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: config.api.result.success,
        user: user
      };
      return res.json(201, AppController.prototype.makeResData(userData, req.body));
    });
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  var data = AppController.prototype.receiveReqData(req.body)
  if(data._id) { delete data._id; }

  User.findById(req.params.id, function (err, user) {
    if (err) { return AppController.prototype.handleError(res, err, req.body); }
    if (!user) { return AppController.prototype.handleError(res, err, req.body); }
    var updated = _.merge(user, data);
    updated.save(function (err) {
      if (err) { return AppController.prototype.handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: config.api.result.success,
        user: updated
      };
      return res.json(200, AppController.prototype.makeResData(userData, req.body));
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
  var data = AppController.prototype.receiveReqData(req.body);
  User.findOne({email: data.email, password: User.createHash(data.password)}, function(err, user) {
    if (err) { return AppController.prototype.handleError(res, err, req.body); }
    if (!user) {
      return res.json(200, AppController.prototype.makeResData({result: config.api.result.password}, req.body));
    }

    req.session.user = user;
    var userData = {
      result: config.api.result.success,
      user: user
    };
    return res.json(200, AppController.prototype.makeResData(userData, req.body));
  });
};

exports.auto = function(req, res) {
  var data = AppController.prototype.receiveReqData(req.body);
  User.findOne({ uuid: req.body.data.common.token }, function(err, user) {
    if (err) { return AppController.prototype.handleError(res, err, req.body); }
    if (!user) {
      return res.json(200, AppController.prototype.makeResData({result: config.api.result.error}, req.body));
    }

    req.session.user = user;
    var userData = {
      result: config.api.result.success,
      user: user
    };
    return res.json(200, AppController.prototype.makeResData(userData, req.body));
  });
};

exports.checkEmail = function(req, res) {
  var data = AppController.prototype.receiveReqData(req.body);
  User.count({email: data.email}, function(err, count) {
    if (err) { return AppController.prototype.handleError(res, err, req.body); }
    if (count !== 0) {
      return res.json(200, AppController.prototype.makeResData({result: config.api.result.error}, req.body));
    }
    return res.json(200, AppController.prototype.makeResData({result: config.api.result.success}, req.body));
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.json(200, {result: config.api.result.success});
};
