'use strict';

angular.module('shufflelunchApp')
  .controller('MainCtrl', function ($scope, $location, $http, $cookieStore) {
    $scope.awesomeThings = [];

    $http.get('/api/things/flow').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.userLogin = function() {
      $http.post('/api/users/login', { email: $scope.email, password: $scope.password }).success(function(user) {
        if (user != '') {
          delete user['password'];
          $cookieStore.put('user', user);
          return $location.path('/users');
        } else {
          $scope.loginFailed = true;
          return $scope.password = '';
        }
      });
    };
  });
