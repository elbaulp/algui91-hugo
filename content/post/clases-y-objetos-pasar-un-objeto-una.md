---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-12-12'
description: "Vamos a estudiar c\xF3mo se pasa una variable a una funci\xF3n en uno
  de sus argumentos."
lastmod: 2016-09-08
layout: post.amp
mainclass: dev
permalink: /clases-y-objetos-pasar-un-objeto-una/
title: "Clases y Objetos - Pasar un objeto a una funci\xF3n"
---

### Introducción

Para usar una función son necesarios tres pasos:

* Declaración de la función.
* Definición de la función, de la tarea a realizar.
* Llamada de la función y realización de la tarea.

<!--more--><!--ad-->

Vamos a estudiar cómo se pasa una variable a una función en uno de sus argumentos.

### Paso por valor

```cpp
int funcion (int parm); // declaración
funcion (arg);          // llamada
int funcion (int parm)  // definición
{
  cout << parm << 'n';
  //...
  parm=88;
}
```

Así, cuando la variable arg se pasa por valor a una función, la función recibe una copia de `arg`. Cualquier cambio en la copia `parm` dentro del cuerpo de la función no afecta para nada al valor de `arg`. La función no puede, por tanto, alterar directamente el parámetro pasado por valor. Así pues, durante el curso de la llamada a la función existen la variable `arg` y su copia `parm`. Cuando se sale de la función, la variable `parm` está fuera de ámbito y se libera la memoria que ocupaba. En este caso, se asigna el valor 88 a `parm`, no a `arg`.

### Paso por dirección

```cpp
int funcion(int* parml); // declaración
funcion (&arg1);        // llamada
int funcion (int * parm) // definición
{
  cout << *parm << 'n';
  //...
  *parm=88;
}
```

Se pasa a la función no `arg`, sino `&arg`, la dirección de `arg`. La dirección de `arg`, `&arg`, se pasa por valor, y la función recibe una copia de ésta en `parm`. La función accede, por tanto, a la dirección de `arg` a través de la copia que recibe, y de este modo puede o no modificar el valor de `arg`. En este caso, se asigna el valor 88 a la dirección apuntada por `parm`, 88 es por tanto asignado a `arg`.

## El Concepto de referencia

Las referencias son una evolución de los punteros, y son exclusivas del lenguaje C++, Facilitan mucho el trabajo de la programación sin los inconvenientes que presenta la notación de punteros. Pasar una variable a una función por referencia es mucho más claro que hacerlo por dirección. Se puede entender la referencia como un alias o apodo de una variable en el ámbito de una función.

Declaración de una referencia: `ínt& ir=i;`

Cualquier cambio que experimente `ir`, lo experimenta `i`, y viceversa. La potencialidad de las referencias está en el paso de una variable a una función, y en segundo lugar -- aunque no lo veremos -- en la posibilidad de, que las funciones devuelvan referencias.

### Paso por referencia

```cpp
int funcion (int& parm);  // declaración
funcion (arg);            // llamada
int funcion (int& parm)   // definición
{
  cout << parm << 'n';
  parm=88;
}
```

asigna el valor `88` a `parm`, pero `parm`, es el alias de `arg`, por tanto, modificando `parm` se modifica `arg`. Como podernos apreciar, el paso por referencia es semejante al paso por valor, excepto en la declaración de la función.