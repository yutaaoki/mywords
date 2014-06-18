'use strict';


// Declare app level module which depends on filters, and services
angular.module('myWordsApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myWordsApp.directives',
  'myWordsApp.controllers',
  'facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).
config(['FacebookProvider', function(FacebookProvider) {
// Here you could set your appId through the setAppId method and then initialize
// or use the shortcut in the initialize method directly.
  FacebookProvider.init('799054146793763');
}]);
