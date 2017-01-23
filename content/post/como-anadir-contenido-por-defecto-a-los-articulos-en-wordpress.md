---
author: alex
categories:
- how to
- php
color: '#E64A19'
date: '2016-01-01'
layout: post.amp
mainclass: dev
url: /como-anadir-contenido-por-defecto-a-los-articulos-en-wordpress/
tags:
- Articulos wordpress
- contenido por defecto
- contenido por defecto en post wordpress
title: "C\xF3mo a\xF1adir contenido por defecto a los art\xEDculos en WordPress"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/05/Screenshot-05302012-111511-AM1.png" alt="Wordpress" width="123px" height="116px" />
Si escribes en un blog, seguramente en cada artículo repites algunos textos, como añadir shortcodes que usas habitualmente, pedir a los lectores que se suscriban al [feed del blog][2], que te sigan en las redes sociales etcétera. En esos casos es útil que para cada nuevo artículo creado, se inserte un texto por defecto.

Es bastante sencillo lograr esta funcionalidad, en el archivo *functions.php* de tu tema añade:

```php
add_filter( 'default_content', 'my_default_content' );
function my_default_content( $content ) {
   $content = "AQUI TU CONTENIDO POR DEFECTO";
 return $content;
}

```

Así de simple, ahora cada vez que crees un nuevo artículo, tendrá un contenido por defecto asignado.

#### Fuente

*How to Add Default Content in Your WordPress Post Editor* »» <a href="http://www.wpbeginner.com/wp-tutorials/how-to-add-default-content-in-your-wordpress-post-editor/" target="_blank">wpbeginner</a>



 [2]: https://elbauldelprogramador.com/rssfeed/
