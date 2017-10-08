---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-08T16:48:20+01:00
url: /programacion-android-implementando-un_29/
tags:
- Content Provider
- curso android pdf
title: "Programación Android: Implementando un Content Provider (Parte 4)"
---

En esta última parte de una serie de [4 artículos][1] en los que se ha ido explicando cómo implementar un [ContentProvider][2] desde cero, se va a ver cómo registrar dicho proveedor y cómo darle uso.

# Registrar el proveedor

Para poder usar el proveedor es necesario registrarlo en el [AndroidManifest:][3]

```xml
<provider android:name=".SitesProvider"
android:authorities="com.elbauldelprogramador.provider.FavSites" />
```

<!--more--><!--ad-->

# Añadir registros

```java
String tag = "Insertando registros...";
ContentValues cv = new ContentValues();

Log.d(tag,"Adding a site...");

cv.put(FavSitesProviderMetaData.favSitesTableMEtaData.NAME,
   "NombreSitio");
cv.put(FavSitesProviderMetaData.favSitesTableMEtaData.DESCRIPCION,
   "Descripcion");
cv.put(FavSitesProviderMetaData.favSitesTableMEtaData.LONGITUD,
   paquete.getInt("long"));
cv.put(FavSitesProviderMetaData.favSitesTableMEtaData.LATITUD,
   paquete.getInt("lat"));

ContentResolver cr = getContentResolver();
Uri uri = FavSitesProviderMetaData.favSitesTableMEtaData.CONTENT_URI;

Log.d(tag,"site insert uri:" + uri);
Uri insertedUri = cr.insert(uri, cv);
Log.d(tag,"inserted uri:" + insertedUri);
```

# Eliminar registros

```java
ContentResolver cr = getContentResolver();
Uri uri = FavSitesProviderMetaData.favSitesTableMEtaData.CONTENT_URI;

Log.d("Deleting site...","site delete uri:" + uri);
   cr.delete(uri,
         "_ID=?",
         new String[]{"5"});
```

# Obtener el número de registros

Para realizar esto, debemos crear un [cursor][4] y contar el número de registros de este:

```java
Uri uri = FavSitesProviderMetaData.favSitesTableMEtaData.CONTENT_URI;
Cursor cur = managedQuery(uri,
                         null, // projection
                         null, // selection strings
                         null, // selection args array of strings
                         null);// sort order
int numeroRegistros = cur.getCount();
cur.close();
```

# Mostrar la lista de sítios

Muestra todo el contenido de la tabla sites de la base de datos.

```java
   /**
    * Función que imprime los resultados por el Log.
    */
   public void logOutput(Context context){
      //Salida por LOG.
      String tag = "Retrieve list of sites.";
      Uri uri = FavSitesProviderMetaData.favSitesTableMEtaData.CONTENT_URI;
      Activity a = (Activity) context;
      Cursor c = a.managedQuery(uri
                               ,null //projection
                               ,null //selection string
                               ,null //selection args array of string
                               ,null); //sort order

      int iname = c.getColumnIndex(
            FavSitesProviderMetaData.favSitesTableMEtaData.NAME);

      int iDesc = c.getColumnIndex(
            FavSitesProviderMetaData.favSitesTableMEtaData.DESCRIPCION);

      int iLat = c.getColumnIndex(
            FavSitesProviderMetaData.favSitesTableMEtaData.LATITUD);

      int iLong = c.getColumnIndex(
            FavSitesProviderMetaData.favSitesTableMEtaData.LONGITUD);

      int iFoto = c.getColumnIndex(
            FavSitesProviderMetaData.favSitesTableMEtaData.FOTO);

      //Informamos de los índices
      Log.d(tag, "name, description, latitude, long, photo: "
            + iname + iDesc + iLat + iLong + iFoto);

      //Recorremos las filas basándonos en índices
      for(c.moveToFirst(); !c.isAfterLast();c.moveToNext()){
         //Recoger los valores
         String id = c.getString(0);
         String name = c.getString(iname);
         String desc = c.getString(iDesc);
         String lat = c.getString(iLat);
         String lon = c.getString(iLong);
         String foto = c.getString(iFoto);

         //informar
         StringBuffer cbuf = new StringBuffer(id);
         cbuf.append(",").append(name);
         cbuf.append(",").append(desc);
         cbuf.append(",").append(lat);
         cbuf.append(",").append(lon);
         cbuf.append(",").append(foto);
         Log.d(tag, cbuf.toString());
      }
      //Numero de registros
      int numberOfRecords = c.getCount();
      Log.d(tag, "Num of records: " + numberOfRecords);

      //cerrar el cursor
      c.close();
   }
```

Espero que este conjunto de cuatro artículos os haya servido de ayuda. En los próximos artículos veremos en profundidad los intents.

# Siguiente Tema: [Intents - Conceptos básicos][5]

 [1]: https://elbauldelprogramador.com/guia-de-desarrollo-android
 [2]: https://elbauldelprogramador.com/programacion-android-proveedores-de
 [3]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
 [4]: https://elbauldelprogramador.com/plsql-cursores
 [5]: https://elbauldelprogramador.com/programacion-android-intents-conceptos/
