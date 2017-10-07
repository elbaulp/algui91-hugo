---
author: alex
categories:
- basededatos
mainclass: BaseDeDatos
date: '2016-01-01'
lastmod: 2017-10-07T12:16:16+01:00
url: /plsql-excepciones/
tags:
- sql
- pl/sql
title: PL/SQL. Excepciones
---

Anteriormente dijimos que un bloque de código puede contener una sección denominada `EXCEPTION`. Esta sección es la encargada de recoger todas las anomalías que se puedan producir dentro del bloque de código.

Una excepción es una situación especial dentro de la ejecución de un programa, que puede ser capturada para asignar un nuevo comportamiento. Una excepción puede ser un error de ejecución (una división entre 0) o cualquier otro tipo de suceso.

<!--more--><!--ad-->

Las excepciones deben ser declaradas dentro de la sección `DECLARE`, como si de una variable se tratase:

```sql
DECLARE
e_sin_alumnos EXCEPTION;
```

Una vez que la excepción está definida, ésta debe ser lanzada, ya sea automáticamente por Oracle ( cuando se produce un error controlado por Oracle ), o lanzada manualmente por el usuario a través de la instrucción **`RAISE <excepcion>`.**

La sintaxis del manejador de excepciones es:

```sql
EXCEPTION
  WHEN nb_excepcion_1 THEN
    instrucciones excep1;
  WHEN nb_excepcion_2 THEN
    instrucciones excep2;
  ...
  WHEN nb_excepcion_n THEN
    instrucciones excepn;
  [WHEN OTHERS THEN
    instrucciones;]
```

Ejemplo:

```sql
DECLARE
  VALOR_NEGATIVO EXCEPTION;
  valor NUMBER;
BEGIN
  valor := -1;
  IF valor < 0 THEN
    RAISE VALOR_NEGATIVO;
  END IF;
  EXCEPTION
    WHEN VALOR_NEGATIVO THEN
    dbms_output.put_line('El valor no puede ser negativo');
END;
```

Cuando se produce un error, se ejecuta el bloque `EXCEPTION`. Si existe un bloque de excepción apropiado para el tipo de error producido se ejecuta dicho bloque. Si este último no existe, se ejecutará el bloque de excepción `WHEN OTHERS` `THEN` ( en el caso de haberlo definido, este bloque debe ser el último manejador de excepciones ). Una vez finalizada la ejecución del bloque de `EXCEPTION` no se continúa ejecutando el bloque anterior.

En ocasiones queremos enviar un mensaje de error personalizado al producirse una excepción PL/SQL. Para ello es necesario utilizar la instruccion **`RAISE_APPLICATION_ERROR`.**

```sql
RAISE_APPLICATION_ERROR(<error_num>,<mensaje>);
```

Donde:

- **error_num** es un entero negativo comprendido entre -20001 y -20999.
- **mensaje** es la descripción del error.

Ejemplo:

```sql
DECLARE
  v_div NUMBER;
BEGIN
  SELECT 1/0 INTO v_div FROM DUAL;
EXCEPTION
  WHEN OTHERS THEN
    RAISE_APPLICATION_ERROR(-20001,'No se puede dividir por cero');
END;
```

Dentro del bloque de excepciones conviene recordar la existencia de la excepción **`OTHERS`**, que simboliza cualquier condición de excepción que no ha sido declarada. Se utiliza comúnmente para controlar cualquier tipo de error que no ha sido previsto. En ese caso, es común observar la sentencia **`ROLLBACK`** en el grupo de sentencias de la excepción o alguna de las funciones **`SQLCODE`** – **`SQLERRM`**.

- **`SQLCODE`** devuelve el número del error de Oracle y un 0 (cero) en caso de éxito al ejecutarse una sentencia SQL.
- **`SQLERRM`** devuelve el la descripción del correspondiente mensaje de error. También es posible entregarle a la función `SQLERRM` un número negativo que represente un error de Oracle y ésta devolverá el mensaje asociado.

Estas funciones no pueden ser utilizadas directamente en una sentencia SQL, pero sí se puede asignar su valor a alguna variable de programa y luego usar esta última en alguna sentencia.

```sql
SET SERVEROUTPUT ON;
DECLARE
  err_num NUMBER;
  err_msg VARCHAR2(255);
  result NUMBER;
  msg VARCHAR2(255);
BEGIN
  msg := SQLERRM(-1403);
  DBMS_OUTPUT.put_line(MSG);
  SELECT 1/0 INTO result FROM DUAL;
EXCEPTION
  WHEN OTHERS THEN
    err_num := SQLCODE;
    err_msg := SQLERRM;
    DBMS_OUTPUT.put_line('Error:'||TO_CHAR(err_num));
    DBMS_OUTPUT.put_line(err_msg);
END;
```

```sql
DECLARE
  e_sinreg EXCEPTION;
  a number(10) := 25;
  b number(10) := 0;
  c number(10);
BEGIN
  Select count(*) INTO a FROM Articulos;
  If a < 10 THEN
    RAISE e_sinreg;
  END IF;
  c := a / b;
  DBMS_OUTPUT.PUT_LINE(' Esto nunca llegará a mostrarse. ');
EXCEPTION
  WHEN ZERO_DIVIDE THEN DBMS_OUTPUT.PUT_LINE('No se puede dividir por 0');
  WHEN e_sinreg THEN DBMS_OUTPUT.PUT_LINE('Hay menos de 10 articulos.');
  WHEN OTHERS THEN DBMS_OUTPUT.PUT_LINE('Se ha producido otra excepción.');
END;
```

Las líneas de código debajo del manejador específico se ejecutarán cuando esa excepción se produzca. Algunas excepciones se lanzarán automáticamente cuando se produzcan ciertos tipos de errores en la ejecución del bloque de código. Cada excepción automática tiene asociado un código de error `ORA-XXXX` el cual si se produce, hará que se lance la excepción correspondiente.
A continuación se muestra una lista de las excepciones automáticas predefinidas por Oracle:

<figure>
    <amp-img sizes="(min-width: 294px) 294px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="262" width="294" alt="Tabla errores oracle" title="Tabla errores oracle" src="https://2.bp.blogspot.com/_IlK2pNFFgGM/TUWDM6WfCxI/AAAAAAAAATM/0b1NleX1IY4/s320/image.0WG9PV"></amp-img>
</figure>

# Siguiente tema: [PL/SQL - Cursores][1]


 [1]: https://elbauldelprogramador.com/plsql-cursores/
