---
author: alex
categories:
- security now
color: '#00BCD4'
date: '2016-01-01'

mainclass: security-now
url: /como-funciona-el-bitcoin-la-cripto-moneda/
tags:
- bitcoin es
- como funciona bitcoin
- "c\xF3mo funciona el bitcoin"
- "explicaci\xF3n bitcoin"
- "qu\xE9 es el bitcoin"
- red bitcoin
- sistema bitcoin
- webs aceptan bitcoin
title: "C\xF3mo funciona el Bitcoin, la cripto-moneda"
---

Hace mucho tiempo que se empezó a hablar sobre el bitcoin y su futuro como moneda digital. Si como yo te has preguntado cómo funciona y quieres saber más acerca de todo el sistema que rodea al bitcoin, en este artículo traduciré el episodio *287 - BitCoin CryptoCurrency* del programa [Security Now!][1]

Bicoint fue creado por el criptógrafo Japonés Satoshi Nakamoto y es [open source][2].

La idea del bitcoin es ofrecer una moneda basada en internet, con fuerza industrial, en la que se haga uso del peer-to-peer donde se pueda intercambiar dinero entre dos partes sin necesidad de un intermediario. Esto último es uno de los mayores problemas porque, *¿de donde viene la moneda?*
, *¿Qué crea la moneda?*, *¿Cuanta cantidad fluye a través del sistema?*, *¿Cómo la monitorizas y la regulas?*, *¿Cómo se previene que se produzca inflación?*, *¿Cómo previenes que la gente cree la moneda de forma fraudulenta?*, *¿Cómo evitas que alguien, en caso de disponer de monedas, reutilice la misma moneda?*. Todas estas preguntas se han resuelto en el sistema de una manera muy inteligente e innovadora.

<!--more--><!--ad-->


Pero, *¿Cómo se inventa una moneda?*. En realidad, una moneda no es más que un acuerdo entre partes que establecen que esa *‘cosa’* sintética tiene valor. Cuando el dólar se regía a los estándares del oro, la idea era que debía haber oro salvaguardando los dólares. De manera que cuando recibías los llamados *‘pagarés’*, eran equivalentes a una cantidad X de oro. El problema fue que se necesitaba más dinero del que oro se disponía, así que se dejó de salvaguardar el dólar con el oro.

Una vez desconectada la moneda del oro, en cierta manera se tiene una moneda virtual (Dólares, Euros etc).

Así pues, BitCoin tiene todos los atributos de una moneda. El concepto de bitcoin (BTC) y el sistema que genera la moneda. Puedes dirigirte a la página de bitcoin, descargar el programa, instalarlo y empezar a generar bitcoins. Tal como suena, empiezas a generar dinero.

La forma en la que se crea dinero es mediante el procesamiento de transacciones en el sistema bitcoin. Es complicado, pero así debe ser para obtener un sistema robusto y seguro. En la FAQ de bitcoin.org hay un enlace al <a href="http://www.bitcoin.org/bitcoin.pdf" target="_blank">PDF</a> que escribío Satoshi describiendo el funcionamiento del sistema.

La idea es que cada usuario quiere un rastro de cada transacción que se haya producido en el sistema, y se producen transacciones todo el tiempo. A pesar de que la moneda sea virtual, se ha anclado a monedas reales. Hay páginas webs que aceptan pagos en bitcoin, esta semana (23/03/2013) ha incrementado su valor en un 53% situandose entorno a los 54 dólares por bitcoin.

Si te sorprendió la idea de generar dinero por tí mismo con tan solo instalar el programa y ejecutarlo, hay que decir está todo controlado. Los bitcoin se generan cuando un nodo &#8212; Si estás ejecutando el programa, tú mismo eres un nodo &#8212; encuentra la solución a un problema complejo. Es una manera muy inteligente de generar monedas, ya que impide que la gente pueda crear monedas a su antojo.

> *A modo de continuar con la explicación de cómo funciona bitcoin, hay que remontarse al año 97.*

En dicho año, un tal Adam Back propuso un concepto para luchar contra el spam. Lo llamó **‘proof of work’** (Prueba de trabajo). La idea era que los spammers funcionan debido a que pueden enviar cantidades muy grandes de emails a un coste virtual 0. No les cuesta nada enviar un email. Como consecuencia nuestras bandejas de entrada se ven inundadas con email que a nosotros nos es caro de recibir, y para ellos enviarlos tiene un coste 0. Así que Adam dijo, ***¿Y si encontramos la forma de hacer que a alguien le resulte caro enviar un email?***

La forma que encontraron fue esta: Crear una carga computacional para la cual no tenemos la suficiente tecnología, en la que los spammers tengan que realizar una cantidad sustancial de trabajo a fin de validar el email. Aquí es donde aparecen las funciones de hashing. Crear el hash de algo es una técnica valida para este concepto, ya que dado una entrada de longitud arbitrária crea el comúnmente llamado ***‘digest’***. El cual tiene longitud fija.

Es decir, imagina la ***función [criptográfica][3] SHA-256***, que produce hashes de 256 bits. Para poder enviar el email, por ejemplo, se podría calcular el hash de la cabecera de tal manera que alguno de los primeros números de los 256 sean cero. De modo que si calculas el hash de una cabecera de email aleatoria, el bit más significativo tiene una probabilidad del 50% de ser 0 ó 1. Con este método se tendría que aplicar el hash a la cabecera hasta que el primer bit sea 0 para poder enviar el email.

Pero digamos que para validar la cabecera ha de tener un hash donde los 20 primeros bits, por ejemplo, sean cero. Esto requerirá de 2^20 operaciones. La idea es que esto obliga a realizar una cantidad muy grande de trabajo estimando la cabecera para obtener los X primeros bits del hash a cero. En la práctica, se puede establecer la dificultad para que tome, por ejemplo, dos segundos en realizar el cálculo. Eso significaría al spammer perder dos segundor por email, lo cual es un tiempo computacional mucho mayor de lo que les cuesta en la actualidad.

El concepto de Adam no llegó a utilizarse, ya que hay servicios de envío de mails masivos que no son spamers. Como boletines de notícias. Sin embargo *Satoshi* usó el concepto propuesto por Adam en el 97, implementándolo de la siguiente manera:

Imagina que entre todos los integrantes que componen el sistema, hay gente intercambiando bitcoins. Todo el sistema funciona con un sistema de claves [asimétricas][4], en el que existe el par de claves pública y privada. Una de las partes coge su clave pública y le asocia una cantidad de bitcoins, de igual manera, el destinatario de la transacción proporciona su clave pública. Luego, se firman con la clave privada de cada uno.

Así se crea una transacción que solo ellos pueden haber creado ya que son los únicos que poseen sus claves privadas. Esa transacción se emite a todos los nodos de la red P2P (Peer-to-Peer). Como ésta, todas las transacciones que se producen en el sistema se transmiten a la red. De este modo, es muy fácil que cualquiera pueda verificar dicha transacción, ya que conocen la clave pública del firmante, pudiendo así verificar la firma. Hecho esto, el siguiente paso es asegurarse de que dicha persona que acaba de enviar cierta cantidad de bitcoins, no pueda volver a enviarlos de nuevo. Esta es una de las tareas más difíciles de resolver.

> *Antes de pasar a explicar cómo se resuelve el problema de no permitir el reenvio de los mismos bitcoins, es necesario dar a conocer otro concepto.*

Dentro del sistema existen bloques, que son colecciones de transacciones en la red. Siguiendo el método de Adam, aquí los bloques son una analogía a lo que era calcular el hash de la cabecera del email. Luego los bloques son los que requieren el trabajo computacional en el sistema bitcoin. Dicho trabajo lo proporcionan los nodos conectados a la red.

Cada bloque está enlazado con todos los anteriores mediante el hash del bloque anterior como parte del siguiente. Lo que significa que se tiene una cadena de bloques que se va moviendo hacia delante, todas enlazadas con el hash del bloque inmediatamente anterior. Existe el denominado bloque ***génesis***, creado el 3 de Enero del 2009. Cuando descargas el programa y lo ejecutas, éste entra en una sala IRC, de la cual recibirá toda la historia de los bloques generados hasta el momento. Como puedes estar pensando, conforme vaya pasando el tiempo, la cadena de bloques irá aumentando en tamaño y puede exigir de una cantidad te tiempo importante obtenerla. Sin embargo, de nuevo se resuelve otro problema muy inteligentemente. Una vez que los bloques son lo suficientemente antiguos, se comprimen, ya que no es necesario preocuparse de ellos debido al tiempo que ha transcurrido desde que se produzco la transacción.

Conocido el concepto de la cadena de bloques, lo que hacen los nodos es competir entre todos para crear el siguiente bloque. El nodo que gana, el que realiza la cantidad de trabajo necesaria para crear el siguiente bloque recibe 50 bitcoins.

Los nodos reciben todas las transacciones que aún no se han encapsulado en un bloque, calculan el hash de todo junto con el hash del bloque anterior. Con lo cual se está anclando dicho bloque a la cadena, evitando así que puedas crear un bloque que no esté enlazado con el anterior. Además, existe cierta dificultad la cual consiste en encontrar un bloque con las características que se mencionaron anteriormente, disponer de un número determinado de ceros en el hash empezando por el bit más significativo. *“En el momento de grabar el episodio, en número de ceros debía ser 12”, actualmente van por 14*. Con lo cual los nodos intentan crear hashes con este número de ceros, cuando lo consiguen, marcan el bloque como válido y lo transmiten a la red.

Hay páginas web que permiten ver la cadena de bloques, como <a href="http://blockchain.info/" target="_blank">bitcoinchain.info</a> o <a href="http://blockexplorer.com" target="_blank">bitcoinexplorer.com</a>, y puedes comprobar cómo los primeros 14 bits son cero, . Un ejemplo de bloque que proporcionaría 50 bitcoins al nodo que lo calculó sería <a href="http://blockexplorer.com/b/227954" target="_blank">este</a>, con el hash: **000000000000003a0e9b642d627fbfe8e07d8b946680c5dadc070dcacb754a29**

Como puedes comprobar en estas páginas, no es tan inusual que ocurran hashes con este número de ceros, ahora mismo los 3 primeros bloques se generaron hace 14, 20 y 35 minutos.

Ahora bien, puede que estés preguntándote que, si todo esto es público, cualquiera puede ver cuanto dinero gastas o recibes. De nuevo, el sistema está bien pensado y es totalmente anónimo. Lo único que se sabe de tí es la clave pública, ésta clave es la que proporcionas al público para que realicen transacciones contigo. No hay forma conocer quién hay detrás de la clave pública. Además, puedes crear tantos pares de claves privadas/públicas como quieras. Así que no es posible seguir la pista a una determinada clave, ya que puedes crear sin ningún problema tantas como quieras.

Como en estos momentos se puede ganar bastante dinero por el hecho de calcular los hashes, hay gente que tiene ordenadores exclusivamente dedicados a calcular hashes usando GPUs. Pero el sistema tenía previsto esto y automáticamente va cambiando la dificultad del problema para establecer el ratio al que se genera la moneda.

En realidad, nunca jamás se crearán más de 21 millones de bitcoins (A fecha 25 de Marzo del 2013 hay casi 11 millones), como estaba previsto, a los 4 años de lanzarse la mitad de del total se habrían creado, de hecho hace poco que se cumplieron los 4 añós del lanzamiento del sistema. En los proximos 4 años se crearán la mitad de la mitad, 5.250.000. De nuevo, en los siguientes 4 años a esos (Del año 8 al 12 contando desde el lanzamiento), la mitad de 5.250.000 y así hasta completar los 21 millones. Como ves, el orden de creación de la moneda va decreciendo exponencialmente.

De esta manera se dispone de un ratio controlado de inflación dentro del sistema. Lo cual tiene sentido porque, inicialmente, conforme el sistema vaya usandose y se hagan disponibles bienes y servicios que comercien con el sistema, se quiere que se inserte más dinero a la red para tener bitcoins con los que comerciar. Pero no quieres que se vayan creando sin cesar.

El problema sería, por supuesto, que dejaramos ese número en 21 millones para siempre y existiera una demanda mucho mayor, la tendencia sería querer más. Sin embargo, la solución es que no estás obligado a comerciar con valores enteros de bitcoins. Puedes usar hasta 8 dígitos decimales. Lo cual permite que haya deflación con el tiempo, ya que estamos estableciendo el número total de monedas a 21 millones. Se sabe que irá descendiendo a lo largo del tiempo, así que no importa cuanta potencia de GPUs se introduzca en el sistema. El sistema se ajusta de forma que el problema computacional a resolver sea a escala &#8212; la dificultad escala hasta equilibrar la cantidad de potencia de procesamiento en la totalidad de la red.

Para ir terminando, lo que se ha conseguido crear con este sistema es una moneda virtual que es capaz de mantenerse por sí misma.

Para que te hagas una idea de la capacidad total de procesamiento de la red. Puedes ver estadísticas en <a href="http://blockchain.info/stats" target="_blank">blockchain</a>. A dia de hoy la fuerza total de hashing es de 46,932.04 GH/s, eso son 46 billones de operaciones de hash por segundo. Puedes consultar el gráfico <a href="http://blockchain.info/charts/hash-rate?showDataPoints=false&show_header=true&daysAverageString=1&timespan=all&scale=0&address=" target="_blank">aquí</a>. El que consigue resolver el hash gana 50 bitcoins, pero ese valor también decrece con el tiempo. Para los primeros 210.000 bloques son 50, luego va decrementando a la mitad.

Así que, el sistema está diseñado para escalar correctamente y crear una moneda segura y estable, con valor real. En el PDF que enlacé al principio, el autor habla del único ataque que podría realizarse contra el sistema, que consistiría en spoofear la cadena de bloques, ya que es ésta la que proporciona la integridad del sistema. Sin embargo, conforme la cadena se vuelve más grande y más nodos haya, se hace practicamente imposible que alguien con capacidad computacional masiva pueda atacar la cadena.

### Conclusión

Si has conseguido llegar hasta aquí leyendo, espero que te haya quedado más claro cómo funciona el bitcoin. Personalmente a mi me llamó mucho la atención cómo se ha estructurado este sistema de forma que no esté sujeto al estado de ningún país, es seguro desde el punto de vista criptográfico y además, una moneda real totalmente anónima. No dudes en dirigirte a bitcoin.org para obtener más información. A continuación dejo el podcast del episodio original de [Security Now!][1]. Si estás interesado en las traducciones que hago de este programa, puedes suscribirte al feed RSS específico para Security now en la página [Feed/Rss][5].

<span class="embed-youtube" ></span>

#### Referencias

** »» <a href="http://www.grc.com/securitynow.htm" target="_blank">grc.com</a>



 [1]: https://elbauldelprogramador.com/security-now//
 [2]: https://elbauldelprogramador.com/opensource/
 [3]: https://elbauldelprogramador.com/?s=criptografia
 [4]: https://elbauldelprogramador.com/lo-ultimo-en-criptografia-fully-homomorphic-encryption/
 [5]: https://elbauldelprogramador.com/rssfeed/
