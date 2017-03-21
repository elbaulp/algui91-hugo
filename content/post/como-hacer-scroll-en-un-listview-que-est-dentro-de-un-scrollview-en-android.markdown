---
author: alex
categories:
- android
date: 2015-06-30 16:48:42
lastmod: 2017-03-21T16:36:53+01:00
description: "C\xF3mo solucionar un ListView no capturando el foco cuando est\xE1  dentro de un ScrollView"
mainclass: android
tags:
- android
- Scroll
- ScrollView
- ListView
- setOnTouchListener
title: "C\xF3mo Hacer Scroll en Un ListView Que Est\xE1 Dentro De Un ScrollView en  Android"
---

En [Android](/curso-programacion-android), cuando se tiene un [`ListView`](/programacion-android-interfaz-grafica_28/), dentro de un `ScrollView`, es posible que el último capture todos los eventos `onTouch`, y no sea posible utilizar el `ListView`.

Para solucionar el problema, bastaría con deshabilitar la captura del evento `onTouch` para el `ScrollView`, si lo que estamos pulsando es el `ListView`, es decir:

<!--more--><!--ad-->

Al `ScrollView`, le añadimos un evento `onTouch`. Dentro, recuperaremos el `ListView`, para deshabilitar en su padre la intercepción de eventos `onTouch`. En éste caso, el padre del `ListView` es el `ScrollView`.

```java

miScrollView.setOnTouchListener(new View.OnTouchListener() {

    public boolean onTouch(View v, MotionEvent event) {
        findViewById(R.id.miListView).getParent()
                .requestDisallowInterceptTouchEvent(false);
        return false;
    }
});

```

Al `ListView`, le añadimos también un `onTouch`, y haremos el proceso inverso.

```java

miListView.setOnTouchListener(new View.OnTouchListener() {

    public boolean onTouch(View v, MotionEvent event) {
        v.getParent().requestDisallowInterceptTouchEvent(true);
        return false;
    }
});

```

La documentación oficial del método es:

>Called when a child does not want this parent and its ancestors to intercept touch events with onInterceptTouchEvent(MotionEvent).
This parent should pass this call onto its parents. This parent must obey this request for the duration of the touch (that is, only clear the flag after this parent has received an up or a cancel.
Parameters
disallowIntercept 	True if the child does not want the parent to intercept touch events.

Es decir, le pasaremos `true` cuando la vista hija no quiera que el padre intercepte eventos `onTouch`.
