---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-09-25'
lastmod: 2016-08-11
layout: post.amp
mainclass: linux
permalink: /renombrar-archivos-masivamente-en/
tags:
- renombrar archivos linux masivo
- renombrar linux
title: Renombrar archivos masivamente en GNU/Linux
---

En ocasiones, cuando bajamos archivos de internet (Normalmente música), cada archivo tiene en el nombre la dirección de la página web de donde se descargó.

Si queremos renombrar todos los archivos para eliminar la página web del nombre del archivo, no es necesario ir uno por uno renombrando, usando el comando rename de GNU/linux lo conseguimos fácilmente.

Por ejemplo, pongamos que los archivos son los siguientes:


<!--more--><!--ad-->

```bash
hkr@hkr:~/Desktop/RAP/d$ ls
01. Rafael Lechowski (Flowklorikos) - Uno - www.HHGroups.com.mp3
02. Rafael Lechowski (Flowklorikos) - Lluvia y fuego - www.HHGroups.com.mp3
03. Rafael Lechowski (Flowklorikos) - Donde duele inspira - www.HHGroups.com.mp3
04. Rafael Lechowski (Flowklorikos) - Por amor al odio (con Gregory Isaacs) - www.HHGroups.com.mp3
05. Rafael Lechowski (Flowklorikos) - Soy loco por ti - www.HHGroups.com.mp3
06. Rafael Lechowski (Flowklorikos) - Desde el barro (con Carlos Talavera) - www.HHGroups.com.mp3
07. Rafael Lechowski (Flowklorikos) - Folio en blanco (Improvisacion) - www.HHGroups.com.mp3
08. Rafael Lechowski (Flowklorikos) - In-extremis - www.HHGroups.com.mp3
09. Rafael Lechowski (Flowklorikos) - Sucio (con Carlos Talavera) - www.HHGroups.com.mp3
10. Rafael Lechowski (Flowklorikos) - Artesano del arte insano - www.HHGroups.com.mp3
11. Rafael Lechowski (Flowklorikos) - Cosquijazz - www.HHGroups.com.mp3
12. Rafael Lechowski (Flowklorikos) - Mis ego depresiones - www.HHGroups.com.mp3
13. Rafael Lechowski (Flowklorikos) - 13 - www.HHGroups.com.mp3
```

Queremos elmininar las siguientes partes del nombre: **Rafael Lechowski (Flowklorikos)** y **www.HHGroups.com**. Para ello usamos la orden rename con la siguiente sintaxis:

```bash
rename 's/Rafael Lechowski (Flowklorikos) - //g' *.mp3
```

Lo que decimos con esa expresión regular es que reemplace lo que coincida con Rafael Lechowski (Flowklorikos) por nada, es decir, que lo elimine del nombre. Es necesario escapar con los espacios en blanco y los parentesis. El *.mp3 quiere decir que aplique el renombramiento a los archivos mp3.

Como resultado, ahora los ficheros tienen el siguiente nombre:

```bash
hkr@hkr:~/Desktop/RAP/d$ ls -1
01. Uno - www.HHGroups.com.mp3
02. Lluvia y fuego - www.HHGroups.com.mp3
03. Donde duele inspira - www.HHGroups.com.mp3
04. Por amor al odio (con Gregory Isaacs) - www.HHGroups.com.mp3
05. Soy loco por ti - www.HHGroups.com.mp3
06. Desde el barro (con Carlos Talavera) - www.HHGroups.com.mp3
07. Folio en blanco (Improvisacion) - www.HHGroups.com.mp3
08. In-extremis - www.HHGroups.com.mp3
09. Sucio (con Carlos Talavera) - www.HHGroups.com.mp3
10. Artesano del arte insano - www.HHGroups.com.mp3
11. Cosquijazz - www.HHGroups.com.mp3
12. Mis ego depresiones - www.HHGroups.com.mp3
13. 13 - www.HHGroups.com.mp3
```

Falta eliminar la parte www.HHGroups.com, que lo conseguimos con esta orden:

```bash
rename 's/ - www.HHGroups.com//g' *.mp3
```

Y finalmente, tenemos todos nuestros archivos renombrados:

```bash
hkr@hkr:~/Desktop/RAP/d$ ls -1
01. Uno.mp3
02. Lluvia y fuego.mp3
03. Donde duele inspira.mp3
04. Por amor al odio (con Gregory Isaacs).mp3
05. Soy loco por ti.mp3
06. Desde el barro (con Carlos Talavera).mp3
07. Folio en blanco (Improvisacion).mp3
08. In-extremis.mp3
09. Sucio (con Carlos Talavera).mp3
10. Artesano del arte insano.mp3
11. Cosquijazz.mp3
12. Mis ego depresiones.mp3
13. 13.mp3
```