/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Attend = require('./attend.model');

exports.register = function(socket) {
  Attend.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Attend.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('attend:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('attend:remove', doc);
}