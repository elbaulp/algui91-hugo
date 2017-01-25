---
author: alex
categories:
- articulos
color: '#F57C00'
date: '2016-01-01'

mainclass: articulos
url: /dejes-que-los-astronautas-de-arquitecturas-te-asusten/
title: No dejes que los Astronautas de Arquitecturas te asusten
---

> Encontrar las confusas líneas divisorias entre lo **ideal**, lo **viable** y lo **inaceptable** es un dilema siempre vigente en el diseño y desarrollo de sistemas.
>
> Este texto me hizo reflexionar mucho sobre el tema, más que nada porque en general yo disiento con el autor, por lo tanto me replanteé y revalué mis razones y argumentos. Considero de todas formas que son **necesarios** los distintos puntos de vista a la hora de tomar decisiones, y que en el momento de poner en marcha un proyecto es bueno tener premeditadas estas cuestiones ya que influirán en las diferentes etapas del desarrollo.
>
> Por último, creo que siempre la mejor decisión es la que se ajusta a la situación particular. Las generalizaciones sólo sirven para orientarnos en el análisis. *Luzcila*

Cuando grandes pensadores piensan en problemas, empiezan a ver patrones. Miran el problema de la gente enviándose entre ellos archivos de procesador de texto, luego miran el problema de la gente enviándose hojas de cálculo, y descubren que hay un patrón general: *envío de archivos*. Ese ya es un nivel de abstracción. Entonces suben un nivel más: la gente envía archivos, pero los navegadores web también “envían” peticiones para las páginas web. Y cuando piensas en ésto, llamar a un método sobre un objeto ¡es como enviar un mensaje a un objeto! ¡Es lo mismo otra vez! Esas cosas son todas operaciones de envío, por lo tanto nuestros inteligentes pensadores inventan una nueva, más alta y más amplia abstracción llamada mensajería, pero ahora está volviéndose vaga y ya nadie sabe realmente de qué están hablando. Blah.

<!--more--><!--ad-->

Cuando vas un poco más allá, siguiendo la abstracción, te quedas sin oxígeno. A veces pensadores inteligentes simplemente no saben cuándo parar, y crean estos absurdos, ampliamente abarcativos, gráficos universales de alto nivel que son correctos y buenos, pero realmente no significan nada en absoluto.

Esta es la gente a la que yo llamo Astronautas de Arquitectura. Es muy difícil conseguir que escriban código o diseñen programas, ya que no dejarán de pensar en la Arquitectura. Ellos son astronautas porque están por arriba del nivel de oxígeno, no se cómo están respirando. Pretenden trabajar para compañías realmente grandes que puedan permitirse tener gran cantidad de gente improductiva con conocimientos académicos realmente avanzados que no contribuyan a la línea base.

Un ejemplo ilustra esto: Tu típico Astronauta de arquitectura tomará un hecho como “Napster es un servicio punto a punto (peer-to-peer, o [P2P][1]) para descargar música” e ignorará todo excepto la arquitectura, pensando que es interesante porque es P2P, perdiendo completamente el punto de que realmente es interesante porque puedes tipear el nombre de una canción y escucharla en el momento.

Todo lo que dicen es peer-to-peer esto, lo otro, y el resto. De repente tienes conferencias sobre P2P, fundaciones fondos del capital de riesgo para P2P, e incluso enfrentamientos sobre P2P con imbéciles reporteros empresariales que están más que satisfechos mientras se copian sus historias: “Punto-a-punto: ¡Muerte!

Los Astronautas de Arquitectura dirán cosas como “*¿Podrías imaginar un programa como Napster donde puedas descargar cualquier cosa, no solo canciones?*”. Entonces construirán aplicaciones como Groove, que piensan que son más general que Napster, pero las cuales parecen haber descuidado (o incluso olvidado) aquella pequeña característica que te permite tipear el nombre de una canción y luego escucharla &#8212; la característica que queríamos en primer lugar. Hablando de perder el punto… Si Napster no fuera P2P pero SI te permitiese tipear el nombre de una canción y luego escucharla, hubiese sido igual de popular.

Otra cosa que les suele gustar hacer a los Astronautas de arquitectura es inventar una nueva arquitectura y decir que soluciona algo. Java, XML, Soap, XmlRpc, Hailstorm, .NET, Jini… oh dios, no lo puedo soportar. ¡Y eso sólo en los últimos 12 meses!
No estoy diciendo nada malo de esas arquitecturas… Son definitivamente buenas arquitecturas. Lo que me molesta es la estupenda cantidad de espectativas milenarias que las rodean. ¿Recuerdas el white paper de Microsoft Dot Net?

> *La próxima generación de la plataforma de escritorio Windows, Windows.NET provee productividad, creatividad, administración, entretenimiento y mucho más, y está diseñada para que los usuarios tomen control de sus vidas digitales.*

Eso fue hace 9 meses. El mes pasado, salió Microsoft Hailstorm. Ese paper dice:

> *La gente no tiene el control de la tecnología que la rodea… HailStorm hace que la tecnología en tu vida trabaje en conjunto para vos y bajo tu control.*

Oh, dios, entonces ahora la lámpara halógena de alta tecnología de mi departamento dejará de parpadear aleatoriamente.

Y no es sólo Microsoft. Aquí hay un fragmento del whitepaper de Sun Jini:

> *Estos tres hechos (eres el nuevo sys admin, las computadoras no están en ningún lado, la única computadora está en todos lados) deberían combinarse para mejorar el mundo del uso de las computadoras como computadoras &#8212; haciendo desaparecer los límites de las computadoras, haciendo que la computadora esté en todos lados, y haciendo que los detalles de trabajar con la computadora sean tan simples como poner un DVD dentro de tu sistema de home theater.*

Y no me recuerdes de lo que el fertilizador George Gilder difundió sobre Java:

> *Un quiebre fundamental en la historia de la tecnología…*

Hay una advertencia segura sobre el hecho de que estés siendo víctima de un Astronauta de Arquitectura: la increíble cantidad de rimbombancia; la heroica y utópica grandilocuencia; la fanfarronería; la completa falta de realidad. ¡Y la gente lo compra! ¡El periodismo económico se expande!
¿Por qué carajo la gente se sorprende tanto con arquitecturas aburridas que generalmente son un montón de nada más que un nuevo formato derivado del RPC, o una nueva máquina virtual? Estas cosas que podrían ser buenas arquitecturas, seguramente benefician a los desarrolladores que las usan, pero NO son, repito NO son un buen sustituto para que el mesías lleve su blanco trasero a Jerusalem, o la paz mundial. No, Microsoft, las computadoras no van a empezar a leer nuestras mentes de repente y hacer lo que nosotros queramos automáticamente sólo porque todos en el mundo tienen una cuenta Passport. No, Sun, no vamos a tener la posibilidad de analizar nuestros datos de ventas corporativas de forma “tan simple como poner un DVD dentro del sistema de home theatre”.

Recuerda que los arquitectos resuelven problemas que ellos piensan que pueden resolver, no problemas que son útiles de resolver. Soap + WDSL pueden ser un Hot New Thing, pero no te permite realmente hacer cualquier cosa que no hayas podido antes usando otras tecnologías &#8212; si hubieses tenido una razón. Todos los Servicios Distribuidos Nirvana con que los arquitectos astronautas se enriedan nos fueron prometidos en el pasado, si usábamos DCOM, o JavaBeans, o OSF DCE, o CORBA.

Es bueno que podamos utilizar XML ahora para los formatos por cable. Estupendo. Pero esto es tan interesante para mí como aprender que el supermercado utiliza camiones para obtener cosas del depósito. Aburrido. Mangos, eso es interesante. Dime algo nuevo que pueda hacer que no podía antes, o Astronautas, esperen en el espacio y no gasten mi tiempo nunca más.

### Referencias

*Joel on Software* »» <a href="http://www.joelonsoftware.com/articles/fog0000000018.html" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/bittorrent-sync-tus-archivos-sincronizados-sin-intermediarios/ "BitTorrent Sync: Tus archivos sincronizados sin intermediarios"
