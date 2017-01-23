---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-01-01'
lastmod: 2016-09-04
layout: post.amp
mainclass: dev
permalink: /clases-y-objetos-el-constructor/
title: Clases y Objetos. El Constructor
---

## Constructores

Una vez que [se ha definido una clase][1], para usarla se ha de definir un objeto. Se define una variable de la clase Punto, exactamente igual que se define una variable de un tipo predefinido (int, float, etc.), o definido por el usuario. Las variables de una clase se denominan objetos. Los objetos usan la misma notación que cualquier tipo de variable, y su alcance se extiende desde la línea donde se ha declarado hasta el final del bloque.

<!--more--><!--ad-->

Un objeto perteneciente a una clase se crea llamando a una función especial denominada constructor de la clase. El constructor se llama de forma automática cuando se crea un objeto, para situarlo en memoria e inicializar los miembros dato declarados en la clase. El constructor tiene el mismo nombre que la clase. Lo específico del constructor es que no tiene tipo de retorno, por lo que su sintaxis es más simple:

```cpp
Punto:: Punto (argumentos)
```

Declaración del constructor:

```cpp
class Punto{
    //...
  public:
    Punto (char chl, int x1, int yl);
    //...
};
```

Definición del constructor. El constructor inicializa los miembros dato:

```cpp
Punto::Punto (char ch1,int x1, int y1){
  ch=chl;
  x=xl;
  y=yl;
}

```

Llamada al constructor. Para crear un objeto pt1 de la clase Punto, basta una única sentencia

```cpp
Punto ptl(‘*’, 40, 13);
```

En dicho objeto, el miembro dato ch guardará el carácter *, el miembro dato x, el número entero 40, y el miembro y, el entero 13.

Se llama a las funciones miembro desde el objeto `pt1`

```cpp
pt1.mostrar();
ptl.ocultar();
```

Podemos tener más de un constructor, por ejemplo uno que fije el carácter pero que permita cambiar las coordenadas del punto.

Declaración del constructor

```cpp
class Punto{
    //...
  public:
    Punto (int xl, int yl);
    //...
};
```

Definición del constructor: se fija el carácter, y se le pasan las coordenadas del punto.

```cpp
Punto::Punto(int xl, int yl){
  x 1=xl;
  y=y1;
  ch=’*’;
}
```

Se llama al constructor para crear un objeto pt2

```bash
Punto pt2(40, 13);
```

En dicho objeto, el miembro dato ch guardará el carácter *, el miembro dato x, el número entero 40, y el miembro y, el entero 13.

Se llama a las funciones miembro desde el objeto pt2

```cpp
pt2.mostrar();
pt2.ocultar();
```

Una clase, como hemos visto, puede tener más de un constructor. Cuando un constructor no tiene argumentos, se dice que es el constructor por defecto.

Declaración del constructor por defecto de la clase

```cpp
class Punto{
    //...
  public:
    Punto();
    //...
};
```

Definición del constructor por defecto: los miembros dato se inicializan en el bloque de dicho constructor

```cpp
Punto::Punto(){
  ch=’*’;
  x=40;
  y=13;
}
```

Para llamar al constructor por defecto, basta escribir:

```cpp
Punto def;
```

No escribir la sentencia:

```cpp
Punto def();
//Error
//Se llama a las funciones miembro desde el objeto def
def.mostrar();
def.ocultar();
```


## Siguiente tema: [Clases y Objetos - El Destructor][2]

 [1]: https://elbauldelprogramador.com/clases-y-objetos-definir-una-clase/
 [2]: https://elbauldelprogramador.com/clases-y-objetos-el-destructor/