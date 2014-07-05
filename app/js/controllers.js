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
      return false;
    }
    return true;
  };

  // Remember the user id
  var setMeIdCB = function(me){
    $scope.meId = me.id;
    meId = me.id;
  };

  // Make wordfreq list and set it
  var setFreqListCB = function(data){
    var options = {
      workerUrl: 'lib/wordfreq/src/wordfreq.worker.js',
      filterSubstring: true,
      minimumCount: 4
    };
    WordFreq(options)
      .process(data.data, function (list){
        $scope.freqList = list;
        $scope.$apply();
      });
  };

  // Get text and make a freq list
  ezfb.getLoginStatus(function (res) {
    if(!checkLoginCB(res)){
      return;
    }
    var accessToken = res.authResponse.accessToken;
    ezfb.api('/me', function(me) {
      setMeIdCB(me);
      $http.get('http://mywords.yutaaoki.com/messages/'+meId+'?access_token='+accessToken).success(function(data){
        setFreqListCB(data);
      });
    });
  });

  // Get the frequency list


}]);
