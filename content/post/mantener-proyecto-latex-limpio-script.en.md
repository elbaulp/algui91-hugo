+++
title = "Keep your LaTeX project clean with this simple script"
date = "2017-08-09T17:45:16+02:00"
author = "colaboraciones"
mainclass = "latex"
categories = ["LaTeX"]
tags = ["tutorials"]
description = "Automatically clean LaTeX temp files and show the updated PDF"
url = "/en/keep-latex-project-clean"
+++

> This post is a collaboration by <a href="http://Github.com/lulivi" target="_blank" title="Luis Liñan">Luis Liñan</a>, <a href="https://t.me/lulivi" target="_blank" title="@lulivi">@lulivi</a>.

Today we are going to use a simple shell script to autoupdate the pdf preview of our latex files. Then, it will bring the pdf from the metafiles directory to our project directory, keeping it clean from auxiliar files.

# Directory structure

Working with the same structure as [other article from the blog](https://elbauldelprogramador.com/ocultar-los-metaficheros-de-latex-del-directorio-de-trabajo/) we will have what follows:

```
.
|-- figures
|   |-- figure_1.pdf
|   `-- ...
|-- main.pdf
|-- main.tex
|-- ref.bib
|-- style.sty
`-- metafiles
    |-- main.aux
    |-- main.bbl
    |-- main.blg
    |-- main.fdb_latexmk
    |-- main.fls
    |-- main.lof
    |-- main.log
    |-- main.lot
    |-- main.out
    |-- main.pdf
    `-- main.toc
```

# Script execution

```bash
#!/bin/bash

# Help function
function help {
  echo "$0 <metafiles_directory>"
}

# Check correct execution of the script
if [ "$#" -ne 1 ]; then
  help
  exit 1
fi

# Create directory if it doesn't exist
if [ ! -d $1 ]; then
  mkdir $1
fi

# Copy the pdf from the temporal directory to the parent directory
function listen_pdf_update {
  pdf_substring='(.*[.]pdf.*)'
  while true; do
    change=$(inotifywait -e close_write $1)
    if [[ $change =~ $pdf_substring ]]; then
      cp $1/*.pdf ./
      echo "============> iNotify <============"
      echo "==>   Updated parent pdf file   <=="
      echo "==================================="
    fi
  done
}

# Set up listener for the target PDF file
listen_pdf_update $1 &

# Set up latex listener for changes in the directory
latexmk -shell-escape -silent -bibtex -view=pdf -xelatex -pdf -pvc -output-directory=$1

# Kill all processes created in this script
kill -9 -$$
```

<!--more--><!--ad-->

The only thing we have to do is execute the script with the metafiles directory as an argument:

```bash
$ /PATH/TO/SCRIPT/updatePdfLatex.sh <metafiles_directory>
```

> Check the [script repository](https://github.com/lulivi/Latex-PDF-auto-updater) out for more information.

# References

- <a href="https://elbauldelprogramador.com/compilar-automaticamente-ficheros-en-latex-mientras-los-modificamos" target="_blank" title="Compilar automáticamente ficheros en latex mientras los modificamos">Compilar automáticamente ficheros en latex mientras los modificamos</a>
- <a href="https://elbauldelprogramador.com/ejecutar-un-script-al-modificar-un-fichero-con-inotify" target="_blank" title="Ejecutar un script al modificar un fichero con inotify">Ejecutar un script al modificar un fichero con inotify</a>
- <a href="https://www.mankier.com/1/latexmk" target="_blank" title="Latexmk man page">Latexmk man page</a>
