---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-12-12'
lastmod: 2016-07-29
layout: post.amp
mainclass: linux
permalink: /copiar-archivos-recursivamente/
title: Copiar archivos recursivamente
---

Hice un pequeño script que consiste simplemente en dar dos rutas, una origen y otra destino, para copiar todos los archivos mp3 de la ruta origen (con una profundidad máxima de una carpeta), es decir, que si tenemos una carpeta con archivos mp3, y en esa misa carpeta tenemos otra carpeta con archivos mp3, el script tambien copiara los mp3 de la segunda carpeta.

Bueno, despues de dar la ruta origen y la destino, simplemente se crea en la ruta destino una carpeta con el mismo nombre que la carpeta que contiene los mp3, y los copia.

Hice este script porque tengo un usb para la música que escucho en el coche, y tambien tengo mucha musica, asi que decidi borrar el usb y volver a meter la música, pero no tanta como tenia anteriormente. Pero resulta que la radio de mi coche, no lee en el usb nada que tenga una profundidad de mas de 1 carpeta, es decir, en la raiz del usb, puedo tener carpetas, pero éstas no pueden tener más carpetas, deben tener tan solo archivos de música, y digo solo archivos de musica porque como exista una imagen u otra cosa&nbsp; dentro de la carpeta, no me reproduce la musica.

Cuento esto, para explicaros de donde surgió la idea de crear este script. Ya que que en mi PC tengo la musica ordenada por tipo (RAP, ELECTRO etc), Artistas, dentro de Artistas, los discos de éste, y, dentro de cada disco, la musica, y imagenes de la caratula y demas, en el usb no podia copiar simplemente todo esto .

Como no tenia ganas de andar pinchando en cada carpeta, seleccionar solo los mp3s, y crear en el usb la carpeta con el nombre del artista, cree el script, que hace todo ese trabajo por mi.

El unico requisito es que tengais instalado zenity (que casi siempre vien por defecto instalado), y, por supuesto, un So GNU/linux.

Aqui os dejo el codigo:

```bash
#!/bin/bash
IFS='
'
DIR=`zenity --file-selection --directory --title="Selecciona los archivos a copiar"`

case $? in
  0)
    DES=`zenity --file-selection --directory --title="Selecciona destino"`
    case $? in
    0)
      echo "Ruta destino "$DES" seleccionado."
      echo "Ruta origen "$DIR" seleccionado."
      datos=$(ls -p "$DIR")
      echo "--------------------"
      nuevaCarpeta=$(echo "$DIR" | sed -n 's//.*///gp') # Me quedo solo con el nombre de la carpeta destino
      cd "$DES"
      mkdir "$nuevaCarpeta"
      cd "$nuevaCarpeta"
      cp -v "$DIR"/*.mp3 "$DES/$nuevaCarpeta" #Copio lo que hay en la raiz de esa carpeta
      for carpeta in $datos
      do
        if [ -d "$DIR/$carpeta" ] ; then
          cd "$DIR/$carpeta"
          cp -v *.mp3 "$DES/$nuevaCarpeta"
        fi
      done
      ;;
    *)
      echo "no selecciono nada.";;
      esac
    ;; # Fin del case 0) principal
  *)
    echo "No selecciono nada.";;
    esac
IFS=' '
```

Podéis hacer todas las preguntas que querais si no entendeis algo, y no repareis en criticarlo, si creeis que algo esta mal, o podria mejorarse.

Saludos, y espero que os sirva de algo.