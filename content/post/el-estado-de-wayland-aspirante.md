---
author: alex
categories:
- noticias
color: '#F57C00'
date: '2016-01-01'
lastmod: 2016-08-15

mainclass: articulos
url: /el-estado-de-wayland-aspirante/
title: El estado de Wayland, aspirante a reemplazar X.org
---

Hace poco que sigo el blog <a target="_blank" href="http://diegocg.blogspot.com/">D&#8217;Oh!</a>, y la verdad es que todos los temas sobre los que se escriben en él son bastante interesantes. Leí una entrada que me gusto mucho, y la voy a escribir a continuación. Recomiendo este blog para la gente de Linux sobre todo, ya que el autor, escribe regularmente las caracteristicas mas relevantes de las actualizaciones del kernel.

La última vez que se [mencionó en este blog al servidor gráfico Wayland][1], fue con la descripción de &#8220;revolucionario y raquítico a la vez&#8221;. No era una apreciación del todo errónea; tengo la manía de clonar los repositorios de proyectos interesantes para ojear de vez en cuando su actividad, y como proyecto con la no precisamente leve vocación de ser alternativa a X.org, la evolución de Wayland&nbsp; no era muy esperanzadora (13 commits en 8 meses, todos menos dos de su creador). Me equivocaba, fue escribir esa entrada y aumentar el número de commits y buenas noticias.

Aunque la actividad no se haya disparado por las nubes, en los últimos meses se ha visto que Wayland progresa más rápido de lo esperado. Para empezar, [ MeeGo tiene interés en él a largo plazo][2] para usarlo como servidor gráfico en dispositivos móviles-táctiles (un detalle interesante es que Kristian Høgsberg, el autor, creó Wayland en la época en que trabajaba en Red Hat, pero no como algo de la compañía, sino durante su tiempo libre, mientras que ahora trabaja en Intel, en parte en Wayland). Pero lo más determinante para el futuro de Wayland no es algo que esté ocurriendo en su código. Lo más difícil para un proyecto así es conseguir apoyo de los toolkits y proyectos relacionados con el escritorio. Yo creía que se tardarían años en ver progresos en este sentido, pero ha resultado ser al contrario: Ya se están portando [QT][3], [GTK][4] y [Clutter][5] ([capturas][6]). Claro que, teniendo en cuenta el enormemente intrincado mundo del vídeo es difícil imaginar una transición fácil y breve. Pero incluso para eso hay buenas noticias,&nbsp; [Wayland puede usarse para mostrar servidores X completamente funcionales][7], lo cual permitiría compatibilidad al estilo de XQuartz (X11 sobre OS X).

Probablemente, parte de la aparente sencillez en portar QT y GTK se debe a [su diseño][8] (eso, y que en el mundo gráfico de Linux hay cada vez más inversión). Wayland es muy simple, se limita compartir buffers de memoria con las aplicaciones clientes, las cuales notifican a Wayland de los cambios, quien a su vez envía la imagen final al hardware vía OpenGL ES. Esa función de coordinador de buffers, mas el envio de eventos desde dispositivos de entrada a las ventanas, son prácticamente sus únicas funciones, por eso es tan pequeño, simple e ideal para dispositivos táctiles. El renderizado de las ventanas en si, en el que X.org, con su anticuado diseño, trata de tomar parte (la propia API nativa de dibujado, las obsoletas fuentes en el servidor, extensiones como Composite para hacer posible software como Compiz), se deja completamente en manos del cliente.

Afortunadamente, todos los toolkits modernos están diseñados para funcionar de acorde con lo que Wayland espera, por lo cual portarlos significa (a los ojos de este humilde servidor no experto en gráficos) implementar el código que envie los contenidos a Wayland, e interactuar con él cuando hay que redibujar algo. El divorcio con X.org es tal, que el concepto de &#8220;gráficos a través de la red&#8221; del protocolo X11 en realidad no queda excluido ni obsoleto, pasa a ser asunto de las aplicaciones clientes, como algo opcional.

Todo esto suena muy bien para Wayland, y hay que tener en cuenta que este servidor no es por si mismo una revolución, más bien es el punto final a todas las novedades de los últimos años en APIs de acceso a hardware (KMS) y las novedades y capacidades de los toolkits y el progreso en Mesa: Wayland es el broche final que une ambos mundos de manera correcta, prescindiendo del obsoleto X.org. Pero tampoco hay que darlo todo por hecho: Imaginen que a alguien se le ocurre añadir una extensión a X.org implementando algo similar. En un mundo tan atacado por el relativismo moral, no hay que descartar semejantes desvaríos.

(PD: Ubuntu ha anunciado, precisamente justo después de publicar esta entrada, que [pretende usar Wayland en el futuro][9])



 [1]: http://diegocg.blogspot.com/2010/08/novedades-en-systemd.html
 [2]: http://www.phoronix.com/scan.php?page=news_item&px;=ODYwMQ
 [3]: http://gitorious.org/%7Ekrh/qt/qt-wayland
 [4]: http://cgit.freedesktop.org/%7Ekrh/gtk/
 [5]: http://cgit.freedesktop.org/%7Ekrh/clutter/
 [6]: http://wayland.freedesktop.org/screenshots.html
 [7]: http://hoegsberg.blogspot.com/2008/12/two-x-servers-and-microphone.html
 [8]: http://wayland.freedesktop.org/architecture.html
 [9]: http://www.markshuttleworth.com/archives/551
