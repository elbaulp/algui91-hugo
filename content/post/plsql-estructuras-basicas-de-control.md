---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-12-12'
lastmod: 2016-08-29
layout: post.amp
mainclass: BaseDeDatos
permalink: /plsql-estructuras-basicas-de-control/
tags:
- comandos basicos sql
- sentencias sql while
title: "PL/SQL. Estructuras b\xE1sicas de control"
---

Como PL/SQL es un lenguaje 3GL, cuenta con las estructuras típicas de control de flujo: bifurcaciones condicionales y bucles:



## Bifurcaciones condicionales:

<!--more--><!--ad-->

### IF

La sintaxis básica es:

```sql
IF condición THEN
  Bloque de instrucciones;
[ELSIF condición THEN
  Bloque de instrucciones;]
...
[ELSE
  Bloque de instrucciones;]
END IF;
```


Como en cualquier lenguaje de programación, &#8220;condición&#8221; es cualquier expresión que de cómo resultado un valor booleano. Hay que saber que las estructuras IF se pueden anidar unas dentro de otras.

#### IF - THEN

Se evalúa la condición y si resulta **verdadera**, se ejecutan uno o más líneas de código de programa. En el caso de que la condición resulte **falsa o nula**, NO se realiza NINGUNA acción.

```sql
IF fecha_nac < '1-01-1970' THEN   --No termina con un ;
  Salario := salario *1.15;       --aumento de salario en un 15%
END IF;
```

Se pueden anidar varias instrucciones:

```sql
IF fecha_nac < ‘1-01-1970’ THEN
  IF apellido =‘Martínez’ THEN
    salario:= salario *1.15;
  END IF;
END IF;
```

#### IF - THEN - ELSE

Se evalúa la condición y si resulta **verdadera**, se ejecutan uno o más líneas de código de programa. En el caso de que la condición resulte **falsa**, se ejecutan las instrucciones que siguen a la instrucción `ELSE`. Sólo se permite una instrucción `ELSE` en cada instrucción IF.

```sql
IF fecha_nac <’1-01-1970’ THEN
  salario:= salario *1.15;
ELSE
  salario:= salario* 1.05;
END IF;
```

#### IF - THEN - ELSIF

Se evalúa la condición y si resulta **verdadera**, se ejecutan uno o más líneas de código de programa. En el caso de que la condición resulte ser **falsa**, se evalúa la condición especificada en el `ELSIF`.

```sql
IF condicion THEN
  instrucciones;
ELSE
  IF condicion2 THEN
    instrucciones;
  ELSE
    IF condicion3 THEN
      instrucciones;
    END IF;
  END IF;
END IF;
```

```sql
IF apellido =„Pérez‟ THEN
  salario:= salario *1.10;     --aumento de salario en un 10%
ELSIF apellido =‘Martínez’ THEN
  salario:= salario *1.15;     --aumento de salario en un 15%
ELSIF apellido=‘Alvarez’ THEN
  salario:= salario *1.20;     --aumento de salario en un 20%
ELSE
  salario:= salario* 1.05;     --aumento de salario en un 5%
END IF;                        --Sólo se necesita un único END IF
```

#### CASE

La instrucción `CASE` puede evaluar múltiples expresiones y devolver para cada una de ellas un valor/bloque de instrucciones. El resultado de cada `WHEN` puede ser un valor o una sentencia, en el primer caso el resultado de una sentencia `CASE` se puede guardar en una variable.

Su sintaxis:

```sql
CASE variable
  WHEN expresión1 THEN valor1/bloque de instrucciones
  WHEN expresión2 THEN valor2/bloque de instrucciones
  WHEN expresión3 THEN valor3/bloque de instrucciones
  WHEN expresión4 THEN valor4/bloque de instrucciones
  ELSE valor5/bloque de instrucciones
END
```

Ejemplos:

```sql
CREATE TABLE C2(
  Nombre  VARCHAR2(20 ),
  EC      VARCHAR2(1)
);

COMMIT;
INSERT INTO C2 ( NOMBRE, EC ) VALUES ('Juan ', 'S');
INSERT INTO C2 ( NOMBRE, EC ) VALUES ('Maria', 'C');
INSERT INTO C2 ( NOMBRE, EC ) VALUES ('Ana', 'D');
INSERT INTO C2 ( NOMBRE, EC ) VALUES ('Luis', 'S');
INSERT INTO C2 ( NOMBRE, EC ) VALUES ('Pepe', NULL);
COMMIT;

SELECT Nombre, CASE EC
                    WHEN 'C' THEN 'Casado/a'
                    WHEN 'S' THEN 'Soltero/a'
                    WHEN 'D' THEN 'Divorciado/a'
                    ELSE 'Otros'
               END
               AS "Estado Civil"
FROM C2;
```

Otra sintaxis es:

```sql
CASE
  WHEN condición1 THEN expresión1/bloque de instrucciones
  WHEN condición2 THEN expresión2/bloque de instrucciones
  WHEN condición3 THEN expresión3/bloque de instrucciones
  WHEN condición4 THEN expresión4/bloque de instrucciones
  ELSE expresión5/bloque de instrucciones
END
```

En esta sintaxis después del `CASE` no aparece ninguna variable y cada `WHEN` tiene su propia condición a evaluar.

#### BUCLES

```sql
LOOP
  sentencias;
END LOOP;
```

Las sentencias de dentro del bucle se ejecutarán durante un número indefinido de vueltas, hasta que aparezca la instrucción `EXIT`; que finalizará el bucle. Este tipo de bucle se denomina bucle
incondicional.

```sql
LOOP
  Sentencias
  IF (expresion) THEN
    Sentencias
    EXIT;
  END IF;
END LOOP;
```

Otra opción es incluir la estructura `EXIT WHEN` condición, se terminará el bucle cuando la condición se cumpla:

```sql
LOOP
  Sentencias
  EXIT WHEN condición;
  Sentencias
END LOOP;
```

Ejemplo:

```sql
DECLARE -- Declaración y asignación de variables
  total NUMBER(9) := 0;
  counter NUMBER(6) := 0;
BEGIN
  LOOP
    counter := counter + 1; -- Incrementamos la variable contador
    total := total + counter * counter;
    -- Salimos del bucle cuando la condición de cumpla
    EXIT WHEN total &gt; 25000;
  END LOOP;

  DBMS_OUTPUT.PUT_LINE('Counter: ' || TO_CHAR(counter) || ' Total: ' || TO_CHAR(total));
END;
```

Un tipo de bucle más común son los bucles condicionales:

```sql
WHILE condicion LOOP
  Sentencias
END LOOP;
```

Ejemplo:

```sql
DECLARE
  i       NUMBER := 1;
  i_cubed NUMBER;
BEGIN
  WHILE i <= 10 LOOP
    i_cubed := i**3;
    DBMS_OUTPUT.PUT_LINE('Number: ' || TO_CHAR(i) || ' Cube: ' || TO_CHAR(i_cubed));
    i := i + 1;
  END LOOP;
END;
```

En los bucles `WHILE` también se pueden utilizar las órdenes `EXIT` o `EXIT WHEN` para salirnos sin esperar a que la condición devuelva un valor falso.

Y por último el bucle FOR:

```sql
FOR contador IN [REVERSE] limite_inferior..limite_superior LOOP
  sentencias
END LOOP;
```

Contador deberá ser una variable de tipo numérico que sea capaz de contener los valores comprendidos entre limite\_inferior y limite\_superior, los cuales deberán ser expresiones numéricas, ya sean constantes (1,10&#8230;) o funciones (`ROUND`(max,0), `ASCII`(‘A’)&#8230;) .

Si la variable contador no está definida, PL/SQL definirá una variable de tipo `INTEGER` al iniciar el bucle, y la liberará al finalizar el bucle.

```sql
SET SERVEROUTPUT ON;
BEGIN
  FOR loop_counter IN 1..10 LOOP
    DBMS_OUTPUT.PUT_LINE('Number: ' || TO_CHAR(loop_counter) || ' Square: ' || TO_CHAR(loop_counter**2));
    END LOOP;
END;
```

En el caso de especificar `REVERSE` el bucle se recorre en sentido inverso.


### Siguiente tema: [PL/SQL - Excepciones][1]

 [1]: https://elbauldelprogramador.com/plsql-excepciones/