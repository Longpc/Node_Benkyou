'use strict';

angular.module('shufflelunchApp')
  .controller('BlogListsCtrl', function ($scope, $http, $location) {
    $http.get('/api/blogs').success(function(blogs) {
      $scope.blogs = blogs;
    });
  });
