---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-03T14:15:35+01:00
url: /fundamentos-aplicaciones-android-parte_18/
tags:
- curso android pdf
title: Fundamentos aplicaciones Android - (Parte II) - Componentes
---

# Componentes de las aplicaciones {#Components}

Los componentes de las aplicaciones son esenciales para una aplicación android. Cada componente es un punto diferente a través del cual el sistema puede entrar en la aplicación.  No todos los componentes son puntos reales de entrada para el usuarioy algunos dependen los unos de los otros, pero cada uno existe como entidad propia y desempeña un papel específico en el cual cada uno es un elemento único que ayuda a definir el comportamiento global de la aplicación.

Hay cuatro tipos distintos de componentes. Cada tipo es para un propósito en concreto y tiene un ciclo de vida distinto, que define como se crea y destruye el componente.

<!--more--><!--ad-->

A continuación los cuatro tipos de componentes:

## **Actividades**

Una *Actividad* representa una pantalla con una interfaz de usuario. Por ejemplo, una aplicación de email puede tener una actividad que muestre una lista con los nuevos mails, otra actividad para redactar un correo y otra para leer nuestro correo. Aunque las actividades trabajan juntas de forma coherente, cada una es independiente de la otra. Por lo tanto, una aplicación distinta puede iniciar cualquiera de estas actividades (si la aplicación de email lo permite). Por ejemplo, la aplicación de la cámara puede iniciar la actividad en la aplicación email para componer un nuevo correo, para que el usuario pueda compartir una imagen.

Una actividad se implementa como una subclase de <a href="http://developer.android.com/reference/android/app/Activity.html">Activity</a>, puedes leer más acerca de esto en la [guía para desrrolladores de Actividades][1]

## **Servicios**

Un *servicio* es un componente que se ejecuta en segundo plano para llevar a cabo operaciones de larga duración o para realizar trabajos de procesos remotos. Un servicio no proporciona una interfaz de usuario. Por ejemplo, un servicio puede reproducir música en segundo plano mientras el usuario se encuentra en otra aplicación, o puede navegar por la red sin bloquear la interacción del usuario con otra actividad. Otro componente, como una actividad, puede iniciar el servicio y permitir que se ejecute o dejar que interactue con ella.

Un servicio se implementa como una subclase de <a href="http://developer.android.com/reference/android/app/Service.html">Service</a>, puedes leer más acerca de esto en la [guía para desarrolladores de servicios][2]

## **Proveedores de contenido**

Un *Proveedor de contenido* gestiona un conjunto de datos compartidos de una aplicación.  Se pueden almacenar los datos en el sistema de Archivos, en una base de datos SQLite, en la red o en cualquier otra zona de almacenamiento persistente a la cual la aplicación pueda acceder. Mediante los proveedores de contenido, otras aplicaciones pueden consultar o incluso modificar la información (Si el proveedor de contenido lo permite). Por ejemplo, el sistema Android proporciona un proveedor de contenido que gestiona la información de los contactos del usuario. Así, cualquier aplicación con los permisos adecuados podrá consultar el proveedor de contenidos (Como <a href="http://developer.android.com/reference/android/provider/ContactsContract.Data.html">`ContactsContract.Data`</a>) para leer y escribir información sobre una persona en particular.

Los proveedores de contenido son también útiles para la lectura y escritura de datos privados de la aplicación y que no se comparten. Por ejemplo, el ejemplo de [Note Pad][3] usa un proveedor de contenido para guardar notas.

Un proveedor de contenido se implementa como una subclase de <a href="http://developer.android.com/reference/android/content/ContentProvider.html">ContentProvider</a> y debe implementar un conjunto de estándares de APIs que permita a otras aplicaciones realizar transacciones. Para más información lee [Content Providers][4].

## **Receptor de notificaciones**

Un *Receptor de notificaciones* es un componente que responde a la emisión de un mensaje en el sistema, por ejemplo, una emisión que anuncia que la pantalla se ha apagado, la barería esta baja o que se ha echado una foto. Las aplicaciones pueden iniciar emisiones, como por ejemplo permitir a otra aplicación que sepa que se han descargado datos al dispositivo y ya están disponibles para su uso.  Aunque estas emisiones no muestran una interfaz al usuario, pueden [crear una notificación en la barra de estado][5] para avisar al usuario. Más comúnmente, sin embargo, un receptor de emisión es solo un &#8220;gateway&#8221; (puerta de enlace) a otro componente y además no conlleva mucho trabajo. Se prodría iniciar un servicio para realizar algún trabajo basado en el evento.

Un broadcast receiver se implementa como una subclase de <a href="http://developer.android.com/reference/android/content/BroadcastReceiver.html">BroadcastReceiver</a> y cada emisión se entrega como un objeto <a href="http://developer.android.com/reference/android/content/Intent.html">Intent</a>. Para más información lee <a href="http://developer.android.com/reference/android/content/BroadcastReceiver.html">BroadcastReceiver</a>.

La conclusión es que cualquier aplicación puede iniciar cualquier componente de otra aplicación.  Por ejemplo, si quieres que el usuario pueda hacer una foto, probablemente haya otra aplicación que lo haga y podrás usarla en tu aplicación, en lugar de tener que desarrollar una actividad que pueda hacer fotografías. No se necesita enlazar el código de la aplicación que usa la cámara.  Simplemente se inicia la actividad de la aplicación de la cámara que captura fotos. Cuando finalize, la foto se devolverá a nuestra aplicación y podremos usarla. Para el usuario parecerá que la cámara es parte de la apliación.

Cuando el sistema inicia un componente, inicia el proceso para esa aplicación (si no está ya en ejecución) e instancia las clases necesarias para el componente. Por ejemplo, si una aplicación inicia la actividad en la aplicación de la cámara que echa fotos, esa actividad se ejecuta en el proceso que pertenece a la apliación de la cámara, no en el proceso de nuestra aplicación. Por lo tanto, a diferencia de la mayoría de las aplicaciones en otros sistemas, las aplicaciones Android no tienen un solo punto de entrada (No hay una función `main()`, por ejemplo)

Debido a que el sistema ejecuta cada aplicación en procesos separados y con permisos que restringen el acceso a otras aplicaciones, su aplicación no podrá directamente activar componentes de otras aplicaciones. El sistema Android, sin embargo, puede. Por eso, activar un componente en otra aplicación, debes enviar un mensaje al sistema que especifique tu *intent (intento)* de iniciar un componente en particular. El sistema activará el componente por ti.

# Siguiente: [Fundamentos aplicaciones Android. (Parte III) -Activando Componentes][6]

 [1]: http://developer.android.com/guide/topics/fundamentals/activities.html
 [2]: http://developer.android.comhttp://developer.android.com/guide/topics/fundamentals/services.html
 [3]: http://developer.android.com/resources/samples/NotePad/index.html
 [4]: http://developer.android.com/guide/topics/providers/content-providers.html
 [5]: http://developer.android.com/guide/topics/ui/notifiers/notifications.html
 [6]: https://elbauldelprogramador.com/fundamentos-aplicaciones-android-parte_19/
