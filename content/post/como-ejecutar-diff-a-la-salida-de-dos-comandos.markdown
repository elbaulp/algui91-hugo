---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-01-07 11:54:12
description: "Recientemente necesit\xE9 ejecutar el comando `diff` sobre la salida
  de otros dos comandos. Es decir, `diff` recibe como par\xE1metros los ficheros sobre
  los que se quiere mostrar las diferencias, pero yo buscaba hacer un `diff` a la
  salida de dos comandos, no dos ficheros."
image: Como-Ejecutar-Diff-a-La-Salida-De-Dos-Comandos.png
layout: post.amp
mainclass: dev
tags:
- comando diff
- ejemplos diff
- diff sin ficheros
- diff con parametros
- diff salida dos comandos
- "diff tuber\xEDas"
- diff pipes
title: "C\xF3mo Ejecutar Diff a La Salida De Dos Comandos"
---

# Problema

Recientemente necesité ejecutar el comando `diff` sobre la salida de otros dos comandos. Es decir, `diff` recibe como parámetros los ficheros sobre los que se quiere mostrar las diferencias, pero yo buscaba hacer un `diff` a la salida de dos comandos, no dos ficheros. Un ejemplo:

<!--more--><!--ad-->

```bash

$ diff $(readelf --all ./helloc) $(readelf --all ./hellocpp)

```

Este fue el comando que me vino a la cabeza inmediatamente, pero no funciona, ya que `$()` sustituye el resultado del comando en su interior, en este caso `readelf`. De este modo `diff` recibe como parámetros el resultado de ejecutar ese comando. Veamoslo más claro:

```bash

$ diff $(ls dir1) $(ls dir2)

```

Al sustituir el resultado de `ls dir1`, `diff` recibe como parámetros los ficheros del directorio 1, y no es eso lo que queremos. Queremos la diferencia entre ambos directorios.

Bastó una rápida consulta a Google para solucionar el problema.

# Solución

En _askubuntu_, el usuario <a href="http://askubuntu.com/users/23949/ternary" target="_blank" title="Ternary url">Ternary</a> preguntó exáctamente lo mismo que yo intentaba resolver, <a href="http://askubuntu.com/users/1059/gilles" target="_blank" title="Guilles home">Guilles</a> proporcionó la solución, veamos:

```bash

$ diff <(readelf --all ./helloc) <(readelf --all ./hellocpp)

```

Listo, no es necesario nada más que reemplazar `$` por `<`, esto realiza una <a href="http://www.gnu.org/software/bash/manual/bash.html#Process-Substitution" target="_blank" title="Manual gnu">sustitución de procesos</a> en lugar de sustitución de comandos. El resultado es que ahora `diff` tendrá como parámetros descriptores de ficheros (`diff /dev/fd/5 /dev/fd/6`) correspondientes a dos `pipes` creadas por bash. Cuando `diff` abre dichos ficheros, se conecta al lado de lectura de cada _pipe_ o tubería, mientras que el lado de escritura de cada tubería está conectado al comando `readelf`.

### Referencias

Cómo ejecutar diff a la salida de dos comandos | [askubuntu.com](http://askubuntu.com/questions/229447/how-do-i-diff-the-output-of-two-commands "How do I diff the output of two commands")
