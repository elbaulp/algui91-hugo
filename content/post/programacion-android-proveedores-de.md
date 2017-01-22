---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-10-01
layout: post.amp
mainclass: android
permalink: /programacion-android-proveedores-de/
tags:
- curso android pdf
title: "Programaci\xF3n Android: Proveedores de Contenido - Introducci\xF3n"
---

Android llama Proveedor de contenido a la abstracción de datos en Servícios. Digamos que un proveedor de contenido (CV a partir de ahora [de Content Provider]) es como un envoltorio para los datos. Una base de datos SQLite en un dispositivo Android es un ejemplo de fuente de datos (data source) que se encapsula en un CV.

Para recuperar datos de un cv o guardarlos en él, se necesitan usar un conjunto de Uris REST. Por ejemplo, si quisiéramos recuperar un conjunto de notas desde un cv que es una encapsulación de una base de datos de Notas, necesitaríamos usar una URI parecida a esta:

<!--more--><!--ad-->

```bash
content://com.android.note.NoteProvider/notes
```

> REST (REpresentational State Transfer). Es simplemente un concepto que, como usuarios de la web, casi todos estamos famirializados con él. Cuando introducimos una URL en el navegador y el servidor web responde con HTML, esencialmente estamos realizando una consulta basada en REST sobre el servidor web. De manera similar, cuando actualizamos algún contenido de un formulario web, estamos haciendo una actualización (update) basada en <a target="_blank" href="https://elbauldelprogramador.com/buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/">REST</a> en el servidor web y cambiando su estado.

Para recuperar una nota específica de la base de datos de notas, (la nota 25 por ejemplo), se necistará una URI como la siguiente:

```bash
content://com.android.note.NoteProvider/notes/25
```

En futuras entradas veremos como estas Uris se traducen para usarse con los mecanismos de acceso a la base de datos. Cualquier aplicación del dispositivo puede usar estas URIs para acceder y manipular datos. Como consecuencia, los CV desempeñan un papel importante compartiendo datos entre aplicaciones.

Estrictamente hablando, la responsabilidad de los CV abarcan más mecanismos de encapsulación que el acceso a datos. Se necesitará un mecanismo de acceso a datos como por ejemplo SQLite o acceso a red para recibir datos.Debido a esto, La abstracción de los CV se requiere solamente si queremos compartir datos externamente o entre aplicaciones. Para el acceso interno a los datos, nuestra aplicación puede usar cualquier mecanismo de almacenamiento/acceso de datos de entre los siguientes:

  * ***Preferencias***: Es un conjunto de pares *clave/valor* que se usa para almacenar de manera persistente las preferencias de la aplicación.
  * ***Archivos:*** Archivos internos de la aplicación que podemos almacenar en un medio de almacenamiento extraible.
  * ***SQLite:*** Bases de datos SQLite, Cada una es privada al paquete que la crea.
  * ***Red:*** Un mecanismo que permite recibir o almacenar datos externamente a través de internet.

> A pesar de los numerosos mecanismos de acceso a datos permitidos en Android, en este <a href="/planteamiento-de-la-segunda-parte-del.html">segundo tomo del Curso de programación Android</a>, me voy a centrar en SQlite y la abstracción del CV, ya que los CV componen la base del intercambio de datos, el cual es mucho más común en Android que en cualquier otro Framework.

### Siguiente Tema: [Programación Android: Arquitectura de los Proveedore de contenidos][1]

 [1]: https://elbauldelprogramador.com/programacion-android-arquitectura-de/