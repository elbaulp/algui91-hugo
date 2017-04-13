---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-04-19 08:48:34
description: "Hace tiempo me encontré con el problema de tener que construir una
  lista de la forma más eficiente posible, sin usar bucles for, ya que era el código
  de una MetaHeurística y debía evaluarse miles de veces. el código original
  era el siguiente"
image: python-lista-de-listas-eficiente.png
lastmod: 2016-08-09

mainclass: dev
modified: null
tags:
- python
- "optimización de código"
- list comprehensions python
- crear lista de listas
- codigo eficiente python
title: Crear Una Lista De Listas De Forma Eficiente en Python
---

> El siguiente artículo es una traducción de una pregunta en **StackOverflow** del usuario <a href="http://stackoverflow.com/users/1612432/algui91" target="_blank" title="Perfil algui91">algui91</a>, que preguntaba <a href="http://stackoverflow.com/questions/23040784/build-a-list-of-list-efficiently-in-python" target="_blank" title="Link a pregunta">Build a List of Lists eficiently in python</a>. La respuesta es del usuario <a href="http://stackoverflow.com/users/1219295/roland-smith" target="_blank" title="Perfil roland">Roland</a>.

<!--more--><!--ad-->

Hace tiempo me encontré con el problema de tener que construir una lista de la forma más [eficiente](/peso-hamming-y-optimizacion/ "Optimizando código y evaluando el rendimiento") posible, sin usar bucles for, ya que era el código de una _MetaHeurística_ y debía evaluarse miles de veces. el código original era el siguiente:

```python
neig = []
for _ in xrange(number):
    r = random.randint(0,self._tam-1)
    s = random.randint(0,self._tam-1)
    neig.append([r,s, self.deltaC(r, s)])
```

Y yo quería eliminar el bucle y hacer la expresión lo más compacta y eficiente posible. Como siempre, en _Stack Overflow_ encontré mi respuesta, usando compresión de listas (_list comprehensions_):

```python
In [1]: import random

In [2]: number = 20

In [3]: tam = 13

In [4]: r = [random.randint(0, tam) for _ in range(number)]

In [5]: s = [random.randint(0, tam) for _ in range(number)]

In [6]: zip(r, s)
Out[6]: [(3, 12), (6, 12), (7, 12), (5, 1), (1, 0), (4, 12), (4, 5), (6, 2), (10, 6), (6, 11), (12, 6), (10, 2), (5, 2), (3, 2), (3, 11), (13, 2), (0, 2), (7, 0), (9, 13), (0, 12)]

In [7]: def deltaC(a, b):
   ...:     return a + b
   ...:

In [8]: neig = [[p, q, deltaC(p, q)] for p, q in zip(r, s)]

In [9]: neig
Out[9]: [[3, 12, 15], [6, 12, 18], [7, 12, 19], [5, 1, 6], [1, 0, 1], [4, 12, 16], [4, 5, 9], [6, 2, 8], [10, 6, 16], [6, 11, 17], [12, 6, 18], [10, 2, 12], [5, 2, 7], [3, 2, 5], [3, 11, 14], [13, 2, 15], [0, 2, 2], [7, 0, 7], [9, 13, 22], [0, 12, 12]]
```

Espero que sirva de ayuda a alguien que busque conseguir algo similar.

# Fuente

- Build a List of Lists eficiently in python \| <a href="http://stackoverflow.com/questions/23040784/build-a-list-of-list-efficiently-in-python" title="Build a List of Lists eficiently in python" target="_blank">stackoverlow.com</a>
