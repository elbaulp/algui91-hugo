---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-08-24

mainclass: BaseDeDatos
url: /fundamentos-de-plsql/
title: Fundamentos de PL/SQL
---

SQL es un lenguaje de consulta para los sistemas de bases de datos relaciónales, pero que no posee la potencia de los lenguajes de programación.

PL/SQL (Procedural Language/Structured Query Language) apareció por primera vez en la versión 6 de Oracle (1988) y amplia SQL con los elementos característicos de los lenguajes de programación: variables, sentencias de control de flujo, bucles&#8230;

Cuando se desea realizar una aplicación completa para el manejo de una base de datos relacional, resulta necesario utilizar alguna herramienta que soporte la capacidad de consulta del SQL y la versatilidad de los lenguajes de programación tradicionales. PL/SQL es el lenguaje de programación que proporciona Oracle para extender el SQL estándar con otro tipo de instrucciones.

<!--more--><!--ad-->


Para poder trabajar necesitaremos tener los siguientes elementos:

  * Una instancia de `ORACLE` o superior funcionando correctamente.
  * Herramientas cliente de `ORACLE`, (WorkSheet o SQL*Plus) para poder ejecutar los ejemplos.
  * Haber configurado correctamente una conexión a `ORACLE`.

Con PL/SQL vamos a poder programar las unidades de programa de la base de datos `ORACLE`, estas son:

  * [Procedimientos almacenados][1]
  * [Funciones][1]
  * [Trigger][2]
  * Scripts

Pero además PL/SQL nos permite realizar programas sobre las siguientes herramientas de `ORACLE`:

  * Oracle Forms
  * Oracle Reports
  * Oracle Graphics
  * Oracle Aplication Server

Para programar en PL/SQL es necesario conocer sus fundamentos.  Como introducción vamos a ver algunos elementos y conceptos básicos del lenguaje.

* PL/SQL no es `CASE`-`SENSITIVE`, es decir, no diferencia mayúsculas de minúsculas como otros lenguajes de programación como C o Java. Sin embargo debemos recordar que `ORACLE` es `CASE`-`SENSITIVE` en la búsqueda de texto.
* Una línea en PL/SQL contiene grupos de caracteres conocidos como `UNIDADES LEXICAS`, que pueden ser clasificadas como:
  * `DELIMITADOR`: Es un símbolo simple o compuesto que tiene una función especial&nbsp;en PL/SQL. Estos pueden ser:
    * Operadores Aritméticos
    * Operadores Lógicos
    * Operadores Relaciónales
  * `DENTIFICADOR`: Se emplean para dar nombre a los objetos PL/SQL, tales como&nbsp;variables, cursores, tipos y subprogramas.  Los identificadores constan de una letra, seguida por una secuencia opcional&nbsp;de caracteres, que pueden incluir letras, números, signos de dólar ($), caracteres de&nbsp;subrayado y símbolos de almohadilla (#). Los demás caracteres no pueden&nbsp;emplearse. La longitud máxima de un identificador es de 30 caracteres y todos los&nbsp;caracteres son significativos.
  * `LITERAL`: Es un valor de tipo numérico, carácter, cadena o lógico no representado&nbsp;por un identificador (es un valor explícito).
  * `COMENTARIO`: Es una aclaración que el programador incluye en el código. Son&nbsp;soportados 2 estilos de comentarios, el de línea simple y de multilínea, para lo cual&nbsp;son empleados ciertos caracters especiales como son:

```sql
-- Linea simple
/*
Conjunto de Líneas
*/
```

* Cuando se escribe código en PL/SQL, este puede estar agrupado en unidades denominadas&nbsp;“conjunto de instrucciones”. Un conjunto de instrucciones puede contener otros subconjuntos y&nbsp;así sucesivamente.  Un conjunto de instrucciones queda delimitado por las palabras reservadas `BEGIN` y END.

```sql
BEGIN
  Sentencias . . .
  Sentencias . . .
  BEGIN
    Sentencias . . .
    Sentencias . . .
    Sentencias . . .
  END;
  Sentencias . . .
  Sentencias . . .
END;
```

#### Siguiente Tema: [Bloques PL/SQL][3]

 [1]: https://elbauldelprogramador.com/plsql-procedimientos-y-funciones/
 [2]: https://elbauldelprogramador.com/plsql-disparadores-o-triggers/
 [3]: https://elbauldelprogramador.com/bloques-plsql/
