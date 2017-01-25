---
author: alex
amp:
  elements: [amp-youtube]
categories:
- security now
color: '#00BCD4'
date: 2016-08-20 05:06:16
description: "Los Nuevos Discos OptaneTM y 3D NAND Con Tecnolog\xEDa 3D XPoint De
  Intel Reemplazar\xE1n a Los SSDs"
image: IntelAnunciaSusNuevosDiscosDuros1000VecesMasRapidosQueLosSSDs.png
introduction: "Los Nuevos Discos OptaneTM y 3D NAND Con Tecnolog\xEDa 3D XPoint De
  Intel Reemplazar\xE1n a Los SSDs"
layout: post.amp
mainclass: security-now
url: /optanetm-3d-nand-tecnologa-3d-xpoint-intel-ssds/
redirect_from: /security now/optanetm-3d-nand-tecnologa-3d-xpoint-intel-ssds/
tags:
- Intel
- optane
- 3D XPoint
- ssd
title: "Intel Anuncia Sus Nuevos Discos Duros, 1000 Veces M\xE1s R\xE1pidos Que Los
  SSDs"
---

> En un artículo anterior hablamos de [Cómo Intel Va a Acabar Con Los Buffers Overflows Con Control-Flow Enforcement](/intel-buffer-overflow-control-flow-enforcement-technology-cet/ "Cómo Intel Va a Acabar Con Los Buffers Overflows Con Control-Flow Enforcement"). Hoy Intel vuelve a ser noticia, hace unos días en el episodio #573 de [Security now!](/categories/security-now/ "Todos los artículos de Security Now!") Steve habló de una nueva tecnología que ha creado Intel junto con Micron. Se llama __3D XPoint__ y con ella han creado dos tipos de discos duros 1000 veces más rápidos que los SSDs.

A continuación se proporciona un resumen:



## Características de la nueva memoria 3D XPoint™

<!--more--><!--ad-->

- __1000__ veces __más rápida__ que las NANDs. La latencia de las NANDs se mide en decenas de __microsegundos__, 3D Point en decenas de __nanosegundos__.
- __1000 veces más resistencia__ que las NANDs.
- __10 veces más densa__ que las memorias convencionales.
- __No volátil__, Memoria no volátil (_NVM_) es la nueva era de las memorias en los ordenadores, manteniendo los datos incluso después de que el ordenador se apague. Ejemplos de memorias no volátiles: 3D NAND, SSDs, y la tecnología 3D XPoint™.

## 3D XPoint solventa la poca durabilidad de los SSDs

Con esta tecnología, que Intel pretende sacar al mercado __en 2016__, se acaba con un gran problema que tienen los SSDs, su poca durabilidad. Los 3D XPoint acabarán por reemplazar a los SSDs en poco tiempo.

El problema con los SSDs (Que son memoria NAND), es que se van varando electrones en una pequeña isla que está flotando con el aislante debajo. La forma de escribir en un SSD es crear un campo electroestático lo suficientemente potenten como para superar al aislante y que los electrones fluyan a través de él.

Este proceso crea una fatiga en las propiedades físicas del aislante. Esta es la razón por la que escribir en dispositivos de memoria flash es costoso y causa daños a la larga. Algo que los discos duros convencionales no sufren. Esta nueva tecnología de [Intel](/tags/intel), __3D XPoint__ no sufre de este problema. Además es __10 veces más denso__ que la __DRAM__.

## Static RAM (SRAM) o RAM estática

La memoria RAM estática o _SRAM_ es como los [registros del procesador](/introduccion-los-procesos/), las _SRAM_ son inversores de acoplamiento cruzado. El problema que tiene este tipo de memoria es que requiere de muchos transistores, y éstos requieren de espacio físico y energía. También producen calor. Sin embargo son bastante rápidas. Como desventaja es que son volátiles, en cuanto no se les suministra energía los datos que almacenan se pierden.

## Dynamic RAM (DRAM) o RAM dinámica

Como mejora a la _SRAM_ se creó la _DRAM_, que reducía la complejidad de la _SRAM_ a un solo transistor y un condensador. _DRAM_ almacena la información en el condensador. El problema de estos condensadores es que tienen que ser diminutos para poder colocarlos en un espacio pequeño. La desventaja de _DRAM_ es que hay que refrescar los condensadores periódicamente para que no pierdan la información almacenada, y hay que hacerlo con la suficiente frecuencia para no darle tiempo al condensador a que se descargue. También es volátil.

## Memorias 3D XPoint

Estas nuevas memorias usan una tecnología de cambio de fase. Imaginemos un conjunto de conductores dispuestos horizontalmente, colocamos pequeños puntos de cosas en dichos conductores horizontalmente. Después, en la parte superior colocamos una rejilla de conductores verticalmente de forma que intersequen con los conductores horizontales en el punto X, de ahí el nombre __XPoint__. La siguiente imagen ayuda a visualizarlo:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/IntelAnunciaSusNuevosDiscosDuros1000VecesMasRapidosQueLosSSDs.png" alt="{{ title }}" title="{{ title }}" width="1289" height="1035">
</amp-img>
    <figcaption>Créditos de la imagen: <a href="http://www.intelsalestraining.com/infographics/memory/3DXPointc.pdf" target="_blank">Intel</a></figcaption>
</figure>

En cada intersección hay una sustancia que las separa. Lo que han conseguido es hacer pasar corriente a través de esta sustancia que cambia su resistencia permanentemente. Por lo tanto, si se envia un pulso de corriente en una dirección, su resistencia decáe. Por contra, al enviar la corriente en el sentido contrario, la resistencia aumenta. Esto se conoce como _bulk change_ (_Cambio en masa, o cambio masivo_) y significa que el material al completo cambia su propiedad. Además es muy estable y __no-volátil__.

## De donde viene el nombre 3D

Después de la descripción dada, uno puede imaginar de dónde sale el nombre __3D__. Lo que hemos descrito es solo una capa, pero si vamos poniendo capas una encima de otra, apilándolas de forma que se aumenta la eficiencia enormemente.

## Bulk storage (Almacenamiento en masa)

Hasta ahora, los dispositivos de almacenamiento a los que estamos acostumbrados formaban una pirámide jerárquica. Siendo los discos duros los más lentos, pero con más capacidad, hasta la memoria caché del microprocesador (L1, L2 etc), la más rápida pero con menor capacidad. Esta tecnología se situa justo debajo de la _DRAM_, como mostramos en la siguiente imagen:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/IntelAnunciaSusNuevosDiscosDuros1000VecesMasRapidosQueLosSSDs2.png" alt="{{ title }}" title="{{ title }}" width="1264" height="672"></amp-img>
    <figcaption>Imagen cortesia del <a href="https://www.youtube.com/watch?v=gMwz1eWQzno" target="_blank">vídeo de Intel</a></figcaption>
</figure>

## Propiedades de 3D XPoint

Lo más impresionante de esta nueva tecnología es que es de __acceso aleatorio__, de __alta densidad__ y __no volátil__. Lo cual significa que tendremos velocidades similares a __DRAM__ pero sin perder la información al apagar el PC.

## Conclusión

Con esta nueva tecnología, en unos meses no tendremos que decir _“Me he comprado un PC con 8GB de RAM”_, simplemente diremos  _“Me he comprado un ordenador con 20TB de almacenamiento __XPoint__”_.

De aquí a unos 5/10 años, seguramente los SSDs __Optane__ de Intel hayan reemplazado a los __SSDs__ de hoy día.

¿Qué te ha parecido esta nueva tecnología? Déjanos un comentario con tu opinión.


<figure>
    <amp-youtube
        data-videoid="gMwz1eWQzno"
        layout="responsive"
        width="480" height="270"></amp-youtube>
</figure>


### Referencias

<figure>
    <amp-youtube
        data-videoid="sjXZitLTwyg"
        layout="responsive"
        width="480" height="270"></amp-youtube>
</figure>

- 3D XPoint™ Unveiled—The Next Breakthrough in Memory Technology. [intel.com](http://www.intel.com/content/www/us/en/architecture-and-technology/3d-xpoint-unveiled-video.html "3D XPoint™ Unveiled—The Next Breakthrough in Memory Technology")
- Introducing Breakthrough Memory Technology. [intel.com](http://www.intel.com/content/www/us/en/architecture-and-technology/non-volatile-memory.html "Introducing Breakthrough Memory Technology")
