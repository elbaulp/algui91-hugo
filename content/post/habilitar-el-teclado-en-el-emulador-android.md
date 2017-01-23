---
author: alex
categories:
- how to
color: '#689F38'
date: '2016-01-01'
description: "En ocasiones, al crear un emulador Android, a\xFAn habiendo habilitado
  el soporte para teclado \xE9ste no funciona. Hoy veremos c\xF3mo habilitar el teclado
  en el emulador Android y, adem\xE1s, c\xF3mo habilitar la navegaci\xF3n mediante
  los cursores del teclado."
image: "2014/08/C\xF3mo-habilitar-el-teclado-en-el-emulador-Android.png"
lastmod: 2015-12-24
layout: post.amp
mainclass: android
permalink: /habilitar-el-teclado-en-el-emulador-android/
tags:
- habilitar el teclado en el emulador Android
- hw.dPad=yes
- hw.keyboard=yes
title: "C\xF3mo habilitar el teclado en el emulador Android"
---

En ocasiones, al crear un emulador [Android][1], aún habiendo habilitado el soporte para teclado éste no funciona. Hoy veremos cómo habilitar el teclado en el emulador Android y, además, cómo habilitar la navegación mediante los cursores del teclado.

<!--more--><!--ad-->

## Habilitar el teclado en el emulador Android

Al crear un emulador, hemos de marcar las siguientes casillas:

<figure>
<a href="/img/2014/08/Cómo-habilitar-el-teclado-en-el-emulador-Android.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/08/Cómo-habilitar-el-teclado-en-el-emulador-Android.png" title="{{ page.title }}" alt="{{ page.title }}" width="472px" height="532px" /></a>
<span class="image-credit">Crédito de la imagen: <a href="http://stackoverflow.com/users/204480/james-wald" title="Perfil en StackOverflow" target="_blank">James Wald</a> en StackOverflow</span>
</figure>

Pero si ésto no funciona, debemos modificar el fichero de configuración del emulador. Normalmente éstos ficheros se encuentran en `~/.android/avd/<emulator-device-name>.avd/config.ini`. Una vez en el fichero, añadimos la línea `hw.keyboard=yes`. Guardamos y al iniciar el emulador deberemos poder escribir con el teclado.

### Habiliar teclado en todos los emuladores

Si dispones de muchos emuladores, es posible habilitar el teclado en todos ellos con:

```bash
for f in ~/.android/avd/*.avd/config.ini; do echo 'hw.keyboard=yes' >> "$f"; done

```

## Habilitar la navegación con los cursores

De igual manera, pero esta vez hay que añadir `hw.dPad=yes` al fichero de configuración, para habilitarlo en todos los emuladores:

```bash
for f in ~/.android/avd/*.avd/config.ini; do echo 'hw.dPad=yes' >> "$f"; done

```

#### Referencias

*Respuesta de James Wald a * »» <a href="http://stackoverflow.com/a/11252510/1612432" target="_blank">Android emulator doesn't take keyboard input - SDK tools rev 20</a>

[1]: https://elbauldelprogramador.com/curso-programacion-android/ "Curso Programación Android"


</emulator-device-name>