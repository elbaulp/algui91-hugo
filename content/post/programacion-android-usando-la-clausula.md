---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-10-08
layout: post.amp
mainclass: android
url: /programacion-android-usando-la-clausula/
tags:
- "Cl\xE1usula where android"
- curso android pdf
title: "Programaci\xF3n Android: Usando la cl\xE1usula Where"
---

Los proveedores de conteido ofrecen dos formas de pasar una cláusula *[where][1]:*

  * A través de la URI
  * Combinando una cadena y un conjunto de argumentos string-array reemplazables.

En esta entrada vamos a ver ambas.



### Cláusula Where mediante la URI

Imaginemos que queremos recuperar un lugar (De la aplicación [FavSites][2]) cuyo id sea 23. Usaríamos el siguiente código:

<!--more--><!--ad-->

```java
Activity activity;
//... Inicializamos la actividad...
String siteUri = "content://com.elbauldelprogramador.provider.FavSites/sites/23";
Cursor managedCursor = activity.managedQuery( siteUri,
                                projection, //Columnas a devolver
                                null,       //Cláusula WHERE
                                null);      //Cláusula ORDER BY
```

En este ejemplo se ha dejado el argumento que hace referencia a la cláusula where a null ya que hemos especificado el ID del registro que queremos en la URI. En este caso el ID está embebido en la URI. Se usa la URI como vehículo para pasar la cláusula where. Esto se hace evidente cuando nos fijamos cómo se implementa el proveedor para los Sites de la aplicación, que corresponde al método query. A continuación un fragmento de código del método query:

```java
//Devuelve un id de sitio
//content://.../sites/23
int siteId = uri.getPathSegments().get(1);

queryBuilder.setTables(favSitesTableMetaData.TABLE_NAME);

queryBuilder.appendWhere(favSitesTableMEtaData._ID + "=" + siteId);
```

Como vemos la id del sitio se extrae de la URI. La Uri se divide en segmentos (path) del a forma `content://. . . /seg1/seg2/seg3`, en nuestro ejemplo el primer segmento es el id 23.

> Las clases Uri y UriMatcher se usan para identificar las URIs y extraer parámetros de ellas, más adelante las veremos. SQLiteQueryBuilder es una clase asistente en android.database.sqlite que permite construir consultas SQL que se ejecutarán por SQLiteDatabase en una instancia de una base de datos SQLite.


### Cláusulas where explícitas

Vamos a ver una vez más la estructura del método *managedQuery* de la clase Activity:

```java
public final Cursor managedQuery(Uri uri,
   String[] projection,
   String selection,
   String[] selectionArgs,
   String sortOrder)
```

El parámetro *selection*, es el que actúa como cláusula Where (Representa un filtro en el que elegimos qué filas queremos que se nos devuelvan). Si en este argumento pasamos *null* se nos devolverán todas las filas para la URI dada. En este parámetro podemos incluir ?, que serán reemplazados por los valores del parámetro *selectionArgs* en el orden que vayan apareciendo.

Los siguientes códigos que se muestran son equivalentes:

```java
//Método Uri
managedQuery("content://com.elbauldelprogramador.provider.FavSites/sites/23"
   ,null
   ,null
   ,null
   ,null);

//Método explícito
managedQuery("content://com.elbauldelprogramador.provider.FavSites/sites"
   ,null
   ,"_ID=?"
   ,new String[] {23}
   ,null);

```

Te preguntarás qué método usar en según que situación. Por convención se suele usar el método mediate URI cuando sea posible aplicarlo, y el explícito en casos especiales (Como en el ejemplo de arriba.)

### Siguiente Tema: [Insertando registros][3]

 [1]: https://elbauldelprogramador.com/consulta-de-datos-clausula-where
 [2]: https://elbauldelprogramador.com/prueba-la-aplicacion-favsites-en-tu
 [3]: https://elbauldelprogramador.com/programacion-android-insertando/
