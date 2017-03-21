---
author: alex
categories:
- how to
date: '2016-01-01'
lastmod: 2017-03-21T16:46:40+01:00
description: "Existe un comando que realiza esta operaci\xF3n, `rev`. De acuerdo a  la descripci\xF3n que proporciona la documentaci\xF3n funciona de la siguiente manera"
mainclass: linux
url: /como-invertir-una-cadena-en-unix/
tags:
- invertir cadena
- bash
title: "C\xF3mo invertir una cadena en Unix"
---

Existe un comando que realiza esta operación, `rev`. De acuerdo a la descripción que proporciona la documentación funciona de la siguiente manera:

> Copia los archivos especificados a la salida estandar, invirtiendo el orden de los caracteres de cada línea. Si no se especifican ficheros, rev lee de la entrada estandar (el teclado).

Algunos ejemplos:

<!--more--><!--ad-->

```bash
echo "elbauldelprogramador" | rev

```

Dará el siguiente resultado:

```bash
rodamargorpledluable

```

Es posible usar la siguiente sintaxis:

```bash
rev<<<"Esta línea es una prueba"

```

Salida:

```bash
abeurp anu se aeníl atsE

```

# Ejemplo en Perl

```bash
perl -ne 'chomp;print scalar reverse . "n";'<<<"elbauldelprogramador"

```

Ó

```bash
echo 'elbauldelprogramador' | perl -ne 'chomp;print scalar reverse . "n";'

```

# Script bash para invertir cadenas

```bash
#!/bin/bash
input="$1"
reverse=""

len=${#input}
for (( i=$len-1; i>=0; i-- ))
do
   reverse="$reverse${input:$i:1}"
done

echo "$reverse"

```

Para ejecutarlo escribimos lo siguiente en la terminal:

```bash
./script elbauldelprogramador

```

> En los comentarios de la fuente original en nixcraft (enlace al final de la entrada) un lector escribió dos ejemplos más, en [python][2] y [PHP][3]:

Ejemplo en python:

```bash
echo foo | python -c 'import sys;print(sys.stdin.read().strip()[::-1])'
python -c 'import sys;print(sys.stdin.read().strip()[::-1])' <<< foo

```

Ejemplo en PHP:

```bash
echo foo | php -r 'print strrev(trim(fgets(STDIN)));'
php -r 'print strrev(trim(fgets(STDIN)));' <<< foo

```

* * *

# Fuente original

- *NixCraft* »» <a href="http://www.cyberciti.biz/faq/how-to-reverse-string-in-unix-shell-script/" target="_blank">Visitar sitio</a>

 [2]: https://elbauldelprogramador.com/python/
 [3]: https://elbauldelprogramador.com/php/
