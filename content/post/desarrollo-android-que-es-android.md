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
url: /desarrollo-android-que-es-android/
tags:
- curso android pdf
title: "Desarrollo android. \xBFQu\xE9 es Android?. Traducci\xF3n de developer.android.com"
---

# ¿Qué es Android?

Android es un conjunto de software para dispositivos móviles que incluye Sistema Operatívo, [middleware](http://es.wikipedia.org/wiki/Middleware) y las aplicaciones principales. El [SDK de Android](http://developer.android.com/sdk/index.html) proporciona las herramientas y APIs necesarias para comenzar a desarrollar aplicaciones para la plataforma Android usando el lenguaje de programación Java.

<!--more--><!--ad-->

## Características

* **Un Framework** que permite la reutilización y sustitición de componentes
* **Máquina virtual de Dalvik** optimizada para dispositivos móviles
* **Navegador integrado** basado en el motor de código libre [WebKit](http://webkit.org/)
* **Gráficos optimizados** proporcionados por una colección de librerías gráficas 2D personalizadas; Gráficos 3D basados en la especificación OpenGL ES 1.0 (aceleración hardware opcional)
* **SQLite** para almacenamiento de datos estructurados
* **Soporte multimedia** para audio, vídeo, y formatos de imágenes (MPEG4, H.264, MP3, AAC, AMR, JPG, PNG, GIF)
* **Telefonía GSM** (dependiente del hardware)
* **Bluetooth, EDGE, 3G, y WiFi** (dependiente del hardware)
* **Cámara, GPS, compass y acelerómetro** (dependiente del hardware)
* **Un rico entorno de desarrollo** incluyendo un emulador de dispositivos, herramientas para depuración, perfiles de remdimiento y memória y plugin para el IDE Ecplipse

## Arquitectura Android

El siguiente diagrama muestra los principales componentes del sistema operatívo Android.  Cada sección se describe con más detalle abajo.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" width="512" height="368" src="https://lh4.googleusercontent.com/_IlK2pNFFgGM/TahoYPof5pI/AAAAAAAAAbA/uX4dBYbzVbA/system-architecture.jpg" alt="Android System Architecture"></amp-img>
</figure>

## Aplicaciones

Android viene por defecto con un conjunto de aplicaciones básicas como un cliente de correo electrónico, programa de SMS, calendario, mapas, navegador, contactos etc. Todas las aplicaciones están escritas en java.


## Framework

Al proporcionar una plataforma de desarrollo libre, Android ofrece a los desarrolladores la posibilidad de construir aplicaciones muy solidas e innovadoras. Los desarrolladores tienen la libertad de aprovechar el hardware del dispositivo, acceder a la información de localización, ejecutar servícios en segundo plano, fijar alarmas, añadir notificaciones a la barra de estado, y mucho, mucho más.

Los desrrolladores tienen pleno acceso a las mismas APIs usadas por las apliaciones principales.  La arquitectura de la aplicación está diseñada para simplificar la reutilización de los componentes; cualquier aplicación puede publicar sus capacidades y cualquier otra aplicación puede hacer uso de esas capacidades (sujeto a las restricciones de seguridad del framework).  Este mismo mecanismo permite que los componentes sean reemplazados por los usuarios.

Esencialmente todas las aplicaciones son un conjunto de servicios y sistemas, incluyendo:

*   Un rico y extensible conjunto de _Vistas_ que se usan para construir una aplicación, incluyendo listas, grids, cajas de texto, botones e incluso un navegador web embebido.
*   [`Proveedores de contenido`](/programacion-android-proveedores-de/) que permiten a las aplicaciones el acceso a otras aplicaciones (como los Contactos), o para compartir sus propios datos
*   Un [`Gestor de Recursos`](/programacion-android-recursos/), que facilita el acceso a recursos que no son código, como cadenas de traducción, gráficos y archivos de diseño(layout)
*   Un [`Gestor de notificaciones`](/programacion-android-interfaz-grafica_11/) que permite a las aplicaciones mostrar alertas personalizadas en la barra de estado
*   Un [`Gestor de antividades`](/programacion-android-trabajar-con/) que gestiona el ciclo de vida de las aplicaciones y proporciona una navegación backstack común

Para obtener más detalles y un tutorial sobre las aplicaciones, vea el Notepad Tutorial.

## Librerías

Android incluye un conjunto de librerías C/C++ usadas por varios componentes del sistema Android. Estas capaciddes están expuestas para los desarrolladores a través del framework android. Abajo se listan algunas de las librerías principales:

*   **System C library** – una implementación de la librería estandar del systema de C (libc) derivada de BSD
*   **Librerías multimedia** – Basado en OpenCORE PacketVideo; estas librerías soportan reproducción y grabación en formatos de áudio y vídeo, así como archivos de imágenes estáticas, incluyendo MPEG4, H.264, MP3, AAC, AMR, JPG Y PNG
*   **Gestor de superfícies** – gestiona el acceso a la pantalla y compone sin problemas gráficos en 2D y 3D de múltiples aplicaciones.
*   **LibWebCore** – Un motor web moderno
*   **SGL** – El motor base de gráficos 2D
*   **3D libraries** – Una implementación basada en el API OpenGL ES 1.0; la librería usa la aceleración hardware 3D (Donde esté disponible)
*   **FreeType** – Renderización de bitmap y fuentes vectoriales
*   **SQLite** – Un potente y ligero motor de base de datos relacional disponible para todas las aplicaciones

## Android Runtime

Android incluye un conjunto de librerías principales que proporcionan la mayor parte de la funcionalidad disponible en la librerías de Java.

Cada aplicación android se ejecuta en su propio proceso, que es una instancia propia de la máquina virtual de Dalvik. Dalvik ha sido escrito para que un dispositivo pueda ejecutar múltiples MVs eficientemente. La máquina virtual de Dalvik ejecuta archivos en formato .dex(que son sus ejecutables). Este formato está optimizado para consumir el mínimo de memória. La MV está basada en registros, y ejecuta clases compiladas en java que posteriormente se transforman al formato .dex por la herramienta "dx"

La MV de Dalvik se basa en el kernel de Linux para obtener su funcionalidad, como hilos(Threading) y administración de memória a bajo nivel.

## El kernel Linux

Android se basa en la versión 2.6 de linux para el sistema de servícios esenciales como seguridad, gestión de memoria, gestión de procesos, pila de red y el conductor de modelos.  El kernel también actua como una capa de abstracción entre el hardware y el resto del software.

## Siguiente: [Fundamentos aplicaciones Android – (Parte I)][1]

 [1]: https://elbauldelprogramador.com/fundamentos-aplicaciones-android-parte/
