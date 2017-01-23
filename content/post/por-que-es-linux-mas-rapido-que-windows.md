---
author: alex
categories:
- articulos
color: '#F57C00'
date: '2016-01-01'
lastmod: 2015-12-28
layout: post.amp
mainclass: articulos
permalink: /por-que-es-linux-mas-rapido-que-windows/
tags:
- linux mas rapido que windows
- windows vs linux
title: "\xBFPor qu\xE9 es Linux m\xE1s r\xE1pido que Windows?"
---

En el blog <a href="http://www.techdrivein.com" title="Tech Drive In" target="_blank">techdrivein</a> escribieron un artículo hace poco a mi parecer interesante, **¿Por qué es Linux más rápido que Windows?**, veamos algunos de los motivos:

> La pregunta y su consecuente respuesta, aparecieron en un <a href="http://www.reddit.com/r/Ubuntu/comments/1w8z3g/holy_crap_i_can_browse_this_fast/cezulh4" target="_blank">hilo de Reddit</a> en el que un usuario que acababa de instalar Ubuntu en su máquina afirmaba que nunca había visto ninguna web cargar tan rápido como Reddit en su recién instalado Ubuntu.

La pregunta anterior genera mucho debate. Algunos dicen que es un mito pero la mayoría de usuarios Linux saben que no lo es. En cierta manera porque casi todo aquel que instala Linux fue un usuario Windows descontento. Sin embargo, ¿Qué hace a Linux más rápido?, citaremos los puntos que el usuario de Reddit *ok\_you\_win* mencionó.

<!--more--><!--ad-->

* Uno de los mayores beneficios ocultos de Linux es que las aplicaciones comparten archivos mejor que Windows. En lugar de usar DLLs como en Windows, Linux usa ficheros .so (Shared Objects [Objetos Compartidos]), que vienen a llamarse librerías. Existen también ficheros .ko, que son los homólogos para el kernel, de alguna manera, como los drivers en Windows.
* Una aplicación Windows puede depender de una versión muy específica de una DLL. El desarrollador de ésta aplicación no conoce en qué versión de Windows se instalará, ni tampoco qué DLL estará presente en el sistema. Por lo tanto, la solución más fácil es incluir la DLL necesaria junto a la aplicación. Como consecuencia los instaladores son mucho más pesados, ocupará más espacio en disco y usará más memoria RAM.
* Linux actua de forma diferente. Por ejemplo, si se quiere instalar el navegador web Midori, `apt-get` o el centro de software que actúe como front-end comprueba el paquete en busca de una lista de dependencias. En lugar de incluir todos los archivos, Midori sólo se limita a decir de qué aplicaciones o librerías depende.
* Por tanto, `apt-get` comprueba el sistema y detecta que el fichero `FileX.so.1` ya está instalado, y es una dependencia de Midori. Con lo cual no es necesario descargarlo e instalarlo. Éste proceso se repite para todas las dependencias del paquete a instalar (en este caso Midori) e instalará las que no existan actualmente en el sistema. Una vez satisfechas todas las dependencias, se instala el paquete en sí. Como consecuencia, cualquier programa se puede instalar más rápido y no usa tanto espacio ni en disco ni en memoria.
* El sistema `apt-get` realiza un seguimiento de cuantas aplicaciones necesitan `FileX.so.1`, de modo que si se desinstala midori y otras aplicaciones necesitan `FileX.so.1`, éste no será eliminado.

Éstos motivos no son los únicos que hacen a linux más rápido que Windows. Se pueden encontrar motivos a nivel del Kernel explicados por un <a href="http://blog.zorinaq.com/?e=74" title="I Contribute to the Windows Kernel. We Are Slower Than Other Operating Systems. Here Is Why." target="_blank">desarrollador anónimo del kernel de Windows</a>.

#### Referencias

*Why is Linux faster than Windows?* »» <a href="http://www.techdrivein.com/2014/02/why-is-linux-faster-than-windows.html" target="_blank">techdrivein.com</a>