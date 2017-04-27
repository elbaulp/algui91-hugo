---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-04-27T13:01:19+01:00
mainclass: android
url: /fundamentos-programacion-android-ciclo/
tags:
- ciclo de vida
- componentes android
- curso android pdf
- "Fundamentos programación Android"
title: "Fundamentos programación Android: Ciclo de vida de los componentes"
---

Cada componente tiene un ciclo de vida distinto. Las superclases de estos componentes tienen métodos ***callback*** que les permiten reaccionar ante un cambio de estado. Cada método callback está obligado a llamar al mismo método de su padre.

# Ciclo de vida de los Receiver

Tienen un ciclo de vida muy corto, ya que se activan al producirse un mensaje de difusión, que capturan con el método callback:

<!--more--><!--ad-->

```java
void onReceive(Context curContext, Intent broadcastMsg)
```

Si este método se está ejecutando, se considera el Receiver activo. Esto supone un problema si la tarea a ejecutar es pesada y la lanzamos a un hilo aparte. Cuando termine el método, Android considera que el receiver está inactivo, pero el hilo sigue ejecutándose y puede ser eliminado de la pila, interrumpiendo la tarea.

Se soluciona lanzando un servicio desde este método que se encarga de hacer las tareas pesadas, así, al tener el servicio su propio ciclo de vida, seguirá ejecutandose, aunque el receiver se considere inactivo.

# Ciclo de vida de los ContentProvider

Su ciclo es muy corto, permanecen activos mientras sean referenciados por un ContentResolver.

# Ciclo de vida de las Actividades

Tiene tres estados:

  * ***Activo:*** La actividad se encuentra en primer plano (Encima de la pila de tareas) e interactuando con el usuario.
  * ***Pausado:*** La actividad sigue siendo visible para el usuario, pero ha perdido el foco. Por ejemplo que se haya mostrado un cuadro de dialogo delante de nuestra actividad. Debemos guardar el estado de la interfaz y los datos de esta actividad antes de entrar en este estado, ya que podríamos perderlos si el sistema necesita más recursos de memoria.
  * ***Parado:*** La actividad no es visible para el usuario, queda a disposición del sistema para borrarla de la pila en caso de necesitar memoria.

La clase Activity dispone de métodos que se llaman cada vez que ésta cambia de estado, para permitirnos realiar tareas como guardar los datos antes de cambiar de estado, y cargar la actividad más rápido la proxima vez que se muestre. A continuación un diagrama con los distintos estados por los que pasa una actividad:

<figure>
    <amp-img sizes="(min-width: 545px) 545px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="ciclo de vida actividades" alt="ciclo de vida actividades"  height="711" width="545" src="https://4.bp.blogspot.com/-rzvsPpVkc5s/TfsiicRNDwI/AAAAAAAAAng/UkVWUYQySbM/s1600/activity_lifecycle.png"></amp-img>
</figure>

  * ***onCreate(Bundle savedInstanceState):*** Este método se llama al crear la actividad. Siempre se sobreescribe para configurar la vista, crear adaptadores, rellenar los objetos con sus valores etc. Puede recibir como parámetro el estado anterior de la actividad para que podamos restaurarla.
  * ***onPause():*** Es llamado justo antes de que se traiga a primer plano otra actividad. Aquí es donde debemos guardar los datos para no perder la información de la actividad si esta es sacada de la pila. Dentro de este método también se suele parar las tareas pesadas que consuman CPU.
  * ***onStop():*** Es llamado cuando la actividad se va a ocultar durante un largo periodo de tiempo. Si el sistema necesita recursos, puede que este método no sea llamado, por lo que es recomendable guardar los datos en el método ***onPause().***
  * ***onDestroy:*** Último en llamarse antes de destruir la actividad. Puede llamarse a través del método ***finish()*** o llamarlo el sistema para conseguir más memoria. Para saber quién lo llamó, podemos usar ***isFinishing().***

Un ejemplo de uso de estos métodos puede ser cuando tenemos una aplicación que carga datos de internet, deberíamos cargar los datos al inicio de la actividad, una vez descargados, guardaríamos el estado de la actividad para que si es destruida, no sea necesario volver a descargar los datos.

Para realizar esta operación usaríamos el método ***onSavedInstanceState()***, que crearía un ***Bundle*** con los datos necesarios que pasaríamos al método ***onCreate()*** la segunda vez que cargaramos la actividad, sin necesidad de volver a descargar los datos.

# Ciclo de vida de Service

Los servicios se pueden usar de dos formas, dependiendo de como lo lancemos, su ciclo será uno u otro.

  * Si lo lanzamos con ***startService()*** se ejecurará hasta que termine. Los servicios se configurar en el método ***onCreate()*** y se liberan en el ***onDestroy()***. Podemos terminar un servicio externamente con ***Context.stopService()*** o dentro del mismo servicio con ***Service.stopSelf() o Service.stopSelfResult().***
  * Si lo lanzamos con ***Context.bindService()*** podremos interactuar con él mediante una interfaz que el servicio debe exportar. Terminaremos el servicio con ***Context.unbindService().***

A continuación el diagrama con el ciclo de vida de los servicios:

<figure>
    <amp-img sizes="(min-width: 432px) 432px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Ciclo de vida servicios" title="Ciclo de vida servicios"  height="521" width="432" src="https://2.bp.blogspot.com/-7eOY6RsbVQ0/TfsqCsNCg0I/AAAAAAAAAno/y-bkegRUNiw/s1600/service_lifecycle.png"></amp-img>
</figure>

# Siguiente Tema: [Fundamentos programación Android: Limpieza de Procesos][1]

 [1]: https://elbauldelprogramador.com/fundamentos-programacion-android_18/
