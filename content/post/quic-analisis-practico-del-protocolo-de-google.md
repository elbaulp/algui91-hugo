---
author: alex
categories:
- articulos
date: '2016-01-01'
lastmod: 2017-09-05T12:40:06+01:00
description: "QUIC es un protocolo que está desarrollando Google y que pretende  ser más seguro y rápido. Investigando un poco para conocer más acerca de  este nuevo protocolo, encontré una pequeña FAQ (Frequently Asked Questions)  en Google Drive, al parecer dicha FAQ es autoría del propio grupo de desarrollo  de QUIC, el nombre original del documento es QUIC Geek FAQ (for folks that know  about UDP, TCP, SPDY, and stuff like that). Puedes consultar el artículo en Qué  es QUIC, el nuevo protocolo desarrollado por Google."
image: 2013/07/Que-es-QUIC-el-nuevo-protocolo-desarrollado-por-Google.png
mainclass: articulos
math: true
url: /quic-analisis-practico-del-protocolo-de-google/
tags:
- analisis de protocolos
- especificaciones quic
- estructura de quic
- paquetes quic
- quic
- wireshark
title: "QUIC: Análisis práctico del protocolo de Google"
---

<figure>
<a href="/img/2013/07/Que-es-QUIC-el-nuevo-protocolo-desarrollado-por-Google.png"><amp-img sizes="(min-width: 468px) 468px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/Que-es-QUIC-el-nuevo-protocolo-desarrollado-por-Google.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="468px" height="239px" /></a>
</figure>

**QUIC** es un protocolo que está desarrollando Google y que pretende ser más seguro y rápido. Investigando un poco para conocer más acerca de este nuevo protocolo, encontré una pequeña *FAQ* (Frequently Asked Questions) en *Google Drive*, al parecer dicha *FAQ* es autoría del propio grupo de desarrollo de *QUIC*, el nombre original del documento es QUIC Geek FAQ (for folks that know about UDP, TCP, SPDY, and stuff like that). Puedes consultar el artículo en [Qué es QUIC, el nuevo protocolo desarrollado por Google][1].

# Prueba de concepto

Para hacer pruebas con éste protocolo, se ha descargado el código fuente de **Chromium**, y se ha compilado con soporte para QUIC. En ésta sección se verá cómo realizar éstos pasos, y se procederá a realizar un análisis del protocolo mediante capturas de tráfico con WireShark.

## Descargar el código

Los pasos se encuentran en (3), los seguidos para la prueba de concepto fueron:

```bash
# Instalar depot_tools

$ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
$ export PATH=`pwd`/depot_tools:"$PATH"

# Descargar el código de chromium
$ fetch --nohooks --no-history chromium
$ cd src
$ git checkout master

# Compilar para Linux
$ build/install-build-deps.sh --no-arm
$ gclient sync

```

<!--more--><!--ad-->

Una vez hecho esto, y siguiendo los pasos de (4), se compila el cliente y servidor usados para QUIC:

```bash
$ ninja -C out/Debug quic_server quic_client

```

Se procede a descargar una copia de una página web, por ejemplo, google.com, la cual se servirá localmente usando el programa **quic_server**.

```bash
$ mkdir /tmp/quic-data
$ cd /tmp/quic-data
$ wget -p --save-headers http://google.com

```

Es necesario editar el fichero **index.html** para eliminar la cabecera **&#8220;Transfer-Encoding: chunked&#8221;** y añadir **X-Original-Url: http://www.google.com/**.Tras esto, se ejecuta el servidor QUIC apuntando al fichero descargado:

```bash
$ ./out/Debug/quic_server --port=8081 --quic_in_memory_cache_dir=/tmp/quic-data/google.com

```

Y debería ser posible realizar una petición al fichero sobre QUIC usando el cliente:

```bash
./out/Debug/quic_client --port=8081 --address=192.168.1.16 http://www.google.com/

```

En este caso, se ha configurado el servidor en una máquina distinta a la cliente. Pero podría hacerse en la misma máquina todo, y escuchar en la interfaz **lop** con WireShark. Tras ejecutar el comando anterior, aparecerá por pantalla algo similar a:

```bash
HTTP/1.1 200 OK
alternate-protocol: 80:quic,p=0.01
cache-control: private, max-age=0
content-type: text/html; charset=ISO-8859-1
date: Thu, 30 Oct 2014 12:18:06 GMT
expires: -1
p3p: CP="This is not a P3P policy! See http://www.google.com/support/accounts/bin/answer.py?hl=en&answer;=151657 for more info."
server: gws
set-cookie: PREF=ID=0a30ac3a5dbcfef5:FF=0:TM=1414671486:LM=1414671486:S=v_Z2N_ZyX1n_uoLc; expires=Sat, 29-Oct-2016 12:18:06 GMT; path=/; domain=.google.es
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
<!doctype html>
# Resto de la página web

```

## Estructura de un paquete QUIC

Procedemos ahora a detallar la estructura de los paquetes QUIC tal y como se especifica en los documentos (6) y (7).

La unidad básica de transmisión será un paquete UDP estándar. Se asegurará que todas las transmisiones de datos se separarán en bloques que quepan en un solo paquete.

Todo paquete QUIC consiste en una sección de cabecera (**Header** a partir de ahora), y una sección de carga (**payload** a partir de ahora). El payload de un paquete contiene una secuencia de cuadros (**frames** a partir de ahora). El payload de un paquete FEC (**Forward Error Correction**) contiene información reduntante. El payload de cada paquete es un bloque encriptado AEAD (**Authenticated Encryption with Associated Data**). Los datos asociados (Que son autenticados) incluyen la totalidad de la cabecera.Por tanto, hay dos tipos de paquetes, paquetes de datos y paquetes FEC. Los paquetes tienen una cabecera común de longitud variable entre 2 y 19 bytes, seguido de un bloque de autentificación encriptado. Cuando el bloque se descifra, el resultado mostrado abajo incluye una cabecera de 1 o 2 bytes, seguidos de datos adicionales. Los paquetes FEC contienen datos de paridad para permitir la recuperación de paquetes. Los paquetes de datos contienen los payloads, datos ACK y control de datos (flujos o finalización de sesiones).

## Cabecera

Como se mencionó arriba, todos los paquetes comienzan con una cabecera común:

```bash
0        1        2        3        4        5        6        7       8
+--------+--------+--------+--------+--------+--------+--------+--------+--------+
| Public |    Connection ID (0, 8, 32, or 64)                                    |   ->
|Flags(8)|      (variable length)                                                |
+--------+--------+--------+--------+--------+--------+--------+--------+--------+

     9       10       11        12
+--------+--------+--------+--------+
|      Quic Version (32)            |  ->
|         (optional)                |
+--------+--------+--------+--------+

    13      14       15        16        17       18       19       20
+--------+--------+--------+--------+--------+--------+--------+--------+
|         Sequence Number (8, 16, 32, or 48)          |Private | FEC (8)|
|                         (variable length)           |Flags(8)|  (opt) |
+--------+--------+--------+--------+--------+--------+--------+--------+


```

La cabecera para cada paquete consiste en:

  * Flags públicas - 1B, detallando la estructura del resto de la cabecera.
  * CID (**Connection ID**).
  * Versión de QUIC.
  * El número de secuencia del paquete.

**Header: Public Flags**. La cabecera puede ser de gran tamaño, y muchos de los campos son a veces innecesariamente grandes, o no se usan. Éstos flags codifican el tamaño de cada uno de los otros campos de cabecera, permitiendo una representación más compacta. Es decir, proporcionan especificaciones por paquete para el tamaño de otros campos en una conexión, en un paquete.

Hay 5 grupos de bits, consistentes en dos bits individuales, dos pares de bits usados y un par sin usar.

  * LSB (Less Significant Bit). Tiene valor 1 sii el paquete contiene la versión de QUIC.
  * El bit situado en 0x2 indica si el paquete es un paquete público de reseteo.
  * El par de bits en 0xC indican el tamaño del CID presente en el paquete.
  * El par de bits en 0x30 indican la longitud del número de secuencia.
  * El par 0xC0 no se usan actualmente, y deberían estar a 0.

### ejemplo de un primer paquete iniciando la conexión, en el que está activado el bit de versión

<figure>
<a href="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-primerPaquete.png"><amp-img sizes="(min-width: 370px) 370px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-primerPaquete.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="370px" height="118px" /></a>
</figure>

**Header: CID**. Ocupa 64bits para que los clientes puedan seleccionar un CID aleatoriamente, y contactar con un servidor a un puerto fijo. Para cuando un servidor mantenga \\(2^{32}\\) conexiones concurrentes, habrá un 50\% de probabilidad de que un intento de conexión colisione con otra conexión existente. En ese punto, habrá una conexión de \\(2^{32}\\) en conflicto, y obtendrá un mal rendimiento en la conexión (probablemente obtenga un Time-out). El usuario que obtenga temporalmente éste problema, en una buena implentación, realizaría automáticamente una conexión vía TCP.

**Header: QUIC version**. A medida que QUIC evolucione, éste campo estará presente en el primer paquete para asegurar que el servidor y el cliente hablan en la misma versión del protocolo. Una vez establecida la conexión, ésta información es redundante y se omitirá usando los flags correspondientes para indicar que dicho campo se omitirá (longitud 0).

**Header: Packet Sequence Number**. Además de secuenciar paquetes, mirar por duplicaciones y comunicar qué paquetes faltan, éste número es una parte crítica para el cifrado. Éste número es la base de las IV que se usan para descifrar cada paquete. Como resultado, conceptualmente debe ser grande, ya que no debe repetirse durante el periodo de una conexión. Por eso el tamaño conceptual del número de secuencia debe ser grande, unos \\(2^{64}\\) (Más paquetes de los que cualquier conexión enviará), sin embargo, normalmente no es necesario proporcionar los 8 bytes en cada paquete.

En cualquier momento dado, solo habrá un numero finito (pequeño) depaquetes de secuencia que no hayan sido admitidos. Ésta restricción es una consecuencia natural del hecho de que el emisor debe mantener un buffer con datos para los paquetes pendientes, y la memoria del emisor es finita. Además, se ha optado por no “retransmitir” los paquetes perdidos, en su lugar, se “reempaqueta” su contenido en paquetes posteriores. Como resultado, el receptor comunicará que no ha recibido un paquete, y el emisor notificará al receptor para que “deje de esperar” al paquete, y por tanto el margen de paquetes no admitidos estará siempre acotado. Basándonos en esta restricción, un emisor puede reducir significativamente el número de bytes necesarios para expresar el número de secuencia del paquete (usando los Flags públicos).

Por ejemplo, supongamos que los paquetes se transmiten mediante TCP con control de congestión, y el margen de congestión actual es de 20 paquetes. Si se pierde un paquete, dentro de 1 RTT, o unos 20 paquetes adicionales, el receptor será informado de que un paquete perdido ya no está pendiente. Como resultado, el emisor puede continuar enviando solo el byte de menor peso (8bits) del número de secuencia del paquete (64bits). El receptor puede deducir fácilmente basándose en esos bits, qué valor deberían tener los 56 bits restantes, y puede usarlos posteriormente para descifrar el paquete.

## Payload

Después de la cabecera, siempre hay un bloque payload de texto cifrado autentificado por un algoritmo AEAD. Dicho bloque consiste conceptualmente en un número de bits redundantes de autenticación, concatenados a una cadena de bytes de tamaño igual al texto plano del payload. Actualmente se estima que son necesarios unos 64 bits de autenticación.

Tras el descifrado, se obtiene el texto plano del bloque de payload que consiste en:

  * Flags privadas - 1 Byte. (Private Flags - 1 byte)
  * Número de grupo del FEC. (FEC Group number)
  * Serie de frames de auto-identificación. (Series of self-identifying Frames)

A continuación se describe en detalle cada unos de los campos.

**Payload: Private Flags**. Llamadas privadas porque están envueltas en el encriptado, y no son visibles a un espía. Como las flags públicas, uno de los valores codificados es el tamaño del número de grupo del FEC, e implícitamente el desplazamiento en el payload para situarse en el inicio de los frames.

Además tienen dos bits. El primer bit es un bit de entropía aleatoria, el segundo se usa para identificar el último paquete en un grupo FEC. El último paquete en un grupo FEC es un paquete FEC redundante (conteniendo el XOR del texto plano del payload en el grupo).

**Private Flags: Entropy Bit**. Éste bit lo selecciona aleatoriamente el emisor, y se coloca en cada paquete. La información se usa para combatir cualquier ataque potencial de ACks optimistas. Cuando el receptor envía el reconocimiento (ACK) para un conjunto de paquetes, se requiere que demuestre que recibió el conjunto que afirma haber recibido proporcionando el hash de los bits de entropía que afirma haber visto.

**Private Flags: FEC Final Bit**. Éste bit se usa para marcar que el último paquete es un grupo FEC.

**Payload: Self Identifying Frames**. Se espera que la carga de cada paquete QUIC sea una lista concatenada de datos llamada Frames. Cada frame tiene bytes iniciales que identifican el frame, así como información sobre el formato del frame y su contenido. Por ejemplo, hay frames que transportan información de acuse (**acknowledgement information**), y también hay frames que transportan datos de flujo individuales. Existen una amplia variedad de frames para miscelánica. A continuación se presentan los distintos tipos de frames y su estructura.

## Frames dentro del Payload

Todos los frames comienzan con un byte que especifica su tipo, pero se espera poder empaquetar flags adicionales específicos para cada tipo de frame en ese byte. Como resultado, serán los primeros bits de un byte que especifique el tipo de frame los que identificarán el tipo de frame, y los bits restantes serán usados para codificar el formato dentro del frame (como ocurre con la cabecera).

  * **STREAM_FRAME**. Cada conexión QUIC puede multiplexar una colección de flujos, y cada frame de flujo transmite datos de la aplicación para un único flujo. Un paquete es de éste tipo si el bit más significativo del Byte de tipo es 1. La composición de éste paquete es la siguiente:

```bash
0        1       …               SLEN
+--------+--------+--------+--------+--------+
|Type (8)| Stream id (8, 16, 24, or 32 bits) |
|        |    (Variable length SLEN bytes)   |
+--------+--------+--------+--------+--------+

  SLEN+1  SLEN+2     …                                         SLEN+OLEN
+--------+--------+--------+--------+--------+--------+--------+--------+
|   Offset (0, 16, 24, 32, 40, 48, 56, or 64 bits) (variable length)    |
|                    (Variable length: OLEN  bytes)                     |
+--------+--------+--------+--------+--------+--------+--------+--------+

  SLEN+OLEN+1   SLEN+OLEN+2
+-------------+-------------+
| Data length (0 or 16 bits)|
|  Optional(maybe 0 bytes)  |
+------------+--------------+

```

  * **ACK_FRAME**. Un frame ACK se usa para coordinar la recuperación de paquetes perdidos, y es parecido, pero no idéntico a los paquetes ACK de TCP. Un ACK en QUIC siempre es acumulativo, es decir, nuevos ACKs contienen suficiente información que es seguro descartar cualquier ACK previo. Como resultado, si un paquete con un frame ACK se pierde, no es necesario retransmitir el Frame ACK adjunto. Éste tipo de paquete se identifica con el valor **01ntllmmB**, donde 01 indica que es de tipo ACK, y los 6 bits restantes son flags. Su estructura:

```bash
0        1                           N
+--------+--------+-----------------------------------------------------+
|Type (8)|Received|    Largest Observed (8, 16, 32, or 48 bits)         |
|        |Entropy |                     (variable length)               |
+--------+--------+-----------------------------------------------------+

   N+1       N+2      N+3      N+4                   N+8

+--------+--------+---------+--------+--------------------------------+
|Largest Observed |   Num   | Delta  |  Time Since Largest Observed   |
| Delta Time (16) |Timestamp|Largest |                                |
|        |        |   (8)   |Observed|                                |
+--------+--------+---------+--------+--------------------------------+

   N+9         N+11 - X
+--------+------------------+
| Delta  |       Time       |
|Largest |  Since Previous  |
|Observed|Timestamp (Repeat)|
+--------+------------------+
    X                        X+1 - Y                              Y+1
+--------+-----------------------------------------------------+--------+
| Number |    Missing Packet Sequence Number Delta             | Range  |
| Ranges | (repeats Number Ranges times with Range Length)     | Length |
| (opt)  |                                                     |(Repeat)|
+--------+-----------------------------------------------------+--------+

    Y+2                       Y+3 - Z
+--------+-----------------------------------------------------+
| Number |       Revived Packet  (8, 16, 32, or 48 bits)       |
| Revived|       Sequence Number (variable length)             |
| (opt)  |         (repeats Number Revied times)               |
+--------+-----------------------------------------------------+

```

  * **CONGESTION\_CONTROL\_FRAME**. El frame de control de congestión se usa para tramsmitir información relativa a un algoritmo específico de control de gestión. Al inicio de la conexión, la negociación de las credenciales criptográficas también incluyen la negociación del algoritmo de control de congestión.
  * **RST\_STREAM\_FRAME**. El frame de reseteo del flujo se usa para terminar anormalmente un flujo. Puede usarse por ejemplo cuando un receptor desee que el emisor deje de enviar datos, o cuando la fuente de datos deja de proporcionar los datos a recibir. Para ayudar al depurado, en éstos frames se incluyen dos campos, **Reason Phrase** y **Error Code**.
  * **CONNECTION\_CLOSE\_FRAME**. Se usa para terminar una conexión agresiva e inmediatamente, cerrando todos los flujos implícitos. Éste frame se identifica con valor 0x5. Su estructura:

```bash
0        1        2        3         4        5        6      7        X
+--------+--------+--------+--------+--------+--------+--------+--------+--------+
|Type(8) |         Error code (32 bits)      | Reason phrase   |  Reason phrase  |
|        |                                   | length (16 bits)|(variable length)|
+--------+--------+--------+--------+--------+--------+--------+--------+--------+

```

  * **GOAWAY\_STREAM\_FRAME**. Es una petición para terminar una conexión de forma elegante, en la que no se crearán nuevos flujos, y se mantienen los ya existentes (los cuales se finalizarán rápido). Éste frame también incluye los campos **Reason Phrase** y **Error Code**. Se identifica con el valor 0x6. Su estructura:

```bash
0        1        2        3         4        5        6        7
+--------+--------+--------+--------+--------+--------+--------+--------+
|Type(8) |         Error code (32 bits)      | Last Good Stream id (32 bits) ->
+--------+--------+--------+--------+--------+--------+--------+--------+

     8        9        10        X
+--------+--------+--------+--------+--------+
 stream  | Reason phrase   |  Reason phrase    ->
   id    | length (16 bits)|(variable length)
+--------+--------+--------+--------+--------+

```

## Análisis del tráfico con WireShark

La captura realizada fue la siguiente:

<figure>
<a href="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-CapturaQUIC.png"><amp-img sizes="(min-width: 1920px) 1920px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-CapturaQUIC.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="1920px" height="1080px" /></a>
</figure>

Se procederá a mostrar algunas capturas más detalladas de la cabecera únicamente, ya que el resto del paquete está cifrado, sin embargo, a lo largo de éste documento se ha detallado cómo sería la estructura del payload una vez descifrado.

Como se mostró más arriba, la cabecera del primer paquete indica que el paquete contiene información que especificará la versión de QUIC a usar:

### ejemplo de un primer paquete iniciando la conexión, en el que está activado el bit de versión

<figure>
<a href="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-primerPaquete.png"><amp-img sizes="(min-width: 370px) 370px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-primerPaquete.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="370px" height="118px" /></a>
</figure>

Dicha información se encuentra aquí:

### Información sobre la versión a usar

<figure>
<a href="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-quicVersion.png"><amp-img sizes="(min-width: 594px) 594px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-quicVersion.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="594px" height="244px" /></a>
</figure>

También se puede apreciar en la captura el número de secuencia y el identificador de conexión. Si escogemos cualquier otro paquete que no sea el primero, se comprobará que el bit que especifica si existe la versión está desactivado:

### Paquetes distintos al primero

<figure>
<a href="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-quicOtrosPaquetes.png"><amp-img sizes="(min-width: 596px) 596px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/10/Análisis-práctico-del-protocolo-de-Google-QUIC-quicOtrosPaquetes.png" title="QUIC: Análisis práctico del protocolo de Google" alt="QUIC: Análisis práctico del protocolo de Google" width="596px" height="246px" /></a>
</figure>

Y por tanto no aparece información relevante respecto a qué versión se usa.

Los siguientes datos del paquete correspondientes al payload no se pueden analizar por estar cifrados. Sin embargo, una vez descifrados, el contenido del payload variará dependiendo del tipo de frame que haya sido enviado.

# Referencias

- *(1) Chromium. Código de la parte cliente* »» <a href="http://j.mp/1p8j7I2" target="_blank">Visitar sitio</a>
- *(2) Chromium. Código de la parte servidor* »» <a href="http://j.mp/1p8iUF1" target="_blank">Visitar sitio</a>
- *(3) Chromium. Obtener el código fuente* »» <a href="http://www.chromium.org/developers/how-tos/get-the-code" target="_blank">Visitar sitio</a>
- *(4) Chromium. Playing with QUIC* »» <a href="http://www.chromium.org/quic/playing-with-quic" target="_blank">Visitar sitio</a>
- *(5) Google. QUIC Crypto* »» <a href="https://docs.google.com/document/d/1g5nIXAIkN_Y-7XJW5K45IblHd_L2f5LTaDUDwvZ5L6g" target="_blank">Visitar sitio</a>
- *(6) Google. QUIC: Design Document and Specification Rationale* »» <a href="https://docs.google.com/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34" target="_blank">Visitar sitio</a>
- *(7) Google. QUIC Wire Layout Specification* »» <a href="https://docs.google.com/document/d/1WJvyZflAO2pq77yOLbp9NsGjC1CHetAXV8I0fQe-B_U" target="_blank">Visitar sitio</a>


 [1]: https://elbauldelprogramador.com/que-es-quic-el-nuevo-protocolo-desarrollado-por-google/ "Qué es QUIC, el nuevo protocolo desarrollado por Google"
