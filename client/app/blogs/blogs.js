'use strict';

angular.module('shufflelunchApp')
  .config(function ($routeProvider) {
    var requireAuth = {
      login: function($q, $location, $http, $cookieStore) {
        if ($cookieStore.get('user')) return true;
        $http.post('/api/users/islogged').success(function(user) {
          if (user == '') {
            $location.path('/');
            return $q.reject();
          }
          delete user['password'];
          return $cookieStore.put('user', user);
        })
      }
    };

    $routeProvider
      .when('/blogs', {
        templateUrl: 'app/blogs/blogs.html',
        controller: 'BlogsCtrl',
        resolve: requireAuth
      });
  });
