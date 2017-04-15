---
author: alex
categories:
- latex
color: '#B31917'
date: 2015-11-19 09:20:00
description: "Si trabajas habitualmente con LaTeX, estás acostumbrado a ver múltiples
  ficheros generados automáticamente al compilar el proyecto. Pueden llegar a molestar
  bastante, ya que ensucian el directorio de trabajo. Hoy explicaré dos alternativas
  para mover todos esos ficheros a un directorio separado para mantener un directorio
  de trabaja limpio."
image: 2013/05/latex_logo.png
lastmod: 2016-11-06

mainclass: latex
tags:
- latex
- latexmk
- metafiles latex
- metaficheros latex
title: Ocultar Los Metaficheros De LaTeX Del Directorio De Trabajo
---

Si trabajas habitualmente con [LaTeX](https://elbauldelprogramador.com/category/latex/ "Tutoriales sobre LaTeX"), estás acostumbrado a ver múltiples ficheros generados automáticamente al compilar el proyecto. Pueden llegar a molestar bastante, ya que ensucian el directorio de trabajo. Hoy explicaré dos alternativas para mover todos esos ficheros a un directorio separado para mantener un directorio de trabaja limpio.



## Estructura del directorio

<!--more--><!--ad-->

La idea sería tener el directorio de trabajo organizado del siguiente modo:

```bash
Directorio del proyecto/
|__ main.tex
|__ main.bib
|__ main.pdf
|__ chapter1.tex
|__ chapter2.tex
|__ …
|__ metafiles/
|     |__ main.aux
|     |__ main.bcf
|     |__ main.blg
|     |__ main.glo
|     |__ main.ist
|     |__ main.log
|     |__ main.toc
|     |__ …
|__ figures/
     |__ figure1.pdf
     |__ …

```

## Mediante un script

Este script lo encontré en el blog de <a href="http://texblog.org" target="_blank" title="TexBlog">Tom</a>, en su artículo <a href="http://texblog.org/2015/08/20/hiding-latex-metafiles-from-project-directory/" target="_blank" title="Hiding LaTeX metafiles from project directory">Hiding LaTeX metafiles from project directory</a>:

```bash
#!/bin/bash

# Create directory if it doesn't exist
if [ ! -d "metafiles" ]; then
  mkdir metafiles
fi

# Run pdflatex and biber with metafiles as in-/output directories
pdflatex -output-directory=metafiles main
biber --input-directory=metafiles --output-directory=metafiles main
pdflatex -output-directory=metafiles main
pdflatex -output-directory=metafiles main
makeglossaries -d metafiles main
pdflatex -output-directory=metafiles main

# Create a softlink to the output PDF
ln -s metafiles/main.pdf
```

## Usando latexmk

Para aportar algo al artículo de _Tom_, miré la documentación de LatexMK, [comando que ya hemos visto en este blog](https://elbauldelprogramador.com/compilar-automaticamente-ficheros-en-latex-mientras-los-modificamos/ "Compilar Automáticamente Ficheros en LaTeX Mientras Los Modificamos"), y tiene la opción `-output-directory` que permite especificar donde se guardaran todos los metaficheros, su uso es simple:

```bash
latexmk -shell-escape -pdf -pvc -output-directory=metafiles main.tex
```

Esto tendrá un efecto parecido al script de _Tom_, sin embargo el pdf también queda generado dentro de esta carpeta, podemos solucionarlo con un _soft link_:

```bash
ln -s metafiles/main.pdf
```

Espero que os haya sido de utilidad, yo ya lo uso de forma habitual.
