---
author: alex
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-10-05T16:28:44+01:00
description: "Un equipo de investigadores del MIT, Caltech, Harvard, y otras universidades  Europeas, han ideado una forma de potenciar el rendimiento en redes inalámbricas  &#8212; sin aumentar la potencia de transmisión o añádir más estaciones  base. La creación de los investigadores, ***coded TCP,***, en lugar de enviar  paquetes simples, crea una ecuación que describe una serie de paquetes. Es una  forma nueva de transmitir datos de modo que los paquetes perdidios no aumenten la  latencia o re-envíen datos, ya que son la causa de que la red se congestione."
url: /investigadores-del-mit-usan-ecuaciones-algebraicas-para-mejorar-las-transmisiones-wifi-y-lte-coded-tcp/
image: 2012/10/Algebra-Packets-MIT1.jpg
title: "Investigadores del MIT usan ecuaciones algebráicas para mejorar las transmisiones WIFI y LTE con coded TCP"
---

<figure>
    <amp-img sizes="(min-width: 296px) 296px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" class="alignleft  wp-image-1001"  title="Algebra Packets MIT" src="/img/2012/10/Algebra-Packets-MIT1.jpg" alt="paquetes algebráicos MIT TCP" width="296px" height="370px" />
</figure>

Un equipo de investigadores del MIT, Caltech, Harvard, y otras universidades Europeas, han ideado una forma de potenciar el rendimiento en redes inalámbricas &#8212; sin aumentar la potencia de transmisión o añádir más estaciones base. La creación de los investigadores, ***coded TCP,***, en lugar de enviar paquetes simples, crea una ecuación que describe una serie de paquetes. Es una forma nueva de transmitir datos de modo que los paquetes perdidios no aumenten la latencia o re-envíen datos, ya que son la causa de que la red se congestione.

Un solo paquete perdido causa un aumento en la latencia &#8212; El receptor tiene que solicitar de nuevo el paquete, y no puede hacer nada hasta que lo recibe. Si hay una cantidad significante de paquetes perdidos, resulta en un aumento considerable de la latencia, mucho re-envio de datos, y poco ancho de banda.

En ***coded TCP,***, se agrupan bloques de paquetes y <a href="http://www.mit.edu/~medard/papers2011/Modeling%20Network%20Coded%20TCP.pdf" target="_blank">se transforman en ecuaciones algebráicas</a> (PDF), que describen los paquetes. Cuando se pierde una parte del mensaje, el receptor resuelve la ecuación para obtener los datos perdidos en lugar de solicitarlos al emisor. La resolución de la ecuación es simple y lineal, por lo que no requiere demasiado procesamiento por parte del router/smartphone/laptop. En las pruebas, **coded TCP** produjo mejoras notables. El MIT descubrió que la red WiFi del campus (con un 2% de paquetes perdidos), ascendió de 1Mbps a 16Mbps. En un tren de alta velocidad (con una perdida de paquetes del 5%), la velocidad de conexión aumentó de 0.5Mbps a 13.5Mbps.

En realidad, estas mejoras no son del todo sorprendentes. El protocolo TCP fue diseñado para redes cableadas, donde la pérdida de paquetes es generalmente un signo de congestión. La redes inalámbricas necesitan algún método para la corrección de errores en la recepción (Forward Error Correction [FEC]), y eso es exáctamente lo que **Codec TCP** proporciona.

En un futuro, se espera que el protocolo TCP codificado tenga una gran repercusión en el rendimiento de redes WIFI y LTE.

# Referencias

- *A Bandwidth Breakthrough* »» <a href="http://www.technologyreview.com/news/429722/a-bandwidth-breakthrough/" target="_blank">Visitar sitio</a>
- *Increasing wireless network speed by 1000%, by replacing packets with algebra* »» <a href="http://www.extremetech.com/computing/138424-increasing-wireless-network-speed-by-1000-by-replacing-packets-with-algebra" target="_blank">Visitar sitio</a>
- *MIT researchers use algebraic equation that improves WiFi and LTE data streams* »» <a href="http://www.engadget.com/2012/10/24/mit-researchers-algebraic-equation-to-weave-wifi-and-lte-signals/" target="_blank">Visitar sitio</a>
