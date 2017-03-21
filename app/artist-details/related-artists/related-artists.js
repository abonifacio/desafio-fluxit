angular.module('myApp')

.controller('ArtistRelatedArtists',['$scope','relatedArtists','SpotifyData',function($scope,relatedArtists,SpotifyData){
    
    $scope.relatedArtists = relatedArtists.items;
    

}]);