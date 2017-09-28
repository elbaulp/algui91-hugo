+++
tags = ["opencv", "java"]
categories = ["dev"]
mainclass = "dev"
date = "2017-01-25"
lastmod = "2017-03-29T16:20:21+01:00"
title = "Compilar OpenCV 3.2 para Java y usarlo en IntelliJ IDEA"
image = "example-face-detection-with-opencv.png"
author = "cristina"
description = "Si quieres compilar OpenCV 3.2 por ti mismo con soporte para Java, esto te ayudará. También te ayudará si, compilado OpenCV, quisieras saber como usarlo en IntelliJ IDEA. ¡Empecemos!"
+++

Si quieres compilar OpenCV 3.2 por ti mismo con soporte para Java, esto te ayudará. También te ayudará si, compilado OpenCV, quisieras saber como usarlo en IntelliJ IDEA. ¡Empecemos!

Para compilar OpenCV 3.2 con soporte para Java debes comprobar que tienes instalado en tu sistema lo siguiente:

# Prerequisitos

 - Java JDK 7+: necesitamos un JDK para construir el Java _binding_, así que si no lo tienes instalado puedes hacerlo desde [oracle web page](http://www.oracle.com/technetwork/java/javase/downloads/index.html "www.oracle.com"). Puedes comprobar tu versión de JDK ejecutando: `java -version`  en un terminal.
 - Apache Ant: teclea `ant -version` para comprobar que tienes Apache Ant instalado. Si no lo tienes, instálalo tecleando `sudo apt-get install ant`.
 - Python 2.6+: teclea `python --version` en la terminal para comprobar si tienes python instalado y en que versión.

<!--more--><!--ad-->

# 1. Descarga OpenCV 3.2

 Ve a [opencv documentation](http://opencv.org/ "opencv.org") y descarga la última versión estable para Linux/Mac.

# 2. Descomprime donde quieras instalar y crea un directorio en el que construir

Extrae el contenido de la carpeta **opencv-3.2.0** donde quieras posicionarlo. Después, navega dentro de ese directorio y crea una carpeta vacía **build**, donde se guardarán los resultados de la compilación:

```bash
    cris@cris ~ $ cd opencv-3.2.0/
    cris@cris ~ $ mkdir build
```

# 3. Exporta la variable JAVA_HOME y genera el makefile

Debes comprobar que la variable $JAVA_HOME contiene el _path_ a tu JDK y que sea visible a otros procesos. Tecleando: `echo $JAVA_HOME` debe mostrarse el _path_ de tu JDK. Si no, en una terminalmodifica el valor de la variable al _path_ del JDK y expórtala. Por ejemplo:

```bash
cris@cris ~$ export JAVA_HOME=/home/jdk1.8.0_111/
```

navega al directirio **build** y genera el _makefile_:

```bash
cris@cris ~/opencv-3.2.0/build $ cmake -DBUILD_SHARED_LIBS=OFF ..
```

Comprueba que cuando estás generando el _makefile_ la salida en el campo de Java es la siguiente:
<figure>
    <amp-img sizes="(min-width: 983px) 983px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/output-build-makefiles-opencv-java.png" title="" alt="" width="983px" height="164px"></amp-img>
    <figcaption>construcción _makefile_</figcaption>
</figure>

Es decir, debe estar especificado Apache Ant, así como el _path_ JNI, y _Java wrappers_ debe estar a _YES_.

# 4. Construye

Ejecuta el  _make_ para compilar openCV con soporte para Java y crear el jar:

```bash
cris@cris ~/opencv-3.2.0/build $ make -j8
```

Cuando finalice, comprueba que se han creado los archivos **opencv-320.jar** y **libopencv_java320.so** (.so o .dll):

```bash
    cris@cris ~/opencv-3.2.0/build $ ls -R | grep opencv-320.jar
    opencv-320.jar
    opencv-320.jar.dephelper

    cris@cris ~/opencv-3.2.0/build $ ls -R | grep libopencv_java320.so
    libopencv_java320.so
```

Ahora que lo tenemos compilado, el siguiente paso será crear un ejemplo en Java para comprobar que funciona. Yo uso el IDE IntelliJ IDEA Ultimate 2016, por lo que en la siguiente sección explicaré como crear un proyecto en Java de OpenCV en INTELLIJ.

# Creando un proyecto Java OpenCV en INTELLIJ 16

 La forma más fácil de crear un proyecto de OpenCV en Java y Scala es usando SBT.
 Así que abrimos IntelliJ y creamos un nuevo proyecto SBT. Una ve creado, seleccionamos `File->Project Structure`  (Comprueba que en Module JDK aparece tu SDK)
 y selecciona la pestaña **Dependencies**. Aquí, hacemos click en _+_ y añadimos **opencv-320.jar** y la librería, que se encuentra en **opencv3.2.0/build/lib** :

<figure>
    <amp-img sizes="(min-width: 1022px) 1022px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/adding-Opencv-jar-to-IntelliJ-project.png" title="" alt="" width="1022px" height="341px"></amp-img>
    <figcaption>añadiendo .jar file</figcaption>
</figure>

<figure>
    <amp-img sizes="(min-width: 734px) 734px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/adding-libpath-to-intelliJ-project.png" title="" alt="" width="734px" height="291px"></amp-img>
<figcaption>añadiendo .so file</figcaption>
</figure>


Finalmente, tomamos el ejemplo de detección de caras de [opencv documentation](http://docs.opencv.org/2.4.4-beta/doc/tutorials/introduction/desktop_java/java_dev_intro.html "docs.opencv.org") , lo corregimos (dado que es para la versión 2.4.4 de OpenCV) y lo guardamos en un fichero llamado **helloOpenCV.java** dentro de la carpeta `src->main->java`.  El código de ejemplo adaptado a la versión 3.2 de OpenCV es:

```java
    import org.opencv.core.*;
    import org.opencv.core.Mat;
    import org.opencv.core.MatOfRect;
    import org.opencv.core.Point;
    import org.opencv.core.Rect;
    import org.opencv.core.Scalar;
    import org.opencv.imgcodecs.Imgcodecs;
    import org.opencv.objdetect.CascadeClassifier;

    import static org.opencv.imgproc.Imgproc.rectangle;

    //
    // Detects faces in an image, draws boxes around them, and writes the results
    // to "faceDetection.png".
    //
    class DetectFaceDemo {
      public void run() {
        System.out.println("\nRunning DetectFaceDemo");

        // Create a face detector from the cascade file in the resources
        // directory.
        CascadeClassifier faceDetector = new CascadeClassifier(getClass().getResource("/lbpcascade_frontalface.xml").getPath());
        Mat image = Imgcodecs.imread(getClass().getResource("/lena.png").getPath());

        // Detect faces in the image.
        // MatOfRect is a special container class for Rect.
        MatOfRect faceDetections = new MatOfRect();
        faceDetector.detectMultiScale(image, faceDetections);

        System.out.println(String.format("Detected %s faces", faceDetections.toArray().length));

        // Draw a bounding box around each face.
        for (Rect rect : faceDetections.toArray()) {
            rectangle(image, new Point(rect.x, rect.y), new Point(rect.x + rect.width, rect.y + rect.height), new Scalar(0, 255, 0));
        }

        // Save the visualized detection.
        String filename = "faceDetection.png";
        System.out.println(String.format("Writing %s", filename));
        Imgcodecs.imwrite(filename, image);
      }
    }

    public class HelloOpenCV {
      public static void main(String[] args) {
        System.out.println("Hello, OpenCV");

        // Load the native library.
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        new DetectFaceDemo().run();
     }
    }
```

Por último ejecutamos el ejemplo **HelloOpenCV** y comprobamos que funciona, escribiendo la detección de la cara de lenna en la imágen **faceDetection.png**.

<figure>
    <amp-img sizes="(min-width: 531px) 531px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/example-face-detection-with-opencv.png" title="" alt="" width="531px" height="528px"></amp-img>
    <figcaption>ejemplo detección de caras</figcaption>
</figure>
