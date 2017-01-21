---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-06-30 10:59:47
description: "Peque\xF1o script en python para a\xF1adir el tama\xF1o a una etiqueta
  img"
image: ComoAnadirAutomaticamenteElTamanoDeUnaImagenenHTMLConPython.png
introduction: "Peque\xF1o script en python para a\xF1adir el tama\xF1o a una etiqueta
  img"
layout: post.amp
mainclass: dev
tags:
- python
- BeautifulSoup
- parser
- ejemplos BeautifulSoup
- leer imagen python
- "leer tama\xF1o imagen python"
- "obtener tama\xF1o imagen python"
title: "C\xF3mo A\xF1adir Autom\xE1ticamente El Tama\xF1o De Una Imagen en HTML Con
  Python"
---

Hace poco me encontré con el problema de añadir a todas las etiquetas de imágenes del blog los atributos de tamaño (Altura y anchura). Hacerlo a mano era inviable debido a la cantidad de artículos. Así que pensé que una buena forma sería hacerlo con python. El razonamiento es el siguiente:

- Iterar sobre todos los artículos del blog.
- Buscar en cada artículo todas las etiquetas `img`.
- Acceder a la ruta donde se encuentra la imagen (El atributo `src`).
- Leer la imagen y extraer su tamaño.
- Escribir el tamaño de la imagen en los atributos `width` y `height` de la imagen.

<!--more--><!--ad-->

Para llevar a cabo la tarea he usado el módulo `BeautifulSoup`. A continuación se muestra el código comentado:

```python
#!/bin/python

from BeautifulSoup import BeautifulSoup
from os.path import basename, splitext
from PIL import Image
import glob

# Ruta a la carpeta que contiene los ficheros, en este caso
# cualquier fichero markdown
path = "/ruta/ficheros/*.md"

# Iteramos para cada fichero
for fname in glob.glob(path):
    # Lo abrimos
    f = open(fname)
    # Creamos un objeto BeautifulSoup para parsear el fichero
    soup = BeautifulSoup(f)
    f.close()

    # Para cada etiqueta de imagen que encontremos en el fichero
    for img in soup.findAll('img'):
        if img != None:
            try:
                if img['src'].startswith("/assets") == True:
                    # Abrimos la imagen
                    pil = Image.open("/ruta/carpeta/imagenes" + img['src'])
                    # Obtenemos su tamaño
                    width, height = pil.size
                    # Modificamos la etiqueta HTML para añadirle el tamaño
                    img['width'] = str(width) + "px"
                    img['height'] = str(height) + "px"
            except KeyError:
                pass

    # Guardamos el fichero modificado
    with open(fname, "wb") as file:
        file.write(str(soup))
```

Espero que os resulte útil, he subido el script a [github](https://gist.github.com/algui91/188a7f9d24e586cb16d9ed9188aa5823 "Gist en github").

### Referencias

- How to save back changes made to a HTML file using BeautifulSoup in Python? \| [stackoverflow.com](http://stackoverflow.com/a/14369600/1612432 "How to save back changes made to a HTML file using BeautifulSoup in Python?")
- Replace SRC of all IMG elements using Parser \| [stackoverflow.com](http://stackoverflow.com/a/1579733/1612432 "Replace SRC of all IMG elements using Parser")
