---
author: alex
categories:
- articulos
date: 2017-08-11T12:05:27+01:00
lastmod: 2017-08-11T12:05:25+01:00
description: "Es posible que a vosotros también os haya ocurrido. Al realizar una  operación de copiar un fichero grande a un usb en linux, o simplemente muchos  ficheros que requieran tiempo para copiar, el sistema operativo se cuelga y va muy  lento. Buscando un poco encontré una posible solución al problema. Veámosla:"
image: hotlink-ok/Por-Que-Se-Cuelga-Linux-Al-Copiar-Ficheros-a-un-Usb.png
mainclass: articulos
tags:
- usb
- linux
- usb se cuelga
- usb lento
title: "¿Por Qué Se Cuelga Linux Al Copiar Ficheros a Un Usb?"
---

<figure>
    <amp-img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Por-Que-Se-Cuelga-Linux-Al-Copiar-Ficheros-a-un-Usb.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="320px" />
    <figcaption>Crédito de la imagen: <a href="https://pixabay.com/en/usb-drive-storage-plug-flash-38264/">pixabay.com</a></figcaption>
</figure>


Es posible que a vosotros también os haya ocurrido. Al realizar una operación de copiar un fichero grande a un usb en linux, o simplemente muchos ficheros que requieran tiempo para copiar, el sistema operativo se cuelga y va muy lento. Buscando un poco encontré una posible solución al problema. Veámosla:

> La respuesta la encontré en <a href="http://unix.stackexchange.com" target="_blank" title="stackexchange">unix.stackexchange</a>, en una pregunta que realizó el usuario <a href="http://unix.stackexchange.com/users/52763/mikhail-morfikov" target="_blank" title="">Mikhail Morfikov</a>. Y la respuesta la dió el usuario <a href="http://unix.stackexchange.com/users/52205/rmano" target="_blank" title="">Rmano</a>.

<!--more--><!--ad-->

# Descripción del problema

Este problema ocurre en sistemas de 64bits con bastante memoria, es un bug del <a href="http://lwn.net/Articles/572911/" target="_blank" title="">kernel</a> pendiente de resolver.

# Cómo solucionar el cuelgue del sistema al copiar ficheros a un usb

Una posible solución consiste en ejecutar los siguientes comandos como _root_ :

```bash

echo $((16*1024*1024)) > /proc/sys/vm/dirty_background_bytes
echo $((48*1024*1024)) > /proc/sys/vm/dirty_bytes

```

Si queremos que se conserven entre reinicios, debemos añadirlos al fichero `/etc/rc.local`

Sin embargo, cambiar dichos valores afectará a la tasa de transferencia entre el usb y el disco duro, así que los ficheros tardarán más tiempo en copiarse, pero al menos el sistema no se colgará y podremos seguir usándolo.

# Restaurar los valores por defecto

Para volver a los valores normales, hay que fijar los valores a

```bash
echo 0 > /proc/sys/vm/dirty_background_bytes
echo 0 > /proc/sys/vm/dirty_bytes
```

El significado de estos parámetros es:

- `/proc/sys/vm/dirty_background_bytes`: Contains the amount of dirty memory at which the background kernel flusher threads will start writeback.
- `/proc/sys/vm/dirty_bytes`: Contains the amount of dirty memory at which a process generating disk writes will itself start writeback.

# Referencias

Why is my PC freezing while I'm copying a file to a pendrive? \| [unix.stackexchange.com](http://unix.stackexchange.com/questions/107703/why-is-my-pc-freezing-while-im-copying-a-file-to-a-pendrive "Why is my PC freezing while I'm copying a file to a pendrive?")
