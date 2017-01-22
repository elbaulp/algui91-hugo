---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-12-12'
lastmod: 2016-09-04
layout: post.amp
mainclass: dev
permalink: /clases-y-objetos-control-del-acceso-los/
title: Clases y Objetos. Control del acceso a los miembros de la clase
---

Veamos la diferencia entre las siguientes declaraciones de la [clase Punto][1]:

<!--more--><!--ad-->

```cpp
class Punto{

public:
  int x;
  int y;
  char ch;

  Punto (char ch1, int x1, int y1);
  void mostrar ();
  void ocultar ();
};
```

```cpp
class Punto{
  int x;
  int y;
  char ch;

public:
  Punto(char chl, int x1, int yl);
  void mostrar();
  void ocultar();
};
```

La diferencia de las declaraciones de las clases está en el acceso a los miembros dato de la clase, **private**, por defecto. Los datos son, por tanto, privados y las funciones son públicas. Cualquier intento de modificar directamente los valores de la abscisa x, la ordenada y, o del carácter ch, dará lugar a un error en tiempo de compilación. Luego, en **main** no podremos escribir las sentencias:

```cpp
pt.x=19;
pt.y=5;
pt.ch=’+’;
```

El hecho de que los datos sean privados no quiere decir que sean invisibles: simplemente quiere decir que no se pueden cambiar desde el exterior. Si es imposible acceder a los datos privados, se pueden añadir a la clase funciones que permitan conocer sus valores. Si nos interesa conocer la abscisa x y la ordenada y del punto, podernos añadir a la clase dos funciones miembro denominadas getx y gety, que retornan los valores de *x* y de *y*.

```cpp
class Punto{
  int y;
  char ch;
public:
  Punto(char chl, int x1, int y1);
  void mostrar ();
  void ocultar ();
  int getx () { return x;}
  int gety () { return y;}
};
```

Este ejemplo ilustra una faceta importante del lenguaje C++ denominada encapsulación. El acceso a los miembros de una clase está controlado. Para usar una clase, solamente se necesita saber qué funciones miembro se pueden llamar y qué datos son accesibles. A esto se le denomina interfaz de la clase. No necesitamos saber cómo está hecha la clase, cómo son sus detalles internos. A esto se le denomina ocultamiento de la información. Una vez que la clase está depurada y probada, la clase es como una caja negra. Los objetos de dicha clase guardan unos datos, y están caracterizados por una determinada conducta.

Para acceder a un miembro público (dato o función), desde un objeto de la clase Punto basta escribir:

```cpp
objeto.miembro_público;
```

Habitualmente, los miembros públicos son funciones, como mostrar, ocultar, *getx, gety*. Las llamadas a dichas funciones miembro desde un objeto *pt1* de la clase Punto, se escribirán:

```cpp
ptl.mostrar ();
cout << "nabscisa del punto= " << ptl.getx();
cout << "nordenada del punto= "<< ptl.gety ();
```

## Siguiente tema: [Clases y Objetos - Funciones Inline][2]

 [1]: https://elbauldelprogramador.com/clases-y-objetos-definir-una-clase/
 [2]: https://elbauldelprogramador.com/clases-y-objetos-funciones-inline/