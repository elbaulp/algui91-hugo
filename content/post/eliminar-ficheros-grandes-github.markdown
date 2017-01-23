---
author: alex
categories:
- git
category: git
color: '#f05033'
date: 2016-11-12 08:12:16
description: "C\xF3mo eliminar por completo un fichero demasiado grande para GitHub"
image: 2013/03/git-logo.png
introduction: "C\xF3mo eliminar por completo un fichero demasiado grande para GitHub"
layout: post.amp
mainclass: git
url: /eliminar-ficheros-grandes-github/
tags:
- git
- github
title: "C\xF3mo Eliminar Ficheros Demasiado Grandes Para GitHub"
---

Trabajando en un repositorio [git](https://elbauldelprogramador.com/git/ "Artículos sobre Git"), cometí el error de hacer un [commit](https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos") de un fichero demasiado grande (~240mb). Github tiene un tamaño máximo de 100mb, por lo que no me dejaba subir los cambios a Github. Tras borrar el fichero, seguía con el problema, ya que el fichero seguía en el historial del repositorio. Tras buscar un rato, encontré la solución, veamos:



## 1. Eliminar el fichero del historial de git

Para ello basta ejecutar el siguiente comando:

```bash
$ git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch <file/dir>' HEAD
```

<!--more--><!--ad-->

Y reemplazar `<file/dir>` con la ruta de nuestro fichero.

## 2. Eliminar por completo el rastro del fichero

El comando anterior crea una copia de seguridad en caso de que hayamos cometido un error, si ejecutamos

```bash
$ git lola --name-status
```

Veremos un commit parecido a este (`* SHA1 (refs/original/refs/heads/master) mensaje del commit`)

En este commit aún está el fichero problemático, para borrarlo definitivamente:

```bash
$ git update-ref -d refs/original/refs/heads/master
$ git reflog expire --expire=now --all
$ git gc --prune=now
```

## 3. Enviar los cambios

Una vez hecho esto, solo resta enviar los cambios a Github:

```bash
$ git push origin master
```

Y habremos solucionado el problema.

## Fuentes

- [How to remove/delete a large file from commit history in Git repository?](http://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository "How to remove/delete a large file from commit history in Git repository?")
- [Can't push to GitHub because of large file which I already deleted](http://stackoverflow.com/questions/19573031/cant-push-to-github-because-of-large-file-which-i-already-deleted "Can't push to GitHub because of large file which I already deleted")
