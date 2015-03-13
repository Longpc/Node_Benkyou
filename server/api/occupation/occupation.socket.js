/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Occupation = require('./occupation.model');

exports.register = function(socket) {
  Occupation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Occupation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('occupation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('occupation:remove', doc);
}