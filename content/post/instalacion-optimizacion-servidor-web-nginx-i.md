---
author: alex
categories:
- servidores
- linux
mainclass: servidores
date: '2016-01-01'
lastmod: 2017-10-05T12:25:16+01:00
description: "A lo largo de esta guía se pretende mostrar cómo instalar desde  cero un servidor web con Nginx, realizando las operaciones necesarias para lograr  el mayor rendimiento y seguridad posibles con programas tales como php-fpm, APC,  y el módulo pagespeed de Google para optimizar los recursos web."
image: "Instalación-y-optimización-de-un-servidor-web-con-Nginx1.png"
url: /instalacion-optimizacion-servidor-web-nginx-i/
tags:
- nginx
title: "Instalación y optimización de un servidor web con Nginx (I)"
---

> La siguiente serie de artículos son el fruto de un trabajo realizado para la facultad en la asignatura Ingeniería de Servidores de la Universidad de Granada (ETSIIT [Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación] )

_A lo largo de esta guía se pretende mostrar cómo instalar desde cero un servidor web con Nginx, realizando las operaciones necesarias para lograr el mayor rendimiento y seguridad posibles con programas tales como php-fpm, APC, y el módulo pagespeed de Google para optimizar los recursos web._

# Tabla de contenidos

* Instalación y optimización de un servidor web con Nginx (I)
* [Instalación y optimización de un servidor web con Nginx (II)][1]
* [Instalación y optimización de un servidor web con Nginx (III)][2]

Hace tiempo se vío en este blog [cómo instalar y configurar Nginx con php5-fpm][3], en los próximos artículos se intentará explicar de forma más detallada cómo llevar a cabo éste proceso junto con algunas mejoras adicionales en términos de optimización. Es necesario informar al lector que todas las recomendaciones aquí explicadas se basan únicamente en la experiencias del autor.

<!--more--><!--ad-->

## Compilar e instalar Nginx

### Preparando el entorno

Lo primero que debemos hacer es instalar las dependencias necesarias para la compilación, para ello:

```bash
apt-get install build-essential libssl-dev libpcre3-dev

```

Tras esto descargamos la última versión de nginx, al momento de escribir este texto la 1.4.4:

```bash
wget http://nginx.org/download/nginx-1.4.4.tar.gz

```

Descomprimimos el archivo:

```bash
tar xzvf nginx-1.4.4.tar.gz

```

Antes de compilar cambiaremos un valor en el código fuente como medida de seguridad por ocultación. El valor a cambiar es la cadena asignada a la cabecera que indica el servidor usado en las peticiones HTTP. En concreto el archivo a cambiar es el alojado en `src/http/ngx_http_header_filter_module.c`, concretamente en la línea 48:

```c
static char ngx_http_server_string[] = "Server: nginx" CRLF;
static char ngx_http_server_full_string[] = "Server: " NGINX_VER CRLF;

```

Cambiamos estas dos líneas a algo del estilo:

```c
static char ngx_http_server_string[] = "Server: Mi servidor Web" CRLF;
static char ngx_http_server_full_string[] = "Server: Mi servidor Web" CRLF;

```

Ya solo queda compilarlo e instalarlo, de momento necesitaremos los módulos siguientes:

```bash
--with-http_gzip_static_module --sbin-path=/usr/local/sbin -with-http_ssl_module --without-mail_pop3_module --without-mail_imap_module --without-mail_smtp_module --with-http_stub_status_module --with-http_realip_module

```

Aquí estamos habilitando la compresión de las páginas con gzip, SSL para conexiones seguras, deshabilitando el módulo de correo POP3, IMAP y SMTP. Dependiendo de las necesidades de nuestro servidor, deberemos activar o desactivar algunos módulos. Más tarde necesitaremos recompilar para añadir el módulo **pagespeed**. La lista de todos los módulos disponibles se puede consultar en la <a href="http://wiki.nginx.org/Modules" title="Módulos nginx" target="_blank">documentación de nginx</a>.

### Compilar

Ya está todo listo para compilar e instalar, dentro del directorio de nginx ejecutamos:

```bash
./configure --with-http_gzip_static_module --sbin-path=/usr/local/sbin \
--with-http_ssl_module --without-mail_pop3_module --without-mail_imap_module\
--without-mail_smtp_module --with-http_stub_status_module --with-http_realip_module

```

Tras esto deberíamos ver un resumen de la operación realizada:

```bash
Configuration summary
  + using system PCRE library
  + using system OpenSSL library
  + md5: using OpenSSL library
  + sha1: using OpenSSL library
  + using system zlib library

  nginx path prefix: "/usr/local/nginx"
  nginx binary file: "/usr/local/sbin"
  nginx configuration prefix: "/usr/local/nginx/conf"
  nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
  nginx pid file: "/usr/local/nginx/logs/nginx.pid"
  nginx error log file: "/usr/local/nginx/logs/error.log"
  nginx http access log file: "/usr/local/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"

```

Para compilar e instalar:

```bash
make -j 4 && make install

```

Tras esto, es necesario descargar el script que permite iniciar, detener, reiniciar y recargar nginx mediante el comando **service**, podemos descargarlo desde

```bash
wget https://raw.github.com/JasonGiedymin/nginx-init-ubuntu/master/nginx
mv nginx /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
sudo chown root:root /etc/init.d/nginx
update-rc.d nginx defaults

```

Con esto hemos descargaro el script, lo hemos movido al directorio en el que será llamado al inicio del sistema, dado permisos de ejecución y asignado a root como propietario. Hecho esto, para iniciar nuestro servidor web hay que ejecutar el comando:

```bash
service nginx start

```

Como se muestra en la siguiente figura nginx, podemos comprobar que nginx está funcionando correctamente dirigiéndonos a la dirección *localhost*, donde veremos lo siguiente:

<figure>
    <a href="/img/2014/02/instalacionNginx.png"><img sizes="(min-width: 554px) 554px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/02/instalacionNginx.png" title="Instalación y optimización de un servidor web con Nginx (I)" alt="Instalación y optimización de un servidor web con Nginx (I)" width="554px" height="192px" /></a>
</figure>

### Configuración

Ya que está todo listo, vamos a realizar unos cuantos ajustes a la configuración por defecto:

```bash
user  www-data;
worker_processes  1;

pid        /var/run/nginx.pid;

error_log  logs/error.log;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    gzip on;
    gzip_buffers 16 8k;
    gzip_disable "MSIE [1-6]\.";
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    keepalive_timeout  3;
    index              index.html index.htm;

    server {
        listen       80;
        server_name localhost;
        root html;

    access_log  logs/host.access.log  main;

        # Deny all attempts to access hidden files such as .htaccess, .htpasswd, .DS_Store (Mac).
        location ~ /\. {
                deny all;
                access_log off;
                log_not_found off;
        }

    }

}

```

Los cambios más relevantes sobre la configuración por defecto son:

* Se ha cambiado el usuario del servidor de *nobody* a *www-data*, éste último es el usuario por defecto para servidores webs.
* Se define el archivo donde se localizará el PID (Process ID) del servidor. Esto permite al script que hemos instalado iniciar o detener nginx.
* Se habilita la compresión gzip para reducir el ancho de banda consumido.
* Se define el formato que tendrán los ficheros de log.

Cambiamos los permisos del directorio donde se alojan los recursos web a este último usuario y reiniciamos nginx:

```bash
chown -R www-data:www-data /usr/local/nginx/html/
service nginx destroy && service nginx start
```

# Tabla de contenidos

* Instalación y optimización de un servidor web con Nginx (I)
* [Instalación y optimización de un servidor web con Nginx (II)][1]
* [Instalación y optimización de un servidor web con Nginx (III)][2]

 [1]: https://elbauldelprogramador.com/instalacion-optimizacion-servidor-web-nginx-ii "Instalación y optimización de un servidor web con Nginx (II)"
 [2]: https://elbauldelprogramador.com/instalacion-optimizacion-servidor-web-nginx-iii "Instalación y optimización de un servidor web con Nginx (III)"
 [3]: https://elbauldelprogramador.com/como-instalar-nginx-con-php5-fpm/ "Cómo instalar y configurar Nginx con php5-fpm"
