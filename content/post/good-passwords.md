+++
image = "haystackpassword.png"
mainclass = "seguridad"
author = "alex"
description = "Buenas prácticas para crear y administrar tus contraseñas y cómo fortalecer tu presencia online"
date = "2017-07-27T12:21:26+01:00"
title = "Crear y administrar contraseñas inteligentemente"
tags = ["seguridad", "contraseñas"]
categories = ["seguridad"]
+++

# CHANGELOG

> 27.07.2017: **Añado** *Passwords Evolved: Authentication Guidance for the Modern Era* a enlaces de interés.

# Introducción

Recientemente hemos visto mucho revuelo en [seguridad](https://elbauldelprogramador.com/categories/seguridad "Posts sobre seguridad") con el **RansomWare WannaCry** y el robo de más de **230 millones de contraseñás y cuentas**. En estos tiempos más que nunca es necesario tener **buenos hábitos al crear contraseñas al darnos de alta en nuevos servicios**. En este artículo mencionaré algunas buenas prácticas que llevo llevando a cabo desde hace unos años.

# Crea Buenas Contrasenas

El primer paso es *crear una [contraseña](https://elbauldelprogramador.com/como-se-almacenan-tus-contrasenas-en-internet-y-cuando-la-longitud-de-la-misma-no-importa/ "Cómo se almacenan tus contraseñas en internet y cuando la longitud de la misma no importa") fuerte y aleatoria*. Hay muchas webs que se dedican a generar este tipo de contraseñas, por ejemplo la web de <a href="https://www.grc.com/passwords.htm" target="_blank" title="Perfect Passwords">Steve Gibson</a>  o la herramienta incorporada a tal fin en **LastPass**.

Por ejemplo, para cada nueva cuenta que crees en cualquier servicio, genera una contraseña de gran longitud con caracteres, números y símbolos. Una buena elección son contraseñas **de 50 caracteres o más**, abajo muestro un ejemplo de la herramienta integrada en **LastPass**.

<figure>
        <a href="/img/lastpassgenerator.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/lastpassgenerator.png"
            alt="LastPass password generator"
            title="LastPass password generator"
            sizes="(min-width: 420px) 420px, 100vw"
            width="420"
            height="521">
          </amp-img>
        </a>
        <figcaption>LastPass password generator</figcaption>
</figure>

Si no quieres usar **LastPass** puedes usar el **generador de Steve**

<figure>
        <a href="/img/steveperfectpasswords.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/steveperfectpasswords.png"
            srcset="/img/steveperfectpasswords.png 1000w, /img/steveperfectpasswords-800.png 800w"
            alt="Steve's Perfect Passwords"
            title="Steve's Perfect Passwords"
            sizes="(min-width: 1152px) 1152px, 100vw"
            width="1152"
            height="277">
          </amp-img>
        </a>
        <figcaption>Steve's Perfect Passwords</figcaption>
</figure>

<!--more--><!--ad-->

Veamos cuanto **tiempo se tardaría en descifrar una contraseña** de estas características, por ejemplo esta de tamaño 50: 8e8f6$AB9^YgOJ4x$JqHknK*FXp*uru2qyU3KXydaK*lJncQrE:

<figure>
        <a href="/img/howsecure.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/howsecure.png"
            alt="How long would it take to crack the password?"
            title="How long would it take to crack the password?"
            sizes="(min-width: 803px) 803px, 100vw"
            width="803"
            height="227">
          </amp-img>
        </a>
        <figcaption>How long would it take to crack the password? | source: <a href="https://howsecureismypassword.net/" target="_blank" title="howsecure">howsecureismypassword.net</a></figcaption>
</figure>

en la web de **Steve Gibson** vemos:

<figure>
        <a href="/img/haystackpassword.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/haystackpassword.png"
            alt="GRC's Interactive Brute Force Password “Search Space” Calculator"
            title="GRC's Interactive Brute Force Password “Search Space” Calculator"
            sizes="(min-width: 842px) 842px, 100vw"
            width="842"
            height="753">
          </amp-img>
        </a>
        <figcaption>GRC's Interactive Brute Force Password “Search Space” Calculator | source: <a href="https://www.grc.com/haystack.htm" target="_blank" title="haystack">grc.com/haystack.htm</a></figcaption>
</figure>

# Usa un Administrador de Contraseñas

Está claro que usando este tipo de contraseñas **es imposible memorizarlas**, eso es signo de una buena contraseña.

Para poder administrar tales contraseñas deberías usar un **administrador de contraseñas**, yo uso **LastPass**, ya que han demostrado que saben tomarse la seguridad en serio. Baso esta opinión en el conocimiento de Steve Gibson en seguridad, si quieres comprobarlo por tí mismo aquí hay unos cuantos recursos: <a href="https://www.youtube.com/watch?v=z4-h5gWpvAc" target="_blank" title="I">I</a>, <a href="https://blog.lastpass.com/2010/07/lastpass-gets-green-light-from-security.html/" target="_blank" title="II">II</a>.

Incluso si estás usando LastPass para generar y almacenar las contraseñas de forma segura, aún podemos añadir una capa extra de seguridad: **“Usar LastPass inteligentemente”**, veamos lo que quiero decir con esto en la siguiente sección.

## Buenas Prácticas usando un Administrador de Contraseñas

La posibilidad de que alguien te ataque y te robe todos los datos de **LastPAss** aún existen, aunque toda la información se guarda cifrada. Supongamos que alguien consigue nuestros datos de LastPass, y pongámonos en el **peor de los casos, la consiguen descifrada**. Si en lugar de almacenar toda la contraseña en *LastPass*, almacenamos solo la **parte que no podemos memorizar** aún estaremos a salvo, veamos un ejemplo:

Cuando generas la contraseña, la almacenas en el gestor de contraseñas, pero en el servicio en el que te estás dando de alta, supongamos Google, estableces la siguiente contraseña:

_8e8f6$AB9^YgOJ4x$JqHknK*FXp*uru2qyU3KXydaK*lJncQrE_**UnaContraseñaQuePuedesMemorizar**

De este modo, incluso aunque roben todos los datos de LastPass, el ladrón no será capaz de acceder a tu cuenta, ya que **solo conoce parte de tu contraseña**.

# Fortaleciendo tu presencia Online

Cada vez más servicios ofrecen [autentificacion en dos factores](https://elbauldelprogramador.com/todos-los-lugares-donde-deberias-habilitar-autenticacion-de-dos-factores-ahora-mismo/ "Todos los lugares donde deberías habilitar la Autenticación de Dos Factores ahora mismo"), deberías habilitarla.

## TFA

Cuando activas la **autentificacion en dos factores**, se te muestran los códigos de respaldo en caso de que pierdas tu teléfono o no puedas generar un código para la autentificacion.

## Protegiendo los códigos de respaldo de tu TFA

Es importante que descarues y guardes estos códigos en un lugar seguro. La mejor idea es imprimirlos en papel y guardarlos en una caja del banco. Pero para la mayoría de gente basta con guardarlos en un disco duro externo o imprimirlos.

Eso es todo, creo que aplicando estos consejos estarás más protegido que la mayoría de gente, pero recuerda que nada es seguro al 100%.

*¿Qué tipo de consejos o mejores prácticas usas tú?, deja un comentario!*

# Enlaces de interés

- <a href="https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/" target="_blank" title="Passwords Evolved: Authentication Guidance for the Modern Era">Passwords Evolved: Authentication Guidance for the Modern Era</a>
