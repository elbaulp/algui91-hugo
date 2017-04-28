---
author: alex
categories:
- security now
date: '2016-01-01'
lastmod: 2017-03-15T16:13:04+01:00
image: 2013/07/Que-es-QUIC-el-nuevo-protocolo-desarrollado-por-Google.png
introduction: "Introducción al nuevo protocolo de Google"
mainclass: security-now
math: true
url: /que-es-quic-el-nuevo-protocolo-desarrollado-por-google/
tags:
- protocolo QUIC
- que es QUIC
- QUIC google
- QUIC
title: "Qué es QUIC, el nuevo protocolo desarrollado por Google"
---

<figure>
    <amp-img sizes="(min-width: 468px) 468px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/07/Que-es-QUIC-el-nuevo-protocolo-desarrollado-por-Google.png" alt="Qué es QUIC, el nuevo protocolo desarrollado por Google" width="468px" height="239px"></amp-img>
</figure>

Escuchando el podcast <a href="http://twit.tv/show/security-now/411" target="_blank">#411</a> de [security now!][1] Steve habló del protocolo *QUIC*, que está desarrollando Google y pretende ser más seguro y rápido. Investigando un poco para conocer más acerca de este nuevo protocolo, encontré una pequeña **FAQ (Frequently Asked Questions)** en Google Drive, al parecer dicha FAQ es autoría del propio grupo de desarrollo de *QUIC*, el nombre original del documento es **QUIC Geek FAQ (for folks that know about UDP, TCP, SPDY, and stuff like that)**, aquí dejo la tabla de contenidos:

<!--more--><!--ad-->

# ¿Qué es QUIC?

QUIC es el nombre de un protocolo experimental en el que Google está trabajando, sus siglas vienen de ***Q**uick **U**DP **I**nternet **C**onnection*. El protocolo soporta un conujunto de conexiones multiplexadas a través de UDP y ha sido diseñado para proporcionar una [seguridad][16] equivalente a <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security" target="_blank">TLS/SSL</a> y para reducir la latencia tanto en la conexión como en el transporte de datos. En la última versión de Chrome se ha implementado una versión experimental del protocolo.



# ¿Cuales son algunas de las técnicas empleadas en QUIC?

*QUIC* empleará una estimación del ancho de banda en cada dirección para prevenir congestiones, para luego establecer la transmisión de los paquetes a un ritmo uniforme para reducir la pérdida de paquetes. También usará códigos de corrección de errores a nivel del paquete para reducir la necesidad de retransmitir los datos perdidos. *QUIC* alinea los límites de bloque [criptográficos][17] con los límites del paquete, de manera que el impacto de la pérdida del paquete sea mucho menor.



# ¿No proporciona ya SPDY conexiones multiplexadas sobre SSL?

Sí, pero <a href="http://es.wikipedia.org/wiki/SPDY" target="_blank">SPDY</a> hasta el momento se ejecuta a través de TCP, lo cual provoca algunos costes de latencia (Aunque SPDY mejora la latencia de HTTP a través de TCP).



# ¿Por qué no es SPDY sobre TCP lo suficientemente bueno?

Un único paquete perdido en una conexión TCP subyacente paraliza todos los flujos SPDY multiplexados de esa conexión. En comparación, un único paquete perdido para X conexiones paralelas en HTTP **paralizará solo 1 de X conexiones**. Con *UDP, QUIC* puede soportar entregas desajustadas, de modo que un paquete perdido paralizará como mucho un flujo (stream). El evitar la congestión a través de una sola <a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Window_scaling" target="_blank">ventana</a> de congestión coloca a SPDY en una posición desfavorable a través de TCP en comparación con varias conexiones HTTP, cada una con una ventana de congestión separada. Las ventanas de congestión separadas no se ven afectadas tanto por la pérdida de paquetes, y *QUIC* será capaz de manejar de manera más equitativa la congestión de un conjunto de conexiones multiplexadas.



# ¿Hay alguna otra razón por la que TCP no sea lo suficientemente bueno?

TCP, y TSL/SSL, requieren habitualmente una o más veces de idas y vueltas (**round trip times, RTTs**) durante el establecimiento de la conexión. Se espera que *QUIC* pueda reducir los costos de conexión a practicamente cero *RTTs*, por ejemplo mandar *hola*, y luego enviar la solicitud de datos sin tener que esperar.



# ¿Por qué no mejorar TCP a través de SPDY?

Ese es nuestro objetivo. El soporte TCP está integrado en el **kernel** de los sistemas operativos. Teniendo en cuenta la lentitud de los usuarios a la hora de actualizar su Sistema Operativo, **es poco probable que se vea una adopción significativa de los cambios en TCP del lado del cliente en menos de 5-15 años**. *QUIC* permite probar y experimentar con ideas nuevas para obtener resultado más rápidamente. Tenemos la esperanza de que las características de *QUIC* migrarán a TCP y TLS si resultan eficaces.



# ¿Por qué no construir un protocolo totalmente nuevo, en vez de usar UDP?

Hoy día, las **Middle boxes** en internet, por lo general bloquean el tráfico a menos que sea TCP o UDP. Ya que no se pudo modificar significativamente TCP, fue necesario usar UDP. UDP se usa en la actualidad por muchos sistemas de juego, así como VoIP y videos en streaming, por lo que su uso parece plausible.



# ¿Por qué QUIC siempre requiere cifrado en todo el canal?

Como hemos aprendido con SPDY y otros protocolos, si no ciframos el tráfico, entonces las **Middle boxes** se garantizan (a sabiendas, o sin saberlo) a corromper las transmisiones cuando tratan de *amablemente* filtrar o *mejorar* el tráfico.



# UDP no tiene controles de congestión, ¿No causará QUIC un colapso en internet si es ampliamente adoptado?

*QUIC* emplea controles de congestión, así como emplea retransmisiones automáticas para apoyar el transporte fiable. *QUIC* tratará de ser justo compitiendo con el tráfico TCP. Por ejemplo, al transportar $$\mathcal{Q}$$ flujos multiplexados, y compartir un ancho de banda con $$\mathcal{T}$$ flujos TCP simultáneos, vamos a tratar de utilizar recursos en el rango de $$\frac{\mathcal{Q}}{\mathcal{Q} + \mathcal{T}}$$ de ancho de banda. (Es decir, *una parte justa* para los flujos $$\mathcal{Q}$$ adicionales).



# ¿Por qué no utilizar estándares existentes como SCTP sobre DTLS?

*QUIC* incorpora muchas técnicas en un esfuerzo para reducir la latencia. SCTP y DTLS no fueron diseñados con este propósito, y esto se hace significativamente evidente incluso durante las fases de establecimiento de la conexión. Varias de las técnicas con las que *QUIC* está experimentando serían técnicamente difíciles de incorporar a los estándares existentes. Como ejemplo, cada uno de estos protocolos requeiren varios **RTTs** para establecer una conexión, lo cual no concuerda con nuestros objetivos de conseguir 0 *RTTs*.



# ¿Cuanto reducen las técnicas de QUIC la latencia?

Esta es exáctamente la pregunta que estamos investigando en este momento, estamos experimentando con varias características y técnicas en Chromium. Aún es demasiado pronto para compartir resultados preliminares - Estad atentos.



# ¿Hay alguna forma de deshabilitar QUIC si no quiero ejecutarlo en mi Chromium?

Sí, visitando *about:flags* y luego desactivar *Experimental QUIC protocol*.



# ¿Dónde puedo aprender más sobre QUIC?

Si quieres saber más, y necesitas material que te ayude a dormir, puedes mirar en <a href="https://docs.google.com/a/chromium.org/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34/edit" target="_blank">QUIC Design Document and Specification Rationale</a>. Para criptógrafos que se pregunten cómo de bien están los puntos sobre las ies, y las tes cruzadas, pueden echar un vistazo a las especificaciones criptográficas (<a href="https://docs.google.com/a/chromium.org/document/d/1g5nIXAIkN_Y-7XJW5K45IblHd_L2f5LTaDUDwvZ5L6g/edit" target="_blank">QUIC Crypto Specification</a>). Si prefieres ver el código cliente, puedes echar un vistazo al <a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/quic/&ct=rc&cd=1&q=quic&sq=package:chromium" target="_blank">código fuente de Chromium</a>. Si te preguntas qué papel puede desempaña un servidor, échale un vistazo al <a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/tools/quic/&ct=rc&cd=2&q=quic&sq=package:chromium" target="_blank">código del servidor prototipo</a>. Finalmente, si lo que deseas es pensar en los bits en el cable, también hay una <a href="https://docs.google.com/a/chromium.org/document/d/1WJvyZflAO2pq77yOLbp9NsGjC1CHetAXV8I0fQe-B_U/edit#" target="_blank">especificación para los cables</a>.

# ¿Hay algún grupo de discusión para QUIC?

Sí, proto-quic@chromium.org | <a href="https://groups.google.com/a/chromium.org/d/forum/proto-quic" target="_blank">https://groups.google.com/a/chromium.org/d/forum/proto-quic</a>

# Referencias

- *QUIC FAQ for Geeks* »» <a href="https://docs.google.com/document/d/1lmL9EF6qKrk7gbazY8bIdvq3Pno2Xj_l_YShP40GLQE/edit#heading=h.h3jsxme7rovm" target="_blank">Visitar Documento en Drive</a>

 [1]: https://elbauldelprogramador.com/security-now/
 [16]: https://elbauldelprogramador.com/seguridad
 [17]: https://elbauldelprogramador.com/
