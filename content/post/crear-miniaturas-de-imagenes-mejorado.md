---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-09-25'
lastmod: 2016-07-31
layout: post.amp
mainclass: linux
permalink: /crear-miniaturas-de-imagenes-mejorado/
tags:
- crear miniaturas de imagenes
title: "Crear miniaturas de im\xE1genes [Mejorado]"
---

He mejorado el [script que subí hace unos días][1] para crear miniaturas de [imágenes](/como-anadir-automaticamente-el-tamao-de-una-imagen-en-html-con-python/ "Añadir automáticamente el tamaño de una imagen con python"), y ahora se puede ejecutar desde cualquier lugar sin necesidad de copiar el script en la carpeta de las imágenes de las que queremos hacer miniaturas. Además, podemos seleccionar solo las imágenes que deseemos, o todas.

<!--more--><!--ad-->

```bash
#!/bin/bash

if [ -e /usr/bin/convert ] ; then #Compruebo que el programa imagemagick esta insatado
 dir=`zenity --file-selection --directory --title="Selecciona el directorio de las imágenes"`
  case $? in
     0)
       echo -n "¿Quiere hacer miniaturas de todas las imágenes del directorio? s/n: " ; read respuesta
       if [ $respuesta == "S" ] || [ $respuesta == "s" ] ; then # Compruebo la respuesta del usuario
        imagenes=$(ls $dir) # almaceno todos los archivos de la carpeta seleccionada
        mkdir $dir/miniaturas
      for i in $imagenes
     do
      if [ -e $dir/$i ] ; then
       i=$(basename "$i")
       echo "Procesando imagen $i ..."
       /usr/bin/convert -thumbnail 180x128 $dir/$i $dir/miniaturas/$i
      fi
     done
     echo "Miniaturas creadas."
    else
     img=`zenity --filename=$dir/ --file-selection --multiple --separator=" " --title="Selecciona la imagenes"`
     case $? in
      0)
       mkdir $dir/miniaturas
       for i in $img
       do
         i=$(basename "$i")
        echo "Procesando imagen $i ..."
        /usr/bin/convert -thumbnail 180x128 $dir/$i $dir/miniaturas/$i
       done
       echo "Miniaturas creadas."
       ;;
     esac
       fi
       ;;
      1)
        echo "No seleccionó nada";;
     -1)
        echo "Ocurrió un error";;
    esac
else
 echo "Imagemagick no esta instalado, puede instalarlo haciendo 'sudo aptitude install imagemagick'"
fi
```

 [1]: https://elbauldelprogramador.com/crear-imagenes-en-miniaturas/