---
author: luzila
categories:
- articulos
- seguridad
color: '#F57C00'
date: '2016-01-01'
description: "Loggearte en otro sitio con tu cuenta de Google, Twitter o Facebook
  no s\xF3lo es conveniente sino que adem\xE1s es m\xE1s segura que crear una nueva
  cuenta, o ingresar tu contrase\xF1a de Google, Twitter o Facebook en un sitio de
  terceros. Aqu\xED es donde OAuth entra en acci\xF3n. Veamos c\xF3mo funciona y c\xF3mo
  mantiene nuestras contrase\xF1as seguras en sitios de terceros."
lastmod: 2016-08-10

mainclass: articulos
url: /entendiendo-oauth-que-ocurre-cuando-te-loggeas-en-un-sitio-con-google-twitter-o-facebook/
aliases: /opensource/seguridad/entendiendo-oauth-que-ocurre-cuando-te-loggeas-en-un-sitio-con-google-twitter-o-facebook/
tags:
- aplicaciones web
- OAuth
- seguridad
title: "Entendiendo OAuth: Qu\xE9 ocurre cuando te loggeas en un sitio con Google,
  Twitter o Facebook"
---

Loggearte en otro sitio con tu cuenta de Google, Twitter o Facebook no sólo es conveniente sino que además es más segura que crear una nueva cuenta, o ingresar tu contraseña de Google, Twitter o Facebook en un sitio de terceros. Aquí es donde OAuth entra en acción. Veamos cómo funciona y cómo mantiene nuestras contraseñas seguras en sitios de terceros.

Hace poco, <a href="http://lifehacker.com/5917895/twitter-service-tweetgif-hacked-time-to-prune-your-twitter-apps" target="_blank"> una aplicación de Twitter llamada Tweetgif fue hackeada</a>, liberando informacion de usuario de 10000 cuentas de Twitter al público. De todas maneras, ninguna credencial de Twitter fue comprometida, dado que Tweetgif usó algo llamado OAuth. Si alguna vez te loggeaste en un sitio web de terceros con tu cuenta de Google, Facebook, o Twitter otorgándole permisos a la aplicación sobre esa cuenta, sin importar si lo sabías o no, has usado OAuth, y es una magnífica forma de entregar permisos.

<!--more--><!--ad-->



# Cómo funciona OAuth

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/06/medium1.jpg" alt="" title="medium" width="300px" height="166px"></amp-img>
</figure>

Digamos que quieres usar una aplicación como Tweetgif para postear divertidas imágenes GIF animadas en tu cuenta de Twitter. Para lograrlo, es necesario darle a Tweetgif acceso a tu cuenta de Twitter, para poder obtener tu info y postear tweets en tu nombre. En los viejos tiempos, tenías que darle a una aplicación como Tweetgif tu nombre de usuario y contraseña de Twitter, para que pueda loggearse y acceder a los servicios. No solo tenías que confiar que usen esas credenciales sabiamente, sino que también debías mantenerlas protegidas de los hackers - lo que era un verdadero gran salto de fe. Es como darle las llaves de tu casa a un extraño y confiar que no hará copias para todos sus amigos y luego robar todas tus cosas.

OAuth evita este problema simplemente dándoles acceso a las cosas que quieras que accedan. En lugar de pedirte la contraseña, sucede lo siguiente:

1. Para convertirse en una aplicación de Twitter, Tweetgif adquirió dos tokens del servicio de Twitter: una "Consumer Key" (Clave de Consumidor) y una "Consumer Secret" (Secreto de Consumidor). Estos son los elementos que crean una conexión entre el consumidor (en este caso, Tweetgif) y el proovedor del servicio (en este caso, Twitter).
2. Cuando quieres accedef a Twitter a traves de Tweetgif, éste te redirecciona a la portada de Twitter. Si no estás loggeado, te loggeas en ese momento (recuerda que le estás dando tu usuario y contraseña a Twitter, no a Tweetgif).
3. Twitter luego te pregunta si quieres autorizar esta aplicación, y te aclara qué permisos se le dará a la misma. Quizás pueda ver tu timeline, o tal vez pueda no sólo ver el timeline sino también postear en tu nombre. En algunos casos, puedes sólamente estar dándole acceso solamente a tu nombre de usuario y avatar para usar en sitios como Lifehacker - es simplemente una forma más fácil y segura de comentar sin tener que crear una cuenta. Cuando presionas el botón "Autorizar", se crea un "Access Token" (Vale para acceso) y un "Access Token Secret" (Vale para acceso secreto). Son como contraseñas, pero sólo permiten que Tweetgif acceda a tu cuenta y haga las cosas que le permitiste.

Por lo tanto, en lugar de darles la llave de toda tu casa, les estás dando una llave especial que sólo abre la única habitación que quieres que entren. Pero, para usar esta llave, tienen que pedírsela al guardia, y él puede negárselas cuando quiera.

# ¿Entonces deberías usar OAuth?

¿Por qué es mejor que simplemente ingresar las credenciales de Twitter? Obviamente, esto evita que las aplicaciones de terceros hagan cosas poco claras que no quieres que hagan, pero lo más importante es que esto significa que incluso si ellos son hackeados - como pasó con Tweetgif ayer - tu contraseña de Twitter está todavía a salvo. Los hackers tendrán la posibilidad de postear en tu nombre, seguir personas, o hacer cualquier cosa que le hayas permitido a Tweetgif, pero todo lo que necesitas hacer es ir a tu configuración de Twitter y quitarle el acceso a dicha aplicación. De este modo, tus tokens se vuelven inútiles y tu cuenta está bajo control nuevamente, sin siquiera tener que cambiar la contraseña.

La gran desventaja de esta innovación es que algunos sitios podrían dejar loggear usando Facebook o Twitter e intentarán postear en tu perfil, incluso si no es realmente *necesario*. Algunos sitios, como el reproductor de música <a href="http://turntable.fm/" target="_blank">Turntable.fm</a>, no te permiten crear una cuenta - debes loggearte con Facebook o Twitter. Es conveniente, dado que no tienes que crear una cuenta, pero luego éste intenta postear en tu perfil sobre qué estás haciendo en su sitio. De manera similar, <a href="http://waxy.org/2012/02/the_perpetual_invisible_window_into_your_gmail_inbox/" target="_blank">Google no te dice realmente qué permisos otorgas</a> cuando usas OAuth. Para evitar problemas, asegúrate de leer la política de privacidad de cada aplicación a la que te conectas, y si puedes, presta atención a los permisos que cada aplicación obtiene. Si detectas algo que no quieres que la aplicación haga, simplemente no la uses. O, como alternativa, fíjate si hay una opción para desactivar esta "característica" en la configuración de la aplicación (Turntable, por ejemplo, te permite desactivar los posteos en el muro de Facebook en su configuración luego de loggearte). Y, como siempre, asegúrate de regularmente reducir tus aplicaciones autorizadas así no te metes en problemas - si no has usado alguna por un tiempo, probablemente es mejor quitarla por completo.


Fuente: <a href="http://lifehacker.com/5918086/understanding-oauth-what-happens-when-you-log-into-a-site-with-google-twitter-or-facebook" target="_blank">lifehacker</a>
