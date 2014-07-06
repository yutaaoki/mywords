'use strict';

// Controllers
angular.module('myWordsApp.controllers', [])

//** Login page **//
.controller('LoginCtrl', ['$scope','$log', 'ezfb', '$location', function($scope, $log, ezfb, $location) {

  // Redirect if connected
  var updateLoginStatus = function () {
    ezfb.getLoginStatus(function (res) {
      if(res.status == 'connected'){
        $location.path('/');
        $location.replace();
      }
    });
  }

  // Login button
  $scope.login = function () {
    // Calling FB.login with required permissions specified
    ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus();
      }
    }, {scope: 'email,user_likes,read_mailbox'});
  };

  // Update status on loading
  updateLoginStatus();
}])


//** Main page (word cloud) **//
.controller('MainCtrl', ['$scope','$log', 'ezfb', '$routeParams', '$location', '$http', 'CONF', function($scope, $log, ezfb, $routeParams, $location, $http, CONF) {

  //Set 'me' if empty
  var user = $routeParams.user || 'me';
  var meId;

  // Callback: redirect if not logged in
  var checkLoginCB = function(res){
    if(res.status != 'connected'){
      $location.path('/login');
      $location.replace();
      return false;
    }
    return true;
  };

  // Callback: remember the user id
  var setMeIdCB = function(me){
    $scope.meId = me.id;
    meId = me.id;
  };

  // Callback: make wordfreq list and set it
  var setFreqListCB = function(data){

    // Additional options
    var options = {
      workerUrl: 'lib/wordfreq/src/wordfreq.worker.js',
      filterSubstring: true,
      minimumCount: 4,
      stopWords: ['im', 'do']
    };

    // Analyse the text and make a frequency list
    WordFreq(options)
      .process(data.data, function (list){
        $scope.freqList = list;
        // Notify the word cloud watcher
        $scope.$apply();
      });
  };

  // Render the world cloud on load
  ezfb.getLoginStatus(function (res) {
    if(!checkLoginCB(res)){
      return;
    }

    // Access token to pass to the server
    var accessToken = res.authResponse.accessToken;

    // Get the user id
    ezfb.api('/me', function(me) {
      setMeIdCB(me);

      // Get the message text
      $http.get(CONF.apiUrl+'/messages/'+meId+'?access_token='+accessToken).success(function(data){
        setFreqListCB(data);
      });
    });
  });

}]);
