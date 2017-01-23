---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-09-25'
description: Un array sirve para guardar un conjunto de entidades pertenecientes a
  la misma clase. Para reservar espacio en memoria para un array, y para liberar la
  memoria, se ha de llamar a las funciones operator new[]() y operator delete[](),
  respectivamente
lastmod: 2016-09-04
layout: post.amp
mainclass: dev
permalink: /clases-y-objetos-arrays/
title: Clases y Objetos. Arrays
---

## Introducción

Un array sirve para guardar un conjunto de entidades pertenecientes a la misma clase. Para reservar espacio en memoria para un array, y para liberar la memoria, se ha de llamar a las funciones `operator new[]()` y `operator delete[]()`, respectivamente. En este caso, **new** no acepta inicializadores. Por ejemplo, en la siguiente porción de código se reserva espacio en memoria para un array de 3 enteros. Se inicializan, se usan, y por último, se libera dicho espacio en memoria reservado cuando ya no se precisa más el array.

<!--more--><!--ad-->

```cpp
//se reserva espacio en memoria para un array de 3 elementos
int* ip=new int[3];
//se inicializan los elementos del array
ip[0]=1;
ip[1]=2;
ip[3]=3;
//... se usa el array
//se libera la porción de memoria reservada
delete[] ip;
```

Lo mismo podremos hacer para un array de caracteres, que puede guardar hasta un máximo de 20.

```cpp
char* cp= new char[20];
strcpy(cp, “esto es una cadena”);
//... se usa el array
delete[] cp;
```

## Array de objetos

Primero reservamos espacio para un array de tres objetos de la clase Punto.  Luego inicializamos dichos objetos, llamando al constructor. Hacemos uso de los objetos, y por último, liberamos el espacio de memoria reservada.

```cpp
//reserva espacio para tres elementos
Punto* objs= new Punto[3];
//inicializa los elementos del array
objs[0]=Punto();
objs[1]=Punto(‘+’,40,5);
objs[2]=Punto(60,10);
//desde cada elemento se llama a las funciones miembro
objs[1].mostrar();
//destructor del array
delete[] objs;
//llama tres veces al destructor
```

## Array de punteros a objetos

Primero reservamos espacio para un array de tres punteros a objetos de la clase Punto. Luego asignamos las direcciones de los objetos creados a los elementos del array, hacernos uso de los punteros a objetos, y por último, liberamos el espacio de memoria reservada, destruyendo cada elemento del array, y el array mismo.

```cpp
//reserva espacio para tres elementos
Punto** pObjs=new Punto*[3];
//inicializa los elementos del array
pObjs[0l=new Punto(10, 20);
pObjs[l]=new Punto('+', 40, 5);
pObjs[2]=new Punto(‘@’, 60, 10);
//desde cada elemento se llama a las funciones miembro
//pObjs[1] mostrar();
//destrucción del array
for (int i=0; i<3; i++)
   delete pObjs[i];
delete[] pObjs;
```

## Moverse por el array

Punteros y arrays están íntimamente relacionados por las reglas de la aritmética de punteros. El compilador interpreta el nombre de array corno un puntero a su primer elemento. Es decir, si objs es el nombre del array, `objs` es equivalente a `&objs[0]`. Por las reglas de la aritmética de punteros, si se añade un entero `i` al nombre de un array, el resultado es un puntero al elemento `i` del array: esto es, `objs+i` es equivalente a `&objs[i]`. Esta equivalencia la podemos expresar mediante la regla:

```cpp
*(objs+i) //es equivalente a objs[i]
```

Podemos usar los operadores unarios `++` y `--` para acceder a elementos consecutivos del array objs del siguiente modo:

```cpp
//objs es objs[0]
objs++;          //avanza a objs[1]
objs++;          //avanza a objs[2]
objs--;          //retrocede a objs[1]
```

## [Clases y Objetos. Pasar un objeto a una función][1]

 [1]: https://elbauldelprogramador.com/clases-y-objetos-pasar-un-objeto-una/