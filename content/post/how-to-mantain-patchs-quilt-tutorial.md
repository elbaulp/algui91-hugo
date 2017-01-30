+++
author = "alex"
date = "2017-01-30"
title = "Cómo mantener varios parches - Un tutorial sobre Quilt"
description = "La herramienta quilt permite administrar fácilmente los distintos parches de un programa."
tags = ["quilt", "software", "parches"]
categories = ["dev"]
image = ""
mainclass = "dev"
+++

Llevo unos cuantos años usando [DWM](https://elbauldelprogramador.com/tags/dwm/ "DWM"), incluso creé un parche que permitía [colorear su barra de estado](https://elbauldelprogramador.com/statuscolor-dwm-6-1/ "Colorear la barra de estado con Simple StatusColor en DWM 6.1"). Hacía bastante tiempo que DWM se había actualizado, pero no me veía capaz de parchear mi versión modificada de DWM con la original, hasta que encontré el repositorio <a href="https://github.com/jceb/dwm-patches" target="_blank" title="DWM-Patches">DWM-Patches</a> y aprendí a usar la herramienta _quilt_.

# ¿Qué es Quilt?

Según su `man`:

> Quilt is a tool to manage large sets of patches by keeping track of the changes each patch makes. Patches can be applied, un-applied, refreshed, etc. The key philosophical concept is that your primary output is patches.

Es decir, una herramienta que permite administrar grandes cantidades de parches a la vez que guardar un historial de los cambios que cada uno hace. Con _quilt_ es posible aplicar, borrar o modificar cualquier parche.

<!--more--><!--ad-->

# Uso básico

Veamos un ejemplo sencillo, supongamos el siguiente fichero:

```text
# fichero.txt
linea 1
linea 2
linea 3
```

`fichero.txt` será nuestra base.

# Crear un parche

Para crear un parche basta con ejecutar `quilt new parche1.diff`:

```bash
$ quilt new parche1.diff
Patch patches/parche1.diff is now on top
```

# Editar el fichero

Y luego especificamos el fichero sobre el que queremos hacer el parche:

```bash
$ quilt edit fichero.txt
File fichero.txt added to patch patches/parche1.diff
```

Ahora podemos empezar a editar `fichero.txt`, por ejemplo:

```text
linea 1
modificación 1 (Por parche1.diff)
linea 2
linea 3
```

# Ver los cambios

Tras terminar de editar, podemos ver el diff:

```diff
$ quilt diff
Index: _drafts/fichero.txt
===================================================================
--- _drafts.orig/fichero.txt
+++ _drafts/fichero.txt
@@ -1,3 +1,4 @@
 linea 1
+modificaci<C3><B3>n 1 (Por parche1.diff)
 linea 2
 linea 3
```

# Generar el parche

Aún no hemos generado el parche, para crearlo ejecutamos:

```bash
$ quilt refresh
Refreshed patch patches/parche1.diff
```

# Administrar parches

Listo, ahora en el directorio `patches/` deberemos tener un fichero llamado `parche1.diff` con nuestros cambios. Actualmente solo tenemos uno, si queremos deshacer los cambios y volver al estado original de `fichero.txt` basta con hacer:

```bash
$ quilt pop
Removing patch patches/parche1.diff
Restoring fichero.txt

No patches applied
```

Como vemos, `fichero.txt` vuelve a su estado original:

```text
$ cat fichero.txt
linea 1
linea 2
linea 3
```

Si tuvieramos más de un parche, `quilt pop` aceptaría el nombre del parche, o la opción `-a` para eliminar todos los parches. Creemos un segundo parche:

# Segundo parche

Antes de crear un segundo parche, debemos aplicar el primero, o si tuvieramos varios, todos, para ello:

```bash
$ quilt push -a
Applying patch patches/parche1.diff
patching file fichero.txt

Now at patch patches/parche1.diff
```

Ahora estamos en condiciones de crear el nuevo parche:

```bash
$ quilt new parche2.diff
Patch patches/parche2.diff is now on top
```

## Listar la pila de parches

Ahora que tenemos varios parches, podemos ver el orden en el que se aplican con `quilt series`

```bash
$ quilt series
patches/parche1.diff
patches/parche2.diff
```
El último en la pila es `parche2`, ahora mismo está vacío, ya que lo acabamos de crear. Para ester parche vamos a modificar `fichero.txt` y crear uno nuevo, `fichero2.txt`:


```bash
$ quilt add fichero2.txt
File fichero2.txt added to patch patches/parche2.diff
$ quilt add fichero.txt
File fichero.txt added to patch patches/parche2.diff
$ echo "Linea creada por parche2.diff" >> fichero.txt
$ echo "Nuevo Fichero creado por parche2.diff" > fichero2.txt
```

``` diff
$ quilt diff
Index: _drafts/fichero.txt
===================================================================
--- _drafts.orig/fichero.txt
+++ _drafts/fichero.txt
@@ -2,3 +2,4 @@ linea 1
 modificaci<C3><B3>n 1 (Por parche1.diff)
 linea 2
 linea 3
+Linea creada por parche2.diff
Index: _drafts/fichero2.txt
===================================================================
--- /dev/null
+++ _drafts/fichero2.txt
@@ -0,0 +1 @@
+Nuevo Fichero creado por parche2.diff
```

Ya solo resta aplicar los cambios al parche, con `quilt refresh`:

```bash
$ quilt refresh
Refreshed patch patches/parche2.diff
```

Cuando terminemos de editar los parches, es recomendable volver al estado inicial, deshaciendo las modificaciones de todos los parches:

```bash
$ quilt pop -a
Removing patch patches/parche2.diff
Restoring fichero.txt
Removing fichero2.txt

Removing patch patches/parche1.diff
Restoring fichero.txt

No patches applied

$ ll

-rw-r--r-- 1 hkr hkr   24 Jan 30 18:31 fichero.txt
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:29 patches/
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:31 .pc/
```

Para volver a aplicarlos:

```bash
$ quilt push -a
Applying patch patches/parche1.diff
patching file fichero.txt

Applying patch patches/parche2.diff
patching file fichero.txt
patching file fichero2.txt

Now at patch patches/parche2.diff

$ ll

-rw-r--r-- 1 hkr hkr   38 Jan 30 18:32 fichero2.txt
-rw-r--r-- 1 hkr hkr   89 Jan 30 18:32 fichero.txt
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:29 patches/
drwxr-xr-x 4 hkr hkr 4.0K Jan 30 18:32 .pc/
```

Para ver un ejemplo real, y más complejo, puedes visitar mi repositorio <a href="https://github.com/algui91/myDWM" target="_blank" title="DWM">DWM</a>.

# Bibliografía

- UsingQuilt | <a href="https://wiki.debian.org/UsingQuilt" target="_blank" title="Using Quilt | Debian Wiki">wiki.debian.org</a>
- How To Survive With Many Patches | <a href="https://stuff.mit.edu/afs/athena/system/i386_deb50/os/usr/share/doc/quilt/quilt.html" target="_blank" title="How to survive with many patches">stuff.mit.edu</a>
