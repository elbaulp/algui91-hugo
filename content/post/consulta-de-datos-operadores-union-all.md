---
author: alex
categories:
- basededatos
color: '#009688'
lastmod: 2016-08-19
layout: post.amp
mainclass: BaseDeDatos
permalink: /consulta-de-datos-operadores-union-all/
tags:
- MINUS pl sql
title: Consulta de Datos - Operadores UNION [ALL], INTERSECT, MINUS.
---

Podemos combinar múltiples consultas utilizando los operadores `UNION, UNION ALL, INTERSECT y MINUS`.

Los correspondientes campos y/o expresiones que aparecen en la listas de los `SELECT` de las consultas a las que se le aplican los operadores anteriores deben coincidir en tipo y número, o al menos, tener un tipo compatible o sobre el cual se pueda aplicar un casting automático.

<!--more--><!--ad-->

```sql
SELECT location_id, department_name "Department", TO_CHAR(NULL) "Warehouse" FROM departments
UNION
SELECT location_id, TO_CHAR(NULL) "Department", warehouse FROM warehouses;
```

Cuando se aplica el operador `UNION` sobre dos consultas, el resultado serán los registros de la primera consulta más los registros de la segunda consulta, eliminando los registros duplicados.

Cuando se aplica el operador `UNION ALL` sobre dos consultas, el resultado serán los registros de la primera consulta más los registros de la segunda consulta.

```sql
SELECT product_id FROM inventories
UNION ALL
SELECT product_id FROM order_items;
```

Cuando se aplica el operador `INTERSECT` sobre dos consultas, el resultado serán los registros duplicados o coincidentes en la primera y segunda consulta.

```sql
SELECT product_id FROM inventories
INTERSECT
SELECT product_id FROM order_items;
```

Cuando se aplica el operador `MINUS` sobre dos consultas, el resultado serán los registros que están en la primera consulta pero que no aparecen en la segunda consulta.

```sql
SELECT product_id FROM inventories
MINUS
SELECT product_id FROM order_items;
```

#### Indicaciones

* El orden de las cláusulas en las sentencia `SELECT` es significativo. Se puede omitir cualquiera de las cláusulas opcionales, pero cuando se usan, deben aparecer en el orden apropiado.
* Cuando se ejecuta la sentencia `SELECT` con las cláusula `WHERE`, `GROUP BY`, y `HAVING` el orden de ejecución es el siguiente:
    1. El `WHERE` excluye las filas que no cumplen la condición.
    2. El `GROUP BY` colecciona las filas escogidas dentro de un grupo por cada uno de los valores de la cláusula `GROUP BY`.
    3. Las funciones agregado calculan los valores por cada grupo.
    4. La cláusula `HAVING` por último excluye las filas que no cumplen la condición de búsqueda.

## Siguiente Tema: [Consulta de Datos - Subconsultas.][1]

 [1]: https://elbauldelprogramador.com/consulta-de-datos-subconsultas/
