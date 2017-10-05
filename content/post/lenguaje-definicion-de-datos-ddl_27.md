---
author: alex
categories:
- basededatos
mainclass: BaseDeDatos
date: '2016-01-01'
lastmod: 2017-10-05T16:36:26+01:00
url: /lenguaje-definicion-de-datos-ddl_27/
tags:
- sql
title: "Lenguaje Definición de Datos (DDL) - Sinónimos y Pseudocolumnas"
---

# Sinónimos

Un sinónimo es un nuevo nombre que se puede asignar a una tabla o a una vista y con ellos podemos darle nombres diferentes a un mismo objeto.

Cuando tenemos acceso a las tablas, vistas etc, de otros esquemas y deseamos consultarlas, hay que anteponer al nombre del objeto que queremos consultar el nombre del esquema y separarlos por un punto.

<!--more--><!--ad-->

Por ejemplo para consultar una tabla de otro esquema la sintaxis sería:

```sql
Nombre_Esquema.Nombre_Tabla
```

En estos casos es conveniente el uso de sinónimos. La sintaxis para crear un sinónimo es:

```sql
CREATE [PUBLIC] SYNONYM Nombre_Sinonimo FOR Esquema.Nombre_Tabla
```

La cláusula public hace que el sinónimo este libre para todos los usuarios.

Ejemplo:

```sql
CREATE SYNONYM EMPLEADOSCOTT FROM SCOTT.EMP;
```

Para borrar sinónimos se utiliza la orden:

```sql
DROP [PUBLIC] SYNONYM [Esquema.]Nombre_Sinonimo;
```

Solamente el administrador de la BD y usuarios con privilegios adecuados pueden suprimir sinónimos de tipo public.

> **NOTA**: Para ver los sinónimos que son propiedad del usuario se utiliza la vista **USER_SYNONYM**.

# Pseudocolumnas

Las pesudocolumnas son similares a los campos de una tabla, pero no lo son, aunque si pueden ser utilizados en instrucciones DML (Select, Insert…).

Oracle proporciona varias de ellas, entre las cuales, se encuentran: *SYSDATE* que nos devuelve la fecha y hora actual del S.O donde reside la base de datos, *USER* que nos devuelve el nombre del usuario de la sesión actual y *ROWNUM* que nos sirve para limitar el número de registros que nos devuelve una consulta.

Ejemplos:

```sql
SELECT SYSDATE "Fecha actual" FROM DUAL;
SELECT USER FROM DUAL;
-- usando ROWNUM < 10 limitamos el número de filas devueltas a 10
SELECT employee_id, hire_date, SYSDATE FROM employees WHERE ROWNUM < 10;
```

# Siguiente Tema: [Lenguaje Manipulación de Datos (DML)][1]

 [1]: https://elbauldelprogramador.com/lenguaje-manipulacion-de-datos-dml/
