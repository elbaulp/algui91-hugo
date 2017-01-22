---
author: alex
categories:
- articulos
- security now
- seguridad
color: '#00BCD4'
date: '2016-12-12'
image: 2012/12/qrbaulinnercorners2.png
layout: post.amp
mainclass: security-now
permalink: /estructura-y-seguridad-de-los-qr-codes/
tags:
- como funciona qr
- "C\xF3mo funcionan los c\xF3digod QR"
- qr code
- security now
title: Estructura y seguridad de los QR Codes
---

> Otra semana más me ha interesado el contenido del episodio del programa de radio Security Now!, que comparto con vosotros. Nota: El contenido no es de mi autoría, simplemente lo he traducido.
>
> El anterior espisodio traducido fué [Lo último en criptografía: Fully Homomorphic Encryption][1]

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/linkentrada2-300x300.png" alt="QR Code" width="300px" height="300px" />
</figure>

Seguro que estás familiarizado con la imagen de la izquierda, y habrás usado escánares para acceder a su contenido más de una vez, ya que últimamente están de moda y se encuentran en todas partes.

Sin embargo esta tecnología se inventó hace 18 años para rastrear rápidamente piezas coches durante su ensamblaje en Japón, y se diseñaron muy bien.

Todos son cuadrados y siempre tienen una zona llamada *zona tranquila* ó **quiet zone**. Una de las mejores características de estos códigos es que son neutrales respecto a la orientación, es decir, no es necesario estar exactamente enfrente a ellos o alineados verticalmente para escanearlos. La imagen en sí proporciona toda la información necesaria para permitir al software girarla, orientarla y aplanarla, incluso si se fotografía el código con ángulo.

La característica más prominente del QR Code son los tres cuadrados que aparecen en trés de las cuatro esquinas de la imagen. Son tres porque facilitan una orientación rotacional rápida y a la vez proporcionan un inmediato sentido del tamaño y orientación angular. En la esquina restante hay otro pequeño cuadrado. Normalmente los cuadrados de mayor tamaño se situan en la esquia superior derecha e izquierda e inferior izquierda, dejando al de menor tamaño en la esquina inferior derecha. El hecho de que exista un cuadrado grande en la esquina inferior derecha aporta una idea instantanea de orientación rotacional. Si te fijas, el cuadrado más pequeño está a 4 bits desde la base de la imagen y 4 bits desde la derecha:

<!--more--><!--ad-->
<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/qrbaultargetdownright2.png" alt="qrbaultargetdownright" width="280px" height="280px" />
</figure>

Hay algo que se encuentra en todos y cada uno de los QR que existen, y es una marca de rastreo que une las esquinas interiores de los cuadrados grandes. Mirando entre los cuadrados superiores, se aprecia que siempre hay la siguiente sucesión (negro/blanco, negro/blanco). Es decir un <a href="http://es.wikipedia.org/wiki/Ciclo_de_trabajo" target="_blank">ciclo de trabajo del 50%</a>. Siempre aparece en los QR Codes. Lo mismo pasa entre el cuadrado superiore inferior izquierdo. Este diseño permite tener una referencia del tamaño y de nuevo orientación posicional adicional.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/qrbaulinnercorners2.png" alt="qrbaulinnercorners" width="280px" height="280px" />
</figure>

El código en sí tiene un número de formato y de versión almacenado en los bits circundantes a los tres cuadrados grandes. Dichos bits están siempre en una posición conocida dado que se sabe dónde están colocados los cuadrados grandes. La información almacenada ahí contiene el número de versión y el formato del QR Code.

La densidad oscila en el rango 1-40, proveyendo rango de almacenamiento de hasta 2000 caracteres.

A la hora de codificar los caracteres los creadores no usaron 1 Byte como es habitual, sino un conjunto de caracteres de 45 elementos. Por lo que solo exiten mayúsculas y algunos caracteres especiales. Lo cual es suficiente para codificar URLs. Aún así, existe un modo binario que permite almacenar caracteres de 8 bits.

La codificación del contenido comienza en la esquina inferior derecha y se almacena en bloques de 2&#215;4, la razón del tamaño es para que sean lo más cuadrados posibles, de esta forma los bits en un byte ocupan la menor área posible.

Los diseñadores prestaron mucha atención a la corrección de errores, y desarrollaron tres niveles **bajo, medio, cuartil y alto**.

El nivel más alto de corrección de errores ocupa dos tercios de la superficie del QR Code, lo cual quiere decir que como mucho es posible que se pierda un tercio de la información codificada. De hecho, una con una simple búsqueda en internet se pueden encontrar QR Codes como el de wikipedia:

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/12/Custom_QR_code_Wikipedia2.png" alt="Custom_QR_code_Wikipedia" width="564px" height="396px" />
</figure>

A pesar de haber escrito una palabra justo en mitad del código, sigue siendo decodificable por el lector. Aunque se haya borrado un trozo de información, la corrección de errores la reconstruye.

Este tipo de corrección es similar al estilo de corrección de errores **Reed-Solomon** (Información en <a href="http://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction" target="_blank">inglés</a>, inf. en <a href="http://es.wikipedia.org/wiki/Reed-Solomon" target="_blank">Español</a>) que usan los discos duros. Al igual que en los QR Codes, en los discos duros puede haber un pequeño defecto en la superficie que cause la pérdida de una región física. Esta tecnología permite una recuperación robusta de los datos.

Esencialmente hay un mosaico de 2&#215;4 que se extiende a lo largo de un borde y luego da la vuelta. Pero no como un <a href="http://en.wikipedia.org/wiki/Raster_scan" target="_blank">raster scan</a>, que salta de nuevo hacia donde empezó. En lugar de eso, se da la vuelta y regresa al punto de origen, dos bits más hayá. Luego vuelve a girar y regresar.

Uno de los problemas que se encontraron los diseñadores fue a la hora de que los datos emularan las características de reparación del QR Code. Habría un problema de señalización en banda, que es el término usado en teoría de la información para referirse al problema de intentar tener datos de formato, que deben estar separados del contenido, el problema es que el código se imprime con tinta. ¿Cómo se diferencia qué es datos y qué es formato?

Se plantearon organizar la información, pero ¿que pasa si la información ordenada se parece a uno de los cuadrados principales?, ¿y si aparecen demasiados espacios en blanco consecutivos?. Eso sería un problema. De nuevo el QR Code actua de forma similar a los discos duros usando una tecnología llamada Self-Clocking (Autosincronizable). En lugar de malgastar espacio con una señal de reloj o una traza de reloj además de los datos, organizaron los datos de forma que fueran autosincronizables, para que proporcionen su propia información de sinconización.

El modo de hacerlo es asegurarse que no hay, en el caso de los discos duros, un grupo de ceros juntos. Tener esta sucesión de ceros juntos significa que no está pasando nada, el problema surge cuando pasa algo (aparecen 1s) es necesario saber exáctamente cuantas cosas **no** pasaron, es decir, cuantos ceros había. Y puede ser peligroso si el disco duro no gira a ritmo constante. De forma similar, si el QR Code está estirado o arrugado causará un cambio local en la frecuencia del patrón establecido en el campo visual. Así que no es buena idea tener grandes bloques negros o blancos en el Qr Code porque sería un problema a la hora de conocer su tamaño, lo cual es crucial, especialmente en Qr Codes de gran densidad que se lean desde cierta distancia. Sería dificil saber cuantos bits posee.

La solución tomada por los diseñadores fue establecer una máscara para uno de los formatos de control. Y realizar un XOR a todo el conjunto de datos. La opereración XOR se usa muy amenudo en [criptografía][2]. Al realizar un XOR a algún dato, se invierten los bits, si se vuelve a realizar un XOR sobre los mismos datos, se obtiene el dato original.Debido a lo simple de realiazar un XOR es el proceso perfecto para resolver el problema. Dependiendo de la naturaleza de los datos contenidos en el QR Code crearon una librería con ocho patrones XOR distintos derivados matemáticamente de las coordenadas X e Y de una porción de 8&#215;8.

Estos patrones de 8&#215;8, por ejemplo, son un tablero de ajedrez, otro son rayas verticales, rayas horizontales etc. Llegados a este punto, la tarea del codificador QR es establecer un QR code simple, sin enmascarar ni XOR y luego seguir un criterio para detectar posibles problemas, como grandes secuencias de ceros o unos, o formaciones de grandes bloques.

Lo que se hace es aplicar cada una de las ocho máscaras para obtener ocho posibles QR codes candidatos y basandose en un criterio elige el más adecuado, y almacenará la máscara elegida como información de codificación.

Finalmente para decodificar el contenido, se empieza por la esquina inferior derecha, donde se encuentra el tipo de codificación (de 4 bits de tamaño), luego la longitud (8 bits) seguido de los datos almacenados. Despues de los datos puede haber otra codificación y otra longitud para seguir obteniendo datos. Por consiguiente, es posible disponer de múltiples formatos en un solo QR code. Incluso densidad y correncción de errores variable. Hay que tener una concepto claro, la corrección de errores significa redundancia, a más corrección de errores, mayor porcentaje del área no serán datos.

**Pasemos a ver los aspectos de seguridad.**

Debido a que estos códigos pueden usarse para representar cualquier cosa, hay gente con malas intenciones que sabe que se están haciendo fotos a los QR Codes. Incluso los anunciantes hacen uso de ellos. Aparecen en muchos carteles. Los códigos QR populares se están reemplazando con pegatinas con otro QR code con contenido malicioso.

Normalmente los intérpretes instalados en los smartphones preguntan qué deseas hacer con el contenido del QR code que acaba de leer, compartirlo, ir a la dirección web almacenara etc. Sin embargo hay algunos intérpretes que no están implementados de esta forma. Y es un problema, porque es totalmente posible realizar un [buffer overflow][3] en el intérprete. Hasta la fecha no se conoce ninguno, pero si lo hubiera sobreescribiría la funcionalidad del intérprete, y tomarían el control del smartphone.

Por ese motivo Symantec ha creado un intérprete llamado **<a href="https://play.google.com/store/apps/details?id=com.symantec.norton.snap&hl=en" target="_blank">Norton Snap</a>** disponible tanto para Android como iOS.

Otro buen intérprete es **<a href="https://play.google.com/store/apps/details?id=com.google.zxing.client.android&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5nb29nbGUuenhpbmcuY2xpZW50LmFuZHJvaWQiXQ.." target="_blank">Barcode Scanner</a>**, pregunta qué se quiere hacer con el contenido, en lugar de redirigir directamente a la url codificada.

<p class="alert">
<strong>NOTA:</strong>Este artículo ha sido escrito a partir del episodio 382 de Security Now!, no me atribuyo ninguna autoría, simplemente he escuchado el episodio y he plasmado lo que he aprendido. A continuación proporciono los enlaces correspondientes al episodio
</p>

### Referencias

*Transcipciones a texto y audio del episodio* »» <a href="http://www.grc.com/securitynow.htm" target="_blank">Visitar sitio</a>
*Episode 382: QR Codes* »» <a href="http://twit.tv/show/security-now/382" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/lo-ultimo-en-criptografia-fully-homomorphic-encryption/
 [2]: https://elbauldelprogramador.com/lo-ultimo-en-criptografia-fully-homomorphic-encryption/ "Lo último en criptografía: Fully Homomorphic Encryption"
 [3]: https://elbauldelprogramador.com/explotacion-buffers-overflows-y-exploits-parte-i/ "Explotación – Buffers OverFlows y exploits (Parte I)"