---
author: alex
categories: android
color: '#689F38'
date: 2015-12-14 07:53:53
description: "En este primer art\xEDculo veremos los conceptos fundamentales que componen
  una aplicaci\xF3n Android."
image: hotlink-ok/activityLifecycle.png
layout: post.amp
mainclass: android
modified: null
tags:
- Curso de Android
- "programaci\xF3n Android"
- tutoriales Android
- NPI
title: "Programaci\xF3n Android - Conceptos b\xE1sicos"
---

Conceptos básicos Android
=========================

-   **View:** Representa el componente básico en el que se apoyan
    todos los elementos que construyen una interfaz. Todos los elementos
    que generan interfaces heredan de la clase `View`
-   **Activity:** Encargada de mostrar la interfaz de
    usuario e interactuar con él. Responden a los eventos generados por
    el usuario (pulsar botones etc). Heredan de la clase
    [`Activity`](http://developer.android.com/reference/android/app/Activity.html).
-   **Services:** No tienen interfaz visual y se ejecutan
    en segundo plano, se encargan de realizar tareas que deben continuar
    ejecutandose cuando nuestra aplicación no está en primer plano.
    Todos los servicios extienden de la clase `Service`
-    **Content Provider:** Ponen un grupo de datos a disposición de distintas aplicaciones, extienden de la clase ContentProvider para implementar los métodos de la interfaz, pero para acceder a esta interfaz se ha de usar una clase llamada ContentResolver.
-   **BroadcastReceiver:** Simplemente reciben un mensaje
    y reaccionan ante él, extienden de la clase BroadcastReceiver, no
    tienen interfaz de usuario, pero pueden lanzar Actividades como
    respuesta a un evento o usar NotificationManager para informar al
    usuario.
-   **Intent:** Permite realizar la comunicación y
    transferencia de datos entre objetos de la clase Activity o Service.
    También permite iniciar otras Activities o lanzar otras
    aplicaciones.

<!--more--><!--ad-->

Hola Mundo
==========

Veamos ahora cómo crear la típica aplicación _Hola Mundo_ .

Crear el proyecto
-----------------

Para ello, en Android Studio, hacemos click en _File » New Project_. Una vez creada, veremos que la estructura de la aplicación es la mostrada en la imagen.


Componentes del proyecto
------------------------

Los proyectos de Android siguen una estructura fija de carpetas que
debemos respetar.

<figure>
  <a href="/img/android/estructuraCarpetas.png"><amp-img layout="responsive" src="/img/android/estructuraCarpetas.png" title="{{ page.title }}" alt="{{ page.title }}" /></a>
</figure>

### Carpeta Res

Esta es una de las carpeta que más se va a usar junto con `src`. Se
compila y se generan referencias en la clase `R`, para acceder a ellos
desde código. Están escritos en `XML`. El propósito de esta carpeta es separar la lógica de la aplicación de la interfaz.

-   `anim`: Definición de Animaciones.
-   `color`: Definición de colores
-   `drawable`: Ficheros bitmap(.png, .9.png, .jpg, .gif) o XML con contenidos que se dibujarán (fondos, botones etc).
-   `layout`: Definen la capa de interfaz de usuario
-   `menu`: Definición de los menús de la aplicación
-   `raw`: Binarios que no se pueden colocar en las otras carpetas.
-   `values`: Definición de estilos, cadenas de texto para Localización etc.
-   `xml`: Ficheros XML que pueden ser accedidos en tiempo de ejecución

## Hola Mundo

Pasemos ahora a describir los distintos componentes de la aplicación.

La apliación creada por defecto tendrá un _Activity_ muy simple, uno de los métodos más importantes de esta clase es `onCreate`, en él se crean y se instancias los componentes necesarios para dicha _Activity_, se instancias componentes gráficos, se establecen los _callbacks_ necesarios, eventos etc. El código más simple que se puede obtener en este método es el siguiente:

```java

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  /**
   * Método encargado de “inflar” la actividad.
   * Inicializar cada componente de la actividad
   * con su correspondiente View.
   */
  setContentView(R.layout.activity_main);
}

```

Es importante añadir la línea `setContentView(R.layout.activity_main);`, ya que aquí se define qué _layout_ (Interfaz gráfica) va a usar esta _Activity_. De no añadirla, cualquier referencia que intentemos hacer de un componente gráfico fallará.

## Ciclo de vida de una Activity

La siguiente imagen muestra el ciclo de vida de una _Activity_, esto es qué flujo de llamadas siguen las aplicaciones. Como vemos, `onCreate` es el primero método en llamarse al lanzar una _Activity_, es por ello que en él debemos hacer todas las inicializaciones necesarias. Si lo necesitamos, podemos implementar todos y cada uno de estos métodos. Por ejemplo, en una aplicación de vídeo, interesará detener la reproducción cuando se recibe una llamada, o cuando la pantalla se apaga, toda esa lógica deberá ir en el método `onPause` o `onStop`, y debería reanudarse implementando la lógica en `onRestart` o `onResume`.

<figure>
  <a href="/img/android/activityLifecycle.png"><amp-img layout="responsive" src="/img/android/activityLifecycle.png" title="{{ page.title }}" alt="{{ page.title }}" /></a>
</figure>

### ./res/layout/activity\_main.xml

Este es el fichero que especifica qué interfaz gráfica queremos en nuestra _Activity_ (Recordemos la llamada `setContentView(R.layout.activity_main);`). En este caso, la interfaz es un simple `TextView` que mostrará el mensaje _Hola Mundo_. (El texto se ha especificado haciendo referencia al fichero de cadenas (_strings.xml_) definido más abajo, en concreto se hace referencia a la cadena de texto de valor `hello_world`).

```xml

<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/hello_world" />
</RelativeLayout>

```

### ./res/values/strings.xml

Aquí se definen las cadenas de texto a usar en la aplicación. Siempre deben escribirse en un fichero `XML` dentro de la carpeta `values`, ya que de este modo podremos traducir la aplicación a otro idioma fácilmente con tan solo crear otra carpeta llamada `values-de`, por ejemplo, que contenga las cadenas de texto en Alemán. En este caso, se crea una única cadena de texto de nombre `hello_world` y de valor _Hello World!_.

```xml

<resources>
    <string name="hello_world">Hello world!</string>
</resources>

```

En el [siguiente artículo](/android/tutorial-android-hola-mundo-a-fondo/ "Tutorial Android Hola mundo a fondo") se verá a fondo la aplicación _Hola Mundo_ tal y como la crea en estos momentos _Android Studio_, usando _Fragments_ en lugar de _Activity_.
{: .notice-info }

<!-- <a href="/tutorial-android-hola-mundo-a-fondo/" class="btn btn-info">Siguiente artículo: Hola Mundo a fondo</a> -->
