---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-07T12:08:25+01:00
image: optimizando-el-tiempo-de-carga-del-blog.png
url: /optimizando-el-tiempo-de-carga-del-blog/
title: Optimizando el tiempo de carga del blog
---

# Introducción

Como ya sabréis, a partir de unos comentarios en [esta entrada][1], estoy haciendo algunos cambios para [optimizar el sítio][2]

Pues bien, tengo buenas noticias, he conseguido reducir el tiempo de carga a __200ms__, estos valores son para la carga de la página principal del blog. Para un post cualquiera, en este caso, elegí el [la chuleta de comandos para emacs](https://elbauldelprogramador.com/chuleta-atajos-teclado-emacs/ "Chuleta de comandos para emacs") y cargó en __198ms__.

Para hacer estas pruebas he usado [tools.pingdom.com][3], que además de hacer el test, permite guardarlo.

<!--more--><!--ad-->

Os dejo las imágenes del resultado:

# Tiempo de carga de la página principal:

<figure>
    <img sizes="(min-width: 628px) 628px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/optimizando-el-tiempo-de-carga-del-blog.png" alt="Optimizando el tiempo de carga del blog" title="Optimizando el tiempo de carga del blog" width="628" height="262"></img>
    <figcaption><a href="https://tools.pingdom.com/#!/cl3wzb/https://elbauldelprogramador.com/">Enlace al informe de pingdom</a></figcaption>
</figure>

# Tiempo de carga de un post:

<figure>
    <img sizes="(min-width: 631px) 631px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/optimizando-el-tiempo-de-carga-del-blog2.png" alt="Optimizando el tiempo de carga del blog" title="Optimizando el tiempo de carga del blog" width="631" height="262"></img>
    <figcaption><a href="https://tools.pingdom.com/#!/c6QWJL/https://elbauldelprogramador.com/chuleta-atajos-teclado-emacs/">Enlace al informe de pingdom</a></figcaption>
</figure>

Espero que vuestra experiencia con el blog sea ahora más fluida.

 [1]: https://elbauldelprogramador.com/video-demostracion-del-proyecto-wifibar/
 [2]: https://elbauldelprogramador.com/pequeno-redisenp-en-el-blog/
 [3]: http://tools.pingdom.com/
