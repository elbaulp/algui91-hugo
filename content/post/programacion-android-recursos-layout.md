---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-09-20

mainclass: android
url: /programacion-android-recursos-layout/
tags:
- curso android pdf
- layout android
title: "Programación Android: Recursos - Layout"
---

## Introducción

En Android, cada pantalla de una aplicación habitualmente se carga desde un fichero XML que actua de recurso. Un recurso layout es un recurso clave que se usa en Android para componer la UI de nuestra aplicación. Vamos a considerar el segmenteo de código siguiente como ejemplo de una [actividad][1] en Android.

<!--more--><!--ad-->

```java
public class PrincipalActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}
```

La línea ***setContentView(R.layout.main);*** señala que hay una clase estática llamada *R.layout* y, que dentro de esa clase hay una constante entera llamada *main* que apunta a una vista definida por un fichero de recursos layout xML. El nombre del fichero XML es main.xml, el cual debe estar en el directorio *./res/layout*. El contenido de este fichero es el siguiente:

```xml
<?xml version="1.0" encoding="utf­8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    >
    <TextView
        android:id="@+id/text1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/hello" />
    <Button
        android:id="@+id/b1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/hello"/>

</LinearLayout>
```

Vamos a ver la composición de este fichero, como elemento raiz tenemos un elemento llamado `<linearlayout>`, que contiene un *TextView* seguido de un *Button*. Un LinearLayout coloca a sus hijos uno detrás de otro vertical u horizontalmente.

Para cada pantalla que queramos hacer, necesitaremos ficheros layout distintos, mejor dicho, cada layout debe estar en un fichero, como ***./res/layout/screen1.xml y ./res/layout/screen2.xml***

Por cada archivo de layout que tengamos en `./res/layout`, se generará una entrada en R.java. Por ejemplo, si tenemos estos dos archivos, file1.xml y file2.xml, en R.java aparecerá:

```java
// ...
public static final class layout {
   public static final int file1=0x7f030000;
   public static final int file2=0x7f030001;
}
// ..
```

Las vistas definidas en estos layout, como el TextView son accesibles mediante código java a través sus IDs de recursos generadas en R.java.

```java
TextView tv = (TextView) this.findViewById(R.id.text1);
tv.setText("Texto para el TextView")
```

En este ejemplo, hemos localizado el TextView usando el método ***findViewById()*** de la clase Activity. La constante *R.id.text1* corresponde al ID definido para el TextView en el fichero XML, que creamos de la siguiente manera:

```xml
<TextView
        android:id="@+id/text1"
....
/>
```

El valor del atributo id, indica que la constante llamada text1 será usada para identificar únicamente a esa vista. El signo + de ***+id/text1*** significa que el ID text1 será creado si no existe. En la siguiente entrada se tratará la sintaxis de los recursos.

## Siguiente Tema: [Programación Android: Recursos - Sintaxis de los Recursos][2]

 [1]: https://elbauldelprogramador.com/fundamentos-programacion-android_17/
 [2]: https://elbauldelprogramador.com/programacion-android-recursos-sintaxis/
