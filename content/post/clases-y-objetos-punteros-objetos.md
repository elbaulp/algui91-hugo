---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-01-01'
description: "Los operadores new y delete ofrecen la posibilidad de reservar y liberar
  de forma din\xE1mica la porci\xF3n de memoria que ocupa un objeto, de un modo similar
  a la de las funciones malloc y free."
lastmod: 2016-09-04

mainclass: dev
url: /clases-y-objetos-punteros-objetos/
title: Clases y Objetos. Punteros a objetos
---

Los operadores **new y delete** ofrecen la posibilidad de reservar y liberar de forma dinámica la porción de memoria que ocupa un objeto, de un modo similar a la de las funciones **malloc y free**. La ventaja principal estriba en que **new y delete** forman parte del lenguaje C++, no son funciones de una librería. Hay dos tipos de operadores new y delete, según traten o no con arrays. En el segundo caso, **operator new**( admite opcionalmente una inicialización. La sentencia:

<!--more--><!--ad-->

```cpp
int* int_ptr= new int(3);
```

reserva memoria para un entero, y lo inicializa con el número 3. El operador new devuelve la dirección del bloque de la memoria donde está guardado el valor de la variable. Para conocer el valor de la variable a la que apunta int_ptr, basta escribir:

```cpp
cout << *int_Ptr;
```

Algo que podemos expresar mediante la siguiente regla general:

```cpp
contenido = *direccion;
```

Para liberar la memoria anteriormente reservada se llama a **operator delete()**.

```cpp
delete int_ptr;
```

Los pasos para declarar y usar punteros a objetos son idénticos a los empleados con otras variables:

- Se declara un puntero a un objeto de la clase Punto

```cpp
Punto* ptro_pt;
```

- Se reserva espacio en memoria mediante el operador new, el cual devuelve la dirección del comienzo del bloque que ocupa dicho objeto en memoria, y luego se llama a un constructor, inicializando los miembros dato.

```cpp
ptro_pt=new Punto('*', 20, 10); //primer constructor
ptro_pt=new Punto(20, 10);      //segundo constructor
ptro_pt=new Punto();            //constructor por defecto
```

- Para acceder a los miembros públicos de la clase se utiliza la flecha(-». Por
ejemplo, para llamar a la función mostrar, basta escribir:

```cpp
ptro_pt->mostrar ();
```

- En general, para acceder a un miembro público (dato o función) de una clase desde un puntero a un objeto se escribirá:

```cpp
puntero_a_objeto->miembro_público;
```

- Podemos liberar la porción de la memoria reservada mediante el operador delete, en cualquier momento en el que no necesitemos ya más del objeto reverenciado por ptro_pt, sin esperar a que se alcance el final del bloque de su ámbito de definición.

```cpp
delete ptro_pt;   //llama al destructor
```

## Siguiente tema: [Clases y Objetos - Arrays][1]

 [1]: https://elbauldelprogramador.com/clases-y-objetos-arrays/
