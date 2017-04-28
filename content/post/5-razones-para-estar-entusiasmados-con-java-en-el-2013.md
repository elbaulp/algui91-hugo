---
author: luzila
categories:
- articulos
date: '2016-01-01'
description: "Un tema obvio para comenzar para la mayoría de los desarrolladores
  Java, es la *release* del 2013. Asumiendo que no habrá demoras, podemos esperar
  que Java 8 llegue en Septiembre, trayendo consigo muchas funciones lambda esperadas."
mainclass: articulos
url: /5-razones-para-estar-entusiasmados-con-java-en-el-2013/
tags:
- java 8
- java en 2013
- noticias java
- novedades java
title: 5 Razones para estar entusiasmados con Java en el 2013
image: 2012/12/java1-300x227.jpg
lastmod: 2017-01-28
---

Habiendo terminado el 2012, es tiempo de mirar hacia los próximos 12 meses en el mundo del desarrollo. Luego de leer <a href="http://jaxenter.com/what-will-2013-bring-developers-place-their-bets-45933.html" target="_blank">este interesante artículo</a> sobre las predicciones de algunos respetados desarrolladores, presentamos cinco sencillas razones por las cuales debes entusiasmarte con lo que traerá el 2013&#8230;

# 1. Java 8

Un tema obvio para comenzar para la mayoría de los desarrolladores Java, es la *release* del 2013. Asumiendo que no habrá demoras, podemos esperar que Java 8 llegue en Septiembre, trayendo consigo muchas funciones lambda esperadas.

Es bastante probable que en el período inmediatamente siguiente a la salida de Java 8, veamos publicaciones en blogs tanto sobre quejas por la complejidad de las nuevas características como porque estas mismas no son lo suficientemente importantes como para justificar su interés.

<!--more--><!--ad-->

De cualquier manera, algunas características muy necesarias que estaban demoradas finalmente aparecen y tendremos que ponernos a trabajar en serio. La mejorada API de Date and Time en Java 8 también merece una mención.

# 2. Los lenguajes de la JVM van un paso adelante

El 2012 fue realmente el año en que los lenguajes para la JVM tomaron un papel principal. Liderando el grupo se econtró el multi-paradigma Scala, cosechando <a href="http://www.scala-lang.org/node/1658" target="_blank">impresionantes clientes empresariales</a> gracias a la inversión en Typesafe. Extendiendo las posibilidades con Akka y Play 2.0!, parece ser que las fundaciones están focalizadas en avanzar más en el 2013. El desafío real es vender Scala a todos aquellos que no necesiten algo pesado.

Dynamic Groovy no se quedó atrás el año pasado, agregando compilación estática en el mix con Groovy 2.0. Una versión principal se espera poco después de Java 8 para que los desarrolladores Groovy puedan aprovechar al máximo las nuevas características. El equipo de soporte, incluyendo Gradle y Grails, podría ser un gran atractivo para aquellos que buscan una alternativa a Java que no se aleje demasiado.

No hemos mencionado las bondades de Clojure, JRuby y <a href="http://kotlin.jetbrains.org/" target="_blank">Kotlin</a>; este último con mucho trabajo ya que está cercano a su versión final. En última instancia, el éxito se reduce a una comunidad activa, la cual muchos lenguajes de la JVM se han percatado, y los proyectos derivados de esa comunidad.

Si el 2012 fue el despegue, el 2013 es la consolidación en los círculos empresariales, lo cual es un incentivo para que los desarrolladores utilicen el lenguaje.

# 3. La importancia en aumento de JavaScript en Java

Los detalles fueron delgados en el terreno de las nuevas iniciativas en OpenJDK para la mayor parte del 2012, pero llegando a fin de año, habíamos aprendido un poco más acerca de los objetivos de cada proyecto y su importancia para la innovación en Java.

El nuevo set del motor JavaScript a incluir en Java 8 integrará <a href="http://mail.openjdk.java.net/pipermail/announce/2012-November/000139.html" target="_blank">JavaScript dentro de las aplicaciones Java</a>. El <a href="http://openjdk.java.net/projects/nashorn/" target="_blank">Proyecto Nashorn </a>cimienta la noción del resurgimiento de Javascript e incluso mayor relevancia para los desarrolladores Java.

Iniciado en secreto, Nashorn fue liberado en Noviembre y apareció en el repositorio OpenJDK<a href="https://blogs.oracle.com/nashorn/entry/open_for_business" target="_blank"> cuatro días antes de Navidad</a>. Otro gran punto extra para Nashorn es la inclusión crucial del extendidamente popular node.js dentro de lo pactado, marcando el comienzo de un futuro políglota. Con muchos más detalles prometidos, estaremos monitoreando, esta vez, con ojos de águila.

# 4. Sacando más partido de tu inversión - Aprovechando la GPU

Otro proyecto en OpenJDK que tiene un gran potencial es <a href="http://openjdk.java.net/projects/sumatra/" target="_blank">Sumatra</a>, con el objetivo de potenciar un mayor rendimiento de Java utilizando la GPU. Las investigaciones iniciales están focalizadas en la JVM Hotspot para asentar las bases, antes de &#8216;apuntalar&#8217; las librerías de Java 8 y las características propias del lenjuaje como *lambdas *para testear las técnicas que utilizan las últimas vanguardias de Java.

El proyecto, liderado por un especialista AMD en GPU, espera encontrar algunos obstáculos en el camino con la API de Java y sus construcciones, por lo tanto no veremos las ideas implementadas en Java 8, pero Sumatra puede liderar algunos grandes avances y nuevas técnicas en la línea del desarrollo.

# 5. Java entra más en profundidad en la nube

Con docenas de opciones para IaaS y PaaS que inundan el mercado, desde indies como Jelastic y gigantes de la industria como Oracle y AWS, los desarrolladores estan repletos de opciones. Java, al parecer, ha realizado con éxito el salto al nuevo mundo de &#8220;la nube&#8221;.

El mayor problema del momento, como resalta Martijn Verburg en el blog J<a href="http://www.javaadvent.com/2012/12/java-2012-review-and-future-predictions.html" target="_blank">ava Advent Calendar</a>, es la falta de estandarización y optimización. Con las características de la nube propias de Java, <a href="http://jaxenter.com/oracle-pushes-cloud-features-back-to-java-ee-8-44301.html" target="_blank">diferidas en Java EE 8</a>, es ahora cuestión de los proveedores el hecho de facilitar estándares como <a href="http://jaxenter.com/round-the-campfire-talking-paas-standards-with-oracle-cloudsoft-and-cloudbees-44571.html" target="_blank">CAMP</a> o, en su defecto, a la comunidad para que brinden nuevos frameworks universales como <a href="http://www.jclouds.org/" target="_blank">jclouds</a>. Mientras tanto, otros se niegan a esperar pacientemente que Oracle provea características como capacidad multiusuario y recolección de basura (*garbage collection*) eficiente, como Waratek.*
*

Con plataformas en la nube convirtiendose rápidamente en la norma, es probable que veamos el lanzamiento de aún más soluciones tercerizadas para soporte de Java en la nube: con Java EE 8 próximamente entre nosotros  (posiblemente 2014), tal vez ni siquiera lo necesitemos. (Elliot Bentley)

# Referencias

- 5 Reasons to be excited about Java in 2013 | [jaxenter.com](http://jaxenter.com/5-reasons-to-be-excited-about-java-in-2013-45938.html "5 Reasons to be excited about Java in 2013")
