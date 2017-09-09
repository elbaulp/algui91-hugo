---
author: alex
categories:
- linux
- script
date: '2016-01-01'
lastmod: 2017-09-08T12:08:31+01:00
mainclass: linux
url: /script-resaltado-sintaxis/
tags:
- sintaxis c
title: Script resaltado sintaxis c++
---

He estado un tiempo intentando instalar unos script hechos en javascript, para resaltar la sintaxis del codigo fuente que tengo en el blog, pero no conseguí instalarlo. Se llama SyntaxHighlighter, su web es <a href="http://alexgorbatchev.com/SyntaxHighlighter/" target="_blank">esta</a>.

Ya que no lo consegui me decidi a crear un pequeño script que por lo menos resalte las palabras reservadas del lengüaje. Lo hice para c++, en los proximos días intentaré hacer otro para bash y python.<br /> Aqui esta el codigo:

```bash
#!/bin/bash

rutaCodigo=`zenity --file-selection --title="Select a File"`
case $? in
0)
  keyWords="continue float new signed try auto default for operator sizeof typedef break delete friend private static union case do goto protected struct unsigned catch double if public switch virtual char else inline register template void enum int return this volatile const extern long short throw while bool cout cin using namespace"

  sed "s/^#include/#include/" < "$rutaCodigo" > temp # coloreo el include
  sed "s/^#define/#define/" < temp > "$rutaCodigo" # coloreo el define

  for word in $keyWords
  do
    #Busco en el texto, cada palabra clave contenida en keyWords, y le añado la etiqueta span
    sed "s/b$wordb/$word/" < "$rutaCodigo" > temp
    cp temp $rutaCodigo
  done

  sed "s/^class /class/g" < "$rutaCodigo" > temp
  rm temp
  ;;
*)
  echo "No se seleciciono nada.";;
esac
```

<b>Voy a explicar un poco el código:</b><br /> La variable <em>keyWords</em> contiene las palabras claves de c++, menos &#8220;class&#8221;, que despues explicaré porque. En esta variable, las palabras han de estar separadas por un espacio, y todas en una misma linea, Para que el for coja palabra a palabra..

Las dos siguientes lineas

```bash
sed "s/^#include..... y sed "s/^#define...
```

<p>
    buscan el patrón #define o #include, al principio de cada linea del texto, esto se indica con <em>^</em>, y lo reemplaza con su estilo correspondiente, para formatear el texto.<br /> Una vez entramos al for, se aplica básicamente el mismo procedimiento que para define e include, pero con cada palabra de la variable keyWords.
  </p>
<p>
    Por ultimo, hago lo mismo para la palabra, reservada class, el motivo por el que he dejado esta para el final, es porque la etiqueta <span class...="class..."> contiene la palabra, class, y entonces el código no saldria bien, ya que al encontrarse esta palabra dentro de la etiqueta span, la sustituiría tambien.<br /> Como Usarlo:
  </span></p>
<p>
    Lo primero que hice fue pensar de que color resaltar las palabras clave, las puse igual que en los ejemplos de <a href="http://conclase.net/" target="_blank">conclase</a>. El siguiente paso es crear una clase en el css del blog, de esta forma:
  </p>
<p>
<b><i>.prp { color: "#0a0"; font-weight: bold; }<br /> .cpp { color: "#a40"; font-weight: bold; }</i></b>
</p>
<p>
    Una vez hecho esto, solo nos resta ejecutar el script, e introducir la ruta del codigo a formatear con este estilo.
  </p>
<p>
<a href="http://bashyc.blogspot.com/p/curso-c.html#ejercicio111" target="_blank">Aqui</a> podeis ver el resultado.
  </p>
<p>
    Si tenéis alguna duda, preguntad sin problema.
  </p>
<p>
    Saludos, espero que sea útil<br />
</p>
