---
author: alex
categories:
- linux
date: 2016-08-04 08:55:12
lastmod: 2017-02-20
description: 'Resolver configure: error you don''t have NSS installed or your version is too old al actualizar Firefox 48'
mainclass: linux
tags:
- gentoo
- emerge
- firefox
title: Error NSS Al Actualizar Firefox 48 en Gentoo
---

Hoy ha salido la versión 48 de Firefox para [Gentoo](/como-instalar-actualizar-elminar-paquetes-gentoo/ "Instalar y actualizar Gentoo"), pero cuando realicé la actualización obtenía el siguiente error:

```bash
configure: error: you don't have NSS installed or your version is too old
```

<!--more--><!--ad-->

Así que pregunté en los foros de [Gentoo](https://forums.gentoo.org/viewtopic-p-7951120.html#7951120 "Can't update to firefox 48") y parece que se trata de un [bug](https://bugs.gentoo.org/show_bug.cgi?id=590424) pendiente de resolver.

Para salir del paso, en el foro me comentaron que existe un _Workaround_, se trata de obligar a instalar una versión concreta de _NSS_, en concreto la 3.24. Para ello basta con ejecutar:

```bash
echo "=dev-libs/nss-3.24 ~amd64" >> /etc/portage/package.accept_keywords
emerge -u nss
emerge =www-client/firefox-48.0
```

Y con esto deberíamos tener firefox 48 listo, y con ello el [soporte para múltiples procesos](http://www.genbeta.com/navegadores/el-nuevo-firefox-48-incluye-por-fin-soporte-para-multiples-procesos "El nuevo Firefox 48 incluye por fin soporte para múltiples procesos").

Gracias a _fedeliallalinea_ por la respuesta en el foro.
