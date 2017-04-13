---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-09-17

mainclass: android
url: /fundamentos-programacion-android_17/
tags:
- Actividades
- android
- curso android pdf
- "Fundamentos programación Android"
- Hilos
- Procesos
- Tareas
title: "Fundamentos programación Android: Actividades, Tareas, Procesos e Hilos"
---

## Actividades y tareas

Las actividades conforme se van ejecutando van apilandose en una pila. Cuando finalizamos una actividad, con el método ***finish()*** o con la tecla atrás del teléfono, la actividad se extrae de la pila, quedando encima de la pila la actividad que se abrió anteriormente.

Si ejecutamos una actividad varias veces sin cerrarla, ésta aparecerá en la pila tantas veces como la hayamos ejecutado. La pila de actividades se envía al segundo plano cuando la aplicación pierde el foco, y vuelve al primer plano cuando la aplicación vuelve a tomar el control.

<!--more--><!--ad-->

Podemos modificar este comportamiento con ***flags*** que pasamos al objeto Intent a partir de las propiedades de la activity descritas en el [AndroidManifest][1]

Si una pila de tareas se abandona por el usuario durante un periodo de tiempo y el sistema necesita más recursos, se limpia la pila de actividades (excepto la actividad principal), este comportamiento se puede modificar en el manifiesto:

| Atributo              	| Función                                                                                               	|
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| `alwaysRetainTaskState` 	| Si vale true, se mantiene la pila aunque se abandone durante mucho tiempo                             	|
| `clearTaskOnLaunch`     	| Si es true, se limpia la pila (excepto la actividad principal) cada vez que se lleve al segundo plano 	|
| `finishOnTaskLaunch`    	| Similar a la anterior, pero solo se aplica a la actividad con este atributo fijado a true.            	|


## Procesos e Hilos

Como cada aplicación se ejecuta en un proceso Linux distinto, todos los componentes y procesos de dicha aplicación corren en el mismo hilo. Esto se puede modificar con el atributo ***process*** de cada componente (activity, provider, receiver y service). En la etiqueta ***application*** del manifest podemos poner este atributo para que sea aplicado a todos sus elementos.

Para gestionar tareas pesadas podemos usar hilos para ejecutar dichas tareas en un hilo aparte (ejecutarlas en segundo plano). Para llevar a cabo esta operación usaremos el objeto ***Thread*** de java, aunque Android proporciona otros objetos para facilitar el trabajo, como ***Handler, AsyncTask o Looper.*** (entre otros).

## Siguiente Tema: [Fundamentos programación Android: Ciclo de vida de los componentes][2]

 [1]: http://developer.android.com/guide/topics/manifest/manifest-intro.html
 [2]: https://elbauldelprogramador.com/fundamentos-programacion-android-ciclo/
