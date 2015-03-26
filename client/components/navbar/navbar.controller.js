'use strict';

angular.module('shufflelunchApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu1 = [{
      'title': 'プロフィール編集',
      'link': '/'
    }];
    $scope.menu2 = [{
      'title': 'ログアウト',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
