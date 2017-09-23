---
author: alex
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-09-23T13:21:40+01:00
description: "Escuchando el programa de radio security now! he descubierto una herramienta  increíble. Se trata de **BitTorrrent Sync** y permite tener archivos sincronizados  en todos los dispositivos que desees, sin necesidad de almacenarlos en la nube,  como es el caso de dropbox por ejemplo. En este artículo voy a explicar cómo  usarlo."
url: /bittorrent-sync-tus-archivos-sincronizados-sin-intermediarios/
tags:
- sincronizar ficheros
title: 'BitTorrent Sync: Tus archivos sincronizados sin intermediarios'
---

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/BiTTorrentSYnc-300x260.png" alt="BiTTorrentSYnc" width="300px" height="260px" />
</figure>

Escuchando el programa de radio **[security now!][2]** he descubierto una herramienta increíble. Se trata de **BitTorrrent Sync** y permite tener archivos sincronizados en todos los dispositivos que desees, sin necesidad de almacenarlos en la nube, como es el caso de dropbox por ejemplo. En este artículo voy a explicar cómo usarlo.


<!--more--><!--ad-->

BitTorrent Sync sincroniza los archivos usando el protocolo P2P. Cuando se configuran dos dispositivos para que estén sincronizados se conectan directamente entre ellos usando UDP, NAT y [UPnP][3], con lo cual no se depende de ningún tercero que tenga que almacenar los ficheros en la nube. Si ambos dispositivos se encuentran bajo la misma red local, BitTorrent Sync usará dicha red para realizar la sincronización más rápido.

# Instalar BitTorrent Sync y guía de uso

Está <a href="http://labs.bittorrent.com/experiments/sync/technology.html" target="_blank">disponible</a> tanto para Windows, Mac y Linux. Los dos primeros son programas de escritorio, en linux se usa una interfaz web. Descargamos el correspondiente:

  * <a href="http://btsync.s3-website-us-east-1.amazonaws.com/BTSync.exe" target="_blank">Windows</a>
  * <a href="http://btsync.s3-website-us-east-1.amazonaws.com/BTSync.dmg" target="_blank">Mac</a>
  * <a href="http://btsync.s3-website-us-east-1.amazonaws.com/btsync_x64.tar.gz" target="_blank">Linux x64</a>
  * <a href="http://btsync.s3-website-us-east-1.amazonaws.com/btsync_i386.tar.gz" target="_blank">Linux i386</a>

Una vez descargado, ejecutamos el programa y saldrá una ventana como esta:

<figure>
    <amp-img sizes="(min-width: 593px) 593px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="BitTorrent Sync" src="/img/2013/05/sync1.png" width="593px" height="393px" />
</figure>

En Windows y mac, en linux hay que dirigirse a <a href="http://localhost:8888/gui" target="_blank">http://localhost:8888/gui</a>.

El siguiente paso es elegir una carpeta que queramos sincronizar y *generar un secreto* para dicha carpeta. El secreto es aleatório y único, es la llave que conecta varios dispositivos a una red sincronizada.


<figure>
    <a href="/img/2013/05/Crear-carpeta-BitTorrent-Sync.png"><amp-img sizes="(min-width: 1024px) 1024px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Crear carpeta BitTorrent Sync" src="/img/2013/05/Crear-carpeta-BitTorrent-Sync-1024x803.png" width="1024px" height="803px" /></a>
   <figcaption> Crear carpeta BitTorrent Sync</figcaption>
</figure>

Hecho lo anterior, en el otro dispositivo, elegimos una carpeta en la que queramos almacenar los ficheros e introducimos el secreto en el paso anterior. En cuanto hagamos esto, automáticamente comenzará a sincronizar datos.

<figure>
    <a href="/img/2013/05/Anadir-carpeta-BitTorrent-Sync.png"><amp-img sizes="(min-width: 1024px) 1024px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Anadir carpeta BitTorrent Sync" src="/img/2013/05/Anadir-carpeta-BitTorrent-Sync-1024x801.png" width="1024px" height="801px" /></a>
    <figcaption>Añadir carpeta BitTorrent Sync</figcaption>
</figure>

Para copiar el secreto de cualquier carpeta basta con hacer click en el botón **Get Secret** en linux o pulsar el botón derecho del ratón sobre la carpeta en Windows y Mac.

# Secret, Read-Only Secret y One-Time Secret

A la hora de compartir una carpeta, se pueden seleccionar varios tipos de secretos. El **generado al crear la carpeta** permite a todos los dispositivos con dicho secreto modificar el contenido. El **Read-Only Secret** sólo permite acceder a los archivos, pero no modificarlos. Un tercer tipo es el **One-time Secret**, que solo será válido durante 24 horas y puede ser de solo lectura o lectura/escritura.

Para terminar dejo el podcast del episodio de security now!

# Referencias

- *BitTorrent Sync* »» <a href="http://labs.bittorrent.com/experiments/sync.html" target="_blank">Visitar sitio</a>

 [2]: https://elbauldelprogramador.com/security-now//
 [3]: https://elbauldelprogramador.com/grave-problema-en-upnp-que-afecta-a-81-millones-de-routers/
