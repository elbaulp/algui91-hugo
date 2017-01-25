---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2016-08-12 07:06:02
description: "Un grupo de investigadores ha conseguido acceder y moficar los p\xEDxeles
  de una pantalla"
image: Hackeando-Tu-Monitor-De-Pantalla.jpg
introduction: "Un grupo de investigadores ha conseguido acceder y moficar los p\xEDxeles
  de una pantalla"
lastmod: 2016-08-15
layout: post.amp
mainclass: articulos
tags:
- seguridad
title: Hackeando Tu Monitor De Pantalla
twitter_text: null
---

<figure>
  <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Hackeando-Tu-Monitor-De-Pantalla.jpg" alt="{{ title }}" title="{{ title }}" width="800px" height="400px">
  </amp-img>
  <figcaption>Imagen: Lorenzo Franceschi-Bicchierai/Motherboard</figcaption>
</figure>

***

En el blog de [Bruce Schneier]() he leido esta interesante noticia que os traduzco:

> Un grupo de investigadores ha encontrado la forma de hackear directamente el pequeño ordenador que controla el monitor de la pantalla sin acceder directamente al ordenador en sí (Lo que entendemos por la torre, el portatil etc). Tanto el mini ordenador de la pantalla como el ordenador, ven los píxeles que se muestran por pantalla -- por tanto es posible espiar lo que el usuario hace -- así como manipular los píxeles y mostrar imágenes diferentes.

<!--more--><!--ad-->

_Cui_, el científico que trabaja en _Reb Ballon [Security](/categories/security-now/ "Articulos de seguridad")_ y Doctor por la Universidad de Columbia, presentó su investigación en la __Def Con__ de este año.

El hack funciona del siguiente modo: Si el hacker consigue que pinches en un enlace malicioso, o que visites una web, puede atacar el ordenador embebido en la pantalla, más en concreto su _firmware_. Este mini ordenador es el que controla el menú de la pantalla, donde ajustamos el brillo etc.

Para hacerlo funcionar, es necesario subir un pequeño programa al monitor para que espere a recibir instrucciones. Una vez que el programa está instalado, la forma de comunicarse con él es a través de un píxel. Es decir, el programa esperará recibir instrucciones de un pixel que parpadee. Dicho pixel puede estar incluido en cualquier video o imagen. En esencia, el píxel está subiendo código al monitor.

_Cui_ dice que esto podría servir para espiar, pero también para mostrar en la pantalla cosas que no deberían estar. Por ejemplo, en un monitor que controla una planta nuclear, podría mostrarse una imagen falsa que indique que hay una emergencia falsa.

Los investigadores alertan de que esta vulnerabilidad puede afectar a más de mil millones de monitores.

Sin embargo, el ataque tiene un problema, es excesivamente lento. Quizá no sea práctico para atacar ordenadores domésticos, pero sí monitores de control industrial, en los cuales las pantallas suelen ser estáticas.

# Referencias

- [motherboard.vice.com](https://motherboard.vice.com/read/hackers-could-break-into-your-monitor-to-spy-on-you-and-manipulate-your-pixels "Hackers Could Break Into Your Monitor To Spy on You and Manipulate Your Pixels")
- [schneier.com](https://www.schneier.com/blog/archives/2016/08/hacking_your_co.html "Hacking Your Computer Monitor")
- Imagen via Lorenzo Franceschi-Bicchierai/Motherboard
