---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-01-01'
lastmod: 2016-09-02

mainclass: BaseDeDatos
url: /plsql-paquetes-packages/
tags:
- crear paquetes en oracle
- usuarios package en pl/sql
title: PL/SQL. Paquetes (Packages)
---

Además de brindarnos múltiples elementos que nos permiten desarrollar una aplicación robusta, Oracle nos ofrece la posibilidad de programar en forma modular, clara y eficiente. En este apartado veremos cómo embeber [procedimientos, funciones][1], definiciones de tipos de datos y [declaraciones de variables][2] en una misma estructura que los agrupe y relacione lógicamente. Esta estructura se denomina Package (Paquete) y su uso nos permite no sólo mejorar la calidad de diseño de nuestras aplicaciones sino también optimizar el desempeño de las mismas.



## Definición

Un Paquete es un objeto PL/Sql que agrupa lógicamente otros objetos PL/Sql relacionados entre sí, encapsulándolos y convirtiéndolos en una unidad dentro de la base de datos.

<!--more--><!--ad-->

Los Paquetes están divididos en 2 partes: especificación (obligatoria) y cuerpo (no obligatoria). La especificación o encabezado es la interfaz entre el Paquete y las aplicaciones que lo utilizan y es allí donde se declaran los tipos, variables, constantes, [excepciones][3], [cursores][4], procedimientos y funciones que podrán ser invocados desde fuera del paquete.

En el cuerpo del paquete se implementa la especificación del mismo. El cuerpo contiene los detalles de implementación y declaraciones privadas, manteniéndose todo esto oculto a las aplicaciones externas, siguiendo el conocido concepto de “caja negra”. Sólo las declaraciones hechas en la especificación del paquete son visibles y accesibles desde fuera del paquete (por otras aplicaciones o procedimientos almacenados) quedando los detalles de implementación del cuerpo del paquete totalmente ocultos e inaccesibles para el exterior.

Para acceder a los elementos declarados en un paquete basta con anteceder el nombre del objeto referenciado con el nombre del paquete donde está declarado y un punto, de esta manera: **Paquete.Objeto** donde Objeto puede ser un tipo, una variable, un cursor, un procedimiento o una función declarados dentro del paquete.

Para referenciar objetos desde adentro del mismo paquete donde han sido declarados no es necesario especificar el nombre del paquete y pueden (deberían) ser referenciados directamente por su nombre. Finalmente y siguiendo a la parte declarativa del cuerpo de un paquete puede, opcionalmente, incluirse la sección de inicialización del paquete. En esta sección pueden, por ejemplo, inicializarse variables que utiliza el paquete. La sección de inicialización se ejecuta sólo la primera vez que una aplicación referencia a un paquete, esto es, se ejecuta sólo una vez por sesión.

Como hemos dicho anteriormente, la creación de un paquete pasa por dos fases:

- Crear la cabecera del paquete donde se definen que procedimientos, funciones, variables, cursores, etc. Disponibles para su uso posterior fuera del paquete. En esta parte solo se declaran los objetos, no se implementa el código.
- Crear el cuerpo del paquete, donde se definen los bloques de código de las funciones y procedimientos definidos en la cabecera del paquete.

Para crear la cabecera del paquete utilizaremos la siguiente instrucción:

```sql
CREATE {OR REPLACE} PACKAGE nombre_de_paquete IS
-- Declaraciones
END;
```

Para crear el cuerpo del paquete utilizaremos la siguiente instrucción:

```sql
CREATE {OR REPLACE} PACKAGE BODY nombre_paquete IS
--Bloques de código
END;
```

Hay que tener en cuenta que toda declaración de función o procedimiento debe estar dentro del cuerpo del paquete, y que todo bloque de código contenido dentro del cuerpo debe estar declarado dentro de la cabecera de paquete.

Cuando se quiera acceder a las funciones, procedimientos y variables de un paquete se debe anteponer el nombre de este:

```sql
Nombre_paquete.función(x);
Nombre_paquete.procedimiento(x);
Nombre_paquete.variable;
```

```sql
CREATE OR REPLACE PACKAGE PK1 IS
  PROCEDURE xLis (xfamilia IN Articulos.cArtFml%TYPE);
END;

CREATE OR REPLACE PACKAGE BODY PK1 IS
  procedure xLis (xfamilia Articulos.cArtCdg%TYPE)
  IS
    xfam Articulos.cArtFml%type;
    xCod Articulos.cArtCdg%TYPE;
    xDes Articulos.cArtDsc%TYPE;

    CURSOR cArticulos IS SELECT cArtCdg,cArtDsc FROM Articulos
        WHERE cArtFml = xfam;
  BEGIN
    xfam := xfamilia;
    OPEN cArticulos;
    LOOP
      FETCH cArticulos INTO xCod,xDes;
      EXIT WHEN cArticulos%NOTFOUND;
      DBMS_OUTPUT.PUT_LINE (xDes);
    END LOOP;
    CLOSE cArticulos;
  END;
END;
```

## Ventajas del uso de Paquetes

Dentro de las ventajas que ofrece el uso de paquetes podemos citar que:

### Permite modularizar el diseño de nuestra aplicación

El uso de Paquetes permite encapsular elementos relacionados entre sí (tipos, variables, procedimientos, funciones) en un único módulo PL/Sql que llevará un nombre que identifique la funcionalidad del conjunto.

### Otorga flexibilidad al momento de diseñar la aplicación

En el momento de diseñar una aplicación todo lo que necesitaremos inicialmente es la información de interfaz en la especificación del paquete. Puede codificarse y compilarse la especificación sin su cuerpo para posibilitar que otros sub-programas que referencian a estos elementos declarados puedan compilarse sin errores. De esta manera podremos armar un “prototipo” de nuestro sistema antes de codificar el detalle del mismo.

### Permite ocultar los detalles de implementación

Pueden especificarse cuáles tipos, variables y sub-programas dentro del paquete son públicos (visibles y accesibles por otras aplicaciones y sub-programas fuera del paquete) o privados (ocultos e inaccesibles fuera del paquete). Por ejemplo, dentro del paquete pueden existir procedimientos y funciones que serán invocados por otros programas, así como también otras rutinas de uso interno del paquete que no tendrán posibilidad de ser accedidas fuera del mismo. Esto asegura que cualquier cambio en la definición de estas rutinas internas afectará sólo al paquete donde se encuentran, simplificando el mantenimiento y protegiendo la integridad del conjunto.

### Agrega mayor funcionalidad a nuestro desarrollo

Las definiciones públicas de tipos, variables y cursores hechas en la especificación de un paquete persisten a lo largo de una sesión. Por lo tanto pueden ser compartidas por todos los sub-programas y/o paquetes que se ejecutan en ese entorno durante esa sesión. Por ejemplo, puede utilizarse esta técnica (en dónde sólo se define una especificación de paquete y no un cuerpo) para mantener tipos y variables globales a todo el sistema.

### Introduce mejoras al rendimiento

En relación a su ejecución, cuando un procedimiento o función que está definido dentro de un paquete es llamado por primera vez, todo el paquete es ingresado a memoria. Por lo tanto, posteriores llamadas al mismo u otros sub-programas dentro de ese paquete realizarán un acceso a memoria en lugar de a disco. Esto no sucede con procedimientos y funciones estándares.

### Permite la “Sobrecarga de funciones” (Overloading).

PL/SQL nos permite que varios procedimientos o funciones almacenadas, declaradas dentro de un mismo paquete, tengan el mismo nombre. Esto nos es muy útil cuando necesitamos que los sub-programas puedan aceptar parámetros que contengan diferentes tipos de datos en diferentes instancias. En este caso Oracle ejecutará la “versión” de la función o procedimiento cuyo encabezado se corresponda con la lista de parámetros recibidos.

## Siguiente tema: [PL/SQL. Disparadores o Triggers][5]

 [1]: https://elbauldelprogramador.com/plsql-procedimientos-y-funciones/
 [2]: https://elbauldelprogramador.com/plsql-declaracion-de-variables/
 [3]: https://elbauldelprogramador.com/plsql-excepciones/
 [4]: https://elbauldelprogramador.com/plsql-cursores/
 [5]: https://elbauldelprogramador.com/plsql-disparadores-o-triggers/
