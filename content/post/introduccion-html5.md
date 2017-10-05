---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-05T16:26:55+01:00
description: "Con este primer artículo de introducción a HTML5, presentamos  una serie de artículos a modo de curso cuyo autor, al que agradezco su interés  por colaborar en el blog, es Roberto. Si ya sabes algo puedes echar un vistazo al  artículo Ejemplos en HTML5: Almacenamiento Web, SQL y WebSocket."
image: "2013/11/Introducción-a-HTML51.png"
url: /introduccion-html5/
title: "Introducción a HTML5"
---

<figure>
    <a href="/img/2013/11/Introducción-a-HTML51.png"><amp-img sizes="(min-width: 512px) 512px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Introducción-a-HTML51.png" title="Introducción a HTML5" alt="Introducción a HTML5" width="512px" height="512px" /></a>
</figure>

Con este primer artículo de introducción a HTML5, presentamos una serie de artículos a modo de curso cuyo autor, al que agradezco su interés por colaborar en el blog, es <a href="http://www.rogamainformatica.es/" title="Roberto" target="_blank">Roberto</a>. Si ya sabes algo puedes echar un vistazo al artículo [Ejemplos en HTML5: Almacenamiento Web, SQL y WebSocket][1].

# Un poco de historia

Como bien indica su propio nombre es la 5 versión del estándar de WWW (*World Wide Web*), el <a href="http://www.w3.org/" title="World Wide Web" target="_blank">W3C</a> a estado años trabajando en este nuevo estándar despuesdespués del XHTML, el cual se puede denominar como uno de sus fracasos, al tener un lenguaje muy estricto, y no ser compatible con la mayoría de las webs publicadas en el momento del lanzamiento, esta nueva versión sí es compatible con todas las anteriores, ademas de incorporar nuevas mejoras, algunas de las novedades que mas ruido han hecho ha sido la desaparición del *case sensitive*, con lo que podemos escribir por ejemplo la etiqueta ID de un div en mayúsculas o minúsculas y que los navegadores lo reconozcan sin producir error, aun así se recomienda seguir unos estándares, como son el de escribir todos los elementos en minúsculas, y sus valores entre comillas dobles *&#8220;&#8221;*, aunque en esta versión sean validas las comillas simples &#8221;; también se recomienda cerrar todas las etiquetas, aunque no sea obligatorio como en XHTML; así mismo también incluye nuevas funciones como la reproducción de vídeo y sonido, y algunas etiquetas nuevas, para ello hicieron un estudio sobre el nombrado de etiquetas de las webs mas famosas, y casi todas tenían una barra lateral, llamada **aside**,un encabezado llamado **header**, y un pie llamado **footer**, así como las barras de navegación **nav**; y un largo etc.

<!--more--><!--ad-->

# ¿Por dónde empezar?

Lo primero que debemos saber es que HTML sea cual sea su versión **no es un lenguaje de programación**, tan solo es un lenguaje de marcas, se usan una serie de etiquetas estandarizadas, HTML se usa para crear la estructura de una web, y se ha puesto de moda para las aplicaciones móviles, gracias a <a href="https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/" title="Los 10 Mejores Frameworks gratuitos para Aplicaciones Web" target="_blank">Frameworks</a> como PhoneGap a esta moda se a sumado Mozilla, con su S.O. Firefox OS; así que como podemos comprobar es casi obligatorio como mínimo conocerlo sea cual sea la plataforma a la que queramos desarrollar; como he dicho nos sirve para dar la estructura a una web (el esqueleto) después podremos darle colores, formas y organizarlo con las hojas de estilo en cascada (CSS) y se recomienda usar su ultima versión <a href="https://elbauldelprogramador.com/generar-codigo-css-3-facilmente/" title="Generar código CSS 3 fácilmente" target="_blank">CSS3</a>, aunque esta es otra batalla de la que hablaremos en otra ocasión; ahora que sabemos que es, y para que sirve, es el momento de conocer la etiqueta que debe aparecer en cualquier documento HTML5.

```html

```

Con esta etiqueta decimos que el documento es una pagina web HTML5; como vemos es muy sencilla, incluso nos la podemos aprender a diferencia de su antecesor HTML4.

```html

ó

```

según fuera tradicional o estricto, no vamos a entrar en las diferencias ya que esto hoy en día a pasado a la historia.

Todo el que empieza en esto esta deseando ir al código escribir su primera pagina web y verla funcionando. Esto se puede lograr con una estructura básica como la siguiente:

```html



    El contenido de la pagina


```

A esta estructura le podemos dar “vida” simplemente abriendo nuestro blog de notas, y pegándolo, dándole el nombre que deseemos y la extensión html. Después de eso si la abrimos con cualquier navegador podemos verla funcionando.

<figure>
    <a href="/img/2013/11/Introducción-a-HTML5.png"><amp-img sizes="(min-width: 481px) 481px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/Introducción-a-HTML5.png" title="Introducción a HTML5" alt="Introducción a HTML5" width="481px" height="409px" /></a>
</figure>

Ahora os explicare qué es cada etiqueta, la primera: el **Doctipe**, ya la conocemos, seguidamente tenemos una etiqueta **<html>**; que cierra al final del documento **</html>** podemos intuir que hay que incluir dentro todo el contenido html y justamente es así como funciona debemos escribir dentro todo el contenido de nuestra página, la siguiente etiqueta es el **<head>** allí debemos incluir los enlaces a nuestras hojas de estilo, etiquetas de metadatos (mas adelante veremos que son y para que sirven), el titulo de la página, este se incluye dentro de las etiquetas **<title>** **</title>** y como vemos en la imagen superior lo que escribamos aquí va a aparecer en la pestaña de nuestra pagina; se debe cerrar con **</head>**; seguidamente nos encontramos con **<body>** aquí es donde escribiremos todo el cuerpo de nuestra web.

Estas son las etiquetas básicas, el body podemos complicarlo todo lo que queramos o necesitemos añadiendo tantas etiquetas <div> </div> conocidas como divisiones, o capas, y dentro de cada una meteremos el contenido que deseemos, imágenes, texto, vídeo&#8230;

# Etiquetas de HTML5

Las etiquetas mas usadas son:

  * &lt;html>: ya la conocemos; es la raíz de cualquier pagina, y todos los demás elementos deben
descender de él.
  * &lt;head>. Es la cabecera de la pagina, en ella incluiremos todos los enlaces a documentos
externos y metadatos
  * &lt;title>: es el titulo de la pagina.
  * &lt;link> la usaremos para enlazar a documentos JS([Java Script][2]) y CSS.
  * &lt;meta>: define algún metadato, como las palabras clave, descripción de la pagina, etc
  * &lt;body> Dentro de él tendremos el contenido de la página
  * &lt;section> Nueva etiqueta solo disponible en paginas HTML5 y define una sección de la página
  * &lt;nav> también es nueva en HTML5 se utiliza para contener los enlaces de navegación
  * &lt;article> es otra de las novedades de la ultima versión del HTML aquí escribiremos los artículos, lo cual viene siendo algo que no tiene necesariamente que ver con el resto de la web.
  * &lt;hx> sustituiremos la X por un numero desde el 1 al 6 se usa para definir encabezados, cuanto mas bajo sea el numero mas importante sera el encabezado, por lo que &lt;h1> es mas importante que &lt;h2> predefinido por nuestros navegadores disminuye la fuente de cada &lt;hx> según aumente el numero por lo que &lt;h2> tendrá una fuente (tamaño de letra) mayor que un &lt;h3>, lo suyo es mantener esta concordancia aunque podemos editarlo desde nuestras hojas de estilos.
  * &lt;header> nuevo elemento del HTML5 aquí escribiremos la cabecera de la pagina, normalmente es el lugar donde se coloca el logo, titulo de la web, y menú de navegación
      * &lt;footer> también hemos hablado de el antes, es otro de los nuevos elementos del HTML5 y como su nombre indica es el pie, generalmente de la pagina en la que este declarado, pero también es correcto usarlo para escribir cualquier otro pie que pueda aparecer en la pagina, por ejemplo el pie de un articulo, en donde podríamos colocar el nombre del autor que lo escribió
      * &lt;p> lo que pongamos en su interior se mostrara como un párrafo
      * &lt;hr> indica una separación entre secciones, artículos, o algún contenido, visualmente lo veremos como una linea horizontal
      * &lt;ol> define una lista ordenada normalmente se visualizaran con un numero delante de cada elemento
      * &lt;ul> define una lista sin orden
      * &lt;li> se incluye dentro de cualquiera de los 2 elementos anteriores, son los elementos de la lista.
      * &lt;figure> Nuevo elemento en HTML5 cada vez mas usado, se utiliza para incluir una imagen en su interior
      * &lt;img> aquí declararemos la imagen que queremos mostrar
      * &lt;div> la etiqueta mas usada, podemos sustituir casi cualquiera de las anteriores por esta, hasta la aparición del HTML5 se solían incluir todas las divisiones de la web con esta etiqueta y se le daban distintos estilos, según se fuera a usar, aun así, se recomienda no usarla si existe otra etiqueta mas moderna que haga lo que queremos hacer.
          * &lt;a> una de las etiquetas mas utilizadas, se utiliza para definir enlaces, ya sean interiores(dentro de las misma web) o exteriores (hacia otras webs)
          * &lt;mark> cada vez mas utilizada es otra de las novedades HTML5 se utiliza para resaltar una parte de la pagina.
          * &lt;span> muy usado para dar un estilo distinto a alguna parte de un párrafo
          * &lt;iframe> se utiliza para insertar un contenido dentro de la pagina, ya sea un vídeo (si quisiéramos insertar un vídeo de YouTube esta seria la etiqueta) u otra pagina, así como cualquier otro contenido externo a nuestra pagina y que necesitemos se visualice en ella.
          * &lt;embed> muy similar al anterior, pero con algunas mejoras, es otra de las novedades del HTML5
          * &lt;vídeo> es la etiqueta que usaremos para visualizar un vídeo en nuestra web
          * &lt;audio> exactamente lo mismo que la anterior, pero para audio, ambas son novedades del HTML5.
          * &lt;canvas> es una capa especial para imágenes,(bitmaps) es utilizada para dibujar, especial para juegos e imágenes en movimiento
          * &lt;table> como su nombre indica se usa para incluir tablas en la pagina, no se aconseja usarla
          * &lt;tr> representa una fila de la tabla
          * &lt;td> representa una celda de la tabla
          * &lt;form> se usa para crear formularios, desde los cuales introduciremos datos, y ejecutaremos ciertas funciones.
          * &lt;label> dentro de los formularios suele usarse para sacar un texto estático, el típico que aparece encima de la ya estándar caja de texto blanca que dice teclee su nombre.
          * &lt;input> tenemos gran variedad de campos en artículos posteriores hablaremos de ellos, pero todos ellos sirven para interactuar con el usuario, ya sean un checkbox (la cajita blanca que marcaremos con un check); campos de texto para introducir nuestro nombre, teléfono, etc&#8230;
          * &lt;select> es el desplegable con distintas opciones que todos hemos visto para seleccionar nuestro país por ejemplo.
          * &lt;option> cada una de las opciones del &lt;select>
          * &lt;textarea> es un campo de texto con varias lineas para escribir un texto extenso.
    Estas son las mas usadas, y estandarizadas, podemos ver todas desde multitud de webs, una buena de referencia es la de Mozilla.

# Referencias

- *Referencia etiquetas HTML5* »» <a href="https://developer.mozilla.org/es/docs/HTML/HTML5/HTML5_lista_elementos" target="_blank">developer.mozilla.org</a>



 [1]: https://elbauldelprogramador.com/ejemplos-en-html5-almacenamiento-web/ "Ejemplos en HTML5: Almacenamiento Web, SQL y WebSocket"
 [2]: https://elbauldelprogramador.com/crear-webapps-con-soporte-html5-css3-y/ "Crear WebApps con soporte HTML5, CSS3 y JavaScript con el LungoJs framework"
