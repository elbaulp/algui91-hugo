---
author: alex
categories:
- android
- aplicaciones
- opensource
color: '#689F38'
lastmod: 2016-09-06
layout: post.amp
mainclass: android
permalink: /fundamentos-aplicaciones-android-parte/
tags:
- curso android pdf
title: Fundamentos aplicaciones Android. (Parte I)
---

## Vista rápida

<!--more--><!--ad-->

* Las aplicaciones android están compuestas por uno o más componentes de aplicación ( Actividades, servícios, proveedores de contenido y emisores de notificaciones)
* Cada componente realiza una función diferente en el comportamiento de la aplicación general y cada uno se puede activar individualmente (incluso por otras aplicaciones)
* El archivo manifiesto, debe declarar todos los componentes de la aplicación y debe declarar también todos los requisitos de la aplicación, como la versión mínima de Android requerida y cualquier configuración hardware requerida
* Los recursos no-código de la aplicación (imágenes, archivos de diseño (layout) etc.) deben incluir alternativas para las distintas configuraciones de los dispositivos (tales como cadenas de texto distintas para cada idioma y diseños diferentes para los distintos tamaños de las pantallas.)

## Fundamentos de las aplicaciones

Las aplicaciones Android están escritas en el lenguaje de programación Java. El SDK de android compila todo el código con todos los datos y archivos de recursos en un _paquete Android_, un archivo de extensión `.apk`. Todo el código dentro de un archivo `.apk` se considera una aplicación y es lo que usan los dispositívos para instalar dicha aplicación

Una vez instalada en el dispositivo, cada aplicación corre bajo su própia área de seguridad:

* El sistema operativo Android es un sistema Linux multi-usuario en el cual cada aplicación se considera un usuario diferente.
* Por defecto, el sistama asigna a cada aplicación un único ID de usuario Linux (El Id lo usa solo el sistema y la aplicación no lo conoce). El sistema asigna permisos para todos los archivos de la aplicación para que sólo el ID de usuario asignado a esa aplicación tenga acceso a ellos.
* Cada proceso tiene su propia máquina Virtual (MV), por lo que el código de una aplicación se ejecuta de forma aislada de otras aplicaciones.
* Por defecto, cada aplicación se ejecuta en su propio proceso Linux. Android inicia el proceso cuando cualquiera de los componentes de la aplicación necesite ser ejecutado, a continuación finaliza el proceso cuando ya no sea necesario que siga en ejecución o cuando el sistema necesite recuperar la memoria para otras aplicaciones.

De este modo, el sistema Android implementa el _principio del mínimo privilegio_. Que significa; cada aplicación, por defecto, tiene acceso solo a los componentes que necesite para ejecutarse, a ninguno más.  Esto crea un entorno muy seguro en el cual una aplicación no puede acceder a partes del sistema a las que no se le haya dado permiso.

Sin embargo, existen formas de que una aplicación comparta datos con otra y que pueda tener acceso a servicios del sistema.

* Es posible que dos aplicaciones compartan el mismo ID de usuario Linux, en tal caso podrán acceder a los archivos de la otra aplicación. Para conservar los recursos del sistema, las aplicaciones con el mismo ID pueden ejecutarse en el mismo proceso y compartir la misma MV (También deben estar firmadas con el mismo certificado).
* Una aplicación puede solicitar permisos para acceder a datos del dispositivo como los contactos, SMS, la tarjeta SD, cámara, bluetooth y más. Los permisos de la aplicación se conceden en el instalación de la misma, y los otorga el usuario.

## Siguiente: [Fundamentos aplicaciones Android – (Parte II) – Componentes](https://elbauldelprogramador.com/fundamentos-aplicaciones-android-parte_18/)
