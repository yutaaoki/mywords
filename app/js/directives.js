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
    scope.$watch('apiMe', function(value){
      WordCloud(elm[0], { list: [['love', 20], ['hate',10]]});
    });
  };

  return {
    link: link
  };
});
