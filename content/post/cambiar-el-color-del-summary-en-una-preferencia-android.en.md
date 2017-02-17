---
author: alex
categories:
- android
date: 2017-02-17
description: "This example shows how to customize the summary text in an Android preference Activity"
image: 2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png
mainclass: android
tags:
- color summary android preferences
- CUSL
- android preferences
- summary android
- howto
title: "How to change summary color in Android's preferences"
---

In a previous post we shown how to create a [custom dialog for an Android preference][1]. This post shows how to change the summary color in an Android preference. The _summary_ is the text appearing below the preference's title.

<!--more--><!--ad-->

# Getting the default layout

To accomplish this task, first it is necessary to create a custom [layout][2]. Searching in the Android source code I found one in *<a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/res/res/layout/preference_child.xml" target="_blank">frameworks/base/core/res/res/layout/preference_child.xml</a>*. Lets remove unnecessary code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Layout for a visually child-like Preference in a PreferenceActivity. -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:baselineAligned="false"
    android:gravity="center_vertical"
    android:minHeight="?android:attr/listPreferredItemHeight"
    android:paddingEnd="?android:attr/scrollbarSize"
    android:paddingStart="16dip" >

    <RelativeLayout
        android:layout_width="0dip"
        android:layout_height="wrap_content"
        android:layout_marginBottom="6dip"
        android:layout_marginEnd="6dip"
        android:layout_marginTop="6dip"
        android:layout_weight="1" >

        <TextView
            android:id="@+android:id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:ellipsize="marquee"
            android:fadingEdge="horizontal"
            android:singleLine="true"
            android:textAppearance="?android:attr/textAppearanceMedium" />

        <TextView
            android:id="@+android:id/summary"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignStart="@android:id/title"
            android:layout_below="@android:id/title"
            android:maxLines="4"
            android:textAppearance="?android:attr/textAppearanceSmall"
            android:textColor="?android:attr/textColorSecondary" />
    </RelativeLayout>
</LinearLayout>
```

# Layout to show errors

The above layout would be used by default, when an error occurs and want to highlighted, a different layout would be used to indicate to the user where the error is. This layout is identical to the above except for the Summary color. The only necessary change to the previous layout is in the `TextView` with ID ***@android:id/summary***:

***preference\_child\_summary_error.xml***

```xml
<!-- ... -->
android:textColor="@color/red"
<!-- ... -->
```

The [color definition][3] is created in ***./res/values/colors.xml***

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="red">#ff0000</color>
</resources>
```

# Changing color at runtime

With the layouts created, they can be used as required at runtime. In this example, when the user inputs a password that does not meet the security requirements, the summary color is changed:

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

As seen in the previous post, `mDialogoPersonalizado`'s type is `Preference`. When a password of length inferior to 8 characters is introduced by the user, the following message is shown:

<figure>
<a href="/img/2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/02/Cambiar-el-color-del-summary-en-una-Preferencia-Android.png" title="{{ page.title }}" alt="{{ page.title }}" width="419px" height="97px" /></a>
</figure>

 [1]: https://elbauldelprogramador.com/como-crear-un-dialogo-personalizado-en-las-preferencias-android/ "Cómo crear un diálogo personalizado en las preferencias Android"
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_23/ "Programación Android: Interfaz gráfica – Layouts"
 [3]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_18/ "Programación Android: Interfaz gráfica – Estilos y Temas"
