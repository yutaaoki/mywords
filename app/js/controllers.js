'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])
  .controller('MainCtrl', ['$scope','$log', 'Facebook', function($scope, $log, Facebook) {

    $log.log('main ctrl');

    // here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
      return Facebook.isready(); // this is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newval) {
      $scope.facebookReady = true; // you might want to use this to disable/show/hide buttons and else
    });

    // from now on you can use the Facebook service just as Facebook api says
    // take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
    $scope.login = function() {
      Facebook.login(function(response) {
        // do something with response. don't forget here you are on Facebook scope so use $scope.$apply
      });
    };

    $scope.getloginstatus = function() {
      Facebook.getloginstatus(function(response) {
        if(response.status == 'connected') {
          $scope.$apply(function() {
            $scope.loggedin = true;
          });
        }
        else {
          $scope.$apply(function() {
            $scope.loggedin = false;
          });
        }
      });

      $scope.me = function() {
        Facebook.api('/me', function(response) {
          $scope.$apply(function() {
            // here you could re-check for user status (just in case)
            $scope.user = response;
          });
        });
      };
    }; 

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }])
  .controller('authenticationCtrl', ['$scope', 'Facebook', '$log', function($scope, Facebook, $log) {

    $log.log('auth ctrl');

    // here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
      return Facebook.isready(); // this is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newval) {
      $scope.facebookReady = true; // you might want to use this to disable/show/hide buttons and else
    });

    // from now on you can use the Facebook service just as Facebook api says
    // take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
    $scope.login = function() {
      Facebook.login(function(response) {
        // do something with response. don't forget here you are on Facebook scope so use $scope.$apply
      });
    };

    $scope.getloginstatus = function() {
      Facebook.getloginstatus(function(response) {
        if(response.status == 'connected') {
          $scope.$apply(function() {
            $scope.loggedin = true;
          });
        }
        else {
          $scope.$apply(function() {
            $scope.loggedin = false;
          });
        }
      });

      $scope.me = function() {
        Facebook.api('/me', function(response) {
          $scope.$apply(function() {
            // here you could re-check for user status (just in case)
            $scope.user = response;
          });
        });
      };
    }; 
  }]);
