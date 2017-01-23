---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-09-25'
lastmod: 2016-09-16
layout: post.amp
mainclass: android
permalink: /fundamentos-programacion-android/
tags:
- "conceptos b\xE1sicos y componentes Android"
- curso android pdf
- "Fundamentos programaci\xF3n Android"
title: "Fundamentos programaci\xF3n Android: Conceptos b\xE1sicos y componentes"
---

## Conceptos básicos

[Hemos visto][1] que un proyecto Android está formado por varias carpetas estructuradas, pero lo que se instala en los dispositivos es un fichero con extensión ***.apk (application package)***.

Estos ficheros se generan con la herramienta apk (En el directorio tools del SDK) al terminar de compilar.

Las aplicaciones en Android tienen su propio entorno seguro de ejecución:

<!--more--><!--ad-->

  * Cada aplicación se ejecuta en su propio proceso Linux. El sistema lo crea cuando ejecutamos la aplicación y lo destruye cuando no se use pasado un rato o cuando el Sistema necesite recursos para otra aplicación
  * Cada proceso se ejecuta en su propia máquina virtual, de esta manera está aislada del resto. De esta forma ante cualquier fallo en la aplicación solo afecta a su máquina virtual, no al resto.
  * A cada aplicación se le asigna un identificador de usuario ***(uid)*** distinto. Los permisos de los archivos que refieren a la aplicación (caché, datos etc) son solo accesibles por dicho usuario. Es posible asignar un mismo ***uid*** a dos aplicaciones para que compartan una misma máquina virtual y recursos.

## Componentes de las aplicaciones

La característica principal de Android es la reutilización de componentes de una aplicación por otra.

Por ejemplo, imaginemos que estamos desarrollando una aplicación que almacena datos de libros junto con una fotografía de su portada. En lugar de tener que escribir el código para capturar o seleccionar la imagen de la portada, podemos pasar el control a la aplicación de la cámara del teléfono, o a la galería, así una vez tomemos una foto o seleccionemos una imagen de la galería se nos devuelve el control a nuestra aplicación con la imagen seleccionada.

Para poder realizar estas operaciones, estamos obligados a dividir nuestras aplicaciones en módulos independientes que solo realicen una tarea concreta.

Veamos ahora otro ejemplo, muchos terminales tienen la opción de compartir algo en las redes sociales, por ejemplo Twitter, un módulo claramente definido de esta aplicación es por ejemplo la opción de ***&#8220;enviar un mensaje o tweet&#8221;***, si seguimos la filosofía de dividir nuestras aplicaciones en módulos, la función de enviar un mensaje sería una actividad independiente que recibe como parámetro el mensaje a enviar, si no recibe parámetro se mostrará el formulario para escribirlo. Dicha actividad usará la API de Twitter para enviar el mensaje y finalmente cerrará la actividad devolviendo el control a la aplicación que la llamó. De esta forma, y con los filtros adecuados en el ***AndroidManifest.xml***, cada aplicación que quiera compartir algo en twitter llamará a esta actividad pasandole como parámetro el mensaje.

Con esto llegamos a la conclusión de que las aplicaciones Android no tienen un punto de entrada y otro de salida, podemos definir todos los que necesitemos.

Para realizar todas estas operaciones, Android proporciona cuatro tipos de ***componentes básicos***:

### Actividades (Activity)

Son las encargadas de mostrar la interfaz de usuario e interactuar con él. Responden a los eventos generados por el usuario (pulsar botones etc). Heredan de la clase ***Activity***

El aspecto de la actividad se aplica pasando un objeto View(Encargado de dibujar una parte rectangular en la pantalla, pueden contener más objetos View, además todos los componentes de la interfaz (botones, imagenes etc) heredan de View) al método ***Activity.setContentView()***, que es el método encargado de dibujar la pantalla. Normalmente las vistas ocupan toda la pantalla, pero se pueden configurar para que se muestren como flotantes. Las actividades también pueden llamar a componentes que se mostrarán sobre su View (como dialogos o menús).

Por cada pantalla distinta hay una actividad distinta, normalmente las aplicaciones tienen una actividad fijada como punto de entrada. Por ejemplo:

Una aplicación que lee el correo tendrá las siguientes actividades:

  * RecibidosActivity: muestra el listado de mensajes recibidos.
  * LeerMensajeActivity: Muestra el contenido de un mensaje.
  * CrearMensajeActivity: recibe como parámetro los datos necesarios, si no hay, muestra el formulario para rellenarlos y envia el mensaje.

Para esta aplicación definimos como punto de entrada ***recibidosActivity*** y ***CrearMensajeActivity***, para que otras aplicaciones puedan reutilizarlas.

### Servicios

No tienen interfaz visual y se ejecutan en segundo plano, se encargan de realizar tareas que deben continuar ejecutandose cuando nuestra aplicación no está en primer plano. Todos los servicios extienden de la clase ***Service***

Continuando con el ejemplo anterior, la aplicación de correo tendrá un servicio que comprobará y descargará nuevos correos. Es posible lanzar o conectar con un servicio en ejecución con la interfaz que proporciona la clase ***Service.***

Los servicios disponen de un mecanismo para ejecutar tareas pesadas sin bloquear la aplicación ya que se ejecutan en un hilo distinto.

### Receptores de mensajes de distribución (BroadcastReceiver)

Simplemente reciben un mensaje y reaccionan ante él, extienden de la clase ***BroadcastReceiver***, no tienen interfaz de usuario, pero pueden lanzar Actividades como respuesta a un evento o usar ***NotificationManager*** para informar al usuario.

Android habitualmente lanza muchas notificaciones de sistema (llamadas entrantes, nuevos correos, nuevos sms etc). Si ponemos como ejemplo la aplicación del correo mencionada anteriormente, esta tendría un ***BroadcastReceiver*** escuchando el mensaje ***nuevo_correo***, que lanzaría el servicio cada vez que detectara uno. Cuando esto sucediera, se mandaría un aviso a la barra del sistema para alertar al usuario.

### Proveedores de contenido (ContentProvider)

Ponen un grupo de datos a disposición de distintas aplicaciones, extienden de la clase ***ContentProvider*** para implementar los métodos de la interfaz, pero para acceder a esta interfaz se ha de usar una clase llamada ***ContentResolver***

Con esta clase se permite acceder al sistema de ficheros, bases de datos SQLite o cualquier otra fuente de datos unificada.

Un lector de correo podría disponer de un ContentProvider para acceder a la bandeja de entrada y los datos del mensaje.

### Siguiente tema: [Fundamentos programación Android: Intents y AndroidManifest][2]


 [1]: https://elbauldelprogramador.com/programacion-android-hola-mundo/
 [2]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/