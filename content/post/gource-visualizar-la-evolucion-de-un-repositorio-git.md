---
author: alex
categories:
- aplicaciones
- opensource
color: '#F57C00'
date: '2016-01-01'
description: Tutorial de gource y ejemplo de uso
image: 2013/05/gourceGit-1024x804.png
lastmod: 2015-12-13
layout: post.amp
mainclass: articulos
url: /gource-visualizar-la-evolucion-de-un-repositorio-git/
tags:
- como instalar gource
- gource git
- grabar video con gource
- tutorial gource
- gource tutorial
title: "Gource: Visualizar la evoluci\xF3n de un repositorio Git"
---

Hace unas semanas hablé de [logstalgia][1], que visualiza las visitas a una web en forma del juego Pong. Hoy hablo de *Gource*, herramienta similar que visualiza la evolución de un repositorio en [git][2].

<!--more--><!--ad-->

# Instalación de Gource

Para instalar el programa basta con ejecutar:

```bash
# aptitude install gource

```

Una vez instalado, basta con ejecutar el programa y pasarle la ruta a la carpeta *.git* del repositorio que queramos visualizar:

```bash
gource /ruta/a/.git

```

El resultado es algo como esto:

<figure>
<a href="/img/2013/05/gourceGit-1024x804.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/gourceGit-1024x804.png" title="{{ page.title }}" alt="{{ page.title }}" width="1024px" height="804px" /></a>
</figure>

Al pasar el ratón por la parte inferior, aparece un recuadro en el que podremos seleccionar la fecha a visualizar.

Es posible grabar en vídeo la visualización de *gource* con el comando:

```bash
gource ruta/a/.git/  -1280x1024 --max-files 99999 --disable-progress --stop-at-end \
       --user-scale 2 --highlight-all-users --output-ppm-stream - \
       | ffmpeg -y -b 3000K -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264 gource.mp4

```

Donde:

  * -1280&#215;1024 es la resolución.
  * &ndash;max-files 99999 Límite de archivos a mostrar en la animación.
  * &ndash;disable-progress Desabilita la barra para seleccionar fecha que mencioné.
  * &ndash;stop-at-end Cierra la gource al terminar la animación.
  * &ndash;user-scale 2 Escala de los iconos que representan a los desarrolladores
  * &ndash;highlight-all-users Muestra siempre el nombre del desarrollador
  * &ndash;output-ppm-stream &ndash; Envia la salida de gource a un archivo

A continuación os dejo un vídeo de uno de mis repositorios:

<amp-youtube
    data-videoid="aSJ8lHXpW58"
    layout="responsive"
    width="480" height="270"></amp-youtube>

 [1]: https://elbauldelprogramador.com/visualiza-las-visitas-a-tu-web-al-estilo-pong-con-logstalgia/ "Visualiza las visitas a tu web al estilo Pong con Logstalgia"
 [2]: https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos"
 [3]: https://elbauldelprogramador.com/img/2013/05/gourceGit.png
