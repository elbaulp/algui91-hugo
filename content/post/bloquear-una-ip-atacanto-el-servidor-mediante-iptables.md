---
author: alex
categories:
- internet
- linux
- seguridad
color: '#0097A7'
date: '2016-01-01'
description: "Ayer ojeando el archivo de log detect\xE9 que hab\xEDa una ip mandando
  peticiones POST indiscriminadamente a la p\xE1gina de login del blog y decid\xED
  investigar un poco."
layout: post.amp
mainclass: servidores
permalink: /bloquear-una-ip-atacanto-el-servidor-mediante-iptables/
tags:
- agregar regla de iptables
- bloquear ip
- bloquear ip servidor web
- comando iptables linux
- ejemplos de firewall
- iptables
- iptables con servidor debian
- politicas con iptables firewall
title: Bloquear una IP atacando el servidor mediante iptables
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/Applic-Firewall-icon.png" alt="Applic-Firewall-icon" width="256px" height="256px" />

Ayer ojeando el archivo de log detecté que había una ip mandando peticiones POST indiscriminadamente a la página de login del blog y decidí investigar un poco.

Por la frecuencia con las que se realizaban las peticiones debía ser un ataque automatizado, y probaba cadenas de texto aleatorias, lo primero que hice fué bloquear a dicha ip cualquier intento de conexión al servidor mediante [iptables][1].

Además de bloquearlo, añadí una regla a las directivas de iptables para que quedara registrado en el log cada intento de conexión. Las reglas en cuestión son las siguientes:

<!--more--><!--ad-->

```bash
iptables -i ethX -A INPUT -s xx.xx.xx.xx -j LOG --log-prefix "IP DROP SPOOF A:"
iptables -i ethX -A INPUT -s xx.xx.xx.xx -j DROP

```

Estas directivas bloquean el tráfico entrante hacia la interfaz *ethX* a la dirección especificada tras el parámetro *-s*, además, en las entradas del log aparecerá como **IP DROP SPOOF A:** cada vez que el firewall bloquee el intento de conexión.

El primer comando es el que define cómo se registrará en el log, el segundo es el que bloquea la dirección.

Para comprobar que efectivamente se está bloqueando al atacante, basta con mirar al log:

```bash
Feb  5 02:15:30 NOMBRESERVIDOR kernel: IP DROP SPOOF A:IN=ethX OUT= MAC=XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX SRC=IPBLOQUEADA DST=IPSERVIDOR LEN=LONGITUDPAQUETE TOS=0x00 PREC=0x00 TTL=117 ID=15234 DF PROTO=TCP SPT=17652 DPT=PUERTODESTINO WINDOW=65535 RES=0x00 SYN URGP=0

```

Decidí investigar desde cuando se estaba produciendo el ataque, y, para mi sorpresa, se estaba intentando acceder por fuerza bruta al blog desde hacía 8 días. Concretamente, hubo **18209** intentos de conexión. Este número puede sacarse fácilmente contando las líneas del log en las que estaba involucrada la ip atacante:

```bash
cat /ruta/log/acceso.log | grep xx.xx.xx.xx | wc -l

```

Donde **xx.xx.xx.xx** debe ser la ip del atacante. El comando wc con el parámetro -l es el encargado de contar las líneas.

En las referencias puedes encontrar más información sobre iptables. También puedes leer los **[20 ejemplos de iptables para SysAdmins novatos][2]** o [Bloquear ataques de fuerza bruta en Nginx y WordPress con Fail2Ban][3]

#### Referencias

*Iptables Drop IP Address* »» <a href="http://www.cyberciti.biz/faq/linux-iptables-drop/" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/?s=iptables
 [2]: https://elbauldelprogramador.com/20-ejemplos-de-iptables-para-sysadmins/
 [3]: https://elbauldelprogramador.com/bloquear-ataques-de-fuerza-bruta-en-nginx-y-wordpress-con-fail2ban/ "Bloquear ataques de fuerza bruta en Nginx y WordPress con Fail2Ban"