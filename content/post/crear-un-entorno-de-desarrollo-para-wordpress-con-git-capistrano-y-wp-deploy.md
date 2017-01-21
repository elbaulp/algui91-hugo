---
author: alex
categories:
- how to
- opensource
color: '#f05033'
date: 2015-11-27 16:17:00
description: Nunca es buena idea realizar cambios a un sitio web sin haberlos probado
  de antemano, hasta asegurarnos que funcionan correctamente. Para ello, lo habitual
  es tener una copia local de la web, probarlos y luego aplicar los cambios en el
  sitio real. Sin embargo, muchas veces hay cosas que funcionan el local y no en la
  web.
image: hotlink-ok/CREAR-UN-ENTORNO-DE-DESARROLLO-PARA-WORDPRESS-CON-GIT-CAPISTRANO-Y-WP-DEPLOY.png
lastmod: 2016-08-10
layout: post.amp
mainclass: git
permalink: /crear-un-entorno-de-desarrollo-para-wordpress-con-git-capistrano-y-wp-deploy/
tags:
- git
- Configurar capistrano
- configurar WP-Deploy
- ejemplo capistrano
- entornos de desarrollo Wordpress
- staging Worpress
- Wp-Deploy
- Que es capistrano
- capistrano wordpress
- capistrano deploy
- wordpress git
title: Crear un entorno de desarrollo para WordPress con Git, Capistrano y Wp-Deploy
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/CREAR-UN-ENTORNO-DE-DESARROLLO-PARA-WORDPRESS-CON-GIT-CAPISTRANO-Y-WP-DEPLOY.png" title="{{ page.title }}" alt="{{ page.title }}" width="400px" height="400px"></amp-img>
</figure>

Nunca es buena idea realizar cambios a un sitio web sin haberlos probado de antemano, hasta asegurarnos que funcionan correctamente. Para ello, lo habitual es tener una copia local de la web, probarlos y luego aplicar los cambios en el sitio real. Sin embargo, muchas veces hay cosas que funcionan el local y no en la web.

Existen varias estrategias de flujos de trabajo (Workflows) en el desarrollo de aplicaciones web. Haciendo uso de [git][1], capistrano y Wp-Deploy es posible llevar un control absoluto del desarrollo y evolución de una web, en este caso para WordPress.

Éste articulo tratará de explicar cómo configurar un entorno de trabajo con tres entornos. Un entorno **local**, para realizar modificaciones, otro de **desarrollo**, alojado en un servidor real, para comprobar que, efectivamente, los cambios locales funcionan en un servidor real y por último, el entorno de **producción**, donde se aplicarán los cambios realizados una vez sepamos que funcionan correctamente. Todo ésto haciendo uso de Git, Capistrano y un framework para Capistrano y WordPress llamado **Wp-Deploy**.



# Configurar el entorno local

Para configurar el servidor local, podemos crear una máquina virtual que actúe de servidor o directamente en un PC que tengamos por casa. Lo más cómodo es la máquina virtual. Debemos instalar y configurar un servidor web en ella, si nos decidimos por **nginx**, en éste blog ya vimos [cómo instalar y configurar Nginx con php5-fpm][2].

<!--more--><!--ad-->

# Instalar y configurar Capistrano y Wp-Deploy

Una vez tengamos la copia de la web en local, empezamos instalando y configurando **Wp-Deploy**. Ya que éste framework hace uso de Capistrano, se explicará directamente la instalación y uso de **Wp-Deploy**.

## ¿Qué es Capistrano?

Es una herramienta de automatización remota de servidores y despliegues escrita en [Ruby][3].

### Requerimientos

**Capistrano** requiere acceso [SSH][4] entre la máquina local y el servidor, y entre la máquina local y la cuenta GitHub o Bitbucket (o cualquier otro alojamiento de repositorios).

* **Bunder**: Para resolver rápidamente las dependencias de Ruby, se recomienda instalar <a href="http://bundler.io/" target="_blank">Bundler</a>.
* **WP-CLI**: Una linea de comandos para interactuar con WordPress. La guía de instalación está disponible en su [web.][5]

## Instalar Wp-Deploy

En primer lugar, hay que clonar el repositorio. Para ello:

```bash
$ cd /directorio/desado
$ git clone --recursive https://github.com/Mixd/wp-deploy.git new-project
```

El comando anterior clonará el repositorio en el directorio especificado y descargará el submódulo que contiene el núcleo de WordPress.

El siguiente paso es desvincular el repositorio del original (WP-deploy) y conectarlo a nuestro repositorio personal. Para ello los autores han creado un script que facilita la tarea:

```bash
$ bash config/prepare.sh
```

Solo resta añadir nuestro repositorio:

```bash
$ git remote add origin <repo_url>
```

Y, por último, instalar las dependencias de ruby con **Bundler**:

```bash
$ bundle install
```

Listo, con ésto tenemos WP-Deploy instalado, pasemos a los ficheros de configuración.

### Configurar WP-Deploy

Primero, es necesario establecer las preferencias globales de WordPress en el fichero `config/deploy.rb`:

```ruby
set :wp_user, "usuario" # El usuario administrador de WordPress
set :wp_email, "aaaa@aaaa.com" # El email del administrador de WordPress
set :wp_sitename, "El Baúl del Programador" # El título del sitio WordPress
set :wp_localurl, "http://localhost" # La dirección URL local de desarrollo
```

Luego definimos los parámetros para el repositorio [git](/tags/git), en el mismo archivo:

```ruby
set :application, "nombreDelRepo"
set :repo_url, "git@github.com:TuUsuario/nombreDelRepo.git"
```

Wp-Deploy usa por defecto dos entornos, **staging** y **production**. En este artículo configuraremos tres.

### Definiendo y configurando entornos de desarrollo

Dichos entornos se declaran en el directorio `./config/deploy/`, por defecto existen `staging.rb` y `production.rb`. El primero para el desarrollo local y el segundo para aplicar los cambios a producción.

Un ejemplo para `production.rb` sería:

```ruby
set :stage_url, "http://www.miweb.com"
server "IP.DEL.SERVIDOR.", user: "USUARIO SSH", roles: %w{web app db}
set :deploy_to, "/ruta/donde/reside/la/web
set :branch, "master" # Rama del repositorio que se subirá
```

Para `staging.rb` tendríamos:

```ruby
set :stage_url, "http://localhost"
server "localhost", user: "USUARIO SSH", roles: %w{web app db}
set :deploy_to, "/ruta/donde/reside/la/web/en/local
set :branch, "development" # Rama del repositorio que se subirá
```

La diferencia entre una y otra reside principalmente en que la rama de desarrollo es distinta. Cuando se trabaje en una nueva característica o se esté corrigiendo un bug, todos los cambios se realizan en la rama **development** y se prueban en local. Una vez probados, traspasamos los cambios a la rama **master** y los subimos al servidor en producción.

Además, crearemos otro entorno llamado `desarrollo.rb`, que usaremos para probar los cambios de la rama **development** en el servidor real, pero no en la web accesible al público, se subirán a un subdominio, con acceso restringido y con la indexación para los buscadores desactivada. Para ello creamos el fichero `desarrollo.rb` en `./config/deploy/`:

```ruby
set :stage_url, "http://desarrollo.miweb.com"
server "IP.DEL.SERVIDOR.", user: "USUARIO SSH", roles: %w{web app db}
set :deploy_to, "/ruta/donde/reside/el/subdominio/de/la/web/
set :branch, "development" # Rama del repositorio que se subirá
```

Como vemos, también se usa la rama **development**, ya que es donde probaremos los cambios aplicados al código.

### Configurando el acceso a la base de datos

En el directorio `./config` renombramos el fichero `database.example.yml` a `database.yml` y lo rellenamos con los datos de acceso para la base de datos en cada uno de los entornos:

```yaml
staging:
  host: localhost
  database: db_name
  username: db_user
  password: 'db_pass'
production:
  host: localhost
  database: db_name
  username: db_user
  password: 'db_pass'
local:
  host: localhost
  database: db_name
  username: root
  password: 'root'
desarrollo:
  host: localhost
  database: db_name
  username: root
  password: 'root'
```

Hecho esto, todo debería estar listo para usar.

### Uso

El primer comando que hay que usar, y sólo será necesario usarlo una vez, es:

```bash
$ bundle exec cap production wp:setup:remote
```

Que instalará WordPress usando los detalles de los archivos de configuración, generará un fichero `wp-config.php` (Junto con un usuario y contraseña para WordPress, excepto si ya exite alguno) acorde a ellos y aplicará los cambios en el entorno indicado, en este caso, creará un `wp-config.php` para producción en **remote** (El servidor).

### Deploying

Para volcar los cambios aplicados al servidor:

```bash
$ bundle exec cap production deploy
```

Ésto subirá los cambios hechos en el repositorio al entorno de producción, en nuestro ejemplo, también podríamos escribir en lugar de `production`, `desarrollo` ó `staging` para aplicar los cambios al entorno correspondiente.

### Migraciones de bases de datos

Un comando muy útil, aunque hay que usarlo con precaución, ya que: ___puede deshacerse___.

Al migrar la base de datos, se reemplazarán automáticamente las urls necesarias del entorno de producción al de desarrollo y vice versa.

#### Enviar la base de datos al entorno de producción

```bash
$ bundle exec cap production db:push
```

#### De producción a desarrollo

```bash
$ bundle exec cap production db:pull
```

#### Realizar una copia de seguridad del a BD de producción

```bash
$ bundle exec cap production db:backup
```

### Sincronizando la carpeta Uploads

La carpeta **Uploads** de WordPress no es necesario añadirla al repositorio, es más, se debe evitar, ya que son ficheros muy grandes. En lugar de eso, se mantienen sincronizados con:

```bash
$ bundle exec cap production uploads:sync
```

### Actualizar el núcleo de WordPress

A partir de ahora, la forma de actualizar WordPress no será la típica, pulsando el botón en el panel de control. Ahora se actualizará directamente desde el repositorio. Cuando se libere una nueva versión bastará hacer:

```bash
$ bundle exec cap production wp:core:update
```

De igual modo, si se prefiere hacer pruebas antes de subirlo a producción, se cambia el entorno por el deseado y se prueba si la actualización de WordPress es compatible con nuestro sitio.

# Conclusión

Si el lector ha llegado hasta este punto, estaba interesado en conseguir un ciclo de desarrollo adecuado para su sitio y, seguramente esto cumpla con sus necesidades. Una de las principales ventajas de éste modelo de desarrollo es el control absoluto del estado del sitio web, y un mayor control sobre los posibles errores, ya que se pueden probar en dos fases de desarrollo antes de liberarlos al público.

#### Referencias

- *Wp-Deploy* »» <a href="https://github.com/Mixd/wp-deploy" target="_blank">github.com</a>
- *Capistrano* »» <a href="http://capistranorb.com/" target="_blank">capistranorb.com</a>

 [1]: https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos"
 [2]: https://elbauldelprogramador.com/como-instalar-nginx-con-php5-fpm/ "Cómo instalar y configurar Nginx con php5-fpm"
 [3]: https://elbauldelprogramador.com/introduccion-a-ruby/ "Introducción rápida a Ruby"
 [4]: https://elbauldelprogramador.com/recibir-alertas-de-correo-ssh/ "Recibir alertas de correo al acceder al  sistema mediante SSH"
 [5]: http://wp-cli.org/#install
