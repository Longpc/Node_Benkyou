var Department = require('../../api/department/department.model');
var config = require('../environment');

Department.find({}).remove(function() {
  config.department.forEach(function(depart) {
    Department.create({
      name : depart.name,
      english_name : depart.english_name
    });
  })
});
