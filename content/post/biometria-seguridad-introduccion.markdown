---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2016-01-25 11:05:30
description: "En este art\xEDculo se ver\xE1 una introducci\xF3n a lo que es la biometr\xEDa,
  y c\xF3mo se puede aplicar a los sistemas inform\xE1ticos para proporcionar seguridad.
  Tambi\xE9n se har\xE1 un repaso a los distintos tipos de biometr\xEDa."
image: hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png

mainclass: articulos
modified: null
tags:
- "seguridad biom\xE9trica"
- "biometr\xEDa aplicada a la seguridad"
- "reconocimiento de patrones biom\xE9tricos"
- "sistemas biom\xE9tricos"
- "biometr\xEDa de la mano"
title: "Biometr\xEDa Aplicada a La Seguridad - Introducci\xF3n"
---

<figure>
<a href="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png" title="{{ page.title }}" alt="{{ page.title }}" width="640px" height="405px" /></a>
<span class="image-credit">Crédito de la imagen: pixabay<a href="https://pixabay.com/en/biometrics-eye-security-154660/"></a></span><br />
</figure>



El siguiente artículo forma parte de un trabajo en grupo realizado para la asignatura _Seguridad en Sistemas Operativos_ de la facultad de Ingeniería Informática de Granada (ETSIIT). Los componentes del grupo fueron [@MPV_Prod](http://twitter.com/MPV_Prod) , [@_musicalnote](http://twitter.com/_musicalnote) y [@ElBaulP](http://twitter.com/elbaulp). Este primer artículo es autoría de @MPV_Prod.
{: .notice-info }

# Índice

- Biometría aplicada a la seguiridad - Introducción
- [Biometría aplicada a la seguiridad - Reconocimiento de patrones](/biometria-seguridad-patrones "Biometría aplicada a la seguiridad - Reconocimiento de patrones")
- [Biometría aplicada a la seguiridad - Sistemas biométricos](/sistemas-biometricos "Biometría aplicada a la seguiridad - Sistemas biométricos")

<!--more--><!--ad-->

Introducción sobre qué es la biometría.
=======================================

> La **biometría** es el método de reconocimiento de personas basándose
> en uno o más rasgos fisiológicos o de comportamiento.

Actualmente, el avance de la tecnología, nos ha permitido la
automatización y perfeccionamiento de los procesos de reconocimiento
biométrico, en especial los relacionados con la [seguridad](/security-now/ "Posts sobre seguridad").

La biometría es una técnica que se remonta bastantes años atrás,
anterior al uso de los ordenadores. Ya en el siglo XIX, disciplinas como
el sistema de Bertillon o “Antropometría” (estudio de las medidas del
cuerpo) y el estudio de las huellas dactilares (tesis publicada en 1823
por Jan Purkinge sobre nueve grupos de configuraciones en estas mientras
estudiaba las glándulas sudoríparas) forman parte de los primeros
estudios biométricos. Más tarde, en torno a 1900, Scotland Yard (Policía
Metropolitana de Londres), comienza a hacer uso de las huellas
dactilares para identificación y detención de criminales en busca y
captura.

No obstante, los procesos manuales eran laboriosos, pues había que
obtener, en primer lugar, por algún medio no siempre preciso, las
huellas dactilares de los posibles autores y cotejarlas de forma manual
y a vista, con las previamente almacenadas en archivo.

Ya a comienzos de los 70, una empresa de Wall Street, *Shearson Hamil*,
instala un sistema de identificación automática basado en huella
dactilar para el control del acceso físico a sus instalaciones,
convirtiéndose esta en la primera solución biométrica para uso
comercial, aunque muy costosa para la época.

Hoy en día, microprocesadores y electrónica avanzada han reducido el
costo y aumentado la exactitud y las técnicas de biometría informática
se aplican en multitud de casos y escenarios.

Cómo funciona un sistema biométrico
-----------------------------------

Los sistemas biométricos se basan en métodos automáticos para reconocer
a personas sobre la base del análisis de sus características
fisiológicas o de comportamiento.

En función de la técnica empleada, consideraremos diferentes parámetros,
como los surcos de las huellas dactilares, la geometría de la mano, la
voz, etc. A partir de éstos, obtendremos un patrón único para cada
persona que será usado en posteriores comparaciones.

Para ello, el usuario deberá registrar su [identidad](/como-eliminar-tu-identidad-online-la-guia-fundamental-para-el-anonimato-y-la-seguridad-en-internet/ "Cómo eliminar tu identidad online") en el sistema
mediante la captura de una serie de parámetros biométricos. Esto se
conoce como **proceso de registro** y se compone de las siguientes
fases:

1.  *Captura* - Se leen mediante algún dispositivo los datos que
    presenta el usuario.

2.  *Procesamiento* - Se extraen ciertas características personales de
    la muestra capturada y se crea un modelo con ellas.

3.  *Inscripción* - Se almacena el modelo procesado para que el sistema
    pueda [autenticar](/sqrl-y-la-idea-de-eliminar-el-uso-de-usuario-y-contrasena-en-internet/ "SQRL y la idea de eliminar el uso de usuarios y contraseñas") a las personas mediante su uso.

Posteriormente, en el **proceso de autenticación** se captura una
muestra biométrica del usuario y se compara con las características ya
registradas. Esto puede realizarse de dos formas:

-   *Identificación* - Se compara la muestra recogida con una base de
    datos de rasgos biométricos previamente registrados. Este es el
    único dato que se conoce del usuario, por lo que se trata de un
    proceso de cálculo costoso, al tener que comparar con cada una de
    las muestras almacenadas.

-   *Verificación* - En este caso, en primer lugar se realiza una
    identificación por nombre de usuario, o cualquier otro método,
    seleccionándose así, directamente, el patrón con el que comparar la
    muestra registrada.

En el uso de un sistema biométrico existen unas características que es
necesario establecer previamente y que son críticas en el funcionamiento
del mismo. Estas son:

-   *Aceptación* - Es el factor más crítico en el éxito de un sistema,
    ya que este depende de la aceptación por el usuario. Así,

    -   El aparato no debe causar incomodidad o preocupación.

    -   Debe de ser fácil de usar.

    -   El sistema biométrico debe de trabajar correctamente.

-   *Tasa de Falsa Aceptación (FAR)* - Es la probabilidad de que un
    sistema vincule erróneamente a un individuo con la información
    biométrica existente de otra persona, de forma que este usuario no
    autorizado pase por alguien que sí lo estuviese. Sus valores suelen
    oscilar entre 0.0001% y 0.1% para ser aceptables.

-   *Tasa de Falso Rechazo (FRR)* - Es la probabilidad de que el sistema
    no vincule a un individuo con su propia plantilla biométrica
    existente en el registro. Sus valores suelen estar entre el 0.00066
    % y el 1 % para ser aceptables.

-   *Tasa de Error Equitativa (EER)* - La FAR y la FRR son inversamente
    proporcionales y afectarán de manera creciente o decreciente a la
    sensibilidad del dispositivo. La Tasa de Error Equitativa es el
    punto de corte de las dos anteriores y corresponde a una indicación
    buena de la ejecución del método biométrico. Es mejor cuanto más
    pequeña.

-   *Rendimiento* - Viene dado por el tiempo total que tarda un
    dispositivo en la identificación de una persona. Mientras que la
    mayoría de fabricantes sólo especifican el tiempo de comprobación
    del lector, también deberíamos de tener en cuenta otras medidas
    como:

    -   *Tiempo de comprobación* - Es el tiempo transcurrido desde la
        presentación al dispositivo de la característica biométrica
        hasta la comprobación de la identidad (\~2sg).

    -   *Facilidad de uso* - Varía dependiendo de lo que se le solicite
        al usuario (introducción del número de ID o uso de tarjetas,
        tiempo de posicionamiento, etc).

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Biometricserror.jpg" alt="Biometric Error" title="Biometric Error" ></amp-img>
    <figcaption>EER</figcaption>
</figure>

Métodos de biometría estática
-----------------------------

Los métodos estáticos son aquellos que miden la anatomía del usuario.

### Huella dactilar

La identificación basada en huella dactilar es la más antigua de las
técnicas biométricas como ya hemos visto. Es el rasgo más utilizado para
la autenticación debido a que la mayoría de la población tiene huellas
dactilares únicas e inalterables (no sirve para personas con huellas
digitales dañadas) y, por tanto, la variedad de tecnología de captura
disponible es muy amplia.

A la hora de llevar a cabo una búsqueda de coincidencias entre huellas,
nos encontramos dos técnicas diferentes:

-   *Basada en minucias*: aquí, nos centraremos en determinadas formas
    fácilmente identificables existentes en la huella dactilar o
    “minucias”. Así, el modelo consistirá en una serie de dichas
    minucias, indicando si posición dentro de la huella, de forma que
    para el análisis, la plantilla correspondiente a cada usuario es un
    esquema que indica qué minucias se deben detectar, su posición y la
    distancia de separación entre ellas. El problema de esta técnica
    reside en la complejidad de extraer de forma precisa las minucias
    cuando la calidad de la muestra es deficiente.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/huellas3.png" alt="Minucias" title="Minucias" ></amp-img>
<figcaption>Minucias</figcaption>
</figure>

-   *Basada en correlación*: nos basamos en el patrón global seguido por
    la huella, es decir, un esquema general de la misma, sin atender a
    las minucias.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/crestas.png" alt="Correlación" title="Correlación" ></amp-img>
<figcaption>Correlación</figcaption>
</figure>

### Geometría de la mano

Se basa en la forma de la mano para confirmar la identidad del usuario.
No requiere información detallada de éstos, por lo que es bastante
aceptada. Su uso recomendado es el de verificación, no para
identificación, por el coste de cómputo que este último supondría.

Para capturar la muestra, se coloca la mano en la superficie de un
lector y este toma una serie de imágenes 3D de la mano, con información
relativa a curvas de los dedos, grosor y longitud, altura y anchura del
dorso de la mano, etc. No obstante, no se tienen en cuenta rasgos
superficiales.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/bio2.png" alt="Escaner Morfología" title="Escaner Morfología" ></amp-img>
<figcaption>Escaner Morfología</figcaption>
</figure>

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/extraccionmano.png" alt="Modelo Mano" title="Modelo Mano" ></amp-img>
<figcaption>Modelo Mano</figcaption>
</figure>

### Modelo de la retina

Es una técnica con una FAR prácticamente nula (inmune incluso a ojos
falsos y trasplantes). Sin embargo, requiere de la colaboración por
parte del usuario, al tratarse de un proceso intrusivo. El usuario debe
permanecer inmóvil con la pupila cerca del sensor para que se tome la
muestra mediante infrarrojos.

Aunque se trate de una tecnología que aparentemente ofrece un alto grado
de seguridad, la falta de aceptación por parte de los usuarios, unido al
alto coste de los dispositivos, hacen que su utilización se limite a
instalaciones militares, nucleares o laboratorios.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/RetinaViewer.png)" alt="Modelo Retina" title="Modelo Retina" ></amp-img>
    <figcaption>Modelo Retina</figcaption>
</figure>

### Modelo del iris

Es un método muy similar al anterior en cuanto a FAR y FRR, aunque aquí
utiliza un escáner externo del iris del ojo, en lugar de la retina.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Iris_Scanner.jpg" alt="Escaner Iris" title="Escaner Iris" ></amp-img>
    <figcaption>Escaner Iris</figcaption>
</figure>

### Reconocimiento facial

El reconocimiento facial es una técnica que permite reconocer personas a
partir de imágenes o fotografías haciendo uso de programas de cálculo
que analizan imágenes de rostros humanos.

Uno de los principales inconvenientes que presenta esta técnica es la
facilidad de cambio en el rostro, por ejemplo, utilizando unas gafas de
sol o dejándose crecer la barba. Asimismo, debe considerarse que el
rostro de las personas varía con la edad.

Aun así, es una técnica satisfactoria para todas las personas y puede
utilizarse para tareas de vigilancia sin necesidad de adquirir equipo
específico.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/keylemon-2.png" alt="Análisis Facial" title="Análisis Facial" ></amp-img>
<figcaption>Análisis Facial</figcaption>
</figure>

Métodos de biometría dinámica
-----------------------------

Los métodos dinámicos son aquellos que miden el comportamiento del
usuario.

Reconocimiento de la voz
------------------------

Es un método natural de identificación que las personas utilizan a
diario. Estas aplicaciones se basan en redes neuronales para aprender a
identificar voces. Sin embargo, la autenticación se complica debido a
factores como el ruido de fondo, la calidad de la muestra y su duración,
además de que la voz no es tan única o permanente como otras
características, por lo que siempre es necesario considerar un margen de
error.

Por tanto, más que para control de acceso, esta técnica va más
encaminada a sistemas de respuesta por voz y centros de atención
telefónica.

Firma manuscrita dinámica
-------------------------

Analiza la firma manuscrita para confirmar la identidad del usuario. El
movimiento natural y la práctica a lo largo del tiempo realizando la
firm2a crea un patrón reconocible.

Dinámica de tecleo
------------------

Se basa en la existencia de un patrón de escritura en teclado que es
permanente y propio de cada individuo. Mide parámetros como la fuerza de
tecleo, la duración de la pulsación y el periodo de tiempo que pasa
entre que se presiona una tecla y otra.

No obstante, el patrón puede verse alterado por situaciones como el
estado físico o psíquico del usuario o la falta de costumbre de usar
teclado (evolución del patrón).

# Índice

- Biometría aplicada a la seguiridad - Introducción
- [Biometría aplicada a la seguiridad - Reconocimiento de patrones](/biometria-seguridad-patrones "Biometría aplicada a la seguiridad - Reconocimiento de patrones")
- [Biometría aplicada a la seguiridad - Sistemas biométricos](/sistemas-biometricos "Biometría aplicada a la seguiridad - Sistemas biométricos")

#### Referencias

- [M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la
seguridad](http://www.amazon.es/gp/product/8478976361/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=8478976361&linkCode;=as2&tag;=bmacoc-21 "M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la
seguridad")
- [C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition](http://www.amazon.es/gp/product/9814656526/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=9814656526&linkCode;=as2&tag;=bmab-21 "C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition")
- [Wikipedia, “Biometría, según wikipedia.”](https://es.wikipedia.org/wiki/
Biometr%C3%ADa "Wikipedia, “Biometría, según wikipedia.”")
- [G. Argentina, “Historia de la biometría.”](http://www.biometria.gov.ar/
acerca-de-la-biometria/historia-de-la-biometria.aspx "G. Argentina, “Historia de la biometría.”")
