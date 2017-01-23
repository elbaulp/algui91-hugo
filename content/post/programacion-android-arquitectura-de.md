---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-10-01
layout: post.amp
mainclass: android
url: /programacion-android-arquitectura-de/
tags:
- content provider
- curso android pdf
- "Programaci\xF3n Android: Arquitectura de los Proveedores de contenidos"
title: "Programaci\xF3n Android: Arquitectura de los Proveedores de contenidos"
---

Vamos a examinar algunos de los elementos que componen los proveedores de contenidos(CV) y cómo éstos se relacionan con otras abstracciones de acceso a datos.

En conujunto, los CV tienen un enfoque paralelo a las siguientes abstracciones:

  * Sitios webs
  * [REST][1]
  * Servicios web
  * [Procedimientos Almacenados][2]

Cada CV de un dispositivo se registra a sí mismo de manera similar a como lo hace un sitio web con cadenas de texto (similar a los nombres de domínio, pero para los CV se llama *authority*). Esta cadena asenta las bases del conjunto de URIs que este CV puede ofrecer. No es diferente a como un sitio web con un dominio ofrece un conjunto de URls que muestran sus documentos o contenido en general.

<!--more--><!--ad-->

El registro de la authority se hace en el [androidManifest][3]. A continuación se muestran dos ejemplos de como se deben registrar proveedores (en este caso de la aplicación [FavSItes][4]):

```xml
<provider android:name=".SitesProvider"
android:authorities="com.elbauldelprogramador.provider.FavSites" />
```

Un authoroty es como un nombre de dominio para ese CV. Con el authority anterior, las urls de nuestro proveedor comenzarán con ese prefijo:

```bash
content://com.elbauldelprogramador.provider.FavSites
```

Como se ve, los CV, como los sitios web, tienen un nombre de dominio base que actúa como URL inicial.

Los CV también proporcionan URLs del tipo REST para recuperar o manipular datos. Para el registro que acabamos de ver, el URI para identificar un directorio o una colección de datos en la base de datos de FavSites será:

```bash
content://com.elbauldelprogramador.provider.FavSites/sites
```

Y para identificar un dato específico:

```bash
content://com.elbauldelprogramador.provider.FavSites/sites/#
```

Donde # es el id del dato específico, en el caso de la mi aplicación, un lugar en el mapa. A continuación algunos ejemplos de URIs que se aceptan:

```bash
content://media/internal/images
content://media/external/images
content://contacts/people
content://contacts/people/23
```

> Nótese que estos CV (content://media y content://contacts) no tienen una estructura completa como los vistos más arriba. Se debe a que no son CV de terceros, son propios de Android y él es quién los controla.

## Siguiente Tema: [Proveedores de Contenidos - Leer datos mediante URIs][5]

 [1]: https://elbauldelprogramador.com/buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/
 [2]: https://elbauldelprogramador.com/plsql-procedimientos-y-funciones/
 [3]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
 [4]: https://elbauldelprogramador.com/prueba-la-aplicacion-favsites-en-tu/
 [5]: https://elbauldelprogramador.com/programacion-android-proveedores-de_28/
