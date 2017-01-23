---
author: alex
categories:
- aplicaciones
- curiosidades
- opensource
- script
color: '#2196F3'
date: '2016-01-01'
layout: post.amp
mainclass: linux
permalink: /configurar-dos-pantallas-en-openbox/
tags:
- configuracion openbox
- crunchbang cambiar wallpaper
- debian openbox distro
- openbox
- wallpaper para openbox
title: Configurar dos pantallas en OpenBox bajo CruchBang y wallpaper aleatorio
---

<div class="separator" >
<a href="https://1.bp.blogspot.com/-iiunZ-gX5Y8/T0TbVE86pHI/AAAAAAAACGw/wmYeZWkIe-s/s1600/1329912632_stock_connect.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="128" width="128" src="https://1.bp.blogspot.com/-iiunZ-gX5Y8/T0TbVE86pHI/AAAAAAAACGw/wmYeZWkIe-s/s400/1329912632_stock_connect.png" /></a>
</div>

Llevaba tiempo queriendo instalar en mi equipo la distribución <a target="_blank" href="http://crunchbanglinux.org/">CrunchBang</a>, que es una distro muy ligera basada en debian que viene con <a target="_blank" href="http://openbox.org/">openbox</a>, este fin de semana finalmente me decidí a instalarla para probarla y la he dejado ya que me ha gustado bastante por si simpleza y capacidad de configuración.

Encontré un pequeño problema al instalarla, y era que al tener dos pantallas conectadas al pc, por defecto las clonaba, es decir, que aparecía lo mismo en las dos pantallas. Cuando cambiaba la configuración para mostrarlas como dos pantallas independientes todo iba bien, pero al reiniciar volvía a clonarlas.


<!--more--><!--ad-->

Después de un poco de búsqueda por la red encontré solución al problema, usando el comando xrandr de la siguiente manera:

```bash
xrandr --output DVI-I-1 --mode 1280x1024 --right-of DVI-I-2

```

Con esto estamos diciendo que la pantalla DVI-I-1 estará a la derecha la pantalla DVI-I-2

El siguiente paso es hacer que este comando se ejecute siempre al iniciar el pc, para ello tenemos que modificar el archivo de autoarranque de OpenBox, que se llama *autostart* y suele estar en *~/.config/openbox*. Añadimos la siguiente línea debajo de *lxsession &*:

```bash
xrandr --output DVI-I-1 --mode 1280x1024 --right-of DVI-I-2 &

```

De esta forma lo tenemos todo solucionado.

#### Fondos de pantalla aleatorios

Para lograr esto usé un script que encontré en la red hace tiempo y lo modifiqué para adaptarlo a openbox, con la particularidad de que aplico un fondo de pantalla distinto y seleccionado aleatoriamente para cada una de las pantallas. El script en cuestión es el siguiente:

```bash
#!/bin/bash
picsfolder=$HOME"/Ruta/Imagenes/"
bgSaved=$HOME"/.config/nitrogen/bg-saved.cfg"

cd $picsfolder

files=(*.jpg)

N=${#files[@]}

((N=RANDOM%N))
randomfile1=${files[$N]}
#echo $randomfile
((N=RANDOM%N))
randomfile2=${files[$N]}



cat <<<"[:0.0]
file=/usr/share/backgrounds/transparent--i.e-solid-colour.png
mode=1
bgcolor=#252627

[xin_0]
file=$picsfolder$randomfile1
mode=4
bgcolor=#000000

[xin_1]
file=$picsfolder$randomfile2
mode=4
bgcolor=#000000" > $bgSaved

```

La variable *picsfolder* es el directorio donde residen las imágenes. *bsSaved* es un archivo de configuración que almacena los datos del último fondo de pantalla que se estableció, y que modificaremos con los nuevos fondos.

Las siguientes líneas seleccionan dos imágenes aleatórias y una vez seleccionadas modificamos el archivo bg-saved.cfg para establecer nuestros fondos de pantalla aleatórios.

Para conseguir que esto funcione debemos volver a modificar el archivo *autostart* de openbox, colocando las siguientes líneas (En este caso debajo del comando xrandr):

```bash
## Set desktop wallpaper
/home/hkr/Pictures/wall_aleatorio.sh
nitrogen --restore &
```

Os dejo una captura:

<div class="separator" >
<a href="https://1.bp.blogspot.com/-Babpz4m6FG4/T0T5AMLSbsI/AAAAAAAACHA/P7YObMPNGM4/s1600/Screenshot%2B-%2B02222012%2B-%2B02%253A43%253A23%2BPM.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="160" width="400" src="https://1.bp.blogspot.com/-Babpz4m6FG4/T0T5AMLSbsI/AAAAAAAACHA/P7YObMPNGM4/s400/Screenshot%2B-%2B02222012%2B-%2B02%253A43%253A23%2BPM.png" /></a>
</div>