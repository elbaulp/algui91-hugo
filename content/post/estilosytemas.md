---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-02T17:49:32+01:00
url: /programacion-android-interfaz-grafica_18/
tags:
- layout android
title: "Programación Android: Interfaz gráfica - Estilos y Temas"
---

Un estilo es una colección de propiedades que especifican que aspecto ha de tener un objeto View o una ventana. Con los estilos podemos definir propiedades como la altura, relleno, color del texto, fondo etc. Los estilos en Android comparten la filosofía de las hojas de estílo en cascada (CSS), permitiendo separar el diseño del contenido.

Como podemos comprobar con este ejemplo, el código queda mucho más límpio usando estilos:


<!--more--><!--ad-->

Sin estilos:

```xml
<textview android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:textColor="#00FF00"
    android:typeface="monospace"
    android:text="@string/hello" />
```

Con estilos:

```xml
<textview style="@style/CodeFont"
    android:text="@string/hello" />
```

# Definiendo estilos

Los estilos se definen en un fichero de recursos distinto al layout, colocado en el directorio /res/values. Éstos ficheros no tienen porqué tener un nombre en concreto, pero por convención se suelen llamar ***styles.xml ó themes.xml***

El nodo raiz de estos archívos debe ser ***<resources></resources>***.

Para cada estilo que queramos definir, hay que añadir un elemento ***


 y un atributo ***name*** para ese estílo (es obligatorio), después, añadiremos un elemento `<item>` para cada propiedad del estilo, que debe tener obligatoriamente el atributo ***name*** que declara la propiedad del estilo y su valor. Los valores para `<item>` pueden ser una palabra clave, valor hexadecimal, una referencia a un recurso u otro valor dependiendo de la propiedad del estilo. Veamos un ejemplo:

```xml
<style name="CodeFont" parent="@android:style/TextAppearance.Medium">
    <item name="android:layout_width">fill_parent</item>
    <item name="android:layout_height">wrap_content</item>
    <item name="android:textColor">#00FF00</item>
    <item name="android:typeface">monospace</item>
</style>
```

En tiempo de compilación, los elementos se convierten en un recurso que podremos referenciar posteriormente mediante el atributo name del estilo, como vimos en el primer ejemplo (***@style/CodeFont***).

El atributo ***parent*** es opcional y especifica el ID de otro estilo del cual queremos heredar sus propiedades, pudiendo así sobreescribirlas.

# Herencia

Como acabamos de ver, el atributo parent sirve para heredar propiedades de otros estilos, podemos heredar tanto de estilos del sistema como de los nuestros propios:

Del sistema:

```xml
<style name="GreenText" parent="@android:style/TextAppearance">
    <item name="android:textColor">#00FF00</item>
</style>
```

De nuestros propios estilos:

```xml
<style name="CodeFont.Red">
    <item name="android:textColor">#FF0000</item>
</style>
<style name="CodeFont.Red.Big">
    <item name="android:textSize">30sp</item>
</style>
```

En este caso, no usamos el atributo parent, ya que estamos usando un estilo propio, también se puede apreciar que podemos heredar cuantas veces queramos, como es el caso de (***CodeFont.Red.Big***)

# Aplicar estilos y temas a la interfaz gráfica

Hay dos formas de aplicar estilos a la UI:

* A una View individual, añadiendo el atributo style a un elemento del layout.
* A una aplicación o actividad completa, mediante el atributo ***android:theme*** del elemento `<activity> o <application>` en el Android manifest.

Como vimos al principio, para aplicar un estilo a una View concreta usamos ***style=&#8221;@style/NombreDelEstilo***

Para aplicar un tema a una actividad o aplicación usaremos:

```xml
<application android:theme="@style/CustomTheme">
</application>
```

Para aplicarlos sobre actividades, usamos:

```xml
<activity android:theme="@android:style/Theme.Dialog"></activity>
<activity android:theme="@android:style/Theme.Translucent"></activity>
```

En este caso, estos temas ya vienen predefinidos, y se ven así, respectivamente:

<figure>
    <a href="https://3.bp.blogspot.com/-xNsjnNc-zek/TiR5wvxSZhI/AAAAAAAAAsE/O3AMPDV-dU8/s1600/dialog.png"  ><amp-img sizes="(min-width: 400px) 400px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="240" src="https://3.bp.blogspot.com/-xNsjnNc-zek/TiR5wvxSZhI/AAAAAAAAAsE/O3AMPDV-dU8/s400/dialog.png" /></a>
</figure>

<figure>
    <a href="https://3.bp.blogspot.com/-_EEUkaXoSd0/TiR50goq7tI/AAAAAAAAAsM/yNHm5WdG6b0/s1600/translucid.png"  ><amp-img sizes="(min-width: 400px) 400px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="240" src="https://3.bp.blogspot.com/-_EEUkaXoSd0/TiR50goq7tI/AAAAAAAAAsM/yNHm5WdG6b0/s400/translucid.png" /></a>
</figure>

A continuación, dejo una captura del ejemplo que he hecho para esta entrada, que se puede descargar desde:

<figure>
    <a href="https://3.bp.blogspot.com/-3lk1C3aehjI/TiR8Xj6GwGI/AAAAAAAAAsU/ZlAzXKyo-A0/s1600/device-2011-07-18-203800.png"  ><amp-img sizes="(min-width: 400px) 400px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="240" src="https://3.bp.blogspot.com/-3lk1C3aehjI/TiR8Xj6GwGI/AAAAAAAAAsU/ZlAzXKyo-A0/s400/device-2011-07-18-203800.png" /></a>
</figure>


Para saber más acerca de los estilos y temas visite la página oficial: [Applying Styles and Themes][1]

# Siguiente Tema: [Programación Android: Recursos - Introducción][2]

 [1]: http://developer.android.com/guide/topics/ui/themes.html
 [2]: https://elbauldelprogramador.com/programacion-android-recursos/
