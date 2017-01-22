---
author: alex
categories:
- juegos
- python
color: '#F57C00'
date: '2016-12-12'
lastmod: 2016-08-06
layout: post.amp
mainclass: articulos
permalink: /programando-videojuegos-en-python/
title: Programando Videojuegos en Python
---

Aunque no es la faceta más famosa de Python, Python es un lenguage con bastantes posibilidades para programar videojuegos. Por un lado convina la profundidad y recursos de usar las librerías de C/C++ y por otro la facilidad cercana a usar Flash, con un rendimiento medio entre ambas. Por lo que en muchas ocasiones en un buen lenguaje para programar cosas complejas de forma rápida, aunque obviamente sacrificando rendimiento, al ser juegos interpretados y no compilados.

A continuación haré una pequeña reseña de las librerías más útiles para desarollar videojuegos:

<!--more--><!--ad-->

- <a href="http://www.pygame.org/">Pygame</a>: Sin duda la librería más famosa de Python. Pygame lleva en desarrollo desde el 2001 por lo que tiene un gran comunidad, publicándose en su propia página web gran cantidad de juegos y demos con más de 1.000 proyecto registrados. Es multiplataforma a la perfección y la librería que menos problemas da al portar entre Linux/Windows/Mac, y es famosa por su facilidad de programación. Utiliza una librería de C llamada SDL, librería en la que están escritos los juegos 2d más famosos en Linux como Battle for Wesnoth, SuperTux o StepMania.
- <a href="http://pyopengl.sourceforge.net/">PyOpenGL</a>: Hablando de Pygame, esta tiene un fallo, y es que no soporta Aceleración gráfica al basarse en SDL. Aquí entra en juego PyOpenGL, un binding de OpenGL que se puede combinar con Pygame para añadir las funciones que a este le faltan. Eso sí, requiere un nivel de conocimiento de programación de videojuegos más alto, al ser una capa de abstracción máyor. Para quien no conozca OpenGL, es la competencia de DirectX en el mundo del software Libre, y todos los juegos 3d libres y muchos cerrados corren sobre ella incluidos juegos de Blizzard y Valve.
- <a href="http://www.pyglet.org/">Pyglet</a>: Pyglet es la alternativa a Pygame+PyOpenGL permitiendo aceleración gráfica y trabajar en 2d/3d, todo ello en una sola librería, y sin tener que recurrir a la engorrosa dificultad de PyOpenGL. Eso sí, sacrificando algunas utilidades avanzadas de pyopengl, y siendo un poco más dificil de usar que Pygame. Pyglet es una librería con un desarollo actual más rápido que pygame, que cada día gana más adeptos. En realidad Pyglet utiliza OpenGL en gran parte de sus funciones, pero facilitando su uso.
- <a href="http://www.panda3d.org/">Panda3d</a>: Librería libre centrada en videojuegos 3D escrita para Python y C++. Es una librería orientada a 3D, y por lo tanto no apta para iniciados. Algunos juegos de Disney han usado esta librería.
- <a href="http://code.google.com/p/pymunk/">Pymunk</a>: Librería especialida en crear físicas 2D, como polígonos, colisiones, etc. Esta basada en la famosa librería chipmunk, de la que podeis <a href="http://www.youtube.com/watch?v=z_Sx9N39KHk&feature=player_embedded">ver este video de demostración</a>.
- <a href="http://cocos2d.org/">Cocos2d</a>: Este framework es una extensión de Pyglet que añade gran cantidad de efectos, rotar y manipular sprites, transiciones entre escenas con estilos, etc. Combinando Pyglet+Cocos2d se pueden realizar juegos de gran calidad.
- <a href="http://www.pythonogre.com/">PyOgre</a>: Binding para python de Ogre, un popular motor de renderizado 3D en C++ con <a href="http://www.ogre3d.org/">una activa comunidad</a>. Debe complementarse con otras librerías 3D como PyOpenGL.

En la página web de Python se puede encontrar una recopilacción más extensa de librerías orientadas a la programación de videojuegos: <a href="http://wiki.python.org/moin/PythonGameLibraries">http://wiki.python.org/moin/PythonGameLibraries</a>