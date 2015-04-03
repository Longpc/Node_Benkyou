'use strict';

angular.module('shufflelunchApp')
  .controller('BlogsCtrl', function ($scope, $http, socket, $location) {
    $scope.awesomeThings = [];

    $http.get('/api/blogs').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('blog', $scope.awesomeThings);
    });

    $scope.uploadComplete = function(content) {
      if ($scope.newBlog === '') { return; }
      $scope.newBlog = '';
      return $location.path('/');
    };
  });
