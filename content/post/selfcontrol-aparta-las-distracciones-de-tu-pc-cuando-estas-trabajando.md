---
author: alex
categories:
- aplicaciones
- opensource
lastmod: 2017-09-08T12:10:22+01:00
date: 2017-09-08T12:10:24+01:00
mainclass: articulos
url: /selfcontrol-aparta-las-distracciones-de-tu-pc-cuando-estas-trabajando/
tags:
- agregar regla de iptables
- bloquear facebook con iptables
- bloquear facebook por iptables
- bloquear twitter con iptables
- bloquear webs
- comando iptables linux
- ejemplos de firewall
- impedir conexiones entrantes
- iptables
- iptables con servidor debian
- selfcontrol
title: "SelfControl, aparta las distracciones de tu pc cuando estás trabajando"
---

<figure>
    <amp-img sizes="(min-width: 192px) 192px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="selfcontrol" src="/img/2012/08/selfcontrol11.png" alt="" width="192px" height="192px" />
</figure>

Es fácil distraerse cuando estás sentado enfrente de un ordenador, sobre todo cuando se tienen pocas ganas de trabajar. Leyendo mi RSS encontré una aplicación que puede llegar a ser muy útil si te distras fácilmente; SelfControl.

Esta aplicación bloquea las páginas de internet durante el tiempo que digamos, es bastante fácil de usar y configurar.

Antes de instalarlo es necesario resolver las dependencias del paquete instalando lo siguiente:

```bash
sudo aptitude install libgtk2-perl libyaml-perl
```

Tras instalarlos, bajamos el e instalamos SelfControl:

```bash
wget http://svn.jklmnop.net/projects/SelfControl/selfcontrol_0.9-1_all.deb
sudo dpkg --install selfcontrol_0.9-1_all.deb
```

Ahora que está todo listo ejecutamos SelfControl desde la línea de comandos y nos aparecerá esta ventanita:

<!--more--><!--ad-->


<figure>
    <amp-img sizes="(min-width: 415px) 415px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Selfcontro1" src="/img/2012/08/Selfcontro11.png" alt="" width="415px" height="378px" />
</figure>

Donde aparecen las webs bloqueadas, una entrada de texto para añadir las páginas a bloquear y por cuanto tiempo.

Antes de configurarlo, hay que asegurarse de que todo esté correcto, abrimos una terminal para ver el estado de <a title="20 ejemplos de iptables para SysAdmins novatos" href="//20-ejemplos-de-iptables-para-sysadmins/" target="_blank">iptables</a>:


```bash
$ sudo iptables --list
Chain INPUT (policy ACCEPT)
  target     prot opt source               destination

  Chain FORWARD (policy ACCEPT)
  target     prot opt source               destination

  Chain OUTPUT (policy ACCEPT)
  target     prot opt source               destination
```

Si no sale algo parecido quizá no tengas instalado iptables, aunque la mayoría de las distribuciones lo traen por defecto.

Una vez que ejecutemos el programa aparecerá algo así:

```bash
$ sudo iptables --list
Chain INPUT (policy ACCEPT)
  target     prot opt source               destination

  Chain FORWARD (policy ACCEPT)
  target     prot opt source               destination

  Chain OUTPUT (policy ACCEPT)
  target     prot opt source               destination
  SelfControl  all  --  anywhere             anywhere

  Chain SelfControl (1 references)
  target     prot opt source               destination
  DROP       all  --  anywhere             www.example.com
```

- Sítio Oficial | <a href="http://svn.jklmnop.net/projects/SelfControl.html" target="_blank">SelfControl </a>
- Fuente | <a href="http://www.datamation.com/open-source/15-must-have-linux-applications-1.html" target="_blank">15 Must Have Linux Applications</a>
