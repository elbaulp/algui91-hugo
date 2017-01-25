---
author: alex
categories:
- administracion de servidores
- linux
color: '#0097A7'
date: '2016-01-01'

mainclass: servidores
url: /solucionar-fallo-de-segmentacion-en-php-cuando-se-usa-apc/
tags:
- "configuraci\xF3n apc"
- "fallo segmentaci\xF3n php"
- "par\xE1metros kernel"
- shmmax
- sysctl
title: "Solucionar fallo de segmentaci\xF3n en PHP cuando se usa APC"
---

Hace algún tiempo, el blog se caía de forma aleatoria y dejaba de funcionar. Tras investigar un poco descubrí que era PHP el que estaba causando el problema. En concreto ocurría un fallo de segmentación en PHP que no conseguía averiguar de dónde procedían. Buscando y buscando al final dí con el problema, en realidad lo que provocaba el problema no era PHP, si no una consecuencia de usar APC y el parámetro `apc.shm_size` junto con el parámetro del kernel `kernel.shmmax`. El propósito de este artículo es dejar constancia de cómo se solucionó el problema por si alguien se encontrara en la misma situación.

<!--more--><!--ad-->

### Para qué sirve el parámetro /proc/sys/kernel/shmmax

Según la documentación del kernel:

> shmmax:
>
> This value can be used to query and set the run time limit
> on the maximum shared memory segment size that can be created.
> Shared memory segments up to 1Gb are now supported in the
> kernel. This value defaults to SHMMAX.

Traducido:

> shmmax:
>
> Este valor puede usarse para consultar y establecer el límite máximo del segmento de memoria compartida que puede crearse. Se soportan segmentos de memoria compartida de hasta 1Gb. Su valor por defecto está definido por la constante SHMMAX.

### Para qué sirve el parámetro apc.shm_size

Según la documentación de APC:

> El tamaño de cada segmento de memoria compartida en MB. Por defecto, algunos sistemas (incluidos la mayoría de variantes de BSD) tienen límites muy bajos del tamaño de un segmento de memoria compartida.

Sabiendo para qué sirve cada parámetro, en un foro encontré la respuesta a la solución:

> From my Linux experience, this bug is caused only by one thing:
>
> Wrongly set SHM size in kernel and/or APC settings. With standard apc.shm_size = 30, i get segfault (11) every time i try to spawn php-cgi processes. But once i do the following:
>
> echo &#8220;512000000&#8221; > /proc/sys/kernel/shmmax
> set apc.shm_size = 64M
>
> Then the problem completely disappears. PHP with APC becomes ROCK-solid, and NEVER segfaults running 24/7.

Por tanto, incrementando el valor del parámetro `/proc/sys/kernel/shmmax` a un valor igual o mayor que el del parámetro `apc.shm_size` de APC soluciona el problema. Desde que apliqué este cambio no he vuelto a tener caídas en los procesos de PHP.

### Algunas notas a tener en cuenta

El parámetro del kernel se puede cambiar de varias formas, tal y como mencionaba el usuario del foro se cambia únicamente durante la sesión activa del Sistema Operativo, tras reiniciar el servidor se establecerá su valor por defecto (30Mb). Para hacer los cambios permanentes, debemos escribir el valor del parámetro en el fichero */etc/sysctl.conf* o en */etc/sysctl.d/99-sysctl.conf*.

Por ejemplo, para establecer el valor a 256 Mb escribiríamos al final de uno de estos archivos:

```bash
kernel.shmmax=268435456

```

Y luego cargamos el fichero para aplicar los cambios:

```bash
sysctl -p

```

Para comprobar que se actualizó el valor:

```bash
cat /proc/sys/kernel/shmmax
268435456

```

#### Referencias

*Créditos de la imagen* »» <a href="http://icons8.com/" target="_blank">icons8</a>
*APC causes PHP fast-cgi to segfault* »» <a href="https://bugs.php.net/bug.php?id=56894" target="_blank">bugs.php.net</a>
*Documentación Sysctl* »» <a href="https://www.kernel.org/doc/Documentation/sysctl/kernel.txt" target="_blank">kernel.org</a>
