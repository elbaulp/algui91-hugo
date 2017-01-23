---
author: luzila
categories:
- articulos
color: '#F57C00'
date: '2016-09-25'
layout: post.amp
mainclass: articulos
permalink: /lo-que-se-viene-en-programacion-funcional-de-java/
tags:
- Elliott Rusty Harold
- haskell
- java 8
- programacion funcional java
title: "Lo que se viene en programaci\xF3n funcional de Java&#8230;"
---

Elliott Rusty Harold <a href="http://cafe.elharo.com/programming/java-programming/why-functional-programming-in-java-is-dangerous/" target="_blank">está anunciando en su blog</a> que la programación funcional en Java es peligrosa. Está equivocado, y ya perdió su turno &#8212; Está viniendo con Java le guste o no.
Un resumen de las razones que menciona en su artículo son:

<!--more--><!--ad-->


1. Java no es un lenguaje de <a href="http://en.wikipedia.org/wiki/Lazy_evaluation" target="_blank">evaluación perezosa</a>. En Java, los programadores pueden enredarse y terminar generando errores con heap y stack.

2. El artículo presenta una implementación simple de código Clojure que al pasarla a lenguaje Java falla en tiempo de ejecución.

3. A partir de esta idea los programadores pueden lograr cosas muy malas, por ello tendríamos que evitarla.

4. Y por último, afirma que es &#8220;peligrosamente ineficiente&#8221; en Java/JVM, reconociendo que no tiene referencias para respaldar esta afirmación, y que de algún modo está ignorando si Clojure y Scala corren en la JVM aparentemente sin problemas.

Esos puntos son básicamente un resumen del artículo.

Mira, como Elliott señala, Java no es Haskell. Ni Lisp. Es su propio lenguaje, basado en una historia imperativa y orientada a objetos, pero no por ello menos apta a incorporar características funcionales dentro de su desarrollo que la aptitud de Lisp para incorporar características de programación orientada a objetos. Sin embargo, si haces sandeces, como intentar regenerar una lista infinita (implícitamente de evaluación perezosa) en Clojure mediante la creación de una lista actualizada que se extiende hasta el infinito&#8230; vas a reventar la JVM. Uh. Ni siquiera el supercomputador en USS Enterprise de dentro de 500 años tendrá la posibilidad de construir esa lista.

Migrar código de un lenguaje a otro no es un ejercicio trivial. Si intentas migrar línea-a-línea y expresión-por-expresión, puedes esperar que tu código traducido no sea idiomáticamente correcto. (Ya lo se, [habiendo hecho la prueba.][1]) La raiz del problema en el código traducido es doble. Por un lado, (el más necio y poco elegante) simula de muy mala forma cómo debería verse una lista infinita en Java &#8212; un comentador hizo un mejor trabajo mostrando cómo un **Iterator** puede crearse para realizar la misma tarea que Haskell, de hecho, ya hace produciendo el valor siguiente bajo demanda, en lugar de intentar crear una lista de **Integers** extendiéndose hasta el infinito. Para alguien que profesa tener experiencia y amor por Haskell, es impactante que Elliott cometa este tipo de error, lo cual genera la impresión de que está intentando crear <a href="http://es.wikipedia.org/wiki/Falacia_del_hombre_de_paja" target="_blank"><em>una falacia del hombre de paja</em></a>. Además asume que cualquiera que programe en Java funcionalmente tendrá que crear todas sus herramientas funcionales a mano, y honestamente, usando Guava o FJ en este caso haría este código ejemplo MUCHO más facil de digerir. El hecho de que ignore ambas en su falacia nuevamente reafirma la idea de que está deliberadamente tergiversando ideas para mostrar su punto.*
*

Su cuestión subyacente parece ser simple: &#8220;Trabajo con malos programadores, que no parecen entender cómo escribir código funcional en Java sin enredar todo.&#8221; Hermano, estás en la peor&#8230; &#8220;Los malos programadores removerán cielo y tierra para hacerlo mal.&#8221; -Glenn Vanderburg.

Pero lo que es realemente patético es que esas funcionalidades vienen en Java 8, incluyendo expresiones lambda y soporte de librerías incluyendo una interface Stream para precisamente permitir que este tipo de código sea escrito sin dolor. Esos programadores con los que Elliott está trabajando van a estar incluso más exitados por usar sus funcionalidades (y todas las ventajas asociadas por hacerlo, incluyendo composición y mucho más) en su código Java. Lo que puede hacer a Elliott más feliz es que al menos él no tendrá que haberlo escrito; va a estar escrito por personas más inteligentes que cualquiera.

&nbsp;

#### Referencias

*DZone* »» <a href="http://java.dzone.com/articles/functional-programming-java-%E2%80%93" target="_blank">On Functional Programming in Java – It's Coming...</a>



 [1]: http://blogs.tedneward.com/2012/12/21/Envoy+In+Scala+JavaScript+And+More.aspx