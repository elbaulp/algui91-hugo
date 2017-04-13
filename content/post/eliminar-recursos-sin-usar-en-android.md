---
author: alex
categories:
- android
color: '#689F38'
date: '2016-01-01'
description: "Trabajando en el proyecto SWADroid \t(Fuente en Github), y tras pasar
  la herramienta Lint, me encontré con cientos de recursos sin usar, que debía
  eliminar a mano. Pensé que debía existir alguna herramienta que permitiera
  automatizar el proceso, y de hecho, exíste, Android Resource Remover. Hoy veremos
  cómo usar ésta herramienta para eliminar recursos sin usar en Android."
lastmod: 2015-12-24

mainclass: android
url: /eliminar-recursos-sin-usar-en-android/
tags:
- Android Resource Remover
- ejemplo Android Resource Remover
- eliminar recursos Android
- limpiar proyecto Android
- recursos sin usar Android
- tutorial Android Resource Remover
- unusedResources Android
title: Eliminar recursos sin usar en Android
---

Trabajando en el proyecto [SWADroid][1] \| [(Fuente en Github)][2], y tras pasar la herramienta `Lint`, me encontré con cientos de recursos sin usar, que debía eliminar a mano. Pensé que debía existir alguna herramienta que permitiera automatizar el proceso, y de hecho, exíste, *Android Resource Remover*. Hoy veremos cómo usar ésta herramienta para eliminar recursos sin usar en Android.

<!--more--><!--ad-->

## El problema

A medida que un proyecto va creciendo, se usan más y más [recursos][3]. Con el paso del tiempo puede que muchos dejen de usarse al ser reemplazados por otros. En el caso de SWADRoid había cientos. La manera de resolverlos fue usando la herramienta *Android Resource Remover* cuya instalación procederemos a explicar ahora.

## Instalar Android Resource Remover

Bastante sencillo:

```bash
pip install android-resource-remover

```

## Ejecutar Android Resource Remover

Bastante sencillo también, basta con ejecutar

```bash
android-resource-remover

```

en el directorio del proyecto a limpiar.

### Problemas en la instalación

Si por algún motivo, el proceso de instalación no finaliza correctamente, es posible que falten los siguientes paquetes en el sistema.

```bash
sudo apt-get install libxml2-dev libxslt1-dev

```

En mi caso tuve que instalarlos.

También es posible que sea necesario actualizar la librería xml con

```bash
easy_install --upgrade lxml

```

## Uso avanzado

En mi caso, me encontré con problemas al usar el programa sin argumentos. Concretamente los pasos que seguí fueron:

```bash
lint --xml lint-result.xml -Wall --quiet --showall .

```

El significado de los parámetros es:

  * `--xml lint-result.xml` Guarda el resultado en el fichero indicado.
  * `-Wall` Comprueba todos *Warnings*, incluidos las desactivadas por defecto.
  * `--quiet` No muestra el progreso.
  * `--showall` No trunca mensajes demasiado largos.
  * `.` directorio sobre el que ejecutar `lint`.

Una vez finalizado el análisis, es posible eliminar los recursos sin usar usando *Android Resource Remover* con los siguientes parámetros:

```bash
android-resource-remover --xml lint-result.xml

```

## Eliminar Identificadores sin usar

Aunque *Android Resource Remover* por defecto eliminar únicamente recursos de tipo imágenes, ficheros xml etc, es posible hacer una ligera modificación al código para que elimine los identificadores sin usar. La línea a modificar es `root.findall('.//issue[@id="UnusedResources"]')`, basta modificarla a `root.findall('.//issue[@id="UnusedIDs"]')` y ejecutar de nuevo los pasos mencionados arriba.

## Resultado

Tras pasar *Android Resource Remover*, *SWADroid* paso a ocupar **1,5Mb** frente a las **2,3Mb** previas a la eliminación de los recursos sin usar.

#### Referencias

*Proyecto en Github* »» <a href="https://github.com/KeepSafe/android-resource-remover" target="_blank">github.com/KeepSafe/android-resource-remover</a>
*Remove unused Android resources to reduce APK size* »» <a href="http://keepsafe-engineering.tumblr.com/post/85828806276/remove-unused-android-resources" target="_blank">keepsafe-engineering.com</a>



 [1]: https://elbauldelprogramador.com/swadroid "Artículos en el blog de SWADroid"
 [2]: https://github.com/Amab/SWADroid/tree/develop "Proyecto en Github"
 [3]: https://elbauldelprogramador.com/programacion-android-recursos/ "PROGRAMACIÓN ANDROID: RECURSOS – INTRODUCCIÓN"
