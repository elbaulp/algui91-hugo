---
author: alex
categories:
- git
color: '#f05033'
date: 2015-05-21 14:50:42
description: "C\xF3mo crear filtros en git, smudge y clean"
image: 2013/03/git-logo.png
lastmod: 2015-05-22
layout: post.amp
mainclass: git
tags:
- git
- smudge
- git smudge
- git clean
- git hooks
title: Como Usar Los Filtros Smudge Y Clean en Git
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/git-logo.png" title="Sincronización de proyectos en git con hooks (ganchos)" alt="Sincronización de proyectos en git con hooks (ganchos)" width="910px" height="380px" />
</figure>

En el anterior artículo, hablamos sobre [cómo sincronizar dos repositorios en git](/sincronizacin-de-proyectos-en-git-con-hooks-ganchos/), también se vio algo de _hooks_.

Hoy vamos a ver cómo usar filtros en [git](/mini-tutorial-y-chuleta-de-comandos-git/) para cambiar automáticamente la `url` de una web hecha con _jekyll_ en función de si estamos en local o en el servidor. Es decir, cuando estemos desarrollando o escribiendo un artículo, querremos ir viendo los resultados en local, para ello la `url` del fichero `_config.yml` debe estar vacía, cuando esté en el servidor deberá ser el nombre del dominio.

<!--more--><!--ad-->

## Creando el script para smudge

Bastará con crear un _script_ que contenga:

```ruby

ruby -e '$stdout.puts $stdin.read.gsub(/url: http:\/\/elbauldelprogramador\.com/, "url: ")'

```

Lo llamaremos `siteurl.smudge`, y le daremos permisos de ejecución.

## Creando el script para clean

Similar al anterior:

```ruby

ruby -e '$stdout.puts $stdin.read.gsub(/url: /, "url: http:\/\/elbauldelprogramador\.com")'

```

## Añadir los scripts a los filtros

Solo resta añadir los filtros a la configuración de git:

```bash

$ git config filter.siteurl.smudge siteurl.smudge
$ git config filter.siteurl.clean siteurl.clean

```

**Nota:** Los _scripts_ tienen que estar en el _PATH_ del sistema, y tener permisos de ejecucion.
{: .notice}

## El Gitattributes

Gracias al comentario de Julián, me dí cuenta de que faltaba una última cosa por especificar. A qué ficheros se aplicarán los filtros. Para ello, añadimos lo siguiente al fichero `.gitattributes`:

```bash

_config.yml filter=siteurl

```

Gracias Julián.

## Conclusión

Ejecutados todos los pasos, ahora tendremos la url en local cuando estemos desarrollando, y se sustituirá automáticamente por el dominio cuando se publique en _github_.

### Referencias

* [github.com/gilesbowkett](https://github.com/gilesbowkett/git-smudge-and-clean "Git smudge and Clean")
* [Git scm](http://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes "Git SCM")
