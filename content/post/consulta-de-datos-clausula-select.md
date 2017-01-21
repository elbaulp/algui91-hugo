---
author: alex
categories:
- basededatos
color: '#009688'
lastmod: 2016-08-18
layout: post.amp
mainclass: BaseDeDatos
permalink: /consulta-de-datos-clausula-select/
title: "Consulta de Datos - Cl\xE1usula Select"
---

A lo largo de varios post(enlazados entre ellos), vamos a ir viendo las distintas partes de las que se compone la sentencia SELECT, el motivo de hacer esto es que no salgan post demasiado largos para leer.



# Consulta de Datos - Cláusula Select

La instrucción [DML][1] más utilizada es la de consulta de datos SELECT. Su función
principal es la de recuperar filas de la tabla o tablas. Además, esta sentencia es capaz de realizar las siguientes funciones:

<!--more--><!--ad-->

* Obtener datos para la creación de una tabla.
* Realizar operaciones estadísticas.
* Definir cursores.
* Realizar operaciones totalizadoras sobre grupos de valores que tienen los mismos valores en ciertas columnas.
* Se puede utilizar como sub-consulta para formar parte de una condición.

La sintaxis básica es:

```sql
SELECT select_list
FROM table_source
[WHERE search_condition]
[GROUP BY group_by_expression]
[HAVING search_condition]
[ORDER BY order_expression [ASC | DESC] ]
```

Vamos a ir viendo las diferentes clausulas que componen la sentencia SELECT:

* Cláusula SELECT
* [Cláusula FROM][2]
* [Cláusula WHERE][3]
* [Cláusula GROUP BY][4]
* Cláusula HAVING
* Cláusula ORDER BY



## Cláusula SELECT

Especifica qué columnas o expresiones han de ser devueltas por la consulta. Su sintaxis es:

```sql
SELECT [ DISTINCT ] <select_list>

<select_list> ::= [esquema.][TABLE. | VIEW. | alias. ] * | { column_name | expression }
[ [AS] column_alias ]} [,...n]
```

donde sus argumentos son:

## DISTINCT

No aparecen los registros repetidos, mostrándose sólo la primera vez. Basta con que un único campo tenga diferente valor para que el registro se considere diferente.

`<select_list>` indica la lista de columnas de tablas, valores y/o expresiones que va a mostrar la sentencia SELECT. En este punto SQL en general es bastante más potente que otros lenguajes ya que nos permite mostrar junto con los campos: expresiones, algunas funciones especiales, agregados o funciones estadísticas especiales y constantes.

Dentro de esta lista se pueden mostrar los siguientes elementos:

```sql
table_name.* | view_name.* | table_alias.* | *
```

En los cuatro casos con el uso del asterisco * selecciona todas las columnas de una tabla, vista o alias (renombrado).

## column_name

Es el nombre de la columna que se devuelve. Para evitar o prevenir el problema que se presenta cuando dos columnas de diferentes tablas o relaciones se llamen igual se puede utilizar el cualificado del nombre de la columna anteponiendo el nombre de la tabla con un punto. SQL utiliza la notación:

```sql
nombre_Tabla.nombre_Atributo
```

El uso de cualificados es obligatorio cuando en la `<select_list>` aparecen dos columnas con el mismo nombre.

En Oracle no es posible mezclar en la `<select_list>` el * con columnas y/o expresiones.  Para realizar la operación anterior hay que cualificar el operador * con la tabla de la que se extraerán todos sus campos.

```sql
SELECT *, Subtotal FROM FACTURAS, LINFACTURAS;          -- Error
SELECT FACTURAS.*, Subtotal FROM FACTURAS, LINFACTURAS; -- Correcto
```

## Expression

Una expresión SQL está formada por columnas de las tablas de las bases de datos, operadores y las funciones disponibles en el entorno SQL.

## column_alias

Es un nombre alternativo a una columna o a una expresión. Se utiliza normalmente sobre expresiones para asignarle un nombre que posteriormente pueda ser recuperado.

Ejemplo:

```sql
SELECT Cantidad*Precio AS Subtotal FROM LinFacturas
```

El renombrado de columnas y/o expresiones puede ser usado en la cláusula ORDER BY; pero sin embargo no se puede usar en las cláusulas WHERE, GROUP BY, o HAVING.


## Siguiente Tema: [Consulta de Datos - Cláusula FROM][2]

 [1]: https://elbauldelprogramador.com/lenguaje-manipulacion-de-datos-dml/
 [2]: https://elbauldelprogramador.com/consulta-de-datos-clausula-from/
 [3]: https://elbauldelprogramador.com/consulta-de-datos-clausula-where/
 [4]: https://elbauldelprogramador.com/consulta-de-datos-clausula-group-by/
