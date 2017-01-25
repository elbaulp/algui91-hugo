---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-10-20

mainclass: android
url: /programacion-android-insertando/
tags:
- curso android pdf
- Insertando registros
title: "Programaci\xF3n Android: Insertando registros"
---

En la entrada anterior hablamos de cómo [obtener regístros][1] de los proveedores de contenidos (CV) usando [URIs][2]. Ahora vamos a ver como insertar registros.



## Introducción

Anroid utiliza una clase llamada *android.content.ContentValues* para retener los valores de un solo registro, que será el que se insertará. Los *ContentValues* son un dicionario de pares clave/valor, al igual que los nombres de columnas y valores de las [bases de datos][3]. La forma de insertar un registro es rellenando el ContentValues primero y despues decir a *android.content.ContentResolver* que lo inserte usando una URI.

<!--more--><!--ad-->

> Necesitamos usar ContentResolver porque a este nivel de abstracción, no le estamos pidiendo a una base de datos que inserte un registro, estamos pidiendo insertar un registro en un CV identificado por una URI. El contentResolver es el responsable de resolver la referencia a la URI al proveedor correcto.

Abajo se muestra un ejemplo de cómo rellenar una fila con un ContentValues y prepararlo para un insert:

<!--more--><!--ad-->

```java
ContentValues cv = new ContentValues();
cv.put("NombreColumna1", "valor1");
cv.put("NombreColumna2", "valor2");

//Ahora el objeto cv está preparado para insertarse en la BD
```

Podemos obtener una referencia al ContentResolver mediante un método de la clase Activity:

```java
ContentResolver cr = miActivity.getContentResolver();
```

Todo lo que necesitamos en este punto es una URI para decirle al ContentResolver que inserte la fila. [En entradas anteriores][4] vimos que nuestra URI era:

```java
content://com.elbauldelprogramador.provider.FavSites/sites
```

Con esta URI y nuestro ContentValues podemos ahora hacer una llamada para insertar nuestra fila:

```java
Uri uri = cr.insert(FavSitesProviderMetaData.CONTENT_URI, cv);
```

La línea anterior devuelve una uri apuntando al nuevo registro añadido, la URI devuelta se parecerá a esto:

```java
FavSitesProviderMetaData.CONTENT_URI/Nuevo_ID
```

Con esta Uri, podemos por ejemplo mostrar en el log del sistema qué registro hemos añadido:

```java
Log.d("Nuevo registro añadido","Uri:" + insertedUri);
```

## Añadir archivos a un Content Provider

Puede que en ocasiones necesitemos añadir un archivo a una base de datos. Lo normal es guardar el archivo en disco y actualizar el registro en la base de datos para que apunte al archivo correspondiente. Android usa este protocolo y lo automatiza mediante la definición de un procedimiento específico para guardar y recibir estos archivos. Usa un convenio en el cual una referencia a un nombre de archivo se guarda en un registro con un nombre de columna reservado llamado **_data**.

Cuando se inserta un registro en esta tabla, se devuelve la uri. Una vez guardamos el registro mediante este mecanismo hay que realizar un seguimiento al archivo en esa dirección. Para hacer esto, Android permite al ContentResolver coger la URI del registro de la base de datos y devolver un writable output stream. Android asigna un archivo interno y almacena la referencia a ese nombre de archivo en el campo *_data.*

Para poder realizar estas operaciones necesitamos crear una columna adicional llamada _data, hacer una llamada al método *insert* para obtener una URI. EL siguiente código demuestra como se haría:

```java
ContentValues cv = new ContentValues();
cv.put("NombreColumna1", "valor1");
cv.put("NombreColumna2", "valor2");

//Usamos el content resolver para insertar un registro
ContentResolver cr = miActivity.getContentResolver();
Uri nuevaUri = cr.insert(FavSitesProviderMetaData.CONTENT_URI, cv);
```

Una vez tenemos la uri del registro, pedimos a ContentResolver que obtenga una referencia al output stream del archivo:

```java
//Usamos el ContentResolver para obtener  el output stream directamente
//El content resolver oculta el acceso al campo _data donde se almacena realmente la referencia al archivo
OutputStream outStream = miActivity.getContentResolver().openOutputStream(nuevaUri);
algunArchivoDeImagen.compress(Bitmap.CompressFormat.JPEG, 50, outStream);
outStream.close;
```

El código usa el flujo de salida para escribir.

## Siguiente Tema: [Actualizar y borrar registros][5]

 [1]: https://elbauldelprogramador.com/programacion-android-usando-la-clausula
 [2]: https://elbauldelprogramador.com/programacion-android-proveedores-de
 [3]: https://elbauldelprogramador.com/bases-de-datos
 [4]: https://elbauldelprogramador.com/programacion-android-arquitectura-de
 [5]: https://elbauldelprogramador.com/programacion-android-actualizar-y/
