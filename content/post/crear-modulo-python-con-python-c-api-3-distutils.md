---
author: alex
categories:
- c
- python
color: '#E64A19'
description: "Como dijimos en la entrada anterior, vamos a hablar de *DistUtils*,
  una herramienta con la que seremos capaces de automatizar el proceso de compilaci\xF3n
  e instalaci\xF3n de nuestro m\xF3dulo creado con la Python C API."
image: "2013/03/Crear-un-m\xF3dulo-para-python-con-la-Python-C-API-Parte-I.png"
lastmod: 2015-12-22
layout: post.amp
mainclass: dev
permalink: /crear-modulo-python-con-python-c-api-3-distutils/
tags:
- embebiendo python en c++
- reference count python
- tutorial crear modulos python
- tutorial python c api
title: "Crear un m\xF3dulo para python con la Python C API (III) - DistUtils"
---

* [Crear un módulo para python con la Python C API (I) – Introducción][1]
* [Crear un módulo para python con la Python C API (II) – Primer ejemplo][2]
* Crear un módulo para python con la Python C API (III) – DistUtils
* [Crear un módulo para python con la Python C API (IV) – HerramientasRed][3]
* [Crear un módulo para python con la Python C API (V) – Python 3][4]

<figure>
<a href="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Crear-un-módulo-para-python-con-la-Python-C-API-Parte-I.png" title="{{ page.title }}" alt="{{ page.title }}" width="201px" height="190px" /></a>
</figure>

Como dijimos en la entrada[ anterior][5], vamos a hablar de *DistUtils*, una herramienta con la que seremos capaces de automatizar el proceso de compilación e instalación de nuestro módulo creado con la Python C API.

<!--more--><!--ad-->

### Compilar el módulo

El esquema básico de un paquete **distutils** contiene un fichero *setup.py*, su versión más simple es:

```python
from distutils.core import setup, Extension

module1 = Extension('ejemplo',
                    sources = ['ejemplo.c'])

setup (name = 'NombreDelPaquete',
       version = '1.0',
       description = 'Descripción del paquete',
       ext_modules = [module1])
```

Una vez definido el *setup.py* ejecutando

```bash
$ python setup.py build
running build
running build_ext
building 'ejemplo' extension
x86_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c ejemplo.c -o build/temp.linux-x86_64-2.7/ejemplo.o
creating build/lib.linux-x86_64-2.7
x86_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D_FORTIFY_SOURCE=2 -g -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86_64-2.7/ejemplo.o -o build/lib.linux-x86_64-2.7/ejemplo.so

$ ll build/lib.linux-x86_64-2.7/ejemplo.so
-rwxr-xr-x 1 hkr hkr 18K Jul 26 16:57 build/lib.linux-x86_64-2.7/ejemplo.so*
```

compilaremos el fichero *ejemplo.c* y se generará un módulo llamado *ejemplo* en el directorio *build*.

Normalmente los módulos son más complejos y es necesario usar librerías externas, indicar dónde se encuentran las cabeceras etc, para ello se usan estas reglas:

```python
from distutils.core import setup, Extension

module1 = Extension('demo',
                    define_macros = [('MAJOR_VERSION', '1'),
                                     ('MINOR_VERSION', '0')],
                    include_dirs = ['/usr/local/include'],
                    libraries = ['tcl83'],
                    library_dirs = ['/usr/local/lib'],
                    sources = ['demo.c'])

setup (name = 'PackageName',
       version = '1.0',
       description = 'This is a demo package',
       author = 'Martin v. Loewis',
       author_email = 'martin@v.loewis.de',
       url = 'http://docs.python.org/extending/building',
       long_description = '''
This is really just a demo package.
''',
       ext_modules = [module1])
```

### Instalar el módulo

Sin embargo, con *python setup.py build* no se está instalando el módulo en el lugar adecuado para que python sea capaz de utilizarlo, para ello es necesario usar *install* de a siguiente forma:

```bash
# python setup.py install
running install
running build
running build_ext
building 'ejemplo' extension
creating build
creating build/temp.linux-x86_64-2.7
x86_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c ejemplo.c -o build/temp.linux-x86_64-2.7/ejemplo.o
creating build/lib.linux-x86_64-2.7
x86_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D_FORTIFY_SOURCE=2 -g -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86_64-2.7/ejemplo.o -o build/lib.linux-x86_64-2.7/ejemplo.so
running install_lib
copying build/lib.linux-x86_64-2.7/ejemplo.so -> /usr/local/lib/python2.7/dist-packages
running install_egg_info
Removing /usr/local/lib/python2.7/dist-packages/NombreDelPaquete-1.0.egg-info
Writing /usr/local/lib/python2.7/dist-packages/NombreDelPaquete-1.0.egg-info
```

Y ahora sí que podremos usar el módulo como antes:

```python
In [1]: import ejemplo

In [2]: ejemplo.saluda('Alejandro')
Out[2]: 'Hola Alejandro desde la Python C API!'
```

En la siguiente parte, crearemos un módulo que sea capaz de devolver la ip de un dominio web.

#### Referencias

*Documentación de Distutils* »» <a href="http://docs.python.org/3/extending/building.html#building" target="_blank">docs.python</a>



 [1]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-1/ "Crear un módulo para python con la Python C API (I)"
 [2]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-2/ "Crear un módulo para python con la Python C API (II)"
 [3]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-4/ "Crear un módulo para python con la Python C API (IV)"
 [4]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-5-python3/ "Crear un módulo para python con la Python C API (V)"
 [5]: https://elbauldelprogramador.com/crear-modulo-python-con-python-c-api-2
