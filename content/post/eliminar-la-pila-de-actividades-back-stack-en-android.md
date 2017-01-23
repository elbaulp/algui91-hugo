---
author: alex
categories:
- android
color: '#689F38'
date: '2016-01-01'
description: "El concurso universitario de software libre sigue en marcha, como dije
  participo en SWADROID. La \xFAltima implementaci\xF3n que se hizo era a\xF1adir
  una opci\xF3n para cerrar sesi\xF3n. Pero nos dimos cuenta que si el usuario cerraba
  sesi\xF3n desde alguna activity distinta de la princial, no se mostraba la pantalla
  de login, si no la activity en la que estuviera en el momento de cerrar sesi\xF3n.
  Por supuesto, esto no es el comportamiento deseado, lo ideal ser\xEDa que al cerrar
  sesi\xF3n se muestre la pantalla de login independientemente de d\xF3nde se encuentre
  el usuario. Hoy veremos c\xF3mo eliminar la pila de actividades de una aplicaci\xF3n
  Android para obtener este comportamiento."
lastmod: 2015-12-25
layout: post.amp
mainclass: android
url: /eliminar-la-pila-de-actividades-back-stack-en-android/
tags:
- CUSL
- eliminar actividades de la pila Android
- eliminar activities back stack
- swadroid
title: Eliminar la pila de actividades (Back Stack) en Android
---

El concurso universitario de software libre sigue en marcha, como dije participo en <a href="https://play.google.com/store/apps/details?id=es.ugr.swad.swadroid" title="Swadroid Play Store" target="_blank">SWADROID</a>. La última implementación que se hizo era añadir una opción para cerrar sesión. Pero nos dimos cuenta que si el usuario cerraba sesión desde alguna [activity][1] distinta de la princial, no se mostraba la pantalla de login, si no la activity en la que estuviera en el momento de cerrar sesión. Por supuesto, esto no es el comportamiento deseado, lo ideal sería que al cerrar sesión se muestre la pantalla de login independientemente de dónde se encuentre el usuario. Hoy veremos cómo eliminar la pila de actividades de una aplicación Android para obtener este comportamiento.

<!--more--><!--ad-->

Como es habitual, en stackoverflow se encontraba la respuesta, es tan sencillo como crear un [intent][2] con dos **flags**, *<a href="http://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_SINGLE_TOP" title="Referencia" target="_blank">FLAG_ACTIVITY_SINGLE_TOP</a>* para no lanzar un activity si ya se está ejecutando encima de la pila y *<a href="http://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TOP" title="Referencia" target="_blank">FLAG_ACTIVITY_CLEAR_TOP</a>*, que tal y como indica la documentación:

> If set, and the activity being launched is already running in the current task, then instead of launching a new instance of that activity, all of the other activities on top of it will be closed and this Intent will be delivered to the (now on top) old activity as a new Intent.

Es decir, si la actividad que se lanza con el intent ya está en la pila de actividades, en lugar de lanzar una nueva instancia de dicha actividad, el resto de activities en la pila serán cerradas y se resolverá el intent por la actividad a la que se llamó.

Por ejemplo, si la pila contiene las activities A, B, C, D. Si D llama a `startActivity()` con un intent para B, entonces C y D serán finalizadas y B recibe el intent, teniendo ahora en la pila A,B. En nuestro caso tampoco nos interesa que A esté en la pila, por lo que la finalizaremos manualmente.

Un ejemplo sería el siguiente:

```java
startActivity(new Intent(getBaseContext(), SWADMain.class)
                        .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP));
finish();

```

#### Referencias

*Finish all previous activities* »» <a href="http://stackoverflow.com/questions/6330260/finish-all-previous-activities" target="_blank">stackoverflow.com</a>



 [1]: https://elbauldelprogramador.com/fundamentos-programacion-android/ "Fundamentos programación Android: Conceptos básicos y componentes"
 [2]: https://elbauldelprogramador.com/programacion-android-intents-conceptos/ "Programación Android: Intents – Conceptos básicos"
