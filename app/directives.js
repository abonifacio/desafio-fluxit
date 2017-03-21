"use strict";

angular.module("myApp")

.directive("artist",function(){
    return {
        restrict : "E",
        controller : function($scope){

        },
        templateUrl: 'partials/artist-item.html',
        link : function(scope,element,attrs){
            scope.artist = scope.$eval(attrs.data);
        }

    }
})

;
