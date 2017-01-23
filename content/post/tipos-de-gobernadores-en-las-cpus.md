---
author: alex
categories:
- android
- aplicaciones
color: '#2196F3'
date: '2016-01-01'
description: "Para los que teng\xE1is vuestro terminal rooteado voy a hablar en estos
  d\xEDas de dos aplicaciones que pueden ayudarnos a extender el tiempo de vida de
  la bater\xEDa. Pero antes de escribir estos peque\xF1os manuales de configuraci\xF3n
  de las aplicaciones (que son SetCPU y CPU Tunner), tengo que introducir un concepto
  de los microprocesadores llamado gobernadores (governors):"
image: Tipos-de-gobernadores-en-las-CPUs.jpg
lastmod: 2016-08-11
layout: post.amp
mainclass: linux
url: /tipos-de-gobernadores-en-las-cpus/
tags:
- curso android pdf
- que es cpu conservative
- samsung galaxy scl gti9003
title: Tipos de gobernadores en las CPUs
---

Para los que tengáis vuestro terminal [rooteado][1] voy a hablar en estos días de dos aplicaciones que pueden ayudarnos a extender el tiempo de vida de la batería. Pero antes de escribir estos pequeños manuales de configuración de las aplicaciones (que son SetCPU y CPU Tunner), tengo que introducir un concepto de los microprocesadores llamado gobernadores (governors):

Lo que hacen los gobernadores es definir unas reglas de cambio de frecuencias en el micro, ya sea una velocidad de reloj mayor o menor, y cuando han de cambiarse estas frecuencias.

El gobernador define las características de energía de la CPU del sistema que a su vez afectan el rendimiento de la CPU. Cada gobernador tiene su propia conducta, propósito e idoneidad en términos de carga de trabajo.

<!--more--><!--ad-->

La frecuencia a la que una CPU puede operar viene limitada por su diseño. A menudo, una CPU solo puede funcionar en un número determinado de frecuencias discretas. Por ejemplo en mi Galaxy S son cuatro frecuencias (300mHz, 600mHz, 800mHz y 1000mHz). También, los valores de los parametros **scaling\_max\_freq y scaling\_min\_freq** se fijan por defecto a las frecuencias máximas y mínimas disponibles en la CPU. Para elegir bien un gobernador, tenemos que tener en cuenta la carga de trabajo a la que se va a someter a la CPU. A continuación voy a explicar por encima la función de cada gobernador:

- ***Performance:*** En este gobernanor solo se considera el rendimiento, fuerza a la CPU a ejecutarse en la frecuencia más alta (**scaling\_max\_freq**).
- ***ondemand:*** La principal consideración es la adaptación a la carga actual. Comprueba la carga regularmente, cuando ésta sobrepasa el umbral máximo (**up_threshold**) la CPU se ejecuta a la frecuencia máxima. Cuando la carga cae por debajo del umbral, se ajusta la frecuencia de la CPU a la siguiente más baja. Este gobernador causa menos latencia que el conservative.
- ***conservative:***La princpial consideración es la adaptación más cercana a la carga actual. Al igual que el gobernador Ondemand, el gobernador Conservative ajusta la frecuencia de reloj según el uso. Sin embargo, mientras el gobernador Ondemand lo hace de una manera agresiva (es decir, desde lo máximo a lo mínimo y viceversa), el gobernador Conservative cambia de frecuencias gradualmente. El gobernador Conservative se ajustará a una frecuencia de reloj que estime correcta para la carga, en lugar de elegir simplemente entre máxima y mínima, es decir, cuando la carga supera el umbral máximo (**up_threshold**), se ajusta la frecuencia de la CPU a la siguiente más alta. Cuando la carga cae por debajo del umbral (**down_threshold**) se ajusta la frecuencia a la siguiente más baja. Aunque esto podría proporcionar un significativo ahorro en consumo de energía, lo hace siempre a una latencia mayor que la del gobernador Ondemand.
- ***userspace:*** Se deja el control a los programas en el espacio del usuario. Se ajusta la frecuencia al valor especificado por el programa en el espacio de usuario (mediante el uso del parámetro **scaling_setspeed**). De todos lo gobernadores, Userspace es el más adaptable; y dependiendo de cómo se configure, puede ofrecer el mejor balance entre rendimiento y consumo para su sistema.

Fuentes: <a target="_blank" href="http://publib.boulder.ibm.com/infocenter/lnxinfo/v3r0m0/index.jsp?topic=%2Fliaai%2Fcpufreq%2FUnderstandingCPUFreqSubsystem.htm">publib.boulder.ibm.com</a> y <a target="_blank" href="http://docs.fedoraproject.org/es-ES/Fedora/14/html/Power_Management_Guide/cpufreq_governors.html#governor_types">docs.fedoraproject.org</a>

 [1]: https://elbauldelprogramador.com/rootear-samsung-galaxy-s-gt-i9003
