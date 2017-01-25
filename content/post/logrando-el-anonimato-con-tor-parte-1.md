---
author: luzila
categories:
- aplicaciones
- articulos
- opensource
- seguridad
color: '#F57C00'
date: '2016-01-01'
image: 2012/11/081012_1601_AchievingAn21-300x86.png
lastmod: 2016-08-08
layout: post.amp
mainclass: articulos
url: /logrando-el-anonimato-con-tor-parte-1/
aliases:
- /articulos/logrando-el-anonimato-con-tor-parte-1
- /opensource/logrando-el-anonimato-con-tor-parte-1
tags:
- navegacion anonima
- Tor
title: Logrando el anonimato con Tor (Parte 1)
---

* Logrando el anonimato con Tor (Parte 1)
  * [Logrando el anonimato con Tor (Parte 2): Servidores DNS y Proxies][1]
  * [Logrando el anonimato con Tor (Parte 3): TorButton y Tsocks][2]
  * [Logrando el anonimato con Tor (Parte 4): Tor para relés][3]



Todos sabemos que Tor nos permite navegar anónimamente en Internet. En este artículo veremos cómo lograrlo y verdaderamente saber contra qué luchamos.

Primero instalemos Tor y empecemos a usarlo para desasirnos de algunas cosas. Hay muchos tutoriales en Internet que describen cómo instalar y usar Tor, pero mencionemos una vez más todos los pasos requeridos.

## 1. Instalación

Asumiremos que usas la distribución Ubuntu Linux, sin embargo los pasos son relevantes a su vez para otras distribuciones. Primero veamos [1] cómo agregar el repositorio correcto a la lista de fuentes. En caso de que uses Ubuntu 10.04 - las mismas versiones que Backtrack 5 R2 usa - ejecuta los siguientes comandos:

```bash
 lang="bash"># echo "deb http://deb.torproject.org/torproject.org lucid main" >> /etc/apt/sources.list
 # echo "deb-src http://deb.torproject.org/torproject.org lucid main" >> /etc/apt/sources.list
```

Luego instalemos Tor y Privoxy:

```bash
# apt-get update
 # apt-get install tor privoxy
```

En este punto deberíamos mencionar que ambos son:

- Tor: es usado para conectarnos con una red anónima sobre TCP
- Privoxy: es usado para conectar nuestro navegador sobre un proxy HTTP.

Agrega la siguiente línea al archivo `/etc/privoxy/config`:

```bash
# echo "forward-socks4a / <a href="http://127.0.0.1:9050" target="_blank">127.0.0.1:9050</a> ." >> /etc/privoxy/config
```

Además debes agregar las siguientes línas al archivo `/etc/tor/torrc`:

<!--more--><!--ad-->

```bash
AvoidDiskWrites 1
ControlPort 9051
Log notice stdout
SafeSocks 1
WarnUnsafeSocks 1
SocksListenAddress 127.0.0.1
SocksPort 9050
```

Por el momento no entraremos en detalles sobre qué significa cada opción, pero describiremos las variables de configuración interesantes más adelante. Primero iniciemos Tor y Privoxy:

```bash
# /etc/init.d/tor start
# /etc/init.d/privoxy start
```

Esto debería abrir dos puertos, el 9050 para Tor y el 8118 para Privoxy. Comprobemoslo:

```bash
# netstat -lntup
tcp 0 0 127.0.0.1:8118 0.0.0.0:* LISTEN 8520/privoxy
tcp 0 0 127.0.0.1:9050 0.0.0.0:* LISTEN 8540/tor
```
Ok, los puertos están en estado de escucha, lo que significa que todo está bien, porque pueden aceptar conexiones. el único paso que nos falta es configurar nuestro navegador para que use privoxy. Un ejemplo de configuración de Firefox se presenta en la siguiente imagen:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" class="size-medium wp-image-1027 alignnone" src="/img/2012/11/081012_1601_AchievingAn12-300x298.png" alt="" width="300px" height="298px"></amp-img>
</figure>

Podemos ver que configuramos el navegador para conectarse a traves del proxy que está corriendo en IP 127.0.0.1 y el puerto 8118, el cual es exactamente nuestro proxy Privoxy. Así nuestro navegador web se conecta a Privoxy, el cual se conecta en turnos a Tor, que nos permite navegar en Internet anónimamente.

Verifiquemos si el navegador está efectivamente usando la red Tor para navegar en internet de manera anónima. Podemos hacerlo visitando la URI <a href="http://check.torproject.org/" target="_blank">Check Torproject</a>. Si ves algo como la siguiente imagen, entonces hemos configurado Tor exitosamente y podemos navegar en Internet de forma anónima.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/11/081012_1601_AchievingAn21-300x86.png" alt="" width="300px" height="86px"></amp-img>
</figure>

En vez de configurarlo manualmente, también podemos usar Tor Browser Bundle, el cual integra prácticamente todo lo que necesitamos. Simplemente tenemos que descargar Tor Browser Bundle, extraerlo y ejecutar el script start-for-browser, de la siguiente manera:

```bash
# tar -xvzf tor-browser-gnu-linux-x86_64-2.2.37-1-dev-en-US.tar.gz
# cd tor-browser_en-US
# ./start-tor-browser
```

Este script primero inicia Vidalia, que es un QT frontend para Tor y se ve así:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/11/081012_1601_AchievingAn31-284x300.png" alt="" width="284px" height="300px"></amp-img>
</figure>

En esta imagen podemos ver que nos conectamos exitosamente a la red Tor (se conecta cuando se inicia Vidalia). Si clickeamos en &#8220;View the Network&#8221; (Ver la Red), obtendremos una lista de todos los nodos online que la red Tor está usando - esto puede estar más actualizado en <a href="http://torstatus.all.de/index.php?SR=Bandwidth&SO=Desc" target="_blank">Nodos Tor</a>.

El script tambien abrirá el navegador web Tor una vez que nos conectemos con éxito a la red Tor. Este navegador está basado en Firefox y se ve como en la siguiente imagen:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/11/081012_1601_AchievingAn41-300x86.png" alt="" width="300px" height="86px"></amp-img>
</figure>

Podemos ver que nuestro navegador está usando efectivamente la red Tor y podemos navegar en Internet de manera anónima.

## 2. Cómo funciona Tor


Antes de describir cómo funciona Tor, debemos saber cómo funciona la internet moderna. Cuando visitamos un sitio web como <a href="http://www.google.com" target="_blank">Google</a> estamos enviando una petición a uno de los servidores web de Google. Pero esto no sucede directamente de nuestra computadora al servidor de Google. Lo que ocurre es que nosotros enviamos la petición primero a nuestro router, seguido por el ISP (Internet Service Provider), el cual la reenvía a uno de los NIRs (National Internet Registries), que se encarga de reenviarla a uno de los LIRs (Local Internet Registries), que a su vez la reenvía a uno de los RIRs (Regional Internet Registries), etc, hasta que eventualmente el proceso es revertido una vez que la petición alcanzó el destino - el servidor de Google. Puede observarse esto usando el programa Traceroute que envía paquetes con un valor específico de TTL (Time to Live), que expira en cada salto (TTL es aumentado en 1 cada vez que el paquete es enviado para asegurar que expira) entre nuestro cliente y el servidor, revelando la identidad de cada nodo. Para encontrar todos los nodos que el paquete tiene que visitar cuando viaja a traves de Internet al servidor web de Google, podemos ejecutar el comando siguiente:


```bash
# traceroute www.google.com
```

El problema básico con esto es que todos los nodos intermediarios pueden monitorear nuestros paquetes transmitidos a traves de Internet. Incluso si usamos una conexión encriptada (HTTPS), algunos datos todavía pueden ser accedidos simplemente mirando en el encabezado TCP, como la IP de origen, la IP destino, tamaño de carga, tiempo de comunicación, etc.

¿Pero qué pasa si estamos usando Tor en el principio de la red? No podemos realmente ejecutar Traceroute cuando estamos usando Tor, dada la forma en que Tor fue diseñado. Dado que Tor no puede manejar paquetes ICMP (ping), no hay forma de saber a dónde serán dirigidos los paquetes. Esto es lo que hace que Tor sea seguro. Cuando estamos usando nuestro navegador conectado a la red Tor, estamos enviando peticiones a través de Internet usando el primer nodo de Tor, el cual la reenvía al siguiente nodo y el siguiente al siguiente, hasta que finalmente alcanza el destino.

En la red Tor, todavía necesitamos enviar nuestros paquetes a nuestra red personal, luego al ISP, dado que es nuestro proveedor de servicios de internet; sin ello, no podríamos incluso usar Internet. Pero adicionalmente, nuestros paquetes son además dirigidos a traves de la red Tor, donde son aleatoriamente dirigidos a nodos seguros. esto permite que nuestro tráfico no sea visto por un hábil atacante y el gobierno que está monitoreando el tráfico en cualquier ubicación en Internet.

El cliente conectado a la red Tor primero necesita una lista de nodos de Tor que puede ser obtenida de el servidor directorio. Podemos ver los nodos disponibles de Tor visitando <a href="http://torstatus.all.de/index.php?SR=Bandwidth&SO=Desc" target="_blank">Tor Nodes</a>, donde podemos encontrar bastante información sobre los nodos de Tor, incluyendo hostname, router name, uptime, ancho de banda disponible, etc.

Después de que el cliente ha obtenido dicha lista, necesita construir un circuito de conexiones entre los nodos de la red Tor. Cada conexión entre los nodos subsecuentes en un circuito es encriptado con diferentes claves de encriptación, por lo tanto cada nodo sólo conoce el anterior y el siguiente nodo en el circuito. Deberíamos mencionar además que Tor trabaja sobre el protocolo TCP y puede ser usado por cualquier aplicación que pueda ser configurada para enviar su tráfico a través de un proxy SOCKS. Esto no es totalmente correcto debido a que podemos torificar la aplicación con el uso de tsocks, lo cual describiremos en uno de los artículos subsiguientes.

__Entonces al fin y al cabo, la red Tor provee una manera de esconder el vínculo entre la dirección origen y destino de una conexión dada. Por lo tanto, un intruso no puede determinar de dónde viene la información y hacia dónde va, lo que nos convierte en anónimos.__

Pero la pregunta persiste: ¿puede realmente volvernos anónimos? La respuesta es sí y no. Necesitamos recordar que todos los paquetes que son enviados de nuestro cliente al servidor serán encriptados en el servidor. Esto realmente tiene sentido por cómo el servidor usaría la información y haría algo con ella si ésta fuera encriptada. En consecuencia, Tor provee anonimato sobre internet, pero no puede proveer los medios para mantenerte anónimo al servidor que está recibiendo la información.

Describamos esto un poco más. Si estamos enviando paquetes que contienen nuestro nombre de usuario, nombre de dominio o alguna otra información que indica nuestra presencia, entonces la máquina objetivo sabrá quiénes somos, aunque algún intruso que esté escuchando en un nodo intermediario tal vez no. Esto se reduce a lo siguiente:

En cada conexión a través de la red Tor, necesitamos tener en cuenta que a la información:

- El cliente la envía
- Internet la direcciona
- El servidor la recibe

Con Tor, podemos asegurarnos que Internet aunque canaliza la información, no tiene idea sobre la dirección origen ni destino que usamos, lo cual es crucial para mantener el anonimato sobre Internet. Pero la información enviada de un cliente hacia un servidor son visibles en los dos extremos de la conexión. Por lo tanto, para ser verdaderamente anónimos, incluso en la máquina destino, necesitamos no encapsular ninguna información sensible en el paquete de datos del tráfico entre el cliente y el servidor.

Con motivo de esconder la información del nivel de aplicación que pueda comprometer nuestro anonimato, podemos usar <a href="https://www.torproject.org/torbutton/" target="_blank">Torbutton</a>, una extensión de Firefox que inhabilita muchos posibles filtrados de información que nos puedan comprometer. O lo que es mejor, podemos usar<a href="https://www.torproject.org/projects/torbrowser.html.en" target="_blank"> Tor browser bundle</a>, el cual usa Vidalia para configurar e iniciar Tor. Éste además abre el navegador Web Tor con Torbutton integrado, el que podemos usar para buscar anónimamente en internet.

## 3. Variables de configuración de Tor

Presentemos lo que el manual dice sobre las variables de configuración que usamos en este artículo:

- __AvoidDiskWrites__: Si es distinto de cero, intenta escribir en el disco con menos frecuencia. Esto es útil cuando usamos memoria flash u otro dispositivo que soporta solo un limitado número de escrituras. (Default: 0)
- __ControlPort__: Si está seteado, Tor aceptará conexiones en este puerto y permitirá a esas conexiones controlar el proceso de Tor usando el protocolo &#8220;Tor Control Protocol&#8221; (descripto en control-spec.txt) Nota: a menos que especifiques también uno o más HashedControlPassword o CookieAuthentication, seteando esta opción causará que Tor permita que cualquier proceso en el localhost lo controle. (Setear ambos métodos de autenticación significa que cualquiera de los dos es suficiente para autenticar Tor). Esta opción es requerida por muchos controladores de Tor; muchos usan el valor 9051. Setealo en &#8220;auto&#8221; para dejar que Tor elija un puerto por vos. (Default: 0)
- __Log__: Envía todos los mensajes a la salida standard, a la salida de error standard, o al log del sistema (el valor de &#8220;syslog&#8221; sólo lo provee Unix). Reconocidos niveles de severidad son debug, info, notice, warn y err. Recomendamos usar &#8220;notice&#8221; en la mayoría de los casos, debido a que algo más verborrágico podría proveer información sensible a un atacante que obtenga los logs. Si se da solo un nivel de severidad, todos los mensajes de ese nivel o uno mayor serán enviados al destino listado.
- __SocksListenAddress__: Bindea hacia esta dirección para esperar por conexiones de aplicaciones de Socks-speaking. (Default: 127.0.0.1) Puedes especificar incluso un puerto (e.g. 192.168.0.1:9100) esta directiva puede ser especificada múltiples veces para bindear múltiples direcciones/puertos.
- __SocksPort__: Activa este puerto para esperar conexiones de aplicaciones Socks-speaking. Configuralo en 0 si no quieres permitir conexiones con aplicaciones vía SOCKS. Configuralo en &#8220;auto&#8221; para dejar que Tor seleccione un puerto por vos. (Default: 9050)

## 4. Configurar resolución DNS de forma segura

La única cosa que debemos realmente observar cuando usamos Tor es la resolución de DNS. Usualmente nuestra máquina cliente está usando nuestros propios servidores DNS, los cuales en turnos usan los servidores DNS del ISP, por lo tanto un intruso puede todavía obtener la IP origen y destino con el que nos estamos comunicando. Este es un comportamiento no deseado, porque el servidor DNS ve qué hostname estamos intentando resolver y conectarnos, lo que puede derivar en una revelación de usuario.

Nuestro navegador web usa un proxy SOCKS para conectarse a Tor. Debemos saber qué tipo de proxies SOCKS existen. Hay tres tipos de proxies SOCKS, listados a continuación:

- SOCKS 4: usa direcciones IP
- SOCKS 4a: usa hostnames
- SOCKS 5: usa direcciones IP y hostnames

Para probar si estamos resolviendo hostnames de forma local o remota, podemos editar la configuración torrc agregándole las siguientes líneas al archivo:

```bash
TestSocks 1
SafeSocks 1
WarnUnsafeSocks 1
```

- **TestSocks:** Cuando está activada esta opción, Tor genera una entrada en el log notice-level por cada conexión al puerto Socks indicando si la petición usó un protocolo de socks seguro o uno inseguro (mira lo comentado en SafeSocks). esto ayuda a determinar si una aplicación que usa Tor está posiblemente filtrando las peticiones DNS. (Default: 0)
- **SafeSocks**: Cuando está activada esta opción, Tor rechazará conexiones a aplicaciones que usan variantes no seguras de protocolo de socks - una que solo provea una dirección IP, significa que la aplicación está resolviendo el DNS primero. Más específicamente, estos son socks4 y socks5 cuando no lo hace el servidor DNS remoto. (Defaults: 0)
- **WarnUnsafeSocks**: Cuando está activada esta opción, Tor alertará cuando una petición recibida sólo contiene una dirección IP en lugar de un hostname. Permitirle a aplicaciones que resuelvan sus DNS es usualmente una mala idea y puede proveer tu ubicación a atacantes. (Default: 1)

En el próximo artículo describiremos cómo configurar el mecanismo de resolución de DNS para evitar cualquier posible robo de información.

## 5. Conclusión

Podemos ver que si somos cuidadosos podemos ser totalmente anónimos en Internet. Debemos vigilar que no resolvamos los hostnames de forma local y debemos no incluir información sensible en los datos de una aplicación que pueda desenmascararnos. Si cumplimos con esto, podemos realmente navegar de manera anónima en Internet.


### Referencias:

- Manual de Tor, <a href="https://www.torproject.org/docs/tor-manual.html.en" target="_blank">https://www.torproject.org/docs/tor-manual.html.en</a>.
- *Infosec* »» <a href="http://resources.infosecinstitute.com/tor-part-1/" target="_blank">Visitar sitio</a>


[1]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-2-proxies-y-servidores-de-dns/
[2]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-3-torbutton-y-tsocks/ "Logrando el anonimato con Tor (Parte 3) : Torbutton y Tsocks"
[3]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-4/ "Logrando el anonimato con Tor (Parte 4) – Tor para relés"
