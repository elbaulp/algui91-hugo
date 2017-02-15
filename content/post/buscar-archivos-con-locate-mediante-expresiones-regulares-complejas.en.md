---
author: alex
categories:
- script
date: 2017-02-15
description: "In GNU/Linux, Locate command is useful to find files in the file system by querying a database. Here is how to use with regular expressions."
image: 2013/11/Buscar-archivos-con-locate-mediante-expresiones-regulares-complejas.png
mainclass: linux
tags:
- custom music playlists
- locate examples
- regex in linux
- locate
- regex
- howto
title: "How to search files with locate using regular expressions."
---

In GNU/Linux, `locate` command is useful to find files in the file system by querying a database. Here is how to use with regular expressions." Its `man` description is:

> locate reads one or more databases prepared by updatedb(8) and writes file names matching at least one of the PATTERNs to standard output, one per line.

This post arises from a problem I had some days ago. I have a file with some of my <a href="https://www.youtube.com/playlist?list=PLINUjqv9_oyrI4SXWqf-sBhoUnxHe2bRh" target="_blank" title="Favorite songs">Favorite songs</a>. I update this file on a regular basis and I wanted to generate a playlist from that file. The solution was to write a [script][2] which loop through all items in the file and search where the each file is located in the hard drive.

> __UPDATE:__ Some time ago I improved this idea and wrote a `Python` script to [create music playlists with a given length](https://elbauldelprogramador.com/en/generar-listas-de-reproduccion-determinada-duracion-python/ "create music playlists with a given length").

# Regular expressions in Locate

<!--more--><!--ad-->

__Locate__ accepts complex [regexs][3], in order to enable them, give `locate` `-regex` option.

Basically the problem is as follows: Given a text file with filenames, get the absolute path for each file in the textfile. For example, a file name _“Author - Song Name”_ will be stored in the file as _“Song Name”_.

# Writing the regular expression

Here is the `regex` needed:

```bash
$i.*(\.mp4|\.mp3)
```
- `$i` stores the song name.
- `.*` match zero or more characters after the song name.
- `(\.mp4|\.mp3)` match only files with [_mp3_ or _mp4_ extensions][4].

When building regular expressions, I find useful to use some king of tool like __regex texter__, that allows to visualize the regular expression:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Buscar-archivos-con-locate-mediante-expresiones-regulares-complejas.png" title="{{ page.title }}" alt="{{ page.title }}" width="627px" height="285px"></amp-img>
    <figcaption>Créditos: <a href="https://www.iconfinder.com/icons/33644/terminal_icon" target="_blank">inconfinder</a></figcaption>
</figure>

# Script

Once the regular expression is finished, the script that process the file with the song names and creates a playlist is as follows:

```bash
#!/bin/bash

names=`cat TEXT_FILE_WITH_SONG_NAMES`

IFS='
'

> /path/to/playlist.m3u

for i in $nombres
do
    echo "locate --regex -i \"$i.*(\.mp4|\.mp3)\""
    locate --regex -i "$i.*(\.mp4|\.mp3)" | tee -a /path/to/playlist.m3u
done
IFS=' '
```

`IFS` is set to line break, because `for` by default would consider the space as a separator, instead of a new line.

As an alternative, suggested  by [@ingenieríainv](https://twitter.com/ingenieriainv/status/769135025216483328) is to use `while read $i`:

```bash
#!/bin/bash

names=`cat ARCHIVO_CON_LISTA_DE_NOMBRES`

> /path/to/playlist.m3u

cat $nombres | while read i
do
    echo "locate --regex -i \"$i.*(\.mp4|\.mp3)\""
    locate --regex -i "$i.*(\.mp4|\.mp3)" | tee -a /path/to/playlist.m3u
done
```

And so `IFS` is no longer needed.

# Tools

- *RegEx Tester* »» <a href="http://regexpal.com/" target="_blank">regexpal.com</a>

 [1]: https://elbauldelprogramador.com/bases-de-datos/ "Bases de Datos"
 [2]: https://elbauldelprogramador.com/tags/bash "Categoría script"
 [3]: https://elbauldelprogramador.com/tags/regex "Artículos sobre expresiones regulares"
 [4]: https://elbauldelprogramador.com/cual-es-la-diferencia-entre-los-distintos-formatos-de-audio-y-cual-deberia-elegir/ "¿Cual es la diferencia entre los distintos formatos de audio, y cual debería elegir?"
