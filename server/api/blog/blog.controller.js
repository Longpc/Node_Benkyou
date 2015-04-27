'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');
var fs = require('fs')
var Puid = require('puid');
var config = require('../../config/environment/');
var App = require('../app/app.model');
var Blog = require('./blog.model');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find()
    .populate('user_id', 'name')
    .exec(function (err, blogs) {
      if(err) { return handleError(res, err, req.body); }
      return res.json(200, App.makeResData(blogs, req.body));
    });
};

// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id)
    .populate('user_id', 'name')
    .exec(function (err, blog) {
      if(err) { return handleError(res, err, req.body); }
      if(!blog) { return res.json(404, App.makeResData({result: config.api.result.error}, req.body)); }
      var data = {
        result: config.api.result.success,
        blog: blog
      };
      return res.json(200, App.makeResData(data, req.body));
    });
};

// Creates a new blog in the DB.
exports.create = function(req, res) {
  if (!req.session.user) { return res.redirect('/'); }
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (err) { return res.redirect('/users'); }

    files.file.forEach(function(file) {
      var dir = file.path.split('/');
      var filename = dir[dir.length - 1];
      var newPath = 'client/assets/images/blogs/' + filename;

      fs.rename(file.path, newPath, function(err) {
        if (err) { return res.redirect('/users'); }

        var blogData = {
          date: fields.date,
          place: fields.place,
          member: fields.member,
          comment: fields.comment,
          image_path: '/assets/images/blogs/' + filename,
          user_id: req.session.user._id
        };

        Blog.create(blogData, function(err, blog) {
          if (err) { return res.redirect('/users'); }
          return res.redirect('/users');
        });
      });
    });
  });
};

exports.createNative = function(req, res) {
  var data = App.receiveReqData(req.body);
  var puid = new Puid('sl');
  var filename = puid.generate();

  var buffer = new Buffer(data.file, 'base64')
  fs.writeFile('client/assets/images/blogs/' + filename, buffer, function(err, str) {
    if (err) { console.log(err); }
    data.file = '/assets/images/blogs/' + filename;
    Blog.create(data, function(err, blog) {
      if (err) { console.log(err); }
      return res.json(201, App.makeResData(data, req.body));
    });
  });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, config.api.code.error));
}
