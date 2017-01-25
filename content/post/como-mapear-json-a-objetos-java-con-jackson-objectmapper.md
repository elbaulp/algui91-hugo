---
author: alex
categories:
- java
color: '#D32F2F'
date: '2016-01-01'
lastmod: 2015-03-30

mainclass: java
url: /como-mapear-json-a-objetos-java-con-jackson-objectmapper/
tags:
- desserializar objetos json java
- ejemplo jackson json java
- fasterxml
- jackson
- jackson json example
- jackson json example java
- mapear json
- mapear objetos java
- objectmapper
- serializar objetos json java
title: "C\xF3mo mapear json a objetos Java con Jackson ObjectMapper"
---

Hoy vamos a hablar de cómo usar la librería *Jackson* para mapear fácilmente un *Json* a objetos Java.

## Declarar dependencia

El primer paso es declarar la dependencia en el proyecto, en éste caso usando *maven*, en el fichero `pom.xml` añadimos:

```xml
<dependency>
<groupid>com.fasterxml.jackson.core</groupid>
<artifactid>jackson-databind</artifactid>
<version>2.4.4</version>
</dependency>

```

Hecho esto, ya es posible usar la librería en el proyecto.

<!--more--><!--ad-->

## Introducción a Jackson

Veamos una guía de uso rápido de jackson. Para los siguientes ejemplos supondremos la siguiente clase:

```java
// Nota: Para atributos públicos, no es necesario usar getters y setters.
public class MiClase {
  public String nombre;
  public int edad;
  // Nota: Si los campos son private o protected, es obligatorio usar getters y setters.
  // Es recomendable crear el constructor por defecto
}

```

Supongamos también el siguiente json, almacenado en un fichero `mijson.json`:

```json
{
   "nombre":"Alicia",
   "edad":13
}

```

Es necesario crear un `ObjectMapper`, y lo típico es hacerlo estático para re-utilizarlo a lo largo de la aplicación. Un buen lugar para él sería un clase `Constant` y declarar el `ObjectMapper` así:

```java
public static final ObjectMapper JSON_MAPPER = new ObjectMapper();

```

### Json a Objeto Java (Des-Serializar)

Para des-serializar el `json` y crear el objeto en Java:

```java
MiClase objeto = JSON_MAPPER.readValue(new File("mijson.json", MiClase.class);
// o
MiClase objeto = JSON_MAPPER.readValue(new URL("http://ruta/a/mijson.json", MiClase.class);

```

### Objeto Java a Json (Serializar)

Para realizar el proceso inverso, basta con:

```java
JSON_MAPPER.writeValue(new File("mijson.json"), objeto);
// ó:
byte[] jsonBytes = JSON_MAPPER.writeValueAsBytes(objeto);
// ó:
String jsonString = JSON_MAPPER.writeValueAsString(objeto);

```

### Generalizar el tipo de objeto a des-serializar

Al trabajar con una [API][1], serializar y des-serializar objetos es una tarea común, una forma de generalizar el proceso puede ser la siguiente.

Supongamos que nuestra api devuelve arrays de objetos, por ejemplo una lista de Personas, una lista de productos etc. El modelo en Java sería el siguiente:

```java
public class Persona {

    private String Nombre;
    private String Apellidos;
    private int DNI;

    public Persona() {}

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getApellidos() {
        return Apellidos;
    }

    public void setApellidos(String Apellidos) {
        this.Apellidos = Apellidos;
    }

    public int getDNI() {
        return DNI;
    }

    public void setDNI(int DNI) {
        this.DNI = DNI;
    }
}

```

```java
public class Producto {
    private String Nombre;
    private String Modelo;
    private int precio;
    private float valoracion;

    public Producto() {}

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getModelo() {
        return Modelo;
    }

    public void setModelo(String Modelo) {
        this.Modelo = Modelo;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public float getValoracion() {
        return valoracion;
    }

    public void setValoracion(float valoracion) {
        this.valoracion = valoracion;
    }
}

```

Los arrays en json:

```json
// Personas
[
   {
      "Nombre":"Bob",
      "Apellidos":"BobBob",
      "DNI": 123456789
   },
   {
      "Nombre":"Alice",
      "Apellidos":"Alice",
      "DNI": 123456789
   },
   {
      "Nombre":"Foo",
      "Apellidos":"bar",
      "DNI": 123456789
   }
]
// Productos
[
   {
      "Nombre":"Tele",
      "Modelo":"modelo1",
      "Precio": 120,
      "Valoracion": 2.5
   },
   {
      "Nombre":"Tele2",
      "Modelo":"Modelo2",
      "Precio": 150,
      "Valoracion": 5
   },
   {
      "Nombre":"Tele3",
      "Modelo":"Modelo3",
      "Precio": 520,
      "Valoracion": 5
   }
]

```

Con estos datos, queremos des-serializar el `json` en un `ArrayList` del tipo de clase que sea, en éste caso `ArrayList<personas><producto>`. La forma **NO** genérica de hacerlo sería:

```java
ArrayList<persona> personas = JSON_MAPPER.readValue(new File("personas.json"),
                    JSON_MAPPER.getTypeFactory().constructCollectionType(ArrayList.class, Persona.class));

// Para productos

ArrayList</persona></producto><producto> productos = JSON_MAPPER.readValue(new File("productos.json"),
                    JSON_MAPPER.getTypeFactory().constructCollectionType(ArrayList.class, Producto.class));

```

Ahora bien, si tenemos más modelos, a parte de `Personas` y `Productos`, y normalmente, los `json` se obtienen mediante la *API*, vamos a repetir un montón de código. Podríamos crear un método genérico para mapear `json` a objetos java, como el siguiente:

```java
public static <t> List</t><t> getList(String url, Class</t><t> clazz) {

   HttpClient client = HttpClientBuilder.create().build();
   HttpGet getRequest = new HttpGet(url);
   getRequest.setHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON);

   List</t><t> data = null;

   HttpResponse response;
   try {
      response = client.execute(getRequest);
      data = Constants.JSON_MAPPER.readValue(response.getEntity().getContent(),
             JSON_MAPPER.getTypeFactory().constructCollectionType(ArrayList.class, clazz));
   } catch (IOException ex) {
      logger.error("Error retrieving  " + clazz.getName() + " " + ex.toString());
   }
   return data;
}

```

Éste método se usaría así:

```java
// Para personas
ArrayList<persona> personas = getList(URL DE LA API PARA OBTENER PERSONAS, Persona.class);
// Para productos
ArrayList</persona></t></producto><producto> personas = getList(URL DE LA API PARA OBTENER PRODUCTOS, Producto.class);

```

## Conclusión

La librería *Jackson* de *fasterXML* ofrece muchísimas más cosas de las vistas aquí. El uso de anotaciones por ejemplo permite ignorar ciertos valores de un modelo, no permitir nulos etc, para más información visita las referencias.

#### Referencias

*Jackson databind* »» <a href="https://github.com/FasterXML/jackson-databind/" target="_blank">github.com</a>



 [1]: https://elbauldelprogramador.com/buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/ "Buenas prácticas para el Diseño de una API RESTful Pragmática"


</producto></personas>
