'use strict';

// Directives
angular.module('myWordsApp.directives', [])

//** Main Canvas **//
.directive('mainCanvas', function($log) {

  function link(scope, elm, attrs) {

    // Render the  word cloud
    scope.$watch('freqList', function(value){
      var list = scope.freqList || [['', 0]];;
      WordCloud(elm[0], { list: list, weightFactor: 1, origin: [500,400]});
    });
  };

  return {
    link: link
  };
});
