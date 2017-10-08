---
author: alex
categories:
- articulos
- seguridad
mainclass: seguridad
date: '2016-01-01'
lastmod: 2017-10-08T19:11:00+01:00
url: /saltarse-la-autentificacion-de-dos-factores-de-google/
tags:
- "autentificación de dos factores"
title: "Saltarse la autentificación de dos factores de Google"
---

***Dou Security*** encontró un agujero de seguridad del sistema de autentificación de Google que permitía ganar control total sobre la [autentificación de dos factores de Google][1] y controlar las cuentas de Gmail haciendo uso de la única contraseña usada para conectarse a aplicaciones individuales de google.

<figure>
    <amp-img sizes="(min-width: 460px) 460px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/Bypassing-Google-Two-Factor-Authentication.jpg" alt="Bypassing Google Two Factor Authentication" width="460px" height="349px" />
</figure>

<!--more--><!--ad-->

La vulnerabilidad está en la implementación del mecanismo de auto-login en la ultima versión del navegador Chrome para Android. Dicha vulnerabilidad permitión a Duo Security usar un ASP (Application-Specific-Password) para ganar acceso al panel de recuperación de cuentas de Google y gestionar la configuración de la autentificación de dos factores.

El auto-login permite a los usuarios que han enlazado sus dispositivos móviles o ChromeBooks a su cuenta de Google acceder automáticamente a todas las páginas que tienen que ver con aplicaciones de Google sin necesidad de insertar los datos de login.

<figure>
    <amp-img sizes="(min-width: 300px) 300px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/android_autologin.png" alt="android_autologin" width="300px" height="500px" />
</figure>

Duo Security dijo en <a href="https://blog.duosecurity.com/2013/02/bypassing-googles-two-factor-authentication/" target="_blank">su blog</a>:

> *
> “Normalmente, una vez activada la autentificación en dos factores, Google te pide que crees contraseñas específicas para cada aplicación que uses. Lo cual quiere decir que dichas aplicaciones no soportan el login usando la autentificación en dos pasos.”*
>
> *“Luego, se usa un ASP en lugar de tu contraseña real. En términos más concretos, Se crean ASPs para la mayoría de aplicaciones cliente que no usan un login basado en Web: clientes email que usen IMAP y SMTP (Mail de Apple, Thunderbird etc); clientes de chat con comunicaciones mediante XMPP (Adium, pidgin etc) y aplicaciones de calendarios que se sincronizan usando CaIDAV (iCal, etc)”*

<figure>
    <amp-img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/gauth_break_sm1.png" alt="gauth_break_sm1" width="640px" height="393px" />
</figure>

Las ASPs son Tokens especializados generados para cada aplicación que el usuario usa en lugar de la combinación contraseña/token. Duo Security descubrió que los ASPs en ralidad no eran específicos para aplicaciones, de hecho, un único código podría usarse para loggearse en casi cualquier aplicación Web de Google debido a la característica del auto-login.

> *“En definitiva, usando solamente un nombre de usuario, un ASP y una simple petición a https://android.clients.google.com/auth, es posible acceder a cualquier aplicación web de Google sin necesidad de que se nos soliciten datos de login (o verificación en dos pasos)”*

Los investigadores comunicaron la vulnerabilidad a Google y el problema ya ha sido arreglado.

# Fuente

- *Bypassing Google’s Two-Factor Authentication* »» <a href="http://thehackernews.com/2013/02/bypassing-google-two-factor.html" target="_blank">thehackernews.com</a>

 [1]: https://elbauldelprogramador.com/todos-los-lugares-donde-deberias-habilitar-autenticacion-de-dos-factores-ahora-mismo/ "Todos los lugares donde deberías habilitar la Autenticación de Dos Factores ahora mismo"
