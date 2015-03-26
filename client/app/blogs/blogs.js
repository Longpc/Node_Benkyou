'use strict';

angular.module('shufflelunchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/blogs', {
        templateUrl: 'app/blogs/blogs.html',
        controller: 'BlogsCtrl'
      });
  });
