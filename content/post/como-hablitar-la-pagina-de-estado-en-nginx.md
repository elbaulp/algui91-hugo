---
author: alex
categories:
- servidores
- how to
mainclass: servidores
date: '2016-01-01'
lastmod: 2017-09-27T13:46:00+01:00
url: /como-hablitar-la-pagina-de-estado-en-nginx/
tags:
- nginx
- servidor web
title: "Cómo habilitar la página de estado en Nginx"
---

Nginx dispone de una página que muestra el estado del servidor, que mostrará información sobre las conexiones activas junto a otra información. Para habilitar la página en cuestión no hay más que seguir éstos sencillos pasos.

<!--more--><!--ad-->

# Habilitar el módulo HttpStubStatusModule

Es necesario compilar nginx con éste módulo. Para comprobar si está compilado debe aparecer `--with-http_stub_status_module` al ejecutar el comando

```bash
nginx -V

```

De no tenerlo, hay que volver a [compilar nginx][1] con éste módulo activo.

# Habilitar la página de estado en nginx

Hay que editar el fichero *nginx.conf*, y añadir en el bloque ***server { /\*&#8230;\*/ }*** lo siguiente:

```bash
location /nginx_status {
        # Hablitar las estadísticas
        stub_status on;
        # No registrar en los logs los accesos a la página de estado
        access_log   off;
        # Perminir que únicamente mi IP pueda visitar la página #
        allow X.X.X.X;
        # Denegar el acceso al resto del mundo #
        deny all;
   }

```

Tras esto, es necesario reiniciar nginx para que sea consciente de los cambios:

```bash
service nginx reload

```

Ahora al dirigirse a la dirección ***midominio.com/nginx_status*** veremos algo así:

```bash
Active connections: 291
server accepts handled requests
   16630948 16630948 31070465
Reading: 6 Writing: 179 Waiting: 106

```

  * *active connections* &#8212; Número de conexiones abieras.
  * *server accepts handled requests* &#8212; En el ejemplo, nginx ha aceptado 16630948 conexiones, procesado 16630948 de ellas (Ninguna fue cerrada) y ha procesado 31070465 (1.8 peticiones por conexión).
  * *reading* &#8212; Peticiones de cabecera leídas.
  * *writing* &#8212; Peticiones leidas, procesadas, o escritas en respuesta al cliente.
  * *waiting* &#8212; Conexiones *keep-alive*, activas en el momento (Lectura + Escritura)

# Referencias

- *Enable and see current status page* »» <a href="http://www.cyberciti.biz/faq/nginx-enable-and-see-current-status-page" target="_blank">cyberciti</a>
- *HttpStubStatusModule* »» <a href="http://wiki.nginx.org/HttpStubStatusModule" target="_blank">wiki.nginx.org</a>

 [1]: https://elbauldelprogramador.com/como-instalar-nginx-con-php5-fpm/ "Cómo instalar y configurar Nginx con php5-fpm"
