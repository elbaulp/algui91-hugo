---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-23

mainclass: BaseDeDatos
url: /introduccion-plsql-transacciones/
tags:
- transacciones sql
title: "Introducción a PL/SQL. Transacciones"
---

### Transacciones

Oracle es un sistema de base de datos puramente transaccional, de tal forma, que la instrucción `BEGIN TRANSACTION` no existe.

Una transacción es un conjunto de sentencias SQL que se ejecutan en una base de datos como una única operación, confirmándose o deshaciéndose todo el conjunto de sentencias SQL. La transacción puede quedar finalizada (con las sentencias apropiadas) o implícitamente (terminando la sesión).

<!--more--><!--ad-->

Durante la transacción, todas las modificaciones que hagamos sobre base de datos, no son definitivas, más concretamente, se realizan sobre un tablespace especial que se denomina tablespace de `ROLLBACK`, o RBS (RollBack Segment). Este tablespace tiene reservado un espacio para cada sesión activa en el servidor, y es en ese espacio donde se almacenan todas las modificaciones de cada transacción. Una vez que la transacción se ha finalizado, las modificaciones temporales almacenadas en el RBS, se vuelcan al tablespace original, donde está almacenada nuestra tabla. Esto permite que ciertas modificaciones que se realizan en varias sentencias, se puedan validar todas a la vez, o rechazar todas a la vez.

Dentro de una transacción se pueden crear los llamados “punto de control” mediante la sentencia:

```sql
SAVEPOINT Nombre_punto_control;
```

Las sentencias de finalización de transacción son:

* **`COMMIT`**: la transacción termina correctamente, se vuelcan los datos al tablespace original y se vacía el RBS.
* **`ROLLBACK`**: se rechaza la transacción y el vacía el RBS. Cualquier cambio realizado desde que se inició la transacción se deshace, quedando la base de datos en el mismo estado que antes de iniciarse la transacción.

A la hora de hacer un `ROLLBACK` o un `COMMIT` se podrá hacer hasta cierto punto con la sintaxis:

```sql
COMMIT TO punto_control;
ROLLBACK TO punto_control;
```

Cuando tenemos abierta una sesión (WorkSheet de Oracle por ejemplo), los cambios que realizamos no son visibles a otra sesión hasta que no hagamos un `COMMIT`. Este se puede realizar de forma manual, ejecutando el comando `COMMIT`; o bien, de forma automática, cuando cerramos la sesión.

En una transacción los datos modificados no son visibles por el resto de usuarios hasta que se confirme la transacción.

Si alguna de las tablas afectadas por la transacción tiene [triggers][1], las operaciones que realiza el [trigger][1] están dentro del ámbito de la transacción, y son confirmadas o deshechas conjuntamente con la transacción. Durante la ejecución de una transacción, una segunda transacción no podrá ver los cambios realizados por la primera transacción hasta que esta se confirme.

El siguiente ejemplo muestra una supuesta transacción bancaria:

```sql
DECLARE
  importe NUMBER;
  ctaOrigen VARCHAR2(23);
  ctaDestino VARCHAR2(23);
BEGIN
  importe := 100;
  ctaOrigen := '2530 10 2000 1234567890';
  ctaDestino := '2532 10 2010 0987654321';
  UPDATE CUENTAS SET SALDO = SALDO – importe WHERE CUENTA = ctaOrigen;
  UPDATE CUENTAS SET SALDO = SALDO + importe WHERE CUENTA = ctaDestino;
  INSERT INTO MOVIMIENTOS VALUES (ctaOrigen, ctaDestino, importe*(-1), SYSDATE);
  INSERT INTO MOVIMIENTOS VALUES (ctaDestino,ctaOrigen, importe, SYSDATE);
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
  dbms_output.put_line('Error en la transaccion:'||SQLERRM);
  dbms_output.put_line('Se deshacen las modificaciones);
  ROLLBACK;
END;
```

### Siguiente Tema: [Fundamentos de PL/SQL][2]

 [1]: https://elbauldelprogramador.com/plsql-disparadores-o-triggers/
 [2]: https://elbauldelprogramador.com/fundamentos-de-plsql/
