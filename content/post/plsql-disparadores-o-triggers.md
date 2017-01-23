---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-09-03
layout: post.amp
mainclass: BaseDeDatos
permalink: /plsql-disparadores-o-triggers/
tags:
- algoritmos trigger
- como hacer un trigger
- trigger de actualizacion
title: PL/SQL. Disparadores o Triggers
---

## Introducción

Los disparadores (o triggers) son [bloques de código PL/SQL][1] asociados a una tabla y que se ejecutan automáticamente como reacción a una [operación DML][2] específica (`INSERT`, `UPDATE` o `DELETE`) sobre dicha tabla.

<!--more--><!--ad-->

En definitiva, los disparadores son eventos a nivel de tabla que se ejecutan automáticamente cuando se realizan ciertas operaciones sobre la tabla.

Para crear un disparador utilizaremos la siguiente instrucción:

```sql
CREATE {OR REPLACE} TRIGGER nombre_disp
  [BEFORE|AFTER]
  [DELETE|INSERT|UPDATE {OF columnas}] [ OR [DELETE|INSERT|UPDATE {OF columnas}]...]
  ON tabla
  [FOR EACH ROW [WHEN condicion disparo]]
[DECLARE]
  -- Declaración de variables locales
BEGIN
  -- Instrucciones de ejecución
[EXCEPTION]
  -- Instrucciones de excepción
END;
```

El uso de OR `REPLACE` permite sobrescribir un trigger existente. Si se omite, y el trigger existe, se producirá, un error.

En principio, dentro del cuerpo de programa del trigger podemos hacer uso de cualquier orden de consulta o manipulación de la BD, y llamadas a funciones o procedimientos siempre que:

* No se utilicen [comandos DDL][3]
* No se acceda a las tablas que están siendo modificadas con [`DELETE`, `INSERT` o `UPDATE`][2] en la misma sesión
* No se violen las [reglas de integridad][4], es decir no se pueden modificar llaves primarias, ni actualizar llaves externas
* No se utilicen sentencias de control de [transacciones][5] (Commit, Rollback o Savepoint)
* No se llamen a [procedimientos][6] que trasgredan la restricción anterior
* No se llame a procedimientos que utilicen sentencias de control de transacciones

## Predicados condicionales

Cuando se crea un trigger para más de una operación DML, se puede utilizar un predicado condicional en las sentencias que componen el trigger que indique que tipo de operación o sentencia ha disparado el trigger. Estos predicados condicionales son los siguientes:

- **Inserting**: Retorna **true** cuando el trigger ha sido disparado por un **`INSERT`**
- **Deleting**: Retorna **true** cuando el trigger ha sido disparado por un **`DELETE`**
- **Updating**: Retorna **true** cuando el trigger ha sido disparado por un **`UPDATE`**
- **Updating (columna)**: Retorna **true** cuando el trigger ha sido disparado por un **`UPDATE`** y la columna ha sido modificada.

```sql
CREATE TRIGGER audit_trigger BEFORE INSERT OR DELETE OR UPDATE
  ON classified_table FOR EACH ROW
BEGIN
  IF INSERTING THEN
    INSERT INTO audit_table
    VALUES (USER || ' is inserting' ||
    ' new key: ' || :new.key);
  ELSIF DELETING THEN
    INSERT INTO audit_table
    VALUES (USER || ' is deleting' ||
    ' old key: ' || :old.key);
  ELSIF UPDATING('FORMULA') THEN
    INSERT INTO audit_table
    VALUES (USER || ' is updating' ||
    ' old formula: ' || :old.formula ||
    ' new formula: ' || :new.formula);
  ELSIF UPDATING THEN
    INSERT INTO audit_table
    VALUES (USER || ' is updating' ||
    ' old key: ' || :old.key ||
    ' new key: ' || :new.key);
  END IF;
END;
```

## Tipos de triggers

Los triggers pueden definirse para las operaciones `INSERT`, `DELETE` o Update, y pueden dispararse antes o después de la operación. Finalmente, el nivel de los disparadores puede ser la fila o registro o la orden.

El modificador `BEFORE` o `AFTER` indica que el trigger se ejecutará antes o después de ejecutarse la sentencia SQL definida por `DELETE`, `INSERT` o `UPDATE`. Si incluimos el modificador OF el trigger solo se ejecutará cuando la sentencia SQL afecte a los campos incluidos en la lista.

El alcance de los disparadores puede ser la fila o de orden. El modificador `FOR EACH ROW` indica que el trigger se disparará cada vez que se realizan operaciones sobre cada fila de la tabla. Si se acompaña del modificador `WHEN`, se establece una restricción; el trigger solo actuará, sobre las filas que satisfagan la restricción.

Tipos de disparadores.

| Categoria       | Valores                  | Comentarios                                                                                                                                                                                                                                                                                                         |
|-----------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Orden           | `INSERT, DELETE, UPDATE` | Define que tipo de operación [DML](/lenguaje-manipulacion-de-datos-dml/ "Lenguaje de Manipulación de Datos") provoca laactivación del trigger                                                                                                                                                                                                                                                   |
| Temporalización | `BEFORE o AFTER`         | Define si el disparador se activa antes o después deque se ejecute la operación DML                                                                                                                                                                                                                                 |
| Nivel           | Fila u Orden             | Los disparadores con nivel de fila se activan unavez por cada fila afectada por la orden que provocóel disparo. Los Triggers con nivel de orden seactivan sólo una vez, antes o después de la orden.Los disparadores con nivel de fila se identificanpor la cláusula `FOR EACH ROW` en la definicióndel disparador. |

## Orden de ejecución de los triggers

Una misma tabla puede tener varios triggers asociados. En tal caso es necesario conocer el orden en el que se van a ejecutar.

Los disparadores se activan al ejecutarse la sentencia SQL.

- Si existe, se ejecuta el disparador de tipo `BEFORE` (disparador previo) con nivel de orden.
- Para cada fila a la que afecte la orden:
- Se ejecuta si existe, el disparador de tipo `BEFORE` con nivel de fila.
- Se ejecuta la propia orden.
- Se ejecuta si existe, el disparador de tipo `AFTER` (disparador posterior) con nivel de fila.
- Se ejecuta, si existe, el disparador de tipo `AFTER` con nivel de orden.

## Restricciones de los Triggers.

El cuerpo de un disparador es un [bloque PL/SQL][1]. Cualquier orden que sea legal en un bloque PL/SQL , es legal en el cuerpo de un disparador, con las siguientes restricciones:

- Un disparador no puede emitir ninguna orden de [control de transacciones][5] ( `COMMIT`, `ROLLBACK` o `SAVEPOINT`). El disparador se activa como parte de la ejecución de la orden que provocó el disparo, y forma parte de la misma transacción qu dicha orden. Cuando la orden que provoca la orden es confirmada o cancelada, se confirma o se cancela también el trabajo realizado por el disparador.
- Por las mismas razones, ningún [procedure o función][6] llamado por el disparador puede emitir órdenes de control de transacciones.
- El disparador no puede declarar [variables][7] de tipo `LONG`.

## Utilización de :old y :new en los disparadores con nivel de fila.

Un disparador con nivel de fila se ejecuta una vez por cada fila procesada por la orden que provoca el disparo. Dentro del disparador, puede accederse a la fila que está siendo actualmente
procesada utilizando, para ello, dos pseudo-registros, **`:old`** y **`:new`**.

En principio tanto `:old` como `:new` son del tipo **`tabla_disparo%ROWTYPE;`**

| Orden de Disparo | `:old`                                                   | `:new`                                                        |
|------------------|----------------------------------------------------------|---------------------------------------------------------------|
| `INSERT`         | No definido; todos los campos tomanel valor `NULL`.      | Valores que serán insertados cuandose complete la orden       |
| `UPDATE`         | Valores originales de la fila, antes dela actualización. | Nuevos valores que serán escritoscuando se complete la orden. |
| `DELETE`         | Valores originales, antes del borradode la fila.         | No definido; todos los campos tomanel valor NULL.             |

Ejemplo:

```sql
CREATE TRIGGER scott.emp_permit_changes
  BEFORE DELETE OR INSERT OR UPDATE ON scott.emp
DECLARE
  dummy INTEGER;
BEGIN
  /* If today is a Saturday or Sunday, then return an error.
  IF (TO_CHAR(SYSDATE, 'DY') = 'SAT' OR TO_CHAR(SYSDATE, 'DY') = 'SUN') THEN
    raise_application_error( -20501,'May not change employee table during the weekend');
  END IF;

  /* Compare today's date with the dates of all
  company holidays. If today is a company holiday,
  then return an error.*/

  SELECT COUNT(*) INTO dummy FROM company_holidays
  WHERE day = TRUNC(SYSDATE);
  IF dummy > 0 THEN
    raise_application_error( -20501,'May not change employee table during a holiday');
  END IF;

  /*If the current time is before 8:00AM or after
  6:00PM, then return an error. */

  IF (TO_CHAR(SYSDATE, 'HH24') < 8 OR TO_CHAR(SYSDATE, 'HH24') >= 18) THEN
    raise_application_error( -20502, 'May only change employee table during working hours');
  END IF;
END;
```

## La cláusula WHEN

La cláusula `WHEN` sólo es válida para disparadores con nivel de fila. Si está presente, el cuerpo del disparador sólo se ejecutará para las filas que cumplan la condición especificada en la cláusula.

```sql
CREATE TRIGGER tr1
  BEFORE INSERT OR UPDATE OF salario ON scott.emp
  FOR EACH ROW WHEN (new.job <> 'PRESIDENT')
BEGIN
  /* Cuerpo del disparador */
END;
```

Esto último es equivalente a:

```sql
CREATE TRIGGER tr1
  BEFORE INSERT OR UPDATE OF salario ON scott.emp
  FOR EACH ROW
BEGIN
  IF :new.job <> 'PRESIDENT' THEN
    /* Cuerpo del disparador */
  END IF;
END;
```

Para hacer que un trigger ejecute un `ROLLBACK` de la transacción que tiene activa y teniendo en cuenta que en las sentencias que componen el cuerpo de un trigger no puede haber este tipo de sentencias (rollback, commit,&#8230;) hay que ejecutar **“error / excepcion”** mediante la sentencia `raise_application_error` cuya sintaxis es:


```sql
RAISE_APPLICATION_ERROR(num_error,’mensaje’);
```

El `num_error` es un número entero cualquiera, aunque se aconseja que tenga 5 dígitos.

```sql
raise_application_error( 20000,’ No se puede modificar el cliente.’);
```

## Tabla Mutando

Cuando se realiza un trigger sobre una tabla, dicha tabla se dice que está en **“proceso de mutación”**, es decir, que se están realizando cambios sobre ella y que por tanto **dentro del trigger no se debe hacer ningún tipo de acceso a dicha tabla con operaciones DML (`SELECT`, `INSERT`, `DELETE` o `UPDATE`).**

Si queremos conocer los valores del registro de la tabla sobre la que se ha disparado el trigger, este último debe estar declarado de forma `FOR EACH ROW` y acceder a sus valores mediante las pseudocolumnas :NEW y :OLD.

## Siguiente tema: [PL/SQL - Registros y Tablas][8]

 [1]: https://elbauldelprogramador.com/bloques-plsql/
 [2]: https://elbauldelprogramador.com/lenguaje-manipulacion-de-datos-dml/
 [3]: https://elbauldelprogramador.com/lenguaje-definicion-de-datosddl-create/
 [4]: https://elbauldelprogramador.com/diseno-de-bases-de-datos-i-conceptos/
 [5]: https://elbauldelprogramador.com/introduccion-plsql-transacciones/
 [6]: https://elbauldelprogramador.com/plsql-procedimientos-y-funciones/
 [7]: https://elbauldelprogramador.com/plsql-declaracion-de-variables/
 [8]: https://elbauldelprogramador.com/plsql-registros-y-tablas/