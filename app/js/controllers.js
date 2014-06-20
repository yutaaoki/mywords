'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])

.controller('MainCtrl', ['$scope','$log', 'ezfb', function($scope, $log, ezfb) {

  $scope.login = function () {
    // Calling FB.login with required permissions specified
    ezfb.login(function (res) {
      /**
       *        * no manual $scope.$apply, I got that handled
       *               */
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
      }
    }, {scope: 'email,user_likes'});
  };

  $scope.logout = function () {
     // Calling FB.logout
    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

}]);
