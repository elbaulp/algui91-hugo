---
author: alex
categories:
- basededatos
date: '2016-01-01'
lastmod: 2017-03-30T17:17:30+01:00
mainclass: BaseDeDatos
url: /consulta-de-datos-clausula-where/
title: "Consulta de Datos - Cláusula WHERE"
---

La cláusula WHERE se utiliza para seleccionar aquellos registros que cumplen una o más condiciones. Su sintaxis es:

```sql
WHERE <search_condition>
```

Selecciona aquellas filas que cumplen la condición especificada por esta orden. La condición de búsqueda o de selección de registros se puede conformar utilizando columnas de la tabla, constantes, funciones y/o expresiones y operadores.

<!--more--><!--ad-->

Los operadores más utilizados en las condiciones de selección son:

| Operador             	| Definición                                                  	|
|-----------------------|---------------------------------------------------------------|
| =, !=, <>            	| Igual a, distinto de, distinto de                           	|
| >, >=, <, <=         	| Mayor que, Mayor o igual que, menor que, menor o igual que  	|
| BETWEEN … AND …      	| Chequea un rango incluyendo los dos valores                 	|
| LIKE                 	| Compara una cadena de caracteres con un patrón o formato    	|
| IN ( ), NOT IN ( )   	| Comprueba que un campo o expresión tenga valores o no en un 	|
| conjunto de valores  	|                                                             	|
| IS NULL, IS NOT NULL 	| Comprueba que un campo o expresión sea nula o no            	|


# Operador BETWEEN:

Para indicar que deseamos recuperar los registros según el intervalo de valores de un campo emplearemos el operador BETWEEN cuya sintaxis es:

```sql
Columna o Expresión [Not] Between valor1 And valor2
```

en este caso la consulta devolvería los registros que contengan en columna o expresión un valor incluido en el intervalo valor1, valor2 (ambos inclusive). Si anteponemos el operador NOT devolverá aquellos valores no incluidos en el intervalo.

# Operador LIKE:

Este operador se utiliza para realizar comprobaciones de columnas o expresiones con patrones de caracteres. Su sintaxis es:

```sql
expresión_a_comparar [ NOT ] LIKE patrón
```

Los símbolos utilizados en el patrón son:

| %             | Cualquier cadena de cero o más caracteres. | WHERE title LIKE ‘%computer%’ busca todos los títulos de libros que contengan la palabra ‘computer’ en cualquier parte del título. |
|---------------|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| _ (subrayado) | Cualquier carácter individual              | WHERE au_fname LIKE ‘_ean’ busca todos los nombres de cuatro letras que finalicen con ean (Dean, Sean, etc.).                      |

# Operador IN:

Se utiliza para comprobar si un valor pertenece a una lista de valores. Su sintaxis es:


```sql
expresion [ NOT ] IN ( subconsulta | expresion o valor [ ,...n ])
```

La lista de valores se puede obtener a partir de una setencia select o bien indicando el<br /> conjunto de valores separados por comas

# Operador IS NULL:

En SQL el valor nulo tiene un valor diferente a 0 y a cadena vacía. Por tanto, para preguntar<br /> si un atributo contiene, o no, un valor nulo, hay que utilizar el predicado IS [NOT] NULL.

# Siguiente tema

Siguiente Tema: <a href="https://elbauldelprogramador.com/consulta-de-datos-clausula-group-by/">Consulta de Datos. Cláusula GROUP BY</a>
