---
author: alex
categories:
- juegos
date: '2016-01-01'
lastmod: 2017-09-02T12:58:51+01:00
mainclass: dev
url: /programacion-para-juegos-leccion-2/
title: "Programación para Juegos - Lección 2 - Imágenes Optimizadas"
---

[Pueden descargar el código fuente de esta lección.][1]

Ahora que ya hemos conseguido mostrar una imagen en pantalla en la [segunda parte de la lección 1][2], vamos a superponer varias imagenes de una manera más eficiente.

<!--more--><!--ad-->

```bash
//Cabeceras
#include "SDL/SDL.h"
#include <string>
```

Estos son los archivos de cabecera para este programa.

Incluimos SDL.h porque obviamente necesitamos funciones de SDL.

```bash
//Atributos de la pantalla
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;
const int SCREEN_BPP = 32;
```

Aquí tenemos varios atributos de la pantalla.

Es fácil averiguar para que sirven estos atributos, SCREEN\_WIDTH para el ancho de la ventana, y SCREEN\_HEIGHT para el alto. SCREEN_BPP son los bits por píxel que tendrá la imagen. Las imágenes que usamos son todas de 32-bit.

```bash
//Superficies que vamos a usar
SDL_Surface *message = NULL;
SDL_Surface *background = NULL;
SDL_Surface *screen = NULL;
```

Estas son las tres imágenes que vamos a usar. `background` obviamente es la imagen que se verá de fondo, `message` es la imagen que dice `Hello` y `screen` es la ventana contenedora de las imágenes.

```bash
SDL_Surface *load_image( std::string filename )
{
    //Temporary storage for the image that's loaded
    SDL_Surface* loadedImage = NULL;

    //The optimized image that will be used
    SDL_Surface* optimizedImage = NULL;

```

Esta función es la encargada de cargar la imagen.
Lo que hace es cargar la imagen y devolver un puntero a la versión optimizada de la imagen cargada.
El argumento `filename` es la ruta de la imagen a cargar. `loadedImage` es la superfície que obtenemos cuando la imagen se carga. `optimizedImage` es la superfície que vamos a usar.

```bash
//Cargamos la imagen
    loadedImage = SDL_LoadBMP( filename.c_str() );
```

Lo primero es cargar la imagen usando SDL_LoadBMP().
Pero no se debe usar inmediatamente, ya que esta imagen es de 24-bit y `screen` es de 32-bit. No es recomendable fusionar imagenes con diferente formato porque SDL tendrá que cambiar el formato en el aire (Durante la ejecución del programa), ralentizándolo.

```bash
//Si nada va mal cargando la imagen
    if( loadedImage != NULL )
    {
        //Create an optimized image
        optimizedImage = SDL_DisplayFormat( loadedImage );

        //Free the old image
        SDL_FreeSurface( loadedImage );
    }
```

Lo siguiente es verificar que la imagen se ha cargado bien. Si ocurre algún error, loadedImage será NULL.

Si la imagen se carga correctamente, llamamos a SDL_DisplayFormat() para que cree una nueva versión de `loadedImage` en el mismo formato que `screen`. La razón por la que hacemos esto es porque cuando intentamos `pegar` una imagen en otra de diferente formato, SDL convierte la imagen, así que están en el mismo formato.

Al crear la imagen convertida ganamos en velocidad de ejecución, ya que convertimos la imagen cuando la cargamos, de este modo al aplicar la imagen a `screen`, ya está en el mismo formato. Por lo tanto SDL no tiene que convertirla en el aire.

Así que ahora tenemos dos imágenes, la imagen cargada antigua (loadedImage), y la nueva imagen optimizada (optimizedImage).

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" src="https://lh5.ggpht.com/_IlK2pNFFgGM/TT6GiUQZr0I/AAAAAAAAAQ4/bJGLBtK7gnE/displayformat.jpg" width="320"></amp-img>
</figure>


SDL_DisplayFormat() crea una imagen nueva optimizada pero no se deshace de la otra. Por eso hay que llamar a SDL_FreeSurface().

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" src="https://lh6.ggpht.com/_IlK2pNFFgGM/TT6G2JAjz0I/AAAAAAAAAQ8/NtLIOitNd24/freesurface.jpg" width="320"></amp-img>
</figure>


```bash
return optimizedImage;
}
```

A continuación, la nueva versión optimizada de la imagen se devuelve.

```bash
void apply_surface( int x, int y, SDL_Surface* source, SDL_Surface* destination )
{
    //Make a temporary rectangle to hold the offsets
    SDL_Rect offset;

    //Give the offsets to the rectangle
    offset.x = x;
    offset.y = y;
```

Aquí tenemos nuestra función para fusionar las imágenes.
Como argumentos tiene las coordenadas donde queremos fusionar la imagen y las dos imágenes.
Primero creamos un objeto de tipo SDL\_Rect. Hacemos esto porque SDL\_BlitSurface() solo acepta este tipo de dato.
SDL_Rect es un tipo de dato que representa un rectángulo. Tiene cuatro miembros representando los valores X e Y de un rectángulo (Ancho y alto).

```bash
//Fusión de la imagen
    SDL_BlitSurface( source, NULL, destination, &offset; );
}
```

Con esto vamos a fusionar las imágenes.

- El primer argumento es la imagen que estamos usando.
- No os preocupéis por el segundo argumento, por ahora vamos a fijarlo a NULL.
- El tercer argumento es la imagen que vamos a fusionar.
- El cuarto argumento contiene la posición en la que se colocará la imagen una vez fusionada.

```bash
int main( int argc, char* args[] )
{
```

Empezamos con la función principal.

Cuando usamos SDL, siempre hay que usar la función main de esta manera:

```c
int main( int argc, char* args[] )
// o
int main( int argc, char** args ).
```

```bash
//Inicializar todos los subsistemas
    if( SDL_Init( SDL_INIT_EVERYTHING ) == -1 )
    {
        return 1;
    }
```

Usando SDL\_Init() iniciamos SDL. A SDL\_Init() le pasamos SDL\_INIT\_EVERYTHING, para que inicie cualquier subsistema de SDL. Los subsistemas SDL son cosas como video, audio, Temporizadores etc, que son componentes individuales usados para hacer juegos.

No vamos a usar todos subsistemas, pero no pasa nada si los inicializamos.

Si SDL no puede inicializarse, devuelve -1, en ese caso controlamos el error devolviendo 1, terminando el programa.

```bash
//Configuramos la pantalla
    screen = SDL_SetVideoMode( SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_BPP, SDL_SWSURFACE );
```

Creamos una ventana, lo que nos devuelve un puntero a la misma. Así podremos aplicar las imágenes a la ventana.

Ya conocemos que son los tres primeros argumentos, el cuarto crea la ventana en memoria.

```bash
//Si ocurre algún error
    if( screen == NULL )
    {
        return 1;
    }
```

Si hay algún error al crear la ventana, `screen` será igual a NULL.

```bash
//Título de la ventana
    SDL_WM_SetCaption( "Hello World", NULL );
```

Fijamos el título de la ventana a `Hello World`. El segundo argumento es para indicar la ruta del icono de la ventana.

```bash
//Cargamos las imágenes
    message = load_image( "hello.bmp" );
    background = load_image( "background.bmp" );
```

Cargamos las imágenes usando la función que creamos anteriormente.

```bash
//Aplicamos el fondo a la ventana
    apply_surface( 0, 0, background, screen );
```

Aplicamos el fondo a la ventana con la función que hicimos. Antes de unir el fondo a la ventana, teníamos algo asi:

<figure>
    <amp-img sizes="(min-width: 320px) 320px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://lh5.ggpht.com/_IlK2pNFFgGM/TT6HlvSgW8I/AAAAAAAAARE/TIY1ZDZZymM/blank.jpg"></amp-img>
</figure>

Pero al unirlas, tendremos algo así:

<figure>
    <amp-img sizes="(min-width: 320px) 320px, 100vw"  on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://lh5.ggpht.com/_IlK2pNFFgGM/TT6Hlu7YxVI/AAAAAAAAARA/CzNfc3D0kso/background.jpg"></amp-img>
</figure>

Cuando las unimos, se copian los píxels de una imagen a otra. Por eso el la imagen que estamos usando de fondo aparece en la esquina superior izquierda, queremos que el fondo ocupe toda la ventana, pero, ¿significa eso que tendremos que cargar la imagen de fondo 3 veces mas?

```bash
apply_surface( 320, 0, background, screen );
apply_surface( 0, 240, background, screen );
apply_surface( 320, 240, background, screen );
```

No, lo que hacemos es fusionar la `misma` imagen 3 veces mas.

```bash
//Aplicando el mensaje a la ventana
apply_surface( 180, 140, message, screen );
```

Ahora vamos a aplicar la imagen mensaje a la ventana, en las coordenadas X=180 y Y=140

El sistema de coordenadas de SDL no trabaja así:

<figure>
    <amp-img sizes="(min-width: 320px) 320px, 100vw"  on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://lh6.ggpht.com/_IlK2pNFFgGM/TT6HmFPv1EI/AAAAAAAAARI/ta-NTaunvQU/cartesian.jpg"></amp-img>
</figure>


Trabaja así:

<figure>
    <amp-img sizes="(min-width: 320px) 320px, 100vw"  on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://lh6.ggpht.com/_IlK2pNFFgGM/TT6HmnGdBpI/AAAAAAAAARQ/QWA0K9-uB_A/sdlcoord.jpg"></amp-img>
</figure>


El origen de coordenadas (0,0) está en la esquina superior izquierda. Por eso hay que aplicar la imagen de esta forma:

<figure>
    <amp-img sizes="(min-width: 320px) 320px, 100vw"  on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://lh4.ggpht.com/_IlK2pNFFgGM/TT6HmRzk0tI/AAAAAAAAARM/UoHjJY_0jxE/coorddemo.jpg"></amp-img>
</figure>

```bash
//Actualizando la pantalla
    if( SDL_Flip( screen ) == -1 )
    {
        return 1;
    }
```

Como en la lección anterior, hay que actualizar la patalla para ver las imágenes. Si ocurre algún error devuelve -1, y nosotros devolvemos 1.

```bash
//Esperamos 2 seg
    SDL_Delay( 2000 );
```

Llamamos a esta función para que la ventana se muestre durante 2 segundos en pantalla.

```bash
//Liberamos las imágenes
    SDL_FreeSurface( message );
    SDL_FreeSurface( background );

    //Quit SDL
    SDL_Quit();

    //Return
    return 0;
}
```

Ya que hemos terminado nuestro programa, usamos SDL_FreeSurface() para eliminar de memoria las variables que almacenaban las imágenes. Si no liberamos la memoria, estas variables se quedarán ocupando espacio.

Fuente:

[lazyfoo.net][3]

# Siguiente tema: [Programación para Juegos - Lección 3 Librerías de SDL][4]

 [1]: http://www.lazyfoo.net/downloads/index.php?file=SDLTut_lesson02
 [2]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-12/
 [3]: http://www.lazyfoo.net/SDL_tutorials/
 [4]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-3/
