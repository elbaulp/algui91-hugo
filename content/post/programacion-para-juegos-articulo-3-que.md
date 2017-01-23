---
author: alex
categories:
- juegos
color: '#E64A19'
date: '2016-01-01'
lastmod: 2016-08-29
layout: post.amp
mainclass: dev
permalink: /programacion-para-juegos-articulo-3-que/
title: "Programaci\xF3n para Juegos. Art\xEDculo 3. \xBFQu\xE9 es un pixel?"
---

Este artículo hace referéncia a la [Lección 5 - Colores Clave][1].

<!--more--><!--ad-->

# ¿Qué es un pixel?

Probablemente sepas que las imágenes están formadas por píxeles, pero, ¿Cómo se forman los píxeles?

```bash
//Map the color key
Uint32 colorkey = SDL_MapRGB( optimizedImage-&gt;format, 0, 0xFF, 0xFF );
```

Aquí tenemos una línea de código de la [Lección 5 - Colores Clave][1]. Ya sabemos que `SDL_MapRGB()` devuelve un pixel, pero ¿Cómo es la estructura `Uint32` un píxel?

<!--more--><!--ad-->

Bien, Uint32 es lo siguiente:

<strong>U</strong>nsigned <strong>int</strong>eger, lo que son <strong>32</strong> bits de tamaño.

Os preguntaréis, ¿Cómo puede ser un número un píxel?, probablemente sepas algo de `HTML`, y lo que hacemos en `HTML` para cambiar los colores de los elementos es configurar el color combinando 3 números desde el 0 al 255.

```html
<span style="color: rgb(Red,Green,Blue)">Text</span>
```

Arriba he usado el código `HTML`/CSS para cambiar el color del texto. Combinando los valores Red, Green y Blue (Rojo, Verde y Azul) podemos obtener cualquier color. Por ejemplo:

```html
<span style="color: rgb(255,255,255)">Esto</span> tiene Red 255, Green 255, y Blue 255.
<span style="color: rgb(255,0,0)">Esto</span> tiene Red 255, Green 0, y Blue 0.
<span style="color: rgb(0,0,255)">Esto</span> tiene Red 0, Green 0, y Blue 255.
<span style="color: rgb(0,0,0)">Esto</span> tiene Red , Green 0, y Blue 0.
<span style="color: rgb(192,192,0)">Esto</span> tiene Red 192, Green 192, y Blue 0.
<span style="color: rgb(0,255,255)">Esto</span> tiene Red 0, Green 255, y Blue 255.
<span style="color: rgb(192,128,64)">Esto</span> tiene Red 192, Green 128, y Blue 64.
<span style="color: rgb(186,3,207)">Esto</span> tiene Red 186, Green 3, y Blue 207.
```

Dicho esto, una estructura Uint32 es tan solo un número. ¿Si los píxeles están hechos por un conjunto de numeros, no deberían ser un array?

En realidad, lo es.

Los valores red, green y blue que crean un píxel pueden ser un número del 0 al 255. Recuerda que el 0 también es un número y en programación siempre empezamos a contar desde el 0. Eso significa que tenemos 256 posíbles valores. 256 es 2<sup>8</sup>, lo que significa que cada uno de los valores que componen el color se puede representar con 8 bits.

Un `Uint32` es simplemente cada uno de esos 8 bits juntos uno detrás de otro en el mismo número. En la memoria del ordenador los píxeles en esencia son así.

```html
<span style="color: rgb(255,0,0)">10101011</span>
<span style="color: rgb(0,255,0)">00101011</span>
<span style="color: rgb(0,0,255)">01011011</span>
```

Puesto que es sólo una serie de números de 8 bits, todo lo que hay que hacer para conseguir colores individuales es hacer un _casting_ al número de 32 bits.

```bash
//Obtenemos la dirección de memoria del píxel
Uint8 *colors = (Uint8*)&pixel;

//Obtenemos los colores individuales
red = colors[ 0 ];
green = colors[ 1 ];
blue = colors[ 2 ];
```

Por lo general nunca necesitarás hacer esto. Para obtener los colores individuales de un píxel se debe usar `SDL_GetRGB()`. Explicaré porqué:

Probablemente estarás pensando que hay un error. 8 bits por color * 3 colores = 24 bits. ¿Qué pasa con los otros 8 bits?, los 8 bits restantes son los que se usan para el canal alfa del píxel.

El alfa controla la transparencia del píxel. El valor 255 para el alfa quiere decir que el píxel es completamente opaco y 0 completamente transparente. A continuación hay unos ejemplos de una imagen sobre un fondo blanco. Cada imagen tiene un valor para el alfa distinto:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://2.bp.blogspot.com/_IlK2pNFFgGM/TUK2lKrtn2I/AAAAAAAAASs/vVyJ2YkO3oY/s320/255.jpg"></amp-img>
    <figcaption>En esta imagen el alfa esta a 255.</figcaption>
</figure>

<figure>
  <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://1.bp.blogspot.com/_IlK2pNFFgGM/TUK2lEXQZAI/AAAAAAAAAS0/kyR_W-tWVo0/s320/192.jpg"></amp-img>
  <figcaption>En esta imagen el alfa esta a 192. Se puede ver como el fondo blanco empieza a mostrarse a través de la imagen.</figcaption>
</figure>

<figure>
  <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://2.bp.blogspot.com/_IlK2pNFFgGM/TUK2lWOQFWI/AAAAAAAAAS8/R3cn8kuccy0/s320/128.jpg"></amp-img>
  <figcaption>En esta imagen el alfa esta a 128. Aproximadamente el 50% de transparencia.</figcaption>
</figure>

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="240" width="320" src="https://4.bp.blogspot.com/_IlK2pNFFgGM/TUK2luEZy5I/AAAAAAAAATE/pa2iI4pX_Pk/s320/0.jpg"></amp-img>
  <figcaption>En esta imagen el alfa esta a 0. Completamente transparente.</figcaption>
</figure>

Asi que así es como un píxel de 32 bit `RGBA` está hecho.

Hay diferentes formatos de píxeles. Los colores pueden ir en distinto orden, como `BGRA` (Blue, Green, Red y Alfa.). `ABGR` es más o menos lo mismo pero con el alfa en primer lugar. Los píxeles también pueden tener distintos tamaños, como los bitmap (24 bit BGR). También los hay de 16 bit, que almacenan los valores así: 5 bits para el Rojo, 5 para el verde, 5 para el azul y 1 para el alfa.

Hay muchos formatos más, pero no vamos a entrar en detalle. Al tener todos estos formatos de pixel lo que hay que hacer es pasar un `SDL_PixelFormat` a `SDL_MapRGB()` y `SDL_GetRGB()` ya que las funciones saben cómo trabajar con los píxeles.

Los distintos formatos de imágenes son la razón por la que no podemos fusionar imagenes que sean de distinto formato. Si se copia un píxel `ABGR` en una imagen con formato `RGBA` los colores estarán todos mal. SDL puede convertir los píxeles en _el aire_, pero esto consume mucha CPU. Por eso en todas las lecciones convertimos las imágenes al formato de la pantalla cuando las cargamos en nuestra función `load_image()`.

Hay mucho más que hablar sobre los píxeles, por ejemplo como funciona la conversión de píxeles, pero es algo de lo que no hay que preocuparse a no ser que se trabaje a muy bajo nivel. Por ahora ya conoce todo lo básico acerca de las imágenes.

Como reflexión, ya que todos los píxeles RGB son combinaciones de 3 números, ¿No sería posible contar todos ellos para mostrar todas las combinaciones posibles?. Y si las imágenes son combinaciones de píxeles, ¿No sería posible contar cada combinación posible de píxeles y mostrar todas las imágenes posibles que podrías existir?

Eso estaria bien, ¿no? =)

 [1]: https://elbauldelprogramador.com/programacion-para-juegos-leccion-5/