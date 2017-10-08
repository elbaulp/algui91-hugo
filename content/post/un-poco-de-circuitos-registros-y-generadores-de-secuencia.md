---
author: alex
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-10-08T19:29:04+01:00
url: /un-poco-de-circuitos-registros-y-generadores-de-secuencia/
title: "Un poco de circuitos, regístros y generadores de secuencia"
---

Repasando hoy para un examen que tengo próximamente de TOC (Tecnología y Organización de Computadores) se me ha ocurrido grabar algunos de los ejercícios que estaba haciendo por si le son de interés a alguien.

El primero de ellos es un regístro que almacena 4 bits mediante biestables. El funcionamiento es el siguiente:

- <a href="https://www.youtube.com/watch?v=JGRZNUv_QdA" target="_blank" title="Registro de 4 bits">Registro de 4 bits</a>

Dependiendo del valor de las entradas Y1 e Y0 que aparecen en la izquierda, se realizan estas operaciones:

- 00: Rotación de los valores hacia la derecha.
- 01: Carga los valores que aparecen arriba síncronamente y en paralelo.
- 10: Rotación de los valores hacia la izquierda.
- 11: No hace nada, mantiene los valores tal y como están.

Antes de nada decir que es el primer vídeo que edito y no ha salido demasiado bien, pido disculpas.

El otro es un generador que secuencia cíclicamente la salida 3, 6, 7.

<a href="https://www.youtube.com/watch?v=CFVz1h_AxHg" target="_blank" title="Ver generador de secuéncias">Generador de secuencias</a>
