'use strict';

angular.module('shufflelunchApp')
  .controller('UsersCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  .controller('NewCtrl', function ($scope, $location, $http, socket) {
    $scope.message = 'New';
    $scope.departments = [];
    $scope.occupations = [];

    $http.get('/api/departments').success(function(departments) {
      $scope.departments = departments;
      socket.syncUpdates('departments', $scope.departments);
    });

    $http.get('/api/occupations').success(function(occupations) {
      $scope.occupations = occupations;
      socket.syncUpdates('occupations', $scope.occupations);
    });

    $scope.createUser = function() {
      if($scope.newUser === '') {
        return;
      }
      $http.post('/api/users', $scope.newUser)
        .success(function() {
          $location.path('/users');
        })
        .error(function(err) {
          if (err.code == 11000) {
            $scope.emailError = true;
          }
        });
    };

    $scope.userLogout = function() {
      $http.post('/api/users/logout').success(function() {
         $location.path('/');
      });
    };

  });
