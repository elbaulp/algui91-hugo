---
author: alex
categories:
- misc
date: 2016-01-21 22:26:14
lastmod: 2017-03-23T15:48:05+01:00
description: "Todos sabemos que cuando borramos algo de nuestro disco duro, en realidad  no lo estamos borrando f\xEDsicamente. Realmente se libera el espacio que ten\xEDa  ese fichero ocupado para que se rellene con otros ficheros. Hasta que no se guarde  otro archivo en ese espacio, el fichero borrado es susceptible de ser recuperado.  Hoy veremos c\xF3mo es posible recuperar datos borrados de un disco duro."
image: hotlink-ok/Como-Recuperar-Datos-Borrados-De-Un-Disco.png
mainclass: misc
tags:
- autopsy
- "an\xE1lisis forense"
- "inform\xE1tica forense"
- recuperar fotos borradas
- recuperar ficheros borrados
- he borrado mi disco duro
- tutorial autopsy
- recuperar ficheros con autopsy
- autopsy tutorial
- restore deleted files with autopsy
- restore deleted image with autopsy
- "como recuperar informaci\xF3n de un disco duro"
title: "C\xF3mo Recuperar Datos Borrados De Un Disco"
---

<figure>
  <a href="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco.png"><amp-img sizes="(min-width: 556px) 556px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="556px" height="65px" /></a>
</figure>

Todos sabemos que cuando borramos algo de nuestro disco duro, en realidad no lo estamos borrando físicamente. Realmente se libera el espacio que tenía ese fichero ocupado para que se rellene con otros ficheros. Hasta que no se guarde otro archivo en ese espacio, el fichero borrado es susceptible de ser recuperado. Hoy veremos cómo es posible recuperar datos borrados de un disco duro.

<!--more--><!--ad-->

Esta técnica puede ser usada en el análisis forense de un sistema informático. No ya con el objetivo de recuperar un fichero, si no de demostrar que alguna vez existió cierto fichero con un contenido ilegal, amenazador etc. Para probar éste método vamos a simular una carta de amenaza que posteriormente borraremos del disco. Tras borrarlo, intentaremos buscar en dicho disco la evidencia de la amenaza, válida como prueba judicial. Más adelante mostraremos cómo recuperar una imagen borrada con autopsy.

> El contenido de este artículo es fruto de una práctica de Seguridad en Sistemas Operativos de la facultad de Ingeniería Informática de Granada.

# Buscando evidencias de delitos

## Crear una carta amenazadora

Para el primer ejemplo crearemos un fichero de texto con una amenaza (En un USB de poco tamaño, a ser posible), el texto es el siguiente:

```bash

$ echo "Esto es una amenaza" > carta.txt

```

Tras esto, borraremos el fichero que acabamos de crear.

```bash

$ rm carta.txt

```

## Crear una imagen del disco a analizar

En informática forense, lo ideal es crear una imagen del disco a analizar, para evitar modificarlo. Usaremos un pendrive por ser de menor capacidad:

```bash

$ dd if=/dev/sdc of=image.disco bs=512 # /dev/sdc es el pendrive
$ chmod 444 image.disco # Asignamos permisos de solo lectura para evitar contaminar las pruebas
$ mount -t vfat -ro,noexec image.disco /mnt/analisis # Montamos la imagen para analizarla

```

## Análisis de la imagen

Una vez montada la imagen, crearemos un fichero que contendrá las palabras más frecuentes usadas en una amenaza. En este caso se usarán dos únicamente:

```bash

$ cat busquedaEvidencias.txt
esto
amenaza

```

## Buscando evidencias en la imagen

Ahora solo resta buscar en la imagen creada del pendrive por palabras contenidas en el fichero creado arriba:

```bash

grep -aibf busquedaEvidencias.txt imagen.disco

```

La opción -b nos dice el desplazamiento en bytes en la imagen. El resultado es:

<figure>
<a href="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco-grep.png"><amp-img sizes="(min-width: 433px) 433px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco-grep.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="433px" height="676px" /></a>
</figure>

Como vemos, aunque se ha borrado el fichero, quedan pruebas de que se realizó una amenaza, y por tanto podrían usarse en contra de alguien en un juicio.

En la imagen anterior se muestra el desplazamiento en bytes donde se encontró una coincidencia de la lista de evidencias, para ver el contenido del fichero basta con usar el comando _xxd_ con el desplazamiento dado por grep, en este caso 40566354:

<figure>
<a href="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco.png"><amp-img sizes="(min-width: 556px) 556px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Como-Recuperar-Datos-Borrados-De-Un-Disco.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="556px" height="65px" /></a>
</figure>

# Recuperar una imagen borrada

Para realizar este proceso vamos a usar una herramienta llamada _autopsy_ una plataforma forense digital de código libre (Ver en [GitHub](https://github.com/sleuthkit/autopsy "Repositorio autopsy")).

## Crear la imagen del disco

Lo primero es copiar cualquier imagen, luego la borramos. Volvemos a crear una imagen del disco como en el paso anterior, con:

```bash

$ dd if=/dev/sdc of=image.disco bs=512 # /dev/sdc es el pendrive
$ chmod 444 image.disco # Asignamos permisos de solo lectura para evitar contaminar las pruebas
$ mount -t vfat -ro,noexec image.disco /mnt/analisis # Montamos la imagen para analizarla

```

## Instalar autopsy

Tras esto, instalamos _autopsy_ (Está disponible en los repositorios de linux). La pantalla principal es esta:

<figure>
<a href="/img/autopsyTutorial.png"><amp-img sizes="(min-width: 606px) 606px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/autopsyTutorial.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="606px" height="362px" /></a>
</figure>

## Buscar ficheros borrados

Pinchamos en el botón de crear un nuevo caso. Nos pedirá rellenar unos datos, y luego indicar la ruta a la imagen del disco. Una vez hecho esto, podemos comenzar a analizarlo. Seleccionada la imagen con la que trabajar, pinchamos en el botón de analizar:

<figure>
<a href="/img/autopsyAnalyce.png"><amp-img sizes="(min-width: 609px) 609px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/autopsyAnalyce.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="609px" height="224px" /></a>
</figure>

Y luego en file Analysis:

<figure>
<a href="/img/autopsyfileAnalysis.png"><amp-img sizes="(min-width: 1166px) 1166px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/autopsyfileAnalysis.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="1166px" height="360px" /></a>
</figure>

Como vemos, al final de la lista aparece un fichero borrado, que es una imagen. Debemos de fijarnos en la la columna _Meta_, en ella aparece un número en el que podemos pinchar, en este caso es el 7. Tras pinchar, aparecerá la siguiente pantalla:

<figure>
<a href="/img/autopsyMeta.png"><amp-img sizes="(min-width: 442px) 442px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/autopsyMeta.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="442px" height="565px" /></a>
</figure>

Aquí se muestra la información del fichero borrado, los sectores que ocupa etc. Ya que el contenido de la imagen está en los sectores que aparecen en esta página, necesitamos alguna forma de guardarlos, para ellos calcularemos cuantos sectores ocupa la imagen.

- Sabemos que la imagen comienza en el sector 15690.
- El último sector ocupado por la imagen borrada es el 16871
- Luego la imagen ocupa 16871 - 15690 = 1181 sectores

## Seleccionar el rango de sectores que ocupa la imagen

Ya solo resta pinchar en el enlace al primer sector de la imagen, y poner que queremos a partir de ese sector 1181 más, como se muestra en la imagen:

<figure>
<a href="/img/autopsyDataUnit.png"><amp-img sizes="(min-width: 925px) 925px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/autopsyDataUnit.png" title="C\xF3mo Recuperar Datos Borrados De Un Disco" alt="C\xF3mo Recuperar Datos Borrados De Un Disco" width="925px" height="386px" /></a>
</figure>

En estos momentos tenemos seleccionado el rango de sectores correcto, le damos a _Export Contents_ y nos descargaremos un fichero con extensión _raw_. Lo renombramos a _.jpg_  y lo guardamos. ¡Acabamos de recuperar nuestra imagen borrada!

Espero que os haya gustado el artículo. No dudeis en comentar!
