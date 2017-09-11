---
lastmod: 2017-09-11T18:30:18+01:00
author: juan
categories:
- articulos
- linux
description: "Escribir commandos en una terminal puede parecer tedioso, pero con las  herramientas correctas, la línea de comandos puede ser increíblemente poderosa.  Aquí están nuestras herramientas de línea de comandos favoritas que hacen  impresionantes cosas que simplemente no puedes encontrar en una GUI (Interfaz Gráfica  de Usuario)."
mainclass: articulos
url: /top-10-de-herramientas-que-son-mejores-en-la-linea-de-comandos-ii/
image: 2012/08/original1.jpg
tags:
- comandos
- herramientas
- htop
title: "10 de las Mejores Herramientas en la Línea de Comandos II"
---

<figure>
    <amp-img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" sizes="(min-width: 640px) 640px, 100vw" role="button" tabindex="0" layout="responsive" title="Top 10 de las Mejores Herramientas en la Línea de Comandos" src="/img/2012/08/original1.jpg" alt="Comandos" width="640px" height="360px" />
</figure>

En esta segunda entrega revisaremos otras [diez herramientas](/top-10-de-herramientas-que-son-mejores-en-la-linea-de-comandos/) que podemos usar en nuestra **terminal de Linux** y que nos ahorrarán tiempo y esfuerzo en muchas tareas cotidianas ampliando así nuestra lista de imprescindibles.

# 11. [lshw](http://www.ezix.org/project/wiki/HardwareLiSter)

Se trata, como se puede deducir de su nombre, de un **Hardware Lister**, que nos permitirá conocer cualquier detalle sobre el hardware de nuestra máquina.
Si tu distribución es basada en Debian (como Ubuntu) posiblemente lo tengas ya instalado, de no ser así en su página oficial ofrecen todos los detalles.

Aunque la mayoría de la información se puede consular en  ficheros del sistema como `/proc/meminfo` que es de dondel el propio programa extrae la información, a veces no está lo más legible posible y no en el mismo lugar, por eso esta es tan interesante.

Veamos por ejemplo un extracto del informe de memoria que hace:

```bash
$ lshw -C memory
...
*-cache:0
       descripción: L1 caché
       id físico: 5
       ranura: L1-Cache
       tamaño: 64KiB
       capacidad: 64KiB
       capacidades: internal write-back data
       configuración: level=1
  *-cache:1
       descripción: L2 caché
       id físico: 6
       ranura: L2-Cache
       tamaño: 4MiB
       capacidad: 4MiB
       capacidades: internal write-back instruction
       configuración: level=2
...
```

<!--more--><!--ad-->

*Una sencilla forma de conocer la caché de nuestro procesador (entre otras muchas cosas relacionadas con memoria).*

Para su ejecución solo necesitamos especificarle el tipo de información con la opcion ``-C`, en este caso `memory`. Se pueden consultar todas las opciones en la ayuda.

Además podemos hacer cosas como extraer la información en formato HTML (también XML), que aunque no tiene un diseño muy trabajado, nos puede ser útil.

Además también dispone de una interfaz para escritorio, llamada `lshw-gtk` (aunque eso nos interesa menos).


# 12 [htop](https://linux.die.net/man/1/htop)

Como un alternativa a `top` de la anterior entrega (que se nos puede quedar corto en algunas ocasiones) tenemos [htop](https://linux.die.net/man/1/htop), que no es más que otro visor de procesos, pero **interactivo**. Este tendremos que instalarlo, ya que no suele venir por defecto, pero merece la pena.

No solo ofrece una visión de la memoria de nuestros sistema en tiempo real sino también el número de tareas, hebras y carga del sistema, incluso el tiempo que lleva encendido el equipo.

<figure>
        <a href="/img/htop.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/htop.png"
            alt="HTOP"
            title="HTOP"
            sizes="(min-width: 645px) 645px, 100vw"
            width="645"
            height="194">
          </amp-img>
        </a>
</figure>

Y lo mejor de todo es que podemos navegar por los procesos y realizar ciertas acciones sobre ellos, como matarlos con `kill`, aquí `F9`, directamente desde el propio programa.

Pero si quieres algo más rápido como para por ejemplo, ver la memoria que tienes libre y usada para *swap* siempre puedes usar [free](https://linux.die.net/man/1/free), instalada por defecto en la mayoría de las distros.

Por ejemplo:

```bash
$ free
              total        used        free      shared  buff/cache   available
Memoria:     4036232     3014980      177508      243164      843744      470464
Swap:       7999484     2502164     5497320
```


# 13 [fdisk](http://man.cx/fdisk)

Aunque es una herramienta completa (merecería un post aparte) para realizar particiones en nuestro disco también nos puede servir sólo para consultar información relacionada, muy útil a si tenemos varios discos, por ejemplo, para ver nomenclatura, tamaños, etc, y no podemos dejar de mencionarla.

Ejemplo:

```bash
fdisk -l
Disposit.  Inicio     Start     Final  Sectores   Size Id Tipo
/dev/sdb1  *           2048    206847    204800   100M  7 HPFS/NTFS/exFAT
/dev/sdb2            206848 239460410 239253563 114,1G  7 HPFS/NTFS/exFAT
/dev/sdb3         239462398 488396799 248934402 118,7G  5 Extendida
/dev/sdb5         484225024 488396799   4171776     2G 82 Linux swap / Solaris
/dev/sdb6         239462400 484225023 244762624 116,7G 83 Linux
```

# 14 [df](https://linux.die.net/man/1/df), [du](https://linux.die.net/man/1/du) y [ncdu](https://dev.yorhel.nl/ncdu/man)

El espacio libre que tenemos en nuestro sistema siempre es algo a tener en cuenta y para comprobarlo no necesitamos ninguna herramienta gráfica, mucho más rápido y eficiente desde terminal, veamos algunas utilidades.

Con [df](https://linux.die.net/man/1/df) podemos ver información relevante sobre nuestro sistema de ficheros, como el porcentaje de ocupación, entre otros. Así podremos comprobar de un vistazo el estado de las particiones, por si tuviéramos que realizar una reasignación de espacio.
```bash
$ df
S.ficheros     bloques de 1K   Usados Disponibles Uso% Montado en
udev                 1997292        0     1997292   0% /dev
tmpfs                 403624     6384      397240   2% /run
/dev/sda6           98298500  8421160    84861020  10% /
/dev/sda7          123329532 15084216   101957496  13% /home
...
```

Pero si queremos algo más sencillo como saber el tamaño de una carpeta o fichero podemos usar [du](https://linux.die.net/man/1/du) con las opciones que hace su salida más legible, como `-hs`.

Por ejemplo:

```bash
$ du -h
3,3G	./Tasks
5,8M	./Books
3,3G	.
```
Que nos dice el tamaño del directorio y de todo
lo contenido en su interior.

Pero existen otras herramientas con más características, como [ncdu](https://dev.yorhel.nl/ncdu/man). Si `du` era el acrónimo de *"disk usage"*, este podría significar *"nice disk usage"* (aunque en realidad es NCurses Disk Usage).

Y lo bueno que tiene es que entramos en una interfaz (directamente en terminal) donde no solo vemos el tamaño de los ficheros o directorios sino también el tamaño relativo al fichero de mayor peso, para de forma muy rápida ver los que más espacio están ocupando en disco en relación al resto.

Por ejemplo:

```bash
/Microservices
3,3 GiB [##########] /Talks
5,8 MiB [          ] /Books
```

Y no solo eso, además (y es lo mejor) podemos navegar por las carpetas seleccionándolas y haciendo intro, recalculándose el peso relativo para los fichero de esta.

```bash
/Talks
539,4 MiB [##########]  Testing Microservices.mp4
343,5 MiB [######    ]  Building Fault Tolerant Microservices.mp4
342,6 MiB [######    ]  GOTO 2015 • Microservi...ify • Kevin Goldsmith.mp4
314,2 MiB [#####     ]  Principles Of Microservices by Sam Newman.mp4
```

# 15 [dd](https://linux.die.net/man/1/dd)

Potente y simple herramienta que entre otras cosas nos sirve para grabar imágenes `.iso` en memorias externas, algo que seguramente hayamos necesitado hacer en más de una ocación. Mucho más sencillo desde *terminal*, así de simple, por ejemplo:

`dd if=input.iso of=/dev/sdb`

Donde especificamos la iso que queremos quemar (estando en el mismo directorio) y el punto de montaje (para conocerlo podemos usar `df`como hemos visto antes).


# 16 [history](https://linux.die.net/man/3/history)

Herramienta muy simple para ver los últimos comandos usados (en realidad todos).

Un ejemplo:

```bash
$history
1080  locate linux
1081  clear
1082  apropos ls
1083  apropos "create dir"
1084  clear
```
Como vimos en otra entrada puede usarse para, por ejemplo, conocer que comandos usamos con más frecuencia.

`history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10 `

# 17 [rsync](https://linux.die.net/man/1/rsync)

Útil para hacer cópias de forma eficiente, pero **incrementales**, es decir, no se realizan copias completas
sino una inicial y las posteriores sobre las modificaciones
que el directorio en cuestión haya sufrido. Muy útil para copias de seguridad, entre otras muchas cosas.

Además el origen y el destino pueden ser tanto el mismo equipo como equipos en la misma o diferentes redes.

Por ejemplo:

`rsync -rtv origen/ destino/`

Esta es otra herramienta que daría para otra entrada completa.

# 18. [locate](https://linux.die.net/man/1/locate)

Ideal para buscar ficheros en todo nuestro sistema. Es algo bruto, ya que por defecto busca en todo el sistema pero usando alguna de las opciones podemos refinar un poco su comportamiento. Eso sí, necesitarás usar algún paginador como `less`o `more` para ver la salida poco a poco.

Un ejemplo:

```bash
$ locate password | less
/bin/systemd-ask-password
/bin/systemd-tty-ask-password-agent
/boot/grub/i386-pc/legacy_password_test.mod
/boot/grub/i386-pc/password.mod
...
```

# 19. [apropos](http://man7.org/linux/man-pages/man1/apropos.1.html)

Algo así como *"A propósito de..."* (traducción libre) nos servirá de ayuda si no recordamos un comando pero si que es lo que hacía o con qué trabajaba o simplemente buscamos entre el software instalado en nuestra máquina.
Esta herramienta busca en las cabeceras y descripciones de las páginas de [man](https://linux.die.net/man/) de los programas instalados en el sistema para ayudaros a encontrarlo.

Si por ejemplo buscamos un programa que hacía algo con Python, podemos usarla así:

 `apropos python | less`

(Usamos `less` para ver progresivamente la salida del comando)

Y vemos que entre otras cosas tenemos instalados conversores entre versiones de Python, quizás ni lo sabías :) .

```bash
2to3 (1)             - Python2 to Python3 converter
2to3-2.7 (1)         - Python2 to Python3 converter
2to3-3.5 (1)         - Python2 to Python3 converter
dh_python2 (1)       - calculates Python dependencies, adds maintainer script...
dh_python3 (1)       - calculates Python dependencies, adds maintainer script...
fab (1)              - Simple Pythonic remote deployment tool
jwt3 (1)             - Python implementation of JSON Web Token
:
```

# 20. [tree](https://linux.die.net/man/1/tree)

 Si algún momento has necesitado conocer las subcarpetas y ficheros de un subdirectorio estando en terminal probablemente hayas acabando entrando y saliendo de ellas, bajando y subiendo de nivel, todo esto es mucho más sencillo si podemos ver el árbol de directorios y ficheros desde terminal, grácias a la orden `tree`.

```bash
 $ tree .
.
├── css
│   └── kit.css
├── index.html
└── js
    ├── lib1.js
    ├── lib2.js
    └── lib3.js

2 directories, 5 files
```

Si no la tienes ya instalada es tan fácil como hacer:

`sudo apt-get install tree`

# Bonus: [reverse-i-search](https://www.gnu.org/software/bash/manual/html_node/Commands-For-History.html)

Y para acabar, ya que hemos hablado de `history` y de `locate` no podíamos dejar de lado reverse-i-search, por si lo que queremos es buscar comandos que previamente hemos usado. Es un poco especial porque no se ejecuta de forma común al resto, sino pulsando `Crtl + R` en nuestra terminal, ya que en realidad es un comando para la manipulación del historial que consultamos con `history`.

Un ejemplo, con solo poner `pyth` nos sale una de las órdenes con python que hemos ejecutado.

```bash
(reverse-i-search)`pyth': apropos python | less
```

Para ver más puedes pulsar `Crtl+Shift+R` cuando el buscador está abierto y `Crtl+C` para salir.

Estas son solo algunas de las herramientas que he considerado más útiles para el día a día de cualquier usuario, pero quizás nos hemos dejado en el tintero alguna.

¿Añadirías alguna a la lista? ¡Cuéntanos!
