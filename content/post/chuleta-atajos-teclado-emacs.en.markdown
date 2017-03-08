---
author: alex
categories:
- misc
date: 2017-03-08T16:44:15+01:00
description: "Emacs: A useful recopilation of commands and actions"
image: chuleta-atajos-teclado-emacs.png
introduction: "Emacs: A useful recopilation of commands and actions"
mainclass: misc
tags:
- emacs
- cheatsheet
- prelude
- ensime
title: "Emacs cheatsheet, Shortcuts and useful packages for beginners"
draft: true
---

There is a bunch of post about [cheatsheets](https://elbauldelprogramador.com/en/tags/cheatsheet "cheatsheets")  in this blog:

- [Dig CheatSheet](/dig-chuleta-basica-de-comandos/ "Chuleta básica de comandos Dig")
- [Git CheatSheet](/mini-tutorial-y-chuleta-de-comandos-git/ "Chuleta de comandos para Git")
- [GPG CheatSheet](/chuleta-de-comandos-para-gpg/ "Chuleta de comandos para GPG")
- [MarkDown CheatSheet](/chuleta-markdown-para-wordpress/ "Chuleta de comandos de Markdown")

<!--more--><!--ad-->

Today CheatSheet is going to be about _Emacs_. But I want this cheatsheet to be different, my idea is that all of you using emacs help this cheatsheet grow with your own tips and favorite commands & packages.

I've been using [emacs](https://elbauldelprogramador.com/en/tags/emacs "emacs") for a few months now and I'm pretty happy about it. It is very powerful. Now, lets start with the collaborative Emacs CheatSheet:


# Useful packages

## Yasnippet

[YaSnippet](https://www.emacswiki.org/emacs/Yasnippet "Official yasnippet site") is a template system for emacs, it is a _must have_ package for every emacs user. By default _YaSnippet_ has a set of pre-defined snippets for practically every language, but it is possible to configure our own ones. For example:

Every blog post in this blog has a [Frontmatter](https://elbauldelprogramador.com/en/tags/frontmatter/ "Frontmatter"), one of its variables holds the last time the post was modified, in order to quickly write the current date, I've created the following _YaSnippet_:


```bash
# -*- mode: snippet -*-
# name: Modified
# key: mod
# # modified: 2016-$1-$2T$3:$4$0
# --
lastmod = "`(format-time-string "%Y-%m-%dT%H:%M:%S+01:00")`"$0
```

In the comments some metadata is written, such as the _snippet_ name, and the key that is going to be associated with that snippet, `mod` in this case. So every time `mod TAB` is written, the snippet is expanded, writing something like this:

```bash
lastmod = "2017-03-08T16:58:45+01:00"
```

Here is another example:

```bash
# -*- mode: snippet -*-
# name: CodeBlock
# key: code
# --
\`\`\`$1
$2
\`\`\`
```

This _snippet_ expand to a Markdown code block, `$1` is the first position where the cursor is placed to start writing, `$2` the second and so on. Here is the result:

```markdown
```<Cursor is placed here first>
<After writing the first time and pressing TAB, cursor is placed here>
```
```

# Miscellaneous / Common tasks

## Search & replace in multiple files at once

__Problem__:

Search using a [regular expression](https://elbauldelprogramador.com/en/tags/regex/ "regular expression") or a simple text in multiple files at once, or a entire directory and replace all the matches found.

__Solution:__

1. Run `M-x find-name-dired` and write the directory where files in which to look for matches are.
2. Press `t` to “mark” all directory files.
3. Press `Q` to run the command `query-replace` for every file marked.
4. Write down the regex, for every file matches it is necessary to confirm the operation, in order to replace the contents in all the files at once, press `A`.

__Source__: [Using Emacs to recursively find and replace in text files not already open](http://stackoverflow.com/a/271136/1612432 "Using Emacs to recursively find and replace in text files not already open")

## Selección rectangular

__Problema:__

A veces queremos seleccionar una región de texto y realizar una acción sobre ella, por ejemplo eliminar espacios en blanco, añadir algún texto delante de cada frase etc.

__Solución:__

Supongamos que tenemos el siguiente texto:

```bash
línea 1
línea 2
línea 3
línea 4
```

Y queremos transformarla a:

```bash
- línea 1
- línea 2
- línea 3
- línea 4
```

Para ello seleccionamos la región, y pulsamos `C-x r t`, nos preguntará qué texto queremos introducir, le damos a enter y listo. Otras combinaciones para operar en selecciones rectangulares:

- `C-x r k`: _Kill_ el texto de la región seleccionada.
- `C-x r d`: _Borra_ el texto de la región seleccionada.
- `C-x r y`: Pega (_Yank_) la última región borrada (Con _kill_)
- `C-x r o`: Inserta espacios en blanco para rellenar el espacio de la región seleccionada.
- `M-x clear-rectangle`: Reemplaza la selección con espacios.
- `M-x delete-white-spaces-rectangle`: Elimina los espacios en blanco a la izquierda.
- `C-x r t string RET`: Reemplaza el contenido del rectángulo con _string_ en cada línea. (El ejemplo visto)
- `M-x string-insert-rectangle RET string RET`: Inserta _string_ en cada línea del rectángulo.

__Fuente__: [GNU Emacs Manual](http://www.delorie.com/gnu/docs/emacs/emacs_68.html "GNU Emacs Manual")

## Reemplazar un carácter con un salto de línea

__Problema:__

Supongamos que tenemos un texto mal formateado, y queremos reemplazar un caracter en concreto por un salto de línea. Esto suele pasar por ejemplo al leer ficheros con codificaciones distintas. En los que el salto de línea se interpreta de otro modo. A modo de ejemplo, supongamos que vamos a reemplazar el caracter `^N` por un salto de línea. Tenemos este texto:

```bash
Lorem ipsum dolor sit amet^N, consectetur adipiscing elit.^N Fusce vestibulum.
```

__Solución:__

1. Pulsar `M-x replace-string`.
2. Introducimos el texto que queremos reemplazar, en este caso `^N`.
3. Insertamos el salto de línea, para ello, pulsar:
   1. `C-q`: Para decirle a emacs que vamos a insertar un caracter en crudo (_raw_).
   2. `C-j`: Esta combinación se corresponde con el salto de línea
4. Pulsamos `Enter` y deberíamos tener el siguiente texto:

```bash
Lorem ipsum dolor sit amet
, consectetur adipiscing elit.
 Fusce vestibulum.
```

__Fuente:__ [How to replace a character with a newline in Emacs?](http://stackoverflow.com/a/613029/1612432 "How to replace a character with a newline in Emacs?")

## Eliminiar los espacios en blanco sobrantes al final de una línea

Basta ejecutar `M-x delete-trailing-whitespace`.

## Guardar comandos que usamos usualmente

Este tema se trató en más profundidad en el artículo [_Cómo crear comandos personalizados en Emacs_](/como-crear-comandos-personalizados-en-emacs "Cómo crear comandos personalizados en Emacs").

## Administar las copias de seguridad de emacs

__Problema:__

_Emacs_ por defecto guarda una copia de seguridad del fichero en un fichero del mismo nombre pero acabado en `~`, aunque es bastánte útil, a veces molesta tener ficheros desperdigados a lo largo de las carpetas acabando en `~`. Es posible almacenarlos todos en una carpeta. Veamos.

__Solución:__

En el fichero de configuración (`~/.emacs/init.el`) añadimos

```elisp
;; Set a directory for backup files
(setq backup-directory-alist `(("." . "~/.saves")))
(setq delete-old-versions t
    kept-new-versions 6
    kept-old-versions 2
    version-control t)
```

Donde podemos sustituir `~/.saves` por el directorio deseado.

__Fuente:__ [How do I control how Emacs makes backup files?](http://stackoverflow.com/a/151946/1612432 "How do I control how Emacs makes backup files?")

## Ejecutar una acción para todos los buffers abiertos

__Problema:__

Algunos comandos que hemos visto aquí, como buscar y reemplazar texto en varios ficheros a la vez, realizan la acción pero no guardan los cambios en el fichero. Para guardarlos tenemos que seleccionarlos uno a uno en el _buffer_ y ejecutar la acción de guardar. Para hacernos la vida más fácil, podemos usar `ibuffer`

__Solución:__

Para sustituir el modo _buffer_, por _ibuffer_ debemos añadir a nuestra configuración:

```elisp
;; make ibuffer the default
(global-set-key "\C-x\C-b" 'ibuffer)
```

A partir de ahora, cada vez que visitemos la pestaña del _buffer_, se abrirá _ibuffer_. Para seleccionar todos los ficheros abiertos y guardarlos:

1. Pulsar `t`, para seleccionar todos los ficheros.
2. Pulsar `S`, para guardar los ficheros seleccionados

__Fuente:__ [Execute a particular command on multiple emacs buffers](http://stackoverflow.com/a/14293998/1612432 "Execute a particular command on multiple emacs buffers")

## Alinear verticalmente código en base al signo =

- `M-x align-regex =`

## Convertir texto a mayúscula/minúscula

- `C-x C-u`: Convertir la región seleccionada a mayúsculas.
- `C-x C-l`: Convertir la región seleccionada a minúsculas.
- `M-l`: Convertir la siguiente palabra a minúscula.
- `M-u`: Convertir la siguiente palabra a mayúscula.
- `M-c`: Convertir a mayúscula la primera letra de la palabra -- Capitalizar --.

## Reemplazar tabulador por espacios y viceversa

- `M-x tabify`: Sustituye en la región seleccionada espacios por tabuladores.
- `M-x untabify`: Proceso contrario, reemplaza en la región selecionada tabuladores por espacios.

Fuente: [mdk.fr](https://mdk.fr/blog/emacs-replace-tabs-with-spaces.html "Emacs: replace tabs with spaces")

# Prelude

Tal y como dice la descripción de su repositorio en [Github](https://elbauldelprogramador.com/tags/github/ "Github"):

> _Prelude_ is an enhanced Emacs 24 distribution that should make your experience with Emacs both more pleasant and more powerful.

es decir:

> _Prelude_ es una distribución mejorada de Emacs 24 que debería hacer tu experiencia con emacs más agradable y potente.

Aunque la descripción menciona la versión 24, personalmente yo estoy usando la versión 25 en [Gentoo](https://elbauldelprogramador.com/tags/gentoo "Gentoo") y funciona perfectamente.

La instalación de _Prelude_ es muy sencilla, toda la documentación necesaria se encuentra en su <a href="https://github.com/bbatsov/prelude" target="_blank" title="repositorio de Github">repositorio de Github</a>.

# Tu Turno

El propósito de este artículo es que crezca con las contribuciones de todos nosotros, para ello he subido el código de este artículo a github. Para aportar vuestro granito de arena, mandad <a href="https://github.com/algui91/algui91-hugo/edit/master/content/post/chuleta-atajos-teclado-emacs.markdown" target="_blank" title="Pull Request">Pull Request</a>.

Esperamos vuestras colaboraciones!
