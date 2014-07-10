'use strict';

// Directives
angular.module('myWordsApp.directives', [])

//** Main Canvas **//
.directive('mainCanvas', function($log) {

  function link(scope, elm, attrs) {

    // Render the  word cloud
    scope.$watch(attrs.list, function(value){
      var list = scope[attrs.list] || [['', 1]];;
      // list is an array of array. Reduce this to
      // an array of numbers
      var sizeArray = list.map(function(e){
        if(e[1]){
          return e[1];
        }
      })
      var maxSize = sizeArray.reduce(function(pre, cur){
        return (cur > pre) ? cur : pre;
      });
      // Compute the factor so that the cloud won't
      // be too small
      var factor = maxSize > 45 ? 1 : Math.floor(90 / maxSize);
      WordCloud(elm[0], { list: list, weightFactor: factor, origin: [attrs.originx, attrs.originy]});
    });
  };

  return {
    link: link
  };
});
