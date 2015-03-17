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
  User.findOne({email: req.body.email}, function(err, user) {
    if (user) {
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
  req.body.password = createHash(req.body.password);

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
  User.findOne({email: req.body.email, password: createHash(req.body.password)}, function(err, user) {
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

function createHash(password) {
  var planeText = 'Plane Text';
  var cipher = crypto.createCipher('aes192', password);
  cipher.update(planeText, 'utf8', 'hex');
  return cipher.final('hex');
}
