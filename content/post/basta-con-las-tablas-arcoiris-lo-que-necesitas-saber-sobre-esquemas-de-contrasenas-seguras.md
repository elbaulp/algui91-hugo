---
author: alex
categories:
- articulos
- seguridad
mainclass: seguridad
date: '2016-01-01'
lastmod: 2017-09-23T13:11:28+01:00
description: "En la esfera social de bookmark (\u201Csocialbookmarkosphere\u201D)  se habla insistentemente de las \u201CTablas Arcoiris\u201C, cuál es el significado  real de password security, y por qué demuestran que Microsoft hizo un trabajo  de mala calidad en la seguridad de Windows for Workgroups *hace 15 años.*"
url: /basta-con-las-tablas-arcoiris-lo-que-necesitas-saber-sobre-esquemas-de-contrasenas-seguras/
tags:
- contraseñas
- hacking
title: "Basta con las Tablas Arcoiris: lo que necesitas saber sobre esquemas de contraseñas seguras"
---

<figure>
    <a href="/img/2012/08/rainbow1.png"><amp-img sizes="(min-width: 536px) 536px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="rainbow" alt="" src="/img/2012/08/rainbow1.png" width="536px" height="303px" /></a>
</figure>

En la esfera social de bookmark (&#8220;socialbookmarkosphere&#8221;) se habla [insistentemente][1] de las &#8220;<a href="http://www.codinghorror.com/blog/2007/09/rainbow-hash-cracking.html" target="_blank">Tablas Arcoiris</a>&#8220;, cuál es el significado real de *password security*, y por qué demuestran que Microsoft hizo un trabajo de mala calidad en la seguridad de *Windows for Workgroups* hace 15 años. Esto realmente me enloquece. Si el eje soporte &#8220;avanzado&#8221; de tu modelo de amenazas es &#8220;Tablas Arcoiris&#8221;, deja de trabajar en tu aplicación *Calendario Social de Compras* ahora mismo: no puedo confiar en ti con mi Reddit karma score, y mucho menos el número de mi tarjeta de crédito.

**Para comenzar, almacenamiento de contraseñas 101**: Los servidores <a title="Cómo se almacenan tus contraseñas en internet (y cuando la longitud de la misma no importa)" href="/como-se-almacenan-tus-contrasenas-en-internet-y-cuando-la-longitud-de-la-misma-no-importa/" target="_blank">no suelen almacenar las contraseñas reales</a>. En su lugar, encriptan la contraseña, guardan el hash, y descartan la contraseña. El valor del hash puede verificar una contraseña de una página de login, pero no puede ser revertido de nuevo al valor de la contraseña. Por lo tanto cuando inevitablemente pierdes tu tabla de contraseñas SQL, no se han expuesto todas las contraseñas; sólo lo residual.

Ahora re-expliquemos las Tablas Arcoiris:

<!--more--><!--ad-->

1. Toma un &#8220;diccionario&#8221; - por ejemplo, todas las combinaciones de caracteres alfanuméricos con menos de 15 caracteres.
2. Encríptalas a todas.
3. Graba los resultados en un DVD.

Ahora tienes cientos de billones de valores hash que pueden revertirse al valor original - una &#8220;tabla arcoiris&#8221;. Para usarla,

1. Toma tu tabla de hashes robada
2. por cada hash
3. búscala en la tabla arcoiris

Si está allí, lo resolviste.

**Lo que necesitas saber sobre Tablas Arcoiris: ningún esquema moderno de __contraseñas__ es vulnerable a ellos.**

Las Tablas Arcoiris son de fácil acierto. Para cada clave, genera un número aleatorio (un &#8216;*nonce&#8217;*). Genera el hash de la contraseña con el nonce, y almacena ambos valores. El servidor dispone de información suficiente para verificar contraseñas (el nonce se guarda descubierto). Pero incluso con un pequeño valor aleatorio, digamos, 16 bits, las tablas arcoiris son inviables: en la actualidad hay 65.536 &#8220;variantes&#8221; de cada hash, y en vez de 300 billones de entradas en la tabla arcoiris, necesitas cuatrillones. El nonce en este esquema se llama &#8220;salt&#8221; (sal).

Genial, ¿no? Sí, y la <a href="http://en.wikipedia.org/wiki/Crypt_%28Unix%29" target="_blank">criptografía Unix</a> - casi el *mínimo común denominador* en sistemas de seguridad - ha tenido esta característica <a href="http://static.usenix.org/events/usenix99/provos/provos_html/node9.html" target="_blank">desde 1976</a>. Si esto son novedades para tí, no deberías estar diseñando sistemas de contraseñas. Usa alguna buena de otro.

**No, en serio. <a href="http://www.openwall.com/john/interviews/SF-20060222-p3" target="_blank">Usa algún sistema de contraseñas de otro</a>. No construyas uno propio.**

La mayoría de los peores problemas de seguridad de la industria (como el famoso y deficiente hash LANMAN) sucedieron porque inteligentes desarrolladores enfocaron el código de seguridad de la misma forma que hicieron el resto del código. La diferencia entre el código de seguridad y el código de la aplicación es que cuando el de la aplicación falla, lo descubres en el momento, pero cuando falla el de seguridad, te enteras 4 años más tarde, cuando un DVD con todos los códigos de tarjetas de crédito de tus clientes y la información CVV2 comienza a circular en Estonia.

Aquí hay un esquema de vanguardia de un post reciente de un blog sobre Tablas Arcoiris y Salts:

    hash = md5('deliciously-salty-' + password)

Hay al menos dos problemas con este código. Sí, el autor no sabe que es un salt; &#8220;deliciously-salty-&#8221; is not a nonce (además, Jeff, a tu computadora realmente no le interesa si separas la contraseña de el nonce con un guión; es una computadora, no una maestra de 2do grado).

**Pero hay un problema mucho mayor con este código: las letras &#8220;md5&#8243;.**

**Dos razones.

- Estás esperando que haga una crítica severa acerca de cómo no hay <a href="http://www.reddit.com/r/programming/comments/2fu8q/we_worship_md5_the_god_of_hash/c2fwf2" target="_blank">ninguna cualidad redentora</a> para justificar <a href="http://www.skrenta.com/2007/08/md5_tutorial.html" target="_blank">el uso de MD5 en 2007</a>. Eso es cierto (MD5 está roto, es demasiado lento para usarlo como un hash de propósito general, etc.) Pero ese no es el problema.
- El problema es que MD5 es rápido. Entonces lo son sus competidores modernos, como SHA1 y SHA256. <a href="http://cr.yp.to/hash127/faq.html" target="_blank">La velocidad es un propósito de diseño</a> de un hash seguro moderno, debido a que los hashes son bloques de construcción de casi todos los sistemas criptográficos, y usualmente tienen &#8216;demanda de ejecución&#8217; de nivel &#8216;por paquete&#8217; o &#8216;por mensaje&#8217;.

**La velocidad es exactamente lo que no quieres en una función de hash de contraseñas.**

- Los esquemas modernos de contraseñas son atacados con cracker de contraseñas incrementales. Crackers incrementales no precalculan todas las posibles contraseñas crackeadas. Consideran cada hash de contraseña individualmente, y alimentan su diccionario a través de la función de hash de contraseña de la misma manera que tu página de login de PHP lo haría. A los crackers de Tablas Arcoiris les gusta que Ophcrack use espacio para atacar contraseñas; los crackers incrementales como John the Ripper, Crack y LC5 trabajan con tiempo: estadísticas y cómputo.
- En el juego de atacar contraseñas se gana puntos según el tiempo consumido para crackear una contraseña X. Con las tablas arcoiris, ese tiempo depende de qué tan grande tu tabla necesita ser y que tan rápido puedes buscarla. Con crackers incrementales, el tiempo depende de qué tan rápido puedes hacer correr tu función de hash de contraseñas.
- Cuanto más puedas optimizar tu función, más rápida se vuelva, más debil tu esquema es. MD5 y SHA1, incluso cifradores de bloque convencionales como DES, son diseñados para ser rápidos. MD5, SHA1 y DES son hasheadores de contraseña débiles. En las CPU modernas, crudos bloques de construcción encriptada como DES y MD5 pueden ser<a href="http://citeseer.ist.psu.edu/cache/papers/cs/5811/http:zSzzSzwww.dmi.ens.frzSz~porninzSzbitslice.pdf/pornin99automatic.pdf" target="_blank"> separados en bits</a>, <a href="http://www.openwall.com/john/doc/CHANGES.shtml" target="_blank">vectorizados y paralelizados</a> para hacer búsquedas de contraseña rápidas como un rayo. Dejar <a href="http://www.east.isi.edu/~bschott/pubs/grembowski02comparative.pdf" target="_blank">fuera de juego a las implementaciones FPGA</a> costó sólo cientos de dólares.

**Usar funciones hash caseras para autenticar las contraseñas es tan ingenuo como usar funciones hash salt. No lo hagas.**

¿Qué es lo nuevo aquí?

- **Primero, lo que tu sistema operativo ya te da**: un esquema de contraseñas &#8220;optimizado&#8221; para ser computacionalmente caro. El más famoso de estos es el esquema FreeBSD MD5 de <a href="http://en.wikipedia.org/wiki/Poul-Henning_Kamp" target="_blank">PHK</a>.
- La diferencia entre el esquema de PHK y el que estabas por usar para tu carrito de compras 2.0 es simple. Estabas por aplicar MD5 en un salt y la contraseña y luego guardar el hash. PHK aplica MD5 por miles de iteraciones. Ésto es lo que llamamos &#8220;*stretching*&#8221; (extenderse).
- El esquema MD5 de PHK es sencillo de codificar y está incluido en los sistemas operativos Linux y BSD. Si tienes que elegir entre el código PHP que tienes y el esquema de PHK, elige el de PHK o fallarás la auditoría PCI. [*]

**La respuesta más simple es &#8220;hashing adaptativo&#8221;**(adaptive hashing), el cual Neils Provos y David Mazieres inventaron para OpenBSD en 1999. Su esquema original<a href="http://www.usenix.org/events/usenix99/provos/provos_html/node1.html" target="_blank"> es llamado &#8220;bcrypt</a>&#8220;, pero la idea es más importante que el algoritmo.

Hay tres grandes diferencias entre Provos-Mazieres y el esquema de PHK:

1. Bcrypt fue inventado por dos hombres inteligentes y el de PHK fue

```bash
inventado sólo por un hombre inteligente. Eso es literalmente el doble de inteligente.
```

2. Bcrypt usa Blowfish en lugar de MD5. Blowfish es un cifrador en bloque con un notoriamente caro tiempo de configuración. Optimizar Blowfish para que sea más rápido, tendrías que contribuir con un importante avance en la criptografía. Nuestros practicantes de seguridad son todos &#8220;apostadores&#8221;, y usualmente nos gusta apostar a lo que nos &#8220;demande importantes avances en criptografía&#8221;.
3. Provos y Mazieres extendieron Blowfish. Se llaman los suyos: "Eksblowfish". Eksblowfish es más deplorable: el tiempo de configuración tarda más que Blowfish. ¿Cuánto más? *Tu llamado.* Puedes hacer que un intento con contraseña simple lleve milisegundos, o puedes hacer que tarde horas.

¿Por qué bcrypt es como un gran acierto? Piensa en el problema desde dos perspectivas: el servidor, y el atacante.

Primero, el servidor: tienes decenas de miles de logins por hora, o decenas por segundo. Comparado con los impactos en la base de datos y los refrescos de página y E/S, el checkeo de contraseña es despreciable. No te preocupes si tu testeo de contraseña tarda el doble de tiempo, o incluso diez veces más, porque los hash no caen dentro del rango 80/20.

Ahora, el atacante. Esto es fácil. El atacante se preocupa mucho si los tests de contraseña toman el doble de tiempo. Si un testeo de contraseña tarda el doble, el tiempo total de crackeo de contraseña tarda también el doble.

¿Comprendes?

La mayor ventaja del hashing adaptativo es que puedes ajustarlo. De la misma forma que las computadoras son cada vez más rápidas, el mismo bloque de código continúa produciendo contraseñas que son difíciles de crackear.

**Finalmente, como tu abogado en este asunto, me veo obligado a informarte sobre SRP.**

SRP es el protocolo de Contraseña Remota Segura de Stanford (<a href="http://srp.stanford.edu/design.html" target="_blank">Stanford Secure Remote Password</a> protocol). Es un sistema de criptografía de clave pública diseñado para almacenar y validar contraseñas de forma segura sin guardarlas o transmitirlas sin cifrar.

Este objetivo de diseño es mucho mejor de lo que suena, ya que hay usualmente algunas cuestiones inevitables en el diseño de sistemas de contraseñas:

1. Puedes guardar el hash de la contraseña. Ahora si pierdes la base de datos de contraseñas, no expones las contraseñas efectivas. No obstante, tampoco tú sabes el valor real de las contraseñas, lo que significa que para validarlas, tus clientes necesitan enviártelas sin encriptar.
2. Puedes usar un esquema de desafío-respuesta (*challenge-response)*, donde ambos lados usan un problema matemático para demostrarse entre sí que conocen la contraseña, pero ninguno de los dos lados envía la contraseña sobre la red. Estos esquemas son buenos, pero no funcionan si ambos lados no tienen acceso al valor real de la contraseña – en otras palabras, el servidor tiene que almacenarla sin encriptar.

La mayoría de los practicantes elegirán el esquema de hashing. Ambos ataques – robo de bases de datos y contraseñas robadas por *phishing –* ocurren todo el tiempo. Pero las bases de datos robadas comprometen más contraseñas.

SRP resuelve las compensaciones. Es una extensión de Diffie-Hellman. El detalle destacado de esta publicación: en lugar de almacenar un hash de la contraseña con *salt*, almacenas un “verificador”, el cual es un número elevado a la (obviamente muy grande) potencia del módulo N del hash de la contraseña.

Si entiendes DH, SRP simplemente va a tener sentido para ti. Si no, <a href="http://en.wikipedia.org/wiki/Diffie-Hellman" target="_blank">Wikipedia te explicará mejor que yo</a>. Para la prueba del próximo miércoles, necesitas saber:

  * SRP está relacionado con Diffie-Hellman.
  * SRP es un protocol *desafío-respuesta* que permite al servidor que demuestre que sabes la contraseña sin que la misma se inserte en la red.
  * SRP no require que almacenes las contraseñas en texto plano; sino que las guardas en un verificador criptográfico no-revertible.
  * Los verificadores SRP “Cracking” rápidamente podrían involucrar un avance singificativo a la criptografía.
  * SRP es lo suficientemente simple para correr sin Javascript.

¡Increíble! ¿Por qué no estás usando SRP en este preciso momento? Te dare tres razones:

  * SRP está patentado
  * Para hacerlo funcionar de forma segura en un navegador, tienes que cubrir la página de login sobre SSL; de otra forma, <a href="http://www.matasano.com/log/251/oh-meebo/" target="_blank">como Meebo</a>, te enredarás en un esquema que puede ser mordido por cualquiera que pueda hacer *phishing *una página web.
  * SRP es fácil de estropear, por lo que los primeros N mainstreams de Rails o PHP o las implementaciones Pylons SRP serán trivialmente bypassables por al menos el primer año hasta que sean implementadas.

¿Qué hemos aprendido?

Aprendimos que si es 1975, puedes incendiar ARPANet con un ataque de Tabla arcoiris. Si es 2007, un ataque de ese tipo te incendia a tí, aprendimos que deberías volver a 1975 y esperar 30 años antes de intentar diseñar un esquema de hashing de contraseñas.

Aprendimos que si hemos aprendido algo de este post, deberíamos consultar a nuestros amigos y vecinos en el campo de seguridad pidiendo ayuda con nuestros esquemas de contraseñas, porque nadie va a encontrar el error que termine el juego de nuestros esquemas MD5 hasta el momento después de que el número de tarjeta de crédito de mi madre sea vendido en un puesto de ruta en Tallinn, Estonia.

Aprendimos que en un esquema de hashing de contraseñas, la velocidad es el enemigo. Aprendimos que MD5 fue diseñado para velocidad. Entonces, aprendimos que MD5 es el enemigo. También Jeff Atwood y Richard Skrenta.

Finalmente, aprendimos que si queremos almacenar contraseñas en forma segura tenemos tres opciones razonables: el esquema MD5 de PHK, el esquema Bcrypt de Provos-Maziere y SRP. Aprendimos que la opción correcta es Bcrypt.

[∗] *Disclaimer: I cannot actually flunk your PCI audit.*

Fuente | <a href="http://chargen.matasano.com/chargen/2007/9/7/enough-with-the-rainbow-tables-what-you-need-to-know-about-s.html" target="_blank">Matasano Security</a>

[1]: http://kestas.kuliukas.com/RainbowTables/
