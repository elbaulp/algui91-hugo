---
author: alex
categories:
- so
color: '#F57C00'
date: '2016-01-01'
description: "Esta es la primera parte del temario que vamos a ver en Sistemas Operativos,
  vamos a verla toda en una sola entrada para que no se haga muy pesada, pero es importante
  comprenderla, ya que es el lenguaje de los ordenadores, y nos servir\xE1 tambien
  para el tema de redes."
lastmod: 2016-09-02
layout: post.amp
mainclass: articulos
url: /codificacion/
title: "Codificaci\xF3n"
---

Esta es la primera parte del temario que vamos a ver en Sistemas Operativos, vamos a verla toda en una sola entrada para que no se haga muy pesada, pero es importante comprenderla, ya que es el lenguaje de los ordenadores, y nos servirá tambien para el tema de redes.

<!--more--><!--ad-->

Lo que vamos a ver en esta entrada es:



# 1. Representación numérica en una base

Dado un número x, su representación en una dada base b consiste en escribirlo como

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="86" width="214" src="https://3.bp.blogspot.com/_IlK2pNFFgGM/TU76XWz13HI/AAAAAAAAAWA/3cmroTfSA_k/s320/ecu.png"></amp-img>
</figure>

donde el signo <var>s</var> es igual a 0 o 1 y los coeficientes a<sub>j</sub> son enteros positivos menores que *b*. En la vida real la suma tiene sólo un número finito de términos por lo que algunos números son sólo representados de forma aproximada. Usualmente, utilizamos el sistema decimal de numeración (b = 10) pero la representación numérica en sistemas digitales se realiza en general en base 2, denominado sistema de numeración binaria, y ocasionalmente en base 16 (sistema hexadecimal).

Los números se representan en memoria como una cadena de *bits* que pueden tomar los valores 0 ó 1. Se denomina *byte* a un grupo de 8 bits consecutivos.

## 2. Representación de números enteros

En representación binaria un número entero *n* se escribe como

- n = a<sub></sub> 2<sup></sup> + a<sub>1</sub> 2<sup>1</sup> + a<sub>2</sub> 2<sup>2</sup> + a<sub>3</sub> 2<sup>3</sup> + &#8230;

donde cada coeficiente *a<sub>j</sub>* es igual a 1 ó 0. Usualmente los números enteros ocupaban 4 bytes de memoria (32 bits), aunque en las computadoras modernas se pueden usar enteros de 64 bits.

Los números que pueden almacenarse en la representación de 4 bytes están en el rango:

- n<sub>min</sub> = (00000000000000000000000000000000)<sub>2</sub> = (0)<sub>10</sub>
- n<sub>max</sub> = (11111111111111111111111111111111)<sub>2</sub> = 2<sup>32</sup> - 1 = (4294967295)<sub>10</sub>

para números enteros sin signo. Si se utiliza el primer bit de la izquierda como signo (0, positivo; 1, negativo) el rango se reduce a *n<sub>min</sub>* = −2147483648 y *n<sub>max</sub> = 2147483647* para enteros con signo.

## 3. Representación de números reales

Las computadoras, con un número finito de bits, no pueden almacenar todos los números reales en forma exacta. Esto es similar a lo que ocurre con los números irracionales (como &pi;, &#8730;2, etc), o periódicos (1/3, 1/11,&#8230;) en el sistema decimal. La forma convencional de almacenar números reales en la memoria de una computadora es mediante el método llamado punto flotante o *floating point*. Uno de los sistemas más comunes es la representación de números reales en *simple precisión* utilizada en la convención IEEE. En dicho sistema cada número de precisión simple ocupa 4 bytes (32 bits) que se destinan a: el signo (1 bit), un exponente (8 bits) y la parte fraccionaria de la mantisa (23 bits)<sup>1</sup>. De esta manera un número está determinado por estas tres cantidades

- x = (-1)<sup>s</sup> x 2<sup>exp-E</sup> x 1.mantisa

En esta representación, los 8 bits utilizados permiten que el exponente se encuentre en el rango 0 < exp < 255. Se utiliza la constante *E* = 127 para también obtener resultados negativos<sup><a href="#indices">2</a></sup> Observe que para ganar un bit, se omite la parte entera de la mantisa que se supone igual a 1. Esta representación se llama normalizada y se utiliza para todos los número, exepto aquellos muy grandes o muy pequeños. En particular, esta convención no permite representar el número 0.

## 3.1 Algunos ejemplos

Para aclarar los conceptos, veamos algunos ejemplos de números normalizados en precisión simple:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  width="842" height="118" src="https://1.bp.blogspot.com/_IlK2pNFFgGM/TU8FDDy_ycI/AAAAAAAAAWI/YN4DF_BgVWo/s1600/ejem.png"></amp-img>
</figure>

Entre paréntesis está representada la parte entera de la mantisa (que es igual a 1 siempre por convención.) Debe notarse que el número final se obtiene considerando que:

  * El signo es positivo (bit de signo igual a 0)
  * El exponente se obtiene como 131 - 127 = 4, que en sistema decimal da 2<sup>4</sup> = 16.
  * La mantisa 1 + 241/1024 = 1,2353515625 se obtiene sumando: 1 (implícito), 1/8, 1/16, 1/32, 1/64 y 1/1024.

Como segundo ejemplo veamos la conversión inversa, del número (3,375)<sub>10</sub> a sistema binario. El bit de signo es 0. El número puede expresarse como la fracción 27/8 y es mayor que 2 por lo que debemos sacar un exponente positivo; en este caso, factorizamos por 2<sup>1</sup> y nos queda 27/16 que puede escribirse como

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" width="280" height="63"  src="https://4.bp.blogspot.com/_IlK2pNFFgGM/TU8HrCUensI/AAAAAAAAAWU/6PseQEVlK34/s1600/ejem2.png"></amp-img>
</figure>

por lo que, después de eliminar la parte entera y agregando el signo y el exponente, el número es:

- (3,375)<sub>10</sub> = (0 10000000 (1), 101100000000000000000000)<sub>2</sub>

# Codificación básica (binaria)

Este sistema se caracteriza como hemos visto anteriormente por usar solo dos dígitos, 0 y 1. Es la forma más facil de operar para el ordenador.

Para pasar de decimal a binario hacemos lo siguiente: Dividir el número entre 2 hasta que el cociente sea menor o igual a 1, cuando terminemos, recogemos los resultados desde el último cociente hasta el primer resto.
Por ejemplo, para pasar el número decimal 15 a binario: 15/2 -> resto 1, 7/2 -> resto 1, 3/2 -> resto 1, como el cociente de esta últmia división es menor o igual a 1, paramos. El número en binario sería desde el cociente de la división 3/2 (Que es 1), y todos los demas restos. Es decir, el número en binario se recoge de derecha a izquierda en los resultados de las divisiones. (15 en binario es 1111).

Para hacer el proceso contrario, pasar de binario a decimal, se han de numerar las posiciones (de derecha a izquierda y empezando por 0), se calcula de la forma base elevado a la posición por el bit (0 ó 1). Ejemplo:

-  1<sup>3</sup><sup>2</sup>1<sup>1</sup><sup></sup>

Y el resultado:

- 1010 -> (2<sup></sup>*0) + (2<sup>1</sup>*1) + (2<sup>2</sup>*0) + (2<sup>3</sup>*1) = 2+8 = 10(decimal)

Nota: En binario los número que acaban en 0 son pares, y en 1 impares.

# Codificación octal

En este sistema se usan sígitos del 0 al 7.

### Paso de decimal a octal

22 decimal a octal: Es un proceso similar al paso de decimal a binario, dividimos entre 8 y mientras el cociente sea mayor que 7.
Ejemplo: 22/8 = cociente 2, resto 6. Por lo tanto 22 en octal es 26.

Para pasar de octal a decimal se sigue la misma regla, pero se multiplica por 8:

-  2<sup>1</sup>6<sup></sup>

A decimal:

-  (8<sup></sup>*6) + (8<sup>1</sup>*2) = 6 + 16 = 22 (decimal)

# Codificación hexadecimal

En este sistema se usan sígitos del 0 al 16.

### Paso de decimal a hexadecimal

162 a hexadecimal. Dividimos 162/16, que da 10 y resto 2, como el 2 es menor que 15, se para aquí. La solución seria el 102, pero en hexadecimal pasa lo siguiente:

- `10 -> A; 11 -> B; 12 -> C; 13 -> D; 14 -> E; 15 -> F;`

Por lo que 162 en decimal sería el A2 en hexadecimal.

El paso contrario:

- A<sup>1</sup>2<sup></sup> (Sustituimos la A por su valor A = 10)

A decimal:

- (16<sup>1</sup>*10) + (16<sup></sup>*2) = 160 + 2 = 162 (decimal)

### Binario a octal

Una opción es pasar de binario a decimal y de decimal a octal.
Otra forma es agrupar el binario en 3 bits (Empezando por la derecha), leemos la secuencia de 3 bits de izquierda a derecha y escribimos el octal. Por ejemplo, 1100, agrupamos en 3 bits, 1 y 100, ahora escribimos los valores, para el primer grupo (En este caso de solo 1 bit), su valor es 1, para el segundo grupo (100) su valor es 4(En decimal), de forma que el 1100 en binario es el 14 en octal.

### Binario a Hexadecimal

El mismo proceso que seguimos para pasar de binario a octal, pero agrupando en 4 bits. Por ejemplo 10100010 es el 162 en decimal, para pasarlo a hexadecimal hacemos grupos de 4 bits (empezando por la derecha) (0010) (1010), ahora escribimos sus valores en hexadecimal, el 1010 es el valor 10 en decimal, que en hexadecimal es el A, y el 0010 en decimal es el 2, que en hexadecimal es el 2. Por lo tanto: 10100010 en hexadecimal = A2

### Hexadecimal a Octal

Para esta forma, es mejor pasar a binario, y de binario a octal (Agrupando de 3 en 3 bits.)

### Octal a Hexadecimal

De octal a binario y de binario a hexadecimal (Agrupando de 4 en 4 bits.)

### Otros sistemas de codificación

| Decimal | Exceso-3 | BCD (Decimal codificando en binario) | AIKEN | GRAY |
|---------|----------|--------------------------------------|-------|------|
| 0011    | 0000     | 0000                                 |       |      |
| 1       | 0100     | 0001                                 | 0001  | 01   |
| 2       | 0101     | 0010                                 | 0010  | 11   |
| 3       | 0110     | 0011                                 | 0011  | 10   |
| 4       | **0111** | 0100                                 | **0100** | 000  |
| 5       | 1000     | 0101                                 | 1011  | 001  |
| 6       | 1001     | 0110                                 | 1100  | 011  |
| 7       | 1010     | 0111                                 | 1101  | 010  |
| 8       | 1011     | 1000                                 | 1110  | 110  |
| 9       | 1100     | 1001                                 | 1111  | 111  |


El BCD es una forma directa asignada a un equivalente binario. Es posible asignar cargas a los bits binarios de acuerdo a sus posiciones. Las cargas en el código BCD son 8, 4, 2, 1. Es una codificación binaria en 4 bits para representarla empaquetada o desempaquetada. La mayor representación de bcd, es de 9, y a partir de hay, cada numero lo clasifica. El 10 decimal seria en bcd, empaquetado de 4 bits el 0001 0000.

El exceso-3 le suma 3 al BCD. Es la mas rápida, y se fijaron que si le sumaban tres al BCD, a partir del 4, todos los números son los contrarios, es decir, 5 es el contrario de 4, 6 el contrario de 3&#8230;

El AIKEN se baso en BCD pero en vez de codificar de la forma 8421 (al pasar de binario a decimal es lo que hacemos) dijo que seria 2421. La razón de que lo hiciera, es que pasa lo mismo que en Exceso-3 a partir del 4.

Gray es el cambio de un bit, o sea, que de un numero a otro solo cambiará un bit.

### Codificación negativa

A nivel de signo, se puede considerar como Signo/magnitud, Complemento a 1 o Complemento a 2. (Uso de Codificación binaria).

En signo/magnitud, el bit de más a la izquierda esta reservado para el signo, y el resto para la longitud, entonces el valor máximo a representar sera (2<sup>(n-1)</sup>)*2 Para positivos y negativos, con lo cual tenemos un 0 para positivo y otro negativo, que se controla de manera interna en la maquina. El -7 en 8bits seria el 10000111.

El complemento a 1 es cambiar ceros por unos, Osea, que el 7 binario (111) en negativo es el (000), el dos en binario es el 10, para pasar a -2 en complemento a 1, seria 01 (-2)

El complemento a 2 se ideo para el problema de que el cero tenga positivos y negativos. Este cambia los ceros por unos y le suma uno al resultado. Entonces en complemento a 2 el 7 es 111, se pasan los unos a ceros, 000 y se le suma 1, 001 (-7 en complemento a 2).

### Empaquetado y desempaquetado


DESEMPAQUETADO: (Se usa para transmitir)
El uso de esto viene del manejo del BCD, ya que si metemos un 23 y un 71, al pasarlo a BDC, el pc recibe una cadena, al cogerlos de 4 en 4, el resultado es 2371, que no tiene nada que ver, para ello se empaqueta:

```bash
2      3      7      1
0010   0011   0111   0001
```

como en BCD el 1111 no existe, lo usa para marcar que va a empezar un numero, menos el que precede al ultimo.
También usa el 1100(que no existe en BCD) para indicar que el numero será positivo, y el 1101(Tampoco existe) para negativo, seria:


```bash
2             3             7      +      1
1111   0010   1111   0011   1111   0111   1100   0001 → 2371
1111   0010   1111   0011   1111   0111   1101   0001 → -2371
         2             3             7      -      1
```

### Empaquetado

Se pone el numero y al final se añade el signo:

```bash
0010   0011   0111   0001   1100
  2      3      7      1      +
```

<sup>1</sup> En doble precisión se utilizan 64 bits (8 bytes): 1 para el signo, 11 para el exponente y 52 para la mantisa.
<sup>2</sup> En la convención IEEE-754 el exponente varía en el rango [-126, 127] y se reservan los restantes valores para representar números muy pequeños y muy grandes.
