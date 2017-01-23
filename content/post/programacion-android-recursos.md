---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-09-25'
lastmod: 2016-09-20
layout: post.amp
mainclass: android
permalink: /programacion-android-recursos/
tags:
- curso android pdf
- recursos android
title: "Programaci\xF3n Android: Recursos - Introducci\xF3n"
---

Ya hemos visto que Android separa los recursos (imágenes, sonidos etc) del código colocándolos organizados dentro del directorio ***./res***. Esto nos facilita su mantenimiento, además de permitirnos usar diferentes recursos dependiendo de la configuración del terminal.

<!--more--><!--ad-->

Separar los recursos permite proporcionar alternativas para dar soporte a las distintas configuraciones de dispositivos, como idiomas o tamaños de pantalla. Para conseguir compatibilidad con las diferentes configuraciones, debemos organizar los recursos en el directorio ***./res*** de nuestros proyectos, dentro de subdirectorios para agruparlos por tipo y configuración.

Un recurso puede usarse por defecto (Se mostrará en cualquier dispositivo, independientemente de su configuración), o pueden especificarse recurosos alternativos (Que se mostrán en los dispositivos para configuraciones determinadas), veámoslo con unas imágenes de ejemplo:

Dos dispositivos distintos, usando recursos por defecto:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Recursos en Android" alt="Recursos en Android"  height="137" width="421" src="https://4.bp.blogspot.com/-i4yy82wXUUw/TjApp4KaOZI/AAAAAAAAAs4/pvOrsmzXM24/s800/resource_devices_diagram1.png"></amp-img>
</figure>

Dos dispositivos distintos, usando recursos alternativos:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Recursos en Android" alt="Recursos en Android"  height="137" width="421" src="https://3.bp.blogspot.com/-gHivH4Mcffk/TjAp28O15AI/AAAAAAAAAtA/CbSojjJctp0/s800/resource_devices_diagram2.png"></amp-img>
</figure>

Por ejemplo, podemos crear iconos más pequeños para que sean mostrados en los terminales con pantallas más pequeñas o diseñar una disposición de pantalla diferente para cuando la aplicación se esté ejecutando en modo apaisado, para conseguir esto, simplemente creamos una carpeta de recursos añadiendo el sufijo que indica la situación en la que debe usarse.

Para el caso del idioma, crearíamos un archivo xml con las cadenas traducidas a dicho idioma, en este caso inglés, y lo colocaríamos dentro de ***./res/values-en/strings.xml***.

Para el caso del layout personalizado cuando la pantalla esté en modo apaisado, meteríamos nuestro layout dentro de ***res/layout-land/***

Para saber más acerca de los tipos de sufijos que se pueden usar, visita [Providing Resources en la página oficial de Android.][1]

## Siguiente Tema: [Programación Android: Recursos - Usando recursos][2]


 [1]: http://developer.android.com/guide/topics/resources/providing-resources.html
 [2]: https://elbauldelprogramador.com/programacion-android-recursos-usando/