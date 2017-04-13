---
author: marta
categories:
- latex
color: '#B31917'
date: '2016-01-01'
description: "En este tutorial, curso o como queráis llamarlo os voy a enseñar
  lo básico que debéis saber para hacer vuestros documentos en <strong>LaTeX</strong>!
  Como estamos en un blog sobre informática vamos a orientarlo un poco hacia la
  informática."
image: 2013/05/latex_logo.png
lastmod: 2015-12-22

mainclass: latex
url: /mini-curso-de-latex-introduccion/
tags:
- codigo latex
- curso latex
- "curso latex español"
- enlaces latex
- figuras latex
- imagenes latex
- incluir codigo latex
- "programación Latex"
- simbolos latex
- latex
title: "Mini Curso de LaTeX - Introducción"
---

<figure>
<a href="/img/2013/05/latex_logo.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/latex_logo.png" title="{{ page.title }}" alt="{{ page.title }}" width="300px" height="114px" /></a>
</figure>

* Mini Curso de LaTeX - Introducción
* [Mini Curso de LaTeX - Incluir código fuente y símbolos matemáticos][1]
* [Mini Curso de LaTeX - Figuras, Enlaces y cabeceras][2]

## Mini curso de Latex

¡Hola *internet*!

En este tutorial, curso o como queráis llamarlo os voy a enseñar lo básico que debéis saber para hacer vuestros documentos en **LaTeX**! Como estamos en un blog sobre informática vamos a orientarlo un poco hacia la informática.

Bueno, podría empezar contándote qué significa LaTeX o quién lo creó pero me gusta ser directa, así que abre tu editor de texto preferido que vamos a empezar a escribir ya!

<!--more--><!--ad-->

Vamos a imaginar que tenemos que hacer una pequeña documentación que acompañe a un programa muy simple que hemos hecho para unas prácticas.

## Cabecera de un documento

Lo primero que debemos hacer en un documento de LaTeX es poner una cabecera, esto es, establecer la configuración del documento. La primera línea de cualquier documento LaTeX sería la siguiente:

```latex
\documentclass[opciones]{clase}
```

La parte de clase podemos rellenarla con varias opciones, dependiendo del tipo de archivo que queramos hacer. Los más populares son:
1. `article`: para documentos cortos tales como artículos, presentaciones&#8230;
2. `report`: ideal para documentos más largos que contengan varios capítulos, libros pequeños, etc
3. `book`: para libros

Y la parte de opciones, con algunas opciones que queramos añadirle a nuestro documento tales como:
1. **El tamaño de la letra**: 10pt, 11pt y 12pt. El tamaño por defecto es 10pt
2. **El tamaño del papel**: `a4paper`, `letterpaper`, `a5paper`, `b5paper`, `executivepaper`, `legalpaper`. El tamaño por defecto es `letterpaper`.
3. **Página de titulo**: `titlepage`, `notitlepage`. Por defecto, el artículo no tiene página de título mientras que el `book` y el `report` sí.
4. **El número de columnas del documento**: `twoside`, `oneside`. Las clases artículo y report son de una columna por defecto mientras que la clase libro es de dos columnas por defecto.
5. **Apaisar documento**: con la opción `landscape`.
6. **Establecer donde empieza el nuevo capítulo**: con `openright` empezaría en las páginas alineadas a la derecha (por defecto en `book`) y con openany en la siguiente página disponible (por defecto en `report`).

Sabiendo esto ya podemos poner la primera línea de nuestro documento, que en nuestro caso será:

```latex
\documentclass[11pt,a4paper]{article}
```

El siguiente paso, es especificarle a LaTeX los paquetes que necesitaremos usar en nuestro documento, podemos ir añadiéndolos conforme los vayamos necesitando a la hora de hacer el documento, pero vamos a añadir de primeras los más básicos. La sintáxis de uso de paquetes es:

### Paquetes

```latex
\usepackage[opciones]{paquete}
```

Los paquetes que añadiremos de primeras son:

```latex
\usepackage[utf8]{inputenc} % para que nos acepte la codificación UTF-8
\usepackage[spanish]{babel} % establecemos el idioma del documento al español
\usepackage{hyperref} % para poder poner "enlaces" en nuestro codigo
\usepackage{color} % para darle color a nuestros documentos
\usepackage{enumerate} % para poder añadirle a enumerate un argumento con el tipo de "contador" que queremos

```

## Comienzo del documento

Tras añadir los paquetes podríamos añadir otras opciones al documento tales como el encabezado, el pie de página&#8230; Pero no nos vamos a entretener ahora en eso. Vamos a empezar nuestro documento con el comando:

```latex
\begin{document}
```

Y para acabarlo escribiremos un

```latex
\end{document}
```

Como truco os diré que debajo del *end document* podéis escribir lo que queráis, que el compilador no lo va a leer. Yo apunto ahí los comandos que más uso, o de los que no recuerdo su sintaxis para poder tenerlos a mano.

Y ahora vamos a empezar a escribir. Lo primero que debemos hacer es especificarle a LaTeX el título de nuestro artículo, y nuestro nombre como autores, para ello:

```latex
% especificamos el titulo del documento y le ponemos un tamaño de letra grande
\title{\huge Portafolios de prácticas}
% Y ahora, el autor
\author{Marta Gómez}

```

También, si queremos, podemos añadirle la fecha actual:

```latex
% le añadimos la fecha actual
\date{\today}

```

Y por último, le añadimos el título a nuestro documento y un pequeño índice:

```latex
\maketitle % nos crea el titulo, el autor y la fecha en el inicio del documento
\tableofcontents % nos crea un indice con enlaces a las diferentes secciones y subsecciones

```

### Secciones

Y ahora vamos a empezar en la primera sección, para indicarle a LaTeX que vamos a empezar una sección lo hacemos de la siguiente manera:

```latex
\section{Descripción del programa}
```

Así crearíamos una sección llamada &#8220;Descripción del programa&#8221;. Que se correspondería con la primera sección del artículo. Si por casualidad quisieramos que empezara por otro número tendríamos que usar el siguiente comando:

```latex
\setcounter{section}{4}
```

y así empezaríamos a contar desde la sección 5.

Y sí ahora queremos hacer una subsección lo haríamos con el siguiente comando:

```latex
\subsection{Funcionamiento general}
```

Con este comando tendríamos una subsección en Descripción del programa llamada Funcionamiento general.

### Formateo del texto

Ahora tenemos que empezar a escribir normalmente, cuando queramos cambiar de párrafo hacemos un doble salto de línea, si queremos hacer un salto de línea lo hacemos con una doble barra y, si queremos poner nuestro texto en negrita, en cursiva o con subrayado lo haríamos con los siguientes comandos:

```latex
\textbf{Esto es un texto en negrita} \\
\textit{Esto es un texto en cursiva} \\
\underline{Este texto está subrayado}.

```

Otro dato importante es, que si no nos gusta el indentado que hace LaTeX al principio del párrafo podemos eliminarlo con el siguiente comando:

```latex
\noindent
```

Ahora que sabemos esto, podemos empezar a escribir:

```latex
\noindent
El programa da al usuario a elegir entre escribir en la \textit{entrada estándar} una operación aritmética
en \textbf{notación postfija} o \textbf{notación infija} y después, devuelve el resultado de dicha operación por la \textit{salida estándar}.

```

Ahora vamos a hacer una pequeña tabla, para ello, tenemos que añadir el paquete `multirow` para poder hacer tablas con más de una celda. También tendríamos que añadir los paquetes de matemáticas pues vamos a usar expresiones matemáticas en la tabla:

```latex
\usepackage{multirow} % para hacer tablas con mas de una columna
\usepackage{amsmath} % paquete basico de matematicas

```

### Tablas en Latex

Y para hacer una tabla usamos la orden `tabular` (si escribimos `tab` en Sublime Text y le damos a tabulación nos completa la sintaxis) cuya sintaxis es:

```latex
\noindent
La siguiente tabla refleja la diferencia entre notación postfija y notación infija:

\begin{tabular}{|p{4cm} | p{4cm} |}
\hline % para poner una linea horizontal
Notación infija & Notación postfija \\ % el & se usa para separar columnas y el \\ para saltos de linea
\hline
$1 + 2$ & $1$ $2 +$ \\
$5 + ((1 + 2) * 4) - 3$ &  $5$ $1$ $2 + 4 * + 3 -$ \\
\hline
\end{tabular}

```

Hay varios puntos a tener en cuenta:
1. Entre las llaves que hay después del `tabular` podemos poner c, l, r para especificar la alineación del texto, esto mejor hacerlo si no tenemos mucho texto en la celda ya que no pone saltos de línea. Y una p con una medida entre llaves que especifica el ancho de la celda y pone saltos de línea al texto de dentro.
2. El comando `\hline` se usa para poner una línea horizontal que actúa a modo de separador.
3. Cuando tenemos varias columnas, las separamos con el &
4. Cuando queremos indicar que hemos terminado una fila ponemos &#92;\ al final de dicha fila
5. Los $ que pongo se usan en LaTeX para representar signos u operaciones matemáticas &#8220;inline&#8221;. El entorno matemático no respeta espacios en blanco, por eso he tenido que poner varios dólares en la segunda columna para obtener 1 espacio 2 en vez de 12 o 5 1 2 en vez de 512.

Si queremos hacer un listado, podemos hacerlo con la orden `enumerate` (si escribimos `enum` en Sublime Text y le damos a tabulador nos autocompleta la sintaxis) o la orden `itemize` (y lo mismo si escribimos `item`) o, incluso, combinando las dos haciendo listas con sublistas:

```latex
Las distintas estructuras que hay en el fichero son:
\begin{enumerate}[1.]
    \item \textbf{clase Postfija}: que contiene los siguientes métodos:
    \begin{itemize}
        \item Constructor
        \item Método que calcula el resultado de la operación.
    \end{itemize}
    \item \textbf{función infija2postfija}: función que pasa de infija a postfija.
\end{enumerate}

```

Con el 1. que le pasamos a enumerate hacemos que nuestra lista sea 1. 2. 3. etc.

Vamos a cambiar de sección, para ello usamos la orden `section`, como hemos visto antes, si además queremos que nuestra nueva secci��n empiece en una nueva página usamos el siguiente comando

```latex
\newpage
```

Con esto completamos una pequeña introducción a LaTeX, en el siguiente artículo veremos cómo incluir código fuente en nuestro documento.



 [1]: https://elbauldelprogramador.com/curso-de-latex-incluir-codigo-fuente-y-simbolos-matematicos/ "Curso de LaTeX - Incluir código fuente y símbolos matemáticos"
 [2]: https://elbauldelprogramador.com/curso-de-latex-figuras-enlaces-y-cabeceras/
