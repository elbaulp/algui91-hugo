---
author: alex
categories:
- c
- python
color: '#E64A19'
date: '2016-01-01'
description: "Este es el \xFAltimo art\xEDculo de esta serie de 5 sobre c\xF3mo crear
  un m\xF3dulo con la Python C API. Para terminar, veremos la forma de hacer compatible
  un m\xF3dulo con **Python 3**. Nos basaremos en el m\xF3dulo **herramientasRed**
  que hemos creado en la parte 3."
image: "2013/03/Crear-un-m\xF3dulo-para-python-con-la-Python-C-API-Parte-I.png"
lastmod: 2015-12-22
layout: post.amp
mainclass: dev
url: /crear-modulo-python-con-python-c-api-5-python3/
tags:
- embebiendo python en c++
- reference count python
- tutorial crear modulos python
- tutorial python c api
title: "Crear un m\xF3dulo para python con la Python C API (V) \u2013 Python 3"
---

* [Crear un módulo para python con la Python C API (I) – Introducción][1]
* [Crear un módulo para python con la Python C API (II) – Primer ejemplo][2]
* [Crear un módulo para python con la Python C API (III) – DistUtils][3]
* [Crear un módulo para python con la Python C API (IV) – HerramientasRed][4]
* Crear un módulo para python con la Python C API (V) – Python 3

<figure>
<a href="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png" title="{{ page.title }}" alt="{{ page.title }}" width="201px" height="190px" /></a>
</figure>

Este es el último artículo de esta serie de 5 sobre cómo crear un módulo con la Python C API. Para terminar, veremos la forma de hacer compatible un módulo con **Python 3**. Nos basaremos en el módulo **herramientasRed** que hemos creado en la parte 3.

<!--more--><!--ad-->

El proceso de compatibilidad se realiza mediante varios *#define* y macros en C para comprobar qué versión de Python se está usando, el código que se muestra a continuación hace del módulo **herramientasRed** un módulo compatible tanto con Python 2 como Python 3. Es posible usar este código como plantilla para otros módulos.

### Código fuente compatible con Python 3

```c
#include <python.h>
#include <string.h>
#include <sys>socket.h>
#include <netinet</sys>in.h>
#include <arpa>inet.h>

#include <netdb.h>

struct module_state {
    PyObject *error;
};

#if PY_MAJOR_VERSION >= 3
#define GETSTATE(m) ((struct module_state*)PyModule_GetState(m))
#else
#define GETSTATE(m) (&_state)
static struct module_state _state;
#endif

static PyObject
*error_out(PyObject *m){
    struct module_state *st = GETSTATE(m);
    PyErr_SetString(st->error, "something bad happened");
    return NULL;
}

static PyObject*
herramientasRed_imprimeIP(PyObject *self, PyObject *args)
{

    char *domainName;
    struct hostent *host_info;
  struct in_addr *address;

    if (!PyArg_ParseTuple(args, "s", &domainName)){
        return NULL;
    }

    char returnValue[100];
    memset(returnValue, 0, 100);

    host_info = gethostbyname(domainName);
    if (strlen(returnValue) + strlen(domainName) + 16 > 99)
        return NULL;
    if(host_info == NULL) {
      sprintf(returnValue, "No se pudo obtener la IP del dominio %s\n", domainName);
 } else {
        address = (struct in_addr *) (host_info->h_addr);
        sprintf(returnValue, "%s tiene dirección IP %s\n", domainName, inet_ntoa(*address));
  }
    return Py_BuildValue("s", returnValue);
}

static
PyMethodDef herramientasRed_methods[] = {
    {"imprimeIP", herramientasRed_imprimeIP, METH_VARARGS, "Documentación del módulo ejemplo"},
    {NULL, NULL, 0, NULL}, </arpa>* Sentinel */
};

#if PY_MAJOR_VERSION >= 3

static int herramientasRed_traverse(PyObject *m, visitproc visit, void *arg) {
    Py_VISIT(GETSTATE(m)->error);
    return 0;
}

static int herramientasRed_clear(PyObject *m) {
    Py_CLEAR(GETSTATE(m)->error);
    return 0;
}

static struct PyModuleDef moduledef = {
    PyModuleDef_HEAD_INIT,
    "herramientasRed",          /* nombre_modulo */
    "Documentacion del modulo", /* doc_modulo */
    sizeof(struct module_state),/* modulo_size*/
    herramientasRed_methods,    /* metodos del modulo */
    NULL,                       /* m_reload */
    herramientasRed_traverse,
    herramientasRed_clear,
    NULL                        /* m_free */
};

#define INITERROR return NULL

PyObject *
PyInit_herramientasRed(void)

#else
#define INITERROR return

void
initherramientasRed(void)
#endif
{
#if PY_MAJOR_VERSION >= 3
    PyObject *module = PyModule_Create(&moduledef;);
#else
    PyObject *module = Py_InitModule("herramientasRed", herramientasRed_methods);
#endif
    if (module == NULL)
        INITERROR;
    struct module_state *st = GETSTATE(module);

    st->error = PyErr_NewException("herramientasRed.Error", NULL, NULL);
    if (st->error == NULL) {
        Py_DECREF(module);
        INITERROR;
    }

#if PY_MAJOR_VERSION >= 3
    return module;
#endif
}

```

Para comprobar que funciona, compilamos e instalamos el módulo con Python 3 de la siguiente forma:

```bash
$ python3 setup.py install
running install
running build
running build_ext
building 'herramientasRed' extension
gcc -pthread -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D_FORTIFY_SOURCE=2 -g -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -fPIC -I/usr/include/python3.2mu -c herramientasRed.c -o build/temp.linux-x86_64-3.2/herramientasRed.o
herramientasRed.c:21:2: warning: ‘error_out’ defined but not used [-Wunused-function]
creating build/lib.linux-x86_64-3.2
gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-z,relro build/temp.linux-x86_64-3.2/herramientasRed.o -o build/lib.linux-x86_64-3.2/herramientasRed.cpython-32mu.so
running install_lib
copying build/lib.linux-x86_64-3.2/herramientasRed.cpython-32mu.so -> /usr/local/lib/python3.2/dist-packages
running install_egg_info
Writing /usr/local/lib/python3.2/dist-packages/HerramientasRed-1.0.egg-info

```

Todo ha salido bien, abrimos el intérprete de Python 3 y probamos el módulo:

```python
Python 3.2.4 (default, May  8 2013, 20:55:18)
[GCC 4.7.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import herramientasRed
>>> print(herramientasRed.imprimeIP('elbauldelprogramador.com'))
elbauldelprogramador.com tiene dirección IP <ip>
>>>

```

Para asegurarnos de que el módulo sigue funcionando con python 2, volvemos a compilar y ejecutar desde la versión 2 de pyton:

```bash
$ sudo python2.7 setup.py install
running install
running build
running build_ext
building 'herramientasRed' extension
x86_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c herramientasRed.c -o build/temp.linux-x86_64-2.7/herramientasRed.o
herramientasRed.c:21:2: warning: ‘error_out’ defined but not used [-Wunused-function]
x86_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D_FORTIFY_SOURCE=2 -g -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86_64-2.7/herramientasRed.o -o build/lib.linux-x86_64-2.7/herramientasRed.so
running install_lib
copying build/lib.linux-x86_64-2.7/herramientasRed.so -> /usr/local/lib/python2.7/dist-packages
running install_egg_info
Removing /usr/local/lib/python2.7/dist-packages/HerramientasRed-1.0.egg-info
Writing /usr/local/lib/python2.7/dist-packages/HerramientasRed-1.0.egg-info

```

Y por último:

```bash
Python 2.7.5+ (default, Jun  2 2013, 13:26:34)
[GCC 4.7.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import herramientasRed
>>> print herramientasRed.imprimeIP('elbauldelprogramador.com')
elbauldelprogramador.com tiene dirección IP 5.39.89.44
>>>

```

Eso es todo, espero que os hayan gustado estos cinco artículos sobre **cómo crear un módulo para python con la Python C API.** Dejad vuestros comentarios!

#### Referencias

*Porting Extension Modules to Python 3* »» <a href="http://docs.python.org/3/howto/cporting.html" target="_blank">docs.python.org</a>



 [1]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-1/ "Crear un módulo para python con la Python C API (I)"
 [2]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-2/ "Crear un módulo para python con la Python C API (II)"
 [3]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-3-distutils/ "Crear un módulo para python con la Python C API (III)"
 [4]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-4/ "Crear un módulo para python con la Python C API (IV)"
