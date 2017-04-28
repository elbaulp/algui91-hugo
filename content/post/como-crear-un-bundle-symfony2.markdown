---
author: colaboraciones
categories:
- dev
date: 2015-06-22 09:00:00
lastmod: 2017-03-17T18:29:24+01:00
description: "En este articulo vamos a ver los pasos que he seguido para crear un  bundle de symfony 2 de forma que sea redistribuible mediante composer. Este bundle  servirá para facilitar la interacción con la api de smsup, desde symfony2  y poder enviar sms masivos. Es un bundle simple, pero tiene varias cosas interesantes  (requiere otra librería, utiliza parámetros de configuración, etc.), y  puede ser una buena introducción."
mainclass: dev
tags:
- bundle
- php
- Symfony2
title: "Cómo Crear Un Bundle Symfony2"
---

> Éste artículo es una colaboración de _Alejandro Blanco_, Director de desarrollo en [smsup.es](http://smsup.es)

En este articulo vamos a ver los pasos que he seguido para crear un bundle de symfony 2 de forma que sea redistribuible mediante composer. Este bundle servirá para facilitar la interacción con la api de smsup, desde symfony2 y poder enviar sms masivos. Es un bundle simple, pero tiene varias cosas interesantes (requiere otra librería, utiliza parámetros de configuración, etc.), y puede ser una buena introducción.

<!--more--><!--ad-->

Voy a describir paso a paso como lo he creado, habrá otras formas igualmente válidas y seguramente mejores, esto es solo como yo lo he hecho.

Asumo que ya tenemos composer instalado, si no es así, se puede instalar [siguiendo estos pasos](https://getcomposer.org/download/).

# Instalar symfony2

Lo primero es instalar symfony, en este caso voy a instalar la versión 2.3, que es la versión menor con soporte ahora mismo, ya que quiero que sea compatible con el máximo de versiones posible y para ello lo mejor es crearlo sobre la menor versión.
Lo instalamos usando el comando siguiente:

```bash

composer create-project symfony/framework-standard-edition /ruta/hasta/directorio-raiz-servidor-web/Symfony 2.3.0
```

# Creamos la base del bundle

Una vez instalado, creamos dentro de vendors el directorio del bundle siguiendo la estructura en la que queramos que luego se instale. En este caso voy a usar la estructura smsup\smsup-api-bundle.

Ahora creamos dentro los archivos mínimos que debe tener el bundle para funcionar:

**DependencyInjection/SmsupapiExtension.php**: este archivo gestiona la carga de la configuración de los servicios definidos por el bundle. Aquí vamos cargar el archivo services.yml.

```php

namespace smsup\SmsupapiBundle\DependencyInjection;
  use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class SmsupapiExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');
    }
}
```

**Resources/config/services.yml**: aquí se definen los servicios que expone el bundle. Vamos a definir solo un servicio que expondrá los métodos de la api y gestionara las peticiones a la librería. También podemos incluir en este archivo parámetros de configuración que luego queramos usar.

```bash

services:
  smsup.smsupapi.sender:
      class: smsup\SmsupapiBundle\Clases\SmsupSender
```

**Clases/SmsupSender.php**: esta será la clase que hemos definido para usar como servicio, en principio solo definiremos un método que haga un echo en pantalla para comprobar que funciona.

```php

namespace smsup\SmsupapiBundle\Clases;
class SmsupSender {
  public function Send($mensaje)
  {
    echo "Su mensaje es: " . $mensaje;
  }
}
```

**SmsupapiBundle.php**: clase que extiende de Bundle y sirve para cargarlo.

```php

namespace smsup\SmsupapiBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
class SmsupapiBundle extends Bundle
{
}
```

Con esto tendríamos definidos los archivos mínimos para crear el bundle y poder usarlo. Para probar que funciona bien vamos a modificar el archivo de autoload generado por composer (solo a modo de prueba, esto no debe hacerse ya que cada vez que instalamos algo con composer se modifican estos archivos), para simular como quedará una vez nuestro bundle sea instalado y añadiremos la carga del bundle en AppKernel.

En vendor\composer\autoload_psr4.php, añadir esta entrada en el array devuelto:

```php

'smsup\\SmsupapiBundle\\' => array($vendorDir . '/smsup/SmsupapiBundle'),
```

En AppKernel añadimos:

```php

new smsup\SmsupapiBundle\SmsupapiBundle(),
```

Ahora solo queda comprobar que todo funciona bien, para ello vamos a Acme\DemoBundle\Controller\WelcomeController.php y en el método indexAction añadimos el siguiente código:

```php

$sender = $this->get('smsup.smsupapi.sender');
$sender->send('entró y funciona');
```

Esto simplemente obtendrá el servicio definido en nuestro bundle y llamara al método send que definimos, pasando el mensaje "entró y funciona". Al ejecutar en el navegador localhost/RUTA_SYMFONY/web/app_dev.php/ deberíamos ver la página de bienvenida de symfony, pero en la primera línea debe aparecer el texto "Su mensaje es: entró funciona", lo cual nos indica que todo ha ido bien.

# Subida al repositorio

Como ya sabemos que funciona correctamente nuestro bundle, aunque no haga nada útil aun, vamos a subirlo a nuestro repositorio git y a añadirlo a packagist para que pueda ser descargado usando composer. Para esto debemos añadir el archivo composer.json, en el que vamos a definir nuestro bundle. En nuestro caso quedaría así:

```json

{
  "name": "smsup/smsup-api-bundle",
  "type": "symfony-bundle",
  "description": "Bundle Symfony2 para el uso de la api de smsup.es para el envio de sms",
  "keywords": ["sms", "sms api", "bundle sms"],
  "homepage": "https://www.smsup.es",
  "license": "MIT",
  "require": {
      "php": ">=5.3.2",
      "smsup/smsuplib": "~2.0"
  },
  "autoload": {
      "psr-4": { "smsup\\SmsupapiBundle\\": "" }
  }
}
```

Los parámetros importantes aquí son los siguientes:

 - **name:** es el nombre que le damos y deber ser único
 - **type:** indicamos el tipo que es, en este caso un bundle de symfony
 - **require:** indicamos las dependencias de nuestro bundle, en este caso la librería "smsup/smsuplib"
 - **autoload:** indicamos que el namespace smsup\SmsupapiBundle hace referencia a la raíz de nuestro bundle.

Ya solo debemos declarar nuestro paquete en packagist, para lo cual tenemos que acceder a https://packagist.org y hacer login. Luego vamos a "Submit" e indicamos el enlace al repositorio y solo con esto ya nos cargara el mismo. Para que cada vez que actualicemos nuestro repositorio packagist actualice los datos, se recomienda añadir un webhook al repositorio. En el caso de github, debemos ir a Settings -> Weebhooks & Services -> Add Service. Seleccionar tipo Packagist e indicar el nombre de usuario y la clave de la API de packagist.

Una vez hecho esto vamos a instalar nuestro bundle desde composer para ver que todo es correcto. Antes vamos a eliminar el directorio que creamos en vendor, para que se instale limpiamente.

Como no hemos definido ninguna versión en nuestro repositorio, para que composer descargue el paquete, debemos cambiar en el archivo composer.json de symonfy, la estabilidad mínima de los paquetes a descargar, ya que la rama master se considera de desarrollo. Esto se hace cambiando "stable" por "dev" en:

```json

"minimum-stability": "stable"
```

Para instalarlo ejecutamos la siguiente instruccion:

```bash

composer require smsup/smsup-api-bundle master
```

Hemos incluido "master" para indicar que se descargue la rama master, ya que aún no definimos ninguna versión estable.

Tras esto ya tenemos nuestro bundle instalado correctamente en vendors y si ejecutamos el código que teníamos de prueba veremos de nuevo el mensaje "Su mensaje es: entró funciona".

Ahora ya solo debemos incluir las funcionalidades que queramos que tenga e ir actualizando el repositorio.
Vamos a añadir la funcionalidad y luego veremos como crear la primera versión estable.

# Añadimos parámetros obligatorios de configuración

Vamos a añadir dos parámetros de configuración obligatorios, en los que se le indicara al bundle el ID de la Api y la clave secreta de la misma.
Para esto debemos crear el archivo DependencyInjection/Configuration.php en el que indicamos, mediante el método getConfigTreeBuilder, el árbol de parámetros que vamos a usar.

```php

namespace smsup\SmsupapiBundle\DependencyInjection;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('smsupapi');
        $rootNode->
          children()
            ->scalarNode('api_id')
                ->isRequired()
                ->cannotBeEmpty()
            ->end()
            ->scalarNode('api_secret')
                ->isRequired()
                ->cannotBeEmpty()
            ->end()
          ->end()
        ;
        return $treeBuilder;
    }
}
```

Aquí indicamos que en el nodo "smsupapi" debe haber dos parámetros "api_id" y "api_secret" y que son obligatorios y no deben estar vacíos. Según esta configuración, si falta alguno de los parámetros symfony dará un error.

Luego debemos añadir unas líneas al archivo DependencyInjection/SmsupapiExtension.php para que se procese esa configuración, y hacemos que se inyecten los valores de los parámetros al servicio que habíamos creado.

```php

public function load(array $configs, ContainerBuilder $container)
{
    $processor = new Processor();
    $configuration = new Configuration();
    $config = $processor->processConfiguration($configuration, $configs);
    $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
    $loader->load('services.yml');
    $container->getDefinition('smsup.smsupapi.sender')
                ->addMethodCall('setApiid', array($config['api_id']));
    $container->getDefinition('smsup.smsupapi.sender')
                ->addMethodCall('setApisecret', array($config['api_secret']));
}
```

Para ello añadimos al servicio los setters correspondientes a la clase del nuestro servicio:

```php

protected $apiId;
protected $apiSecret;
public function setApiid($apiId)
{
  $this->apiId = $apiId;
}
public function setApisecret($apiSecret)
{
  $this->apiSecret = $apiSecret;
}
```

Inyectamos de esta forma los parámetros para evitar inyectar el container al servicio, ya que no vamos a necesitarlo para ninguna otra cosa.

# Añadimos la funcionalidad a nuestro servicio

Ahora vamos a añadir la funcionalidad que queremos que tenga a nuestro servicio. En este caso vamos a exponer 5 métodos públicos, que se corresponden con los métodos de la librería "smsuplib". Añadiremos algunos cambios para facilitar el paso de parámetros y la gestión del resultado de la petición.
SmsupSender.php quedaría así:

```php

  namespace smsup\SmsupapiBundle\Clases;
  use smsup\smsuplib;
class SmsupSender {
  protected $apiId;
  protected $apiSecret;
  public function setApiid($apiId)
  {
    $this->apiId = $apiId;
  }
  public function setApisecret($apiSecret)
  {
    $this->apiSecret = $apiSecret;
  }
  public function getNewSms()
  {
    return new Sms;
  }
  public function enviarSms(Sms $sms)
  {
    $lib = $this->getSmsapilib();
    $respuesta = $lib->NuevoSms($sms->getTexto(), $sms->getNumeros(), $sms->getFechaenvio(), $sms->getReferencia(), $sms->getRemitente());
    return $this->setResult($respuesta);
  }
  public function eliminarSms($idsms)
  {
    $lib = $this->getSmsapilib();
    $respuesta = $lib->EliminarSMS($idsms);
    return $this->setResult($respuesta);
  }
  public function estadoSms($idsms)
  {
    $lib = $this->getSmsapilib();
    $respuesta = $lib->EstadoSMS($idsms);
    return $this->setResult($respuesta);
  }
  public function creditosDisponibles()
  {
    $lib = $this->getSmsapilib();
    $respuesta = $lib->CreditosDisponibles();
    return $this->setResult($respuesta);
  }
  public function resultadoPeticion($referencia)
  {
    $lib = $this->getSmsapilib();
    $respuesta = $lib->ResultadoPeticion($referencia);
    return $this->setResult($respuesta);
  }
  private function getSmsapilib()
  {
    return new smsuplib($this->apiId, $this->apiSecret);
  }
  private function setResult($respuesta)
  {
    return new Result($respuesta['httpcode'], $respuesta['resultado']);
  }
}
```

Añadimos dos clases como ayuda:

# Sms.php

```php

namespace smsup\SmsupapiBundle\Clases;
class Result {
  protected $httpcode;
  protected $result;
  public function __construct ($httpcode, $result)
  {
    $this->httpcode = $httpcode;
    $this->result = $result;
  }
  public function getHttpcode()
  {
    return $this->httpcode;
  }
  public function getResult()
  {
    return $this->result;
  }
}

```

# Result.php

```php

namespace smsup\SmsupapiBundle\Clases;
class Result {
  protected $httpcode;
  protected $result;
  public function __construct ($httpcode, $result)
  {
    $this->httpcode = $httpcode;
    $this->result = $result;
  }
  public function getHttpcode()
  {
    return $this->httpcode;
  }
  public function getResult()
  {
    return $this->result;
  }
}
```

Ahora ya tenemos completada la primera versión de nuestro bundle, por lo que actualizamos el repositorio y vamos a crear la primera versión estable del mismo.

# Primera versión estable

Para definir una versión solo debemos añadir una etiqueta con la versión al repositorio y packagist se encarga del resto. La etiqueta debe tener el formato 'X.Y.Z' o 'vX.Y.Z' (también puede llevar un sufijo RC, beta, etc). En nuestro caso será la etiqueta "v1.0.0".
Hecho esto, ya está disponible una versión estable de nuestro bundle que puede instalarse de la siguiente forma:

```bash

composer require smsup/smsup-api-bundle
```

Podéis ver como quedan todos los archivos [en el repositorio](https://github.com/smsup/SmsupapiBundle).

Espero que resulte útil esta introducción a la creación de un bundle y quedo abierto a cualquier comentario o mejora que queráis hacer.
