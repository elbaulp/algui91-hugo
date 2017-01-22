---
author: alex
categories:
- android
- articulos
color: '#F57C00'
date: '2016-12-12'
description: "Leyendo noticias en mi lector RSS he encontrado un art\xEDculo interesante
  que comparto con vosotros. Se trata de un programa que permitir\xE1 tener un sistema
  debian b\xE1sico en el dispostivo."
image: 2012/12/linux-apps-on-android1.jpg
lastmod: 2016-08-13
layout: post.amp
mainclass: articulos
permalink: /botbrewcompila-instala-y-ejecuta-aplicaciones-linux-en-android/
redirect_from: /programacion/android/botbrewcompila-instala-y-ejecuta-aplicaciones-linux-en-android/
tags:
- botbrew basil
- como instalar aplicaciones de linux a android
- curso android pdf
- debian en android
- samsung galaxy scl gti9003
- xda
title: BotBrew basil, Compila, instala y ejecuta aplicaciones Linux en Android
---

Leyendo noticias en mi lector RSS he encontrado un artículo interesante que comparto con vosotros.
Se trata de un programa que permitirá tener un sistema debian básico en el dispostivo.

- **Paso 1:** Instalar busybox (Herramienta que provee de varias utilidades estándares de Unix) desde la play Store, (Requiere [root][1]) En caso de que el teléfono no esté rooteado, puedes seguir los pasos indicados en el vídeo de más abajo.
- **Paso 2:** Para conseguir que tu dispositivo sea aún más poderoso, instala <a href="https://play.google.com/store/apps/details?id=com.botbrew.basil">BostBrew Basil</a>, esta aplicación inicializa el sistema base y permite manejar la instalación de paquetes mediante Dpkg y Apt en lugar de Opkg. Permitiendo instalar algunos paquetes linux.
- **Paso 3:** Instalar los paquetes necesarios

<!--more--><!--ad-->

Conectamos el teléfono al pc mediante adb con `./adb shell` y ejecutamos los comandos de **botbrew** así:

```bash
/data/botbrew-basil/init -- comando aquí
```

Es decir, para instalar un entorno debian completo, se haría lo siguiente:

```bash
sh-4.1# /data/botbrew-basil/init -- apt-get install repository-emdebian
sh-4.1# /data/botbrew-basil/init -- apt-get install debianbotbrew-debian-minimal
```

Existe la posibilidad de instalar el paquete **botbrew-wrapper** para evitar tener que preceder los comandos con la ruta mencionada arriba:

```bash
shell@android:/ # /data/botbrew-basil/init -- apt-get install botbrew-wrapper
```

A partir de ahora basta con ejecutar el comando **botbrew2** y seguidamente los comandos deseados, por ejemplo, para isntalar gcc y g++:

```bash
shell@android:/ # su
shell@android:/ # botbrew2
shell@android:/ # apt-get install gcc g++
```

Instalados los compiladores, podemos ejecutar aplicaciones escritas en C/C++, probemos con un hola Mundo:

```cpp
#include <iostream>

int main(){
   std::cout << "Hola mundo!" << std::endl;
   std::cout << "Compilado y ejecutado desde Android" << std::endl;
   return 0;
}
```

Ya solo queda compilarlo y ejecutarlo, dejo una captura de pantalla como prueba de que funciona:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/Screenshot_2012-12-04-17-14-141.png" alt="" title="Compilando código C/C++ en android" width="800px" height="480px"></amp-img>
</figure>

Y no solo eso, también podemos instalar python:

```python
shell@android:/tmp # apt-get install python2.7-minimal
shell@android:/ # cd /tmp
shell@android:/ # echo "print "Hola Mundo desde Android!"" >> hello.py
shell@android:/ # python2.7 hello.py
Hola Mundo desde Android!
```

De nuevo, com prueba, una captura de pantalla:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/Screenshot_2012-12-04-17-32-141.png" alt="" title="Ejecutando programas en python desde Android" width="800px" height="480px"></amp-img>
</figure>

A continuación un vídeo explicando el proceso de instalación de busybox sin permisos de root:

### Referencias

- *Geeknizer* »» <a href="http://geeknizer.com/install-run-linux-applications-on-android/" target="_blank">Visitar sitio</a>
- *XDA-Developers* »» <a href="http://forum.xda-developers.com/showpost.php?p=26261600&postcount=119" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/rootear-samsung-galaxy-s-gt-i9003/ "Rootear Samsung Galaxy S GT-I9003"