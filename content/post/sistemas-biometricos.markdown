---
author: alex
categories:
- articulos
- seguridad
mainclass: seguridad
lastmod: 2017-10-08T19:17:05+01:00
date: 2017-09-09T20:24:52+01:00
description: "\xDAltimo artículo de la serie \u201CBiometría Aplicada a La Seguridad\u201D,  en el que se presentan distintas vulnerabilidades en los sistemas biométricos,  así como distintos tipos de ataques y contramedidas."
image: hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png
tags:
- biometria
title: "Biometría Aplicada a La Seguridad - Sistemas Biometricos"
---

<figure>
    <a href="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png"><img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png" title="Biometría Aplicada a La Seguridad - Sistemas Biometricos" alt="Biometría Aplicada a La Seguridad - Sistemas Biometricos" width="640px" height="405px" /></a>
    <figcaption>Crédito de la imagen: pixabay<a href="https://pixabay.com/en/biometrics-eye-security-154660/"></a></figcaption>
</figure>

> El siguiente artículo forma parte de un trabajo en grupo realizado para la asignatura _Seguridad en Sistemas Operativos_ de la facultad de Ingeniería Informática de Granada (ETSIIT). Los componentes del grupo fueron [@MPV_Prod](http://twitter.com/MPV_Prod) , [@_musicalnote](http://twitter.com/_musicalnote) y [@ElBaulP](http://twitter.com/elbaulp). Este artículo es autoría de @elbaulP.

# Índice

- [Biometría aplicada a la seguiridad - Introducción](/biometria-seguridad-introduccion "Biometría aplicada a la seguiridad - Introducción")
- [Biometría aplicada a la seguiridad - Reconocimiento de patrones](/biometria-seguridad-patrones "Biometría aplicada a la seguiridad - Reconocimiento de patrones")
- Biometría aplicada a la seguiridad - Sistemas biométricos

<!--more--><!--ad-->

Sistemas biométricos
====================

En los últimos años, se ha incrementado el uso de la biometría en la tecnología. De igual manera ha incrementado la preocupación sobre la seguridad y privacidad de los datos biométricos en sí. Ya que cada persona tiene una biometría única, como huella dactilar etc, si los datos biométricos fueran comprometidos sería imposible cambiarlos por otros, como se hace ahora con las contraseñas. Los datos biométricos (también llamados plantillas/templates) se convierten así en uno de los mayores problemas a la hora de desarrollar un sistema biométrico práctico. Aclaremos que, una plantilla biométrica hace referencia a las caracteristicas biométricas extraidas y almacenadas en una base de datos central o una tarjeta inteligente.

El hecho de que se plantee el proteger la plantilla biométrica se debe a que se ha demostrado que se pueden extrar los datos en crudo (raw) de las características biométricas a partir de dichas plantillas. Proteger la plantilla biométrica es por tanto un requisito indispensable del sistema.

Como norma general, se opta por no almacenar nunca la plantilla biométrica original. En lugar de ello, se almacena una plantilla transformada generada por un algoritmo de protección de plantillas.  Debido a que no existe un esquema de protección perfecto, la plantilla transformada debe ser diseñada para se *cancelable*, o revertida. De este modo, si la roban se puede generar una nueva e invalidar la anterior.

Vulnerabilidades de los sistemas biométricos de reconocimiento
--------------------------------------------------------------

# Ataques a sistemas Biométricos

Se pueden clasificar en tres categorías:

-   Administrativos: El ataque se realiza por gente de dentro (*insiders*), como administradores de sistemas, o alguien que amenaza a otra persona para que le de las credenciales de acceso.
-   Infraestructura no segura: El atacante fija como objetivo componentes vulnerables del sistema. Una vez dentro, puede modificar datos, robarlos etc.
-   *Biometric overtness*: En este tipo de ataque se crean biometrías artificiales para intentar engañar al sistema y ontener acceso. La generación de la biometría falsa está basada en la de algún usuario genuino del que se ha ido recabando información de forma secreta.  Por ejemplo recolectando muestras de sus huellas dactilares.

Ataques a plantillas
--------------------

Un tipo de ataque a plantillas es la falsificación de las mismas. En estos ataques, se roba una plantilla de referencia y se analizan sus caracteristicas. Tras ello, se crea una plantilla sintética.

Uno de estos ataques es el denominado ataque *hill-climbing*, propuesto por Soutar, el cual es una clara amenaza a la seguridad de las plantillas biométricas. El poder de este ataque reside en que no necesita la plantilla de referencia almacenada en la base de datos. En su lugar, actua como un ataque por fuerza bruta que prueba distintas plantillas una y otra vez. Difiere sin embargo, en su homologo por fuerza bruta, en que las plantillas no se generan aleatoriamente, si no ajustantose en función de la puntuación de acierto que tuvieron en intentos previos. Una vez propuesto este tipo de ataque, Alder lo puso en practica implementando un algoritmo para atacar sistemas biométricos faciales. En el algoritmo no se modifica la imagne pixel a pixel, se añade una constante *c* pequeña multiplicada por un *eigenface* (Los *eigenface* son un tipo de vectores propios usados en el reconocimiento
de caras, se podría decir que son “caras” estándares.), la constante va ajustandose para encontrar la puntuación de acierto mayor. A las Eigenfaces se las entrena con la base de datos de caras del atacante. Al terminar de ajustar, el sistema no solo reconocerá correctamente la cara generada, además guardará parecido similar a la cara de la víctima debido al entrenamiento de las Eigenfaces. Tras realizar varios experimentos, se mostró que con 4000 iteraciones la imagen generada acertaba en el 99.9% de los casos.

<figure>
    <a href="/img/Eigenfaces.png"><img sizes="(min-width: 357px) 357px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Eigenfaces.png" title="Eigenfaces" alt="Eigenfaces" width="357px" height="426px" /></a>
    <span class="image-credit">Crédito de la imagen: <a href="https://commons.wikimedia.org/wiki/File:Eigenfaces.png" target="_blank" title="">Wikipedia</a></span>
</figure>

Esquemas de protección de plantillas
------------------------------------

Actualmente existen tres esquemas para la protección de la plantilla:

-   El enfoque del criptosistema biométrico
-   El enfoque basado en transformación
-   El enfoque híbrido (combinación de los dos anteriores.)

Debido a los tipos de ataques existentes, es crucial proteger la información biométrica de un sistema. Para ello se establecen una serie de requerimientos que deben cumplir las plantillas de los enfoques anteriores:

-   Seguridad: La plantilla de características original nunca debe ser expuesta en el proceso de autentificación. Es necesario transformar la plantilla original de tal modo que no pueda recuperarse a partir de la generada (Similar a las funciones de un solo sentido).
-   Discriminabilidad: Aunque se transformen deben ser capaces de reconocer al inidividuo.
-   Capacidad de cancelación: Debido a que existe riesgo de que las plantillas se roben, debe ser posible que puedan ser canceladas y ser reemplazadas (revocabilidad).

De los tres enfoques propuestos, los dos primeros fallan al satisfacer algunos de los requeremientos anteriores, es por ello que pasaremos directamente a ver el enfoque híbrido, que combina las ventajas de los enfoques del criptositema y el basado en transformación.

En la Figura [fig:frame] se muestra un diagrama de un enfoque híbrido típico que combina los dos enfoques. La idea básica es que el método basado en transformación proporciona la cancelabilidad y el criptosistema la seguridad.

<figure>
    <a href="/img/two-steps-framework.png"><img sizes="(min-width: 989px) 989px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/two-steps-framework.png" title="Enfoque híbrido de un sistema biométrico" alt="Enfoque híbrido de un sistema biométrico" width="989px" height="392px" /></a>
</figure>
[fig:frame]

Conclusión
----------

A lo largo de este texto se han puesto de manifiesto las distintas propuestas existentes de sistemas biométricos, así como sus vulnerabilidades y los tipos de ataques. Para subsanar los problemas de seguridad se han propuesto esquemas híbridos que tratan de combinar las mejores características de sistemas basados en transformación y criptosistemas, este tipo de sistema es el más prometedor de todos.

Queda en evidencia que en este campo aún hay un gran terreno abierto para la investigación.

# Índice

- [Biometría aplicada a la seguiridad - Introducción](/biometria-seguridad-introduccion "Biometría aplicada a la seguiridad - Introducción")
- [Biometría aplicada a la seguiridad - Reconocimiento de patrones](/biometria-seguridad-patrones "Biometría aplicada a la seguiridad - Reconocimiento de patrones")
- Biometría aplicada a la seguiridad - Sistemas biométricos

# Referencias

- [M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la seguridad](http://www.amazon.es/gp/product/8478976361/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=8478976361&linkCode;=as2&tag;=bmacoc-21 "M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la seguridad")
- [C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition](http://www.amazon.es/gp/product/9814656526/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=9814656526&linkCode;=as2&tag;=bmab-21 "C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition")
- [Wikipedia, “Biometría, según wikipedia.”](https://es.wikipedia.org/wiki/ Biometr%C3%ADa "Wikipedia, “Biometría, según wikipedia.”")
- [G. Argentina, “Historia de la biometría.”](http://www.biometria.gov.ar/ acerca-de-la-biometria/historia-de-la-biometria.aspx "G. Argentina, “Historia de la biometría.”")
