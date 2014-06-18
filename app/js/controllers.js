'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])
  .controller('MainCtrl', ['$scope', function($scope) {
      //WordCloud($('#main_canvas'), { list: [['love', 20], ['hate',10]]});
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }])
  .controller('authenticationCtrl', ['$scope', 'Facebook', function($scope, Facebook, $log) {

  // Here, usually you should watch for when Facebook is ready and loaded
  $scope.$watch(function() {
    return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
  }, function(newVal) {
    $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
  });

  // From now on you can use the Facebook service just as Facebook api says
  // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
  $scope.login = function() {
    Facebook.login(function(response) {
      // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
    });
  };

  $scope.getLoginStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status == 'connected') {
        $scope.$apply(function() {
          $scope.loggedIn = true;
        });
      }
      else {
        $scope.$apply(function() {
          $scope.loggedIn = false;
        });
      }
    });

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.$apply(function() {
          // Here you could re-check for user status (just in case)
          $scope.user = response;
        });
      });
    };
  }; 
}]);
