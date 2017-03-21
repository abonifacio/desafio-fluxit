angular.module('myApp')

.controller('Search',['$scope','$location','$state','Loading',function($scope,$location,$state,Loading){
    

    $scope.searchParams = $location.search();
    
    $scope.setTotal = function(total,prev,next){
        $scope.searchParams.total = total;
        $scope.searchParams.prev = prev;
        $scope.searchParams.next = next; 
    };

    var parseQuery = function(qstr) {
        var query = {};
        var tmp = qstr.split('?')[1];

        query.offset = tmp.split('offset=')[1].split('&')[0];
        query.limit = tmp.split('limit=')[1].split('&')[0];

        return query;
    }
    var go = function(url){
        var params = parseQuery(url);
        $state.go('.',{buscar: $scope.searchParams.buscar,limit: params.limit, offset:params.offset })
    }

    $scope.goNext = function(){
        go($scope.searchParams.next);
    }

    $scope.goPrev = function(){
        go($scope.searchParams.prev);
    }
    

}]);