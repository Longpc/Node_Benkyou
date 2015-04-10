var Attend = require('../../api/attend/attend.model');

Attend.find({}).remove(function() {
  Attend.create({
    name : 'leader',
    info : 'leader'
  }, {
    name : 'member1',
    info : 'member'
  }, {
    name : 'member2',
    info : 'member'
  });
});
