---
author: alex
categories:
- servidores
- how to
mainclass: servidores
date: '2016-01-01'
lastmod: 2017-09-27T13:53:03+01:00
image: 2013/02/nginx-logo.png
url: /como-instalar-nginx-con-php5-fpm/
tags:
- nginx
- php
- servidor web
title: "Cómo instalar y configurar Nginx con php5-fpm"
---

<figure>
        <a href="/img/2013/02/nginx-logo.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/2013/02/nginx-logo.png"
            alt="instalar y configurar nginx"
            title="instalar y configurar nginx"
            sizes="(min-width: 350px) 350px, 100vw"
            width="350"
            height="90">
          </img>
        </a>
</figure>

Nginx (Pronunciado engine-x) es un servidor [HTTP](/como-funciona-http2-protocolo-que-acelera-considerablemente-la-navegacion-web/) de alto rendimiento, gratuito, software libre y <a href="https://es.wikipedia.org/wiki/Proxy#Reverse_Proxy_.2F_Proxy_inverso" target="_blank">proxy inverso</a>, así como un servidor proxy <a href="https://es.wikipedia.org/wiki/Internet_Message_Access_Protocol" target="_blank">IMAP</a>/<a href="https://es.wikipedia.org/wiki/Post_Office_Protocol" target="_blank">POP3</a>. Desarrollado por Igor Sysoev. Acualmente el <a href="http://news.netcraft.com/archives/2012/01/03/january-2012-web-server-survey.html" target="_blank">12.18%</a> de las webs usan nginx como servidor HTTP. Sus aspectos más destacables son el rendimiento, estabilidad, simplicidad de configuración y un bajo consumo de recursos. En este artículo explicaré como instalar nginx desde el código fuente.


<!--more--><!--ad-->

# Instalando dependencias

Antes de poder compilar nginx, es necesario instalar unos cuantos paquetes:

```bash
# apt-get install build-essential libssl-dev libpcre3-dev
```

El paquete `build-essential` contiene las herramientas básicas para compilar programas desde código fuente, las otras dos librerías son necesarias para nginx durante el proceso de compilación.

# Descargar y compilar Nginx

```bash
$ wget http://nginx.org/download/nginx-1.2.6.tar.gz
```

Descomprimimos el fichero:

```bash
$ tar zxvf nginx-1.2.6.tar.gz
```

Una vez descomprimido, entramos en el directorio y compilamos:

```bash
$ cd nginx-1.2.6
~/nginx-1.2.6$ ./configure --sbin-path=/usr/local/sbin --with-http_ssl_module --without-mail_pop3_module --without-mail_imap_module --without-mail_smtp_module --with-http_stub_status_module
~/nginx-1.2.6$ make
~/nginx-1.2.6$ sudo make install
```

Para consultar qué modulos hay disponibles hay que visitar la <a href="http://wiki.nginx.org/Modules" target="_blank">pagina oficial de Nginx</a> y decidir cuales queremos habilitar. Con la opción `--sbin-path=/usr/local/sbin` establecemos la ruta en la que se instalará el ejecutable. Tras compilar se mostrará información de la localización de los distintos ficheros:

```bash
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

Es necesario descargar un script que permita detener, reiniciar e iniciar nginx, podemos descargar el siguiente:

```bash
$ wget https://raw.github.com/JasonGiedymin/nginx-init-ubuntu/master/nginx
$ sudo mv nginx /etc/init.d/nginx
$ sudo chmod +x /etc/init.d/nginx
$ sudo chown root:root /etc/init.d/nginx
```

En el tercer comando otorgamos permiso de ejecución al script, con el cuarto hacemos al usuario root propietario del mismo.

Si queremos que nginx se inicie automáticamente al iniciar el sistema, hay que añadirlo a los [runlevel][3] correspondientes:

```bash
# update-rc.d nginx defaults
```

Ahora estamos en condiciones de ejecutar nginx:

```bash
# /etc/init.d/nginx start
[ ok ] Starting Nginx Server...:.
```

Listo, nos dirigimos a nuestro navegador y escribimos en la barra de direcciones **localhost**. Si todo ha ido bien deberíamos ver esta pantalla:

<figure>
    <img sizes="(min-width: 1024px) 1024px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/instalar-nginx-en-debian-1024x818.png" alt="instalar nginx en debian" width="1024px" height="818px"></img>
</figure>

Usando firebug se puede comprobar que efectivamente se está corriendo un servidor nginx:

<figure>
    <img sizes="(min-width: 641px) 641px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/instalar-nginx-en-debian2.png" alt="instalar nginx en debian2" width="641px" height="150px"></img>
</figure>

# Modificando la configuración por defecto

Sustituimos la configuración por defecto por esta:

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

* Se ha cambiado el usuario del servidor de “*nobody*” a “*www-data*”, éste último es el usuario por defecto para servidores webs.
* Se define el archivo donde se localizará el PID (Process ID) del servidor. Esto permite al script que hemos instalado iniciar o detener nginx.
* Se habilita la compresión gzip para reducir el ancho de banda consumido.
* Se define el formato que tendrán los ficheros de log.

Cambiamos los permisos de los ficheros que contienen la web y reiniciamos nginx para aplicar los cambios:

```bash
$ sudo chown -R www-data:www-data html/
$ sudo service nginx destroy && sudo service nginx start
```

# Instalar php5-fpm

En lugar de instalar php5, instalaremos php5-fpm (*FastCGI Process Manager*), una implementación alternativa con algunas características adicionales.

En ubuntu, ejecutamamos el siguiente comando:

```bash
# apt-get install php5-fpm
```

En debian agregamos el repositorio al *sources.list*:

```bash
deb http://packages.dotdeb.org stable all
deb-src http://packages.dotdeb.org stable all
```

Agregamos la llave [GnuPG][6] del repositorio:

```bash
apt-get update
wget http://www.dotdeb.org/dotdeb.gpg
cat dotdeb.gpg | sudo apt-key add -
```

Instalamos php:

```bash
# apt-get install php5-cli php5-suhosin php5-fpm php5-cgi php5-mysql
```

Lo iniciamos:

```bash
# /etc/init.d/php5-fpm start
```

Para lograr que nginx interprete php, hay que hacer algunas modificaciones a la configuración:

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
    index              index.php index.html index.htm;

    upstream php {
        server 127.0.0.1:9000;
    }

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

        location ~ \.php$ {
                include fastcgi_params;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                fastcgi_pass php;
        }
    }
}
```

Los principales cambios realizados son los siguientes:

* Se ha añadido `index.php` antes de `index.html index.htm` para dar prioridad a los archivos php.
* El bloque `upstream php` que apunta a `PHP-FPM`.
* Un manejador para archivos php `location ~ \.php$`

Para terminar, añadimos los siguientes parámetros al final del archivo */usr/local/nginx/fastcgi_params*:

```bash
fastcgi_connect_timeout 60;
fastcgi_send_timeout 180;
fastcgi_read_timeout 180;
fastcgi_buffer_size 128k;
fastcgi_buffers 4 256k;
fastcgi_busy_buffers_size 256k;
fastcgi_temp_file_write_size 256k;
fastcgi_intercept_errors on;
```

Para aplicar los cambios, reiniciamos nginx:

```bash
# service nginx restart
```

Con esto, deberíamos tener instalado un servidor corriendo con nginx y ejecutando archivos php.

# Referencias

- *Learn how to setup a web server pt2: Installing Nginx and PHP* »» <a href="http://blog.bryanbibat.net/2011/12/19/learn-how-to-setup-a-web-server-pt2-installing-nginx-and-php/" target="_blank">blog.bryanbibat.net</a>.
- *HOWTO install php5-fpm on Debian Squeeze* »» <a href="http://fak3r.com/2011/09/27/howto-install-php5-fpm-on-debian-squeeze/" target="_blank">fak3r.com</a>.


[3]: https://elbauldelprogramador.com/entendiendo-los-runlevel-en-debian-y-ubuntu/
[6]: https://elbauldelprogramador.com/como-cifrar-correos-con-gpg-con-mailvelope/ "Cómo cifrar correos con GPG usando Mailvelope"
