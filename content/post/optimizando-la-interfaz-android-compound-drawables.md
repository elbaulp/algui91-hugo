---
author: alex
categories:
- android
color: '#689F38'
date: '2016-01-01'

mainclass: android
url: /optimizando-la-interfaz-android-compound-drawables/
tags:
- android listview con imagenes
- android listview example
- compound drawables
- curso android pdf
- lint warning
- optimizacion de listas android
- optimizar layout
title: Optimizando la interfaz Android - Compound Drawables
---

Hace poco, mientras escribía un [CustomAdapter][1] para una aplicación en la que estoy trabajando, descubrí una nueva característica gracias a la herramienta Lint del sdk, los compound drawables.

#### Compound Drawables

Consiste en simplificar un [layout][2] cuando éste conste de un ImageView y un TextView. Suele ser frecuente encontrarse en una lista de elementos una imagen junto a un texto. Algo así:

<!--more--><!--ad-->


&nbsp;

```xml
<linearlayout><!--....--> >

    <imageview><!--....--> />

    <textview><!--....--> />
</textview></imageview></linearlayout>

```

Si el layout consta de estos dos elementos, Lint muestra el siguiente mensaje : *This tag and its children can be replaced by one <textview> and a compound drawable*. Viene a decir que es posible simplificar el layout eliminando la imagen y usarla dentro del elemento TextView como **Compound Drawable**.

Como es frecuente en Android, hay dos formas de hacer esto, mediante código o mediante XML. Empecemos con el primero:

El método `setCompoundDrawableWithIntrinsicBounds()`, se encarga de unir un ImageView a un TextView, como menciona su documentación:

> Sets the Drawables (if any) to appear to the left of, above, to the right of, and below the text. Use 0 if you do not want a Drawable there. The Drawables&#8217; bounds will be set to their intrinsic bounds.

Los cuatro parámetros que acepta este método son las imágenes a adjuntar al texto, se puede adjuntar a la izquierda, arriba, derecha o abajo. Si solo interesa fijar una imagen a la izquierda del texto, basta con pasar un 0 a los 3 parámetros restantes.

Una vez unida la imagen al texto, con `setCompoundDrawablePadding()` se puede establecer un relleno (padding) para separar el texto de la imagen la distancia deseada, por ejemplo.

```java
TextView tv = (TextView) findViewById( R.id.textView );
tv.setCompoundDrawablesWithIntrinsicBounds( R.drawable.ic_launcher, 0, 0, 0 );
tv.setCompoundDrawablePadding(10);

```

Es posible realizar el proceso anterior mediante XML, en lugar de java:

```xml
</textview><textview android:layout_width="wrap_content" android:layout_height="wrap_content" android:drawableleft="@drawable/ic_launcher" android:drawablepadding="10dp" android:gravity="center_vertical" android:text="@string/text" android:textappearance="?android:attr/textAppearanceSmall">

```

Cos los atributos (`android:drawableLeft`, y `android:drawablePadding`) se logra el mismo resultado.

Con esta pequeña optimización estamos reduciendo el layout de dos a un View, puede parecer poco, pero si usamos esto en un listView con 10 filas por ejemplo, se pintará más rápido y el desplazamiento por la lista será más suave.

### Referencias

*setCompoundDrawablesWithIntrinsicBounds() Android Reference* »» <a href="http://developer.android.com/reference/android/widget/TextView.html#setCompoundDrawablesWithIntrinsicBounds%28int,%20int,%20int,%20int%29" target="_blank">Visitar sitio</a>
*setCompoundDrawablePadding() Android Reference* »» <a href="http://developer.android.com/reference/android/widget/TextView.html#setCompoundDrawablePadding%28int%29" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/adapter-personalizado-en-android/ "Cómo crear un adapter personalizado en Android"
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica/ "Programación Android: Interfaz gráfica – Conceptos básicos"


</textview>
