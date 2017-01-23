---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
description: "Los bloques PL/SQL presentan una estructura espec\xEDfica compuesta
  de tres partes bien diferenciadas"
lastmod: 2016-08-24
layout: post.amp
mainclass: BaseDeDatos
permalink: /bloques-plsql/
title: Bloques PL/SQL
---

Los bloques PL/SQL son de varios tipos:

* **Anónimos (Anonymous blocks).** Se construyen de forma dinámica y se ejecutan una sola vez.
* **Con nombre (Named blocks).** Son bloques con nombre, que al igual que el anterior se construyen, generalmente, de forma dinámica y se ejecutan una sola vez.
* **Subprogramas.** Procedimientos, paquetes o funciones almacenados en la BD. No suelen cambiar después de su construcción y se ejecutan múltiples veces mediante una llamada call.
* Disparadores(Triggers). Son bloques con nombre que también se almacenan en la BD. Tampoco suelen cambiar después de su construcción y se ejecutan varias veces. Se ejecutan de forma automática ante algún suceso de disparo, que será una orden del lenguaje de manipulación de datos (`INSERT`, `UPDATE` o `DELETE`) que se ejecuta sobre una tabla de la BD.


<!--more--><!--ad-->


Los bloques PL/SQL presentan una estructura específica compuesta de tres partes bien diferenciadas:

* La **sección declarativa** en donde se declaran todas las constantes y variables que se van a utilizar en la ejecución del bloque. Esta sección es opcional.
* La **sección de ejecución** que incluye las instrucciones a ejecutar en el bloque PL/SQL. Estas instrucciones pueden ser tanto de tipo DML como DDL, así como ordenes procedimentales. Esta es la única sección que es obligatoria.
* La **sección de excepciones** en donde se definen los manejadores de errores que soportará el bloque PL/SQL. Esta sección es opcional y no se ejecutará a menos que aparezca un error.

Cada una de las partes anteriores se delimita por una palabra reservada, de modo que un bloque
PL/SQL se puede representar como sigue:

```sql
[DECLARE
  Declaración de variables] /*Parte declarativa*/
BEGIN
  Sentencias SQL y PL/SQL /*Parte de ejecucion*/
[EXCEPTION
  Manejadores de excepciones] /*Parte de excepciones*/
END;
```

Un bloque anónimo es aquel bloque que no tiene asignado un nombre.

```sql
SET SERVEROUTPUT ON;

DECLARE
  A VARCHAR(10) := '';
BEGIN
  SELECT TO_CHAR(SYSDATE) INTO A FROM DUAL;
  DBMS_OUTPUT.PUT_LINE('LA FECHA ACTUAL ES : ' || A);
EXCEPTION
  WHEN OTHERS THEN DBMS_OUTPUT.PUT_LINE('HOLA');
END;
```

Para que la salida pueda verse al ejecutar el programa tiene que estar activa la siguiente variable:

```sql
SET SEVEROUTPUT ON;
```

Para mostrar el contenido de una expresión se debe utilizar la sentencia:

```sql
DBMS_OUTPUT.PUT_LINE (cadena_caracteres);
```

## Siguiente Tema: [PL/SQL - Declaración de variables][1]

 [1]: https://elbauldelprogramador.com/plsql-declaracion-de-variables/