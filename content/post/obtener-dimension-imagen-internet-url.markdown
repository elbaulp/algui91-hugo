---
author: alex
categories:
- linux
color: '#2196F3'
date: 2016-10-01 16:32:13
description: "C\xF3mo obtener el ancho y alto de una imagen que est\xE1 en internet
  desde l\xEDnea de comandos"
image: obtener-dimension-imagen-internet-url.png
introduction: "C\xF3mo obtener el ancho y alto de una imagen que est\xE1 en internet
  desde l\xEDnea de comandos"
layout: post.amp
mainclass: linux
tags:
- imagenes
- imagemagick
- bash
title: "C\xF3mo Obtener La Dimensi\xF3n De Una Imagen en Internet"
---

## Problema: Dada la url de una imagen extraer sus dimensiones (Ancho y alto)

Queremos obtener las dimensiones de una imagen desde línea de comandos. La imagen puede ser local o estar en internet.  En anteriores artículos vimos algo parecido ([Cómo Añadir Automáticamente El Tamaño De Una Imagen en HTML Con Python](https://elbauldelprogramador.com/como-anadir-automaticamente-el-tamao-de-una-imagen-en-html-con-python/ "Cómo Añadir Automáticamente El Tamaño De Una Imagen en HTML Con Python").

<!--more--><!--ad-->

## Solución: el comando Identify de ImageMagick

El comando `identify` es un programa perteneciente a la suite _ImageMagick_, citamos su página `man`:

> Identify describe el formato y características de una o más imágenes. Así como informar si una imagen está incompleta o dañada. La información dada incluye: Número de imagen, nombre, dimensiones, si es a color, número de colores, tamaño en bytes, formato y el tiempo que se tardó en procesarla. Se pueden acceder a más datos con la opción `--verbose`.

De todos esos datos, en este caso solo nos interesa la dimensión. Si ejecutamos el programa y le pasamos la url de una imagen, por ejemplo una del artículo [Plumas Olímpicas, Visualización de las medallas Olímpicas desde 1896 hasta 2016](https://elbauldelprogramador.com/las-medallas-de-oro-en-las-olimpiadas-desde-1896-visualizadas/ "Plumas Olímpicas, Visualización de las medallas Olímpicas desde 1896 hasta 2016"), veremos lo siguiente:

```bash
$ identify https://elbauldelprogramador.com/img/Olympic-Feathers-Detail-7.png
https://elbauldelprogramador.com/img/Olympic-Feathers-Detail-7.png=>\
//elbauldelprogramador.com/img/Olympic-Feathers-Detail-7.png PNG 750x750\
750x750+0+0 8-bit sRGB 149KB 0.000u 0:00.000
```

Esto es útil, pero ¿qué pasa si queremos un formato en concreto? en mi caso necesitaba que me devolviera las dimensiones formateadas para insertarlas en una etiqueta `<img>`. Para ello usamos la opción `format`:

```bash
$ identify -format "width=\"%[fx:w]\" height=\"%[fx:h]\"\n" https://elbauldelprogramador.com/img/Olympic-Feathers-Detail-7.png
width="750" height="750"
```

Como vemos nos devuelve las dimensiones listas para pegarlas en la etiqueta `<img>`. Para evitar tener que escribir todo ese comando, basta con crear un `alias`:

```bash
alias imgsize='identify -format "width=\"%[fx:w]\" height=\"%[fx:h]\"\n"'
```

Y a partir de ahora usaremos el comando con `imgsize`.
