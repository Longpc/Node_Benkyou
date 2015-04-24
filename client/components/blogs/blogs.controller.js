'use strict';

angular.module('shufflelunchApp')
  .controller('BlogListsCtrl', ['$scope', '$modal', '$rootScope', '$http', '$location', function ($scope, $modal, $rootScope, $http, $location) {
    var modalInstance;

    $http.get('/api/blogs').success(function(blogs) {
      $scope.blogs = blogs;
    });

    $scope.showBlogDetail = function(blog) {
      $scope.targetBlog = blog;
      modalInstance = $modal.open({
        templateUrl: 'modal-template.html',
        scope: $scope
      });
    };

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (modalInstance) {
        modalInstance.dismiss();
      }
    });
  }]);
