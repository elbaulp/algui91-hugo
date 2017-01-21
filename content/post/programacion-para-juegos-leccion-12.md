---
author: alex
categories:
- juegos
color: '#E64A19'
lastmod: 2016-08-19
layout: post.amp
mainclass: dev
permalink: /programacion-para-juegos-leccion-12/
title: "Programaci\xF3n para Juegos - Lecci\xF3n 1.2 - Hello World"
---

En esta lección vamos a aprender a hacer un Hola Mundo al estilo SDL.

Ahora que ya [instalaste SDL][1], vamos a cargar una imagen en la pantalla.

Empecemos:

[Pueden descargar el código fuente de esta lección.][2]

<!--more--><!--ad-->

```bash
//Include SDL functions and datatypes
#include "SDL/SDL.h"
```

Al principio del código fuente incluimos el archivo de cabecera SDL, para poder usar funciones y tipos de datos de SDL.

Los que están usando Visual Studio, deben incluir la cabecera así:

```bash
#include "SDL.h"
```

Si el compilador se queja diciendo que no puede encontrar &#8220;SDL/SDL.h&#8221;, es porque no tienen SDL instalado en el ruta(path) correcta.

```bash
int main( int argc, char* args[] )
{
    //The images
    SDL_Surface* hello = NULL;
    SDL_Surface* screen = NULL;
```

Al principio de la función main(), declaramos dos punteros a SDL\_Surface. El tipo de dato SDL\_Surface es una imagen, en esta aplicación vamos a tratar con dos imágenes. La superfície(Surface) &#8220;hello&#8221; es la imagen que vamos a cargar y mostrar. &#8220;Screen&#8221; es lo que es visible en la pantalla.

Al estar tratando con punteros, debemos inicializarlos SIEMPRE.

Cuando usemos SDL, la función main() debe estar declarada como la de arriba. No se puede usar void main() o cualquier otra cosa.

```bash
//Start SDL
    SDL_Init( SDL_INIT_EVERYTHING );

    //Set up screen
    screen = SDL_SetVideoMode( 640, 480, 32, SDL_SWSURFACE );

    //Load image
    hello = SDL_LoadBMP( "hello.bmp" );
```

La primera función a la que llamamos dentro de main() es SDL_Init(). Esta función inicializa todos los subsistemas de SDL para que podamos empezar a usar las funciones gráficas de SDL.

Despues llamamos a SDL\_SetVideoMode() para crear una ventana de 640&#215;480 píxeles con 32-bits por pixel. El último argumento, SDL\_SWSURFACE, establece la superficie en la memoria. Esta última función devuelve un puntero a la superficie de la ventana para que podamos usarlo.

Después de establecer la ventana, cargamos nuestra imagen con SDL_LoadBMP(). Esta función recibe como argumento la ruta de una imagen bmp y devuelve un puntero a nuestra superficie <var>hello</var>. Esta función devuelve NULL si ocurre algún error al cargar la imagen.

```bash
//Apply image to screen
    SDL_BlitSurface( hello, NULL, screen, NULL );

    //Update Screen
    SDL_Flip( screen );

    //Pause
    SDL_Delay( 2000 );
```

Ahora que tenemos nuestra ventana y nuestra imagen cargada, vamos a aplicar la imagen a la pantalla. Haremos esto con SDL\_BlitSurface(). El primer argumento de SDL\_BlitSurface() es la superficie fuente. El tercero la superficie destino. Esta función une la superficie fuente a la superficie destino. En este caso, vamos a aplicar nuestra imagen cargada a la pantalla. Encontrarás lo que hacen los otros argumentos en tutoriales posteriores.

Ahora que ya está aplicada la imagen, hay que actualizar la pantalla para hacerla visible. Para ello llamamos a SDL_Flip(). Si no hacemos esto, solo se verá una pantalla blanca.

Una vez hecho esto, lo siguiente es hacer que la ventana permanezca visible durante un tiempo en la pantalla. SDL_Delay() muestra la imagen en pantalla durante 2000 milisegundos (2 segundos). Aprenderemos una mejor manera de hacer esto en la [lección 4][3].

```bash
//Free the loaded image
    SDL_FreeSurface( hello );

    //Quit SDL
    SDL_Quit();

    return 0;
}
```

Como ya no vamos a usar mas la imagen cargada en nuestro programa, tenemos que eliminarla de la memoria. No se puede usar <var>delete</var>, hay que usar SDL_FreeSurface() para eliminarla de memoria.

Sin embargo, la superficie <var>screen</var> no hay que borrarla a mano, ya que SDL_Quit() lo hace por nosotros.

Enhorabuena, acabas de hacer tu primera aplicación gráfica.

Fuente:

[lazyfoo.net][4]

## Siguiente tema: [Lección 2 - Superficies Optimizadas][5]


 [1]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-1/
 [2]: http://www.lazyfoo.net/downloads/index.php?file=SDLTut_lesson01
 [3]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-4/
 [4]: http://www.lazyfoo.net/
 [5]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-2/
