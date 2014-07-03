'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){

  beforeEach(module('myWordsApp.controllers'));


  it('creates defined controller', inject(function($controller) {
    //spec body
    var mainCtrl = $controller('MainCtrl', { $scope: {} });
    expect(mainCtrl).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
    expect(myCtrl2).toBeDefined();
  }));
});
