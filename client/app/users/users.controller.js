'use strict';

angular.module('shufflelunchApp')
  .service('formService', function() {
    this.formCreate = createFormParts;
  })

  .controller('UsersCtrl', function ($scope, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.user = user;

    var flg = "def";

    var date;
    date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var date_obj = new Date(year,month+1,day);

    $scope.awesomeThings = [];

    $scope.next_month = month+1;
    $scope.this_month = month;

    $http.put('api/attends/550a7025155b7def0d3378f8',{
      date: date_obj,
    });

    $http.get('/api/attends').success(function(){
    $scope.pictures = [{name:'写真1'},{name:'写真2'},{name:'写真3'}];
    });

    $http.get('/api/attends').success(function(readers){
    $scope.readers = readers;
    });

    $http.get('/api/attends').success(function(members){
    $scope.members = members;
    });


    $scope.addDate = function(){
      console.log(date);
      if(flg=="def"){
        $http.put('api/attends/550a7025155b7def0d3378f8',{
          date:'',
        });

        flg = "ch";
        //console.log("ch:不参加");
        return;
      } else  {
        $http.put('api/attends/550a7025155b7def0d3378f8',{
          date: date_obj,
        });
      }

      flg = "def";
      //console.log("def:参加");

    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('attend');
    });

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

    $scope.userLogout = function() {
      $http.post('/api/users/logout').success(function() {
         return $location.path('/');
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
