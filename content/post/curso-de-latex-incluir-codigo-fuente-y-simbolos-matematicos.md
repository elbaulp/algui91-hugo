---
author: marta
categories:
- latex
color: '#B31917'
date: '2016-09-25'
description: "Continuando por donde lo dejamos en el \xFAltimo art\xEDculo, hoy veremos
  c\xF3mo incluir c\xF3digo fuente en el documento."
image: 2013/05/latex_logo.png
lastmod: 2015-12-22
layout: post.amp
mainclass: latex
permalink: /curso-de-latex-incluir-codigo-fuente-y-simbolos-matematicos/
tags:
- codigo latex
- curso latex
- "curso latex espa\xF1ol"
- enlaces latex
- figuras latex
- imagenes latex
- incluir codigo latex
- "programaci\xF3n Latex"
- simbolos latex
- latex
title: "Mini Curso de LaTeX - Incluir c\xF3digo fuente y s\xEDmbolos matem\xE1ticos"
---

<figure>
<a href="/img/2013/05/latex_logo.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/latex_logo.png" title="{{ page.title }}" alt="{{ page.title }}" width="300px" height="114px" /></a>
</figure>

* [Mini Curso de LaTeX - Introducción][1]
* Mini Curso de LaTeX - Incluir código fuente y símbolos matemáticos
* [Mini Curso de LaTeX - Figuras, Enlaces y cabeceras][2]

## Mini curso de Latex

Continuando por donde lo dejamos en el último artículo, hoy veremos cómo incluir código fuente en el documento.

Nuestra nueva sección se va a llamar:

```latex
\section{Código del programa}
```

Ahora, tras haber descrito brevemente lo que hace nuestro programa, vamos a proceder a enseñar el código. Hay varias alternativas para esto, mi favorita? El paquete **minted**. En El baúl del programador ya hay una [pequeña guía][3] sobre el uso de este paquete, así que no voy a explicarlo de manera muy extensa:

<!--more--><!--ad-->

### Paquetes necesarios

Incluimos el paquete `minted` en nuestra cabecera:

```latex
\usepackage{minted} % para resaltar código fuente
```

Y ahora:

  1. Si no tenemos nuestro código en un fichero aparte o si vamos a escribir muy poco código, podemos usar directamente el paquete con la siguiente sintaxis:

```latex
cout << "Hola mundo" << endl;
return 0;

```

## Añadir ficheros

  1. Si, como en nuestro caso, tenemos el fichero en un fichero a parte podemos exportarlo directamente a nuestro documento, Copiando lo siguiente en nuestra cabecera:

```latex
\newmintedfile[micodigofuente]{milenguajedeprogramacion}{
    linenos,
    numbersep=5pt,
    gobble=0,
    frame=lines,
    framesep=2mm,
    tabsize=3,
}

```

Y esto justo en el sitio en el que quieras insertar tu código:

```latex
\micodigofuente[label="nombredemifichero.extension"]{nombredemifichero.extension}

```

En nuestro caso sería, insertar lo siguiente en la cabecera (porque estamos haciéndolo en c++):

```latex
\newmintedfile[mycplusplus]{c++}{
    linenos, % muestra el número de línea
    numbersep=5pt, % separación entre el código y el número de línea
    gobble=0, % columna desde la que empieza a mostrar código
    frame=lines, % dibuja las líneas enmarcando el código
    framesep=2mm, % separación entre la línea y el código
    tabsize=3, % tamaño de la tabulación
}

```

y esto en nuestro código:

```latex
\mycplusplus[label="postfija.h"]{postfija.h}

```

Debéis tener cuidado con el paquete minted pues no hace saltos de línea si vuestro código es muy extenso, y además, no reconoce los carácteres acentuados ni la ñ.

Tras esto, empezamos una nueva sección, en la que usaremos los paquetes y entornos matemáticos. No hace falta incluir ningún paquete, pues ya lo hemos incluido antes.

Empezamos nueva sección, para ello:

### Símbolos matemáticos

```latex
\newpage
\section{Análisis de la eficiencia del programa}

```

Así es, alguna vez tendremos que analizar la eficiencia de algún programa que hagamos, y para ello vamos a tener que hacer uso de las matemáticas. En este caso, vamos a imaginar que nos piden la eficiencia del algoritmo usado para pasar de notación infija a postfija, es decir, la función infija2postfija.

Para analizar la eficiencia del algoritmo, tendremos que combinar matemáticas y texto. Para las matemáticas utilizaremos la orden `displaymath`:

```latex
\noindent
En primer lugar, nos encontramos un for que va desde $i=0$ hasta $s.size()$,
donde $s.size()$ es el tamaño de string que contiene la operación aritmética
en notación infija. Este for equivaldría a la siguiente sumatoria, teniendo
en cuenta que todos las operaciones dentro del for tienen eficiencia $O(1)$:

\begin{displaymath}
\sum_{i=0}^{s.size()} = s.size(), \qquad\ \textrm{siendo $s.size()$
    el tamaño del string que contiene la operación aritmética}
\end{displaymath}

```

Para representar la sumatoria dentro del entorno matemático utilizamos la opción `\sum`, después, utilizamos `_` y `^` para establecer los límites de la sumatoria. `\qquad\` lo usamos para dejar un pequeño espacio (podemos usar `\quad` o `\qquad\`). Así, el texto de arriba quedaría <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="//s0.wp.com/latex.php?latex=%5Csum_%7Bi%3D0%7D%5E%7Bs.size%28%29%7D+%3D+s.size%28%29&bg=ffffff&fg=000&s=0" alt="\sum_{i=0}^{s.size()} = s.size()" title="\sum_{i=0}^{s.size()} = s.size()" class="latex" />

Otro detalle a destacar, es que en el párrafo de introducción, cuando menciono variables matemáticas, las menciono entre signos de dólar. Esto es para que salgan en cursiva y se puedan diferenciar del resto del texto.

Seguimos analizando la eficiencia, y ahora recurrimos a la estructura `enumerate` que vimos antes, pero con un "contador" un tanto especial:

```latex
\noindent
Ahora, vamos a proceder a analizar las operaciones dentro de dicho for:
\begin{enumerate}[$\heartsuit$]
    \item Tenemos en primer lugar una asignación, cuya eficiencia es $O(1)$
    \item Y después un if, como sabemos las comparaciones también tienen $O(1)$,
                    y dentro de dicho if una llamada a una función que lo único que
                    hace es añadir un elemento a la cola, por lo que también es $O(1)$.
    \item Luego tenemos un else, cuyas operaciones también tienen un coste
                    de $O(1)$ puesto que tanto Pila como Cola están implementadas
                    con celdas enlazadas.
\end{enumerate}

\noindent
Por tanto, tal y como dijimos antes, la eficiencia del bucle es de $O(s.size())$.

```

Si os fijáis, la lista estará enumerada con corazones. Y si os fijáis un poco más, veréis que esos corazones son interpretados por LaTeX como símbolo matemático, pues están entre signos de dólar. Así, podemos usar cualquier signo matemático de los que LaTeX nos da para hacer nuestras listas más originales. Aquí os dejo una [lista][4] de algunos símbolos que podéis usar.

Ahora seguiríamos con nuestro análisis de la eficiencia:

```latex
\noindent
Después, tenemos un pequeño bucle, en el que insertamos en la cola de la
operación postfija, los operadores con menos prioridad que han quedado en la pila.
Este bucle iría desde $0$ hasta $t$, siendo $t$ el tamaño de la pila.
Y se traduciría en la siguiente sumatoria:

\begin{displaymath}
\sum_0^t 1 = t
\end{displaymath}

```

Esta vez, los límites de la sumatoria estaban formados por un único carácter, por eso podemos poner `\sum_0^t` en vez de `\sum_{0}^{t}`.

Terminamos de analizar la eficiencia del último bucle que nos queda:

```latex
\noindent
Por último,  tenemos otro bucle más en el que metemos en un string la
operación en notación postfija que hemos calculado y lo devolvemos.
La devolución tiene eficiencia $O(1)$, y las operaciones que hacemos
dentro del bucle también, por tanto, el bucle se traduciría en la
siguiente sumatoria:

\begin{displaymath}
\sum_{i=0}^{c.size()} 1 = c.size();
\end{displaymath}

```

Y ahora vamos a hacer una subsección a modo de conclusión. Para ello, usamos la orden `\subsection{Conclusión}`:

```latex
\subsection{Conclusión}
Tenemos tres bucles, al ser independientes, la eficiencia de todo el
código es la suma de la eficiencia de cada bucle por separado, es decir:

\begin{displaymath}
eficiencia = \underbrace{s.size() + t + c.size()}_{O(n)} = O(n)
\end{displaymath}

\noindent
Podemos concluir diciendo que la eficiencia de nuestra función es $O(n)$.

```

Esto ha sido un pequeño ejemplo del uso de las matemáticas en LaTeX, los demás símbolos matemáticos que hay se usan exactamente igual a como hemos visto aquí.

En el proximo artículo veremos cómo añadir figuras, enlaces y tablas al documento.



 [1]: https://elbauldelprogramador.com/mini-curso-de-latex-introduccion/ "Mini Curso de LaTeX - Introducción"
 [2]: https://elbauldelprogramador.com/curso-de-latex-figuras-enlaces-y-cabeceras/
 [3]: https://elbauldelprogramador.com/resaltar-sintaxis-del-codigo-fuente-en-latex-con-minted/ "Intro a Minted"
 [4]: http://web.ift.uib.no/Teori/KURS/WRK/TeX/symALL.html "lista"