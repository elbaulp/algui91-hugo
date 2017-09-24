---
author: luzila
categories:
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-09-24T19:21:18+01:00
description: "Esta es una traducción lo más literal posible del artículo  original, ya que quería preservar la opinión personal del autor así como  también el destacable trabajo de investigación y análisis que realizó."
image: 2014/01/201305-xml-vs-json-api.png
url: /buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/
tags:
- API
- API restful
title: "Buenas prácticas para el Diseño de una API RESTful Pragmática"
---

> Esta es una traducción lo más literal posible del artículo original, ya que quería preservar la opinión personal del autor así como también el destacable trabajo de investigación y análisis que realizó.

Tu modelo de datos ha empezado a estabilizarse y es el momento de crear una API pública para tu aplicación web. Te das cuenta de que es difícil hacer cambios significativos a tu API una vez que fue liberada, quieres lo mejor y lo antes posible. Ahora, en internet no escasean opiniones sobre diseño de APIs. Pero, debido a que no hay un standard adoptado popularmente que funcione en todos los casos, te quedas con un manojo de opciones: ¿Qué formatos deberías aceptar? ¿Cómo deberías autenticar? ¿Debería tu API ser versionada?

<!--more--><!--ad-->

Diseñando una API para [SupportFu](http://www.supportfu.com/) (una alternativa para [Zendesk](http://www.supportfu.com/zendesk-alternative)), intenté encontrar respuestas pragmáticas a estas preguntas. Mi objetivo para la [API de SupportFu](http://dev.supportfu.com/api/v1) es que sea fácil de usar, facil de adoptar y lo suficientemente flexible para implementarla en nuestras propias interfaces de usuario.

# TL,DR

1.  Usa SSL en todos lados, sin excepciones
2.  Una API es tan buena como lo es su documentación – por lo tanto realiza una buena documentación
3.  Versiona a través de la URL, no de los encabezados
4.  Usa parámetros de consulta para filtros avanzados, ordenamiento y búsqueda
5.  Provee una forma de limitar cuáles campos son devueltos desde la API
6.  Devuelve algo útil de las peticiones POST, PATCH & PUT
7.  HATEOAS todavía no es muy práctico
8.  Usa JSON donde sea posible, XML sólo si tienes la obligación
9.  Deberías usar camelCase con JSON, pero snake_case es un 20% más fácil de leer
10.  Usa Pretty Print por defecto y asegura que gzip esté soportado
11.  No uses respuestas encapsuladas por defecto
12.  Considera usar JSON para cuerpos de peticiones POST, PUT y PATCH
13.  Pagina usando encabezados Link
14.  Provee una forma de cargar automáticamente representaciones de datos relacionados al recurso solicitado
15.  Provee una forma de sobreescribir el método HTTP
16.  Provee encabezados de respuesta útiles para controles de tráfico (rate limiting)
17.  Usa autenticación basada en tokens, transportado en OAuth2 donde se necesite delegación
18.  Incluir encabezados de respuesta que faciliten el caché
19.  Define un error de carga útil (payload) que sea consumible
20.  Utilizar efectivamente los códigos de error HTTP

# 1\. Requisitos fundamentales para la API

Muchas de las opiniones sobre diseño de API que aparecen en la web son discusiones académicas en torno a interpretaciones subjetivas de las normas difusas en lugar de lo que tiene sentido en el mundo real. Mi objetivo con este artículo es describir las mejores prácticas para una API pragmática diseñada para aplicaciones web de hoy en día. No hago ningún intento de satisfacer un standard si no parece viable. Para ayudar a guiar el proceso de toma de decisiones, he escrito algunos de los requisitos que la API debe cubrir:

- Debería utilizar estándares web donde tengan sentido
- Debería ser amigable para el desarrollador y ser explorable mediante una barra de direcciones del navegador
- Debería ser sencilla, intuitiva y consistente para que la adopción no sólo sea fácil, sino también agradable
- Debería proporcionar suficiente flexibilidad para potenciar mayoritariamente la UI [SupportFu](http://www.supportfu.com/)
- Debería ser eficiente, manteniendo el equilibrio con los demás requisitos

Una API es una interfaz de usuario (UI) para un desarrollador – al igual que cualquier UI, es importante asegurar que la experiencia del usuario esté pensada cuidadosamente!

# 2\. Usa acciones y URLs RESTful

Si hay una cosa que ha ganado amplia adopción, son los principios REST. Estos fueron presentados por primera vez por [Roy Felding](http://roy.gbiv.com/) en el [Capítulo 5](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) de su disertación sobre [arquitecturas de software ubicadas en redes de trabajo](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm).

Los fundamentales principios de [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) se basan en separar tu API en recursos lógicos. Estos recursos son manipulados usando peticiones HTTP donde el método (GET, POST, PUT, PATCH, DELETE) tienen un significado específico.

**¿Pero qué puede hacer un recurso?** Bueno, estos deberían ser [sustantivos (¡no verbos!)](https://blog.apigee.com/detail/restful_api_design_nouns_are_good_verbs_are_bad) que tengan sentido desde una perspectiva del consumidor de la API. Aunque tus modelos internos pueden mapear cuidadosamente con los recursos, no es necesario que sea un mapeo uno-a-uno. La clave es no filtrarse ningún detalle irrelevante de implementación. Por ejemplo, algunos de los sustantivos de SupportFu podrían ser _ticket_, _usuario_ y _grupo_.

Una vez que tienes tus recursos definidos, necesitas identificar qué acciones aplican a ellos y cómo deberían relacionarse con tu API. Los principios REST proveen estrategias para manejar acciones [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) usando métodos HTTP relacionados de la siguiente forma:

- _GET /tickets_- Devuelve una lista de tickets
- _GET /tickets/12_- Devuelve un ticket específico
- _POST /tickets_- Crea un nuevo ticket
- _PUT /tickets/12_- Actualiza el ticket #12
- _PATCH /tickets/12_- Actualiza parcialmente el ticket #12
- _DELETE /tickets/12_- Elimina el ticket #12

La grandeza de REST es que estas impulsando métodos HTTP existentes a implementar funcionalidades importantes en sólo un simple endpoint _/tickets_. No hay convención de nombres de métodos para seguir y la estructura URL es limpia y clara.

**¿El nombre del Endpoint debería ser singular o plural?** La regla mantenlo-simple (keep-it-simple) aplica aquí. Si bien tu gramática interna te dirá que está mal describir una instancia única de un recurso utilizando el plural, la respuesta pragmática es mantener el formato de la URL consistente y siempre usar plural. No tener que lidiar con plurales irregulares (person/people, goose/geese) hace más simple la vida del consumidor de la API y es más sencillo para el proveedor de la API implementarla (como los más modernos frameworks manejarán nativamente _/tickets_ y _/tickets/12_ bajo un controlador comun).

**¿Pero cómo lidiar con las relaciones?** Si una relación puede existir con un sólo recurso, los principios REST proveen una guía útil. Veamos esto con un ejemplo. Un ticket en [SupportFu](http://www.supportfu.com/) consiste en un número de mensajes. Estos mensajes pueden ser lógicamente mapeados al endpoint /tickets de la siguiente forma:

- _GET /tickets/12/messages_ - Devuelve una lista de mensajes para el ticket #12
- _GET /tickets/12/messages/5_ - Devuelve el mensaje #5 para el ticket #12
- _POST /tickets/12/messages_ - Crea un nuevo mensaje en el ticket #12
- _PUT /tickets/12/messages/5_ – Actualiza el mensaje #5 para el ticket #12
- _PATCH /tickets/12/messages/5 -_ Actualiza parcialmente el mensaje #5 para el ticket #12
- _DELETE /tickets/12/messages/5_ - Borra el mensaje #5 para el ticket #12

Alternativamente, si una relación puede existir independientemente del recurso, tiene sentido incluir sólo un identificador en la representación de la salida del recurso. El consumidor de la API debería entonces tener que acertar al endpoint de la relación. Sin embargo, si la relación es comunmente requerida junto con el recurso, la API podría ofrecer funcionalidad para automáticamente incluir la representación de la relación y evitar el segundo impacto en la API.
**¿Qué ocurre con las acciones que no corresponden a las operaciones CRUD?**
Aquí es donde las cosas pueden confundirse. Hay un número de enfoques:

1.  Reestructura la acción para que aparezca como un campo de un recurso. Esto funciona si la acción no toma parámetros. Por ejemplo, un acción “activate” puede ser asignada a un campo booleano _activated_ y actualizado vía PATCH al recurso.
2.  Tratalo como un sub-recurso con principios REST. Por ejemplo, la API de GitHub te permite “[star a gist](http://developer.github.com/v3/gists/#star-a-gist)“(marcar como importante) con _PUT /gists/:id/star_ y “[unstar](http://developer.github.com/v3/gists/#unstar-a-gist)” (desmarcar) con DELETE /gists/:id/star.
3.  A veces realmente no tienes forma de mapear la acción a una estructura REST apropiada. Por ejemplo, una búsqueda multi-recurso no tiene sentido ser asignada a un endpoint de un recurso específico. En este caso, _/search_ podría tener más sentido incluso si no es un sustantivo. Esto está BIEN – sólo realiza lo que sea correcto desde la perspectiva del consumidor de la API y asegúrate de que esté claramente documentado para evitar confusiones.

# 3\. SSL en todos lados – todo el tiempo

Usa siempre SSL. Sin excepciones. Hoy, tus APIs web pueden ser accedidas desde cualquier lado donde haya internet (como librerías, cafeterías, aeropuertos, entre otros). No todos son seguros. Muchos no encriptan las comunicaciones, permitiendo facilmente ser espiados o falsificados si son interceptadas las credenciales de autenticación.

Otra ventaja de usar siempre SSL es que garantiza que las comunicaciones encriptadas simplifiquen los esfuerzos de autenticación – puedes salir simplemente con los tokens de acceso en vez de tener que firmar cada petición a la API.

Hay que tener cuidado con los accesos no-SSL a las URLs de la API. **NO** las redirecciones a sus homólogas SSL. Es recomendable que lances un error. La última cosa que quieres para tus clientes pobremente configurados es enviar peticiones a un endpoint sin encriptar, sólo para ser redireccionados silenciosamente al verdadero endpoint encriptado.

# 4\. Documentación

Una API es buena tanto como lo sea su documentación. Los docs deberían ser fáciles de encontrar y de acceso público. Muchos desarrolladores revisarán la documentación antes de realizar cualquier esfuerzo para integrarla. Cuando los docs están escondidos dentro de un archivo PDF o están permitido sólo para usuarios identificados, no son entonces sólo difíciles de encontrar sino que también dificultan la búsqueda.

Los documentos deberían mostrar ejemplos de ciclos completos de petición/respuesta. Preferentemente, las peticiones deberían poder ser “pegadas” – tanto los hipervínculos deberían poder ser pegados en un navegador como los ejemplos de código deberían poder ser pegados en una consola. [GitHub](http://developer.github.com/v3/gists/#list-gists) y [Strip](https://stripe.com/docs/api) hacen un muy buen trabajo en este aspecto.

Una vez que liberes una API pública, te comprometes a no romper cosas sin previo aviso. La documentación debe incluir información y detalles sobre futuras actualizaciones a la API que sean visibles al exterior. Las actualizaciones deben ser entregadas a través de un blog (es decir, una lista de cambios) o una lista de correo (preferiblemente ambos).

# 5\. Versionado

Siempre versiona tu API. El versionado te ayuda a iterar más rápido y evitar peticiones inválidas desde endpoints actualizados. Además te ayuda a resolver cualquier transición importante de versión de la API mientras continúas ofreciendo viejas versiones de la API por un período de tiempo.

Hay opiniones cruzadas respecto si [la versión de la API debería ser incluida en la URL o en el encabezado](http://stackoverflow.com/questions/389169/best-practices-for-api-versioning). Académicamente hablando, debería probablemente estar en el encabezado. Sin embargo, la versión necesita estar en la URL para asegurar la posibilidad de explorar en el navegador los recursos a través de las versiones (recuerda los requerimientos de la API especificados al inicio del artículo).

Soy un gran fanático del [alcance que Stripe ha tomado respecto al versionado de la API](https://stripe.com/docs/api#versioning) - la URL tiene un número de versión principal (v1), pero la API tiene las sub-versiones basadas en fechas que pueden ser elegidas mediante un encabezado de petición HTTP personalizado. En este caso, la versión principal proporciona la estabilidad estructural de la API en su conjunto, mientras que las sub-versiones representan cambios más pequeños (campos inhabilitados, cambios en el endpoint, etc).

Una API nunca va a ser completamente estable. El cambio es inevitable. Lo importante es cómo se gestiona el cambio. Anuncios de fechas y planificaciones bien documentados puede ser una buena práctica para muchas APIs. Todo se reduce a lo que es razonable teniendo en cuenta la industria y los posibles consumidores de la API.

# 6\. Filtrado, ordenación y búsqueda en los resultados

Lo mejor es mantener la URL base de recursos tan simple como sea posible. Filtros de resultados complejos, requisitos de ordenamiento y búsqueda avanzada (cuando se limita a un solo tipo de recurso) pueden ser implementados fácilmente como parámetros de consulta en la parte superior de la URL base. Veamos esto en más detalle:

## **Filtrado:**

Usa un único parámetro de consulta por cada campo que implemente el filtro. Por ejemplo, cuando se pide una lista de tickets del endpoint _/tickets_, podrías querer limitarla a sólo los que están en estado abierto. Esto puede ser logrado con una petición como _GET /tickets?state=open_. En este caso, state es el parámetro de la consulta que implementa el filtro.

## **Ordenación:**

Similar al filtrado, un parámetro genérico _sort_ puede ser usado para describir las reglas de ordenamiento. Organiza los requerimientos de ordenamiento complejos permitiendo que el parámetro de ordenación sea tomado de una lista de campos separados por coma, cada uno con un posible negativo unario para implicar orden descendiente. Veamos algunos ejemplos:

- _GET /tickets?sort=-priority_ – Devuelve una lista de tickets en orden de prioridad descendiente
- _GET /tickets?sort=-priority,created\_at_- Devuelve una lista de tickets en orden de prioridad descendiente. Con una prioridad específica, los tickets más viejos son ordenados primero.

## **Búsqueda:**

A veces los filtros básicos no son suficientes y se necesita la posibilidad de realizar una búsqueda completa sobre el texto. Tal vez ya estés usando [ElasticSearch](http://www.elasticsearch.org/) u otra búsqueda basada en la tecnología [Lucene](http://lucene.apache.org/). Cuando una búsqueda completa sobre el texto es usada como un mecanismo de devolución de instancias de recurso para un tipo de recurso específico, puede ser expuesto en la API como un parámetro de consulta al endpoint del recurso. Digamos _q_. Las consultas de búsqueda deberían ser pasadas directamente al motor de búsqueda y la salida de la API deberían estar en el mismo formato que un lista de resultado normal.

Combinando todo esto, podemos construir consultas como:

- _GET /tickets?sort=-updated\_at_ – Devuelve los tickets recientemente actualizados
- _GET /tickets?state=closed&sort;=-updated\_at_ -- Devuelve los tickets recientemente cerrados
- _GET /tickets?q=return&state;=open&sort;=-priority,created\_at_ – Devuelve el ticket abierto de mayor prioridad que menciona la palabra ‘return’

## **Alias para las consultas comunes**

Para hacer que la experiencia con la API sea más agradable para el consumidor promedio, considera empaquetar sets de condiciones dentro de una ruta REST facilmente accesible. Por ejemplo, la consulta de tickets cerrados recientemente puede ser empaquetada como _GET /tickets/recently_closed._

# 7\. Limitando los campos que son devueltos por la API

El consumidor de la API no siempre necesita la representación completa de un recurso. La habilidad de seleccionar y elegir los campos devueltos permite el doble beneficio de dejar que el consumidor de la API minimice el tráfico de red y acelere su propio uso de la API.

Usa el parámetro de consulta _fields_ que tome una lista de campos separados con coma. Por ejemplo, la siguiente petición debería traer sólo la información suficiente para mostrar una lista ordenada de tickets abiertos:

```bash
GET /tickets?fields=id,subject,customer_name,updated_at&state;=open&sort;=-updated_at
```

# 8\. Update & Creation deberían devolver una representación de un recurso

Una llamada PUT, POST o PATCH puede hacer modificaciones a los campos del recurso subyacente que no fueron parte de los parámetros provistos (por ejemplo: los campos timestamp created_at o updated_at ). Para evitarle al consumidor de la API tener que consultar nuevamente a la API por un recurso actualizado, agrega el retorno de la actualización (o creación) como parte de la respuesta.

En el caso de un POST que sea un resultado de una creación, usa el [código de status HTTP 201](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) e incluye un encabezado [Location](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30) que apunte a la URL del nuevo recurso.

# 9\. ¿Deberías HATEOAS?

Hay muchas opiniones variadas sobre si el consumidor de la API debería crear hipervínculos o si los hipervínculos deberían ser provistos por la API. Los principios de diseño RESTful especifican [HATEOAS](https://blog.apigee.com/detail/hateoas_101_introduction_to_a_rest_api_style_video_slides), el cual aproximadamente declara que esa interacción con un _endpoit_ debería definirse en la metadata que viene con la respuesta, y no basada en información que va por fuera de la banda (_out-of-band_).

A pesar de que la web generalmente trabaja con los principios HATEOAS (ej, cuando vamos a una portada y seguimos hipervínculos basados en lo que vemos en la página), no creo que estemos listos para HATEOAS en la API todavía. Cuando navegamos en un sitio, las decisiones sobre qué hipervínculos van a ser clickeados se hacen durante la ejecución. Sin embargo, con una API, las decisiones como qué peticiones van a ser enviadas son tomadas cuando el código de integración de la API es escrito, no en tiempo de ejecución. ¿Podrían las decisiones ser aplazadas al tiempo de ejecución? Seguro, de todas maneras, no hay mucho que ganar bajando esa ruta al código ya que el código no estaría disponible para manejar cambios significantes en la API sin romperse. Esto significa que HATEOAS es prometedor pero no está listo para ser protagonista todavía. Algún esfuerzo más tiene que ser realizado para definir los estándars y herramientas al rededor de estos principios para que su potencial sea completamente aprovechado.

Por ahora es mejor asumir que el usuario tiene acceso a la documentación e incluir los identificadores de recursos en la respuesta, la cual el consumidor de la API usará cuando crea hipervínculos. Hay un par de ventajas en utilizar los identificadores – los datos que viajan sobre la red son minimizados y los datos almacenados por los consumidores de la API también son minimizados (ya que son guardados los identificadores cortos, en vez de las URLs que contienen los identificadores).

Además, dado que este post es partidario de incluir los números de versión en la URL, tiene más sentido a largo plazo para el consumidor de la API almacenar los identificadores y no las URLs. Después de todo, el identificador es estable versión por versión pero la URL que representa no lo es!

# 10\. Sólo respuestas JSON

Es tiempo de dejar XML atras en las APIs. Es verborrágico, es difícil de parsear, dificil de leer, su modelo de datos es incompatible con la mayoría de los modelos de datos de los lenguajes de programación y sus ventajas son irrelevantes cuando tus necesidades primarias de respuesta son serializaciones de una representación de datos interna.

No voy a poner mucho esfuerzo en explicar las razones de lo dicho arriba si se puede ver cómo otros ([Youtube](http://apiblog.youtube.com/2012/12/the-simpler-yet-more-powerful-new.html), [Twitter](https://dev.twitter.com/docs/api/1.1/overview#JSON_support_only) & [Box](http://developers.blog.box.com/2012/12/14/v2_api/)) ya han comenzado el éxodo XML.

Simplemente te dejaré que veas las gráficas de Google Trends ([XML API vs JSON API](http://www.google.com/trends/explore?q=xml+api#q=xml%20api%2C%20json%20api&cmpt=q)) para que medites:

<figure>
    <amp-img sizes="(min-width: 817px) 817px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/01/201305-xml-vs-json-api.png" title="Buenas prácticas para el Diseño de una API RESTful Pragmática" alt="Buenas prácticas para el Diseño de una API RESTful Pragmática" width="817px" height="237px"></amp-img>
</figure>

No obstante, si tu base de clientes consiste en un gran número de clientes empresariales, puedes tener que dar soporte XML de todas maneras. Si debes hacerlo, te surgirá una nueva pregunta:

**¿Debería cambiar el tipo del contenido basado en encabezados Accept o basado en la URL?**

Para garantizar la explorabilidad del navegador, debería basarse en la URL. La opción más razonable debería ser agregar una extensión _.xml_ o _.json_ al endpoint de la URL .

# 11\. snake_case vs camelCase para el nombre de los campos

Si estás usando JSON (JavaScript Object Notation) como tu principal formato de representación, la forma “correcta” de hacer las cosas es seguir la convención de nombres de JavaScript – y esto sinifica camelCase para el nombre de los campos! Si entonces optas por el camino de construir librerias cliente en varios lenguajes, lo mejor es usar la convención de nombres correspondiente al idioma – camelCase para C# y Java, snake_case para python y ruby.

Para pensar: Siempre sentí que [snake_case](http://en.wikipedia.org/wiki/Snake_case) es más fácil para leer que la convención [camelCase](http://en.wikipedia.org/wiki/CamelCase) de JavaScript. Pero no tenía ninguna evidencia para respaldar esta “sensación”, hasta ahora. Basado en un [estudio visual sobre camelCase y snake_case](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?tp=&arnumber=5521745) ([PDF](http://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf)) del 2010, **snake_case es un 20% más facil de leer que camelCase**! Este impacto en legibilidad puede afectar la explorabilidad de la API y los ejemplos de la documentación.

Muchas JSON APIs populares usan snake_case. Sospecho que esto se debe a la serialización de librerías que siguen las convenciones de nombres de los lenguajes subyacentes que utilizan. Tal vez necesitamos tener librerías de serialización JSON que manejen las transformaciones de convenciones de nombres.

# 12\. Pretty print por default y asegura que gzip sea soportado

Una API que provee salida con compresión de espacios en blanco no es muy divertida de ver desde un navegador. Aunque algún tipo de parámetro de consulta (como _?pretty=true_) puede ser provisto para activar pretty printing, una API que utiliza pretty print por default es mucho más accesible. El costo de transferencia de datos extra es insignificante, especialmente cuando lo comparas con el costo de no implementar gzip.

Considera algunos casos de uso: ¿Qué pasa si un consumidor de la API está debuggeando y en su código imprime los datos recibidos de la API? – Serán legibles por default. O si el consumidor graba en la URL el código que fue generando y lo interpreta directamente desde el navegador – Será legible por default. Éstos son pequeños detalles. Pequeños detalles que hacen a una API agradable de usar!

**Pero, ¿qué pasa con toda la transferencia extra de datos?**

Veamos esto con un ejemplo del mundo real. He bajado un poco de datos de la [API de GitHub](https://api.github.com/users/veesahni), la cual usa pretty print por default. También estuve haciendo algunas comparaciones con gzip:

```bash
$ curl https://api.github.com/users/veesahni > with-whitespace.txt
$ ruby -r json -e 'puts JSON JSON.parse(STDIN.read)' < with-whitespace.txt > without-whitespace.txt
$ gzip -c with-whitespace.txt > with-whitespace.txt.gz
$ gzip -c without-whitespace.txt > without-whitespace.txt.gz
```

Los archivos de salida tienen los siguientes tamaños:

- _without-whitespace.txt_ – 1252 bytes
- _with-whitespace.txt_ – 1369 bytes
- _without-whitespace.txt.gz_ – 496 bytes
- _with-whitespace.txt.gz_ – 509 bytes

En este ejemplo, el caracter en blanco incrementó el tamaño de la salida en un 8.5% cuando gzip no entró en juego y un 2.6% cuando utilizamos gzip. Por otro lado, el acto de comprimir con **gzip en sí mismo provee un 60% de ahorro de ancho de banda**. Debido a que el costo del pretty print es relativamente pequeño, es mejor utilizar pretty print por default y asegurar que la compresión con gzip esté soportada.

Para enfatizar este punto, Twitter descubrió que hay un [80% de ahorro (en algunos casos)](https://dev.twitter.com/blog/announcing-gzip-compression-streaming-apis) cuando habilita la compresión gzip en su API Streaming. Stack Exchange fue más lejos, nunca devuelve una respuesta que no esté comprimida!

# 13\. No uses un envoltorio por default, pero posibilitalo cuando sea necesario

Muchas APIs empaquetan sus respuestas en envoltorios como este:

```json
{
  "data" : {
    "id" : 123,
    "name" : "John"
  }
}
```

Hay un par de justificaciones para hacer esto – facilita incluir metadata adicional o información de paginación, algunos clientes REST no permiten fácil acceso a los encabezados HTTP y las peticiones [JSONP](http://en.wikipedia.org/wiki/JSONP) no tienen acceso a sus encabezados. Sin embargo con standards que están siendo rápidamente adoptados como [CORS](http://www.w3.org/TR/cors/) y [Link header from RFC5988](http://tools.ietf.org/html/rfc5988#page-6), empaquetar se está volviendo innecesario.

Podemos profundizar a futuro la API manteniéndola sin empaquetamiento por default y empaquetando sólo en casos excepcionales.

**¿Cómo debería usarse un envoltorio en casos excepcionales?**

Hay 2 situaciones donde un envoltorio es realmente necesario – si la API necesita soportar peticiones cross domain sobre JSONP o si el cliente es incapaz de trabajar con encabezados HTTP.

Las peticiones JSONP vienen con un parámetro adicional de consulta (usualmente llamado _callback_ o _jsonp_) representando el nombre de la función callback. Si este parámetro está presente, la API debería cambiarse a un modo completo de empaquetamiento donde siempre responda con un código de status HTTP 200 y pase el código de status real dentro de la respuesta JSON. Cualquier encabezado HTTP adicional que debería pasar a través de la respuesta debería ser mapeado a los campos JSON, como se ve a continuación:

```javascript
callback_function({
  status_code: 200,
  next_page: "https://..",
  response: {
    ... actual JSON response body ...
  }
})
```

De forma similar, para soportar clientes con HTTP limitado, habilita un parámetro especial de consulta ?envelope=true, el cual debería disparar un empaquetamiento full (sin la función callback JSONP).

# 14\. Cuerpos HTML POST, PUT & PATCH codificados en JSON

Si estás siguiendo el objetivo de este artículo, entonces has adoptado JSON para todas las salidas de la API. Ahora consideremos JSON para la entrada de la API.

Muchas APIs usan URL cifradas en sus cuerpos de las peticiones de la API. El cifrado de URL es exactamente lo que suena – los cuerpos de la petición donde los pares clave-valor están cifrados usando las mismas convenciones que uno usaría para cifrar datos en los parámetros de consulta de URL. Esto es simple, ampliamente soportado y deja el trabajo hecho.

Sin embargo, el cifrado de URL tiene algunos inconvenientes que lo hacen problemático. No tiene el concepto de tipos de dato. Esto obliga a la API a interpretar cadenas de caracteres y transformarlas en tipos numéricos (por ej integer) o booleanos. Además, no tiene un concepto real de estructura jerárquica.

Aunque hay algunas convenciones que pueden construir estructuras que no siguen el par clave-valor (como agregar [] a una clave para representar un arreglo), esto no tiene comparación con la estructura nativa jerárquica de JSON.

Si la API es simple, cifrar la URL puede ser suficiente. Sin embargo, APIs complejas deberían apegarse a JSON para sus entradas a la API. De cualquier manera, elige una y se consistente en toda la API.

Una API que acepta peticiones POST, PUT y PATCH con cifrado JSON debería también requerir en el encabezado _Content-Type_ seteado con _application/json_ o lanzar un código de status HTTP: 415 Unsopported Media Type.

# 15\. Paginación

Las APIs con preferencia “envelope” (envoltorio) típicamente incluyen los datos de paginación dentro del mismo envoltorio. Y no los culpo – hasta hace poco, no había mejores opciones. La forma correcta de incluir los detalles de paginación hoy en día es utilizando el [encabezado Link introducido por RFC 5988](http://tools.ietf.org/html/rfc5988#page-6).

Una API que usa el encabezado Link puede devolver un set de hipervínculos listos para que el consumidor de la API no tenga que construir los hipervínculos por su propia cuenta. Esto es especialmente importante cuando la paginación está [basada en el cursor](https://developers.facebook.com/docs/reference/api/pagination/). Aquí hay un ejemplo de un encabezado Link utilizado correctamente, obtenido de la documentación de [GitHub](http://developer.github.com/v3/#pagination):

```bash
Link: <https://api.github.com/user/repos?page=3&per_page=100>; rel="next", <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
```

Pero esto no es una solución completa para muchas APIs que quieren devolver información adicional de paginación, por ejemplo el conteo del total de resultados disponibles. Una API que requiere enviar un contador puede usar un encabezado HTTP personalizado como _X-Total-Count_.

# **16\. Representaciones de recursos relacionados a los datos solicitados mediante carga automática**

Hay muchos casos donde un consumidor de la API necesita cargar datos relacionados (o referenciados) con el recurso que se está solicitando. En vez de pedir que el consumidor haga una solicitud a la API reiteradas veces por esta información, sería mucho más eficiente permitir que los datos relacionados sean devueltos y cargados a través del recurso original en demanda.

De todos modos, como [esto va contra algunos principios RESTful](http://idbentley.com/blog/2013/03/14/should-restful-apis-include-relationships/), podemos minimizar nuestras desviaciones haciendo entonces el parámetro de consulta _embed_ (o _expand_).

En este caso, _embed_ podría ser una lista separada por comas de campos a ser embebidos. La notación con punto puede ser usada para referir sub-campos. Por ejemplo:

```bash
GET /tickets/12?embed=customer.name,assigned_user
```

Esto debería devolver un ticket con detalles adicionales embebidos, como:

```json
{
  "id" : 12,
  "subject" : "I have a question!",
  "summary" : "Hi, ....",
  "customer" : {
    "name" : "Bob"
  },
  "assigned_user": {
   "id" : 42,
   "name" : "Jim"
  }
}
```

Por supuesto, la habilidad de implementar algo así realmente depende de la complejidad interna. Este tipo de embebido puede facilmente resultar en un problema de [N+1 select](http://stackoverflow.com/questions/97197/what-is-the-n1-selects-issue).

# 17\. Sobreescribiendo el método HTTP

Algunos clientes HTTP pueden trabajar solo con peticiones simples GET y POST. Para mejorar la accesibilidad a estos clientes limitados, la API necesita proveer una forma de sobreescribir el método HTTP.

Aunque no hay ningún estandard fuerte aquí, la convención popular es aceptar un encabezado de petición _X-HTTP-Method-Override_ con un valor de cadena que contenga PUT, PATCH o DELETE.

Nota que sobreescribir el encabezado debería ser aceptado en peticiones POST. Las peticiones GET nunca deberían [cambiar datos en el servidor](http://programmers.stackexchange.com/questions/188860/why-shouldnt-a-get-request-change-data-on-the-server)!

# 18\. Limitación de tráfico por ratio (Rate limiting)

Para prevenir abusos, una práctica estandard es agregar algún tipo de límite de tráfico a la API. [RFC 6585](http://tools.ietf.org/html/rfc6585) introduce el código de status HTTP [429 Too Many Requests](http://tools.ietf.org/html/rfc6585#section-4) para controlar esto.

Sin embargo, puede ser muy útil notificar al consumidor de sus límites antes de que se encuentre con ellos. Este es un área en la que actualmente faltan los standards pero existe una cantidad de [convenciones populares usando encabezados de respuesta HTTP.](http://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers)

Minimamente, incluye los siguientes encabezados (usando las [convenciones de nombres](https://dev.twitter.com/docs/rate-limiting/1.1) de Twitter ya que los encabezados tipicamente no tienen capitalizacion de las palabras del medio):

- _X-Rate-Limit-Limit_ – El numero de peticiones permitidas en el período actual
- _X-Rate-Limit-Remaining_ – El número de peticiones que faltan en el período actual
- _X-Rate-Limit-Reset_ – El número de segundos restantes en el período actual

**¿Por qué se usa el número de segundos restantes en vez de un time stamp para X-Rate-Limit-Reset?**

Un timestamp contiene una cantidad de información útil pero innecesaria como la fecha y probablemente el time-zone. Un consumidor de la API realmente quiere saber cuándo puede enviar la petición nuevamente, y el número de segundos responde a esta pregunta con el mínimo procesamiento adicional al final. Además escapa a problemas relacionados con [desvíos de reloj](http://en.wikipedia.org/wiki/Clock_skew).

Algunas APIs usan un timestamp de UNIX (segundos desde la fecha standard 1/1/1970) para X-Rate-Limit-Reset. ¡No hagas lo mismo!

**¿Por qué es una mala práctica usar el timestamp UNIX para X-Rate-Limit-Reset?**

La [spec de HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616.txt) ya [especifica](http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3) el uso del [formato de fecha RFC 1123](http://www.ietf.org/rfc/rfc1123.txt) (actualmente usado en los encabezados HTTP [Date](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.18), [If-Modified-Since](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.25) y [Last-Modified](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29)). Si fuéramos a especificar un nuevo encabezado HTTP que tome un timestamp de algún tipo, debería seguir las convenciones RFC 1123 en vez de usar timestamps UNIX.

# 19\. Autenticación

Una API RESTful debería ser stateless (sin estado). Esto significa que la petición de autenticación no debería depender de cookies o sesiones. En lugar de ello, cada petición debería venir con algún tipo de credencial de autorización.

Siempre que se use SSL, las credenciales de autenticación pueden ser simplificadas a un token de acceso generado de forma aleatoria, que es entregado en el campo de nombre de usuario de HTTP Basic Auth.

Lo grandioso de esto es que es completamente navegable con un explorador – éste simplemente abriría un popup pidiéndote que ingreses las credenciales si recibe un código de status _401 Unauthorized_ desde el servidor.

De todos modos, este método de autenticación token-over-basic-auth (token sobre autenticación basica) es sólo aceptable en los casos en que sea práctico tener la posibilidad de que el usuario copie un token de una interface de administración del entorno del consumidor de la API.

En los casos donde no sea posible, [OAuth 2](http://oauth.net/2/) debería ser usado para facilitar la transferencia del token seguro a terceros. OAuth 2 usa [tokens Bearer](http://tools.ietf.org/html/rfc6750) y además depende de SSL para su encriptación de transporte subyacente.

Una API que necesita soporte JSONP necesitará un tercer método de autenticación, ya que las peticiones JSONP no pueden enviar credenciales HTTP Basic Auth ni Bearer tokens. En este caso, puede utilizarse un parámetro especial de consulta “access_token”. Nota: hay un problema de seguridad inherente si se usa un parametro de consulta para el token ya que la mayoría de los servidores web almacenan los parámetros de consulta en sus logs.

Para lo que nos interesa, los tres métodos de arriba son sólo formas de transportar el token a través de la frontera de la API. El verdadero token subyacente mismo podría ser idéntico.

# 20\. Cacheo

HTTP provee un framework de cacheo incluido! Todo lo que tienes que hacer es incluir algunos encabezados adicionales en la respuesta de salida y hacer una pequeña validación cuando recibes algún encabezado de petición de entrada.

Hay 2 alcances: [ETag](http://en.wikipedia.org/wiki/HTTP_ETag) y [Last-Modified](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29)

**ETag**: Cuando generas una petición, incluye un encabezado HTTP ETag conteniendo un hash o checksum de la representación. Este valor debería cambiar cada vez que la salida cambia. Ahora, si una petición de entrada HTTP contiene un encabezado _If-None-Match_ con un valor ETag, la API debería devolver un código de status _304 Not Modified_ en lugar de la salida del recurso.

**Last-Modified** (Último modificado): Básicamente funciona como ETag, excepto en que usa timestamps. El encabezado de respuesta _Last-Modified_ contiene un timestamp en formato [RFC 1123](http://www.ietf.org/rfc/rfc1123.txt) el cual es validado contra _If-Modified-Since._ Nótese que la especificación de HTTP ha tenido [3 formatos de fecha diferentes aceptables](http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3) y el servidor debería estar preparado para aceptar cualquiera de ellos.

# 21\. Errores

Sencillamente como una página HTML de error muestra un mensaje de error útil a un visitante, una API debería proveer un mensaje de error útil en un formato conocido. La representación de un error debería no ser diferente a la representación de cualquier recurso, con su propio set de campos.

La API debería devolver siempre códigos de status HTTP prácticos. Los errores de la API generalmente caen dentro de 2 tipos: la serie 400 de códigos de status para problemas en el cliente y la serie 500 de códigos de status para problemas en el servidor. Como mínimo, la API debería estandarizar que todos los errores de la serie 400 vengan en formato de error JSON. Si es posible (por ejemplo si los balanceadores de carga y proxies reversos pueden crear cuerpos de error personalizables), este debería extender la serie de códigos de error 500.

El cuerpo de un error JSON debería proveer algunas cosas para el desarrollador – un mensaje de error útil, un código de error único (que pueda ser buscado para más detalles en la documentación) y una descripción detallada. Una representación de salida JSON de esta forma podría ser:

```json
{
  "code" : 1234,
  "message" : "Something bad happened :(",
  "description" : "More details about the error here"
}
```

Los errores de validación para peticiones PUT, PATCH y POST necesitarán un breakdown en el campo. Esto se modela mejor utilizando un código de error de alto nivel arreglado para fallas de validación que proveen detalles del error en el campo adicional _error_, como por ejemplo:

```json
{
  "code" : 1024,
  "message" : "Validation Failed",
  "errors" : [
    {
      "code" : 5432,
      "field" : "first_name",
      "message" : "First name cannot have fancy characters"
    },
    {
       "code" : 5622,
       "field" : "password",
       "message" : "Password cannot be blank"
    }
  ]
}
```

# 22\. Códigos de estado HTTP

HTTP define un [set de significativos códigos de status](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) que pueden ser devueltos por la API. Éstos pueden ser nivelados para ayudar a los consumidores de la API dirigir sus respuestas apropiadamente. A continuación les dejo una lista de los que definitivamente deberías utilizar:

- _200 OK -_ Respuesta a un exitoso GET, PUT, PATCH o DELETE. Puede ser usado también para un POST que no resulta en una creación.
- _201 Created_ – [Creada] Respuesta a un POST que resulta en una creación. Debería ser combinado con un [encabezado Location](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30), apuntando a la ubicación del nuevo recurso.
- _204 No Content_ – [Sin Contenido] Respuesta a una petición exitosa que no devuelve un body (como una petición DELETE)
- _304 Not Modified_ – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
- _400 Bad Request_ – [Petición Errónea] La petición está malformada, como por ejemplo, si el contenido no fue bien parseado.
- _401 Unauthorized_ – [Desautorizada] Cuando los detalles de autenticación son inválidos o no son otorgados. También útil para disparar un popup de autorización si la API es usada desde un navegador.
- _403 Forbidden_ – [Prohibida] Cuando la autenticación es exitosa pero el usuario no tiene permiso al recurso en cuestión.
- _404 Not Found_ – [No encontrada] Cuando un recurso no existente es solicitado.
- _405 Method Not Allowed_ – [Método no permitido] Cuando un método HTTP que está siendo pedido no está permitido para el usuario autenticado.
- _410 Gone_ – [Retirado] Indica que el recurso en ese endpoint ya no está disponible. Útil como una respuesta en blanco para viejas versiones de la API
- _415 Unsupported Media Type_ – [Tipo de contenido no soportado] Si el tipo de contenido que solicita la petición es incorrecto
- _422 Unprocessable Entity_ – [Entidad improcesable] Utilizada para errores de validación
- _429 Too Many Requests_ – [Demasiadas peticiones] Cuando una petición es rechazada debido a la tasa límite .

# En conclusión

Una API es una interfaz de usuario para desarrolladores. Enfoca tu esfuerzo en asegurar que no sea sólo usable a nivel funcional sino también amigable.

# Referencias

- _Vinay Sahni_ \| [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
