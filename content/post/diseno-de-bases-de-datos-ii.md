---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-15

mainclass: BaseDeDatos
url: /diseno-de-bases-de-datos-ii/
tags:
- default
- sintaxis de restricciones check
- sintaxis de restricciones check unique default
- unique
title: "Diseño de Bases de Datos ( II ) - Restricciones"
---

> __Nota:__ Basado en los apuntes de clase



## 1. Restricciones Inherentes del Modelo Relacional.

<!--more--><!--ad-->

- No existen tuplas repetidas (obligatoriedad de clave primaria). La relación se ha definido como un conjunto de tuplas, y en matemáticas los conjuntos por definición no incluyen elementos repetidos. Hay que decir, sin embargo, que muchos de los SGBD relacionales sí admiten duplicidad de tuplas.
- El orden de las tuplas y el de los atributos no es relevante.
- Cada atributo de cada tupla solo puede tomar un único valor sobre el dominio sobre el que está definido.
- Ningún atributo que forme parte de la clave primaria de una relación puede tomar un valor nulo (regla de integridad de entidad)

_Estas restricciones son las que marcan la diferencia entre una tabla y una relación, ya que una tabla presenta las filas y las columnas en un orden, del cual carecen las relaciones. Por otro lado, una tabla podría contener filas repetidas. De todos modos, es muy común utilizar el término tabla para referirse a una relación._

### Las 12 reglas de Codd

Preocupado por los productos que decían ser sistemas gestores de bases de datos relacionales (RDBMS) sin serlo, Codd publica las 12 reglas que debe cumplir todo DBMS para ser considerado relacional. Estas reglas en la práctica las cumplen pocos sistemas relaciónales. Las reglas son:

1. **Información.** Toda la información de la base de datos debe estar representada explícitamente en el esquema lógico. Es decir, todos los datos están en las tablas.
2. **Acceso garantizado.** Todo dato es accesible sabiendo el valor de su clave y el nombre de la columna o atributo que contiene el dato
3. **Tratamiento sistemático de los valores nulos.** El DBMS debe permitir el tratamiento adecuado de estos valores.
4. **Catálogo en línea basado en el modelo relacional.** Los metadatos deben de ser accesibles usando un esquema relacional.
5. **Sublenguaje de datos completo.** Al menos debe de existir un lenguaje que permita el manejo completo de la base de datos. Este lenguaje, por lo tanto, debe permitir realizar cualquier operación.
6. **Actualización de vistas.** El DBMS debe encargarse de que las vistas muestren la última información.
7. **Inserciones, modificaciones y eliminaciones de dato nivel.** Cualquier operación de modificación debe actuar sobre conjuntos de filas, nunca deben actuar registro a registro.
8. **Independencia física.** Los datos deben de ser accesibles desde la lógica de la base de datos aún cuando se modifique el almacenamiento.
9. **Independencia lógica.** Los programas no deben verse afectados por cambios en las tablas.
10. **Independencia de integridad.** Las reglas de integridad deben almacenarse en la base de datos (en el diccionario de datos), no en los programas de aplicación.
11. **Independencia de la distribución.** El sublenguaje de datos debe permitir que sus instrucciones funcionen igualmente en una base de datos distribuida que en una que no lo es.
12. **No subversión.** Si el DBMS posee un lenguaje que permite el recorrido registro a registro, éste no puede utilizarse para incumplir las reglas relacionales.

## 2. Restricciones Semánticas o de Usuario.

1.  **Restricción de Clave Primaria** _(PRIMARY KEY)_, permite declarar un atributo o conjunto de atributos como la clave primaria de una relación.
2.  **Restricción de Unicidad** _(UNIQUE)_, permite que una clave alternativa o secundaria pueda tomar valores únicos para las tuplas de una relación (como si de una clave primaria se tratara). Se entiende que la clave primaria siempre tiene esta restricción.
3.  **Restricción de Obligatoriedad** _(NOT NULL)_, permite declarar si uno o varios atributos de una relación debe tomar siempre un valor.
4.  **Restricción de Integridad Referencial o de Clave Foránea** _(FOREIGN KEY)_, se utiliza para que mediante claves foráneas podamos enlazar relaciones de una base de datos. La integridad referencial nos indica que si una relación tiene una clave foránea que referencia a otra relación, cada valor de la clave foránea o ajena tiene que ser igual a un valor de la clave principal de la relación a la que referencia, o bien, ser completamente nulo. Los atributos que son clave foránea en una relación no necesitan tener los mismos nombres que los atributos de la clave primaria con la cual ellos se corresponden. El diseñador de la base de datos deberá poder especificar qué operaciones han de rechazarse y cuáles han de aceptarse, y en este caso, qué operaciones de compensación hay que realizar para mantener la integridad de la base de datos. Para ello el diseñador debe plantearse tres preguntas por cada clave foránea:
    1.  **¿Puede aceptar nulos esa clave foránea?** Por ejemplo, (tomando como referencia las relaciones PROVEEDORES, ARTICULOS) ¿tiene sentido la existencia de un articulo cuyo proveedor se desconoce? Evidentemente, no. En algunos casos esta respuesta podría ser distinta, por ejemplo, en una base de datos con las relaciones EMPLEADOS y DEPARTAMENTOS, podría existir un empleado no asignado de momento a un departamento.
    2.  **¿Qué deberá suceder si se intenta eliminar una tupla referenciada por una clave foránea?** Por ejemplo, si se intenta eliminar un proveedor del cual existe algún artículo. En general, para estos casos existen por lo menos tres posibilidades:
        *   **Restringir:** La operación de eliminación se restringe sólo al caso en el que no existe alguna tupla con clave foránea que la referencie, rechazándose en caso contrario. En nuestro ejemplo, un proveedor podrá ser borrado, si y sólo si, por ahora, no suministra artículos.
        *   **Propagar en cascada:** La operación de borrado se propaga en cascada eliminando también todas las tuplas cuya clave foránea la referencien. En nuestro ejemplo, se eliminaría el proveedor y todas las tuplas de artículos suministrados por él.
        *   **Anular:** Se asignan nulos en la clave foránea de todas las tuplas que la referencien y se elimina la tupla referenciada. En nuestro ejemplo, no tiene mucho sentido, pero consistiría en asignar nulos al NIF-PROV de todas las tuplas de articulos pertenecientes al proveedor que queremos borrar, y posteriormente borrar al proveedor.
    3.  **¿Qué deberá suceder si hay un intento de modificar la clave primaria de una tupla referenciada por una clave foránea?** Por ejemplo, si se intenta modificar la clave de un proveedor del cual existe algún artículo. Se actua con las mismas tres posibilidades que en el caso anterior:
        *   Restringir
        *   Propagar en cascada.
        *   Anular
5.  **Restricción de Valor por Defecto** _(DEFAULT)_, permite que cuando se inserte una tupla o registro en una tabla, para aquellos atributos para los cuales no se indique un valor exacto se les asigne un valor por defecto.
6.  **Restricción de Verificación o Chequeo** _(CHECK)_, en algunos casos puede ocurrir que sea necesario especificar una condición que deben cumplir los valores de determinados atributos de una relación de la BD, aparte de las restricciones vistas anteriormente.
7.  **Aserciones** _(ASSERTION)_: Esta restricción generaliza a la anterior, lo forman las aserciones en las que la condición se establece sobre elementos de distintas relaciones (por ello debe tener un nombre que la identifique).
8.  **Disparadores** _(TRIGGERS)_, a veces puede interesar espeficar una acción distinta del rechazo cuando no se cumple una determinada restricción semántica. En este caso, se recurre al uso de disparadores o triggers que nos permiten además de indicar una condición, especificar la acción que queremos que se lleve a cabo si la condición se hace verdadera. Los disparadores pueden interpretarse como reglas del tipo evento-condición-acción (ECA) que pueden interpretarse como reglas que especifican que cuando se produce un evento, si se cumple una condición, entonces se realiza una determinada acción.

## Siguiente tema: [Introducción SQL][1]

  [1]: https://elbauldelprogramador.com/introduccion-sql-sql-introduction/
