'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(user);
  });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  User.find({email: req.body.email}, function(err, user) {
    if (user != '') {
      return res.json(200, 'email_duplicated');
    }

    req.body.password = createHash(req.body.password);
    User.create(req.body, function(err, user) {
      if(err) { return handleError(res, err); }
      req.session.user = user;
      return res.json(201, user);
    });
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
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
  if (!user) {
    user = req.session.user = {};
    return res.json(200, 'fail');
  }
  return res.json(200, 'success');
};

exports.login = function(req, res) {
  User.find({email: req.body.email, password: createHash(req.body.password)}, function(err, user) {
    if (user != '') {
      req.session.user = user;
      return res.json(200, 'success');
    }
    return res.json(200, 'fail');
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.json(200, 'success');
};

function handleError(res, err) {
  return res.send(500, err);
}

function createHash(password) {
  var planeText = 'Plane Text';
  var cipher = crypto.createCipher('aes192', password);
  cipher.update(planeText, 'utf8', 'hex');
  return cipher.final('hex');
}
