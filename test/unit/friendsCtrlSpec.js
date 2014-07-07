'use strict';

//FriendsCtrl spec
describe('FriendsCtrl', function(){

  var scope, ezfb, ctrl, conf, $httpBackend;
  var meId = '10204429438402257'; 
  var friendsRes = [{"id":"0000","name":"Jack Adams"},{"id":"11111","name":"Yosho Saito"}];
  var accessToken = 'CAALWvEqTcSMBACrCVqMwU2gXnZAc7qHIX2s1ipajCELFFMzfBY8RbvQfjQhtdvZC8jAlpd9ZCkXIZBWdPiES9JaDM6GEIHfdYjqZBDzyx6ZCpD5ApwpldV4WLlTPZCNS3HQolCNEIVhRxfga1Opo5syQOZC7RHYzejb2cNRGi3DX9iiHmsuXYsBKPuQ5lbFDPvIZD'

  beforeEach(module('myWordsApp.controllers'));
  beforeEach(module('myWordsApp.config'));
  beforeEach(module('ngRoute'));

  // Insert ezfb mock
  beforeEach(function(){

    // ezfb mock
    var mockEzfb = {
      getLoginStatus: function(callback){
        var res = {
          status: 'connected',
          authResponse: {accessToken: accessToken}
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

  // Inject
  beforeEach(inject(function($rootScope,_$httpBackend_, $controller, _ezfb_, CONF){

    conf = CONF;
    ezfb = _ezfb_;
    scope = $rootScope.$new();

    // HTTP mock
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(conf.apiUrl+'/friends/'+meId+'?access_token='+accessToken).
      respond(friendsRes);

    // Create controller
    ctrl = $controller('FriendsCtrl', {$scope: scope});
  }));

  it('redirects to "login" when not connected', inject(function($controller, $location) {
    // User is not logged in
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'error'
      }
      c(res);
    }
    // Run the controller again
    $controller('FriendsCtrl', { $scope: scope });
    expect($location.path()).toBe('/login');
  }));

  it("doesn't redirect when connected", inject(function($location) {
    expect($location.path()).toBe('');
  }));

  it("returns the me id", function() {
    expect(scope.meId).toBe(meId);
  });

  it("returns the frined list", function() {
    // Disable $apply()
    scope.$apply = function(){};
    $httpBackend.flush();
    expect(scope.friendList).toEqual(friendsRes);
  });

})
