---
author: alex
categories:
- php
color: '#E64A19'
date: '2016-01-01'
description: "Esto es lo que tenemos que hacer. Tenemos una imagen sin adjuntar en
  nuestra biblioteca multimedia de WordPress. Tambi\xE9n hay una p\xE1gina \u201C2014
  Galery\u201D, que muestra las im\xE1genes adjuntas de la p\xE1gina dentro de la
  galer\xEDa de WordPress. Tenemos que encontrar la fecha de carga de la imagen sin
  adjuntar. Si el a\xF1o que se subi\xF3 la imagen fu\xE9 2014, tenemos que adjuntar
  la imagen a nuestra p\xE1gina."
image: 2013/07/wordpress.png
lastmod: 2015-12-24
layout: post.amp
mainclass: dev
url: /incluir-imagenes-en-una-entrada-de-wordpress-usando-php/
tags:
- "a\xF1adir imagenes php"
- "a\xF1adir imagenes wordpress"
- imagenes en entradas wordpress
title: "Incluir im\xE1genes en una entrada de WordPress usando PHP"
---

> Éste artículo es una colaboración de <a href="http://reinspirit.com/blog/" target="_blank">Pedro Mendez</a> en el que se verá cómo insertar imágenes en una entrada de WordPress. Desarrollador y diseñador de sitios web en Sevilla

<figure>
<a href="/img/2013/07/wordpress.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/wordpress.png" title="{{ page.title }}" alt="{{ page.title }}" width="231px" height="228px" /></a>
</figure>

Esto es lo que tenemos que hacer. Tenemos una imagen sin adjuntar en nuestra biblioteca multimedia de WordPress. También hay una página &#8220;2014 Galery&#8221;, que muestra las imágenes adjuntas de la página dentro de la galería de WordPress. Tenemos que encontrar la fecha de carga de la imagen sin adjuntar. Si el año que se subió la imagen fué 2014, tenemos que adjuntar la imagen a nuestra página.

<!--more--><!--ad-->

Antes de pasar al fragmento de código, tenemos que asumir algunas cosas. El `ID` de la entrada de imagen sin adjuntar es `$att_id`. El `ID` de la entrada de nuestra página es `$page_id`. He mencionado `ID` de la entrada, tanto para la imagen y la página porque WordPress almacena las entradas, páginas y archivos en una misma tabla `wp_posts` en la [base de datos][1]. Así que todas las entradas tendrán un `ID`.

## Obtener imágenes subidas por año

Tenemos que encontrar el año en que fue subida la imagen. El código que vamos a escribir está fuera del **WordPress loop**. Por eso utilizamos la función `get_the_time()` para encontrar el año de la carga.

```php
$year = get_the_time('Y', $att_id);

```

## Incluir imágenes a la página

Ahora nuestro trabajo es comprobar si `$year` es 2014. En caso afirmativo, añadimos la imagen. En WordPress como hemos mencionado, los detalles de cada archivo se almacenan en la tabla `wp_posts` que contiene una columna llamada `post_parent`. Esta columna es el punto de conexión para la imagen a una página o entrada. Para una imagen sin adjuntar, el valor `post_parent` será 0.

```php
if(2014 == $year){
    wp_update_post( array(
        'ID' => $att_id,
        'post_parent' => $page_id
    ));
}

```

El código anterior se explica por sí mismo. `wp_update_post` es una función de WordPress que actualiza los detalles de la publicación. Aquí estamos actualizando la columna del `post_parent` a `$page_id`. Esto concede la imagen a la página.



[1]: https://elbauldelprogramador.com/bases-de-datos/ "Bases de Datos"
