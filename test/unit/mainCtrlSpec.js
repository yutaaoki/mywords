'use strict';

// MainCtrl test
describe('MainCtrl', function(){

  // Shared variables
  var scope, ezfb, ctrl, conf, $httpBackend, $routeParams;
  var meId = '10204429438402257'; 
  var friendId = '1020442943840000'; 
  var messageRes = {data: "love love love hate hate love hate hate love love love "};
  var friendRes = {};
  friendRes[friendId] = "friend";
  var freqList = {"love":20};
  var friendList = {"friend":20};
  var accessToken = 'CAALWvEqTcSMBACrCVqMwU2gXnZAc7qHIX2s1ipajCELFFMzfBY8RbvQfjQhtdvZC8jAlpd9ZCkXIZBWdPiES9JaDM6GEIHfdYjqZBDzyx6ZCpD5ApwpldV4WLlTPZCNS3HQolCNEIVhRxfga1Opo5syQOZC7RHYzejb2cNRGi3DX9iiHmsuXYsBKPuQ5lbFDPvIZD'

  // Load modules
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
  beforeEach(inject(function($rootScope,_$httpBackend_, $controller, _$routeParams_,_ezfb_, CONF){

    conf = CONF;
    ezfb = _ezfb_;
    scope = $rootScope.$new();
    $routeParams = _$routeParams_;

    // WordFreq mock
    WordFreq = function(options){
      var wordfreq = {};
      wordfreq.process = function(data, callback){
        if(data === 'friend'){
          callback(friendList);
        }else{
          callback(freqList);
        }
      }
      return wordfreq;
    }
    scope = $rootScope.$new();

    // HTTP mock
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(conf.apiUrl+'/messages/me?access_token='+accessToken).
      respond(messageRes);
    $httpBackend.whenGET(conf.apiUrl+'/messages/me/'+friendId+'?access_token='+accessToken).
      respond(friendRes);

    // Create controller
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  //** Specs **//

  it('has a valid controller', function() {
    expect(ctrl).toBeDefined();
  });

  it('redirects to "login" when not connected', inject(function($controller, $location) {
    // User is not logged in
    ezfb.getLoginStatus = function(c){
      var res = {
        status: 'error'
      }
      c(res);
    }
    // Run the controller again
    $controller('MainCtrl', { $scope: scope });
    expect($location.path()).toBe('/login');
  }));

  it("doesn't redirect when connected", inject(function($location) {
    expect($location.path()).toBe('');
  }));

  it("contains the me id", function() {
    expect(scope.meId).toBe(meId);
  });

  it("contains me freq list", function() {
    // Disable $apply()
    scope.$apply = function(){};
    $httpBackend.flush();
    expect(scope.list1).toEqual(freqList);
  });

  it("contains friend freq list", inject(function($controller) {
    $routeParams.friend = friendId;
    // Disable $apply()
    $controller('MainCtrl', { $scope: scope });
    scope.$apply = function(){};
    $httpBackend.flush();
    expect(scope.list1).toEqual(friendList);
  }));

});
