---
author: alex
categories:
- security now
color: '#00BCD4'
date: 2016-07-05 20:09:47
description: "Hace tiempo que hablamos aquí sobre lo que es un Buffer Overflow
  y cómo aprovecharnos de ellos para tomar control del sistema. Pues bien, Intel
  se propone acabar con este tipo tan común de vulnerabilidad en sus nuevos procesadores"
image: ComoIntelVaaAcabarConLosBuffersOverflowsConControl-FlowEnforcementTechnologyCET.png
introduction: "Hace tiempo que hablamos aquí sobre lo que es un Buffer Overflow
  y cómo aprovecharnos de ellos para tomar control del sistema. Pues bien, Intel
  se propone acabar con este tipo tan común de vulnerabilidad en sus nuevos procesadores"

mainclass: security-now
modified: null
url: /intel-buffer-overflow-control-flow-enforcement-technology-cet/
tags:
- security now
- Intel
- seguridad
- CET intel
- shadow stack intel
- que shadow stack intel
- endbranch intel
- instruccion ENDBRANCH
- que es un buffer overflow
title: "Cómo Intel Va a Acabar Con Los Buffers Overflows Con Control-Flow Enforcement Technology (CET)"
---

Hace tiempo que hablamos aquí sobre lo que es un [Buffer Overflow](/explotacion-buffers-overflows-y-exploits-parte-i/ "Explotación – Buffers OverFlows y exploits") y cómo aprovecharnos de ellos para tomar control del sistema. Pues bien, Intel se propone acabar con este tipo tan común de vulnerabilidad en sus nuevos procesadores.

> Este artículo está basado en el episodio #565 de Security Now!, _Control-Flow Enforcement Technology (CET)_, puedes ver todos los artículos traducidos en la página [security now!](/security-now/ "Página de episodios traducidos").

<!--more--><!--ad-->

# Cómo pretende Intel acabar con los buffers overflows

Básicamente Intel añadirá una nueva instrucción a sus procesadores, llamada __ENDBRANCH__ y una nueva funcionalidad llamada __Shadow stack__, que podría traducirse como pila oculta. Antes de meternos de lleno a describir ambas novedades, analicemos el problema.

# Un poco de historia

El problema con la programación orientada al retorno (_return oriented-programming_) es que la gente inteligente ideó una forma de conseguir ejecutar código que ya tenía privilegios de ejecución. A lo largo de los años se ha producido una batalla entre gente intentando explotar programas y las compañías intentando idear métodos que lo impidieran.

La primera medida de prevención fue el bit __NX__ (_No-eXecute bit_), este bit se añadió a los sistemas para evitar los problemas mencionados en el párrafo anterior, que consistía en proporcionar datos al sistema y conseguir que esos datos se ejecutaran. Es decir, en estos sistemas no se diferenciaba lo que era código para ejecutar y lo que eran los datos, por lo que si conseguías que el procesador ejecutara unos datos cuidadosamente proporcionados... te hacías con el sistema. En la arquitectura Von Neuman clásica, los datos e instrucciones comparten el mismo espacio.

## Instrucción NX

Como hemos mencionado, esta compartición de espacio entre datos e instrucciones tenía el siguiente problema: Si consigues que el procesador ejecute una instrucción de salto (_jump_ ) a esa zona de datos que contiene intencionadamente instrucciones, el procesador las ejecutará. En orden de prevenir este tipo de ataques se creó la el bit __NX__, una bandera o flag que se añadió al hardware que especifica qué región de memoria no puede ejecutarse. De esta forma, si alguien introduce datos y mediante una instrucción _jmp_ salta a ellos, el procesador no ejecutará las intrucciones en esos datos porque están marcados con el flag __NX__. Pero como siempre, la gente es muy lista.

## Cómo saltarse la protección del bit NX

Ya que esta protección estaba activada, los hackers idearon otra forma de saltarsela, intentar desactivar el bit saltando a alguna región de memoria que sea de ejecución y tenga la llamada al sistema que desactiva el bit __NX__, normalmente saltaban a una subrutina del kernel, y sobre-escribían la dirección de retorno para saltar a la parte donde reside el código que ellos quieren ejecutar. De este modo ya volvían a poder ejecutar lo que quisieran en la región de datos. ¿Cual fue la contramedida de Intel en ese entonces?  _ASLR_ (_Address Space Layout Randomization_)

## Qué es ASLR (Address Space Layout Randomization)

Para prevenir los ataques del tipo anterior, Intel ideo otra solución, aleatorizar la distribución del espacio en el que se reparte el código ejecutable del sistema operativo. Sin embargo, debido al diseño de la arquitectura, no tenían mucho espacio de donde aleatorizar, normalmente disponían solo de 8 bits, es decir 256 posibles localizaciones en memoria. 256 opciones no son muchas, así que los malos podían simplemente probar suerte, fallarían 255 de cada 256 veces, pero acertarían 1 de cada 256, una baja probabilidad de acierto, pero mejor que 0.

### Mi ordenador se ha quedado colgado por alguna misteriosa razón...

Seguro que alguna vez os ha pasado, el ordenador se queda colgado, os aparece una pantallazo azul... y simplemente habéis reiniciado y todo parece estar correcto, pues bien, esto fruto de alguien probando suerte en vuestro sistema, y fallando una de esas 255 veces que puede equivocarse “probando suerte” intentando hacerse con vuestro PC.

# La nueva instrucción ENDBRANCH de Intel

Despues de este pequeño repaso por la historia de las vulnerabilidades, vamos a describir la nueva instrucción que Intel ha creado para acabar con los _Buffers Overflows_.

Su funcionamiento es simple, __ENDBRANCH__ es el único destino válido de una instrucción `call` o `jump`. Es decir, el principio de cada subrutina debe empezar con la instrucción __ENDBRANCH__. Lo elegante de este diseño, es que los procesadores tienen un [Instruction Pipeline](https://en.wikipedia.org/wiki/Instruction_pipelining), y conforme el procesador va leyendo instrucciones que tiene que ejecutar y encuentra una instrucción `call` o `jump` (Recuerda que estas intrucciones tiene que aterrizar en un __ENDBRANCH__), la instrucción inmediatamente siguiente que va a coger el pipeline debe ser un __ENDBRANCH__. Por tanto, como esto debe de ser inmutable, Intel sabe que tras una instrucción `call` o `jump` la siguiente debe ser __ENDBRANCH__, así que Intel ha añadido un pequeño autómata finito que comprueba que esto es cierto, de no ser así, lanza una excepción y aborta el proceso.

Con esta simple mejora, se acaba el problema de sobre-escribir la dirección de retorno de una función para permitir al atacante saltar a una porción de codigo que él controla. Al obligar a que la instrucción __ENDBRANCH__ sea la primera instrucción de todas las subrutinas, define un único punto de entrada válido. Cualquier intento de saltar a la mitad o al final de una función es imposible, ya que el proceso se abortará.

# La pila (Stack) y la nueva funcionalidad de Intel, Shadow Stack

Todos estamos familiarizados con el concepto de [Pila (Stack)](https://es.wikipedia.org/wiki/Pila_(inform%C3%A1tica) "Definición de Pila") esa estructura de datos que permite introducir datos y sacar datos. Cuando se inventó en su día, de repente permitía hacer llamadas recursivas, lo cual hasta el momento no podía hacerse. Pero el problema con la pila viene a ser el mismo de antes, se comparten instrucciones y datos. Cuando se llama a un método, con unos parámetros, se introduce en la pila la dirección de retorno y los parámetros de la función, si los tuviera. He aquí el problema, es un claro objetivo para un ataque _buffer overflow_. En la pila se reserva un espacio para variables de tamaño variable (Valga la redundancia), si no se usa correctamente y no se hacen comprobaciones del tamaño de lo que se intenta guardar en una variable, se corre el riesgo de que alguien mal intencionado desborde la capacidad de esa variable y consiga sobre-escribir la dirección de retorno de la pila. Ya sabemos qué puede pasar cuando alguien sobr escribe la dirección de retorno, pueden saltar a donde quiera y tomar el control.

Para resolver este problema Intel ha diseñado la llamada _Shadow Stack_ o pila oculta. Es una pila a la que el desarrollador no tiene acceso, y mantiene una copia de los parámetros de la pila normal, como dirección de retorno etc, pero nada de datos. Cuando el programador modifica la pila, lo hace en la normal, a la que tiene acceso. Y aquí reside la fortaleza del _Shadow Stack_, al no tener acceso, cuando el sistema mira la dirección de retorno, si esta dirección no coincide en ambas pilas, alguien ha modificado la dirección de retorno en la pila normal y el proceso se aborta. Y así, Intel ha puesto fin a años de vulnerabilidades debidas al simple hecho de no comprobar que el tamaño de los datos que intentamos guardar en una variable, no cabe en el espacio que tienen reservado. Una obra maestra.

Además, no implica ningun decremento en el rendimiento del sistema, ya que está implementado en hardware, es problema de Intel añadir los transictores necesarios a sus procesadores para que esto funcione.

# Conclusión

Me ha parecido un tema muy interesante y quería compartirlo con vosotros, espero que también os haya gustado. Dejanos un comentario para hacernos llegar tu opinión!

### Referencias

- Security Now 565 Control-Flow Enforcement Technology (CET) \| [twit.tv](https://twit.tv/shows/security-now/episodes/565 "Security Now 565
Control-Flow Enforcement Technology (CET)")
- Episodio en Youtube \| [Youtube.com](https://www.youtube.com/watch?v=W3AdFoJ8lCs "Security Now 565
Control-Flow Enforcement Technology (CET)")
