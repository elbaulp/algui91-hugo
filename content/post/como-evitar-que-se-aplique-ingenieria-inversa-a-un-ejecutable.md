---
author: alex
categories:
- c
- how to
color: '#E64A19'
date: '2016-12-12'
layout: post.amp
mainclass: dev
permalink: /como-evitar-que-se-aplique-ingenieria-inversa-a-un-ejecutable/
tags:
- evitar ingenieria inversa
- funcion ptrace C
- ingenieria inversa C
- ptrace
title: "C\xF3mo evitar que se aplique ingenier\xEDa inversa a un ejecutable"
---

Hace unos días explicaba en qué consisten las secciones [.ctors y .dtors][1]. Hoy voy a explicar un método muy sencillo para evitar que se aplique ingeniería inversa a nuestros ejecutables, que evitará la depuración del mismo.


<!--more--><!--ad-->

Para ello hay que hacer uso de la función `ptrace()`:

```c
#include <sys>ptrace.h>

       long ptrace(enum __ptrace_request request, pid_t pid,
                   void *addr, void *data);

The  ptrace()  system  call  provides  a  means  by  which  one process (the "tracer") may observe
and control the execution of another process (the "tracee"), and examine and change the tracees
memory and registers.  It is primarily used to implement breakpoint debugging and system
call  tracing.

```

Consite en un proceso observe el control de ejecución de otro. Se usa normalmente para implementar puntos de ruptura para depurar.

Esta función será usada como constructor para que se ejecute antes de llamar a la función `main()`:

```c
</sys>*
 * evilgrin.c, tweaking ptrace() to induced whatever we been debugged
 */

#include <stdio.h>
#include <sys>ptrace.h>

void ptrace_trap(void) __attribute__ ((constructor));

void ptrace_trap(void) {

    </sys>*
     * If ptrace fails here, means someone already ptrace()'ed us.
     */
     if (ptrace(PTRACE_TRACEME, 0, 0, 0) < 0) {
         printf("alguien está depurando");
         exit(0);
     }
}

int main(int argc, char **argv) {
     printf("Hello World!\n");
     return 1;
}

```

El código de arriba realiza un `ptrace` a sí mismo. Si falla al intentar realizar un seguimiento a él mismo, quiere decir que otro proceso ya esté realizando el seguimiento (el depurador, por ejemplo). Veamos el ejemplo en práctica:

```bash
$ gdb trace
(gdb) r
Starting program: trace
alguien está depurando
[Inferior 1 (process 17027) exited normally]
(gdb)

```

Como se vé, el ejecutable termina ántes de llegar a ejecutar siquiera la función `main()`.

#### Referencias

*exploit-db.com* »» <a href="http://www.exploit-db.com/papers/13234/" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/lenguaje-c/jugando-con-la-seccion-dtors-de-la-tabla-de-secciones-en-c/ "Jugando con las secciones .dtors y .ctors de la tabla de secciones en C"


</stdio.h>