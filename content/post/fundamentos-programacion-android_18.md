---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-03T14:17:34+01:00
url: /fundamentos-programacion-android_18/
tags:
- curso android pdf
title: "Fundamentos programación Android: Limpieza de Procesos"
---

Android va destruyendo componentes inactivos para liberar memória, pero los elminia teniendo en cuenta cual es el de menor importancia:

  * Los primeros en ser elmininados son los procesos vacíos (Son aplicaciones cerradas que se mantienen en memoria para cargar rápidamente la aplicación la proxima vez que se abra.)
  * Procesos en segundo plano, estos son las aplicaciones que ya han ejecutado su método **onStop()**, Android confecciona una lista con los procesos en este estado y elimina en primer lugar el más antiguo.
  * Despues elminina los procesos de servicio. (si sigue necesitando más memoria.)
  * Si aún necesita más memoria, elimina los procesos pausados.
  * Si con esto sigue necesitando, finalmente elimina el proceso en primer plano.

<!--more--><!--ad-->

Es muy importante implementar bien los métodos de estado, para evitar perden información.

# Siguiente Tema: [Programación Android: Trabajar con actividades y pasar parámetros entre ellas][1]

 [1]: https://elbauldelprogramador.com/programacion-android-trabajar-con/
