"use strict";

angular.module('myApp')


/**
 * Notify
 * Muestra un mensaje de error
 * 
 * error(err) -> err.status => código de error: 100 para mensaje personalizado
 *            -> err.message => mensaje a mostrar en caso de err.status 100  
 * 
 */

.factory('Notify',function(SimpleModal){

    var modalInstance = {empty:true};

    var showError = function(message){
        if(modalInstance.empty){
            modalInstance = SimpleModal.open({
                title : 'Error',
                headerClass: 'danger',
                template: message
            });
            modalInstance.closed.then(function(){
                modalInstance = {empty:true};
            });
        }
    }

     return {
         error : function(err){
             // err.status integer
             var message = "Error desconocido";

             if(err && err.status){
                 switch(err.status){
                    case 404:
                        message = "Falló la conexión con Spotify";
                        break;
                    case 400:
                        if(err.message){
                            message = "Url inválida";
                        }
                        break;
                    case 100: // para mensajes custom
                        message = err.message;
                        break;
                 }
             }else{
                 message = "Falló la conexión a internet";
             }
             showError(message);
         }
     }

});