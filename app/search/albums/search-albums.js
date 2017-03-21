angular.module('myApp')

.controller('SearchAlbums',['$scope','results','$state',function($scope,results,$state){
    

    $scope.results = results;

    $scope.$parent.setTotal(results.total,results.previous,results.next);

    $scope.getArtists = function(artists_array){
        var tmp = artists_array[0].name;
        var i;
        for(i = 1;i<artists_array.length;i++){
            tmp = tmp + ' - ' + artists_array[i].name;
        }
        return tmp;
    }

}]);