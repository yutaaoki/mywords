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
    ezfb.api('/me/inbox', inbox);
    function inbox (res) {
      var coms = res.data.map( function(item) {
        if(item.comments){
          return item.comments.data; 
        }
      });
      $log.log(coms);
    };
  }

  /**
   * Update api('/me') result
   */
  function updateApiMe () {
    ezfb.api('/me', apiMe);
    function apiMe (res) {
      $scope.apiMe = res;
      $log.log(res);
    };
    $log.log('res1'+$scope.apiMe);
  }

}]);
