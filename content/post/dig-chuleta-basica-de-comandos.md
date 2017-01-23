---
author: alex
categories:
- administracion de servidores
- aplicaciones
- opensource
color: '#0097A7'
date: '2016-01-01'
layout: post.amp
mainclass: servidores
permalink: /dig-chuleta-basica-de-comandos/
tags:
- chuleta
- administracion DNS
- chuleta comandos dig
- chuleta dig
- estado DNS
title: "Dig - Chuleta b\xE1sica de comandos"
---

**Dig (Domain Information Groper)** es un comando de gran utilidad para realizar consultas a registros DNS. Se usa mucho &#8212; entre otras cosas &#8212; para el diagnóstico de [Servidores DNS][1]. Desde que administro yo mismo el servidor del blog lo he usado bastante, y hoy voy a dar unas nociones básicas de cómo usarlo.

<!--more--><!--ad-->

#### [Actualización]

En un comentario hecho en la página de <a href="https://plus.google.com/b/108003822606696308728/108003822606696308728/posts/idbcxhy5vzG" target="_blank">Google+ del blog</a> un usuario indicó que es posible obtener una salida simplificada de todos los comandos de abajo con la opción *+short*.

El ejemplo más básico es:

```bash
dig ejemplo.com

```

#### Obtener distintos tipos de registros DNS

La sintaxis es:

```bash
dig @servidor-dns ejemplo.com tipo-de-registro

```

Ejemplo de uso:

```bash
dig @208.67.222.222 google.com A

;; QUESTION SECTION:
;google.com.          IN  A

;; ANSWER SECTION:
google.com.      300 IN  A   173.194.34.231
google.com.       300 IN  A   173.194.34.226
google.com.       300 IN  A   173.194.34.230
google.com.       300 IN  A   173.194.34.228
google.com.       300 IN  A   173.194.34.238
google.com.       300 IN  A   173.194.34.229
google.com.       300 IN  A   173.194.34.227
google.com.       300 IN  A   173.194.34.225
google.com.       300 IN  A   173.194.34.232
google.com.       300 IN  A   173.194.34.224
google.com.       300 IN  A   173.194.34.233

```

#### Obtener los servidores de nombres

```bash
dig @208.67.222.222 google.com NS

;; QUESTION SECTION:
;google.com.            IN  NS

;; ANSWER SECTION:
google.com.     172749  IN  NS  ns2.google.com.
google.com.      172749  IN  NS  ns1.google.com.
google.com.      172749  IN  NS  ns3.google.com.
google.com.      172749  IN  NS  ns4.google.com.


```

#### Obtener registros MX (De correo)

```bash
dig @208.67.222.222 google.com MX

;; QUESTION SECTION:
;google.com.            IN  MX

;; ANSWER SECTION:
google.com.     469 IN  MX  20 alt1.aspmx.l.google.com.
google.com.      469 IN  MX  10 aspmx.l.google.com.
google.com.       469 IN  MX  40 alt3.aspmx.l.google.com.
google.com.      469 IN  MX  50 alt4.aspmx.l.google.com.
google.com.      469 IN  MX  30 alt2.aspmx.l.google.com.

```

#### Obtener registros TXT

```bash
dig @208.67.222.222 google.com TXT

;; QUESTION SECTION:
;google.com.          IN  TXT

;; ANSWER SECTION:
google.com.        3600    IN  TXT "v=spf1 include:_spf.google.com ip4:216.73.93.70/31 ip4:216.73.93.72/31 ~all"


```

#### Obtener todos los tipos de registros en una misma consulta

```bash
dig any google.com

;; QUESTION SECTION:
;google.com.           IN  ANY

;; ANSWER SECTION:
google.com.        407 IN  MX  40 alt3.aspmx.l.google.com.
google.com.      407 IN  MX  30 alt2.aspmx.l.google.com.
google.com.      407 IN  MX  20 alt1.aspmx.l.google.com.
google.com.      407 IN  MX  10 aspmx.l.google.com.
google.com.       407 IN  MX  50 alt4.aspmx.l.google.com.
google.com.      172781  IN  NS  ns2.google.com.
google.com.      172781  IN  NS  ns1.google.com.
google.com.      172781  IN  NS  ns3.google.com.
google.com.      172781  IN  NS  ns4.google.com.

```

#### Realizar una consulta inversa

```bash
dig -x 173.194.34.233

;; QUESTION SECTION:
;233.34.194.173.in-addr.arpa.  IN  PTR

;; ANSWER SECTION:
233.34.194.173.in-addr.arpa. 83265 IN  PTR mad01s09-in-f9.1e100.net.

```

Puedes encontrar una descripción un poco más extensa sobre el funcionamiento de la consulta inversa en la [tercera][2] parte del artículo *Cómo configurar un servidor DNS*

#### Referencias

*dig – Linux DNS Lookup utility cheat sheet* »» <a href="http://linuxaria.com/pills/dig-linux-dns-lookup-utility-cheat-sheet" target="_blank">linuxaria</a>



 [1]: https://elbauldelprogramador.com/como-configurar-un-servidor-dns/ "Cómo configurar un servidor DNS – Parte 1 (Introducción)"
 [2]: https://elbauldelprogramador.com/como-configurar-un-servidor-dns3/