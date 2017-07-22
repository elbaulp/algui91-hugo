---
author: alex
categories:
- algoritmos
- articulos
- c
date: '2016-01-01'
lastmod: 2017-07-22T12:21:44+01:00
mainclass: dev
url: /optimizar-sumas-en-paralelo/
tags:
- concurrencia
- paralelo
- ps3
title: Optimizar sumas en paralelo
---

Hace unos días leí acerca del procesador de la consola PS3 y su capacidad para realizar **varias operaciones aritméticas en una sola instrucción**. Es decir, dado que tiene un bus de 128 bits, podría sumar 4 valores de 32 bits en una operación. Me sirvió para darle vueltas a la cabeza e intentar hacer lo mismo en mi ordenador.

La **anchura del bus** de un procesador es equivalente al número de cifras que puede tener la pantalla de una calculadora simple, sólo que en lugar de tratarse de dígitos decimales (del 0 al 9) son dígitos binarios (0 ó 1). El planteamiento es sencillo: supongamos que tenemos una calculadora de 12 dígitos y necesitamos **sumar cuatro parejas de números de tres cifras** -suponiendo que estamos seguros de que nunca nos vamos a pasar de 999–. Por ejemplo:

```
293 + 266
496 + 357
459 + 330
458 + 471
```

En lugar de realizar cuatro operaciones y dejar nueve ceros a la izquierda, podemos **agrupar los números** y “pegarlos” en dos sumandos:

```
293.496.459.458 + 266.357.330.471
```

Que da como resultado:

```
559.853.789.929
```

O sea, 559, 853, 789 y 929, el resultado de **cada una de las operaciones por separado**. Esto mismo lo hemos hecho sumando cuatro enteros de 16 bits guardándolos en estructuras de 64 bits. Basta con crear una estructura en C que almacene cuatro enteros unsigned short int y dos instancias de ésta -cada una será un sumando-.
Les damos valores y, utilizando sus punteros, hacemos **casting** a entero de 64 bits (unsigned long long int) y los sumamos. El resultado se puede interpretar como una estructura del mismo tipo, conteniendo los cuatro resultados.

Al procesador no le importa sumar números de 64 bits, pero sí le **ahorra bastante tiempo (aproximadamente el 60%)** disminuir la cantidad de operaciones que tiene que realizar. Aquí incluyo un pequeño programa en C que demuestra el ahorro de tiempo. Recordad que es necesario compilarlo en un sistema de 64 bits.
Gracias por el código a Victor Manuel Fernández Castro. Estudiante de la ETSIIT (Granada).

```cpp
/*******************************************************************************
* TEST DE SUMAS EN PARALELO
*
* Copyleft 2012 Victor Manuel Fernandez Castro - Todos los derechos revocados.
* 3 de Junio de 2012
*
* Requiere 1,2 GB de memoria para compilar y ejecutar.
* Requiere compilacion de 64-bit.
* Sugerencia: gcc -O2 -o sumas sumas.c
******************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <time.h>

/***************************************
* Tipo operando de suma de 64 bits con 4 celdas de 16 bits
**************************************/

typedef struct Sumando {
unsigned short x;
unsigned short y;
unsigned short z;
unsigned short w;
} Sumando;

/***************************************
* Datos globales (muy grandes para guardar en la pila)
**************************************/

#define N 50000000

static Sumando a[N];
static Sumando b[N];
static Sumando c[N];

/***************************************
* Imprime 's' en la salida estandar
**************************************/

void printSumando(const Sumando *s) {
printf("X = %hunY = %hunZ = %hunW = %hun", s->x, s->y, s->z, s->w);
}

/***************************************
* Algoritmo de suma 1
* Metodo clasico
* Almacena en 'c' el resultado de 'a' + 'b'
**************************************/

void suma1(const Sumando *a, const Sumando *b, Sumando *c) {
c->x = a->x + b->x;
c->y = a->y + b->y;
c->z = a->z + b->z;
c->w = a->w + b->w;
}

/***************************************
* Algoritmo de suma 2
* Metodo de acumulacion por desplazamiento
* El mas lento, cuesta mas el collar que el perro
* Almacena en 'c' el resultado de 'a' + 'b'
**************************************/

void suma2(const Sumando *a, const Sumando *b, Sumando *c) {
unsigned long long operA = ((unsigned long long)a->x << 48) | ((unsigned long long)a->y << 32) | (a->z << 16) | a->w;
unsigned long long operB = ((unsigned long long)b->x << 48) | ((unsigned long long)b->y << 32) | (b->z << 16) | b->w;
unsigned long long result = operA + operB;

c->x = (result & 0xffff000000000000) >> 48;
c->y = (result & 0xffff00000000) >> 32;
c->z = (result & 0xffff0000) >> 16;
c->w = result & 0xffff;
}

/***************************************
* Algoritmo de suma 3
* Casting a 'long long int'
* El mas eficiente: todo se hace en una operacion
* Almacena en 'c' el resultado de 'a' + 'b'
**************************************/

void suma3(const Sumando *a, const Sumando *b, Sumando *c) {
(*(unsigned long long*)c) = (*(unsigned long long*)a) + (*(unsigned long long*)b);
}

/*******************************************************************************
* Punto de entrada
******************************************************************************/

int main(void) {
unsigned int i;
clock_t tStart;
clock_t tStop;
clock_t tInit;

// Medimos el tiempo de inicializacion

printf("Inicializando datos...n");
srand(time(0));
tStart = clock();

for (i = 0; i < N; i++) {
a[i].x = rand() & 0x7fff; // 32767 < (65536 / 2) => No desbordamiento
a[i].y = rand() & 0x7fff;
a[i].z = rand() & 0x7fff;
a[i].w = rand() & 0x7fff;

b[i].x = rand() & 0x7fff;
b[i].y = rand() & 0x7fff;
b[i].z = rand() & 0x7fff;
b[i].w = rand() & 0x7fff;
}

tInit = clock() - tStart;
printf("Inicializacion: %d ms.n", (int)((double)tInit / CLOCKS_PER_SEC * 1000));

// Tiempo de ejecucion del primer algoritmo

tStart = clock();

for (i = 0; i < N; i++) {
suma1(&a[i], &b[i], &c[i]);
}

tStop = clock();
printf("Algoritmo 1: %d ms.n", (int)((double)(tStop - tStart) / CLOCKS_PER_SEC * 1000));

// Tiempo de ejecucion del segundo algoritmo

tStart = clock();

for (i = 0; i < N; i++) {
suma2(&a[i], &b[i], &c[i]);
}

tStop = clock();
printf("Algoritmo 2: %d ms.n", (int)((double)(tStop - tStart) / CLOCKS_PER_SEC * 1000));

// Tiempo de ejecucion del tercer algoritmo

tStart = clock();

for (i = 0; i < N; i++) {
suma3(&a[i], &b[i], &c[i]);
}

tStop = clock();
printf("Algoritmo 3: %d ms.n", (int)((double)(tStop - tStart) / CLOCKS_PER_SEC * 1000));

return 0;
}
```
