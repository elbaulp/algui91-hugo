---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-09-25'
lastmod: 2016-08-19
layout: post.amp
mainclass: BaseDeDatos
permalink: /introduccion-plsql/
title: "Introducci\xF3n a PL/SQL"
---

Ahora que el [temario de SQL][1] está terminado, voy a empezar a escribir sobre [PL/SQL][2]. Empezaré con una introducción.

### Introducción

El trabajo realizado [hasta ahora][3] con la base de datos se ha hecho de forma interactiva: el usuario introducía una orden (en SQL) y Oracle proporcionaba una respuesta. Esta forma de trabajar no resulta operativa en un entorno de producción, porque todos los usuarios no conocen ni utilizan SQL, y además suelen producirse frecuentes errores.

<!--more--><!--ad-->

Para superar estas limitaciones, Oracle incorpora un gestor PL/SQL en el servidor de la BD y en algunas de sus herramientas (Forms, Reports, Graphics, etc.). Este lenguaje incorpora todas las características propias de los lenguajes de tercera generación: manejo de variables, estructura modular (procedimientos y funciones), estructuras de control (bifurcaciones, bucles y demás estructuras), control de excepciones, y una total integración en el entorno Oracle.

Los programas creados con PL/SQL se pueden almacenar en la base de datos como un objeto más de ésta; así se facilita a todos los usuarios autorizados el acceso a estos programas, y en consecuencia, la distribución, instalación y mantenimiento de software. Además, los programas se ejecutan en el servidor, suponiendo un significativo ahorro de recursos en los clientes y de disminución del tráfico de red.

El uso del lenguaje PL/SQL es también imprescindible para construir disparadores de bases de datos, que permiten implementar reglas complejas de negocio y auditoria en la BD.

PL/SQL soporta todos los comandos de consulta y manipulación de datos, aportando sobre SQL las estructuras de control y otros elementos propios de los lenguajes procedimentales de tercera generación. Su unidad de trabajo es el bloque, formado por un conjunto de declaraciones, instrucciones y mecanismos de gestión de errores y excepciones.

### Siguiente Tema: [Introducción a PL/SQL - Transacciones][4]



 [1]: https://elbauldelprogramador.com/consulta-de-datos-tablas-resumen/
 [2]: http://es.wikipedia.org/wiki/PL/SQL
 [3]: https://elbauldelprogramador.com/bases-de-datos/
 [4]: https://elbauldelprogramador.com/introduccion-plsql-transacciones/