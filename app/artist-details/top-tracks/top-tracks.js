angular.module('myApp')

.controller('ArtistTopTracks',['$scope','topTracks','SpotifyData',function($scope,topTracks,SpotifyData){
    
    $scope.topTracks = topTracks.items;
    

}]);