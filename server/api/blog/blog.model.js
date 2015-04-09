'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  place: String,
  date: String,
  member: String,
  comment: String,
  image_path: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', BlogSchema);
