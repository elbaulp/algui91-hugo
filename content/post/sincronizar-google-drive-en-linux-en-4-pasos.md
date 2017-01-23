---
author: alex
categories:
- linux
color: '#2196F3'
date: '2016-09-25'
description: "Llevaba tiempo buscando la manera de sincronizar los archivos de Google
  Drive en Linux con carpetas locales del mismo modo que Dropbox. Pens\xE9 en usar
  el programa inotify, pero no sab\xEDa muy bien por donde empezar. Hace unos d\xEDas
  encontr\xE9 la respuesta en openlinuxforums y al parecer no iba mal encaminado,
  es una soluci\xF3n bastante sencilla usando inotify y nos permitir\xE1 mantener
  sincronizados los archivos y carpetas de Google Drive en todos los ordenadores que
  queramos."
image: 2013/11/google-drive-linux3.jpg
lastmod: 2016-08-09
layout: post.amp
mainclass: linux
permalink: /sincronizar-google-drive-en-linux-en-4-pasos/
tags:
- cliente google drive linux
- grive
- tutorial grive
title: Sincronizar Google Drive en Linux en 4 pasos
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/google-drive-linux3.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="800px" height="701px"></amp-img>
</figure>

Llevaba tiempo buscando la manera de sincronizar los archivos de **Google Drive en Linux** con carpetas locales del mismo modo que Dropbox. Pensé en usar el programa [inotify][1], pero no sabía muy bien por donde empezar. Hace unos días encontré la respuesta en <a href="https://openlinuxforums.org" title="Foro linux" target="_blank">openlinuxforums</a> y al parecer no iba mal encaminado, es una solución bastante sencilla usando inotify y nos permitirá mantener sincronizados los archivos y carpetas de **Google Drive** en todos los ordenadores que queramos.

> Hay una modificación para este método en <a href="/sincronizar-google-drive-en-linux-en-4-pasos-actualizacion/" title="Sincronizar Google Drive en Linux en 4 pasos [Actualización]">Sincronizar Google Drive en Linux en 4 pasos [Actualización]</a>



<!--more--><!--ad-->

# 1. Preparar el entorno

Es recomendable crear un directorio *bin* para alojar los scripts necesarios:

```bash
mkdir ~/bin
```

Para asegurarse de que la carpeta se ha añadido al PATH cierra sesión y vuelve a entrar, ahora debería aparecer el directorio creado en la variable *PATH*

```bash
echo $PATH
```

# 2. Crear la carpeta local a sincronizar

En esta carpeta se descargarán y mantendrán sincronizados los ficheros de Google Drive:

```bash
mkdir ~/Drive
```

Ahora instalamos **grive**:

En debian:

```bash
$ sudo apt-get install grive
```

En Ubuntu:

```bash
$ sudo add-apt-repository ppa:nilarimogard/webupd8
$ apt-get update
$ apt-get install grive
```

Nos autentificamos y otorgamos los permisos necesarios a Grive:

```bash
cd ~/Drive && grive -a
```

El comando de arriba mostrará un link, clica en él y autoriza a Grive para que pueda acceder a **Google Drive**.

# 3. Sincronizar automáticamente los ficheros de la carpeta local

Instala *inotify-tools* si es necesario:

```bash
$ sudo apt-get install inotify-tools
```

Ahora crearemos un script que monitorize la carpeta local para detectar cualquier cambio (Script gracias a Peter Österberg, 2012):

```bash
#!/bin/bash
# Google Drive Grive script that syncs your Google Drive folder on change
# This functionality is currently missing in Grive and there are still no
# official Google Drive app for Linux coming from Google.
#
# This script will only detect local changes and trigger a sync. Remote
# changes will go undetected and are probably still best sync on a periodic
# basis via cron.
#
# Kudos to Nestal Wan for writing the excellent Grive software
# Also thanks to Google for lending some free disk space to me
#
# Peter Österberg, 2012

GRIVE_COMMAND_WITH_PATH=/usr/bin/grive    # Path to your grive binary, change to match your system
GDRIVE_PATH=~/Drive         # Path to the folder that you want to be synced
TIMEOUT=300              # Timeout time in seconds, for periodic syncs. Nicely pointed out by ivanmacx

while true
do
    inotifywait -t $TIMEOUT -e modify -e move -e create -e delete -r $GDRIVE_PATH
    cd $GDRIVE_PATH && $GRIVE_COMMAND_WITH_PATH
done
```

Modifica las rutas conforme a tu configuración y dale permisos de ejecución:

```bash
$ chmod +x grive.sh
```

Por último añadelo a las aplicaciones de inicio. Dependiendo de la distribución que uses el método puede variar en Xfce dirígete a Settings » Sesiones e Inicio » Pestaña aplicaciones » ánadir.

# 4. Añadir una entrada a cron para sincronizar los cambios remotos

Hasta el momento, los únicos cambios que se sincronizan son los locales, para lograr detectar cambios en **Google Drive** añadiremos una entrada a [cron][3]. Para ello ejecutamos el comando `crontab -e` y añadimos la siguiente línea:

```bash
*/10 * * * *  cd "$HOME/Drive" && grive >/dev/null 2>&1
```

Con esto *grive* detectará si ha habido cambios en el servidor remoto cada 10 minutos.

# Modificaciones sobre el script original

A los scripts mencionados arriba les hice unas pequeñas modificaciones que muestro a continuación.

Mi entrada en el crontab es la siguiente:

```bash
*/10 * * * * cd "$HOME"/Drive && grive > /tmp/GRIVE_LOG
```

La única diferencia es que guardo la salida del programa en un fichero temporal a modo de log, dentro de poco veremos por qué.

Yo uso [xmonad][3], y para lograr que grive se ejecute al iniciar sesión añadí una línea al script que es ejecutado cuando me loggeo:

```bash
exec /home/hkr/bin/grive.sh 2>&1 | tee /tmp/GRIVE_LOG &
```

De nuevo vuelvo a redirigir la salida del programa a un fichero, esta vez con [tee][4].

Por último, en este mismo archivo, añadí otra línea para que se muestre el fichero que estoy usando como log en el escritorio, y poder así observar si se están sincronizando correctamente los archivos:

```bash
xrootconsole --wrap --bottomup -geometry 233x16+5+570 /tmp/GRIVE_LOG &
```

Hace algún tiempo expliqué cómo usar xroot en el artículo [Cómo tener un terminal transparente como wallpaper que muestre información][5]

# Conclusión

Con estos 4 pasos hemos conseguido mantener sincronizado nuestro Google Drive en Linux, y por el camino, al menos yo, he aprendido unas cuantas cosas. ¿Qué os parece?, ¿usáis alguna otra alternativa para lograr el mismo funcionamiento? Dejad un comentario.

El resultado de estas modificaciones es el siguiente:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Sincronizar-Google-Drive-en-Linux-en-4-pasos.png" title="{{ page.title }}" alt="{{ page.title }}" width="1366px" height="768px"></amp-img>
</figure>

# Referencias

- *Howto: Auto-sync Google Drive to a local folder with Grive. Ubuntu & Debian* »» <a href="https://openlinuxforums.org/index.php?topic=3144.0" target="_blank">openlinuxforums.org</a>
- *Créditos de la imagen* »» <a href="https://plus.google.com/+MuktwareMagazine/posts/ZPN9MxuV7VR" target="_blank">plus.google.com</a>

[1]: https://elbauldelprogramador.com/ejecutar-un-script-al-modificar-un-fichero-con-inotify/ "Ejecutar un script al modificar un fichero con inotify"
[3]: https://elbauldelprogramador.com/configurar-xmonad-con-trayer-y-fondo-de-pantalla-aleatorio/ "Configurar xmonad con trayer y fondo de pantalla aleatorio"
[4]: https://elbauldelprogramador.com/buscar-archivos-con-locate-mediante-expresiones-regulares-complejas/ "Buscar archivos con locate mediante expresiones regulares"
[5]: https://elbauldelprogramador.com/como-tener-un-terminal-transparente-como-wallpaper-que-muestre-informacion/ "Cómo tener un terminal transparente como wallpaper que muestre información"