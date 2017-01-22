---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-12-12'
lastmod: 2016-08-17
layout: post.amp
mainclass: dev
permalink: /por-que-un-switch-es-mas-rapido-que-su-homologo-if-then-else/
tags:
- asm
- ejemplo switch
- implementacion switch
- jump table
- switch
- tabla de salto
title: "Por qu\xE9 un switch es m\xE1s r\xE1pido que su hom\xF3logo if-then-else"
---

En este artículo pretendo explicar el motivo por el cual un switch es mucho más rápido que su homólogo en secuencias if-then-else, para ello analizaremos la implementación del switch.



## Introducción

El switch se basa en una implementación muy eficiente llamada en inglés **jump table** o tabla de saltos. Esta tabla es un array, donde la entrada *i* es la dirección de un segmento de código que implementa la acción que el switch debería ejecutar cuando la condición es igual a *i*. El código realiza una referencia al array dentro de la tabla de saltos usando el índice del switch y determinar así el destino para una instrucción de salto (instrucción **jmp** en [ensamblador][2]).

<!--more--><!--ad-->

Esa es la clave que explica el mayor rendimiento de un switch frente a una larga secuencia de **if-then-else**. Ya que el tiempo necesario para realizar el switch es independiente del número de casos (sentencia case:) que éste tiene.

[GCC][3] selecciona qué metodo de traducción aplica al switch dependiendo del número de casos y valores. Las tablas de saltos se usan cuando hay un número determinado de casos (cuatro por ejemplo) y abarcan un número pequeño de valores. Por ejemplo:

## Sentencia switch

```c
int switch_eg(int x, int n){
   int result = x;

   switch (n) {

      case 100:
         result *= 13;
         break;

      case 102:
         result += 10;
         /*Fall through*/

      case 103:
         result += 11;
         break;

      case 104:
      case 106:
         result *= result;
         break;

      default:
         result = 0;
   }

   return result;
}
```

## Traducción a extended C

```c
int switch_eg_impl(int x, int n) {
   /*Tabla de punteros a código*/
   static void *jt[7] = {
      &&loc;_A, &&loc;_def, &&loc;_B,
      &&loc;_C, &&loc;_D, &&loc;_def,
      &&loc;_D
   };

   unsigned index = n - 100;
   int result;

   if (index > 6)
     goto loc_def;

   /*Rama multidireccional*/
   goto *jt[index];

   loc_def:   /*Default case*/
      result = 0;
      goto done;

   loc_C:     /*Case 103*/
      result = x;
      goto rest;

   loc_A:     /*Case 100*/
      result = x * 13;
      goto done;

   loc_B:     /*Case 102*/
      result = x + 10;
      /*Fall through*/

   rest:      /*Finalizar case 103*/
      result += 11;
      goto done;

   loc_D:     /*Case 104, 106*/
      result = x * x;
      /*Fall through*/

   done:
      return result;
   }
```

La traducción a extended C muestra la estructura de una tabla de saltos (**jt**) y cómo se accede a ella.

En este ejemplo, los cases del switch no son contiguos, no existen casos para los valores 101 y 105, y hay casos con varias etiquetas (104 y 106), también hay casos denominados *fall through* (cases sin sentencia **break**).

El código ensamblador generado es muy parecido a la versión extended C:

```nasm
.file   "sw.c"
    .text
    .globl  switch_eg
    .type   switch_eg, @function
switch_eg:
    .LFB0:
    .cfi_startproc
    pushl   %ebp
    .cfi_def_cfa_offset 8
    .cfi_offset 5, -8
    movl    %esp, %ebp
    .cfi_def_cfa_register 5
    subl    $16, %esp
    movl    8(%ebp), %eax
    movl    %eax, -4(%ebp)
    movl    12(%ebp), %eax
    subl    $100, %eax
    cmpl    $6, %eax
    ja  .L2
    movl    .L7(,%eax,4), %eax
    jmp *%eax
.section    .rodata
    .align 4
    .align 4
.L7:
    .long   .L3
    .long   .L2
    .long   .L4
    .long   .L5
    .long   .L6
    .long   .L2
    .long   .L6
.text
.L3:
    movl    -4(%ebp), %edx
    movl    %edx, %eax
    addl    %eax, %eax
    addl    %edx, %eax
    sall    $2, %eax
    addl    %edx, %eax
    movl    %eax, -4(%ebp)
    jmp .L8
.L4:
    addl    $10, -4(%ebp)
.L5:
    addl    $11, -4(%ebp)
    jmp .L8
.L6:
    movl    -4(%ebp), %eax
    imull   -4(%ebp), %eax
    movl    %eax, -4(%ebp)
    jmp .L8
.L2:
    movl    $0, -4(%ebp)
.L8:
    movl    -4(%ebp), %eax
    leave
    .cfi_restore 5
    .cfi_def_cfa 4, 4
    ret
    .cfi_endproc
```

Una vez que disponemos del ejemplo representado de 3 formas distintas, profundicemos en el funcionamiento.

En la versión extendida de C se define el array **jt** que contiene siete entradas, cada una es la dirección de un bloque de código. Dichos bloques de código se definen con etiquetas en el código (*loc\_A, loc\_def etc*) e identificadas en el array **jt** por *punteros a código*. Para conseguir un puntero a un trozo de código hay que anteponer *&&* a la etiqueta. El operador *&* crea un puntero para el valor de un dato. Cuando se creó esta extensión de C, los autores crearon el operador *&&* para hacer referencia a la dirección de una porción de código.

El código C tiene cases para los valores *100, 102-104 y 106*, pero la variable *n* puede contener cualquier valor entero. El compilador desplaza el rango a los valores 0-6, restando 100 a *n*. Creando así una nueva variable que llamaremos *index* en la versión C del código. Al hacer este desplazamiento facilita las posibilidades de ramificación tratando a *index* como un valor sin signo *(unsigned*). Así, se sabrá fácilmente que *index* está fuera del rango 0-6 cuando sea mayor que 6. Tanto en el código C como ensamblador hay cinco posiciones distintas a las que saltar basandose en el valor de *index*. Las posiciones son:

  * loc_A » Identificado en código ensamblador como .L3
  * loc_B » .L4
  * loc_C » .L5
  * loc_D » .L6
  * loc_def » .L2

Cada una de estas etiquetas identifica el trozo de código a ejecutar en función de valor de index. En las versiones ensamblador y C extendido se compara el *index* con 6, si es mayor se salta al case por defecto.

El paso clave en la ejecución de una sentencia switch es acceder a una posición de código mediante la tabla de saltos, cosa que pasa en la línea 16 del código C extendido con la sentencia **goto** que referencia a la tabla de saltos *jt*. En la versión ensamblador, ocurre algo similar en la línea 21. El cálculo de a qué elemento del array jt se accede está en la línea 20 concretamente *.L7(,%eax,4)*. .L7 es la tabla de saltos, si observamos el contenido

```asm
.L7:
    .long   .L3 ; eax = 0
    .long   .L2 ; eax = 1
    .long   .L4 ; eax = 2
    .long   .L5 ; eax = 3
    .long   .L6 ; eax = 4
    .long   .L2 ; eax = 5
    .long   .L6 ; eax = 6
    .text
```

se aprecia que contiene las distintas etiquetas a las que se saltará posteriormente. Con *.L7(,%eax,4)* se está accediendo al elemento de índice %eax. Es decir se especifica una localización de memoria indexada por el valor del registro %eax (Que contiene el valor de *index*).

El \* de la línea 21 indica que se trata de un salto indirecto.

En la versión C extendida, se declara la tabla de saltos como un array de siete elementos, cada elemento es un puntero a una sección de código. El encargado de seleccionar los elementos del array es *index*, y su valor oscila entre 0-6. Hay que destacar, que los valores de index van en correspondencia con los posibles valores de n, 100-106.

Echemos un vistazo a la tabla de saltos:

```c
static void *jt[7] = {
      &&loc;_A, &&loc;_def, &&loc;_B,
      &&loc;_C, &&loc;_D, &&loc;_def,
      &&loc;_D
};
```

Algunos valores están duplicados, por ejemplo *loc_D* aparece en la posición 4 y 6 del array. Es lógico ya que para los valores 104 y 106 se debe ejecutar la misma porción del código:

```c
case 104:
case 106:
   result *= result;
   break;
```

En el caso *index = 5* o *index = 1* (No existe case para 105 o 101), se saltará al trozo de código etiquetado como *loc_def*, correspondiente al *default* del switch. Ahora estamos en condiciones de comprender mejor la estructura de la tabla de saltos en código ensamblador:

```asm
.section    .rodata
    .align 4        ; Alinea las direcciones a multiplos de 4 (Un entero ocupa 4B)
    .align 4
.L7:
    .long   .L3      ; case 100 : loc_A
    .long   .L2      ; case 101 : loc_def
    .long   .L4      ; case 102 : loc_B
    .long   .L5      ; case 103 : loc_C
    .long   .L6      ; case 104 : lod_D
    .long   .L2      ; case 105 : loc_def
    .long   .L6      ; case 106 : loc_D
.text
```

Estas declaraciones dicen que dentro de la sección llamada **.rodata** *(Read-Only Data)* debería haber una secuencia de siete palabras **long** (4-byte) cuyo valor se dá por la dirección de la instrucción asociada a la etiqueta (.L3 etc). La etiqueta **.L7** marca el inicio de la asignación de la tabla de saltos. La dirección asociada a esta etiqueta sirve como la base para el salto indirecto en la línea 21.
Tanto en la versión extendida de C, como en ensamblador, el código asociado a las etiquetas (loc_\* para extended C y .L\* para ensamblador) implementan las distintas ramas del switch. La mayoría calculan un valor para devolver en la variable *result* (o el registro *%eax*) y saltan al final de la función (en el código ensamblador se salta a la etiqueta **.L8**).

El patrón seguido para calcular un resultado no se da para los cases 102 y 103 en el código C. La lógica del programa para estos dos casos en las versiones ensamblador y C extendido es tener dos destinos ditintos para ambos casos (*loc\_C, loc\_B y .L5, .L4 *). Los dos bloques de código convergen en el código que incrementa *result* en 11 (etiquetado como *rest* en C extendido y .L5 en ensamblador)

Comprender todo el código visto requiere examinarlo con detenimiento y paso a paso. Aún así, el objetivo de este artículo era demostrar que el uso de tablas de salto o **jump tables** permite una forma muy eficiente de implementar ramas multidireccionales. En este ejemplo, el programa puede ramificarse a cinco posiciones distintas de un solo salto, incluso si tuvieramos un switch con cientos de cases, sería manejado con un solo acceso a la tabla de saltos.

La versión ensamblador de arriba corresponde a la compilación para procesadores de 32 Bits, a continuación la versión para 64-Bits:

```asm
.file   "sw.c"
.text
.globl  switch_eg
.type   switch_eg, @function
switch_eg:
    .LFB0:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    movl    %edi, -20(%rbp)
    movl    %esi, -24(%rbp)
    movl    -20(%rbp), %eax
    movl    %eax, -4(%rbp)
    movl    -24(%rbp), %eax
    subl    $100, %eax
    cmpl    $6, %eax
    ja  .L2
    movl    %eax, %eax
    movq    .L7(,%rax,8), %rax
    jmp *%rax
    .section    .rodata
    .align 8
    .align 4
.L7:
    .quad   .L3
    .quad   .L2
    .quad   .L4
    .quad   .L5
    .quad   .L6
    .quad   .L2
    .quad   .L6
    .text
.L3:
    movl    -4(%rbp), %edx
    movl    %edx, %eax
    addl    %eax, %eax
    addl    %edx, %eax
    sall    $2, %eax
    addl    %edx, %eax
    movl    %eax, -4(%rbp)
    jmp .L8
.L4:
    addl    $10, -4(%rbp)
.L5:
    addl    $11, -4(%rbp)
    jmp .L8
.L6:
    movl    -4(%rbp), %eax
    imull   -4(%rbp), %eax
    movl    %eax, -4(%rbp)
    jmp .L8
.L2:
    movl    $0, -4(%rbp)
.L8:
    movl    -4(%rbp), %eax
    popq    %rbp
    .cfi_def_cfa 7, 8
    ret
.cfi_endproc
```

Tras analizar y entender cómo se implementa el switch, la razón por la que es más rápido que una sucesión de if-then-else es simple. El factor determinante es la existencia de la tabla de saltos y que solo se requiere de una comparación para determinar a qué sentencia case saltar. Mientras que en una secuencia de if-then-else se requiere la comprobación de todas y cada una de las expresiones que comprenden el if, hasta que se satisfaga alguna o se llegue al final del bloque.

## Referencias

*Computer Systems: A Programmer's Perspective* »» <a href="http://www.amazon.es/gp/product/013034074X/ref=as_li_ss_tl?ie=UTF8&camp=3626&creative=24822&creativeASIN=013034074X&linkCode=as2&tag=elbaudelpro-21" target="_blank">Ver libro en Amazon</a>

 [2]: https://elbauldelprogramador.com/tags/asm
 [3]: https://elbauldelprogramador.com/compilacion-de-programas-makefile-y-g/