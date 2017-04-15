---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-16

mainclass: BaseDeDatos
url: /lenguaje-definicion-de-datosddl-create/
tags:
- alter table posibles valores
- clausulas del ddl
- concepto de ddl
- que es un ddl
- sentencia create
- sentencias dml y ddl
- unique para varias columnas
title: "Lenguaje Definición de Datos(DDL) - CREATE"
---

En esta entrada vamos a ver la orden CREATE

CREATE sirve para crear objetos de la base de datos, entre estos objetos tenemos tablas, vistas etc.

### Creación de una tabla

```sql
CREATE TABLE nombre tabla
(nombrecol1 tipocol1
  [CONSTRAINT nombre_restricción]
  [not NULL]
  [PRIMARY KEY]
  [UNIQUE]
  [DEFAULT valor]
  [check <condici>]
  [REFERENCES Nombre_tabla_ref (colref)[ON DELETE CASCADE]],...

  [Restricciones de la tabla]
)
[tablespace nombre-tablespace];
```

<!--more--><!--ad-->

Donde:

* **Nombre tabla:** Es el nombre de la nueva tabla. Debe ser único dentro de la BD y además debe identificar su contenido, el nombre de la tabla puede ser una cadena de 1 a 30 caracteres alfanuméricos (0-9, a-z, subrayado, $, #) empezando siempre por un carácter alfabético.
* **nombreCol:** Es el nombre de una columna de la tabla. Los nombres de columna deben cumplir las reglas de los identificadores y deben ser únicos en la tabla.
* **tipoCol:** Especifica el tipo de datos de la columna. Se permiten los tipos de datos del sistema o definidos por el usuarioEspecifica el tipo de datos de la columna. Se permiten los tipos de datos del sistema o definidos por el usuario.

Cuando almacenamos datos las tablas se ajustan a una serie de restricciones predefinidas, por ejemplo que una columna no pueda tomar valores negativos o que una columna tenga que almacenarse en mayúsculas.

La integridad hace referencia al hecho de que los datos de la BD han de ajustarse a restricciones antes de almacenarse en la BD y una restricción de integridad será una regla que restringe el rango de valores de una o más columnas de una tabla.

Existe otro tipo de integridad que es la integridad referencial, que garantiza que los valores de una o varias columnas de una tabla dependan de los valores de otro o otras columnas de otra tabla.

Las restricciones se definen dentro de la orden CREATE TABLE y pare ello se utiliza la cláusula CONSTRAINT. Una vez creadas las restricciones se pueden añadir, modificar o borrar a través de la orden ALTER TABLE.

Una cláusula CONSTRAINT puede restringir una sola columna, se habla en este caso de restricción de columna o puede restringir un grupo de columnas de una tabla, en este caso se llama restricción de tabla.

* **CONSTRAINT.** Es una palabra clave opcional que indica el principio de la definición de una restricción para la columna o tabla : PRIMARY KEY, NOT NULL, UNIQUE, FOREIGN KEY o CHECK. Las restricciones son propiedades especiales que exigen la integridad de los datos y pueden crear índices para la tabla y sus columnas.
* **nombre_restricción.** Los nombres de restricción deben ser únicos en una base de datos.
* **NULL \| NOT NULL.** Son palabras clave que determinan si se permiten o no valores NULL en la columna. Si la restricción es NOT NULL significa que dicha columna no puede tener valores nulos, es decir, ha de tener un valor obligatoriamente; en caso contrario causa una excepción.
* **PRIMARY KEY.** Es una restricción que indica qué columna o columnas formarán la clave primaria de la tabla. Sólo se puede crear una restricción PRIMARY KEY por cada tabla.
* **UNIQUE.** Es una restricción que proporciona la integridad de entidad para la columna o columnas indicada a través de un índice único. Una tabla puede tener varias restricciones UNIQUE.
* **DEFAULT.** Especifica el valor suministrado para la columna cuando no se ha especificado explícitamente un valor durante la inserción.
* **REFERENCES.** Es una restricción que proporciona integridad referencial para los datos de una columna o columnas. Las restricciones REFERENCES requieren que cada valor de la columna o columnas existan en la columna o columnas de referencia correspondiente de la tabla a la que se hace referencia. Las restricciones REFERENCES pueden hacer referencia sólo a columnas que sean restricciones PRIMARY KEY en la tabla de referencia.
* **Nombre_tabla_ref.** Es el nombre de la tabla a la que hace referencia la restricción REFERENCES.
* **(colref [,&#8230;n]).** Es una columna o lista de columnas de la tabla a la que hace referencia la restricción REFERENCES.
* **ON DELETE CASCADE.** Especifica qué acción tiene lugar en una fila de la tabla creada, si esa fila tiene una relación referencial y la fila a la que hace referencia se elimina en la tabla primaria. En nuestro caso si se elimina una fila de la tabla primaria, también se elimina las filas de la tabla desde donde se hace referencia.
    Cuando la restricción de Integridad Referencial se realiza sobre la definición de un campo en la sentencia CREATE TABLE solo se utiliza la clausula REFERENCES, no se utiliza la clausula FOREIGN KEY; esta última se utiliza cuando la restricción se crea a nivel de tabla.
* **CHECK.** Es una restricción que exige la integridad del dominio al limitar los valores posibles que se pueden escribir en una o varias columnas.

####  Notas

- En Oracle no se pueden crear campos calculados ni de autoincremento de forma directa sobre una tabla.
- Los datos tipo autoincremento se realizan mediante la utilización de secuencias.
- Los datos o campos calculados se realizan mediante la utilización de tablas auxiliares. Esta tabla auxiliar tiene la misma clave primaria que la tabla que “deberia” tener los campos calculados y, además, los campos que guardan los datos calculados. Sobre la tabla origen se definen los triggers necesarios para que actualicen los datos de la tabla auxiliar.
- Los usuarios pueden consultar sus propias tablas mediante la vista `USER_TABLES`, y sus restricciones en la vista `USER_CONSTRAINTS`.
- La sentencia CREATE TABLE también nos permite crear una tabla a partir de una consulta a otra u otras tablas que ya existen. La nueva tabla obtendrá los datos obtenidos de la consulta.

```sql
CREATE TABLE nombre tabla
(nombrecol1 tipocol1
  [CONSTRAINT nombre_restricción]
  [not NULL] [PRIMARY KEY][UNIQUE][DEFAULT valor][check <condici>]
  [REFERENCES Nombre_tabla_ref (colref)[ON DELETE CASCADE]],...
  [Restricciones de la tabla]
)
[tablespace nombre-tablespace]

AS Consulta_SQL;
```

#### Ejemplo 1: Restricciones sobre columnas

```sql
CREATE TABLE Emp1
   (empno     NUMBER        CONSTRAINT pk_emp1 PRIMARY KEY,
    ename     VARCHAR2(10)  CONSTRAINT nn_ename1 NOT NULL
                            CONSTRAINT upper_ename1 CHECK (ename = UPPER(ename)),
    job       VARCHAR2(9),
    mgr       NUMBER        CONSTRAINT fk_mgr1  REFERENCES scott.emp(empno),
    hiredate  DATE          DEFAULT SYSDATE,
    sal       NUMBER(10,2)  CONSTRAINT ck_sal1 CHECK (sal > 500),
    comm      NUMBER(9,0)   DEFAULT NULL,
    deptno    NUMBER(2)     CONSTRAINT nn_deptno1 NOT NULL
                            CONSTRAINT fk_deptno1 REFERENCES scott.dept(deptno) ) ;
```

#### Ejemplo 2: Restricciones sobre la tabla


```sql
CREATE TABLE docindex
  ( token CHAR(20),
    doc_oid INTEGER,
    token_frequency SMALLINT,
    token_occurrence_data VARCHAR(512),
    CONSTRAINT pk_docindex PRIMARY KEY (token, doc_oid) );
CREATE TABLE emp
  (empno     NUMBER(4),
   ename     VARCHAR2(10),
   job       VARCHAR2(9),
   deptno    VARCHAR2(9),
   CONSTRAINT fk_deptno FOREIGN KEY (deptno,job) REFERENCES  dept(deptno,job));
```

### Descripción de la estructura de una tabla

```sql
DESCRIBE nombre_tabla;
```

### Siguiente Tema: [Data Definition Language(DDL) - DROP.][1]


 [1]: https://elbauldelprogramador.com/lenguaje-definicion-de-datosddl-drop/
