---
author: alex
categories:
- linux
color: '#2196F3'
description: Si quieres personalizar la pantalla de bienvenida en Debian o Ubuntu,
  es posible cambiar el fondo de pantalla en unos cuantos pasos.
image: 2013/11/Cambiar-fondo-en-la-pantalla-de-login-en-Debian-y-Ubuntu.jpg
lastmod: 2015-12-29
layout: post.amp
mainclass: linux
permalink: /cambiar-fondo-en-la-pantalla-de-login-en-debian-y-ubuntu/
tags:
- cambiar fondo gdm3
- cambiar fondo login debian
- cambiar fondo login ubuntu
- lightdm
title: Cambiar fondo en la pantalla de login en Debian y Ubuntu
---

<figure>
<a href="/img/2013/11/Cambiar-fondo-en-la-pantalla-de-login-en-Debian-y-Ubuntu.jpg"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Cambiar-fondo-en-la-pantalla-de-login-en-Debian-y-Ubuntu.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="3264px" height="2448px" /></a>
</figure>

Si quieres personalizar la pantalla de bienvenida en Debian o Ubuntu, es posible cambiar el fondo de pantalla en unos cuantos pasos.

<!--more--><!--ad-->

### En Debian

#### Editando el archivo /etc/gdm3/greeter.gsettings

Añadiendo o modificando las siguientes líneas:

```bash
# Theming options
[org.gnome.desktop.background]
picture-uri='file:///path/a/fondo'
picture-options='zoom'

```

La última línea puede tomar valores **&#8220;zoom&#8221;, &#8220;scaled&#8221;, &#8220;stretched&#8221;**. Tras editar el archivo hay que ejecutar el comando

```bash
dpkg-reconfigure gdm3

```

para aplicar los cambios.

### En Ubuntu

Hay que asegurarse que el fondo tenga permisos de lectura tanto para el usuario, el grupo y otros, esto se puede lograr con

```bash
$ chmod 644 <nombre_fondo>

```

Ahora seguimos los siguientes pasos:

```bash
sudo -i

```

Introducimos la contraseña, luego permitimos al usuario *lightdm* conectarse al servidor X (La pantalla):

```bash
xhost +SI:localuser:lightdm

```

Nos loggeamos como el usuario *lightdm*:

```bash
su lightdm -s /bin/bash

```

Desactivamos el cambio dinámico de fondos de pantalla:

```bash
gsettings set com.canonical.unity-greeter draw-user-backgrounds 'false'

```

Cambiar el fondo por uno de nuestra elección:

```bash
gsettings set com.canonical.unity-greeter background '/foo/wallpaper.png'

```

Hay que tener en cuenta que, si nuestro */home/* está [cifrado][1], no podemos especificar un fondo que esté dentro de ese directorio, puesto que la partición */home* aún no estará descifrada en la pantalla de login.

### En Xubuntu

La imagen se encuentra en `/usr/share/xfce4/backdrops/xubuntu-wallpaper.png` como un enlace simbólico, basta con ver a dónde apunta ese enlace y reemplazarlo con la imagen deseada. En mi caso dicha imagen era `xubuntu-trusty.png`, situada en el mismo directorio. Lo más fácil sería hacer:

```bash
sudo cp ruta/imagen/deseada /usr/share/xfce4/backdrops/xubuntu-trusty.png

```

<figure>
<a href="/img/2013/11/Cambiar-fondo-en-la-pantalla-de-login-en-Debian-y-Ubuntu.jpg"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Cambiar-fondo-en-la-pantalla-de-login-en-Debian-y-Ubuntu.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="3264px" height="2448px" /></a>
</figure>

#### Referencias

*Debian* »» <a href="http://lists.debian.org/debian-desktop/2012/03/msg00054.html" target="_blank">lists.debian.org</a>
*Ubuntu* »» <a href="http://askubuntu.com/questions/64001/how-do-i-change-the-wallpaper-in-lightdm" target="_blank">askubuntu.com</a>

[1]: https://elbauldelprogramador.com/como-cifrar-archivos-con-openssl/ "Cómo cifrar archivos con openssl"


</nombre_fondo>
