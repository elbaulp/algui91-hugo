---
author: alex
categories:
- administracion de servidores
color: '#0097A7'
date: '2016-09-25'
description: "Hoy vamos a hablar de c\xF3mo configurar un Balanceador de carga para
  un servidor. Veremos dos alternativas, configurarlo todo a mano, o desde un entorno
  cloud virtualizado, desde el panel de control de Arsys. Est\xE1 claro que, la segunda
  opci\xF3n, ser\xE1 mucho m\xE1s sencilla. A\xFAn as\xED, con la primera se aprender\xE1
  qu\xE9 est\xE1 pasando realmente por debajo."
layout: post.amp
mainclass: servidores
permalink: /como-configurar-un-balanceador-de-carga-en-entornos-cloud/
tags:
- balanceador de carga
- configurar load balancer nginx
- load balancers
title: "C\xF3mo configurar un balanceador de carga en entornos cloud"
---

Hoy vamos a hablar de cómo configurar un Balanceador de carga para un servidor. Veremos dos alternativas, configurarlo todo a mano, o desde un entorno cloud virtualizado, desde el panel de control de [Arsys][1]. Está claro que, la segunda opción, será mucho más sencilla. Aún así, con la primera se aprenderá qué está pasando realmente por debajo.

## Tecnologías a usar

Para configurar el load balancer a mano, usaremos nginx.

## Introducción

Balancear cargas a lo largo de múltiples instancias de aplicaciones es una técnica muy usada para optimizar la utilización de recursos, maximizar el rendimiento, reducir latencia, y asegurar tolerancia a fallos.

Nginx puede configurarse para hacer las veces de un balanceador de carga Http para distribuir el tráfico a varios servidores de aplicaciones.

<!--more--><!--ad-->

## Métodos de balanceo en nginx

  * *Round-Robin*: Las peticiones a los servidores se distribuyen al estilo round robin.
  * *least-connected*: La siguiente petición se asigna al servidor con menos conexiones activas.
  * *ip-hash*: Se usa una función hash para determinar el servidor al que debería enviarse la siguiente petición, basándose en la ip del cliente.

## Configuraciones por defecto

```bash
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}

```

En este ejemplo, hay 3 instancias de la misma aplicación. ejecutándose en srv1-srv3. Si no se especifíca ningún método de balanceo, se aplica round-robin. Todas las peticiones se redirigen al grupo de servidores `myapp1` y nginx se encarga de realizar el balanceo Http mediante round-robin.

### Balanceo Least Connected

En este método de balanceo, se permite controlar la carga que reciben los servidores. Nginx intentará no sobrecargar un servidor ocupado con demasiadas peticiones, enviándolas a los servidores menos ocupados.

Para activar este método, hay que añadir la directiva `least_conn`:

```bash
upstream myapp1 {
        least_conn;
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
}

```

## Balanceo ponderado

Si se quiere dar más ponderación, es posible usar el parámetro `weight` en los servidores, para asignarles más “peso” a la hora de tomar decisiones de balanceo:

```bash
upstream myapp1 {
        server srv1.example.com weight=3;
        server srv2.example.com;
        server srv3.example.com;
}

```

Con esta configuración, 5 peticiones nuevas se distribuirán de la siguiente forma: 3 a srv1, 1 a srv2 y 1 a srv3.

## Control de estado (Health checks)

Si un servidor falla, nginx lo marcará como en mal estado y evitará enviarle peticiones.

# Configurar el balanceo de carga en entornos cloud

Visto cómo crear el balanceo de carga a mano, ahora pasemos a administrar y crear de forma sencilla un sistema de balanceo. En este caso usando *Arsys*.

Para ello, en el panel de control hacemos click en *Red* » Balanceadores. Allí crearemos uno nuevo

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/03/Balanceadoresdecarga1.png" alt="Balanceadoresdecarga1" width="815px" height="531px" />

Donde se especifica el nombre, puertos y direcciones a usar.

El siguiente paso es elegir el tipo de Control de estado a realizar, y el método de balanceo (Round robin o least connections)

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/03/Balanceadoresdecarga2.png" alt="Balanceadoresdecarga2" width="812px" height="532px" />

Por último, se especifica la aplicación que será balanceada entre todos los servidores virtuales disponibles.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/03/Balanceadoresdecarga3.png" alt="Balanceadoresdecarga3" width="815px" height="529px" />

## Ventajas y desventajas

La opción de crear y configurar el balanceador a mano puede ser buena para aprender, pero a la larga, conforme las necesidades de la aplicación vayan aumentando será más y más tedioso. Sin embargo, con un entorno cloud, podremos crear, modificar y borrar servidores y balanceadores a golpe de click.

#### Referencias

*Nginx Docs* »» <a href="http://nginx.org/en/docs/http/load_balancing.html" target="_blank">nginx.org</a>



 [1]: http://www.arsys.es/servidores/cloud?utm_source=cooperation&utm;_medium=baul&utm;_term=balanceador&utm;_content=online&utm;_campaign=cloud