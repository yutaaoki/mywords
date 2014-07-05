'use strict';

// MainCtrl test
describe('MainCtrl', function(){

  var scope, ezfb, ctrl, $httpBackend;
  var meId = '10204429438402257'; 
  var messageRes = {"data":" love love love hate hate love hate hate love love love "}

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('ngRoute'));

  beforeEach(function(){

    var mockEzfb = {
      getLoginStatus: function(callback){
        var res = {
          status: 'connected'
        }
        callback(res);
      },
      api: function(url, callback){
        var data = {'id': meId};
        callback(data);
      }
    };

    module(function($provide){
      $provide.value('ezfb', mockEzfb);
    });

  });

  beforeEach(inject(function($rootScope, $controller, _ezfb_, _$httpBackend_){
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
    ezfb = _ezfb_;
    // HTTP
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://devaoki2.ubicast.com:9292/messages/').
      respond(messageRes);
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

  it("returns the me id", function() {
    expect(scope.meId).toBe(meId);
  });

  it("returns the freq list", function() {
    $httpBackend.flush();
    expect(scope.freqList).toEqual(message_response);
  });

});
