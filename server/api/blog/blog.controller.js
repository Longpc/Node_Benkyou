'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');
var fs = require('fs')
var config = require('../../config/environment/');
var Puid = require('puid');
var Blog = require('./blog.model');
var AppController = require('../app/app.controller');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find()
    .populate('user_id', 'name')
    .sort({ created_at: -1 }).limit(10)
    .exec(function (err, blogs) {
      if(err) { return AppController.prototype.handleError(res, err, req.body); }
      return res.json(200, AppController.prototype.makeResData(blogs, req.body));
    });
};

// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id)
    .populate('user_id', 'name')
    .exec(function (err, blog) {
      if(err) { return AppController.prototype.handleError(res, err, req.body); }
      if(!blog) { return res.json(404, AppController.prototype.makeResData({result: config.api.result.error}, req.body)); }
      var data = {
        result: config.api.result.success,
        blog: blog
      };
      return res.json(200, AppController.prototype.makeResData(data, req.body));
    });
};

// Creates a new blog in the DB.
exports.create = function(req, res) {
  // sessionがない場合はtopにredirect
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
  var data = AppController.prototype.receiveReqData(req.body);
  var puid = new Puid('sl');
  var filename = puid.generate();
  var buffer = new Buffer(data.file, 'base64')

  fs.writeFile('client/assets/images/blogs/' + filename, buffer, function(err, str) {
    if (err) { console.log(err); }
    data.image_path = '/assets/images/blogs/' + filename;
    Blog.create(data, function(err, blog) {
      if (err) { console.log(err); }
      var result = {
        result: config.api.result.success,
        blog: blog
      };
      return res.json(201, AppController.prototype.makeResData(result, req.body));
    });
  });
};
