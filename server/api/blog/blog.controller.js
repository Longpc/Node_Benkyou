'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');
var fs = require('fs')
var App = require('../app/app.model');
var Blog = require('./blog.model');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find()
    .populate('user_id', 'name')
    .exec(function (err, blogs) {
      if(err) { return handleError(res, err, req.body); }
      return res.json(200, App.makeResData(blogs, req.body, 0));
    });
};

// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id)
    .populate('user_id', 'name')
    .exec(function (err, blog) {
      if(err) { return handleError(res, err, req.body); }
      if(!blog) { return res.json(404, App.makeResData({result: 0})); }
      var data = {
        result: 1,
        blog: blog
      };
      return res.json(200, App.makeResData(data, req.body, 0));
    });
};

// Creates a new blog in the DB.
exports.create = function(req, res) {
  if (!req.session.user) { return res.status(401).redirect('/'); }
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (err) { return res.status(500).redirect('/users'); }

    files.file.forEach(function(file) {
      var dir = file.path.split('/');
      var filename = dir[dir.length - 1];
      var newPath = 'client/assets/images/blogs/' + filename;

      fs.rename(file.path, newPath, function(err) {
        if (err) { return res.status(500).redirect('/users'); }

        var blogData = {
          date: fields.date,
          place: fields.place,
          member: fields.member,
          comment: fields.comment,
          image_path: '/assets/images/blogs/' + filename,
          user_id: req.session.user._id
        };

        Blog.create(blogData, function(err, blog) {
          if (err) { return res.status(500).redirect('/users'); }
          // return res.redirect(201, '/users');
          return res.status(201).redirect('/users');
        });
      });
    });
  });
};

function handleError(res, err, reqBody) {
  return res.json(500, App.makeResData(err, reqBody, 1));
}
