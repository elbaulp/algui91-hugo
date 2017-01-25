---
author: alex
categories:
- django
color: '#E64A19'
date: '2016-01-01'
image: 2013/10/django.png
lastmod: 2016-10-12

mainclass: dev
url: /introduccion-django-instalacion-y-primer-proyecto/
tags:
- ejemplos django
- instalar django
title: "Introducci\xF3n a Django - Instalaci\xF3n y primer proyecto"
---

> Gracias a [@Jneight](https://github.com/jneight "Perfil en Github de @jneight") por actualizar este artículo!

Hacía tiempo que el [framework][1] web ***Django*** estaba en mi lista de cosas a las que echar un vistazo. Por fin he podido sacar un hueco para instalarlo y trastearlo un poquito. Hoy comparto con vosotros lo que he aprendido mediante una pequeña introducción en la que veremos cómo instalar django bajo un entorno virtual para no ensuciar demasiado el sistema, y una pequeña aplicación sacada de la documentación oficial de ***Django***.



### Instalar django bajo un entorno virtual con virtualenv

Django desde la version 1.8 (LTS) solo soporta python 2.7 o 3.x (recomendado). En este tutorial se usará la version estable 1.10.2.

#### Usando python 2.7

Vamos a instalar virtualenv, lo cual nos permitirá crear un entorno virtual en el que trabajar con python e instalar fácilmente aplicaciones mediante **pip**, que ya viene incluido en python 2.7.9, en caso de tener otra version anterior, deberemos instalarlo.

<!--more--><!--ad-->

```bash
$ sudo apt-get install python-pip python-dev build-essential
```

Tras esto, ahora podremos instalar virtualenv:

```bash
$ sudo pip install --upgrade virtualenv
```

#### Usando python 3.x

En caso de usar la version 3.4 o superior, ya tendremos disponible pip por lo que no será necesario su instalación. En otro caso, procederemos a instalar pip.

```bash
$ sudo apt-get install python3-pip python3-dev build-essential
```

Ahora podremos instalar virtualenv:

```bash
$ sudo pip3 install --upgrade virtualenv
```

#### Inicializar el entorno virtual

Con virtualenv instalado ahora creamos un entorno virtual (lo llamaremos python-env) en el que instalar todo lo relacionado con ***Django*** y sus dependencias:

```bash
$ virtualenv python-env
```

Al ejecutar este comando tendremos una carpeta llamada python-env, ahora activaremos el entorno virtual:

```bash
$ source python-env/bin/activate
```

#### Instalar Django

Por último, instalamos ***Django***:

```bash
$ pip install --upgrade django
```

### Configurando Django

Asumiremos que la versión instalada es la 1.10:

```bash
$ python -m django --version
1.10.2
```

#### Crear un proyecto

Para inicializar un proyecto debemos ejecutar el siguiente comando:

```bash
$ django-admin.py startproject mysite
```

El cual creará un directorio llamado *mysite*, la estructura del proyecto es la siguiente:

```bash
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

  * El directorio *mysite* más exterior es simplemente un contenedor para el proyecto, su nombre no influye en **Django** y puede ser renombrado si así lo queremos.
  * *manage.py* es un pequeño programa que nos ayudará a interaccionar con el proyecto.
  * El directorio interno *mysite* es el paquete Python para el proyecto, El nombre de este directorio es el que usaremos cuando queramos importar algo de este proyecto.
  * *mysite/\_\_init\_\_.py*. Fichero vacío que indica a Python que el directorio debe considerarse como un paquete.
  * *mysite/settings*. Configuraciones del proyecto.
  * *mysite/urls.py*. La declaración de URLs para este proyecto; como una &#8220;Tabla de contenidos&#8221; del proyecto.
  * mysite/wsgi.py. Punto de entrada para servidores webs compatibles con <a href="http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface" title="Qué es WSGI" target="_blank">WSGI</a>.

#### El servidor de desarrollo

**Django** proporciona un servidor simple que nos permita probar nuestro proyecto de forma local, para iniciarlo hay que ejecutar:

```bash
$ python manage.py runserver
```

#### El fichero de configuración settings.py

##### Configurar la base de datos

Para modificar la configuración de la [base de datos][2] editamos el fichero *mysite/settings.py*, en este tutorial usaremos *sqlite* por ser la más sencilla.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3')  # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': '',
        'PASSWORD': '',
        'HOST': '',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '',                      # Set to empty string for default.
    }
}
```

##### Aplicaciones instaladas

En *INSTALLED_APPS* se definen las aplicaciones instaladas en nuestro proyecto, por defecto tendremos:

```python
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)
```

La aplicación de ejemplo que creemos deberá referenciarse aquí para poder usarla.

Una vez tengamos configurado esto, procedemos a iniciar la base de datos:

```python
$ python manage.py migrate
```

### Crear una aplicación

Para crear una nueva aplicación basta con ejecutar el comando:

```bash
$ python manage.py startapp polls
```

Lo cual creará un directorio llamado *polls*, cuyo contenido será:

```bash
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    urls.py
    views.py
```

  * admin.py es donde se definen los controladores para el panel de administración generado por django
  * apps.py para configuración especifica de la aplicación, hooks de inicialización, etc.
  * migrations/ migraciones a realizar en la BD a medida que evolucione models.py.
  * models.py archivo donde definiremos los modelos de datos de esta aplicación.
  * tests.py archivo para los tests automáticos.
  * urls.py donde definiremos las URLs de la aplicación.
  * views.py para las vistas.

Primero necesitaremos modificar **settings.py** para añadir la nueva aplicación a la lista de *INSTALLED_APPS* y que django la inicie en cada arranque:

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

En **models.py** se define los modelos que se usarán para crear la base de datos mediante [clases][3] en Python. En este caso necesitamos una tabla *Poll* (Encuesta) y *Choice* (Opción elegida). La encuesta tendrá dos campos, *question* y *pub_date*. Mientras que la opción elegida tendrá que hacer referencia a qué encuesta pertenece mediante una [foreignKey][4], un texto que describa la opción y el número de votos. Dicho esto, el fichero *models.py* contendrá:

```python
from django.db import models

class Poll(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    poll = models.ForeignKey(Poll)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

Tras escribir los modelos que necesitamos, deberemos crear la migración correspondiente para posteriormente crear las nuevas tablas:

```python
$ python manage.py makemigrations pools
$ python manage.py migrate
```

#### Activar el panel de administración

Primero deberemos crear un usuario con permiso de administración, esto es posible directamente con un comando de manage.py en el que solo debemos seguir los pasos:

```python
$ python manage.py createsuperuser
```

Para poder acceder al panel de administración, debe estar añadido en la lista de urls, para ello comprobamos que *mysite/urls.py* define este *urlpatterns*

```python
from django.conf.urls import url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
]
```

Ejecutamos el servidor con *python manage.py runserver* y entramos a <a href="http://127.0.0.1:8000/admin/" target="_blank">http://127.0.0.1:8000/admin/</a>. Deberíamos ver:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/09/admin01.png" alt="{{ title }}" title="{{ title }}" width="336px" height="192px"></amp-img>
</figure>

Para poder hacer accesibles los modelos que acabamos de crear desde el panel de administración, debemos configurar django para que los objetos Polls tengan una interfaz en el panel de administración. Para ello, crea un archivo llamado *admin.py* en el directorio *polls*:

```python
from django.contrib import admin
from .models import Poll

admin.site.register(Poll)
```

Debemos reiniciar el servidor para que los cambios se apliquen, ahora sí vemos la aplicación polls:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/09/admin03t.png" alt="Introducción a Django – Instalación y primer proyecto" width="400px" height="134px" />
</figure>

#### Escribir la primera vista

Hemos mencionado antes que en *views.py* se define qué se va a mostrar al usuario. Veamos la vista más simple que podemos crear. En *polls/views.py* escribe lo siguiente:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the poll index.")
```

Sin embargo, para conseguir que funcione, debemos crear un archivo *urls.py* que asocie la función **index** a una dirección URL. En *polls/urls.py* escribe:

```python
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
```

Y ahora debemos decir a *mysite/urls.py* que use también *polls/urls.py* cuando busque qué funciones asociar a qué urls:

```python
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^polls/', include('polls.urls')),
    url(r'^admin/', admin.site.urls),
]
```


Tras modificar estos ficheros, veremos el mensaje **Hello, world. You&#8217;re at the poll index.** en <a href="http://127.0.0.1:8000/polls" target="_blank">http://127.0.0.1:8000/polls</a>.

#### Ejemplo completo

Para no alargar mucho este artículo, he intentado dar unas nociones básicas de cómo instalar y empezar a usar django. El ejemplo completo de la documentación oficial citada en las referencias lo podéis encontrar en <a href="https://github.com/algui91/djangoTutorialv1.5" title="Ejemplo en Github" target="_blank">github</a>.

#### Referencias

*Documentación Oficial* »» <a href="https://docs.djangoproject.com/en/1.10/intro/tutorial01/" target="_blank">djangoproject.com</a>
*Imagen de aruseni* »» <a href="http://aruseni.deviantart.com/art/Django-white-and-green-318200642" target="_blank">deviantart</a>

 [1]: https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/ "Los 10 Mejores Frameworks gratuitos para Aplicaciones Web"
 [2]: https://elbauldelprogramador.com/bases-de-datos/ "Bases de datos"
 [3]: https://elbauldelprogramador.com/clases-y-objetos-introduccion/ "Clases y objetos – Introducción"
 [4]: https://elbauldelprogramador.com/lenguaje-definicion-de-datosddl-create/ "Lenguaje Definición de Datos(DDL) – CREATE"
