---
author: alex
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-10-08T19:14:03+01:00
description: "¿Qué pasaría si pudieras poner algunas células bacterianas  en un dispositivo USB, conectarlo a su laptop, y obtener una secuencia completa  de ADN en cuestión de minutos?"
url: /se-puede-realmente-secuenciar-adn-con-un-dispositivo-usb/
tags:
- usb
title: "¿Se puede realmente secuenciar ADN con un dispositivo USB?"
---

<figure>
    <img sizes="(min-width: 600px) 600px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/05/Oxford-Nanopore-MinION1.jpeg" alt="" title="Oxford-Nanopore-MinION" width="660px" height="440px" />
</figure>

¿Qué pasaría si pudieras poner algunas células bacterianas en un dispositivo USB, conectarlo a su laptop, y obtener una secuencia completa de ADN en cuestión de minutos?

<!--more--><!--ad-->

Oxford Nanopore ha construido un dispositivo USB que hará precisamente eso. Al menos eso es lo que dice la compañía. Conocido como MinION, el dispositivo recibió una considerable cantidad de prensa cuando fue anunciado en Febrero, y está previsto para ser lanzado al mundo en general en la segunda mitad del año. Sin embargo muchos siguen siendo escépticos de que este pequeño dispositivo cumplirá realmente la función para lo que fue diseñado.

&#8220;Si [las declaraciones] son ciertas, deberíamos comprarlo mañana&#8221;, dijo Jonathan Eisen, profesor de microbiología en la Universidad de California en Davis. &#8220;Pero me reservo la opinión. Hemos escuchado muchas presentaciones de empresas, donde estas cosas no son como se esperaban&#8221;.

Clive Brown, director de tecnología de Oxford, comenta a Wired que el Minion funciona como se anuncia. Se pone un puñado de células lisadas - células cuyas membranas han sido disueltas - en un recipiente pequeño integrado en el disco USB. Luego se enchufa la unidad a una PC normal. Y dependiendo de la longitud del ADN en esas células, se obtendrá una secuencia completa entre pocos minutos o unas horas. El dispositivo - que se utiliza una vez y se desecha - es el resultado de siete años de investigación, dice Brown, y se vende por $ 900.

Por Eisen, el costo por sí solo haría del MinION una clave estratégica para el cambio . Pero también es atractivo porque es portátil. Eisen dice que con un dispositivo como el MinION, los investigadores de campo tendrían la posibilidad de secuenciar a su alcance en todo momento, tanto si están en una remota montaña en algún lugar o en el mar mirando a la proliferación de algas. &#8220;Esto realmente sería la democratización de la secuenciación&#8221;, dice. &#8220;Cualquier persona en cualquier entorno de investigación podría considerar hacer una secuenciación a gran escala en su proyecto&#8221;.

Pero todavía quiere verlo en acción antes de decir algo más.

En la investigación biológica, el orden de los bloques de construcción de ADN de cuatro pares - llamados* pares base* - es esencial para entender los mecanismos subyacentes de la existencia de un organismo. La abreviatura de ácido desoxirribonucleico, el ADN - junto con un conjunto de moléculas soporte - dicta las estructuras de las proteínas y el desarrollo de cada criatura en el planeta. La longitud de la cadena de ADN varía según el organismo - en un rango determinado entre miles de pares de bases para las bacterias y miles de millones para los mamíferos - por lo tanto las herramientas que leen rápidamente este manual de instrucciones moleculares son imprescindibles para la investigación biológica.

El mercado de la secuenciación del ADN está superpoblado. Empresas como Sequetech externalizan el servicio, Illumina construye máquinas de gran tamaño que se ubican al lado de una mesa de laboratorio, e Ion Torrent, una filial de Life Technologies, pronto lanzará un secuenciador de mesa que leerá (según anuncian) todo el genoma humano - aproximadamente tres billones de pares base - en un día. Pero de todos modos Oxford es el primero en poner este tipo de dispositivos en una laptop común y corriente.

La empresa hace uso de &#8220;*nanoporos*&#8221; - es decir, agujeros muy pequeños. Los investigadores toman una muestra biológica y la inyectan en una memoria USB. El ADN de la muestra pasa a través de cientos de esos pequeños agujeros, y a medida que pasan, sensores eléctricos van leyendo los pares base de ADN.

Cada par base tiene una forma ligeramente diferente y una carga, y genera una señal diferente para el sensor. Estas señales ingresan a un procesador especializado- conocido como ASIC (&#8220;application specific integrated circuit&#8221;: circuito integrado de aplicación específica) - que se encuentra en los nanoporos. Oxford se asoció con un contratista del Departamento de Defensa en San Diego para construir este chip, pero nunca sabemos quién fue este socio. El truco es que el chip puede procesar información de los nanoporos en paralelo. Hay un circuito para cada nanoporo.

De acuerdo con Clive Brown, director de tecnología de Oxford, el proceso es como una especie de juego de Hungry Hippo. Después de que un investigador inserta unamuestra de ADN, cada nanoporo lo engulle tan rápido como les sea posible, independientemente del nanoporo que le sigue. Brown dice que hoy en día cada nanoporo envía cerca de 33.000 mediciones por segundo. La primera versión de minION tendrá un solo chip ASIC con 512 circuitos y 512 nanoporos, pero comenta además que es probable que se agregue un segundo chip a la siguiente iteración.

La ventaja de este proceso en paralelo de ADN es que la bioinformática - el análisis real del orden y la concentración del ADN - puede realizarse en tiempo real. Otros secuenciadores de ADN funcionan de forma ligeramente diferente, identificando cada base de a una, pero el MinION mide largos fragmentos en simultáneo, de modo que una imagen completa de franjas enteras de ADN se pueden formar de una vez. Si se está buscando un gen en particular, se puede detener la ejecución del análisis cuando se presenta, en lugar de esperar a que termine toda la secuencia.

En muchos casos, los investigadores toman muestras de ADN que tienen una gran cantidad de &#8220;ruido&#8221; o ADN contaminante. Ya sea que se estén tomando muestras de agua del estanque o la barandilla del metro, siempre hay ADN extra flotando alrededor que difumina la secuencia que en realidad se está buscando. El ruido es un factor contaminante para tener en cuenta, pero un segundo factor relevante viene directamente desde el propio sensor, ya que la medición de la cinta registradora de las bases que pasan no es una ciencia exacta todavía. Pero de acuerdo con Brown, un pequeño arreglo de compuertas programables atenúa un poco de ruido, logrando un factor de reducción aproximado de 100.

Los datos luego fluyen a través de USB hacia una computadora, donde la aplicación personalizada de Oxford toma los fragmentos digitales de ADN y reensambla las piezas para obtener nuevamente una secuencia útil. Oxford se asoció con una compañía de software llamada Accelrys para volver a trabajar el constructor de flujo de trabajo visual de la compañía, Pipeline Pilot, para usar con la secuenciación del ADN. En Pipeline Pilot los datos conforman la entrada de una serie de algoritmos programables que devuelven el resultado de su análisis. Oxford y Accelrys tomaron miles de bibliotecas de algoritmos bioinformáticos que existen en el dominio público y las conectaron a Pipeline Pilot.

Diferentes laboratorios usan diferentes principios bioinformáticos, por lo tanto la capacidad de reordenar las diferentes herramientas es muy necesario. Esto además permite que otros investigadores repliquen otros trabajos, para que puedan ver *exactamente* lo que otros hicieron - cada ejecución es exportable a un archivo XML - y luego hacerlo ellos mismos.

Oxford percibe al dispositivo utilizado simplemente como un simple investigador, eliminando la necesidad de comprar equipamiento grande o contratar personal que entienda el meollo de la bioinformática. &#8220;Optimiza la infraestructura IT existente&#8221;, afirma Gordon Sanghera, director general de Oxford Nanopore. &#8220;No es necesario gastar medio millón de dólares en un instrumento.&#8221;

Greg Lucier - el CEO de Life Technologies, un competidor en el juego de secuenciación de ADN - cuenta a Wired que si bien su empresa investiga la tecnología de nanoporos, no cree que se trate de una forma práctica para manejar la secuenciación del ADN, ya que no puede proporcionar la clase de precisión que se obtiene de sistemas mayores. &#8220;No hay manera de que un ordenador standard pueda hacer ese tipo de procesamiento&#8221;, dice.

Lo sabremos con seguridad a fines de este año.

[Actualizaciones: Se ha actualizado esta historia para aclarar lo relativo al sensor y los mecanismos de reducción de ruido del dispositivo nanoporos. El modelo de negocio de Sequetech se mejoró. &#8220;Pipeline&#8221; fue cambiado a &#8220;*Pipeline Pilot*&#8220;.]


- Fuente: [Wired][2]

 [1]: https://elbauldelprogramador.com/img/2012/05/Oxford-Nanopore-MinION1.jpeg
 [2]: http://www.wired.com/wiredenterprise/2012/03/oxford-nanopore-sequencing-usb/ "Wired"
