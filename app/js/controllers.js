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

  // Redirect if not logged in
  var checkLoginCB = function(res){
    if(res.status != 'connected'){
      $location.path('/login');
      $location.replace();
    }
  };

  // Remember the user id
  var setMeIdCB = function(me){
    $scope.meId = me.id;
    meId = me.id;
  };

  var setFreqListCB = function(list){
    $scope.freqList = list;
  };

  // Get text and make a freq list
  ezfb.getLoginStatus(function (res) {
    checkLoginCB(res);
    ezfb.api('/me', function(me) {
      setMeIdCB(me);
      $http.get('http://devaoki2.ubicast.com:9292/messages/'+meId+'?access_token='+res.accessToken).success(function(data){
        setFreqListCB(data);
      });
    });
  });

  // Get the frequency list


}]);
