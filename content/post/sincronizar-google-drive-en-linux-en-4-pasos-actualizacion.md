---
author: alex
categories:
- linux
color: '#2196F3'
date: '2016-01-01'
description: "Hace poco vimos en un art\xEDculo c\xF3mo Sincronizar Google Drive en
  Linux en 4 pasos. Llevo usando ese m\xE9todo unas semanas y hasta ahora todo funcionaba
  correctamente. Sin embargo me he dado cuenta que cuando se usa con archivos muy
  grandes puede haber problemas, ya que grive vuelve a ejecutarse varias veces mientras
  est\xE1 subiendo archivos, con lo cual acaban pasando cosas extra\xF1as, como quedarse
  subiendo el archivo indefinidamente o inundar la memoria RAM. Aplicar los siguientes
  cambios parece que soluciona los problemas."
image: 2013/11/google-drive-linux3.jpg
lastmod: 2016-08-09
layout: post.amp
mainclass: linux
permalink: /sincronizar-google-drive-en-linux-en-4-pasos-actualizacion/
tags:
- cliente google drive linux
- grive
- tutorial grive
title: "Sincronizar Google Drive en Linux en 4 pasos [Actualizaci\xF3n]"
---

<figure>
  <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/google-drive-linux3.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="800px" height="701px"></amp-img>
</figure>

Hace poco vimos en un artículo cómo [Sincronizar Google Drive en Linux en 4 pasos][1]. Llevo usando ese método unas semanas y hasta ahora todo funcionaba correctamente. Sin embargo me he dado cuenta que cuando se usa con archivos muy grandes puede haber problemas, ya que *grive* vuelve a ejecutarse varias veces mientras está subiendo archivos, con lo cual acaban pasando cosas extrañas, como quedarse subiendo el archivo indefinidamente o inundar la memoria RAM. Aplicar los siguientes cambios parece que soluciona los problemas.



<!--more--><!--ad-->

# El problema

Tal y como se explicó en el artículo anterior, se tiene un script encargado de detectar los cambios locales con [inotify][3] y una entrada en <a href="http://es.wikipedia.org/wiki/Cron_%28Unix%29" title="Cron wikipedia" target="_blank">cron</a> ejecutando *grive* cada X tiempo para descargar los cambios remotos. Por tanto, puede ocurrir que en un determinado instante grive se esté ejecutando más de una vez, y si está realizando alguna operación de descarga o subida *inotify* detectará que los ficheros están cambiando y volverá a lanzar *grive*.

Es decir, si estamos subiendo/descargando un archivo lo bastante grande para que tarde más que los periodos de pausa que hay en el script y en cron, el comportamiento de *grive* no será el correcto porque los archivos están cambiando continuamente mientras están siendo descargados.

# Posible solución

Tras haber hecho varias pruebas, una solución que parece ser correcta es la siguiente:

* Modificar la entrada en cron para *grive*
* Modificar el script para que compruebe si hay alguna instancia de *grive* en ejecución, y, en ese caso, esperar a que termine.

El script quedaría así:

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

GRIVE_COMMAND_WITH_PATH=/usr/bin/grive   # Path to your grive binary, change to match your system
GDRIVE_PATH=~/Drive                      # Path to the folder that you want to be synced
TIMEOUT=60               # Timeout time in seconds, for periodic syncs. Nicely pointed out by ivanmacx

declare -i esta_grive_ejecutando

while true
do
    inotifywait -t 300 -e modify -e move -e create -e delete -r $GDRIVE_PATH
    esta_grive_ejecutando=`pidof grive`
    if [[ "$esta_grive_ejecutando" -ne 0 ]]
    then
        echo "Grive está ejecutandose, PID: $esta_grive_ejecutando. Esperando..."
        sleep $TIMEOUT
    else
        cd $GDRIVE_PATH && $GRIVE_COMMAND_WITH_PATH
    fi
done
```

Con esta pequeña modificación logramos que no haya varias instancias de *grive* en ejecución. Además podríamos dejar la entrada en cron, ya que de esta forma si cron está ejecutando *grive*, el script no lo hará, porque detecta que ya hay una instancia en ejecución.

# Script para CRON

Sería muy similar, salvo que no monitoriza el estado del directorio con inotify, de esta forma obtendremos los cambios remotos:

```bash
#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

TIMEOUT=60

declare -i is_grive_cron_running

is_grive_cron_running=`pidof grive`

if [[ "$is_grive_cron_running" -ne 0 ]]
then
    echo "Grive está corriendo en cron: $is_grive_cron_running. Esperando..."
    sleep $TIMEOUT
else
    cd "$HOME/Drive" && grive | tee /tmp/GRIVE_LOG
fi
```

Lo guardamos como *update-grive.sh*, le damos permisos de ejecución `chmod +x update-grive.sh` y lo añadimos a crontab:

```bash
*/10 * * * *  /home/hkr/bin/update-grive.sh
```

# Referencias

- *Howto: Auto-sync Google Drive to a local folder with Grive _ Ubuntu & Debian* »» <a href="https://openlinuxforums.org/index.php?topic=3144.0" target="_blank">openlinuxforums.org</a>

[1]: https://elbauldelprogramador.com/sincronizar-google-drive-en-linux-en-4-pasos/ "Sincronizar Google Drive en Linux en 4 pasos"
[3]: https://elbauldelprogramador.com/ejecutar-un-script-al-modificar-un-fichero-con-inotify/ "Ejecutar un script al modificar un fichero con inotify"