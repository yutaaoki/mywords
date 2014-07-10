'use strict';

// Declare app
angular.module('myWordsApp', [
  'ngRoute',
  'myWordsApp.directives',
  'myWordsApp.controllers',
  'myWordsApp.config',
  'ezfb'
])

// App config
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/friends', {templateUrl: 'partials/friends.html', controller: 'FriendsCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/:friend', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}])

// ezfb config
.config(['ezfbProvider', 'CONF', function (ezfbProvider, CONF) {
  ezfbProvider.setInitParams({
    appId: CONF.appId
  });
}]);
