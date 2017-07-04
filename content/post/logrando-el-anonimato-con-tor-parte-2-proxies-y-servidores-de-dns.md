---
author: luzila
categories:
- aplicaciones
- articulos
- opensource
- seguridad
date: '2016-01-01'
image: 2012/12/081012_1604_AchievingAn11-300x128.png
lastmod: 2017-07-04T12:29:33+01:00
mainclass: articulos
url: /logrando-el-anonimato-con-tor-parte-2-proxies-y-servidores-de-dns/
tags:
- navegacion anonima
- Tor
title: 'Logrando el anonimato con Tor (Parte 2) : Proxies y servidores de DNS'
---

* <a href="https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-1/" target="_blank">Logrando el anonimato con Tor (Parte 1)</a>
* Logrando el anonimato con Tor (Parte 2): Servidores DNS y Proxies
* [Logrando el anonimato con Tor (Parte 3): TorButton y Tsocks][1]
* [Logrando el anonimato con Tor (Parte 4): Tor para relés][2]


# 1. Usando Burp con Tor

Ya hemos visto en profundidad cómo configurar nuestro navegador web para usar Privoxy, el cual en turnos usa Tor para mantener el anonimato en internet. ¿Pero qué pasa si queremos interceptar peticiones con Burp? Para comprender mejor qué sucede, la imagen siguiente representa la cadena de nodos que cada petición (y respuesta) debe atravesar parapoder usar el proxy (en nuestro caso, Burp) sobre la red de Tor:

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="diagrama de nodos" src="/img/2012/12/081012_1604_AchievingAn11.png" width="300px" height="128px"></amp-img>
</figure>

Se puede observar que cada petición del navegador primero pasa por algún proxy (en nuestro caso Burp), el cual nos permite hacer algo con ella - en la mayoría de los casos es inspeccionar los parámetros del GET/POST y modificarlos un poco. Las peticiones luego son pasadas a la red anónima de Tor (la cual ya es parte de internet, pero en la imagen se representa Internet en un propio nodo por claridad).

Esa es una visión general de cómo deberían trabajar todos en conjunto, pero todavía falta configurar todos los componentes para que funcionen juntos correctamente. Primero se debe instalar Burp Suite (No se considera necesario detallar los pasos para ello). Cuando Burp está inicializado, se debe ver el puerto 8080 abierto y en estado LISTEN:

```bash
$ netstat -lntup tcp6 0 0 127.0.0.1:8080 :::* LISTEN 4315/java
```

<!--more--><!--ad-->

Dado que el navegador web debería enviar todas las peticiones a Burp, es necesario configurar el navegador web para que use Burp en lugar de Privoxy. La configuración para Firefox se presenta a continuación:

<figure>
    <amp-img sizes="(min-width: 501px) 501px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081012_1604_AchievingAn2" src="/img/2012/12/081012_1604_AchievingAn21.png" width="501px" height="498px"></amp-img>
</figure>

De esta forma Firefox envía todos los paquetes a través del proxy Burp, que corre en el host 127.0.0.1 en el puerto 8080.

A continuación es necesario configurar Burp para usar proxy SOCKS, el cual se inicializa y configura a través de Tor. El proxy SOCKS trabaja en un nivel más bajo que el proxy HTTP, por lo tanto tiene la posibilidad de redirigir no sólo peticiones HTTP. SOCKS es básicamente un proxy TCP, el cual puede interceptar y filtrar todas las conexiones TCP que pasan a través de él, lo que le permite no ser específico por aplicación; la aplicación sólo necesita tener la capacidad de enviar sus paquetes de datos a través del proxy SOCKS. Es posible configurar Burp para usar SOCKS en las opciones de Burp indicando &#8220;use SOCKS proxy&#8221;, como se puede observar en la siguiente imagen:

<figure>
    <amp-img sizes="(min-width: 642px) 642px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081012_1604_AchievingAn3" src="/img/2013/01/081012_1604_AchievingAn32.png" width="642px" height="234px"></amp-img>
</figure>

De esta forma se configura Burp para que use el proxy SOCKS corriendo en el host 127.0.0.1 (localhost) en el puerto 9050. Si se consultan nuevamente los puertos que estan en estado de escucha nuevamente, se puede observar que el puerto 9050 está asociado al servicio Tor:

```bash
# netstat -lntup
tcp 0 0 127.0.0.1:9050 0.0.0.0:* LISTEN 8520/tor
```

Repasando, hemos configurado el navegador para que use el proxy Burp en el puerto 8080, el cual en turnos utiliza el proxy SOCKS en el puerto 9050, razón por la cual exitosamente se logra el encadenamiento de proxies y en consecuencia se navega en internet de manera anónima, mientras seguimos teniendo la ventaja de poder modificar las peticiones con Burp.

# 2. Configurar Tor para resolver los hostnames de forma segura

En el artículo anterior aparecen los tipos de proxies SOCKS y algunas variables de configuración de Tor que se pueden usar en el archivo de configuración torrc. Además se debate porqué es importante resolver los hostnames de forma segura. Para revisar esta información visita la <a href="/logrando-el-anonimato-con-tor-parte-1/" target="_blank">parte 1</a>. Para continuar profundizando, analizaremos cómo configurar Tor para resolver los hostnames de forma segura.

Para realizarlo, disponemos de las siguientes soluciones:

## A: **Usar SOCKS4a**

No todas las aplicaciones soportan SOCKS4a, por lo tanto esta solución no es del todo viable, ya que necesitamos una solución universal que funcione con todas las aplicaciones.

## B: ***Torificar* la resolución de hostnames**

Es posible intentar *torificar* la aplicación de resolución de DNS que utilizamos. Pero es necesario tener cuidado, debido a que algunas aplicaciones no fueron construidas pensando en el modo anónimo. Algunos protocolos, como FTP (modo activo/pasivo), envían la propia dirección IP en la sección de datos del FTP, lo que lo hace muy difícil de anonimizar. Esto ocurre en el modo activo del data transfer en FTP. La siguiente imagen resume la inicialización de la trasferencia FTP:

<figure>
    <amp-img sizes="(min-width: 591px) 591px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081012_1604_AchievingAn4" src="/img/2013/01/081012_1604_AchievingAn42.png" width="591px" height="245px"></amp-img>
</figure>

Se pueden observar todos los pasos necesarios para empezar a enviar la información del servidor al cliente. Parece no ser mucho si no se presta atención. En el paso C, se envía el comando PORT, el cual es la raiz de los problemas para anonimizar. El comando PORT usa un formato como el siguiente:

PORT x,x,x,x,y,y donde x representa la IP del cliente y la y representa el puerto elegido que puede ser usado para la transferencia de datos. Por lo tanto en este caso el cliente revela su dirección IP perdiendo así su anonimato. Casos como estos hay que tener en cuenta al momento de *torificar* una aplicación.

No está relacionado directamente con el esquema de resolución de DNS, pero vale la pena nombrarlo ya que está relacionado con la utilización de Tor en una aplicación.

## C: **Usar tor-resolve**

Con tor-resolve se puede obtener la dirección IP de un hostname de manera muy sencilla. Todo lo que se necesita hacer es correr este programa con el hostname especificado, por ejemplo:

```bash
# tor-resolve www.google.com 127.0.0.1:9050
```

Este comando dice que queremos obtener la dirección IP del hostname www.google.com, y que queremos usar el proxy SOCKS de Tor corriendo en el host 127.0.0.1 en el puerto 9050, la cual es la combinación host:port default, pero la especificamos igual, por claridad.

D: **Usar el servidor DNS local TorDNS**

El servidor DNS local puede ser configurado, el cual direccionará todas las peticiones DNS através de la red de Tor. Tor provee un servidor DNS built-in, el cual puede ser setteado agregando variables de configuración al archivo /etc/tor/torrc . Más específicamente, es necesario agregar las siguientes variables:

```bash
DNSPort 53
AutomapHostsOnResolve 1
AutomapHostsSuffixes .exit,.onion
```

Para probar si TorDNS funciona, se puede usar el comando dig para consultarle a nuestro servidor DNS por una dirección IP. Por ejemplo:

```bash
# dig @localhost -p 53 www.google.com
```

Para asegurarnos que todas las peticiones DNS son realmente enviadas a través de nuestro servidor DNS local, es necesario además cambiar el archivo /etc/resolv.conf para apuntar al servidor DNS 127.0.0.1:53, por lo tanto todas las aplicaciones de la máquina usarán el sevidor DNS TorDNS para la resolución de hostnames. Si hacemos esto, notaremos un poco de retardo cuando consultemos un hostname que todavía no esté en caché, pero con las conecciones de internet actuales esto no debería ser un problema. Pero si de todos modos molesta, podemos configurar un servidor de nombres local para cacheo que podría almacenar los hostnames y sus correspondientes direcciones IP. En Linux hay un programa llamado dnsmasq, el cual es un servidor liviano de cacheo de DHCP y DNS, entre otros, el cual acepta consultas DNS y las responde directamente de la caché local o las redirecciona a un servidor DNS real. Una buena explicación de ello puede encontrase en [1].

Es necesario además asegurar que etc/resolv.conf no cambió para la próxima vez que los programas dhclient o dhcpcd estén corriendo. Para inhabilitar los cambios de dhclient sobre resolv.conf con sus propios nameservers, es necesario borrar el domain-name, domain-name-servers ydomain-search del archivo de configuración /etc/dhcp3/dhclient.conf . Para inhabilitar los cambios de dhcpcd en resolv.conf, es necesario borrar domain\_name, domain\_name\_servers y domain\_server del archivo de configuración /etc/dhcpcd.conf. Si tenemos ambos programas instalados, cambiar ambos archivos adecuadamente probablmente sea lo mejor.

# 3. ¿Cuál Proxy elegir?

Hay algunos proxies disponibles que podríamos usar, pero la mayoría de las comunidades utilizan Privoxy o Polipo. Hay un par de razones por las cuales es preferible usar Polipo que Privoxy, y se describen en detalle aquí: Privoxy vs. Polipo. Para resumir, estas son las razones por las cuales Polipo es la mejor opción:

* Privoxy no tiene pipelining para HTTP 1.1
* Privoxy cachea los objetos más pedidos
* Privoxy necesita transferir la página entera para parsearla y mostrarla al usuario. Esto significa que la experiencia del usuario con Privoxy es mucho peor, debido a que el usuario debe esperar constantemente que los datos de la página web completa sean transferidos desde el servidor, antes de ser mostrados.

Pero hay otra pregunta que debemos hacernos. ¿Por qué necesitamos incluso un proxy HTTP si podemos usar el proxy de Tor SOCKS desde el navegador? La respuesta es que generalmente el proxy SOCKS del navegador usa algunas variables de configuración default que no toleran Tor de la misma forma que Privoxy o Polipo pueden. Lo más sorprendente son los timeouts, que ocurren muy frecuentemente si usamos directamente el proxy SOCKS.

# 4. Tor Hidden Services: Cómo puedo mantenerme anónimo y hostear mi propio servidor en la red Tor

Los servicios ocultos de Tor usan el hostname que termina con el dominio .onion . Ese TLD (Top Level Domain) no puede ser usado sobre Internet normalmente; sus correspondientes hostnames sólo pueden usarse sobre la red de Tor, la cual sabe cómo resolverlos dentro de sus direcciones IP ocultas.

Veamos qué pasa si intentamos resolver un hostname de DuckDuckGo, el cual es un motor de búsqueda usado para buscar websites en la red anónima de Tor. Usemos los comandos dig y tor-resolve de la siguiente forma:

```bash
tor-resolve 3g2upl4pq6kufc4m.onion 127.0.0.1:9050
dig @localhost -p 53 3g2upl4pq6kufc4m.onion
```

Ambos comandos reportan la dirección IP 127.192.0.10. Podemos observar que esa dirección IP pertenerce al localhost, dado que todas las direcciones IP 127.0.0.0/24 son asignadas al localhost, de hecho 127.0.0.1 es la más comunmente usada. Esto efectivamente logra anonimizar los servidores web en la red Tor, ergo, no se pueden rastrear.

Pero hay más que contar en esta historia que sólo la resolución de los dominios .onion, pero no entraremos en detalle por el momento - queda pendiente para futuros artículos.

# 5. Opciones de log en Tor

Si instalamos Vidalia, entonces podemos ver nuestros logs en el &#8220;Message Log&#8221;, pero si no usamos Vidalia, obtener nuestros logs puede ser un poco más complicado. Si todo está configurado y funcionando, probablemente podemos obtener los logs buscando en el directorio /var/log/tor. El siguiente comando muestra los logs como aparecen en la pantalla:

```bash
tail -f /var/log/tor/tor
```

Pero hay también varias opciones de log que podemos configurar en el archivo /etc/tor/torrc. Las variables de configuración relevantes son las siguientes:

```bash
Log minSeverity-maxSeverity stderr|stdout|syslog
```

Envía todos los mensajes entre la mínima y máxima severidad a alguno de los canales de salida: standard error, standard output o syslog.

```bash
Log minSeverity-maxSeverity file <filename></filename><filename>.
```

Los niveles de severidad son los siguientes: debug, info, notice, warn y err. Una buena opción de configuración es la siguiente:

```bash
Log notice-err file /var/log/tor/tor
```

Esto efectivamente loggea todos los mensajes al archivo /varlog/tor/tor.

# 6. Opciones de configuración avanzada de Tor

## HTTPProxy

  * Configura a Tor para hacer peticiones de directorio a través del host:port especificado por esta variable de configuración.

## HTTPProxyAuthenticator

  * Especifica el nombre de usuario y contraseña usados para autenticarse en el proxy HTTP.

## HTTPSProxy

  * Configura a Tor para hacer todas las peticiones de conexión SSL através del host:port especificado en esta variable.

## HTTPSProxyAuthenticator

  * Especifica el nombre de usuario y contraseña necesarios para autenticarse en el proxy HTTPS.

## Socks4Proxy

  * Configura a Tor para establecer todas las conexiones a través del proxy SOCKS4 en el host:port.

## Socks5Proxy

  * Configura a Tor para establecer todas las conexiones a través del proxy SOCKS5 en el host:port.

## Socks5ProxyUsername

  * Especifica el nombre de usuario utilizado para autenticarse en el proxy SOCKS5.

## Socks5ProxyPassword

  * Especifica la contraseña utilizada para autenticarse en el proxy SOCKS5.

## KeepAlivePeriod

  * Especifica el tiempo que usa Tor para enviar *keepalives* para mantener la conexión abierta.

## ControlPort

  * Especifica el puerto en el cual podemos conectarnos a Tor y controlarlo. Si se setea en &#8216;auto&#8217;, Tor automáticamente elige un puerto por nosotros, de otra manera usa el especificado.

## NewCircuitPeriod

  * Considera construir un nuevo circuito por cada N segundos (default: 30 segundos).

Las opciones de configuración que son relevantes para el proxy SOCKS en la red Tor son las siguientes:

## SocksPort:

  * Determina en qué número de puerto el proxy SOCKS escuchará por conexiones entrantes.

## SocksListenAddress

  * Determina en qué dirección IP los proxies SOCKS escucharán las conexiones entrantes.

## SocksTimeout

  * Determina en cuánto tiempo Tor puede intentar establecer un circuito antes de que se cumpla el timeout (default: 2 minutos).

Deberíamos comprender las últimas 3 variables de configuración, dado que son muy importantes porque el proxy SOCKS es obligatorio como un entry point a la red Tor.

# 7. Finalizando

Queda pendiente analizar Torbutton y tsocks para ver cómo anonimizarnos en Internet, para usar una aplicación sobre la red Tor incluso cuando no traen soporte para el servidor proxy SOCKS.

# Referencias

- *InfoSec Institute Resources* »» <a href="http://resources.infosecinstitute.com/tor-part-2/" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-3-torbutton-y-tsocks/ "Logrando el anonimato con Tor (Parte 3) : Torbutton y Tsocks"
 [2]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-4/ "Logrando el anonimato con Tor (Parte 4) – Tor para relés"
