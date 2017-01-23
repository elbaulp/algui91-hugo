---
author: alex
categories:
- aplicaciones
- linux
color: '#2196F3'
date: '2016-09-25'
description: "El prop\xF3sito de iproute2 es reemplazar el conjunto de herramientas
  que componen las net-tools y pasar a ser \xE9l quien se encargue de configurar las
  interfaces de red, la tabla de rutas y gestionar la tabla ARP."
image: 2012/07/sh1.png
layout: post.amp
mainclass: linux
permalink: /comandos-ss-iproute2-linux/
tags:
- comando ip route linux
- comando ss
- conmando ifconfig
- herramientas de red
- ifconfig
- ip addr
- ip link
- ip route
- iproute2
- mostrar informacion TCP
- net-tools
- netstat
- notas iproute2
- sockets
- ss
- tc iproute2 debian
- UDP
title: "Algunos comandos \xFAtiles con iproute2"
---

El propósito de **iproute2** es reemplazar el conjunto de herramientas que componen las *net-tools* y pasar a ser él quien se encargue de configurar las interfaces de red, la [tabla de rutas][1] y gestionar la tabla ARP.

Hace poco he [escrito sobre el comando **netstat**][1]. El artículo trataba de cómo es posible usar netstat para mostrar dintintos tipos de información sobre el estado de la red. Hoy voy a hablar de su sustituto **ss**, ya que netstat se dejó de desarrollar en 2001.

Para situarnos en contexto, **netstat** forma parte de las comúnmente llamadas *net-tools* o herramientas de red. Este conjunto de herramientas lo forman los comandos *ifconfig*, *netstat* y *route*. Dichas herramientas han quedado obsoletas en favor de **iproute2** desde hace algunos años.

A día de hoy la mayoría de distribuciones traen **iproute** instalado por defecto.

Veamos algunos de los comandos más útiles que nos ofrece este relativamente “*nuevo*” conjunto de comandos:

<!--more--><!--ad-->

### Obtener información sobre TCP/UDP y Sockets

Aquí entra en acción el comando **ss**, sustituto de **netstat**. Este comando está incluido en el paquete **iproute2**.

La función de **ss** es mostrar estadísticas de los sockets, mostrar información similar a netstat. Además, revela más información sobre TCP que otras herramientas. Las opciones más usadas son:

```bash
-n, --numeric
              Do now try to resolve service names.

       -r, --resolve
              Try to resolve numeric address/ports.

       -a, --all
              Display all sockets.

       -l, --listening
              Display listening sockets.

       -o, --options
              Show timer information.

       -e, --extended
              Show detailed socket information

       -m, --memory
              Show socket memory usage.

       -p, --processes
              Show process using socket.

       -i, --info
              Show internal TCP information.

       -s, --summary
              Print  summary  statistics.  This  option  does not parse socket
              lists obtaining summary from various sources. It is useful  when
              amount  of  sockets  is  so  huge  that parsing /proc/net/tcp is
              painful.

```

Para ver la lista completa de opciones escribe `ss --help`.

Algunos ejemplos prácticos:

### Mostrar todos los sockects a la escucha

```bash
$ ss -l
State      Recv-Q Send-Q                                             Local Address:Port                                                 Peer Address:Port
LISTEN     0      128                                                           :::sunrpc                                                         :::*
LISTEN     0      128                                                            *:sunrpc                                                          *:*
LISTEN     0      20                                                           ::1:smtp                                                           :::*
LISTEN     0      20                                                     127.0.0.1:smtp                                                            *:*
LISTEN     0      128                                                            *:17500                                                           *:*
LISTEN     0      128                                                            *:43076                                                           *:*
LISTEN     0      128                                                           :::50925                                                          :::*

```

Para entender el significado de las columnas, puedes dirigirte al artículo de [netstat][1].

### Mostrar conexiones ssh establecidas

```bash
# ss -o state stablished '( dport = :ssh or sport = :ssh)'
Recv-Q Send-Q                                                 Local Address:Port                                                     Peer Address:Port
0      0                                                       192.168.1.36:60240                                                  207.97.227.239:ssh

```

El parámetro **-o** permite establecer qué opciones mostrar, varios ejemplos son:

### Mostrar conexiones SMTP establecidas

```bash
# ss -o state established '( dport = :smtp or sport = :smtp )'

```

### Mostrar conexiones HTTP establecidas

```bash
# ss -o state established '( dport = :http or sport = :http )'

```

En los casos anteriores se ha filtrado únicamente los paquetes TCP con estado *established*. Para mostrar otros estados puedes escribir:

```bash
# ss -4 state NOMBRE-DEL-FILTRO

```

Donde **-4** indica paquetes TCP IPv4 y NOMBRE-DEL-FILTRO puede tomar los siguientes valores:

  1. **established**
  2. **syn-sent**
  3. **syn-recv**
  4. **fin-wait-1**
  5. **fin-wait-2 **
  6. **time-wait **
  7. **closed**
  8. **close-wait**
  9. **last-ack**
 10. **listen**
 11. **closing**
 12. **all** : Todos los estados de arriba
 13. **connected** : Todos los estados salvo listen y closed
 14. **synchronized**
 15. **bucket** : Mostrar estados mantenidos como minisockets, como time-wait and syn-recv.
 16. **big** : Lo contrario al estado bucket.

Por ejemplo:

```bash
# ss -4 state time-wait

```

### Encontrar procesos locales conectados al servidor X (Servidor Gráfico)

```bash
# ss -x src /tmp/.X11-unix/*

```

### Hacer coincidir direcciones remotas y puertos

```bash
ss dst ADDRESS_PATTERN

## Mostrar todos los puertos conectados de forma remota desde 192.168.1.5##
ss dst 192.168.1.5

## Mostrar todos los puertos conectados de forma remota desde 192.168.1.5:http##
ss dst 192.168.1.5:http
ss dst 192.168.1.5:smtp
ss dst 192.168.1.5:443

```

Mostrar conexiones realizadas por una ip en el puerto http hacia nuestra máquina

```bash
ss dst 123.1.2.100:http

```

Es posible mostrar todas las conexiones realizadas por cualquier máquina, por el puerto http por ejemplo:

```bash
# ss dst *:http

```

### Hacer coincidir direcciones locales y puertos

```bash
ss src ADDRESS_PATTERN
### Encontrar todas las ips conectadas a elbauldelprogramador.com (5.39.89.44) ###
## Mostrar todos los puertos conectados a la dirección local 5.39.89.44 ##
ss src 5.39.89.44

## http (80) port only ##
ss src 5.39.89.44:http
ss src 5.39.89.44:80

## smtp (25) port only ##
ss src 5.39.89.44:smtp
ss src 5.39.89.44:25

```

### Mostrar el número y el tipo de conexiones activas

```bash
ss -ant | awk '{print $NF}' | grep -v '[a-z]' | sort | uniq -c

```

### Mostrar un resumen del estado de los sockets

```bash
# ss -s

```

### Listar todos los puertos a la escucha junto con el PID del programa

```bash
ss -tlnp

```

### Configuración de la interfaz de red

Antiguamente se usaba el comando ifconfig:

```bash
# ifconfig eth0 up
# ifconfig eth0 192.168.1.1 netmask 255.255.255.0

```

En **iproute2** la configuración de interfaces de red se lleva a cabo con el subcomando **link**:

### Activar interfaz

```bash
# ip link set eth0 up

```

Donde eth0 debe ser la interfaz de red a activar.

### Establecer dirección ip a la interfaz

```bash
# ip addr add 192.168.1.33/24 dev eth0

```

Para comprobar la correcta configuración de la interfaz, muestra la información de dicha interfaz:

```bash
# ip addr ls
# ip addr show
# ip addr ls eth0

```

### Enrutamiento

La versión moderna del comando `route -n` o `netstat -r` es:

```bash
# ip ro

```

Para añádir o eliminar reglas de enrutamiento se usa `ip ro add|del destino via gateway`. Para añadir una nueva ruta a 10.0.0.0/16:

```bash
# ip ro add 10.0.0.0/16 via 192.168.0.1
# ip ro del 10.0.0.0/16 via 192.168.0.1

```

### Encontrar la ruta hacia una dirección IP

Para averiguar qué interfaz está usando tu pc, puedes usar el comando *ip route get IP*. Así:

```bash
# ip route get 5.39.89.44
5.39.89.44 via 10.61.29.89 dev eth1  src 192.168.1.36

```

está usando la interfaz eth1, gateway 10.61.29.89 y la interfaz tiene la ip privada 192.168.1.36

### Conclusión

Aunque este artículo ha sido una remezcla de comandos, espero que haya quedado claro para qué sirve cada uno, y a partir de ahora podrás sacarle partido.

#### Referencias

*Socket Statistics on Linux* »» <a href="http://linuxaria.com/pills/ss-iproute2-linux" target="_blank">linuxaria</a>
*Some useful command with iproute2* »» <a href="http://linuxaria.com/howto/useful-command-of-iproute2" target="_blank">linuxaria</a>
*ss: Display Linux TCP / UDP Network and Socket Information* »» <a href="http://www.cyberciti.biz/tips/linux-investigate-sockets-network-connections.html" target="_blank">cyberciti.biz</a>
*SS Utility: Quick Intro* »» <a href="http://www.cyberciti.biz/files/ss.html" target="_blank">cyberciti.biz</a>



 [1]: https://elbauldelprogramador.com/netstat-analizando-la-red-y-detectando-problemas/ "Netstat: Analizando la red y detectando problemas"