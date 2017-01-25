---
author: alex
categories:
- aplicaciones
- c
color: '#E64A19'
date: '2016-01-01'
lastmod: 2016-08-13

mainclass: dev
url: /ocultarrevelar-informacion-dentro-de/
aliases: /programacion/ocultarrevelar-informacion-dentro-de/
tags:
- esconder informacion en imagen
- ocultar texto en imagen
title: "Ocultar/Revelar informaci\xF3n dentro de im\xE1genes con C++"
---

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  src="https://lh4.ggpht.com/_IlK2pNFFgGM/TROxbBd0LMI/AAAAAAAAAOA/YQiMnAyp4EQ/text-x-c%2B%2Bsrc.png"></amp-img>
</figure>

El jueves pasado me mandaron hacer una práctica en MP (Metodología de la Programación) que consiste en la inserción y extracción de un mensaje &#8216;oculto&#8217; en una imagen.

El mensaje se oculta modificando el valor de cada pixel para que contenga parte de la información a ocultar. El tipo de imágenes que se usan son **pgm y ppm**, en blanco y negro y a color respectivamente. Voy a explicar en detalle en qué consiste el programa:

>Toda la parte explicativa está extraida del enunciado del problema.

<!--more--><!--ad-->



### Imágenes PGM (Portable Grey Map file format)

Para representar las imágenes en blanco y negro podemos usar un rango de valores para indicar todas las tonalidades de gris que van desde el negro hasta el blanco. En nuestro caso, las imágenes almacenarán en cada píxel un valor de gris desde el 0 al 255. Por ejemplo, un píxel con valor 128 tendrá un gris intermedio entre blanco y negro.


La elección del rango [0,255] se debe a que esos valores son los que se pueden representar en un byte(8 bits). Por tanto, si queremos almacenar una imagen de niveles de gris,
necesitaremos ancho⋅alto bytes.

En la siguiente figura se muestra un ejemplo de imagen 256&#215;256 de niveles de gris. Observe el zoom de una región 10&#215;10 para apreciar con detalle los grises que la componen:

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="215" width="400" src="https://1.bp.blogspot.com/-HM2vxizK_lg/T2Ynr-0h-3I/AAAAAAAACPM/uc-h3WbSs6Y/s400/Screenshot%2B-%2B03182012%2B-%2B07%253A21%253A10%2BPM.png"></amp-img>
</figure>

### Imágenes PPM (Portable Pix Map file format)

Para representar un color de forma numérica, no es fácil usar un único valor, sino que se deben incluir tres números. Existen múltiples propuestas sobre el rango de valores y el significado de cada una de esas componentes, generalmente adaptadas a diferentes objetivos y necesidades.

En una imagen en color, el contenido de cada píxel será una tripleta de valores según un determinado modelo de color. En esta práctica consideraremos el modelo RGB. Este modelo es muy conocido, ya que se usa en dispositivos como los monitores, donde cada color se representa como la suma de tres componentes: rojo, verde y azul.

Podemos considerar distintas alternativas para el rango de posibles valores de cada componente, aunque en la práctica, es habitual asignarle el rango de números enteros desde el 0 al 255, ya que permite representar cada componente con un único byte, y la variedad de posibles colores es suficientemente amplia. Por ejemplo, el ojo humano no es capaz de distinguir un cambio de una unidad en cualquiera de las componentes.

En el caso de este tipo de imágenes, en lugar de 1 byte por pixel, se usan 3, uno por cada componente de color.

### Ocultar/Revelar un mensaje

Si tenemos en cuenta que los valores que se almacenan en cada píxel corresponden a un valor en el rango [0,255] y que, por tanto, el contenido de una imagen no es más que una secuencia de valores consecutivos en este rango. Si consideramos que el ojo humano no es capaz de detectar cambios muy pequeños en dichos valores, podemos insertar el mensaje deseado modificando ligeramente cada uno de ellos. Concretamente, si cambiamos el valor del bit menos significativo, habremos afectado al valor del píxel, como mucho, en una unidad de entre las 255. La imagen la veremos, por tanto, prácticamente igual.

Ahora que disponemos del bit menos significativo para cambiarlo como deseemos, podemos usar todos los bits menos significativos de la imagen para codificar el mensaje. Por otro lado, el mensaje será una cadena-C, es decir, una secuencia de valores de tipo char que terminan en un cero. En este caso, igualmente, tenemos una secuencia de bytes (8 bits) que queremos insertar en la imagen. Dado que podemos modificar los bits menos significativos de la imagen, podemos “repartir” cada carácter del mensaje en 8 píxeles consecutivos. En la siguiente figura mostramos un esquema que refleja esta idea:

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="125" width="400" src="https://2.bp.blogspot.com/-nwIaqapwV4o/T2YqBj4r0LI/AAAAAAAACPY/r8DKpFArxa8/s400/Screenshot%2B-%2B03182012%2B-%2B07%253A31%253A18%2BPM.png"></amp-img>
</figure>

Donde los valores de arriba corresponden a los píxeles de la imágen y los de abajo al mensaje.

Hasta aquí el planteamiento del problema. Para resolverlo va a ser necesario usar operadores a nivel de bits, que en C++ son los siguientes:

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="273" width="400" src="https://2.bp.blogspot.com/-WPpC6XNKFfE/T2Yr3ccQAAI/AAAAAAAACPo/n7ddoxUaC90/s400/Screenshot%2B-%2B03182012%2B-%2B07%253A39%253A03%2BPM.png"></amp-img>
</figure>

Siento no poder poner algún trozo de código de ejemplo para que lo veáis, pero debido a que son unas prácticas evaluables, no puedo arriesgarme a que algún compañero copie el código. (Que ya me pasó una vez y me suspendieron). Sin embargo os dejo unas capturas del programa:

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="316" width="400" src="https://1.bp.blogspot.com/-sXM7u0P77Y8/T2YuiaI_NuI/AAAAAAAACP0/whBXKD_rcPI/s400/ejemplo.png"></amp-img>
</figure>

Como podéis comprobar, Lenna aparentemente no ha cambiado su aspecto :D. En el caso de la imagen a color pasaría exactamente lo mismo.

Una vez terminado el programa, se me ocurrió trastear un poco con la información de los píxeles, he aquí el resultado.

Por ejemplo, si para cada pixel invertimos sus valores, es decir, cambiar 0 por 1 y 1 por 0, obtenemos una imagen en negativo:

```cpp
//Esto va dentro de un bucle que recorre todos los pixeles de la imagen,
//ambas sentencias son equivalentes
buffer[i] ^= 0xff;      //igual que buffer[i] = buffer[i] ^ 0xff
buffer[i] = ~buffer[i]; //igual que buffer[i] = ~buffer[i]
```

El resultado es:

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="175" width="320" src="https://3.bp.blogspot.com/-_DE2i5TQNZ4/T2Ywb7jrYmI/AAAAAAAACQA/149R0QIZXiQ/s320/invertidas.png"></amp-img>
</figure>

Si por ejemplo desplazamos todos los bits a la derecha una posición, iremos haciendo la imagen más oscura:

```cpp
buffer[i] >>= 1; //Más oscura
```

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="316" width="320" src="https://2.bp.blogspot.com/-7ZGLJJVhVgE/T2YxwfFUPwI/AAAAAAAACQM/Y0GbfsbP5QQ/s320/oscura.png"></amp-img>
</figure>

Por último, si deplazamos todos los bits la izquierda una posición, es decir, pasa lo siguiente:

```cpp
buffer[i] < <=1;
```

<figure>
   <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="177" width="320" src="https://1.bp.blogspot.com/-foHh4zTqIws/T2YyemfSLUI/AAAAAAAACQY/AEZr2nNe41U/s320/clara.png"></amp-img>
</figure>

Eso es todo, Saludos!
