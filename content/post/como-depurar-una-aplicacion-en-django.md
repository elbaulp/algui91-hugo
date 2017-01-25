---
author: alex
categories:
- django
color: '#E64A19'
date: '2016-01-01'
image: 2013/10/django.png
lastmod: 2016-10-11

mainclass: dev
url: /como-depurar-una-aplicacion-en-django/
tags:
- depuracion
- depurar aplicacion django
- depurar django
- django
- pdb
title: "C\xF3mo depurar una aplicaci\xF3n en Django"
---

Hace poco vimos una [introducción a django][1]. Pero a medida que las aplicaciones vayan haciéndose más complejas, tendremos la necesidad de saber qué está pasando, qué contienen las variables etc, y para ello será necesario hacer uso del [depurador][2]. Hoy veremos cómo depurar una aplicación en Django.

<!--more--><!--ad-->

Vamos a trabajar con la aplicación de ejemplo de la <a href="https://docs.djangoproject.com/en/1.5/intro/tutorial01/" title="Ejemplo aplicación Django" target="_blank">documentación de <strong>Django</strong></a>. La aplicación consiste un sistema de encuestas en las que se puede votar, se puede descargar desde <a href="https://github.com/algui91/djangoTutorialv1.5/" title="Ejemplo Polls Django" target="_blank">este repositorio</a>.

### Añadir un punto de ruptura

El primer paso para depurar, es establecer un punto de ruptura en la línea deseada. En este caso lo estableceremos en la vista principal (IndexView), en el fichero *polls/views.py*. Es necesario importar el módulo **pdb**.

```python
# polls/views.py
# ...
import pdb

class IndexView(generic.ListView):
        template_name = 'polls/index.html'
        context_object_name = 'latest_poll_list'

        def get_queryset(self):
                """Return the last five published polls (not including those set to be
                published in the future)
                """
                pdb.set_trace() ## Punto de ruptura
                return Poll.objects.filter(
                                pub_date__lte=timezone.now()
                       ).order_by('-pub_date')[:5]

# ...

```

Una vez establecido el punto de ruptura, lanzamos la aplicación con

```bash
$ python manage.py runserver
Validating models...

0 errors found
November 04, 2013 - 17:58:08
Django version 1.5.2, using settings 'mysite.settings'
Development server is running at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

```

Con la aplicación ejecutándose, nos dirigimos a <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000/</a>. Como hemos establecido el punto de ruptura en la vista pincipal (/), el depurador aparecerá en la terminal inmediatamente:

```bash
 ~/Desarrollo/python-env/djangoTutorialv1.5/polls/views.py(24)get_queryset()
-> return Poll.objects.filter(
(Pdb)

```

A partir de aquí la depuración es muy parecida a **gdb**, lo primero que debe hacerse para familiarizarse con este entorno es leer la ayuda:

```bash
(Pdb) help

Documented commands (type help <topic>):
========================================
EOF    bt         cont      enable  jump  pp       run      unt
a      c          continue  exit    l     q        s        until
alias  cl         d         h       list  quit     step     up
args   clear      debug     help    n     r        tbreak   w
b      commands   disable   ignore  next  restart  u        whatis
break  condition  down      j       p     return   unalias  where

Miscellaneous help topics:
==========================
exec  pdb

Undocumented commands:
======================
retval  rv

```

Por ejemplo, con `p <exp>` se imprimirá por pantalla el valor de la expresión:

```bash
p Poll.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]
[<poll: titulo="Titulo" encuesta="encuesta">]
```

Que devuelve una sola encuesta, ya que solo existe esta en la base de datos.

¿Hacéis uso de pdb en vuestras aplicaciones durante su desarrollo?, ¿añadiríais algo al artículo?, compártelo en los comentarios.

#### Referencias

*How to debug in django* »» <a href="http://stackoverflow.com/questions/1118183/how-to-debug-in-django-the-good-way" target="_blank">stackoverflow</a>

 [1]: https://elbauldelprogramador.com/introduccion-django-instalacion-y-primer-proyecto/ "Introducción a Django – Instalación y primer proyecto"
 [2]: https://elbauldelprogramador.com/?s=gdb&submit;= "Depuradores"
