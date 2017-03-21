angular.module("myApp")

.directive("artist",function(){
    return {
        restrict : "E",
        scope : {},
        controller : function($scope,SimpleModal){

            
            $scope.openJSON = function(){   
                SimpleModal.open({
                    title: $scope.artist.name,
                    templateUrl : 'partials/artist-json.html',
                    scope : {
                        artist : $scope.artist
                    }
                });
            }

            $scope.openGenres = function(){   
                SimpleModal.open({
                    title: $scope.artist.name,
                    templateUrl : 'partials/artist-genres.html',
                    scope : {
                        genres : $scope.artist.genres
                    }
                });
            }
        },
        templateUrl: 'artist-item/artist-item.html',
        link : function(scope,element,attrs){
            scope.artist = scope.$eval(attrs.data);
        }

    }
})

;
