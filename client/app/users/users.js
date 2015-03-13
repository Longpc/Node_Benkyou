'use strict';

angular.module('shufflelunchApp')
  .config(function ($routeProvider) {
    var requireAuth = {
      login: function($q, $location, $http) {
        $http.post('/api/users/islogged').success(function(data) {
          if (data == '') {
            $location.path('/');
            return $q.reject();
          }
        })
      }
    };

    $routeProvider
      .when('/users', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl',
        resolve: requireAuth
      })
      .when('/users/new', {
        templateUrl: 'app/users/new.html',
        controller: 'NewCtrl'
      });
  });
