'use strict';

angular.module('shufflelunchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/new', {
        templateUrl: 'app/users/new.html',
        controller: 'NewCtrl'
      });
  });
