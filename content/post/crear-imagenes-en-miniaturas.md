---
author: alex
categories:
- script
date: '2016-01-01'
lastmod: 2017-04-02T19:28:47+01:00
mainclass: dev
url: /crear-imagenes-en-miniaturas/
title: "Crear miniaturas de imágenes"
---

> Creé una Versión mejorada de este script [aquí][1]

Este script es muy simple, pero resulta muy útil cuando tenemos muchas imágenes y queremos hacer miniaturas, por ejemplo, para subirlas a nuestra web.

<!--more--><!--ad-->

Nota: Si tenéis una web, os aconsejo que creeis miniaturas para las imágenes que son enlaces por ejemplo, [no useis las propiedades](/como-anadir-automaticamente-el-tamao-de-una-imagen-en-html-con-python/ "Añadir automáticamente el tamaño de una imagen con python") *height* y *width* de la etiqueta *img* para redimensionar una imagen grande, porque vuestra página tardará más en cargar, y además esa miniatura pesará lo mismo que la original.

Para ejecutar el script, hay que instalar imagemagick:

```bash
#!/bin/bash
FILES="$@"
mkdir miniaturas
for i in $FILES
do
 echo "Processing image $i ..."
 /usr/bin/convert -thumbnail 180x128 $i miniaturas/$i
done
```

Básicamente el script crea una carpeta que contendrá las miniaturas, y procesa las imagenes que le pasémos como parámetros al script, copiándolas a la carpeta creada. Para modificar el tamaño de las miniaturas, hay que cambiar *128&#215;128* por el valor que queramos.

Nota: El script hay que copiarlo en el directorio donde se encuentren las imágenes, en cuanto pueda lo modificaré para resolver esta deficiencia.

Ejemplo de uso

```bash
$ cd Directorio/de/nuestras/imagenes
$ ./NombreDelScript *
```

El * significa que convertirá todas las imagenes del directorio

 [1]: https://elbauldelprogramador.com/crear-miniaturas-de-imagenes-mejorado/
