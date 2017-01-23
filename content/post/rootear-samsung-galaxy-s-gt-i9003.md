---
author: alex
categories:
- android
- aplicaciones
color: '#F57C00'
date: '2016-09-25'
lastmod: 2016-09-27
layout: post.amp
mainclass: articulos
permalink: /rootear-samsung-galaxy-s-gt-i9003/
tags:
- curso android pdf
- samsung galaxy scl gti9003
- xda
title: Rootear Samsung Galaxy S GT-I9003
---

Hacía tiempo que quería rootear mi terminal, y hoy me he decidido a hacerlo. Hay mucha información sobre como rootear terminales Android, sin embargo voy a escribir esta entrada explicando el proceso bajo GNU/Linux. (Aunque también vale para Windows, simplemente hay que descargar SuperOneClick e ir al paso 3)

<!--more--><!--ad-->

Como primer paso, vamos a descargar la aplicación SuperOneClick de esta [dirección][1]. Como vamos a ejecutarla bajo Gnu/linux, necesitamos seguir los siguientes pasos para lograr ejecutarla:

1.- Tenemos que instalar mono, para ello añadimos el siguiente repositorio a nuestro source.list (En mi caso para Debien squeeze):

```bash
deb http://backports.debian.org/debian-backports squeeze main
```

Después actualizamos los repositorios e instalamos mono

```bash
sudo aptitude update
sudo aptitude install mono-complete
```

Para conseguir que el ADB se ejecute, debemos instalar las siguientes librerías:

```bash
sudo aptitude install lib32ncurses5 lib32stdc++
```

Ahora damos permisos de ejecución a adblinux, que se encuentra en una carpeta llamada ADB de SuperOneClick

```bash
chmod 755 adblinux
```

Solo queda ejecutar SuperOneClick

```bash
sudo mono SuperOneClick.exe
```

Este comando ejecutará la aplicación, que será como la de la imagen:

<figure>
    <a href="https://1.bp.blogspot.com/-m5BLQYMKlGo/ToIa7Z8PYiI/AAAAAAAAAxg/hp9LVGRaQTQ/s1600/Screenshot-SuperOneClick.png"><amp-img layout="responsive"  height="346" width="800" src="https://1.bp.blogspot.com/-m5BLQYMKlGo/ToIa7Z8PYiI/AAAAAAAAAxg/hp9LVGRaQTQ/s800/Screenshot-SuperOneClick.png"></amp-img></a>
</figure>

2.- Ya tenemos la aplicación funcionando correctamente, vamos a preparar el terminal:

- Es necesario configurar nuestro terminal en modo depuración: `Settings -> Application -> Development -> USB debugging`.
- Tenemos que asegurarnos que no tenemos montada la tarjeta SD: `Settings -> SD card and phone storage -> Unmount SD card`.

3.- Ya está todo listo, conectamos el terminal al pc, hacemos click en el botón Root de SuperOneClick y esperamos a que termine.

Una vez terminado, tenemos que reiniciar el teléfono, y nos encontraremos con una aplicación como la de la imagen, que nos pedirá permiso cada vez que una aplicación necesite permisos de Root:

<figure>
    <a href="https://lh5.googleusercontent.com/-6_6VWUHX_fA/ToIg3Si55bI/AAAAAAAAAxo/aXmmt_TEloU/s800/SC20110927-211316.png"><amp-img layout="responsive" height="800" width="480" src="https://lh5.googleusercontent.com/-6_6VWUHX_fA/ToIg3Si55bI/AAAAAAAAAxo/aXmmt_TEloU/s800/SC20110927-211316.png"></amp-img></a>
</figure>

# Solución de problemas

Intentando rootear mi terminal, SuperOneClick no detectaba el teléfono y se quedaba esperando con el mensaje &#8220;Waiting for devide&#8230;&#8221;

Resolví este problema apagando el teléfono mientras estaba conectado al pc, y SuperOneClick esperando el dispositivo (Waiting for devide&#8230;). Una vez apagado, volví a encenderlo y SuperOneClick lo detectó, rooteandolo correctamente.


> __Nota:__ No solo bastó con apagar el terminal, necesité quitar la tarjeta SIM del teléfono, porque de lo contrario SuperOneClick me tiraba un error y no rooteaba el móvil.

Para finalizar, en el momento que deseemos deshacer el rooteo, basta con pulsar el botón unroot.

Espero que les sirva de ayuda.

 [1]: http://shortfuse.org/?p=80