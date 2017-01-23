---
author: alex
categories:
- android
- aplicaciones
- how to
color: '#689F38'
date: '2016-01-01'
description: 'Ya me ha sucedido en varias ocasiones que he intentado conectar mi Samsung
  Galaxy S al adb del SDK de Android y he tenido que buscar durante un rato en internet
  como solucionar el siguiete problema:'
layout: post.amp
mainclass: android
permalink: /como-conectar-tu-dispositivo-android-en/
tags:
- curso android pdf
title: "C\xF3mo conectar tu dispositivo Android en Linux al adb para depurar y desarrollar
  aplicaciones"
---

Ya me ha sucedido en varias ocasiones que he intentado conectar mi **Samsung Galaxy S** al **adb** del SDK de Android y he tenido que buscar durante un rato en internet como solucionar el siguiete problema:

```bash
$ adb devices
List of devices attached
???????????? no permissions
```

Así que a modo de recordatorio para mi, y para que a otras personas con el mismo problema puedan solucionarlo, escribo esta entrada.

<a name="more"></a>

Para empezar ejecutamos el comando **lsusb**:

```bash
Bus 007 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 006 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 005 Device 002: ID 046d:c03e Logitech, Inc. Premium Optical Wheel Mouse (M-BT58)
Bus 005 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 004 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 003 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
<strong>Bus 002 Device 006: ID 04e8:681c Samsung Electronics Co., Ltd Galaxy Portal/Spica/S</strong>
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 0bda:8187 Realtek Semiconductor Corp. RTL8187 Wireless Adapter
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

De estas líneas nos interesa la que está en negrita, donde vamos a usar el verdor ID, que es 04e8 para el caso de mi Samsung. A continuación seguimos los siguientes pasos:

- Es necesario que tengamos habilitado las fuentes desconocidas en el teléfono (Ajustes->Aplicaciones y marcamos la casilla), Así como permitir el USB debugging (Ajustes->Aplicaiones->Desarrollo).

- El siguiente paso es crear un archivo llamado *51-android.rules* bajo el directorio */etc/udev/rules.d/*, y añadimos

```bash
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", SYMLINK+="android_adb", MODE="0666", OWNER="nombre-de-usuario"
```

Donde tendremos que poner en idVendor el número que nos daba como resultado el comando lsusb, y en el propietario nuestro nombre de usuario.

Guardamos el fichero y reiniciamos el servicio udev

```bash
sudo restart udev
```

ó

```bash
sudo /etc/init.d/udev restart
```

Tambíen tenemos que finalizar el adb

```bash
./adb kill-server
```

Desconectamos el teléfono del usb y lo volvemos a enchufar, Ahora el resultado de *adb devices* debería ser algo así:

```bash
./adb devices
List of devices attached
900339eb5012 device
```

<p class="alert">
  Aún así, en mi caso sigue sin reconocer el dispositivo, tras buscar y buscar encontré que este problema se soluciona renombrando el archivo <span >51-android.rules</span> a <span >91-android.rules</span>
</p>

Fuente: <a href="http://dimitar.me/how-to-connect-your-android-phone-to-ubuntu-to-do-developmenttestinginstallations-or-tethering/" target="_blank">dimitar.me</a>