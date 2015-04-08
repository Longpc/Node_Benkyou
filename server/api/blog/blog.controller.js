'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');
var fs = require('fs')
var Blog = require('./blog.model');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    return res.json(blog);
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

// Updates an existing blog in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Blog.findById(req.params.id, function (err, blog) {
    if (err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    var updated = _.merge(blog, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, blog);
    });
  });
};

// Deletes a blog from the DB.
exports.destroy = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    blog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
