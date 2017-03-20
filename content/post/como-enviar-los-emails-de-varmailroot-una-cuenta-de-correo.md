---
author: alex
categories:
- administracion de servidores
date: '2016-01-01'
lastmod: 2017-03-20T10:15:57+01:00
description: "En sistemas operativos como Debian, muchos de los programas y demonios  env\xEDan mensajes al usuario root para informar del estado del sistema. Los mensajes  se almacenan en el archivo /var/mail/root. El problema es que se almacena el correo  en texto plano, es decir, con todas las cabeceras t\xEDpicas del protocolo de correo.  Pueden usarse programas como mutt para administrar los mensajes. Sin embargo, considero  m\xE1s organizado redireccionar todos los mensajes a una cuenta de correo t\xEDpica."
mainclass: servidores
url: /como-enviar-los-emails-de-varmailroot-una-cuenta-de-correo/
tags:
- /var/mail/root a gmail
- enviar mensajes del sistema a correo
title: "C\xF3mo enviar los emails de /var/mail/root a una cuenta de correo"
---

En sistemas operativos como <a href="/tags/debian">Debian</a>, muchos de los programas y demonios envían mensajes al usuario _root_ para informar del estado del sistema. Los mensajes se almacenan en el archivo _/var/mail/root_. El problema es que se almacena el correo en texto plano, es decir, con todas las cabeceras típicas del protocolo de correo. Pueden usarse programas como __mutt__ para administrar los mensajes. Sin embargo, considero más organizado redireccionar todos los mensajes a una cuenta de correo típica.

<!--more--><!--ad-->

# Requisitos

Es necesario que el sistema tenga instalado el programa **sendmail**.

# Configurar el reenvío

Normalmente, la configuración del reenvío de correo se realiza en el archivo **/etc/aliases**, un ejemplo del contenido de este archivo es:

```bash
# /etc/aliases
mailer-daemon: postmaster
postmaster: root
nobody: root
hostmaster: root
usenet: root
news: root
webmaster: root
www: root
ftp: root
abuse: root
noc: root
security: root
clamav: root
```

Como vemos, todo se redirecciona a la cuenta local del usuario *root*. Bastaría con redireccionar la cuenta *root* a una dirección de correo para obtener todos los mensajes del sistema en nuestra bandeja de entrada, y tener así nuestro servidor un poco más controlado. Para ello añadimos en el archivo anterior la siguiente línea:

```bash
# Redireccionar todo el correo de root a mi cuenta
root: direccion@correo.com
```

Para aplicar los cambios hay que ejecutar el comando `newaliases`.

A partir de ahora, recibiremos en nuestra bandeja de entrada los mensajes del sistema, podemos crear un filtro si usamos gmail para organizarlos y quitarlos de la bandeja principal.

# Referencias

- *How to send emails stored in /var/spool/mail/root to a gmail inbox* »» <a href="http://serverfault.com/questions/554922/how-to-send-emails-stored-in-var-spool-mail-root-to-a-gmail-inboxbr/" target="_blank">serverfault.com</a>
