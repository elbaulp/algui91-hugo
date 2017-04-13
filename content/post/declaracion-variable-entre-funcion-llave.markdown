---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-04-06 19:24:34
description: "Declaración De Variables Entre El Nombre De La Función Y La Primera
  Llave en C"
lastmod: 2016-08-09

mainclass: dev
modified: null
tags:
- pre ansi C stilo
- declarar variables antes de funcion C
- "sintaxis extra\xF1a C"
title: "Declaración De Variables Entre El Nombre De La Función Y La Primera
  Llave en C"
---

> El siguiente artículo es una traducción de una pregunta en **StackOverflow** del usuario <a href="http://stackoverflow.com/users/1612432/algui91" target="_blank" title="algui91 perfil">algui91</a> , que preguntaba <a href="http://stackoverflow.com/questions/13789450/variable-declaration-between-function-name-and-first-curly-brace" target="_blank" title="Variable declaration between function name and first curly brace">_Variable declaration between function name and first curly brace_</a>. La respuesta es del usuario <a href="http://stackoverflow.com/users/270060/omkant" target="_blank" title="Omkant Perfil">omkant</a>.

Hace bastante tiempo me encontré un un código como este:

```c
int main(c,v) char *v; int c;{...}
```

<!--more--><!--ad-->

Nunca lo había visto, declarar variables entre el nombre de una función y la primera llave, resulta que esta sintaxis corresponde con la definición de funcionas a la vieja usanza de C (pre-ANSI C):

```c
void foo(a,b)
int a;
float b;
{
  // body
}
```

Lo cual es equivalente a escribir lo siguiente:

```c
void foo(int a, float b)
{
// body
}
```

Me resultó curioso, pero no lo uséis :-).

#### Fuente

- Variable declaration between function name and first curly brace \| <a href="http://stackoverflow.com/questions/13789450/variable-declaration-between-function-name-and-first-curly-brace" title="Variable declaration between function name and first curly brace" target="_blank">stackoverlow.com</a>
