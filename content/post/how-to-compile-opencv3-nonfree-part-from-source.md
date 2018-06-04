+++
title = "Compilar la parte no gratuita de OpenCV 3.0+ desde fuente"
tags = ["java"]
categories = ["dev", "how to"]
mainclass = "dev"
image = "how-to-compile-opencv3-nonfree-part-from-source.jpg"
author = "cristina"
description = "Por defecto, la parte de código privativo no se compila cuando compilas OpenCV o realizas una instalación por defecto, learn how to install nonfree code, aprende a instalar la parte no gratuita de OpenCV"
lastmod = "2017-10-04T20:51:20+01:00"
date = "2017-03-07T20:31:38+01:00"
url = "/compilar-la-parte-no-gratuita-de-opencv-3.0-desde-fuente/"
+++

En mi último post [Compilar OpenCV 3.2 para Java y usarlo en IntelliJ IDEA](https://elbauldelprogramador.com/compile-opencv-3.2-with-java-intellij-idea/ "Compilar OpenCV 3.2 para Java y usarlo en IntelliJ IDEA") Expliqué cómo compilar OpenCV desde el código fuente con soporte para JAVA, sin embargo, La parte no gratuita de OpenCV no se incluye por defecto. Si quieres usar parte de la parte privativa de OpenCV, como los descriptores SIFT o SURF, deberás hacer lo siguiente:

# [1]. Descarga OpenCV 3.2, descomprime y crea un directorio donde construirlo

Siguiendo los pasos de [mi último post](https://elbauldelprogramador.com/compile-opencv-3.2-with-java-intellij-idea/ "Compilar OpenCV 3.2 para Java y usarlo en IntelliJ IDEA").

<!--more--><!--ad-->

# [2]. Descarga y descomprime la parte no gratuita

La parte no gratuita la separaron de la gratuita en OpenCV3+, por lo que necesitas descargarla aparte desde [el repo github de opencv](https://github.com/opencv/opencv_contrib "github opencv repository")  o clonar el repositorio. Después extrae **opencv_contrib** y ponla dentro de tu carpeta opencv :

```bash
cris@cris ~ $ cp Downloads/opencv-contrib opencv-3.2.0/
```

# [3]. Genera los makefiles

Nos movemos a la carpeta de construcción que creamos antes dentro de la carpeta de opencv (en mi caso se llama build), y escribimos:


```bash
cris@cris~$ cmake -DBUILD_SHARED_LIBS=OFF -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=../dist -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules ..
```

Con `DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules` estamos especificando donde encontrar la parte no gratuita.


Si la generación de los makefiles ha sido correcta, entonces ya puedes compilar. Si estás compilando openCV para JAVA, debes comprobar que la variable `$JAVA_HOME` tiene el path de tu JDK y que esta está visible por procesos hijo. Para ello, cuando hagas: `echo $JAVA_HOME` te deberá mostrar el path de tu JDK. Si no, en una terminal, establece el valor de la variable a el path de tu JDK y expórtala, por ejemplo:

```bash
cris@cris ~$ export JAVA_HOME=/home/jdk1.8.0_111/
```

Fíjate cuando estés generando el makefile, que la salida para el campo de Java es así:

<figure>
    <amp-img sizes="(min-width: 983px) 983px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/output-build-makefiles-opencv-java.png" title="Building makefiles for JAVA openCV" alt="Building makefiles for JAVA openCV output" width="983" height="164"></amp-img>
    <figcaption>building makefiles</figcaption>
</figure>

Es decir, que hay un path para JNI especificado,y Java _wrappers_ está a YES.

# [4]. Construye

ejecuta _make_ para compilar openCV con Java y crear un jar:

```bash
cris@cris ~/opencv-3.2.0/build $ make -j8
```

- donde j8 indica el nivel de paralelismo deseado.

Asegúrate de que los ficheros **opencv-320.jar** y **libopencv_java320.so** (.so o .dll) han sido creados dentro de **/build**.

```bash
cris@cris ~/opencv-3.2.0/build $ ls -R | grep opencv-320.jar
opencv-320.jar
opencv-320.jar.dephelper

cris@cris ~/opencv-3.2.0/build $ ls -R | grep libopencv_java320.so
libopencv_java320.so
```

# [5]. Edita el archivo features2d_manual.hpp

Ok, si la construcción ha ido bien, vete a `/modules/features2d/misc/java/src/cpp`:

```bash
cris@cris ~/opencv-3.2.02 $ cd modules/features2d/misc/java/src/cpp/
```

y edita features2d_manual.hpp con tu editor de texto favorito, como sigue:

- En la línea 8, tras `#include "features2d_converters.hpp"`
añade `#include "opencv2/xfeatures2d.hpp"`
- En la línea 121, en el método **create**,  dentro de `case SITF` y `case SURF` reemplaza :

`//name = name + "SIFT";` por `fd=xfeatures2d::SIFT::create();`
y ` //name = name + "SURF";` por `fd=xfeatures2d::SURF::create();`

- haz lo mismo en la línea 242 para los extractores SIFT y SURF:

```java
case SIFT:
    de = xfeatures2d::SIFT::create();
    break;
    case SURF:
    de = xfeatures2d::SURF::create();
    break;
```

# [5].Reconstruye para aplicar los cambios

Vete a tu carpeta **opencv/build** y ejecuta `make install`.
Cuando finalice, sólo necesitarás incluir los ficheros **.so** y **.jar** en tu proyecto de openCV y podrás usar los descriptores SIFT y SURF en tu código.

# Referencias:

- <a href="http://stackoverflow.com/a/35266046/5032130" target="_blank">SURF and SIFT algorithms doesn't work in OpenCV 3.0 Java | Stackoverflow</a>
