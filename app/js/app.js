'use strict';


// Declare app level module which depends on filters, and services
angular.module('myWordsApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myWordsApp.directives',
  'myWordsApp.controllers',
  'ezfb'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/cloud/:user', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '799054146793763'
  });
});
