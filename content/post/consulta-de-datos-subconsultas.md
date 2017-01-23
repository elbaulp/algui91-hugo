---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-19
layout: post.amp
mainclass: BaseDeDatos
permalink: /consulta-de-datos-subconsultas/
title: Consulta de Datos. Subconsultas
---

Una subconsulta es una consulta `SELECT` que está anidada en una instrucción `SELECT`, `INSERT`, `UPDATE` o `DELETE`, o dentro de otra subconsulta. En una subconsulta, la instrucción `SELECT` nos para proporciona un conjunto de uno o más valores que se utilizan para evaluar una expresión.

Una subconsulta se puede utilizar en cualquier parte en la que se permita una expresión. La consulta `SELECT` de una subconsulta se incluye siempre entre paréntesis.

Una subconsulta puede anidarse dentro de la cláusula `WHERE` o `HAVING` de una instrucción `SELECT`, `INSERT`, `UPDATE` o `DELETE`.

<!--more--><!--ad-->

Se puede disponer de hasta 32 niveles de anidamiento, aunque el límite varía dependiendo de la memoria disponible y de la complejidad del resto de las expresiones de la consulta.

Hay tres tipos básicos de subconsultas que son:

* Operan en listas incorporadas con IN, o en aquéllas que modificó un operador de comparación mediante ANY o ALL.
* Se introducen con un operador de comparación sin modificar y deben devolver un valor individual.
* Son pruebas de existencia que se introducen con `EXISTS`.

Las instrucciones que incluyen una subconsulta normalmente tienen uno de estos formatos:

```sql
WHERE expression [NOT] IN (subconsulta)
WHERE expression comparison_operator [ANY | ALL] (subconsulta)
WHERE [NOT] EXISTS (subconsulta)
```

El predicado IN se emplea para recuperar únicamente aquellos registros de la consulta principal para los que algunos registros de la subconsulta contienen un valor igual. Inversamente se puede utilizar `NOT IN` para recuperar únicamente aquellos registros de la consulta principal para los que no hay ningún registro de la subconsulta que contenga un valor igual.

Se puede utilizar el predicado ANY para recuperar registros de la consulta principal, que satisfagan la comparación (comparison_operator) con cualquier otro registro recuperado en la subconsulta.

El predicado ALL se utiliza para recuperar únicamente aquellos registros de la consulta principal que satisfacen la comparación con todos los registros recuperados en la subconsulta.

El predicado `EXISTS` se utiliza en comparaciones de verdad/falso para determinar si la subconsulta devuelve algún registro.

## Siguiente Tema: [Consulta de Datos - Tablas Resumen operadores y Funciones Oracle][1]

 [1]: https://elbauldelprogramador.com/consulta-de-datos-tablas-resumen/