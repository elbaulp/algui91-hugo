---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-01-01'

mainclass: linux
url: /script-resaltado-sintaxis-bash-mejorado/
title: Script resaltado sintaxis bash (Mejorado)
---

Gracias a DavidRSM, he mejorado el script de resaltado de sintaxis para bash, y ahora permite muchas más palabras clave. Simplemente hay que añadir a la variable keywords los nombres de los comandos que se encuentran en /bin/, y /sbin/, Podéis agregar más palabras clave concatenándolas a la variable, de esta manera:

```bash
keywords=$keywords`ls '<em>Directorio de comandos</em>'`
```

```bash
#!/bin/bash

rutaCodigo=`zenity --file-selection --title="Select a File"`
case $? in
0)
  keywords="alias bg bind break builtin case cd command continue declare dirs disown do done elif else enable-in esac eval exec exit export fc fg fi for function getopts hash help history if jobs let local logout popd pushd read readonly return select set shift suspend test then time times trap type typeset ulimit umask unalias unset until wait while"

 #Agrego mas palabras clave de los directorios sbin y bine, que contienen comandos.
 keywords=$keywords`ls /bin/`
 keywords=$keywords`ls /sbin/`

 # Para lo comentarios, el & hace que se escriba lo que coincidio con el patron
 sed 's/#.*/&/' < "$rutaCodigo" > temp
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
