---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-09-20
layout: post.amp
mainclass: android
url: /programacion-android-recursos-usando/
tags:
- curso android pdf
- recursos android
title: "Programaci\xF3n Android: Recursos - Usando recursos"
---

A todos los recursos que colocamos en las subcarpetas de ./res/ se puede acceder a través de la clase R de nuestro proyecto.

Esta clase R la genera el comando aapt en una pasada anterior a la compilación (Eclipse, por defecto, la va generando continuamente conforme cambiamos los recursos). Contiene todos los identificadores de recursos para poder referenciarlos.

Al igual que la carpeta “res”, la clase R se organiza en subclases, así por ejemplo el icono que colocamos en ./res/drawable/icon tiene su correspondencia en R.drawable.icon (que es un identificador estático de tipo int y sirve para acceder al recurso).

<!--more--><!--ad-->

Así pues los ID de recurso están compuestos de:

- Clase R que contienen todos los recursos.
- Subclase de recurso, cada grupo tiene la suya (drawable, string, style, layout&#8230;).
- Nombre del recurso que, según el tipo, será: el nombre del fichero sin la extensión o el atributo xml “android:name” si es un valor sencillo (cadena, estilo, etc.).

Tenemos dos formas de acceder a los recursos definidos en la clase R:

- En el código, accediendo a las propiedades de la clase R directamente (R.string.nombre).
- En los ficheros XML, usando una notación especial: @grupo_recursos/ nombre_recurso, es decir, el recurso anterior se accedería con @string/nombre.

Si lo que queremos es acceder a un recurso definido por el sistema antepondremos el prefijo android:

* Desde el código: `android.R.layout.simple_list_item_1`.
* En los ficheros XML: `@android:layout/simple_list_item_1`.

### Referenciando atributos de estilo

Cuando aplicamos estilos a nuestros layout puede interesarnos acceder a un atributo concreto de un estilo, para eso tenemos una sintaxis específica que podemos usar en nuestros XML:

```xml
?[<nombre_paquete>:][<tipo_recurso>/]<nombre_recurso>
```

Así por ejemplo si queremos colocar un texto pequeño usaremos:

```xml
?android:attr.textAppearanceSmall
```

Si queremos, también podemos utilizar nuestros propios atributos.

Primero lo definimos con un tag “attr”·dentro de `./res/values/attr.xml.`

```xml
<?xml version="1.0" encoding="utf­8"?>
<resources>
     <attr name="cabecera" format="reference" />
</resources>
```

Ahora ya podemos usar esa propiedad en nuestros estilos:

Primero definimos un estilo de texto llamado “TituloRojo”, y luego lo aplicamos al atributo que hemos creado llamado “Cabecera”. Obsérvese que como es un atributo propio, no usamos el espacio de nombres “android:”.

Si luego quisiéramos acceder a este atributo al definir un layout podríamos usar la sintaxis mencionada:

**./res/layout/milayout**

```xml
<?xml version="1.0" encoding="utf­8"?>
<FrameLayout
xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"
     android:layout_height="fill_parent">
<TextView
     android:layout_width="fill_parent
     android:layout_height="fill_parent"
     android:text="No hay datos disponibles"
     style="?attr/cabecera" />
</FrameLayout>
```

**./res/values/style.xml**

```xml
<?xml version="1.0" encoding="utf­8"?>
<resources>
<style name="MiTema" parent=
     "@android:style/Theme.Light">
     <item name="android:windowBackground">
     @drawable/fondo
     <item name="cabecera">
     @style/TituloRojo</item>
</style>
<style name="TituloRojo"
     parent="@android:style/TextAppearance.Large">
     <item name="android:textColor">#FF0000</item>
     <item name="android:textStyle">bold</item>
</style>
</resources>
```

### Siguiente Tema: [Programación Android: Recursos - Strings][1]

 [1]: https://elbauldelprogramador.com/programacion-android-recursos-strings/
