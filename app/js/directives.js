'use strict';

// Directives
angular.module('myWordsApp.directives', [])

//** Main Canvas **//
.directive('mainCanvas', function($log) {

  function link(scope, elm, attrs) {

    // Render the  word cloud
    scope.$watch(attrs.list, function(value){
      var list = scope[attrs.list] || [['', 0]];;
      WordCloud(elm[0], { list: list, weightFactor: 1, origin: [attrs.originx, attrs.originy]});
    });
  };

  return {
    link: link
  };
});
