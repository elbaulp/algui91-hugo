---
author: alex
categories:
- android
color: '#689F38'
date: '2016-12-12'
description: "En un art\xEDculo anterior vimos c\xF3mo crear un di\xE1logo personalizado
  en las preferencias para android. Continuaremos con esa aplicaci\xF3n trivial a
  modo de ejemplo para ver c\xF3mo personalizar el summary que aparece debajo del
  t\xEDtulo de una preferencia."
image: 2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png
lastmod: 2015-12-28
layout: post.amp
mainclass: android
permalink: /cambiar-el-color-del-summary-en-una-preferencia-android/
tags:
- color summary android preferencias
- CUSL
- preferencias android
- summary android
title: Cambiar el color del summary en una Preferencia Android
---

En un artículo anterior vimos [cómo crear un diálogo personalizado en las preferencias][1] para android. Continuaremos con esa aplicación trivial a modo de ejemplo para ver cómo personalizar el *summary* que aparece debajo del título de una preferencia.

<!--more--><!--ad-->

### Obteniendo el Layout por defecto

Al principio, obtuve el *TextView* que representa el summary, pero cambiarle el color no tenía efecto y se quedaba de color gris. La solución final consistió en crear un propio [layout][2]. Buscando en el código fuente de Android lo encontré en *<a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/res/res/layout/preference_child.xml" target="_blank">frameworks/base/core/res/res/layout/preference_child.xml</a>*. A éste recurso hay que quitarle unas cuantas cosas que no nos sirven, quedando así:

```xml
<?xml version='1.0' encoding='utf-8'?>
<!-- Layout for a visually child-like Preference in a PreferenceActivity. -->
<linearlayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="wrap_content" android:baselinealigned="false" android:gravity="center_vertical" android:minheight="?android:attr/listPreferredItemHeight" android:paddingend="?android:attr/scrollbarSize" android:paddingstart="16dip">
<relativelayout android:layout_width="0dip" android:layout_height="wrap_content" android:layout_marginbottom="6dip" android:layout_marginend="6dip" android:layout_margintop="6dip" android:layout_weight="1">
<textview android:id="@+android:id/title" android:layout_width="wrap_content" android:layout_height="wrap_content" android:ellipsize="marquee" android:fadingedge="horizontal" android:singleline="true" android:textappearance="?android:attr/textAppearanceMedium">
</textview><textview android:id="@+android:id/summary" android:layout_width="wrap_content" android:layout_height="wrap_content" android:layout_alignstart="@android:id/title" android:layout_below="@android:id/title" android:maxlines="4" android:textappearance="?android:attr/textAppearanceSmall" android:textcolor="?android:attr/textColorSecondary">
</textview></relativelayout>
</linearlayout>

```

### Layout para mostrar el error

El layout anterior es el que se usará por defecto, cuando queramos resaltar un error usaremos otro exáctamente igual pero con el color del Summary cambiado, como es repetir código simplemente se muestra el nombre del fichero y el cambio en el TextView con ID ***@android:id/summary***:

***preference\_child\_summary_error.xml***

```xml
<!-- ... -->
android:textColor="@color/red"


<!-- ... -->

```

La definición del c[olor se declara][3] en un archivo dentro de la carpeta *values*:
***./res/values/colors.xml***

```xml
<?xml version='1.0' encoding='utf-8'?>
<resources>
<color name="red">#ff0000</color>
</resources>

```

### Cambiar el color en tiempo de ejecución

Ahora que tenemos el diseño listo, veremos cómo cambiarlo cuando ocurra cierta condición. En el caso que nos ocupa necesitaremos resaltar el summary en color rojo cuando el usuario introduzca una contraseña que no cumple con los requisitos establecidos por la aplicación, el código quedará algo así:

```java
if (newValue.toString().length() <= 8) {
    mDialogoPersonalizado.setLayoutResource(R.layout.preference_child_summary_error);
    mDialogoPersonalizado.setSummary("Mensaje de error");
} else {
    mDialogoPersonalizado.setLayoutResource(R.layout.preference_child);
    mDialogoPersonalizado.setSummary("********");
    mEditorDialogoPerso.putString("diagPerso", passw);
    mPasswordDialogoPerso = passw;
    mEditorDialogoPerso.commit();
}

```

Como se vio en el anterior artículo, `mDialogoPersonalizado` es de tipo `Preference`. Cuando se introduzca una contraseña inferior a 8 caracteres, se mostrará el mensaje como aparece en la imagen:

<figure>
<a href="/img/2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png" title="{{ page.title }}" alt="{{ page.title }}" width="419px" height="97px" /></a>
</figure>


 [1]: https://elbauldelprogramador.com/como-crear-un-dialogo-personalizado-en-las-preferencias-android/ "Cómo crear un diálogo personalizado en las preferencias Android"
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_23/ "Programación Android: Interfaz gráfica – Layouts"
 [3]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_18/ "Programación Android: Interfaz gráfica – Estilos y Temas"