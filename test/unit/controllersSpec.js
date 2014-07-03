'use strict';

describe('MainCtrl', function(){

  var scope, ezfb, ctrl;

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('ngRoute'));

  beforeEach(function(){

    var mockEzfb = {
      getLoginStatus: function(callback){
        var res = {
          status: 'connected'
        }
        callback(res);
      }
    };

    module(function($provide){
      $provide.value('ezfb', mockEzfb);
    });
  });

  beforeEach(inject(function($rootScope, $controller, _ezfb_){
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
    ezfb = _ezfb_;
  }));

  // Tests //
  ///////////

  it('has a valid controller', function() {
    expect(ctrl).toBeDefined();
  });

  it('redirects to "login" when not connected', inject(function($controller, $location) {
    // user is not logged in
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'error'
      }
      c(res);
    }
    // run the controller again
    $controller('MainCtrl', { $scope: scope });
    expect($location.path()).toBe('/login');
  }));

  it("doesn't redirect when connected", inject(function($location) {
    expect($location.path()).toBe('');
  }));

});
