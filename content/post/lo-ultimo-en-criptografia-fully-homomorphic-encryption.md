---
author: alex
categories:
- algoritmos
- articulos
- security now
- seguridad
date: '2016-01-01'
lastmod: 2017-07-06T12:30:37+01:00
mainclass: security-now
url: /lo-ultimo-en-criptografia-fully-homomorphic-encryption/
tags:
- cifrado determinista
- "cifrado homomórfico"
- cifrado probabilistico
- "criptografía"
- criptografia homomorfica
- Fully Homomorphic Encryption
title: "Lo último en criptografía: Fully Homomorphic Encryption"
---

<figure>
    <amp-img sizes="(min-width: 256px) 256px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Homomorphic Encryption" src="/img/2012/11/Apps-preferences-desktop-cryptography-icon1.png" alt="" width="256px" height="256px" />
</figure>

Me he aficionado a escuchar un programa de radio llamado **Security Now!**, cuya web puedes consultar en las referencias. Como el nombre del programa indica, hablan sobre seguridad en sistemas informáticos principalmente. El episodio de esta semana iba enfocado a qué se está desarrollando a día de hoy en el mundo de la criptografía.

Pues bien, una de esas cosas en las que los criptógrafos están trabajando a dia de hoy se llama **Homomorphic Encryption** (Cifrado Homomórfico) ó **Fully Homomorphic Encryption** (Cifrado totalmente homomórfico).

# ¿Qué es el cifrado homomórfico ó **Homomorphic Encryption**?

Los chicos de <a href="http://es.wikipedia.org/wiki/RSA" target="_blank">RSA</a> plantearon la hipótesis de este sistema de cifrado en el año 78. Postularon la posibilidad del cifrado homomórfico o **Homomorphic Encryption**. Pero se quedó como una pregunta abierta.

Y hace solo tres años un estudiante de posgrado sorprendió al mundo al demostrar que este sistema es posible. Lo que este estudiante hizo fue demostrar matemáticamente que es posible realizar operaciones de cálculo estándares &#8212; como sumar, multiplicar etc &#8212; a datos cifrados sin la necesidad de descifrarlos previamente.

Por ejemplo, es posible cifrar datos, enviarlos a la *nube* y operar sobre estos datos **sin descifrarlos** . La *nube* no tiene la menor idea del contenido de los datos sobre los que está operando, no vé ningún resultado intermedio. La totalidad de los datos permanecen cifrados durante todo el tiempo. De manera que obtienes el resultado encriptado, y solamente tú puedes desencriptarlo. En eso consiste el cifrado homomórfico o **Homomorphic Encryption**, y funciona.

<!--more--><!--ad-->

# Analizando los sistemas de cifrado actuales

De acuerdo al glosario de definiciones de los laboratorios RSA, definen **probabilistic encryption** (Cifrado probabilístico) al algoritmo que produce resultados cifrados distinos cada vez que se usa, aunque sea con los mismos datos. Esta definición rompe con el esquema del **deterministic encryption** (Cifrado determinista) el cual produce siempre la misma salida para un mismo dato de entrada, es decir, dado un valor de entrada a encriptar, el resultado de cifrar dicho dato será siempre el mismo, con lo cual existe una forma de invertir el proceso. Más técnicamente, el cifrado probabilístico (**probabilistic encryption**) se define así:

> El cifrado probabilístico &#8212; **probabilistic encryption** es un diseño de cifrado en el cual un mensaje es encriptado en uno de muchos posibles **ciphertext**, y no en uno solo como ocurre en el cifrado determinístico **(deterministic encryption)**. Siendo así muy poco probable obtener información parcial sobre el **ciphertext.**

En enfoques anteriores de cifrado, a pesar de que no siempre se sabía cuando era posible obtener dicha información parcial, no se demostró que no era posible hacerlo.

Lo que esta definición quiere decir es que nunca se ha demostrado que la clave pública estandar RSA sea segura. Se basa en la presunta dificultad de factorizar numeros primos enormes. Pero nadie ha sido capaz de demostrar que sea dificil factorizarlos. Simplemente sabemos que es complicado.

Sin embargo saber algo, y demostrarlo, son dos mundos aparte en términos de la tecnología de criptografía académica.

Así que poco después de que los primeros desarrolladores de RSA inventaran este cifrado asimétrico basado en factorización, se dieron cuenta de que su enfoque tenía una propiedad, llamada **homomorfismo (homomorphism)**. Y escribieron sobre esto pocos meses después de desarrollar RSA.

La palabra **homomorfismo** viene de **Homo** y **mórfica**, que significa *de la misma forma*. Es decir, la posibilidad de aplicar distintos procesos un mismo dato y obtener el mismo resultado. Un ejemplo simple es la multiplicación, si **a*b=c** también sabemos que **log(a) + log(b) = log(c)**, por tanto, estas operaciones son homomórficas.

Bien, pues esta idea del homomorfismo ha sido lo que el estudiante mencionado al principio del artículo demostró en su tesis doctoral en 2009, su nombre es Craig Gentry y sorprendió al mundo de la criptografía al presentar un sistema criptográfico homomórfico totalmente funcional. Craig Gentry demostró en sus tesis que es absolutamente posible realizar operaciones de suma y multiplicación sobre información cifrada, sin necesidad de descifrarla en ninguna fase del proceso. Como consecuencia, nadie puede obtener información de los datos sobre los que se está operando. Cuando el resultado de la operación se devuelve a la persona propietaria de esos datos, solo dicha persona puede descifrarlos con su clave. Y el resultado de los datos descifrados es el mismo que se habría obtenido al realizar estas operaciones a datos no cifrados.

Las aplicaciones que tiene este sistema son enormes, por ejemplo las corporaciones podrían dejar en la nube sus datos de manera segura y además realizar operaciones a éstos, y obtener un resultado. De hecho, se han desarrollado **motores de búsqueda** en los cuales el buscador no conoce la consulta que realiza el usuario ni el resultado de la misma, simplemente devuelve el resultado y luego es el usuario quien descifra el resultado para obtener la respuesta a la consulta realizada con total privacidad.

Continuando con la tarea de entender cómo funciona el **cifrado probabilístico** o **probabilistic encryption** vamos a profundizar un poco en el tema.

# Cifrado probabilístico

Imaginemos un sistema de cifrado sencillo, de una dimensión, una buena analogía sería una cuerda con nudos a lo largo de la misma. Éstos nodos, o nudos, representan valores claramente conocidos a consecuencia de su posición. El hecho de cifrar es elegir un nodo de esta cuerda y añadirle ruido deliberadamente, desplazando así la posición del nodo una cantida pseudoaleatoria con respecto a la original.

La función que tiene una clave (**key**) en los sistemas cifrados es determinar dónde están estos nodos que no distribuidos de manera uniforme. Se requiere de un cálculo muy complejo para averiguar dónde se situan, de modo que solo alguien con la clave puede saberlo. Y sobre estos datos con ruido podemos operar y obtener un resultado, como sumar . Se pueden elegir dos números, añadirles ruido, sumarlos y obtener un resultado. Por lo tanto también se está sumando el ruido de cada uno de los números. El resultado será una función que tendrá como entrada los dos sumandos y el ruido correspondiente a cada uno de ellos.

No habrá problema siempre y cuando no haya demasiado ruido, la suma será correcta. El ruido es la razón por la cual quién hace las operaciones no puede sacar nada en claro del resultado, todo lo que sabe es ha recibido una pareja de valores y los está sumando, y no conocerá el resultado porque está calculado relativamente a los nodos. Y ese desplazamiento relativo solo lo conoce la persona con la **clave.** Para resumir, el proceso que realiza las operaciones sabe qué tipo de operaciones está realizando, pero no tiene ni idea de los datos subyacentes.

Todo este proceso que acabo de explicar es una mínima parte de como funciona el cifrado probabilístico, ya que solo se ha aplicado a una dimensión (Una sola cuerda con nodos.). En realidad se hace con un concepto algebráico llamado *<a href="http://es.wikipedia.org/wiki/Ret%C3%ADculo_%28matem%C3%A1ticas%29" target="_blank">lattice (Retículo)</a>*, y son espacios n-dimensionales interconectados con dimensiones del rango de 512, 2048 o mayores. Seguramente puedas visualizar un cubo de 3 dimensiones, y aunque no seas capaz de visualizar una figura de 512 dimensiones, se puede representar matemáticamente.

Los sistemas homomórficos trabajan en estos retículos hiper-dimensionales añadiendo ruido a los nodos para deplazarlos con respecto a su posición original. Como se ha mencionado en los párrafos anteriores, el problema está en que el ruido se va acumulando, en operaciones de suma se duplica cuando hay dos sumandos, y en la multiplicación se eleva al cuadrado cuando se multiplican dos números. Con lo que el ruido se va de las manos muy rápidamente, como consecuencia se está limitado a un número determinado de operecaciones antes de que el ruido interfiera demasiado en los datos reales.

Un sistema **Fully Homomorphic Encryption** (Cifrado totalmente homomórfico) no tiene esta limitación, por definición es posible realizar cualquier tipo de operación, por muy compleja que sea. Craig consiguió evitar que el ruido quedara fuera de control porque, tras realiazar un número determinado de operaciones, los datos se vuelven a cifrar (Sin descifrarlos previamente, es decir, el cifrado homomórfico realiza su propio cifrado) elimiando el ruido de modo que nunca sobrepase el sistema.
Craig implementó este sistema en IBM. Tiene cuatro tipos de escalas del sistema. Uno **pequeño** al que llama 2⁹ de 512 dimensiones, otro de 2¹¹, uno mediano de 2¹³ y el mayor de todos de 2¹⁵.

Aunque aún estamos muy lejos de ver esto implementado en las tecnologías actuales, porque actualmente no están preparadas para soportarlo. La razón es sencilla, el sistema **homomórfico** a secas, no el Totalmente cifrado (Fully Homomorfic) requiere para el sistema más pequeño, el de 512 dimensiones, un ancho de palabra de 200.000 bits, lo cual es enorme. La clave pública usada en el **sistema totalmente homomórfico** tiene un tamaño de 17MB y necesita 2.4 segundos para generarse usando la máquina estandar más potente. El sistema mayor, el de 2¹⁵, de 32768 dimensiones requiere dos horas para generar la clave y ocupa 2.3GB.

En resumen, es una forma completamente distinta de cifrar y tratar datos para la cual los computadores estándares actuales de 64-bits de ancho de palabra no están capacitados.

Este sistema tiene un gran futuro y estamos tan solo al comienzo, como siempre pasa en criptografía, el sistema avanzará rápido y mejorará. Se encontrarán atajos, nuevas formas de hacer las mismas cosas. La idea de ruido en un retículo es solo una de las posibilidades de un esquema de cifrado no-determinista que han sido propuestas, hay otras. Como usar máximos comunes divisores entre otras.

Queda así abierto un nuevo campo en la investigación criptográfica. De aquí a 20, 30 años habrá aplicaciones que funcionarán de un modo totalmente distinto al que estamos acostumbrados, y la gente se preguntará ¿No se ha hecho el cifrado siempre de esta manera?, y no será así, recordaremos lo que solíamos usar y nos daremos cuenta que era estúpido en comparación.

<p class="alert">
    <strong>NOTA:</strong>Este artículo ha sido escrito a partir del episodio 376 de Security Now!, no me atribuyo ninguna autoría, simplemente he escuchado el episodio y he plasmado lo que he aprendido. A continuación proporciono los enlaces correspondientes al episodio
</p>

# Referencias

- *Transcipciones a texto y audio del episodio* »» <a href="http://www.grc.com/securitynow.htm" target="_blank">grc.com</a>
- *Episode 376: Fully Homomorphic Encryption* »» <a href="http://twit.tv/show/security-now/376" target="_blank">twit.tv</a>

 [1]: https://elbauldelprogramador.com/img/2012/11/Apps-preferences-desktop-cryptography-icon1.png
