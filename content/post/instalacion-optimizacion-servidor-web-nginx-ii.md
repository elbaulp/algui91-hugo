---
author: alex
categories:
- administracion de servidores
- linux
color: '#0097A7'
date: '2016-01-01'
description: "A lo largo de esta gu\xEDa se pretende mostrar c\xF3mo instalar desde
  cero un servidor web con Nginx, realizando las operaciones necesarias para lograr
  el mayor rendimiento y seguridad posibles con programas tales como php-fpm, APC,
  y el m\xF3dulo pagespeed de Google para optimizar los recursos web."
image: "Instalaci\xF3n-y-optimizaci\xF3n-de-un-servidor-web-con-Nginx1.png"
lastmod: 2015-12-28
layout: post.amp
mainclass: servidores
permalink: /instalacion-optimizacion-servidor-web-nginx-ii/
tags:
- "configuraci\xF3n php"
- instalar php-fpm
- nginx y php
title: "Instalaci\xF3n y optimizaci\xF3n de un servidor web con Nginx (II)"
---

# Tabla de contenidos

  * [Instalación y optimización de un servidor web con Nginx (I)][1]
  * Instalación y optimización de un servidor web con Nginx (II)
  * [Instalación y optimización de un servidor web con Nginx (III)][2]

Continuando con el artículo anterior, ahora procedemos a instalar PHP-FPM.

<!--more--><!--ad-->

## Instalar PHP-FPM

En lugar de instalar php5, instalaremos php5-fpm (FastCGI Process Manager), una implementación alternativa con algunas características adicionales. En Ubuntu se puede instalar desde repositorios, para debian los agregamos a mano al *sources.list*:

```bash
deb http://packages.dotdeb.org stable all
deb-src http://packages.dotdeb.org stable all

```

Es necesario agregar la [llave GnuPG][3], instalamos php5-fpm y lo iniciamos:

```bash
apt-get update
wget http://www.dotdeb.org/dotdeb.gpg
cat dotdeb.gpg | sudo apt-key add -
apt-get install php5-cli php5-suhosin php5-fpm php5-cgi php5-mysql
service php5-fpm start

```

Ahora probaremos que php funciona bajo nginx, para ello es necesario modificar ligeramente el archivo *nginx.conf*, concretamente:

* En el bloque *http* hay que añadir index.php a la directiva index, para que quede index *index.php index.html index.htm;*.
* Necesitamos crear la comunicación entre nginx y php mediante un socket, para ello añadimos lo siguiente en el bloque *http*.

```bash
upstream php {
    server unix://var/run/php-fpm.socket;
}
```

* Por último, dentro del bloque *server*, añadimos una regla que permita manejar los archivos php:

```bash
location ~ \.php$ {
    include fastcgi_params;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass php;
}
```

* Una última modificación al archivo */etc/php5/fpm/pool.d/www.conf* y agregamos la línea *listen = /var/run/php-fpm.socket*.

### Probando PHP

Para comprobar que PHP funciona crearemos un fichero simple que mostrará un mensaje, hemos de colocarlo en */usr/local/nginx/http/* y asignarle como grupo y usuario *www-data*:

```bash
echo '<?php echo "Probando que PHP funciona";??>' > /usr/local/nginx/html/index.php
chown www-data:www-data /usr/local/nginx/html/index.php
```

De nuevo nos dirigimos al *localhost* y deberíamos ver el mensaje, lo cual indica que se está ejecutando PHP.

# Tabla de contenidos

* [Instalación y optimización de un servidor web con Nginx (I)][1]
* Instalación y optimización de un servidor web con Nginx (II)
* [Instalación y optimización de un servidor web con Nginx (III)][2]

[1]: https://elbauldelprogramador.com/instalacion-optimizacion-servidor-web-nginx-i "Instalación y optimización de un servidor web con Nginx (I)"
[2]: https://elbauldelprogramador.com/instalacion-optimizacion-servidor-web-nginx-iii "Instalación y optimización de un servidor web con Nginx (III)"
[3]: https://elbauldelprogramador.com/editar-y-crear-archivos-cifrados-con-gpg-en-vim/ "Editar y crear archivos cifrados con GPG en Vim"