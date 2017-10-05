---
author: luzila
categories:
- seguridad
- articulos
mainclass: seguridad
date: '2016-01-01'
image: 2013/04/081712_1515_AchievingAn1-300x114.png
lastmod: 2017-10-05T19:31:45+01:00
url: /logrando-el-anonimato-con-tor-parte-3-torbutton-y-tsocks/
tags:
- privacidad
- Tor
title: 'Logrando el anonimato con Tor (Parte 3) : Torbutton y Tsocks'
---

* [Logrando el anonimato con Tor (Parte 1)][1]
* [Logrando el anonimato con Tor (Parte 2): Servidores DNS y Proxies][2]
* Logrando el anonimato con Tor (Parte 3): TorButton y Tsocks
* [Logrando el anonimato con Tor (Parte 4): Tor para relés][3]

# 1. Introducción

En los artículos previos: <a href="https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-1/" target="_blank">Parte 1 </a>y <a href="https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-2-proxies-y-servidores-de-dns/" target="_blank">Parte 2</a> usamos de forma extensiva Tor Browser Bundle que nos ayuda a garantizar el anonimato.

Con Tor Browser Bundle, podemos facilmente comenzar a usar Tor sin instalar ni configurar ninguna otra cosa adicional. Contiene además  un proyecto interesante, un navegador web que está basado en Firefox y está configurado específicamente para proteger nuestra identidad en Internet. No entraremos mucho en detalle sobre las características de Tor Browser Bundle, pero miraremos específicamente las características caseras en el navegador Firefox que nos protegen de perder nuestra identidad. Tor Browser Bundle contiene los siguientes componentes:

* **Vidalia**: Una interface gráfica de usuario para Tor.
* **Tor**: Un componente que te permite asegurar el anonimato .
* **Mozilla Firefox**: Un navegador web.
* **Torbutton**: Se encargar de aplicar los niveles de seguridad por lo que Firefox no es vulnerado en ninguna información de seguridad.

Podemos además descargar el código fuente de Tor Browser Bundle de <a href="https://www.torproject.org/projects/torbrowser-details.html" target="_blank">aquí</a> y construirlo nosotros mismos.

Al iniciar Firefox, aparecerá la siguiente pantalla:

<!--more--><!--ad-->

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1515_AchievingAn1" src="/img/2013/04/081712_1515_AchievingAn1.png" width="300px" height="114px"></amp-img>
</figure>

# 2. Torbutton

El sitio oficial de Tor recomienda que usemos el boton Torbutton como parte del Tor Browser Bundle y no instalar Torbutton nosotros mismos ya que un error humano puede resultar por configurar Firefox de manera incorrecta. Esto podría entonces implicar falta de seguridad y liberación de información privada. Torbutton solía integrarse a Firefox por medio de un plugin y teníamos la posibilidad de instalarlo manualmente, pero luego fue removido de los addons, por lo que nos obliga a usarlo junto con Tor Browser Bundle.

Veamos los factores que pueden comprometer la seguridad de Torbutton en la red [1]:

1. Exit Node o Upstream Router
  * En este escenario, un atacante corre un *exit node* en la red Tor, o controla el router que está ubicado entre el exit node y la máquina destino. El atacante puede entonces interceptar peticiones/respuestas que viajan del cliente al servidor y cambiarlas para revelar la identidad del usuario.
2. Servidores de Anuncios y/o Sitios Web maliciosos
  * Cuando un atacante controla el sitio que estamos tratando de alcanzar obviamente puede alimentarnos con respuestas anómalas que pueden comprometer nuestro anonimato.
3. Red local/ISP/Upstream Router
  * El peligro aquí yace en un atacante que controla cualquier router entre la red local, el ISP y el sitio web destino. Esto puede ser peligroso si el usuario tiene Tor desactivado porque el atacante puede entonces inyectar código arbitrario dentro de la conexión cliente. Esto es sólo probable cuando estamos habilitando/inhabilitando Tor constantemente, por lo que el atacante puede analizar la correlatividad entre el tráfico con y sin Tor, y descubrir nuestra dirección IP fuente.
4. Acceso físico
  * Cuando un atacante tiene acceso físico a la máqina del cliente, puede hacer casi cualquier arbitrariedad a la máquina. Esto puede llevar obviamente a la pérdida del anonimato.

Podemos ver que el anonimato del usuario puede ser fácilmente violado si un atacante puede obtener acceso a la red local, routers entre las redes locales, e ISP a un nodo de entrada de Tor (o un nodo de salida de Tor al sitio web destino) incluyendo el sitio web mismo. Por favor pon atención a que no cualquier nodo es parte de la red Tor. Si pensamos un poco en esto, todo tiene sentido. Dado que todas las conexiones están encriptadas, es solo la red Tor misma la que no es vulnerable, por lo que el atacante no puede inyectar código malicioso como respuesta a nuestra petición.

Ahora veamos cómo un atacante puede comprometer el anonimato de un usuario final: Primero necesitamos asumir que un atacante puede inyectar una respuesta arbitraria dentro de nuestro navegador como describimos antes. Los posibles vectores de ataque se resumen a continuación [1]:

## Inserción de JavaScript

Si un atacante inserta JavaScript en una de las respuestas devueltas al usuario, puede realizar actividad en la red luego de que Tor haya sido desactivado. Por lo tanto puede revelar la verdadera identidad del usuario y llevar a descubrir la dirección IP externa. JavaScript además tiene acceso al historial del navegador y funciones que pueden devolver información del sistema operativo, CPU y usuario agente que utilizamos, dejándonos cada vez menos anónimos.

## Inserción de Plugins

Un plugin de Firefox que incluya trabajo en la red debería obedecer la configuración del proxy del navegador. Pero puede también desobedecerlo y escapar de esta configuración instanciando la conexión normal a Internet sin pasar por Tor en ningún momento. Este proceso de bypass revela la IP del cliente al sitio web destino. Si el plugin contiene vulnerabilidades, es además posible explotarlas, nuevamente, revelando la identidad del usuario.

## Inserción de CSS

Si un atacante puede inyectar CSS, puede entonces hacer que el navegador web revele la dirección IP externa del cliente a través de popups CSS, los cuales son manejadores de eventos que obtienen contenido a través del atributo CSS *onmouseover.* Ahora imagina que esos popups tienen la posibilidad de conectarse a Internet y envíar peticiones al sitio web destino *bypasseando *Tor.

## Lectura e inserción de Cookies

Si un atacante puede obtener una cookie de un usuario autenticado, puede, por supuesto, logearse como el usuario sin demasiado esfuerzo. Esta funcionalidad debería ser prevenida por el uso de clientes certificados que bloquearían los atacantes de identificarse con un usuario arbitrario incluso si el mismo atacante consiguió de alguna manera las cookies de usuarios relevantes.

## Creación de contenido arbitrario en Caché

Un navegador web puede almacenar un montón de información en su caché para acceder más rápidamente al recurso cuando es requerido de nuevo - de los cuales algunos son identificadores únicos. Dado que la caché no tiene la misma política origen, estas entradas pueden ser leidas por cualquier dominio, y por ende revelar información sensible al atacante.

## Usuarios con *Fingerprint (*Huella digital) basada en atributos del navegador

Si un atacante puede tomar la huella digital del navegador web del usuario, puede obtener una gran cantidad de información de las propiedades del navegador, las cuales pueden identificar unívocamente al usuario. Si el sitio web recuerda esas configuraciones puede revelar la identidad del usuario cuando visita el sitio web destino normalmente a través de Tor. Esto es posible por todas las formas que un usuario puede configurar su navegador web para hacerlo único - la más común es personalizando el navegador utilizando un set de plugins.

## Aprovechar un navegador o Sistema Operativo de forma local o remota

Un atacante puede incluso explotar al navegador web mismo, al plugin, o la vulnerabilidad del sistema operativo, para obtener accesos a la máquina cliente. Esto lleva a comprometer totalmente al sistema del cliente, el cual por supuesto también revela la dirección IP externa.

De todos los puntos mencionados, podemos captar que un componente efectivo de Torbutton se necesita para esconder cualquier información personal del usuario que puede revelar la identidad del cliente. Esto puede lograrse implementando las siguientes caracteristicas:

## Obediencia al Proxy

El navegador web debe usar el proxy Tor todo el tiempo y no debe permitir que ningún componente de red habilitado lo bypassee y acceda a Internet por la vía normal.

## Separación de Estado

Toda la información guardada por el navegador web para mejorar la experiencia del usuario, como las cookies, el historial, DOM, caché, etc, debería ser accesible sólo cuando se usa en el estado Tor-enabled.

## Aislamiento de la red

Todas las páginas web que fueron accedidas por el navegador deben utilizarse para mejorar la actividad de red solamente cuando se trabaja en el estado Tor-enabled.

## Tor Oculto

Si el sitio web objetivo está identificando la huella digital del navegador web utilizado para accederlo, puede ser una gran utilidad ocultar la presencia de Tor. De todos modos, esconder el navegador web utilizado con su número de versión y plugins instalados puede ayudar a reducir la efectividad de identificar digitalmente al navegador web.

## Evitar el disco

El navegador web no debería escribir ninguna información relacionada con Tor en el disco rígido, pero debería almacenarla en memoria hasta que el usuario cierre el navegador web, momento en el cual el navegador debería descartar toda la información. Esto asegura que los datos persistentes no quedan yaciendo abandonados en algún lugar del disco rígido incluso luego de que el usuario haya terminado de visitar el sitio.

## Neutralidad de la ubicación

El navegador web debería prevenir que se flitre cualquier información sobre la zona horaria a través de la red Tor.
Set de preservación del anonimato
El navegador web debería prevenir que se flitre cualquier información que pueda ser tomada como huella digital para el sitio web destino ( plugins instalados, user agent, etc). Debería prevenir que el sitio web destino pueda rastrear usuarios con la información tomada como huella digital, la cual puede ser utilizada para descubrir el cliente actual conectado a un sitio web incluso cuando Tor está activado.

## Actualización segura

El navegador web debería bloquear cualquier actualización sin autenticar vía Tor, dado que atacantes pueden inyectar un programa de actualización malicioso al navegador.

Presentamos algunas razones de porqué los usuarios deberían utilizar Torbutton e inmediatamente integrar Tor Browser Bundle dentro del navegador web Firefox. Este provee algunas modificaciones que pueden hacer a nuestra navegación web más segura y anónima. Si usamos Torbutton fuera de Tor Browser Bundle, existe un gran riesgo de que el navegador haga algo inesperado, que pueda comprometer a nuestro anonimato.
Debemos mencionar también que Torbutton está integrado dentro de Firefox solamente, dado que es open source. Torbutton no tiene soporte disponible para otros navegadores como IE, Opera, Safari, etc. ni nunca tendrá.

# 3. Tsocks

Tor tiene el proxy SOCKS corriendo en el puerto 9050 que podemos usar para asegurar anonimato en cualquier tráfico que se envíe a través del proxy SOCKS a la red Tor. Pero nuestra aplicación necesita tener soporte para este proxy, o de lo contrario no podremos usarla para acceder a internet de forma anónima. Pero no hay que alarmarse todavía. Hay una solución para este problema. Incluso si el programa no tiene soporte para el servidor proxy SOCKS, o cualquier otro servidor proxy que importe, podemos garantizarnos navegar en internet anónimamente utilizando el programa Torify. Éste usa un programa llamado tsocks que puede enviar conexiones TCP a través del servidor SOCKS. Podemos además utilizar directamente tsocks para lograrlo, como vemos a continuación:

Primero necesitamos instalar tsocks si todavía no lo hemos hecho. Por ejemplo, si utilizamos la distribución de Linux Ubuntu, ejecutamos en un terminal:

```bash
apt-get install tsocks
```

Si instalamos en la distribución [Gentoo](/como-instalar-actualizar-elminar-paquetes-gentoo/ "Cómo Instalar/actualizar/eliminar Paquetes en Gentoo"), primero tenemos que activar tordns useflag, la cual permite que las consultas de DNS sean enviadas por Tor y elimina el problema de filtración por DNS que comentábamos en la parte 2. Para instalarlo entonces debe ejecutarse:

```bash
echo "net-proxy/tsocks tordns" >> /etc/portage/package.use
emerge net-proxy/tsocks
```

Luego necesitamos configurar tsocks para usar Tor. Podemos hacerlo editando el archivo de configuración `/etc/tsocks.conf` . Lo mínimo indispensable que debe contenter es lo siguiente:

```bash
local = 192.168.1.0/255.255.255.0
server = 127.0.0.1
server_type = 5
server_port = 9050
```

Con la variable de configuración local podemos especificar que esta máquina puede acceder directamente a la red 192.168.1.0/24. Las otras variables indican el host y el puerto del sevidor SOCKS de Tor y su tipo, el cual en este caso es 5 (el valor default es 4).

La sintaxis del comando de tordns es muy sencilla y se puede obtener en la página del <a href="http://linux.die.net/man/1/tsocks" target="_blank">man page</a> de Linux:

```bash
tsocks [aplicacion [argumentos para la aplicacion]]
# o
tsocks [on|off]
# o
tsocks
```

Podemos ver que necesitamos especificar la aplicación que queremos que utilice el proxy de Tor. Nótese que sólo los paquetes TCP serán ruteados a través de Tor; los paquetes UDP serán distribuidos normalmente, por lo que tenemos que tener cuidado de ello. Podemos testear rápidamente esto accediendo a un archivo en nuestro propio servidor web Apache con el programa wget. Primero tenemos que hacer los siguientes cambios en nuestra máquina servidora para que podamos observar todos los accesos a los recursos de Apache:

```bash
tail -f /var/log/apache2/access.log
```

A continuación deberíamos descargar algunos recursos normalmente (sin tsocks) para confirmar que la dirección IP se muestra correctamente. Cuando estamos seguros que eso ocurre, podríamos testear tsocks para asegurarnos que la IP es anónima:

```bash
tsocks wget http://www.server.com/image.png
```

En el log de acceso deberíamos observar una entrada como la siguiente:

```bash
31.172.30.1 – – [18/Jul/2012:00:33:25 +0200] “GET /image.png HTTP/1.0″ 200 695 “-” “Wget/1.12 (linux-gnu)”
```

Podemos ver que pedimos el archivo image.png de la dirección IP 31.172.30.1. Para verificar incluso si la IP es parte de la red Tor, podemos clickear en &#8220;View the Network&#8221; en la GUI Vidalia, la cual nos lista todos los nodos en la red Tor. Entre todos ellos está también el nodo con la IP 31.172.30.1 como se representa en la imagen siguiente:

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="081712_1515_AchievingAn2" src="/img/2013/05/081712_1515_AchievingAn2.png" width="300px" height="99px"></amp-img>
</figure>

Podemos ver que el nodo Tor está ubicado en Alemania, tiene la IP 31.172.30.1, y está levantado desde hace 48 días, etc. Por lo tanto, hemos validado que el nodo es parte de la red Tor, y por lo tanto tsocks funcionó como era esperado.

# Referencias

- *InfoSec Institute Resources* »» <a href="http://resources.infosecinstitute.com/tor-part-3/" target="_blank">Achieving Anonymity with Tor Part 3</a>
- *(1) Tor Project* »» <a href="https://www.torproject.org/torbutton/en/design/" target="_blank">Torbutton Design Documentation</a>

 [1]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-1/ "Logrando el anonimato con Tor (Parte 1)"
 [2]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-2-proxies-y-servidores-de-dns/
 [3]: https://elbauldelprogramador.com/logrando-el-anonimato-con-tor-parte-4/ "Logrando el anonimato con Tor (Parte 4) – Tor para relés"
