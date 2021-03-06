'use strict';

angular.module('shufflelunchApp')
  .controller('MainCtrl', ['$scope', '$location', '$http', '$cookieStore', function ($scope, $location, $http, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.awesomeThings = [];
    $scope.isLogged = (user) ? true : false;

    $http.get('/api/things/flow').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.userLogin = function() {
      $http.post('/api/users/login', { email: $scope.email, password: $scope.password }).success(function(data) {
        if (data.result === '1') {
          delete data.user.password;
          $cookieStore.put('user', data.user);
          return $location.path('/users');
        } else {
          $scope.loginFailed = true;
          return $scope.password = '';
        }
      });
    };
  }]);
