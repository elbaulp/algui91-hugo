---
author: alex
categories:
- how to
- linux
mainclass: linux
date: '2016-01-01'
lastmod: 2017-09-28T18:09:19+01:00
image: 2013/03/xroot-example.jpg
url: /como-tener-un-terminal-transparente-como-wallpaper-que-muestre-informacion/
tags:
- log
- openbox
title: "Cómo tener un terminal transparente como wallpaper que muestre información"
---

Hoy traigo tres programas que me han resultado muy interesantes. Se trata de *xrootconsole*, *tilda* y *eterm*. Programas que permiten tener un terminal transparente de fondo de pantalla que muestre información para casi cualquier cosa que queramos. Por ejemplo logs del sistema, [htop][1] dmesg etc. Empecemos con xrootconsole:

<!--more--><!--ad-->

# xrootconsole

`xrootconsole` muestra en una ventana transparente el fichero que se le proporcione como entrada (o la entrada estándar stdin). Su objetivo es ser lo más simple posible y consumir pocos recursos. Este programa no es interactivo, por lo que solo servirá para mostrar información y nada más. Un ejemplo de uso:

```bash
xrootconsole [archivo]
```

Un ejemplo más completo sería el siguiente:

```bash
xrootconsole --wrap --bottomup -geometry 233x16+1+818 /var/log/syslog &
```

Donde:

- `--wrap` en lugar de cortar las líneas que no caben en pantalla, las muestra en la línea de abajo.
- `--bottomup` inserta líneas al final.
- `--geometry` establece el tamaño y posición de la ventana, el formato es *ANCHOxALTO+MARGEN_IZQUIERDO+MARGEN_SUPERIOR*.

Puedes obtener más información consultando la ayuda del programa o su manual.

<figure>
    <amp-img sizes="(min-width: 1024px) 1024px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/xroot-example.jpg" alt="xroot example" width="1024px" height="817px"></amp-img>
</figure>

En este caso estoy mostrando salidas del comando [ss][3] usando un [script][4] que he creado:

```bash
#!/bin/bash

while [ 1 ]
do
        ss > /tmp/ss.out
        xrootconsole --wrap --bottomup -geometry 230x50+10+20 /tmp/ss.out &
        XROOT_PID=$!
        sleep 30
        kill $XROOT_PID
done

```

Si decides usar este programa, es probable que quieras agregarlo al [script][4] de inicio de tu entorno de escritorio favorito, como fluxbox, [xmonad][5] u [openbox][6].

Como he mencionado, xrootconsole no es interactivo, si quieres ejecutar algo como htop, necesitas Tilda.

# Tilda

Tilda es una ventana de terminal muy configurable. No tiene bordes y permanece oculta al escritorio hasta que se pulsa una tecla. Lo primero que hay que hacer es instalarlo:

```bash
sudo aptitude install tilda
```

Una vez instalado, lo ejecutamos y haremos algunos cambios:

```bash
Pestaña General    » desabilita “Always on top”
Pestaña Appearance » habilita la transparencia y fíjalo al 100%
Pestaña Colors     » Elige “Green on Black” o “Personalize”
Pestaña Scrolling  » Desabilítalo
```

Listo, ya tienes configurado un terminal transparente. Puedes ver más información sobre cómo configurar Tilda en las referencias.

# Eterm

La última opción es Eterm, otra terminal que podemos usar para tener de fondo de pantalla mostrando información. Por ejemplo mostrar la salida del **dmesg**:

```bash
Eterm --buttonbar 0 --scrollbar off -f white -n dmesg -g 211×10+0+0 -O -0 -e watch --no-title -n10 -d 'dmesg | tail'
```

Una breve explicación de los argumentos:

* **-buttonbar 0**: Elimina la barra de menú el botón superior.
* **-scroll off**: Elimina la barra de scroll
* **-f white**: Color de la letras
* **-O**: Ventana transparente
* **-0**: Habilita algunas optimizaciones para la transparencia
* **-e**: Ejecuta el programa que se le indique

Basta con cambiar el comando que sigue a la opción -e por el desado. Naturalmente, es posible tener tantas terminales como se quiera.

<figure>
<amp-img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/5809765.png" alt="Eterm" width="640px" height="375px"></amp-img>
</figure>

# Referencias

- *Terminal as a Transparent Wallpaper* »» <a href="https://wiki.archlinux.org/index.php/Terminal_as_a_Transparent_Wallpaper" target="_blank">wiki.archlinux.org</a>
- *How to have a transparent terminal as wallpaper that displays information* »» <a href="http://linuxaria.com/pills/how-to-have-a-transparent-terminal-as-wallpaper-that-displays-information" target="_blank">linuxaria.com</a>

 [1]: https://elbauldelprogramador.com/tags/htop "htop"
 [2]: https://elbauldelprogramador.com/img/2013/03/xroot-example.jpg
 [3]: https://elbauldelprogramador.com/comandos-ss-iproute2-linux/ "Algunos comandos útiles con iproute2"
 [4]: https://elbauldelprogramador.com/tags/script
 [5]: https://elbauldelprogramador.com/tags/xmonad
 [6]: https://elbauldelprogramador.com/tags/openbox
