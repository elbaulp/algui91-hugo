---
author: alex
categories:
- juegos
color: '#E64A19'
date: '2016-01-01'
lastmod: 2016-08-19
layout: post.amp
mainclass: dev
permalink: /programacion-para-juegos-leccion-4/
title: "Programaci\xF3n para Juegos. Lecci\xF3n 4 . Programaci\xF3n orientada a eventos"
---

[Pueden descargar el código fuente de esta lección.][1]

En este tutorial veremos como capturar y manejar eventos.

Un evento es simplemete algo que pasa. Como presionar una tecla, mover el ratón, redimensionar la ventana o cuando el usuario quiere cerrar la ventana.

<!--more--><!--ad-->

```cpp
//The headers
#include "SDL/SDL.h"
#include "SDL/SDL_image.h"
#include <string>

//Screen attributes
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;
const int SCREEN_BPP = 32;

//The surfaces
SDL_Surface *image = NULL;
SDL_Surface *screen = NULL;
```

Arriba tenemos lo que hemos ido aprendiendo hasta ahora, las cabeceras, constantes e imágenes.

```cpp
//Variable de tipo evento, para posteriormente manejarlo.
SDL_Event event;
```

Una estructura SDL_Event almacena los datos del evento para que lo manejemos.

```cpp
SDL_Surface *load_image( std::string filename )
{
    //The image that's loaded
    SDL_Surface* loadedImage = NULL;

    //The optimized image that will be used
    SDL_Surface* optimizedImage = NULL;

    //Load the image
    loadedImage = IMG_Load( filename.c_str() );

    //If the image loaded
    if( loadedImage != NULL )
    {
        //Create an optimized image
        optimizedImage = SDL_DisplayFormat( loadedImage );

        //Free the old image
        SDL_FreeSurface( loadedImage );
    }

    //Return the optimized image
    return optimizedImage;
}

void apply_surface( int x, int y, SDL_Surface* source, SDL_Surface* destination )
{
    //Temporary rectangle to hold the offsets
    SDL_Rect offset;

    //Get the offsets
    offset.x = x;
    offset.y = y;

    //Blit the surface
    SDL_BlitSurface( source, NULL, destination, &offset; );
}
```

Nuestras funciones para cargar y fusionar las imágenes, no ha cambiado nada con respecto al [tutorial 2][2].

```cpp
bool init()
{
    //Initialize all SDL subsystems
    if( SDL_Init( SDL_INIT_EVERYTHING ) == -1 )
    {
        return false;
    }

    //Set up the screen
    screen = SDL_SetVideoMode( SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_BPP, SDL_SWSURFACE );

    //If there was an error in setting up the screen
    if( screen == NULL )
    {
        return false;
    }

    //Set the window caption
    SDL_WM_SetCaption( "Event test", NULL );

    //If everything initialized fine
    return true;
}
```

La función de inicialización, que inicializa SDL, configura la ventana fijando un título para la misma y devuelve false si ocurre algún error.

```cpp
bool load_files()
{
    //Load the image
    image = load_image( "x.png" );

    //If there was an error in loading the image
    if( image == NULL )
    {
        return false;
    }

    //If everything loaded fine
    return true;
}
```

Función para cargar la imagen. Devuelve false si ocurre algún error.

```cpp
void clean_up()
{
    //Free the image
    SDL_FreeSurface( image );

    //Quit SDL
    SDL_Quit();
}
```

Función para borrar los datos de la memoria al terminar el programa.

```cpp
int main( int argc, char* args[] )
{
    //Make sure the program waits for a quit
    bool quit = false;
```

Ésta es la función principal, donde creamos la variable que nos dirá cuando quiere el usuario cerrar la ventana. Al iniciar el programa, lógicamente la igualamos a false, ya que de lo contrario el programa finalizaría inmediatamente.

```cpp
//Initialize
    if( init() == false )
    {
        return 1;
    }

    //Load the files
    if( load_files() == false )
    {
        return 1;
    }

```

Llamamos a las funciones de inicialización y carga de imágenes que definimos anteriormente.

```cpp
//Apply the surface to the screen
    apply_surface( 0, 0, image, screen );

    //Update the screen
    if( SDL_Flip( screen ) == -1 )
    {
        return 1;
    }

```

Con éste fragmento de código mostramos la imágen en pantalla.

```cpp
//While the user hasn't quit
    while( quit == false )
    {
```

Comenzamos el bucle principal, el cual seguirá funcionando hasta que el usuario fije la variable <var>quit</var> a true.

```cpp
//While there's an event to handle
        while( SDL_PollEvent( &event; ) )
        {
```

En SDL cuando ocurre un evento, se coloca en la cola de eventos. Ésta cola de eventos contiene los datos de los eventos para cada evento que sucede.
Por ejemplo si fuera a presionar un botón del ratón, mover el cursor y a continuación, presionar una tecla del teclado, la cola de eventos se vería así:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="177" width="255" src="https://lh3.ggpht.com/_IlK2pNFFgGM/TT6ImYP7bjI/AAAAAAAAARU/QiAey3O_FW0/queue.jpg"></amp-img>
</figure>


Lo que `SDL_PollEvent()` hace es sacar un evento de la cola y guardar sus datos en nuestra estructura de tipo Evento:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="258" width="294" src="https://lh5.ggpht.com/_IlK2pNFFgGM/TT6ImqKAdJI/AAAAAAAAARY/JqvFGavqRHY/poll.jpg"></amp-img>
</figure>

Por lo tanto este código es recoger datos de los eventos **mientras** haya en la cola.

```cpp
//If the user has Xed out the window
            if( event.type == SDL_QUIT )
            {
                //Quit the program
                quit = true;
            }
        }
    }
```

Cuando el usuario clica en la **X** de la ventana, el tipo de evento que se genera es `SDL_QUIT`. Pero al hacer esto no implica que el programa termine, todo lo que hace este evento es informarnos que el usuario quiere salir del programa.
Ahora que sabemos que el usuario quiere finalizar la ejecución del programa, asignamos el valor <var>true</var> a la variable <var>quit</var>, lo que romperá la ejecución del bucle <var>while</var> en el que nos encontramos.

```cpp
//Free the surface and quit SDL
    clean_up();

    return 0;
}
```

Finalmente, llamamos a nuestra función clean_up() para que elimine las variables creadas por SDL.

Hay otras maneras de controlar eventos como SDL\_WaitEvent() y SDL\_PeepEvents(). Se puede encontrar más información sobre esto en la documentación de SDL.

Fuente:

[lazyfoo.net][3]

#### Siguiente tema: [Lección 5 - Colores Clave][4]

 [1]: http://www.lazyfoo.net/downloads/index.php?file=SDLTut_lesson04
 [2]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-2/
 [3]: http://www.lazyfoo.net/SDL_tutorials/
 [4]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-5/