---
author: alex
categories:
- android
color: '#689F38'
date: '2016-09-25'
layout: post.amp
mainclass: android
permalink: /como-usar-adecuadamente-el-log-de-android-en-tus-aplicaciones/
tags:
- como usar log android
- log android
- logging android
title: "C\xF3mo usar adecuadamente el Log de Android en tus aplicaciones"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/android2.png" alt="Cómo usar adecuadamente el Log de Android en tus aplicaciones" width="132px" height="154px" />

Es posible que durante el desarrollo de una aplicación [Android][1], surja la duda de qué nivel de Log se debe usar, qué cosas se deben loggear y cuales no. En la documentación de Android se trata este tema, el cual traduzco para ponerlo a disposición de todos.

<!--more--><!--ad-->

## Usa el log económicamente

Aunque el *logging* es necesario, tiene un impacto negativo significante en el rendimiento y pierde rápidamente su utilidad si no se mantiene razonablemente breve. La herramienta de *logging* de Android proporciona cinco niveles distintos para el log. A continuación se describe cada uno y se explica brevemente cómo y cuando deberían usarse:

  * **ERROR:** Este nivel de *logging* debe usarse cuando haya ocurrido algo fatal, por ejemplo, algo que tendrá consecuencias visibles para el usuario y que no se podrá recuperar sin eliminar explícitamente algunos datos, desinstalar aplicaciones, borrando las particiones de datos o reseteando el dispositivo por completo. Este nivel se loggea siempre. Los problemas que jusifiquen mostrar un log con este nivel son típicamente buenos candidatos para ser recolectados por un servidor de recopilación de estadísticas (*statistics-gathering server*).
  * **WARNING:** Este nivel de *logging* debe usarse cuando haya pasado algo serio e inesperado, por ejemplo, algo que tendrá consecuencias visibles para el usuario pero es probable que pueda recuperarse sin implicar la pérdida de datos realizando alguna acción explícita, oscilando entre esperar o reiniciar la aplicación por completo descargándola para reinstalarla, o reiniciar el dispositivo. Este nivel se loggea siempre. Igual que el nivel anterior, los problemas que impliquen registrar un **WARNING** son candidatos a ser reportados a un *statistics-gathering server*.
  * **INFORMATIVE:**Este nivel de *logging* debe usarse para indicar que ha pasado algo que puede resultar interesante a la mayoría de la gente, por ejemplo, cuando se detecta una situación que probablemente tenga un amplio impacto, aunque no es necesariamente un error. Esta condición debe ser loggeada sólo por un módulo que sea el considerado más apropiado en ese dominio (Para evitar registrar más de una vez el evento por componentes no autoritativos). Este nivel se loggea siempre.
  * **DEBUG:** Este nivel de log debe usarse para dar a conocer qué eventos están ocurriendo en el dispositivo que puedan ser relevantes para investigar y [depurar][2] comportamientos de la aplicación inesperados. Se debe loggear únicamente lo necesario para obtener la información suficiente sobre qué está pasando. Si los mensajes de log de en este nivel inundan el log, es probable que deban usarse en el nivel **VERBOSE**.
    Este nivel será loggeado, incluso en las versiones definitivas de la aplicación. Es necesario que estén en un bloque condicional del tipo `if(LOCAL_LOG)` o `if(LOCAL_LOGD)`. Donde `LOCAL_LOG[D]` se define en una clase o [sub-componente][3], para que exista la posibilidad de desactivar todos los mensajes de log en este nivel, por tanto, dentro de éstos bloques no puede haber ninguna lógica del programa, solo los mensajes de log.

  * **VERBOSE:** Este nivel de *logging* debe usarse para cualquier otra cosa. Solo se mostrará en las aplicaciones destinadas a depuración y debe estar dentro de un bloque `if(LOCAL_LOGV)` para permitir su desactivación.

#### Referencias

*Code Style* »» <a href="http://source.android.com/source/code-style.html#log-sparingly" target="_blank">source.android.com</a>



 [1]: https://elbauldelprogramador.com/curso-programacion-android/ "Android"
 [2]: https://elbauldelprogramador.com/?s=depurar&submit;=
 [3]: https://elbauldelprogramador.com/fundamentos-programacion-android/ "Fundamentos programación Android: Conceptos básicos y componentes"