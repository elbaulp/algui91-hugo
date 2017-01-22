---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-09-21
layout: post.amp
mainclass: android
permalink: /programacion-android-recursos-2/
tags:
- curso android pdf
- recursos compilados
- recursos no compilados
title: "Programaci\xF3n Android: Recursos compilados y no compilados"
---

Android soporta principalmente dos tipos de recursos: archivos XML y archivos raw (como imágenes, audio y vídeo). Incluso dentro de los archivos XML, has podido ver que en algunos casos los recursos están definidos como valores dentro del archivo XML (las cadenas de texto, por ejemplo). En otras ocasiones, un archivo XML es un recurso por sí mismo, como los Layout.

Podemos encontrar dos tipos de archivos XML: uno se compilará a un formato binario y el otro se copiará tal como es al dispositivo. Como ejemplo podemos poner los ficheros XML de recursos[ string ][1]y los ficheros de [layout][2], ambos se compilarán a un formato binario antes de formar parte del paquete de instalación. Estos ficheros XML tienen formatos predefinidos en los que los nodos XML se traducen a IDs.

<!--more--><!--ad-->

Por supuesto, también se pueden elegir archivos XML para guardarlos con su formato propio, estos archivos no serán interpretados y se les asignará un ID de recurso para poder identificarlos. Sin embargo, podemos querer que estos ficheros también se compilen a un formato binario. Para lograrlo, hay que colocarlos bajo el directorio ***./res/xml***. En tal caso, deberemos usar los lectores XMl que proporciona Android para acceder a los nodos del fichero.

Si colocamos cualquier tipo de archivo, incluyendo ficheros XML, bajo ***./res/raw***, no se compilarán a un formato binario. Deberemos entonces, para leerlos, usar Stream. Los archivos de audio y vídeo entran en esta categoría también.

Hay que destacar, que al formar parte el directorio rar de ./res/*, incluso estos archivos raw de audio y vídeo serán localizados como todos los demás recursos.

Como vimos, los recursos se almacenan en varios subdirectorios según su tipo, a continuación vemos algunos de los subdirectorios más importantes de la carpeta res.:

* __anim__: Archivos compilados de animaciones.
* __drawable__: Bitmaps
* __layout__: definición de vistas y UI.
* __values__: Arrays, colores, dimensiones, strings y estilos.
* __xml__: fircheros XML arbitrarios.
* __raw__: ficheros raw no compilados.

El compilador de recursos AAPT (Android Asset Packaging Tool), compila todos los recursos excepto los raw y lo coloca en el fichero .apk (Android package) final. Este fichero es el que contiene el código de las aplicaciones Android y los recursos, similar a los .jar de Java. Estos ficheros son los que usamos para instalar aplicaciones en Android.

## Siguiente Tema: [Programación Android:Recursos - Arrays de strings][3]

 [1]: https://elbauldelprogramador.com/programacion-android-recursos-strings
 [2]: https://elbauldelprogramador.com/programacion-android-recursos-layout
 [3]: https://elbauldelprogramador.com/programacion-android-recursos-arrays-de/