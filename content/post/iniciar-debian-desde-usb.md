---
author: alex
categories:
- how to
date: '2016-01-01'
lastmod: 2017-05-22T17:14:25+01:00
mainclass: linux
url: /iniciar-debian-desde-usb/
tags:
- debian testing
- iniciar debian desde pendrive
- instalar debian testing usb
- install debian desde usb
- linux instalar debian usb
- linux para portatil
title: "Cómo instalar debian desde un USB"
---

Recientemente formateé mi pc de sobremesa y el portatil para pasar de <a href="http://crunchbanglinux.org/" target="_blank">crunchbang</a> a debian testing y buscando formas de instalarlas desde un usb encontré la solución que comparto:

A lo largo del tutorial, se asumirá que el dispositivo usb está en **/dev/sda** y que la distribución a instalar es debian testing.

# Método 1

El primer paso es desmontar el usb:

```bash
sudo umount /dev/sda
```

Descargar el **boot.img.gz**, necesario para hacer el usb &#8220;*bootable*&#8221; (que sea capaz el pc de arrancar desde él).

```bash
cd ~
wget ftp://ftp.debian.org/debian/dists/testing/main/installer-amd64/current/img/hd-media/boot.img.gz
```

Este archivo es para procesadores de 64-bits, para procesadores de 32 hay que descargar el siguiente:

```bash
cd ~
wget ftp://ftp.debian.org/debian/dists/testing/main/installer-i386/current/img/hd-media/boot.img.gz
```

Una vez descargado, se extrae la imagen y se escribe en el usb:

```bash
sudo zcat ~/boot.img.gz &gt; /dev/sda
```

Montamos el usb en el directorio /mnt:

```bash
sudo mount /dev/sda /mnt
```

En este caso se va a usar la versión **net-install** de debian testing, es posible usar cualquier otra imagen siempre que corresponda con la versión de la imagen descargada anteriormente.

```bash
cd /mnt/
sudo wget http://cdimage.debian.org/cdimage/wheezy_di_beta2/amd64/iso-cd/debian-wheezy-DI-b2-amd64-netinst.iso
```

Listo, desmontamos el dispositivo usb:

```bash
cd ~
sudo umount /dev/sda
```

Ahora es posible iniciar debian desde USB e instalar debian testing.

# Método 2

Descargar la ISO deseada de debian y ejecutar lo siguiente:

```bash
cat debian.versión.iso > /dev/sdX ; sync

```

Donde **/dev/sdX** ha de ser el dispositivo USB

# Método 3 (Sugerido en los comentarios por cioran)

```bash
dd if=/ruta/debian.iso of=/dev/sdb bs=1M; sync
```

# Referencias

- *Boot Debian from an USB device* »» <a href="http://www.debian-administration.org/article/Boot_Debian_from_an_USB_device" target="_blank">Visitar sitio</a>
