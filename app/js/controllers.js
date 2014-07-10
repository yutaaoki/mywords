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
  var friendId = $routeParams.friend
  var meId, meName;

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
    meName = me.name;
  };

  // Callback: get friend's name
  var setFriendNameCB = function(friend){
    $scope.name1 = friend.name;
    $scope.id1 = friend.id;
  }

  // Callback: make the frequency list and set it
  var setFreqListCB = function(data, userId, listName){
    // Analyse the text and make a frequency list
    WordFreq(CONF.options)
      .process(data[userId], function (list){
        $scope[listName] = list;
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
      if(friendId){
        $http.get(CONF.apiUrl+'/messages/me/'+friendId+'?access_token='+accessToken).success(function(data){
          setFreqListCB(data, friendId, 'list1');
          setFreqListCB(data, meId, 'list2');
          $scope.name2 = meName;
          $scope.id2 = meId;
          ezfb.api(friendId, function(friend){
            setFriendNameCB(friend);
          });
        });
      }
      else{
        $http.get(CONF.apiUrl+'/messages/me?access_token='+accessToken).success(function(data){
          setFreqListCB(data, meId, 'list1');
          $scope.name1 = meName;
        });
      }
      
    });
  });

}])


//** Friends Controller **//
.controller('FriendsCtrl', ['$scope','$log', 'ezfb', '$location', '$http', 'CONF', function($scope, $log, ezfb, $location, $http, CONF) {

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
  };

  // Callback: get friend list
  var setFriendListCB = function (data) {
    $scope.friendList = data;
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
    if(!checkLoginCB(res)){
      return;
    }
      setMeIdCB(me);
      // Get the message friend list
      $http.get(CONF.apiUrl+'/friends/me?access_token='+accessToken).success(function(data){
        setFriendListCB(data);
      });
    });
  });

}]);
