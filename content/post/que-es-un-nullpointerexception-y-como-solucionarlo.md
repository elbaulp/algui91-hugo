---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-04-06 19:24:34
description: "El siguiente art\xEDculo es una traducci\xF3n de una pregunta en stackOverflow
  del usuario ziggy, que preguntaba \xBFQu\xE9 es un NullPointerException y c\xF3mo
  se puede solucionar?. La respuesta es del usuario vincent-ramdhanie"
image: "2014/05/Qu\xE9-es-un-NullPointerException-y-c\xF3mo-solucionarlo.png"
lastmod: 2016-04-06
layout: post.amp
mainclass: java
permalink: /que-es-un-nullpointerexception-y-como-solucionarlo/
tags:
- excepciones java
- null
- NullPointerException java
- nullpointerexception null
- error facebook nullpointerexception null
- nullpointerexception facebook
- nullpointerexception
- nullpointerexception null facebook
- que significa nullpointerexception null
- error nullpointerexception null facebook
- que es nullpointerexception null
- error al entrar en facebook nullpointerexception
title: "Qu\xE9 es un NullPointerException y c\xF3mo solucionarlo"
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/05/Qué-es-un-NullPointerException-y-cómo-solucionarlo.png" title="{{page.title}}" alt="{{ page.title }}" width="250px" height="292px" />
</figure>

Si has llegado aquí porque tienes problemas con **facebook**, tu respuesta está en este artículo: [Qué Esta Causando Un NullPointerException en Facebook E Internet](/nullpointerexception-facebook "Qué Esta Causando Un NullPointerException en Facebook E Internet")
{: .notice-info }

> El siguiente artículo es una traducción de una pregunta en stackOverflow del usuario <a href="http://stackoverflow.com/users/29182/ziggy" target="_blank">ziggy</a>, que preguntaba ¿Qué es un **NullPointerException** y cómo se puede solucionar?. La respuesta es del usuario <a href="http://stackoverflow.com/users/27439/vincent-ramdhanie" target="_blank">vincent-ramdhanie</a>

Cuando se declara una variable referencia (Un objeto), realmente se está creando un puntero a un objeto. Consideremos el siguiente código que declara un entero con el tipo de dato primitivo:

<!--more--><!--ad-->

```java
int x;
x = 10;

```

En el ejemplo la variable `x` es un `int` y JAva lo inicializa a 0. Cuando se le asigna el 10 en la segunda línea el valor se escribe el la posición de memoria a la que apunta `x`. Pero cuando la variable es de tipo referencia ocurre algo distinto. Por ejemplo:

```java
Integer num;
num = new Integer(10);

```

La primera línea declara una variable llamada `num`, pero no contiene un valor primitivo como en el caso anterior. En su lugar contiene un puntero (Porque su tipo es `Integer`, de tipo referencia). Como hasta el momento no se le ha dicho hacia qué apuntar, Java le asigna Null, lo cual significa que no apunta a nada.

En la segunda línea, la palabra reservada `new` se usa para instanciar (o crear) un objeto de tipo `Integer` y la variable puntero `num` se asigna a éste objeto. Ahora se puede referenciar al objeto usando el operador de de-referencia `.` (El punto).

La excepción `NullPointerException` ocurre al declarar una variable y no crear el objeto. Si se intenta de-referenciar `num` antes de crear el objeto se obtiene un `NullPointerException`. En los casos más triviales el compilador capturará el problema e informará de él con el mensaje *“num quizá no se haya inicializado”* pero en otras ocasiones se escribirá código que no crea el objeto directamente.

Por ejemplo se puede tener un método como el siguiente:

```java
public void doSomething(Integer num){
   // Usar num
}

```

En el cual no se está creando el objeto, si no asumiendo que fue creado antes de llamar al método `doSomething`. El problema es que puede que se llame al método así:

```java
doSomething(null);

```

En cuyo caso `num` es Null. La mejor forma de evitar este tipo de excepciones es comprobar siempre si es null en caso de no haber creado el objeto nosotros mismos. Por tanto, `doSomething()` debería escribirse así:

```java
public void doSomething(Integer num){
    if(num != null){
       // Usar num
    }
}

```

#### Referencias

*What is a Null Pointer Exception, and how do I fix it?* »» <a href="http://stackoverflow.com/a/218510/1612432" target="_blank">stackoverflow</a>
