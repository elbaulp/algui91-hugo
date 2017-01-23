---
author: alex
categories:
- procesos
- so
color: '#F57C00'
date: '2016-01-01'
lastmod: 2016-09-02
layout: post.amp
mainclass: articulos
url: /introduccion-los-procesos/
title: "Introducci\xF3n a los Procesos"
---

## 1 . Concepto

El proceso se puede definir como un programa en ejecución y, de una forma más precisa, como la unidad de procesamiento gestionada por el sistema operativo. Todos los programas cuya ejecución solicitan los usuarios lo hacen en forma de procesos, de ahí la importancia de conocerlos en detalle.

<!--more--><!--ad-->

## 1.2 . Composición y estructura

El sistema operativo mantiene una tabla de procesos, dentro de la que se alamacena un **bloque de control de proceso (BCP)** por cada proceso. Por razones de eficiencia, la tabla de procesos se contruye normalmente como una estructura estática que tiene un determinado número de BCP, todos ellos del mismo tamaño.

El BCP contiene la información básica del proceso:

- **Información de indentificación:** Esta información indentifica al usuario y al proceso. Como ejemplo, se incluyen los siguientes datos:
  - Identificador del proceso.
  - Identificador del proceso padre en caso de existir relaciones padre-hijo como es el caso de UNIX.
  - Información sobre el usuario (identificador del usuario, identificador del grupo).
- **Estado del procesador:** Contiene los valores iniciales del estado del procesador o su valor en el instante en que fue interrumpido el proceso.
- **Información de control del proceso:** En esta sección se incluye diversa información que permite gestionar el proceso. Destacaremos los siguientes datos:
  - Información de planificación y estado:
  - Estado del proceso.
  - Evento por el que espera el proceso cuando está bloqueado.
  - Prioridad del proceso.
  - Información de planificación.
  - Descripción de los segmentos de memoria asignados al proceso.
  - Recursos asignados, tales como:
  - Archivos abiertos (tablas de descriptores o manejadores de archivo).
  - Puertos de comunicación asignados
- **Punteros** para estructurar los procesos en colas o anillos: Por ejemplo, los procesos que están en estado de listo pueden estar organizados en una cola, de forma que se facilite la labor del planificador.
- **Comunicación entre procesos:** El BCP puede contener espacio para almacenar las señales y para algún mensaje enviado al proceso.

## 1.3 . Estados y transiciones

Un proceso puede encontrarse en tres estados diferentes:

- **En ejecución:** En este estado se encuentra el proceso que está siendo ejecutado por el procesador. El estado del procesador residirá en los registros del procesador.
- **Bloqueado:** Un proceso bloqueado está esperando a que ocurra un evento y no puede seguir ejecutandose hasta que termine el eventol. Una situación típica de proceso bloqueado se produce cuando el proceso solicita una operación E/S (Entrada / Salida). Hasta que no termina esta operación, el proceso queda bloqueado. En este estado el proceso reside en BCP.
- **Listo:** Un proceso está listo para ejecutar cuando puede entrar en fase de procesamiento. Dado que puede haber varios procesos en este estado, una de las tareas del sistema operativo será seleccionar aquel que debe pasar a ejecución. El módulo del SO que toma esta decisión se denomina **planificador.** En este estado el proceso reside en BCP.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Estado Procesos" title="Estado de los procesos"  height="267" width="445" src="https://4.bp.blogspot.com/-BOayf2Lle4g/TVg7VxeOZII/AAAAAAAAAW0/O6u9ZEGonWg/s800/estados.png"></amp-img>
</figure>

La **transición** entre cada uno de los tres estados puede hacerse de la siguiente manera:

- **Transición 1.** Ocurre cuando el programa que está en ejecución necesita algún elemento, señal, datos etc, para poder continuar ejecutandose.
- **Transición 2.** Cuando un programa o proceso ha utilizado el tiempo asignado por la CPU (procesador) para su ejecución y tiene que dejar paso al siguiente proceso.
- **Transición 3.** Cuando el proceso que está listo pasa al estado de ejecución; es decir, cuando al proceso le llega una nueva disposición del tiempo de la CPU para poder ejecutarse.
- **Transición 4.** Cuando el proceso pasa de estar bloqueado a estar listo, es decir, cuando el proceso recibe una orden o señal que estaba esperando para pasar al estado de listo y posteriormente, tras la transición 3, pasar a ejecución.

## Características

Las características principales de los procesos son:

- Una característica fundamental de los procesos concurrentes es la competencia que se establece entre ellos cuando han de compartir recursos.
- Cooperación, cuando dos o más procesos se están llevando a cabo de manera que uno depende del otro es necesario que exista una cooperación entre ambos.
- Se pueden formar familias de procesos según sean o no interdependientes.
- Una operación que sufren los procesos usualmente es el **cambio de contexto**, que consiste en retirar el control de la CPU del proceso actual, y asignarla a otro proceso.
- Los sistemas operativos deben proporcionar alguna forma de crear y destruir los procesos. Cada proceso tiene un padre y cero o más hijos. Así, existe una jerarquía de procesos que se puede representar en forma de árbol.
