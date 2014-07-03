'use strict';

describe('MainCtrl', function(){

  var scope, ezfb, ctrl, q, deferred;

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('ngRoute'));

  beforeEach(function(){

    var mockEzfb = {
      getLoginStatus: function() {
        var res = { status: 'connected' } 
        deferred = q.defer();
        deferred.resolve(res);
        return deferred.promise;
      },
      api: function(url) {
        return new Promise(function (fulfill, reject) {
          data = {'id': 'me_id'};
          fulfill(data);
        });
      }
    };

    module(function($provide) {
      $provide.value('ezfb', mockEzfb);
    });

  });

  beforeEach(inject(function($rootScope, $controller, $q, _ezfb_){
    scope = $rootScope.$new();
    q = $q;
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
    ezfb.getLoginStatus = function() {
      var res = { status: 'error'};
      deferred.resolve(res);
      return deferred.promise;
    }
    scope.$apply();
    // run the controller again
    $controller('MainCtrl', { $scope: scope });
    expect($location.path()).toBe('/login');
  }));

  it("doesn't redirect when connected", inject(function($location) {
    expect($location.path()).toBe('');
  }));

  it("returns the me data", function() {
    expect(scope.meId).toBe('me_id');
  });

});
