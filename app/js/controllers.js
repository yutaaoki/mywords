'use strict';

/* Controllers */

angular.module('myWordsApp.controllers', [])

.controller('MainCtrl', ['$scope','$log', 'ezfb', function($scope, $log, ezfb) {

  $scope.login = function () {
    // Calling FB.login with required permissions specified
    ezfb.login(function (res) {
      /**
       *        * no manual $scope.$apply, I got that handled
       *               */
      if (res.authResponse) {
        updateLoginStatus(updateWordList);
      }
    }, {scope: 'email,user_likes,read_mailbox'});
  };

  $scope.logout = function () {
     // Calling FB.logout
    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

  $scope.share = function () {
    ezfb.ui(
      {
        method: 'feed',
        name: 'angular-easyfb API demo',
        picture: 'http://plnkr.co/img/plunker.png',
        link: 'http://plnkr.co/edit/qclqht?p=preview',
        description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' + 
                     ' Facebook integration in AngularJS made easy!' + 
                     ' Please try it and feel free to give feedbacks.'
      },
      function (res) {
        // res: FB.ui response
      }
    );
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

    // Get the user ID and save
    ezfb.api('/me', getId);
    function getId (res) {
      var me_id = res.id;
      $scope.me_id = me_id;
      ezfb.api('/me/inbox', inbox);
    };

    // Make a single string from the messages
    function inbox (res) {
      // Filter out undifined entries
      var clean_coms = res.data.filter(function(e){return e.comments});
      var com_arrays = clean_coms.map(function(e){return e.comments.data});
      //$log.log($scope.me_id);
      var message_string_array = com_arrays.map(function(com_array){
        //$log.log(com_array);
        var clean_array = com_array.filter(function(obj){return obj.message && obj.from && obj.from.id &&  obj.from.id == $scope.me_id});
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
      //$log.log(message_string);
      //Calculate frequencies
      var wordfreq = WordFreq({workerUrl : 'lib/wordfreq/src/wordfreq.worker.js'}).process(message_string, function (list){
        $scope.wordList = list;
        $scope.$apply();
      });
    };

  }

  /**
   * Update api('/me') result
   */
  function updateApiMe () {
    ezfb.api('/me', apiMe);
    function apime (res) {
      $scope.apime = res;
      $log.log(res);
    };
    $log.log('res1'+$scope.apiMe);
  }

}]);
