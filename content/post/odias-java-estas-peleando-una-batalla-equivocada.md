---
author: alex
categories:
- articulos
date: '2016-01-01'
lastmod: 2017-07-19T14:29:53+01:00
mainclass: articulos
url: /odias-java-estas-peleando-una-batalla-equivocada/
tags:
- cobol
- java
- mainframes
title: "¿Odias Java? Estás peleando una batalla equivocada"
---

<figure>
    <amp-img sizes="(min-width: 460px) 460px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/java1.jpg" alt="" title="java" width="460px" height="349px" />
</figure>

Una de las más interesantes tendencias que se ven ultimamente es la impopularidad de Java en los blogs, foros y otros. Pareciera que la gente está ofendida hasta incluso a nivel personal, cuando se sugiere a Java como el lenguaje superior en la web 2.0.

Java ha sido ampliamente exitoso por varias razones:

- Es extensamente aceptado en las compañías establecidas
- Es uno de los lenguajes más rápidos
- Es uno de los más seguros
- Las primitivas de sincronización están incorporadas en el lenguaje
- Es independiente a la plataforma
- Hotspot es open source
- Existen miles de vendedores para una gran cantidad de productos Java
- Existen miles de librerías open source para Java
- Tiene un gobierno comunitario vía JCP (pre-Oracle)

Estos son aspectos importantes en cualquier lenguaje, y se nota, ya que Java ha disfrutado de una larga racha de ser uno de los lenguajes más populares. Entonces, ¿por qué entre el 2010 y 2011, Java se volvió repentinamente el demonio más odiado?

<!--more--><!--ad-->


1. Está de moda odiar Java
2. La sintaxis estilo C ya no está de moda
3. El odio por Oracle está siendo estimulado por la promoción de los intereses individuales
4. La gente ha tenido que enfrentarse con código realmente malo, escrito en Java
5. *&#8230; Inserte las próximas cien razones aquí.*

Java (el lenguaje y las APIs) tiene algunos problemas reales&#8230; demasiados como para listarlos aquí (una mezcla de tipos nativos y tipos de objetos, una gran cantidad de APIs abandonadas, uso inconsistente de excepciones checkeadas). Pero no nos vayamos por las ramas&#8230; Discutamos el problema real y no nos focalicemos en nimiedades. Entonces, ¿cuál es el verdadero problema en esta industria? Java, con sus faltas, ha conquistado completamente la programación web. Al margen, nuevos lenguajes están siendo inventados tan rápido como se imaginan, para también conquistar la programación web. La batalla se dio a lugar, y nos quedamos con lo que pareciera una disputa callejera de adolescentes que se enfrentan a través del break-dancing. Y mientras todo el mundo está discutiendo entre PHP o Rails 3.1 cuál es más rápido y puede responder a más peticiones simultáneas, se esconde un elefante silencioso en la sala, que se está riendo en voz baja mientras se discuten argumentos infantiles sobre sintaxis y tiempos de ejecución.

Sigamos.

¿Qué tienen en común las siguientes acciones?

  * Pagar con tarjeta de crédito.
  * Ir a una guardia de emergencias.
  * Pagar la jubilación
  * Usar la tarjeta de tu cobertura médica en el dentista.
  * Ir de shopping para conseguir el mejor seguro de auto.
  * Un tren de BNSF remolcando un coche de Union Pacific.
  * Transferir dinero entre bancos.
  * Llenar una receta médica

Todas las industrias mencionadas son jugadores de miles de millones de dólares en nuestra economía.
A día de hoy, muchas de estas industrias siguen escribiendo sus programas en COBOL, FoxPro y ensamblador para mainframes.

Por alguna razón, COBOL, inventado en 1959, sigue usándose para crear aplicaciones hoy día. ¡En serio! No estamos hablando de mantener unas pocas líneas de código aquí o allá, hablamos de miles de **nuevas** líneas, cada día, para implementar nuevas funcionalidades y nuevos requerimientos. Estas industrias son esenciales; forman los ladrillos de nuestra economía. A pesar de ello, no innovan y por ello acarrean gastos masivos a raíz de las nuevas tendencias tecnológicas. Los costos de poner en marcha negocios son enormes, y un buen porcentaje de ellos corresponde a IT.

¿Qué tanto? Hablemos sobre licencias de mainframes, por ejemplo. Digamos que compras un versión Enterprise de MongoDB y la pones en una caja. Luego procedes a colapsar la CPU haciendo una transacción tras otra a la base de datos&#8230; La siguiente semana, te vas de vacaciones, y dejas a MongoDB levantada sin hacer nada. ¿Cuánto costará MongoDB en ambas semanas? Lo mismo.

La licencia del software de mainframes es muy diferente. Supongamos que compras tu mainframe por un par de millones y compras una base de datos para él. Luego pasas toda la semana saturando la CPU(s) con peticiones a la base de datos. Revisas tu email, y tienes una factura de un millón de dólares del vendedor de la base de datos. Un momento, yo compré el hardware, ¿por qué tengo que pagar otra factura? El software en un mainframe es generalmente cobrado por su uso, o por cuántos ciclos de CPU gastas usándolo. Si usas 2000000 ciclos de cpu corriendo la base de datos, terminarás debiéndole 2000 euros al vendedor. ¿Bizarro? ¡Absolutamente!

Estas industrias invisibles que utilizas cada día están llenas de sistemas engordados y heredados, y de altos costos. Java se propone conquistar muchos frentes, y mientras se mete a fondo en el terreno de las aplicaciones web, se está distrayendo respecto a la computación centralizada. Estas industrias se siguen quedando con sus sistemas heredados porque no creen que Ruby, Python, Scala, Lua, PHP o Java puedan manejar la carga, la escalabilidad, o los requerimientos en tiempo que sus sistemas ya proveen. Esto dista mucho de ser cierto, pero repito, no ha habido innovación en este área en los últimos 15 años, a pesar de que el progreso de la tecnología web viene dando un salto galáctico.

Probablemente la semana próxima alguien invente un nuevo DSL que haga Twitter más fácil de usar, pero tu banco estará desarrollando nuevo COBOL o FoxPro para transferir fondos a otro banco de forma más eficiente. Nos complicamos a nosotros mismos con nuestros propios argumentos. Hay una economía entera que necesita ver los beneficios de la computación distribuida, pero si la guerra continúa, seguimos perdiendo. Dejemos estos argumentos ridículos, levantemos la bandera de la paz, y conquistemos algunos de estos gigantes.

# Referencias

- *The Code Mechanic* »» <a href="http://thecodemechanic.wordpress.com/2011/05/30/hate-java/" target="_blank">Visitar sitio</a>
