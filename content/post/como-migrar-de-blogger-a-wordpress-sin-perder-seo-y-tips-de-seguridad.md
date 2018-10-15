---
author: alex
categories:
- how to
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-09-28T17:55:41+01:00
description: "En esta entrada  se verá cómo migrar desde la plataforma de blogeo  de blogger a una en wordpress bajo un hosting propio así como la configuración  necesaria para no perder a los  lectores habituales, los suscriptores al feed ni  el posicionamiento en los buscadores. Por último se mencionarán algunos consejos  de seguridad."
url: /como-migrar-de-blogger-a-wordpress-sin-perder-seo-y-tips-de-seguridad/
tags:
- blogger
- wordpress
title: "Cómo migrar de Blogger a WordPress sin perder SEO y Tips de seguridad"
---

# Importar entradas y comentários

Una vez tenemos wordpress instalado y funcionando, vamos a importar todos las entradas y los comentarios de nuestro blog de blogger, para ello hacemos clic en *Herramientas→Importar→Blogger*

Hecho esto, debemos conceder permisos a blogger para que deje a wordpress acceder a la información, le damos al botón de autorizar, una vez concedido el acceso, le damos al botón mágico (Magic Button) y se empezarán a importar las entradas y comentarios.

<!--more--><!--ad-->

# Cambiar las DNS del dominio para que apunte a nuestro hosting con wordpress

En el caso de que dispongáis de un dominio propio como en mi caso, el primer paso es encontrar la dirección de los servidores DNS de nuestro proveedor de hosting, en mi caso con OVH las direcciones son <em><strong>ns100.ovh.net</strong></em> y <strong><em>dns100.ovh.net. </em></strong>Al comprar el domínio a través de blogger para acceder al panel de control debemos usar google Apps a través de este enlace https://www.google.com/nombredetudominio. Una vez dentro del panel de control nos dirigimos a <em>Domain settings</em><em>→Domain Names</em><em>→Avanced DNS settings. </em>Nos logeamos en la consola y editamos la sección <em>DNS Information </em>para que quede parecido a esto:

<figure>
    <img sizes="(min-width: 631px) 631px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="DNS settings blogger to wordpress" src="/img/2012/04/Screenshot-04042012-055625-PM1.png" alt="" width="613px" height="98px"></img>
</figure>

Obviamente con los DNS correspondientes a los que os proporcione vuestro servicio de hosting.

# Redireccionar los enlaces de blogger a wordpress

Para no perder los enlaces que tenemos repartidos por internet, existe un plugin que se encarga de hacer la redirección de la entrada a su correspondiente en wordpress, en<a href="http://justinsomnia.org/2006/10/maintain-permalinks-moving-from-blogger-to-wordpress/" target="_blank"> este enlace</a> se explica detalladamente los pasos a seguir, yo voy a hacer un breve resumen:

* <a href="http://justinsomnia.org/files/wp-maintain-blogger-permalinks-2.0.zip" target="_blank">Descargamos el plugin</a>
* Subimos el plugin a `wp-content/plugins`
* Lo activamos
* Nos dirigimos a *Herramientas→Mantain Blogger Permalinks* y pulsamos el botón ***Mantain Blogger Permalinks***. Eso es todo, una vez terminado borramos el plugin, ya que es de un solo uso.
* Ahora toca ir a __Ajustes→Enlaces permanentes__ y seleccionar més y nombre
* Por último, instalamos el plugin <a href="http://wordpress.org/extend/plugins/blogger-301-redirect/" target="_blank">Blogger 301 Redirect</a> o SEO Blogger to <a href="http://wordpress.org/extend/plugins/seo-blogger-to-wordpress-301-redirector/" target="_blank">WordPress Migration using 301 Redirection</a> y seguimos sus respectivas instrucciones.

# FeedBurner

No podemos olvidarnos de nuestros suscriptores de RSS y correo. El primer paso es dirigirnos a la configuración de feedburner y en la url del feed sustituir la de blogger por *elbauldelprogramador.org/* feed en mi caso. Hecho esto, instalamos <a href="http://flagrantdisregard.com/feedburner/" target="_blank">FD FeedBurner</a> y en la configuración del plugin escribimos la dirección de feedburner *http://feeds.feedburner.com/elBauldelProgramador.* A partir de ahora el RSS de nuestro feed wordpress redireccionará a feedburner y mantendremos a todos nuestros suscriptores.

## Seguridad

Llegó el momento de configurar wordpress para hacerlo lo más seguro posible. Voy a recomendar unos cuantos plugings que nos ayudarán en esta tarea:

# AskApache Password Protect

[AskApache Password Protect][6] realiza un escaner para comprobar las capacidades del servidor que proporciona nuestro hosting y proporciona módulos que podemos activar/desactivar para generar un *.htaccess*. Si activais un módulo que sea demasiado restrictivo y no podéis acceder al blog, no os preocupéis, como el autor del plugin dice, solo se crean dos archivos, un *.htaccess* en la raiz de la instalación de WordPress y otro dentro de *wp-admin*. Simplemente buscamos la regla, y la eliminamos.

# Login Lock-Down

<a href="http://wordpress.org/extend/plugins/login-lockdown/" target="_blank">Login Lock-Down</a> restringe los intentos masivos de login cuando se detectan, se puede configurar qué cantidad de logins fallidos se permiten para bloquearlo.

# Secure WordPress

<a href="http://wordpress.org/extend/plugins/secure-wordpress/" target="_blank">Secure WordPress</a> Permite activar una serie de medidas de seguridad como por ejemplo eliminar la versión de wordpress de la cabecera de la plantilla y los RSS.

# WordPress Database BackUp

<a href="http://wordpress.org/extend/plugins/wp-db-backup/" target="_blank">Un plugin</a> realmente útil y necesario, ya que la base de datos es la base de todo lo que tenemos en WordPress, cada entrada, cada comentario, configuraciones&#8230; La copia de seguridad se puede descargar o enviarse al correo. También es posible programar una copia de seguridad cada hora, dos veces al día, cada día o una vez a la semana y nos la enviará a nuestro correo.

# WP Security Scan

Una de las características de <a href="http://wordpress.org/extend/plugins/wp-security-scan/" target="_blank">Wp Security Scan</a> es que escanea los principales directorios y ficheros de WordPress para comprobar qué permisos actuales tienen y cuales serían los que debería tener, además permite realizar copias de seguridad de la base de datos. Con el tema de los permisos yo recomiendo empezar por un nivel muy restrictivo he ir probando hasta que todo funcione correctamente.

# Robots.txt

El robots.txt es algo a tener en cuenta y que debe colocarse en la raíz de la instalación de wordpress. El siguiente archivo es una combinación de los ejemplos que encontré en <a href="http://www.zonaw.com/robots-txt-optimizado-para-wordpress" target="_blank">zonaw</a> y <a href="http://ayudawordpress.com/robotstxt-perfecto-para-wordpress/" target="_blank">ayudawordpress</a>:

```bash
# Sitemap

Sitemap: http://tuweb.com/feed

# Ficheros y directorios a des/indexar de nuestro WordPress

User-Agent: *
Allow: /img/
Allow: /feed/$
Disallow: /wp-
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/
Disallow: /wp-includes/
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /trackback/
Disallow: /feed/
Disallow: /*/feed/$
Disallow: /*/feed/rss/$
Disallow: /*/trackback/$
Disallow: /*/*/feed/$
Disallow: /*/*/feed/rss/$
Disallow: /*/*/trackback/$
Disallow: /*/*/*/feed/$
Disallow: /*/*/*/feed/rss/$
Disallow: /*/*/*/trackback/$
Disallow: /comments/feed
Disallow: /?s=
Disallow: /search
Disallow: /archives/
Disallow: /index.php
Disallow: /*?
Disallow: /*.php$
Disallow: /*.js$
Disallow: /*.inc$
Disallow: /*.css$
Disallow: */feed/
Disallow: */trackback/
Disallow: /page/
Disallow: /tag/
Disallow: /category/

# Reglas para los bots mÃ¡s conocidos

User-agent: Googlebot

User-agent: Googlebot-Image
Disallow: /wp-includes/
Allow: /img/

User-agent: Mediapartners-Google*
Disallow:

User-agent: ia_archiver
Disallow: /

User-agent: duggmirror
Disallow: /

User-agent: noxtrumbot
Crawl-delay: 50

User-agent: msnbot
Crawl-delay: 30

User-agent: Slurp
Crawl-delay: 10

User-agent: MSIECrawler
Disallow: /

User-agent: WebCopier
Disallow: /

User-agent: HTTrack
Disallow: /

User-agent: Microsoft.URL.Control
Disallow: /

User-agent: libwww
Disallow: /

User-agent: noxtrumbot
Crawl-delay: 50
User-agent: msnbot
Crawl-delay: 30
User-agent: Slurp
Crawl-delay: 10
```

# .htaccess

Por último, el htaccess es algo importante también, os dejo un ejemplo de configuración, muchas de las reglas están generadas por plugins:

```bash
SetEnv PHP_VER 5_TEST
SetEnv REGISTER_GLOBALS 0

#long permalinks
RewriteRule ^post/([0-9]+)?/?([0-9]+)?/?$ /index.php?p=$1&page;=$2 [QSA]

#Begin gzip and deflate

    AddOutputFilterByType DEFLATE text/html text/css application/x-javascript text/plain text/xml image/x-icon

# CANONICAL ROBOTS.TXT

 RewriteBase /
 RewriteCond %{REQUEST_URI} !^/robots.txt$ [NC]
 RewriteCond %{REQUEST_URI} robots.txt [NC]
 RewriteRule .* http://www.TUDOMINIO.com/robots.txt [R=301,L]

# CANONICAL URLs

 RedirectMatch 301 ^/tag/$      http://www.TUDOMINIO.com/
 RedirectMatch 301 ^/search/$   http://www.TUDOMINIO.com/
 RedirectMatch 301 ^/category/$ http://www.TUDOMINIO.com/

RewriteRule ^login$ http://www.TUDOMINIO.com/wp-login.php [NC,L]
RedirectMatch 301 @admin http://www.TUDOMINIO.com/wp-admin

## EXPIRES CACHING ##

ExpiresActive On
ExpiresByType image/jpg "access 1 year"
ExpiresByType image/jpeg "access 1 year"
ExpiresByType image/gif "access 1 month"
ExpiresByType image/png "access 1 year"
ExpiresByType text/css "access 1 month"
ExpiresByType application/pdf "access 1 month"
ExpiresByType text/x-javascript "access 1 month"
ExpiresByType application/x-shockwave-flash "access 1 month"
ExpiresByType image/x-icon "access 1 year"
ExpiresDefault "access 2 days"

## EXPIRES CACHING ##

Options +FollowSymLinks
RewriteEngine on
RewriteRule ^download/([^/]+)$ wp-content/plugins/download-monitor/download.php?id=$1 [L]

# +ASKAPACHE PASSPRO 4.6.6
#######################################################
#               __                          __
#   ____ ______/ /______ _____  ____ ______/ /_  ___
#  / __ `/ ___/ //_/ __ `/ __ / __ `/ ___/ __ / _
# / /_/ (__  ) ,< / /_/ / /_/ / /_/ / /__/ / / /  __/
# __,_/____/_/|_|__,_/ .___/__,_/___/_/ /_/___/
#                     /_/
# - - - - - - - - - - - - - - - - - - - - - - - - - - -
# +APRO SIDS
# +SID 60000001
#Directories should not be left open for public browsing
Options -Indexes
DirectoryIndex index.html index.php /index.php
# -SID 60000001
# +SID 60000002
RewriteCond %{ENV:REDIRECT_STATUS} 200
RewriteRule .* - [L]

# -SID 60000002
# +SID 30140004
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.*/wp-comments-post.php.* HTTP/ [NC]
RewriteRule .* - [F,NS,L]
# -SID 30140004
# +SID 30140005
RewriteCond %{REQUEST_METHOD} =POST
RewriteCond %{REQUEST_URI} !^/(wp-admin/|wp-content/plugins/|wp-includes/).* [NC]
RewriteCond %{HTTP:Content-Length} ^$
RewriteRule .* - [F,NS,L]
# -SID 30140005
# +SID 30140009
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.*/wp-comments-post.php.* HTTP/ [NC]
RewriteCond %{HTTP_REFERER} ^-?$
RewriteRule .* - [F,NS,L]
# -SID 30140009
# +SID 30140010
RewriteCond %{HTTP_USER_AGENT} ^.*(opera|mozilla|firefox|msie|safari).*$ [NC,OR]
RewriteCond %{HTTP_USER_AGENT} ^-?$
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.+/trackback/? HTTP/ [NC]
RewriteCond %{REQUEST_METHOD} =POST
RewriteRule .* - [F,NS,L]
# -SID 30140010
# +SID 40140013
RewriteCond %{REQUEST_URI} !^/(wp-login.php|wp-admin/|wp-content/plugins/|wp-includes/).* [NC]
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} ///.* HTTP/ [NC,OR]
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.+?=?(http|ftp|ssl|https):/.* HTTP/ [NC,OR]
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.*??.* HTTP/ [NC,OR]
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.*.(asp|ini|dll).* HTTP/ [NC,OR]
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /.*.(htpasswd|htaccess|aahtpasswd).* HTTP/ [NC]
RewriteRule .* - [F,NS,L]
# -SID 40140013
# +SID 50140001
RewriteCond %{REQUEST_METHOD} !^(GET|HEAD|POST|PROPFIND|OPTIONS|PUT)$ [NC]
RewriteRule .* - [F,NS,L]
# -SID 50140001
# +SID 50140002
RewriteCond %{THE_REQUEST} !^[A-Z]{3,9} .+ HTTP/(0.9|1.0|1.1) [NC]
RewriteRule .* - [F,NS,L]
# -SID 50140002
# +SID 50140003
RewriteCond %{REQUEST_URI} !^/(wp-login.php|wp-admin/|wp-content/plugins/|wp-includes/).* [NC]
RewriteCond %{THE_REQUEST} !^[A-Z]{3,9} [A-Z0-9.+_/-?=&%#]+ HTTP/ [NC]
RewriteRule .* - [F,NS,L]
# -SID 50140003

# +SID 50140006
RewriteCond %{HTTP:Content-Disposition} .php [NC]
RewriteCond %{HTTP:Content-Type} image/.+ [NC]
RewriteRule .* - [F,NS,L]
# -SID 50140006
# +SID 50140005
RewriteCond %{HTTP_COOKIE} ^.*PHPSESS?ID.*$
RewriteCond %{HTTP_COOKIE} !^.*PHPSESS?ID=([0-9a-z]+);.*$
RewriteRule .* - [F,NS,L]
# -SID 50140005
# +SID 40140011
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /wp-content/.*$ [NC]
RewriteCond %{REQUEST_FILENAME} !^.+(flexible-upload-wp25js|media).php$
RewriteCond %{REQUEST_FILENAME} ^.+.(php|html|htm|txt)$
RewriteRule .* - [F,NS,L]
# -SID 40140011
# -APRO SIDS
# - - - - - - - - - - - - - - - - - - - - - - - - - - -
#               __                          __
#   ____ ______/ /______ _____  ____ ______/ /_  ___
#  / __ `/ ___/ //_/ __ `/ __ / __ `/ ___/ __ / _
# / /_/ (__  ) ,< / /_/ / /_/ / /_/ / /__/ / / /  __/
# __,_/____/_/|_|__,_/ .___/__,_/___/_/ /_/___/
#                     /_/
#######################################################
# -ASKAPACHE PASSPRO 4.6.6

# BEGIN W3TC Browser Cache

    AddType text/css .css
    AddType application/x-javascript .js
    AddType text/x-component .htc
    AddType text/html .html .htm
    AddType text/richtext .rtf .rtx
    AddType image/svg+xml .svg .svgz
    AddType text/plain .txt
    AddType text/xsd .xsd
    AddType text/xsl .xsl
    AddType text/xml .xml
    AddType video/asf .asf .asx .wax .wmv .wmx
    AddType video/avi .avi
    AddType image/bmp .bmp
    AddType application/java .class
    AddType video/divx .divx
    AddType application/msword .doc .docx
    AddType application/vnd.ms-fontobject .eot
    AddType application/x-msdownload .exe
    AddType image/gif .gif
    AddType application/x-gzip .gz .gzip
    AddType image/x-icon .ico
    AddType image/jpeg .jpg .jpeg .jpe
    AddType application/vnd.ms-access .mdb
    AddType audio/midi .mid .midi
    AddType video/quicktime .mov .qt
    AddType audio/mpeg .mp3 .m4a
    AddType video/mp4 .mp4 .m4v
    AddType video/mpeg .mpeg .mpg .mpe
    AddType application/vnd.ms-project .mpp
    AddType application/x-font-otf .otf
    AddType application/vnd.oasis.opendocument.database .odb
    AddType application/vnd.oasis.opendocument.chart .odc
    AddType application/vnd.oasis.opendocument.formula .odf
    AddType application/vnd.oasis.opendocument.graphics .odg
    AddType application/vnd.oasis.opendocument.presentation .odp
    AddType application/vnd.oasis.opendocument.spreadsheet .ods
    AddType application/vnd.oasis.opendocument.text .odt
    AddType audio/ogg .ogg
    AddType application/pdf .pdf
    AddType image/png .png
    AddType application/vnd.ms-powerpoint .pot .pps .ppt .pptx
    AddType audio/x-realaudio .ra .ram
    AddType application/x-shockwave-flash .swf
    AddType application/x-tar .tar
    AddType image/tiff .tif .tiff
    AddType application/x-font-ttf .ttf .ttc
    AddType audio/wav .wav
    AddType audio/wma .wma
    AddType application/vnd.ms-write .wri
    AddType application/vnd.ms-excel .xla .xls .xlsx .xlt .xlw
    AddType application/zip .zip

    ExpiresActive On
    ExpiresByType text/css A31536000
    ExpiresByType application/x-javascript A31536000
    ExpiresByType text/x-component A31536000
    ExpiresByType text/html A3600
    ExpiresByType text/richtext A3600
    ExpiresByType image/svg+xml A3600
    ExpiresByType text/plain A3600
    ExpiresByType text/xsd A3600
    ExpiresByType text/xsl A3600
    ExpiresByType text/xml A3600
    ExpiresByType video/asf A31536000
    ExpiresByType video/avi A31536000
    ExpiresByType image/bmp A31536000
    ExpiresByType application/java A31536000
    ExpiresByType video/divx A31536000
    ExpiresByType application/msword A31536000
    ExpiresByType application/vnd.ms-fontobject A31536000
    ExpiresByType application/x-msdownload A31536000
    ExpiresByType image/gif A31536000
    ExpiresByType application/x-gzip A31536000
    ExpiresByType image/x-icon A31536000
    ExpiresByType image/jpeg A31536000
    ExpiresByType application/vnd.ms-access A31536000
    ExpiresByType audio/midi A31536000
    ExpiresByType video/quicktime A31536000
    ExpiresByType audio/mpeg A31536000
    ExpiresByType video/mp4 A31536000
    ExpiresByType video/mpeg A31536000
    ExpiresByType application/vnd.ms-project A31536000
    ExpiresByType application/x-font-otf A31536000
    ExpiresByType application/vnd.oasis.opendocument.database A31536000
    ExpiresByType application/vnd.oasis.opendocument.chart A31536000
    ExpiresByType application/vnd.oasis.opendocument.formula A31536000
    ExpiresByType application/vnd.oasis.opendocument.graphics A31536000
    ExpiresByType application/vnd.oasis.opendocument.presentation A31536000
    ExpiresByType application/vnd.oasis.opendocument.spreadsheet A31536000
    ExpiresByType application/vnd.oasis.opendocument.text A31536000
    ExpiresByType audio/ogg A31536000
    ExpiresByType application/pdf A31536000
    ExpiresByType image/png A31536000
    ExpiresByType application/vnd.ms-powerpoint A31536000
    ExpiresByType audio/x-realaudio A31536000
    ExpiresByType image/svg+xml A31536000
    ExpiresByType application/x-shockwave-flash A31536000
    ExpiresByType application/x-tar A31536000
    ExpiresByType image/tiff A31536000
    ExpiresByType application/x-font-ttf A31536000
    ExpiresByType audio/wav A31536000
    ExpiresByType audio/wma A31536000
    ExpiresByType application/vnd.ms-write A31536000
    ExpiresByType application/vnd.ms-excel A31536000
    ExpiresByType application/zip A31536000

        BrowserMatch ^Mozilla/4 gzip-only-text/html
        BrowserMatch ^Mozilla/4.0[678] no-gzip
        BrowserMatch bMSIE !no-gzip !gzip-only-text/html
        BrowserMatch bMSI[E] !no-gzip !gzip-only-text/html

        Header append Vary User-Agent env=!dont-vary

        AddOutputFilterByType DEFLATE text/css application/x-javascript text/x-component text/html text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon

        Header set Pragma "public"
        Header append Cache-Control "public, must-revalidate, proxy-revalidate"

    FileETag MTime Size

         Header set X-Powered-By "W3 Total Cache/0.9.2.4"

        Header set Pragma "public"
        Header append Cache-Control "public, must-revalidate, proxy-revalidate"

    FileETag MTime Size

         Header set X-Powered-By "W3 Total Cache/0.9.2.4"

        Header set Pragma "public"
        Header append Cache-Control "public, must-revalidate, proxy-revalidate"

    FileETag MTime Size

         Header set X-Powered-By "W3 Total Cache/0.9.2.4"

# END W3TC Browser Cache
# BEGIN W3TC Page Cache core

    RewriteEngine On
    RewriteBase /
    RewriteRule ^(.*/)?w3tc_rewrite_test$ $1?w3tc_rewrite_test=1 [L]
    RewriteCond %{HTTP:Accept-Encoding} gzip
    RewriteRule .* - [E=W3TC_ENC:_gzip]
    RewriteCond %{REQUEST_METHOD} !=POST
    RewriteCond %{QUERY_STRING} =""
    RewriteCond %{HTTP_HOST} =www.TUDOMINIO.com
    RewriteCond %{REQUEST_URI} /$ [OR]
    RewriteCond %{REQUEST_URI} (sitemap(_index)?.xml(.gz)?|[a-z0-9_-]+-sitemap([0-9]+)?.xml(.gz)?) [NC]
    RewriteCond %{REQUEST_URI} !(/wp-admin/|/xmlrpc.php|/wp-(app|cron|login|register|mail).php|wp-.*.php|index.php) [NC,OR]
    RewriteCond %{REQUEST_URI} (wp-comments-popup.php|wp-links-opml.php|wp-locations.php) [NC]
    RewriteCond %{HTTP_COOKIE} !(comment_author|wp-postpass|wordpress_[a-f0-9]+|wordpress_logged_in) [NC]
    RewriteCond %{HTTP_USER_AGENT} !(W3 Total Cache/0.9.2.4) [NC]
    RewriteCond "%{DOCUMENT_ROOT}/wp-content/w3tc/pgcache/%{REQUEST_URI}/_index%{ENV:W3TC_UA}%{ENV:W3TC_REF}%{ENV:W3TC_SSL}.html%{ENV:W3TC_ENC}" -f
    RewriteRule .* "/wp-content/w3tc/pgcache/%{REQUEST_URI}/_index%{ENV:W3TC_UA}%{ENV:W3TC_REF}%{ENV:W3TC_SSL}.html%{ENV:W3TC_ENC}" [L]
    RewriteCond %{REQUEST_METHOD} !=POST
    RewriteCond %{QUERY_STRING} =""
    RewriteCond %{HTTP_HOST} =www.TUDOMINIO.com
    RewriteCond %{REQUEST_URI} /$ [OR]
    RewriteCond %{REQUEST_URI} (sitemap(_index)?.xml(.gz)?|[a-z0-9_-]+-sitemap([0-9]+)?.xml(.gz)?) [NC]
    RewriteCond %{REQUEST_URI} !(/wp-admin/|/xmlrpc.php|/wp-(app|cron|login|register|mail).php|wp-.*.php|index.php) [NC,OR]
    RewriteCond %{REQUEST_URI} (wp-comments-popup.php|wp-links-opml.php|wp-locations.php) [NC]
    RewriteCond %{HTTP_COOKIE} !(comment_author|wp-postpass|wordpress_[a-f0-9]+|wordpress_logged_in) [NC]
    RewriteCond %{HTTP_USER_AGENT} !(W3 Total Cache/0.9.2.4) [NC]
    RewriteCond "%{DOCUMENT_ROOT}/wp-content/w3tc/pgcache/%{REQUEST_URI}/_index%{ENV:W3TC_UA}%{ENV:W3TC_REF}%{ENV:W3TC_SSL}.xml%{ENV:W3TC_ENC}" -f
    RewriteRule .* "/wp-content/w3tc/pgcache/%{REQUEST_URI}/_index%{ENV:W3TC_UA}%{ENV:W3TC_REF}%{ENV:W3TC_SSL}.xml%{ENV:W3TC_ENC}" [L]

# END W3TC Page Cache core
# BEGIN WordPress

RewriteEngine on
RewriteBase /
RewriteRule ^download/([^/]+)$ http://www.TUDOMINIO.com/wp-content/plugins/download-monitor/download.php?id=$1 [L]

RewriteEngine On
RewriteBase /
RewriteRule ^index.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# END WordPress
```

 [6]: http://wordpress.org/extend/plugins/askapache-password-protect/
