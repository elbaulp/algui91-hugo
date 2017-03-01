---
author: alex
categories:
- git
date: 2015-12-01 10:56:26
lastmod: 2017-02-28T12:37:22+01:00
description: "Todo aquel que use git sabr\xE1 que en ocasiones es un poco tedioso
  escribir los comandos a ejecutar. Para ello existen los alias, que nos permiten
  crearnos atajos a la hora de ejecutar un comando. En este art\xEDculo se recopilar\xE1n
  unos cuantos alias \xFAtiles para el d\xEDa a d\xEDa. Os animo a que coment\xE9is
  vuestros preferidos para ir aumentando la lista!. Comencemos."
image: 2013/03/git-logo.png
mainclass: git
tags:
- git
- github
- alias git
- configurar git
- configuraciones git
- listas
title: "21 alias \xFAtiles para git"
---

Todo aquel que use [git](/mini-tutorial-y-chuleta-de-comandos-git/ "Tutorial de Git") sabrá que en ocasiones es un poco tedioso escribir los comandos a ejecutar. Para ello existen los _alias_, que nos permiten crearnos atajos a la hora de ejecutar un comando. En este artículo se recopilarán unos cuantos _alias_ útiles para el día a día. Os animo a que comentéis vuestros preferidos para ir aumentando la lista!. Comencemos.

<!--more--><!--ad-->

# git ec

Como no, el primer alias tenía que ser uno que nos permita editar la configuración de git rápidamente:

```bash

git config --global alias.ec "config --global -e"

```

A partir de ahora, podremos abrir la configuración de git con nuestro editor por defecto con `git ec`.

El resto del artículo asumirá que se tiene la configuración abierta con un editor, los aliases se escribirán directamente en la sección `[alias]` de dicho fichero.

# git co, br, cm, st

Estos _aliases_ pretenden más que facilitar la escritura de `checkout`, `branch`, `commit -am` y `status`. Básicamente los comandos que más uso.

```bash

co = checkout
br = branch
cm = commit -am
st = status

```

Veamos ahora una serie de aliases que he extraido de <a href="http://haacked.com/archive/2014/07/28/github-flow-aliases/" target="_blank" title="github Flow">haacked</a>:

# Actualizar el directorio de trabajo

Para simplificar estos dos comandos

```bash

git pull --rebase --prune
git submodule update --init --recursive

```

en los que el primero obtiene los cambios desde el servidor, si se tienen commits locales, se ponen al principio de los descargados (`rebase`), y con `prune` se eliminan ramas que ya no existan en el servidor. El segundo simplemente actualiza recursivamente submódulos. El  _alias_ quedará:

```bash

up = !git pull --rebase --prune $@ && git submodule update --init --recursive

```

Este _alias_ es algo distinto, la exclamación indica que se va a ejecutar un comando en la _shell_, es decir, podemos ejecutar cualquier comando, no solo de git. En este caso, se están ejecutando dos comandos git.

# git save, git wip, git undo, git amend

Estos dos _alias_ están destinados a cuando simplemente queremos guardar nuestros cambios, ya sea porque tenemos que irnos a hacer otras cosas, o simplemente no hemos acabado el trabajo y aún no tenemos un nombre para el commit adecuado. Con ellos, se guardan los cambios con un mensaje de commit `SAVEPOINT` o `WIP`, en función del alias que os guste más:

```bash

save = !git add -A && git commit -m 'SAVEPOINT'
wip = commit -am "WIP"

```

Una vez volvamos a trabajar, simplemente ejecutamos el _alias_ `undo`, que elimina el último commit, pero deja intactos los cambios:

```bash

undo = reset HEAD~1 --mixed

```

O si simplemente queremos modificar el mensaje del commit, usamos el _alias_ `amend`:

```bash

amend = commit -a --amend

```

# Resetear el directorio de trabajo adecuadamente, git wipe

Cuantas veces hemos comenzado a trabajar o intentar añadir algo al código y al final lo único que hicimos fue ensuciar todo el directorio, montones de líneas de código sin ordenar etc. Lo mejor en estos casos es descartar todo y volver a empezar. Para ello es posible usar `git reset HEAD --hard`, pero esto borrará todo, sin que quede constancia de lo que hicimos. Para descartar el código, pero que quede constancia de lo que hicimios, por si alguna vez nos hace falta, crearemos el _alias_ _wipe_:

```bash

wipe = !git add -A && git commit -qm 'WIPE SAVEPOINT' && git reset HEAD~1 --hard

```

Hace un commit de todo lo que hay en el directorio de trabajo para luego hacer un _hard reset_ y eliminar dicho commit. A pesar de ello, el commit seguirá ahí, en la historia del repositorio, aunque inalcanzable. Estos commits son un poco complejos de recuperar, pero al menos seguimos teniendo aquel trabajo del que no quedamos del todo convencidos. Quizá algún día recuerdes que necesitabas una línea de código que escribiste. Para recuperarlo hay que ejecutar `git reflog` y buscar el SHA del commit que tenga como mensaje “WIPE SAVEPOINT”.

# Alias para logs

Veamos ahora una serie de _alias_ para mostrar los logs de los commits de distintos modos.

# Mostrar commits de forma compacta y colores, git ls

<figure>
<a href="/img/gitls.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/gitls.png" title="{{ page.title }}" alt="{{ page.title }}" width="666px" height="504px" /></a>
</figure>

El _alias_ es el siguiente:

```bash

ls = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate

```

# Listar commits y ficheros modificados, git ll

<figure>
<a href="/img/gitll.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/gitll.png" title="{{ page.title }}" alt="{{ page.title }}" width="603px" height="498px" /></a>
</figure>

El _alias_ es el siguiente:

```bash

ll = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --numstat

```

# Mostar commits de forma compacta y con fechas, git lds

<figure>
<a href="/img/gitlds.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/gitlds.png" title="{{ page.title }}" alt="{{ page.title }}" width="766px" height="502px" /></a>
</figure>

```bash

lds = log --pretty=format:"%C(yellow)%h\\ %ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=short

```

Si lo preferimos con fechas relativas, usaremos el _alias_ `git ld`:

<figure>
<a href="/img/gitld.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/gitld.png" title="{{ page.title }}" alt="{{ page.title }}" width="785px" height="498px" /></a>
</figure>

```bash

ld = log --pretty=format:"%C(yellow)%h\\ %ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=relative

```

# Buscar ficheros y contenido dentro de ficheros (grep)

Para buscar ficheros con conteniendo el nombre indicado:

```bash

f = "!git ls-files | grep -i"

```

Ejemplo:

```bash

$ git f one

P3/oneway/Utils.py
P3/oneway/__init__.py
P3/oneway/ej1.py
P3/oneway/ej2.py
P3/oneway/ej3.py
P3/oneway/ej4.py
P3/oneway/ej5.py
P3/oneway/ej6.py
P3/oneway/ej7.py

```

Para buscar contenido dentro de todo el repositorio:

```bash

grep = grep -Ii
gr = grep -Ii

```

Ejemplo:

```bash

$ git grep Rabin

P1/modularArith/ej4.py:def MillerRabin(p):
P1/modularArith/ej4.py:    print MillerRabin(90221078753392184154149622269679731705920869572364323146777389106744249167893287091491005751893264013854756094230384816436985035887367570198390830836626929620930395458607390051335962764852769424941031051670131521265969408350800112779692655340042253991970492761524977413231930703094065023050574077317620529581736775256036443993928340221545607375549860405933153255776836414051570996984167934585339322850189347872718439350738428272565094611168867981011370318335242028953808721309056435214502065537377043)

```

Para buscar desde el directorio raíz:

```bash

gra = "!f() { A=$(pwd) && TOPLEVEL=$(git rev-parse --show-toplevel) && cd $TOPLEVEL && git grep --full-name -In $1 | xargs -I{} echo $TOPLEVEL/{} && cd $A; }; f"

```

# Listar todos los aliases, git la

Ahora que ya llevamos unos cuantos _aliases_, quizá sean dificil de recordar hasta que nos acostumbremos, por ello, podemos crear un _alias_ que liste todos los nuestros _aliases_ :-):

```bash

la = "!git config -l | grep alias | cut -c 7-"

```

# Listar la última etiqueta, git lt

```bash

lasttag = describe --tags --abbrev=0
lt = describe --tags --abbrev=0

```

# Alias para hacer merges, git ours, git theirs

```bash

ours = "!f() { git co --ours $@ && git add $@; }; f"
theirs = "!f() { git co --theirs $@ && git add $@; }; f"

```

Eso es todo, comentad vuestras _alias_ para completar este artículo!

# Recopilación

Aquí se muestran todos los _alias_ vistos:

```bash

[alias]
  ec = config --global -e
  co = checkout
  br = branch
  cm = commit -am
  st = status
  up = !git pull --rebase --prune $@ && git submodule update --init --recursive
  save = !git add -A && git commit -m 'SAVEPOINT'
  wip = commit -am "WIP"
  undo = reset HEAD~1 --mixed
  amend = commit -a --amend
  wipe = !git add -A && git commit -qm 'WIPE SAVEPOINT' && git reset HEAD~1 --hard
  ls = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate
  ll = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --numstat
  lds = log --pretty=format:"%C(yellow)%h\\ %ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=short
  ld = log --pretty=format:"%C(yellow)%h\\ %ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=relative
  f = "!git ls-files | grep -i"
  grep = grep -Ii
  gr = grep -Ii
  gra = "!f() { A=$(pwd) && TOPLEVEL=$(git rev-parse --show-toplevel) && cd $TOPLEVEL && git grep --full-name -In $1 | xargs -I{}   echo $TOPLEVEL/{} && cd $A; }; f"
  la = "!git config -l | grep alias | cut -c 7-"
  lasttag = describe --tags --abbrev=0
  lt = describe --tags --abbrev=0
  ours = "!f() { git co --ours $@ && git add $@; }; f"
  theirs = "!f() { git co --theirs $@ && git add $@; }; f"

```

# Referencias

- Github Flow Aliases | [haacked.com](http://haacked.com/archive/2014/07/28/github-flow-aliases/ "Github Flow Aliases")
- Must Have Git Aliases | [durdn.com](http://durdn.com/blog/2012/11/22/must-have-git-aliases-advanced-examples/ "Must Have Git Aliases: Advanced Examples")
