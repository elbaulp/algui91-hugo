---
author: alex
categories:
- linux
- opensource
- so
color: '#2196F3'
lastmod: 2016-10-26
layout: post.amp
mainclass: linux
permalink: /encontrar-archivos-abiertos-en-linux/
title: Encontrar archivos abiertos en Linux
---

¿Cómo podemos saber cuantos archivos tenemos abiertos o hasta cuantos podemos permitir que están abiertos en Linux?

Por defecto el kernel de Linux establece un límite (para propósitos de seguridad) de hasta cuantos descriptores de archivos abiertos están permitidos en los sitemas linux servidor o escritorio.

El archivo <a target="_blank" href="http://www.cyberciti.biz/tips/linux-procfs-file-descriptors.html">/proc/sys/fs/file-nr</a> es un archivo de solo lectura que proporciona el número de archivos actuales abiertos.

<!--more--><!--ad-->

## Encontrar cuantos archivos hay abiertos

Para ver el estado actual, introducimos:

```bash
cat /proc/sys/fs/file-nr
```

Ó:

```bash
/sbin/sysctl fs.file-nr
```

Como salida podemos obtener (en mi caso):

```bash
5344 0 205074
```

Este resultado contiene 3 números que significan:

* ___5344___: El número de archivos asignados a manipular.
* ___0___: El número de manejadores libres.
* ___205074___: El número máximo de manejadores de archivos.

El kernel de Linux asigna los identificadores de archivos de forma dinámica, pero no los libera de nuevo. Si el número de archivos asignados se encuentra cercano al máximo, se debe considerar aumentar el <a target="_blank" href="http://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/">número máximo de archivos abiertos permitidos</a> editando el archivo <a target="_blank" href="http://www.cyberciti.biz/faq/making-changes-to-proc-filesystem-permanently/">/etc/sysctl.conf</a>
