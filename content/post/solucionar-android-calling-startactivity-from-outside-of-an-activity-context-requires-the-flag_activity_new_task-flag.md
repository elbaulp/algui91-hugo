---
author: alex
categories:
- android
color: '#689F38'
layout: post.amp
mainclass: android
permalink: /solucionar-android-calling-startactivity-from-outside-of-an-activity-context-requires-the-flag_activity_new_task-flag/
tags:
- error Calling startActivity from outside of an Activity context requires the FLAG_ACTIVITY_NEW_TASK
  flag android
title: Solucionar el error en Android Calling startActivity from outside of an Activity  context
  requires the FLAG_ACTIVITY_NEW_TASK flag
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/android2.png" alt="Solucionar el error en Android Calling startActivity from outside of an Activity  context requires the FLAG_ACTIVITY_NEW_TASK flag" width="132px" height="154px" />
En una aplicación que estoy haciendo, la cual espero poder presentar en el blog en breve, me encontré con un problema que llevó un tiempo solucionar. La aplicación terminaba inesperadamente al intentar lanzar una actividad desde un [Servicio][1], concretamente el error era:

***
Calling startActivity from outside of an Activity context requires the FLAG\_ACTIVITY\_NEW_TASK flag
***

Así que como es habitual busqué en stackoverflow y encontré la solución, el código que generaba el problema era el siguiente:

<!--more--><!--ad-->

```java
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, name);
sendIntent.setType("text/plain");
sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
startActivity(Intent.createChooser(sendIntent, "Compartir en");

```

### La solución

Sin embargo, aún añadiendo el Flag *FLAG\_ACTIVITY\_NEW_TASK* el error persistia. El problema reside en que el método ***<a href="http://developer.android.com/reference/android/content/Intent.html#createChooser%28android.content.Intent,%20java.lang.CharSequence%29" target="_blank">createChooser()</a>***, devuelve un nuevo [intent][2], según la documentación, y por tanto el flag que acabamos de añadir no se copia automáticamente en el nuevo intent y es necesario volver a añadirlo.

Una posible solución es:

```java
startActivity(Intent.createChooser(sendIntent, "Compartir en")
   .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));

```

De esta forma el error ***Calling startActivity() from outside of an Activity context requires the FLAG\_ACTIVITY\_NEW_TASK flag*** deberá estar solucionado.

#### Referencias

*Solución en Stackoverflow* »» <a href="http://stackoverflow.com/questions/14529492/context-wants-flag-activity-new-task-but-ive-already-set-that-flag" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/fundamentos-programacion-android/
 [2]: https://elbauldelprogramador.com/programacion-android-intents-conceptos/
