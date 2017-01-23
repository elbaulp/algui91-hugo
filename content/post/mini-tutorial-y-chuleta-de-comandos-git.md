---
author: alex
categories:
- articulos
color: '#f05033'
date: 2015-12-13 18:10:12
description: Un mini tutorial y lista extensa de comandos git
image: 2013/03/git-logo.png
lastmod: 2016-08-06
layout: post.amp
mainclass: git
url: /mini-tutorial-y-chuleta-de-comandos-git/
redirect_from: /articulos/mini-tutorial-y-chuleta-de-comandos-git/
tags:
- chuleta
- git
- chuleta comandos git
- chuleta git
- comandos git
- git cheatsheet
- git tutorial
- introduccion git
- ramas con git
- tutorial git
- tutoriales sobre git
- "tutorial git espa\xF1ol"
- git bash tutorial
- comandos bitbucket
- "git tutorial espa\xF1ol"
- "git manual espa\xF1ol pdf"
- git clone
- git init
title: 'Git: Mini Tutorial y chuleta de comandos'
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/git-logo.png" alt="Tutorial git y comandos git" title="Git: Mini Tutorial y chuleta de comandos git" alt="Git: Mini Tutorial y chuleta de comandos" width="910px" height="380px"></amp-img>
</figure>

> **NOTA:** Puede que te interese descargar este <a href="http://bashyc-blogspot.tradepub.com/c/pubRD.mpl?sr=oc&_t=oc:&qf=w_java24&ch=ocsoc" id="revresponse-git-link" title="Manual de git" target="_blank">manual para git</a>. _Si rellenas el formulario correctamente nos darán $1.5 de comisión, una buena forma de mostrar tu apoyo al blog ;-)_

Una de mis tareas pendientes era aprender GIT decentemente. Así que empecé a leer <a href="http://git-scm.com/book" target="_blank">Pro Git</a>, libro que recomiendo a todo desarrollador, disponible en <a href="https://github.s3.amazonaws.com/media/progit.en.pdf" target="_blank">PDF</a>, <a href="https://github.s3.amazonaws.com/media/progit.epub" target="_blank">EPUB</a>, <a href="https://github.s3.amazonaws.com/media/pro-git.en.mobi" target="_blank">MOBI</a> y <a href="http://www.amazon.es/gp/product/1430218339/ref=as_li_ss_tl?ie=UTF8&camp=3626&creative=24822&creativeASIN=1430218339&linkCode=as2&tag=elbaudelpro-21" target="_blank">versión en papel</a>. En la página del libro puedes encontrar versiones en distintos idiomas. Conforme he ido leyendolo, he anotado los comandos. Como resultado he creado esta especie de chuleta de comandos git que comparto hoy con vosotros. Espero que os resulte útil.



<!--more--><!--ad-->

# Chuleta de comandos git

- **git help &lt;command>**
- **git clone &lt;uri> namedir** # clona usando como nombre de directorio namedir.
- **git add &lt;dir>** # añade recursivamente todos los archivos del dir.
- **git diff &#45;&#45;staged**  # compares staged changes with last commit
- **git commit &#45;v** # muestra el diff en el editor
- **git commit &#45;a &#45;m &#8221;**  # automatically stage tracked files. No hace falta git add
- **git rm &#45;&#45;cached &lt;file or regexp>**   # Git no realiza un seguimiento del archivo, pero los deja en el directorio de trabajo. Útil cuando se olvida añadir archivos al .gitignore y ya hemos agregado dichos archivos al repositorio.
- **git rm &lt;file>**   # borrarlos con git siempre.
- **git rm &#45;f &lt;file>**   #  si ya está modificado y en el index.
- **git mv &lt;file> &lt;renamed_file>**
- **gitk**  #  tcl/tk. Herramienta gráfica para git
- **git commit &#45;&#45;amend**  # Modificar el mensaje del último commit
- **git reset HEAD &lt;file>**   #  to unstage
- **git checkout &#45;&#45; &lt;file>**   #  Descartar cambios en el directorio de trabajo.

## AÑADIR ARCHIVOS

- **git add &#45;i**  # interactive staggin
- **git add &#45;p**  # crea patch

## STASH

- **git stash**  # guarda el estado en una pila y limpia el directorio para poder cambiar de rama
- **git stash list**  # muestra la pila
- **git stash apply**  #  vuelve al estado original del dir. Stash{n} especifica uno concreto Y &#45;&#45;index reaplica los cambios stagged
- **git stash pop**  #  elimina el primero en la pila. O drop

## LOGS

- **git log &#45;p &#45;2**  #  Muestra 2 últimos commits con diff
- **git log &#45;&#45;stat**
- **git log &#45;&#45;pretty &lt;short&#124;full&#124;fuller>**
- **git log &#45;&#45;pretty=format:&#8221;%h &#45; %an, %ar : %s&#8221;**
- **git log &#45;&#45;pretty=format;&#8221;%h %s&#8221; &#45;&#45;graph**
- **git log &#45;&#45;since=2.weeks**
- **git log &lt;branch> &#45;&#45;not master**  # Muestra commit de &lt;branch> sin incluir los de master
- **git log &#45;&#45;abbrev&#45;commit &#45;&#45;pretty=oneline**
- **git diff master&#8230;contrib**  # Muestra solo el trabajo que la rama contrib actual ha introducido desde su antecesor común con master
- **git log &lt;branch1>..&lt;branch2>**   # Commits de branch2 que no están en branch1
- **git log origin/master..master**  # Muestra qué commits se van a enviar al servidor
- **git log origin/master..**  # Igual que el anterior. Se asume master o HEAD
- **git log refA refB &#45;&#45;not refC**  #  commits en refA y refB que no están en refC
- **git log master&#8230;experiment**  # commits de master o experiment, pero sin ser comunes. Con &#45;&#45;left&#45;right indica a qué rama pertenece cada uno

## REMOTES # repos en internet

- **git remote &#45;v**  #  lista los repos remotos
- **git remote add \[shortname\] \[url\]**  #  crea nuevo remote, es posible descargar el contenido de ese repo con git fetch [shortname]. Master branch en [shortcode]/master
- **git fetch &lt;remote>**   #  descarga trabajo nuevo a máquina local, no sobreescribe nada tuyo. ( git pull sí hace merge automaticamente si se esta realizando un seguimiento de esa branch)
- **git push \[remote&#45;name\] \[branch&#45;name\]**  #  sii nadie ha hecho push antes
- **git remote show [remote&#45;name]**  #  inspecciona remote.
- **git remote rename &lt;old&#45;name> &lt;new&#45;name>**   #  también renombra branches: quedaría &lt;new&#45;name>/master
- **git remote rm &lt;remote&#45;name>**   #  p.e si el contribuidor ya no contribuye más

## Añadir varios repositorios remotos

- **git remote add bitbucket &lt;url repositorio>**  #  Añadir un nuevo repositorio remoto con el nombre deseado. Por ejemplo si ya tenemos uno en github y queremos añadir otro para bitbucket
- **git push -u bitbucket -all**  #  Subir el proyecto a bitbucket. A partir de ahora se puede seleccionar a qué repo publicar con***git push nombre\_repo\_remoto**

## TAGGING # marcan puntos importantes en la histtoria del repo ( releases )

- **git tag**  #  muestra las etiquetas actuales
- **git tag &#45;l &#8216;v1.4.2.*&#8217;**   #  acepta regex
- Dos tipos de tag:
  - **Lightweight** : puntero a commit ( branch que no cambia )
  - **Annotated** : se almacenan como objetos en la db, con checksum, nombre del creador, email, fecha, mensaje, posibilidad de firmarla con [GPG][1]. ( recomendada )

- **git tag &#45;a &lt;tagname> &#45;m &#8216;mensaje&#8217;**   #  annotated tag
- **git show &lt;tag&#45;name>**   #  muestra información asociada.
- **git tag &#45;s &lt;tag&#45;name> &#45;m &#8216;message&#8217;**   #  la firma con gpg
- **git tag &lt;tag&#45;name>**   #  lightweight tag
- **git tag &#45;v &lt;tag&#45;name>**   #  verifica tags firmadas
- **git tag &#45;a &lt;tag&#45;name> [commit&#45;chksum]**  #  crea tag para commit con dicho chksum
- Por defecto no se transfieren los tags, para subirlos al servidor:
  - **git push origin [tag&#45;name]**  #  una sola
  - **git push origin &#45;&#45;tags**  #  Enviar todas

- Para usar GPG y firmar tags, hay que subir la clave pública al repositorio:
  - **gpg &#45;&#45;list&#45;keys**  # Coges la id pública
  - **gpg &#45;a &#45;&#45;export &lt;id> &#124; git hash&#45;object &#45;w &#45;&#45;stdin**  # Copia el SHA&#45;1 devuelto
  - **git tag &#45;a maintainer&#45;gpg&#45;pub &lt;SHA&#45;1>**
  - **git push &#45;&#45;tags**  # Comparte la clave con todos los usuarios
  - **git show maintainer&#45;gpg&#45;pub &#124; gpg &#45;&#45;import**  # Cada usuario importa la clave así
  - **git show &lt;tag>**   # Devuelve más información sobre la etiqueta
  - **git tag -d nombre_tag**  #  eliminar la etiqueta
  - **git push origin :refs/tags/nombre_tag**  #  Eliminar la etiqueta del repositorio remoto.

## BRANCH

Las ramas simplememte son punteros a distintos snapshots

- **git branch &lt;nombre&#45;rama>**   # crea rama. Puntero al commit actual
- **git checkout &lt;nombre&#45;rama>**   # cambiar a la rama especificada.
- **git checkout &#45;b &lt;nombre&#45;rama>**   # crea y cambia de rama
- **git merge &lt;rama>**   #  Mezcla la rama actual con &lt;rama>
- **git branch &#45;d &lt;rama>**   # elimina la rama
- **git push origin &#45;&#45;delete &lt;branchName>**   #  Elimina una rama del servidor
- **git mergetool**  # Herramienta gráfica para resolver conflictos
- **git branch**  #  lista ramas
- **git branch &#45;v**  #  lista ramas mostrando último commit
- **git branch &#45;&#45;merged**  # lista ramas que han sido mezcladas con la actual. Si no tienen un *, pueden borrarse, ya que significa que se han incorporado los cambios en la rama actual.
- **git branch &#45;&#45;no&#45;merged**  # lista ramas que no han sido incorporadas a la actual.

## REMOTE BRANCHES

- **git fetch origin**  #  Descarga el contenido del servidor
- **git push &lt;remote> &lt;branch>**   # Las ramas no se suben por defecto, has de subirlas explícitamente
- **git push &lt;remote> &lt;branch>:&lt;nuevoNombre>**   # Igual que la de arriba, pero en el servidor se llama a la rama con nuevoNombre en lugar de branch
- Cuando se hace un git fetch que trae consigo nuevas ramas remotas, no se disponen de ellas localmente, solo se dispone de un puntero a la rama remota que no es editable. Para poder trabajar sobre esa rama, es necesario crearla Por ejemplo:
  - **git fetch origin**  #  Tras ejecutarlo, notamos que se ha creado una rama nueva (rama_nueva)
  - **git checkout &#45;b rama\_nueva origin/rama\_nueva**  #  Crea una rama local a partir de la remota
  - **git merge origin/nueva_rama**  #  Equivalente a la de arriba, pero sin establecer el tracking a la rama

- **git push [remotename] :[branch]**  #  elimina una rama remota
- **git push \[remotename\] \[localbranch\]:[remotebranch]**  # La rama en el servidor tiene distinto nombre a la local

## TRACKING BRANCHES

- **git checkout &#45;&#45;track origin/rama**  # Equivalente a &#45;b rama\_nueva origin/rama\_nueva
- **git chekout &#45;b &lt;nuevo_nombre> origin/&lt;rama>**   #  Establece un nombre distinto para la rama local

## REBASE

Rebase y merge se diferencian en que merge mezcla dos puntos finales de dos snapshots y rebase aplica cada uno de los cambios a la rama en la que se hace el rebase. No lo uses en repos publicos con mas colaboradores, porque todos los demas tendrán que hacer re&#45;merges

- **git checkout &lt;una rama>**
- **git rebase master**  #  aplica todos los cambios de &lt;una rama> a master
- **git merge master**  # hay que hacer un merge de tipo fast forward
- Tenemos 3 ramas, master, client y server, en server y client tenemos varios commit y queremos mezclar client en master pero dejar server intacta:
  - **git rebase &#45;&#45;onto master server client**  #  adivina los patches del antecesor común de las ramas server y client y aplica los cambios a master.
  - **git checkout master***
  - **git merge client**  #  fast&#45;forward. Client y master en el mismo snapshot
- Si se quiere aplicar también los cambios de server, basta con:
  - **git rebase master server**
  - **git checkout master**
  - **git merge server**

- **git rebase \[basebranch\] \[topicbranch\]**  #  sintaxis de rebase
- **git rebase &#45;i**  #  Rebase interactivo

# SERVIDOR

- **git instawew**  #  Muestra una interfaz web con los commits

## GENERAR UN NÚMERO DE COMPILACIÓN (BUILD NUMBER)

- **git describe master**  # Solo funciona para tags creadas con &#45;s ó &#45;a

## PREPARAR UNA RELEASE

- **git archive master --prefix="project/" &#124; gzip > \`git describe master\`.tar.gz**
- **git archive master --prefix="project/" --format=zip &#124; \`git describe master\`.zip**
- test/ export&#45;ignore  # Al crear el tarball no incluye el directorio test/

## GENERAR UN CHANGELOG

- **git shortlog &#45;&#45;no&#45;merges master &#45;&#45;not &lt;tag>**   # Recopila todos los commits desde &lt;tag> y los agrupa por autor

## RECOMENDACIONES

- Siempre hay que hacer pull antes de push en caso de que alguien haya subido cambios al servidor. Ejemplo:
  - User1 clona el repo y hace cambios, realiza un commit
  - User2 clona el repo, hace cambios, hace commit y sube los cambios con push
  - User1 intenta hacer push, pero será rechazado con: &lt;u>! [rejected] master &#45;> master (non&#45;fast forward)&lt;/u>. No puede subir los cambios hasta que no mezcle el trabajo que ha subido User2. Así que debe hacer lo siguiente:
    - git fetch origin
    - git merge origin/master
    - git push origin master


- Mientras User1 hacía estas operaciones, User2 ha creado una rama &lt;u>issue54&lt;/u> y realizado 3 commits, sin haber descargado los cambios de User1. Para sincronizar el trabajo, User2 debe hacer:
  - **git fetch origin**
  - **git log &#45;&#45;no&#45;merges origin/master ^issue54**  # Observa qué cambios ha hecho User1
  - **git checkout master**
  - **git merge issue54 && git merge origin/master***
  - **git push origin master***

- **git diff &#45;&#45;check**  # Antes de hacer commit, ejecutar esto para ver si hemos añadido demasiados espacios que puedan causar problemas a los demás.
- Commits pequeños que se centren en resolver un problema, no commits con grandes cambios.
- **git add &#45;&#45;patch**  # En caso de hacer varios cambios en el mismo archivo
- El mensaje del commit debe tener la estructura siguiente: Una linea de no más de 50 caracteres, seguida de otra línea en blanco seguida de una descripción completa del commit.

## PASOS A SEGUIR PARA CONTRIBUIR A PROYECYOS AJENOS, MEDIANTE FORK

- git clone &lt;url>
- git checkout &#45;b featureA
- git commit
- git remote add myFork &lt;url>
- git push myFork featureA
- git request&#45;pull origin/master myFork  # enviar la salida por mail al propietario del proyecto, o hacer click en pull request.
- Buena practica tener siempre una rama master que apunte a origin/master, para estar siempre actualizado con los ultimos cambios en el proyecto original.
- **Separar cada trabajo realizado en topic branch, que trackeen a origin/master**
- git checkout &#45;b featureB origin/master
- (Hacer cambios)
- git commit
- git push myFork featureB
- (Contactar con el propietario del proyecto)
- git fetch origin
- Otro ejemplo, el propietario del proyecto quiere aceptar un pull tuyo, pero quiere que hagas algunos cambios, aprovechas la oportunidad y mueves tu trabajo para basarlo en el contenido actual de la rama origin/master, aplastas los cambios en **featureB**, resuelves conflictos, y haces push:
  - git checkout &#45;b featureBv2 origin/master
  - git merge &#45;&#45;no&#45;commit &#45;&#45;squash featureB
  - (cambiar la implementacion)
  - git commit
  - git push myFork featureBv2
  - **&#45;&#45;squash coge todo el trabajo de la rama mezclada y la aplasta en un no&#45;merge commit encima de la rama en la que estas. &#45;&#45;no&#45;commit no registra el commit automaticamente. Así puedes realizar todos los cambios necesarios y luego hacer el commit**

## REFLOG

En segundo plano, git crea un log de a donde han estado referenciando HEAD y el resto de ramas en los últimos meses.

- **git reflog**
- **git show HEAD@{n}**  # Muestra información sobre el reflog número n
- **git log &#45;g master**  # Muestra el log formateado como la salida de reflog
- **git show master@{yesterday}**  # Muestra los commits de ayer.

## UTILIDADES

- **git show &lt;short&#45;SHA&#45;1>**   # Es posible ver un commit pasando la versión abreviada del SHA&#45;1
- **git rev&#45;parse &lt;branch>**   # A qué SHA&#45;1 apunta una rama
- **git show HEAD^**  #  Muestra commit padre
- **git show HEAD^2**  # Muestra segundo padre
- **git show HEAD~2**  #  El primer padre del primer padre
- **git filter&#45;branch &#45;&#45;tree&#45;filter &#8216;rm &#45;f &lt;file>&#8217; HEAD**  # elimina el archivo de todos los commits

## DEPURACIÓN

- File anotation
  - **git blame &#45;L 12,22 &lt;archivo>**   #  muestra cuando y por quién se modificaron de la linea 12 a la 22
  - **git blame &#45;C &#45;L 141,153 &lt;file>**   #  cuando renombras un archivo o lo refactorizas en varios, muestra de donde vino originalmente.

- Búsqueda Binaria: Cuando hay un bug que no puedes localizar, usas bisect para dererminar en qué commit empezó a producirse el bug.
  - **git bisect start**
  - **git bisect bad**  #  marcas el commit actual como roto
  - **git bisect good [commit bueno]**  #  último commit conocido que funcionaba
- Ahora irá preguntando hasta que encuentres el commit culpable. Si esta bien indicas git bisect good. De lo contrario git bisect bad. Al terminar hay que resetear.
  - **git bisect reset**

## SUBMODULOS

- **git submodule add &lt;url>**   #  crea un directorio que contiene el comtenido de otro proyecto.

- Clonar un repo con submodulos
  - git clone url
  - git submodule init
  - git submodule update

## CONFIGURATION

- **git config &#45;&#45;global &lt;opcion> &lt;valor>**   # global para usuario, system todos y sin nada, especifico para el repo.
- **git config {key}**  #  muestra el valor de key
- **git config &#45;&#45;global core.editor &lt;editor>**   # cambia el editor por defecto
- **git config &#45;&#45;global commit.template $HOME/.gitmessage.txt**  # plantilla para commits
- **git config &#45;&#45;global core.pager &#8216;more\|less&#8217;**   # paginador por defecto, puedes usar cualquiera
- **git config &#45;&#45;global user.signingkey &lt;gpg&#45;key&#45;id>**   #  clave gpg para firmar tags
- **git config &#45;&#45;global core.excludesfile &lt;file>**   # como gitignore
- **git config &#45;&#45;global help.autocorrect 1**  #  autocorrige cuando se escribe un comando incorrecto. Solo en git >= 1.6.1
- **git config &#45;&#45;global color.ui true**  #  colorea la salida de git. Valores: true\|false\|always
- **git config &#45;&#45;global core.autocrlf input**  # para que usuarios linux no tengan problemas con los retornos de carro de windows
- **git config &#45;&#45;global core.autocrlf true**  # para usuarios de windows
- **git config &#45;&#45;global core.whitespace trailing&#45;space, space&#45;before&#45;tab, indent&#45;with&#45;non&#45;tab, cr&#45;at&#45;eol**  #  respectivamente: busca espacios al final de línea, busca espacios al inicio de tabulación, busca líneas con 8 o más espacios en lugar de tabulaciones, acepta retornos de carro
- **git apply &#45;&#45;whitespace=warn &lt;patch>**   #  advierte de errores de espacios antes de aplicar el patch. Con &#45;&#45;whitespace=fix intenta arreglarlos

## GIT ATTRIBUTES

Archivo en .gitattributes en el directorio de trabajo o en .git/info/attributes para no committearlo

**Identificando archivos binarios**
Muchos archivos son para uso local y no aportan información al repositorio. Para decirle a git qué archivos son binarios hacer añadir al archivo atributes:
**&lt;nombre archivo o regexp> &#45;crlf &#45;diff**  #  git no intentará corregir problemas de crlf ni mostrará los cambios con diff. En versiones >= 1.6 se pueden sustituir estos dos valores por la macro binary

**Diffing binary files**
En ocasiones es útil mostrar diffs de archivos binarios, como una archivo de word:
***.doc diff=word**
#tras esto hay que definir el filtro word para que git convierta archivos word a texto:
**git config diff.word.textconv strings**

Es posible hacer lo mismo para imágenes jpeg, es necesario instalar **exiftool** para extraer los metadatos y luego hacer:

```bash
$ echo ‘*.jpeg diff=exif’ » .gitattributes
$ git config diff.exif.textconv exiftool
```

**Procesar archivos antes de hacer commit y antes de hacer checkout**: Es posible crear tus propios filtros para hacer sustitución. Estos filtros se llaman **smudge** y **clean**. Los puedes configurar para distintos directorios y luego escribir un script que procesará cada archivo antes de que sea [checkeado (smudge) y commiteado (clean)](/como-usar-los-filtros-smudge-y-clean-en-git/ "Como Usar Los Filtros Smudge Y Clean en Git"). Para ello,escribe en el .gitattributes: (En caso que quieras procesar código C)

__*.c filter=indent__ Luego:

**git config &#45;&#45;global filter.indent.clean indent**

**git config &#45;&#45;global filter.indent.smudge cat**

Otro ejemplo interesante es la expansión de la palabra clave**$Date$**. Para ello hay que escribir un script en ruby que recibe un archivo, encuentra la fecha de su último commit e inserta dicha fecha en el archivo:

```ruby
#! /usr/bin/env ruby
data = STDIN.read
last_date = `git log &#45;&#45;pretty=format:"%ad" &#45;1`
puts data.gsub('$Date$', '$Date: ' + last_date.to_s + '$')
```

Puedes nombrar este script como **expand_date**. Crea un filtro en git, llamado dater y dile que use el script anterior:

**git config filter.dater.smudge expand_date**
**git config filter.dater.clean &#8216;perl &#45;pe &#8220;s/\\\$Date[^\\\$]*\\\$/\\\$Date\\\$/&#8221;&#8216;**

Para usar el filtro, simplemente escribe la palabra clave en los archivos que desees:

```bash

echo '# $Date$' > date_test.txt
echo 'date.txt filter=dater' » .gitattributes

git add date_test.txt .gitattributes
git commit -m "Testing date expansion in Git"
rm date_test.txt
git checkout date_test.txt
cat date_test.txt
$Date: Tue Apr 21 07:26:52 2009 -0700$

```


## GIT HOOKS

[Hay dos tipos](/sincronizacin-de-proyectos-en-git-con-hooks-ganchos/ "Sincronización de proyectos en git con hooks (ganchos)"), de lado cliente y servidor, se guardan en el directorio .git/hooks. Para activarlos basta con que sean ejecutables.

## CONCEPTOS

Fast forward: cuando se hace un merge y el commit de la rama a mezclar esta justo un commit adelantado, simplemente se hace apuntar la rama en la que se iba a mezclar al commit del merge.

## GITIGNORE:

```bash
*.a # no .a files
*!lib.a # but do track lib.a, even though you’re ignoring .a files above
/TODO # only ignore the root TODO file, not subdir/TODO*
build/ # ignore all files in the build/ directory*
doc/*.txt # ignore doc/notes.txt, but not doc/server/arch.txt
```


 [1]: https://elbauldelprogramador.com/como-cifrar-correos-con-gpg-con-mailvelope/ "Cómo cifrar correos con GPG usando Mailvelope"
