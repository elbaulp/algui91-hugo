---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-10-28
layout: post.amp
mainclass: android
permalink: /programacion-android-implementando-un_08/
tags:
- Content Provider Android
- curso android pdf
- fundamentos sqlite android
title: "Programaci\xF3n Android: Implementando un Content Provider (Parte 2)"
---

En la anterior entrada de [programación Android][1], hablamos de cómo empezar a implementar un proveedor de contenido desde cero, empezando por el [planteamiento de la base de datos.][2] En esta entrada vamos a ver cómo extender de la clase ContentProvider.

Para implementar el content provider de la aplicación [FavSites][3] hemos de extender de la clase ContentProvider y sobreescribir *onCreate()* para crear la base de datos y después implementar los métodos query, insert, update, delete y getType. En esta segunda parte de cuatro en la que se explica cómo implementar un content provider desde cero, vamos a ver cómo configurar inicialmente en conten provider, en la siguente entrada se verá como implementar los métodos query, insert, update, delete y getType.

<!--more--><!--ad-->

El método query requiere el conjunto de columnas que tiene devolver. Es similar a una cláusula [select][4], que necesita los nombres de las columnas junto con sus homólogos, a veces llamados también sinónimos. Android usa un objeto *map* al que llama *projection map* para representar los nombres de columnas y sus sinónimos. Es necesario crear este objeto para poder usarlo posteriormente en la implementación del método query.

La mayoría de los métodos que se van a implementar reciben como parámetro una [URI][5]. Aunque a todas las URIs a las que este proveedor es capaz de responder empiezan de la misma forma, el final de dicha URI sí que puede ser diferente (Como cualquier sítio web). Cada URI, puede ser distinta al final para identificar datos o documentos:

```bash
content://com.elbauldelprogramador.provider.FavSites/sites
content://com.elbauldelprogramador.provider.FavSites/sites/64
```

Dadas estas dos URIs, el proveedor de FavSites necesita distinguir cada una de ellas. Si, por ejemplo, nuestro proveedor usara más objetos a parte de lugares, entonces habría más URIs que identificaran cada objeto.

La implementación del proveedor necesita un mecanismo para distinguir una URI de otra, para hacerlo, Android usa una clase llamada *UriMatcher*. Por lo tanto, necesitamos configurar este objeto para todas nuestras variaciones de URIs. En el código este paso se realiza despues del segmento que crea el projection map (Estará comentado). [Más adelante comentaremos en detalle lo que hace esa porción de código][6].

El código que se muestra a continuación, sobreescribe el método onCreate() para crear la base de datos. Despues se implementan los métodos query, insert, update, delete y getType. Por razones de claridad del código, no voy a mostrar el código de estos métodos, ya que se explicarán en [entradas posteriores][6].

```java
/**
FavSites for Android
    Copyright (C) 2011  Alejandro Alcalde Barros

This file is part of FavSites.

    FavSites is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    FavSites is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with FavSites.  If not, see <http:>.
*/

package com.elbauldelprogramador.favsites;

import java.sql.SQLException;
import java.util.HashMap;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import com.elbauldelprogramador.favsites.provider.FavSitesProviderMetaData;
import com.elbauldelprogramador.favsites.provider.FavSitesProviderMetaData.favSitesTableMEtaData;

public class SitesProvider extends ContentProvider{

   //Etiqueta ayuda para el loggeo. No tiene importancia para el cp.
   private static final String TAG = "SitesProvider";

   //Configurando el projection Map
   //El projection map es similar a "as" (alias de columna)
   private static HashMap<string> sSitesProjectionMap;
   static{
      sSitesProjectionMap = new HashMap<string>();
      sSitesProjectionMap.put(favSitesTableMEtaData._ID,
                              favSitesTableMEtaData._ID);

      //nombre, desc, lati, long, foto
      sSitesProjectionMap.put(favSitesTableMEtaData.NAME,
                              favSitesTableMEtaData.NAME);
      sSitesProjectionMap.put(favSitesTableMEtaData.DESCRIPCION,
                              favSitesTableMEtaData.DESCRIPCION);
      sSitesProjectionMap.put(favSitesTableMEtaData.LATITUD,
                              favSitesTableMEtaData.LATITUD);
      sSitesProjectionMap.put(favSitesTableMEtaData.LONGITUD,
                              favSitesTableMEtaData.LONGITUD);
      sSitesProjectionMap.put(favSitesTableMEtaData.FOTO,
                              favSitesTableMEtaData.FOTO);
   }

   //Configuracion de las URIs
   //Propocionando un mecanismo para identificar
   //todos los patrones uri entrantes. (UriMatcher)
   private static final UriMatcher sUriMatcher;
   private static final int INCOMING_SITE_COLLECTION_URI_INDICATOR = 1;
   private static final int INCOMING_SINGLE_SITE_URI_INDICATOR = 2;
   static {
      sUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
      sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites",
                         INCOMING_SITE_COLLECTION_URI_INDICATOR);
      sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites/#",
                         INCOMING_SINGLE_SITE_URI_INDICATOR);
   }

   /**
    * Configurar/Crear la BD
    * Esta clase ayuda a abrir, crear y actualizar la bd
    */
   private static class DatabaseHelper extends SQLiteOpenHelper{

      DatabaseHelper(Context context){
         super(context,
             FavSitesProviderMetaData.DATABASE_NAME,
             null,
             FavSitesProviderMetaData.DATABASE_VERSION);
      }

      @Override
      public void onCreate(SQLiteDatabase db) {
         Log.d(TAG, "inner onCreate called");
         db.execSQL("CREATE TABLE " + favSitesTableMEtaData.TABLE_NAME + " ("
           + favSitesTableMEtaData._ID + " INTEGER PRIMARY KEY, "
           + favSitesTableMEtaData.NAME + " TEXT, "
           + favSitesTableMEtaData.DESCRIPCION + " TEXT, "
           + favSitesTableMEtaData.LATITUD + " REAL, "
           + favSitesTableMEtaData.LONGITUD + " REAL, "
           + favSitesTableMEtaData.FOTO + " TEXT"
           + ");");
      }

      @Override
      public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
         Log.d(TAG, "inner onUpgrade called");
         Log.w(TAG, "Upgrading database from version "
               + oldVersion + " to "
               + newVersion + ", wich will destroy all old data");
         db.execSQL("DROP TABLE IF EXISTS "
                   + favSitesTableMEtaData.TABLE_NAME);
         onCreate(db);
      }

   }

   private DatabaseHelper mOpenHelper;

   @Override
   public int delete(Uri uri, String where, String[] whereArgs) {
      //...
   }

   @Override
   public String getType(Uri uri) {
      //...
   }

   @Override
   public Uri insert(Uri uri, ContentValues initialValues) {
      //...
   }

   @Override
   public boolean onCreate() {
      Log.d(TAG, "main onCreate Called");
      mOpenHelper = new DatabaseHelper(getContext());
      return true;
   }

   @Override
   public Cursor query(Uri uri, String[] projection, String selection,
         String[] selectionArgs, String sortOrder) {
      //...
   }

   @Override
   public int update(Uri uri, ContentValues values, String where,
         String[] whereArgs) {
      //...
   }

}
```

## Siguiente Tema: [Implementando un Content Provider (Parte 3)][7]

 [1]: https://elbauldelprogramador.com/guia-de-desarrollo-android
 [2]: https://elbauldelprogramador.com/programacion-android-implementando-un
 [3]: https://elbauldelprogramador.com/prueba-la-aplicacion-favsites-en-tu
 [4]: https://elbauldelprogramador.com/consulta-de-datos-clausula-select
 [5]: https://elbauldelprogramador.com/programacion-android-proveedores-de_28
 [6]: https://elbauldelprogramador.com/programacion-android-implementando-un_14
 [7]: https://elbauldelprogramador.com/programacion-android-implementando-un_14/