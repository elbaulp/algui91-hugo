---
author: luzila
categories:
- articulos
color: '#F57C00'
date: '2016-01-01'
lastmod: 2016-08-15
layout: post.amp
mainclass: articulos
url: /por-que-la-autentificacion-de-2-factores-depende-de-la-experiencia-del-usuario/
tags:
- "problemas autentificaci\xF3n de 2 factores"
- "que es autentificaci\xF3n de 2 factores"
- "usuarios autentificaci\xF3n de 2 factores"
title: "Por qu\xE9 la autentificaci\xF3n de 2 factores depende de la experiencia del
  usuario"
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/08/2-factor-authentication1.jpg" alt="Por qué la autentificación de 2 factores depende de la experiencia del usuario" width="700px" height="349px"></amp-img>
</figure>

Ya vimos en hace algún tiempo [todos los lugares en los que deberías habilitar la autentificación de 2 factores][1]. Hoy, en este artículo original de Duo Security analizaremos los problemas que puede ocasionar esta tecnología en el usuario final.

<!--more--><!--ad-->



Con el reciente paso de Twitter a la criptografía de clave pública con &#8220;*push*&#8220;, nosotros y muchos otros nos alegramos de verlos abandonar el sistema de autenticación de 2 factores SMS-only. No solo agregaron mejor seguridad, sino que también brindaron a sus usuarios una experiencia más atractiva. Como las distintas alternativas de *2 factores* entre proveedores de servicios y plataformas continúan creciendo y cambiando, es importante que la industria se mantenga enfocada en los objetivos correctos para adoptar el sistema *2 Factores*. Sin un enfoque diferenciado en cómo los usuarios experimentan la autenticación de 2 factores, la industria podría forzarse a una batalla innecesaria entre riesgo y conveniencia que podría terminar en un futuro negativo para esta tecnología - no por razones técnicas como por estéticas.

### El usuario final determina el éxito de cualquier tecnología nueva

De todos los controles de seguridad que dependen de la aceptación del usuario final, las decisiones respecto a cómo una tecnología es implementada deberían considerar un rango extenso de potenciales errores de usuario. Cuando construyes seguridad para usuarios finales, pero ignoras las necesidades fundamentales, tu implementación será más costosa para tu potencial usuario base. Es más, dado que el usuario promedio es lento en olvidar malas experiencias, desarrollarán un prejuicio contra la autentificación de *2 Factores* en general.

Tomemos por ejemplo el software de criptografía [PGP][2]. La mayoría de nosotros luchará por recordar cuándo fue la útima vez que realmente usó <a href="https://es.wikipedia.org/wiki/PGP" title="Definición de PGP en Wikipedia" target="_blank">PGP</a>. Luego, consideremos qué tan poco frecuente usamos PGP para manejar un problema de encriptado de archivos. PGP no es un mal software porque sea inseguro o no funcione, **es malo porque nadie realmente solucionó los problemas de aceptación del usuario final a tiempo para que sea ampliamente adoptado.**

Para los usuarios que necesitaron PGP, la idea de servidores de claves, keyrings, huellas digitales, y el resto de los matices de PGP que solo un profesional de la seguridad podría apreciar descartando la viabilidad del software. Donde algunos softwares (especialmente los relacionados con [seguridad][3]) fallan porque no cubren los requerimientos tecnológicos, PGP falla en ser adoptado ampliamente porque sus desarrolladores nunca respondieron a la pregunta &#8220;¿Cómo podemos hacerlo viable para el usuario diario?&#8221;.

### Con la Autentificación de 2 Factores, Todas las rutas deben *llevar a buen puerto*

Twitter y muchas otras organizaciones ahora se encuentran luchando por unir las necesidades de seguridad junto con los deseos del usuario final con autenticación de 2 Factores. Desafortunadamente no muchas de ellas están teniendo en cuenta qué tan rápido mejora este proceso antes de que el usuario final quede impresionado con la 2FA. Dado que las organizaciones quieren facilitar cierto sentido de autenticación fuerte, integran el nivel mínimo de 2 factores requerido para tacharlo de su lista de cosas pendientes por hacer. Este alcance suele resultar en una experiencia pobre para el usuario, el cual acumula prejuicios contra la autenticación de 2 factores en general.

La falla más obvia en la práctica es la idea de que los usuarios deberían estar atados a un dispositivo. Esto es de alguna forma irónico, considerando una de las principales quejas sobre la primera generación de la autenticación de 2 factores es que tienes que recordar tomar un solo token contigo todo el tiempo. Esto fue una queja, de hecho, algunas personas debieron incluso configurar una cámara web apuntando a su token para que de esa forma pudieran accederlo sin tener que recordar el dispositivo cada vez que se van de su casa. ¿Por qué entonces muchas soluciones de la segunda generación de la autenticación de 2 factores repiten esta mala práctica?

Si un usuario no puede identificarse en un servicio o sistema ellos se preocupan sobre porqué debido a una restricción con la plataforma de 2 Factores puedes apostar que te desactivarán la autenticación de 2 factores tan pronto como puedan. La conveniencia versus la ecuación de compensación de riesgo cambia dramáticamente cuando no permites que un usuario final haga lo que quiera. Los usuarios continuarán olvidando su teléfono, o no tendrán señal, o plan de datos, o perderán el token, o tendrán la linea no disponible. No darle lugar a estas cuestiones de la realidad crea críticas más que fans. La seguridad de la información ya tiene muchas críticas - necesitamos muchos, muchos más fans.

### Cuando la primera impresión cuenta

Ofrecer a los usuarios demasiadas opciones para configurar la autentificación de 2 factores, la &#8220;culpa&#8221; vuelve al individuo si su experiencia es pobre. Las plataformas y servicios deberían ofrecer a sus usuarios la capacidad de determinar lo que tomará para 2 autenticación de factor para aumentar la seguridad(el valor) sin impedir su vida.

Si alguien quiere actuar recíprocamente con Facebook, Gorjeo, GMail, o un juego del ordenador, cuando ellos quieren usar algo, ellos quieren usarlo. Si los proveedores de servicio grandes y plataformas que ofrecen 2 autenticación de factor siguen forzando a usar otro dispositivo o requieren el envío de un mensaje de texto, la batalla por la amplia adopción de 2 factor será mucho más difícil de lo que tiene que ser - un enorme impacto negativo para la seguridad de la información en su conjunto.

La oportunidad de resolver muchos de los problemas de seguridad con una autentificación fuerte es demasiado beneficiosa para perderla. Es de una importancia crítica que cuando un servicio o plataforma ofrece autentificación de 2 factores proporcionen a sus usuarios una experiencia positiva y no con un simple *checkbox*. Los *checkboxs* seguirán liderando la falla de la seguridad de los métodos de autentifiación que usen una sola contraseña.

### Referencias

- *Duo Security* »» <a href="https://blog.duosecurity.com/2013/08/why-2-factor-authentication-hinges-on-the-user-experience/" target="_blank">Why 2 Factor Authentication Hinges on the User Experience</a>

 [1]: https://elbauldelprogramador.com/todos-los-lugares-donde-deberias-habilitar-autenticacion-de-dos-factores-ahora-mismo/ "Todos los lugares donde deberías habilitar la Autentificación de Dos Factores ahora mismo"
 [2]: https://elbauldelprogramador.com/editar-y-crear-archivos-cifrados-con-gpg-en-vim/ "Editar y crear archivos cifrados con GPG en Vim"
 [3]: https://elbauldelprogramador.com/security-now/ "Categoría Seguridad"
