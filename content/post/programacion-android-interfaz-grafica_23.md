---
author: alex
categories:
- android
- opensource
color: '#689F38'
layout: post.amp
mainclass: android
permalink: /programacion-android-interfaz-grafica_23/
tags:
- "android dise\xF1ar gui"
- como hacer interfaces graficas en android
- curso android layouts
- curso android pdf
- interfaces de usuario android
- interfaz grafica en android
- layout android
- layouts android
- menu android
title: "Programaci\xF3n Android: Interfaz gr\xE1fica - Layouts"
---

Los layout nos permiten posicionar cada objeto gráfico en el lugar que queramos de la pantalla, es decir, nos permite diseñar el aspecto gráfico que va a tener nuestra pantalla. Los layouts son de tipo ***ViewGroup***, una subclase de ***View***

Existen varios tipos de Layouts para Android, vamos a ver los más comunes:

<!--more--><!--ad-->

### FrameLayout

Este tipo de Layout es el más básico, coloca a sus objetos hijos en la parte superior izquierda de la pantalla.

```xml
<?xml version="1.0" encoding="utf-8"?>
<framelayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent">

  <textview
      android:layout_width="fill_parent"
      android:layout_height="wrap_content"
      android:text="@string/hello"/>

  <textview
      android:layout_width="fill_parent"
      android:layout_height="wrap_content"
      android:text="@string/app_name"/>
</framelayout>
```

Como se puede apreciar en en resultado, si hay más de un hijo, los objetos se amontonan unos encima de otros.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="FrameLayout Android" title="FrameLayout Android"  height="436" width="328" src="https://2.bp.blogspot.com/-YNiwbTTpG5Y/TgMwa0LJnoI/AAAAAAAAApg/PKXOsoXfMoU/s800/frameLayout.png"></amp-img>
</figure>

### LinearLayout

Este tipo de layout coloca sus hijos unos detras de otros, también comenzando por la esquina superior izquierda de la pantalla. Podemos colocarlos alineados horizontalmente o verticalmente mediante su propiedad ***android:orientation=&#8221;horizontal \| vertical&#8221;***

```xml
<?xml version="1.0" encoding="utf-8"?>
<linearlayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent">

  <textview
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/app_name"
      android:background="#0ff"/>

  <textview
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/hello"
      android:background="#ff0"/>
</linearlayout>
```

En este caso, he pueso un fondo de color a cada texto (con la propiedad ***android:background***) para diferenciarlo bien, y he usado la horientación horizontal, de haber usado la orientación vertical, los textos aparecerían uno debajo del otro:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="LinearLayout Android" title="LinearLayout Android"  height="435" width="326" src="https://3.bp.blogspot.com/-tT2G6ADQahI/TgM14QuwAjI/AAAAAAAAApw/PqPNv1ryoTs/s800/LinearLayout.png"></amp-img>
</figure>

### RelativeLayout

Este Layout permite que coloquemos los elementos en un lugar con respecto a la posición de otro, es decir, colocar un botón a la derecha de un texto, o centrarlo en la pantalla, o por ejemplo, colocar un texto encima de tal elemento y a la derecha de este otro.

Para conseguir esto, ***RelativeLayout*** proporciona propiedades como ***android:layout\_toRightOf o android:layout\_alignLeft***, que toman como valores los identificadores de los objetos, o valores booleanos.

```xml
<?xml version="1.0" encoding="utf-8"?>
<relativelayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent">

  <textview
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/app_name"
      android:background="#0ff"
      android:layout_centerinparent="true"
      android:id="@+id/text1"/>

  <textview
      android:id="@+id/text2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/hello"
      android:background="#ff0"
      android:layout_below="@id/text1"/>

</relativelayout>
```

Como vemos, hemos centrado el texto1 en la pantalla con ***android:layout_centerInParent=&#8221;true&#8221;*** y hemos puesto debajo del texto1 al texto2 con ***android:layout_below=&#8221;@id/text1&#8243;***

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="relativeLayout Android" alt="relativeLayout Android"  height="437" width="326" src="https://1.bp.blogspot.com/-pB2RUTDnOSg/TgOGYaZCVaI/AAAAAAAAAp4/r_qjr4tJoKc/s800/RelativeLayout.png"></amp-img>
</figure>

### Siguiente Tema: [Programación Android: Interfaz gráfica - Componentes gráficos y Eventos][1]

 [1]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_25/
