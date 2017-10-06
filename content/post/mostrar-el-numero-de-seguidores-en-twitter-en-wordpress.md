---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-06T11:20:28+01:00
description: "Código php para mostrar en wordpress nuestro número de seguidores en twitter"
url: /mostrar-el-numero-de-seguidores-en-twitter-en-wordpress/
title: "Mostrar el número de seguidores en Twitter en WordPress"
tags:
- php
- wordpress
---

Hoy voy a explicar cómo mostrar los seguidores de nuestra cuenta de Twitter en el blog. Antes de nada, necesitamos instalar un plugin que nos permite añadir widgets que contengan código PHP, se llama WP PHP Widget y podéis descargarlo de la página de <a href="http://wordpress.org/extend/plugins/wp-php-widget/" target="_blank">plugins de WordPress</a>. Una vez que tengamos instalado el plugin, agregamos el widget a nuestra plantilla y pegamos el siguiente código:

<!--more--><!--ad-->

```php
$url = "http://twitter.com/users/show/elbaulp";
$response = file_get_contents ( $url );
$t_profile = new SimpleXMLElement ( $response );
$count = $t_profile->followers_count;
echo $count;
```

Listo, esto imprimirá el número de seguidores que tenemos en twitter.

Este código no es mío, lo encontré navegando por internet, y le hice algunas modificaciones, concretamente creé una función que añadí al archivo `<strong>functions.php</strong>` del tema:

```php
function followers_count(){
  $url = "http://twitter.com/users/show/elbaulp";
  $response = file_get_contents ( $url );
  $t_profile = new SimpleXMLElement ( $response );
  $count = $t_profile->followers_count;
  return $count;
}
```

Y en el widget tengo lo siguiente:

```php
<p class="twittercount">
    <a href="http://twitter.com/elbaulp" title="Follow on Twitter" target="_blank">
        <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  src="twitter.png" alt="Twitter" />
    </a>
    <span>< ?php echo followers_count();?></span> Followers
</p>
```

Y el estilo es el siguiente:

```css
.twittercount {
  -moz-box-shadow: 8px 11px 11px #222;
  -webkit-box-shadow: 8px 11px 11px #222;
  box-shadow: 8px 11px 11px #222;
  width: 127px;
  font-family: Georgia, serif;
  font-style: italic;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  text-align: center;
  border: 4px solid #EEE;
  border-radius: 5px;
  background-color: "#EEE";
  margin: 5px;
  display: inline-block;
}
```

Eso es todo.
