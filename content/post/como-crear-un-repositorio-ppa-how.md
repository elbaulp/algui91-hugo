---
author: alex
categories:
- how to
- linux
- opensource
color: '#F57C00'
date: '2016-12-12'
lastmod: 2016-08-16
layout: post.amp
mainclass: articulos
permalink: /como-crear-un-repositorio-ppa-how/
title: Como crear un PPA (Personal Package Archive)
---

Hace poco hablé de qué eran los [sistemas de paquetes PPA][1], para los interesados en crear uno, a continuación voy a explicar como hacerlo, es bastante sencillo.

<!--more--><!--ad-->

1. Antes de nada, debemos crear una cuenta en <a href="https://login.launchpad.net/+new_account" target="_blank">Launchpad</a>
2. Una vez creada, nos dirigimos al panel principal de nuestra cuenta, que será https://launchpad.net/~NOMBRE_USUARIO.
3. Ya en el panel de control, hay que hacer clic en &#8220;Create a new PPA&#8221;, que nos lleva a https://launchpad.net/~NOMBRE_USUARIO/+activate-ppa, en esta página rellenamos los datos de nuestro PPA y lo activamos.
4. Tras activar el PPA, es necesario subir paquetes al sistema, hay <a target="_blank" href="https://help.launchpad.net/Packaging/PPA/Uploading">varias formas de hacerlo</a>, pero la más sencilla es la siguiente:

### FTP en Ubuntu 9.10 y posteriores:

Visita la página de información general de tu PPA, y encontrarás algo similar a:

`dput ppa: your-lp-id/ppa<source.changes>`

El archivo source.changes suele ser generado por debuild. Si no estás seguro de lo que esto significa, puedes familiarizarte con la creacion de paquetes para ubuntu <a target="_blank" href="https://wiki.ubuntu.com/PackagingGuide">aquí</a>

Si no estais en ubuntu se puede subir por FTP:

En primer lugar, hay que decirle a dput dónde enviar su paquete y por qué método. Para ello, editamos el archivo *~/dput.cf* para que quede así:

```bash
[my-ppa]
fqdn = ppa.launchpad.net
method = ftp
incoming = ~<your_launchpad_id>/<ppa_name>/ubuntu/
login = anonymous
allow_unsigned_uploads = 0
```

También es necesario:

* Cambiar la primera línea al nombre que desea utilizar para referirse al PPA, manteniendo los corchetes. No se puede usar el nombre ppa, ya que puede haber conflictos con una linea en /etc/dput.cf y causar fallos como (&#8216;Could not find person or team named&#8217;.)
* Si estás subiendo el paquete a un equipo de PPA, hay que cambiar `<your-launchpad-id>` al nombre del equipo de Launchpad (Dejando la tilde (~)). Como es de esperar, debes ser miembro del equipo antes de poder subir el paquete a su PPA.
* Fijar correctamente el `<ppa-name>`, por defecto es ppa, usad el nombre específico para otros PPA en el mismo contexto. No confundais el nombre del PPA con el nombre que habeis elegido para para mostrar el PPA en Launchpad.
* A continuación, hay que abrir un terminal y escribir lo siguiente:

```bash
$  dput my-ppa P_V_source.changes
```

Remplazad P con el nombre del paquete y V con el número de la versión.

Podéis ver posibles errores en la subida de paquetes <a href="https://help.launchpad.net/Packaging/UploadErrors" target="_blank">aqui.</a>

 [1]: https://elbauldelprogramador.com/que-son-los-ppa-what-ppa-is/