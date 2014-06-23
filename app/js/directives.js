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
    scope.$watch('wordList', function(value){
      var list = scope.wordList || [['', 0]];;
      WordCloud(elm[0], { list: list, weightFactor: 5});
    });
  };

  return {
    link: link
  };
});
