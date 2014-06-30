'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])

.controller('MainCtrl', ['$scope','$log', 'ezfb', '$routeParams', function($scope, $log, ezfb, $routeParams) {

  //Set 'me' if empty
  var user = $routeParams.user || 'me';

  updateLoginStatus(updateWordList);

  $scope.login = function () {
    // Calling FB.login with required permissions specified
    ezfb.login(function (res) {
       // no manual $scope.$apply, I got that handled
      if (res.authResponse) {
        updateLoginStatus(updateWordList);
      }
    }, {scope: 'email,user_likes,read_mailbox'});
  };

  $scope.logout = function () {
     // Calling FB.logout
    ezfb.logout(function () {
      updateLoginStatus(updateWordList);
    });
  };

  /**
   * For generating better looking JSON results
   */
  var autoToJSON = ['loginStatus', 'apiMe']; 
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });
  
  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;
      (more || angular.noop)();
    });
  }

  // Update list
  function updateWordList(){

    // API calls
    ezfb.api('/'+user, function(res){
      var user_id = userCallback(res);
      ezfb.api('/me/inbox', function(res){
        $log.log(res);
        var threads = inboxCallback(res, user_id);
        $log.log(threads);
      });
    });

    // Get the user ID and save
    function userCallback (res) {
      return res.id;
    };

    // Return an array of thread ids
    function inboxCallback (res, user_id) {
      // Filter out irrelevalent threads
      var userThreads = res.data.filter(function(e){
        if(e.to && e.to.data){
          var userData = e.to.data.filter(function(e){return e.id == user_id});
          return userData.length > 0;
        }
        return false;
      });
      return userThreads.map(function(e){return e.id});
    };
  }

  function getComments(res, text){
    // No more pages
    if(!res.data.id){
      return text;
    }

  }

  function messageString(res){
    // Filter out undifined entries
    var clean_coms = res.data.filter(function(e){return e.comments});
    var com_arrays = clean_coms.map(function(e){return e.comments.data});
    //$log.log($scope.user_id);
    var message_string_array = com_arrays.map(function(com_array){
      //$log.log(com_array);
      var clean_array = com_array.filter(function(obj){return obj.message && obj.from && obj.from.id &&  obj.from.id == $scope.user_id});
      //$log.log(clean_array);
      var message_array = clean_array.map(function(obj){return obj.message});
      //$log.log(message_array);
      return message_array.reduce(function(all, st){
        return all + " " + st;
      });
    });
    var message_string = message_string_array.reduce(function(all, st){
      return all + " " + st;
    });

    //Calculate frequencies
    //var message_string = messageString(res);
    //var wordfreq = WordFreq({workerUrl : 'lib/wordfreq/src/wordfreq.worker.js'}).process(message_string, function (list){
     //// $scope.wordList = list;
     // $scope.$apply();
    //})
    return message_string;
  }

}]);
