---
author: alex
categories:
- how to
- php
color: '#E64A19'
date: '2016-01-01'
format: aside
if_slider_image:
- null
- null

mainclass: dev
url: /como-crear-shortcodes-en-wordpress-2/
tags:
- atajos wordpress
- php
- shortcodes
- wordpress shortcodes
title: "C\xF3mo crear  simples shortcodes en WordPress"
---

Es bastante simple:

Buscamos el archivo ***function.php*** de nuestro tema instalado y pegamos el siguiente código php.

```php
< ?php
// Short code
function Nombre_de_nuestro_shortcode( $atts, $content = null ) {
   return 'Código de nuestro shortcode';
}
add_shortcode('nombre_de_nuestro_shortcode', 'Nombre_de_nuestro_shortcode');
?>

```

A partir de ahora, podemos agregar todo el código que hemos escrito dentro de la función en las entradas que queramos escribiendo el siguiente shortcode:

```bash
[nombre_de_nuestro_shortcode]
```

Así de sencillo es crear shortcodes en WordPress.

Fuente: <a href="http://www.wpyag.com/wordpress-tips-and-tricks/how-to-create-wordpress-shortcode-for-adsense/" target="_blank"><em>wpyag</em></a>
