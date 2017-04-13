---
author: cristina
categories:
- linux
color: '#2196F3'
date: 2016-07-18 16:08:56
description: null
image: imagen-terminal-color-texto-a-juego-linux.png
introduction: "Con este peque\xF1o script podrás cambiar el fondo y color de texto
  de tu terminal, a juego"

mainclass: linux
tags:
- Terminal
- Gnome
- "Imágenes"
title: "Cambia La Imágen De Fondo Del Terminal Gnome Y Pon Un Color De Texto a
  Juego, Automáticamente"
---

Seguramente seas una de esas personas que pasan mucho tiempo delante del ordenador con una o varias shells abiertas. De hecho, seguramente tengas más que visto el fondo negro con letras blancas, o el estilo de terminal que pusiste hace tiempo,  porque cambiarlo todos los días no es el hobbie de nadie. Pero ¿y si se cambiara sólo?¿ y si pudieras poner tus imágenes favoritas de fondo del terminal, con un color de texto que no desentone con tu imágen  y tú no tuvieras que hacer nada?

<!--more--><!--ad-->

Aquí os quiero contar como se me ocurrió hacerlo a mí, con un script en bash  y así escapar de la rutina de estilo de las shells.

Antes de comenzar...
-------------

#### Comprobar versión de gnome-shell

El script es válido para **versiones de gnome < 3.8**. Lo he probado en Linux Mint Debian Edition y en Ubuntu 14.04. En este último tuve que instalar gnome-shell.

Para instalar gnome-shell:

```bash
    cris@cris ~ $ sudo apt-get install gnome-shell
```

Para comprobar la versión de gnome:

```bash
    cris@cris ~ $ gnome-shell --version
```

#### instalar ImageMagick y gawk

Usaremos funciones de ImageMagick para convertir las imágenes, y gawk para filtrar por expresiones. Para instalarlos:

```bash
    cris@cris ~ $ sudo apt-get install gawk
    cris@cris ~ $ sudo apt-get install imagemagick
```

-------------

Expliación del script
-------------

La idea del script es modificar directamente los valores de configuración de terminal que se establecen en el fichero **%gconf.xml** que se ubica en `home/user/.gconf/apps/gnome-terminal/profiles/Default/`, para versiones de shell gnome < 3.8.

#### Declaración de variables

Inicialmente declaramos las variables con la ruta de los comandos que vamos a tilizar frecuentemente. No es obligatorio, pero es recomendable. La variable **ROUTE** contiene la ruta del directorio donde guardamos las imágenes que queremos poner de fondo.

```bash
    GCONFT="/usr/bin/gconftool-2"
    SORT="/usr/bin/sort"
    GAWK="/usr/bin/gawk"
    CNVRT="/usr/bin/convert"
    ROUTE="/miRuta/*"
```

**Nota:**

- **gconftool-2** : herramienta de configuración gnome. La usaremos con la opción set para modificar el archivo de configuración.
- **sort** : comando que ordena líneas de texto.
- **gawk** : escaneador de patrones. Lo usaremo para filtrar patrón hexadecimal.
- **convert** : lo usaremos para redimensionar la imágen y convertirla en hibstograma.

#### Tomar imágenes

tomamos aleatoriamente una imágen de **miRuta** para la terminal:

```bash
    FILE=$(shuf -n 1 -e $ROUTE)
```

Limpiamos la ruta, quedándonos solo con el nombre de la imágen:

```bash
    FILECONV=$(basename "$FILE")
```

Redimensionamos la imágen (sólo si es necesario, por ejemplo, si las imágenes que queremos usar son tamaño fondo de escritorio). Para no modificar la imágen original ni guardar muchas copias innecesarias, la guardamos en /tmp.

```bash
    convert "$FILE" -resize %50 "/tmp/$FILECONV"
```

Como mis imágenes son tamaño fondo de escritorio, las redimensiono a la mitad de su tamaño para que se aprecien mejor en el terminal.


 Opcional: tomamos otra imágen aleatoriamente de la carpeta para fondo de escritorio:

```bash
    FILED=$(shuf -n 1 -e $ROUTE)
```

#### Ponemos la imágen de fondo en el terminal

modificamos algunas configuraciones que vienen por defecto antes de aplicar los cambios, para que tengan efecto:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_type --type string "image" #solido por defecto

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_custom_command --type bool "false"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_theme_colors --type bool "false"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/use_custom_default_size --type bool "true"
```

Ahora, ya podemos tomar la imágen redimensionada y ponerla como imágen de fondo del terminal:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_image --type string "/tmp/$FILECONV"
```

Por último, ponemos un color oscuro de fondo del terminal y un nivel de opacidad alto, para que se vea mejor el texto:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_color --type string "#181824243131"

    $GCONFT --set /apps/gnome-terminal/profiles/Default/background_darkness --type float "0.78"
```

#### Ponemos color del texto a juego

Para ello, sacamos el hibstograma de colores de la imágen, y tomamos un tono de esos colores. Con **convert** podemos indicar el número de colores que deseamos sacar y la profundidad. Luego los ordenamos segun su orden numérico y filtramos solo el  código hexadecimal de los colores con **gawk**. Lo guardamos en un fichero de texto llamado paleta.txt que se creara en /tmp.

```bash
    $CNVRT "/tmp/$FILECONV" -colors 25 -depth 6 -format '%c' histogram:info:- \
    | $SORT --general-numeric-sort \
    | $GAWK 'match ($0, /^ *[0-9]+: \([^)]+\) (#[0-9A-F]+) .+$/, a) { print a[1] }' > "/tmp/paleta.txt"
```

Para finalizar, abrimos el fichero temporal **paleta.txt** y leemos  6 primeras líneas, es decir, los 6 primeros colores:

```bash
    #abrir fichero
    exec 3< /tmp/paleta.txt
    #leer 6 lineas
    read color1 <&3
    read color2 <&3
    read color3 <&3
    read color4 <&3
    read color5 <&3
    read color6 <&3
    #cerrar
    exec 3<&-
```

y ponemos el último color leído como color de texto:

```bash
    $GCONFT --set /apps/gnome-terminal/profiles/Default/foreground_color --type string "$color6"
```

Lo de tomar el 6º color es porque como están ordenados de más claro a más oscuro, los colores claros " centrales" son los que mejor resultados dan. No obstante, puedes modificarlo dependiendo de tus fotos. El script no es infalible, la carpeta que yo uso tiene 700 imagenes y siempre hay  imágenes con las que falla eligiendo el color de texto más adecuado para su lectura, sobre todo en las  imágenes muy oscuras  donde no hay ningún color claro. Si se te ocurre alguna mejora, ¡comentala!

 Opcional: si tambien quieres cambiar la imágen del escritorio:

```bash
    gsettings set org.gnome.desktop.background picture-uri "file:///$FILED"
```

#### Disfruta y luce tus terminales

#### Planifica la ejecución
Para no tener que andar lanzando el script, puedes planificarlo con **crontab** para que se ejecute, por ejemplo cada vez que inicias el sistema:

```bash
    cris@cris ~ $ crontab -e #para abrir contab
    @reboot /miRuta_al_script/CambiaTerminales.sh # añadir tarea
```

#### Algunos ejemplos ####

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux2.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="656px" height="386px" />
</figure>
<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux3.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="650px" height="386px" />
</figure>
<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux4.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="656px" height="385px" />
</figure>
<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/imagen-terminal-color-texto-a-juego-linux5.png" alt="imagen-terminal-color-texto-a-juego-linux2" title="Ejemplo 1" width="1003px" height="581px" />
</figure>


#### Enlace al código

Puedes bajarte el script en [github](https://github.com/CristinaHG/My-TerminalsBacgroundSetter "Repositorio My Terminals Background Setter")
