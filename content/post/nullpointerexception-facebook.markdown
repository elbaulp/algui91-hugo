---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-03-30 06:29:58
description: "Explicación de por qué muchos usuarios de internet están obteniendo
  un error nullpointerexception, en facebook entre otras aplicaciones"
image: nullpointerexception-facebook-line-numbers.jpg
lastmod: 2016-04-05

mainclass: java
modified: null
tags:
- que es NullPointerException
- Facebook NullPointerException
- excepciones java
- null
- NullPointerException java
- nullpointerexception null
- error facebook nullpointerexception null
- nullpointerexception facebook
- nullpointerexception
- nullpointerexception null facebook
- que significa nullpointerexception null
- error nullpointerexception null facebook
- que es nullpointerexception null
- error al entrar en facebook nullpointerexception
title: "Qué Esta Causando Un NullPointerException en Facebook E Internet y cómo solucionarlo"
---

<figure>
<a href="/img/nullpointerexception-facebook-line-numbers.jpg">
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/nullpointerexception-facebook-line-numbers.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="1024px" height="415px" /></a>
<span class="image-credit">Crédito de la imagen: ScienceAlert</span>
</figure>

En estos días he notado un incremento notable en las visitas a un artículo que escribí hace tiempo: [Qué es un NullPointerException y cómo solucionarlo](/que-es-un-nullpointerexception-y-como-solucionarlo/ "Qué es un NullPointerException y cómo solucionarlo"), y todas venían de búsquedas en google. No me explicaba el por qué este interés por los `NullPointerException` y su relación con Facebook hasta que leí un artículo en _Science Alert_.

<!--more--><!--ad-->

Resumiendo a grosso modo, resulta que un desarrollador ha tenido un serio conflicto con una empresa llamada _kik_ al publicar un paquete en _npm_ bajo el mismo nombre, lo cual impedía a la empresa registar sus propios paquetes usando su nombre de empresa. Tras varios correos entre la empresa y el autor (_Koçulu_) sin llegar a un acuerdo, _npm_ tuvo que intervenir y actuar en favor de la empresa, obligando por tanto a _Koçulu_ a cambiar el nombre de su paquete.

Esta decisión de _npm_ cabreó tanto a _Koçulu_ que decidió no formar parte de la comunidad _npm_ y borró todos sus paquetes del repositorio (Nada más que 273 paquetes). Lo que internet no se esperaba, es que una gran parte de aplicaciones web, como Facebook, airbnb y netflix requerían de un sencillo paquete desarrollado por _Koçulu_, de tan solo 11 líneas de código llamado _Line-Numbers_. Al borrar este paquete, todas las aplicaciones que dependían de ella comenzaron a tener errores, de ahí que se esté produciendo este _NullPointerException_.

<figure>
<a href="/img/nullpointerexception-facebook.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/nullpointerexception-facebook.png" title="{{ page.title }}" alt="{{ page.title }}" width="600px" height="226px" /></a>
<span class="image-credit">Crédito de la imagen: arstechnica</span>
</figure>

_Koçulu_ ya se ha disculpado por la situación, aunque desconocía que borrar su módulo pudiera llevar a tal catástrofe. También vale la pena mencionar que a las pocas horas de producirse el error, la comunidad _open source_ reemplazó el módulo necesario por uno nuevo. Si aún así seguís teniendo errores, deberían desaparecer al cabo de unos días.

## Cómo solucionarlo

Como bien han dicho en los comentarios, si estamos en un móvil, basta con borrar los datos de facebook en los ajustes y volver a introducir nuestras credenciales.

### Referencias

A programmer almost broke the Internet last week by deleting 11 lines of code \| [sciencealert.com](http://www.sciencealert.com/how-a-programmer-almost-broke-the-internet-by-deleting-11-lines-of-code "A programmer almost broke the Internet last week by deleting 11 lines of code")

Rage-quit: Coder unpublished 17 lines of JavaScript and “broke the Internet” \| [arstechnica.com](http://arstechnica.com/information-technology/2016/03/rage-quit-coder-unpublished-17-lines-of-javascript-and-broke-the-internet/ "Rage-quit: Coder unpublished 17 lines of JavaScript and “broke the Internet”")
