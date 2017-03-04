+++
author = "colaboraciones"
date = "2017-01-27"
title = "TAILS LINUX y la importancia de la privacidad"
mainclass = "articulos"
image = "tchou-improved.png"
categories = ["articulos", "linux"]
tags = ["privacidad", "openpgp", "tor"]
description = "Decir que no te importa el derecho a la privacidad porque no tienes nada que esconder no se diferencia de decir que no te importa la libertad de expresión porque no tienes nada que decir. -- Edward Snowden"
+++

> Este artículo es una colaboración de _Paula de la Hoz ([@Terceranexus6](https://twitter.com/Terceranexus6)_. Su blog: [Oh My Bits](https://ohmybits.tumblr.com) & [Hamlet Again](https://medium.com/@HamletAgain)

# Contexto actual

Con el incipiente avance tecnológico, en nuestra sociedad cada vez se valora más la privacidad del usuario. Todo lo que hacemos, quiénes somos, qué nos gusta, es información que nos puede parecer irrelevante según para qué contextos. Sin embargo para las empresas, gobiernos y asociaciones, esa información es muy valiosa y puede incluso llegar a _limitarnos_.

> "_Decir que no te importa el derecho a la privacidad porque no tienes nada que esconder no se diferencia de decir que no te importa la libertad de expresión porque no tienes nada que decir._"
> --- **Edward Snowden**

<!--ad--><!--more-->

El ex-empleado de la NSA **_Edward Snowden_**, conocido por su implicación en wikileaks con filtraciones de información clasificada, ha abogado por la defensa de la privacidad y los derechos en internet a través de las redes, incluso desde su asilo político en Rusia. Esta controvertida figura, para mantener "_a salvo_" su privacidad utiliza, principalmente, un sistema operativo llamado **TAILS LINUX**.

# ¿Qué es Tails?

<figure>
    <amp-img  sizes="(min-width: 500px) 500px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/tchou-improved.png" alt="{{ .Title }}" title="{{ .Title}}" width="500" height="257"></amp-img>
</figure>


[TAILS](https://tails.boum.org/index.en.html) es un sistema operativo _live_, ¿ésto qué quiere decir? que podemos utilizarlo desde cualquier ordenador utilizando simplemente un pen drive. Es completamente gratuito, libre y está basado en Debian [GNU/Linux](https://elbauldelprogramador.com/categories/linux "Artículos sobre Linux"). Una de las características principales de TAILS, es que basa todas sus conexiones en **TOR**.

[TOR](/tags/tor) es un navegador que protege al usuario frente al análisis del tráfico de paquetes y la vigilancia masiva usando un sistema alternativo de nodos voluntarios y túneles virtuales, en lugar de hacer una conexión directa.

Además de [TOR](/tags/tor), TAILS permite utilizar I2P, y en la web oficial viene [documentado](https://tails.boum.org/doc/anonymous_internet/i2p/index.en.html) cómo utilizarlo. El sistema operativo, que ocupa en su totalidad _4 gigas_, viene con una serie de programas predeterminados relacionados con la privacidad, la ofimática y la mensajería. En un principio, el pen drive no guarda la información de una sesión a otra, pero [podemos configurarlo](https://tails.boum.org/install/clone/index.en.html) para utilizar la memoria sobrante del pen drive.

# Instalación y uso

Configurar un pen drive para instalar TAILS es bastante sencillo, especialmente porque [viene indicado paso a paso](https://tails.boum.org/install/os/index.en.html) en la página oficial. Además incluye especificaciones de instalación desde cualquier sistema operativo (Linux, Windows, MAC y otro TAILS). El proceso es básicamente bajarse la imagen desde TOR, preparar un pen drive de 4 o más gigas, e instalar la imagen en éste.

<figure>
    <amp-img  sizes="(min-width: 800px) 800px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/pasted-from-clipboard.png" alt="{{ .Title }}" title="{{ .Title }}" width="946" height="316"></amp-img>
</figure>

Para usar este sistema operativo, simplemente insertamos el pen drive en uno de los puertos de un ordenador apagado y lo encendemos. El ordenador tardará varios segundos en terminar de cargar la imagen, pero cuando lo haga tendremos acceso a nuestro escritorio desde el cual podremos navegar con tranquilidad. Una vez que apagamos el ordenador y retiramos el pen drive, **no queda rastro** de lo que hayamos hecho en el ordenador, ya que se sobrescribe la memoria.

Por muy seguro que pueda ser este sistema operativo y las herramientas que ofrece, en la propia página web indica que la mejor forma de protegerse es el _sentido común_ del usuario, tales como utilizar contraseñas fuertes y saber utilizar apropiadamente las herramientas que ofrece, comprendiendo las limitaciones.

# Programas y recursos

Algunas de las herramientas más interesantes con las que viene Tails son las siguientes:

- [LUKS](https://guardianproject.info/code/luks/) (Linux Unified Key Setup), que te permite encriptar pen drives y discos externos.
- [HTTPS Everywhere](https://www.eff.org/https-everywhere) es una extensión desarrollada por la [EFF](eff.org) para encriptar todas las conexiones usando https.
- [OpenPGP](http://openpgp.org/) [para encriptar y firmar documentos y correos](https://elbauldelprogramador.com/editar-y-crear-archivos-cifrados-con-gpg-en-vim/ "Editar y crear archivos cifrados con GPG en Vim").
- [OTR](https://otr.cypherpunks.ca/), para proteger mensajería instantánea.
- [Nautilus Wipe](http://wipetools.tuxfamily.org/nautilus-wipe.html) para borrar archivos con seguridad.

# ¿Confías plenamente en TAILS? ellos esperan que no

Una de los problemas fundamentales de la sociedad actual en términos de informática es el desinterés del usuario medio por su privacidad y seguridad. Y esta concienciación empieza precisamente con la duda. Sean cuales sean nuestros motivos para confiar en un sistema operativo, programa o aplicación, deben haber pasado un filtro de duda y escepticismo, y eso mismo [nos sugieren](https://tails.boum.org/doc/about/trust/index.en.html) en la página de TAILS.

Las herramientas que ofrecen no sólo tienen un objetivo técnico si no que se esfuerzan en ofrecerte una nueva visión y un cambio en la forma en que sus usuarios usan la tecnología y su información. El uso de este sistema debe ir acompasando al interés por nuestra privacidad, y a la curiosidad por saber qué se hace con nuestra información.

Para ello ofrecen una serie de razones por las cuales puede decirse que abogan por estas cualidades. Basa su justificación en el uso de software libre bien documentado, TOR, y el hecho de utilizar Debian GNU/Linux, que aunque ha tenido bugs importantes como [SSH PRNG](https://lists.debian.org/debian-security-announce/2008/msg00152.html) no se han encontrado vulnerabilidades de seguridad hasta la fecha, lo que lo convierte en un buen candidato para este sistema.

# Rompiendo barreras

Es de saber que las distintas distribuciones de linux tienen cierta fama entre los programadores e informáticos de todo el mundo. Debido a la amplia oferta de sistemas operativos disponibles, hay algunas más o menos amigables para un usuario medio. TAILS pretende ser accesible y manejable para cualquiera, tenga o no una base sólida en el uso de programación, linux y Bash. Para ello ofrece una interfaz gráfica intuitiva y una instalación simple.

El uso de este sistema puede tener muchas aplicaciones en nuestro día a día, y es completamente legal. No necesitamos ser Edward Snowden para **necesitar o querer** privacidad, por ejemplo, a la hora de consultar nuestro correo en un ordenador público. La idea de este sistema es liberarnos de la obligación de "_confiar_" en un ordenador público, o de algún amigo.

Esta idea puede que nos resulte difícil de agregar a nuestra rutina, pero sin duda se debería hacerse una pequeña reflexión sobre ello. El ritmo de nuestra sociedad ha cambiado con rapidez en pocos años, y dependemos en nuestra vida privada y trabajo (con frecuencia) de programas y aplicaciones que manejan gran cantidad de información privada. Esta rapidez ha hecho que el usuario medio se acostumbre a la comodidad de estas herramientas, pero se olvide con frecuencia de proteger sus datos a la hora de utilizarla, muchas veces por la gran cantidad de trabas y dificultades para ello.
