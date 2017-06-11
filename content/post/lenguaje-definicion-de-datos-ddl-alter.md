---
author: alex
categories:
- basededatos
date: '2016-01-01'
lastmod: 2017-06-11T17:44:12+01:00
mainclass: BaseDeDatos
url: /lenguaje-definicion-de-datos-ddl-alter/
tags:
- concepto de ddl
- que es un ddl
- sentencias dml y ddl
title: "Lenguaje Definición de Datos (DDL) - ALTER TABLE"
---

# Modificar la estrutura de una tabla

Para modificar la estructura de una tabla se utiliza el comando ALTER TABLE.

```sql
ALTER TABLE Tabla
 {[ADD       ( Columna Tipodato [restricción de columna][…])]
 [MODIFY ( Columna Tipodato[restricción de columna]][…])]
 [ADD CONSTRAINTS restricción]
 [DROP CONSTRAINTS restricción]};
```

<!--more--><!--ad-->

Añadir o modificar columnas ( nombre, tipo, valor por defecto, restricción NOT NULL)

```sql
alter table nombre_table {ADD | MODIFY} ( columna tipo [restricción,..])
```

Eliminación de columnas

```sql
alter table nombre_table DROP COLUMN nombre_columna
```

Añadir restricción de tabla

```sql
alter table nombre_tabla ADD CONSTRAINT nombre_restricción restricción
```

Eliminar una restricción.

```sql
alter table nombre_table DROP CONSTRAINT nombre_restricción
```

Activación y desactivación de una restricción.

```sql
alter table nombre_table [ENABLE VALIDATE|ENABLE NOVALIDATE|DISABLE] nombre_restricción
```

Donde:

- `ENABLE VALIDATE` activa la restricción si el conjunto de filas ya presentes en la tabla cumple dicha restricción.
- `ENABLE NOVALIDATE` activa la restricción para las siguientes instrucciones de manipulación de datos.
- `DISABLE` desactiva la restricción.

Hay que tener en cuenta que si la tabla está vacía, al añadir una columna con la restricción NOT NULL no habrá ningún error, pero si tiene filas no permitirá añadir una columna con esta opción.

Ejemplos:

```sql
alter table CabFacturas ADD dFecPago DATE;
```

```sql
alter table CabFacturas MODIFY dFecPago DEFAULT SYSDATE;
```

```sql
alter table CabFacturas DROP COLUMN dFecAux;
```

```sql
alter table CabFacturas ADD CONSTRAINT CK_CabFacturas CHECK ( dFecPago >= dFecFac);
```

```sql
alter table LinFacturas ADD CONSTRAINT CK1_LinFact CHECK ( Precio > 0);
```

```sql
alter table LinFacturas DROP CONSTRAINT CK1_LinFact;
```

```sql
alter table CabFacturas DISABLE CK_CabFacturas;
```

```sql
alter table nombre_table DROP COLUMN nombre_columna;
```

# Siguiente Tema: [Lenguaje Definición de Datos (DDL) - Vistas][1]

 [1]: https://elbauldelprogramador.com/lenguaje-definicion-de-datos-ddl-vistas/
