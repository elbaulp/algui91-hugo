---
author: alex
amp:
  elements: [amp-youtube]
categories:
- security now
- seguridad
lastmod: 2017-10-10T20:18:56+01:00
date: 2017-09-10T12:41:58+01:00
description: "Hace unos años, hablé aquí sobre la idea de Steve Gibson, SQRL, sistema con el que pretende eliminar el uso de usuarios y contraseñas en internet. Unos dos años más tarde, con el proyecto bastante maduro, en Security Now!, Steve ha vuelto a dar detalles del funcionamiento de SQRL, y la verdad es que pinta pero que muy bien. En este artículo he usado como fuente el episodio 424 del podcast."
image: SQRL-Secure-Quick-Reliable-Login-a-Fondo.png
mainclass: security-now
math: true
tags:
- "metodos de autenticación"
- SQRL
title: SQRL -Secure Quick Reliable Login a Fondo
---

<figure>
    <amp-img sizes="(min-width: 450px) 450px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/SQRL-Secure-Quick-Reliable-Login-a-Fondo.png" title="SQRL -Secure Quick Reliable Login a Fondo" alt="SQRL -Secure Quick Reliable Login a Fondo" width="450px" height="450px" />
</figure>

Hace unos años, hablé aquí sobre la idea de Steve Gibson, __SQRL__, sistema con el que pretende eliminar [el uso de usuarios y contraseñas en internet](/sqrl-y-la-idea-de-eliminar-el-uso-de-usuario-y-contrasena-en-internet/). Unos dos años más tarde, con el proyecto bastante maduro, en [Security Now!](/security-now/ "Todos los artículos traducidos"), Steve ha vuelto a dar detalles del funcionamiento de __SQRL__, y la verdad es que pinta pero que muy bien. En este artículo he usado como fuente el episodio [\#424](https://twit.tv/shows/security-now/episodes/424) del podcast.

<!--more--><!--ad-->

# Resumen

Antes de empezar con los detalles, a continuación se muestra un resumen del sistema de autentificación:

## El concepto principal

- Una __HMAC__ cuya clave es un número grande generado aleatoriamente.
  - Un código de autentificación basado en Hashes.
  - Similar a cuando se usa una clave en otros sistemas para [cifrar/descifrar](/como-cifrar-archivos-con-openssl/ "Cómo cifrar archivos con openssl").
  - Una forma de crear un *keyed hash* (Un hash, de alguna manera, que venga dado por una clave).
- Cada usuario obtiene su propia función hash.
- A cada [dominio](/como-configurar-un-servidor-dns/ "Configurar un servidor DNS") de un sitio web se le aplica un hash para producir una clave privada personal.

## La jerarquía de claves de SQRL

- Código de recuperación de 24 dígitos, como una carta para “Salir de la cárcel”.
- Es posible que nunca se necesite este código.
- La [contraseña](/como-se-almacenan-tus-contrasenas-en-internet-y-cuando-la-longitud-de-la-misma-no-importa/ "Cómo se almacenan tus contraseñas en internet del usuario").

## ¿Qué ocurre si queremos otra identidad para el mismo sitio?

- Si mi mujer y yo queremos entrar a Facebook con el mismo pc, se crean IDs alternativos para cada uno.

## ¿Qué pasa si me me roban mi identidad SQLR?, ¿O si creo que me la robaron?

- Bloqueo de identidad.
- Se puede bloquear/desbloquear una identidad fácilmente
- Regenerar las claves para una identidad.

## ¿Qué pasa si quiero dejar de usar SQRL?

- Eliminar/reemplazar las identidades.
- Las identidades poseen un ciclo de vida completo que puede administrarse.

## ¿Y si un sito fraudulento muestra un ID de __SQRL__ de otro sitio web?

- El problema del spoofing se hablará a lo largo del artículo.

<hr />

# __SQRL__ Revised

Antes de comenzar, expliquemos los dos conceptos más importantes en los que se basa SQRL. El primero es el aspecto [criptográfico](/lo-ultimo-en-criptografia-fully-homomorphic-encryption/ "Lo último en criptografía: Fully Homomorphic Encryption"), es decir, cómo tener una [clave secreta](/chuleta-de-comandos-para-gpg/ "Chuleta de comandos para GPG") para un cifrador, para uno como __AES__, o __Blowfish__. Es decir, a un cifrador se le pasa un texto plano, y devuelve un texto cifrado, usando la clave secreta. A eso se le llama un cifrador con llaves (_keyed cipher_).
El segundo concepto son los _hash_, como _SHA-256, SHA-1_ etc, de 256 bits y 160, respectivamente. A estos algoritmos se les introduce algo, de cualquier longitud, y devuelven un mensaje de longitud fija, dependiendo del algoritmo: 256 bits, 160, etc. No importa cómo de largo sea el mensaje a resumir.

Resulta que también se pueden tener funciones _hash_ con claves (_keyed hash_), actuando de forma similar a los cifradores. A estas funciones _hash_ se las llama _HMAC_ (_Hash Messgage Authentication Code_).

La diferencia pues, es que una función _hash_ es simplemente una función, _SHA-256_ es el mismo _SHA-256_ para todo el mundo, esta funcionalidad es útil para algunos casos, por ejemplo para comprobar que un fichero descargado no ha sido modificado por nadie. El que sube el fichero, publica el resultado de aplicarle la función _hash_, y cuando tú lo descargas, vuelves a pasárselo, si el resultado es el mismo, el fichero no ha sido alterado.

Si embargo, un _Keyed hash_ es distinto, la salida de la función viene determinada por la clave secreta. Por tanto, se tendrán tantas funciones _hash_ como posibles claves se puedan generar a partir de la longitud de la clave. Si la longitud de la clave es 256 bits, se pueden generar \\(2^{256}\\) distintas claves, y por tanto \\(2^{256}\\) distintas funciones _hash_. __SQRL__ usa un _keyed hash_.

# Cómo usa __SQRL__ la HMAC

Veamos un ejemplo. Imaginemos que vas a un sitio web, con lo cual tienes el dominio del sitio, por ejemplo amazon.com, o Twit.tv, el que sea. A ese dominio se le aplica un _hash_ usando _HMAC_, lo que devuelve un resumen de una longitud fija, pero usando como clave tu identidad de SQRL. Esta identidad se creará al momento de instalar SQRL, y cada usuario tendrá su propia función _hash_, completamente distinta de la de los demás. El resultado de la función _hash_ para el sitio visitado, por ejemplo amazon, será la clave privada para esa web.

SQRL genera una clave privada única para cada sitio web distinto que visitas, si dos usuarios de __SQRL__ visitan el mismo sitio web, la función _hash_ personal de cada uno dará un resultado distinto, ya que se está usando _HMAC_. Por tanto, usando una identidad maestra junto con la función _HMAC_, __SQRL__ crea una galaxia de claves privadas de tal modo que cada usuario tenga una clave distinta cuando visitan sitios distintos. Como dijimos antes, con \\(2^{256}\\) hay claves de sobra. Tantas que no hay que preocuparse por posibles colisiones.

Resumiendo lo visto hasta ahora, _SQRL_ consiste en un usuario con una identidad maestra, para el cual el sistema crea automáticamente una clave privada para cada sitio que visita. Eso sí, cuando se visita la misma web, se obtiene la misma clave privada.

## Uso de la clave privada

¿Qué se hace con la clave privada? Esta clave se basa en una curva elíptica, en concreto la de Dan Bernstein, por ser determinista, es decir, la clave no se elige aleatoriamente, porque tendría que almacenarse, memorizarla. Y de ser así, se tendrían que guardar para cada uno de los sitios visitados, bastante molesto. De este modo, pueden crearse sobre la marcha usando la identidad maestra y el nombre de dominio.

El siguiente paso es usar una función de la curva elíptica que obtiene la clave pública a partir de la privada, pero no funciona al contrario. A partir de la pública es imposible obtener la privada. Además, la clave pública será la identidad del usuario para esa web, y el servidor de la web la almacenará para identificarte.

Por último, cuando el usuario se identifica en un sitio web, la web dice _vale, dices que este eres tú, demuéstralo._ Para ello la web envía un trozo de datos aleatorio (único para cada usuario), el usuario los firma con su clave privada y lo devuelve a la web. De éste modo, sin exponer la clave privada, acabas de demostrar que la posees. Esto es _SQRL_ en esencia, proporcionar la clave pública a una web para identificarte. Cuando quieras volver a identificarte en ella, en lugar de usar el típico e inseguro usuario/contraseña, usando SQRL, la web envía un trozo de datos aleatorios, el usiario entonces le devolverá los datos firmados con la clave privada y la clave pública. Al haber usado la web anteriormente, ya conocía tu clave pública, verifica la firma y corrobora que tú eres quien dices ser y listo, identificado.

# ¿Y si alguien se hace pasar por mí?

Una identidad __SQRL__ es un sistema de dos personas (tú y todas las webs del mundo), el usuario es pseudoanónimo para todas las webs. Ya que cada sitio web ve al usuario como un token aleatorio (la clave pública). De este modo el usuario no puede ser rastreado, es decir, no hay forma de asociar tu identidad entre sitios webs. Además, la clave pública que proporcionas al sitio web solo es útil para dicho sitio, para ninguno más, a diferencia del usuario/contraseña. En esencia, con __SQRL__ no estás dándole a la web un secreto que guardar (la contraseña), no necesitan mantener segura la base de datos. Cualquiera podría descargarla y le sería inútil, a cualquiera salvo al sitio web.

# Cómo recuperar tu identidad

¿Cómo permitimos a los usuarios que sean responsables de su propia identidad, pero al mismo tiempo darles la opción de recuperarla si la perdieran, o se la robaran?

Lo primero a tener en cuenta es que __SQRL__ no usa tu identidad más secreta para funcionar, esa es la que guardaremos como último recurso. Lo primero que __SQRL__ hace es generar un “código de rescate”. Un número de 24 dígitos decimales. Este código es el que debe guardarse como el mayor de los secretos. Es tan secreto que no se guarda en ningún cliente SQRL. Cuando se configura __SQRL__ por primera vez, lo imprime por pantalla, y debes anotarlo, o imprimirlo como dígito o como [código QR](/estructura-y-seguridad-de-los-qr-codes/ "Estructura y seguridad de los QR codes").

Esta es la carta “Salir de la cárcel” de la que hablábamos al principio. Te sacará de cualquier problema. Y por ser tan poderoso, no se almacena. El único requisito es anotarlo o imprimirlo, y ponerlo en un lugar seguro. El código no puede regenerarse, ya que es completamente aleatorio. Es tu identidad maestra.

Una vez anotado o imprimido, __SQRL__ comienza el proceso de hash, aplicando múltiples hash, haciendo operaciones XOR. Tras aplicar iterativamente funciones hash al código, se obtiene lo que será la clave para la función hash del usuario, recuerda, una _keyed hash_ (_HMAC_). Ahora, la clave de la función hash se cifra con una contraseña usando la función [Scrypt](https://en.wikipedia.org/wiki/Scrypt), la cual hace totalmente inviable averiguar  la contraseña.

# ¿Y si me roban mi identidad?

Para ello se creó el _Identity Lock_ (Bloqueador de identidad), un protocolo consistente en una serie de ecuaciones. Conforme se les va proporcionando la clave pública a las webs, se les proporciona también información sobre el _identity lock_. Esta información se genera aleatoriamente por el cliente, y el protocolo permite al cliente generar dicha información para asegurar tu identidad, pero no probrarla. Por tanto, esto difiere de la capacidad anterior de __SQRL__ para probar tu identidad firmando puñado de datos que envía la web.

El objetivo del _identity lock_ es hacer deliberadamente que los clientes no sean capaces de probar algo en el futuro que ya aseguraron probar antes. Así, si el cliente queda fuera del control del usuario. No podría usarse para cambiar tu identidad en ninguna web en la que ya la hubieses establecido. De este modo, un ladrón en posesión de tu identidad, de tu código, contraseña... todo, no podrían eliminar tu identidad.

La segunda cosa que proporciona el código de recuperación (La carta para salir de la cárcel), al insertarlo en el cliente SQRL, permite cambiar tu identidad y re-habilitar la autenticación de haber sido deshabilitada, ya que es posible deshabilitar la autentificación para las webs, pero solo es posible rehabilitarlas con el código de recuperación.

# Deshabilitar la autentificación

La posibilidad de deshabilitar la autentificación es útil cuando por ejemplo, pierdes tu móvil, te lo confiscan, etc. En esos casos, tu identidad queda expuesta, pero con cualquier otro cliente SQRL puedes cargar tu identidad y deshabilitar la autentificación para tu identidad. Ningún intruso podrá cambiar tu identidad y tú puedes deshabilitarla, pero para reactivarla necesitarás el código de recuperación. Si alguna vez pasa algo así, al reactivarla con el código, es posible regenerar la identidad (_rekeyed_).

# Conclusión

Esto en esencia es SQRL, bastante prometedor. A continuación dejo el episodio del podcast y la documentación de SQRL.

# Fuentes

- Documentación oficial SQRL | [gcr.com](https://www.grc.com/sqrl/sqrl.htm)

<amp-youtube
    data-videoid="hsotcaizGjM"
    layout="responsive"
    width="480" height="270"></amp-youtube>
