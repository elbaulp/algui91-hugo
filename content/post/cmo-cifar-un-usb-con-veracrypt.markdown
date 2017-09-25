---
author: alex
categories:
- articulos
- seguridad
mainclass: seguridad
date: 2015-11-30 18:15:43
lastmod: 2017-09-25T12:42:57+01:00
description: "Los USBs suelen llevarse siempre a mano, en los bolsillos, mochila etc,  y en ocasiones pueden contener información sensible que no debería poder leer  cualquiera. Por ello es buena idea llevarlo encriptado, ya sea por si se pierde  o nos lo roban. Hoy veremos cómo podemos cifrar/encriptar nuestro usb con Veracrypt"
image: Veracryptlogo.png
tags:
- "criptografía"
- privacidad
title: "Cómo Cifar Un USB Con Veracrypt"
---

<figure>
        <a href="/img/Veracryptlogo.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/Veracryptlogo.png"
            alt="Cómo Cifar Un USB Con Veracrypt"
            title="Cómo Cifar Un USB Con Veracrypt"
            sizes="(min-width: 249px) 249px, 100vw"
            width="249px"
            height="197px">
          </amp-img>
        </a>
</figure>

Los USBs suelen llevarse siempre a mano, en los bolsillos, mochila etc, y en ocasiones pueden contener información sensible que no debería poder leer cualquiera. Por ello es buena idea llevarlo encriptado, ya sea por si se pierde o nos lo roban. Hoy veremos cómo podemos cifrar/encriptar nuestro usb con _Veracrypt_.

<!--more--><!--ad-->

# Descargar e instalar Veracrypt

El primer paso es dirigirnos a la <a href="https://veracrypt.codeplex.com/wikipage?title=Downloads" target="_blank" title="Veracr">web oficial</a> y descargarnos el programa para nuestro sistema operativo (Linux/Mac/Windows). Una vez instalado, lo ejecutamos y veremos la siguiente pantalla:

## Crear el usb cifrado

<figure>
    <a href="/img/2.png"><amp-img sizes="(min-width: 804px) 804px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2.png" title="Crear un usb cifrado con veracrypt" alt="Crear un usb cifrado con veracrypt" width="804px" height="506px" /></a>
</figure>

A continuación se mostrarán una serie de pantallas, seguimos los pasos que aparecen en ellas:

## Seleccionar el tipo de volumen

<figure>
    <a href="/img/3.png"><amp-img sizes="(min-width: 806px) 806px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/3.png" title="Volumen estándar Veracrypt" alt="Volumen estándar Veracrypt" width="806px" height="505px" /></a>
</figure>

## Seleccionar el dispositivo

<figure>
    <a href="/img/4.png"><amp-img sizes="(min-width: 805px) 805px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/4.png" title="Selección del volumen a cifrar Veracrypt" alt="Selección del volumen a cifrar Veracrypt" width="805px" height="505px" /></a>
</figure>

## Tipos de cifrados

En el tipo de cifrado, podemos ejecutar un _benchmark_ para ver el rendimiento de cada uno, el más rápido es AES, pero si preferimos podemos elegir otros que fortifiquen la seguridad del dispositivo. A continuación se muestra el resultado de las pruebas:

<figure>
    <a href="/img/bench.png"><amp-img sizes="(min-width: 632px) 632px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/bench.png" title="Benchmark Veracrypt" alt="Benchmark Veracrypt" width="632px" height="403px" /></a>
</figure>
<figure>
    <a href="/img/5.png"><amp-img sizes="(min-width: 806px) 806px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/5.png" title="Tipo de cifrado Veracrypt" alt="Tipo de cifrado Veracrypt" width="803px" height="504px" /></a>
</figure>

## Establecer contraseña

A la hora de escoger la contraseña, es importante que sea fuerte y de más de 20 caractéres. Si es menor de este número, se recomienda establecer un PIM (_Personal Iterations Multiplier_)

<figure>
    <a href="/img/8.png"><amp-img sizes="(min-width: 806px) 806px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/8.png" title="Escoger contraseña  Veracrypt" alt="Escoger contraseña Veracrypt" width="806px" height="504px" /></a>
</figure>

## Seleccionar el sistema de ficheros

Ahora seleccionamos el tipo de sistema de ficheros que queremos. Se recomienda hacer un formateo completo en lugar de rápido. En mi caso marqué rápido porque ya lo había formateado previamente.

<figure>
    <a href="/img/9.png"><amp-img sizes="(min-width: 806px) 806px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/9.png" title="Pantalla principal Veracrypt" alt="Pantalla principal Veracrypt" width="806px" height="505px" /></a>
</figure>

## Soporte multiplataforma

Por último, si queremos usar el USB en otros sistemas, deberemos marcar la casilla adecuada.

<figure>
    <a href="/img/10.png"><amp-img sizes="(min-width: 804px) 804px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/10.png" title="Pantalla principal Veracrypt" alt="Pantalla principal Veracrypt" width="804px" height="505px" /></a>
</figure>

Ya solo queda pulsar el botón de formatear en la siguiente pantalla y esperar, puede tardar un poco y parecer que se ha quedado colgado, paciencia.

## Montar el USB

Una vez formateado, en la pantalla princpial de _Veracrypt_, seleccionamos un _slot_ en el que montar el dispositivo, introducimos nuestra contraseña y listo.

# Cifrar el usb usando la terminal

Para los que se sientan más cómodos usando la terminal, es posible instalar _Veracrypt_ sin interfaz gráfica y ejecutar el comando:

```bash

veracrypt -t -c /dev/dispositivo

```

Y seguir los pasos indicados, similares a los vistos arriba

<figure>
        <a href="/img/cmdveracrypt.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/cmdveracrypt.png"
            alt="Veracrypt en línea de comandos"
            title="Veracrypt en línea de comandos"
            sizes="(min-width: 666px) 666px, 100vw"
            width="666px"
            height="1077px">
          </amp-img>
        </a>
</figure>

# Montar y desmontar el dispositivo mediante la línea de comandos

Para montar, basta ejecutar el comando

```bash

veracrypt /dev/dispositivo /ruta/a/montar

```

y para desmontar

```bash

veracrypt -d /dev/dispositivo

```

Listo, ya tenemos nuestro USB cifrado!
