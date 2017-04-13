---
author: alex
categories:
- how to
- php
date: '2016-01-01'
lastmod: 2017-03-17T18:05:21+01:00
mainclass: dev
url: /como-crear-shortcodes-en-wordpress/
tags:
- shortcodes
- wordpress shortcodes
- wordpress
title: "Cómo crear shortcodes en WordPress que soporten parámetros"
---

Ya se vió cómo añadir <a href="/como-crear-shortcodes-en-wordpress-2/" target="_blank">shortcodes simples</a>, esta vez se explicará con un poco más de profundidad.

Primero, un shortcode no es más que un conjunto de funciones que crean un código macro para usar dentro del contenido de un artículo. Es necesario añadir dicho shortcode al archivo&nbsp;**functions.php .&nbsp;** Como primer ejemplo sencillo, se creará un shortcode llamado *[foo]* que añadirá al artículo el texto&nbsp;**&#8220;Esto es una prueba&#8221;.**

# functions.php

Este archivo está en el directorio del tema. Actua como un plugin, y, si existe en el directorio del tema, se carga automáticamente durante la inicialización de WordPress. Los pasos a seguir para crear el shortcode son los siguientes:

## Crea la función en wordpress

Abre el fichero con tu editor favorito y añade lo siguiente:
<!--more--><!--ad-->

```php
//[foo]
function foo_demo( $atts ){
 return "Esto es una prueba.";
}
add_shortcode( 'foo', 'foo_demo' );
```

Guarda el fichero y ciérralo.

## Pruébalo

Edita o crea un artículo y añade el shortcode:

```bash
[foo]
```

Guárdalo y haz clic en publicar o vista previa.

# Cómo pasar parámetros o atributos a un shortcode

La API del shortcode facilita mucho la tarea para poder añadirle parámetros como estos:

```bash
[music genero="rap" autor="Nach"]
[music genero="Rock" autor="Linkin Park"]
```

Añade lo siguiente a tu archivo&nbsp;**functions.php :&nbsp;**

```php
// shortcode [music]
function show_music( $atts ){
   $music_details="";
   // get attibutes and set defaults
        extract(shortcode_atts(array(
                'genero' => 'No especificado',
                'autor' => 'No especificado',
                'date' => 0
       ), $atts));
    // Display info
    $music_details = '<div class="info"><ul>';
    $music_details .= '<li>Genero: ' .$genero. '</li>';
    $music_details .= '<li>Autor: ' .$autor. '</li>';
    $music_details .= '<li>Fecha: ' .$date. '</li>';
    $music_details .= '</ul></div>';

    return $music_details;
}
//add our shortcode music
add_shortcode('music', 'show_music');
add_action( 'init', 'register_shortcodes');
```

Listo, ya puedes usar este shortcode.

# Referencias

- *cyberciti* »» <a href="http://www.cyberciti.biz/faq/wordpress-add-a-shortcode-to-theme-template/" target="_blank">Visitar sitio</a>
