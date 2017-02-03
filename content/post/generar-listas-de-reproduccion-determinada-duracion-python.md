---
author: alex
categories:
- dev
- python
date: '2016-01-01'
description: "Seguro que t\xFA tamb\xE9n escucas m\xFAsica mientras programas, a mi
  me gusta descansar cada 30 min siguiendo la t\xE9cnica pomodoro. Pero mejor hacerlo
  escuchando m\xFAsica. Este script en python te ayudar\xE1."
image: Generar-listas-de-reproduccion-de-una-determinada-duracion-con-Python.png
lastmod: 2017-02-03
mainclass: dev
url: /generar-listas-de-reproduccion-determinada-duracion-python/
tags:
- "listas de reproducci\xF3n de duraci\xF3n fija"
- "m\xFAsica"
- python
- script python
- python m3u parser
- playlist m3u
- python m3u
- listas 20 minutos
- from sys import argv
- python import mp4
- python mp4 to mp3
- python mp4 parser
- "listas de reproducci\xF3n personalizadas"
title: "Generar listas de reproducci\xF3n de una determinada duraci\xF3n con Python"
---

A muchos de nosotros nos gusta escuchar música mientras programamos. Hoy se me ocurrió que estaría bien generar listas de reproducción de una duración determinada. La razón tiene sus orígenes en la <a href="http://es.wikipedia.org/wiki/T%C3%A9cnica_Pomodoro" title="Técnica pomodoro" target="_blank">técnica Pomodoro</a>, que consiste concentrarse en realizar una tarea durante 25 min, sin distraerse, y descansar 5 min. Se repite cuatro veces y al cuarto descanso en lugar de 5 se descansan 15 min. Ésta técnica pretende mejorar la productividad.

Para ello he creado un pequeño script en python que genera automáticamente las listas de reproducción dado un directorio con ficheros mp3 o mp4 y una duración en minutos.

<!--more--><!--ad-->

# Requisitos

Para leer la duración de cada fichero he usado un módulo llamado <a href="https://code.google.com/p/mutagen/" title="Mutagen Homepage" target="_blank">Mutagen</a>. Para instalarlo:

```bash
$ pip install mutagen
```

Una vez instalado, podremos ejecutar el programa, el código es el siguiente:

```python
#!/usr/bin/env python

'''
Created on Apr 4, 2014

@author: Alejandro Alcalde

Licensed under GPLv3

More info: http://wp.me/p2kdv9-Bq
'''

import argparse
import fnmatch

from mutagen.mp3 import MP3
from mutagen.mp4 import MP4
from mutagen.flac import FLAC

from os.path import os, basename
from sys import argv
from random import shuffle

curr_length = 0
playlist_number = 1

def main():

    parser = argparse.ArgumentParser(description='Generate playlists with the indicated length')
    parser.add_argument('-d','--directory', help='Directory with music files',type=str, required=True)
    parser.add_argument('-l', '--length', help='Length of the playlist, in minutes', type=int, required=True)

    args = parser.parse_args()

    directory = args.directory
    length =  args.length * 60

    path = r'./playlists/'
    if not os.path.exists(path): os.makedirs(path)

    playlist_basename = 'playlist_' #basename(argv[0][:-3]) + '_'
    curr_items = []
    too_long_items = []
    all_items = []

    for music_file in os.listdir(directory):
        if fnmatch.fnmatch(music_file, '*.mp[43]') or fnmatch.fnmatch(music_file, '*.flac'):
            all_items.append(directory + music_file)

    shuffle(all_items)

    for item in all_items:
        global curr_length
        if curr_length >= length:
            create_playlist(path, playlist_basename, curr_items)
        else:
            encoding = item[-4:]
            encodings = {'.mp3': MP3, '.mp4': MP4, 'flac': FLAC}
            try:
                music_file = encodings[encoding](item)
            except Exception as e:
                handleException(e)
            else:
                file_length = music_file.info.length
                if file_length > length:
                    too_long_items.append(item)
                    print 'File %s exceed the given length (%s min)' % (item, file_length/60)
                else:
                    curr_length += file_length
                    curr_items.append(item+'\n')

    if curr_items:
        create_playlist(path, playlist_basename, curr_items)

    if too_long_items:
        print '\nThis files exceeded the given length and were not added to any playlist...\n'
        for i in too_long_items:
            print basename(i)

def create_playlist(path, playlist_basename, curr_items):
    global playlist_number, curr_length
    name = path + str(playlist_number) + '. ' + playlist_basename + str(int(curr_length/60)) + 'min' + '.m3u'
    playlist_file = open(name, 'w')
    playlist_file.writelines(curr_items)
    playlist_file.close()
    print 'Playlist generated, name: ', name , ' length ', curr_length/60 , 'min'
    playlist_number += 1
    curr_length = 0
    del curr_items[:]

def handleException(e):
    print type(e)     # the exception instance
    print e.args      # arguments stored in .args
    print e           # __str__ allows args to printed directly

if __name__ == '__main__':
    main()
```

# Generar listas de reproducción

El uso del programa es sencillo:

```bash
$ ./genPlayListByLength.py -h
usage: genPlayListByLength.py [-h] -d DIRECTORY -l LENGTH

Generate playlists with the indicated length

optional arguments:
  -h, --help            show this help message and exit
  -d DIRECTORY, --directory DIRECTORY
                        Directory with music files
  -l LENGTH, --length LENGTH
                        Length of the playlist, in minutes


[~/Desarrollo/WorkSpaces/Py_WorkSpace/GenPlayListByLenght/src]
$ ./genPlayListByLength.py -d /media/RAID_External/Music/EPIC/Nueva/ -l 20
Playlist generated, name:  ./playlists/genPlayListByLength.py20_1.m3u  length  24.0001451247 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_2.m3u  length  22.7172426304 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_3.m3u  length  24.2311836735 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_4.m3u  length  20.2354164777 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_5.m3u  length  21.8601359014 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_6.m3u  length  28.3070597128 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_7.m3u  length  22.7946424792 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_8.m3u  length  21.2017535903 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_9.m3u  length  21.7807044596 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_10.m3u  length  21.1862736206 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_11.m3u  length  23.5667059713 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_12.m3u  length  21.3402993197 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_13.m3u  length  25.1046409675 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_15.m3u  length  20.4145971277 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_16.m3u  length  21.0794618292 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_17.m3u  length  20.2702464097 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_18.m3u  length  21.2315525321 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_19.m3u  length  20.798403305 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_20.m3u  length  22.1189417989 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_21.m3u  length  21.7013696145 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_22.m3u  length  22.971888133 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_23.m3u  length  21.8250628874 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_25.m3u  length  21.3321723356 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_26.m3u  length  21.5465699169 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_27.m3u  length  24.9339743008 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_28.m3u  length  32.0853333333 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_29.m3u  length  25.4854482237 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_30.m3u  length  20.7996613757 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_31.m3u  length  21.3372033258 min
Playlist generated, name:  ./playlists/genPlayListByLength.py20_32.m3u  length  22.5926288738 min
```

# Qué queda por mejorar

Ya que el script lo he hecho en media hora, se puede mejorar bastante. Ahora mismo no busca los ficheros de música recursivamente, en el futuro lo añadiré. <del datetime="2014-04-05T15:37:18+00:00">Tiene un fallo, cuando se está generando la lista, si la duración total es menor que la indicada por parámetro, y el fichero de música procesándose en ese momento es muy grande (por ejemplo 40 min), la lista de reproducción no será del tamaño correcto.</del> (Solucionado)

Para aquellos que estén interesados, el código está en <a href="https://github.com/algui91/genPlaylistByName" title="Repositorio" target="_blank">GitHub</a>
