---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-08T16:51:24+01:00
url: /programacion-android-interfaz-grafica/
tags:
- curso android pdf
- layout android
- menu android
title: "Programación Android: Interfaz gráfica. Conceptos básicos"
---

Todos los componenetes de la interfaz de usuario de Android descienden de la clase ***View.*** Dichos objetos están organizados en forma de árbol y pueden contener nuevos objetos View, permitiendo crear interfaces muy completas.

<!--more--><!--ad-->

<figure>
    <amp-img sizes="(min-width: 515px) 515px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="300" width="514" src="https://3.bp.blogspot.com/-qMw4Dx_mS0U/TgDfg6rdMCI/AAAAAAAAApU/Pl9tUQckM5g/s1600/layoutparams.png"></amp-img>
</figure>

Los objetos ***View*** se pueden definir de dos maneras:

- Mediante un fichero XML colocado dentro del directorio ***res/layout***, que es el que usaremos normalmente.
- En tiempo de ejecución, muy útil para crear nuestros propios componentes View

Para dibujar la interfaz, el sistema necesita que le pasemos el objeto View raiz, para ir descendiendo por cada uno de sus nodos y presentar al usuario toda la interfaz. El método encargado de esto es ***Activity.setContentView()***.

Android se encarga de dibujar los elementos llamando primero al método ***draw()*** de cada vista, podríamos decir que cada vista se dibuja a sí misma. El proceso de dibujo se hace en dos veces. Inicialmente se llama al método ***measure(int, int)***, que define el tamaño de cada objeto View, posteriormente se llama al método ***layout(int, int, int, int)***, que posiciona el objeto dentro de la vista.

Para que Android sepa dibujar correctamente los objetos, tenemos que pasarle algunos datos, como son la altura y anchura. Para eso nos servimos de la clase ***LayoutParams***, que pude tomar los siguientes valores:

* Un número
* La constante `FILL_PARENT`, que indica que la vista debe intentar ser tan grande como su padre, quitando el padding.
* La constante `WRAP_CONTENT`, para que intente ser lo suficientemente grande para mostrar su contenido, mas el padding.

También nos podemos servir de la clase ***View.MeasureSpec***, para especificar el tamaño y cómo deben ser posicionadas.

* `AT_MOST`, el padre fija un tamaño mínimo para el hijo. El hijo(y los descendientes de éste) tienen que ocupar por lo menos ese tamaño.
* `EXACTLY`, el padre impone un tamaño exacto al hijo.
* `UNSPECIFIED`, el padre fija el tamaño deseado del hijo.

Un atributo imprescindible es el ***id***(de tipo entero). Que sirve para identificar únicamente a un objeto View. Cuando lo declaramos mediante xml podemos referenciarlo a través de la clase de recursos R, usando una @.

* ***android:id=&#8221;@+id/nombreID&#8221;:*** Crea un nuevo atributo en la clase R llamado nombreID
* ***android:id=&#8221;@id/nombreID&#8221;:*** Hace referencia a un id ya existente asociado a la etiqueta 'nombreID'
* ***android:id=&#8221;@android:id/list&#8221;:*** Referencia a un a etiqueta definida en la clase R del sistema llamada &#8216;list&#8217;.

Los objetos View pueden tener otros muchos atributos, como padding, colores, imágenes, fondos, márgentes etc

# Context

Si ya has programado algo en Android, o has visto alguno de los [ejemplos][1], probablemente hayas visto que muchos métodos referidos a la vista piden como parámetro un objeto de tipo ***context***.

Context es una interfaz para la información global de la aplicación. A través de él podemos acceder a recursos, clases y operaciones, como lanzar [actividades][1], manejar [intents][2] etc.

Podemos acceder al contexto de diferentes formas en función de donde nos encontremos:

* Con el método ***getContext().***
* Las actividades implementan esta interfaz, por lo que haciendo referencia a ellas mismas, con (***this***) o NombreActivity.this, estaremos referenciando el contexto.
* Usando otros métodos como ***getApplicationContext() o getApplication()***

# Siguiente Tema: [Programación Android: Interfaz gráfica - Layouts][3]

 [1]: https://elbauldelprogramador.com/programacion-android-trabajar-con/
 [2]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
 [3]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_23/
