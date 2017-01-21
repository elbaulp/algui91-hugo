---
author: alex
categories:
- bash
- linux
- script
color: '#2196F3'
image: 2013/07/Screenshot-from-2013-07-02-164301.png
lastmod: 2016-08-09
layout: post.amp
mainclass: linux
permalink: /ejecutar-un-script-al-modificar-un-fichero-con-inotify/
tags:
- Ejecutar un script al modificar un fichero
- ejemplo inotify
- ejemplo inotify-tools
title: Ejecutar un script al modificar un fichero con inotify
---

La idea de querer ejecutar un script al modificar un fichero surgió a raiz del artículo donde expliqué cómo [editar y crear archivos cifrados con GPG en Vim][2]. Aunque parezca un poco dificil encontrarle utilidad a esta idea, puede resultar bastante cómodo por ejemplo compilar automáticamente un programa cada vez que modificamos el código, borrar ficheros generados automáticamente etc, hay multidud de aplicaciones posibles en función de nuestras necesidades.

<!--more--><!--ad-->

A mi personalmente me hacía falta para cifrar un archivo automáticamente tras modificarlo, pero más tarde caí en la cuenta de que eso ya lo hace el plugin de Vim.

Antes de poder usar el script es necesario instalar *inotify-tools*

```bash
# aptitude install inotify-tools
```

Hecho esto, ahora es posible ejecutar el script que he creado:

```bash
function help {
   echo "$0 <directory> <file to="to" watch="watch"> <script to="to" execute="execute">"
}

if [ "$#" -ne 3 ]; then
   help
   exit 1
fi

while true; do
  change=$(inotifywait -e close_write $1)
  echo $change
  change=${change#./ * }
  if [ "$change" = "$2" ]; then ./$3; fi
done
```

El script recibe 3 parámetros; El directorio donde se encuentra el fichero, el nombre del fichero y el script a ejecutar al detectar cambios. Veamos un ejemplo trivial que simplemente escribirá un texto al final del fichero:


```bash
$ cat ejemplo
elbauldelprogramador.com
$ cat script.sh
#!/bin/bash

echo "Script ejecutado tras editar" >> ejemplo
$ ./notifyChangesOnFile.sh . ejemplo script.sh
Setting up watches.
Watches established.
./ CLOSE_WRITE,CLOSE ejemplo
Setting up watches.
Watches established.
```

Tras ejecutar _notifyChangesOnFile.sh_ abrimos el fichero de ejemplo con cualquier editor y cuando guardemos aparece en pantalla `./ CLOSE_WRITE,CLOSE ejemplo` indicando que se ha modificado. Si volvemos a mirar el fichero de ejemplo su contenido es:

```bash
$ cat ejemplo
elbauldelprogramador.com




escribimos algo para modificar el fichero y guardamos
Script ejecutado tras editar
```

Espero que sea de utilidad, el repositorio de _inotify-tools_ está en github (Enlace en las referencias).


# Referencias

- _Repositorio inotify-tools_ \| <a href="https://github.com/rvoicilas/inotify-tools" target="_blank">Visitar sitio</a><br>
- _inotify_ \| <a href="http://inotify.aiken.cz/?section=incron&page=about&lang=en" target="_blank">inotify.aiken.cz</a><br>
- _How to execute a command whenever a file changes?_ \| <a href="http://superuser.com/questions/181517/how-to-execute-a-command-whenever-a-file-changes" target="_blank">superuser.com</a><br>
- _Bash: Execute script on file save?_ \| <a href="http://stackoverflow.com/questions/3283228/bash-execute-script-on-file-save" target="_blank">stackoverflow</a>


[2]: https://elbauldelprogramador.com/editar-y-crear-archivos-cifrados-con-gpg-en-vim/ "Editar y crear archivos cifrados con GPG en Vim"
