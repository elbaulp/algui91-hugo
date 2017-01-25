---
author: alex
categories:
- latex
color: '#B31917'
date: 2015-05-27 10:28:05
description: "C\xF3mo crear una imagen desde latex, usando el paquete tikz, para insertar
  una foto en un marco circular, al estilo de la red social de Google, G+."
image: 2013/05/latex_logo.png

mainclass: latex
math: true
modified: null
tags:
- latex
- tikz
- tikzpicture
- imagenes marco Circular
title: "C\xF3mo Crear Imagenes Con Un Marco Circular Al Estilo G+ en LaTeX"
---

En éste artículo vamos a ver algo curioso que aprendí hace poco. Con el paquete `tikz` de $$\LaTeX$$.

Los que uséis G+ sabréis que las fotos de perfil aparecen encuadradas en un círculo, en lugar de un cuadrado. Rellenando mi Currículum se me ocurrió que podría insertar mi foto con ese mismo estilo.

Por supuesto, podría haber creado la imagen directamente con forma circular, pero ya que estoy usando una plantilla $$\LaTeX$$ para el Curriculum, me propuse buscar la manera de implementarlo.

<!--more--><!--ad-->

Resulta que es bastante sencillo, el siguiente código conseguirá el efecto deseado:

```latex

\documentclass[border=5mm]{article}
\usepackage[skins]{tcolorbox}

\begin{document}

  \resizebox{256pt}{256pt}{
    \begin{tikzpicture}
      \node[circle,draw,inner sep=1cm,fill overzoom image=./pictures/image.jpg] (A) {};
    \end{tikzpicture}
  }

\end{document}

```

Donde:

* `image=./pictures/image.jpg` es la ruta a la imagen.
* `\resizebox{256pt}{256pt}` es el tamaño que queremos.
* `sep=1cm` El borde de la imagen.

Tras compilar el código, el resultado es el siguiente:

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Cómo-Crear-Imagenes-Con-Un-Marco-Circular-Al-Estilo-G+-en-LaTeX.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="558px" height="559px" />
</figure>

### Referencias

[Crop jpeg into circular tikz node](http://tex.stackexchange.com/questions/193555/crop-jpeg-into-circular-tikz-node "Crop jpeg into circular tikz node")
