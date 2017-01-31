---
author: alex
categories:
- how to
date: '2016-01-01'
description: "Hace poco actualic\xE9 mi Samsung Galaxy S II (GT-I9100) a CyanogenMod
  10.1 y me d\xED cuenta que las opciones de desarrollador en [Android][1] 4.2 no
  estaban donde siempre, en la configuraci\xF3n del tel\xE9fono. As\xED que buscando
  un poco encontr\xE9 la respuesta. A fin de mejorar la experiencia del usuario, Google
  ha escondido por defecto esta opci\xF3n."
mainclass: articulos
lastmod: 2017-01-31
url: /activar-opciones-de-desarrollador-en-android-4-2/
tags:
- android
- android 4.2
- desactivar Simular pantallas secundarias
- modo ingeniero android
- opciones de desarrollador android
- opciones de desarrollo android
- problema Simulate secondary displays
- Simulate secondary displays
- xda
title: "C\xF3mo activar opciones de desarrollador en Android 4.2"
---

Hace poco actualicé mi Samsung Galaxy S II (GT-I9100) a CyanogenMod 10.1 y me dí cuenta que las opciones de desarrollador en [Android][1] 4.2 no estaban donde siempre, en la configuración del teléfono. Así que buscando un poco encontré la respuesta. A fin de mejorar la experiencia del usuario, Google ha escondido por defecto esta opción.

<!--more--><!--ad-->

Si quieres activarla has de ir a **Configuración » Acerca del teléfono » Número de compilación** (*Settings » About phone » Build number*) y pulsarlo siete veces.

Una vez activado, eché un vistazo a ver qué opciones nuevas había. Activé una llamada **Simular pantallas secundarias** (*Simulate secondary displays*) y el teléfono se quedó bloqueado. Reinicié y el teléfono había quedado en un bucle infinito en el proceso de inicio. Lo primero que pensé fue en volver a flashear la ROM. Pero una vez más buscando un poco por internet encontré una respuesta más adecuada, que no requería flashear.

# Desactivar la opción Simulate secondary displays (Simular pantallas secundarias)

La respuesta concretamente la encontré en el foro de [XDA][2]. Como sabía que el problema lo había causado la opción **Simular pantallas secundarias** bastaba con desactivarla para volver a la normalidad. Resulta que Android posee de un modo de *rescate o modo seguro* que se puede iniciar manteniendo pulsadas todas las teclas excepto el botón de encendido en el proceso de arranque:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Screenshot_2013-03-03-13-48-30.png" alt="Safe Mode in Android o Modo rescate en Android" width="480px" height="800px" />
</figure>

Una vez en el modo rescate, desactivé la opción y problema resuelto.

# Referencias

- *New built-in developer options* »» <a href="http://developer.android.com/about/versions/jelly-bean.html#42-dev-options" target="_blank">developer.android.com</a>
- *developer options disappear from settings* »» <a href="http://stackoverflow.com/questions/13558969/developer-options-disappear-from-settings" target="_blank">stackOverflow</a>
- *&#091;Q&#93; Help! Messed with 'Simulate Secondary Display' settings!* »» <a href="http://forum.xda-developers.com/showthread.php?t=2076180" target="_blank">forum.xda-developers</a>


 [1]: https://elbauldelprogramador.com/tags/android
 [2]: https://elbauldelprogramador.com/tags/xda
