---
author: alex
categories:
- how to
- linux
color: '#E64A19'
date: '2016-01-01'
mainclass: dev
url: /wxmaxima-encontro-un-error-durante-la-carga/
tags:
- convertir a utf8 maxima
- wxmaxima error
title: "C\xF3mo resolver el error &#8216;wxMaxima encontr\xF3 un error durante la
  carga&#8217;"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/06/Maxima.png" alt="wxMaxima encontró un error durante la carga" width="271px" height="256px" />
En la facultad solemos usar wxMaxima en las prácticas de las asignturas. Hace poco al intentar abrir un fichero wxm me encontré con el siguiente error:

wxMaxima encontró un error durante la carga ó Failed to convert file to Unicode.

Que indica que wxmaxima ha encontrado un error intentando convertir el fichero a Unicode (utf-8). Para solucionar el problema deberemos convertir manualmente el fichero a utf-8. Basta con seguir los siguientes pasos:

<!--more--><!--ad-->

### Resolver el error &#8216;wxMaxima encontró un error durante la carga&#8217;

Usaremos el programa *file* para determinar el tipo de fichero:

```bash
$ file -i Pr06\ -\ Grafos.wxm
Pr06 - Grafos.wxm: text/x-pascal; charset=iso-8859-1

```

Así hemos obtenido la codificación actual del archivo, la cual nos hará falta para el siguiente paso.

Ahora necesitamos hacer una conversión de formato usando el comando *iconv* de la siguiente forma:

```bash
iconv -f ISO_8859-1 -t UTF-8 -o ficheroSalida ficheroEntrada

```

Con esto ya tendremos el fichero codificado en utf-8 y wxmaxmima lo abrirá sin problemas.

Para terminar os dejo un script que hice para convertir todos los archivos *.wxm* de una sola vez. El resultado será un fichero con el mismo nombre que el original pero de extensión *utf8.wxm*:

```bash
IFS='
'
for i in `ls *.wxm`
do
        echo -e "iconv -f ISO_8859-1 -t UTF-8 -o \"`basename "$i" .wxm`.utf8.wxm\" \"$i\""
        iconv -f ISO_8859-1 -t UTF-8 -o "`basename "$i" .wxm`.utf8.wxm" "$i"
done
IFS=' '

```

Hay que decir, sin embargo, que es posible ahorrarse todo esto si se guardaran todos los ficheros de wxmaxima con la extensión *.wxmx*.

#### Referencias

*ubuntudriver* »» <a href="http://ubuntudriver.blogspot.com.es/2011/06/cambiar-codificacion-de-un-archivo.html" target="_blank">Cómo Cambiar la Codificación de un Fichero en Linux y Mac OS X</a>
