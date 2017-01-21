---
author: alex
categories:
- c
color: '#E64A19'
description: "El destructor es una funci\xF3n especial, que tiene el mismo nombre
  que la clase pero que va precedido del s\xEDmbolo ~ (ASCII 126). El destructor es
  \xFAnico y no tiene argumentos: se puede definir dentro de la clase o fuera de la
  misma."
lastmod: 2016-09-04
layout: post.amp
mainclass: dev
permalink: /clases-y-objetos-el-destructor/
title: Clases y Objetos. El Destructor
---

Ya hemos visto como [definir una clase][1], y como crear un [constructor][2] para ella. Ahora vamos a ver como destruir un objeto creado.

<!--more--><!--ad-->

El destructor es una función especial, que tiene el mismo nombre que la clase pero que va precedido del símbolo ~ (ASCII 126). El destructor es único y no tiene argumentos: se puede definir dentro de la clase o fuera de la misma. Si no se ha definido explícitamente un destructor dentro de la clase, C++ proporciona uno. Cuando una variable sale del ámbito en la que se ha declarado, se libera la memoria que ocupa: un objeto llama para este propósito al destructor. Por ejemplo, en el [capitulo anterior][2] creamos pt1 y def, son objetos definidos en el bloque de **main**. Cuando el programa alcanza el final del bloque, dichos objetos salen de ámbito llamando al destructor de la clase, e imprimiendo en la pantalla dos mensajes idénticos (objeto de la clase Punto destruido).


```cpp
int (main){
  Punto ptl(‘*’, 20, 10);
  Punto def;
  //...
  return 0;
}
```

Declaración y definición del destructor de la clase. La definición puede hacerse también fuera de la clase.

```cpp
class Punto{
  public:
    //...
    ~Punto() { cout << "nobjeto Punto destruido"; }
};
```

## Siguiente tema: [Clases y Objetos - Control del acceso a los miembros de la clase][3]

 [1]: https://elbauldelprogramador.com/clases-y-objetos-definir-una-clase/
 [2]: https://elbauldelprogramador.com/clases-y-objetos-el-constructor/
 [3]: https://elbauldelprogramador.com/clases-y-objetos-control-del-acceso-los/
