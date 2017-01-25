---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-16

mainclass: BaseDeDatos
url: /lenguaje-definicion-de-datos-ddl-vistas/
tags:
- clausulas del ddl
- concepto de ddl
- que es un ddl
- sentencias dml y ddl
title: "Lenguaje Definici\xF3n de Datos (DDL) - Vistas"
---

Las vistas son tablas virtuales ‘que contienen’ el resultado de una consulta SELECT, tienen la misma estructura que una tabla cualquiera, es decir, están organizadas por filas y columnas. Una de las principales ventajas de utilizar vistas procede del hecho de que la vista no almacena los datos, sino que hace referencia a una o varias tablas de origen mediante una consulta SELECT, consulta que se ejecuta cada vez que se hace referencia a la vista. De esta forma, cualquier modificación que se realice sobre los datos de las tablas de origen es inmediatamente visible en la vista, cuando ésta vuelva a ejecutarse. Su sintaxis es:

<!--more--><!--ad-->



```sql
CREATE [OR REPLACE] VIEW Nombre_vista
[(Lista de columnas)]
AS SELECT[...]
```

La opción REPLACE, lo que hace es, reemplazar la vista en el caso de que esta ya exista. Las vistas se utilizan de forma análoga a las tablas, permitiendo realizar consultas sobre las vistas, también se pueden realizar sentencias [DML][1] sobre las vistas, sin embargo, las modificaciones, borrados e inserciones están restringidas a vistas que estén definidas sobre una única tabla.

```sql
-- Vista para mostrar datos de departamentos y empleados
CREATE OR REPLACE VIEW my_emp_view AS
SELECT d.department_id, d.department_name,
  e.employee_id, e.first_name, e.last_name
  FROM employees e
  JOIN departments d ON d.manager_id = e.employee_id;
```

## Vistas interactivas.

Son vistas que se definen sin utilizar el comando CREATE VIEW, sino directamente sobre el comando SELECT. Por ejemplo:

```sql
SELECT cCodCli, cNomCli, Importe
     FROM Clientes C,(SELECT SUM (Cantidad*Precio) AS Importe
        FROM Articulos a, LinPedidos l
        WHERE a.cCodArt = l.cCodArt
        GROUP BY nPedido) LP,
   Pedidos P
     WHERE c.cCodCli = p.cCodCli AND p.nPedido = LP.nPedido ;
```

En el caso anterior, LP actúa como una vista interactiva.

## Borrado de una vista.

La orden para borrar una vista es DROP VIEW. Su sintaxis es:

```sql
DROP VIEW Nombre_vista
```

## Siguiente Tema: [Lenguaje Definición de Datos (DDL) - Índices y secuencias][2]

 [1]: http://es.wikipedia.org/wiki/Lenguaje_de_Manipulaci%C3%B3n_de_Datos
 [2]: https://elbauldelprogramador.com/lenguaje-definicion-de-datos-ddl/
