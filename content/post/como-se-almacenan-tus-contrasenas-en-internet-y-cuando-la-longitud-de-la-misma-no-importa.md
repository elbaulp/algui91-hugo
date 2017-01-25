---
author: alex
amp:
  elements: [amp-youtube]
categories:
- articulos
- how to
- internet
- seguridad
color: '#F57C00'
date: 2015-07-14 21:00:00
description: "Cuando alg\xFAn sitio web que usamos frecuentemente es hackeado, comprometiendo
  las contrase\xF1as de los usuarios, probablemente pensemos en la seguridad online.
  \ pero, \xBFQu\xE9 quiere decir realmente cuando un sitio es hackeado?, \xBFy c\xF3mo
  podemos protegernos? A continuaci\xF3n se explica c\xF3mo se almacenan las contrase\xF1as
  en internet, y c\xF3mo te afecta cuando la web que usas se ve comprometida."
image: 2012/07/original2.jpg
lastmod: 2015-07-14

mainclass: articulos
url: /como-se-almacenan-tus-contrasenas-en-internet-y-cuando-la-longitud-de-la-misma-no-importa/
tags:
- algoritmos de cifrado
- metodos de cifrado
- seguridad
- "c\xF3mo funciona un salt"
title: "C\xF3mo se almacenan tus contrase\xF1as en internet (y cuando la longitud
  de la misma no importa)"
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/original2.jpg" alt="" title="original" width="640px" height="360px" />
</figure>

Cuando algún sitio web que usamos frecuentemente es hackeado, comprometiendo las contraseñas de los usuarios, probablemente pensemos en la seguridad online. pero, ¿Qué quiere decir realmente cuando un sitio es hackeado?, ¿y cómo podemos protegernos? A continuación se explica cómo se almacenan tus contraseñas en internet, y cómo te afecta cuando la web que usas se ve comprometida.

Existen numerosas formas de almacenar contraseñas, algunas más seguras que otras. Veamos algunos de los métodos más populares, y cómo afectan a la seguridad de tus datos.

<!--more--><!--ad-->

### Método uno: Contraseñas en texto plano

**Cómo funciona:** La forma más sencilla para una web de almacenar tu contraseña es en texto plano. Lo que significa que en algún lugar de sus servidores, existe una <a href="/bases-de-datos/" target="_blank">base de datos</a> con tu usuario y contraseña escrita en un formato legible para los humanos (Si tu contraseña es `testing123`, se almacena en la base de datos como `testing123`). Cuando introduces tus credenciales en el sitio, se comprueban con la base de datos para ver si coinciden. Éste es claramente el peor método de todos, en términos de <a href="/categories/seguridad/" target="_blank">seguridad</a>. La gran mayoría de sitios con reputación no usan este método. Si alguien compromete esta base de datos, las contraseñas de todo el mundo serán comprometidas inmediatamente.

**¿Importa la seguridad de mi contraseña?** De ninguna manera. No importa cual sea la longitud de tu contraseña o cómo de segura sea, si está almacenada en texto plano y el sitio es comprometido, tu contraseña será accesible por todo el mundo, sin ningún trabajo. Aún así, sí que importa en términos de ocultar la contraseña de amigos y conocidos, que pueden intentar adivinarla, pero no hay nada que hacer en el caso de que el sítio se vea comprometido.

### Método dos: Cifrado de contraseña básico

**Cómo funciona:** Para añadir más protección a la contraseña de la que proporciona el texto plano, la mayoría de los sítios cifran la contraseña antes de almacenarla en sus servidores. El cifrado, para aquellos que no lo sepan, usa una clave especial para convertir la contraseña a una cadena de texto aleatoria. Alguien que disponga estas cadenas aleatorias de texto, no será capaz de loggearse en tu cuenta a no ser que sepa la clave, la cual podría usar para descifrar la contraseña.

El problema es que a menudo la clave se almacena en el mismo servidor en el que se encuentran las contraseñas, por lo que si el servidor se compromete, no hay gran trabajo que realizar para descifrar todas las contraseñas, con lo cual este método sigue siendo tremendamente inseguro.

**¿Importa la seguridad de mi contraseña?** No. Ya que es fácil descifrar la contraseña conociendo la clave, no importa cómo de segura sea tu contraseña. De nuevo: hablamos en términos de que el sítio se vea comprometido; si tienes un amigo o familiar cotilla hurgando en tus cosas, una contraseña segura puede ayudar a evitar que la adivinen.

### Método tres: Contraseñas con Hash

**Cómo funciona:** Un hash es similar al cifrado en el sentido en que también cambia la contraseña por una cadena de texto larga, formada por letras y números. Sin embargo, a diferencia del cifrado, el hash es una calle de un solo sentido: Si se dispone del hash, no es posible ejecutar el algoritmo invertidamente para obtener la contraseña original. Lo que significa que se tendrán que obtener los hashes e intentar diferentes combinaciones de contraseñas para ver cual de ellas coincide.

Aún así, hay un inconveniente en este método. Aunque no se puede descodificar un hash a su contraseña original, se pueden intentar contraseñas diferentes hasta que alguna coincida con el hash que se robó de la base de datos. Los ordenadores pueden hacer esto muy muy rápido, y con la ayuda de una cosa llamada *rainbow tables (tablas de arco iris)* &#8212; que es esencialmente una lista de miles de millones de hashes diferentes y sus correspondientes contraseñas. &#8212; Se puede mirar fácilmente en el hash que tenemos y ver si ya ha sido descubierta la contraseña. Puedes probrar escribiendo `e38ad214943daad1d64c102faec29de4afe9da3d` en google. Rápidamente vemos que es el hash <a href="http://es.wikipedia.org/wiki/Secure_Hash_Algorithm" target="_blank">SHA-1</a> para &#8216;password1&#8242;. Para más información sobre cómo funcionan las *rainbow tables* puedes visitar este artículo de <a href="http://www.codinghorror.com/blog/2007/09/rainbow-hash-cracking.html" target="_blank">Jeff Atwood</a>.

**¿Importa la seguridad de mi contraseña?** En este caso sí. Las *rainbow tables* están hechas de contraseñas que ya han sido rotas, lo que significa que las contraseñas débiles se crackean rápidamente. Su mayor debilidad, sin embargo, no es la complejidad, si no la longitud. Es mejor usar contraseñas largas (como el famoso comic de <a href="http://xkcd.com/936/" target="_blank">XKCD</a> llamado &#8220;correct horse battery staple&#8221;) en lugar de una corta y compleja (como kj$fsDl#).

### Método cuatro: Contraseñas con Hash y una pizca de sal (Salt)

*El término que normalmente se usa es salt, en lugar de su traducción, sal, sin embargo, voy a usar los dos terminos, salt y sal, para que la traducción quede comprensible*

**Cómo funciona:** Echar sal a un hash significa añadir una cadena de caracteres aleatoria &#8212; llamada &#8220;salt&#8221; &#8212; al principio o al final de la contraseña antes de crear el hash. Se usa un salt distinto para cada contraseña, incluso si el salt se almacena en el mismo servidor, se hará realmente dificil encontrar estos hashes &#8220;salteados&#8221; en los rainbow tables, ya que cada uno es largo, complejo y único. LinkedIn es conocido por *no* usar hashes salteados, de haberlos usado sus usuarios habrían estado más seguros cuando los <a href="http://lifehacker.com/5916177/65-million-linkedin-accounts-may-be-compromised-change-your-passwords-now" target="_blank">hackearon</a>.

**¿Importa la seguridad de mi contraseña?** Indudablemente, sin embargo, desafortunadamente hemos llegado a un punto en el cual los ordenadores tienen una gran capacidad de computación y pueden conseguirlo por fuerza bruta, incluso con contraseñas con salt. Puede llevar mucho tiempo &#8212; más que usar rainbow tables &#8212; pero aún así es factible. Lo cual significa que la seguridad de la contraseña cuenta, a más longitud y mayor complejidad, más tiempo llevará crackearla.

### Método cinco: Hashes lentos (*Slow Hashes*)

**Cómo funciona:** Ahora mismo, los expertos en seguridad <a href="http://chargen.matasano.com/chargen/2007/9/7/enough-with-the-rainbow-tables-what-you-need-to-know-about-s.html" target="_blank">están apostando por los hashes lentos</a> como la mejor opción para almacenar contraseñas. Funciones de hashes como MD5, SHA-1, y SHA-256 son relativamente rápidos: si introducimos una contraseña, nos devolverá el resultado hasheado rápidamente. En un ataque de fuerza bruta, el tiempo es el factor más importante. Usando hashes lentos &#8212; como el algoritmo <a href="http://en.wikipedia.org/wiki/Bcrypt" target="_blank">bcrypt</a> &#8212; los ataques de fuerza bruta tardarán mucho más, ya que cada contraseña necesita más tiempo para computarse.

**¿Importa la seguridad de mi contraseña?** De nuevo, las contraseñas seguras son más difíciles de romper por fuerza bruta, por lo tanto para este método sí que importa. Teniendo una contraseña segura tardará mucho, mucho tiempo en descubrirse.

### ¿Cómo evitar que tu contraseña sea filtrada?

Entonces, ¿Qué significa todo esto para el usuario? Esto es lo que deberías aprender de toda esta información:

  1. **No usar servícios con mala seguridad:** Aunque no podemos controloar cómo una compañía almacena nuestras contraseñas, podemos controlar con qué servícios darnos de alta. Nunca deberíamos darnos de alta con servícios que usan texto plano o cifrado para almacenar las contraseña, ya que son mucho más vulnerables. Una buena manera de averiguar lo que utilizan, de acuerdo al <a href="http://blog.cloudflare.com/keeping-passwords-safe-by-staying-up-to-date" target="_blank">servicio web CloudFlare</a>, es hacer click en el enlace &#8220;no recuerdo mi contraseña&#8221;. Si nos envía la contraseña en un email, significa que pueden acceder a la contraseña en sí, por lo tanto no está hasheada &#8212; y probablemente esté usando alguno de los métodos más débiles. Por supuesto, siempre se puede enviarles un correo y preguntarles, o mirar su FAQ para ver si proporcionan esa información.
  2. **Usar contraseñas seguras:** Como hemos demostrado más arriba, una contraseña más segura, es menos probable de que alguien la descifre rápidamente. La longitud es más importante que la complejidad. Recuerda: cualquier contraseña es crackeable, lo que queremos es que lleve el mayor tiempo posible.
  3. **Cambiar de contraseña siempre que un sitio sea comprometido:** Incluso si nuestra contraseña es segura, no significa que sea invulnerable &#8212; solo significa que llevará más tiempo. Aquellos con contraseñas débiles puede que ya tengan sus cuentas comprometidas incluso antes de darse cuenta que filtración se ha producido, pero si la contraseña necesita de días para ser crackeada, aún tenemos tiempo para cambiarla haciendo así que la contraseña antigua no sirva para nada.
  4. **Usar distintas contraseñas para cada sitio:** Si se usan contraseñas distintas para cada cuenta que tengamos, entonces esas cuentas estarán a salvo incluso si alguna de nuestras cuentas se compromete. Si usamos la misma contraseña para cada sitio, una vulnerabilidad en algún sitio puede significar un mundo de problemas para ti.
  5. **Usar OAuth si no estamos seguros sobre la seguridad del sitio:** Ya <a href="/entendiendo-oauth-que-ocurre-cuando-te-loggeas-en-un-sitio-con-google-twitter-o-facebook/" target="_blank">hablamos sobre OAuth antes</a>, un protocolo que permite logearnos usando la cuenta de Google, Facebook o twitter. Si no sabemos cómo de seguro es un sitio, y ofrece la opción de usar OAuth, úsalo &#8212; Es probable que Google, Facebook y twitter tengan mejor seguridad, y si el sitio es vulnerado, simplemente le denegamos acceso a nuestra cuenta de Google, Facebook o Twitter.

## Más cosas sobre seguridad

Dejando aparte la traducción de este artículo de LifeHacker me gustaría hablaros del tema de la seguridad en la web, del cual aprendí bastante al hacer un curso de <a href="/noticias/nuevos-cursos-disponibles-en-udacity-la-universidad-online-gratuita/" target="_blank">desarrollo de aplicaciones web</a> en <a href="/?s=udacity" target="_blank">udacity</a>, que impartía Steve Huffman, el creador de reddit.

A lo largo del curso hay un tema dedicado al registro de usuarios donde se usan muchos de estos métodos, sobre todo el hash con salt usando SHA-256. También se habla de bcrypt, que básicamente es igual que el anterior, pero recibe como parámetro un número, que será el tiempo que la función de cifrado estará sin hacer nada, para conseguir así el objetivo de que no sea posible descifrar las contraseñas tan rápido. Os dejo unos vídeos sobre el tema y recomiendo que hagáis el curso.

### Bcrypt

<amp-youtube
    data-videoid="S66XVE68NCc"
    layout="responsive"
    width="480" height="270"></amp-youtube>

### Rainbow Tables

<amp-youtube
    data-videoid="SOV0AeHuHaQ"
    layout="responsive"
    width="480" height="270"></amp-youtube>

### Crear Salts

<amp-youtube
    data-videoid="hcWQNwdQVx0"
    layout="responsive"
    width="480" height="270"></amp-youtube>

### Hashear Salts

<amp-youtube
    data-videoid="yBN3r2Fwze8"
    layout="responsive"
    width="480" height="270"></amp-youtube>

### Validar Salts

<amp-youtube
    data-videoid="gDLUM38mm6c"
    layout="responsive"
    width="480" height="270"></amp-youtube>

### Validar Salts (Solución)

<amp-youtube
    data-videoid="Zy6eNdzmn1w"
    layout="responsive"
    width="480" height="270"></amp-youtube>

Imagen | de <a href="http://www.shutterstock.com/pic.mhtml?id=47788978" target="_blank">palsur</a>
Fuente | <a href="http://lifehacker.com/5919918/how-your-passwords-are-stored-on-the-internet-and-when-your-password-strength-doesnt-matter" target="_blank">LifeHacker</a>
