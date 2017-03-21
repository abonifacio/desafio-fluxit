angular.module('myApp')

.controller('FeaturedArtists',['$scope','SpotifyData',function($scope,SpotifyData){
    
    $scope.featured_artists = [];
    
    SpotifyData.getFeaturedArtists().then(function(result){
        $scope.featured_artists = result.items;
    });

    //console.log(SpotifyData);
}]);