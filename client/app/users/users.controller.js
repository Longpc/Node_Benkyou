'use strict';

angular.module('shufflelunchApp')
  .service('formService', function() {
    this.formCreate = createFormParts;
  })

  .controller('UsersCtrl', function ($scope, $http, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.user = user;

    // Todo: httpリクエストを投げて参加状況を取得する
    $scope.attendStatus = '参加';

    var date = new Date();
    var month = date.getMonth();
    $scope.nextMonth = month + 1;
    $scope.thisMonth = month;

    // Todo: これらの値もhttpで取得
    $scope.blogs = [{name:'写真1'},{name:'写真2'},{name:'写真3'}];
    $scope.leader = {name: 'kobayashi'};
    $scope.members = [{name:'kobayashi'},{name:'tanei'},{name:'kokubo'}];

    $scope.changeAttendStatus = function(status) {
      // Todo: httpリクエストで参加状況を変更する処理
    };

    $scope.userLogout = function() {
      $http.post('/api/users/logout').success(function() {
         return $location.path('/');
      });
    };
  })

  .controller('NewCtrl', function ($scope, $location, $http, socket, $cookieStore, formService) {
    formService.formCreate($scope, $http, socket);

    $scope.createUser = function() {
      if ($scope.newUser === '') { return; }
      if ($scope.newUser.password != $scope.confirm) { return $scope.wrongPassword = true; }
      $scope.wrongPassword = false;

      $http.post('/api/users', $scope.newUser)
        .success(function(user) {
          if (user == 'email_duplicated') {
            return $scope.emailDuplicated = true;
          }

          delete user['password'];
          $cookieStore.put('user', user)
          return $location.path('/users');
        });
    };
  })

  .controller('EditCtrl', function($scope, $location, $http, socket, $cookieStore, formService) {
    formService.formCreate($scope, $http, socket);

    var user = $cookieStore.get('user');
    $scope.loginUser = user;

    $scope.updateUser = function() {
      if ($scope.updateUser === '') {
        return;
      }
      $http.put('/api/users/' + user['_id'], $scope.loginUser)
        .success(function(user) {
          if (user == 'wrong_password') {
            return $scope.wrongPassword = true;
          }
          delete user['password'];
          $cookieStore.put('user', user)
          return $location.path('/users');
        });
    };
  });

var createFormParts = function($scope, $http, socket) {
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

    return;
};
