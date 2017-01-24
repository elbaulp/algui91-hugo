---
author: alex
amp:
  elements: [amp-youtube]
categories:
- security now
color: '#00BCD4'
date: '2016-01-01'
layout: post.amp
mainclass: security-now
url: /como-funciona-http2-protocolo-que-acelera-considerablemente-la-navegacion-web/
tags:
- como funciona http2
- detalles tecnicos http2
- http2 y spdy
- "implementaci\xF3n http2"
- novedades http2
- protocolo http2
title: "C\xF3mo funciona HTTP/2, protocolo que aceler\xE1 considerablemente la navegaci\xF3n
  Web"
---

Hacía mucho tiempo que no traducía episodios del podcast [Security Now!][1]. Hoy os traigo la traducción del episodio [#495][2], donde *Steve* describió al detalle el nuevo protocolo HTTP2, el cual lo ha desarrollado *Google*. Primero echaremos un vistazo a lo que tenemos en la actualidad, qué problemas presenta y qué soluciones ofrece HTTP2.

## ¿Qué hay mal en el protocolo actual?

  * Páginas web inmensas
  * Un modelo textual basado en petición/respuesta muy simple. Es el cliente quien solicita recursos, no el servidor quien las envía por sí mismo.
  * Cada petición es independiente, stateless y no presupone de ningún conocimiento o contexto previo.
  * TCP es muy lento al iniciar una conexión.
  * La negociación inicial de TLS también es muy costosa.
  * Se realizan múltiples conexiones.

## HTTP2 corrige todos éstos problemas

HTTP2 se compone principalmente de (A lo largo del artículo se profundizará en éstos puntos):

  * **Frames**: Dividen la única conexión existente en varios frames enumerados. Se componen de:
      * Una cabecera de 9 bytes:
      * Los primeros 24 bits (Solo se usan 14 bits si no se tiene el permiso del otro pc)
      * 8 bits que determinan el tipo de *frame*.
      * 8 bits conteniendo los *flags* del *frame*.
      * 32 bits para el Identificador del flujo (**Stream ID**). El bit más significativo siempre es 0.
      * *Payload* de longitud variada.
  * **Streams** (*flujos*):
      * El solicitante puede asignarles prioridades.
      * Se les puede asignar inter-dependencias.
  * **Compresión de cabeceras HTTP**:
      * Cómo funciona LZ (*Lempel-Ziv*). (PKZIP, GZIP, LZW, LZA, etc).
      * Un único contexto comprimido para la conexión.
  * **Speculative Push** (Push especulativo).

Empecemos a profundizar en cada uno de éstos puntos:

<!--more--><!--ad-->

## Situación actual

Durante los últimos 15 años hemos convivido con HTTP/1, ¿Qué tiene de malo?, hoy en día todo el mundo lo usa. El problema es que en éstos últimos 15 años las webs se han vuelto locas. Han pasado de ser una simple página de texto con algunas fotos a webs con cantidades de recursos pesados, scripts, gráficos, css, librerías etc.

El navegador solicita el contenido en texto plano de la página web. Luego busca todos los recursos que dicha web necesita (anuncios, javascript, flash), en definitiva, plugins que necesitará cargar. Una vez sabe todo lo que necesita, comienza a solicitar éstos recursos a sus correspondientes servidores para comenzar a montar la web.

HTTP es el único protocolo que tenemos para hacer éste tipo de cosas, y no puede usarse más de una vez a la vez, es decir, se solicita algo, el servidor lo proporciona y la conexión se cierra. Éste problema intentó subsanarse con la cabecera `keep-alive`, para así al menos no tener que crear otra conexión TCP (costoso). Así podíamos realizar otra petición HTTP sobre la misma conexión TCP. Aún así, sigue siendo lento, solicitamos un recurso, lo recibimos, solicitamos, recibimos etc.

> El principal problema reside en que abrir una conexión TCP es muy lento.

Para solucionar ésto, TCP diseñó un sistema para explorar el ancho de banda disponible. Al principio, comienza a mandar paquetes léntamente (*slow-start*), aumenta la velocidad hasta que se dá cuenta que hay paquetes que se están perdiendo, entonces vuelve a bajar la velocidad e incrementa de nuevo poco a poco.

Con ésta solución, sigue habiendo un problema. Si abrimos varias conexiones, todas y cada una de ellas realizarán un *slow-start* para comprobar el ancho de banda entre los dos puntos. Lo cual no es óptimo. Si además la conexión es a un servidor seguro, se ralentiza aún más al deber establecer la conexión TLS.

Debido a que todo esto es un gran lío, y con el tiempo únicamente va a empeorar, **Google** ha decidido ponerse manos a la obra y solucionarlo. **Y lo han conseguido**.

> Actualmente, todos los navegadores soportan HTTP2.

# HTTP2

HTTP2 rompe completamente con lo que teníamos hasta ahora, no hay compatibilidad hacia atrás entre HTTP2 HTTP/1.1. El cambio más significativo es que **Sólo existe una única conexión**.

La razón por la que solo hay una conexión, radica en que no queremos varias conexiones comprobando cómo de rápido pueden transmitir datos. En su lugar, tendremos una conexión yendo a la máxima velocidad posible. Así tendremos una única negociación TLS y una única conexión TCP.

## Speculative push

A partir de ahora, los servidores tendrán algo llamado *speculative push*, algo equivalente a la especulación el los procesadores. En las CPUs modernas, el procesador va por delante de la ejecución actual ejecutando sentencias futuras, cuando se llega a una bifurcación, se ejecutan las sentencias de ambas ramas, una vez se ejecuta la condición necesaria para saber qué bifurcación había que coger, se descartan las intrucciones de la rama incorrecta. El *speculative push* es algo parecido, el servidor puede enviar algunas cosas que sabe que el navegador necesitará antes de que el éste las solicite.

## Frames

La única conexión existente se dividirá en en *frames*. Son una abstracción de HTTP2. Permiten soportar múltiples flujos simultáneamente. Hay que tener en cuenta que los *frames* no son paquetes. TCP, el protocolo que hay debajo, dividirá los *frames* en paquetes. Será TCP quién garantice que los paquetes perdidos llegarán al destino, y en el orden correcto. HTTP2 confía en que su comunicación se ve como un único flujo.

El flujo TCP se divide en *frames* de longitud aleatoria. Los *frames* están por encima de TCP en la capa de abstracción. Cada *frame* tiene una cabecera de 9 bytes

### Frame Header (La cabecera de los Frames)

```bash
+-----------------------------------------------+
| Length (24) |
+---------------+---------------+---------------+
| Type (8) | Flags (8) |
+-+-------------+---------------+-------------------------------+
|R| Stream Identifier (31) |
+=+=============================================================+
| Frame Payload (0...) ...
+---------------------------------------------------------------+

```

De los 9 bytes, los 24 primeros (3 bytes), componen la longitud del *frame*, es decir, la longitud del *payload* en dicho *frame*, sin contar los 9 bytes de la cabecera. Sin el permiso del otro participante en la conexión, sólo se usarán 14 de los 24 bits. De modo que, si ambas partes se ponen de acuerdo, un *frame* podría tener una longitud de 16MB (24 bits). Aunque normalmente se usarán como mucho *frames* de 16K bytes (14 bits). La mayoría de *frames* serán mucho más pequeños que eso.

Después de la longitud, los 8 bits siguientes (1 byte), especificarán el tipo de *frame*, lo cual deja espacio para 256 tipos de *frames*, actualmente hay pocos tipos. Luego hay otro byte que especifica los *flags* específicos del *frame*. Finalmente, los últimos 32 bits de la cabecera especifican el *stream ID*, o Id de flujo, que indica que él es el siguiente al *frame* con dicho ID. Por alguna razón, el bit más significativo siempre es 0.

En resumen, los *frames* pueden variar en tamaño desde muy pequeños hasta 16K, a no ser que ambas partes negocien un tamañó mayor. Luego un tipo de *frame* y sus *flags*. El *Stream ID* permite un flujo de hasta 4GB, así se reduce la posibilidad de agotar los posibles IDs para una conexión. Los múltiples flujos simultáneos permiten una conversación multiplexada entre los dos puntos. Es decir, que el navegador cree nuevos flujos.

## Conexión entre el cliente y el servidor

Recordemos que tenemos una única conexión entre el cliente y el servidor, es posible tener otras conexiones HTTP2, una por cada servidor que contribuye al contenido de la página solicitada. Pero la clave está en que se tiene una única conexión por servidor.

El cliente emite consultas para obtener recursos, numerando sucesivamente cada petición con un *Stream ID*, sobre la misma conexión. El servidor comienza a buscar los recursos solicitados y enviarlos.

> Por debajo de HTTP2, sigue existiendo HTTP/1.1, simplemente se encapsula en frames.

## Stream Priority (Prioridad de flujo)

Otra cosa que el cliente puede hacer con los flujos es asignarles prioridad. Por ejemplo, la página HTML principal, la cual es necesaria inmediatamente para obtener el resto de URLs necesarias para completar la carga de la web. Es posible asignar una prioridad a dicho recurso para que el servidor lo proporcione de inmediato. De esta forma, se puede establecer dependencias entre recursos.

## Los beneficios de una única conexión

Hagamos un breve repaso de lo visto hasta ahora. Tenemos una única conexión optimizada para ser veloz. Una vez establecida se comienza a enviar peticiones, empaquetándolas en *frames* y asignándoles un identificador único (*Stream ID*). En el lado del servidor, éste mira las dependencias y prioridades, enviándolas en el orden solicitado por el cliente.

El servidor va acumulando una gran cantidad de cosas a enviar y las lanza por la conexión todo lo rápido que puede, teniendo en cuenta las restricciones que el cliente haya establecido. Se mantiene así la única conexión tan ocupada como sea posible, sin existir pausas entre peticiones de recursos. Ésta es la gran diferencia con el protocolo anterior. Ya que, aunque hubiera 6 o más conexiones, había un periodo de espera entre solicitar y recibir cada uno de los recursos necesarios. El servidor básicamente esperaba a que el cliente se diera cuenta de qué recursos le hacían falta, ésto ya no pasa en HTTP2.

## Header Compression (Compresión de cabeceras)

Actualmente hay mucha redundancia en las cabeceras HTTP, ya que todas y cada una de ellas se envían en todas las peticiones, aunque sean iguales para cada petición (Ej, el user-agent, cookies, hora etc). Como se mencionó arriba, el protocolo HTTP típico, el textual sigue usandose sin modificar.

Para solucionar el problema de la redundancia en las cabeceras, hay que comprender cómo funciona la compresión. Todo se lo debemos a dos genios, **Lempel** y **Ziv**, de ellos viene la extensión .lz, creada por los 70. En ésta época adquirieron una patente llamada compresión Lempel-Ziv (Compresión LZ). Y así nació ZIP, GZIP, LZW, LZA etc. El concepto de compresión es el siguiente. Estamos enviando algo al otro punto del que el otro punto no sabe nada, y de hecho nosotros tampoco. Ésto se conoce como “*Stream compression*” (Compresión del flujo), ya que la idea es que estamos recibiendo bytes en un flujo, sin saber nada sobre su significado.

Conforme recibimos bytes de datos, sin saber nada más sobre ellos, volvemos a enviarlos, pero mantenemos un buffer con el número de X bytes más recientes enviados hasta el momento. Es decir, los enviamos y los guardamos en un buffer que almacenará lo que hemos enviado. Cuando vuelvas a recibir bytes, miraremos en el buffer en busca de patrones que coincidan con lo que nosotros enviamos anteriormente.

Ahora bien, si se va a enviar algo que ya enviamos recientemente, podríamos en su lugar enviar una referencia a dicha cadena que tenemos en nuestro buffer al otro extemo. El otro extremo está haciendo lo mismo, mantiene un buffer.

Ambos buffers están sincronizados. Nosotros mantenemos un buffer de lo que enviamos, el servidor mantiene uno de lo que recibe, que es lo que nosotros enviamos. De modo que al enviar una referencia a una cadena de nuestro buffer, apuntará a la misma cadena en el buffer del servidor. He aquí la compresión, enviamos una referencia en lugar de la cadena completa.

Éstos buffers reciben el nombre de “*compression context*” (Compresión de contexto).

Los genios de **Google**, han usado un contexto de compresión por conexión, no por flujo. Lo cual significa que obtenemos compresión en todas las consultas. Es decir, la consulta HTTP enviada en el primer flujo estará comprimida. Aunque no demasiado, ya que es la primera y nunca se han enviado esas cabeceras, la segunda consulta que vaya al mismo servidor, desde el mismo navegador, con las mismas cookies, el mismo user agent y todas las demás cabeceras redundantes, en el mismo contexto de compresión, enviará ésta vez referencias a las cabeceras del otro extremo.

En resumen, enviamos la cabeceras una vez, y a partir de ahí simplemente se enviarán referecias a las cabeceras

# Conclusión

Ésto es HTTP2. Mencionemos algunas cosas, el *speculative push* significa que el servidor puede anticipar qué recursos puede necesitar el cliente.

El cacheo de recursos en el cliente lo previene de tener que preguntar por más recursos, pero es un arma de doble filo, ya que el servidor puede enviar mediante *speculative push* algo que el cliente ya tuviera en su caché. De modo que no hay que hacer un uso excesivo del *speculative push*.

> Todo el mérito de éste protocolo es para Google

#### Referencias


<amp-youtube
    data-videoid="5EyROG4N3r4"
    layout="responsive"
    width="480" height="270"></amp-youtube>

*Borrador HTTP2* »» <a href="http://tools.ietf.org/pdf/draft-ietf-httpbis-http2-17.pdf" target="_blank">tools.ietf.org</a>
*Crédito de la imagen* »» <a href="https://httpwg.github.io/" target="_blank">https://httpwg.github.io/</a>



 [1]: https://elbauldelprogramador.com/security-now/
 [2]: http://twit.tv/show/security-now/495
