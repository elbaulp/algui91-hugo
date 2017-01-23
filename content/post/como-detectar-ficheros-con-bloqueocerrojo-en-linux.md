---
author: alex
categories:
- linux
color: '#2196F3'
date: '2016-01-01'
description: "Este art\xEDculo tiene su origen en una pregunta a la que respond\xED
  en *serverfault*, el usuario preguntaba *How to detect exceptionally long file locks
  in linux?*. Aunque mi respuesta no solucion\xF3 su problema, creo que la explicaci\xF3n
  puede ser de utilidad para alguien. A continuaci\xF3n escribo la traducci\xF3n de
  mi respuesta al usuario"
image: como-detectar-ficheros-con-bloqueocerrojo-en-linux.jpg
lastmod: 2015-12-23
layout: post.amp
mainclass: linux
url: /como-detectar-ficheros-con-bloqueocerrojo-en-linux/
tags:
- bloqueos ficheros
- cerrojos
- fcntl
- file locks
- flock
- locks
title: "\xBFC\xF3mo detectar ficheros con bloqueo/cerrojo en Linux?"
---

<figure>
<a href="/img/como-detectar-ficheros-con-bloqueocerrojo-en-linux.jpg"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/como-detectar-ficheros-con-bloqueocerrojo-en-linux.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="640px" /></a>
<span class="image-credit">Crédito de la imagen: pixabay.com</span>
</figure>

Éste artículo tiene su origen en una pregunta a la que respondí en *serverfault*, el usuario preguntaba *How to detect exceptionally long file locks in linux?*. Aunque mi respuesta no solucionó su problema, creo que la explicación puede ser de utilidad para alguien. A continuación escribo la traducción de mi respuesta al usuario:

Creo que lo que buscas es el fichero `/proc/locks`. Éste fichero muestra los archivos bloqueados actualmente en el sistema. Sin embargo, no muestra **Cuanto tiempo ha estado bloqueado un fichero**, pero sí que muestra **qué proceso lo está bloqueando**. Quizá sea posible detectar cuando se produce el bloqueo en éste fichero y medir el tiempo transcurrido. Un ejemplo de `/proc/locks` es el siguiente:

<!--more--><!--ad-->

```bash
$ cat /proc/locks
1: POSIX  ADVISORY  WRITE 2245 08:06:1182714 1073741824 1073741824
2: POSIX  ADVISORY  WRITE 2245 08:06:1182714 1073741826 1073742335
3: POSIX  ADVISORY  WRITE 3058 08:06:10752740 0 0
4: POSIX  ADVISORY  WRITE 3058 08:06:10752739 0 0
5: POSIX  ADVISORY  WRITE 2421 08:06:10752766 0 EOF
6: POSIX  ADVISORY  WRITE 2421 08:06:11142048 0 EOF
7: POSIX  ADVISORY  WRITE 2421 08:06:9964366 1073741824 1073742335
8: POSIX  ADVISORY  WRITE 2421 08:06:11142040 0 EOF

```

Donde las columnas significan:

* *Primera*: El identificador del bloqueo.
* *Segunda*: Tipo de bloqueo (POSIX si el bloqueo se hizo con `fcntl` y `FLOCK` si se creó con `flock`.)
* *Tercera*: Modo de bloqueo (ADVISORY o MANDATORY)
* *Cuarta*: Tipo de bloqueo (WRITE o READ), correspondiente a bloqueos compartidos o exclusivos.
* *Quinta*: PID del [proceso][1] que tiene el bloqueo sobre el fichero.
* *Sexta*: Tres números separados por `:`, que identifican el fichero bloqueado.
* *Séptima:* Byte donde comienza el bloqueo en el fichero.
* *Octava:* Byte donde acaba el bloqueo del fichero.

#### Referencias

*How to detect exceptionally long file locks in linux?* »» <a href="http://serverfault.com/a/593873/181098" target="_blank">serverfault.com</a>

 [1]: https://elbauldelprogramador.com/introduccion-los-procesos/ "Intro a los procesos"
