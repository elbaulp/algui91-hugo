---
author: alex
categories:
- php
color: '#E64A19'
date: '2016-01-01'

mainclass: dev
url: /mostrar-todos-los-post-de-una-categoria-wordpress/
tags:
- "Mostrar todos los artículos de una categoría en Wordpress"
title: "Mostrar todos los post de una categoría en WordPress"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/wordpress.png" alt="mostrar todos los post de una categoría wordpress" width="231px" height="228px" />
En otros artículos mostré cómo [crear shortcodes][1] en WordPress, hoy veremos cómo mostrar todos los post de una categoría wordpress dada como parámetro al shortcode.


<!--more--><!--ad-->

### Crear el shortcode

Editamos el archivo *functions.php* de nuestro tema y añadimos el siguiente código:

```php

function show_category_posts( $atts ){
        extract(shortcode_atts(array(
                'cat'=> ''
        ), $atts));
        query_posts('cat='.$cat.'&orderby;=date&order;=ASC&posts;_per_page=-1');
        if ( have_posts() ){
                $content = '

<ul>
  ';
                  while ( have_posts() ){
                          the_post();
                          $content .= the_title('

  <li>
<a href="'.get_permalink().'">', '</a>
</li>', true);
                  }
                  $content .= '
</ul>';
        }
        //Reset query
        wp_reset_query();
        return $content;
}
add_shortcode('mostrar_cat', 'show_category_posts');

```

### Entendiendo el código

La encargada de realizar todo el trabajo es la función *query_posts()*, es posible pasarle varios parámetros, como **orderby=date** para ordernar por fecha en orden ascendente (**order=ASC**). Para mostrar todos los artículos de la categoría es necesario el parámetro **posts\_per\_page=-1**. La lista de parámetros completa la podemos encontrar en la documentación de la clase *[WP_Query][2]*.

Lo siguiente que hace este trozo de código es iterar sobre todos los artículos y crear una lista.

Por último añadimos la función como un *[shortcode][3]* y ya está lista para usar.

Para usar el shortcode debemos conocer el **id** de la categoría a mostrar, o reemplazar el parámetro ***cat=*** por cualquiera de los siguientes:

* **<tt>cat</tt>** (*int*) - El usado por este código, requiere el ID.
* **<tt>category_name</tt>** (*string*) - Usar el slug de la categoría.
* **<tt>category__and</tt>** (*array*) - Usa el ID.
* **<tt>category__in</tt>** (*array*) - Usa el ID.
* **<tt>category__not_in</tt>** (*array*) - Usa el ID.

### Ejemplo de uso

```bash
[mostrar_cat cat="1"]

```

#### Referencias

*Documentación función query_posts* »» <a href="http://codex.wordpress.org/Function_Reference/query_posts" target="_blank">codex.wordpress.org</a>
*Parámetros de query_posts* »» <a href="http://codex.wordpress.org/Class_Reference/WP_Query#Parameters" target="_blank">codex.wordpress.org</a>



 [1]: https://elbauldelprogramador.com/como-crear-shortcodes-en-wordpress/
 [2]: http://codex.wordpress.org/Class_Reference/WP_Query#Parameters
 [3]: https://elbauldelprogramador.com/?s=shortcode
