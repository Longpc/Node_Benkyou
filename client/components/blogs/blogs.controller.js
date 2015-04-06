'use strict';

angular.module('shufflelunchApp')
  .controller('BlogsCtrl', function ($scope, $http, $location) {
    // Todo: httpリクエストを投げてブログ一覧を取得する
    $scope.blogs = [{name:'写真1'},{name:'写真2'},{name:'写真3'}];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
