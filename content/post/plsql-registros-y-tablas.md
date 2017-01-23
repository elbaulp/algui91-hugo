---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-09-03
layout: post.amp
mainclass: BaseDeDatos
url: /plsql-registros-y-tablas/
title: PL/SQL. Registros y Tablas
---

## Conceptos

- Existen dos tipos de datos que no he mencionado anteriormente: los registros (o estructuras) y las tablas (o arrays o vectores).
- Los dos tipos deben ser definidos como un nuevo tipo antes de [declarar variables][1] de ese nuevo tipo.
- El modo de definir nuevos tipos de variables en PL/SQL es a través de la palabra reservada `TYPE`:

<!--more--><!--ad-->

```sql
TYPE nuevo_tipo IS tipo_original.
```

Una vez definido en nuevo tipo, ya se pueden definir variables de ese nuevo tipo.

## Registros

Los registros no son más que agrupaciones de tipos de variables que se acceden con el mismo nombre.

```sql
TYPE nombre_registro IS RECORD(
  Campo1 tipo,
  Campo2 tipo,
  Campo3 tipo );
```

Por ejemplo:

```sql
TYPE alumno IS RECORD(
  n_alumno VARCHAR2(5),
  nombre VARCHAR2(25),
  tlf VARCHAR2(15) );
```

## Tablas

Una tabla no es más que una colección de elementos identificados cada uno de ellos por un índice. En muchos lenguajes se les denomina arrays o matrices.

```sql
TYPE nombre_tabla IS TABLE OF tipo_de_elementos;
```

El tamaño de la tabla se define durante la declaración de la variable.

```sql
Nombre_variable nombre_tabla := nombre_variable( lista de elementos );
```

Por ejemplo:

```sql
DECLARE
  TYPE array_enteros IS TABLE OF INTEGER;
  Un_array array_enteros := array_enteros( 0, 0, 0, 0 );
```

## Siguiente tema: [Tunning básico de SQL][2]

 [1]: https://elbauldelprogramador.com/plsql-declaracion-de-variables/
 [2]: https://elbauldelprogramador.com/tunning-basico-de-sql/
