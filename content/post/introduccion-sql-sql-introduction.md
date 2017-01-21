---
author: alex
categories:
- basededatos
color: '#009688'
lastmod: 2016-08-15
layout: post.amp
mainclass: BaseDeDatos
permalink: /introduccion-sql-sql-introduction/
title: "Introducci\xF3n SQL"
---

Un <acronym title="Relational Data Base Management System">RDBMS</acronym> es un software capaz de producir, manipular y gestionar bases de datos de tipo relacional.

Es un software que se antepone a los datos de una base de datos, es decir, cualquier acceso a los datos pasa por una petición al RDBMS que éste gestiona con el fin de realizar la operación más conveniente sobre esa petición.

<!--more--><!--ad-->



Prácticamente es un Sistema Operativo que controla el acceso a los datos, para conseguirlo, posee una serie de subesquemas que gestionan cada servicio:

  * **Sistema de gestión de la memoria.** Decide que parte de la memoria se dedica a cada tarea del RDBMS. Debe controlar que haya suficiente memoria para que el RDBMS funcione eficazmente y dejar la suficiente para el Sistema Operativo del ordenador.
  * **Gestión de Entrada y Salida.** Garantiza que los accesos a los datos sean adecuados.
  * **Procesador de lenguajes.** Interpreta las instrucciones <acronym title="structured query language">SQL</acronym> (o de otros lenguajes válidos).
  * **Control de procesos.** Gestiona los programas en ejecución necesarios para el funcionamiento de la base de datos.
  * **Control de la red.** Gestiona las conexiones a la base de datos desde la red y evita problemas a la base de datos en caso de desconexión.
  * **Control de transacciones.** Gestiona una serie de operaciones que se pueden anular o llevar a cabo al final.

### Diccionario de Datos

Agrupa los metadatos de una base de datos. En este diccionario aparecen todos los objetos de la base de datos con su nombre, función, control de acceso (seguridad) y correspondencia física en los archivos de datos.

Cada vez que llega al gestor una petición de datos, el RDBMS abre el diccionario de datos para comprobar los metadatos relacionados con la petición y resolver si hay permiso de uso y donde localizar físicamente los datos requeridos.

Normalmente cualquier DBMS funciona como servidor (programa en ejecución esperando peticiones de conexión al sistema). En cada intento de conexión verifica qué usuario intenta conectar y si tiene permiso se produce la conexión.

En la conexión el usuario puede ejecutar peticiones en un lenguaje que el DBMS sea capaz de traducir. Esto centraliza la información ya que usuario y servidor pueden estar en lugares distintos. Hay dos tipos de conexión:

  1. **Conexión Local**

Conexión en la que servidor y usuario están en la misma máquina. Limita el uso de la base de datos a la máquina en la que el servidor esta instalado.

  2. **Cliente / Servidor**

Es lo más común. El servidor lanza un proceso en la máquina central. Este proceso está a la escucha de nuevos usuarios, cuando estos llegan se produce una conexión que permite que el servidor y el cliente se comuniquen. Esto permite una accesibilidad a la base de datos desde distintas máquinas.

### Herramientas de los RDBMS

Para el uso de las bases de datos, los RDBMS proporcionan diversas herramientas, que
además tienen finalidades distintas en función de qué tipo de usuario las utiliza:

  * Herramientas de instalación: Instaladores para facilitar la tarea de realizar la siempre difícil instalación del producto de base de datos.
  * Herramientas de gestión de red: Que permiten que el gestor de base de datos sea correctamente accesible desde la red, así como gestionar el correcto flujo de información sobre la red que integra al RDBMS.
  * Herramientas de conexión en el lado del cliente. Los programas que permiten a los usuarios conectar a la base de datos para lanzar las instrucciones que se deseen.
  * Herramientas de desarrollo. Que facilitan la labor de crear aplicaciones para una base de datos.
  * Herramientas CASE. Para poder realizar diseños completos de aplicaciones de datos.
  * Herramientas de administración. Que permiten una más fácil realización de las tareas administrativas.
  * Herramientas de recuperación en caso de desastre.
  * Herramientas de copia de seguridad.
  * Herramientas de importación de datos.
  * Herramientas de globalización
  * Herramientas de creación de aplicaciones hacia Internet

### SQL(Structure Query Language)

SQL es el lenguaje de consulta universal para bases de datos.

Vamos a tratar los temas relacionados con SQL ANSI 92, que es el estándar SQL, existen variantes como T-SQL (Transact-SQL) para Microsoft SQL-SERVER y PL/SQL (Procedure Language / SQL)

SQL proporciona métodos para definir la base datos, para manipular la información y para gestionar los permisos de acceso a dicha información.

Para que un gestor sea relacional, debe soportar SQL. Las instrucciones SQL se dividen en tres grupos.

DDL (Data Definition Language) que se encarga de la definición de bases de datos, tablas, vistas e índices entre otros.

Son comandos propios de este lenguaje:

```sql
CREATE TABLE
CREATE INDEX
CREATE VIEW
CREATE SYNONYM
```

DML (Data Manipulation Language), Manipulan los datos, con ellos podemos seleccionar, insertar, eliminar y actualizar datos. Con estas instrucciones se construyen las consultas.

```sql
SELECT
UPDATE
INSERT
INSERT INTO
DELETE FROM
```

DCL (Data Control Language) Se encarga del control de accesos y privilegios entre los usuarios.

```sql
CREATE USER
GRANT
REVOKE
```

## Siguiente tema: [Componentes del lenguaje SQL][1]

 [1]: https://elbauldelprogramador.com/componentes-del-lenguaje-sql-sql/
