---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2016-09-23 13:01:18
description: "Olympic Feathers es una visualizaci\xF3n de datos interactiva que muestra
  la historia de las medallas ol\xEDmpicas desde 1896 hasta hoy"
image: Olympic-Feathers-Detail-7.png
introduction: "Olympic Feathers es una visualizaci\xF3n de datos interactiva que muestra
  la historia de las medallas ol\xEDmpicas desde 1896 hasta hoy"

mainclass: articulos
tags:
- visualizacion datos
- d3js
title: "Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896
  hasta 2016"
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Olympic-Feathers-Detail-7.png" alt="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" title="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" width="750" height="750"></amp-img>
</figure>

Hace unos meses publicamos [15 Ejemplos De Las Mejores Visualizaciones De Datos](https://elbauldelprogramador.com/14-ejemplos-visualizacion-datos/ "15 Ejemplos De Las Mejores Visualizaciones De Datos"), hoy os traemos otra visualización muy interesante de [_Nadieh Bremer_](http://www.visualcinnamon.com "Sitio web de Nadieh Bremer"), en la cual muestra __todas las medallas de oro en los Juegos Olímpicos desde 1896__, en forma de plumas.

__Olympic Feathers__, es una _visualización de datos_ interactiva que muestra la historia de las medallas olímpicas desde 1896 hasta hoy. Los gráficos muestran cómo se distribuyen las medallas por disciplina, país, género y geografía. También proporciona una visión de cómo han evolucionado las distintas disciplinas a lo largo del tiempo.

## Cómo surgió la idea

Inicialmente Nadieh tenía pensado visualizar cada una de las 56 disciplinas como una “pluma” y usar el interior de la pluma para colocar todas las medallas en función de la edición de los juegos y género del ganador. Al final la idea del diseño usando forma de pluma no cuajó, pero lo mantuvo en el nombre del proyecto (_“Olympic feathers”_ o Plumas Olímpicas).

<!--more--><!--ad-->

## Qué herramientas usó

Para desarrollar el proyecto usó __Excel__, __R__ (Puedes consultar [artículos sobre R en este enlace](https://elbauldelprogramador.com/tags/r "Artículos sobre R")) , __Sketch__ y __D3.js__.

## La historia de las Olimpiadas

Más de 5000 eventos en las Olimpiadas han tenido ganador, premiados con una medalla de oro desde 1904. Podemos investigar la visualización interactiva para ver cómo cada una de estas medallas se ganaron en las 56 disciplinas que han participado en los juegos, 41 de las cuales participaron también en los últimos Juegos Olímpicos de Rio.

## Qué nos cuentan los datos

La mayoría de deportes Olímpicos empezaron siendo solo para hombres. Afortunadamente esta tendiencia comenzó a cambiar en la segunda mitad el último siglo. Incluso el número de medallas que pueden ganarse para una disciplina comienza a ser el mismo para ambos géneros. En los juegos de Rio hubo 3 disciplinas en las que solo podía participar un género; La ___lucha Greco-Romana___, aún en los juegos desde la primera edición, en la que solo participan hombres. Por otro lado, en  ___Gimnasia Rítmica___, y ___Natación Sincronizada___, en los juegos desde 1984, solo participan mujeres.

## Como leer las plumas

Cada círculo representa un grupo de deportes similares, como deportes de agua, deportes de pelotas etc. Dentro de cada círculo se muestran porciones, cada una de estas porciones es una __pluma__, que representa una disciplina.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Plumas-Olimpicas-Visualizacion-medallas-Olimpicas-1896-hasta-2016.png" alt="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" title="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" width="292" height="214"></amp-img>
    <figcaption>Una pluma</figcaption>
</figure>

Una __pluma__ se divide en 31 secciones, irradiando hacia afuera. Empiezan desde los primeros juegos en 1896, en el centro del círculo hasta los últimos juegos en Rio 2016, en el exterior del círculo. Cada disciplina se hace el doble de ancha según el máximo de medallas que se podrían haber ganado durante una edición para un género (El ancho es el mismo para hombres y mujeres).

La siguiente división se hace por género. Por ejemplo, en la imagen de arriba, las barras que van hacia arriba, con un fondo rojo son medallas de oro ganadas por mujeres, las de abajo por hombres.

Las medallas se colorean en función del continente, como se muestra en la siguiente imagen:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Plumas-Olimpicas-Visualizacion-medallas-Olimpicas-1896-hasta-20162.png" alt="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" title="Plumas Ol\xEDmpicas, Visualizaci\xF3n de las medallas Ol\xEDmpicas desde 1896 hasta 2016" width="196" height="129"></amp-img>
    <figcaption>Representación de los continentes</figcaption>
</figure>

## Detalles técnicos y referencias

- Para conocer más sobre la elaboración del proyecto, puedes visitar el repositorio [Olympic Feathers en GitHub](https://github.com/nbremer/olympicfeathers/tree/gh-pages/data "Olympic Feathers en GitHub").
- La página del [proyecto Olympic Feathers](https://nbremer.github.io/olympicfeathers/ "proyecto Olympic Feathers")
- Página personal de [Nadieh Bremer](http://www.visualcinnamon.com/portfolio/olympic-feathers "Página Oficial de Nadieh Bremer")
- Para escuchar Nadieh hablar de su proyecto en el podcast __Data Stories__, visita el episodio [83 \| Olympic Feathers with Nadieh Bremer](http://datastori.es/83-olympic-feathers-with-nadieh-bremer/ "83 \| Olympic Feathers with Nadieh Bremer")
