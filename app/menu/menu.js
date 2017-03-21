angular.module('myApp')

.controller('Menu',['$scope','SimpleModal',function($scope,SimpleModal){
    
    $scope.showSearchForm = function(){
        

        SimpleModal.open({
            title: 'Buscar',
            templateUrl : 'search-form/search-form.html'
        });

    }


}]);