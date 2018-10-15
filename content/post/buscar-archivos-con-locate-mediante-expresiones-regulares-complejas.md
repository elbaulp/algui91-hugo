---
author: alex
categories:
- linux
mainclass: linux
date: '2016-01-01'
lastmod: 2017-09-24T19:23:13+01:00
description: "En linux, existe un comando llamado locate que busca archivos en nuestro  sistema de ficheros haciendo consultas a una base de datos, la descripción según  su man es:"
image: 2013/11/Buscar-archivos-con-locate-mediante-expresiones-regulares-complejas.png
url: /buscar-archivos-con-locate-mediante-expresiones-regulares-complejas/
tags:
- locate
- regex
- script
title: Buscar archivos con locate mediante expresiones regulares
---

En linux, existe un comando llamado **locate** que busca archivos en nuestro sistema de ficheros haciendo consultas a una base de datos, la descripción según su *man* es:

> Locate lee una o más [bases de datos][1] preparadas por updatedb y escribe a la salida estandar los nombres de los archivos que coincidan con al menos uno de los patrones, uno por línea.

El motivo de este artículo viene dado por un problema que me planteé hace unos días. Resulta que tengo en un archivo los nombres de algunas de mis <a href="http://www.youtube.com/playlist?list=PLINUjqv9_oyrI4SXWqf-sBhoUnxHe2bRh" title="Lista de reproducción EPIC3" target="_blank">canciones preferidas</a>. Este archivo lo voy actualizando regularmente y quería generar una lista de reproducción en base a dicho fichero. Así que he creado un [script][2] que recorre todos los elementos del archivo y busca dónde se encuentra el fichero en mi disco duro.

# Expresiones regulares en Locate

<!--more--><!--ad-->

**Locate** acepta [expresiones regulares][3] complejas, para ello hay que llamarlo con la opción `-regex`.

El problema básicamente es el siguiente. A partir de un texto con los nombres *parciales* de un fichero obtener la ruta completa a dicho archivo. Lo de parciales quiere decir que si el nombre es **Autor - Nombre Canción**, en el texto solo se guarda **Nombre Canción**.

> __Actualización__: Hace un tiempo creé este script en python para [generar listas de reproducción de una determinada duración](https://elbauldelprogramador.com/generar-listas-de-reproduccion-determinada-duracion-python/ "generar listas de reproducción de una determinada duración")

# Crear la expresión regular

Empezaré mostrando la expresión regular y luego la explicaré:

```bash
$i.*(\.mp4|\.mp3)
```

En `$i` está el nombre de la canción, `.*` permite que haya cero o más caracteres tras el nombre de la canción y finalmente `(\.mp4|\.mp3)` obliga a que la extensión del fichero sea [**mp3** o **mp4**][4].

Siempre que necesito crear una expresión regular uso una herramienta llamada **regex tester** que permite visualizar qué cadenas de texto coincidirían con el patrón:

<figure>
    <img sizes="(min-width: 627px) 627px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Buscar-archivos-con-locate-mediante-expresiones-regulares-complejas.png" title="Buscar archivos con locate mediante expresiones regulares" alt="Buscar archivos con locate mediante expresiones regulares" width="627px" height="285px"></img>
    <figcaption>Créditos: <a href="https://www.iconfinder.com/icons/33644/terminal_icon" target="_blank">inconfinder</a></figcaption>
</figure>

# Script completo

Con la expresión regular construida, solo resta crear un script que procese el texto con el nombre de las canciones y cree la lista de reproducción:

```bash
#!/bin/bash

nombres=`cat ARCHIVO_CON_LISTA_DE_NOMBRES`

IFS='
'

> /RUTA/A/LISTA/DE/REPRODUCCION/LISTA.m3u

for i in $nombres
do
    echo "locate --regex -i \"$i.*(\.mp4|\.mp3)\""
    locate --regex -i "$i.*(\.mp4|\.mp3)" | tee -a /RUTA/A/LISTA/DE/REPRODUCCION/LISTA.m3u
done
IFS=' '
```

`IFS` se establece al salto de línea para que el `for` tome como separación cada línea del archivo, en lugar de un espacio (valor por defecto de `IFS`). De esta forma, si una línea del fichero contiene **Nombre canción**, en el `for` el contenido de `$i` valdrá **Nombre canción** y no **Nombre** y en la siguiente iteración **canción**. `> /RUTA/A/LISTA/DE/REPRODUCCION/LISTA.m3u` borra el contenido de lo que tuviera la lista anteriormente para generarla de nuevo. Por último, la tubería con `tee` permite escribir tanto a la salida estándar como a la lista.

Otra opción, sugerida en Twitter por [@ingenieríainv](https://twitter.com/ingenieriainv/status/769135025216483328), es usar un `while read $i`:

```bash
#!/bin/bash

nombres=`cat ARCHIVO_CON_LISTA_DE_NOMBRES`

> /RUTA/A/LISTA/DE/REPRODUCCION/LISTA.m3u

cat $nombres | while read i
do
    echo "locate --regex -i \"$i.*(\.mp4|\.mp3)\""
    locate --regex -i "$i.*(\.mp4|\.mp3)" | tee -a /RUTA/A/LISTA/DE/REPRODUCCION/LISTA.m3u
done
```


# Referencias

- *RegEx Tester* »» <a href="http://regexpal.com/" target="_blank">regexpal.com</a>


 [1]: https://elbauldelprogramador.com/bases-de-datos/ "Bases de Datos"
 [2]: https://elbauldelprogramador.com/tags/bash "Categoría script"
 [3]: https://elbauldelprogramador.com/tags/regex "Artículos sobre expresiones regulares"
 [4]: https://elbauldelprogramador.com/cual-es-la-diferencia-entre-los-distintos-formatos-de-audio-y-cual-deberia-elegir/ "¿Cual es la diferencia entre los distintos formatos de audio, y cual debería elegir?"
