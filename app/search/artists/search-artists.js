angular.module('myApp')

.controller('SearchArtists',['$scope','results','$state',function($scope,results,$state){
    
    $scope.results = results;


    $scope.$parent.setTotal(results.total,results.previous,results.next);

}]);