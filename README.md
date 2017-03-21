# Desafío FluxIT

## Introducción
La aplicación presenta una arquitectura mvc a base de componentes. Para cada componente se tiene una vista y un controlador. El reenderizado de los componentes queda a cargo del router. Este consiste en un conjunto de estados, que indican el/los componentes principal es a cargar. A su ves estos componentes pueden incluir otros componentes. La transición entre estados se hace a través de la url, gestionada por el router, un cambio de estado genera un cambio de url y viceversa. De esta manera la aplicación es manejable a partir del historial del navegador o a partir de un link externo. El router se puede encargar de obtener los datos para inyectarlos al controlador previo a la instalación del mismo.

## Dependencias
Las depencias se administran a través de bower y npm. Bower se encarga de las dependencias relacionadas al front-end, es decir, las que requiere la aplicación; y npm de las relacionadas al desarrollo de la misma.
 


## Folder structure

El proyecto se agrupa por componentes teniendo una carpeta por cada componente con sus respectivos archivos de controlador (js) y vista (html) (se omiten sufijos view y controler en la nomenclatura por redundancia). Los componentes que sólo son útiles dentro de un componente padre están dentro de la carpeta de este.
Las vistas que comparten controlador (como los templates para los popups) estan dentro de partials. Y los servicios se encuentran todos dentro de la carpeta services

    app/
        component1/
            component1.html
            component1.js
        services/
            service.ts
        partials/
            form.html
    app.js

## Vistas
Para el reenderizado de las vistas se usaron las librerías bootstrap ui (y todas sus dependencias).El theming de la aplicación es el dado por el theme default de boostrap más una pequeña capa de personalización (dada por app.css) que sobreescribe alguno de los estilos para darle un diseño simple pero con identidad.

## Servicios
El modelo de los componentes se comparte mediante el servicio *SpotifyData*

### SotifyData
Abstrae las llamadas a la api de Spotify. Utliza el modulo $http (no utilicé ngResource por la simpleza de la aplicación) para hacer los requests correspondientes. Estos devuelven una promesa a la cual le agrega un parser para homologar los distintos formatos de respuesta que tiene la api de Spotify. El objeto devuelto tendra por lo menos: items,limit, offset,total en caso de ser un array de objetos; si es un simple objeto se devuelve solo el obejto. En caso error el servicio hace el catch correspondiente y notifica el error.

### Notify
Este servicio se usa para notificar los errores de conexión con la api pero acepta llamadas de cualquier controlador o servicio que lo inyecte. Para la presentación del error usa Simple Modal

### Simple Modal
Simplifica la llamada y renderizado de un modal proporcionado por bootrap ui. Para evitar la duplicación de código en configuraciones

### Loading
Se encarga de informar que la aplicación esta esperando los recursos de la api mediante un modal. Funciona muy simplemente. Se hace la llamada (desde SpotifyData) de inicio por cada request y otra de finalización una vez que llega la response. Entonces el servicio acumula los pendientes y muestra el modal siempre que tenga requests pendientes

# Requerimientos funcionales

Consideraciones y aclaraciones

## 1. Lista de artistas

* Los ids de los artistas a mostrar se provee desde el mismo servicio de datos. 
* Estos ids deben vincular correctamente al artista o esto ocasionaría un error en la home de la aplicación.
* Se utilizó el wire frame de la especificación para obtener la información a representar pero se alteró su diseño.
* Se asume que el artista tiene toda la información a mostrar incluída la foto

## 2. Buscador
* El buscador se puede abrir a partir de cualquier estado de la aplicación. 
* El campo Artista es obligatorio. Los otros campos también pero estos quedan a limitada manipulación por el usuario.
* Si se quiere buscar a través del tipeo de una url esta debe contener el parametro buscar o indicará un error de url.


## 3. Resultados
* Los resultados se presentan como la especificación lo indica, además se muestra la cantidad de resultados total para esa búsqueda. 
* Un album puede tener varios artistas por lo que para el formato tipo album se concatenan los artistas mediante "-" y se muestran dentro de una misma fila. 
* En el formato tipo artista el nombre del Artista vincula a la sección detalle de ese artista


## 4. Detalle del artista

* Se muestra un resumen del artista como el espcificado en el listado.
* La foto que se utiliza en esta vista es la segunda más pequeña del artista, por lo que se asume que todos los artistas tiene al menos 2 fotos.
* Esta sección muestra además de los álbumes, las top 10 canciones y los artistas relacionados (con el formato del listado de artistas); de manera de usar todos los end points de la especificación. 
* Dado que un artista puede tener demasiados álbumes se les agregó paginación a pesar de que no estaba espcificada.
* Para cada álbum se deben mostrar todas sus canciones. La API de Spotify devuelve como máximo en una query **50** resultados, por lo que se asume que las canciones en un álbum son menos de 50. No se agregó paginación porque no se especificó ni parece necesario.

## Instalación
	
	npm start
