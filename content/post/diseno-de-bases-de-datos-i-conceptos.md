---
author: alex
categories:
- basededatos
mainclass: BaseDeDatos
date: '2016-01-01'
lastmod: 2017-10-01T13:24:30+01:00
url: /diseno-de-bases-de-datos-i-conceptos/
title: "Diseño de Bases de Datos ( I ) - Conceptos del Modelo Relacional"
---

> Nota: Basado en los apuntes de clase


# 1. Introducción

Las bases de datos relacionales se basan en el uso de tablas (también se las llama __relaciones__). Las tablas se representan gráficamente como una estructura rectangular formada por filas y columnas.

<!--more--><!--ad-->

Cada fila posee una ocurrencia o ejemplar de la instancia o relación representada por la tabla (a las filas se las llama también __tuplas o registros__).


Cada columna almacena información sobre una propiedad determinada de la tabla (se le llama también __atributo__), nombre, dni, apellidos, edad,&#8230; Cuando no se conoce el valor de un atributo se le asigna el valor __nulo__. Los valores nulos indican contenidos de atributos que no tienen ningún valor. En claves foráneas indican que el registro actual no está relacionado con ninguno. Las bases de datos relacionales admiten utilizar ese valor en todo tipo de operaciones.

<figure>
    <amp-img sizes="(min-width: 800px) 800px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="151" src="https://3.bp.blogspot.com/_IlK2pNFFgGM/TNvmeiTTliI/AAAAAAAAAEc/oeK5KsBvCx4/s800/m.rf1.png" width="800"></amp-img>
</figure>

#  Conceptos del Modelo Relacional

__Relación (Tabla).__ Es el elemento central del modelo relacional. Son los objetos principales sobre los que debe recogerse información y generalmente denotan personas, lugares, cosas o eventos de interés. Una relación tiene un nombre, un conjunto de atributos que representan sus propiedades y está formada por un conjunto de tuplas que incluyen los valores que cada uno de los atributos toma para cada una de las tuplas de la relación. Una relación se representa mediante una tabla bidimensional (las columnas representan los atributos y las filas representan las tuplas o registros).

<table  cellspacing="0">
<caption>TABLA PROVEEDORES</caption> <tr>
<td bgcolor="#666666">
        NIF
      </td>
<td bgcolor="#666666">
        NOMBRE
      </td>
<td bgcolor="#666666">
        LOCALIDAD
      </td>
</tr>
<tr>
<td>
        111111
      </td>
<td>
        Manuel
      </td>
<td>
        Málaga
      </td>
</tr>
<tr>
<td>
        3333333
      </td>
<td>
        Gabriel
      </td>
<td>
        Granada
      </td>
</tr>
<tr>
<td>
        5555555
      </td>
<td>
        Marcos
      </td>
<td>
        Málaga
      </td>
</tr>
<tr>
<td>
        7777777
      </td>
<td>
        Carlos
      </td>
<td>
        Cádiz
      </td>
</tr>
</table>

<table  cellspacing="0">
<caption>TABLA ARTICULOS</caption> <tr>
<td bgcolor="#666666">
        CODIGO
      </td>
<td bgcolor="#666666">
        NIF-PRO
      </td>
<td bgcolor="#666666">
        CONCEPTO
      </td>
</tr>
<tr>
<td>
        11
      </td>
<td>
        555555
      </td>
<td>
        Teclado
      </td>
</tr>
<tr>
<td>
        22
      </td>
<td>
        777777
      </td>
<td>
        Impresora
      </td>
</tr>
<tr>
<td>
        33
      </td>
<td>
        111111
      </td>
<td>
        Monitor
      </td>
</tr>
</table>


- __Tupla o registro.__ Corresponde a una fila de la tabla. Representa cada una de las ocurrencias de la relación (equivale a lo que conocemos como ocurrencia de un registro, en ficheros clásicos). El número de tuplas se denomina __cardinalidad__, la cardinalidad varía con el tiempo.
- __Dominio.__ Es una colección de valores, de los cuales uno o más atributos obtienen sus valores reales. Pueden ser finitos ( dias de la semana, meses del año, letras del alfabeto, etc..) o infinitos (números reales, dias del calendario – siempre que no esten limitados por el sistema operativo o el SGBD-, etc..)
- __Atributo.__ Corresponde a una columna de la tabla (equivale a un campo de un registro) y se definen sobre dominios. El número de atributos se llama grado. El grado no varía con el tiempo, si añadimos un atributo a una relación, podemos considerar que se trata de otra relación nueva.
- __Clave candidata__ es un atributo K (o conjunto de atributos) de una relación R que cumple dos propiedades:
- __Unicidad:__ No existen dos tuplas en R con el mismo valor de K
- __Minimalidad:__ Si K es compuesto, no será posible eliminar ningún componente de K sin destruir la propiedad de unicidad.

Por ejemplo, el atributo compuesto (NIF,LOCALIDAD) no es una clave candidata de la relación PROVEEDORES, ya que podemos eliminar el atributo LOCALIDAD sin destruir la propiedad de unicidad, es decir, siguen sin existir dos tuplas con el mismo valor de NIF.

- __Clave primaria.__ Es posible que una relación posea más de una clave candidata, en ese caso, se escoge una de ellas como __clave primaria__ y el resto se denominan __claves alternativas__. En la práctica la elección de la clave primaria suele ser sencilla. Toda relación, sin excepción, tiene una clave primaria y suele representarse subrayando y/o añadiendo el carácter # al atributo (o conjunto de atributos) correspondiente.

Por ejemplo: `Artículos( código#, concepto)`
- __Clave foránea, ajena o extranjera__ es un atributo (o conjunto de atributos) de una relación R1 que a la vez es clave primaria de otra relación R2. Se utiliza para referenciar a la tupla de R2 cuya clave primaria coincida con el valor de la clave foránea de R1. Ambas claves deben definirse sobre el mismo dominio.

Por ejemplo, el atributo NIF-PROV de la relación PRECIOS es clave foránea ya que se utiliza para referenciar a una tupla de PROVEEDORES mediante la clave primaria NIF.

<figure>
    <amp-img sizes="(min-width: 800px) 800px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="577" src="https://2.bp.blogspot.com/_IlK2pNFFgGM/TOEf64pXGdI/AAAAAAAAAE0/eersZkN7Aj4/s800/m.rf2.png" width="800"></amp-img>
</figure>

# Siguiente tema:[Diseño de Bases de Datos ( II ) - Restricciones][1]

 [1]: https://elbauldelprogramador.com/diseno-de-bases-de-datos-ii/
