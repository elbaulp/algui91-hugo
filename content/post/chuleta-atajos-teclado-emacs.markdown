---
author: alex
categories:
- misc
color: '#61B38D'
date: 2016-08-30 14:10:30
description: "Emacs: Recopilaci\xF3n de comandos y acciones \xFAtiles"
image: chuleta-atajos-teclado-emacs.png
introduction: "Emacs: Recopilaci\xF3n de comandos y acciones \xFAtiles"
lastmod: 2016-12-06

mainclass: misc
tags:
- emacs
- chuleta
title: "Chuleta De Comandos/Atajos De Teclado/Paquetes m\xE1s \xFAtiles para Emacs"
---

No es la primera vez que se publica en el blog una [chuleta](/tags/chuleta "Artículos sobre chuletas") de algo:

- [Chuleta de comandos para dig](/dig-chuleta-basica-de-comandos/ "Chuleta básica de comandos Dig")
- [Git: Chuleta de comandos](/mini-tutorial-y-chuleta-de-comandos-git/ "Chuleta de comandos para Git")
- [Chuleta de comandos GPG](/chuleta-de-comandos-para-gpg/ "Chuleta de comandos para GPG")
- [Chuleta de comandos MarkDown](/chuleta-markdown-para-wordpress/ "Chuleta de comandos de Markdown")

<!--more--><!--ad-->

La de hoy va sobre _Emacs_. La idea es que esta chuleta la creemos entre todos. Que cada uno aporte su granito de arena para crear la __chuleta de atajos de teclado/comandos/paquetes para emacs definitiva__.

A lo largo del poco tiempo que llevo usando [emacs](/tags/emacs "Artículos sobre emacs"), ya he ido descubriendo los atajos que me resultan más útiles para mi día a día, empecemos:



## Paquetes útiles

### Yasnippet

[YaSnippet](https://www.emacswiki.org/emacs/Yasnippet "Página oficial de YaSnippet" ) es un sistema de plantillas para __emacs__, es uno de los paquetes que recomiendo instalar, ya que te facilita mucho la vida. Por defecto ya trae configurados muchos _snippets_ para todos los lenguajes, pero podemos configurar más a nuestro gusto. Por ejemplo:

Una de las plantillas que tengo para escribir en el blog es:

```bash
# -*- mode: snippet -*-
# name: Modified
# key: mod
# --
lastmod: 2016-$1-$2
```

En los comentarios se especifica el nombre del _snippet_, la palabra que lo lanzará (_mod_) en este caso. Así, al escribir `mod` y pulsar el tabulador se insertará en el editor:

```bash
lastmod: 2016-$1-$2
```

Y con el tabulador me podré ir moviendo a los distintos _$n_ que ahí se ven. Otro ejemplo:

```bash
# -*- mode: snippet -*-
# name: CodeBlock
# key: code
# --
\`\`\`$1
$2
\`\`\`
```

Este otro _snippet_ lo uso para insertar código en _Markdown_, al escribir `code` y pulsar el tabulador, me inserta en el texto las tres tildes ``` con el cursor situado en _$1_ para que escriba el lenguaje en el que resaltará la sintáxis, y al volver a pulsar el tabulador el cursor se posiciona dentro del bloque de código para que comience a escribir.

## Miscelánica / Taréas habituales

### Buscar y reemplazar en varios ficheros

__Problema:__

Queremos buscar por una [expresión regular](/tags/regex "Artículos sobre expresiones regulares") o un texto simple en varios ficheros a la vez, o un directorio completo, y reemplazar el texto encontrado por otro.

__Solución:__

1. Ejecutar `M-x find-name-dired`: e introducir el directorio en el que están los ficheros.
2. Pulsar `t` para “marcar” todos los ficheros del directorio.
3. Pulsar `Q` para ejecutar el comando `query-replace` para todos los ficheros marcados.
4. Una vez escrita la expresión regular, se nos pide confirmación para cada fichero, podemos pulsar `espacio` para reemplazar la expresión en el fichero, `n` para descartarla, o `A` para reemplazar la expresión en todos los ficheros.

__Fuente__: [Using Emacs to recursively find and replace in text files not already open](http://stackoverflow.com/a/271136/1612432 "Using Emacs to recursively find and replace in text files not already open")

### Selección rectangular

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

### Reemplazar un carácter con un salto de línea

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

### Eliminiar los espacios en blanco sobrantes al final de una línea

Basta ejecutar `M-x delete-trailing-whitespace`.

### Guardar comandos que usamos usualmente

Este tema se trató en más profundidad en el artículo [_Cómo crear comandos personalizados en Emacs_](/como-crear-comandos-personalizados-en-emacs "Cómo crear comandos personalizados en Emacs").

### Administar las copias de seguridad de emacs

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

### Ejecutar una acción para todos los buffers abiertos

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

### Alinear verticalmente código en base al signo =

- `M-x align-regex =`

### Convertir texto a mayúscula/minúscula

- `C-x C-u`: Convertir la región seleccionada a mayúsculas.
- `C-x C-l`: Convertir la región seleccionada a minúsculas.
- `M-l`: Convertir la siguiente palabra a minúscula.
- `M-u`: Convertir la siguiente palabra a mayúscula.
- `M-c`: Convertir a mayúscula la primera letra de la palabra -- Capitalizar --.

### Reemplazar tabulador por espacios y viceversa

- `M-x tabify`: Sustituye en la región seleccionada espacios por tabuladores.
- `M-x untabify`: Proceso contrario, reemplaza en la región selecionada tabuladores por espacios.

Fuente: [mdk.fr](https://mdk.fr/blog/emacs-replace-tabs-with-spaces.html "Emacs: replace tabs with spaces")

# Tu Turno

El propósito de este artículo es que crezca con las contribuciones de todos nosotros, para ello he subido el código de este artículo a github. Para aportar vuestro granito de arena, mandad _Pull Requests_ al siguiente _gist_: [Chuleta De Comandos/Atajos De Teclado/Paquetes/ más útiles para Emacs.md](https://gist.github.com/algui91/9be4d82ba09f18562d1cfda2eb325eed "Chuleta De Comandos/Atajos De Teclado/Paquetes/ más útiles para Emacs.md")

Esperamos vuestras colaboraciones!
