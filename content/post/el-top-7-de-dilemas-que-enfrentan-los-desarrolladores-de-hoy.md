---
author: luzila
categories:
- aplicaciones
- articulos
color: '#F57C00'
date: '2016-01-01'
description: "As\xED como la tecnolog\xEDa evoluciona, tambi\xE9n lo hacen los dilemas
  que enfrentan los desarrolladores. Cada elecci\xF3n, desde la plataforma hasta el
  almacenamiento de datos, incluyendo a cu\xE1nto control darle a los usuarios, est\xE1
  cargada de preguntas. Y gracias a la nube, el crecimiento de la tecnolog\xEDa m\xF3vil
  y la acelerada vanguardia, pareciera como si el mundo de la programaci\xF3n enfrentara
  una nueva elecci\xF3n - y dilema - a un ritmo creciente."
lastmod: 2016-06-13
layout: post.amp
mainclass: articulos
url: /el-top-7-de-dilemas-que-enfrentan-los-desarrolladores-de-hoy/
tags:
- cloud computing
- desarrollo de aplicaciones
- noSQL
title: 7 dilemas que enfrentan los desarrolladores de hoy
---

**Plataformas, bases de datos, control de usuario - dilemas que atrapan al programador antes de la primera línea de código**

Tu jefe lo quiere para ayer, pero más vale que cumpla con los standards de mañana. Los clientes quieren todas las características que se puedan imaginar, pero no te atrevas a confundirlos dándoles todos los botones que desee. Tus compañeros programadores quieren que documentes tu código, pero ellos simplemente responden &#8220;tl;dr&#8221; (Too Long; didn&#8217;t read) a cualquier cosa que escribes.

Así como la tecnología evoluciona, también lo hacen los dilemas que enfrentan los desarrolladores. Cada elección, desde la plataforma hasta el almacenamiento de datos, incluyendo a cuánto control darle a los usuarios, está cargada de preguntas. Y gracias a la nube, el crecimiento de la tecnología móvil y la acelerada vanguardia, pareciera como si el mundo de la programación enfrentara una nueva elección - y dilema - a un ritmo creciente.

Empaquetar tus problemas y darles un nombre puede ayudarte a gestionar y tal vez incluso encontrar soluciones, o al menos eso dicen. Con ese fin, aquí presentamos una lista de los dilemas más importantes que enfrentan los programadores de hoy en día. No significa que esté completa - dicho nuevamente, qué proyecto relacionado con el desarrollo de aplicaciones lo está alguna vez?

¿Tienes otro dilema? Agrégalo a los comentarios.

<!--more--><!--ad-->


# Dilema n° 1: Cuándo decir sí a nuevos requerimientos

Si tuviéramos un dólar por cada requisito que nuestros clientes quieren, todavía estaríamos en bancarrota porque ésto requeriría la construcción de un sistema de contabilidad que asocie cada dólar con cada requisito. Éstos por lo tanto tendrían que ser reticulados y priorizados dado que nuestros clientes incluso exigirían un sofisticado sistema de gestión de bug/requisito para sus dólares. Luego la base de datos de los requisitos deseados necesitaría un backup en la nube y traducción a todos los idiomas.

Este es el dilema: Todos quieren un código rico en características, pero nadie quiere pagar el costo de la gestión de todo eso. Cualquiera que haya tratado de construir algo tan simple como una aplicación de control remoto de cuatro botones sabe cuántos millones y millones de años de diseño se necesitan para crear algo así de simple. Hacer algo elegante exige el sudor que todo lo empapa.

Los clientes, el departamento de marketing, representantes de ventas en el campo - no importa quién hace la solicitud. Darles el botón que quieren en realidad puede ser lo peor que puedes hacer por ellos. De repente puede haber demasiados botones y demasiada confusión acerca de lo que hace cada uno. Lo ideal es hacer algo lo suficientemente fácil de comprender intuitivamente, pero por desgracia, la creación de algo intuitivo para aquellos que son propensos a pedir demasiado para su software es casi imposible.

Ya has intentado citando la vieja &#8220;Regla de las 10.000&#8243; a tu jefe, la cual sostiene que cualquier cosa que valga la pena requiere de al menos 10.000 horas de trabajo para que llegue a ser competente. Eso no hace más que causar gracia, ya que el encargado del area comercial va a dedicar más tiempo a la redacción de un patético reporte o e-mail que a tratar de entender las características que has incluido en tu aplicación, incluso si son las funcionalidades que los usuarios dijeron que deseaban.

Lamentablemente, lo ideal suele ser intentar convencer al cliente de que en realidad no desea la funcionalidad que pidió. Después de todo, Twitter sigue ofreciendo un sistema de pobre funcionalidad que impone un límite de 140 caracteres, ridículo en la era de <em>discos terabyte</em>. Sin embargo, quédese tranquilo sabiendo que todos los intentos de facilitar nuevas características son ejemplos de intentar demasiado.

Si tan sólo esta solución para el problema de los requisitos de funcionalidad infinita estuviera disponible para todos nosotros&#8230;

# Dilema n° 2 : ¿Cuánta documentación es suficiente?

Estaba sentado en una reunión con un project manager agresivo que realmente quería adherirse a un project manager de la competencia. Este manager prometió que el código generado por su equipo tendría &#8220;documentación&#8221;. Dijo presentándose al estilo James Bond pausándose y diciendo: &#8220;&#8230; documentación completa.&#8221;

Lo único peor que no tener documentación es tener una estantería repleta de carpetas llenas de interminables documentos. A algunos project managers les encanta medir su progreso por la libra, y ven <em>más</em> palabras como <em>mejores</em> palabras. Cualquiera que haya leído (o mejor dicho, sufrido) &#8220;Moby Dick&#8221; en la escuela secundaria conoce la sensación.

Queremos información sobre el código, pero nadie tiene un acrónimo para Muy Poca Información (Too Little Information). Todos en Facebook conocen la sigla TMI.

No hay una respuesta fácil para el programador. Lo ideal sería que el código sea lo suficientemente limpio y autodocumentado para evitar la necesidad de largos párrafos explicando lo que el código hace. La documentación generada por código no se queda atrás como la documentación escrita cuando alguien reescribe el código sin tener en cuenta el texto.

Hay esperanzas de que colecciones aún más inteligentes de debuggers (depuradores) y compiladores analizadores de código serán capaz de hacer un mejor trabajo comprendiendo nuestro código. Las últimas versiones de las máquinas virtuales llevan un registro enorme para cada rutina que se está ejecutando. Mientras que la mayor parte del énfasis se pone en la performance, este tipo de metadata puede ser más útil que la documentación real mediante la detección del cambio en los datos.

Sin embargo pasarán años antes de que podamos beber Kool-Aid y soñar con Inteligencia Artificial entendiendo nuestro código. Por ahora, nos quedamos con el problema de <a target="_blank" href="http://www.infoworld.com/d/application-development/how-get-developers-document-their-code-183908">Cómo crear suficiente documentación</a> para mantener a todos contentos sin generar diferencias entre el conjunto de funcionalidades real y lo que describimos.

# Dilema n°3: ¿A la nube, o no a la nube?

Es mucho más fácil llamar a un nuevo servidor de la nube que llenar un formulario de solicitud para pedir a la gente de mantenimiento que compre uno nuevo. Presionas un botón y tienes tu propio servidor.

Por desgracia, este enfoque puede ser costoso. Los servidores pueden costar sólo unos pocos centavos por una hora, pero aumentan cuando todo el mundo quiere su propio cluster para cada proyecto. La otra cuestión es que hay cientos de servidores en la nube, la mayoría de ellos creados por personas que se fueron del proyecto hace varios años. Es más barato seguir pagando la cuenta que averiguar lo que hacen.

Y lo que es peor, no se tiene ningún poder sobre los servidores. Algunas compañías son famosas por redactar Términos de Servicio que son muy unilaterales, afirmando, por ejemplo, que tienen el derecho de apagar las máquinas sin &#8220;ninguna razón&#8221;. Eso parece estar cambiando a medida que los proveedores reconocen que tal extralimitación aleja a los clientes de mucho dinero. Pero nadie sabe lo que ocurre si surjen problemas en la nube. A veces esto ayuda a controlar el pago del cheque de retiro y jubilación de la persona que tenía la responsabilidad de mantener el servidor levantado.

Cuanto más tercerizas, más pierdes el control y volanteas tratando de recuperarlo. Cuanto menos externalizas hacia la nube, más volanteas para que todo se mantenga funcionando. Condenado si lo haces, condenado si no lo haces.

# Dilema nº4: ¿Mantener el código viejo, o darle paso a lo nuevo?

Uno de los desafíos más profundos en la ejecución de una pila de software empresarial es decidir cuándo seguir con lo viejo y cuándo cambiar a lo nuevo. Cada línea de código en la pila se vuelve más viejo a cada minuto, y aunque parezca lo contrario, la realidad es que el software se las arregla para encontrar la forma de empeorar, poco a poco.

El antiguo código realmente dejar de funcionar. Los socios comienzan a ofrecer servicios ligeramente diferentes y a veces dejan de respaldar a todas las funciones juntas. Twitter, por ejemplo, bloqueó a las personas que utilizaban su API antigua cuando la empresa comenzó a insistir en el uso de la API de OAuth. Estas historias se repiten una y otra vez.

El problema es que sustituir lo viejo con lo nuevo puede ser costoso. Los programadores de lo nuevo se ven obligados a mantener la compatibilidad con el código antiguo, un reto que a menudo requiere escribir dos programas: uno lleno de los viejos bugs (errores) y uno lleno de otros nuevos que todavía no han sido descubiertos.

Para empeorar las cosas, el nuevo código está generalmente atado a los standares más altos. He visto los nuevos e impresionantes componentes de AJAX correr mucho más lento que el antiguo código mainframe de pantalla verde, porque tienen elegantes botones y un montón de imágenes que <em>desafían</em> la capacidad de placa de vídeo. La apariencia (look) es impecable, pero el comportamiento (feel) es más lento.

No hay una respuesta fácil a este dilema. El código anterior sigue funcionando. Nos gusta. Es sólo que <a target="_blank" href="http://www.infoworld.com/t/microsoft-windows/windows-8-consumer-preview-windows-frankenstein-187749">no es compatible con la nueva versión del Sistema Operativo</a> o con el nuevo chip multicore. El nuevo código cuesta dinero. En general podemos arreglar un número de problemas evidentes del código viejo, pero quién sabe qué nuevos problemas pueden aparecer?

# Dilema nº 5: SQL vs NoSQL

Hay un gran desafío para los Administradores de Base de Datos del mundo: seguir con <em>SQLs de prueba-y-error</em> o cambiar a la<a target="_blank" href="http://www.infoworld.com/d/data-explosion/no-sql-new-databases-new-applications-400"> tendencia NoSQL</a> donde todo es más grande y está listo para un interminable flujo de datos.

Las nuevas Bases de Datos NoSQL suenan atractivas. Pueden ser mucho más rápidas que las anteriores, y muchas veces obligan a los usuarios a evitar muchos de los problemas que causaron tantos disgustos las primeras veces. Consultas con JOINs, por ejemplo, pueden hacer más lenta la Base de Datos si el esquema es demasiado complicado. NoSQL las tira por la ventana, junto con muchas partes del esquema. Se puede almacenar cualquier par clave-valor que desees, y la Base de Datos NoSQL, va a responder.

Pero si te fijas bien, las bases de datos NoSQL no son siempre tan maravillosas. En primer lugar, generalmente no ofrecen garantías de que los datos se graben. Es más probable que se graben bien, pero existe también la posibilidad de que algo le suceda a un disco duro o a un equipo del clúster y se pierda la información. Algunas de las más recientes <a target="_blank" href="http://www.infoworld.com/d/data-explosion/first-look-oracle-nosql-database-179107">opciones NoSQL de empresas como Oracle</a> permiten solicitar una confirmación de la transacción, pero el código necesita jugar con los pulgares y esperar, al igual que si utilizara una Base de Datos SQL.

Hay cuestiones más profundas. Muchos de los problemas de velocidad de la leva sobre porque los programadores no piensan en los efectos sutiles de SQL Server. La forma de estructurar las tablas y consultas se puede hacer una gran diferencia en el rendimiento. Vinculación de tablas múltiples juntas y obligando a la base de datos para unir toda la información ralentiza las cosas.

Pero si intentas lograr lo mismo con una Base de Datos NoSQL, estarás escribiendo dentro y fuera de multiples lugares y deseando que se mantenga consistente. Tienes que hacer todo el trabajo con JOINs entre secciones dispares de la Base de Datos, lo que probablemente signifique que tendrás- que pagar el costo en velocidad. Siendo consciente de ello y capaz de pensar en la forma de compensarlo durante el diseño del código, todo saldrá bien. Pero si no, el código será más lento y cargado de bugs.

Este dilema tiene una respuesta simple: las aplicaciones que necesitan una mayor consistencia deberán confiar en las garantías de la antigua maquinaria SQL. Las aplicaciones que necesiten velocidad y puedan manejar algunos registros mezclados pueden elegir las nuevas Bases de Datos NoSQL.

Pero si se requiere velocidad y consistencia, también empezarás a tirarte de los pelos.

# Dilema n°6: Elegir entre Native o Web mobile



Al principio, Apple no iba a dejar a nadie desarrollar aplicaciones para iPhone. Si querías incluir a iPhone en tu compatibilidad, tenías que codificar con HTML5 para Safari. Era una forma elegante de esquivar la conocida limitación impuesta a los desarrolladores.

Por desgracia, nadie estaba contento con el <a target="_blank" href="http://www.infoworld.com/d/developer-world/iphone-developers-locked-apples-walled-garden-740">bloqueo de la plataforma</a>. La gente quería escribir código nativo, un camino definitivamente esencial para juegos que requerían velocidad, y útiles para aplicaciones más lentas que te permitían acceder a información. Apple cedió, y ahora tenemos la App Store.

El problema es que el código para el iPhone no funcionará con otros smartphones y viceversa. Cualquier compañía que quiera ser compatible con múltiples fabricantes debe recodificar sus aplicaciones – un proceso largo y lento, propenso a incompatibilidades. Además, implica doble o triple recodificación.

<a target="_blank" href="http://www.infoworld.com/d/html5/download-infoworlds-megaguide-html5-175982">HTML5</a> es una buena opción. Si puedes codificar tu aplicación como una página Web, hay una buena probabilidad de que los usuarios puedan abrirla en el navegador del smartphone. Ya hay <a target="_blank" href="http://www.infoworld.com/t/mobile-development/12-essential-programming-tools-the-mobile-web-185145">un gran número de buenos frameworks</a> que hacen esto un poco más sencillo.

El problema es que no está necesariamente entre los intereses de los fabricantes de smartphones incluir esta interoperabilidad. Si los teléfonos van a destacarse, necesitarán ofrecer algo especial, y esto generalmente significa algo diferente. Cosa que no se logrará si todos corren las mismas aplicaciones HTML5.

Hay una gran cantidad de rumores de que la performance de HTML5 en los smartphones no es tan buena como podría ser. Algunos sostienen que el motor de HTML5 es un poco más lento. No hay una forma sencilla de probar esto o incluso entender la motivación que hay detrás de cualquier código complicado. En muchos casos, HTML5 es más lento debido a que es interpretado en lugar de compilarse directamente para el hardware.

La respuesta a este dilema es definir qué tan importante será el rendimiento de la aplicación para mobile. Si es esencial, entonces el código compilado para cada arquitectura es la respuesta. Si no es tan relevante, entonces existe un buen margen de maniobra para explorar HTML5.

# Dilema n°7: ¿Cuánto control deberían realmente tener los usuarios?

Los usuarios de software son como adolescentes. Se dice : Ellos quieren toda la libertad posible, pero esperan que usted, el buen padre, los rescates en brazos. Ellos quieren todas las ventajas del patio vallado, pero insisten en poder escaparse por alguna puerta trasera cada vez que se les de la gana.

La cuestión del control es una dificultad primaria para los programadores. El <a target="_blank" href="http://www.infoworld.com/d/open-source-software/why-software-patents-are-evil-188738">espíritu Open Source</a> está influenciando la cultura con su insistencia de que todo el mundo debería tener la posibilidad de recompilar la pila y ajustarla para que se adapte a cualquier cosa. Desgraciadamente, el usuario medio no puede hacer uso de este poder, sin importar cuánto lo desee. Incluso muchos programadores han tenido que perder horas buscando la versión correcta de las librerías y la última edición del compilador. <em>Control </em> carece de significado si no se dispone del tiempo para usarlo.

Algunas compañías están incentivando el ideal de bases de datos abiertas. Se supone que todos tenemos la posibilidad de descargar información de todos. Lamentablemente, la mayoría de nosotros no puede hacer nada con la información, y los únicos con el tiempo y la energía para usar estas puertas abiertas son otras compañías.

No hay respuesta a este dilema. Si le das control a los usuarios, ellos se quejarán de la interface visual y de las funcionalidades que no tienen. Si no les das, seguirán gruñéndote por ello.

Fuente: <a target="_blank" href="http://www.infoworld.com/d/application-development/top-7-dilemmas-facing-todays-developers-193412">infoworld</a>
