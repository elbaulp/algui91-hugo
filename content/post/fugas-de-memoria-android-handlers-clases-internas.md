---
author: alex
categories:
- android
color: '#689F38'
date: '2016-09-25'
description: "\xC9ste art\xEDculo es una traducci\xF3n del blog de Alex Lockwood.
  Gracias por el permiso."
lastmod: 2015-12-22
layout: post.amp
mainclass: android
permalink: /fugas-de-memoria-android-handlers-clases-internas/
tags:
- fugas de memoria en Android
- fugas de memoria handlers
- fugas de memoria Java
- fugas de memoria runnable
- memory leaks
title: 'Fugas de memoria en Android: Handlers & Clases Internas'
---

> Éste artículo es una traducción del blog de [Alex Lockwood][1]. Gracias por el permiso.

Seamos directos, consideremos el siguiente código:

```java
public class SampleActivity extends Activity {

  private final Handler mLeakyHandler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
      // ...
    }
  }
}

```

Aunque no es obvio de inmediato, éste código puede causar fugas de memoria (*memory leak*).

<!--more--><!--ad-->

[*Android Lint*][2] mostrará la siguiente advertencia:

> In Android, Handler classes should be static or leaks might occur.

Es decir, las clases de tipo `Handler` deben ser estáticas, de lo contrario pueden ocurrir fugas de memoria (*memory leak*).

## Algunos conceptos a entender

Pero, ¿dónde ocurre ésta pérdida o filtración de memoria (*memory leak*) y cómo se produce? Determinemos el origen del problema fijándonos en lo que sabemos:

  * Cuando se inicia una aplicación en Android, el [framework][3] crea un objeto [Looper][4] para el hilo principal de la aplicación. Un `Looper` implementa una cola de mensajes simples, que procesa objetos [Message][5], los cuales se añaden a la cola de mensajes del `Looper` y son procesados uno a uno. El `Looper` del hilo principal de la aplicación existe durante todo el [ciclo de vida de la aplicación][6].
  * Al instanciar un [Handler][7] en el hilo principal, se asocia a la cola de mensajes del `Looper`. Los mensajes publicados en la cola de mensajes mantendrán una referencia al `Handler`, para que el framework pueda llamar a [Handler#handleMessage][8] cuando el `Looper` procese eventualmente el mensaje.
  * En Java, tanto las clases no-estáticas internas como anónimas mantienen una referencia implícita a su clase externa. Por contra, las clases estáticas internas, no.

## ¿Dónde se produce la fuga de memoria? (*memory leak*)

Entonces, ¿Dónte está exáctamente la pérdida de memoria (*memory leak*)?, es muy sutil, pero consideremos ahora el siguiente fragmento de código:

```java
public class SampleActivity extends Activity {

  private final Handler mLeakyHandler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
      // ...
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Publicar un mensaje y retrasar su ejecución 10 minutos
    mLeakyHandler.postDelayed(new Runnable() {
      @Override
      public void run() { }
    }, 60 * 10 * 1000);

    // Regresar a la activity anterior
    finish();
  }
}

```

Cuando la actividad [finaliza][9] al llamar a `finish`, el mensaje que hemos retrasado seguirá pendiente de ejecución en la cola de mensajes del hilo principal durante 10 minutos antes de ser procesado. El mensaje mantiene una referencia al `Handler` del `Activity`, y el `Handler` mantiene una referencia implícita a su clase externa (`SampleActivity`, en éste caso). Dicha referencia persistirá hasta que el mensaje sea procesado, lo cual impide al contexto de la `Activity` ser recolectado por el recolector de basura (Garbage collector). Ésto causa la perdida de los recursos de la aplicación. Nótese que ocurre lo mismo con la clase anónima `Runnable` mostrada en el código. Instancias no estáticas de clases anónimas mantienen una referencia implícita a su clase externa, causando así pérdida o filtración del contexto (Clase `Context`), y por tanto, un (*memory leak*).

## Posibles soluciones para evitar la fuga

Para corregir el problema, podemos crear una subclase de `Handler` en un nuevo fichero o crear una clase interna estática. Las clases estáticas internas no mantienen una referencia implícita a su clase externa, de modo que la `Activity` no tendrá fugas de memoria (*memory leak*). Si se necesita invocar métodos de la clase externa desde el `Handler`, basta con que el `Handler` mantenga una referencia débil (`WeakReference`) a la `Activity`, así no habrá fugas de memoria accidentales. Para corregir la otra fuga existente al instanciar la clase anónima `Runnable`, basta con crear una variable estática de la clase (Ya que, como hemos dicho, instancias estáticas de clases anónimas no mantienen una referencia implícita a su clase externa):

```java
public class SampleActivity extends Activity {

  /**
  * Clase interna estática
  */
  private static class MyHandler extends Handler {
    private final WeakReference<sampleactivity> mActivity;

    public MyHandler(SampleActivity activity) {
      mActivity = new WeakReference</sampleactivity><sampleactivity>(activity);
    }

    @Override
    public void handleMessage(Message msg) {
      SampleActivity activity = mActivity.get();
      if (activity != null) {
        // ...
      }
    }
  }

  private final MyHandler mHandler = new MyHandler(this);

  /**
  * Instancia de clase anónima estática, no mantiene referencia
  */
  private static final Runnable sRunnable = new Runnable() {
    @Override
    public void run() { }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Programar mensaje para 10 min
    mHandler.postDelayed(sRunnable, 60 * 10 * 1000);

    // Salir a la activity anterior.
    finish();
  }
}

```

## Conclusión

La diferencia entre clases internas estáticas y no-estáticas es sutil, pero es una sutileza que todo desarrollador Android debería comprender. ¿Cual es la conclusión? Evitar a toda costa usar clases internas no estáticas en una `Activity` si las instancias de la clase interna pueden seguir ejecutándose aún cuando el ciclo de vida de la `Activity` acabe. En su lugar, usar clases internas estáticas que mantengan una referencia débil a la `Activity`.

#### Referencias

*How to Leak a Context: Handlers & Inner Classes* »» <a href="http://www.androiddesignpatterns.com/2013/01/inner-class-handler-memory-leak.html" target="_blank">androiddesignpatterns.com</a>

photo credit: [nyuhuhuu][10] via [photopin][11] [cc][12]



 [1]: http://www.androiddesignpatterns.com "Blog de Alex"
 [2]: https://elbauldelprogramador.com/eliminar-recursos-sin-usar-en-android/ "Eliminar recursos sin usar en Android"
 [3]: https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/ "11 Framewors web gratuitos"
 [4]: http://developer.android.com/reference/android/os/Looper.html
 [5]: http://developer.android.com/reference/android/os/Message.html
 [6]: https://elbauldelprogramador.com/fundamentos-programacion-android-ciclo/ "Programación Android - Ciclo de vida de las Activities"
 [7]: http://developer.android.com/reference/android/os/Handler.html
 [8]: http://developer.android.com/reference/android/os/Handler.html#handleMessage(android.os.Message)
 [9]: https://elbauldelprogramador.com/eliminar-la-pila-de-actividades-back-stack-en-android/ "Finalizar actividades en Android"
 [10]: https://www.flickr.com/photos/nyuhuhuu/4653088356/
 [11]: http://photopin.com
 [12]: http://creativecommons.org/licenses/by/2.0/


</sampleactivity>