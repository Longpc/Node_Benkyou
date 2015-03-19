'use strict';

angular.module('shufflelunchApp')
  .controller('MainCtrl', function ($scope, $location, $http, socket, $cookieStore) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
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

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
