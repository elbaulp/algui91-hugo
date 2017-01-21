---
author: alex
categories:
- linux
color: '#2196F3'
date: 2016-06-10 13:59:28
description: "C\xF3mo aplicar una expresi\xF3n regular multil\xEDnea a ficheros"
image: Expresiones-Regulares-Multilinea.png
introduction: "C\xF3mo aplicar una expresi\xF3n regular multil\xEDnea a ficheros"
layout: post.amp
mainclass: linux
tags:
- perl
- regex
- "expresiones multil\xEDnea"
title: "Expresiones Regulares Multil\xEDnea"
---

Actualizando el diseño del blog he tenido que usar muchas [expresiones regulares](/introduccion-a-las-expresiones-regulares-en-python/ "Introducción a las expresiones regulares en python") para ajustar los artículos existentes al _Front Matter_ del nuevo tema. Mientras necesité remplazar únicamente cosas en una única línea pude usar [Atom](/instalar-atom-el-editor-de-github-en-linux/ "Instalar Atom, el editor de GitHub en Linux"). La cosa se complicó cuando quería solucionar el siguiente problema. Imaginemos esta configuración `yalm`:

```yaml
---
param1: valor1
param2: valor2
param3: valor3
param4: valor4
categories:
  - Articulos
  - Android
  - Java
param5: valor5
param6: valor6
param7: valor7
param8: valor8
---
```

<!--more--><!--ad-->

Necesitaba dejarla tal cual, pero añadir un último parámetro llamado `mainclass: Artículos`, es decir, este parámetro debe tener como valor la primera categoría que aparece, en este caso _Artículos_. Para ello decidí usar `perl`:

```perl
perl -i -p0e 's/(categories:\s+-\s+)([a-zA-Z ]+)(\s+-[a-zA-Z ]*)?(.*?)-{3}/$1$2$3$4mainclass: "$2"\n---/s'
```

- `-0` especifica que el separador de línea sea nulo.
- `-p` Que se aplique la expresión especificada por `-e`
- `s/` cambia el comportamiento de `.` para que acepte cualquier caracter, incluso saltos de línea, por tanto se trata el fichero como si se tratara de una única línea.

La expresión regular en sí se define:

- `(categories:\s+-\s+)`: Capturamos

```
categories:
  -
```

- `([a-zA-Z ]+)`: nos captura la primera categoría especificada, junto a la expresión anterior, tenemos:

```
categories:
  - Articulos
```

- `(\s+-[a-zA-Z ]*)?` captura el resto de categorías restantes, por lo que ahora tenemos:

```
categories:
  - Articulos
  - Android
  - Java
```

- `(.*?)-{3}` por último capturamos el resto de texto que queda hasta encontrar el fin del _Front Matter_, los `---`. Así que esta expresión nos ha capturado lo siguiente:

```
categories:
  - Articulos
  - Android
  - Java
param5: valor5
param6: valor6
param7: valor7
param8: valor8
---
```

Ahora queda reescribirla, de eso se ocupa la segunda parte, `$1$2$3$4mainclass: "$2"\n---`. Cada uno de los grupos que hemos capturado anteriormente quedan almacenados para poder usarse luego, se referencian con un $ y un número, el primer grupo tiene asociado el número 1, y por tanto se le referencia con `$1`. De este modo, `$1$2$3$4mainclass: "$2"\n---` nos dejará el fichero tal y como estaba, pero añadiéndole al final otro parámetro:

```
---
param1: valor1
param2: valor2
param3: valor3
param4: valor4
categories:
  - Articulos
  - Android
  - Java
param5: valor5
param6: valor6
param7: valor7
param8: valor8
mainclass: "articulos"
color: "#F57C00"
---
```

### Referencias

How do I replace multiple lines with single word in file(inplace replace)? \| [askubuntu.com](http://askubuntu.com/questions/533221/how-do-i-replace-multiple-lines-with-single-word-in-fileinplace-replace "How do I replace multiple lines with single word in file(inplace replace)?")
