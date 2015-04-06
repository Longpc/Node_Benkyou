'use strict';

angular.module('shufflelunchApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'プロフィール編集',
      'link': '/users/edit'
    }, {
      'title': 'ログアウト',
      'link': '/users/logout'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
