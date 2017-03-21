"use strict";

angular.module('myApp')

/**
 * SpotifyData
 * Conecta con la api de Spotify
 * 
 * Todos los métodos públicos devuelven una promesa. La realización de la promesa
 * tiene como parámetro un objeto con las siguiente claves como mínimo
 *      -> items
 *      -> total
 *      -> limit
 *      -> offset
 * 
 */


.factory('SpotifyData',function($http,Notify,Loading){


     var api_url = 'https://api.spotify.com/v1/';

     var featured_artists_ids = [
         '0oSGxfWSnnOXhD2fKuz2Gy',   //David Bowie 
         '22bE4uQ6baNwSHPVcDxLCe',   //The Rolling Stones
         '3WrFJ7ztbogyGnTHbHJFl2',   //The Beatles
         '1dfeR4HaWDbWqFHLkxsg1d'    //Queen
     ];

     var result = {};

     var subParseResult = function(data, key){
         if(data[key].items){
             return data[key];
         }else{
            return {
                items : data[key],
                total : data[key].length,
                offset: 0,
                limit : 0
            }
         }
     }

     /**
      * Parsea los resultados a un formato homólogo
      */

     var parseResult = function(data){
         if(data.items){
             return data;
         }
         if(data.artists){
             return subParseResult(data,'artists');
         }
         if(data.albums){
             return subParseResult(data,'albums');
         }
         if(data.tracks){
             return subParseResult(data,'tracks');
         }
         if(data.playlists){
             return subParseResult(data,'playlists');
         }

         return data;
     }

     var doHttp = function(url){
         Loading.start();
         return $http.get(api_url+url)
                .then(function(response){
                    Loading.finish();
                    return parseResult(response.data);
                })
                .catch(function(response){
                    Notify.error(response.data && response.data.error);
                    Loading.finish();
                    return {
                        items : [],
                        offset : 0,
                        limit : 0,
                        total : 0
                    }
                });
     };

     var parseParam = function(param){
         if(typeof param == 'string'){
                return '/' + param;
            }else{
                return '?ids=' + param.join(',');
            }
     };

    return {


        getArtists : function(param){
            return doHttp('artists'+parseParam(param));
        },

        getFeaturedArtists : function(){
            return this.getArtists(featured_artists_ids);
        },

        getAlbums : function(param){
            return doHttp('albums'+parseParam(param));
        },

        // type = album || artist || playlist || track
        // search = string - not ''
        // (data)
        search : function(query){
            query.offset = query.offset || 0;
            query.limit = query.limit || 20;
            query.search = query.search || '';
            return doHttp('search?type='+query.type+'&q='+query.search+'&offset='+query.offset+'&limit='+query.limit);
        },

        forArtist : function(id){
            var url = 'artists/'+id;
            return {
                getAlbums : function(page){
                    var offset = ( (page || 1) -1)*10;
                    return doHttp(url+'/albums?limit=10&offset='+offset);
                },
                getTopTracks : function(){
                    return doHttp(url+'/top-tracks?country=AR');
                },
                getRelatedArtists : function(){
                    return doHttp(url+'/related-artists');
                }
            }
        },

        forAlbum : function(id){
            var url = 'albums/'+id;
            return {
                getTracks : function(){
                    return doHttp(url+'/tracks?limit=50');
                }
            }
        }

    };

});