---
author: alex
categories: [latex, dev]
mainclass: latex
date: 2016-09-16 13:48:53
lastmod: 2017-09-28T20:13:46+01:00
description: "Breve introducción al paquete PgfGantt de LaTeX, para crear diagramas  de Gantt"
image: crear-diagrama-de-gantt-en-latex.png
introduction: "Breve introducción al paquete PgfGantt de LaTeX, para crear diagramas  de Gantt"
url: /crear-diagrama-de-gantt-en-latex/
title: "Cómo Crear Diagramas De Gantt en LaTeX"
---

<figure>
  <img sizes="(min-width: 800px) 800px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/crear-diagrama-de-gantt-en-latex.png" alt="Cómo Crear Diagramas De Gantt en LaTeX" title="Cómo Crear Diagramas De Gantt en LaTeX" width="800" height="335"></img>
</figure>

> Consulta el resto de [artículos sobre LaTeX escritos en el blog](/categories/latex "Artículos sobre LaTeX")

# Qué es un Diagrama de Gantt

La definición de WikiPedia:

> El diagrama de Gantt es una útil herramienta gráfica cuyo objetivo es exponer el tiempo de dedicación previsto para diferentes tareas o actividades a lo largo de un tiempo total determinado.

<!--more--><!--ad-->

# Diagramas de Gantt en Latex

Para crear estos diagramas en LaTeX, existe un paquete llamado [Pgfgantt](http://bay.uchicago.edu/CTAN/graphics/pgf/contrib/pgfgantt/pgfgantt.pdf "Documentación de pgfgantt") que nos permite crear estos diagramas de forma sencilla. Explicaré por encima un ejemplo:

```latex
\begin{ganttchart}[
canvas/.append style={fill=none, draw=black!5, line width=.75pt},
hgrid style/.style={draw=black!5, line width=.75pt},
vgrid={*1{draw=black!5, line width=.75pt}},
today=1,
today rule/.style={
draw=black!64,
dash pattern=on 3.5pt off 4.5pt,
line width=1.5pt
},
today label font=\small\bfseries,
title/.style={draw=none, fill=none},
title label font=\bfseries\footnotesize,
title label node/.append style={below=7pt},
include title in canvas=false,
bar label font=\mdseries\small\color{black!70},
bar label node/.append style={left=2cm},
bar/.append style={draw=none, fill=black!63},
bar incomplete/.append style={fill=barblue},
bar progress label font=\mdseries\footnotesize\color{black!70},
group incomplete/.append style={fill=groupblue},
group left shift=0,
group right shift=0,
group height=.5,
group peaks tip position=0,
group label node/.append style={left=.6cm},
group progress label font=\bfseries\small,
link/.style={-latex, line width=1.5pt, linkred},
link label font=\scriptsize\bfseries,
link label node/.append style={below left=-2pt and 0pt},
]{1}{24}
\gantttitle{Título del diagrama}{24} \\[grid]
\gantttitle{Septiembre}{4}
\gantttitle{Octubre}{4}
\gantttitle{Noviembre}{4}
\gantttitle{Diciembre}{4}
\gantttitle{Enero}{4}
\gantttitle{Febrero}{4}\\
\gantttitle[
title label node/.append style={below left=7pt and -3pt}
]{Semana:\quad1}{1}
\gantttitlelist{2,...,24}{1} \\
\ganttgroup[progress=65]{Título del grupo}{1}{24} \\
\ganttbar[
progress=100,
name=bar1
]{\textbf{Actividad 1}}{1}{1} \\
\ganttbar[
progress=14,
name=bar2
]{\textbf{Actividad 2}}{2}{2} \\
\ganttbar[
progress=25,
name=bar3
]{\textbf{Actividad 3}}{3}{3} \\
\ganttbar[
progress=56,
name=bar4
]{\textbf{Actividad 4}}{4}{4} \\
\ganttbar[
progress=100,
name=bar5
]{\textbf{Actividad 5}}{5}{7} \\
\ganttbar[
progress=80,
]{\textbf{Actividad 6}}{8}{8} \\
\ganttbar[
progress=49,
]{\textbf{Actividad 7}}{9}{11} \\
\ganttmilestone{Hito 1}{11}{11}  \\
\ganttmilestone{Hito 2}{12}{12} \\
\ganttbar[
progress=35,
]{\textbf{Actividad 8}}{12}{22} \\
\ganttbar[
progress=0,
]{\textbf{Actividad 9}}{23}{24} \\

\ganttmilestone{Q6 report}{24}{24} \\
\ganttmilestone{M2: Project finished}{24}{24}

\ganttlink[link type=f-s]{bar1}{bar2}
\ganttlink[link type=f-s]{bar4}{bar5}
\end{ganttchart}
```

# Comandos básicos del diagrama de Gantt

Veamos algunos de los comandos más útiles:

- `\begin{ganttchart}[opciones]{1}{24}`: Con este comando iniciamos el diagrama, en las opciones se especifican comandos para el estilo del gráfico, luego se especifica cuantos cuadros de tiempo queremos, en este caso del 1 a 24.
- `gantttitle{titulo}{n}`: Con este comando se especifica un título para el diagrama, seguido de cuantos cuadros de tiempo queremos que ocupe dicho título. Podemos tener varios títulos, como en este ejemplo.
- `\ganttgroup[opciones]{titulo}{inicio cuadro}{fin cuadro}`: Especifica un grupo en el diagrama, recibe como parámetro el título, en qué cuadro de tiempo empieza y en cual acaba. En las opciones podemos especificar el porcentaje completado con `progress=n`.
- `\ganttbar[opciones]{tarea}{inicio cuadro}{fin cuadro}`: Especifica una tarea, similar al anterior, los parámetros son el nombre de la tarea y la franja de tiempo que ocupa.
- `ganttlink[opciones]{nombre tarea 1}{nombre tarea 2}`: Con este comando podemos establecer un enlace entre dos tareas, a las tareas involucradas se les ha dado un nombre con la opción `name=nombre` en sus opciones.

# Conclusión

Eso es todo, para crear un simple diagrama de Gantt no es necesario saber mucho más sobre este paquete. Recomiendo echar un vistazo a la documentación del paquete para cosas más específicas.
