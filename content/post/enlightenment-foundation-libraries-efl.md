---
author: alex
categories:
- linux
color: '#2196F3'
date: '2016-12-12'
lastmod: 2016-08-01
layout: post.amp
mainclass: linux
permalink: /enlightenment-foundation-libraries-efl/
title: Enlightenment Foundation Libraries (EFL)
---

Esta es mi primera entrada así que intentad ser amable conmigo.

Aprovechando [que salió la versión Alfa](http://www.enlightenment.org/p.php?p=news/show&l=en&news_id=23) de las EFL decidido hablaros de estas librerias

Para ello hay que empezar hablando de [Enlightenment](http://es.wikipedia.org/wiki/Enlightenment). Enlightenment es un gestor de ventanas y también un escritorio de unix que empezó a desarrollarse en el 97, en la época de los inicios de muchos escritorios como KDE y Gnome. Era un escritorio bastante simple y ligero y de aspecto arcaico que usaba las librerías básicas de las X. Su última versión fue conocida como e16.

Hace unos años los desarrolladores decidieron reescribir desde cero el escritorio y empezar una nueva versión conocida como e17\. Y ya que decidieron empezar desde cero tuvieron una genial idea, crear sus propias librerías gráficas llamadas EFL.

¿Que tiene de interesante estas librerías? En caso de que llegar a ser estables y maduras proveen unas librerías potentes y modernas para aquellos programadores que quieren programar sin presuponer que estes en gnome y kde. Durante años para estas tareas se usaba las X (de aspecto arcaico) o WX (que dibuja con el motor de gtk). Estas librerías son realmente una versión mejorada de las X clásicas con aceleración gráfica, widgets varios, mejor programada y con más efectos y funciones.

Aún se usa en pocos programas (e17, amsn2, xmms2, etc.) debido a encontrarse en estado alfa. Pero hay quien ha sugerido en alguna lista de correo que en el futuro si se desarrollan bien podrían hacerse una versión de firefox usándolas lo que solucionaría el gran consumo de memoria de firefox en linux (usa gtk), navegador que sin duda es menos eficiente en linux que en windows actualmente.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="http://download.enlightenment.org/att/wiki/Elementary/elm-app-02.2.png" alt=""></amp-img>
</figure>

Las EFL constan de los siguientes módulos/librerías principales:

- __Evas__: Es la librería encargada de crear areas y ventanas. Esta librería usará aceleración gráfica 3D siempre que sea posible, pero igualmente correrá rápidamente en máquinas con gráficas de bajo nivel o antiguas.
- __Edje__: Esta librería separa la interfaz de la aplicación. Permite de forma sencilla aplicar skins a las aplicaciones, permitiendo cambiar la [GUI](http://es.wikipedia.org/wiki/GUI "GUI") del programa sin tener que cambiar la aplicación en sí.
- __Ecore__: Es una librería abstracta de eventos. Es muy modular así que las aplicaciones solo tienen que llamar a las partes mínimas que sean necesarias. A parte de eventos gráficos también recolecta eventos de redes/internet.
- __Embryo__: Esta librería implementa un lenguage de programación propio para realizar scripts que puedan ser usados en otras partes de la EFL. El lenguage tiene una sintasis muy parecida a C.
- __EET__: Es la librería encargada de cargar y guardar datos en los programas tanto desde el disco duro como desde internet. Está designado para ser rápido, y posee su propio tipo de archivo (de extensión EET) .
- __Eina__: Es la librería básica de los tipos/clases usados por la ESL como los rectangulos, [hashes](http://es.wikipedia.org/wiki/Tabla_hash), etc. Es pequeña y se puede usar aislada.

EFL usa otras librerías secundarias o de ayuda como imlib2 (para imágenes), EDB (base de datos simple), exml (escritor/parser de lenguage xml), epeg (para imágenes JPEG), Epsilon (para crear thumbnails), Engrave, Esmart, Emotion (para videos), Elementary y EWL(Widgets Varios).

Como podeis ver a pesar de estar en un estado Alfa de desarrollo y tener aún mucho tiempo para ser estable, la idea de una gui estructurada en múltiples módulos va en buen camino.

Recomiendo para probar las librerías en acción (en este caso con e17) con el siguiente live-cd: [http://www.elivecd.org/Download/Stable#download](http://www.elivecd.org/Download/Stable#download)

Imágenes extra: [http://trac.enlightenment.org/e/wiki/Elementary](http://trac.enlightenment.org/e/wiki/Elementary)

Página web de Enlightenment y las EFL (en inglés): [http://www.enlightenment.org/](http://www.enlightenment.org/)