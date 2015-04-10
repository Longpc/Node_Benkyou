'use strict';

var _ = require('lodash');
var App = require('../app/app.model');
var User = require('./user.model');

// Creates a new user in the DB.
exports.create = function(req, res) {
  var data = App.recieveReqData(req);
  User.count({email: data.user.email}, function(err, count) {
    if(err) { return handleError(res, err); }
    if (count !== 0) { return res.json(200, 'email_duplicated'); }

    data.user.password = User.createHash(data.user.password);
    User.create(data.user, function(err, user) {
      if(err) { return handleError(res, err); }
      req.session.user = user;
      return res.json(201, App.makeResData(user, req.body, 0));
    });
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.password = User.createHash(req.body.password);

  User.findOne({_id: req.params.id, password: req.body.password}, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(200, 'wrong_password'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      req.session.user = user;
      return res.json(200, user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
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
  User.findOne({email: req.body.email, password: User.createHash(req.body.password)}, function(err, user) {
    if (user) {
      req.session.user = user;
      return res.json(200, user);
    }
    return res.json(200, '');
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.json(200, 'success');
};

function handleError(res, err) {
  return res.send(500, err);
}
