---
author: alex
categories:
- how to
color: '#F57C00'
date: '2016-01-01'
description: "Hace tiempo, cuando migramos de blogger a WordPress escribimos un art\xEDculo
  sobre c\xF3mo realizar la migraci\xF3n sin perder el posicionamiento web. Una parte
  fundamental para mantener ese posicionamiento es conseguir que los enlaces sigan
  funcionando. Para ello existe un plugin que he estado usando hasta ahora. Sin embargo
  he decicido dejar de usarlo y sustituir todos los enlaces antiguos por los nuevos
  usando expresiones regulares. En \xE9ste art\xEDculo veremos c\xF3mo aplicar este
  cambio."
image: 2014/01/Sustituir-los-enlaces-de-blogger-por-los-de-Wordpress-al-migrar-de-plataforma1.png
lastmod: 2015-12-28
layout: post.amp
mainclass: articulos
permalink: /sustituir-los-enlaces-de-blogger-por-los-de-wordpress-al-migrar-de-plataforma/
tags:
- cambiar enlaces de blogger a wordpress
- migrar blogger wordpress
- url de blogger a wordpress
title: Sustituir los enlaces de blogger por los de WordPress al migrar de plataforma
---

Hace tiempo, cuando migramos de blogger a WordPress escribimos un [artículo][1] sobre cómo realizar la migración sin perder el posicionamiento web. Una parte fundamental para mantener ese posicionamiento es conseguir que los enlaces sigan funcionando. Para ello existe un plugin que he estado usando hasta ahora. Sin embargo he decicido dejar de usarlo y sustituir todos los enlaces antiguos por los nuevos usando [expresiones regulares][2]. En éste artículo veremos cómo aplicar este cambio.

<!--more--><!--ad-->

### Descargar la base de datos

Es más sencillo descargar una copia de la base de datos para realizar las sustituciones necesarias, ya que podremos aplicar las expresiones regulares en cualquier editor de texto. Para ello, si usamos PhpMyadmin hay que entrar al panel de administración, seleccionar la base de datos a exportar, en este caso la de WordPress, pulsar el botón *Export* y dejar todo tal y como aparece en la siguiente imagen:

<figure>
<a href="/img/2014/01/Sustituir-los-enlaces-de-blogger-por-los-de-Wordpress-al-migrar-de-plataforma.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img//2014/01/Sustituir-los-enlaces-de-blogger-por-los-de-Wordpress-al-migrar-de-plataforma.png" title="{{ page.title }}" alt="{{ page.title }}" width="1046px" height="803px" /></a>
</figure>

### Generar la expresión regular necesaria

Ahora que tenemos la base de datos descargada, la descomprimimos y nos paramos a pensar qué expresión regular nos hace falta. En este caso, buscamos reemplazar URLs del tipo ***dominio.com/2011/12/nombre-artículo*** por otras del tipo ***dominio.com/nombre-articulo***. Es necesario usar antes el plugin para redireccionar los artículos de blogger a WordPress para que se creen los enlaces del tipo *dominio.com/nombre-articulo*. Con esto en mente, construimos la siguiente expresión regular:

```bash
elbauldelprogramador\.com\/\d+\/\d+\/((?:\w+-?)+)\.html

```

#### Explicación de la expresión regular

Lo que tienen las expresiones regulares es que cuando pasa un tiempo, y aunque la hayas creado tú, es probable que no tengas ni idea de por qué la hiciste y cómo se te ocurrió. Hace tiempo en la sección <a href="https://elbauldelprogramador.com/" title="Sección Viñetas Geek" target="_blank">Viñetas Geek de Domingo</a> apareció una imagen que refleja esta sensación:

<figure>
<a href="/img/2013/12/Explicado-simplemente-Expresiones-regulares-del-día-anterior.jpg"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/12/Explicado-simplemente-Expresiones-regulares-del-día-anterior.jpg" title="Explicado simplemente - Expresiones regulares del día anterior" alt="Explicado simplemente - Expresiones regulares del día anterior" width="329px" height="533px" /></a>
</figure>

Así que pasemos a explicarla:

  * **\/**: Primera barra tras el dominio.
  * **\d+**: Uno o más dígitos, para la primera parte de la url, como 2011.
  * **\/**: Segunda barra tras el año.
  * **\d+**: Uno o más dígitos, en este caso el més del artículo.
  * **\/**: La barra de antes del nombre del artículo.
  * **((?:\w+-?)+)**: Esta es la parte más complicada, necesitamos capturar el contenido que coincida con esta expresión regular, ya que utilizaremos dicho contenido para reescribir la nueva URL. Para capturar grupos se usan (), y para capturarlos pero no guardarlos se usa (?:). De modo que en esta expresión aparecen dos expresiones de captura. La razón es la explicada en este <a href="http://www.regular-expressions.info/captureall.html" title="Capture all" target="_blank">artículo</a>. Si usaramos un solo grupo, cuando usemos los caracteres capturados solo se recordará el último, en lugar de la cadena entera, es decir, si la URL es ***titulo-post*** sólo se recordará **-post**, de modo que creamos dos grupos y descartamos el segundo (El que tiene ?:) para que se haga el uso correcto del operando +. Sigamos explicando el interior del grupo.
  * **\w+**: Cualquer dígito [A-Za-z0-9_] una o más veces
  * **-?**: Seguido o no de un guión.

Esto debería bastar, con cualquier editor, en este caso con Geany, podemos buscar y reemplazar las cadenas que coincidan con esta expresión:

<figure>
<a href="/img/2014/01/Sustituir-los-enlaces-de-blogger-por-los-de-Wordpress-al-migrar-de-plataforma1.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/01/Sustituir-los-enlaces-de-blogger-por-los-de-Wordpress-al-migrar-de-plataforma1.png" title="{{ page.title }}" alt="{{ page.title }}" width="586px" height="256px" /></a>
</figure>

Lo cual sustituirá la URL antigua por lo que coincidión en la expresión *((?:\w+-?)+)*, cuyo contenido se puede referenciar con \1, donde 1 es el número del grupo, si hubiera varios, se referenciarían con \1, \2 etc. Con esto, ya podemos dejar de usar el plugin.

 [1]: https://elbauldelprogramador.com/como-migrar-de-blogger-a-wordpress-sin-perder-seo-y-tips-de-seguridad/ "Cómo migrar de Blogger a WordPress sin perder SEO y Tips de seguridad"
 [2]: https://elbauldelprogramador.com/introduccion-a-las-expresiones-regulares-en-python/ "Introducción a las expresiones regulares en python"