---
author: alex
categories:
- articulos
- linux
color: '#2196F3'
lastmod: 2016-08-11
layout: post.amp
mainclass: linux
permalink: /netstat-analizando-la-red-y-detectando-problemas/
redirect_from: /articulos/netstat-analizando-la-red-y-detectando-problemas/
tags:
- comando netstat
- comandos linux
- como interpretar netstat an
- como leer una tabla de ruta con netstat
- ejemplos netstat
- herramientas red
- manual practico de netstat
- netstat
- netstat comando windows
- netstat mac
- netstat para que sirve
- netstat ver puertos
- netstat windows
- salida comando netstat
- significado close_wait
- usos netstat
title: 'Netstat: Analizando la red y detectando problemas'
---

`netstat` es una herramienta que proporciona un conjunto de comandos que permitirá saber qué está pasando en nuestra red. A lo largo de este artículo se explicarán algunas opciones básicas que permitirán entender mejor nuestra red y conocer qué programa puede estar causando problemas.

<!--more--><!--ad-->



## Netstat es un paquete de herramienas de red

El comando *netstat* sirve para varias cosas, como mostrar estadísticas de la red, imprimir la tabla de rutas, mostrar conexiones activas y mucho más. Para cada una de las opciones de uso menciondas existe un comando específico que realiza la misma tarea. Pero netstat los abarca todos bajo un mismo comando, y además es multiplataforma. Lo cual quiere decir que podremos usarlo tanto en Windows, Linux o Mac.

Tras esta pequeña introducción, veamos algunas salidas de este comando:

## Mostrar las conexiones de red

Es posible mostrar las conexiones que existen actualmente entre tu máquina y otras máquinas, así como sockets escuchando en un puerto para que otra máquina se conecte. También muestra qué programas están activos en la red:

```bash
$ sudo netstat -apA inet
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 *:sunrpc                *:*                     LISTEN      1775/rpcbind
tcp        0      0 *:38768                 *:*                     LISTEN      1808/rpc.statd
tcp        0      0 localhost:smtp          *:*                     LISTEN      2861/exim4
tcp        0      0 *:17500                 *:*                     LISTEN      2477/dropbox
tcp        0      0 hkr-pc.local:48985      wordpress.com:https     ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:60706      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:60684      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:44415      216.151.210.122:http    TIME_WAIT   -
tcp        0      0 hkr-pc.local:43597      72.21.91.121:http       TIME_WAIT   -
tcp        0      0 hkr-pc.local:35340      178-33-113-45.ovh.:http TIME_WAIT   -
tcp        0      0 hkr-pc.local:36162      76.74.254.120:https     ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:44472      76.74.254.123:http      TIME_WAIT   -
tcp        0      0 hkr-pc.local:35336      178-33-113-45.ovh.:http TIME_WAIT   -
tcp        0      0 hkr-pc.local:43599      72.21.91.121:http       TIME_WAIT   -
tcp        0      0 hkr-pc.local:37806      amung.us:http           ESTABLISHED 3451/firefox.real
tcp        0  13352 hkr-pc.local:34422      ec2-23-21-220-38.:https ESTABLISHED 2477/dropbox
tcp        0      0 hkr-pc.local:43260      fa-in-f154.1e100.n:http ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:52897      wg-in-f95.1e100.ne:http TIME_WAIT   -
tcp        0      0 hkr-pc.local:60689      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:60687      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:60685      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:43335      wordpress.com:https     ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:52902      wg-in-f95.1e100.ne:http TIME_WAIT   -
tcp        0      0 hkr-pc.local:44416      216.151.210.122:http    TIME_WAIT   -
tcp       38      0 hkr-pc.local:58802      v-client-1a.sjc.d:https CLOSE_WAIT  2477/dropbox
tcp        0      0 hkr-pc.local:57347      ec2-23-21-114-122.:http ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:43601      72.21.91.121:http       TIME_WAIT   -
tcp        0      0 hkr-pc.local:60704      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:41758      199.119.233.72.sta:http ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:60710      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:52920      wordpress.com:http      ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:36232      76.74.254.123:https     ESTABLISHED 3451/firefox.real
tcp        0      0 hkr-pc.local:60688      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:40181      sjc-not20.sjc.drop:http ESTABLISHED 2477/dropbox
tcp        0      0 hkr-pc.local:60686      93.184.220.111:http     TIME_WAIT   -
tcp        0      0 hkr-pc.local:43600      72.21.91.121:http       TIME_WAIT   -
udp        0      0 *:bootpc                *:*                                 2405/dhclient
udp        0      0 *:sunrpc                *:*                                 1775/rpcbind
udp        0      0 *:678                   *:*                                 1775/rpcbind
udp        0      0 localhost:712           *:*                                 1808/rpc.statd
udp        0      0 *:17500                 *:*                                 2477/dropbox
udp        0      0 *:mdns                  *:*                                 2298/avahi-daemon:
udp        0      0 *:44290                 *:*                                 1808/rpc.statd
udp        0      0 *:53066                 *:*                                 2405/dhclient
udp        0      0 *:1900                  *:*                                 2905/minissdpd
udp        0      0 *:45008                 *:*                                 2298/avahi-daemon:
```

Las parámetros pasados a netstat son; *-a* para mostrar todos los sockets, *-p* muestra la columna PID/Program, *-A inet* muestra solo sockets TCP/UDP. En Windows la opción *-A inet* puede omitirse y *-p* debe reemplazarse por *-o*. En Mac, no hay equivalente a *-p* y *-A inet* debe reemplzarse por *-f inet*. Para conocer los nombres de los programas en Mac usa *lsof -i*

El singnificado de cada columna es el siguiente:

- **Proto**: Indica el protocolo usado por el socket, puede ser TCP o UDP (Son protocolos de red). TCP se usa para obtener conexiones en las que se asegura que todos los paquetes llegan a su destino, en el orden correcto. El problema es que se vuelve muy lento si la conexión es mala. UDP es mucho más rápido, pero puede perder paquetes o entregarlos en un orden incorrecto. En resumen, TCP se usa para navegar por internet y descargar ficheros y UDP se usa en videos streaming y juegos.
- **Recv-Q y Send-Q**: Indican la cantidad de bytes que hay en cola para dicho socket. En Recv-Q datos esperando a ser leidos y en Send-Q a ser enviados. Normalmente ambas columnas han de estar a 0. De lo contrario puede que exista algún problema. En el ejemplo hay dos sockets con valores distintos a cero, los miraremos más adelante.
- **Local Address y Foreign Address**: A qué host y puerto está conectado cada socket. La dirección local siempre será el ordenador en el que se está ejecutando netstat, en este caso se llama * hkr-pc*. Foreign Address puede ser cualquier otro pc en internet, o la misma máquina local. Aunque parezca algo extraño, en ocasiones es útil que en ambas columnas aparezca la máquina local, lo cual indica que dicha máquina se está comunicando con ella misma a través de la red.
- **State**: Muestra el estado del socket. TCP dispone de una serie de estados, algunos de ellos son *LISTEN* (Esperando a que otra máquina establezca conexión),*ESTABLISHED* (Listo para comunicarse). En la lista aparecen varios más, como *CLOSE WAIT*, este estado indica que la máquina remota cerró la conexión, pero el programa local no ha seguido la petición y permanece abierto. Normalmente, un estado como este y cantidades distintas a cero en las columnas **Recv-Q** y **Send-Q** suelen ir de la mano. Otro estado que aparece en el ejemplo es *TIME WAIT*, puedes consultar una lista completa de los estados TCP en la referencias.
- **PID/Program name**: El indicador de proceso del socket en ejecución y el nombre del programa ejecutando dicho proceso.

Procedamos a interpretar los resultados de netstat. En el ejemplo de arriba las direcciones de la columna **Foreign adress** aparecen cortadas. Para verlas completas es necesario ejecutar netstat con el parámetro **-W**:

```bash
$ sudo netstat -apWA inet | grep https
tcp        0      0 hkr-pc.local:50974      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:48162      ec2-50-18-192-251.us-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50145      ec2-46-51-197-88.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50149      ec2-46-51-197-88.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:49490      fa-in-f113.1e100.net:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:48158      ec2-50-18-192-251.us-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:59060      mad01s08-in-f31.1e100.net:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50147      ec2-46-51-197-88.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50976      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50972      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50973      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50977      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50144      ec2-46-51-197-88.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:50148      ec2-46-51-197-88.eu-west-1.compute.amazonaws.com:https TIME_WAIT   -
tcp        0      0 hkr-pc.local:50975      ec2-176-34-135-167.eu-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
tcp        0      0 hkr-pc.local:48163      ec2-50-18-192-251.us-west-1.compute.amazonaws.com:https ESTABLISHED 3619/firefox.real
```

Con el comando de arriba estoy mostrando únicamente las conexiones *https* establecidas con mi máquina. Ahora, sí que se ven las direcciones completas. Si te diriges a la dirección <a href=" http://ec2-176-34-135-167.eu-west-1.compute.amazonaws.com" target="_blank">ec2-176-34-135-167.eu-west-1.compute.amazonaws.com</a> podrás comprobar que dicha dirección pertenece al buscador **duckduckgo**. Y ha sido listada por netstat porque al momento de ejecutarlo tenía una pestaña del navegador abierta con el buscador del pato.

Veamos ahora la razón de que existan dos conexiones con datos pendientes en la cola de entrada y salida.

Ambas conexiones son de **dropbox**, una de ellas tiene el estado TCP en *ESTABLISHED*, así que de esa no hay que preocuparse, ya que está transmitiendo datos. La otra sin embargo tiene datos pendientes en la cola de entrada y estado TCP *CLOSE WAIT*, es decir, la máquina conectada a la nuestra ha cerrado la conexión, pero nuestro proceso local de dropbox no lo ha hecho. Lo cual quiere decir que aunque haya finalizado la tarea que se estaba llevando a cabo, no se han liberando los recursos que el socket había reservado. Estos escenários no deberían producirse, pero mientras no haya demasiados casos como este no debes preocuparte.

He comentado que en ocasiones es posible que tanto en la columna **Local Address** como en **Foreign Address** aparezca la dirección local de nuestra máquina. Este comportamiento lo usan algunos programas para conseguir que la aplicación sea multiplataforma, ya que la comunicación a través de la red no varía de plataforma a plataforma (Linux, Windows, mac ect.)

Otro de los posibles valores que puede aparecer en la columna **Foreign Address** es \*:\*, y si el tipo de conexión es TCP tendrá el estado *LISTEN*. Esto quiere decir que la máquina local está esperando a que otra máquina remota envíe datos. Ejemplos típicos pueden ser **sshd** (esperando a que alguien abra una conexión ssh), **apache** o **[nginx][1]** (Esperando a que alguien solicite una página web) etc.

Cuando se realiza una conexión externa, el programa local no suele preocuparse por el puerto local usado para la conexión. Esa es la razón por la que el puerto en el lado local no suele reconocerse y se traduce al nombre del protocolo como *https*, *www* etc.

Netstat también sirve para mostrar la tabla de rutas (**Routing Table**)

## Imprimiendo la tabla de rutas (Routing Table)

La tabla de rutas significa dedidir dónde mandar un paquete en base a su destino. Un ejemplo de estas tablas es el siguiente:

```bash
$ netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         10.61.29.89     0.0.0.0         UG        0 0          0 eth1
10.61.29.89     *               255.255.255.255 UH        0 0          0 eth1
192.168.1.32    *               255.255.255.248 U         0 0          0 eth1
```

Una breve explicación del significado de las columnas:

- **Destination**: Patrón con el que se compara la dirección de destino del paquete. Cuando se envia un paquete a internet, se comprueba esta tabla de arriba a abajo hasta que se cumpla el patrón, luego se envía. El valor 0 se usa como comodín, si usamos este patrón 192.168.1.0, las direcciones desde 192.168.1.1 hasta 192.168.1.255 serán valores válidos para dicho patrón.
- **Gateway**: Indica dónde mandar el paquete que coincide con el patrón de la columna anterior. El * en esta columna significa *“enviar localmente”* (El destino estará en la misma red.)
- **Genmask**: La máscara de subred. Se usa para determinar cuantos bits desde el principio de la ip se usan para identificar una subred.
- **Flags**: Muestra qué flags se aplican a cada línea de la tabla. **U** viene de **Up**, indicando que dicha línea está activa. **G** significa que la línea usa un Gateway. **H**, indica que el enrutamiento se hace a una dirección de host completa.
- **MSS**: *Maximum Segment Size*, parámetro TCP usado para dividir paquetes en partes más pequeñas cuando el destinatario indica que es capaz de trabajar con tamaños muy grandes. A dia de hoy, la mayoría de ordenadores no tienen problemas con esto, por lo que está fijado a 0.
- **Window**: Igual que MSS, permite alterar un parámetro TCP. En este caso el *default Window size*, que indica cuantos paquetes TCP pueden mandarse antes de que uno de ellos sea de *ACK*nowledged. Suele estar a 0.
- **irtt**: *Initial Round Trip Time*, puede ser usado por el Kernel para intentar adivinar la mejor configuración de parámetros para TCP. No suele usarse.
- **iface**: Establece la interfaz de red a usar para enviar los paquetes.

## Mostrar estadísticas e interfaces

También es posible, con netstat, mostrar las interfaces disponibles y listar algunas estadísticas de cómo se están comportando:

```bash
$ netstat -i
Kernel Interface table
Iface       MTU Met   RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
eth0       1500 0         0      0      0 0             0      0      0      0 BMU
eth1       1500 0    253744      0      0 0        153622      0      0      0 BMRU
lo        16436 0         4      0      0 0             4      0      0      0 LRU
```

El significado de cada columna es el siguiente:

- **Iface**: Interfaces disponibles para las que se muestran las estadísticas. *lo* es la interfaz de *loopback*, una interfaz privada usada por la máquina para comunicarse consigo misma, como se vió arriba, este comportamiento es frecuente y proporciona mayor rendimiento.
- **MTU**: *Maximum Transmission Unit* (*Unidad Máxima de Transmisión*) que la interfaz puede enviar de una sola vez.
- **RX-OK/ERR/DRP/OVR**: Estadísticas sobre los paquetes que se han recibido. *OK* significa “*Correctemente recibido*”, “*ERR*” recibido pero con <a href="http://es.wikipedia.org/wiki/Checksum" target="_blank">CheckSum</a> incorrecto (ocurre cuando la conexión es mala), “*DRP*” eliminado porque el buffer está lleno (Ocurre cuando se reciben muchos paquetes en un periodo muy corto de tiempo), “*OVR*”, eliminado porque el kernel no pudo manejarlo a tiempo (Si esto ocurre, la máquina estaba muy ocupada).
- **TX-OK/ERR/DRP/OVR**: Significan lo mismo que sus homólogos en la columna RX, pero para paquetes enviados por la interfaz.
- **FLG**: Flags activas para la interfaz. “*B*” de “*Capacidad de broadcast*”, es decir, la interfaz es capaz de transmitir un paquete a todos los equipos de su misma subred. “*M*” de “*capacidad de Multicast*”, la interfaz puede enviar paquetes con múltiples destinos. “*L*” de “*interfaz loopback*”, la interfaz con dicho flag activa coloca todo que envía inmediatamente en su cola de recibido. “*U*” y “*R*” significan “*Up*”(Activa) y “*running*”(ejecutandose) respectivamente.

El motivo por el que el valor del “*MTU*” es mayor en la interfaz de loopback se debe a motivos de rendimiento, ya que no tendrá que partir los paquetes en trozos más pequeños.

Como se aprecia en el ejemplo, todo parece estar correcto, ya que las columnas de errores están a 0. Una opción interesante de este comando es añadirle la opción *-c*, es decir “*netstat -ci*”, para ver la tabla cada segundo, y comprobar así si hay algún error.

Como nota final, y aunque este no es un artículo patrocinado, considero que debo proporcionar un enlace a la <a href="http://linuxacademy.com" target="_blank">Linux Academy</a>, perteneciente al autor cuyo artículo he traducido.

## Referencias

- *Netstat: network analysis and troubleshooting, explained* »» <a href="http://pinehead.tv/linux/netstat-network-analysis-and-troubleshooting-explained/" target="_blank">pinehead.tv</a>
- *Lista posibles estados TCP* »» <a href="http://www.tcpipguide.com/free/t_TCPOperationalOverviewandtheTCPFiniteStateMachineF-2.htm" target="_blank">tcpipguide.com</a>


 [1]: https://elbauldelprogramador.com/tags/#nginx
