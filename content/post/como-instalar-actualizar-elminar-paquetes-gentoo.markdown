---
author: alex
categories:
- linux
- gentoo
date: 2016-07-29 10:20:01
lastmod: 2017-03-21T16:38:56+01:00
description: Chuleta de comandos para administrar gentoo, instalar, actualizar y borrar  paquetes
image: como-instalar-actualizar-elminar-paquetes-gentoo.png
introduction: Chuleta de comandos para administrar gentoo, instalar, actualizar y  borrar paquetes
mainclass: linux
tags:
- gentoo
- portage
- emerge
- eclean
- emaint
title: "C\xF3mo Instalar/actualizar/eliminar Paquetes en Gentoo"
---

<figure>
        <a href="/img/como-instalar-actualizar-elminar-paquetes-gentoo.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/como-instalar-actualizar-elminar-paquetes-gentoo.png"
            alt="C\xF3mo Instalar/actualizar/eliminar Paquetes en Gentoo"
            title="C\xF3mo Instalar/actualizar/eliminar Paquetes en Gentoo"
            sizes="(min-width: 526px) 526px, 100vw"
            width="526"
            height="256">
          </amp-img>
        </a>
        <figcaption>Imagen tomada con <em>ScreenFetch</em></figcaption>
</figure>

Hace unos meses me decidí a instalar _Gentoo_ en mi portátil por probar cómo iba, y la verdad es que me está gustando bastante. La capacidad de personalización que tiene es tremenda.

Una de las cosas que más me gusta es su gestor de paquetes, _emerge_ y sus programas auxiliares para administrar el sistema (_equery, eclean, euse y similares_) es por ello que escribo este artículo, para recopilar una lista de las tareas más habituales en el día a día de usar _Gentoo_. Cómo buscar paquetes a instalar, eliminar paquetes instalados, consultar qué paquetes queremos instalar, limpiar espacio en el sistema, actualizarlo etc. Empecemos:

<!--more--><!--ad-->

# Comprobar si hay actualizaciones para el sistema #

Una de las primeras cosas que hago cuando enciendo el PC es comprobar si hay actualizaciones del sistema, en _Gentoo_ esto podemos hacerlo con el siguiente comando:

```bash
$ emerge-webrsync
$ emerge --sync
$ emaint -A sync
```

Los tres comandos llevan a cabo la misma tarea, pero difieren en varios aspectos:

- `emerge --sync`: Solo existe para propósito de compatibilidad, ya que los otros dos comandos son más modernos
- `emaint -A sync`: `emaint` es una herramienta para realizar tareas de mantenimiento en el sistema relacionadas con los paquetes, también realiza comprobaciones de “salud”. Entre sus subcomandos está la opción `sync`, que comprueba si hay actualizaciones para los paquetes instalados. La opción `-A` es para que sincronice todos los repositorios.
- `emerge-webrsync`: Este es similar al anterior, pero descarga los datos en un _tarball_, lo cual lo hará mucho más rápido que los dos anteriores, este es el comando que suelo usar.

# Actualizar el sistema #

Sincronizados con el servidor, deberemos realizar la actualización en sí, en caso de existir. Para esta tarea yo suelo usar el siguiente comando:

```bash
$ emerge --update --deep --newuse -atv @world
```

Desglosemos cada parámetro:

- `--update`: Actualiza el paquete a la mejor versión disponible.
- `--deep:`: Obliga a que se consideren todas las dependencias de un paquete, en lugar de únicamente las dependencias directas. De este modo se actulizan librerías que no están listadas directamente en las dependencias de un paquete.
- `--newuse`: En el caso de que se haya modificado la variable `USE`, no es necesaria de lo contrario, pero yo suelo ponerla.
- `-a` (`--ask`): Pide confirmación antes de realizar la operación.
- `-t` (`--tree`): Muestra los paquetes a actualizar e instalar en forma de árbol.
- `-v` (`--verbose`): Muestra más información.

# Eliminar un paquete con todas sus dependencias #

Para eliminar por completo un paquete, con todas las dependencias:

```bash
$ emerge -atv --depclean paquete
```

Tras eliminar el paquete podemos ejecutar de nuevo:

```bash
$ emerge -atv --depclean
```

para eliminar las dependencias que tuviera el paquete desistalado, pero `depclean` no eliminará ningún paquete a no ser que todas las dependencias requeridas hayan sido resueltas, por tanto es necesario ejecutar el siguiente comando:

```bash
$ emerge --update --newuse --deep @world
```

En el caso de no haber actualizado la variable `USE` en nuestro sistema, podemos ahorrar tiempo con:

```bash
$ emerge --update --changed-use --deep @world
```

# Buscar paquetes a instalar #

Hay varias formas, se puede buscar:

## Usando expresiones regulares ##

```bash
$ emerge -s "%^python$"
```

Esto buscará paquetes que se llamen exáctamente _python_, y por tanto solo hay uno:

```bash
[ Results for search key : %^python$ ]
Searching...

*  dev-lang/python
      Latest version available: 3.4.3-r1
      Latest version installed: 3.4.3-r1
      Size of files: 14,096 KiB
      Homepage:      http://www.python.org/
      Description:   An interpreted, interactive, object-oriented programming language
      License:       PSF-2

[ Applications found : 1 ]
```

## Buscar paquetes que contengan la palabra x ##

Para buscar todos los paquetes que contengan la palabra _python_:

```bash
$ emerge -s python
```

Tras ejecutar este comando, en mi caso aparecen 200 paquetes.

## Buscar paquetes basándonos en su descripción ##

En lugar de buscar por el nombre del paquete, podemos buscar en su descripción:

```bash
$ emerge --searchdesc python
```

También se pueden usar [expresiones regulares](/introduccion-a-las-expresiones-regulares-en-python/ "Introducción a las expresiones regulares en python" ).


## Instalar paquetes ##

Una vez encontrado el paquete que deaseamos instalar, prodecemos del siguiente modo:

```bash
$ emerge -atv paquete
```

# Equery #

_Equery_ es parte del paquete `gentoolkit`, el cual instala una serie de aplicaciones destinadas a la administración de _Gentoo_, para instalarlo basta con ejecutar:

```bash
$ emerge --ask app-portage/gentoolkit
```

_Equery_ es una aplicación creada con el propósito de hacer tareas comunes en _Portage_ más sencillas, veamos una lista de lo que puede hacer:

```bash
Gentoo package query tool
Usage: equery [global-options] module-name [module-options]

global options
 ....

modules (short name)
 (b)elongs               list what package FILES belong to
 (c)hanges               list changelog entries for ATOM
 chec(k)                 verify checksums and timestamps for PKG
 (d)epends               list all packages directly depending on ATOM
 dep(g)raph              display a tree of all dependencies for PKG
 (f)iles                 list all files installed by PKG
 h(a)s                   list all packages for matching ENVIRONMENT data stored in /var/db/pkg
 (h)asuse                list all packages that have USE flag
 ke(y)words              display keywords for specified PKG
 (l)ist                  list package matching PKG
 (m)eta                  display metadata about PKG
 (s)ize                  display total size of all files owned by PKG
 (u)ses                  display USE flags for PKG
 (w)hich                 print full path to ebuild for PKG
```

Si quisieramos ver el árbol de dependencias de firefox:

```bash
$ equery g firefox
```

# Eclean #

_eclean_ es otra herramienta parte del paquete _Gentoolkit_, diseñada para limpiar el sistema del código fuente usado para compilar los paquetes y binarios creados durante el proceso de compilación.

## Limpiar el código fuente de los paquetes ##

Tras instalar paquetes, el código fuente queda guardado junto con los objetos generados por si es necesario recompilar, si no los queremos mantener, es posible eliminarlos con estos comandos:

```bash
$ eclean --deep distfiles
$ eclean-dist
```

`eclean-dist` es un alias de `eclean distfiles`, la opción `--deep` deja únicamente el código fuente necesario para una reinstalación.

## Limpiar paquetes binarios ##

Los paquetes binarios son aquellos que no proporcionan código fuente, como por ejemplo el software privativo, o paquetes precompilados, para borrarlos basta ejecutar:

```bash
$ eclean --deep packages
$ eclean-pkg
```


# Apps Recomendadas #

Antes de usar _Gentoo_, utilizaba el comando `df` para ver el estado de los discos duros, un ejemplo:

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda4        20G  7.9G   11G  44% /
tmpfs           1.2G  952K  1.2G   1% /run
dev              10M     0   10M   0% /dev
shm             5.9G   91M  5.8G   2% /dev/shm
cgroup_root      10M     0   10M   0% /sys/fs/cgroup
/dev/sda2       128M   16M  113M  12% /boot
/dev/sda5        87G   38G   45G  46% /home
/dev/sdb1       110G   11G   94G  11% /home/hkr/ssd2
none            5.9G     0  5.9G   0% /run/user/1000
```

Tras instalar _Gentoo_ descubrí el paquete `pydf`, similar a `df` pero visualmente más atractivo, colorea el resultado y muestra una representación gráfica del porcentaje ocupado:

```bash
$ pydf  -h
Filesystem Size  Used Avail Use%                                                                                       Mounted on
/dev/sda4   19G 8043M   10G 41.1 [##################################.................................................] /
/dev/sda2  128M   15M  112M 12.0 [##########.........................................................................] /boot
/dev/sda5   87G   38G   45G 43.4 [####################################...............................................] /home
/dev/sdb1  110G   11G   94G  9.8 [########...........................................................................] /home/hkr/ssd2
```

### Referencias

- [Gentoo Cheat Sheet](https://wiki.gentoo.org/wiki/Gentoo_Cheat_Sheet "CheatSheet de Gentoo" )
- [Equery](https://wiki.gentoo.org/wiki/Equery "Página de Equery" )
- [Eclean](https://wiki.gentoo.org/wiki/Eclean "Página de Eclean" )
