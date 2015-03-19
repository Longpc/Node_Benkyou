'use strict';

angular.module('shufflelunchApp')
  .config(function ($routeProvider) {
    var requireAuth = {
      login: function($q, $location, $http, $cookieStore) {
        $http.post('/api/users/islogged').success(function(user) {
          if (user == '') {
            $location.path('/');
            return $q.reject();
          }
          delete user['password'];
          return $cookieStore.put('user', user);
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
      })
      .when('/users/edit', {
        templateUrl: 'app/users/edit.html',
        controller: 'EditCtrl',
        resolve: requireAuth
      });
  });
