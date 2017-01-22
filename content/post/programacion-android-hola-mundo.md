---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-09-14
layout: post.amp
mainclass: android
permalink: /programacion-android-hola-mundo/
tags:
- curso android pdf
- hola mundo android
title: "Programaci\xF3n Android: Hola Mundo"
---

> Hay una versión más actualizada, visita [Tutorial Android - Hola Mundo a Fondo](https://elbauldelprogramador.com/android/tutorial-android-hola-mundo-a-fondo/ "Tutorial Android - Hola Mundo a Fondo").

Como [dije][1], voy a comenzar a escribir tutoriales sobre programación Android.

Antes de comenzar es necesario tener configurado correctamente eclipse con el Android SDK, que se puede encontrar en este mismo blog, mediante el [primer videotutorial][2] de una entrada que publiqué hace tiempo, o simplemente buscando en [google][3].

Antes de empezar, quiero comunicar que todas las entradas relacionadas con los tutoriales de Android los colocaré en la página [Android.][4]

En esta entrada vamos a empezar directamente con el típico Hola Mundo (Hello World):

<!--more--><!--ad-->

## CREANDO EL PROYECTO

Arrancamos eclipse con todo configurado correctamente y vamos a Archivo->nuevo->Proyecto Android:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="crear Proyecto Android" alt="crear Proyecto Android"  height="605" width="800" src="https://3.bp.blogspot.com/-yu9kW8WAiD8/Tfjrq_ZBS9I/AAAAAAAAAmU/CX2f8KDBR9A/s800/nuevoProyecto.png"></amp-img>
</figure>

Despues de esto se nos mostrará un dialogo para configurar el proyecto, debemos introducir:

  * El nombre del proyecto. en este caso Hola Mundo
  * Donde queremos crear el proyecto (normalmente dentro del workspace).
  * Versión Android a la que irá destinada la aplicación, en este caso Android 2.2
  * Nombre de la aplicación (El que se mostrará al usuario una vez instalada, Hola Mundo).
  * El Nombre del paquete que se usa como espacio de nombres y estructura de organización del código, &#8220;app.tutorial.holaMundo&#8221;
  * Marcamos la opción ***Crear Actividad*** para que eclipse cree la clase que se lanzará al ejecutar la aplicación. Normalmente a esta clase se le llama ***MainActivity***.
  * Versión Mínima del SDK es la versión mínima necesaria del SDK para ejecutar la aplicación, a menor número, la aplicación correrá en más terminales, pero no podremos usar las últimas caracteristicas de Android.
  * Una vez rellenado todo, le damos a finalizar.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="configuracion proyecto Android" alt="configuracion proyecto Android"  height="625" width="782" src="https://4.bp.blogspot.com/-nhOjIrNDwN8/Tfj1iSJ8I7I/AAAAAAAAAmc/J5ME2LrOGRE/s800/ConfigurarPoryecto.png"></amp-img>
</figure>

Ya hemos creado nuestro primer proyecto Android, ahora vamos a ver de qué se compone:

## COMPONENTES DEL PROYECTO

Los proyectos de Android siguen una estructura fija de carpetas que debemos respetar. Podemos ver esta estructura con la vista ***Package Explorer*** que proporciona eclipse:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Estructura proyectos Android" alt="Estructura proyectos Android"  height="507" width="239" src="https://3.bp.blogspot.com/-8mEhB--FnqI/Tfj3eqQKPhI/AAAAAAAAAmk/mf2HiIbzU8c/s800/estructuraCarpetas.png"></amp-img>
</figure>

### Carpeta src (de fuentes)

Esta carpeta contiene el código fuente organizado en paquetes. Aquí irán las clases java de nuestra aplicación.

### Carpeta gen (archivos generados)

Aquí van los archivos que genera el compilador en sus pasadas, como el archivo de recursos ***R***, esta carpeta normalmente no se debe tocar.

### Carpeta assets (De recursos varios)

Almacena recursos que pueda necesitar nuestra aplicación, como ficheros de música etc.

Podremos acceder a ellos fácilmente con la clase del sistema ***AssetManager***

### Clase de recursos (res)

Esta carpeta es una de la que más vamos a usar junto con ***src***, contiene todos los recursos necesarios para la aplicación. Todos los archivos de esta carpeta son indexados por el compilador y se genera el fichero de recursos ***R***, que nos permite acceder a ellos de una forma rápida.

Está dividida en subcarpetas:

  * ***anim:*** Ficheros XML para la definición de Animaciones.
  * ***color:*** Ficheros XML de definición de colores.
  * ***drawable:*** Ficheros bitmap(.png, .9.png, .jpg, .gif) o XML con contenidos que se dibujarán (fondos, botones etc).
  * ***layout:*** Ficheros XML que definen la capa de interfaz de usuario.
  * ***menu:*** Ficheros XML con la definición de los menús de la aplicación.
  * ***raw:*** Binarios que no se pueden colocar en las otras carpetas.
  * ***values:*** Ficheros XML para la definición de estilos, cadenas de texto para localización etc.
  * ***xml:*** Ficheros XML que pueden ser accedidos en tiempo de ejecución.

Algunas carpetas pueden tener varias versiones para adaptarse a diferentes tamaños de pantallas, idiomas etc.

### El archivo Manifest (AndroidManifest.xml)

Todos los proyectos tienen un archivo como este, en él se detallan las características principales (módulos, permisos, nombre, icono&#8230;).

Ahora que hemos explicado la estructura de un proyecto Android, veamos el ejemplo ***Hola Mundo*** al detalle

## Profundizando en el &#8220;Hola Mundo&#8221;

```java
package app.tutorial.holaMundo;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}
```

Al crear el proyecto dimos nombre a una Actividad (MainActivity), estas clases son las encargadas de mostrar las interfaz gráfica al usuario, deben extender de la clase ***Activity***.

Al crear una activity Android llama a su método ***onCreate()*** que hace lo necesario para mostrar la pantalla al usuario. Tal y como está la actividad al crear el proyecto. Hace una llamada a ***setContentView()***, que tiene como parámetro el identificador de una vista ya creada.

Por lo tanto, ***R.layout.main*** referencia a un archivo xml situado en la carpeta ./res/layout (ficheros de definición de pantalla).

### Archivo ./res/layout/main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
    <linearlayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent">
    <textview
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/hello" />
</linearlayout>
```

En este archivo se define una pantalla en la que los elementos se agruparán de forma lineal (LinearLayout) y con un componente de texto (TextView). Al componente de texto le fijamos el texto a mostrar con la referencia ***@string/hello*** (valor del item en ./res/values/strings.xml)

### Archivo ./res/values/strings.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="hello">Hello World, MainActivity!</string>
    <string name="app_name">Hola Mundo</string>
</resources>
```

Para que la aplicación funcione es necesario crear el AndroidManifest:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="app.tutorial.holaMundo" android:versioncode="1" android:versionname="1.0">
<uses>
    <application android:icon="@drawable/icon" android:label="@string/app_name">
        <activity android:name=".MainActivity" android:label="@string/app_name">
            <intent>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent>
        </activity>
    </application>
</uses>
</manifest>
```

En este archivo se definen el paquete por defecto, datos de versión, icono (mediante una referencia). El nombre de la aplicación (otra referencia al fichero strings.xml). Despues se define el comportamiento de la aplicación. Se añaden dos filtros para que la actividad que definimos anteriormente sea usada como principal (***android.intent.action.MAIN***) y para que sea incluida en el menú de aplicaciones (***android.intent.category.LAUNCHER***)

## Siguiente tema: [Fundamentos programación Android: Conceptos básicos y componentes][5]

 [1]: https://elbauldelprogramador.com/resultados-de-la-encuesta-que-tematica
 [2]: video-tutorial-programacion-android
 [3]: http://lmgtfy.com/?q=instalar+y+configurar+android+sdk+eclipse
 [4]: https://elbauldelprogramador.com/guia-de-desarrollo-android
 [5]: https://elbauldelprogramador.com/fundamentos-programacion-android/