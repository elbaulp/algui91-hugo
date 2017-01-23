---
author: alex
categories:
- javascript
color: '#0097A7'
date: '2016-01-01'
layout: post.amp
mainclass: servidores
permalink: /como-configurar-entornos-de-desarrollo-para-aplicaciones-moviles-en-un-servidor-cloud/
tags:
- api restfull nodejs
- crear api con nodejs
- crear base de datos mongodb
- tutorial express
title: "C\xF3mo configurar entornos de desarrollo para aplicaciones m\xF3viles en
  un servidor cloud"
---

En un [artículo anterior][1] se vió cómo crear una aplicación cliente/servidor que consistía en el desarrollo de un juego básico donde adivinar el número pensado por el oponente. Hoy veremos cómo crear una API RESTFul, la cual podrá ser consumida por una aplicación móvil, por ejemplo.

Para conseguir nuestro objetivo necesitaremos **Node.js**, **Express** y **mongodb**. Usaremos el servicio [cloudbuilder de Arsys][2].

La razón de usar un servicio cloud es muy sencilla, éstos entornos ofrecen la flexibilidad necesaria para escalar nuestra plataforma en cualquier momento, sin tener que embarcarnos nosotros mismos en instalar y configurar más servidores dedicados, y se paga en función de las horas de uso. A medida que los requisitos de nuestro sistema aumentan, es posible incrementar las capacidades de nuestros servidores únicamente desplazando una barrita que diga cuanta RAM más necesitamos, cuantos cores, cuantos servidores&#8230; Así de sencillo.

Otra ventaja viene dada a la hora de hacer pruebas, ya que se puede crear un entorno de prueba en minutos, sin necesidad de afectar al entorno estable.

<!--more--><!--ad-->

## Crear el servidor

### Crear el tipo de servidor

En éste caso, elegiremos un servidor con Debian 6, y una instalación base.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/1.-Creación-de-un-servidor-Cloud.png" alt="1. Creación de un servidor Cloud" width="817px" height="448px" />

### Configurar la capacidad del servidor

Para el ejemplo concreto, no necestiamos grandes recursos, así que fijaremos todo al mínimo.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/2.-Configuración-capacidad-servidor-Cloud.png" alt="2. Configuración capacidad servidor Cloud" width="817px" height="575px" />

### Establecer la contraseña de usuario

Por último, solo resta proporcionar una contraseña al usuario **root**.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/3.-Finalización-de-la-puesta-en-marcha-del-servidor-cloud.png" alt="3. Finalización de la puesta en marcha del servidor cloud" width="815px" height="581px" />

## Instalar Node.js

Descargamos el binario de su [página web][3], descomprimimos el fichero y listo. En linux estaría bien añadir la carpeta `bin` al `PATH` para que sea accesible desde cualquier lugar en la terminal.

## Descripción de la API

Para éste ejemplo, la API que vamos a crear será muy sencilla, consistirá en:

  * Manejo de operaciones CRUD para elementos en la base de datos
  * Dos URLs `http://example.com/api/articles` y `http://example.com/api/articles/:id_articulo`.
  * Se usarán los nombres convencionales HTTP (`GET` `POST`, `PUT` y `DELETE`).
  * Los datos se devolverán en formato JSON.

## Estructura del directorio de trabajo

Debido a la simplicidad de la API, gran parte del código, incluídas las rutas estarán en el fichero `server.js`. A medida que incrementa el tamaño del código, lo ideal es crear un fichero propio para las rutas. La estructura será la siguiente:

```bash
- app/
----- models/
---------- article.js  // Modelo para el artículo
- node_modules/        // Lo crea npm, mantiene las dependencias/paquetes
- package.json         // Dependencias de la aplicación
- server.js            // Configuración de la app y definición de rutas

```

## Definir los paquetes necesarios

En Node.js es necesario especificar los paquetes necesarios en el fichero `package.json`, los necesarios en éste caso son:

```json
{
  "name": "node-api",
  "main": "server.js",
  "dependencies": {
    "express": "~4.0.0",
    "mongoose": "~3.6.13",
    "body-parser": "~1.0.1"
  }
}

```

  * `express` es el framework de Node.
  * `mongoose` el ORM que usaremos para comunicarnos con la base de datos MongoDB.
  * `body-parser` permitirá extraer el contenido de las peticiones HTTP POST para poder hacer cosas como crear nuevos artículos.

## Instalar los paquetes Node

Tan simple como

```bash
$ npm install

```

en el directorio donde está `package.json`.

## Configurar el servidor

Para ello editaremos el fichero `server.js` con lo siguiente:

```javascript
// CONFIGURACIÓN BÁSICA
// =============================================================================

// Paquetes necesarios
var express    = require('express');        // Express
var app        = express();                 // Nuestra app usará Express
var bodyParser = require('body-parser');

// Configurar la app para que use bodyParser, como se mencionó arriba
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // Escuchará en el puerto 8080

// RUTAS PARA LA API
// =============================================================================
var router = express.Router();              // Obtener una instancia del router express

// Ruta de prueba para comprobar que todo funciona correcto (acceder con GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Hola desde la API!!' });
  });

  // El resto de rutas se escribirán aquí

  // Registrar rutas -------------------------------
  // Todas irán precedidas de /api
  app.use('/api', router);

  // INICIAR EL SERVIDOR
  // =============================================================================
  app.listen(port);
  console.log('La magia ocurre en el puerto ' + port);

```

## Iniciar el servidor

Basta con ejecutar:

```bash
$ node server.js

```

Deberá aparecer: `La magia ocurre en el puerto 8080`.

### Probar la API

Para comprobar que la API está funcionando correctamente, podemos usar `curl` y realizar una petición al servidor:

```bash
$ curl -X GET http://ip-servidor/api

```

Debería devolvernos `{ message: "Hola desde la API!!" }`

# Segundo ejemplo con base de datos MongoDB

Ahora que tenemos una aplicación sencilla, crearemos un modelo para la base de datos, que almacenará el nombre de un artículo y su precio. Pero antes de ello, suponiendo que ya tenemos instalado *MongoDB*, creamos la base de datos con los siguientes comandos (Dentro del shell de Mongo):

```bash
use articulosDB
switched to db articulosDB
j = { name : "Lampara", price: 10 }
{ "name" : "Lampara", "price" : 10 }
 db.articulos.insert(j)

```

Tras esto, tenemos la base de datos creada con un elemento. Pasemos a crear la conexión entre la base de datos y Node.

## Conectar MongoDB con Node.js

Al tener creada la base de datos, podemos conectarnos a ella mediante una URI, con el siguiente formato

```bash
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

en nuestro caso, el código a añadir en el fichero `server.js` sería:

```bash
// ..
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017//articulosDB');
// ..

```

## Crear el modelo para la base de datos

Consiste en representar los datos almacenados en la base de datos, para nuestro caso, será:

```javascript
// app/models/article.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    name: String,
    cost: Number
});

module.exports = mongoose.model('Article', ArticleSchema);

```

Solo resta añadir el modelo al fichero `server.js` con

```javascript
var Article = requiere('./app/models/article')
```

A partir de ahora, la aplicación está lista para interactuar con la base de datos. Pasemos a escribir el resto de rutas para la API.

## Router Express y rutas

Una breve descripción de lo que se usará:

|           Ruta            | Verbo HTTP |              Descripción               |
|:-------------------------:|:----------:|:--------------------------------------:|
|       /api/articles       |   `GET`    |      Devolver todos los artículos      |
|       /api/articles       |   `POST`   |           Crear un artículo            |
| /api/articles/:article_id |   `GET`    |  Obtener artículo con ID especificado  |
| /api/articles/:article_id |   `PUT`    | Modificar artículo con ID especificado |
| /api/articles/:article_id |  `DELETE`  | Eliminar artículo con ID especificado  |

## Middleware para las rutas

Para registrar todo lo que pasa en la API, estableceremos un *Middleware* por el que pasarán todas las peticiones antes de ser procesadas.

```javascript
router.use(function(req, res, next) {
  console.log('Recibida peticion de ' +  req.ip);
  next(); // make sure we go to the next routes and don't stop here
});

```

`next()` es necesario para indicar que la aplicación deberá continuar procesando otras rutas, de no añadirlo, la aplicación se dentendría ahí.

Empezaremos creando las rutas que para devolver todos los artículos de la base de datos y para crear un artículo nuevo. Ambas se realizarán sobre la ruta `/api/articles`. Empezaremos con crear artículos.

### Crear un artículo

Para ello, necesitamos poder gestionar peticiones `POST`:

```javascript
router.route('/articles')

  // create an article (accessed at POST http://localhost:8080/api/articles)
  .post(function(req, res) {
      var article = new Article(); // create a new instance of the Article model
      article.name = req.body.name; // set the articles name (comes from the request)
      article.cost = req.body.cost;

      // save the article and check for errors
      article.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Article created!'
        });
      });
  });

```

Para probrala, basta con enviar una petición `POST`, con `curl` por ejemplo:

```bash
$ curl -H "Content-Type: application/json" -d '{"name":"Articulo1",  "cost":100}' -X POST http://ip.servidor:8080/api/articles

{"message":"Article created!"}

```

### Obtener todos los artículos

En la misma ruta que antes, pero ahora usando el método `GET`, devolveremos al cliente todos los artículos existentes en la base de datos.

```javascript
.get(function(req, res) {
    Article.find(function(err, articles) {

      if (err)
        res.send(err);
      if (articles == '')
        res.json({
          message: 'There is no data!'
        });

      res.json(articles);
    });
  });

```

Para probarla, enviamos una petición `GET` a la misma ruta (`/api/articles`):

```json
curl -X GET http://ip.servidor:8080/api/articles/ | python -mjson.tool
[
    {
        "__v": 0,
        "_id": "54a90d91548e4fd207000002",
        "cost": 1.99,
        "name": "Lamp"
    },
    {
        "__v": 0,
        "_id": "54aa901312bf8f4207000001",
        "cost": 100,
        "name": "Articulo1"
    }
]

```

## Crear rutas para elementos individuales

Hasta ahora, se han manejado el grupo de rutas acabado en `/articles`. A continuación crearemos las rutas para manejar peticiones que contengan parámetros, como el identificador de artículo. Serán de la forma `/articles/:article_id` y harán cosas como:

  * Obtener un artículo por ID.
  * Actualizar los datos de un artículo.
  * Eliminar un artículo.

### Obtener un único artículo

Se añadirá otra ruta que maneje las peticiones con el parámetro `:article_id`:

```javascript
router.route('/articles/:article_id')
   .get(function(req, res) {
    Article.findById(req.params.article_id, function(err, article) {
      if (err)
        res.send(err);
      res.json(article);
    });
  });

```

Y para probralo, podemos escoger alguno de los ids devueltos en la consulta anterior, por ejemplo `54aa901312bf8f4207000001`:

```bash
curl -X GET http://ip.servidor:8080/api/articles/54aa901312bf8f4207000001 | python -mjson.tool
{
    "__v": 0,
    "_id": "54aa901312bf8f4207000001",
    "cost": 100,
    "name": "Articulo1"
}

```

### Actualizar datos de un artículo

Para ello, necesitamos añadir el método `PUT`:

```javascript
.put(function(req, res) {

  // use our article model to find the article we want
  Article.findById(req.params.article_id, function(err, article) {

    if (err)
      res.send(err);

    article.name = req.body.name; // update the articles info
    article.cost = req.body.cost;

    // save the article
    article.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Article updated!'
      });
    });

  });
})

```

Una vez ejecutando, es posible actualizar los datos de un artículo proporcionando su ID, usaremos el mismo de antes:

```bash
curl -H "Content-Type: application/json" -d '{"name":"Articulo Modificado",  "cost":5.90}' -X PUT http://ip.servidor:8080/api/articles/54aa901312bf8f4207000001 | python -mjson.tool
{
    "message": "Article updated!"
}

```

### Eliminar un artículo

Por último, falta crear el método `DELETE` para eliminar artículos de la base de datos:

```javascript
.delete(function(req, res) {
  Article.remove({
    _id: req.params.article_id
  }, function(err, article) {
    if (err)
      res.send(err);

    res.json({
      message: 'Successfully deleted'
    });
  });
});

```

Borremos el elemento con el ID usado hasta ahora:

```bash
curl -X DELETE http://ip.servidor:8080/api/articles/54aa901312bf8f4207000001 | python -mjson.tool
{
    "message": "Successfully deleted"
}


```

## Conclusión

Queda bastante claro lo sencillo que es crear una API RESTful con *Node.js* y espero que el lector haya disfrutado del artículo. A continuación dejo el código completo del fichero `server.js`:

# Código completo

```javascript
// Thanks to https://scotch.io/tutorials/build-a-restful-api-using-node-and-expre

// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var Article = require('./app/models/article');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/articlesDb'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Recibida peticion de ' +  req.ip);
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!\n\n'
  });
});

// more routes for our API will happen here
// on routes that end in /articles
// ----------------------------------------------------
router.route('/articles')

  // create an article (accessed at POST http://localhost:8080/api/articles)
  .post(function(req, res) {
      var article = new Article(); // create a new instance of the Article model
      article.name = req.body.name; // set the articles name (comes from the request)
      article.cost = req.body.cost;

      // save the article and check for errors
      article.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Article created!'
        });
      });
  })
  // get all the articles (accessed at GET http://localhost:8080/api/articles)
  .get(function(req, res) {
    Article.find(function(err, articles) {

      if (err)
        res.send(err);
      if (articles == '')
        res.json({
          message: 'There is no data!'
        });

      res.json(articles);
    });
  });

// on routes that end in /articles/:article_id
// ----------------------------------------------------
router.route('/articles/:article_id')

  // get the article with that id (accessed at GET http://localhost:8080/api/articles/:article_id)
  .get(function(req, res) {
    Article.findById(req.params.article_id, function(err, article) {
      if (err)
        res.send(err);
      res.json(article);
    });
  })
  // update the article with this id (accessed at PUT http://localhost:8080/api/articles/:article_id)
  .put(function(req, res) {

    // use our article model to find the article we want
    Article.findById(req.params.article_id, function(err, article) {

      if (err)
        res.send(err);

      article.name = req.body.name; // update the articles info
      article.cost = req.body.cost;

      // save the article
      article.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Article updated!'
        });
      });

    });
  })
  // delete the article with this id (accessed at DELETE http://localhost:8080/api/articles/:article_id)
  .delete(function(req, res) {
    Article.remove({
      _id: req.params.article_id
    }, function(err, article) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

// REGISTER OUR ROUTES ----------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

```

#### Referencias

*scotch.io* »» <a href="https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4" target="_blank">Build a RESTful API Using Node and Express 4</a>



 [1]: https://elbauldelprogramador.com/como-desarrollar-aplicaciones-en-un-servidor-cloud-2/ "Cómo desarrollar aplicaciones en un servidor Cloud"
 [2]: http://www.arsys.es/cloud/cloudbuilder/?utm_source=cooperation&utm;_medium=baul&utm;_term=appmovil&utm;_content=online&utm;_campaign=cloud "Arsys cloudbuilder"
 [3]: http://nodejs.org/download/