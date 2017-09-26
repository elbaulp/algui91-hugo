---
author: alex
categories:
- how to
- linux
mainclass: linux
date: '2016-01-01'
lastmod: 2017-09-26T17:01:48+01:00
url: /como-descargar-archivos-de-una-web-por-extension-con-wget/
tags:
- aplicaciones
- internet
title: "Cómo descargar archivos de una web por extensión con wget"
---

Seguramente alguna vez hayas encontrado alguna web con montones de ficheros que te interesa descargarte, pero resulta un tanto arduo descargar los ficheros uno a uno. Si eres usuario Linux seguramente conozcas el comando *wget*. Este comando permite descargar todo el contenido de una web por extensión, de modo que si queremos descargar todos los ficheros con extensión *tar.gz* basta con ejecutar el siguiente comando:

```bash
wget -r -A.tar.gz <url>
```

Donde:

* **-A ó -accept** es una lista separada por comas de los sufijos o patrones de los ficheros que queremos descargar.
* **-r ó -recursive** actúa recursívamente sobre la web indicada.

Este comando no siempre funciona, ya que algunos servidores pueden haber bloqueado el acceso a *wget*.
