---
author: alex
categories:
- aplicaciones
- c
- linux
color: '#E64A19'
description: "Hace tiempo que habl\xE9 de Xmonad, y hasta hace poco ha sido mi gestor
  de ventanas, durante varios a\xF1os. Pero semanas atr\xE1s descubr\xED el proyecto
  original en el que se basaba xmonad, DWM. Xmonad es un clon de DWM escrito en Haskell,
  lo cual lo hace un poco m\xE1s pesado y lento debido a las dependencias que tiene
  y la necesidad de instalar su compilador. Tras probar DWM, no puedo estar m\xE1s
  contento con el resultado, est\xE1 escrito en C, y todas las modificaciones en la
  configuraci\xF3n se hacen sobre el propio c\xF3digo, lo cual lo hace muy eficiente
  y r\xE1pido. En este art\xEDculo veremos c\xF3mo instalar y configurar DWM."
image: "2014/07/Instalar-y-configurar-DWM-el-gestor-de-ventanas-m\xE1s-eficiente1.png"
lastmod: 2015-12-24
layout: post.amp
mainclass: dev
permalink: /instalar-y-configurar-dwm-el-gestor-de-ventanas-mas-eficiente/
tags:
- dwm
- dynamic window manager
- "En este art\xEDculo veremos c\xF3mo instalar y configurar DWM"
- que es dwm
- statuscolor dwm 6.1
- tiling desktop
title: "Instalar y configurar DWM, el gestor de ventanas m\xE1s eficiente"
---

Hace tiempo que hablé de [Xmonad][1], y hasta hace poco ha sido mi gestor de ventanas, durante varios años. Pero semanas atrás descubrí el proyecto original en el que se basaba xmonad, DWM. Xmonad es un clon de DWM escrito en <a href="http://www.haskell.org/haskellwiki/Haskell" title="Web de Haskell" target="_blank">Haskell</a>, lo cual lo hace un poco más pesado y lento debido a las dependencias que tiene y la necesidad de instalar su compilador. Tras probar DWM, no puedo estar más contento con el resultado, está escrito en C, y todas las modificaciones en la configuración se hacen sobre el propio código, lo cual lo hace muy eficiente y rápido. En este artículo veremos cómo instalar y configurar DWM.

<!--more--><!--ad-->

## Qué es DWM

DWM es un gestor de ventanas dinámico que permite organizar las ventanas de varias formas (*tiled, monocle y floating*). Cada ventana se asigna a una etiqueta, esto podría considerarse como escritorios en otros gestores de ventanas. Por defecto hay 9 etiquetas.

## Cómo instalar DWM

La mejor forma es clonar el repositorio [git][2]:

```bash
$ git clone http://git.suckless.org/dwm

```

Una vez clonado y dentro del directorio, compilamos e instalamos:

```bash
$ sudo make clean install

```

Ya está listo para usar, pero hay que hacer una última cosa para poder ejecutarlo tras introducir nuestro usuario y contraseña del ordenador. Si usas Ubuntu o Debian, probablemente **lightdm** sea el gestor de login. De ser así, añadiremos una entrada a la lista de sesiones de **lightdm** para poder acceder a DWM. Para ello creamos el fichero *dwm-personalized.desktop* y lo copiamos a `/usr/share/xsessions/`

```bash
[Desktop Entry]
Encoding=UTF-8
Name=Dwm-personalized
Comment=Dynamic window manager
Exec=dwm-personalized
Icon=dwm.png
Type=XSession

```

En éste archivo estamos definiendo la información necesaria para que **lightdm** sea capaz de ejecutar DWM cuando entremos en el pc. `Exec=dwm-personalized` indica qué script debe ejecutarse, pero aún no lo hemos creado. Éste archivo debe contener todos los programas que queramos iniciar y, en la última línea, se debe ejecutar DWM. Mi script es así:

```bash
#!/bin/bash

# setting keuboard layout /usr/share/X11/xkb/rules/base.lst
setxkbmap us intl

xset +fp /usr/share/fonts/local
xset fp rehash

nm-applet &
insync start &
transmission-gtk &
.dropbox-dist/dropboxd &
parcellite &
xfce4-volumed &

#Set status bar & start DWM
dwmstatus &

exec dwm

```

Creado el script, hay que darle permisos de ejecución y copiarlo a `/usr/bin`

```bash
$ chmo +x dwm-personalized
$ sudo cp dwm-personalized /usr/bin

```

## Primera ejecución

Ejecutados los pasos anteriores, ahora basta con salir de la sesión actual y entrar con DWM. Algunas cosas que probablemente sean adecuadas cambiar antes de ejecutar dwm es qué terminal usar. Para ello hay que modificar la variable `termcmd` en `config.def.h`, que por defecto es:

```c
static const char *termcmd[]  = { "st", NULL };

```

Por el terminal preferido de cada uno, el mio por ejemplo es **Terminator**:

```c
static const char *termcmd[]  = { "terminator", NULL };

```

Recompilamos y listo.

### Instalar Dmenu

Un programa muy útil es dmenu, permite lanzar cualquier programa abriendo una ventanita en la que podemos escribir el nombre del programa a ejecutar:

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/07/dmenu.png" alt="Dmenu" width="478px" height="13px" />

Para instalarlo:

```bash
$ sudo apt-get install suckless-tools

```

Debemos modificar una línea en `config.def.h` ya que parece ser que la versión que instala Ubuntu no concuerda con la que supone dwm y hay un parámetro que no existe. Para ello eliminamos `, "-m", dmenumon` de ésta línea:

```c
static const char *dmenucmd[] = { "dmenu_run", "-m", dmenumon, "-fn", font, "-nb", normbgcolor, "-nf", normfgcolor, "-sb", selbgcolor, "-sf", selfgcolor, NULL };

```

Quedando así:

```c
static const char *dmenucmd[] = { "dmenu_run", "-fn", font, "-nb", normbgcolor, "-nf", normfgcolor, "-sb", selbgcolor, "-sf", selfgcolor, NULL };

```

## Probando DWM

Ahora que está todo al entrar podremos ejecutar un terminal pulsando ALT+Shift+Enter, ejecutar **dmenu** pulsando ALT+p etc. Los atajos de teclado se definen en el array `static Key keys[]`.

## Cambiar la tecla ALT por la de Windows

Para los usuarios de Linux, la tecla de Windows no se usa prácticamente para nada, lo cual viene muy bien para este tipo de programas, y así de paso evitamos interferir con cualquier otro atajo que haya definido otro programa. Para cambiar el modificador ALT por la tecla de Windows basta con cambiar

```c
#define MODKEY Mod1Mask

```

por

```c
#define MODKEY Mod4Mask

```

en el fichero `config.def.h`

## Aplicar parches

Existen multitud de modificaciones hechas por los usuarios de DWM para añadirle funcionalidad. Pueden encontrarse en <a href="https://github.com/jceb/dwm-clean-patches" title="Clean patches" target="_blank">este repositorio</a> de [github][3].

## Comentarios finales

Espero que esta pequeña introducción haya servido al lector. Desde que entré en el mundo de éste tipo de gestores de ventanas no he querido volver a ver a los gestores clásicos. Una vez te acostumbras a usar el teclado, la velocidad al trabajar en el pc aumenta considerablemente.

Aquí dejo una captura de pantalla de mi escritorio actual. En unos días explicaré cómo desarrollé la posibilidad de colorear la barra de estado (Ya está disponible [aquí][4]), ya que por defecto la versión 6.1 de DWM no lo permite.

<figure>
<a href="/img/2014/07/Instalar-y-configurar-DWM-el-gestor-de-ventanas-más-eficiente1.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/07/Instalar-y-configurar-DWM-el-gestor-de-ventanas-más-eficiente1.png" title="{{ page.title }}" alt="{{ page.title }}" width="1280px" height="768px" /></a>
</figure>

#### Referencias

*Web Oficial de DWM* »» <a href="" target="_blank">dwm.suckless.org</a>



 [1]: https://elbauldelprogramador.com/configurar-xmonad-con-trayer-y-fondo-de-pantalla-aleatorio/ "Configurar xmonad con trayer y fondo de pantalla aleatorio"
 [2]: https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos"
 [3]: https://elbauldelprogramador.com/la-generacion-github-por-que-ahora-todos-estamos-en-el-opensource/ "La generación GitHub: Por qué ahora todos estamos en el opensource"
 [4]: https://elbauldelprogramador.com/statuscolor-dwm-6-1/ "Colorear la barra de estado con Simple StatusColor en DWM 6.1"
