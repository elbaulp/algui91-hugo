---
author: cristina
categories:
- articulos
date: 2016-01-26 10:51:21
description: "En este artículo se dará un repaso por las distintas ténicas
  existentes de reconocimiento de patrones y cómo pueden usarse sobre datos biométricos."
image: hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png
mainclass: articulos
tags:
- "seguridad biométrica"
- "biometría aplicada a la seguridad"
- "reconocimiento de patrones biométricos"
- "sistemas biométricos"
- "biometría de la mano"
title: "Biometría Aplicada a La Seguridad - Reconocimiento De Patrones"
lastmod: 2017-02-11
---

<figure>
<a href="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="405px" /></a>
<span class="image-credit">Crédito de la imagen: pixabay<a href="https://pixabay.com/en/biometrics-eye-security-154660/"></a></span><br />
</figure>

El siguiente artículo forma parte de un trabajo en grupo realizado para la asignatura _Seguridad en Sistemas Operativos_ de la facultad de Ingeniería Informática de Granada (ETSIIT). Los componentes del grupo fueron [@MPV_Prod](http://twitter.com/MPV_Prod) , [@_musicalnote](http://twitter.com/_musicalnote) y [@ElBaulP](http://twitter.com/elbaulp). Este artículo es autoría de @_musicalnote.

# Índice

- [Biometría aplicada a la seguiridad - Introducción](/biometria-seguridad-introduccion "Biometría aplicada a la seguiridad - Introducción")
- Biometría aplicada a la seguiridad - Reconocimiento de patrones
- [Biometría aplicada a la seguiridad - Sistemas biométricos](/sistemas-biometricos "Biometría aplicada a la seguiridad - Sistemas biométricos")

<!--more--><!--ad-->

Reconocimiento de patrones
--------------------------

Se ha hablado de las distintas técnicas que existen para realizar la
identificación de un individuo, ahora se profundizará en el **como** se
consigue reconocer una cara, un iris, una firma etc, mediante el
reconocimiento de patrones.

### Qué es el reconocimiento de patrones

Es la ciencia encargada de la descripción y clasificación de objetos,
personas, señales, representaciones etc. El reconocimiento de patrones
tiene varios campos de aplicación, sin embargo el más relacionado con la
[seguridad](/security-now/ "Artículos de seguridad") es sin duda el reconocimiento biométrico de personas. En este
campo se trata de asignar una identidad a una persona, o verificar que
es quién dice ser, midiendo ciertas características propias.
Características como la voz, cara, manos, huellas dactilares, iris,
firma etc.

### El problema del reconocimiento de patrones

A los humanos se nos da terriblemente bien reconocer algunos patrones,
nuestro cerebro tiene unos algoritmos que aún desconocemos muchísimo más
rápidos que cualquier computador para reconocer una cara,o la voz, por
ejemplo.

### Aproximaciones al reconocimiento de patrones

Hay varios tipos de aproximaciones, aunque se suelen combinar entre sí
para dar lugar a sistemas híbridos. Todas ellas tienen en común dos
fases:

- Fase de train o aprendizaje
- Fase de clasificación o test.

En primer lugar, para realizar un sistema de reconocimiento de patrones
que nos permita identificar a un individuo por alguna característica
propia debemos disponer de un buen volumen de datos de dicha
característica, haciendo así más grande la probabilidad de crear un
modelo más certero. Ahora bien, fuente fácil de problemas es no tener en
cuenta si dichos datos están o no exentos de variabilidad (ruido
introducido por el sensor, cambios de escala, deformaciones,
rotaciones…) por lo que antes de entrenar el sistema y testearlo, es
importarte limpiar esos datos o tomar alguna decisión con respecto a los
datos afectados (no utilizarlos para entrenar el clasificador, por
ejemplo). Finalmente tras haber entrenado al sistema,se procede a
testearlo, pasándole otro conjunto de datos que representen las
características a analizar,evaluando así la capacidad del reconocedor de
acertar en sus decisiones.

### Extacción de características

En un reconocedor, es muy importante tener en cuenta la extracción de
características (parametrización) a realizar sobre la entrada, esto es,
decidir qué vectores de características usar. Por ejemplo, en imágenes
se puede usar el mapa de bits). Es indudable que el hecho de
parametrizar nos facilita en cierta medida el problema, ya que mediante
ella conseguimos disminuir el número de datos a procesar y transformamos
el espacio de características, siendo más fácil discriminar en él(ver
qué muestras sirven y cuales no).

Problema: determinar los vectores de características más adecuados no es
una tarea trivial.

### Separabilidad entre clases

Si queremos minimizar el error en nuestro sistema biométrico, debemos
procurar que la clasificación de los datos sea lo más certera posible, y
para eso debemos seleccionar el clasificador que nos resulte más
adecuado a nuestros datos(clasificadores distintos, resultados
distintos), eligiendo bien el criterio mediante el cual clasificar.

En la Figura se puede apreciar como las dos clases son
perfectamente separables cuando se usan las dos componentes del vector
(2 dimensiones), pero si reducimos a una dimensión se solapan ambas
clases,resultando imposible separarlas.

<figure>
<a href="/img/separability.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/separability.png" title="Separabilidad de dos clases con vectores
  bidimensionales" alt="Separabilidad de dos clases con vectores
  bidimensionales" width="320px" height="316px" /></a>
</figure>

Es fácil mostrarlo en una imágen cuando tenemos pocas clases, como es
este caso, que tenemos sólo dos. Pero cuando tenemos muchas el problema
se complica. ¿Cómo sabemos si nuestro clasificador lo está haciendo bien
o no? ¿cómo sabemos si una característica es discriminativa? En este
caso se procede a calcular la media discriminativa de la característica,
a partir de la distancia media entre clases y normalizando por la
varianza.

### Introducción a la detección de intrusos usando

Aplicando técnicas biométricas en sistemas de detención de [intrusos](/6-formas-usadas-por-los-cibercriminales-para-robar-o-vulnerar-credenciales-de-login/ "6 formas usadas por los cibercriminales para robar o vulnerar credenciales de login") nos
permite reforzar la seguridad del sistema, por ejemplo, durante la
autentificación, ya que podríamos establecer un perfil de cada usuario
con más detalle, sin tener que preocuparnos de ciertos problemas como
por ejemplo de que estos dejen su contraseña a la vista,la compartan se
la roben…evitando así una posibilidad de ataque que afecte al
rendimiento de un IDS.

Como es evidente, el empleo de biometría no hará imposible que se
produzcan ataques en el sistema, pero al menos permitirá identificar a
cada usuario previamente, mediante los mecanismos de
autentificación/validación, por lo que cualquier mal uso/ataque
provocado por un usuario y detectado por un IDS apuntarán a un usuario
determinado.

Esto está todavía mejorándose, pero ya se habla de que en un futuro se
podrían desarrollar técnicas avanzadas de biometría, como por ejemplo,
reconocimiento mediante ADN.

# Índice

- [Biometría aplicada a la seguiridad - Introducción](/biometria-seguridad-introduccion "Biometría aplicada a la seguiridad - Introducción")
- Biometría aplicada a la seguiridad - Reconocimiento de patrones
- [Biometría aplicada a la seguiridad - Sistemas biométricos](/sistemas-biometricos "Biometría aplicada a la seguiridad - Sistemas biométricos")

# Referencias

- [M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la
seguridad](http://www.amazon.es/gp/product/8478976361/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=8478976361&linkCode;=as2&tag;=bmacoc-21 "M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la
seguridad")
- [C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition](http://www.amazon.es/gp/product/9814656526/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=9814656526&linkCode;=as2&tag;=bmab-21 "C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition")
- [Wikipedia, “Biometría, según wikipedia.”](https://es.wikipedia.org/wiki/
Biometr%C3%ADa "Wikipedia, “Biometría, según wikipedia.”")
- [G. Argentina, “Historia de la biometría.”](http://www.biometria.gov.ar/
acerca-de-la-biometria/historia-de-la-biometria.aspx "G. Argentina, “Historia de la biometría.”")
