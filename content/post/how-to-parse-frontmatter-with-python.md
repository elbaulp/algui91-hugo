+++
description = "Cómo parsear y modificar el contenido del frontmatter con python-frontmatter"
tags = ["python", "frontmatter"]
categories = ["dev", "python"]
image = "Learn-how-to-parse-and-modify-frontmatter-content-with-Python-Frontmatter.png"
mainclass = "dev"
author = "alex"
date = "2017-01-26"
title = "Cómo parsear el frontmatter con Python"
+++

Hace poco he migrado el blog de _Jekyll_ a _Hugo_. El proceso ha sido fácil, pero he tenido que cambiar varias cosas en el _frontmatter_ de los artículos.

Tras buscar en Google encontré un [parseador](https://elbauldelprogramador.com/tags/parser/ "") en [python](https://elbauldelprogramador.com/tags/python "Artículos sobre python") para _frontmatter_ escritos en _YAML_. A continuación se explica cómo instalarlo y usarlo.

# Instalar Python-Frontmatter

Basta con ejecutar

```bash
sudo pip install python-frontmatter
```

<!--more--><!--ad-->

# Usar Python-Frontmatter

## Ejemplo 1: Añadir un nuevo valor al FrontMatter

Una vez instalado, es bastante sencillo de usar. Supongamos que queremos añadir una variable que almacene el autor del artículo, para ello bastaría el siguiente código:

```python
import frontmatter
import io
from os.path import basename, splitext
import glob

# Ruta a los ficheros
path = "en/*.markdown"

# Iterar sobre ellos
for fname in glob.glob(path):
    with io.open(fname, 'r') as f:
        # Parsear los ficheros
        post = frontmatter.load(f)
        if post.get('author') == None:
            post['author'] = "alex"
            # Guardar el fichero modificado
            newfile = io.open(fname, 'w', encoding='utf8')
            frontmatter.dump(post, newfile)
            newfile.close()
```

Eso es todo, así de simple. Veamos un ejemplo algo más complejo.

## Ejemplo 2: Modificar variables existentes en el FrontMatter

En este caso, supongamos dos variables, `mainclass` y `categories`. Queremos incluir el valor de `mainclass` a los valores existentes en `categories`, y a la vez mantener los valores actuales en `categories`.

```python
for fname in glob.glob(path):
    with io.open(fname, 'r') as f:
        post = frontmatter.load(f)

        # Si no exite la variable categories, crearla con el valor de mainclass
        if post.get('categories') == None:
            post['categories'] = [post['mainclass']]
            print(post['categories'])
        else: # Categories existe
            cat = post['categories']
            main = post['mainclass']
            # Si categories contiene un solo valor ej: categories: 'category1'
            if type(cat) == str:
                if cat.lower() != main:
                    cat = [cat, main]
            else: # Si categories es una lista ej: categories: [cat1, cat2]
                cat = [s.lower() for s in cat]
                if main in cat == False:
                    cat.append(main)

            post['categories'] = cat
            print("%s") % (post['categories'])

        # Guardar los cambios
        newfile = io.open(fname, 'w', encoding='utf8')
        frontmatter.dump(post, newfile)
        newfile.close()
```

# Referencias

- <a href="https://github.com/eyeseast/python-frontmatter" target="_blank" title="Python fronmatter repo">Repositorio Python-Frontmatter en github</a>.
