---
author: alex
categories:
- c
color: '#E64A19'
layout: post.amp
mainclass: dev
permalink: /jugando-con-la-seccion-dtors-de-la-tabla-de-secciones-en-c/
tags:
- .ctors y .dtors
- .init_array .fini_array
- ELF
- secciones C
title: Jugando con las secciones .dtors y .ctors de la tabla de secciones en C
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="https://lh4.ggpht.com/_IlK2pNFFgGM/TROxbBd0LMI/AAAAAAAAAOA/YQiMnAyp4EQ/text-x-c%2B%2Bsrc.png" class="alignleft" />
Los que me leéis habitualmente probablemente hayais visto los artículos que escribí sobre [ingeniería inversa en C][1], o [explotación de buffers overflows][2]. Son temas que me llaman la atención, hoy quiero hablaros de dos secciones de la tabla de secciones en C llamadas *.dtors* y *.ctors*, creada por los binarios compilados con el compilador de GNU.

Estas secciones se crean para los [destructores][3] y [constructores][4], respectivamente. Los constructores se llaman justo antes de ejecutar la función `main()` y los destructores se llaman justo antes de que `main()` finalize con la llamada al sistema `exit`.

Veamos un ejemplo para aclarar su funcionamiento:

<!--more--><!--ad-->

```c
#include <stdio.h>
#include <stdlib.h>

static void
miConstructor(void) __attribute__ ((constructor));
static void
miDestructor(void) __attribute__ ((destructor));

int
main(void) {
 printf("En main() \n");
    return EXIT_SUCCESS;
}

void
miConstructor(void) {
  printf("En el constructor\n");
}

void
miDestructor(void) {
    printf("En el destructor\n");
}

```

La salida de este programa será:

```bash
En el constructor
En main()
En el destructor

```

Al declarar `miConstructor` como constructor la función se llama antes de ejecutar `main`, lo mismo pasa para `miDescructor`, pero en este caso se la llamará justo antes de salir de `main`.

La forma de controrlar la ejecución de ambas funciones es mediante las secciones *.dtors* y *.ctors*. Estas secciones son un array de direcciones de 32 bits que terminan con una dirección nula (la dirección 0x00000000). Así se determina donde empieza y donde acaba el array. Parecido a lo que hice en el artículo [Ocultar archivos dentro de una imagen][5] donde delimité el nombre del archivo por un pixel en blanco para saber que había llegado al final del nombre. De modo que entre el inicio de la sección *.dtors* y *.ctors* y la dirección nula se encuentran las funciones declaradas como destructores o constructores, respectivamente.

Para localizar las funciones hay que usar el programa **nm**, y **objdump** para encontrar las dos secciones.

Sin embargo, mientras escribía este artículo [me dí cuenta de que ya no existen dichas secciones](http://stackoverflow.com/q/16569495/1612432 "Pregunta en stackoverflow"), han sido reemplazadas por *.init\_array/.fini\_array*. Del mismo modo pueden verse usando **nm**, y **objdump**. Empecemos con **nm**:

```bash
$ nm dtors
080495f0 d _DYNAMIC
080496e4 d _GLOBAL_OFFSET_TABLE_
080484dc R _IO_stdin_used
         w _ITM_deregisterTMCloneTable
         w _ITM_registerTMCloneTable
         w _Jv_RegisterClasses
080485d8 r __FRAME_END__
080495ec d __JCR_END__
080495ec d __JCR_LIST__
08049704 D __TMC_END__
08049704 A __bss_start
080496fc D __data_start
080483c0 t __do_global_dtors_aux
080495e4 t __do_global_dtors_aux_fini_array_entry
08049700 D __dso_handle
080495dc t __frame_dummy_init_array_entry
         w __gmon_start__
080484ba T __i686.get_pc_thunk.bx
080495e4 t __init_array_end
080495dc t __init_array_start
08048450 T __libc_csu_fini
08048460 T __libc_csu_init
         U __libc_start_main@@GLIBC_2.0
08049704 A _edata
08049708 A _end
080484c0 T _fini
080484d8 R _fp_hw
080482b8 T _init
08048320 T _start
08049704 b completed.5730
080496fc W data_start
08048350 t deregister_tm_clones
080483e0 t frame_dummy
0804840c T main
08048428 t miConstructor
0804843c t miDestructor
         U puts@@GLIBC_2.0
08048380 t register_tm_clones

```

En la salida se muestran como *_init* y *_fini*. También es posible obtener más información sobre las secciones de la tabla con **objdumb**:

```bash
$ objdump -h ./dtors

./dtors:     file format elf32-i386

Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .interp       00000013  08048134  08048134  00000134  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  1 .note.ABI-tag 00000020  08048148  08048148  00000148  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  2 .note.gnu.build-id 00000024  08048168  08048168  00000168  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  3 .hash         00000028  0804818c  0804818c  0000018c  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  4 .gnu.hash     00000020  080481b4  080481b4  000001b4  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  5 .dynsym       00000050  080481d4  080481d4  000001d4  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  6 .dynstr       0000004a  08048224  08048224  00000224  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  7 .gnu.version  0000000a  0804826e  0804826e  0000026e  2**1
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  8 .gnu.version_r 00000020  08048278  08048278  00000278  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  9 .rel.dyn      00000008  08048298  08048298  00000298  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
 10 .rel.plt      00000018  080482a0  080482a0  000002a0  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
 11 .init         00000026  080482b8  080482b8  000002b8  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
 12 .plt          00000040  080482e0  080482e0  000002e0  2**4
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
 13 .text         000001a0  08048320  08048320  00000320  2**4
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
 14 .fini         00000017  080484c0  080484c0  000004c0  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
 15 .rodata       00000036  080484d8  080484d8  000004d8  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
 16 .eh_frame_hdr 0000002c  08048510  08048510  00000510  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
 17 .eh_frame     000000a0  0804853c  0804853c  0000053c  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
 18 .init_array   00000008  080495dc  080495dc  000005dc  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 19 .fini_array   00000008  080495e4  080495e4  000005e4  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 20 .jcr          00000004  080495ec  080495ec  000005ec  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 21 .dynamic      000000f0  080495f0  080495f0  000005f0  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 22 .got          00000004  080496e0  080496e0  000006e0  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 23 .got.plt      00000018  080496e4  080496e4  000006e4  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 24 .data         00000008  080496fc  080496fc  000006fc  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 25 .bss          00000004  08049704  08049704  00000704  2**2
                  ALLOC
 26 .comment      00000038  00000000  00000000  00000704  2**0
                  CONTENTS, READONLY

```

El contenido que nos interesa es:

```bash
18 .init_array   00000008  080495dc  080495dc  000005dc  2**2
                  CONTENTS, ALLOC, LOAD, DATA
 19 .fini_array   00000008  080495e4  080495e4  000005e4  2**2
                  CONTENTS, ALLOC, LOAD, DATA

```

Esta vez hemos obtenido más información, sabemos que ambas secciones ocupan 8 Bytes y se puede escribir en ellas, ya que no tienen la etiqueta READONLY. Para examinar el contenido basta con ejecutar:

```c
$ objdump -s -j .fini_array ./dtors
Contents of section .fini_array:
 80495e4 c0830408 3c840408

```

La primera dirección apunta a la tabla de desplazamiento global (\_GLOBAL\_OFFSET\_TABLE\_) y la segunda a _\_do\_global\_dtors\_aux.
La última dirección (3c840408) corresponde con la dirección de la función `miDestructor`, pero en little-endian (0804843c). Al poder modificar dicha tabla, sería posible tomar el control del programa explotando alguna vulnerabilidad y obtener una shell con permisos de root. El propósito inicial del artículo era mostar cómo explotar dicha vulnerabilidad, pero al no existir la sección .ctors y .dtors no va a ser posible, ya que he estado trasteando un poco con estas secciones nuevas y no he conseguido nada.

Aún así, espero que os haya resultado útil para aprender sobre los constructores y destructores en C, y hayáis conocido un poco más a fondo la estructura de un ejecutable.

http://www.exploit-db.com/papers/13234/

#### Referencias

*Replace .ctors/.dtors with .init\_array/.fini\_array* »» <a href="http://gcc.gnu.org/bugzilla/show_bug.cgi?id=46770" target="_blank">gcc.gnu.org</a>
*Abusing .CTORS and .DTORS For FUN and PROFIT* »» <a href="http://www.exploit-db.com/papers/13234/" target="_blank">exploit-db.com</a>



 [1]: https://elbauldelprogramador.com/desafio-de-ingenieria-inversa-en-c-soluciones/ "Desafío de ingeniería inversa en C – Soluciones"
 [2]: https://elbauldelprogramador.com/explotacion-buffers-overflows-y-exploits-parte-i/ "Explotación – Buffers OverFlows y exploits (Parte I)"
 [3]: https://elbauldelprogramador.com/clases-y-objetos-el-destructor/
 [4]: https://elbauldelprogramador.com/clases-y-objetos-el-constructor/
 [5]: https://elbauldelprogramador.com/ocultar-archivos-y-otras-imagenes-dentro-de-una-imagen/ "Ocultar archivos dentro de una imagen"


</stdlib.h></stdio.h>
