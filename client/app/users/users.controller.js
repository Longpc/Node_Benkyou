'use strict';

angular.module('shufflelunchApp')
  .service('formService', function() {
    this.formCreate = createFormParts;
  })

  .controller('UsersCtrl', function ($scope, $http, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.user = user;

    var date = new Date();
    var month = date.getMonth();
    $scope.nextMonth = month + 2;
    $scope.thisMonth = month + 1;
    $scope.isLeader = false;

    $http.get('/api/attends/' + user._id).success(function (status) {
      if (status.result == 1) {
        $scope.attendStatus = '参加';
        $scope.statusValue = 1;
        $scope.changeBtnClass = 'btn-danger';
      } else {
        $scope.attendStatus = '不参加';
        $scope.statusValue = 2;
        $scope.changeBtnClass = 'btn-info';
      }
    });

    $http.get('/api/groups', {params: {user_id: user._id}}).success(function (group) {
      if (!group) {
        $scope.belongGroup = false;
      } else {
        $scope.belongGroup = true;
        $scope.leader = group.leader_id;
        $scope.members = group.user_ids;
        if (group.leader_id._id == user._id) { $scope.isLeader = true; }
      }
    });

    $scope.changeAttendStatus = function() {
      var data = {
        user_id: user._id,
        status: $scope.statusValue
      };
      $http.post('/api/attends', data).success(function(beforeStatus) {
        if (beforeStatus.result == 1) {
          $scope.attendStatus = '不参加';
          $scope.statusValue = 2;
          $scope.changeBtnClass = 'btn-info';
        } else {
          $scope.attendStatus = '参加';
          $scope.statusValue = 1;
          $scope.changeBtnClass = 'btn-danger';
        }
      });
    };
  })

  .controller('NewCtrl', function ($scope, $location, $http, socket, $cookieStore, formService) {
    formService.formCreate($scope, $http, socket);

    $scope.createUser = function() {
      if ($scope.newUser === '') { return; }
      if ($scope.newUser.password != $scope.confirm) { return $scope.wrongPassword = true; }
      $scope.wrongPassword = false;

      $http.post('/api/users', {'user': $scope.newUser})
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
      $http.put('/api/users/' + user._id, $scope.loginUser)
        .success(function(user) {
          if (user == 'wrong_password') {
            return $scope.wrongPassword = true;
          }
          delete user['password'];
          $cookieStore.put('user', user)
          return $location.path('/users');
        });
    };
  })

  .controller('LogoutCtrl', function($scope, $location, $http, $cookieStore) {
    var user = $cookieStore.get('user');
    $http.post('/api/users/logout').success(function(response) {
      $cookieStore.remove('user');
      return $location.path('/');
    });
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
