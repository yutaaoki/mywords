'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])

.controller('LoginCtrl', ['$scope','$log', 'ezfb', function($scope, $log, ezfb) {
  updateLoginStatus();
  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginstatus = res;
      (more || angular.noop)();
    });
  }
  $scope.login = function () {
    // Calling FB.login with required permissions specified
    ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus(updateWordList);
      }
    }, {scope: 'email,user_likes,read_mailbox'});
  };
  
  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginstatus = res;
      (more || angular.noop)();
    });
  }
}])

.controller('MainCtrl', ['$scope','$log', 'ezfb', '$routeParams', '$location', function($scope, $log, ezfb, $routeParams, $location) {

  //Set 'me' if empty
  var user = $routeParams.user || 'me';

  // Redirect to the login page if not connected
  ezfb.getLoginStatus(function (res) {
    if(res.status != 'connected'){
      $location.path('/login');
      $location.replace();
    }
  });

}]);
