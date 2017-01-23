---
author: alex
categories:
- django
color: '#E64A19'
date: '2016-01-01'
image: 2013/10/django.png
lastmod: 2016-10-11
layout: post.amp
mainclass: dev
url: /crear-formularios-en-django-partir-de-un-modelo-con-modelform/
tags:
- crear formularios a partir del modelo django
- crear formularios en django
- formularios en django
title: Crear formularios en Django a partir de un Modelo con ModelForm
---

Como comenté cuando escribí el artículo sobre [Introducción a Django][1] he tenido que empezar a desarrollar aplicaciones web en este [framework][2] que cada día me gusta más.

Hoy quiero hablar sobre cómo podemos crear formularios de una forma muy sencilla y directa basándonos en los campos de nuestros modelos mediante la clase *ModelForm*.

<!--more--><!--ad-->

## Crear la aplicación

Vamos a crear una aplicación trivial a modo de ejemplo, la llamaremos **pruebaformularios**. Para crearla ejecutamos:

```bash
$ python manage.py startapp pruebaformularios
```

La aplicación hemos de crearla dentro de un proyecto existente.

## Crear los modelos

El ejemplo que vamos a ver va a disponer de un solo modelo *Persona* que estará compuesto de varios campos:

```python

# pruebaformularios/models.py
from django.db import models

class Persona(models.Model):

    nombre = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=60)
    dni = models.IntegerField()
    direccion = models.CharField(max_length=100)
    email = models.EmailField()

    def __unicode__(self):
        return self.dni
```

## Crear la Vista

El siguiente paso es crear la vista para este modelo. En este ejemplo se mostrará una lista de Personas y se dará la posibilidad de añadir nuevas personas mediante un formulario. Dado que crear una lista de objetos es algo muy común Django proporciona una clase llamada *ListView* de la que podemos heredar para facilitar la tarea. A esto se le llama **vistas genéricas** En las referencias (2) se dispone de más información sobre este tema.

```python

# pruebaformularios/views.py
from django.views.generic import ListView

from .models import Persona

class PersonaList(ListView):

    model = Persona

```

Como vemos, de una forma tan sencilla como esta estamos creando una vista que permitirá mostrar una lista de objetos persona.

## Crear la plantilla

Para ser capaces de mostrar al usuario una lista de *personas* es necesario crear una plantilla. Nos basaremos en una plantilla base llamada *base.html* que se puede encontrar en *django/contrib/databrowse/templates/databrowse/base.html*

```html
{% raw %}
  {% extends "base.html" %}
  {% block content %}
  <h2>Personas</h2>
<em>Persona - DNI</em>
<ul>
    {% for persona in object_list %}
      <li>{{ persona.nombre }} - {{ persona.dni }} </li>
    {% endfor %}
  </ul>
  {% endblock %}
{% endraw %}
```

De esta forma nuestra plantilla hereda todo el contenido de *base.html* y le añadimos contenido en el bloque *content*. Es importante que guardemos ambas plantillas dentro de nuestra aplicación *pruebaformularios* en el directorio *./templates/pruebaformularios/*.

## Configurar el proyecto para que encuentre las plantillas

Con la plantilla creada, el siguiente paso es configurar el proyecto para que sea capaz de encontrar la plantilla. Abrimos el *settings.py* de nuestro proyecto y en *TEMPLATE_DIRS* escribimos:

```python
TEMPLATE_DIRS = (
    os.path.join(PROJECT_PATH,'pruebaformularios/templates/pruebaformularios'),
)
```

Donde PROJECT_PATH es:

```python
PROJECT_PATH = os.path.split(os.path.abspath(os.path.dirname(__file__)))[0]
```

De esta manera django encontrará nuestras plantillas y podremos usarlas.

## Configurar el urls.py

Falta configurar el mapeo URL para la vista que acabamos de crear (*PersonaList*). Para ello creamos un archivo llamado **urls.py** en el directorio de nuestra aplicación con el siguiente contenido:

```python
# pruebaformularios/urls.py
from django.conf.urls import patterns
from django.conf.urls import url

from . import views

urlpatterns = patterns('',
    url(r'list/$', views.PersonaList.as_view(), name='plist'),
)
```

Con esto estamos diciendo a *Django* que cuando encuentre el patrón url list/ (No es exáctamente así, pero lo aclararemos a continuación) muestre la vista *PersonaList*, también le hemos dado un nombre a este patrón para poder referenciarlo más tarde tanto en código como en plantillas, y así no escribir directamente las URLs, lo cual es bastante útil, ya que podemos cambiar la estructura de las direcciones URLs de nuestra aplicación sin necesidad de modificar nada del código, únicamente el archivo *urls.py*

El archivo *urls.py* que acabamos de crear pertenece a la aplicación *pruebaformularios*, ahora es necesario agregar estos patrones al fichero *urls.py* global, es decir, el del proyecto.

```python
# Fichero urls.py del proyecto
from django.conf.urls import patterns
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^personas/', include('pruebaformularios.urls', namespace="upersonas")),
)
```

Con esto, estamos añadiendo bajo la ruta */personas/* todas las urls del proyecto *pruebaformularios*. Es como si fuera un #include de C/C++. Luego la lista de personas que pretendemos mostrar estará en la ruta */personas/list/*. El *namespace* lo usaremos en las plantillas y en el código.

Ya debería estar todo, para probar el ejemplo ejecutamos:

```bash
$ python manage.py syncdb
$ python manage.py runserver
```

El primer comando se encarga de actualizar la base de datos con los modelos creados y el segundo arranca el servidor de desarrollo para que podamos acceder a la web.

Si todo ha ido bien, deberíamos ver la siguiente página en <a href="http://127.0.0.1:8000/personas/list" title="localhost" target="_blank">http://127.0.0.1:8000/personas/list</a>

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/10/Crear-formularios-en-Django-a-partir-de-un-Modelo-con-ModelForm.png" alt="Crear formularios en Django a partir de un Modelo con ModelForm" width="161px" height="153px" />
</figure>

## Crear un formulario a partir de un Modelo con ModelForm

Ahora que tenemos todo listo para mostrar al usuario una lista de personas, vamos a ofrecerle la posibilidad de añadir gente a la lista. Para ello crearemos una clase que extienda de *ModelForm* (3) en *models.py*

```python
# models.py
from django.forms import ModelForm

class PersonaForm(ModelForm):

    class Meta:
        model = Persona

```

Con esto crearemos un formulario basándonos en los campos del modelo *Persona*, lo cual transformará cada campo del modelo en su correspondiente widget en HTML.

## Definir la función que añadirá Personas

Para ser capaces de registrar una nueva Persona en la base de datos, debemos declarar una función que se encargue de dicha tarea y mapear ésta función con una URL, en nuestro ejemplo la dirección que usaremos para añadir una nueva persona será */personas/add*. La función la creamos en el fichero *views.py*

```python
# views.py
from .models import PersonaForm

def add_persona(request):
    if request.method == 'POST': # si el usuario está enviando el formulario con datos
        form = PersonaForm(request.POST) # Bound form
        if form.is_valid():
            new_persona = form.save() # Guardar los datos en la base de datos

            return HttpResponseRedirect(reverse('upersonas:plist'))
    else:
        form = PersonaForm() # Unbound form

    return render(request, 'pruebaformularios/persona_form.html', {'form': form})
```

Hay 3 posibles flujos en esta función:

  1. El usuario ha enviado el formulario relleno con los datos y éstos son válidos » se almacena la persona en la base de datos y se redirige a la página que listará las personas guardadas. Aquí entra en juego lo que mencionamos antes en el fichero urls.py, el *namespace* es *upersonas* y el nombre asociado a la url *list/* es *plist*, de esta forma no es necesario escribir directamente las URLs, haciendo el mantenimiento del proyecto mucho más fácil.
  2. En caso de que los datos no sean válidos se vuelve a mostrar el formulario con los datos que el usuario introdujo pero indicando los campos mal rellenados (Bound form)
  3. El usuario ha accedido al formulario mediante una petición GET en lugar de POST, lo cual indica que no está enviando datos y por tanto se crea un formulario vacío listo para ser rellenado. (Unbound form)

La siguiente tabla pretende resumir los flujos posibles:

| ¿Se está enviando el formulario? | ¿Hay datos?     | Qué pasa                                                                           |
|----------------------------------|-----------------|------------------------------------------------------------------------------------|
| Sin enviar                       | Aún no          | Se proporciona a la plantilla una instancia del formulario sin relledar (Unbound). |
| Enviados                         | Datos inválidos | Se pasa a la plantilla una instancia del formulario con datos                      |
| Enviados                         | Datos válidos   | Se procesan los datos y se guardan, se redirige a la lista de Personas.            |


## Asociar la función con una url

Lo siguiente que hacemos es mapear la función anterior con una URL, de modo que al acceder a */personas/add* se nos presente el formulario:

```python
urlpatterns = patterns('',
    url(r'^list/$', views.PersonaList.as_view(), name='plist'),
    url(r'^add/$', views.add_persona, name='padd'),
)
```

El nombre será usado después en la plantilla.

## Crear la plantilla con el formulario

Por último, la plantilla que contiene el formulario quedaría así:


```html

{% raw %}
{% extends "base.html" %}
{% block content %}
  <form action="{% url 'upersonas:padd' %}" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="Añadir persona" />
</form>
{% endblock %}
{% endraw %}

```

De nuevo usamos el *namespace* creado anteriormente en el *urls.py* global y el nombre que acabamos de darle a la función para agregar personas.

## Probando el ejemplo

Eso es todo, accediendo a <a href="http://127.0.0.1:8000/personas/add" target="_blank">http://127.0.0.1:8000/personas/add</a> veremos el formulario y podremos añadir nuevas personas, que irán apareciendo en la lista.

Por último estaría bien colocar un enlace en la página que lista las personas para poder acceder rápidamente al formulario, para ello añadimos al final de la plantilla *personas_list.html* el siguiente enlace:

```html

{% raw %}
Haga click <a href="{% url 'upersonas:padd'  %}">aquí</a> para añadir una persona.
{% endraw %}

```

Ya sabemos que *upersonas* es */personas/* y *padd* es *add*, luego este enlace nos llevará a la dirección */personas/add*, mostrando el formulario.

## Código completo

```python
# models.py
from django.db import models
from django.forms import ModelForm

class Persona(models.Model):

    nombre = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=60)
    dni = models.IntegerField()
    direccion = models.CharField(max_length=100)
    email = models.EmailField()

    def __unicode__(self):
        return self.dni

class PersonaForm(ModelForm):

    class Meta:
        model = Persona
```

```python
# views.py
from django.views.generic import ListView
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from .models import Persona
from .models import PersonaForm

class PersonaList(ListView):

    model = Persona

def add_persona(request):
    if request.method == 'POST':
        form = PersonaForm(request.POST)
        if form.is_valid():
            new_persona = form.save()

            return HttpResponseRedirect(reverse('upersonas:plist'))
    else:
        form = PersonaForm()

    return render(request, 'pruebaformularios/persona_form.html', {'form': form})

```

```python
# urls.py
from django.conf.urls import patterns
from django.conf.urls import url

from . import views

urlpatterns = patterns('',
    url(r'^list/$', views.PersonaList.as_view(), name='plist'),
    url(r'^add/$', views.add_persona, name='padd'),
)
```


```html

{% raw %}
# templates/pruebaformularios/persona_list.html
{% extends "base.html" %}

{% block content %}
  <h2>Personas</h2>
<em>Persona - DNI</em>
<ul>
    {% for persona in object_list %}
      <li>{{ persona.nombre }} - {{ persona.dni }} </li>
    {% endfor %}
  </ul>
<h2>Añadir persona</h2>

  Haga click <a href="{% url 'upersonas:padd'  %}">aquí</a> para añadir una persona.
{% endblock %}
{% endraw %}
```

```html

{% raw %}
# templates/pruebaformularios/persona_form.html

{% extends "base.html" %}

{% block content %}
  <form action="{% url 'upersonas:padd' %}" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="Añadir persona" />
</form>
{% endblock %}
{% endraw %}

```


```python

# urls.py del proyecto
from django.conf.urls import patterns
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^personas/', include('pruebaformularios.urls', namespace="upersonas")),
)

```

Espero que os haya servido de ayuda.

#### Referencias

*(1) Documentación ModelForm* »» <a href="https://docs.djangoproject.com/en/1.5/topics/forms/modelforms/#modelform" target="_blank">docs.django.org</a>
*(2) Vistas genéricas* »» <a href="https://docs.djangoproject.com/en/1.5/topics/class-based-views/generic-display/" target="_blank">docs.django.org</a>
*(3) ModelForm* »» <a href="https://docs.djangoproject.com/en/1.5/topics/forms/modelforms/" target="_blank">docs.django.org</a>

 [1]: https://elbauldelprogramador.com/introduccion-django-instalacion-y-primer-proyecto/ "Introducción a Django – Instalación y primer proyecto"
 [2]: https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/ "Los 10 Mejores Frameworks gratuitos para Aplicaciones Web"
