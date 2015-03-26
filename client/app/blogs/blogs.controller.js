'use strict';

angular.module('shufflelunchApp')
  .controller('BlogsCtrl', function ($scope,$http,$upload,socket) {
     $scope.awesomeThings = [];
      var flg = "change";
      var imageFileName;
      var formData = new FormData();
      formData.append('file1',file)

      $http.get('/api/blogs').success(function(awesomeThings) {
         $scope.awesomeThings = awesomeThings;
         socket.syncUpdates('blog', $scope.awesomeThings);
      });

      $scope.addBlog = function(){

         var date;
         date = new Date();
         var time = (date.getHours() +":"+ date.getMinutes() + ":"+ date.getSeconds());

         console.log($scope.newcal);
         console.log($scope.newThing);
         console.log(imageFileName);

         var cal = $scope.newcal;
         imageFileName = ("/assets/images/blogs/" + time + ".jpg");
         console.log(imageFileName);

         if($scope.newThing === '') {
            return;
         }
         $http.post('/api/blogs', {
            date: $scope.newcal,
            comment: $scope.newThing,
            image_path:imageFileName,
         });

         $scope.newThing = '';

      };

//追加
   $scope.upload = function($files) {
      for (var i = 0; i < $files.length; i++) {
         var file = $files[i];
         $scope.upload = $upload.upload({
            url: 'api/blogs/image', // server側API例
            file: file
         }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
         }).success(function(data, status, headers, config) {
            console.log(data);
         });
      }
   };


    /*
      $scope.$watch('files', function () {
         $scope.upload($scope.files);
      });


      $scope.upload = function (files) {
         if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
               var file = files[i];
               $upload.upload({
                  url: 'api/blogs/image',
                  fields: {'username': $scope.username},
                  file: file
               }).progress(function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
               }).success(function (data, status, headers, config) {
                  console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
               });
            }
         }
      };
*/
/*
      $scope.onFileSelect = function($files) {

         if(flg=="change"){
            console.log("ぬける");
            flg = "Img";
            return;
         }
         console.log("hoge3");
         for (var i = 0; i < $files.length; i++) {
            $scope.upload = $upload.upload({
               url: 'api/blogs/image',
               fileName: imageFileName,
               file: file,
            });
            console.log(i);
         }
         flg = "change";
         //console.log(file);
         console.log(file.lastModifiedDate);
         imageFileName = file.name;
         console.log($files);
      }
*/
      $scope.deleteThing = function(thing) {
         $http.delete('/api/blogs/' + thing._id);
      };

      $scope.$on('$destroy', function () {
         socket.unsyncUpdates('blog');
      });
  });
