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

.controller('MainCtrl', ['$scope','$log', 'ezfb', '$routeParams', '$location', '$http', function($scope, $log, ezfb, $routeParams, $location, $http) {

  //Set 'me' if empty
  var user = $routeParams.user || 'me';
  var meId;

  var checkLoginCB = function(res){
    if(res.status != 'connected'){
      $location.path('/login');
      $location.replace();
    }
  };

  var setMeIdCB = function(me){
    $scope.meId = me.id;
    meId = me.id;
  };

  var setFreqListCB = function(list){
    $scope.freqList = list;
  };

  // Redirect to the login page if not connected
  ezfb.getLoginStatus(function (res) {
    checkLoginCB(res);
    ezfb.api('/me', function(me) {
      setMeIdCB(me);
      $http.get('http://localhost/wordlist/'+meId).success(function(data){
        setFreqListCB(data);
      });
    });
  });

  // Get the frequency list


}]);
