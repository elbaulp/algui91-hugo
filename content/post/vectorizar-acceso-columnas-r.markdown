---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-04-04 18:56:12
description: "En unas prácticas de Aprendizaje automático para la facultad en
  las que usamos R. Me surgió un problema intentando vectorizar el acceso a un
  Data set por columnas, así que pregunté en StackOVerflow."
image: vectorizar-acceso-columnas-r.png

mainclass: dev
modified: null
tags:
- R
- vectorizar en r
- vectorizar codigo
- mejorar codigo en r
- optimizar codigo en R
- vectorizar data set R
- vectorizar columnas en R
title: Vectorizar El Acceso a Columnas en R
---

<figure>
<a href="/img/vectorizar-acceso-columnas-r.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/vectorizar-acceso-columnas-r.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="320px" /></a>
</figure>



> El siguiente artículo es una traducción de una pregunta en **StackOverflow** del usuario <a href="http://stackoverflow.com/users/1612432/algui91" target="_blank" title="Perfil de algui91">algui91</a>, que preguntaba <a href="http://stackoverflow.com/questions/35914984/vectorize-access-to-columns-in-r" target="_blank" title="Vectorize access to columns in R">Vectorize access to columns in R</a>. La respuesta es del usuario <a href="http://stackoverflow.com/users/3001626/david-arenburg" target="_blank" title="Perfil de David Arenburg">David Arenburg</a>.

En unas prácticas de [Aprendizaje automático](/9-libros-que-debes-leer-para-ser-un-data-scientist-o-data-engineer/ "Libros sobre Aprendizaje Automático") para la facultad en las que usamos R. Me surgió un problema intentando vectorizar el acceso a un _Data set_ por columnas, así que pregunté en _StackOVerflow_.

<!--more--><!--ad-->

El objetivo era dado un _data set_ relleno de 1 y -1, cambiar el valor de un 10% de unos a -1, y de un 10% de -1 a 1. Los datos eran algo así:

```r
          x         y f1 f2 f3 f4
1  76.71655  60.74299  1  1 -1 -1
2 -85.73743 -19.67202  1  1  1 -1
3  75.95698 -27.20154  1  1  1 -1
4 -82.57193  39.30717  1  1  1 -1
5 -45.32161  39.44898  1  1 -1 -1
6 -46.76636 -35.30635  1  1  1 -1
```

En un principio obtenía el 10% así:

```r
indexPositive = sample(which(datafsign$result == 1), nrow(datafsign) * .1)
```

obteniendo así un 10% de los índices a cambiar, pero solo de una columna. Yo quería generalizar al máximo posible y obtenerlo para las 4 columnas que se ven en el ejemplo anterior. Al final, con la ayuda de _David Arenburg_, cree el siguiente código:

```r
getPercentageOfData <- function(x, condition = 1, percentage = .1){
  # Get the percentage of samples that meet condition
  #
  # Args:
  #   x: A vector containing the data
  #   condition: Condition that the data need to satisfy
  #   percentaje: What percentage of samples to get
  #
  # Returns:
  #   Indexes of the percentage of the samples that meet the condition
  meetCondition = which(x == condition)
  sample(meetCondition, length(meetCondition) * percentage)
}
```

Lo cual me permitía pasarle como parámetro tantas columnas como quisiera cambiar:

```r
# Get a 10% of samples labeled with a 1 in all 4 functions
indexPositive = lapply(datafunctions[3:6], getPercentageOfData)
# Change 1 by -1
datafunctions$f1[indexPositive$f1] = -1
datafunctions$f2[indexPositive$f2] = -1
datafunctions$f3[indexPositive$f3] = -1
datafunctions$f4[indexPositive$f4] = -1
```

Y conseguir así lo que quería hacer.

Para cambiar los -1  por 1 basta llamar al a función con un parámetro más, el de condición:

```r
indexNegative = lapply(datafunctions[3:6], getPercentageOfData, condition = -1)
```

#### Fuente

Vectorize access to columns in R \| <a href="http://stackoverflow.com/questions/35914984/vectorize-access-to-columns-in-r" title="Vectorize access to columns in R" target="_blank">stackoverlow.com</a>
