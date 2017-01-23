---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-09-25'
lastmod: 2016-09-29
layout: post.amp
mainclass: android
permalink: /programacion-android-recursos-trabajar_04/
tags:
- curso android pdf
title: "Programaci\xF3n Android: Recursos - Trabajar con recursos Assets"
---

Android ofrece más de un directorio en el que guardar ficheros que se incluirán en el paquete.: ***/assets***. Está en el mismo nivel que el directorio ***/res***, lo que significa que no es parte de los subdirectorios del mismo. A los archivos colocados en en el directorio ***/assets*** no se les generan IDs en R.java. Somos nosotros los que debemos especificar la ruta para leerlo. La ruta al fichero es una ruta relativa que comienza con ***/assets***. Debemos usar la calse ***AssetManager*** para acceder a estos ficheros, como se muestra en el código de abajo:

<!--more--><!--ad-->

```java
String getStringFromAssetFile(Context activity)
   throws IOException
   {
       AssetManager am = activity.getAssets();
       InputStream is = am.open("test.txt");
       String s = convertStreamToString(is);
       is.close();
       return s;
   }
```

## Siguiente Tema: [Programación Android: Recursos - Repasando la estructura del directorio de recursos][1]


 [1]: https://elbauldelprogramador.com/programacion-android-recursos-repasando/