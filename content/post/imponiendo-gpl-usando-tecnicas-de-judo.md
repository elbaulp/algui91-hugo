---
author: alex
categories:
- articulos
- opensource
color: '#F57C00'
date: '2016-12-12'
lastmod: 2016-08-13
layout: post.amp
mainclass: articulos
permalink: /imponiendo-gpl-usando-tecnicas-de-judo/
redirect_from: /opensource/imponiendo-gpl-usando-tecnicas-de-judo/
tags:
- gpl
- licencias GPL
- software libre
title: "Imponiendo GPL usando t\xE9cnicas de Judo"
---

*&#8220;En judo, el objetivo es aprovechar el impulso del atacante para defenderse, y eso es exactamente lo que hace el copyleft&#8221;*

El propósito del software libre es hacer que el código que corre en las máquinas que gobiernan nuestras vidas sea transparente. En palabras de Lawrence Lessig, el software libre es &#8220;libre en el sentido de que el control del código de desarrollo sea transparente para todos, y que cualquier persona tenga el derecho de tomar ese control, y modificarlo si él o ella cree conveniente.&#8221;

El mecanismo por el cual el software libre logra esto es el copyleft. El copyleft es un hack en el copyright (la ley de derechos de autor) que le quita los derechos exclusivos al titular del copyright y los comparte con el usuario, otorgándole el derecho de modificar, copiar, compartir y redistribuir el software, bajo la condición de que deben transferirse los mismos derechos a usuarios subsiguientes. &#8220;Si uno usa y adapta un programa de software libre, y luego libera esa nueva versión adaptada para el público, debe ser tan libre como la versión original&#8221;.

La GPL promueve los derechos del usuario, pero los defensores de esos derechos son los propietarios del copyright, que pueden ser los desarrolladores originales o cualquier otro organismo al que se le haya otorgado la propiedad del copyright. El beneficio para el titular del copyright es que el código está disponible para ser modificado y se puede retroalimentar progresivamente. El usuario gana dado que el código es transparente, y puede ser adaptado para mayores usos.

Bradley Kuhn toma una analogía de las artes marciales, y dice que &#8220;copyleft es una toma de judo sobre el copyright &#8220;. En el judo, el objetivo es aprovechar el impulso del atacante para defenderse, y eso es exactamente lo que hace copyleft. Mientras la ley de copyright se vuelve cada vez más y más amplia, el copyleft se sirve de ese impulso y lo devuelve con la misma fuerza. Por lo tanto el copyleft es siempre tan fuerte como el copyright. &#8221;



## Los infractores

El software libre permite el acceso al trabajo de miles de programadores, es relativamente libre de costo, y elimina la necesidad de reinventar la rueda una y otra vez. Compartir el código es útil para todos, al menos en teoría.

Sin embargo, la aplicación del copyleft depende de la voluntad de los proveedores de software GPL para cumplir con los términos de la licencia, y/o la voluntad de los titulares del copyright para actuar en defensa de la GPL. Y por diversas razones los términos de la GPL son a menudo ignorados por los distribuidores de software libre y los titulares del copyright no siempre están dispuestos a involucrarse.

<!--more--><!--ad-->

El único requisito de la GPL es que el código fuente sea accesible a los usuarios finales, pero este requisito se olvida con frecuencia, especialmente cuando el código se reutiliza en el firmware y dispositivos embebidos.

Los fabricantes de dispositivos móviles operan en un entorno que cambia rápidamente, con ciclos de producción cortos y un menor *time-to-market* (tiempo de lanzamiento al mercado). Los productos dominantes del año anterior ya están obsoletos, y los márgenes son muy cortos. El mercado es altamente competitivo, y cada nuevo producto llega al mercado con una nueva gama de características. En este contexto, liberar el código fuente, y arriesgarse a exponer los &#8220;secretos comerciales&#8221; de la compañía para un producto que puede ser de relativamente corta duración, es un riesgo trivial si se compara con las ventajas que se derivan del uso de Linux y otros con licencia GPL software, especialmente cuando se recuerda que es sólo el código GPL que tiene que ser puesto a disposición de los demás (en un sitio web, o por otros medios) -, pero cumpliendo con la GPL es bajo en la lista de prioridades.

El Firmware es la fuente de problemas de conformidad de licencias por sí solo, de acuerdo a Kuhn, porque &#8220;a veces un OEM abastece las entrañas de un producto de algún otro que hace que el firmware esté configurado para el dispositivo&#8230;.. y dirán que No vendemos software, sólo vendemos hardware, y tenemos que decirle el software está en el firmware.&#8221;

En muchos casos &#8220;no dirán quién es su proveedor primario&#8221;, ya sea por razones de mercado o para proteger a su proveedor. A veces &#8220;su proveedor primario ha perdido el código fuente &#8230; por lo que puede llevar un tiempo obtener una versión de código fuente que se corresponda con el binario que se distribuye.&#8221;

## Para el usuario

El objetivo de la aplicación de la GPL es proteger los derechos del usuario e, incluso aunque ningún código encuentre su camino de regreso al proyecto antecesor que originó el código, esto puede tener algunos efectos secundarios útiles y positivos. Los ejemplos incluyen &#8220;el proyecto OpenWrt, o el proyecto SamyGO&#8221;, donde los usuarios finales y desarrolladores &#8220;han tomado versiones que las empresas han hecho para una familia específica de dispositivos, en primer caso routers inalámbricos, y en segundo caso, televisores, y han hecho su propio firmware para ejecutar en dichos dispositivos &#8220;. Esto se basó en el código publicado como resultado de la aplicación de la GPL por la FSF y la Software Freedom Conservancy.

&#8220;En ambos casos&#8221;, dice Kuhn, &#8220;hay una modificación del firmware y comunidad de usuarios que ha brotado de aplicación de la GPL.&#8221;La aplicación de la GPL ha sido una fuerza positiva para el bien del software libre y el usuario final, y una útil fuente de feedback de los desarrolladores para los fabricantes de dispositivos.

Aplicar la GPL puede ser una experiencia desagradable para los vendedores de chips y proveedores que tienen que equilibrar las ventajas considerables de la rentabilidad, la velocidad de comercialización, y la accesibilidad de código pre-escrito y probado contra de la molestia de publicar el código. Esto implica una pérdida potencial de &#8220;secretos comerciales&#8221;, que puede ser una consecuencia del uso de software GPL, pero los costos y los gastos generales son triviales comparados con los de una licencia comercial.

La mayoría de las infracciones no son deliberadas, y probablemente pueden ser atribuidas a una mezcla de apatía, incomprensión, ignorancia y confusión. Según Kuhn, &#8220;99,999 por ciento de violaciones se resuelven sin ecesidad de juicio. Nunca nadie ha oído hablar de la mayoría de las empresas que sancionadas al respecto, y han llegado a conformidad sin mucha fanfarria.&#8221;

Harald Welte tiene su propia perspectiva sobre este tema. &#8220;Creo que todavía hay demasiadas violaciones a la GPL, y necesitamos ver más casos positivos con el fin de obtener mayoría de involucrados en el cumplimiento en las respectivas líneas de negocio. Pero lidiar con los dispositivos embebidos en el 2012 y seguir obteniendo el cumplimiento totalmente mal aplicado en realidad significa que no ha habido la más mínima atención en este tema. Y sin refuerzos, nunca va a cambiar. Las personas que no están realmente interesadas deben utilizar simplemente licencias del estilo del MIT. &#8221;

## Los implementadores

Al mismo tiempo, los propietarios del copyright no siempre ven el beneficio directo de defender la GPL. Un proyecto independiente como BusyBox rara vez se entera de las actualizaciones del código predecesor generadas en nuevos versionados. A los programadores no les interesa perder el tiempo en cuestiones burocráticas y legales, y además a muchos de ellos se les paga por trabajar en empresas que suelen ser dueñas del copyright y no les agrada la idea de difundir el software libre en los tribunales. La antipatía de las corporativas hacia la GPL es un verdadero impedimento para el software libre. La GPL necesita partidarios y defensores, para perpetuar la idea de que el software debería ser libre. Y, lamentablemente, las compañías de open source y organizaciones como Red Hat y la Linux Foundation han brillado por su ausencia.

Por lo tanto, la defensa de la GPL se ha vuelto el terreno de las organizaciones de autofinanciamiento voluntario, tales como gpl-violations.org, dirigida por Harald Welte, y la Software Freedom Conservancy (SFC), dirigida por Kuhn. Cumplir con la GPL está bastante lejos en la lista de actividades de la SFC a las cuales se compromete en beneficio del software libre. La mayor parte de las actividades que realiza a favor de la GPL se han centrado en BusyBox, &#8220;the Swiss Army Knife of Embedded Linux&#8221; (la Navaja Suiza del Linux Embebido&#8221;, que es una caja de herramientas útiles para sistemas embebidos, escrito originalmente por Bruce Perens y mantenido actualmente por Denys Vlasenko.

Hacer cumplir la GPL no es un trabajo que atrape a muchos, según explica Kuhn:&#8221;Siempre fui del tipo de personas que en un proyecto miran lo que hay que hacer más que lo que más me puede interesar. Nosotros hacemos el trabajo que nadie más quiere hacer. Nosotros nos encargamos de las cosas aburridas y mundanas que son básicas y necesarias para todos los proyectos &#8230; Cualquiera que haya implementado la GPL sabe que es un proceso aburrido y tedioso, y la mayoría de desarrolladores en general prefieren solamente codificar. &#8221;

BusyBox se vio inevitablemente involucrada dado que Erik Andersen, el responsable de BusyBox entre 1999 y 2006, es un defensor aficionado de la GPL. &#8220;Denys Vlasenko, el actual responsable, y otros titulares del copyright Busybox también han participado en varias ocasiones&#8221;, dice Kuhn. &#8220;Y algunos propietarios del copyright incluso han asignado sus copyrights a la Conservación &#8230;&#8221;

Debido a la ubicuidad de BusyBox en sistemas embebidos Linux y el entusiasmo de los desarrolladores por ver la licencia funcionando, BusyBox ha estado en el centro de un litigio por hacer cumplir la GPL y transmitir el derecho de acceso al código fuente para el usuario final. En algunos aspectos BusyBox se ha convertido en un instrumento para garantizar la concientización de los fabricantes de chips sobre las obligaciones mínimas de la licencia, lo que genera a su vez otras cuestiones, como Kuhn reconoce. &#8220;A veces los desarrolladores Busybox son vistos como los únicos defensores de la GPL, y esto ha sido un desafío desde hace tiempo&#8221;, dice.

Pero, como Jeremy Allison, miembro de la junta directiva del SFC, señala:&#8221;Litigar es siempre el último recurso, por eso la mayoría de estas cuestiones logran resolverse sin litigio. La gente comete errores, pero de todos modos el punto no es castigarlos sino instarlos a cumplir. Los problemas surgen en general por vagancia o inconveniencia: &#8220;no puedo dedicarme, y requiere demasiado esfuerzo hacerlo bien, así que simplemente la usaré.&#8221;

Cuando le preguntamos a Allison porqué Samba es menos propenso a violar la licencia que otros softwares distribuidos en dispositivos pequeños, hizo la observación de que &#8220;los proveedores de dispositivos Samba tienden a tener una relación más larga con el cliente que otros proveedores. La gente almacena sus datos con Samba, y si son flexibles respecto a licencias es probable que sean flexibles también con otras cosas, lo que consecuentemente no garantiza que sea un buen producto. Es por esto que la mayor parte de nuestros proveedores prefieren hacer las cosas bien. &#8221;

## Las razones y porqués

Recientemente BusyBox y la Software Freedom Conservancy han sido objeto de prolongados debates en Linux Weekly News (LWN) que surgieron de un artículo de Matthew Garrett instando a los propietarios del copyright del kernel de Linux a participar en la aplicación de la GPL.
La discusión partió de una publicación en eLinux de un ingeniero de Sony, Tim Bird, proponiendo un proyecto de sustitución de BusyBox, y un artículo posterior en LWN, que referenciaba al proyecto toybox, un proyecto revivido por Rob Landley para replicar (y mejorar) la funcionalidad de BusyBox, usando una licencia open source más liberal.

La razón fundamental de este proyecto es que BusyBox es &#8220;la pieza más controvertida de software GPL en el mundo&#8221;, y que &#8220;los litigantes han solicitado en ocasiones recursos fuera del alcance de BusyBox, como una autoridad de revisión de productos no relacionados, o derecho de rechazar los módulos no-Busybox. Esto genera preocupación entre los vendedores y proveedores de chips. &#8221;

SFC y su papel en el control de la GPL se convirtió en el foco de gran parte de las discusiones en los temas de LWN. Inevitablemente, hubo malos entendidos y confusiones, algunas de las cuales se han resuelto, pero los debates plantean inevitablemente preguntas sobre los porqués, los cómos y para qués de imponer la GPL.

## Derecho de preferencia

La cuestión clave es la causa y efecto de aplicar la GPL en los vendedores de chips. Por deducción se dijo que los litigantes, en la forma de SFC, habían exigido el derecho de &#8220;autoridad para revisión de los productos no relacionados&#8221; (lo que para Kuhn no es cierto), y el &#8220;derecho de preferencia sobre los módulos no-Busybox&#8221;. La cuestión recae en que esto podría imponer sanciones no viables a empresas, como Tim Bird ha afirmado: &#8220;. Es posible que un error cometido por un ODM (como proveer el código fuente de BusyBox de una versión equivocada) puede causar el retiro de millones de productos no relacionados. De esta manera, las demandas hechas por la SFC para que una empresa vuelva a cumplir están más allá del valor que BusyBox le proporciona a una compañía. Además creo que están equivocados, tanto desde el punto de vista legal como moral &#8220;.

Mientras que The Conservancy no requiere de una visión general de&#8221;productos relacionados&#8221;, SFC pide que el fabricante entre en cumplimiento de todos los módulos de la GPL en un dispositivo que no haya cumplido con la licencia de BusyBox. &#8220;No se puede decir &#8216;vamos a cumplir con BusyBox pero ignorar Linux, glibc o cualquier cosa que pueda ser GPL o LGPL'&#8221;, dice Kuhn.

Welte concuerda con las líneas generales de este enfoque, y señala que gpl-violations.org ha pedido rutinariamente &#8220;el código fuente correspondiente a todo el software con licencia GPL en nuestra comunicación con las empresas infractoras. Esta solicitud fue tipicamente honrada por todos, sin la necesidad de aplicar cualquier presión sobre él. &#8220;

El punto de vista de Kuhn es que &#8220;hay que cumplir con todo si se desea utilizar BusyBox. El artículo 4 de la GPLv2 dice que tan pronto como se viola la licencia los derechos de copiar, modificar y distribuir el software desaparecen. Así que una vez que se viola el copyright de Busybox se pierde el derecho a distribuir el código GPL. &#8221;

## La pena de muerte

La razón de esta perspectiva es que elimina los problemas por debajo de la línea del fabricante. Después de todo todavía hay una obligación legal y moral para cumplir con la licencia de cualquier otro módulo que se esté lanzando al mercado. Si usted está cumpliendo con la GPL de BusyBox, ¿por qué no cumplir con todos los componentes GPL incluidos en el dispositivo, o arriesgarse al litigio de otros propietarios del copyright en el futuro?

Kuhn dice que &#8220;la razón por la que hicimos este requisito es para que la gente no tenga que tratar con cada titular del copyright de forma individual. Les digo:. &#8216;Nosotros somos los primeros en discutir con ustedes por este tema, pero si cumplen y alguien luego se queja de sus violaciones en el pasado vamos a estar de su lado. Yo estaría feliz de ser un testigo experto y decir &#8216;*Sí, su señoría, una vez tuvieron un problema, pero lo han resuelto ahora*&#8216;. &#8221;

&#8220;Ellos resuelven el problema rápidamente y nadie más va a venir tras ellos.&#8221;

Kuhn dice: &#8220;La gente habla de&#8221; la cláusula de pena de muerte &#8220;(que en la GPLv2 dice lo siguiente:

No se puede copiar, modificar, sublicenciar, o distribuir el Programa excepto como determina expresamente esta Licencia. Cualquier intento de copiar, modificar, sublicenciar o distribuir el programa está prohibido, y anulará automáticamente sus derechos bajo esta Licencia. Sin embargo, a aquellas partes que hayan recibido copias o derechos de usted bajo esta Licencia no se les anulará su licencia mientras que estas partes continúen cumpliéndola.)

&#8220;&#8230; Pero esa cláusula es el único gancho que hay para asegurar que otras personas cumplan con la licencia. Se debe dejar de hacer cosas que administra la ley del copyright , que la gente llama&#8221; pena de muerte &#8220;. Pero el objetivo final en cada acción de cumplimiento en que he estado involucrado ha sido la de restablecer el derecho de los pueblos a producir una distribución compatible con la GPL &#8220;y la sección 4 de la GPLv2 es el último recurso.

La diferencia entre el enfoque de Harald Welte y la SFC está en que la SFC utiliza el restablecimiento de la licencia de BusyBox como &#8220;una palanca para obtener el código fuente para otros programas como el kernel de Linux&#8221;, y en la experiencia de Welte esto no ha sido necesario. &#8220;No todo lo que es jurídicamente posible es éticamente correcto. Pero entonces, la ética y las costumbres legales difieren ampliamente en las comunidades FOSS , como lo hacen en la sociedad en general. Algunos países y comunidades creen en la pena de muerte, otras no. Algunos países permiten el aborto, otros no. Algunos permiten la prostitución, otros no. Así que la hora de juzgar si esta &#8216;palanca de restablecimiento&#8221; es aceptable o no, tenemos que aceptar que puede haber diferentes líneas de pensamiento.&#8221;

Su conclusión es que &#8220;el mejor método, sin lugar a dudas, es tener un propietario de los derechos de los otros programas a fin de que cualquier demanda de código fuente (en oposición a una mera solicitud sin amenaza legal implícita o explícita)&#8221; - un punto de vista que es compartido por la SFC.

Desde ambos puntos de vista, el objetivo es el cumplimiento, no el litigio, eliminación de los productos o castigo de los errores. Hay una gran brecha entre la percepción de maniobras legales y su aplicación en el mundo real.

## El modelo ejemplar

La excesiva dependencia de los propietarios del copyright de BusyBox es definitivamente un problema para el SFC, y esto es una cuestión reconocida incluso por Kuhn. &#8220;Me sorprendió que en las discusiones LWN la gente esté tan disgustada frente a esto, ya que lo he hecho siempre de la misma manera&#8221;, dice. Uno de los temas correspondía al destino de los ingresos, pero SFC es una organización sin fines de lucro y declara todos sus ingresos. Bruce Perens comentó sobre esto en el contexto de su trabajo como consultor de empresas contactadas por la SFC. &#8220;También he tenido que pagar SFC para el trabajo técnico en la auditoría&#8221;, escribió. &#8220;Ellos cobran mucho menos que yo, y menos que cualquier profesional técnico-jurídico en su sano juicio en Nueva York debería cobrar.&#8221;

Kuhn sostiene que &#8220;si se apoya al copyleft se tiene que apoyar su regulación debido a que el copyleft no controlado es igual que la licencia de Apache, y ya soy suficientemente masoquista como para hacerlo. Yo tengo miedo también de la aplicación de la GPL por el afán de lucro.&#8221; Pero dice además, &#8220;la crítica que tomo desde otro punto de vista me dice que más proyectos deberían participar en la aplicación de la GPL. No debería ser sólo un asunto de BusyBox. BusyBox me ha estado pidiendo durante años involucrar a otras personas, y es lo que es lo que estoy haciendo en este momento. Estoy tratando de construir una amplia coalición de proyectos a involucrar en la aplicación de la GPL, para que BusyBox ya no sea más el modelo ejemplar de la aplicación. &#8221;

Respecto al reemplazo de BusyBox, dice, &#8220;desconectarse de BusyBox no es realmente la solución, dado que de todos modos la gente no necesariamente se va a alejar de otros programas GPL. Y volver a escribir el código que ya existe no es la respuesta.&#8221; Si BusyBox se va, y se sustituye por una alternativa del MIT con licencia, el problema del cumplimiento de la GPL no va a desaparecer, o como Welte señala, &#8220;cualquiera que piense que reemplazando Busybox con un proyecto con licencia no-GPL se puede evadir la aplicación de la GPL: No va a funcionar. Hay otros por ahí imponiendo la GPL. &#8221;

Como era de esperar, Rob Landley, un ex-defensor de BusyBox que se ha desilusionado con Busybox y su papel en el cumplimiento de la GPL, la GPL, la FSF y el SFC, tiene una perspectiva totalmente diferente y ha lanzado toybox &#8220;bajo una licencia BSD inciso 2&#8243;, y la quiere &#8220;para convertirse en la implementación por línea de comando por defecto en los sistemas de Android en todas partes.&#8221; La postura de Landley es que la GPLv3 y la aplicación de la GPL están alejando a las empresas de adoptar código abierto, como se ejemplifica, a su juicio, por la decisión de Google de eliminar el código GPL del &#8220;espacio de usuario&#8221; de Android.

## La realidad más calma

Para los defensores del copyleft y el software libre, aplicar la GPL es una necesidad práctica si permite al software ser libre y accesible para todos, y también ayuda a aquellas empresas que elijan cumplirla. &#8220;El cumplimiento de la GPL es una cuestión de competencia leal&#8221;, dice Welte. &#8220;Hay algunas empresas que realmente hacen un buen trabajo garantizando el cumplimiento de varias licencias de Software Libre. Si la competencia no invierte los fondos en las respectivas técnicas, procedimientos y procesos de negocio, obtendrán una ventaja competitiva injusta en contra de quienes lo están haciendo correctamente. Si no hay regulación, la motivación sería reducir los esfuerzos en el cumplimiento, no aumentarlos&#8221;.

La mayoría de las empresas felizmente cumplen, y no se sabe nada de ellas porque &#8220;no quieren que nadie sepa que alguna vez estuvieron fuera de cumplimiento&#8221;, diceKuhn. &#8220;Para las empresas no es necesariamente una buena historia. Y no es generalmente un hecho muy útil saber quién está violando y quién no, así que trato de no hacerlo público. Pero lo he agregado a mi lista de preguntas. &#8221;

Detrás de las principales historias de litigios subyace una realidad más tranquila, donde la gran mayoría de las empresas que están notificadas por la SFC o gpl-violations.org están felices de cumplir sin molestias, ya que el software funciona para ellos, y les da una reducción en el costo, velocidad al mercado, oportunidades colaborativas y acceso a código de alta calidad. Como bien señaló un colaborador de las discusiones LWN: &#8220;no fue sino hasta que el SFC comenzó una campaña agresiva, utilizando Busybox como un arma (alrededor del 2006/2007), que como consumidor comencé a ver los dispositivos promocionados con pequeños volantes GPL y el código fuente disponible para su descarga. &#8221;

## Fuente: <a href="http://www.h-online.com/open/features/Enforcing-the-GPL-with-Judo-moves-1471698.html" target="_blank">h-online</a>