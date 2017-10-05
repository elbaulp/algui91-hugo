---
author: alex
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-10-05T12:26:07+01:00
url: /instalar-atom-el-editor-de-github-en-linux/
title: Instalar Atom, el editor de GitHub en Linux
---

Hace unos días decidí instalar **Atom**, el nuevo editor que recientemente publicó GitHub, después de descubrir que ya era posible instalarlo en Linux (Inicialmente solo estaba disponible para Mac). Tras probarlo unos días, he quedado tan impresionado que se ha convertido en mi editor de texto e IDE predeterminado. En su web oficial lo describen como:

> At GitHub, we&#8217;re building the text editor we&#8217;ve always wanted. A tool you can customize to do anything, but also use productively on the first day without ever touching a config file. Atom is modern, approachable, and hackable to the core. We can&#8217;t wait to see what you build with it.

Y tras probarlo, puedo decir que es configurable a más no poder, fácil de usar y con una interfaz impecable.

En éste artículo veremos cómo instalarlo y qué paquetes de los que no vienen por defecto merece la pena instalar.

<!--more--><!--ad-->

# Requisitos

  * Un Sistema Operativo de 64-bits
  * <a target="_blank" href="http://nodejs.org/download/">node.js</a> v0.10.x
  * <a target="_blank" href="http://www.npmjs.org/">npm</a> v1.4.x
  * libgnome-keyring-dev `sudo apt-get install libgnome-keyring-dev`
  * `npm config set python /usr/bin/python2 -g` Para asegurarnos que gyp usa Python2

# Compilar e instalar Atom

Una vez instalados los requisitos, comenzamos a instalar **Atom**:

```bash
git clone https://github.com/atom/atom
cd atom
script/build # Crea la aplicación en $TMPDIR/atom-build/Atom
sudo script/grunt install # Instala los binarios a /usr/local/bin/atom
script/grunt mkdeb # Genera un paquete .deb en  $TMPDIR/atom-build

```

Una vez terminado, podemos instalar el fichero .deb que reside en el directorio `$TMPDIR/atom-build`, normalmente el directorio `$TMPDIR` es `/tmp`.

Hecho esto, ya podemos ejecutar Atom desde la consola o desde el menú que nuestro Sistema Operativo haya creado como enlace a la aplicación.

# Mini tutorial

Si no se te da bien recordar atajos de teclado, basta con recordar uno solo para obtenerlos todos `ctrl-shift-P`, aparecerá algo así:

<figure>
    <amp-img sizes="(min-width: 548px) 548px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/05/cmd-alt-p-atom.png" alt="cmd-alt-p atom" width="548px" height="390px" />
</figure>

## Encontrando archivos

La forma más rápida de encontrar algún archivo es pulsar `Ctrl-T` y escribir el nombre del archivo a buscar. Para buscar en archivos ya abiertos es mejor usar `Ctrl-b`. Si estamos usando [git][1] `Ctrl-shift-b` para buscar la lista de ficheros modificados y no agregados en el repositorio.

## Panel de control

La forma rápida de abrir las preferencias es pulsar `Ctrl-,`. Aquí podremos personalizar entre otras cosas, la apariencia del editor.

# Paquetes útiles

Hasta ahora, he encontrado dos paquetes que resultan bastánte útiles, la lista entera se puede encontrar en la <a href="https://atom.io/packages" target="_blank">página oficial</a>.

## Build

Uno de ellos es *build*, que permite compilar el projecto abierto directamente desde **Atom**.

Para instalarlo:

```bash
apm install build

```

Una vez instalado, basta con situarnos en el proyecto y pulsar `alt-Ctrl-b`. Si necesitamos añadir opciones adicionales a make, podemos hacerlo en la preferencias del paquete.

## Git plus

Otro paquete interesante es **<a href="https://atom.io/packages/git-plus" title="Git Plus" target="_blank">git-plus</a>**, que permite hacer cosas en git sin necesidad de la línea de comandos, para instalarlo:

```bash
apm install git-plus

```

Una demostración de su uso:

<figure>
    <amp-img sizes="(min-width: 1075px) 1075px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/05/git-plus-atom.gif" alt="git-plus-atom" width="1075px" height="340px" />
</figure>

Algunos comandos básicos:

  1. `Git add [all]`

    Git add añadirá el fichero actual y *&#8216;add all&#8217;* añadirá todos los modificados: `Ctrl-Shift-A`

  2. `Git commit`

    Abrirá una ventana para escribir el mensaje de commit, se aplicará al guardar éste fichero: `Ctrl-Shift-C`

  3. `Git [checkout]`

    Cambiar de rama

  4. `Git new branch`

    Crear rama

  5. `Git [push|pull]`

    Subir los cambios al repositorio.

  6. `Git Add and Commit`

    Aplica `Git add` y `Git commit` sucesivamente: `Ctrl-Shift-A c`

  7. `Git Add All and Commit`

    Aplica `Git add all` y `Git commit` sucesivamente: `Ctrl-Shift-A a`

## Git diff

Éste paquete viene instalado por defecto, es bastante útil porque muestra el diff de forma gráfica, por ejemplo:

<figure>
    <amp-img sizes="(min-width: 800px) 800px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/05/git-diff-atom.png" alt="git diff atom" width="800px" height="224px" />
</figure>


Donde el símbolo + significa que se ha agregado una línea nueva, y el punto amarillo que se ha modificado una existente.

# Conclusión

Personalmente es un editor que me ha gustado mucho, muy fácil de usar y con una capacidad de configuración tremenda. Dispone de una cantidad de extensiones enorme, y eso que aún está en sus fases iniciales. Vale la pena probarlo, no os decepcionará. Además, es [opensource][2].

¿Y tú?, ¿lo has probado?, ¿Hay algún paquete que hayas probado que te resulte interesante? ¡Déjanos un comentario!

# Referencias

- *Readme.MD linux* »» <a href="https://github.com/atom/atom/blob/master/docs/build-instructions/linux.md" target="_blank">github.com</a>

 [1]: https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos"
 [2]: https://elbauldelprogramador.com/la-generacion-github-por-que-ahora-todos-estamos-en-el-opensource/ "La generación GitHub: Por qué ahora todos estamos en el opensource"
