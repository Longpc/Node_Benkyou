'use strict';

var _ = require('lodash');
var App = require('../app/app.model');
var User = require('./user.model');

// Creates a new user in the DB.
exports.create = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.count({email: data.user.email}, function(err, count) {
    if(err) { return handleError(res, err, req.body); }
    if (count !== 0) { return res.json(200, App.makeResData({result: 2}, req.body, 0)); }

    data.user.password = User.createHash(data.user.password);
    User.create(data.user, function(err, user) {
      if(err) { return handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: 1,
        user: user
      };
      return res.json(201, App.makeResData(userData, req.body, 0));
    });
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  var data = App.receiveReqData(req.body)
  if(data._id) { delete data._id; }
  data.password = User.createHash(data.password);

  User.findOne({_id: req.params.id, password: data.password}, function (err, user) {
    if (err) { return handleError(res, err, req.body); }
    if (!user) { return res.json(200, App.makeResData({result: 2}, req.body, 0)); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err, req.body); }
      req.session.user = user;
      var userData = {
        result: 1,
        user: user
      };
      return res.json(200, App.makeResData(userData, req.body, 0));
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
      return res.json(200, App.makeResData({result: 3}, req.body, 0));
    }

    req.session.user = user;
    var userData = {
      result: 1,
      user: user
    };
    return res.json(200, userData);
  });
};

exports.auto = function(req, res) {
  var data = App.receiveReqData(req.body);
  User.findById(data.id, function(err, user) {
    if (err) { return handleError(res, err, req.body); }
    if (!user) {
      return res.json(200, App.makeResData({result: 0}, req.body, 0));
    }

    req.session.user = user;
    var userData = {
      result: 1,
      user: user
    };
    return res.json(200, userData);
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.json(200, 'success');
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, 1));
}
