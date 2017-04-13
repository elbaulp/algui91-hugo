---
author: alex
categories:
- php
date: '2016-01-01'
lastmod: 2017-03-18T12:21:11+01:00
description: "La semana pasada, en el Curso de Programación PHP guay, desarrollamos  una agenda PHP basada en archivos CSV. El ejercicio era tan sencillo que no utilizamos  ningún framework de desarrollo de aplicaciones como por ejemplo Symfony, Laravel  o Yii, pero sí que aplicamos algunas ideas de análisis para afrontar nuestro  desarrollo con garantías de éxito."
image: https://img.youtube.com/vi/eYoDqz29qSA/0.jpg
mainclass: dev
url: /como-crear-un-front-controller-en-php/
tags:
- apache
- front controller
- nginx
- "patrones de dise\xF1o"
title: "Cómo crear un Front Controller en PHP"
---

> Éste artículo es una colaboración de [Jordi Bassagañas][1]

La semana pasada, **en el [Curso de Programación PHP guay][2], desarrollamos una agenda PHP basada en archivos CSV**. El ejercicio era tan sencillo que no utilizamos ningún [framework][3] de desarrollo de aplicaciones como por ejemplo Symfony, Laravel o Yii, pero sí que aplicamos algunas ideas de análisis para afrontar nuestro desarrollo con garantías de éxito.

<figure>
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="https://img.youtube.com/vi/eYoDqz29qSA/0.jpg"
            alt="Como crear un frontcontroller PHP"
            title="Como crear un frontcontroller PHP"
            sizes="(min-width: 480px) 480px, 100vw"
            width="480"
            height="360">
          </amp-img>
</figure>

<!--more--><!--ad-->

Seguro que a algunos os habrá gustado esta decisión porque pensáis que **a veces es mejor no usar ningún framework**, sobre todo cuando la aplicación es muy sencilla (en los años recientes este ha venido siendo un argumento muy habitual), aunque con la llegada de los micro frameworks como [Slim][6] más de uno comenzará a plantearse esta cuestión, ¿verdad?

En todo caso, nosotros levantamos nuestra app desde cero con estas ideas:

  1. Definimos la estructura de carpetas **pensando en CRUD**, de acuerdo a los objetos que tenemos que gestionar, y a las operaciones que se llevan a cabo sobre dichos objetos.
  2. **Separamos la lógica** PHP de la lógica de presentación (HTML, CSS y JS).
  3. Implementamos el patrón de diseño **Singleton** en la clase `People`.

Por cierto, te recuerdo que el código de `AgendaPHPGuay` está disponible [en este repositorio de GitHub][7].

Finalmente **propusimos a los alumnos que mejoraran la seguridad de `AgendaPHPGuay` implementando el patrón de diseño de software [Front Controller][8]**. Y los que teníais un nivel de programación intermedio comentabais que esta propuesta empezaba a complicarse bastante. Pues bien amig@s, que no cunda el pánico, hoy voy a explicar qué pasos hay que seguir exactamente para poner un Front Controller en la app.

# ¿Qué es Front Controller?

Front Controller es un patrón de diseño de software muy utilizado en aplicaciones web que consiste en **definir un único punto de acceso para todas las peticiones HTTP**.

A diferencia de las aplicaciones web clásicas, por así decir, donde el usuario podía ejecutar directamente cualquier script referenciándolo directamente en la barra de direcciones de su navegador, **con Front Controller solo se accede a un punto central único: el famoso archivo index.php**.

El resto de archivos permanece inaccesible a los usuarios, a excepción de los assets, por supuesto, es decir, las imágenes, los archivos CSS y los archivos JavaScript.

Front Controller aporta por tanto una capa de seguridad, y mejora también el mantenimiento de la aplicación porque permite definir en un solo punto toda aquella lógica que de otro modo estaría esparcida en varios archivos diferentes. Esta es la lógica de inicialización o arranque de la app (bootstrap logic).

# ¿Cómo se implementa Front Controller?

Implementar Front Controller es sencillo. Por un lado, primero **tenemos que crear una carpeta llamada `public` en la carpeta raíz de nuestra aplicación**. Aquí ponemos los archivos que pueden ver los usuarios de Internet, por así decirlo. O dicho de otra forma, los archivos que están en `public` son los únicos accesibles por los usuarios desde su navegador web. Estos archivos son los assets y el mismo `index.php`. A modo de ejemplo **puedes echar un vistazo a [esta estructura de directorios][9] recomendada por Slim**.

Luego, por otro lado, tienes que asegurarte que **tu servidor web canaliza todas las peticiones hacia tu archivo `index.php`**.

En Apache:

```bash
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]

```

En [nginx][10]:

```bash
location / {
   try_files   $uri $uri/ /index.php;
}

```

¡Y esto es todo por hoy amig@s! Espero que esta entrada os haya gustado y que entendáis bien las mejoras que aporta el uso de Front Controller (seguridad y escalabilidad). Ahora solo falta adaptar el código de `AgendaPHPGuay` para que funcione con esta nueva característica, pero como nosotr@s aplicamos ideas de análisis y diseño de apps desde el principio, ya veréis que será muy sencillo.



 [1]: http://programarivm.com
 [2]: http://programarivm.com/2014/10/felicidades-ya-terminamos-la-programacion-de-la-agenda-csv-con-php/ "Curso de Programación PHP guay"
 [3]: https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/ "Los 11 Mejores Frameworks gratuitos para Aplicaciones Web"
 [4]: https://img.youtube.com/vi/eYoDqz29qSA/0.jpg
 [5]: http://www.youtube.com/watch?v=eYoDqz29qSA "Imágenes enlazadas"
 [6]: http://www.slimframework.com/ "Slim Framework"
 [7]: https://github.com/programarivm/phpguay/tree/master/agenda "AgendaPHPGuay disponible en GitHub"
 [8]: http://en.wikipedia.org/wiki/Front_Controller_pattern "Front Controller"
 [9]: http://www.slimframework.com/news/how-to-organize-a-large-slim-framework-application "Estructura de directorios de una app MVC"
 [10]: https://elbauldelprogramador.com/instalacion-optimizacion-servidor-web-nginx-i/ "Instalación y optimización de un servidor web con Nginx (I)"
