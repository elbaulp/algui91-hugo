---
author: alex
categories:
- php
color: '#0097A7'
date: '2016-09-25'
description: El error 404 debe tratarse adecuadamente en las webs para no asustar
  al usuario y provocar que salga de nuestro sitio.
layout: post.amp
mainclass: servidores
permalink: /personalizar-el-error-404-en-wordpress/
tags:
- error 404
- personalizar 404 wordpress
title: Personalizar el Error 404 en wordpress
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/08/4041.jpg" alt="" title="404" width="256px" height="197px" />
</figure>

El error 404 debe tratarse adecuadamente en las webs para no asustar al usuario y provocar que salga de nuestro sitio.

Es una buena práctica sugerir enlaces que puedan estar relacionados con lo que estaba buscando, poner un enlace a la página principal o al mapa de la web.

Con todo esto en mente busqué cómo crear **errores 404 personalizados** y modificarlos a mi gusto. La solución la encontré en la misma página del proyecto wordpress:

<!--more--><!--ad-->

```php
<p>
  You
  <?php
#some variables for the script to use
#if you have some reason to change these, do.  but wordpress can handle it
$adminemail = get_option('admin_email'); #the administrator email address, according to wordpress
$website = get_bloginfo('url'); #gets your blog's url from wordpress
$websitename = get_bloginfo('name'); #sets the blog's name, according to wordpress

  if (!isset($_SERVER['HTTP_REFERER'])) {
    #politely blames the user for all the problems they caused
        echo "tried going to "; #starts assembling an output paragraph
    $casemessage = "All is not lost!";
  } elseif (isset($_SERVER['HTTP_REFERER'])) {
    #this will help the user find what they want, and email me of a bad link
    echo "clicked a link to"; #now the message says You clicked a link to...
        #setup a message to be sent to me
   $failuremess = "A user tried to go to $website"
        .$_SERVER['REQUEST_URI']." and received a 404 (page not found) error. ";
   $failuremess .= "It wasn't their fault, so try fixing it.
        They came from ".$_SERVER['HTTP_REFERER'];
    mail($adminemail, "Bad Link To ".$_SERVER['REQUEST_URI'],
        $failuremess, "From: $websitename <noreply@$website?>"); #email you about problem
   $casemessage = "An administrator has been emailed
          about this problem, too.";#set a friendly message
    }
    echo " ".$website.$_SERVER['REQUEST_URI']; ?>
  and it doesn't exist.

  <?php echo $casemessage; ??>  You can click back
  and try again or search for what you're looking for:


  <?php include(TEMPLATEPATH . "/searchform.php"); ??>
</p>

```

Esta porción de código hay que pegarla en el archivo 404.php de la plantilla en uso. Con este código informamos al lector que la página no existe y se proporciona un formulario de búsqueda, además se envía un correo al administrador del blog informándo de este error 404. Aún podemos tratar el error de una manera más amigable y ofrecer más opciones. Por ejemplo las últimas publicaciones del blog:

```php
<h4>
  Publicaciones recientes
</h4>
<ul>
<?php
         $recent_posts = wp_get_recent_posts( array('post_status' =?> 'publish') );
           foreach( $recent_posts as $recent ){
       echo '

  <li>
<a href="' . get_permalink($recent[" id="ID">' .   $recent["post_title"].'</a>
</li> ';
           }
        ?>

</ul>

```

Incluso es posible sugerir entradas relacionadas en base a la url que devolvió el 404:

```php
<?php
$query_args = array( 's' =?> basename($_SERVER['REQUEST_URI']) );
$query = new WP_Query( $query_args );

if($query->have_posts()){
   echo "

<h4>
  Quizá buscaba...
</h4>";

   // The Loop
   echo '

<ul>
  ';
     while ( $query->have_posts() ) : $query->the_post();
        echo '

  <li>
    ';
    ?>
          <a href="&lt;?php the_permalink() ?&gt;"><?php the_permalink() ??>" title="Permanent Link to <?php the_title_attribute(); ??>"><?php the_title(); ??></a>
<?php
      echo '</li?>';
       endwhile;
       echo '</li></ul>';

       // Reset Post Data
       wp_reset_postdata();
    }
    ?>

```


    <p>
      Al juntarlo todo, la estructura del código queda así:
    </p>


    ```php



<p>
  Ha
  <?php
   #some variables for the script to use
   #if you have some reason to change these, do.  but wordpress can handle it
   $adminemail = get_option('admin_email'); #the administrator email address, according to wordpress
   $website = get_bloginfo('url'); #gets your blog's url from wordpress
   $websitename = get_bloginfo('name'); #sets the blog's name, according to wordpress

   if (!isset($_SERVER['HTTP_REFERER'])) {
      #politely blames the user for all the problems they caused
      echo "intentado ir a "; #starts assembling an output paragraph
      $casemessage = "¡No está todo perdido!";
   } elseif (isset($_SERVER['HTTP_REFERER'])) {
      #this will help the user find what they want, and email me of a bad link
      echo "pinchado en un enlace a"; #now the message says You clicked a link to...
      #setup a message to be sent to me
      $failuremess = "A user tried to go to $website"
      .$_SERVER['REQUEST_URI']." and received a 404 (page not found) error. ";
      $failuremess .= "It wasn't their fault, so try fixing it.
      They came from ".$_SERVER['HTTP_REFERER'];
      mail($adminemail, "Bad Link To ".$_SERVER['REQUEST_URI'],
      $failuremess, "From: $websitename <noreply@$website?>"); #email you about problem
        $casemessage = "El administrador ha sido informado sobre este error.";#set a friendly message
     }
     echo " ".$website.$_SERVER['REQUEST_URI']; ?>
     y no existe.

  <?php echo $casemessage; ??>  Puede volver atrás
     e intentarlo de nuevo o buscar lo que desee en el formulario:


  <?php include(TEMPLATEPATH . "/searchform.php"); ??>
</p>
<?php
   $query_args = array( 's' =?> basename($_SERVER['REQUEST_URI']) );
   $query = new WP_Query( $query_args );

   if($query->have_posts()){
      echo "

<h4>
  Quizá buscaba...
</h4>";

      // The Loop
      echo '

<ul>
  ';
        while ( $query->have_posts() ) : $query->the_post();
           echo '

  <li>
    ';
    ?>
             <a href="&lt;?php the_permalink() ?&gt;"><?php the_permalink() ??>" title="Permanent Link to <?php the_title_attribute(); ??>"><?php the_title(); ??></a>
<?php
    echo '</li?>';
          endwhile;
          echo '</li></ul>';
          // Reset Post Data
          wp_reset_postdata();
    }
    ?>


    <br />
<h4>
      Publicaciones recientes
    </h4>
<ul>
<?php
   $recent_posts = wp_get_recent_posts( array('post_status' =?> 'publish') );
         foreach( $recent_posts as $recent ){
            echo '

      <li>
<a href="' . get_permalink($recent[" id="ID">' .   $recent["post_title"].'</a>
</li> ';
         }
      ?>

    </ul>

```


    <p>
      Para ver un ejemplo haz click en el siguiente enlace: <a href="/404" target="_blank">elbauldelprogramador.org/404</a>.
    </p>
<hr />
    Fuente |
    <a href="http://codex.wordpress.org/Creating_an_Error_404_Page" target="_blank">Creating an Error 404 Page</a>