angular.module('myApp')

.controller('ArtistAlbums',['$scope','albums','SpotifyData','$state','$location',function($scope,albums,SpotifyData,$state,$location){
    
    $scope.albums = albums;

    $scope.albums.currentPage = $location.search().page || 1;


    $scope.albums.changePage = function(){
        $state.transitionTo('artist.albums', {page:$scope.albums.currentPage, id:$scope.artist.id});
    }    


    var loadTrackforIndex = function(index){
        var current = $scope.albums.items[index];
        if(current){
            $scope.$evalAsync(function() {
                SpotifyData.forAlbum(current.id).getTracks().then(function(data){
                        current.tracks = data.items;
                });
            });
        }
    }

    var loadTracks = function(){
        var i;
        for(i = 0; i<$scope.albums.items.length;i++){
            loadTrackforIndex(i);
        }
    }

    loadTracks();


}]);