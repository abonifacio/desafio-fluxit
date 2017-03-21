"use strict";

angular.module('myApp')

/**
 * Loading
 * Muestra un mensaje de cargando mientras haya trabajo pendiente
 * 
 * start() agrega un trabajo como pendiente
 * finish() indica terminado un trabajo
 * 
 */
.factory('Loading',function(SimpleModal){

    var requests = [];

    var modalInstance = {empty:true};

    var showModal = function(){
        if(modalInstance.empty){
            modalInstance = SimpleModal.open({
                title : 'Cargando',
                template: 'Un momento...'
            });
        }
    }
    var hideModal = function(){
        modalInstance.close();
        modalInstance = {empty:true};
    }

     return {
         start : function(){
             requests.push(1);
             showModal();

         },
         finish : function(){
             requests.pop();
             if(requests.length==0){
                 hideModal();
             }
         }

     }

});