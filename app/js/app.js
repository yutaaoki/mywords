'use strict';


// Declare app level module which depends on filters, and services
angular.module('myWordsApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myWordsApp.directives',
  'myWordsApp.controllers',
  'myWordsApp.config',
  'ezfb'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/cloud/:user', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).config(['ezfbProvider', 'CONF', function (ezfbProvider, CONF) {
  ezfbProvider.setInitParams({
    appId: CONF.appId
  });
}]);
