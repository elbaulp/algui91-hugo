---
author: alex
categories:
- administracion de servidores
color: '#0097A7'
date: '2016-12-12'
description: "Los comentarios de spam son algo frecuente en internet, y WordPress
  no es una excepci\xF3n. Hace poco vimos c\xF3mo bloquear ataques de fuerza bruta
  en Nginx y WordPress con Fail2Ban. Hoy veremos c\xF3mo evitar que se nos inunde
  la cola de comentarios pendientes o de spam, en mi caso rondan los 200-300 comentarios
  diarios."
image: 2013/11/Bloquear-ataques-de-fuerza-bruta-en-Nginx-y-Wordpress-con-Fail2Ban2.png
lastmod: 2015-12-29
layout: post.amp
mainclass: servidores
permalink: /combatir-los-comentarios-de-spam-en-wordpress/
tags:
- bloquear spam wodpress
- eliminar spam wordpress
- iptables wordpress comentarios
title: Combatir los comentarios de spam en WordPress
---

<figure>
<a href="/img/2013/11/Bloquear-ataques-de-fuerza-bruta-en-Nginx-y-Wordpress-con-Fail2Ban2.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Bloquear-ataques-de-fuerza-bruta-en-Nginx-y-Wordpress-con-Fail2Ban2.png" title="{{ page.title }}" alt="{{ page.title }}" width="600px" height="600px" /></a>
</figure>

Los comentarios de spam son algo frecuente en internet, y WordPress no es una excepción. Hace poco vimos cómo [bloquear ataques de fuerza bruta en Nginx y WordPress con Fail2Ban][1]. Hoy veremos cómo evitar que se nos inunde la cola de comentarios pendientes o de spam, en mi caso rondan los 200-300 comentarios diarios.

<!--more--><!--ad-->

Existe un plugin llamado <a href="http://akismet.com/" title="Plugins Askimet" target="_blank">Askimet</a> que facilita muchísimo la tarea de detectar comentarios de spam y enviarlos a su correspondiente sección en WordPress. Quizá por eso me ha resultado tan sencillo contruir esta solución para bloquear el acceso a todos los bots que continuamente publican comentarios de este tipo.

### Recopilar las direcciones IPs de los spammers

Esto es algo trivial, WordPress siempre muestra la IP desde la que se realiza el comentario. Sin embargo recopilar la dirección de 200 comentarios puede ser una tarea ardua. Será más sencillo extraer esta información de la [base de datos][2] con una consulta [SELECT][3]. La tabla en la que nos interesa realizar la consulta es **wp_comments**, y el único campo que deseamos extraer es la dirección IP (Columna **comment\_author\_IP** de la tabla anterior). Para evitar que se repitan la direcciones IPs usaremos la opción **DISTINC**. Seleccionaremos únicamente los comentarios que estén marcados como spam, lo cual corresponde a que el campo **comment_approved** tenga el valor &#8220;**spam**&#8220;. La consulta quedará así:

```mysql
SELECT DISTINCT  `comment_author_IP`
FROM  `wp_comments`
WHERE  `comment_approved` =  'spam'

```

Usando *phpmyadmin* podremos exportar el resultado a un archivo de texto para tener las IPs almacenadas con el siguiente formato:

```bash

x.x.x.x
y.y.y.y
z.z.z.z
.......

```

Almacenarlas así nos facilitará la automatización para bloquearles el acceso.

### Bloquear el spam

Una vez tenemos el archivo con las IPs de los spammers, procedemos bloquearlos mediante [iptables][4], de tal forma que no lograrán ni acceder al sitio web, ya que Iptables les denegará el acceso. Usaremos el siguiente [script][5]:

```bash
#!/bin/bash

inet_if=eth0

if [ $# = 2 ]; then
    esta=`iptables -nL | grep $1`
    if [ -z "$esta" ]; then
        echo "Bloqueado $1"
        iptables -i ${inet_if} -A INPUT -s $1 -j LOG --log-prefix "$2 "
        iptables -i ${inet_if} -A INPUT -s $1 -j DROP
    else
        echo "Ya está bloqueado"
        echo $esta
    fi
else
    echo "$0 <ip> <comentario>"
fi

```

Tras guardar el script con el nombre deseado, el uso es el siguiente:

```bash
./nombre_script.sh </comentario></ip><ip> <mensaje en="en" el="el" log="log">

```

Si la IP ya está bloqueada, no se añadirá otra entrada a Iptables, el segundo parámetro aparecerá en los logs del sistema, algo así:

```bash
Dec  8 18:40:36 nombreServidor kernel: </mensaje><mensaje en="EN" el="EL" log="LOG">=eth0 OUT= MAC=XXXXXXXXXXXXXX SRC=X.X.X.X DST=Y.Y.Y.Y LEN=X TOS=X PREC=X TTL=X ID=X DF PROTO=TCP SPT=XX DPT=XX WINDOW=XXX RES=XXX SYN URGP=X

```

Para automatizar el bloqueo, recorreremos cada una de las líneas del archivo que hemos exportado de la base de datos con las direcciones IPs de los spammers:

```bash
for i in `cat spammers.txt`
do
   ./nombre_script.sh "$i" "Comentario SPAM"
done

```

Y listo, si listamos las reglas de Iptables tendremos algo parecido a esto:

```bash
iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
DROP       all  --  X.X.X.X        anywhere
LOG        all  --  X.X.X.X        anywhere            LOG level warning prefix `Comentario SPAM'
DROP       all  --  Y.Y.Y.Y        anywhere
LOG        all  --  Y.Y.Y.Y        anywhere            LOG level warning prefix `Comentario SPAM'

```

A partir de ahora, se notará un descenso drástico en los comentarios de spam. Espero que haya servido de ayuda.

[1]: https://elbauldelprogramador.com/bloquear-ataques-de-fuerza-bruta-en-nginx-y-wordpress-con-fail2ban/ "Bloquear ataques de fuerza bruta en Nginx y WordPress con Fail2Ban"
[2]: https://elbauldelprogramador.com/bases-de-datos/ "Bases de Datos"
[3]: https://elbauldelprogramador.com/consulta-de-datos-clausula-select/ "Consulta de Datos – Cláusula Select"
[4]: https://elbauldelprogramador.com/20-ejemplos-de-iptables-para-sysadmins/ "20 ejemplos de iptables para SysAdmins novatos"
[5]: https://elbauldelprogramador.com/ "Scripts del blog"


</mensaje></ip>