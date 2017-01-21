---
author: alex
categories:
- opensource
- php
color: '#E64A19'
description: "A d\xEDa de hoy, el famoso plugin para wordpress jetpack no soporta
  colocar de una forma f\xE1cil los botones sociales al principio del art\xEDculo.
  As\xED que buscando un poco por la red encontr\xE9 una forma de hacerlo en el foro
  de WordPress que menciono en las referencias y que veremos a continuaci\xF3n."
image: 2013/06/jetpack-300x222.png
layout: post.amp
mainclass: dev
permalink: /colocar-los-botones-sociales-de-jetpack-al-principio-del-articulo-en-wordpress/
tags:
- botones sociales al principio
- botones sociales jetpack
- botones sociales para wordpress
- botones sociales wordpress
title: "Colocar los botones sociales de jetpack al principio del art\xEDculo en WordPress"
---

A día de hoy, el famoso plugin para wordpress ***jetpack*** no soporta colocar de una forma fácil los botones sociales al principio del artículo. Así que buscando un poco por la red encontré una forma de hacerlo en el foro de WordPress que menciono en las referencias y que veremos a continuación.

<!--more--><!--ad-->

### Colocar los botones sociales al principio de los artículos

El primer paso es editar el archivo ***modules/sharedaddy/sharing-service.php*** del plugin y eliminar o comentar las últimas líneas, que deberían ser:

```php
add_filter( 'the_content', 'sharing_display', 19 );
add_filter( 'the_excerpt', 'sharing_display', 19 );

```

Con esto evitamos que el plugin muestre los botones en el contenido del artículo y en la página principal.

Ahora depende de nosotros colocar los botones en el lugar que deseemos, llamando a la función

```php
sharing_display()

```

En el caso de quererlos al principio del artículo, hay que buscar el fichero que se encargue de generar el contenido del artículo en nuestra plantilla. Esto varia según el tema que estemos usando, pero normalmente el nombre del archivo suele ser descriptivo. En mi caso el fichero se llama ***content-single.php***. Para colocar los botones sociales al lado del botón bitácoras por ejemplo, el código es el siguiente:

```php
<?php agregador_bitacoras_com('mini');  echo sharing_display(); ??>

```

Hay que jugar con el contenido del archivo para colocarlo en el lugar deseado.

### Mostrar los botones sociales al final del artículo en la página principal

En esta ocasión debemos buscar el archivo que se encarge de iterar sobre todos los artículos, ya que es aquí donde se genera la página principal. Como antes, por lo general suele existir un archivo llamado ***loop.php***, pero este no era mi caso. Sea cual sea el nombre del archivo, en el interior hemos de encontrar el código encargado de generar el contenido del artículo para la página principal (Que suele estar resumido). Yo he decidido colocar los botones sociales debajo del enlace **Seguir leyendo**:

```php
the_content( __( 'Seguir leyendo <span class="meta-nav">&rarr;</span>');
echo sharing_display();

```

Si fuera necesario usamos estilos CSS para colocar los botones donde deseemos y listo.

#### Referencias

*Foro WordPress* »» <a href="http://wordpress.org/support/topic/plugin-sharedaddy-adding-this-manually?replies=26#post-2293386" target="_blank">Visitar sitio</a>
