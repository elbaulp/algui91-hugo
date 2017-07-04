---
author: luzila
categories:
- articulos
date: '2016-01-01'
image: 2013/06/081712_1525_AchievingAn4.png
lastmod: 2017-07-04T12:32:34+01:00
mainclass: articulos
url: /logrando-el-anonimato-con-tor-parte-4/
tags:
- configurar tor
- instalar tor
- navegar anonimamente
- Tor
title: "Logrando el anonimato con Tor (Parte 4) - Tor para relés"
---

* [Logrando el anonimato con Tor (Parte 1)][1]
* [Logrando el anonimato con Tor (Parte 2): Servidores DNS y Proxies][2]
* [Logrando el anonimato con Tor (Parte 3): TorButton y Tsocks][3]
* Logrando el anonimato con Tor (Parte 4): Tor para relés



# 1. Introducción

Hemos visto que la red Tor está constituida de nodos Tor, a través de los cuales enviamos nuestro tráfico para mantenernos anónimos. No hemos profundizado mucho en terminología, porque no era tan importante; todo lo que queríamos era lograr el anonimato, y así fue.

Pero cuando intentamos configurar un Tor Relay, entonces el proyecto Tor se pone realmente interesante y no podemos prescindir de la terminología. Aquí están las expresiones más frecuentemente utilizadas (manenemos la expresión en inglés por su normal utilización, y su traducción al español):

<!--more--><!--ad-->

## **Tor Node**:

Exactamente lo mismo que Tor Relay, los términos pueden intercambiarse.

## **Tor Normal Relay**:

Una máquina simple en una red Tor.

## **Tor Bridge Relay**:

Son relays normales que no están listados dentro del directorio de Tor, lo cual significa que pueden ser considerablemente más difíciles de bloquear. Podemos usar Bridge Relay cuando nuestro ISP está bloqueando el uso de Tor, pero todavía queremos conectarnos a su red. La única diferencia entre normal y bridge relay es que el normal está listado en un directorio público, mientras que el bridge no.

## **Tor Exit/Non-Exit Relay**:

Un Tor Relay puede ser configurado como exit o non-exit. Un relay non-exit es un relay que no se comunica directamente con la red destino, pero actúa como un nodo intermediario en la red Tor. El relay exit es también un nodo intermediario, pero puede ser además un nodo exit, lo que significa que puede comunicarse directametne con el sitio web destino. Sabemos también que las conexiones del nodo exit al sitio web destino están desencriptadas, por lo que podemos ver todo el tráfico que pasa y monitorearlo.

# 2. Tor Relays

En la siguiente sección intentaremos explicar cómo ejecutar un Tor relay. Primero necesitamos saber que podemos configurar un Tor relay practicamente en cualquier sistema operativo. Si tienes un ancho de banda en exceso, deberías realmente contribuir a la comunidad de Tor configurando un Tor relay, dado que es muy facil y gratis. Pero hay que tener cuidado al configurar un Tor relay de cualquier tipo porque tu IP externa será vista por los clientes que intentan conectarse a tu relay.

Podemos muy sencillamente configurar un Tor relay con una interface de usuario gráfica de Vidalia haciendo click en Settings -> Sharing -> &#8220;Relay traffic for the Tor network (exit relay)&#8221;. Se puede ver en la imagen siguiente:

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn1" src="/img/2013/05/081712_1525_AchievingAn1.png" width="300px" height="298px"></amp-img>
</figure>

Podemos ver que hay un par de opciones que podemos configurar:

## **Basic Settings:**

* “Nickname”: el apolo para nuestro relay, en este caso es abracadabra.
* “Contact Info”: nuestra información de contacto si algo sale mal, por lo que los desarrolladores pueden contactarnos. En este caso se omitió la información en la imagen.
* “Attempt to automatically configure port forwarding”: Si clickeamos en el botón Test, automáticamente testeará si tenemos los puertos abiertos en nuestro firewall que probablemente tengamos levantado en nuestro router.  Para la mayoría de los usuarios domésticos, este testeo fallará debido a que los puertos no estarán abiertos. Para lograr que no falle deben abrirse. La funcionalidad del boton Test puede además automáticamente detectar la presencia de otros puertos abiertos y usarlos para transmitir el tráfico. Pero notemos cuáles puertos deberían estar abiertos por defecto, con esta opción desactivada. Lo mínimo que necesitamos abierto es el puerto 9001 para relay, como se puede ver en la imagen anterior. Si habilitamos la reflexión de ese directorio (activando &#8220;Mirror the Relay Directory&#8221;) entonces necesitaremos también abrir el puerto 9030.

## **Bandwidth Limits:**

Cuánto ancho de banda queremos separar para Tor.

## **Exit Policies:**

Configura los servicios que queremos que los clientes accedan a través de nuestro Tor relay. Podemos elegir de:  websites (port 80), secure websites (port 443), mail systems (ports 110, 143, 25), instant messaging, IRC y otros servicios.

Pero debemos discutir lo más importante de configurar Tor relay: ¿Debemos configura un Tor relay de tipo exit o non-exit? En la introducción ya hemos discutido la diferencia entre cada uno, y los siguientes puntos están resumidos de [1] y deberían presentar una imagen clara respecto a qué tipo de nodo queremos correr.

  1. No corras un nodo exit de una conexión a internet de casa, porque llamará la atención de la red doméstica. Usualmente esto no debería ser muy problemático, pero en algunos paises ha habido captura de equipos en cuentas corriendo nodos exit. Una mejor manera de retribuir a la comunidad Tor mientras usas tu conexión a internet doméstica es configurando un nodo no-exit o un nodo bridge.
  2. Usa una IP separada para el nodo Tor y no rutees tu tráfico normal a través de la misma red que el tráfico de Tor. Esto permitirá a tu ISP identificar facilmente quejas de abusos en lugar de terminar la conectividad total a Internet.
  3. Registra un nombre de DNS inverso como tor-proxy.tudominio.com, donde deberías también poner alguna información sobre Tor, de forma tal que otras personas puedan saber qué es.
  4. Configura reglas para una política de exit. Deberías bolquear el tráfico de BitTorrent, el cual realmente no debería ser utilizado sobre Tor, por su alto requerimiento de ancho de banda.

Está bastante claro que a menos que sepamos qué estamos haciendo, deberíamos ejecutar un nodo non-exit en lugar de un exit. Hemos configurado un relay Tor con el uso de la GUI Vidalia, pero si quisiéramos hacerlo manualmente, podemos editar el archivo `/etc/tor/torrc` y agregar las siguientes variables de configuración:

```bash
DataDirectory /home/user/tor/Data/Tor
DirPort 9030
ORPort 9001
ExitPolicy accept *:80,accept *:443,reject *:*
Nickname Unnamed
RelayBandwidthBurst 10485760
```

Describamos las variables de configuración - resumidas de  [2]:

## DirPort

Indica el servicio de directorio corriendo en este puerto. Si está configurado en auto, Tor automáticamente elegirá un puerto por nosotros.

## ORPort

Indica el puerto que escucha conexiones para clientes y servidores Tor. Esta opción es requerida si queremos correr nuestro propio Tor relay. Si está configurado en auto, Tor automáticamente elegirá un puerto por nosotros.

## ExitPolicy

Si estamos corriendo un nodo exit, entonces esta política especifica que deberíamos aceptar o rechazar. Los valores más básicos de configuración son aceptar o rechazar paquetes basados en su número de puerto destino.

## Nickname

Define el alias de nuestro relay.

## RelayBandwidthBurst

Limita el número de ráfagas de tráfico transmitido a un número determinado de bytes en cada dirección.

## RelayBandwidthRate

Especifica un número de bytes promedio permitido para ser transmitido a través de este nodo.

Después de haber configurado nuestro nodo relay, deberíamos guardar la configuración y reiniciar Tor. Este proceso debería crear claves privadas para Tor, las cuales son almacenadas en keys/secret\_id\_key en nuestro DataDirectory. Si mostramos el contenido de DataDirectory, podemos ver que las claves privadas están presentes, como se puede ver en la imagen siguiente:

<figure>
    <amp-img sizes="(min-width: 616px) 616px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn2" src="/img/2013/06/081712_1525_AchievingAn2.png" width="616px" height="119px"></amp-img>
</figure>

Los comandos presentados en la imagen fueron ejecutados unos momentos después de que el relay de Tor sea configurado e iniciado. Podemos ver que la fecha actual es unos minutos después de la fecha de creación de las claves privadas, lo que indica que fueron creadas recientemente. Esas dos claves son críticas para la operación de nuestro relay, debido a que son usadas para encriptar/desencriptar el tráfico que pasa por nuestro relay. Si alguien puede meter las manos en esas dos claves privadas, entonces podría desencriptar todo el tráfico que pasa por nuestro relay, lo cual rompería nuestra capacidad de anonimato con Tor.

Presentemos una de las claves aquí, así podemos tener una imagen mejor de estos dos archivos. El contenido del archivo `secret_id_file` se muestra a continuación:

<figure>
    <amp-img sizes="(min-width: 587px) 587px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn3" src="/img/2013/06/081712_1525_AchievingAn3.png" width="587px" height="275px"></amp-img>
</figure>

Podemos ver que el archivo `secret_id_key` contiene solo la clave privada RSA usada para encriptar/desencriptar el tráfico que pasa a través del relay.

Cuando reiniciemos Tor, deberíamos notar que toma un poquito más de tiempo porque está configurando e iniciando el relay. Pero esto no garantiza que el Tor relay esté inicializado y corriendo, por lo que tendremos que revisar los logs. Allí deberíamos ver las siguientes lineas que indican que Tor relay se inició correctamente:

```bash
[Notice] Tor v0.2.2.37 (git-fce6eb1c44e87bc2). This is experimental software. Do not rely on it for strong anonymity. (Running on Linux x86_64)
[Notice] Initialized libevent version 2.0.19-stable using method epoll. Good.
[Notice] Opening OR listener on 0.0.0.0:9001
[Notice] Opening Directory listener on 0.0.0.0:9030
[Notice] Opening Socks listener on 127.0.0.1:0
[Notice] Socks listener listening on port 51220.
[Notice] Opening Control listener on 127.0.0.1:0
[Notice] Control listener listening on port 45896.
[Notice] OpenSSL OpenSSL 1.0.1c 10 May 2012 looks like version 0.9.8m or later; I will try SSL_OP to enable renegotiation
[Notice] Your Tor server&#8217;s identity key fingerprint is &#8216;test 0B01A29C23F7C70E52D28AD5A9E70237143B7D4C&#8217;
[Notice] We now have enough directory information to build circuits.
[Notice] Bootstrapped 80%: Connecting to the Tor network.
[Notice] New control connection opened.
[Notice] Guessed our IP address as xxx.xxx.xxx.xxx (source: 208.83.223.34).
[Notice] Bootstrapped 85%: Finishing handshake with first hop.
[Notice] Bootstrapped 90%: Establishing a Tor circuit.
[Notice] Tor has successfully opened a circuit. Looks like client functionality is working.
[Notice] Bootstrapped 100%: Done.
[Notice] Now checking whether ORPort xxx.xxx.xxx.xxx:9001 and DirPort xxx.xxx.xxx.xxx:9030 are reachable&#8230; (this may take up to 20 minutes &#8212; look for log messages indicating success)
[Notice] Self-testing indicates your ORPort is reachable from the outside. Excellent. Publishing server descriptor.
[Notice] Self-testing indicates your DirPort is reachable from the outside. Excellent.
```

Las últimas líneas indican que Tor está verificando si los puertos ORPort y DirPort son accesibles desde afuera, y al mostrar &#8220;Excellent&#8221; significa que sí. Si esta verificación falla entonces necesitamos revisar nuestros firewalls y abrir los puertos 9001 y 9020. Podemos además ver que Tor publicó el *server descriptor* en el directorio del servidor para permitir a los clientes saber que está abierto y pueden conectarse a través de él. El descriptor del servidor contiene información como por ejemplo la dirección, los puertos, las claves, etc.
En el Message Log podemos ver la imagen siguiente; que dice que Tor y Relay están corriendo bien, lo aumenta nuestra seguridad de que todo está funcionando correctamente.

<figure>
    <amp-img sizes="(min-width: 643px) 643px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn4" src="/img/2013/06/081712_1525_AchievingAn4.png" width="643px" height="138px"></amp-img>
</figure>

Si todavía no estamos satisfechos y quisiéramos ver nuestro relay en acción, necesitamos esperar una hora para que el relay sea agregado en el directorio, y luego podemos buscarlo en el sitio web Relay Search. Si escribimos &#8220;abracadabra&#8221; en el cuadro de búsqueda y presionamos &#8220;Search&#8221;, nuestro relay debería mostrarse. Podemos ver esto en la siguiente imagen:

<figure>
    <amp-img sizes="(min-width: 602px) 602px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn5" src="/img/2013/06/081712_1525_AchievingAn5.png" width="602px" height="520px"></amp-img>
</figure>

Hemos buscado la cadena &#8220;abracadabra&#8221;, la cual es el alias de nuestro relay, por lo tanto está funcionando. La IP externa está enmascarada con xxx.xxx.xxx.xxx para la imagen, pero la dirección está realmente, por lo que es otra confirmación de que el relay no es anónimo y su IP externa es visible. La imagen también nos muestra qué puertos el relay dejará atravesar (80 y 443), el ancho de banda disponible y la versión de Tor que está corriendo, más alguna otra extraña cadena &#8220;CwGinCP3xw5S0orVqecCNxQ7fUw”, de la que no tenemos información sobre qué significa.

La imagen presentada también tiene un hipervínculo “b20yYC0pV6WSYHT0mq+h6i27Ke0″, que apunta a https://metrics.torproject.org/serverdesc?desc-id=6f6d32602d2957a5926074f49aafa1ea2dbb29ed. Esta dirección revela la información mostrada en la siguiente imagen:

<figure>
    <amp-img sizes="(min-width: 643px) 643px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1525_AchievingAn7" src="/img/2013/06/081712_1525_AchievingAn7.png" width="643px" height="215px"></amp-img>
</figure>

El alias para el relay es abracadabra, el ancho de banda es 59.39 KB, y el IP y el puerto también son visibles. Hay además banderas que identifican el tipo de servicio. Las banderas especifican las siguientes cosas en orden:

* Este es un nodo exit
* Es rápido
* Está corriendo
* Es V2DIR
* Es válido

# 3. Conclusión

Hemos visto suficiente información para poder decidir si queremos ayudar a la comunidad de Tor y correr un relay Tor. Los usuarios domésticos deberían al menos configurar un relay no-exit o un puente (bridge), dado que esas dos opciones no atraerán mucha atención.

# Referencias

- *InfoSec Institute Resources* »» <a href="http://resources.infosecinstitute.com/tor-part-4/" target="_blank">Achieving Anonymity with Tor Part 4</a>
- <a href="https://blog.torproject.org/" target="_blank">Tor Project</a>

 [1]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-1/ "Logrando el anonimato con Tor (Parte 1)"
 [2]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-2-proxies-y-servidores-de-dns/
 [3]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-3-torbutton-y-tsocks/
