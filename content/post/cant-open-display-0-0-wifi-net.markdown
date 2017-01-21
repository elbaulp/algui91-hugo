---
author: alex
categories:
- linux
color: '#2196F3'
date: 2016-10-03 14:15:35
description: "Cuando NetworkManager se connecta a una red, cambia el nombre de host
  (Hostname), y las aplicaciones gr\xE1ficas dejan de funcionar"
image: cant-open-display-0-0-wifi-net.png
introduction: "Cuando NetworkManager se connecta a una red, cambia el nombre de host
  (Hostname), y las aplicaciones gr\xE1ficas dejan de funcionar"
layout: post.amp
mainclass: linux
tags:
- linux
- NetworkManager
- error
title: "C\xF3mo Resolver El Error \u201CCan't Open Display: :0.0\u201D Al Conectarse
  a Una Red Wi-Fi"
---

## Problema: Can't Open Display: :0.0

_NetworkManager_ tiene la costumbre de cambiar el nombre del host (_hostname_) al conectarse a una red, y esto a veces provoca que las aplicaciones con interfaz gráfica no puedan lanzarse. El típico error que se obtiene cuando esto ocurre es:

```bash
Can't Open Display: :0.0
```

<!--more--><!--ad-->

## Solución: Establecer de forma permanente un hostname

Tras mucho investigar, descubrí que el problema estaba en _NetworkManager_, y para solucionarlo basta con hacer permanente el _hostname_. Para ello en el fichero `/etc/hosts` debemos añadir un alias a `localhost` con el nombre que queramos:

```bash
127.0.0.1	localhost NombreDeseado
```

Luego, en el fichero de configuración de _NetworkManager_ (`/etc/NetworkManager/NetworkManager.conf`) escribimos lo siguiente:

```bash
[main]
plugins=keyfile

[keyfile]
hostname=NombreDeseado
```

Con esto bastará.

### Cuando la solución no funciona

Recientemente se actualizó _NetworkManager_ y la solución de arriba dejó de funcionar. Esto se debe a que _NetworkManager_ ya no mira el nombre del host en el fichero de configuración, como mencionan en el _man_ de `NetworkManager.conf`:

> hostname: This key is deprecated and has no effect since the hostname is now stored in /etc/hostname or other system configuration files according to build options.

Por tanto la solución ahora es más sencilla, basta con añadir el nombre para el host en `/etc/hostname`, por ejemplo:

```bash
$ cat /etc/hostname
NombreDeseado
```

## Referencias

- [Arch Linux forums](https://bbs.archlinux.org/viewtopic.php?id=59575 "Can't open display: :0.0")
- [System Settings gnome](https://wiki.gnome.org/Projects/NetworkManager/SystemSettings "System settings gnome")
