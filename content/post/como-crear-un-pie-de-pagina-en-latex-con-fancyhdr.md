---
author: alex
categories:
- how to
- latex
color: '#B31917'
date: '2016-12-12'
image: 2013/05/latex_logo.png
lastmod: 2016-08-13
layout: post.amp
mainclass: latex
permalink: /como-crear-un-pie-de-pagina-en-latex-con-fancyhdr/
tags:
- "crear un pie de p\xE1gina en LaTeX"
- fancyhdr
- "personalizar pie de p\xE1gina latex"
- pie de pagina latex
- latex
- fancy hdr
- latex nota al pie
title: "C\xF3mo crear un pie de p\xE1gina en LaTeX con fancyhdr"
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/latex_logo.png" alt="latex_logo" width="300px" height="114px"></amp-img>
</figure>

Como he mencionado en algún [artículo anterior][1], he aprendido bastante a programar en LaTeX reescribiendo el [curso de Android][2]. Hoy vamos a ver cómo crear un pie de página en LaTeX.

<!--more--><!--ad-->



## Fancyhdr

Para poder crear pies de página y cabeceras es necesario usar el paquete *fancyhdr*, y establecer el estilo de página a *fancy*:

```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
```

Ahora nuestros documentos tendrán una línea arriba y abajo, en la cabecera y pie de página respectivamente.

## Personalizar el estilo del pie de página

Para cambiar el aspecto por defecto que ofrece el paquete fancyhdr, hemos de usar los comandos `fancyhead` y `fancyfoot`, correspondientes a la cabecera y pie de página, respectivamente. Nosotros nos centraremos en el pie, aunque para personalizar la cabecera bastará con sustituir `fancyfoot` por `fancyhead` en el código.

Es necesario conocer el significado de las siguientes letras:

* E: Página par
* O: Página impar
* L: Parte izquierda
* C: Parte central
* R: Parte derecha
* H: Cabecera
* F: Pie de página

Conocido el significado de las mismas, ahora es posible definir el estilo en el preámbulo:

```latex
\fancyhead[CO,CE]{---Draft---}
\fancyfoot[C]{Confidential}
\fancyfoot[RO, LE] {\thepage}
```

El grosor de las líneas decorativas puede cambiarse con:

```latex
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}
```

Como apunte personal, uso plantillas para distintos tipos de documentos, estas plantillas vienen con un fichero de estilo propio y para no modificar directamente el valor del pie de página podemos crear un comando que permita establecer el contenido del pie de página. Por ejemplo, en el fichero que define la estructura del documento creamos el comando:

```latex
\newcommand{\setFooterL}[1]{
    \fancyfoot[L]{\small\textit{#1}}
}
\newcommand{\setFooterR}[1]{
    \fancyfoot[R]{\small\textit{#1}}
}
```

Ahora desde el fichero principal, resulta muy fácil reusar la plantilla y cambiar el texto del pie de página de la siguiente manera:

```latex
\setFooterL{\href{http://twitter.com/elbaulp}{Alejandro Alcalde}}
\setFooterR{\href{https://elbauldelprogramador.com}{elbauldelprogramador.com}}
```

Produciendo el siguiente resultado:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/footerFancyHdrLatex.png" alt="Cómo crear un pie de página en LaTeX con fancyhdr" title="Cómo crear un pie de página en LaTeX con fancyhdr" width="887px" height="53px"></amp-img>
</figure>

#### Referencias

- *Header/Footer in Latex with Fancyhdr* »» <a href="http://texblog.org/2007/11/07/headerfooter-in-latex-with-fancyhdr/" target="_blank">texblog.org</a>

 [1]: https://elbauldelprogramador.com/resaltar-sintaxis-del-codigo-fuente-en-latex-con-minted/ "Resaltar sintaxis del código fuente en LaTeX con minted"
 [2]: https://elbauldelprogramador.com/disponible-la-primera-parte-del-curso/ "Disponible la primera parte del curso Android en PDF"