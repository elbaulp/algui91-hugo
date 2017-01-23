---
author: alex
categories:
- android
- aplicaciones
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-09-06
layout: post.amp
mainclass: android
permalink: /fundamentos-aplicaciones-android-parte_19/
tags:
- curso android pdf
title: Fundamentos aplicaciones Android. (Parte III) -Activando Componentes
---

Continuando con el [tema de los componentes][1], en esta entrada vamos a ver:



## Activando componentes {#ActivatingComponents}

3 de los 4 tipos de componentes, actividades, servicios y emisor de notificaciones se activan mediante un mensaje asíncrono llamado *intent(intento)*. Los intents enlazan componentes individuales el uno al otro en tiempo de ejecución (se puede pensar que son los mensajeros que solicitan una acción de otro componente), si el componente pertenece a tu aplicación o a otra.

<!--more--><!--ad-->

Un intent se crea con un objeto <a href="http://developer.android.com/reference/android/content/Intent.html">`Intent`</a>, el cual define un mensaje a activar, un componente específico o un *tipo* específico de componente; un intent puede ser explicito o implícito, respectivamente.

Para las actividades y los servicios, un intent define una acción a realizar (como &#8220;ver&#8221; o &#8220;mandar&#8221; algo) y puede especificar la URI de algún dato necesario (entre otras cosas que el componente que está siendo iniciado pueda necesitar). Por ejemplo, un intent puede solicitar que una actividad muestre una imagen o que abra una página web. En algunos casos, puede iniciar una actividad para recibir un resultado, en tal caso, la actividad devolverá también el resultado en un <a href="http://developer.android.com/reference/android/content/Intent.html">`Intent`</a> (por ejemplo, se puede emitir un intent de dejar que el usuario elija un contacto y que se devuelva. El intent devuelto incluye un URI que apunta al contacto elegido.)

Para los emisores de notificaciones, el intent simplemente define la notificación a ser emitida (por ejemplo, una emisión para indicar que la batería está baja, solo incluye una cadena con el texto &#8220;barería baja&#8221;).

El otro tipo de componente, los proveedores de contenido, no se activan por intents. Se activan cuando una solicitud proviene de un <a href="http://developer.android.com/reference/android/content/ContentResolver.html">`ContentResolver`</a>.  El contentResolver maneja todas las transacciones directamente con el proveedor de contenido, de modo que el componente que realiza la transacción con el proveedor no necesita el intent, en su lugar llama a métodos del objeto <a href="http://developer.android.com/reference/android/content/ContentResolver.html">`ContentResolver`</a>. Esto deja una capa de abstracción entre el proveedor de contenido y el componente de solicitud de información (por seguridad).

Hay distintos métodos para activar cada tipo de componente:

* Se puede iniciar una actividad (o darle algo nuevo a hacer) pasando un <a href="http://developer.android.com/reference/android/content/Intent.html">`Intent`</a> a <a href="http://developer.android.com/reference/android/content/Context.html#startActivity(android.content.Intent)">`startActivity()`</a> o <a href="http://developer.android.com/reference/android/app/Activity.html#startActivityForResult(android.content.Intent, int)">`startActivityForResult()`</a> (cuando se quiera que la actividad devuelva un resultado)
* Se puede iniciar un servicio (o darle nuevas instrucciones a uno ya en ejecución) pasando un <a href="http://developer.android.com/reference/android/content/Intent.html">`Intent`</a> a <a href="http://developer.android.com/reference/android/content/Context.html#startService(android.content.Intent)">`startService()`</a>. O se puede enlazar con el servicio pasando un <a href="http://developer.android.com/reference/android/content/Intent.html">`Intent`</a> a <a href="http://developer.android.com/reference/android/content/Context.html#bindService(android.content.Intent, android.content.ServiceConnection, int)">`bindService()`</a>.
* Se puede iniciar una notificación pasando un intent a metodos como <a href="http://developer.android.com/reference/android/content/Context.html#sendBroadcast(android.content.Intent)">`sendBroadcast()`</a>, <a href="http://developer.android.com/reference/android/content/Context.html#sendOrderedBroadcast(android.content.Intent, java.lang.String)">`sendOrderedBroadcast()`</a>, o <a href="http://developer.android.com/reference/android/content/Context.html#sendStickyBroadcast(android.content.Intent)">`sendStickyBroadcast()`</a>.
* Se puede realizar una consulta a un proveedor de contenido llamando a <a href="http://developer.android.com/reference/android/content/ContentProvider.html#query(android.net.Uri, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String)">`query()`</a> en un <a href="http://developer.android.com/reference/android/content/ContentResolver.html">`ContentResolver`</a>

Para más información sobre el uso de intents, lee:[Intents and Intent Filters][2]. Más información sobre activar componentes específicos disponible en: [Activities][3], [Services][4], <a href="http://developer.android.com/reference/android/content/BroadcastReceiver.html">`BroadcastReceiver`</a> and [Content Providers][5].

 [1]: https://elbauldelprogramador.com/fundamentos-aplicaciones-android-parte_18/
 [2]: http://developer.android.com/guide/topics/intents/intents-filters.html
 [3]: http://developer.android.com/guide/topics/fundamentals/activities.html
 [4]: http://developer.android.com/guide/topics/fundamentals/services.html
 [5]: http://developer.android.com/guide/topics/providers/content-providers.html