---
author: alex
categories:
- articulos
- security now
color: '#00BCD4'
date: '2016-01-01'
layout: post.amp
mainclass: security-now
permalink: /grave-problema-en-upnp-que-afecta-a-81-millones-de-routers/
tags:
- "qu\xE9 es upnp"
- upnp que es
title: Grave vulnerabilidad en UPnP que afecta a 81 millones de routers
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/alert-300x300.jpeg" alt="alert" width="300px" height="300px" />

Como es habitual, hoy traigo otro episodio de [security Now!][1] que me parece interesante. Este en concreto, además de interesante es algo que afecta a millones de routers y dispositivos con el servicio UPnP activado.

> **Nota: El contenido no es de mi autoría, simplemente lo he traducido.**

Y es que recientemente se ha descubierto que es posible desde cualquier lugar del mundo, y sin ningún tipo de restricción de seguridad acceder a redes privadas y configurar el router.

El creador del framework metaexploit, comunicó a Steve Gibson que había finalizado un escaneo completo de todo internet hace aproximadamente un mes, el cual duró unos 5 meses y medio.

El objetivo del escaner era encontrar routers vulnerables con el puerto usado por el protocolo UPnP (Universal Plug & Play). **Encontró 81 millones**. El 2.2% de las ip públicas son posibles objetivos a un ataque medienta UPnP.

El problema es que el servicio UPnP nunca debería estar en el lado público del router, nunca debería estar expuesto a internet. Debido a esto, cualquier Hacker puede apoderarse de cualquier red privada (VPN).

El fallo está en el diseño del protocolo. Ya que se antepuso la facilidad de uso a la seguridad. Pasemos a explicar el objetivo que pretende lograr este servicio.

<!--more--><!--ad-->


Cada vez son más los dispositivos que pueden acceder a internet, como las televisiones. Para poder autoconfigurarse, tienen implementado el protocolo DHCP, que permite obtener una dirección IP del router. Así como UPnP, lo cual permite a esos dispositivos ser descubiertos dentro de la red. Por ejemplo, cualquier pc que tengamos en casa puede enviar un paquete a nuestra red privada (Un paquete de broadcast) para que cualquier dispositivo con UPnP responda al pc haciendole saber que dispone de este servicio. Despues, el pc sigue preguntando al dispositivo sobre sus capacidades, qué interfaces tiene disponibles etc.

Se puede observar varios problemas en este comportamiento. El primero es que los PCs responden a este tipo de paquetes también, con lo cual, si un malware infecta un pc de la red privada, puede enviar una petición al resto de PCs de la red y usar UPnP para abrir un agujero en el firewall y acceder directamente a los PCs. Y es posible porque ese es el proposito del servicio UPnP, la capacidad de configurar el router.

Pongamos un ejemplo real. **BitTorrent** es un cliente UPnP, al ejecutarlo en una red privada, localiza al router mediante UPnP y le pregunta por su IP externa, es decir, la pública. La ip pública no es algo que se conozca en el interior de la red privada, pero bittorrent necesita saberla para poder comunicarse con otros clientes bittorrent y establecer las conexiones. Tras esto, BiTorrent solicita un puerto abierto. Así, se ha modificado la configuración del router para permitir a bitTorrent recibir tráfico entrante no solicitado.

En todo el tiempo que UPnP lleva funcionando, nadie ha sugerido que nada de esto debiera estar funcionando en el lado público del router. UPnP está diseñado para operar únicamente en el lado privado de la red, es decir, en la red de casa, del trabajo, etc.

A raiz de no preocuparse de que operase en el lado público, millones de router tienen a disposición pública este servicio. De modo que si un hacker conoce la IP de un router con dicho servicio activo, puede enviar solicitudes **Universal Plug & Play (UPnP)** al router con el mismo nivel de control y poder con el que lo hace un PC desde dentro de la red privada, ya que no está protegido por ninguna contraseña ni método de autentificación.

Otro ejemplo, la consola xBox necesita del router que tenga activado UPnP para poder jugar Online. Y lo hace de la misma forma que bitTorrent.

Skipe funciona de manera similar, antiguamente, cuando no era posible establecer una conexión directa entre los dos puntos que querían comunicarse mediante skipe, se usaba lo que se conoce como nodos relé, de manera que si estos dos puntos no pueden comunicarse el uno con el otro, lo hacen mediante el relé. Actualmente Skipe usa UPnP para evitar el uso del relé, abriendo él mismo los puertos necesarios para establecer la comunicación directa mediante el servicio.

Una solución es configurar el router para desabilitar UPnP, pero dado que el propósito del servicio no era estar diponible públicamente, no hay ninguna opción para desabilitarlo.

Como se mencionó al principio, el creador de metaExploit realizó un escaner completo de internet para el espacio IPv4 y encontró 81 millones de routers con UPnP en el lado público, ese número debería se 0. Es decir, 81 millones de router responderán a la petición de un hacker que mande una solicitud UPnP esperando sus ordenes para modificar su configuración.

El informe del escaner se puede encontrar en PDF en el siguiente enlace: <a href="bit.ly/upnpflaws" target="_blank">bit.ly/upnpflaws</a>, del cual extraigo un fragmento:

> *“Universal Plug and Play (UPnP) is a protocol standard that allows easy communication
> between computers and network-enabled devices. This protocol is enabled by default on
> millions of systems, including routers, printers, media servers, IP cameras, smart TVs, home
> automation systems, and network storage servers. UPnP support is enabled by default on
> Microsoft Windows, Mac OS X, and many distributions of Linux.“
>
> “The UPnP protocol suffers from a number of basic security problems, many of which have
> been highlighted over the last twelve years. Authentication is rarely implemented by device
> manufacturers, privileged capabilities are often exposed to untrusted networks, and common
> programming flaws plague common UPnP software implementations. These issues are
> endemic across UPnP-enabled applications and network devices.”
>
> “The statistics in this paper were derived from five and a half months of active scanning. UPnP
> discovery requests were sent to every routable IPv4 address approximately once a week from
> June 1 to November 17, 2012. This process identified over 81 million unique IP addresses that
> responded to a standard UPnP discovery request. Further probes determined that
> approximately 17 million of these systems also exposed the UPnP Simple Object Access
> Protocol (SOAP) service to the world. This level of exposure far exceeded the expectations of
> the researchers.”
>
> “This paper quantifies the exposure of UPnP-enabled systems to the internet at large,
> classifies these systems by vendor, identifies specific products, and describes a number of
> new vulnerabilities that were identified in common UPnP implementations. Over 1,500
> vendors and 6,900 products were identified that are vulnerable to least one of the security
> flaws outlined in this paper. Over 23 million systems were vulnerable to a single remote code
> execution flaw that was discovered during the course of this research.”
>
> “Rapid7 worked with CERT/CC to notify the open source projects and device manufacturers
> vulnerable to the issues described in this paper. Unfortunately, the realities of the consumer
> electronics industry will leave most systems vulnerable for the indefinite future. For this
> reason, Rapid7 strongly recommends disabling UPnP on all internet-facing systems and
> replacing systems that do not provide the ability to disable this protocol.”
>
> “Rapid7 has provided a number of tools to help identify UPnP-enabled systems, including the
> free ScanNow for UPnP, modules for the open source Metasploit Framework, and updates to
> the Nexpose vulnerability management platform.”
>
> Al principio se dan unos cuantos datos estadísticos de todos los dispositivos y sistemas que tienen UPnP habilitado por defecto así como tipos de vulnerabilildades para acaber diciendo que se desactive el servicio en cualquier dispositivo conectado a internet, ya que la industria de los dispositivos electrónicos no dará solución a los dispositivos afectados. Por último, Rapid7 recomienda una serie de herramientas para identificar si nuestro sistema es vulnerable. Como ScanNow y varios modulos para metasploit.
>
> En resumen, el 2.2% del total de direcciones IPv4 del mundo responde a paquetes UPnP. Sobre el 20% de esas IPs están expuestas a la API de SOAP, es decir, al enviar el paquete de solicitud UPnP, el objetivo del paquete responde con una cadena de identificación, versión del sistema Operativo que está ejecutando, versión de la librería UPnP junto a más información. Lo cual permite elegir el exploit a utilizar para lograr explotar la vulnerabilidad. Incluso indica dónde se está ejecutando su servicio HTTP (el servicio HTTP de UPnP). Una vez conectado a ese servidor, es interactua con la API de SOAP para cambiar la configuraión del router.
>
> A continuación en las referencias proporciono una herramienta que <a href="http://www.grc.com/intro.htm" target="_blank">Steve Gibson</a> ha creado para comprobar si eres vulnerable a paquetes UPnP.
>
> #### Referencias
>
> *Test UPnP* »» <a href="https://www.grc.com/x/ne.dll?bh0bkyd2" target="_blank">grc.com</a>
> *Unplug UPnP* »» <a href="http://twit.tv/show/security-now/389" target="_blank">twit.tv</a>
>
>
>
>

 [1]: https://elbauldelprogramador.com/security-now/