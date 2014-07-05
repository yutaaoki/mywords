'use strict';

/* Directives */


angular.module('myWordsApp.directives', []).
directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]).
directive('mainCanvas', function($log) {


  function link(scope, elm, attrs) {
    scope.$watch('freqList', function(value){
      var list = scope.freqList || [['', 0]];;
      WordCloud(elm[0], { list: list, weightFactor: 1, origin: [500,400]});
    });
  };

  return {
    link: link
  };
});
