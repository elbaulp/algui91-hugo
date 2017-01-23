---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-09-25'
lastmod: 2016-08-19
layout: post.amp
mainclass: BaseDeDatos
permalink: /consulta-de-datos-clausula-group-by/
tags:
- group by
- orden group by sql
title: "Consulta de Datos - Cl\xE1usula GROUP BY"
---

## Consultas agrupadas

<!--more--><!--ad-->

Una consulta agrupada se utiliza para considerar los registros cuyos ciertos campos tienen el mismo valor, y procesarlos de la misma manera, para contarlos, sumarlos, hacer la media etc.

```sql
SELECT C_CLIENTE, SUM(IMPORTE)
FROM FACTURA
GROUP BY C_CLIENTE;
```


Un error muy común cuando se construyen consultas agrupadas, es el siguiente: ORA- 00979: not a GROUP BY expresión. Esto es debido al modo que tiene Oracle de analizar las consultas agrupadas:

Lo que hace es comprobar que todos las columnas incluidos en la cláusula SELECT fuera de funciones sumarias, estén dentro de la cláusula GROUP BY, aunque pueden estar en cualquier orden y en el GROUP BY pueden aparecer columnas que no estén en el SELECT. Si encuentra alguna columna en el SELECT (que no esté dentro de una función sumaria) que no aparezca en el GROUP BY, entonces nos retorna el error anterior.

### ORDER BY

Como característica adicional, se pueden incluir números en la ordenación, que serán sustituidos por la columna correspondiente del SELECT en el orden que indique el número.  La ordenación es el último paso en la ejecución de una consulta SQL, y para ello Oracle suele necesitar crear objetos temporales que son creados en el tablespace Temporal. Por eso es recomendable hacer las ordenaciones del lado de cliente (siempre que sea posible), ya que el servidor puede cargarse bastante si tiene que hacer, por ejemplo, 300 ordenaciones de tablas de 2 millones de registros.

### GROUP BY

Agrupa las filas seleccionadas por la cláusula WHERE por los campos que aparecen en la cláusula GROUP BY. Estos grupos devuelven una única fila por grupo a la que se le pueden añadir una serie de funciones estadísticas llamadas agregados. Su sintaxis es:

```sql
GROUP BY <group_by_expression>
```

donde `<group>` es la columna o columnas por la cuales se desea agrupar. No se puede utilizar un alias de dicha columna. Se puede agrupar mediante una expresión formada por varias columnas. Es importante recordar que las columnas que aparecen en el group by deberían también de aparecer tras la palabra SELECT (excepto casos especiales).  Ejemplo de GROUP BY, se desea obtener el número de portes de cada camión, y si un camión no ha tenido portes que dicho valor aparezca a nulo:

```sql
SELECT camion.cCmnMtr, camion.cCmnMrc, camion.cCmnMdl, COUNT(*)
FROM camion, porte
WHERE camion.cCmnMtr = porte.cCmnMtr
GROUP BY camion.cCmnMtr, camion.cCmnMrc, camion.cCmnMdl;
```

Ejemplo donde agrupamos por una expresión carácter formada por tres columnas o campos:

```sql
SELECT camion.cCmnMtr +camion.cCmnMrc + camion.cCmnMdl, COUNT(*)
FROM camion, porte
WHERE camion.cCmnMtr = porte.cCmnMtr
GROUP BY camion.cCmnMtr + camion.cCmnMrc + camion.cCmnMdl;
```

### Funciones de Agregado

Las funciones de agregado se usan dentro de una cláusula SELECT en grupos de registros para devolver un único valor que se aplica a un grupo de registros. También se utilizan para obtener resultados estadísticos sobre las columnas de una tabla o sobre la misma tabla; en este caso, la consulta devuelve un solo registro con los resultados.

```sql
Select Count(*) From LiFacturas;
Select Sum(Stock) From Articulos Where Familia = ‘CPU’;
```

Los más utilizados son:

* AVG. Calcula la media aritmética de un conjunto de valores contenidos en un campo especificado de una consulta. Su sintaxis es Avg(expr) donde expr representa el campo que contiene los datos numéricos para los que se desea calcular la media o una expresión que realiza un cálculo utilizando los datos de dicho campo. La media calculada por Avg es la media aritmética (la suma de los valores dividido por el número de valores). La función Avg no incluye ningún campo Null en el cálculo.
* COUNT. Calcula el número de registros devueltos por una consulta. Su sintaxis es Count(expr). Aunque expr puede realizar un cálculo sobre un campo, Count simplemente cuenta el número de registros sin tener en cuenta qué valores se almacenan en los registros. La función Count no cuenta los registros que tienen campos null a menos que expr sea el carácter comodín asterisco (\*). Si utiliza un asterisco, Count calcula el número total de registros, incluyendo aquellos que contienen campos null. Count(\*) es considerablemente más rápida que Count(Campo).
* MAX , MIN. Devuelven el mínimo o el máximo de un conjunto de valores contenidos en un campo especifico de una consulta. Su sintaxis es: Max(expr) Min(expr) donde expr es el campo o expresión sobre el que se desea realizar el cálculo.
* SUM. Devuelve la suma del conjunto de valores contenido en un campo especifico de una consulta. Su sintaxis es Sum(expr) donde expr respresenta el nombre del campo que contiene los datos que desean sumarse o una expresión que realiza un cálculo utilizando los datos de dichos campos.
* STDEV \| STDEVP \| VAR \| VARP. Desviación típica y Varianza.

## Siguiente Tema: [Consulta de Datos - Cláusula HAVING y ORDER BY][1]

 [1]: https://elbauldelprogramador.com/consulta-de-datos-clausula-having-y/