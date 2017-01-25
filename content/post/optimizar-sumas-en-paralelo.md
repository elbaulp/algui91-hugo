---
author: alex
categories:
- algoritmos
- articulos
- c
color: '#E64A19'
date: '2016-01-01'

mainclass: dev
url: /optimizar-sumas-en-paralelo/
tags:
- concurrencia
- paralelo
- ps3
title: Optimizar sumas en paralelo
---

<div>
  Hace unos días leí acerca del procesador de la consola PS3 y su capacidad para realizar <b>varias operaciones aritméticas en una sola instrucción</b>. Es decir, dado que tiene un bus de 128 bits, podría sumar 4 valores de 32 bits en una operación. Me sirvió para darle vueltas a la cabeza e intentar hacer lo mismo en mi ordenador.
</div>
<div>
</div>
<div>
  La <b>anchura del bus</b> de un procesador es equivalente al número de cifras que puede tener la pantalla de una calculadora simple, sólo que en lugar de tratarse de dígitos decimales (del 0 al 9) son dígitos binarios (0 ó 1). El planteamiento es sencillo: supongamos que tenemos una calculadora de 12 dígitos y necesitamos <b>sumar cuatro parejas de números de tres cifras</b> -suponiendo que estamos seguros de que nunca nos vamos a pasar de 999-. Por ejemplo:
</div>
<p >
  293 + 266<br /> 496 + 357<br /> 459 + 330<br /> 458 + 471
</p>
<div>
  En lugar de realizar cuatro operaciones y dejar nueve ceros a la izquierda, podemos <b>agrupar los números</b> y &#8220;pegarlos&#8221; en dos sumandos:
</div>

&nbsp;

<div>
  293.496.459.458 + 266.357.330.471
</div>
<div>
  Que da como resultado:
</div>
<div>
  559.853.789.929
</div>

&nbsp;

<div>
  O sea, 559, 853, 789 y 929, el resultado de <b>cada una de las operaciones por separado</b>. Esto mismo lo hemos hecho sumando cuatro enteros de 16 bits guardándolos en estructuras de 64 bits. Basta con crear una estructura en C que almacene cuatro enteros unsigned short int y dos instancias de ésta -cada una será un sumando-.
</div>
<div>
</div>
<div>
  Les damos valores y, utilizando sus punteros, hacemos <b>casting </b>a entero de 64 bits (unsigned long long int) y los sumamos. El resultado se puede interpretar como una estructura del mismo tipo, conteniendo los cuatro resultados.
</div>
<div>
</div>
<div>
  Al procesador no le importa sumar números de 64 bits, pero sí le <b>ahorra bastante tiempo (aproximadamente el 60%)</b> disminuir la cantidad de operaciones que tiene que realizar. Aquí incluyo un pequeño programa en C que demuestra el ahorro de tiempo. Recordad que es necesario compilarlo en un sistema de 64 bits.
</div>
<div>
</div>
<div>
</div>
<div>
</div>
<div>
  Gracias por el código a Victor Manuel Fernández Castro. Estudiante de la ETSIIT (Granada).
</div>
