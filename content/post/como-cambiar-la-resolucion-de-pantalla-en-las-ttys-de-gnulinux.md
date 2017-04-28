---
author: alex
categories:
- how to
date: '2016-01-01'
lastmod: 2017-03-09T12:07:47+01:00
description: "Métodos para personalizar la resolución de pantalla de las terminales  tty en linux"
image: img/2012/08/sh1.png
mainclass: linux
url: /como-cambiar-la-resolucion-de-pantalla-en-las-ttys-de-gnulinux/
tags:
- editar 10_linux
- grub para linux
- "resolución grub"
- "resolución tty"
- vga=0x31b
title: "Cómo cambiar la resolución de pantalla de las ttys y del GRUB en Linux"
---

Hace poco reinstalé debian en mi PC de sobremesa y he tenido que volver a configurar algunas cosas, como por ejemplo el <a target="_blank" href="https://elbauldelprogramador.com/grub-customizer-20-personaliza-tu-grub2/" title="Grub Customizer 2.0, personaliza tu GRUB2">GRUB</a>. Por defecto el GRUB se muestra a una resolución de **640&#215;480**, la cual es bastante ‘fea’. Igual ocurre con las terminales **ttys**, a las cuales se puede acceder con pulsando **Ctrl + Alt + F[1-6]**. Hoy voy a explicar cómo cambiar esta resolución a vuestra preferida.

<!--more--><!--ad-->

# Cambiar resolución de pantalla del GRUB

La forma más fácil es editar el fichero ***/etc/defaults/grub*** y cambiar la resolución de la variable *GRUB\_GFXMODEGRUB\_GFXMODE* por la resolución deseada, en mi caso 1280&#215;1024.

# Cambiar la resolución de pantalla de la tty

Voy a explicar dos formas, la primera que apliqué y una segunda que es el método más recomendado y fácil, pero que descubrí posteriormente ojeando los archivos de configuración. La configuración del GRUB se encuentra dividida en ficheros en el directorio ***/etc/grub.d/***. El fichero **10_linux** se encarga de generar las entradas del GRUB para sistemas operativos linux, aquí se establecen los parámetros para iniciar el sistema, y nosotros le pasaremos un parámetro adicional, **vga**, que establecerá el tipo de resolución deseada. Dicho tipo hay que elegirlo de entre los valores de la siguiente tabla:

```bash
Colores   640x400 640x480 800x600 1024x768 1280x1024 1600x1200
--------+-----------------------------------------------------
 4 bits |                  0x302
 8 bits |  0x300   0x301   0x303    0x305    0x307     0x31C
15 bits |          0x310   0x313    0x316    0x319     0x31D
16 bits |          0x311   0x314    0x317    0x31A     0x31E
24 bits |          0x312   0x315    0x318    0x31B     0x31F
32 bits |

```

Para mi caso concreto eligiré **0x31B**. Una vez conocido el valor, hay que escribir el argumento en el arranque de linux, y eso se hace en la siguiente línea de **10_linux**:

```bash
message="$(gettext_printf "Loading Linux %s ..." ${version})"
    cat << EOF
         echo    '$message'
         linux   ${rel_dirname}/${basename} root=${linux_root_device_thisversion} ro ${args} vga=0x31B
EOF
  if test -n "${initrd}" ; then
    message="$(gettext_printf "Loading initial ramdisk ...")"
```

Este trozo del script es el encargado de pasar los parámetros a la secuencia de inicio.

La segunda forma es mucho más cómoda, al igual que en el apartado anterior con la variable **GRUB_GFXMODE**, hay otra llamada **GRUB\_CMDLINE\_LINUX**. Es a esta variable a la que le asignamos el parámetro anterior, quedando **GRUB\_CMDLINE\_LINUX="vga=0x31B"**.

# Aplicar los cambios

Para aplicar los cambios es necesario regenerar el archivo **/boot/grub/grub.cfg** con el siguiente comando:

```bash
# update-grub2

```

Una vez terminado, el apartado de sistemas operativos Linux disponibles quedará así:

```bash
### BEGIN /etc/grub.d/10_linux ###
menuentry 'Debian GNU/Linux, with Linux 3.2.0-4-amd64' --class debian --class gnu-linux --class gnu --class os {
 load_video
  insmod gzio
 insmod part_msdos
   insmod ext2
 set root='(hd0,msdos1)'
   search --no-floppy --fs-uuid --set=root ae9e059a-75a2-4f19-9631-206fc1fd65fa
    echo    'Loading Linux 3.2.0-4-amd64 ...'
 linux   /boot/vmlinuz-3.2.0-4-amd64 root=UUID=ae9e059a-75a2-4f19-9631-206fc1fd65fa ro vga=0x31B quiet
   echo    'Loading initial ramdisk ...'
 initrd  /boot/initrd.img-3.2.0-4-amd64
}
menuentry 'Debian GNU/Linux, with Linux 3.2.0-4-amd64 (recovery mode)' --class debian --class gnu-linux --class gnu --class os {
   load_video
  insmod gzio
 insmod part_msdos
   insmod ext2
 set root='(hd0,msdos1)'
   search --no-floppy --fs-uuid --set=root ae9e059a-75a2-4f19-9631-206fc1fd65fa
    echo    'Loading Linux 3.2.0-4-amd64 ...'
 linux   /boot/vmlinuz-3.2.0-4-amd64 root=UUID=ae9e059a-75a2-4f19-9631-206fc1fd65fa ro single vga=0x31B
  echo    'Loading initial ramdisk ...'
 initrd  /boot/initrd.img-3.2.0-4-amd64
}
### END /etc/grub.d/10_linux ###

```

Como se aprecia, aparece el parámetro **vga**.
