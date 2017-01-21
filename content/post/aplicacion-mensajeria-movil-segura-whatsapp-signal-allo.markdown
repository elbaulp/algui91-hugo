---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2016-06-23 17:16:56
description: "En este art\xEDculo se comparan WhatsApp, Signal y Allo en t\xE9rminos
  de seguridad y privacidad"
image: aplicacion-mensajeria-movil-segura-whatsapp-signal-allo.png
introduction: "Entre Whatsapp, Signal y Allo \xBFQu\xE9 app de mensajer\xEDa es m\xE1s
  segura y cuida m\xE1s tu privacidad?"
layout: post.amp
mainclass: articulos
tags:
- whatsapp
- signal
- Allo
- comparativa aplicaciones mensajeria
- whatsapp privacidad
- whatsapp seguridad
- aplicaciones mensajes seguras
- "cuales son las aplicaciones de mensajeria m\xE1s seguras"
title: "\xBFQu\xE9 Aplicaci\xF3n De Mensajer\xEDa M\xF3vil Es M\xE1s Segura?"
---

> Este artículo es un resumen de los aspectos más importantes de una nota que he leido en el blog de [Bruce Schneier](https://www.schneier.com/blog/archives/2016/06/comparing_messa.html "Comparing Messaging Apps") y del blog de [Michah Lee](https://theintercept.com/2016/06/22/battle-of-the-secure-messaging-apps-how-signal-beats-whatsapp/ "Battle of the Secure Messaging Apps: How Signal Beats WhatsApp") en el que se comparan las distintas aplicaciones de mensajería (WhatsApp, Signal y Allo) en función de su privacidad y seguridad. Recomiendo leer el articulo original, sin embargo, he escrito un resumen con las características de cada aplicación



Para los impacientes, este es el resumen extremo del artículo:

- WhatsApp, Signal y Allo usan el mismo protocolo seguro para enviar mensajes (El protocolo de _Open Whisper Systems_).
- Se diferencian en la información que cifran, _metadatos_ que almacenan y qué es lo que almacenan en sus bases de datos. Es esto último lo que en teoría el gobierno puede fisgonear.
- Para quien busque la total privacidad y seguridad, no hay más opción que _Signal_.

<!--more--><!--ad-->

# WhatsApp

## Pros

- [Cifra todos los mensajes](/whatsapp-mensajes-cifrados-extremo-a-extremo/ "WhatsApp: Entendiendo Su Cifrado Extremo a Extremo"), imágenes, vídeos y notas de voz.
- Si el gobierno solicita los mensajes de un usuario, WhatsApp no puede darselos, porque no conoce la clave que los descifran.

## Contras

- Aunque usen Signal, los servidores de WhatsApp ven los mensajes que los usuarios mandan a través de su servicio. No pueden saber el contenido del mensaje, pero sí quienes están hablando y cuando. En otras palabras, almacenan _metadatos_ (Se reservan el derecho en su [política de privacidad](https://www.WhatsApp.com/legal/#Privacy))

> WhatsApp may retain date and time stamp information associated with successfully delivered messages and the mobile phone numbers involved in the messages, as well as any other information which WhatsApp is legally compelled to collect.

- Dicho esto, si el gobierno les pide _metadatos_, pueden dárselos.
- Al registrarnos en WhatsApp podemos facilitar nuestra lista de contactos. Pueden almancenar esa lista de contactos y compartírsela al gobierno si se la piden.
- Las copias de seguridad que sugiere WhatsApp para almacenar en la nube no están cifradas, por tanto cedemos las conversaciones al servidor de terceros que almacene la copia.

# Allo

- Por defecto Google puede leer todos tus mensajes, Para habilitar cifrado punto a punto hay que pasar a modo incógnito.
- El que venga deshabilitado por defecto es peligroso.
- El beneficio de no cifrar, es que google usa aprendizaje automático para sugerirte las respuestas que debes dar a la conversación. (Aprende lo qué tú contestarías)
- Hasta que no se libere Allo, no se sabe dónde se almacenaran las conversaciones y por cuanto tiempo.
- La tecnología que hay detrás es buena, pero moviendose en la dirección incorrecta en términos de privacidad. Si te preocupa tu privacidad, no la uses.

# Signal

- El elemento diferenciador de Signal con WhatsApp y Allo es que es __[software libre](https://github.com/WhisperSystems "Repositorio en GitHub")__.
- No tienen modelo de negocio, al contrario que Google o Facebook, que hacen dinero con anuncios. Signal vive de donaciones y subvenciones.
- Sin anuncios que mostrar, Signal almacena la menor cantidad de información del usuario posible.
- Como WhatsApp, todos los mensajes están [cifrados](/como-cifrar-correos-con-gpg-con-mailvelope/ "Cómo cifrar correos electrónicos con GPG usando Mailvelope") punto a punto.
- En su [política de privacidad](https://whispersystems.org/signal/privacy/), dicen que no almacenan _metadatos_ de los mensajes. _Moxie_ (Fundadod de _Open Whisper Systems_) dice que la única información que guardan es la última conexión del usuario, con una precisión de tan solo un dia (Ni horas ni minutos ni segundos se almacenan).
- Comparte la lista de contactos, pero no la envía en texto plano, les aplica un hash y el servidor responde con los hashes que tienen en comun ambas cuentas. (Compara hashes solo)
- En sus copias de seguridad, al contrario que WhatsApp, no incluye los mensajes. Así que no hay riesgo de que se filtren los mensajes a terceros. (Como desventaja, no hay copia de los mensajes.)
- Si el gobierno pide a _Open Whisper Systems_ que le facilite información o _metadatos_, Signal no tiene nada que dar.
- Desde el punto de vista de privacidad, Signal es el claro ganador. Pero tiene algunas desventajas

## Contras

- Lo usa poca gente.
- Menos caracterísitcas


¿Y Tú, qué opinas? Déjanos un comentario!
