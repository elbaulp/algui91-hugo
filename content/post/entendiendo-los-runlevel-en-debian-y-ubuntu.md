---
author: alex
categories:
- linux
- so
date: '2016-01-01'
lastmod: 2017-04-22T12:47:38+01:00
mainclass: linux
url: /entendiendo-los-runlevel-en-debian-y-ubuntu/
tags:
- autoejecutar servicios linux
- iniciar servicio linux
- runlevel
- runlevel Debian
- runlevel linux
- init 3 debian
- linux runlevel
- modificar runlevel debian
title: Entendiendo los runlevel en Debian
---

Visto de forma simple, los runlevel  determinan qué programas se ejecutan al inicio del sistema.

Existen 7 runlevel, numerados del 0 al 6 , aunque es posible crear más. Cada runlevel tiene los siguientes roles:

- 0    » Apagado del sistema
- 1    » Modo monousuario
- 2    » Modo multiusuario (Por defecto)
- 3-5  » Igual que runlevel 2
- 6    » Reinicio del sistema

Pasemos a describir cada runlevel:

<!--more--><!--ad-->

El runlevel 0 es la condición de apagado del sistema. La mayoría de ordenadores actuales se apagarán al llegar a este nivel.

El 1 es conocido como de monousuario o usuario único. Suele llamarsele modo de rescate (_rescue mode ó trouble-shooting_). En este nivel no se ejecuta ningún servicio o demonio. Normalmente es posible iniciar el sistema en modo rescate desde el [GRUB][1], o añadiendo la palabra __single__ al final de la línea de comandos del kernel.

Del runlevel 2 al 5 son modos multiusuario, y el modo usado por defecto.

Si el 0 era la condición de apagado, el 6 es la señal de reinicio del sistema. Es exactamente igual que el runlevel 0 salvo que reinicia al terminar la secuencia en lugar de apagar.

# ¿Dónde residen los Run Level?

Como todo en un sitema Linux, están definidos mediante ficheros, y se encuentran bajo el directorio `/etc`:

```bash

/etc/rc0.d      Run level 0
/etc/rc1.d       Run level 1
/etc/rc2.d       Run level 2
/etc/rc3.d       Run level 3
/etc/rc4.d       Run level 4
/etc/rc5.d       Run level 5
/etc/rc6.d       Run level 6

```

Echemos un vistazo al contenido del runlevel 2:

```bash

$ ls /etc/rc2.d/
README      S15nfs-common      S17sudo     S19anacron  S19dbus   S19speech-dispatcher  S20network-manager  S21pulseaudio  S22libvirt-guests  S23rmnologin
S01motd     S17binfmt-support  S18apache2  S19atd      S19exim4  S20avahi-daemon       S21gdm3             S21saned       S23minissdpd
S14rpcbind  S17rsyslog         S19acpid    S19cron     S19rsync  S20bluetooth          S21libvirt-bin      S22bootlogs    S23rc.local

```

Cada fichero es un enlace simbólico a su respectivo [script][2] residente en `/etc/init.d`. Estos scripts controlan la detención o inicio de un servicio.

El nombre de los enlaces de estos directorios puede ser poco intuitivos al principio, pero veamos su significado, la sintaxis es:

```bash
[K | S] + nn + [string]
```

Es decir, la primera letra del nombre puede ser una **K** o una **S**, seguidas de un número de dos dígitos, del 01 al 99 y por último una cadena de texto. La K significa que el servicio será detenido al entrar al runlevel (Kill), la S para iniciarlo (Start). El número indica la prioridad del servicio dentro del runlevel, por ejemplo, **S02apache** y **S01php** iniciará primero php y luego apache. Si dos servicios tienen el mismo orden de prioridad numérico, se procede en orden alfabético.

# Cómo determinar en qué runlevel se encuentra el sistema

El comando **runlevel** mostará el último runlevel que fue ejecutado, y el actual:

```bash

$ runlevel
N 2

```

La **N** significa None, informando de que no ha habido ningún cambio de runlevel desde que se inició el sistema. **2** es el runlevel actual.

Para moverse de un runlevel a otro basta con ejectar el comando **telinit** seguido del número del runlevel deseado. Aunque pueda parecer correcto, no se recomienda apagar o reiniciar el sistema cambiando a los runlevel 0 o 6.

# Cómo agregar un servicio a un runlevel

Si deseamos agregar un servicio a un runlevel deberemos usar el comando **update-rc.d**. Por ejemplo, si quieres que **nginx** o **Apache** se ejecuten en cada inicio del sistema, basta con agregarlos a los runlevel 2-5, correspondientes al modo multiusuario:

```bash
# update-rc.d nginx start 90 2 3 4 5 . stop 01 0 1 6 .
```

El 90 es el número de prioridad para el inicio (**S90nginx**) aplicado a los runlevles 2-5, el 01 para la prioridad de detención (**K01nginx**) en los runlevel 0 1 y 6. Lo más sencillo es aplicar los valores por defecto con

```bash
# update-rc.d nginx defaults
```

A continuación varios ejemplos extraidos del manual de **update-rc.d:**

```bash
EXAMPLES
       Insert links using the defaults:
          update-rc.d foobar defaults
       The equivalent dependency header would have start and stop
       dependencies on $remote_fs and $syslog, and start in
       runlevels 2-5 and stop in runlevels 0, 1 and 6.
       Equivalent command using explicit argument sets:
          update-rc.d foobar start 20 2 3 4 5 . stop 20 0 1 6 .
       More typical command using explicit argument sets:
          update-rc.d foobar start 30 2 3 4 5 . stop 70 0 1 6 .
       Insert links at default runlevels when B requires A
          update-rc.d script_for_A defaults 80 20
          update-rc.d script_for_B defaults 90 10
       Insert a link to a service that (presumably) will not be needed by any other daemon
          update-rc.d top_level_app defaults 98 02
       Insert links for a script that requires services that start/stop at sequence number 20
          update-rc.d script_depends_on_svc20 defaults 21 19
       Remove all links for a script (assuming foobar has been deleted already):
          update-rc.d foobar remove
       Example of disabling a service:
          update-rc.d -f foobar remove
          update-rc.d foobar stop 20 2 3 4 5 .
       Example of a command for installing a system initialization-and-shutdown script:
          update-rc.d foobar start 45 S . stop 31 0 6 .
       Example of a command for disabling a system initialization-and-shutdown script:
          update-rc.d -f foobar remove
          update-rc.d foobar stop 45 S .
```

# Referencias

- *An introduction to run-levels* »» <a href="http://www.debian-administration.org/articles/212" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/grub-customizer-20-personaliza-tu-grub2/ "Grub Customizer 2.0, personaliza tu GRUB2"
 [2]: https://elbauldelprogramador.com/
