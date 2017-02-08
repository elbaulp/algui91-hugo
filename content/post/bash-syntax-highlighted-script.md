---
author: alex
categories:
- linux
- script
date: '2016-01-01'
lastmod: 2017-02-08
mainclass: linux
url: /bash-syntax-highlighted-script/
title: Script resaltado sintaxis bash
aliases: /script-resaltado-sintaxis-bash/
---

Como os dije, he hecho el script para el resaltado de bash, me ha costado un poco mas, porque queria intentar resaltar mas cosas, pero al final desistí, y lo hice un poco más simple. Hay que tener en cuenta, que habrá muchas palabras que no se resalten, ya que en la terminal de gnu/Linux existen muchísimos comandos, y obviamente, no puedo ponerlos todos, cuando querais que un determinado comando se resalte (como ls, telnet, ftp&#8230;) o cualquiera que useis, simplemente añadirlo a la variable keyWords.

Aquí el código:

```bash
#!/bin/bash

rutaCodigo=`zenity --file-selection --title="Select a File"`
case $? in
0)
  keywords="alias bg bind break builtin case cd command continue declare dirs disown do done echo elif else enable-in esac eval exec exit export fc fg fi for function getopts hash help history if in jobs kill let local logout popd pushd pwd read readonly return select set shift suspend test then time times trap type typeset ulimit umask unalias unset until wait while sed rm IFS cp mv mkdir"

 sed 's/#.*/&/' < "$rutaCodigo" > temp # Para lo comentarios, el & hace que se escriba lo que coincidio con el patron
 cp temp "$rutaCodigo"

  for word in $keywords
  do
    #Busco en el texto, cada palabra clave contenida en keyWords, y le añado la etiqueta span
    sed "s/b$wordb/$word/" < "$rutaCodigo" > temp
    cp temp "$rutaCodigo"
  done

  rm temp
  ;;
*)
  echo "No se seleciciono nada.";;
esac

```

Bien, voy a explicarlo un poco:

La estructura es bastante similar a la del [script de resaltado de sintáxis de c++][1].

```bash
sed 's/#.*/&/'
```

Esta línea es la que se encarga de resaltar los comentarios. Simplemente buscamos una #, que es como se defienen los comentarios en bash, y cualquier carácter despues (.\*). El & que hay en la siguiente sección, es para que en ese lugar, se coloque todo lo que coincidió con el patrón (.\*), es decir, el comentario.

Hay un pequeño problema, y es que no conseguí formar la expresión regular 100% correcta para los comentarios, de modo que en cualquier lugar en el que exista una #, se la tratará como comentario, esto sucede por ejemplo al principio del script (#!/bin/bash).

Espero que os sea útil, y si quieren modificarlo, háganlo, me lo envian, y yo lo subo al blog sin problemas.
Saludos.

[1]: https://elbauldelprogramador.com/script-resaltado-sintaxis/
