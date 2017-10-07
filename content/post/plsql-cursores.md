---
author: alex
categories:
- basededatos
mainclass: BaseDeDatos
date: '2016-01-01'
lastmod: 2017-10-07T12:14:47+01:00
url: /plsql-cursores/
tags:
- sql
- pl/sql
title: PL/SQL. Cursores
---

Un cursor es el nombre para un área memoria privada que contiene información procedente de la ejecución de una sentencia `SELECT`. Cada cursor tiene unos atributos que nos devuelven información útil sobre el estado del cursor en la ejecución de la sentencia SQL. Cuando un cursor está abierto y los datos referenciados por la consulta `SELECT` cambian, estos cambios no son recogidos por el cursor.

PL/SQL crea implícitamente un cursor para todas las sentencias SQL de manipulación de datos sobre un conjunto de filas, incluyendo aquellas que solo devuelven una sola fila.

En PL/SQL no se pueden utilizar sentencias `SELECT` de sintaxis básica ( `SELECT <lista> FROM <tabla>` ). PL/SQL utiliza cursores para gestionar las instrucciones `SELECT`. Un cursor es un conjunto de registros devuelto por una instrucción SQL.

<!--more--><!--ad-->

Podemos distinguir dos tipos de cursores:

- **Cursores implícitos**. Este tipo de cursores se utiliza para operaciones **`SELECT INTO`**. Se usan cuando la consulta devuelve un único registro.
- **Cursores explícitos.** Son los cursores que son declarados y controlados por el programador. Se utilizan cuando la consulta devuelve un conjunto de registros. Ocasionalmente también se utilizan en consultas que devuelven un único registro por razones de eficiencia. Son más rápidos.

Un cursor se define como cualquier otra variable de PL/SQL y debe nombrarse de acuerdo a los mismos convenios que cualquier otra variable.

Los cursores implícitos se utilizan para realizar consultas `SELECT` que devuelven un único registro. Deben tenerse en cuenta los siguientes puntos cuando se utilizan cursores implícitos:

- Los cursores implícitos no deben ser declarados
- Con cada cursor implícito debe existir la palabra clave **`INTO`**.
- Las variables que reciben los datos devueltos por el cursor tienen que contener el mismo tipo de dato que las columnas de la tabla.
- Los cursores implícitos solo pueden devolver una única fila. En caso de que se devuelva más de una fila (o ninguna fila) se producirá una [excepción][1]. Las más comunes son:

- **`NO_DATA_FOUND`**: Se produce cuando una sentencia `SELECT` intenta recuperar datos pero ninguna fila satisface sus condiciones. Es decir, cuando _“no hay datos”_.
- **`TOO_MANY_ROWS`** Dado que cada cursor implícito sólo es capaz de recuperar una fila, esta [excepción][1] detecta la existencia de más de una fila.

```sql
SET SERVEROUTPUT ON;
declare
  vdescripcion VARCHAR2(50);
begin
  SELECT DESCRIPCION INTO vdescripcion from PAISES WHERE CO_PAIS = 'ESP';
  dbms_output.put_line('La lectura del cursor es: ' || vdescripcion);
end;
```

Para procesar instrucciones `SELECT` que devuelvan más de una fila, son necesarios cursores **explícitos** combinados con una estructura de bloque. A partir de ahora, cuando hagamos referencia a **cursores** nos referiremos a cursores explícitos.

Para trabajar con un cursor hay que realizar los siguientes pasos:

1. Declarar el cursor
2. Abrir el cursor en el servidor
3. Recuperar cada una de sus filas (bucle)
4. Cerrar el cursor

# 1. Declarar el cursor

Al igual que cualquier otra variable, el cursor se declara en la sección `DECLARE`. Se define el nombre que tendrá el cursor y qué consulta `SELECT` ejecutará. No es más que una declaración. La sintaxis básica es:

```sql
CURSOR nombre_cursor IS instrucción_SELECT
CURSOR nombre_cursor(param1 tipo1, ..., paramN tipoN) IS instrucción_SELECT
```

Una vez que el cursor está declarado ya podrá ser utilizado dentro del bloque de código.

Antes de utilizar un cursor se debe abrir. En ese momento se ejecuta la sentencia `SELECT` asociada y se almacena el resultado en el área de contexto (estructura interna de memoria que maneja el cursor). Un puntero señala a la primera fila

# 2. Abrir el cursor

Al abrir el cursor se ejecuta la sentencia `SELECT` asociada y cuyo resultado se guarda en el servidor en un área de memoria interna (tablas temporales) de las cuales se va retornando cada una de las filas según se va pidiendo desde el cliente. Al abrir un cursor, un puntero señalará al primer registro.

La sintaxis de apertura de un cursor es:

```sql
OPEN nombre_cursor;
OPEN nombre_cursor(valor1, valor2, ..., valorN);
```

Una vez que el cursor está abierto, se podrá empezar a pedir los resultados al servidor.

# 3.Recuperar cada una de sus filas.

Una vez que el cursor está abierto en el servidor se podrá hacer la petición de recuperación de fila. En cada recuperación solo se accederá a una **única** fila. La sintaxis de recuperación de fila de un cursor es:

```sql
FETCH nombre_cursor INTO variables;

```

Podremos recuperar filas mientras la consulta `SELECT` tenga filas pendientes de recuperar. Para saber cuándo no hay más filas podemos consultar los siguientes atributos de un cursor:

<figure>
    <amp-img sizes="(min-width: 584px) 584px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="74" width="584" src="https://1.bp.blogspot.com/_IlK2pNFFgGM/TUhwFtXwPiI/AAAAAAAAAT4/hCYNcjrUIuA/s1600/image.7HS4PV"></amp-img>
</figure>

Al recuperar un registro, la información recuperada se guarda en una o varias variables. Si sólo se hace referencia a una variable, ésta se puede declarar con [`%ROWTYPE`][2]. Si se utiliza una lista de variables, cada variable debe coincidir en tipo y orden con cada una de las columnas de la sentencia `SELECT`.

Así lo acción más típica es recuperar filas mientras queden alguna por recuperar en el servidor. Esto lo podremos hacer a través de los siguientes bloques:

```sql
OPEN nombre_cursor;
LOOP
  FETCH nombre_cursor INTO variables;
  EXIT WHEN nombre_cursor%NOTFOUND;
  --procesar cada una de las filas
END LOOP;
OPEN nombre_cursor;
FETCH nombre_cursor INTO lista_variables;
WHILE nombre_cursor%FOUND
LOOP
  /* Procesamiento de los registros recuperados */
  FETCH nombre_cursor INTO lista_variables;
END LOOP;
CLOSE nombre_cursor;

FOR variable IN nombre_cursor LOOP
  /* Procesamiento de los registros recuperados */
END LOOP;
```

# 4. Cerrar el cursor

Una vez que se han recuperado todas las filas del cursor, hay que cerrarlo para que se liberen de la memoria del servidor los objetos temporales creados. Si no cerrásemos el cursor, la tabla
temporal quedaría en el servidor almacenada con el nombre dado al cursor y la siguiente vez ejecutásemos ese bloque de código, nos daría la excepción `CURSOR_ALREADY_OPEN` (cursor ya abierto) cuando intentásemos abrir el cursor. Para cerrar el cursor se utiliza la siguiente sintaxis:

```sql
CLOSE numbre_cursor;
```

Cuando trabajamos con cursores debemos considerar:

- Cuando un cursor está cerrado, no se puede leer.
- Cuando leemos un cursor debemos comprobar el resultado de la lectura utilizando los atributos de los cursores.
- Cuando se cierra el cursor, es ilegal tratar de usarlo.
- El nombre del cursor es un identificador, no una variable. Se utiliza para identificar la consulta, por eso no se puede utilizar en expresiones.

# Atributos en cursores implícitos

Los cursores implícitos no se pueden manipular por el usuario, pero Oracle sí permite el uso de sus atributos. Las sentencia a través de las que podemos obtener información de estos atributos son: `SELECT ... INTO, [INSERT, UPDATE, DELETE`][3].

En este caso, se debe anteponer al nombre del atributo el prefijo SQL, en lugar del nombre del cursor.

* **SQL%NOTFOUND** devuelve `TRUE` cuando la última sentencia `SELECT` no recuperó ninguna fila, o cuando `INSERT`, `DELETE` o `UPDATE` no afectan a ninguna fila
* **SQL%FOUND** devuelve `TRUE` cuando la última sentencia `SELECT` devuelve alguna fila, o cuando `INSERT`, `DELETE` o `UPDATE` afectan a alguna fila
* **SQL%ROWCOUNT** devuelve el número de filas afectadas por `INSERT`, `DELETE` o `UPDATE` o las filas devueltas por una sentencia `SELECT`
* **SQL%ISOPEN** siempre devuelve `FALSE`, porque Oracle cierra automáticamente el cursor implícito cuando termina la ejecución de la sentencia `SELECT`

Ejemplos:

```sql
DECLARE
  CURSOR cpaises IS
  SELECT CO_PAIS, DESCRIPCION, CONTINENTE FROM PAISES;
  co_pais VARCHAR2(3);
  descripcion VARCHAR2(50);
  continente VARCHAR2(25);
BEGIN
  OPEN cpaises;
  FETCH cpaises INTO co_pais,descripcion,continente;
  DBMS_OUTPUT.PUT_LINE(continente);
  CLOSE cpaises;
END;
```

```sql
DECLARE
  CURSOR cpaises IS
  SELECT CO_PAIS, DESCRIPCION, CONTINENTE FROM PAISES;
  registro cpaises%ROWTYPE;
BEGIN
  OPEN cpaises;
  FETCH cpaises INTO registro;
  DBMS_OUTPUT.PUT_LINE(continente);
  CLOSE cpaises;
END;
```

```sql
DECLARE
  r ARTICULOS%ROWTYPE;
BEGIN
  FOR r IN ( SELECT * FROM ARTICULOS ) LOOP
    DBMS_OUTPUT.PUT_LINE(r.cArtDsc);
  END LOOP;
END;
```

```sql
BEGIN
  UPDATE ARTICULOS SET cArtDsc = `Pantalla LCD’ WHERE cCodArt = ‘LCD’;
  IF SQL%NOTFOUND THEN -- Otra opción : SQL%ROWCOUNT = 0
    INSERT INTO ARTICULOS (cCodArt,cDesArt)
    VALUES (‘LCD’,’Pantalla LCD’);
  END IF;
END;
```

# Cursores Parametrizados

Los cursores son aquellos que permiten utilizar la orden OPEN para pasarle al cursor el valor de uno o varios de sus parámetros.

```sql
DECLARE
  CURSOR cArt (cFml Articulos.cArtFml%TYPE)
    IS SELECT cArtCdg,cArtDsc FROM Articulos WHERE cArtFml = cFml;
  xCod Articulos.cArtCdg%TYPE;
  xDes Articulos.cArtDsc%TYPE;
BEGIN
  OPEN cArt('F1');
  LOOP
    FETCH cArt INTO xCod,xDes;
    EXIT WHEN cArt%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE (xDes);
  END LOOP;
  CLOSE cArt;
END;
```

# Cursores de actualización

Los cursores de actualización se declaran igual que los cursores explícitos, añadiendo `FOR UPDATE` al final de la sentencia `SELECT`.

```sql
CURSOR nombre_cursor IS instrucción_SELECT FOR UPDATE
```

Para actualizar los datos del cursor hay que ejecutar una sentencia `UPDATE` especificando la cláusula `WHERE CURRENT OF <cursor_name>`.

```sql
UPDATE <nombre_tabla> SET <campo_1> = <valor_1>[,<campo_2> = <valor_2>]
WHERE CURRENT OF <cursor_name>
```

Cuando trabajamos con cursores de actualización debemos tener en cuenta que la sentencia `UPDATE` genera bloqueos en la base de datos ( [transacciones][4], disparadores,etc).

```sql
DECLARE
  CURSOR cpaises IS
   select CO_PAIS, DESCRIPCION, CONTINENTE from paises
  FOR UPDATE;
  co_pais VARCHAR2(3);
  descripcion VARCHAR2(50);
  continente VARCHAR2(25);
BEGIN
  OPEN cpaises;
  FETCH cpaises INTO co_pais,descripcion,continente;
  WHILE cpaises%found
    LOOP
      UPDATE PAISES SET CONTINENTE = CONTINENTE || '.'
      WHERE CURRENT OF cpaises;
      FETCH cpaises INTO co_pais,descripcion,continente;
    END LOOP;
  CLOSE cpaises;
  COMMIT;
END;
```

# Siguiente tema: [PL/SQL - Procedimientos y Funciones][5]

 [1]: https://elbauldelprogramador.com/plsql-excepciones/
 [2]: https://elbauldelprogramador.com/plsql-declaracion-de-variables/
 [3]: https://elbauldelprogramador.com/lenguaje-manipulacion-de-datos-dml/
 [4]: https://elbauldelprogramador.com/introduccion-plsql-transacciones/
 [5]: https://elbauldelprogramador.com/plsql-procedimientos-y-funciones/
