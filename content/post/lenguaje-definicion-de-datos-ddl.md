---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-09-25'
lastmod: 2016-08-16
layout: post.amp
mainclass: BaseDeDatos
permalink: /lenguaje-definicion-de-datos-ddl/
tags:
- clausulas del ddl
- concepto de ddl
- que es un ddl
- sentencias dml y ddl
title: "Lenguaje Definici\xF3n de Datos (DDL) - \xCDndices y secuencias"
---

## Creación de un índice

Los índices sirven para mejorar el rendimiento de las consultas. El optimizador de Oracle los utiliza implícitamente y se actualizan de forma automática al actualizar las filas.

En general, los índices se crean sobre todas las claves externas y sobre los criterios de búsqueda actuales.

<!--more--><!--ad-->

```sql
CREATE [unique] INDEX nombre_indice
ON nombre_tabla (columnas [{asc | desc}] [,.....])
[TABLESPACE Nombre_Tablespace]
```

Ejemplo:

```sql
-- Creacion de un índice en una columna simple para hacer las consultas más rápidas
CREATE INDEX emp_hiredate_idx ON employees (hire_date);
```

## Borrado de un índice

Cuando se borra una tabla, automáticamente se borran los índices asociados a ella. Los índices ocupan espacio dentro de la BD como si de una tabla se tratara y por esa razón se aconseja tener solo como índices aquellas columnas por las cuales se realizan consultas de forma periódica. Para borrar un índice se utiliza la orden:

```sql
drop index nombre_indice;
```

## Creación de una secuencia

Las secuencias se utilizan para generar números de forma automática, sin embargo, esto no garantiza la ausencia de ‘huecos’: si se solicitan números a una secuencia y no se utilizan, estos valores se pierdan.

```sql
CREATE SEQUENCE Nombre_secuencia
[INCREMENT BY entero]
[START WITH entero]
[{MAXVALUE entero | NOMAXVALUE}]
[{MINVALUE entero | NOMINVALUE}]
[{CYCLE | NOCYCLE}] [{ORDER | NOODER}]
```


## Utilización de las secuencias

* **Nombresecuencia.CURRVAL**: Devuelve el valor actual de la secuencia.
* **Nombresecuencia.NEXTVAL**: Devuelve el valor actual de la secuencia e incrementa el valor de la secuencia. Esta pseudo-columna es la primera a la que se tiene que hacer referencia después de crear la secuencia o abrir una sesión.

Ejemplo:

```sql
CREATE SEQUENCE new_employees_seq START WITH 1000 INCREMENT BY 1;

-- Para usar la secuencia, primero hay que inicializarla con nextval

SELECT new_employees_seq.NEXTVAL FROM DUAL;

--Despues de inicializarla, usamos currval para usar el valor actual

INSERT INTO employees VALUES
  (new_employees_seq.CURRVAL, 'Pilar', 'Valdivia', 'pilar.valdivia',
  '555.111.3333', '01-SEP-05', 'AC_MGR', 9100, .1, 101, 110);

--Consultamos la tabla de trabajadores para comprobar el valor actual de la secuencia.

SELECT employee_id, last_name FROM employees WHERE last_name = 'Valdivia';
```

#### Siguiente Tema: [Lenguaje Definición de Datos (DDL) - Sinónimos y Pseudocolumnas][1]

 [1]: https://elbauldelprogramador.com/lenguaje-definicion-de-datos-ddl_27/