'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){

  var $scope, mockEzfb;

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('ngRoute'));

  beforeEach(function(){

    mockEzfb = {
      getLoginStatus: function(callback){
        var res = {
          status: 'connected'
        }
        callback(res);
      },
      name: function(){
        return 'hello';
      }
    };

    module(function($provide){
      $provide.value('ezfb', mockEzfb);
    });
  });



  it('creates defined controller', inject(function($controller) {
    //spec body
    var mainCtrl = $controller('MainCtrl', { $scope: {} });
    expect(mainCtrl).toBeDefined();
  }));

  it('returns the login status as connected', inject(function($controller, ezfb, $log) {
    //spec body
    var mainCtrl = $controller('MainCtrl', { $scope: {} });
    $log.log(ezfb);
    expect(ezfb.name()).toBe('hello');
  }));

  it('return the location', inject(function($controller, ezfb, $location) {
    //spec body
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'connected'
      }
      c(res);
    }
    var mainCtrl = $controller('MainCtrl', { $scope: {} });
    expect($location.path()).toBe('');
  }));

});
