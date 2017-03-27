---
author: alex
categories:
- latex
date: 2015-06-25 16:50:48
lastmod: 2017-03-27T17:03:02+01:00
description: "Para los que est\xE9is acostumbrados a escribir vuestros documentos  en LaTeX, sin ning\xFAn editor espec\xEDfico, sabr\xE9is que llega a ser un poco  tedioso compilar cada vez que queremos ver el resultado. Hace poco, descubr\xED  un comando, latexmk, que nos facilitar\xE1 bastante la vida."
image: 2013/05/latex_logo.png
mainclass: latex
tags:
- latex
- latexmk
- pdflatex
- xelatex
- compilar latex
- minted
title: "Compilar Autom\xE1ticamente Ficheros en LaTeX Mientras Los Modificamos"
---

Para los que estéis acostumbrados a escribir vuestros documentos en LaTeX, sin ningún editor específico, sabréis que llega a ser un poco tedioso compilar cada vez que queremos ver el resultado. Hace poco, descubrí un comando, `latexmk`, que nos facilitará bastante la vida.

Si estás interesado en aprender a usar LaTeX echa un vistazo al [mini curso que tenemos](/mini-curso-de-latex-introduccion/ "Mini curso de Latex - introducción").

<!--more--><!--ad-->

# Cómo usar latexmk

El comando `latexmk` tiene muchas opciones, pero  en mi caso particular, no he necesitado más que estas (La opción `-shell-escape` la uso porque normalmente utilizo el paquete [minted](/resaltar-sintaxis-del-codigo-fuente-en-latex-con-minted/ "Resaltar sintaxis del código fuente en LaTeX con minted") para colorear la sintáxis del código):

## Para pdflatex
```bash

$ latexmk -shell-escape -pdf -pvc

```

## Para xelatex
```bash

$ latexmk -shell-escape -xelatex -pdf -pvc

```

El comando asume que en el directorio donde se ejecuta solo exite un fichero `.tex`, de no ser así, deberemos pasarle el nombre del fichero que debe observar para detectar cambios.

Una vez en ejecución, veremos en la consola algo así:

```bash

=== Watching for updated files. Use ctrl/C to stop ...

```

A partir de ahora, cada vez que se modifique el fichero, se compilará y podremos ver el resultado.

# Creando alias para los comandos

Ya que el comando es un poco largo, es recomendable crearse un alias para poder ejecutar `latexmk` escribiendo únicamente una palabra:

```bash

alias mlatexmk='latexmk -shell-escape -pdf -pvc ; latexmk -C'
alias mlatexmkx='latexmk -shell-escape -xelatex -pdf -pvc ; latexmk -C'

```

`latexmk -C` eliminará todos los ficheros intermedios. Ahora, para ejecutar basta con escribir:

```bash

$ mlatexmk # Para compilar con pdflatex
$ mlatexmkx # Para compilar con xelatex

```
