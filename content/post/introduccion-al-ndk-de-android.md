---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-05T16:25:00+01:00
url: /introduccion-al-ndk-de-android/
tags:
- java
- c
title: "Introducción al NDK de Android"
---

El NDK de Android es un conjunto de herramientas que permiten embeber código máquina nativo compilado en lenguajes C y/o C++, hoy veremos cómo crear un ejemplo en el NDK de Android.

<!--more--><!--ad-->

# Conceptos básicos del NDK

La Máquina Virtual de Android (VM) permite que el código de la aplicación (escrito en Java) llame a métodos implementados en código nativo a través de JNI. En una *nutshell*, lo cual quiere decir que:

  * El código fuente de la aplicación declarará uno o más métodos con la palabra reservada **native** para indicar que dicho método está implementado en código nativo. Ej:

```java
native byte[] loadFile(String filePath);
```

  * Es necesario proporcionar una biblioteca compartida nativa que contenga la implentación de dichos métodos, que será empaquetada en el .apk de la aplicación. La biblioteca debe ser nombrada de acuerdo al estándar Unix *`lib<nombre>.so`*, y deberá contener un punto de entrada JNI estándar (veremos esto más adelante), por ejemplo: *`libFileLoader.so`*
  * La aplicación debe cargar explícitamente la biblioteca. Por ejemplo, para cargarla al iniciar la aplicación, simplemente añade la siguiente línea al código:

```java
static {
    System.loadLibrary("FileLoader");
}
```

No hay que scribir el prefijo “lib” ni el sufijo “.so”.

# Primer ejemplo en el NDK Android - Hola Mundo

En el *ndk* existe un directorio que contiene varios ejemplos, importamos a eclipse el *HelloJni*. Veamos la estructura del proyecto:

En el paquete *com.example.hellojni* sólo hay una clase llamada *HelloJni*, con el siguiente código:

```java
public class HelloJni extends Activity
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        TextView  tv = new TextView(this);
        tv.setText( stringFromJNI() );
        setContentView(tv);
    }

    public native String  stringFromJNI();

    public native String  unimplementedStringFromJNI();

    static {
        System.loadLibrary("hello-jni");
    }
}

```

En el método *[onCreate()][1]* se crea un *TextView* que recogerá el texto a mostrar a través de la función nativa en C.

La función *stringFromJni()* es el método nativo que implementa la biblioteca *hello-jni*, la cual viene dentro de la aplicación en *libs/armeabi/libhello-jni.so*.

*unimplementedStringFromJni()* es una función no implementada por la biblioteca *hello-jni*. Su único propósito es mostrar que es posible declarar tantos métodos nativos como queramos en nuestro código *Java*, sus implementaciones sólo serán buscadas en las bibliotecas que estén cargadas en ese momento solo la primera vez que se las llame. Al llamar a éste método obtendremos una excepción del tipo *java.lang.UnsatisfiedLinkError*.

Por último, al final del código, como se comentó al principio del artículo se carga la biblioteca al inicio de la aplicación. Nótese que a pesar de que el fichero situado en *libs/armeabi/* se llama *libhello-jni.so*, al cargarlo desde Java se elimina el sufijo *.so* y el prefijo *lib*

La implementación del método *stringFromJNI()* es la siguiente:

```c
#include <string.h>
#include <jni.h>

/* This is a trivial JNI example where we use a native method
 * to return a new VM String. See the corresponding Java source
 * file located at:
 *
 *   apps/samples/hello-jni/project/src/com/example/hellojni/HelloJni.java
 */
jstring
Java_com_example_hellojni_HelloJni_stringFromJNI( JNIEnv* env,
                                                  jobject thiz )
{
    return (*env)->NewStringUTF(env, "Hello from JNI !");
}

```

Como se puede apreciar, es necesario llamar a la función con el nombre del paquete Java y la clase donde se encuentra la llamada a la función. Es decir, *Java\_com\_example\_hellojni\_HelloJni* corresponde con la ruta del proyecto *./src/com/example/hellojni/HelloJni*.

# Ejecutar el Hola Mundo del NDK de Android

Para compilar y ejecutar el programa, con el proyecto *Hello-Jni* de ejemplo importado en eclipse, nos situamos en el directorio del proyecto desde el terminal y ejecutamos el comando *ndk-build*:

```bash
$ ndk-build
Gdbserver      : [arm-linux-androideabi-4.6] libs/armeabi/gdbserver
Gdbsetup       : libs/armeabi/gdb.setup
Compile thumb  : hello-jni <= hello-jni.c
SharedLibrary  : libhello-jni.so
Install        : libhello-jni.so => libs/armeabi/libhello-jni.so

```

Con esto hemos compilado el código nativo de la aplicación.
El siguiente paso es construir e instalar la aplicación como se hace normalmente en eclipse, o mediante línea de comandos:

```bash
$ ant debug
$ adb install bin/HelloJni.apk

```

El primer comando compila y genera el *.apk* y con el segundo lo instalamos en el emulador o dispositivo móvil.

Por último, la aplicación es tan simple como esto:

<figure>
        <a href="/img/2013/06/helloJni-NDK-de-android.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/2013/06/helloJni-NDK-de-android.png"
            alt="NKD android"
            title="NKD android"
            sizes="(min-width: 480px) 480px, 100vw"
            width="480"
            height="800">
          </amp-img>
        </a>
        <figcaption>Ejemplo Hola Mundo NKD</figcaption>
</figure>

Eso es todo, espero que esta pequeña introducción haya ayudado a iniciarse con el NDK de android.

# Referencias

- *Documentación del NDK* »» <a href="http://developer.android.com/tools/sdk/ndk/index.html" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/programacion-android-hola-mundo/
