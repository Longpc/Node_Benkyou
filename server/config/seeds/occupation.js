var Occupation = require('../../api/occupation/occupation.model');
var config = require('../environment');

Occupation.find({}).remove(function() {
  config.occupation.forEach(function(oc) {
    Occupation.create({
      name: oc.name,
      english_name: oc.english_name,
    });
  })
});
