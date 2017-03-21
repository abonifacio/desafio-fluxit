'use strict';

angular.module('myApp', ['ui.router','ui.bootstrap'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//   .when('/home/:modal', {
//     templateUrl: 'views/featured-artists.html',
//     controller: 'FeaturedArtists'
//   })
//   .when('/search/:modal', {
//     templateUrl: 'views/view2.html',
//     controller: 'View2Ctrl'
//   })
//   .otherwise({redirectTo: '/home'});
// }])

.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
    
    $stateProvider
    
    .state('search',{
        url: '/buscar?buscar&offset&limit',
        views: {
            'app':{
                controller: 'Search',
                templateUrl: 'search/search.html'
            }
        },
        abstract : true
    })
    .state('search.artists',{
        url: '/artistas',
        views: {
            'search-results':{
                controller: 'SearchArtists',
                templateUrl: 'search/artists/search-artists.html',
                resolve : {
                    results: function(SpotifyData,$stateParams){
                        return SpotifyData.search({
                            type : 'artist',
                            search : $stateParams.buscar,
                            offset : $stateParams.offset,
                            limit : $stateParams.limit
                        });
                    }
                }
            }
        }
    })
    .state('search.albums',{
        url: '/albums',
        views: {
            'search-results':{
                controller: 'SearchAlbums',
                templateUrl: 'search/albums/search-albums.html',
                resolve : {
                    results : function(SpotifyData,$stateParams){
                        return SpotifyData.search({
                            type : 'album',
                            search : $stateParams.buscar,
                            offset : $stateParams.offset,
                            limit : $stateParams.limit
                        });
                    }
                }
            }
        }
    })
    .state('home',{
        url: '/home',
        views: {
            'app': {
                controller: 'FeaturedArtists',
                templateUrl: 'featured-artists/featured-artists.html'
            }
        },
    })
    .state('artist',{
        url: '/artista/:id',
        abstract : true,
        views: {
            'app': {
                resolve: {
                     artist: function(SpotifyData,$stateParams){
                         return SpotifyData.getArtists($stateParams.id);
                     }
                },
                controller: 'ArtistDetails',
                templateUrl: 'artist-details/artist-details.html'
            }
        },
    })
    .state('artist.top-tracks',{
        url: '',
        views: {
            'artist-tab': {
                resolve: {
                     topTracks : function(SpotifyData,$stateParams){
                         return SpotifyData.forArtist($stateParams.id).getTopTracks();
                     }
                },
                controller: 'ArtistTopTracks',
                templateUrl: 'artist-details/top-tracks/top-tracks.html'
            }
        },
    })
    .state('artist.related-artists',{
        url: '/artistas-relacionados',
        views: {
            'artist-tab': {
                resolve: {
                     relatedArtists : function(SpotifyData,$stateParams){
                         return SpotifyData.forArtist($stateParams.id).getRelatedArtists();
                     }
                },
                controller: 'ArtistRelatedArtists',
                templateUrl: 'artist-details/related-artists/related-artists.html'
            }
        },
    })
    .state('artist.albums',{
        url: '/albumes/?page',
        views: {
            'artist-tab': {
                resolve: {
                     albums : function(SpotifyData,$stateParams){
                         return SpotifyData.forArtist($stateParams.id).getAlbums($stateParams.page);
                     }
                },
                controller: 'ArtistAlbums',
                templateUrl: 'artist-details/albums/albums.html'
            }
        },
    })

  
  ;
 
});