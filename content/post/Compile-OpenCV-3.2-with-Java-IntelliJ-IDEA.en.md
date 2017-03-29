+++
tags = ["opencv", "intelliJ", "java"]
categories = ["dev"]
date = "2017-01-25"
lastmod: 2017-03-29T14:22:39+01:00
title = "Compile OpenCV 3.2 with Java and use it in IntelliJ IDEA"
image = "example-face-detection-with-opencv.png"
mainclass = "dev"
author = "cristina"
description = "If you are wishing to compile OpenCV 3.2 by your own with Java support, possibly this will help. Also it is for you if, done that, you want to use it in IntelliJ IDEA. Let's start!"
+++

If you are wishing to compile OpenCV 3.2 by your own with Java support, possibly this will help. Also it is for you if, done that, you want to use it in IntelliJ IDEA. Let's start!

For compiling OPENCV 3.2 with Java support you must make sure you have the following installed:

# Prerequisites

 - Java JDK 7+: we need JDK to build Java binding, so if not  installed download and install from [oracle web page](http://www.oracle.com/technetwork/java/javase/downloads/index.html "www.oracle.com") . You can check your JDK  version by running: `java -version`  on command line.
 - Apache Ant: run `ant -version` to check if Apache Ant is installed. If not, install by typing `sudo apt-get install ant`.
 - Python 2.6+: run `python --version` on command line to check if python is installed and its version.

<!--more--><!--ad-->

# 1. Download OpenCV 3.2

 Go to [opencv documentation](http://opencv.org/ "opencv.org") and download the last stable version for Linux/Mac.

# 2. Unzip where you want to install and create build directory

Extract the content folder **opencv-3.2.0** where you want it to be placed. Then, move to that directory and create a **build** empty folder, where compilation result will be stored:

```bash
    cris@cris ~ $ cd opencv-3.2.0/
    cris@cris ~ $ mkdir build
```

# 3. Export JAVA_HOME variable and generate a makefile

You must make sure $JAVA_HOME variable is set to JDK's path and visible to child processes.  For that when doing: `echo $JAVA_HOME` the JDK path must be displayed. If not, in terminal, set de variable value to JDK path and export it, for example:

```bash
cris@cris ~$ export JAVA_HOME=/home/jdk1.8.0_111/
```

then move to **build** directory and generate makefile:

```bash
cris@cris ~/opencv-3.2.0/build $ cmake -DBUILD_SHARED_LIBS=OFF ..
```

Notice that when generating the makefile, the output in the Java field looks like this:

<figure>
    <amp-img sizes="(min-width: 983px) 983px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/output-build-makefiles-opencv-java.png" width="983px" height="164px"></amp-img>
    <figcaption>building makefiles</figcaption>
</figure>

That is, there is a specified ant and JNI path, and Java wrappers is set to YES.

# 4. Build

run make to build openCV with Java and create a jar:

```bash
cris@cris ~/opencv-3.2.0/build $ make -j8
```

when finished, make sure the files **opencv-320.jar** and **libopencv_java320.so** (.so or .dll) are created:

```bash
    cris@cris ~/opencv-3.2.0/build $ ls -R | grep opencv-320.jar
    opencv-320.jar
    opencv-320.jar.dephelper

    cris@cris ~/opencv-3.2.0/build $ ls -R | grep libopencv_java320.so
    libopencv_java320.so
```

Now that it is build, the next step would be create an example in Java to check if it works. I am using IntelliJ IDEA Ultimate 2016 IDE, so in next section I am going to explain how to create a Java OpenCV proyect in INTELLIJ.

# Creating a Java OpenCV proyect in INTELLIJ 16

 The easiest way to create a Java and Scala openCV proyect is using SBT.
  So we open IntelliJ and create a new SBT proyect. Once it is created, we select `File->Project Structure`  (Make sure here Module JDK appears set with our SDK)
 and choose **Dependencies** tab. Here, we click to add and select the **opencv-320.jar** and  the library, that is in **opencv3.2.0/build/lib** :

<figure>
    <amp-img sizes="(min-width: 1022px) 1022px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/adding-Opencv-jar-to-IntelliJ-project.png" title="" alt="" width="1022" height="341"></amp-img>
    <figcaption>adding .jar file</figcaption>
</figure>

<figure>
    <amp-img sizes="(min-width: 734px) 734px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/adding-libpath-to-intelliJ-project.png" title="" alt="" width="734" height="291"></amp-img>
    <figcaption>adding .so file</figcaption>
</figure>


finally, we take the face detection example from [opencv documentation](http://docs.opencv.org/2.4.4-beta/doc/tutorials/introduction/desktop_java/java_dev_intro.html "docs.opencv.org") , correct it (because it is for OpenCV version 2.4.4)  and store it in a file called **helloOpenCV.java** inside `src->main->java` folder.  The example code adapted to OpenCV version 3.2 is :

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

Finally we run **HelloOpenCV** example and see it works! printing lenna's face detection to **faceDetection.png** image.

<figure>
    <amp-img sizes="(min-width: 531px) 531px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/example-face-detection-with-opencv.png" title="" alt="" width="531" height="528"></amp-img>
    <figcaption>example face detection</figcaption>
</figure>
