---
author: alex
categories:
- c
- python
color: '#E64A19'
date: '2016-01-01'
description: "Continuando con nuestro art\xEDculo sobre la Python C API, esta vez
  vamos a ver un ejemplo sencillo en el que crearemos un m\xF3dulo que imprima por
  pantalla un mensaje, como *Hola **nombre,** desde la python C API!*. El m\xF3dulo
  consistir\xE1 en una funci\xF3n llamada *saluda()* que recibir\xE1 una cadena de
  texto usada como nombre para saludar. Una vez terminado podr\xE1 usarse as\xED:"
image: "2013/03/Crear-un-m\xF3dulo-para-python-con-la-Python-C-API-Parte-I.png"
lastmod: 2015-12-22

mainclass: dev
url: /crear-modulo-python-con-python-c-api-2/
tags:
- embebiendo python en c++
- reference count python
- tutorial crear modulos python
- tutorial python c api
title: "Crear un m\xF3dulo para python con la Python C API (II) - Primer ejemplo"
---

* [Crear un módulo para python con la Python C API (I) – Introducción][1]
* Crear un módulo para python con la Python C API (II) – Primer ejemplo
* [Crear un módulo para python con la Python C API (III) – DistUtils][2]
* [Crear un módulo para python con la Python C API (IV) – HerramientasRed][3]
* [Crear un módulo para python con la Python C API (V) – Python 3][4]

<figure>
<a href="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png" title="{{ page.title }}" alt="{{ page.title }}" width="201px" height="190px" /></a>
</figure>

Continuando con nuestro artículo sobre la Python C API, esta vez vamos a ver un ejemplo sencillo en el que crearemos un módulo que imprima por pantalla un mensaje, como *Hola **nombre,** desde la python C API!*.

El módulo consistirá en una función llamada *saluda()* que recibirá una cadena de texto usada como nombre para saludar. Una vez terminado podrá usarse así:

```python

>>> import ejemplo
>>> ejemplo.saluda('Alejandro')

```

<!--more--><!--ad-->

Empecemos mostrando el código e iremos explicándolo a lo largo del artículo:

```c
#include <python.h>

static PyObject*
ejemplo_saluda(PyObject *self, PyObject *args)
{
    char saludo[64];
    char *nombre = NULL;

    if (PyArg_ParseTuple(args, "s", &nombre;))
    {
        if (strlen(nombre) + 29 < 64 ){
            sprintf(saludo, "Hola %s desde la Python C API!", nombre);
            return Py_BuildValue("s", saludo);
        }
    }
    return NULL;
}

static
PyMethodDef ejemplo_methods[] = {
    {"saluda", ejemplo_saluda, METH_VARARGS, "Documentación del módulo ejemplo"},
    {NULL, NULL, 0, NULL}, /* Sentinel */
};

PyMODINIT_FUNC
initejemplo(void)
{
    PyObject *m;

    m = Py_InitModule("ejemplo", ejemplo_methods);
    if (m == NULL)
        return;
}

```

Empezaremos desglosando la función *ejemplo_saluda*, la cual será llamada al ejecutar la línea *ejemplo.saluda('Alejandro')* en Python.

### Función ejemplo_saluda()

El parámetro **args** será un puntero a una tupla conteniendo los argumentos, en este caso *Alejandro*. Cada elemento de la tupla representa un argumento de la función en python. Los argumentos son objetos Python, para poder usarlos en la función C, es necesario convertirlos a valores C. Para ello hay que usar la función <a href="http://docs.python.org/2/c-api/arg.html#PyArg_ParseTuple" target="_blank">PyArg_ParseTuple()</a>. Ésta función usa una plantilla para determinar el tipo de variables de los argumentos y las variables C en las que se almacenarán. La función devuelve verdadero si todos los argumentos tienen el tipo esperado y sus componentes han sido almacenados en las variables C.

Los principales valores que se pueden usar como plantilla son los siguientes (La lista completa <a target="_blank" href="http://docs.python.org/3/c-api/arg.html#strings-and-buffers">aquí</a>

* s (string or Unicode) [const char *]
* z (string, Unicode or None) [const char *]
* u (Unicode) [Py_UNICODE *]
* b (integer) [unsigned char]
* B (integer) [unsigned char]
* i (integer) [int]
* I (integer) [unsigned int]
* c (string of length 1) [char]
* f (float) [float]
* O (object) [PyObject *]

Es posible crear una función en python que disponga de parámetros opcionales, para ello en la plantilla de variables hay que colocar todos los argumentos que deseemos que sean opcionales tras el símbolo »», por ejemplo:

```c
PyArg_ParseTuple(args, "|s", &nombre;);

```

Por último la función debe devolver un objeto Python, es este caso una cadena de texto, lo cual se consigue con la función *Py_BuildValue()*. También recibe como parámetro una plantilla de variables y las variables C a partir de las cuales se debe crear el objeto python. En nuestro ejemplo simplemente devolvemos una cadena de texto, pero podría devolverse cualquier objeto python. A continuación se muestra cómo se podrían crear una lista o un diccionario:

```c
Py_BuildValue("[s, i, i]", variableC_char, variableC_int, variableC_int2);
Py_BuildValue("{"
              "   s:i,"
              "   s:i"
              "}",
              "Valor para primer s", variableC_int,
              "Valor para segundo s", variableC_int2
              );

```

### Tabla de métodos del módulo

### Función de inicialización

```c
static
PyMethodDef ejemplo_methods[] = {
    {"saluda", ejemplo_saluda, METH_VARARGS, "Documentación del módulo ejemplo"},
    {NULL, NULL, 0, NULL}, /* Sentinel */
};

```

El *array* **ejemplo_methods[]** se llama la *Tabla de métodos del módulo* y guarda el nombre y la dirección del método que será llamado desde Python, en este caso **ejemplo_salud**. **METH_VARARGS** indica que el método acepta parámetros, los parámetros se parsean en forma de tuplas para poder obtener los parámetros mediante *PyArg_ParseTuple()*. La última entrada del array es la documentación del método para Python.

Ésta tabla debe pasarse al intérprete en la fase de inicialización del módulo llamando al método *Py\_InitModule("ejemplo", ejemplo\_methods);*.

Cuando importamos el módulo por primera vez desde python, se llama al método **initejemplo**, seguidamente se llama a **Py_InitModule()**, el cual crea un “Objeto del módulo” e inserta los objetos de las funciones en el módulo creado basandose en la tabla de métodos que le hemos pasado como segundo parámetro. **Py_InitModule()** devuelve un puntero al [objeto][5] del módulo que acaba de crear, si no se pudo crear, devolverá *NULL*.

### Compilación y uso

De momento vamos a compilar el módulo a mano, en la siguiente parte veremos cómo usar *DistUtils* para automatizar el proceso:

```bash
$ gcc ejemplo.c -o ejemplo.so -fPIC -shared -I/usr/include/python2.7

```

Ahora es necesario mover el archivo **ejemplo.so** a */usr/lib/python2.7*.

Hecho esto, a continuación se muestra un ejemplo de uso para el módulo:

```python
In [1]: import ejemplo

In [2]: print ejemplo.saluda('Alejandro')
Hola Alejandro desde la Python C API!

In [3]: help(ejemplo)

Help on module ejemplo:

NAME
    ejemplo

FILE
    ~/ejemplo.so

FUNCTIONS
    saluda(...)
        Documentación del módulo ejemplo

(END)

```

Eso es todo para la segunda parte, en la tercera veremos cómo automatizar el proceso de compilación.

#### Referencias

*Extending Python with C or C++* »» <a href="http://docs.python.org/2/extending/extending.html" target="_blank">docs.python.org</a>
*Bindings python* »» <a href="http://www.menudoproblema.es/blog/entries/2012/03/26/bindings-python-para-bibliotecas-c-parte-2/" target="_blank">menudoproblema.es</a>



 [1]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-1/ "Crear un módulo para python con la Python C API (I)"
 [2]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-3-distutils/ "Crear un módulo para python con la Python C API (III)"
 [3]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-4/ "Crear un módulo para python con la Python C API (IV)"
 [4]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-5-python3/ "Crear un módulo para python con la Python C API (V)"
 [5]: https://elbauldelprogramador.com/compilacion-de-programas-makefile-y-g/ "Compilación de programas: makefile y g++"
