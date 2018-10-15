---
author: alex
categories:
- dev
mainclas: dev
date: 2015-10-12 15:18:41
lastmod: 2017-09-28T18:15:25+01:00
description: "En este artículo veremos cómo descargar, compilar e instalar el  kernel 4.2 de linux"
image: Compilar-e-Instalar-El-Kernel-4.2.png
tags:
- kernel
title: Compilar e Instalar El Kernel 4.2
---

<figure>
    <a href="/img/Compilar-e-Instalar-El-Kernel-4.2.png"><img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Compilar-e-Instalar-El-Kernel-4.2.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="320px" /></a>
    <span class="image-credit">Crédito de la imagen: <a href="https://pixabay.com/en/linux-logo-penguin-tux-text-151619/" target="_blank" title="">pixabay</a></span><br />
</figure>


Vamos a explicar hoy cómo compilar e instalar la versión 4.2 del __kernel__.

# Paquetes necesarios

Para compilar el __kernel__ hara falta instalar los siguientes paquetes en el sistema:

```bash
$ sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils

```

<!--more--><!--ad-->

y además este:

```bash
$ sudo apt-get install kernel-package

```

# Descargar el código fuente del kernel

Para ello

```bash
wget https://www.kernel.org/pub/linux/kernel/v4.x/linux-4.2.tar.xz

```

Una vez descargado, lo extraemos:

```bash
$ tar xvf linux-4.2.tar.xz

```

# Configurar el kernel

Copiamos la configuración existente del kernel instalado

```bash
$ cd linux-4.2
$ cp /boot/config-$(uname -r) .config

```

y lo configuramos

```bash
$ make menuconfig

```

Si no estamos seguros de qué podemos quitar y añadir de la configuración, es mejor dejarlo tal y como está, ya que al haber copiado la configuración del kernel actual, estamos seguros de que funcionará.

# Compilar el kernel

Primero debemos hacer una limpieza:

```bash
$ make-kpkg clean

```

y por último compilarlo con

```bash
$ export CONCURRENCY_LEVEL=X
$ fakeroot make-kpkg --initrd --revision=1.0.NAS kernel_image kernel_headers

```

es importante reemplazar la __X__ de `CONCURRENCY_LEVEL=X` por el número de procesadores de tu máquina, para una compilación más rápida.

# Instalar el kernel

Una vez compilado, basta con ejecutar:

```bash
$ sudo dpkg -i ../linux-headers-4.2.0_1.0.NAS_amd64.deb
$ sudo dpkg -i ../linux-image-4.2.0_1.0.NAS_amd64.deb

```

Reiniciamos y listo, podemos comprobar que estamos usando este kernel con cualquiera de estos comandos:

```bash
$ uname -a
$ uname -r
$ uname -mrs
$ dmesg | more
$ dmesg | egrep -i --color 'error|critical|failed'

```

# Referencias

- _How to Compile and Install Linux Kernel v4.2 Source On a Debian / Ubuntu Linux_ | [cyberciti.biz](http://www.cyberciti.biz/faq/debian-ubuntu-building-installing-a-custom-linux-kernel/ "How to Compile and Install Linux Kernel v4.2 Source On a Debian / Ubuntu Linux")
