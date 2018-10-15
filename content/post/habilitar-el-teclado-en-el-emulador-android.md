---
author: alex
categories:
- how to
- android
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-04T20:41:02+01:00
description: "En ocasiones, al crear un emulador Android, aún habiendo habilitado  el soporte para teclado éste no funciona. Hoy veremos cómo habilitar el teclado  en el emulador Android y, además, cómo habilitar la navegación mediante  los cursores del teclado."
image: "2014/08/Cómo-habilitar-el-teclado-en-el-emulador-Android.png"
url: /habilitar-el-teclado-en-el-emulador-android/
title: "Cómo habilitar el teclado en el emulador Android"
---

En ocasiones, al crear un emulador [Android][1], aún habiendo habilitado el soporte para teclado éste no funciona. Hoy veremos cómo habilitar el teclado en el emulador Android y, además, cómo habilitar la navegación mediante los cursores del teclado.

<!--more--><!--ad-->

# Habilitar el teclado en el emulador Android

Al crear un emulador, hemos de marcar las siguientes casillas:

<figure>
    <a href="/img/2014/08/Cómo-habilitar-el-teclado-en-el-emulador-Android.png"><img sizes="(min-width: 472px) 472px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/08/Cómo-habilitar-el-teclado-en-el-emulador-Android.png" title="Cómo habilitar el teclado en el emulador Android" alt="Cómo habilitar el teclado en el emulador Android" width="472px" height="532px" /></a>
    <span class="image-credit">Crédito de la imagen: <a href="http://stackoverflow.com/users/204480/james-wald" title="Perfil en StackOverflow" target="_blank">James Wald</a> en StackOverflow</span>
</figure>

Pero si ésto no funciona, debemos modificar el fichero de configuración del emulador. Normalmente éstos ficheros se encuentran en `~/.android/avd/<emulator-device-name>.avd/config.ini`. Una vez en el fichero, añadimos la línea `hw.keyboard=yes`. Guardamos y al iniciar el emulador deberemos poder escribir con el teclado.

## Habiliar teclado en todos los emuladores

Si dispones de muchos emuladores, es posible habilitar el teclado en todos ellos con:

```bash
for f in ~/.android/avd/*.avd/config.ini; do echo 'hw.keyboard=yes' >> "$f"; done
```

# Habilitar la navegación con los cursores

De igual manera, pero esta vez hay que añadir `hw.dPad=yes` al fichero de configuración, para habilitarlo en todos los emuladores:

```bash
for f in ~/.android/avd/*.avd/config.ini; do echo 'hw.dPad=yes' >> "$f"; done
```

# Referencias

- *Respuesta de James Wald a * »» <a href="http://stackoverflow.com/a/11252510/1612432" target="_blank">Android emulator doesn't take keyboard input - SDK tools rev 20</a>

[1]: https://elbauldelprogramador.com/curso-programacion-android/ "Curso Programación Android"
