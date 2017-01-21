---
author: alex
categories:
- c
- hacking
color: '#E64A19'
layout: post.amp
mainclass: dev
permalink: /desafio-de-ingenieria-inversa-en-c/
tags:
- asm
- Ingenieria inversa
title: "Desaf\xEDo de ingenier\xEDa inversa en C"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/logicbomb1.png" alt="" title="Bomba" width="532px" height="449px" />

#### Puedes encontrar la solución a esta práctica en [Desafío de ingeniería inversa en C - Soluciones][1] {.alert}

En la asignatura Estructura de Computadores de mi facultad, estamos haciendo una práctica que consiste en coger un ejecutable que haya compilado otro alumno, el cual pide una contraseña alfanumérica y otra numérica. Dicho ejecutable está compilado sin opción de depuración, es decir:

```bash
gcc -m32 -O<n> Bomba.c -o bomba
```

Donde n es el nivel de optimización desado, en la práctica solo se permite hasta nivel 2. Como habŕas deducido del nombre del ejecutable, se trata de desactivar una bomba. Para lograr este objetivo, es necesario introducir correctamente ambas contraseñas y hacerlo en un periodo de tiempo limitado.

La tarea consiste en aplicar ingeniería inversa usando herramientas como objdump y gdb.

Ambas contraseñas pueden estar ocultas, es decir, haciendo operaciones de suma y resta a la contraseña para cambiar su valor y que no sea visible directamente mientras se depura el programa o haciendo uso de un editor hexadecimal como bless. La forma de ocultarlas queda a elección de cada uno, eso sí, está prohibido usar algoritmos de cifrado.

Hoy con esta entrada te animo a que intentes descubrir las contraseñas de mi programa. Cualquier comentario que publique la contraseña será moderado hasta que termine el plazo de la práctica de clase, por razones obvias ;-).

Cuando finalice este plazo, publicaré el código fuente y todos los comentarios, junto con alguna explicación de los programas que haya conseguido descifrar.

Todo aquel que quiera intentarlo, puede descargar el ejecutable de esta dirección: [https://dl.dropbox.com/u/54765219/Bomba\_El\_Baul\_del\_Programador][3]



 [1]: https://elbauldelprogramador.com/desafio-de-ingenieria-inversa-en-c-soluciones/
 [3]: https://dl.dropbox.com/u/54765219/Bomba_El_Baul_del_Programador