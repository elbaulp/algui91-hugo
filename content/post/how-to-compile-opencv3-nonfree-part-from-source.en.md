+++
title = "How to Compile  OpenCV 3.0+ nonfree part from source"
tags = ["howto", "opencv", "intellij", "java"]
categories = ["dev"]
image = ""
mainclass = "dev"
author = "cristina"
description = "By default, nofree code does not ship with the default OpenCv installation, learn how to install nonfree code"
date = "2017-03-01T18:14:18+01:00"
draft = true
+++

In my last post [Compile OpenCV from source with JAVA support](https://elbauldelprogramador.com/en/compile-opencv-3.2-with-java-intellij-idea/ "Compile OpenCV 3.2 with Java and use it in IntelliJ IDEA") I explained how to Compile OpenCV from source with JAVA support, however, the OpenCV nonfree part was not included. If you are planning to use private features from OpenCV like SIFT or SURF descriptors, you should go as follows:

# [1]. Download OpenCV 3.2, unpack and create build directory

following the steps of [my last post](https://elbauldelprogramador.com/en/compile-opencv-3.2-with-java-intellij-idea/ "Compile OpenCV 3.2 with Java and use it in IntelliJ IDEA").

<!--more--><!--ad-->

# [2]. Download and unpack nonfree part

nonfree part has been separated in OpenCV3+, so you need to download it separately from [github opencv repo](https://github.com/opencv/opencv_contrib "github opencv repository")  or clone the repository. Then extract **opencv_contrib** and move it inside your opencv folder :

```bash
cris@cris ~ $ cp Downloads/opencv-contrib opencv-3.2.0/
```

# [3]. generate makefiles

we move to the build folder inside opencv folder and type:

```bash
cris@cris~$ cmake -DBUILD_SHARED_LIBS=OFF -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=../dist -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules ..
```

With `DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules` we are specifying where to found the nonfree part.

# [3]. build

If makefiles generation went ok, you can now build. If using openCV in JAVA, just make sure your `$JAVA_HOME` variable is set to your JDK 's path and type:

```bash
cris@cris ~$ make -j8
```

-j8 is because JDK8. You should put here your JAVA version.


You must make sure `$JAVA_HOME` variable is set to JDK's path and visible to child processes.  For that when doing: `echo $JAVA_HOME` the JDK path must be displayed. If not, in terminal, set de variable value to JDK path and export it, for example:

```bash
cris@cris ~$ export JAVA_HOME=/home/jdk1.8.0_111/
```

then move to **build** directory and generate makefile:

```bash
cris@cris ~/opencv-3.2.0/build $ cmake -DBUILD_SHARED_LIBS=OFF ..
```

Notice that when generating the makefile, the output in the Java field looks like this:

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/output-build-makefiles-opencv-java.png" title="Building makefiles for JAVA openCV" alt="Building makefiles for JAVA openCV output" width="983" height="164"></amp-img>
<figcaption>building makefiles</figcaption>
</figure>

That is, there is a specified ant and JNI path, and Java wrappers is set to YES.

# [4]. Build

run make to build openCV with Java and create a jar:

```bash
cris@cris ~/opencv-3.2.0/build $ make -j8
```

Make sure the files **opencv-320.jar** and **libopencv_java320.so** (.so or .dll) are created inside /build.

```bash
cris@cris ~/opencv-3.2.0/build $ ls -R | grep opencv-320.jar
opencv-320.jar
opencv-320.jar.dephelper

cris@cris ~/opencv-3.2.0/build $ ls -R | grep libopencv_java320.so
libopencv_java320.so
```

# [5]. Edit features2d_manual.hpp file

Ok, if building was successfull, then move to `/modules/features2d/misc/java/src/cpp`:

```bash
cris@cris ~/opencv-3.2.02 $ cd modules/features2d/misc/java/src/cpp/
```

and edit  features2d_manual.hpp with your favorite text editor, as following:

- In line 8, under `#include "features2d_converters.hpp"`
add `#include "opencv2/xfeatures2d.hpp"`
- In line 121, in **create** method,  inside `case SITF` and  `case SURF` replace :

`//name = name + "SIFT";` by `fd=xfeatures2d::SIFT::create();`
and ` //name = name + "SURF";` by `fd=xfeatures2d::SURF::create();`

- do the same in line 242 for SIFT and SURF extractors:

```java
case SIFT:
    de = xfeatures2d::SIFT::create();
    break;
    case SURF:
    de = xfeatures2d::SURF::create();
    break;
```

# [5].Rebuild to apply changes

move to your opencv/build folder and run `make install`
when finished, you just need to include the **.so** and **.jar** files on your openCV project and you would be able to use SIFT and SURF decriptors in your code.

# References:

- <a href="http://stackoverflow.com/a/35266046/5032130" target="_blank">SURF and SIFT algorithms doesn't work in OpenCV 3.0 Java | Stackoverflow</a>
