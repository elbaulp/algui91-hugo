---
author: alex
categories:
- basededatos
color: '#009688'
lastmod: 2016-08-15
layout: post.amp
mainclass: BaseDeDatos
permalink: /componentes-del-lenguaje-sql-sql/
title: Componentes del lenguaje SQL
---

### Tipos de Datos

SQL admite una variada gama de tipos de datos para la información almacenada en las tablas, los tipos de datos pueden ser numéricos, alfanuméricos, de fecha o booleanos. Segun el gestor de base de datos que usemos, los tipos de datos varían. En la actualidad casi todos los gestores soportan un nuevo tipo de dato. BLOB, usado para almacenar archivos, imagenes etc.

<!--more--><!--ad-->

En la siguiente tabla se muestran los tipos de datos.

| __Numérico__  | __Alfanumérico__ | __Fecha__ | __Lógico__ 	| __BLOB__  	|
|--------------	|--------------	|----------	|--------	|-------	|
| Integer      	| char(n)      	| Date     	| Bit    	| Image 	|
| Numeric(n,m) 	| varchar(n,m) 	| DateTime 	|        	| Text  	|
| Decimal      	|              	|          	|        	|       	|
| Float        	|              	|          	|        	|       	|


Más detalladamente tenemos:

<table class="tabla">
<tr>
<th colspan="3" align="center">
      Tipos de datos numéricos
    </th>
</tr>
<tr>
<th>
      Tipo
    </th>
<th>
      Definición
    </th>
<th>
      Bytes
    </th>
</tr>
<tr>
<td>
      Integer
    </td>
<td>
      Valores enteros con signo.
    </td>
<td>
      4
    </td>
</tr>
<tr>
<td>
      Numeric(n,m)
    </td>
<td>
      Números reales de hasta 18 dígitos (con decimales), donde n representa el total de dígitos admitidos (normalmente denominado precisión) y m el número de posiciones decimales (escala).
    </td>
<td>
      5-17
    </td>
</tr>
<tr>
<td>
      Decimal(n,m)
    </td>
<td>
      Igual que el tipo numeric.
    </td>
<td>
      5-17
    </td>
</tr>
<tr>
<td>
      Float
    </td>
<td>
      Número de coma flotante, este tipo de datos se suele utilizar para los valores en notación cientifica.
    </td>
<td>
      4-8
    </td>
</tr>
<tr>
<th colspan="3" align="center">
      Tipos de Datos alfanuméricos
    </th>
</tr>
<tr>
<td>
      char(n)
    </td>
<td>
      Almacena de 1 a 255 caracteres alfanuméricos. Este valor viene dado por n, y es el tamaño utilizado en disco para almacenar dato. Es decir si defino un campo como char(255), el tamaño real del campo será de 255, aunque el valor solo contenga 100.
    </td>
<td>
      0-255
    </td>
</tr>
<tr>
<td>
      varchar(n)
    </td>
<td>
      Igual que el tipo char, con la salvedad que varchar almacena únicamente los bytes que contenga el valor del campo.
    </td>
<td>
      0-255
    </td>
</tr>
<tr>
<th colspan="3" align="center">
      Tipos de datos fecha
    </th>
</tr>
<tr>
<td>
      Date
    </td>
<td>
      Almacena fechas, con dias, mes y año.
    </td>
<td>
      8
    </td>
</tr>
<tr>
<td>
      Datetime
    </td>
<td>
      Almacena la fecha y la hora.
    </td>
<td>
      4
    </td>
</tr>
<tr>
<th colspan="3" align="center">
      Tipos de datos lógicos
    </th>
</tr>
<tr>
<td>
      Bit
    </td>
<td>
      Almacena 0 o no cero, según la base de datos serán 1 o -1. 0 es falso y 1 verdadero.
    </td>
<td>
      1 bit
    </td>
</tr>
<tr>
<th colspan="3" align="center">
      Tipos de datos BLOB
    </th>
</tr>
<tr>
<td>
      image
    </td>
<td>
      Almacena imágenes en formato binario, hasta 2Gb
    </td>
<td>
      0-2Gb
    </td>
</tr>
<tr>
<td>
      Text
    </td>
<td>
      Almacena texto en formato binario, hasta 2Gb
    </td>
<td>
      0-2Gb
    </td>
</tr>
</table>

Nota: El tama&ntilde;o del campo varía en función de cada base de datos, 255 es el valor estándar. Realmente el tama&ntilde;o viene delimitado por el tama&ntilde;o de las páginas de datos, para SQL server el límite está en 8000 bytes (8000 carácteres), siempre que el tama&ntilde;o de página sea de 8Kb

### Tipos de datos en ORACLE

- <strong>NUMBER</strong>(Numérico): Almacena números enteros o de punto flotante, virtualmente de cualquier longitud, aunque se puede especificar la precisión y la escala.

```sql
-- NUMBER [(precisión, escala)]
saldo NUMBER(16,2);
/*Indica que puede almacenar un valor numérico de 16 dígitos, 2 de ellas decimales. Es decir, 14 enteros y dos decimales o 16 enteros*/
```

La precisión indica el número de dígitos (contanto los decimales) que contendrá el número como máximo. La escala indica el máximo de dígitos decimales. Si declaramos un NUMBER(10,5), podrá contener como máximo cualquier número siempre y cuando el número de dígitos enteros más el número de dígitos decimales no supere 10 (y no 15).

Se puede especificar una escala negativa para redondear el número a las posiciones indicadas en la escala. Por ejemplo, NUMBER(5,-2) redondea a las centenas, por lo que si introducimos 1355, se almacenará 1400.

- <strong>VARCHAR2</strong> (Carácter de longitud variable): Almacena datos de tipo carácter empleando sólo la cantidad necesaria aún cuando la longitud máxima sea mayor.

```sql
‐‐ VARCHAR2 (longitud_maxima)
nombre VARCHAR2(20);
/* Indica que puede almacenar valores alfanuméricos de hasta 20 posiciones */
/* Cuando la longitud de los datos sea menor de 20 no se rellena con blancos */
```

- <strong>CHAR</strong> (Caracter): Almacena datos de tipo carácter con una longitud máxima de 32767 y cuyo valor de longitud por defecto es 1.

```sql
‐‐ CHAR [(longitud_maxima)]
nombre CHAR(20);
/* Indica que puede almacenar valores alfanuméricos de 20 posiciones*/
```

- <strong>BOOLEAN</strong> (lógico): Se emplea para almacenar valores TRUE o FALSE.

```sql
hay_error BOOLEAN;
```

- <strong>DATE</strong> (Fecha): Internamente se almacenan como números, se pueden realizar operaciones aritméticas con ellas. En oracle se almacenan con el formato: Siglo / año / mes / día / hora / minuto / segundo. Pero su formato por defecto es &#8216;SS-MM-YYYY&#8217;.

- Tipos de datos binarios: Almacenan información tal y como se encuentra en el disco duro o memoria. Se usan para almacenar grandes cantidades de datos (4Gb max.), cualquier tipo de fichero (ejecutables, sonidos, fotos ect) o para transportar datos de una base de datos a otra. En oracle hay dos tipos, CLOB y NLOB.
- Atributos de Tipo: Un atributo de tipo en PL/SQL permiter obtener información de un objeto de la base de datos. %TYPE permite conocer el tipo de una variable, constante o campo. %ROWTYPE obtiene los tipos de todos los campos de una tabla, vista o cursor.

```sql
DECLARE
‐‐ declare record variable that represents a row fetched from the employees table
  emp_rec employees%ROWTYPE; ‐‐ declare variable with %ROWTYPE attribute
BEGIN
  SELECT * INTO emp_rec FROM EMPLOYEES WHERE employee_id = 120; ‐‐ retrieve record
  DBMS_OUTPUT.PUT_LINE('Employee name: ' || emp_rec.first_name || ' ' || emp_rec.last_name);
END;

```

- Registros:  Un registro es una estructura de datos en PL/SQL, almacenados en campos, cada uno de los cuales tiene su propio nombre y tipo y que se tratan como una sola unidad lógica. Los campos de un registro pueden ser inicializados y pueden ser definidos como NOT NULL. Aquellos campos que no sean inicializados explícitamente, se inicializarán a NULL. La sintaxis general es la siguiente:

```sql
TYPE <nombre> IS RECORD
(
  campo <tipo_datos> [NULL | NOT NULL]
  [,<tipo_datos>...]
);
```

Los registros son un tipo de datos, se pueden declarar variables de dicho tipo de datos. (Son como los struct en C++)

```sql
DECLARE
TYPE PAIS IS RECORD
  (
    CO_PAIS NUMBER,
    DESCRIPCION VARCHAR2(50),
    CONTINENTE VARCHAR2(20)
  );

/* Declara una variable miPAIS de tipo PAIS. Esto significa que la variable miPAIS tendrá los campos ID, DESCRIPCION y CONTINENTE. */
  miPAIS PAIS;
BEGIN
/* Asignamos valores a los campos de la variable.*/
  miPAIS.CO_PAIS := 27;
  miPAIS.DESCRIPCION := 'ITALIA';
  miPAIS.CONTINENTE := 'EUROPA';
END;
```

Los registros pueden estar anidados. Es decir, un campo de un registro puede ser de un tipo de dato de otro registro. Pueden asignarse todos los campos de un registro utilizando una sentencia SELECT.

```sql
SELECT CO_PAIS, DESCRIPCION, CONTINENTE INTO miPAIS FROM PAISES WHERE CO_PAIS = 27;
```

- Colecciones o Tablas de PL/SQL: Permite almacenar varios valores del mismo tipo de datos. Una tabla PL/SQL:

1.  Es similar a un array
2.  Tiene dos componentes: Un índice de tipo BINARY_INTEGER que permite acceder a los elementos en la tabla PL/SQL y una columna de escalares o registros que contiene los valores de la tabla PL/SQL
3.  Puede incrementar su tamaño dinámicamente.

La sintaxis general es la siguiente:

```sql
TYPE <nombre_tipo_tabla> IS TABLE OF
<tipo_datos> [NOT NULL]
INDEX BY BINARY_INTEGER;
```

Una vez definido el tipo, podemos declarar variables y asignarles valores.

```sql
DECLARE
  /* Definimos el tipo PAISES como tabla PL/SQL */
  TYPE PAISES IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
  /* Declaramos una variable del tipo PAISES */
  tPAISES PAISES;
BEGIN
  tPAISES(1) := 1;
  tPAISES(2) := 2;
  tPAISES(3) := 3;
END;

```

### Funciones para el manejo de tablas PL/SQL

Cuando trabajamos con tablas de PL/SQL podemos utilizar las siguientes funciones:

1.  a. FIRST. Devuelve el menor índice de la tabla. NULL si está vacía.
2.  b. LAST. Devuelve el mayor índice de la tabla. NULL si está vacía.
3.  c. EXISTS(i). Utilizada para saber si en un cierto índice hay almacenado un valor. Devolverá TRUE si en el índice i hay un valor.
4.  d. COUNT. Devuelve el número de elementos de la tabla PL/SQL.
5.  e. PRIOR (n). Devuelve el número del índice anterior a n en la tabla.
6.  f. NEXT (n). Devuelve el número del índice posterior a n en la tabla.
7.  g. TRIM. Borra un elemento del final de la tabla PL/SQL.
8.  h. TRIM(n) borra n elementos del final de la tabla PL/SQL.
9.  i. DELETE. Borra todos los elementos de la tabla PL/SQL.
10.  j. DELETE(n) borra el correspondiente al índice n.
11.  k. DELETE(m,n) borra los elementos entre m y n.

```sql
DECLARE
TYPE ARR_CIUDADES IS TABLE OF VARCHAR2(50) INDEX BY BINARY_INTEGER;
misCiudades ARR_CIUDADES;
BEGIN
misCiudades(1) := 'MADRID';
misCiudades(2) := 'BILBAO';
misCiudades(3) := 'MALAGA';
FOR i IN misCiudades.FIRST..misCiudades.LAST LOOP
dbms_output.put_line(misCiudades(i));
END LOOP;
END;
```

### ROWID

Representa una dirección de la base de datos, ocupada por una única fila. El ROWID de una fila es un identificador único para una fila dentro de una base de datos. No hay dos filas con el mismo ROWID. Este tipo de dato sirve para guardar punteros a filas concretas.

## Operadores

Los operadores se pueden definir como combinaciones de caracteres que se utilizan tanto para realizar asignaciones como comparaciones entre datos. Se dividen en aritméticos, relacionales, lógicos y de concatenación y suelen ser los mismos para todos los SGBD.

<table class="tabla">
<tr>
<th colspan="3">
                              Operadores SQL
                            </th>
</tr>
<tr>
<td rowspan="5">
                              Aritmeticos
                            </td>
<td>
                              +
                            </td>
<td>
                              Suma
                            </td>
</tr>
<tr>
<td>
                              -
                            </td>
<td>
                              Resta
                            </td>
</tr>
<tr>
<td>
                              *
                            </td>
<td>
                              Producto
                            </td>
</tr>
<tr>
<td>
                              /
                            </td>
<td>
                              División
                            </td>
</tr>
<tr>
<td>
                              ** ^
                            </td>
<td>
                              Exponenciación
                            </td>
</tr>
<tr>
<td rowspan="7">
                              Relacionales
                            </td>
<td>
                              &lt;
                            </td>
<td>
                              Menor que
                            </td>
</tr>
<tr>
<td>
                              &lt;=
                            </td>
<td>
                              Menor o igual que
                            </td>
</tr>
<tr>
<td>
                              >
                            </td>
<td>
                              Mayor que
                            </td>
</tr>
<tr>
<td>
                              >=
                            </td>
<td>
                              Mayor o igual que
                            </td>
</tr>
<tr>
<td>
</td><td> !=
                            </td>
<td>
                              Distinto
                            </td>
</tr>
<tr>
<td>
                              !&lt;
                            </td>
<td>
                              No menor que
                            </td>
</tr>
<tr>
<td>
                              !>
                            </td>
<td>
                              No mayor que
                            </td>
</tr>
<tr>
<td rowspan="3">
                              Lógicos
                            </td>
<td>
                              AND
                            </td>
<td rowspan="3">
                              Los operadores lógicos permiten comparar expresiones lógicas devolviendo siempre un valor verdadero o falso. Los operadores lógicos se evalúan de izquierda a derecha.
                            </td>
</tr>
<tr>
<td>
                              OR
                            </td>
</tr>
<tr>
<td>
                              NOT
                            </td>
</tr>
<tr>
<td>
                              Concatenación
                            </td>
<td>
                              +, ||
                            </td>
<td>
                              Se emplea para unir datos de tipo alfanumérico. + se emplea en Microsoft SQLSERVER y || en ORACLE.
                            </td>
</tr>
</table>


### Operadores en ORACLE

Los más comunes son:

#### Palabras clave

SQL dispone de muy pocas órdenes, pero de múltiples palabras clave, lo que le convierten en un lenguaje sencillo pero tremendamente potente para llevar a cabo su función.

| ALL    | AND     | ANY      | ASC      |
|--------|---------|----------|----------|
| AVG    | BEGIN   | BY       | CHAR     |
| CHECK  | CLOSE   | COUNT    | COMMIT   |
| CREATE | CURSOR  | DECIMAL  | DECLARE  |
| DELETE | DESC    | DISTINCT | DEFAULT  |
| EXISTS | FETCH   | FLOAT    | FOR      |
| FROM   | GRANT   | GROUP    | HAVING   |
| IN     | INDEX   | INSERT   | INTEGER  |
| INTO   | LIKE    | MAX      | MIN      |
| NOT    | NUMERIC | ON       | OPEN     |
| OR     | ORDER   | REVOKE   | ROLLBACK |
| SELECT | SET     | SUM      | TABLE    |
| UNION  | UNIQUE  | UPDATE   | USER     |
| VALUES | VIEW    | WHERE    | WITH     |


### Funciones Agregadas

Proporcionan a SQL utilidades de cálculo sobre los datos de las tablas. Estas funciones se incorporan en las consultas SELECT y retornan un único valor al operar sobre un grupo de registros.

| FUNCION 	| Descripción                                           	|
|---------	|-------------------------------------------------------	|
| MAX()   	| Devuelve el valor máximo                              	|
| MIN()   	| Devuelve el valor mínimo                              	|
| SUM()   	| Devuelve el valor de la suma de los valores del campo 	|
| COUNT() 	| Devuelve el número de filas que cumplen la condición  	|
| AVG()   	| Devuelve el promedio de los valores del campo         	|

### Predicados

Condiciones que se indican en clausula WHERE de una consulta SQL. La siguiente tabla ilustra los predicados de SQL.

| COMANDO     | Descripción                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| BETWEEN…AND | Comprueba que el valor esta dentro de un intervalo                                                          |
| LIKE        | Compara un campo con una cadena alfanumérica. LIKE admite el uso de caracteres comodines                    |
| ALL         | Señala a todos los elementos de la selección de la consulta                                                 |
| ANY         | Indica que la condición se cumplirá si la comparación es cierta para al menos un elemento del conjunto.     |
| EXISTS      | Devuelve un valor verdadero si el resultado de una subconsulta devuelve resultados.                         |
| IN          | Comprueba si un campo se encuentra dentro de un determinado rango. El rango puede ser una sentencia SELECT. |


### Bibliografia: www.devjoker.com

Siguiente tema: <a href="https://elbauldelprogramador.com/lenguaje-definicion-de-datosddl-create/">Lenguaje Definición de Datos(DDL) - CREATE.</a>
