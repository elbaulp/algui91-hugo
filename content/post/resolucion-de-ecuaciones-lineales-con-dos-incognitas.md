---
author: alex
categories:
- algoritmos
- python
date: '2016-01-01'
lastmod: 2017-09-20T18:21:07+01:00
description: "Una ecuación no es más que una igualdad en la que hay cantidades  desconocidas llamadas incógnitas. Las soluciones son los valores que tienen las  incógnitas cuando satisfacen la igualdad. Un sistema de ecuaciones es la reunión  de 2 o mas ecuaciones con 2 o más incógnitas. Así:"
mainclass: dev
math: true
url: /como-resolver-sistemas-de-ecuaciones-lineales-con-dos-incognitas/
tags:
- ecuaciones lineales
- resolver ecuaciones python
title: "Cómo resolver sistemas de ecuaciones lineales con dos incógnitas en Python"
---

> El siguiente artículo es una colaboración de <a href="http://dealgebra.blogspot.mx/" title="Visitar blog" target="_blank">Rogelio González</a>, al que agradezco su interés por colaborar en este blog.

Una ecuación no es más que una igualdad en la que hay cantidades desconocidas llamadas incógnitas. Las soluciones son los valores que tienen las incógnitas cuando satisfacen la igualdad. Un sistema de ecuaciones es la reunión de 2 o mas ecuaciones con 2 o más incógnitas. Así:

<!--more--><!--ad-->

$$x+y=3$$
$$2x+3y=3$$

Es un sistema de ecuaciones cuyas soluciones son \\(x=6, y=-3\\). Los sistemas de ecuaciones tienen aplicaciones en todas las ciencias entonces es útil tener un algoritmo que las resuelva y comprender qué es lo que hace. Normalmente utilizaríamos algo de algebra lineal para resolverlo pero hoy vamos a hacerlo de otro modo.

# Tipos de sistemas de ecuaciones

Aunque de manera intuitiva nos puede parecer que todo sistema tiene soluciones únicas esto no es así. El sistema pueder tener soluciones unicas como el primer ejemplo,infinitas soluciones o no tener solución. ¿Qué hace distinto un sistema de otro? o en otras palabras ¿Qué método tenemos que nos diga que sistema es?

# Determinantes

El **determinante** de nuestro sistema es el que nos dirá qué tipo de sistema es. El determinante del sistema:

$$ax+by=c$$
$$dx+ey=f$$

Viene dado por \\(ae-bd\\), en el primer ejemplo el determinante es **1** pues \\(1\cdot 3-1\cdot 2=1\\).En general si el determinante (\\(D\\)) es distinto de cero tenemos soluciones únicas, si el determinante es cero entonces o hay infinitas soluciones o no hay ninguna. En &#8220;el caso fácil&#8221; cuando \\(D\neq 0\\) las soluciones están dadas por:

$$x=\frac{ec-bf}{ae-bd}$$
$$y=\frac{af-dc}{ae-bd}$$

Ahora &#8220;el caso difícil&#8221; cuando \\(D=0\\) ¿Cómo saber si el sistema tiene infinitas soluciones o ninguna? Pongamos atención en los siguientes sistemas:

$$x+y=3$$
$$2x+2y=6$$

$$x+y=3$$
$$2x+2y=5$$

En el primer sistema es fácil ver que la segunda ecuación es solo la primera multiplicada por 2 y es coherente el resultado. Sin embargo en el segundo sistema el lado izquierdo de la igualdad nos dice de nuevo que la segunda ecuación es solo la primera multiplicada por 2 pero el lado derecho no puede ser cierto pues el doble de 3 no es 5. Entonces decimos que el primer sistema tiene soluciones infinitas pues las soluciones de la primera ecuación siempre cumplen la segunda pues básicamente es la misma ecuación. El segundo sistema no tiene soluciones y podemos verlo en el absurdo de que el doble de 3 es 5. Podemos decir pues que en un sistema con \\(D=0\\) lo importante es ver por qué número debemos multiplicar la primera ecuación para obtener la segunda y la parte derecha de las ecuaciones nos dirán si es coherente o no, en otras palabras si tiene infinitas soluciones o ninguna.

# Ideas llevadas a Python

&#8220;El caso difícil&#8221; lo podemos resolver sabiendo cuál es el número por el que tengo que multiplicar la primera ecuación para obtener la segunda, podríamos hacer `m = d / a` donde **m** sería nuestro &#8220;número&#8221;y después ver si `m * c = f` :

```python
from sys import argv
script, a, b, c, d, e, f = argv

a = float(a)
b = float(b)
c = float(c)
d = float(d)
e = float(e)
f = float(f)

m = d / a

if m * c == f :
    print "El sistema tiene infinitas soluciones"
else:
    print "El sistema no tiene soluciones"


```

Uniendo &#8220;el caso difícil&#8221; con &#8220;el caso fácil&#8221; tenemos el código completo del algoritmo, tendremos que verificar antes que a,b,d,e no sean todos cero pues entonces no sería un sistema de ecuaciones, salvando esto podemos usar el algoritmo:

```python
from sys import argv
script, a, b, c, d, e, f = argv

a = float(a)
b = float(b)
c = float(c)
d = float(d)
e = float(e)
f = float(f)

det = a * e - b * d

if det != 0 :
    x = (e * c - b * f) / det
    y = (a * f - d * c) / det

    print "La solucion al sistema es x= %d e y= %d" % (x, y)

else :
    m = d / a

    if m * c == f :
        print "El sistema tiene infinitas soluciones"
    else:
        print "El sistema no tiene soluciones"


```

# Conclusion

¿Por qué tantas matemáticas y poco código? Creo que todos lo sabemos: la idea que soporta el código es lo interesante y no solo lo interesante *es* lo importante. No todo programador es matemático (no es necesario serlo) pero es una gran ventaja tener esa &#8220;intuición&#8221; que nos dan las matemáticas.
