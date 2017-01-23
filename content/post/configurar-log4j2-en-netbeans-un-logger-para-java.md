---
author: alex
categories:
- java
color: '#D32F2F'
date: '2016-01-01'
description: "Log4j2 es un Logger para Java que descubr\xED hace poco y me gust\xF3
  bastante. En \xE9ste art\xEDculo veremos c\xF3mo instalar y configurar Log4j2 en
  Netbeans. Aunque el proceso es similar para cualquier IDE."
image: 2015/03/Configurar-el-logger-Log4j2-en-Netbeans1.png
lastmod: 2016-08-01
layout: post.amp
mainclass: java
permalink: /configurar-log4j2-en-netbeans-un-logger-para-java/
tags:
- configurar log4j2
- instalar log4j2
- logger para java
- loggers
- loggers en aplicaciones
title: Configurar Log4j2 en Netbeans, un logger para Java
---

*Log4j2* es un *Logger* para Java que descubrí hace poco y me gustó bastante. En éste artículo veremos cómo instalar y configurar Log4j2 en Netbeans. Aunque el proceso es similar para cualquier IDE.



## Requisitos

Asumiremos que el lector ya tiene Netbeans y Maven instalados y configurados en su máquina. Hay más instrucciones de instalación en la web de [Log4j2][1].

## Instalar Log4j2

En Netbeans, crearemos un nuevo proyecto Java con soporte para Maven (Nuevo Proyecto » Maven » Aplicación Java). Una vez hecho ésto, añadimos las siguientes dependencias en el fichero `pom.xml`:

<!--more--><!--ad-->

```xml
<dependencies>
    <dependency>
        <groupid>org.apache.logging.log4j</groupid>
        <artifactid>log4j-api</artifactid>
        <version>2.2</version>
    </dependency>
    <dependency>
        <groupid>org.apache.logging.log4j</groupid>
        <artifactid>log4j-core</artifactid>
        <version>2.2</version>
    </dependency>
</dependencies>
```

Hecho esto, en la carpeta *dependencias*, hacemos click derecho y damos a que descargue las dependencias declaradas.

## Anadir un fichero de configuración personalizado

Por defecto *Log4j2* ofrece un fichero de configuración, pero podemos modificarlo a nuestro gusto, para colorear la salida de los distintos niveles de log, y formatear la línea a nuestro gusto. En éste caso usaré el siguiente fichero `log4j2.json`:

```json
{
    "configuration":
            {
                "appenders": {
                    "RandomAccessFile": {
                        "name": "FILE",
                        "fileName": "app.log",
                        "PatternLayout": {
                            "pattern": "%d %p %c{1.} [%t] %m%n"
                        }
                    },
                    "Console": {
                        "name": "STDOUT",
                        "PatternLayout": {
                            "pattern": "%highlight{[%-5level] - [%t] - .%c{1}: %msg%n}"
                        }
                    }
                },
                "loggers": {
                    "root": {
                        "level": "all",
                        "AppenderRef": [
                            {
                                "ref": "STDOUT"
                            }
                        ]
                    }
                }
            }
}
```

En él, se especifica un fichero `app.log` en el que se almacenará el log con el formato `"%d %p %c{1.} [%t] %m%n"`. Y en la consola aparecerá con el siguiente formato: `"%highlight{[%-5level] - [%t] - .%c{1}: %msg%n}"` que como veremos, colorea el resultado en función del nivel del log. Más información acerca del fichero de configuración en la [web oficial][2].

El fichero `log4j2.json` hay que colocarlo en la carpeta `resources` del proyecto (`src/main/resources`).

Debido a que el fichero de configuración está en `json`, hay que añadir las siguientes dependencias al proyecto:

```xml
<dependency>
    <groupid>com.fasterxml.jackson.core</groupid>
    <artifactid>jackson-core</artifactid>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupid>com.fasterxml.jackson.core</groupid>
    <artifactid>jackson-databind</artifactid>
    <version>2.2.2</version>
</dependency>
```

## Ejemplo de uso

Crearemos una clase básica a modo de ejemplo:

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 *
 * @author Elbauldelprogramador.com
 */
public class EjemploLog4j2 {

    private static final Logger LOGGER = LogManager.getLogger(EjemploLog4j2.class);

    public static void main(String[] args) {
        LOGGER.trace("Log level trace");
        LOGGER.debug("Log level debug");
        LOGGER.info("Log level info");
        LOGGER.warn("Log level warn");
        LOGGER.error("Log level error");
        LOGGER.fatal("Log level fatal");
    }
}
```

Al compilar y ejecutar, deberían aparecer en la consola los mensajes de log coloreados, como se muestra en la imagen:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/03/Configurar-el-logger-Log4j2-en-Netbeans1.png" alt="Configurar Log4j2 en Netbeans1" width="364px" height="89px" />
</figure>

## Establecer un nivel de log por defecto en toda la aplicación

Cuando depuremos, será útil que aparezcan todos los niveles de log en la consola, desde *fatal* hasta *trace*. Pero en producción sería conveniente loggear únicamente eventos a un nivel determinado, por ejemplo, a partir de `warn`. Para ello podemos crear ésta función que encontré en [SO][3]:

```java
/**
 * Credit: http://stackoverflow.com/a/18409096/1612432
 *
 * @param l The log level to set
 */
public static void setLogLevel(Level l) {
    LOGGER.info("Setting log level to " + l.name());
    LoggerContext ctx = (LoggerContext) LogManager.getContext(false);
    Configuration conf = ctx.getConfiguration();
    conf.getLoggerConfig(LogManager.ROOT_LOGGER_NAME).setLevel(l);
    ctx.updateLoggers(conf);
}
```

Para establecer un nivel básta con llamar a la función así `setLogLevel(Level.ERROR)`. Con lo cual, sólo aparecerían los niveles `error` y `fatal`. La clase quedaría así:

```java
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;

/**
 *
 * @author Elbauldelprogramador.com
 */
public class EjemploLog4j2 {

    private static final Logger LOGGER = LogManager.getLogger(EjemploLog4j2.class);

    public static void main(String[] args) {
        setLogLevel(Level.ERROR);
        LOGGER.trace("Log level trace");
        LOGGER.debug("Log level debug");
        LOGGER.info("Log level info");
        LOGGER.warn("Log level warn");
        LOGGER.error("Log level error");
        LOGGER.fatal("Log level fatal");
    }

    /**
     * Credit: http://stackoverflow.com/a/18409096/1612432
     *
     * @param l The log level to set
     */
    public static void setLogLevel(Level l) {
        LOGGER.info("Setting log level to " + l.name());
        LoggerContext ctx = (LoggerContext) LogManager.getContext(false);
        Configuration conf = ctx.getConfiguration();
        conf.getLoggerConfig(LogManager.ROOT_LOGGER_NAME).setLevel(l);
        ctx.updateLoggers(conf);
    }
}
```

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/03/Configurar-el-logger-Log4j2-en-Netbeans2.png" alt="Configurar Log4j2 en Netbeans2" width="434px" height="49px" />
</figure>

 [1]: https://logging.apache.org/log4j/2.x/maven-artifacts.html
 [2]: http://logging.apache.org/log4j/2.0/manual/layouts.html
 [3]: http://stackoverflow.com/a/18409096/1612432