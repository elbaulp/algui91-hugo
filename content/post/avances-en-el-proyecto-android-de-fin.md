---
author: alex
categories:
- android
- aplicaciones
- opensource
date: '2016-01-01'
description: "Como ya sab\xE9is tengo que realizar un proyecto de fin de curso, el
  cual ya expliqu\xE9 en [qu\xE9 consist\xEDa][1], y escribo esta entrada para mostraros
  un poco los avances que voy haciendo."
lastmod: 2016-09-07
mainclass: android
url: /avances-en-el-proyecto-android-de-fin/
tags:
- curso android pdf
title: Avances en el proyecto Android de fin de curso [WifiBar]
---

Como ya sabéis tengo que realizar un proyecto de fin de curso, el cual ya expliqué en [qué consistía][1], y escribo esta entrada para mostraros un poco los avances que voy haciendo.

He de decir que el proyecto no lo estoy haciendo solo, lo formamos un equipo de 3 personas compañeros de clase. Nos repartimos las tareas para que uno se encargara de hacer la [base de datos][2], otro la interfaz gŕafica y yo lo que viene siendo la programación interna del programa (Conectar a la base de datos, mandar y recibir consultas, manejar los datos, rellenar los elementos gŕaficos con estos datos etc). El código está bajo licencia [GPLv3.0][3]

A continuación voy a explicar mediante capturas de pantalla algunas funcionalidades que tiene el programa.

<!--more--><!--ad-->

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="305" src="https://1.bp.blogspot.com/-7UI6P-RRixQ/TdAVCyzDQ6I/AAAAAAAAAeY/SZHOWPXVFcg/s500/icono.png"></amp-img>
</figure>

Lo primero que hace la aplicación al iniciarse, es comprobar que la red WiFi del dispositivo esté activada, en caso de no estarla, se notifica al usuario y se sale de la aplicación, ya que sin conexión no es funcional.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="306" src="https://3.bp.blogspot.com/-iZj8DYLsOEk/TdAO0_aJG_I/AAAAAAAAAdw/yfXZ9wAuX5E/s500/noWifi.png"></amp-img>
</figure>

En segundo lugar se comprueba que la conexión con el servidor (donde se encuentra la base de datos) esté establecida, en caso negativo, se muestra otro mensaje de error y se finaliza

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="305" src="https://2.bp.blogspot.com/-fTXix1DkoxI/TdAQO7DotiI/AAAAAAAAAd4/zak_5vQrvzc/s500/noServer.png"></amp-img>
</figure>

Si ninguno de los mensajes de arriba se muestra, entramos en la primera Activity (en la cual se consultará a la base de datos la información necesaria para esta actividad), en la que debemos seleccionar un camarero y pulsar el botón.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="306" src="https://4.bp.blogspot.com/-5yIexsA06XI/TdATUJ39qDI/AAAAAAAAAeA/Wn81Cw1o6Dw/s500/camarero.png"></amp-img>
</figure>

Una vez pulsado el botón, pasamos a la siguiente actividad, en la que se debe seleccionar una mesa para abrirla, cerrarla o realizar pedidos sobre ella. Al igual que en la actividad de camareros, se solicita la información de las mesas a la base de datos.

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="306" src="https://4.bp.blogspot.com/-BZjhH4BNz0k/TdAT8kH3-PI/AAAAAAAAAeQ/zCUx8mF0G3c/s500/selecci%25C3%25B3nMesa.png"></amp-img>
</figure>

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="500" width="306" src="https://4.bp.blogspot.com/-j67USPZqytc/TdAT8mhHWMI/AAAAAAAAAeI/HMMy-r8hBhU/s500/mesa.png"></amp-img>
</figure>

Al pulsar en _Hacer comanda_ vamos a un intent en el que se deben elegir los pedidos del cliente (pero aún está a medio hacer)

Cosas a tener en cuenta:

- La interfaz gráfica aún es poco vistosa, pero ahora mismo nos vamos a ocupar de que la aplicación funcione adecuadamente y despues mejoraremos la interfaz.
- Como el código es bastante extenso no lo voy a mostrar aquí, sin embargo se puede ver en el repositorio de [github-WifiBar][4]
- El proyecto debemos realizarlo todos los alumnos del curso, por lo que si alguno anda perdido y ver el código le sirve de ayuda no me importa que copien algo en concreto, o si les aporta ideas nuevas para su proyecto, pero por favor, no me lo plagieis :-).

Estoy bastante contento con este proyecto, ya que me ha permitido iniciarme en la programación para Android.

 [1]: https://elbauldelprogramador.com/conectar-base-de-datos-sql-server-2008/
 [2]: https://elbauldelprogramador.com/bases-de-datos/
 [3]: http://www.gnu.org/licenses/
 [4]: https://github.com/elbaulp/WifiBar
