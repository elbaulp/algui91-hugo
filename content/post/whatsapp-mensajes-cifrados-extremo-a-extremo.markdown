---
author: alex
amp:
  elements: [amp-youtube]
categories:
- security now
color: '#00BCD4'
date: 2016-04-23 22:05:58
description: "Seguro que muchos últimamente os preguntáis qué significa ese
  mensaje que aparece en vuestras conversaciones de WhatsApp: \u201CLas llamadas y
  mensajes enviados a este chat ahora están seguros con cifrado extremo a extremo\u201D.
  Para los curiosos, en el podcast Security Now!, episodio 555 Steve explicó el
  protocolo que han implementado para mantener las conversaciones y llamadas de __WhatsApp__
  seguras. He pensado que puede ser de interés para los lectores del blog, así
  que lo he traducido. Comencemos"
image: WhatsApp-Entendiendo-Su-Cifrado-Extremo-a-Extremo.png

mainclass: security-now
modified: null
url: /whatsapp-mensajes-cifrados-extremo-a-extremo/
tags:
- seguridad en whatsapp
- cifrado punto a punto whatsapp
- cifrado extremo a extremo WhatsApp
- Security Now!
title: 'WhatsApp: Entendiendo Su Cifrado Extremo a Extremo'
---

<figure>
<a href="/img/WhatsApp-Entendiendo-Su-Cifrado-Extremo-a-Extremo.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/WhatsApp-Entendiendo-Su-Cifrado-Extremo-a-Extremo.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="454px" /></a>
<span class="image-credit">Crédito de la imagen: <a href="https://whispersystems.org/blog/whatsapp­complete/ " target="_blank" title="whispersystems.org blog">whispersystems.org</a></span>
</figure>



Seguro que muchos últimamente os preguntáis qué significa ese mensaje que aparece en vuestras conversaciones de WhatsApp:

> Las llamadas y mensajes enviados a este chat ahora están seguros con cifrado extremo a extremo. Toca para más información.

Para los curiosos, en el podcast _[Security Now!](/security-now/)_, episodio 555 Steve explicó el protocolo que han implementado para mantener las conversaciones y llamadas de __WhatsApp__ seguras. He pensado que puede ser de interés para los lectores del blog, así que lo he traducido. Comencemos:

<!--more--><!--ad-->

## Resumen

Para el que no quiera entrar en detalles aquí los aspectos básicos son:

- __WhatsApp__ ha incorporado a su aplicación la el protocolo _Signal_ (Desarrolado por whispersystems).
- El protocolo _Signal_ proporciona a la seguridad de __WhatsApp__ las siguientes características:
  - Confidencialidad - Mensajes cifrados.
  - Integridad - Cualquier alteración de un mensaje será detectada y no se enviará el mensaje.
  - Autentificación - Es posible confirmar la identidad de la otra persona.
  - Consistencia de los participantes - Por defecto está desactivado.
  - Validación del destinatario - Relacionado con las dos anteriores.
  - Confidencialidad directa (Forward secrecy)  - Si se compromenten las claves privadas en el futuro, no se podrán descifrar mensajes antiguos.
  - Confidencialidad futura (Future secrecy) - Ocurre lo mismo para claves que fueron comprometidas, con ellas no se podrán descifrar mensajes.
  - Imposibilidad de vinculación de mensajes (Message unlinkability) - Los mensajes son asíncronos, independientes, pueden perderse.
  - Repudiación de mensajes - El destinatario puede recrear un mensaje válido del emisor.
  - Asincronía - Los mensajes pueden encolarse en el servidor hasta que el destinatario esté conectado para recibirlos.

Lo que no proporciona este protocolo es:

- Preservación del anonimato - No es posible enviar mensajes de forma anónima.
- Requiere que el servidor almacene las claves públicas para poder mandar los mensajes.

Veamos ahora el tema con más detalle:

## De donde viene Signal

Signal es un protocolo que ha desarrollado _Open Whisper Systems_ a lo largo de los años como parte de su aplicación de mensajería SMS _TextSecure_. Durante todo este tiempo ha ido evolucionando hasta convertirse en el brillante protocolo que es hoy día, como pondremos de manifiesto en este artículo.

El objetivo principal del protocolo es porder enviar un mensaje de forma segura, aunque el destinatario no esté conectado en ese momento. El problema de esto, es que el mensaje necesita almacenarse temporalmente en un servidor, con los problemas de seguridad que esto conlleva. Es aquí donde los chicos de _Open Whisper Systems_ fueron refinando su protocolo con el paso de los años hasta conseguirlo. Cabe destacar que el protocolo es de <a href="https://github.com/whispersystems/" target="_blank" title="Repositorio en Github">código libre</a>.

## Qué ofrece el protocolo signal - Propiedades

La integración de _Signal_ con __WhatsApp__ ofrece a sus usuarios __confidencialidad__, lo cual se traduce en que las comunicaciones están cifradas. __Integridad__, que significa que cualquier alteración en un mensaje será detectada y no se producirá la transacción. Esto último implica que exite un código de autentificación de mensaje (una MAC). Por último, __autenticación__, aunque esto hay que activarlo, ya que está apagado por defecto (Veremos cómo activarlo más adelante). La __Autenticación__ significa que podemos verificar la identidad de la otra persona. Otra propiedad del protocolo es __validación del destino (Destination validation)__, esto significa que si alguna vez en el futuro, se compromete la clave privada no será posible descifrar mensajes antiguos (__Foward secrecy__). Del mismo modo disponen de __backward secrecy__, siendo lo contrario del anterior, si una clave privada antigua se ve comprometida, no será posible descifrar mensajes futuros. Estas dos últimas propiedades se consiguen con lo que se denominan _Ephemeral Keys_ o claves efímeras, este tipo de claves están en constante cambio y renegociándose continuamente, de modo que alguien que consiga una clave no podrá usarla. Por último, __Message unlinkability__ (Asincronía), los mensajes son asíncronos e independientes, pueden llegar en distinto orden, pueden perderse, y aún así el sistema seguirá siendo consistente.

## Cómo funciona el asincronismo

> Para lograr el asincronismo, los mensajes se deben encolar en un servidor a la espera de que el destinatario se conecte. Este proceso es realmente complicado y el traductor no tiene el conocimiento para hacerlo, pero en las referencias se proporcionan enlaces para los interesados que deseen profundizar en el tema.

Sí que se explicará por ecima el proceso. Llegado un punto ambas partes producen una curva elíptica, en concreto la curva 25519, el cual es el algoritmo de curva elíptica de __Bernstein__. Esta es la misma curva que usa Steve en su protocolo [SQLR](/sqrl-y-la-idea-de-eliminar-el-uso-de-usuario-y-contrasena-en-internet/ "SQRL y la idea de eliminar el uso de usuario y contraseña en internet").

Una vez creadas ambas claves Diffie-Hellman privadas y públicas, que son estáticas, crean un conjunto de claves efímeras. En el siguiente paso utilizan el acuerdo de llaves (Key agreement) de Diffie-Hellman tres veces: El primero es coger la clave privada y la clave efímera de la otra persona, el segundo Key Agreement es el mismo que el anterior pero lo hace el otro usuario, es decir, se coge la clave privada y la efímera del otro participante en la conversación. Por último, el tercer key agreement consiste en intercambiar las claves efímeras de ambos y usarlas con Diffie-Hellman. Se concatenan las tres y se obtiene una clave de sesión maestra.

Como se comentaba anteriormente, la complejidad del proceso es bastante alta.

## El concepto de Ratchet

En un protocolo interactivo, un _ratchet_ o trinquete es el termino usado cuando se quiere evolucionar una clave sobre la que ya se ha establecido una negociación. Conforme se van enviando mensajes, se avanza el trinquete. Para sincronizarlos, el usuario __A__ envía la primera mitad de su acuerdo con clave Diffie-Hellman sobre el usuario __B__. Hasta que no reciba la mitad restante del usuario __B__ no puede hacer nada. En el momento en el que el usuario __B__ envia su mitad de la clave, __A__ envia la parte que faltaba con un acuse de recibo afirmando que recibió la primera mitad de la clave de __B__. Ahora ambos tienen una clave pública Diffie-Hellman efímera intercambiada. Con esto ambos pueden realizar un _Key agreement_ Diffie-Hellman y obtener la siguiente clave ratchet.

## Sigal hace Offline Ratchet

El problema con el mecanismo anterior es que funciona solamente en tiempo real. En este caso es necesario poder enviar un mensaje aunque el destinatario no esté en línea. Para ello crearon el denominado __Offline Ratchet__. Si el emisor está enviando varios mensajes, a cada uno de ellos se le aplica un hash, para que ningún mensaje enviado comparta la misma clave. En el momento en que el receptor se conecta, ambas partes resincronizan sus Offline Ratchets.

## ¿Cómo se envía el primer mensaje de forma segura?

En un protocolo en tiempo real, se puede crear una clave compartida en tiempo real. Pero este sistema pretende que sea posible enviar un mensaje seguro a alguien con quien nunca has hablado. ¿Cómo se logra esto?

Los chicos de Whisper Systems lo solucionaron de una forma muy elegante. Al registrarte en tu aplicación __WhatsApp__ o Signal, se le envían al servidor 100 claves públicas efímeras con un identificador asociado. Esto permite a alguien que quiera enviarte un mensaje, y que nunca lo ha hecho hasta ahora, coger una de esas claves para poder mandarte el mensaje de forma segura. La ventaja de las claves efímeras es que solo se pueden usar una vez, y al estar identificadas en cuanto se usan el servidor las borra, es imposible que la misma clave se utilize dos veces. Digamos que pueden verse como una caché de claves de un solo uso, de usar y tirar.

## Autentificación

Hasta ahora todo lo que han desarrollado en Whisper Systems ha sido un éxito, una obra maestra. Sin embargo, en este tipo de protocolos siempre hay un punto que flaquea, y ese punto es la autentificación. Autentificación significa que tienes la certeza de que con quien hablas es quien tú crees que es. En threema por ejemplo, lo resolvieron con el sistema de tres puntos y colores. Un punto rojo significa que simplemente esa persona está en tu lista de contactos, dos puntos y amarillo que ambos os tenéis en la lista de contactos. Por último, tres puntos y verde significa que ambos os habéis encontrado en persona y habéis leido el código [QR](/estructura-y-seguridad-de-los-qr-codes/ "Estructura y seguridad de los QR Codes") asociado a cada usuario, lo cual certifica que la persona __A__ dice ser quién es y __B__ lo sabe y al contrario.

En __WhatsApp__ y Signal, han hecho algo parecido, la imagen del inicio del artículo muestra un código QR en la pantalla, esa es la parte de autentificación de WhatsApp. En Whisper Systems entienden que este cabo es el único que no han atado, no hay forma de resolver el problema de la autenficación, en esta parte el usuario debe ser proactivo. Por este motivo se proporciona el código QR, junto con un número con 60 dígitos (Codificado en el QR). Este código QR es único para cada conversación, y ambos participantes deben tener exáctamente los mismos 60 dígitos. Una vez generado el código no debe cambiar nunca, si cambia es que hay alguien en medio escuchando la conversación o haciéndose pasar por la otra persona (Man in The Middle).

### Cómo verificar la identidad de un contacto

Para verificar que ambos tenéis el mísmo número basta con hacer click en la foto del contacto y pinchar en el icono de “Información”, allí encontraréis un apartado llamado “Cifrado/Encriptación”. Al pulsarlo aparecerá el código QR y un botón para escanear el de vuestro contacto. Debido a que ambos comartís el mismo código, este paso basta con que lo haga uno de los dos participantes, ya que lo único que se comprueba es que el número coincide.

### Recibir notificaciones de ataques Man In The Middle

Aún haciendo el paso anterior, nada nos protege si en algún momento las claves se ven comprometidas, para recibir notificaciones de seguridad hay que ir a los ajustes de nuestra cuenta de __WhatsApp__ y en la sección de seguridad activar la opción “Mostrar las notificaciones de seguridad”:

<figure>
<a href="/img/whatsapp-mensajes-cifrados-extremo-a-extremo-mostrar-notificaciones-de-seguridad.jpg"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/whatsapp-mensajes-cifrados-extremo-a-extremo-mostrar-notificaciones-de-seguridad.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="480px" height="800px" /></a>
</figure>

## Conclusión

Citando a Steve:

> __WhatsApp__ es una obra maestra, me quito el sombrero. Con Signal tenemos una solución perfecta, libre, multiplataforma, con librerías para varios lenguajes. No hay excusa para no usarla.

_Espero que os haya gustado el artículo, el resto de artículos traducidos están en [/security-now/](/security-now/)_

### Referencias

Para quien quiera seguir leyendo sobre el tema:

- [Enlace al podcast en twit.tv](https://twit.tv/shows/security-now/episodes/555 "Enlace al podcast")
- [Artículo sobre __WhatsApp__ en whispersystems.org](https://whispersystems.org/blog/whatsapp-complete/ "Artículo sobre __WhatsApp__ en whispersystems.org")
- [Artículo sobre Ratchets en whispersystems.org](https://whispersystems.org/blog/advanced-ratcheting/ "Artículo sobre Ratchets en whispersystems.org")
- [Página de __WhatsApp__ hablando sobre su seguridad](https://www.whatsapp.com/security/ "Página de __WhatsApp__ hablando sobre su seguridad")
- [Artículo sobre Seguridad asíncrona en whispersystems.org](https://whispersystems.org/blog/asynchronous-security/ "Artículo sobre Seguridad asíncrona en whispersystems.org")
- [Artículo sobre OTR en whispersystems.org](https://whispersystems.org/blog/simplifying-otr-deniability/ "Artículo sobre OTR en whispersystems.org")

<amp-youtube
    data-videoid="tFzAMEye9Dk"
    layout="responsive"
    width="480" height="270"></amp-youtube>
