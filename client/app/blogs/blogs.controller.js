'use strict';

angular.module('shufflelunchApp')
  .controller('BlogsCtrl', function ($scope, $http, socket, $location) {
    $scope.datePickerOpen = false;

    $scope.toggleDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickerOpen = !$scope.datePickerOpen;
    };

  });
