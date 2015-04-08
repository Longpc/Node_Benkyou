'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  place: String,
  date: String,
  comment: String,
  image_path: String,
  user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Blog', BlogSchema);
