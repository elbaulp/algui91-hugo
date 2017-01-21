---
author: alex
categories:
- android
- opensource
color: '#689F38'
lastmod: 2016-10-28
layout: post.amp
mainclass: android
permalink: /programacion-android-implementando-un/
tags:
- Content Provider Android
- curso android pdf
title: "Programaci\xF3n Android: Implementando un Content Provider (Parte 1)"
---

Esta es la primera entrada de un total de 4 en la que se irán describiendo los pasos a dar para crear nuestro propio proveedor de contenidos.

Ya hemos visto cómo [interactuar con un Content provider][1], pero no hemos visto aún cómo escribir nuestro propio Content Provider. Para hacerlo, es necesario extender de *android.content.ContentProvider* e implementar los siguientes métodos:

<!--more--><!--ad-->

  * query
  * insert
  * update
  * delete
  * getType

También necesitamos configurar unas cuantas cosas antes de implementarlo. Los paso a seguir para implementarlo son los siguientes:

  1. Plantear nuestra [base de datos][2], [URIs][3], nombres de columnas y crear clases de metadatos que definirán constantes para todos estos elementos de metadatos.
  2. [Extender la clase abstracta ContentProvider][4].
  3. Implementar los métodos query, insert, update, delete y getType.
  4. Registrar el proveedor en el Android Manifest.

### Planteamiento de la base de datos

El siguiente planteamiento de la base de datos pertenece a la aplicación [FavSites][5], proyecto que realicé tiempo atrás y registrado bajo licencia [GPLv3][6]. Esta base de datos contiene una única tabla con las columnas nombre, descripción, latitud, longitud y foto. Estos nombres de columnas pasarán a formar parte de los metadatos en nuestra clase FavSitesProviderMetadata.

```java
//FavSites for Android
//    Copyright (C) 2011  Alejandro Alcalde Barros
//
//This file is part of FavSites.
//
//    FavSites is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//   FavSites is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with FavSites.  If not, see <http:>.


package com.elbauldelprogramador.favsites.provider;

import android.net.Uri;
import android.provider.BaseColumns;

/**
 * @author Alejandro Alcalde
 * Definiciones necesarias para almacenar la información
 */
public class FavSitesProviderMetaData {

   public static final String AUTHORITY = "com.elbauldelprogramador.provider.FavSites";

   public static final String DATABASE_NAME = "favsites.db";
   public static final int DATABASE_VERSION = 1;
   public static final String FAVSITES_TABLE_NAME = "favSites";

   private FavSitesProviderMetaData() {}

   /**
    * Clase interna para describit la tabla favSites
    */
   public static final class favSitesTableMEtaData implements BaseColumns{

      private favSitesTableMEtaData() {}

      public static final String TABLE_NAME = "favSites";

      /**
       * DEfinición del Content URI y MIMEs
       */
      public static final Uri CONTENT_URI
              = Uri.parse("content://" + AUTHORITY + "/sites");

      public static final String CONTENT_TYPE
               = "vnd.android.cursor.dir/vnd.favsites.site";

      public static final String CONTENT_ITEM_TYPE
               = "vnd.android.cursor.item/vnd.favsites.site";
      /**
       * Orden por defecto de la tabla
       */
      public static final String DEFAULT_SORT_ORDER = "_ID DESC";

      /**
       * Orden personalizado
       */
      public static final String SORT_BY_NAME_DESC = "name DESC";
      public static final String SORT_BY_NAME_ASC = "name ASC";

      //Columnas propias

      /**
       * Nombre del sitio
       * Type: TEXT
       */
      public static final String NAME = "name";

      /**
       * Descripcion del sitio
       * Type: TEXT
       */
      public static final String DESCRIPCION = "descripcion";

      /**
       * LATIDTUD
       * Type: INTEGER (long)
       */
      public static final String LATITUD = "latitud";

      /**
       * LONGITUD
       * Type: INTEGER (long)
       */
      public static final String LONGITUD = "longitud";

      /**
       * Fotografia del sitio
       * Type: TEXT
       */
      public static final String FOTO = "foto";
   }

}
```

Esta clase *FavSitesProviderMetaData* comienza definiendo que su authority será *com.elbauldelprogramador.provider.FavSites*. Usaremos esta cadena de texto para registrar el proveedor en el Android Manifest. Esta cadena forma la parte principal de la URI de este proveedor.

Despues procedemos a definir una tabla (favSites) como una clase interna de *FavSitesProviderMetaData*. Posteriormente, la clase *favSitesTableMEtaData* define una URI para identificar las colecciones de sítios. Dada la authority del párrafo anterior, la URI para una colección de sítios será como la siguiente:

```bash
content://com.elbauldelprogramador.provider.FavSites/sites
```

La constante que se refiere a esta URI es:

```bash
FavSitesProviderMetaData.favSitesTableMEtaData.CONTENT_URI
```

La clase *favSitesTableMEtaData* define los MIME types para una colección de sitios y de un único sítio. La implementación del proveedor usará estas constantes para devolver los MIME types para las URIs entrantes.

*favSitesTableMEtaData* también declara un conjunto de columnas: nombre, descripción, latitud, longitud y foto.

> Es aconsejable describir los tipos de datos que poseen las columnas mediante comentarios.

Además, la clase *favSitesTableMEtaData* hereda de la clase *BaseColumns*, la cual proporciona el campo estandar *_ID*, que representa el identificador de la fila. Con todas estas definiciones de metadatos, estamos listos para continuar con la implementación de nuestro proveedor.

## Siguiente Tema: [Implementando un Content Provider (Parte 2)][7]

 [1]: https://elbauldelprogramador.com/programacion-android-actualizar-y
 [2]: https://elbauldelprogramador.com/bases-de-datos
 [3]: https://elbauldelprogramador.com/programacion-android-proveedores-de_28
 [4]: https://elbauldelprogramador.com/programacion-android-implementando-un_08
 [5]: https://elbauldelprogramador.com/prueba-la-aplicacion-favsites-en-tu
 [6]: https://elbauldelprogramador.com/evaluando-el-estado-de-la-licencia-gpl
 [7]: https://elbauldelprogramador.com/programacion-android-implementando-un_08/
