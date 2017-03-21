"use strict";

angular.module('myApp')

/**
 * SimpleModal
 * Muestra un modal estándar
 * 
 * open(vars) -> vars.title => título del modal
 *            -> vars.headerClass => clase para aplicar al titulo  
 *            -> vars.template => texto plano a renderizar en el cuerpo  
 *            -> vars.templateUrl => url de template a renderizar en el cuerpo
 *            -> vars.scope => variables a mergear con el scope del controlador del modal
 */


.factory('SimpleModal',function($uibModal){


    var openModal = function(vars){
        return $uibModal.open({
            templateUrl: 'partials/simple-modal.html',
            controller: function($scope,$uibModalInstance){

                $scope.headerClass =  vars && vars.headerClass || '';
                $scope.title = vars && vars.title || 'Mensaje';
                $scope.templateUrl = vars && vars.templateUrl || undefined;
                $scope.template = vars && vars.template || '';

                Object.assign($scope, vars && vars.scope || {});

                $scope.close =function(){
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    };

     return {
         open : function(vars){
             return openModal(vars);
         }
    
     }

});