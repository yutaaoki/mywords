'use strict';

//LoginCtrl test
describe('LoginCtrl', function(){

  var scope, ezfb, ctrl, conf;

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('ngRoute'));
  beforeEach(function(){
    module(function($provide){
      ezfb = {};
      $provide.value('ezfb', ezfb);
    });
  });

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
  }));

  it('redirect to main page when connected', inject(function($controller, $location) {
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'connected'
      }
      c(res);
    }
    ctrl = $controller('LoginCtrl', {$scope: scope});
    expect($location.path()).toBe('/');
  }));

  it("doesn't redirect when not connected", inject(function($controller, $location) {
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'not connected'
      }
      c(res);
    }
    ctrl = $controller('LoginCtrl', {$scope: scope});
    expect($location.path()).toBe('');
  }));

})
