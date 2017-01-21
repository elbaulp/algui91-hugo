---
author: alex
categories:
- android
color: '#689F38'
layout: post.amp
mainclass: android
permalink: /restlib-libreria-para-realizar-peticiones-a-web-services-en-android/
tags:
- curso android pdf
- json
- libreria web services
- restlib
- web services android
- web services programacion
title: "Restlib - Librer\xEDa para realizar peticiones a Web Services en Android"
---

Trabajando con un compañero en una aplicación que hacía uso de web services, nos planteamos la posibilidad de crear un librería que nos facilitara el desarrollo en aplicaciones similares. Aunque hay muchas disponibles en la red decidimos crear la nuestra propia. Gran parte de la librería está desarrollada por mi compañero <a href="http://menudoproblema.es/" target="_blank">Vicente</a>, yo crontibuí poco.

En estos días de navidad he decidido crear una aplicación que sirva como ejemplo de uso de la librería, y de paso he ido puliendo algunos aspectos de la misma que, dicho sea de paso, aún es bastante básica.

Por ahora solo permite JSON.

En la aplicación de ejemplo he trabajado con dos Web Services, el de **freegeoip**, para obtener ubicaciones en base a la dirección ip; y el de la API JSON de **WordPress**.

Usando estos dos web services he querido proporcionar dos ejemplos, ambos son peticiones **GET**, la diferencia reside en que uno es con parámetros y el otro no.

Empezaré con **freegeoip**, al ser la más simple. El código para armar la petición es el siguiente:

<!--more--><!--ad-->

```java
RestRequest rq = new JSONRestRequest();
rq.setMethod(RestRequest.GET_METHOD);
rq.setURL("http://freegeoip.net/json/");

RestServiceTask task = new RestServiceTask(this, this, "Espere", "Obteniendo datos...");
task.execute(rq);

```

`rq` es el objeto necesario para construir la petición, en este caso irá en JSON. Las siguientes instrucciones establecen el típo de método a usar y la url del WebService, respectivamente. **RestServiceTask** se encarga de crear un <a href="http://developer.android.com/reference/android/os/AsyncTask.html" target="_blank">AsyncTask</a> para realizar la petición fuera del hilo principal de la aplicación.

En cada clase que se use la librería es necesario implementar la interfaz `AsyncTaskCompleteListener<restresponse>`, Por ejemplo:

```java
public class MainActivity extends Activity implements AsyncTaskCompleteListener</restresponse><restresponse>

```

Además, añadir el callback `onTaskComplete()`, que será llamado una vez obtengamos la respuesta del Web Service, la cabecera del método es la siguiente:

```java
@Override
    public void onTaskComplete(RestResponse result)

```

Para obtener la respuesta de la petición llamamos al método `getContent()` del objeto `result`, que devuelve un `HashMap<string>` con los pares **clave/valor** correspondientes a la respuesta en JSON.

Cuando hay que proporcionar parámetros a la consulta, se debe crear un objeto HashMap que contendrá las claves y valores necesarios. En el caso del segundo ejemplo, la llamada se realiza al Web Service de test que proporciona WordPress. Algunos de los parámetros que acepta, entre otros, son *pretty=true|false, default\_string=cadena, http\_envelope=true|false, url=url*

Así pues, para realizar la petición en este caso el código sería el siguiente:

```java
RestRequest apiWordpress = new JSONRestRequest();
apiWordpress.setMethod(RestRequest.GET_METHOD);
apiWordpress.setURL("https://public-api.wordpress.com/rest/v1/test/5");

HashMap</string><string> args = new HashMap</string><string>() {
   {
      put("pretty", "true");
      put("default_string", "Test App WS www.elbauldelprogramador.org");
      put("http_envelope", "true");
      put("url", "http://www.elbauldelprogramador.org");
   }
};

apiWordpress.setContent(args);

RestServiceTask task2 = new RestServiceTask(this, this, "Espere", "Obteniendo datos...");
task2.execute(apiWordpress);

```

A continuación escribo el código de la aplicación de ejemplo que he programado para Android, en las referencias habrá un enlace para descargar el proyecto.

```java
package com.elbauldelprogramador.webservicelibexample;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import thecocktaillab.restJsonLib.AsyncTaskCompleteListener;
import thecocktaillab.restJsonLib.JSONRestRequest;
import thecocktaillab.restJsonLib.RestRequest;
import thecocktaillab.restJsonLib.RestResponse;
import thecocktaillab.restJsonLib.RestServiceTask;

import java.util.HashMap;

public class MainActivity extends Activity implements AsyncTaskCompleteListener</string></restresponse><restresponse> {

    private TextView ciudadD;
    private TextView codRegD;
    private TextView nombreRegD;
    private TextView metroCodeD;
    private TextView zipD;
    private TextView longiD;
    private TextView paisD;
    private TextView codPaisD;
    private TextView ipD;
    private TextView latdD;
    private EditText wordpress;
    private boolean testingGeoIp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ciudadD     = (TextView) findViewById(R.id.ciudadD);
        codRegD     = (TextView) findViewById(R.id.codRedD);
        nombreRegD  = (TextView) findViewById(R.id.nombreRegD);
        metroCodeD  = (TextView) findViewById(R.id.metroCodeD);
        zipD        = (TextView) findViewById(R.id.zipD);
        longiD      = (TextView) findViewById(R.id.longiD);
        paisD       = (TextView) findViewById(R.id.paisD);
        codPaisD    = (TextView) findViewById(R.id.codPaisD);
        ipD         = (TextView) findViewById(R.id.ipD);
        latdD       = (TextView) findViewById(R.id.latD);
        wordpress   = (EditText) findViewById(R.id.wordpress);

    }

    public void onClickHandler(View target) {
        switch (target.getId()) {
            case R.id.testFreegeoip:

                testingGeoIp = true;

                RestRequest rq = new JSONRestRequest();
                rq.setMethod(RestRequest.GET_METHOD);
                rq.setURL("http://freegeoip.net/json/");

                RestServiceTask task = new RestServiceTask(this, this, "Espere", "Obteniendo datos...");
                task.execute(rq);
                break;

            case R.id.testWordpress:

                testingGeoIp = false;

                RestRequest apiWordpress = new JSONRestRequest();
                apiWordpress.setMethod(RestRequest.GET_METHOD);
                apiWordpress.setURL("https://public-api.wordpress.com/rest/v1/test/5");

                HashMap<string> args = new HashMap</string><string>() {
                    {
                        put("pretty", "true");
                        put("default_string", "Test App WS www.elbauldelprogramador.org");
                        put("http_envelope", "true");
                        put("url", "http://www.elbauldelprogramador.org");
                    }
                };

                apiWordpress.setContent(args);

                RestServiceTask task2 = new RestServiceTask(this, this, "Espere", "Obteniendo datos...");
                task2.execute(apiWordpress);
                break;

            default:
                break;
        }
    }

    @Override
    public void onTaskComplete(RestResponse result) {
        JSONObject r = new JSONObject(result.getContent());

        Toast.makeText(this, r.toString(), Toast.LENGTH_LONG).show();

        try {
            if (testingGeoIp) {
                ciudadD.setText(r.getString("city"));
                codRegD.setText(r.getString("region_code"));
                nombreRegD.setText(r.getString("region_name"));
                metroCodeD.setText(r.getString("metrocode"));
                zipD.setText(r.getString("zipcode"));
                longiD.setText(r.getString("longitude"));
                latdD.setText(r.getString("latitude"));
                codPaisD.setText(r.getString("country_code"));
                ipD.setText(r.getString("ip"));
                paisD.setText(r.getString("country_name"));
            }
            else {
                wordpress.setText(r.toString());
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

}

```

Es necesario agregar la librería al proyecto, para ello, descárgala, crea una carpeta en tu proyecto llamada **libs**. En eclipse; **clic derecho en dicha carpeta » import » File System**, selecciona la carpeta en la que se encuentra la librería y en la parte derecha selecciónala; pulsa finalizar. Luego, en las **propiedades del proyecto » Java Build Path » Libraries » Add JARs**. Ya está agregada al proyecto y lista para usar.

La aplicación de ejemplo debe quedar así:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/01/webservicelibexample2.png" alt="WebserviceLibExample" width="480px" height="800px" />][1]

Para finalizar, decir que la librería por ahora está muy limitada, pero es perfectamente funcional para realizar peticiones básicas. Intentaremos seguir desarrollandola cuando dispongamos de más tiempo.

#### Referencias

<a class="aligncenter download-button" href="https://elbauldelprogramador.com/" rel="nofollow"> Download &ldquo;WebserviceLibExample&rdquo; <small>WebserviceLibExample.zip &ndash; Downloaded 811 times &ndash; </small> </a>

*FreeGeoIp* »» <a href="http://freegeoip.net/static/index.html" target="_blank">Visitar sitio</a>
*developer.wordpress.com* »» <a href="http://developer.wordpress.com/docs/api/1/get/test/%24ID/" target="_blank">Visitar sitio</a>
*Descargar librería* »» <a href="https://github.com/Cocktails/Restlib/blob/master/restlib.jar" target="_blank">Visitar sitio</a>
*GitHub del proyecto* »» <a href="https://github.com/Cocktails/Restlib" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/img/2013/01/webservicelibexample2.png


</string></restresponse>
