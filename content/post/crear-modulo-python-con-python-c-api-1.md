---
author: alex
categories:
- c
- python
color: '#E64A19'
date: '2016-12-12'
description: "En esta serie de 5 art\xEDculos, veremos c\xF3mo crear desde cero un
  m\xF3dulo que podamos importar en nuestra aplicaci\xF3n *python*. Al finalizar,
  tendremos creado un m\xF3dulo llamado **herramientasRed** con el que podremos obtener
  la direcci\xF3n ip de un dominio, al igual que hicimos en el art\xEDculo NDK-gdb
  \u2013 Depurar aplicaciones en el NKD de Android, para ello ser\xE1 necesario usar
  la Python C API."
image: "2013/03/Crear-un-m\xF3dulo-para-python-con-la-Python-C-API-Parte-I.png"
lastmod: 2015-12-22
layout: post.amp
mainclass: dev
permalink: /crear-modulo-python-con-python-c-api-1/
tags:
- embebiendo python en c++
- reference count python
- tutorial crear modulos python
- tutorial python c api
title: "Crear un m\xF3dulo para python con la Python C API (I) - Introducci\xF3n"
---

* Crear un módulo para python con la Python C API (I) – Introducción
* [Crear un módulo para python con la Python C API (II) – Primer ejemplo][1]
* [Crear un módulo para python con la Python C API (III) – DistUtils][2]
* [Crear un módulo para python con la Python C API (IV) – HerramientasRed][3]
* [Crear un módulo para python con la Python C API (V) – Python 3][4]

<figure>
<a href="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png" title="{{ page.title }}" alt="{{ page.title }}" width="201px" height="190px" /></a>
</figure>

En esta serie de 5 artículos, veremos cómo crear desde cero un módulo que podamos importar en nuestra aplicación *python*. Al finalizar, tendremos creado un módulo llamado **herramientasRed** con el que podremos obtener la dirección ip de un dominio, al igual que hicimos en el artículo [NDK-gdb – Depurar aplicaciones en el NKD de Android][5], para ello será necesario usar la Python C API.

Pero antes, debemos introducir algunos conceptos:

<!--more--><!--ad-->

### ¿Qué es la Python C API?

La *API (Application Programmer&#8217;s Interface)* para Python proporciona a los programadores de los lenguajes C/C++ la posibilidad de acceder al intérprete de *python* a varios niveles. La API es igualmente válida para C++, pero se suele usar únicamente el término **C-API**.

Hay dos razones principales para hacer uso de esta API. La primera es para **escribir módulos** para propósitos específicos, estos módulos se escriben en C y extienden la funcionalidad del intérprete de *python*, es el uso más común y en el que nos centraremos en los artículos siguientes. La segunda razón es para usar *python* como un componente en una aplicación más compleja, esta técnica se conoce como “*Embeber Python en una aplicación* (embedding Python)”.

Muchas de las funciones de la API son útiles independientemente de si estamos extendiendo o embebiendo Python, sin embargo, las mayoría de aplicaciones que embeben Python necesitarán proporcionar un módulo o extensión, así que probablemente la mejor idea es familiarizarse antes con el proceso de creación de módulos antes de embeber Python en otra aplicación.

### Requisitos para usar la Python C API

Todas las definiciones de funciones, tipos y macros necesarias para usar la **Python C API** se incluyen en nuestro código mediante la siguiente cabecera:

```c
#include "Python.h"

```

Esta línea implica la inclusión de las siguientes cabeceras estándares: `<stdio.h>, <string.h>, <errno.h>, <limits.h>, <assert.h>` y `<stdlib.h>`

Si en nuestro sistema no tenemos la cabecera *Python.h* es necesario instalarla mediante:

```bash
# aptitude install python-dev

```

Ya que Python puede definir algunas directivas para el <a href="https://elbauldelprogramador.com/compilacion-de-programas-makefile-y-g/" title="Compilación de programas: makefile y g++">pre-procesador</a> que afectan a las cabeceras estandar, es necesario incluir <em>Python.h</em> antes que cualquier cabecera estandar.

<a name="referencecounts"></a>

### Objetos, Tipos y Reference Counts

La mayoría de las funciones de la *Python C API* tienen uno o más argumentos y devuelven un *<a title="Python C API structure" href="http://docs.python.org/3/c-api/structures.html#PyObject" target="_blank">PyObject*</a>*. Este objeto es un [puntero][6] a un tipo de dato *opaco* que representa un objeto Python arbitrario. Ya que todos los objetos son tratados de la misma forma en Python, es lógico que sean representados por un único tipo en C. Además, ya que casi todos los objetos residen en el montón (*heap*), nunca se ha de declarar un *PyObject* que no sea un puntero.

Todos los objetos Python tienen un *tipo* y un *Reference Count* (Conteo de referencias). El tipo determina de qué objeto se trata (Un entero, una lista, diccionario etc), Para cada uno de los tipos hay una macro que comprueba si un objeto es de dicho tipo, por ejemplo **PyList_Check(a)** es verdadero sí y solo sí el objeto al que apunta *a* es una lista.

#### Reference Counts

El *reference count* es importante, ya que los ordenadores de hoy día tiene una memoria limitada; El *reference count* lleva una cuenta de en cuantos sitios distintos hay una referencia a un determinado objeto. Tal sitio podría ser otro objeto, o una variable C global, o una variable local en una función C. Cuando el *reference count* de un objeto es cero, se libera la memoria ocupada.

Los *Reference counts* siempre se manipulan explícitamente, es decir, el programador debe llamar explícitamente a las macros *[Py_INCREF()][7]* y *<a title="Python C API Py_INCREF" href="http://docs.python.org/3/c-api/refcounting.html#Py_DECREF" target="_blank">Py_DECREF()</a>* para incrementar o decrementar por uno el *reference count*, respectivamente.

No es necesario incrementar el *reference count* de un objeto para cada variable local que contenga un puntero a un objeto. En teoría, se incrementa cuando se crea y se decrementa cuando sale del ámbito. Sin embargo estas dos operaciones se cancelan, por lo que el *reference count* no cambia. El motivo real para usar el *reference count* es prevenir que el objeto se elimine de memoria mientras nuestra variable apunta a dicho objeto. Si sabemos que al menos existe otra variable que apunta hacia él no hay necesidad de incrementar temporalmente el *reference count*. Una situación importante en la que surge este problema es al pasar objetos como parámetros a funciones C en un módulo que ha sido llamado desde Python, el mecanismo de llamada garantiza mantener una referencia para cada uno de los argurmentos.

El uso de las macros *Py_INCREF()* y *Py_DECREF()* es algo complicado y recomiendo leer detenidamente la documentación disponible en las referencias.

Sin embargo, un enfoque seguro es usar siempre operaciones genéricas (Funciones cuyos nombres comienzan con **PyObject\_, PyNumber\_, PySequence o PyMapping_**). Estas operaciones siempre incrementan el *reference count* del objeto que devuelven. Esto deja al programador la responsabilidad de llamar a *Py_DECREF()* cuando haya terminado con el resultado, lo cual es mucho más sencillo.

#### Detalles del Reference Count

El comportamiento del *Reference Count* en funciones la **Python C API** se explica mejor en términos de *propiedad de referencias*(*ownership of references*). La propiedad pertenece a las referencias, nunca a objetos (Los objetos no pueden pertenecer a nadie, son siempre compartidos). *“Poseer una referencia”* significa tener la responsabilidad de llamar a *Py_DECREF* cuando la referencia no sea necesaria. La “*posesión*” también puede ser traspasada, lo que significa que el código que recibe la propiedad de la referencia se convierte responsable de llamar a *Py_DECREF* o *<a href="http://docs.python.org/3/c-api/refcounting.html#Py_XDECREF" target="_blank">Py_XDECREF()</a>* cuando ya no sea necesaria. &#8212; O pasar dicha responsabilidad (normalmente al llamador). Cuando una función transpasa la propiedad de la referencia a su llamador (*The Caller*), se dice que éste recibe una nueva referencia. Cuando la propiedad no se traspasa, se dice que el llamador toma prestada la referencia, para estas referencias no es necesario hacer nada.

Por otro lado, cuando una función pasa una referencia a un objeto hay dos posibilidades: La función *roba (steals)* la referencia al objeto o no. *Robar la referencia * significa que cuando se pasa la referencia a una función, dicha función asume que posee la referencia, y no es necesario que nos ocupemos de ella.

Pocas funciones roban referencias; Las excepciones más notables son <a href="http://docs.python.org/3/c-api/list.html#PyList_SetItem" target="_blank">PyList_SetItem()</a> y <a href="http://docs.python.org/3/c-api/tuple.html#PyTuple_SetItem" target="_blank">PyTuple_SetItem()</a>, ambas roban una referencia al **elemento** (pero no a la tupla o lista en la que se coloca el elemento). Por ejemplo, el código para crear una tupla **(1, 2, &#8220;three&#8221;)** sería como esto (Sin manejar errores por ahora)

```c
PyObject *t;

t = PyTuple_New(3);
PyTuple_SetItem(t, 0, PyLong_FromLong(1L));
PyTuple_SetItem(t, 1, PyLong_FromLong(2L));
PyTuple_SetItem(t, 2, PyUnicode_FromString("three"));

```

En el ejemplo, <a href="http://docs.python.org/3/c-api/long.html#PyLong_FromLong" target="_blank">PyLong_FromLong()</a> devuelve una nueva referencia que es robada inmediatamente por <a href="http://docs.python.org/3/c-api/tuple.html#PyTuple_SetItem" target="_blank">PyTuple_SetItem()</a>. Para seguir usando un objeto aunque su referencia haya sido robada, es necesario usar *Py_INCREF()* para obtener otra referencia antes de llamar a la función roba-referencias.

**PyTuple_SetItem()** es la única forma añadir elementos a una tupla.

Equivalentemente para crear una lista podemos usar **PyList_New()** y **PyList_SetItem()**.

Sin embargo la forma habitual de crear listas y tuplas es mediante **Py_BuildValue()**, con la cual podemos crear los tipos de objetos más comunes a partir de una cadena de formato (*format string*). El ejemplo anterior se puede reemplazar por esto otro, que además comprueba si se producen errores:

```c
PyObject *tuple, *list;

tuple = Py_BuildValue("(iis)", 1, 2, "three");
list = Py_BuildValue("[iis]", 1, 2, "three");

```

Con esto terminamos con la primera parte, en la segunda veremos cómo crear un módulo sencillo que imprima un mensaje por pantalla.

#### Referencias

*Introducción a Python C API* »» <a href="http://docs.python.org/3/c-api/intro.html" target="_blank">docs.python.org</a>



 [1]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-2/ "Crear un módulo para python con la Python C API (II)"
 [2]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-3-distutils/ "Crear un módulo para python con la Python C API (III)"
 [3]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-4/ "Crear un módulo para python con la Python C API (IV)"
 [4]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-5-python3/ "Crear un módulo para python con la Python C API (V)"
 [5]: https://elbauldelprogramador.com/ndk-gdb-depurar-aplicaciones-en-el-nkd-de-android/ "NDK-gdb – Depurar aplicaciones en el NKD de Android"
 [6]: https://elbauldelprogramador.com/clases-y-objetos-punteros-objetos/ "Clases y Objetos – Punteros a objetos"
 [7]: http://docs.python.org/3/c-api/refcounting.html#Py_INCREF "Python C API Py_INCREF"