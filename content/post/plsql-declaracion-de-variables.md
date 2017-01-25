---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-27

mainclass: BaseDeDatos
url: /plsql-declaracion-de-variables/
tags:
- declare en pl sql
title: "PL/SQL. Declaraci\xF3n de variables"
---

Las variables deben declararse dentro de la sección `DECLARE` y deben seguir la siguiente sintaxis:

```sql
Nombre_variable [CONSTANT] TIPO [NOT NULL] [:= inicialización];
```

<!--more--><!--ad-->

Cualquier variable que se declare y no se inicialice tiene por defecto el valor `NULL`. Los tipos posibles son todos aquellos válidos para SQL añadiendo algunos propios de PL/SQL. Para más información sobre los tipos propios de PL/SQL consultar el PL/SQL User’s Guide and Referente. Podemos hacer que una variable nunca tome valores nulos utilizando la cláusula `NOT NULL`, en este caso, hay que inicializar la variable.


La declaración de una constante es similar a la declaración de una variable, añadiendo la palabra `CONSTANT` y asignándole a continuación un valor a la constante.

Ejemplos:

```sql
Interes NUMBER(5,3);
Descripcion VARCHAR2(50) := 'inicial';
Fecha_max DATE;
Contabilizado BOOLEAN := TRUE;
PI CONSTANT REAL := 3.14159;

```

Otra forma de asignarle un valor a una variable es mediante la clausula `INTO` de la sentencia `SELECT`:

```sql
SELECT COUNT(*) INTO xNumFac FROM FACTURAS;
```

## Atributos %TYPE y %ROWTYPE.

Se puede declarar el tipo de una variable tomándolo de otro identificador, usando el atributo `%TYPE` y se puede declarar el tipo de una variable también cuando es un tipo estructurado con el atributo `%ROWTYPE`. Esto es particularmente útil cuando una variable va a tomar valores de una columna de una tabla. Declarar variables con el atributo `%TYPE` tiene dos ventajas. Primero, no necesitamos conocer el tipo exacto de la columna de la tabla. Segundo, si cambiamos la definición y/o tipo de la columna de la tabla, el tipo de la variable cambia automáticamente en tiempo de ejecución.

En la declaración: si tenemos una variable “ y ” por ejemplo, y está declarada de tipo char podemos declarar otra variable “j” de la siguiente forma:

```sql
J y%type;
```

Lo mismo ocurriría para declarar una estructura que ya esta declarada como por ejemplo una tabla que ya tenemos declarada:

```sql
J employee%rowtype; --J tendría la misma estructura que la tabla employee.
```

En este caso para acceder a cada campo que tuviera el tabla employee mediante la variable J tendríamos que usar la estructura variable.nombre_campo.

Un bloque tiene acceso a los objetos identificados dentro de su esquema. Solo podremos acceder a los objetos del usuario donde estemos conectados y a los que ese usuario pueda acceder porque le hayan otorgado permisos.


## Siguiente Tema: [PL/SQL - Estructuras básicas de control][1]

 [1]: https://elbauldelprogramador.com/plsql-estructuras-basicas-de-control/
