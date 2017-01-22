---
author: alex
categories:
- articulos
- seguridad
color: '#F57C00'
date: '2016-12-12'
description: "El mundo digital es un vecindario muy peligroso lleno de atacantes listos
  para robar los datos m\xE1s personales e importantes para los negocios. A estas
  alturas deber\xEDamos saber que la \u201Dseguridad\u201D significa algo m\xE1s que
  disponer de una contrase\xF1a \xFAnica y larga. Para entender c\xF3mo proteger nuestros
  datos y cuentas, en duosecurity han hecho una recopilaci\xF3n de las formas m\xE1s
  comunes que usan los atacantes para robar datos ajenos en la red."
image: 2013/06/blog_sevenways.png
lastmod: 2015-12-18
layout: post.amp
mainclass: articulos
permalink: /6-formas-usadas-por-los-cibercriminales-para-robar-o-vulnerar-credenciales-de-login/
tags:
- articulos sobre cibercrimen
- "autentificaci\xF3n de dos factores"
- Brechas en sitios Webs
- Configuraciones de software incorrectas
- Estafas de Phishing
- malware
- robo de credenciales
- saltar autentificacion de dos factores
- Vulnerabilidades en las aplicaciones
title: 6 formas usadas por los cibercriminales para robar o vulnerar credenciales
  de login
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/06/blog_sevenways.png" alt="7 formas usadas por cibercriminales para robar o vulnerar credenciales de login" width="700px" height="350px" />

El mundo digital es un vecindario muy peligroso lleno de atacantes listos para robar los datos más personales e importantes para los negocios. A estas alturas deberíamos saber que la ”*[seguridad][1]*” significa algo más que disponer de una contraseña única y larga. Para entender cómo proteger nuestros datos y cuentas, en *duosecurity* han hecho una recopilación de las formas más comunes que usan los atacantes para robar datos ajenos en la red.

<!--more--><!--ad-->

### 1: Malware

El **malware** representa un conjunto de amenazas a un sistema, como **spyware, keyloggers y troyanos**. Con este tipo de software maligno, las contraseñas son un objetivo muy valioso para los atacantes que infectan el sistema. Si piensas que el robo de contraseñas usando **malware** es complicado, quizá te sorprenda saber que existen unos kits de malware llamados **<a href="http://blog.webroot.com/2013/01/30/a-peek-inside-a-diy-password-stealing-malware/" target="_blank">DIY</a>**(Do it yourself) diseñados específicamente para tal fin. Además, los troyanos se están centrando en robar datos críticos como los datos de acceso a bancos con una variante a **<a href="http://en.wikipedia.org/wiki/Zeus_(Trojan_horse)" target="_blank">Zeus</a>** llamada **<a href="http://gcn.com/articles/2012/01/10/zeus-trojan-returns-steals-bank-account-info-fbi-warns.aspx" target="_blank">Gameover</a>**.

### 2: Brechas en sitios Webs

Confiamos una gran cantidad de datos sensibles a sitios webs de todo tipo, y los agujeros de seguridad son bastante más frecuentes de lo que pensamos. A través de varios métodos, como [inyección SQL][2], subida remota de archivos o un simple ataque a fuerza bruta para romper credenciales de los usuarios las webs están contínuamente siendo atacadas. Cualquiera que tenga un servidor propio sabrá lo cierto que es esto. Una vez que se logra robar una [contraseña][3], la información filtrada a menudo acaba en lugares como *pastebin* y redes *bittorrent*, esperando a ser usadas. Si además se usa la misma contraseña en todas las webs el daño puede ser enorme.

### 3: Configuraciones de software incorrectas

Si alguna vez has configurado un software destinado al entorno empresarial, seguramente sabrás que seleccionar por error (o no seleccionar) una casilla o cualquier configuración sensible puede marcar la diferencia entre estar seguro o ser un blanco fácil. Éstas configuraciones incorrectas que conducen a las brechas en la seguridad son bastante comunes. La complejidad de la seguridad frecuentemente da lugar a descuidos menores que se convierten en graves problemas.

### 4: Vulnerabilidades en las aplicaciones

El código fuente siempre tendrá bugs. Mientras sigamos desarrollando mayores y más complejas aplicaciones, la probabilidad de que aumenten los problemas de seguridad del código es casi una certeza. En error en la comprobación de un trozo de código puede fácilmente desenbocar en un problema muy grave, como <a href="http://www.enterprisenetworkingplanet.com/netsecur/article.php/3916331/Watch-for-Authentication-Bypass-Vulnerabilities.htm" target="_blank">saltarse la autentificación</a>. Por tanto, un fallo de seguridad en un trozo de código podría dar por válido a un usuario incorrecto o permitir al atacante saltarse la autentificación por completo.

### 5: Estafas de Phishing

El phishing es una forma de enviar correspondencia (como el email) que engaña a la víctima para hacerle clickar en un enlace hacia un formulario de apariencia normal pero fraudulento, haciendose pasar por un formulario legítimo, como el de nuestro banco. Al rellenar el formulario creyendo que es legítimo, en realidad se están enviando esos datos a los cibercriminales.

### 6: Control de Acceso

Lo último que una empresa desea es aparecer en una lista de las <a href="http://www.darkreading.com/database/5-big-database-breaches-of-spring-2013/240155864" target="_blank">mayores brechas de seguridad</a>. Tratar de controlar el acceso a datos (o credenciales) puede ser todo un reto. Sin un sólido control de acceso, una brecha puede ocurrir rápidamente al olvidar cambiar una contraseña o al no restringir desde donde puede un usuario loggearse. Muchas organizaciones fallan a la hora de limitar los privilegios de sus empleados, no disponen de métodos de autentificación lo suficientemente robustos o, en algunos casos, simplemente no protegen los datos y recursos críticos. Sin centrarse en cómo fluyen los datos de una empresa a otra, y quién puede acceder a ellos en cada momento, la información puede terminar rápidamente en manos de un atacante.

### Conclusión

Como hemos ido viendo a lo largo del artículo, hay muchas formas en las que un atacante puede hacerse con nuestros datos, está claro que con una contraseña no estamos protegidos, así que lo recomendable es usar, siempre que se pueda, otra capa de seguridad como la [autentificación de dos factores][4]. Además, para generar contraseñas bastante fuertes es posible usar webs como <a href="http://passwordsgenerator.net/" target="_blank">passwordsgenerator.net</a>. El problema de este tipo de contraseñas es que son imposibles de recordar. Una solución es guardarlas en un fichero de texto y encriptarlas con <a href="/editar-y-crear-archivos-cifrados-con-gpg-en-vim/" title="Editar y crear archivos cifrados con GPG en Vim" target="_blank">GPG</a>.

#### Referencias

*blog.duosecurity.com* »» <a href="https://blog.duosecurity.com/2013/06/7-ways-cybercriminals-steal-or-defeat-login-credentials-2/" target="_blank">7 Ways Cybercriminals Steal or Defeat Login Credentials</a>



 [1]: https://elbauldelprogramador.com/seguridad/
 [2]: https://elbauldelprogramador.com/introduccion-sql-sql-introduction/
 [3]: https://elbauldelprogramador.com/como-se-almacenan-tus-contrasenas-en-internet-y-cuando-la-longitud-de-la-misma-no-importa/ "Cómo se almacenan tus contraseñas en internet (y cuando la longitud de la misma no importa)"
 [4]: https://elbauldelprogramador.com/todos-los-lugares-donde-deberias-habilitar-autenticacion-de-dos-factores-ahora-mismo/ "Todos los lugares donde deberías habilitar la Autenticación de Dos Factores ahora mismo"