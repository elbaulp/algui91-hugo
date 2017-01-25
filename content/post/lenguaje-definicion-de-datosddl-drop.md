---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-16

mainclass: BaseDeDatos
url: /lenguaje-definicion-de-datosddl-drop/
tags:
- clausulas del ddl
- concepto de ddl
- que es un ddl
- sentencias dml y ddl
title: "Lenguaje Definici\xF3n de Datos (DDL) - DROP"
---

En el anterior post vimos la orden [CREATE.][1]

En este post explicaré el funcionamiento de la orden DROP.



## Borrado de una tabla (estructura y datos)

```sql
Drop table nombre_tabla [CASCADE CONSTRAINT];
```

Al borrar una tabla, se borra tanto su estructura como sus datos, sus índices asociados y los privilegios concedidos sobre estas también se borran, las vistas creadas directa o indirectamente sobre esta tabla son desactivadas de forma automática por ORACLE pero no borradas.

<!--more--><!--ad-->

Cada usuario puede borrar sus propias tablas, pero no puede borrar las de otro usuario al menos que tenga concedido un permiso adecuado.
Si se hace referencia a la clave primaria de esta tabla mediante restricciones FOREIGN KEY o REFERENCES, la clausula CASCADE CONSTRAINT permite suprimir estas restricciones de integridad referencial en las tablas ‘descendientes’.

## Borrado de los registros de una tabla

Con la orden TRUNCATE se eliminan todas las filas de una tabla y se puede liberar espacio utilizado por esta tabla. Es una orden del lenguaje DDL y por tanto no se puede anular. Tampoco activa disparadores DELETE por lo que es más rápido que una orden DELETE. Su sintaxis es:

```sql
Truncate table nombre_table [{DROP | REUSE} STORAGE];
```

Con DROP STORAGE se desasigna todo el espacio.
Con DROP REUSE mantendrá reservado el espacio para nuevas filas.

## Siguiente Tema: [Lenguaje Definición de Datos (DDL) - ALTER TABLE][2]

 [1]: https://elbauldelprogramador.com/lenguaje-definicion-de-datosddl-create/
 [2]: https://elbauldelprogramador.com/lenguaje-definicion-de-datos-ddl-alter/
