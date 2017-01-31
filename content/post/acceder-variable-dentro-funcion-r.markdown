---
author: alex
categories:
- dev
date: 2016-04-22 06:40:33
description: "Haciendo una pr\xE1ctica de Aprendizaje Autom\xE1tico, en concreto implementando
  Gradiente Descendente Estoc\xE1stico (Stochastic Gradient Descent) o SGD para Regresi\xF3n
  Log\xEDstica e intentando hacer el c\xF3digo lo m\xE1s eficiente posible (Y eso
  en R significa evitar el uso de for a toda costa) me encontr\xE9 con la siguiente
  situaci\xF3n:"
image: Como-Acceder-a-Una-Variable-Desde-Dentro-De-Una-Funcion-en-R.png
mainclass: dev
lastmod: 2017-01-31
tags:
- R
- tutorial R
- variables globales R
- acceder variable en funcion R
- "Aprendizaje autom\xE1tico"
- etsiit R
title: "C\xF3mo modificar Una Variable Desde Dentro De Una Funci\xF3n en R"
---

Este artículo va a ser uno corto, pero creo que va a resolver el problema a muchas personas, igual que me lo resolvió a mi.

<!--more--><!--ad-->

Haciendo una práctica de Aprendizaje Automático, en concreto implementando _Gradiente Descendente Estocástico_ (__Stochastic Gradient Descent__) o _SGD_ para _Regresión Logística_ e intentando hacer el código lo más eficiente posible (Y eso en R significa evitar el uso de for a toda costa) me encontré con la siguiente situación:

```r
SGD <- function(...) {
  # Stochastic gradient descent
  #

  w <- matrix(rep(0,3))

  # ...

  update <- function(x) {
    # Aqui dentro se necesita modificar w, y modificarla
  }

  while (above.tolerance) {
    w.old <- w
    apply(data, 1, update)
    # ...
  }
  w
}
```

Bien, tal y como está el código de arriba no funciona, ya que aunque la función `update` puede ver el valor de `w`, que está en el ámbito de la función `SGD`, pero no puede modificar su valor, lo que modifica es una copia local, en el ámbito de `update`. Para que Gradiente Descendente Estocástico funcione se necesita que para cada punto se actualice el vector de pesos `w` y quede reflejado en el ámbito de la función `SGD`.

Para lograr este comportamiento, al principio pensé en declarar `w` como variable global con el operador `<<-`, lo cual es una terrible idea, porque `w` sería global a todo el programa. En este caso solo necesitamos que `w` pueda modificarse desde `update`. Así que buscando un poco encontré la forma de crear un entorno local a la función `SGD`, y luego usarlo dentro de `update`, aquí está el código:

```r
SGD <- function(...) {
  # Stochastic gradient descent
  #

  w.env <- new.env()
  w.env$w <- matrix(rep(0,3))

  # ...

  update <- function(x) {
    # Aqui dentro se necesita modificar w, y modificarla
    # Se usa la variable w.env$w
  }

  while (above.tolerance) {
    w.old <- w.env$w
    apply(data, 1, update)
    # ...
  }
  w.env$w
}
```

Con este sencillo cambio, dentro de `update` se está accediendo y modificando la variable `w`, actualizándola correctamente en cada iteración de `apply`.

Espero que os sea útil.

# Referencias

- Entornos Avanzados en R \| <a href="http://adv-r.had.co.nz/Environments.html" target="_blank" title="Entornos avanzados en R">adv-r.had.co.nz</a>
