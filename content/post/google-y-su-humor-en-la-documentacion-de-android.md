---
author: alex
categories:
- android
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-04T14:10:07+01:00
url: /google-y-su-humor-en-la-documentacion-de-android/
title: "Google y su humor en la documentación de Android"
---

<figure>
    <img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/06/monkey-phone-300x269.jpg" alt="isUserAMonkey Android" width="300px" height="269px" />
</figure>

Todos sabemos el humor que gastan chicos de Google, y a raiz de una pregunta en *<a href="http://stackoverflow.com/questions/13375357/proper-use-cases-for-android-usermanager-isuseragoat" target="_blank">stackoverflow</a>* descubrí que la documentación de Android tiene unos cuantos toques de humor de los de Mountain View. Así que decidí buscarlos y crear la siguiente recopilación:

# isUserAGoat()

Abriremos la recopilación con la pregunta en stackoverflow, la cual tuvo bastante éxito como se puede apreciar en los votos:

<figure>
    <img sizes="(min-width: 741px) 741px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/06/UserManager.isuseragoat.png" alt="UserManager.isuseragoat" width="741px" height="253px" />
</figure>


<!--more--><!--ad-->

La documentación oficial está en <a href="http://developer.android.com/reference/android/os/UserManager.html#isUserAGoat%28%29" target="_blank">/android/os/UserManager.isUserAGoat</a>, que viene a ser algo como *¿Es el usuario una cabra?*:

> # public boolean isUserAGoat ()
>
> Used to determine whether the user making this call is subject to teleportations.
>
> **Returns**
> whether the user making this call is a goat.

# Log.wtf()

Podría pensarse que esta abreviatura viene de ***What The Fuck?***, pero en realidad es ***What a Terrible Failure***: Está documentada como sigue

> # public static int wtf (String tag, String msg)
>
> What a Terrible Failure: Report a condition that should never happen. The error will always be logged at level ASSERT with the call stack. Depending on system configuration, a report may be added to the DropBoxManager and/or the process may be terminated immediately with an error dialog.
>
> **Parameters**
> tag Used to identify the source of a log message.
> msg The message you would like logged.

<a href="http://developer.android.com/reference/android/util/Log.html#wtf%28java.lang.String,%20java.lang.String%29" target="_blank">/android/util/Log.html#wtf(java.lang.String, java.lang.String)</a>

# isUserAmonkey()

Éste método devolverá verdadero si la interfaz gráfica parece estar siendo manejada por un mono:

> # public static boolean isUserAMonkey ()
>
> Returns &#8220;true&#8221; if the user interface is currently being messed with by a monkey.

<a href="http://developer.android.com/reference/android/app/ActivityManager.html#isUserAMonkey%28%29" target="_blank">/android/app/ActivityManager.html#isUserAMonkey()</a>

# TWEET\_TRANSACTION y LIKE\_TRANSACTION

Según la documentación, al terminar la primera transacción (TWEET_TRANSACTION), el objeto debe hacer una taza de té, devolverla al llamador y gritar “**¡¡Muy buen mensaje muchacho!!**”

> # public static final int TWEET_TRANSACTION
>
> IBinder protocol transaction code: send a tweet to the target object. The data in the parcel is intended to be delivered to a shared messaging service associated with the object; it can be anything, as long as it is not more than 130 UTF-8 characters to conservatively fit within common messaging services. As part of HONEYCOMB_MR2, all Binder objects are expected to support this protocol for fully integrated tweeting across the platform. To support older code, the default implementation logs the tweet to the main log as a simple emulation of broadcasting it publicly over the Internet.

<br/>

> ***Also, upon completing the dispatch, the object must make a cup of tea, return it to the caller, and exclaim &#8220;jolly good message old boy!&#8221;.***

La segunda (LIKE_TRANSACTION) le dice a la aplicación (asíncronamente) que al llamador le gusta, no afecta al rendimiento del sistema, pero mejorará la autoestima de la aplicación:

> # public static final int LIKE_TRANSACTION
>
> IBinder protocol transaction code: tell an app asynchronously that the caller likes it. The app is responsible for incrementing and maintaining its own like counter, and may display this value to the user to indicate the quality of the app. This is an optional command that applications do not need to handle, so the default implementation is to do nothing.

<br/>

> ***There is no response returned and nothing about the system will be functionally affected by it, but it will improve the app&#8217;s self-esteem.***

- <a href="http://developer.android.com/reference/android/os/IBinder.html#TWEET_TRANSACTION" target="_blank">/android/os/IBinder.html#TWEET_TRANSACTION</a>.
- <a href="http://developer.android.com/reference/android/os/IBinder.html#LIKE_TRANSACTION" target="_blank">/android/os/IBinder.html#LIKE_TRANSACTION</a>

Eso es todo lo que he podido encontrar, un poquito de humor nunca viene mal. ¿Conocéis más métodos curiosos en la documentación?


 [1]: https://elbauldelprogramador.com/img/2013/06/monkey-phone.jpg
