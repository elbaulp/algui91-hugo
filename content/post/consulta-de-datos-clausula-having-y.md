---
author: alex
categories:
- basededatos
color: '#009688'
lastmod: 2016-08-19
layout: post.amp
mainclass: BaseDeDatos
permalink: /consulta-de-datos-clausula-having-y/
tags:
- base de datos having
title: "Consulta de Datos - Cl\xE1usula HAVING y ORDER BY"
---

Especifica una condición de selección para un grupo. `HAVING` se usa normalmente con el `GROUP BY`. Cuando no está con el `GROUP BY`, `HAVING` se comporta como la cláusula `WHERE`, aunque esto es erróneo utilizarlo, puesto que ralentiza el sistema. Su sintaxis es:

```sql
[ HAVING <search_condition_group> ]
```

<!--more--><!--ad-->

donde search\_condition\_group determina la condición o condiciones de selección del agregado. Normalmente la condición de selección utiliza un agregado que se compara con un valor. Por ejemplo camiones que han realizado un porte o más:

```sql
Select cCmnMtr from porte
Group by cCmnMtr
Having count(*) > =1;
```

### Clausula ORDER BY

Nos devuelve las filas ordenadas por una serie de columnas. Su sintaxis es:

```sql
[ORDER BY {order_by_expression [ ASC | DESC ] } [,...n] ]

```

donde order\_by\_expression determina la columna o columnas por la cual deseamos obtener los resultados ordenados. Se puede especificar una columna, una columna renombrada, una columna cualificada por su tabla, una expresión, o un número entero positivo (mayor a cero) que determina la posición de la columna en el select list.

Se pueden especificar múltiples columnas de ordenación. La secuencia de ordenación viene determinada por el orden de aparición de las columnas en la cláusula `ORDER BY`.

La cláusula `ORDER BY` puede incluir columnas que no aparecen en la select list; sin embargo, si se especifica `SELECT DISTINCT`, las columnas por las que se ordena deben aparecer en la select list.

- **ASC**: Es el valor que se toma por defecto, especifica que los registros se ordenaran en orden ascendente.
- **DESC**: Especifica que los registros se ordenan en orden descendente.

Los valores nulos se consideran como los más pequeños posibles.

## Siguiente Tema: [Consulta de Datos - Operadores UNION [ALL], INTERSECT, MINUS.][1]

 [1]: https://elbauldelprogramador.com/consulta-de-datos-operadores-union-all/
