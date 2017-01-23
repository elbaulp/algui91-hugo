---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-09-25'
lastmod: 2016-10-28
layout: post.amp
mainclass: android
permalink: /programacion-android-implementando-un_14/
tags:
- Content Provider Android
- curso android pdf
title: "Programaci\xF3n Android: Implementando un Content Provider (Parte 3)"
---

Ya hemos visto como [plantear la base de datos][1] para un proveedor y cómo [implementar parte del proveedor de contenidos][2], en esta tercera parte vamos a implementar los métodos query, insert, update, delete y getType.

En el código que vimos en la anterior entrada, se implementa el método *getType()*, que devuelve los tipos MIME para una URI dada. Este método, al igual que muchos de los métodos del content provider, está sobrecargado con respecto a la URI entrante. La función de este método consiste en distinguir el tipo de URI. Para saber si es una colección de lugares (en el caso de la aplicación [FavSites][3]), o un único lugar.

<!--more--><!--ad-->

Como ya se vió en la [entrada anterior][2], se usa UriMatcher para descifrar el tipo de URI. En función de esta, la clase *favSitesTableMEtaData* tiene definida las constantes de los tipos MIME a devolver para cada URI.



#### Implementación del método Query

El método *query* es el responsable de devolver una colección de filas en función de una URI dada y una [cláusula where][4].

Al igual que los otros métodos, usa UriMatcher para identificar el tipo de URI. Si el tipo de URI es un único elemento, el método devolverá el ID del lugar de la siguiente manera:

* Extrae los segmentos del path usando *getPathSegments()*.

El método query usa las proyecciones (projecttions) que creamos para identificar las columnas devueltas. Básicamente, query devuelve un [cursor][5]. Durante la llamada al método query, se usa el objeto *<a target="_blank" href="http://developer.android.com/reference/android/database/sqlite/SQLiteQueryBuilder.html">SQLiteQueryBuilder</a>* para formular y ejecutar la consulta.

#### Implementación del método Insert

Éste método se encarga de insertar registros en la base de datos y devuelve una URI que apunta al registro insertado. Al igual que el método anterior, usa UriMatcher para identificar el tipo de URI. Primero comprueba si la URI coincide correctamente con el tipo de colección de datos de dicha URI. Si esta comprobación falla, se lanza una excepción.

A continuación, se validan los parámetros correspondientes a las columnas opcionales y obligatorias. Es posible asignar valores por defecto a ciertas columnas si no se pasó su valor como parámetro.

Después, se usa el objeto <a target="_blank" href="http://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html">SQLiteDatabase</a> para insertar el nuevo registro y devolver el ID que se acaba de insertar. Por último, se crea una URI nueva a partir del ID devuelto por la base de datos.

#### Implementación del método Update

Se encarga de actualizar registros que cumplan las condiciones que establece la [cláusula where][4]. Éste método devuelve el número de registros actualizados.

También usa UriMatcher para identificar el tipo de URI. Si la URI es una colección de datos, se aplica la cláusula where para aplicar el update a los registros que cumplan las condiciones de dicha cláusula. Si por el contrario, el tipo de URI es de un solo registro, se extrae el ID (En este caso de un lugar) de la URI y se especifica como una cláusula where adicional para identificar el lugar almacenado en la base de datos que tenga asignado ese ID. Una vez acabado el proceso de actualizar los registros, Update devuelve el número de registros que se modificaron.

#### Implementación de método Delete

Se encarga de eliminar registros basandose en la cláusula where que se le pasa como parámetro. Devuelve el número de filas eliminadas.

Usa UriMatcher, al igual que los anteriores. Si la URI es una colección, se aplica la cláusula where para borrar todos los registros que cumplan esas condiciones. Si no existe la cláusula, se eliminan todos los registros. En el caso de que la URI corresponda a un único elemento, se extrae su ID de la URI y se especifíca como cláusula where adicional (al igual que en el método update). Por último, devuelve el número de registros elminados.

#### Usando UriMatcher para conocer el tipo de URI

Hemos hablado mucho en esta sección de UriMatcher, ahora es el momento de profundizar en él. La mayoría de los métodos de un proveedor de contenidos están sobrecargados. Por ejemplo, se llama al mismo método query() tanto para recuperar un único registro o múltiples. Es el método el que debe averiguar el tipo de URI. La utilidad que ofrece Android con UriMatcher ayuda precisamente a realizar este trabajo de identificar el tipo de URI.

Funciona de la siguiente manera: Se le dice a una instancia de UriMatcher qué tipos de patrones de URI va a recibir. Hay que asociarle un número único a cada patrón. Una vez registrados los patrones, podremos preguntarle al UriMatcher si la URI entrante coincide con un cierto patrón.

En el ejemplo que estamos viendo de FavSites, existen dos patrones de URIs, uno para una colección de lugares y otro para un único lugar. En el código de abajo se muestra la implementación que registra ambos patrones. Asigna un 1 a una colección de lugares y un 2 a un único lugar. Los patrones que se usan para la URI se definieron como meta datos en la tabla de lugares:

```java
private static final UriMatcher sUriMatcher;
//Define Ids para cada tipo de URI
private static final int INCOMING_SITE_COLLECTION_URI_INDICATOR = 1;
private static final int INCOMING_SINGLE_SITE_URI_INDICATOR = 2;
static {
   sUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
   //Patrón para varios lugares
   sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites",
                      INCOMING_SITE_COLLECTION_URI_INDICATOR);
   //Patrón para un único lugar.
   sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites/#",
                      INCOMING_SINGLE_SITE_URI_INDICATOR);
}
```

Conciendo esta implementación, ahora es más fácil saber cómo usan los otros métodos el UriMatcher, por ejemplo, el método query:

```java
switch (sUriMatcher.match(uri)) {
      case INCOMING_SITE_COLLECTION_URI_INDICATOR:
         //...
         break;

      case INCOMING_SINGLE_SITE_URI_INDICATOR:
         //...
         break;

      default:
         throw new IllegalArgumentException("Unknow URI " + uri);
      }
```

Como se aprecia en el código de arriba, el método *match* devuelve el mísmo número que hemos registrado en el paso anterior.El constructor de UriMatcher toma un entero que se usará para la raiz de la URI, se devolverá dicho número si en la URL no existen segmentos en el path o authorities. También devolverá la constante NO\_MATCH cuando los patrones no coincidan. Es posible crear un UriMatcher sin un identificador para la raiz de la URI, en tal caso, Android inicializará UriMatcher a NO\_MATCH internamente. Por lo tanto, el código que se muestra a continuación es equivalente al anterior:

```java
static {
   sUriMatcher = new UriMatcher();
   sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites",
                      INCOMING_SITE_COLLECTION_URI_INDICATOR);
   sUriMatcher.addURI(FavSitesProviderMetaData.AUTHORITY, "sites/#",
                      INCOMING_SINGLE_SITE_URI_INDICATOR);
}
```

#### Usando los mapas de proyecciones (Projection Maps)

El proveedor de contenido actúa de intermediario entre un conjunto abstracto de columnas y un conjunto real de columnas en una base de datos, sin embargo los conjuntos de columnas pueden ser distintos. Mientras construimos consultas (queries), es necesario hacer un mapeo entre las columnas de la cláusula where y las columnas reales de la base de datos. Para configurar este *projection map* necesitamos la ayuda de la clase *[SQLiteQueryBuilder.][6]*

Si leemos la documentación del método <a href="http://developer.android.com/reference/android/database/sqlite/SQLiteQueryBuilder.html#setProjectionMap">setProjectionMap</a> en la documentación del SDK de Android vemos que sirve para lo siguiente:

> Establece el mapa de proyección de la consulta. El mapa de proyección mapea los nombres de las columnas que la persona que llama pasa a la consulta a los nombres de columna de la base de datos. Esto es útil para renombrar las columnas, así como evitar ambigüedades en los nombres de las columnas al hacer [joins][7]. Por ejemplo, podría asignar &#8220;nombre&#8221; a &#8220;people.name&#8221;. Si un mapa de proyección se configura para que deba contener todos los nombres de las columnas que el usuario pueda solicitar, aunque la clave y el valor sean los mismos.

En nuestro ejemplo, así es como se a configurado el projection map:

```java
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
```

El queryBuilder usa la variable *sSitesProjectionMap* así:

```java
SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
qb.setTables(favSitesTableMEtaData.TABLE_NAME);
qb.setProjectionMap(sSitesProjectionMap);
```

### Siguiente Tema: [Implementando un Content Provider (Parte 4)][8]

 [1]: https://elbauldelprogramador.com/programacion-android-implementando-un
 [2]: https://elbauldelprogramador.com/programacion-android-implementando-un_08
 [3]: https://elbauldelprogramador.com/prueba-la-aplicacion-favsites-en-tu
 [4]: https://elbauldelprogramador.com/consulta-de-datos-clausula-where
 [5]: https://elbauldelprogramador.com/plsql-cursores
 [6]: http://developer.android.com/reference/android/database/sqlite/SQLiteQueryBuilder.html
 [7]: https://elbauldelprogramador.com/consulta-de-datos-clausula-from
 [8]: https://elbauldelprogramador.com/programacion-android-implementando-un_29/