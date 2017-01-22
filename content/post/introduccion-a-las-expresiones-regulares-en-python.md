---
author: alex
categories:
- python
color: '#E64A19'
date: '2016-12-12'
if_seo_keywords:
- re python, regexp python, expresiones regulares python
- re python, regexp python, expresiones regulares python
if_slider_image:
- null
- null
layout: post.amp
mainclass: dev
permalink: /introduccion-a-las-expresiones-regulares-en-python/
sif_eo_description:
- Tutorial sobre expresiones regulares en python
- Tutorial sobre expresiones regulares en python
tags:
- ejemplos de expresiones regulares
- expresiones regulares
- probar expresiones regulares
- python
- regexp
title: "Introducci\xF3n a las expresiones regulares en python"
---

En esta entrada voy a intentar introducir brevemente cómo crear expresiones regulares en python (dentro de la complejidad de las mismas).

Son recopilaciones que he hecho durante el curso de *Programming languages *[en udacity][1] y voy a intentar explicarlos lo más claramente posible.

Lo primero que hay que hacer para usar expresiones regulares es importar el módulo **re **de python con ***import re***

Una vez hecho esto, podemos empezar a usar expresiones, como por ejemplo esta:
<!--more--><!--ad-->

```python
regex = r'[a-z]+-?[a-z]+'
```

La expresión de arriba considerará válida cualquier cadena que empieze con una o más letras (*[a-z]+*), seguido de un guión, que es opcional, es decir, puede aparecer o no en la cadena (*-?*) seguido nuevamente de uno o más caracteres de la **a **a la **z**, en minúsculas.

Algunos casos de ejemplo son los siguientes:

```python
# Ejemplos válidos:
print re.findall(regexp,"well-liked") == ["well-liked"]
#>>> True
print re.findall(regexp,"html") == ["html"]
#>>> True
# Ejemplos no válidos:
print re.findall(regexp,"a-b-c") != ["a-b-c"]
#>>> True
print re.findall(regexp,"a--b") != ["a--b"]
#>>> True
```

La primera expresión de los ejemplos no válidos no es correcta ya que el segundo guión no es esperado por la expresión regular, en el segundo ejemplo, ocurre lo mismo.

El siguiente ejemplo servirá para coincidir con cadenas que representen funciones matemáticas de un solo parámetro:

```python
regexp = r"[a-z]+( *[0-9]+ *)"
```

Esto encontrará cadenas que empiecen con una o más letras (*[a-z]+*)*, *tenemos que escapar los paréntesis para que los tome como algo que queremos que forme parte de la cadena, ya que los paréntesis tienen un significado especial en la expresiones regulares, los escapamos con , despues buscamos por cero o más espácios ( *) seguidos de números (*[0-9]+*) y nuevamente cero o más espacios.

Ejemplos:

```python
# Ejemplos válidos
print re.findall(regexp,"cos(0)") == ["cos(0)"]
#>>> True
print re.findall(regexp,"sqrt(   2     )") == ["sqrt(   2     )"]
#>>> True
# Ejemplos no válidos
print re.findall(regexp,"cos     (0)") != ["cos     (0)"]
#>>> True
print re.findall(regexp,"sqrt(x)") != ["sqrt(x)"]
#>>> True

```

Como vemos, el primer ejemplo no válido precisamente no es válido porque no permitimos espacios entre el nombre de la función y los paréntesis. El segundo es erróneo porque el parámetro es una letra en lugar de un número.

Veamos otro más, esta vez queremos encontrar cadenas que contengan caracteres de escape () y comillas

```python
regexp = r'"(?:[^\]|(?:\.))*"'

```

En este caso voy a ir explicando de fuera hacia adentro, en primer lugar vamos a buscar cadenas que estén entrecomilladas (*r&#8217;""&#8217;*), lo que encontremos, lo vamos a encontrar cero o más veces (*r'&#8221;(?:)*&#8221;&#8216;*), **(?:)** coincide con la expresión regular que contenga entre los paréntesis. A continuación queremos cualquier cosa que **no** sea un , y nótese que debemos escaparlo (*r'&#8221;(?:[^\])*&#8221;&#8216;*) **ó (*|*)** un seguido de cualquier caracter
(*r'&#8221;(?:[^\]|(?:\.))*&#8221;&#8216;*)

Ejemplos:

```python
regexp = r'"(?:[^\]|(?:\.))*"'
#  Ejemplos válidos:
print re.findall(regexp,'"I say, \"hello.\""') == ['"I say, \"hello.\""']
#>>> True
#  Ejemplos no válidos:
print re.findall(regexp,'"\"') != ['"\"']
#>>> True

```

Por último una expresión regular que coincidirá con todas las cadenas que estén entre dobles comillas:

```python
regexp = r'"[^"]*"'

```

Con esta expresión buscamos cadenas que empiecen y acaben obligatóriamente con **&#8220;** (*r'&#8221;&#8221;&#8216;*), no pueden contener ningún caracter **&#8220;** entre la cadena (*r'&#8221;[^&#8221;]&#8221;&#8216;*), finalmente, daremos por buena la cadena que cumpla esto con cualquier caracter cero o más veces (*r'&#8221;[^&#8221;]*&#8221;&#8216;*)

Ejemplos:

```python
#  Ejemplos  válidos:
print re.findall(regexp,'"cuneiform"')
print re.findall(regexp,'"sumerian writing"')
print re.findall(regexp,'""')
#  Ejemplos no válidos
print re.findall(regexp,'"esc " ape"')

```



 [1]: https://elbauldelprogramador.com/nuevos-cursos-disponibles-en-udacity-la-universidad-online-gratuita/ "Nuevos Cursos disponibles en Udacity, la universidad online gratuita"