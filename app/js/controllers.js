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

.controller('MainCtrl', ['$scope','$log', 'ezfb', '$routeParams', '$location', '$http',  function($scope, $log, ezfb, $routeParams, $location, $http) {

  //Set 'me' if empty
  var user = $routeParams.user || 'me';
  var meId;

  // Redirect to the login page if not connected
  ezfb.getLoginStatus()
  .then(function (res) {
    if(res.status != 'connected'){
      $location.path('/login');
      $location.replace();
    }
    return ezfb.api('/me');
  })
  // Get the user id
  .then(function (me) {
    meId = me.id;
    $scope.meId = meId;
    return $http.get('http://localhost/wordlist/'+meId).success;
  })
  // Get the frequency list
  .then(function (data) {
    $scope.frequencyList = data;
  });

}]);
