---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-10-26
layout: post.amp
mainclass: android
permalink: /programacion-android-actualizar-y/
tags:
- Actualizar y borrar registros
- curso android pdf
title: "Programaci\xF3n Android: Actualizar y borrar registros"
---

Vimos cómo [insertar registros y consultarlos][1], bien, pues actualizar y borrar registros es bastante sencillo. Realizar un [update][2] (Actualizar registros) es muy similar a hacer una inserción, en la cual los valores de la columna a modificar se pasan mediante un objeto [ContentResolver][1]. Abajo se muestra una sentencia para realizar dicho update:

<!--more--><!--ad-->

```java
int numeroDeLineasActualizadas =
   activity.getContentResolver().update(
      Uri uri,
      ContentValues values,
      String whereClause,
      String[] selectionArgs )
```

El argumento *whereClause*, restringe la actualización a los registros de la BD que cumplan esa condición.

La sentencia para borrar registros es:

```java
int numeroDeLineasBorradas =
   activity.getContentResolver().delete(
      Uri uri,
      String whereClause,
      String[] selectionArgs )
```

Logicamente, el método *delete* no necesita un argumento que contenga el *ContentValues*.

Casi todas las llamadas que se hacen desde *managedQuery* y *ContentResolver* se dirigen a las clase *provider*. Saber cómo un proveedor implementa cada uno de estos métodos no dá suficientes pistas de cómo se usan dichos métodos. [En entradas posteriores][3], veremos cómo implementar desde cero un content provider.

## Siguiente Tema: [Implementando un Content Provider (Parte 1)][4]

 [1]: https://elbauldelprogramador.com/programacion-android-insertando
 [2]: https://elbauldelprogramador.com/lenguaje-manipulacion-de-datos-dml
 [3]: https://elbauldelprogramador.com/programacion-android-implementando-un
 [4]: https://elbauldelprogramador.com/programacion-android-implementando-un/