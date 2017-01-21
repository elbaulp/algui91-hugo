---
author: alex
categories:
- android
- opensource
color: '#689F38'
lastmod: 2016-09-15
layout: post.amp
mainclass: android
permalink: /fundamentos-programacion-android_16/
tags:
- androidmanifest android
- curso android pdf
- intents android
- startactivityforresult android example
title: "Fundamentos programaci\xF3n Android: Intents y AndroidManifest"
---

## Intents

Las Actividades, Servicios y BroadcastReceiver se activan a través de mensajes asíncronos llamados ***intent***

***Un intent es un objeto que contiene todos los datos del mensaje.***

Hay tres métodos para activar cada uno de los componentes:

<!--more--><!--ad-->

  * Las actividades se muestran pasando un Intent al método ***Context.startActivity()*** o ***Activity.startActivityForResult()***. Una vez lanzada la actividad, dentro de la misma podemos abrir el objeto Intent para obtener los parámetros usando el método ***getIntent()***
  * Para lanzar servicios o interactuar con ellos pasaremos el intent al método ***Context.startService()***. Para analizar el Intent dentro del proceso usaremos ***onBind().***
  * Para pasar los intents a un mensaje de difusión debemos pasar el Intent al método ***Context.sendBroadcast()***, ***Context.sendOrderedBroadcast()*** o ***Context.sendStickyBroadcast()***, así el intent se entregará a todas las clases ***BroadcastReceiver*** que estén escuchando, y podrán analizarlo con ***onReceive().***

## AndroidManifest

Para poder usar un componente, además de crearlo extendiendo de su clase correspondiente, es necesario definirlo en el ***AndroidManifest.xml***. Este archivo podemos editarlo directamente como XML, o con el formulario que nos facilita eclipse.

Cada componente tiene su propia etiqueta xml:

  * `<activity>`: Para actividades.
  * `<service>`: Para servicios.
  * `<receiver>`: Para receptores de mensajes de difusión.
  * `<provider>`: Para proveedores de contenidos.
  * `<intent>`: Para categorizar componentes, así cuando se les llame no hay que saber el nombre del intent, android lo elige basandose en su categoría y parámetros.

## Siguiente Tema: [Fundamentos programación Android: Actividades, Tareas, Procesos e Hilos][1]

 [1]: https://elbauldelprogramador.com/fundamentos-programacion-android_17/
