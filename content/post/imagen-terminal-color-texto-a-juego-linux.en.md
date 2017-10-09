---
author: cristina
categories:
- linux
mainclass: linux
date: 2017-10-09T20:09:46+01:00
image: imagen-terminal-color-texto-a-juego-linux.png
description: "With this script you will be able to change your terminal's background and text color, to one that suits the background"
tags:
- script
title: "Change your gnome shell background's image and put a text color that suits, automatically"
---

Sure you are that kind of person that spend hours in front of a computer with one or more terminals open. And sure, you are very used to the shell black background with white letters, or whatever shell style you put long time ago... Because, lets be honest, changing it everyday is not the most fun job. But... What if it changes itself automatically? What if you could just have your favorite pictures as shell backsground's images, with a text that suits the colors in each of that images and you just have to no nothing?

<!--more--><!--ad-->

Here I want to tell you how I thought to do it with a bash script, and thus escape from the shell style routine.

# Before we start...

## Check you gnome-shell version

That script is valid only for **gnome versions < 3.8**. I Have tested it in Linux Mint Debian Edition and in Ubuntu 14.04 (in this last I had to install gnome-shell).

To install gnome-shell (just in case you need to):

```bash
    cris@cris ~ $ sudo apt-get install gnome-shell
```

to check the gnome version:

```bash
    cris@cris ~ $ gnome-shell --version
```

## Install ImageMagick and gawk

We are goint to use some ImageMagick functions to convert the images, and gawk for filtering expressions. To install them:

```bash
    cris@cris ~ $ sudo apt-get install gawk
    cris@cris ~ $ sudo apt-get install imagemagick
```

# Script explanation


What we want this script to do is to modify directly the shell configuration values that are set in the file **%gconf.xml** which is placed at `home/user/.gconf/apps/gnome-terminal/profiles/Default/` for gnome versions < 3.8.

## Variables definition

Initially, we are declaring the variables with the path of the commands we are going to use frequently. It is not mandatory, but it is recommended. The **ROUTE** variable contains the path for the folder where the images that we want to use as background images are placed.

```bash
    GCONFT="/usr/bin/gconftool-2"
    SORT="/usr/bin/sort"
    GAWK="/usr/bin/gawk"
    CNVRT="/usr/bin/convert"
    ROUTE="/myPath/*"
```

**Note:**

- **gconftool-2** : gnome configuration tool. We use it with the *set* option to modify the configuration file.
- **sort** : command that sorts text lines.
- **gawk** : pattern scanner. We use it to filter the hexadecimal pattern.
- **convert** : we use this command to resize the image and convert it to an hibstogram.

## Taking Images

We take randomly an image of **myPath** for the shell background:


```bash
    FILE=$(shuf -n 1 -e $ROUTE)
```

We clear the path name and take only the image's name:

```bash
    FILECONV=$(basename "$FILE")
```

Lets resize the image (just if needed, for example if the images we want to use are for desktop background). To not modify the original image neither keeping so many unnecessary copies, we save it in /tmp.

```bash
    convert "$FILE" -resize %50 "/tmp/$FILECONV"
```

As my images are desktop background size, I resize them to the half of their size to fit better the shell.

Optional: we take another image from the folder to set it as desktop background image:

```bash
    FILED=$(shuf -n 1 -e $ROUTE)
```

## Set the terminal's background image

We modify some configurations that are by default before applying changes, to have an effect:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_type --type string "image" #solido por defecto

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_custom_command --type bool "false"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_theme_colors --type bool "false"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_custom_default_size --type bool "true"
```

Now, we can just take the resized image and set it as terminal's background image:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_image --type string "/tmp/$FILECONV"
```
Last, we set a dark background color for shell and a high opacity level, to make the text looks better:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_color --type string "#181824243131"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_darkness --type float "0.78"
```

## Set the text color to suit with the image

To do that, we first get the color hibstogram from the image, and then we take a color tone of them. With **convert** we can specify the number of colors to take and the deeper we want to go in the image to get them. Then, we sort then according to their numeric order and filter just the hexadecimal code of the colors with **gawk**. We save it in a text file called paleta.txt which will be created at /tmp.

```bash
    $CNVRT "/tmp/$FILECONV" -colors 25 -depth 6 -format '%c' histogram:info:- \
    | $SORT --general-numeric-sort \
    | $GAWK 'match ($0, /^ *[0-9]+: \([^)]+\) (#[0-9A-F]+) .+$/, a) { print a[1] }' > "/tmp/paleta.txt"
```

To finish, we open the temporary file **paleta.txt** and read the first 6 lines from it, that is, we read the first 6 colors:

```bash
    # open file
    exec 3< /tmp/paleta.txt
    #read 6 lines
    read color1 <&3
    read color2 <&3
    read color3 <&3
    read color4 <&3
    read color5 <&3
    read color6 <&3
    #close
    exec 3<&-
```

and we set the last readed color as the shell's text color:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/foreground_color --type string "$color6"
```

Why taking the 6º color? well thats because as colors are ordered from dark to light, the lighther ones, that are the ones that give better results, are in the center possition of the hibstogram. However, you can modify it depending on your images. The script is not perfect! the image folder I use has 700 images and there is sometimes someone that fails suiting with text color, especially the very dark images where no light colors can be found. If you have any idea of improvement, comment it or let me know!

Optional: if you also want to change the desktop background image:

```bash
    gsettings set org.gnome.desktop.background picture-uri "file:///$FILED"
```

# Enjoy and show off your terminals

# Plan it execution

To avoid executing the script by hand, you can automate it execution using **crontab**, for example, if you want it to execute each time you boot your pc:

```bash
    cris@cris ~ $ crontab -e # open crontab
    @reboot /path_to_script/ChangeTerminals.sh # add task
```

# Some examples

<figure>
    <amp-img sizes="(min-width: 656px) 656px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux2.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="656px" height="386px" />
</figure>
<figure>
    <amp-img sizes="(min-width: 650px) 650px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux3.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="650px" height="386px" />
</figure>
<figure>
    <amp-img sizes="(min-width: 656px) 656px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux4.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="656px" height="385px" />
</figure>
<figure>
    <amp-img sizes="(min-width: 1003px) 1003px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux5.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="1003px" height="581px" />
</figure>

# Link to code

You can check the script at [github](https://github.com/CristinaHG/My-TerminalsBacgroundSetter "My Terminals Background Setter Repository ")
