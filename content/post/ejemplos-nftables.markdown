---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2016-03-29 06:02:46
description: "nftables  es un  nuevo  framework  que  sustituye  al antiguo  iptables.
  Este  nuevo  software a\xFAn  no est\xE1  desarrollado  al 100% de sus funciones,
  tenemos  la problem\xE1tica de la implantaci\xF3n,   que aunque  se incluye desde
  el kernel  3.13, las personas  a\xFAn  no est\xE1n acostumbradas a su uso y por
  tanto  siguen usando  iptables  o en su defecto la nomenclatura  de sus reglas."
image: ejemplos-nftables.png
layout: post.amp
mainclass: articulos
tags:
- ejemplos nftables
- introduccion Netfilter
- tutorial nftables
- ejemplos nftables iptables
- comparacion nftables iptables
- diferencias nftables iptables
title: "Introducci\xF3n Y Ejemplos De NfTables"
---

> El siguiente artículo forma parte de un trabajo en grupo realizado para la asignatura _Seguridad en Sistemas Operativos_ de la facultad de Ingeniería Informática de Granada (ETSIIT), puedes leer el otro trabajo publicado en el blog, [Biometría Aplicada a La Seguridad](/biometria-seguridad-introduccion/ "Biometría Aplicada a La Seguridad"). Este trabajo es autoría de Jose Maria Caballero Alba <caballeroalba> y Edlin Lastenia Morel Mateo


## Qué es nftables

<a href="http://netfilter.org/projects/nftables/" target="_blank" title="">__nftables__</a> es un  nuevo  framework  que  sustituye  al antiguo  __iptables__. Este  nuevo  software aún  no está  desarrollado  al 100% de sus funciones, tenemos  la problemática de la implantación,   que aunque  se incluye desde el kernel  3.13, las personas  aún  no están acostumbradas a su uso y por tanto  siguen usando  __iptables__  o en su defecto la nomenclatura  de sus reglas.

> Quizá te interese el artículo [20 ejemplos de __iptables__ para SysAdmins novatos,](/20-ejemplos-de-iptables-para-sysadmins/ "20 ejemplos de iptables para SysAdmins novatos") u otro de los múltiples artículos sobre [iptables disponibles](/tag/#iptables "Artículos etiquetados con iptables").

<!--more--><!--ad-->

En pocas palabras:

- Disponible desde el kernel 3.13 en adelante.
- Trae una la nueva utilidad  `nft` con una sintaxis diferente a la de __iptables__.
- Tiene compatibilidad  con las instrucciones de __iptables__.
- Infraestructura genérica  de conjuntos  que permite  construir  mapas  entre  asignaciones y acciones para  mejorar las búsquedas.
- __Aún está bajo desarrollo.__

Las diferencias con __iptables__  son notables,  estas  son algunas diferencias proporcionadas  por su página oficial:

> Máquina  de pseudo-estados  en el espacio del kernel,  __nftables__  interpreta el mapa  de reglas proporcionadas  por el usuario  (con la nueva  sintaxis)  , esta se compila y entra  en la máquina  de estados como bytecode y esta misma la transfiere al kernel por la api Netlink’s de netflter.

Reduce el total  del código en el espacio del kernel.  Se puede elegir que selectores  de paquetes  de todos los protocolos existentes  puede usar  la máquina de pseudo-estados,  esto significa que no necesitamos  una  extensión  en espacio  de kernel  para  cada  protocolo  si queremos  soportarlo.    Esto  supone una ventaja,  ya que no necesitamos actualizar  el kernel para  obtener  nuevas características y esto ha sido diseñado para  trabajar en el espacio lógico de usuario.

Interfaz unificada para reemplazar las utilidades __iptables/ip6tables/arptables/ebtables__.

## Introducción a nftables

Como ya dijimos en la descripción del problema,  __nftables__  es un nuevo framework que sustituye  al antiguo __iptables__ para el filtrado de paquetes y clasificación de estos en Linux. __nftables__ es una combinación del núcleo de Linux y una utilidad  de espacio de usuario (lo que sería la antigua __iptables__, `nft`).  Usa la infraestructura de Netfilter, como el connection tracking  system.

### Requisitos de nftables

__nftables__  está operativo  desde el kernel 3.13, para  poder usarlo necesitamos  compilar este kernel o un kernel superior.  Además de la utilidad  nft para poder usar el framework la cual necesita las librerías libmnl (normalmente en los repositorios) y libnftnl.

Necesitamos instalar un kernel superior al 3.13, en este caso vamos a usar el ultimo kernel estables de kernel.org, siendo este a la fecha actual  el 3.16.5.

Por lo tanto,  para  la instalación debemos de hacer lo siguiente:

```bash
tar -xvJf linux-3.16.tar.xz
cd linux-3.16
make menuconfig
sudo make modules_install
sudo update−grub2
```

Una vez hecho esto, reiniciamos y ya tendríamos el kernel disponible en la selección de inicio de grub,  para  comprobar  que esta  todo  correcto,  basta  con abrir  un terminal  y poner `iuname -r`  debería de salir que tenemos un kernel 3.16.3

### Instalación  de  la  utilidad nft

Para  esto instalaremos  las 2 librerías necesarias (libmnl y libnfnl), para ambas necesitamos hacer:

```bash
git clone git://git.netflter.org/lib[mnl o fnl]
cd libnftnl
sh autogen.sh
./confgure
make
sudo make install
```

Ahora ya podemos instalar  la utilidad  nft:

```bash
git clone git://git.netflter.org/__nftables__
cd __nftables__
sh autogen.sh
./configure
make
make install
```

Y para  comprobar  su correcto funcionamiento  tecleamos:

```bash
sudo nft
```

Al cual debe responder `nft:  no command specified`. Confirmando su correcta  instalación.

## __iptables__ vs  __nftables__

Es interesante comparar  el uso de __iptables__  de manera  práctica  y compararlo  con lo que sería la traducción a __nftables__,  tenemos  que tener  en cuenta  que algunas  opciones de __iptables__  no están disponibles en __nftables__ por estar aún en desarrollo y viceversa.

### Diferencias principales entre nftables y iptables

- La primera  y más distinguible  es la sintaxis,  en __iptables__,  las flags van precedidas de dos guiones o uno (-p tcp)  en __nftables__ usa una sintaxis más limpia, inspirada  en tcpdump.
- Las tablas y las cadenas son totalmente configurables en __nftables__, contrariamente a __iptables__, que solo ofrece un set definido de tablas  y cadenas, __nftables__ permite  crear  cadenas  y tablas  propias  con sus correspondientes  configuraciones en función de lo que necesites.
- No hay distinción entre objetivos y targets,  en __nftables__ tenemos expresiones que son instrucciones  para  construir  nuestras  reglas.  Esto  es muy diferente en __iptables__  que requiere sintaxis de objetivos y targets  para  usar protocolos.
- Se pueden especificar varias acciones en una sola línea en __nftables__, con __iptables__ solo podemos especificar una.
- Los contadores  en __iptables__  son establecidos de manera  fija para cada tabla  y reglas, en __nftables__ se puede establecer de manera opciones estos contadores.
- Infraestructura de manera  genérica en lo sets en __nftables__,  esto permite  configuraciones avanzadas  como diccionarios, mapas.
- Actualizar  el kernel es una tarea que consume mucho tiempo, especial- mente si quieres mantener  más de un firewall en tu red.  Los distribuidores  normalmente usan versiones antiguas  del kernel de Linux por razones de estabilidad. Con la nueva máquina de estados de __nftables__ no es necesario actualizar  el kernel para  un nuevo protocolo, simplemente  es necesario actualizar  la utilidad nft.
- No es necesario el uso de guiones (-) o dobles guiones (-) para  el uso delas banderas

## Tablas cadenas y reglas en nftables

### Creando tablas con nftables

En __nftables__ seguimos contando  con las mismas tablas  que en __iptables__,  que siguen siendo las zonas en las que podemos crear cadenas y después crear reglas en ellas. La diferencia principal y más notable respecto a __iptables__ que podemos crear nuestras  tablas  y además no nos obliga a configurar una cadena  a la hora de crearla.  Para  configurar una tabla en __nftables__ tenemos el siguiente formato:

```bash
nft create table [ip] nombre tabla
```

Como vemos tenemos un formato más sencillo que además podemos crear la tabla  solamente sin configurar nada y decidir si pertenece (o no) a la familia ip. Un ejemplo muy sencillo de crear una tabla:

```bash
nft create table filter
```

Esto creará la tabla de tipo ip (por defecto, si no lo hemos especificado) filter, la cual no contiene cadenas ni reglas. Solo contiene la definición de la tabla en sí misma.

### Borrando tablas en nftables

En __nftables__  sí que se nos permite  borrar  una tabla,  con esto borraríamos la tabla,  sus cadenas y sus reglas. El formato a usar seria el siguiente:

```bash
nft delete table nombretabla
```

Y no es necesario nada  más, con esto podemos borrar  una tabla  en __nftables__,  cosa que con __iptables__  no podíamos.

### Creando cadenas en nftables

En  __nftables__  no tenemos  cadenas  por defecto dentro  de nuestras  tablas,  pero tenemos la posibilidad  de an˜adir las cadena  de tipo  base (input,  output, forward,  postrouting, prerouting) o crear cadenas personalizadas,  con el siguiente formato  seria para  las tipo base:

```bash
nft add chain ip nombreTabla nombreCadena typefilter hook [cadenabase] priority 0
```

Y un ejemplo:

```bash
nft add chain ip filter postrouting   type filter hook postrouting  priority  0
```

Esto no crearía la cadena de tipo base postrouting  dentro  de la tabla  filter, si queremos tener cadenas personalizadas,  simplemente hacemos:

```bash
nft add chain nombre tabla  nombre cadena
```

Ejemplo:

```bash
nft add chain filter input
```

### Borrando tablas en nftables

En  __nftables__  por  el contrario  podemos  borrar  tanto  cadenas  base  como no base,  solo necesitamos el nombre de la cadena, no nos importa  si es de un tipo u otro, tenemos el siguiente formato:

```bash
nft delete chain nombreTabla nombreCadena
```

Ejemplo:

```bash
nft delete chain flter output
```

El único requisito que nos impone __nftables__ para poder borrar una cadena es que no esté vacía.

### Creando reglas en nftables

En __nftables__  podemos ver a la hora de an˜adir  reglas que es mucho más comprensible para  el usuario.  El formato para  añadir una regla es:

```bash
nft add rule nombreTabla nombreCadena tcp upd ip daddr saddr dport sport drop accept reject counter
```

Los parámetros están simplificados, solo están algunos de los más usuales, se ver todas las opciones posibles en man  nft  Si quisiéramos usar  el ejemplo anterior  de __iptables__, bastaría con esto:

```bash
nft add rule flter input  tcp dport  22 drop.
```

Podemos  apreciar  que __nftables__  ofrece una  interfaz  más clara  en la creación de reglas respecto de __iptables__.

### Borrando reglas en nftables

Para  eliminar  una  regla  en __nftables__  lo podemos  hacer  de manera  similar  a  como lo hacemos en __iptables__,  listando  las reglas de una  tabla  especifica (en nuestro  caso filter) con el parámetro -a para  que nos muestre  el número de las reglas dentro  de la tabla.

```bash
nft list [table — tables] [nombreTabla − a]
# Ejemplo
nft list table filter -a
```

De esta manera,  identificamos la regla que queremos eliminar mediante  su handle, para ejecutar  a continuación  la orden de eliminación con el siguiente formato:

```bash
nft delete rule nombreTabla nombreCadena handle númerodeRegla
# Ejemplo
nft delete rule flter input  handle 2.
```

## Acciones sobre los  paquetes

### Aceptando y rechazando paquetes en nftables

Suponiendo  que ya tengamos  (como lo visto en los ejemplos anteriores)  una  cadena  y una tabla,  para  aceptar  los paquetes  de una cadena especifica podemos hacer:

```bash
nft add rule nombreTabla nombreCadena [operadores] accept
```

Y un ejemplo especifico, por ejemplo aceptar  el uso de ftp (hacia nuestro  host):

```bash
nft add rule filter input  tcp dport  21 accept
```

Para  rechazar  paquetes  haríamos  exactamente   lo mismo pero  cambiando  accept  por drop:

```bash
nft add rule nombreTabla nombreCadena [operadores] drop
```

### Saltando a cadenas

De manera  similar a __iptables__,  también podemos tener  cadenas personalizadas,  una vez tengamos creado alguna, podemos redirigir los paquetes  que venga por una cadena base (por ej input)  a esta cadena para  tratarlos ahí...  El formato a seguir es el siguiente:

```bash
nft add rule nombreTabla nombreCadena[operadores] jump cadenaPersonalizada
# Ejemplo
nft add rule filter input  tcp dport  9999 jump pruebaCadenaPersonal
```

### Log  de  paquetes en nftales

Para poder hacer un log de paquetes completo en __nftables__, necesitamos una versión mayor o igual a la 3.17, si se usa un kernel menor, se puede usar el siguiente comando para  permitir  el log:

```bash
modprobe iptLOG
```

Para  usar el log de paquetes  hacemos:

```bash
nft add rule nombreTabla nombreCadena [operadores] log
```

Y el mismo ejemplo que usamos en __iptables__  para  el login de conexiones ssh.

```bash
nft add rule filter input  tcp dport  22 ct state  new log prefix "Nueva conexión ssh" accept
```

### NAT en nftables

Como en __iptables__,  __nftables__  también puede hacer nat  y de manera  más simple por su sintaxis,  de nuevo, distinguimos entre SNAT (source nat)  y DNAT (destination nat).

#### SNAT en nftables

```bash
echo 1  /proc/sys/net/ipv4/ipForward
```

Hecho esto, debemos hacer:

```bash
nft add table nat
nft add chain nat  prerouting   type nat  hook prerouting  priority  0
nft add chain nat  postrouting   type nat  hook postrouting  priority  0
```

Con  esto  hemos  creado  la  tabla nat  con  las  cadenas  base  prerouting  y  postrouting (creamos  las 2 para  el ejemplo de snat  y dnat,  aunque  no es necesario si solo se implementa  uno de los casos).

Un ejemplo:

```bash
nft add rule nat  postrouting  ip saddr 192.168.1.0/24 oif wlan0 snat  8.8.8.8
```

De esta  manera,  si nuestro  host  es un router  que está  conectado  a la red indicada  los host que tengan  configurada  como gateway  nuestro  host,  cambiará 8.8.8.8 de los paquetes  que salgan  de nuestra  red.

#### DNAT en nftables

Para  hacer  dnat,  si tenemos  algún servidor  web en nuestra  red y queremos que sea accesible desde el exterior  si se está usando nat,  debemos de seguir el mismo formato que en el anterior  caso, y bastaría con lo siguiente:

```bash
nft add rule nat  prerouting  iif wlan0 tcp dport  80 dnat  192.168.1.3
```

De esta manera, se podrá acceder al servidor web desde el exterior de nuestra  red.  Cabe decir que __nftables__ nos permite  hacer tambien un set de puertos para un mismo destino.

## Ejemplos de nftables

Para  terminar  podemos exponer un uso práctico de __nftables__ en una red, el problema es:

Tenemos una empresa, en la cual tenemos 3 subredes: 192.168.1.0/24, 192.168.2.0/24 y 192.168.3.0/24.

Para la red 192.168.1.0/24 tenemos los requisitos siguientes:

- Esta compuesta por 2 servidores, uno web (192.168.1.2)y otro ftp (192.168.12), en los cuales se debe implementar  nat.
- Los servidores SOLO deben de escuchar/responder peticiones, jamás hacerlas hacia el exterior.

Para  red 192.168.2.0/24 tenemos los siguientes requisitos:

- Esta  formada  por trabajadores de la empresa,  por tanto  pueden  acceder hacia el exterior.
- No se permite  el uso de ciertas páginas web (facebook y twitter).
- No pueden recibir peticiones del exterior..

Para  la red 192.168.3.0/24 tenemos los siguientes requisitos:

- Esta  formada  por  equipos en pruebas,  por  tanto solo pueden  tener  acceso entre  ellos y nunca  pueden  recibir  peticiones  desde el exterior  ni tampoco acceder a este.

Para  la red 192.168.1.0/24:

```bash
nft add rule nat prerouting  ip daddr 192.168.1.2 tcp dport 80 dnat 192.168.1.2
nft add rule nat prerouting  ip daddr 192.168.1.3 tcp dport 21 dnat 192.168.1.3
```

Para  la red 192.168.2.0/24:

```bash
nft  add  rule  filter  input  ip saddr  192.168.2.0/24  ct  state  new,  established accept
nft add rule filter input  ip daddr  192.168.2.0/24 ct state  new drop
# (Suponiendo  facebook.es - 8.8.8.8 y twitter.es - 8.8.8.4)
nft add rule filter input  ip saddr 192.168.2.0/24 ip daddr  8.8.8.8, 8.8.8.4 drop
```

Para  la red 192.168.3.0/24:

```bash
nft add rule filter input  ip saddr 192.168.3.0/24 drop
nft add rule filter input  ip daddr  192.168.3.0/24 drop
```

## Conclusiones

__nftables__ es un framework que su finalidad es eliminar o solventar problemas de __iptables__ remplazándolo, presenta una mejora en la sintaxis, las tablas y las cadenas son completamente configurables dando una flexibilidad al usuario para que defina sola las reglas que se vayan a utilizar. Ipv4 y Ipv6 se pueden utilizar en una sola tabla simplificando la administración.

Se pueden especificar diferentes acciones en una sola regla lo cual nos permite el ahorro de tiempo y creación de reglas engorrosas como se solía hacer con __iptables__, además soportara nuevos protocolos sin la necesidad de hacer una actualización del kernel.

Como podemos analizar __nftables__ nos proporciona  numerosas ventajas y soluciones de problemas en la clasificación de paquetes sin embargo hay que tener en mente que aún esta en desarrollo.
</caballeroalba>
