angular.module('myApp')

.controller('SearchForm',['$scope','SpotifyData','$state',function($scope,SpotifyData,$state){
    
    $scope.fields = {
        buscar : 'Queen',
        type : 'artist',
        offset : 0,
        limit : 20,
    }

    $scope.options = {
        offset : [0,20,40,60,80,90,100,120,140],
        limit : [10,20,30,40]
    }

    $scope.go = function(){


        if($scope.fields.type=='artist'){
            $state.transitionTo('search.artists',$scope.fields);
        }else{
            $state.transitionTo('search.albums',$scope.fields);
        }

        $scope.$parent.close();
    }




}]);