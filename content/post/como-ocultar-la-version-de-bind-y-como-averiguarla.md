---
author: alex
categories:
- servidores
- how to
mainclass: servidores
date: '2016-01-01'
lastmod: 2017-09-28T17:56:36+01:00
image: 2013/04/dns-300x240.jpg
url: /como-ocultar-la-version-de-bind-y-como-averiguarla/
tags:
- bind
title: "Cómo ocultar la versión de BIND (Y cómo averiguarla)"
---

<figure>
    <img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/04/dns-300x240.jpg" alt="Cómo ocultar la versión de BIND (Y como averiguarla)" width="300px" height="240px"></img>
</figure>

Realizando un análisis en *<a href="http://www.dnsinspect.com" target="_blank">dnsInspect</a>* me dí cuenta de que el servidor estaba mostrando la versión de [BIND][1], lo cual no es buena idea. Así que busqué cómo ocultarla y aprovecho para compartirlo con todos vosotros por si alguna vez os hace falta.

Antes de proceder a ocultar la versión, comprobemos que efectivamente la estamos mostrando, usaremos **[dig][2]** para ello:

<!--more--><!--ad-->

```bash
# Consultamos la versión para el dominio de la web
$ dig @example.com -c CH -t txt version.bind
# Consultamos también en nuestros servidores DNS secundarios
$ dig @direcciónDNS -c CH -t txt version.bind
```

Tras ejecutar el primer comando deberiamos ver si estamos mostrando la versión de **BIND**. En mi caso la respuesta era afirmativa, sin embargo al consultar la versión en el servidor DNS secundario la respuesta era ***&#8220;[Secured]&#8221;***.

Una vez hecho esto, pasamos a ocultar la versión.

# Ocultar la versión de BIND en un servidor

Esto no es más que **seguridad mediante oscuridad**, ya que aunque se oculte la versión, hay herramientas que detectarán la versión de BIND, como **<a href="http://www.cyberciti.biz/tips/howto-remotely-determine-dns-server-version.html" target="_blank">fpdns</a>**. Sin embargo, ocultandola evitaremos que scripts automatizados buscando versiones concretas puedan aprovecharse de cualquier vulnerabilidad.

Abrimos el fichero de configuración de **BIND**, concretamente */etc/bind/named.conf.options* y añadimos la siguiente línea:

```bash
version "Texto a mostrar";
```

Guardamos el fichero y reiniciamos **BIND**:

```bash
# service bind9 restart
```

# Mostrar versión de BIND aún cuando está oculta

Instalamos *fpdns*:

```bash
sudo apt-get install fpdns
```

Lo ejecutamos pasando como argumento el servidor del cual queremos determinar la versión:

```bash
$ fpdns -D <dominio>
```

La salida será algo de este estilo:

```bash
fingerprint (elbauldelprogramador.com, ip): ISC BIND version -- version
fingerprint (elbauldelprogramador.com, ip): ISC BIND version -- version
```

# Referencias

- *Cybercity* »» <a href="http://www.cyberciti.biz/faq/hide-bind9-dns-sever-version/" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/como-configurar-un-servidor-dns/
 [2]: https://elbauldelprogramador.com/dig-chuleta-basica-de-comandos/ "Dig – Chuleta básica de comandos"
