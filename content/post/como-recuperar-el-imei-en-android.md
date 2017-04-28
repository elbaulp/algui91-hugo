---
author: alex
categories:
- articulos
date: '2016-01-01'
lastmod: 2017-03-24T14:28:35+01:00
description: "\xC9ste artículo pretende ser una guía para todo aquel que ha  perdido el imei de su teléfono y no puede acceder a la red telefónica. Y como  referencia para mí, que he perdido el imei dos veces. Veremos cómo recuperar  el IMEI del teléfono mediante dos métodos. Antes de realizar alguno de ellos,  HAZLO BAJO TU RESPONSABILIDAD."
mainclass: articulos
url: /como-recuperar-el-imei-en-android/
tags:
- imei android
- imei perdido
- perdi imei android
- como recuperar imei
- recuperar imei android
- recuperar imei samsung
- recuperar imei android
- restaurar imei android
- perdi mi imei android
- como recuperar el imei android
- como restaurar el imei android
- recuperar imei
- como restaurar el imei de un celular
- como recuperar el imei de mi android
title: "Cómo recuperar el IMEI en Android"
---

Éste artículo pretende ser una guía para todo aquel que ha perdido el **imei** de su teléfono y no puede acceder a la red telefónica. Y como referencia para mí, que he perdido el **imei** dos veces. Veremos cómo recuperar el IMEI del teléfono mediante dos métodos. Antes de realizar alguno de ellos, <span class="highlight style-1">HAZLO BAJO TU RESPONSABILIDAD</span>.

<!--more--><!--ad-->

# Posibles causas

Desde mi experiencia, la pérdida del **imei** ocurre al instalar una ROM no compatible, kernel o recovery, que corrompe la carpeta **/efs** del sistema. Se explicarán dos posibles soluciones a éste problema. Las dos las he probado yo mismo y me han servido para conseguir hacer funcionar de nuevo el teléfono. En mi caso, un **Samsung Galaxy S2 (I9100)**.

# Requisitos

* Teléfono [rooteado][1]
* Un explorador Root
* El [SDK de Android][2]

# Recuperar el IMEI en Android

# Método 1

Éste método me sirvió la primera vez que perdí el **imei**. Seguí los pasos de éste hilo en el foro de [xda-developers][3].

Los pasos a seguir son:

- Haz una copia de la carpeta **/efs** actual, tanto a la tarjeta del teléfono como a tu móvil. Si no tienes navegador root, puedes usar `adb`:

```bash
$ adb pull -p /efs /copia/en/pc
```

- Elmina la carpeta **/efs** del teléfono.
- Reinícia el móvil, tras el reinicio, se habrá creado una nueva carpeta **/efs**.
- Elimina los ficheros `nv_data.bin` y `nv_data.bin.md5` de la carpeta **/efs**.
- En la copia de seguridad que se hizo en 1), copia la carpeta `imei` a **/efs**, también el fichero `.nv_data` (OJO:, lleva un punto delante). Puedes hacerlo con el navegador root o `adb`:

```bash
$ adb push -p /copia/en/pc/imei /efs/
$ adb push -p /copia/en/pc/.nv_data /efs/
```

- Haz otra copia del fichero `.nv_data` a la carpeta **/efs**.
- Llama a una de las copias de `.nv_data` -> `nv_data.bin` y a otra `nv_data.bin.bak`.
- Desde el PC, con `adb`, ejecuta lo siguiente:

```bash
$ adb shell
$ su
$ chown 1001:radio /efs/nv_data.bin
```

- Reinicia el teléfono&#8230; si todo ha ido bien, deberías tener número IMEI. Puedes comprobarlo marcando `*#06#`.

*Nota*: Éste método me sirvió para recuperar el **imei** la primera vez que lo perdí. La segunda vez, no fue posible, es por ello que muestro el proceso de recuperación del **imei** con el siguiente método, que me ayudó ésta segunda vez.

# Método 2

Éste método lo encontré en el [foro de Cyanogenmod][4]

La segunda alternativa para recuperar el **imei** consiste en flashear de nuevo un `radio` o `modem` original de samsung en éste caso. Hay una lista en la [wiki de Cyanogenmod][5]. En mi caso, descargué la primera, aunque supongo que cualquiera sirve.

Ésta vez, necesitaremos [Heimdall][6]. Tras descargarlo e instalarlo, y tener la radio descargada:

1. Extraemos el **.zip** que contiene la radio.
2. Localizamos un fichero llamado **modem.bin**, y entramos en el directorio mediante la terminal.
3. Ponemos el *Samsung Galaxy S2 (i9100)* en modo **Download**, apagándolo, y manteniendo pulsado VOLUMEN ABAJO + BOTÓN DEL CENTRO.
4. Ejecutamos **heimdall** con el móvil conectado al pc mediante usb:

```bash
sudo heimdall flash --MODEM modem.bin --verbose --no-reboot
```

Si todo sale bien, veremos cómo se sube e instala el fichero, y se completa una barra de progreso en el móvil. Tras ésto, reiniciamos y deberíamos volver a tener red, y por tanto **imei**.

Espero que os sirva alguno de los métodos, como me sirvieron en su día a mi.

 [1]: https://elbauldelprogramador.com/rootear-samsung-galaxy-s-gt-i9003/ "Rootear Samsung Galaxy S GT-I9003"
 [2]: https://elbauldelprogramador.com/como-instalar-el-ide-android-studio-en-linux-y-pequena-guia-de-uso/
 [3]: http://forum.xda-developers.com/galaxy-s2/general/guide-recover-imei-9-steps-t1264021 "[GUIDE] Recover your IMEI in 9 steps."
 [4]: http://forum.cyanogenmod.org/topic/76511-updating-the-basebandradiomodem/#entry405203 "Updating The Baseband/radio/modem"
 [5]: http://wiki.cyanogenmod.org/w/I9100_Info "Descargar radios i9100"
 [6]: http://glassechidna.com.au/heimdall/#downloads
