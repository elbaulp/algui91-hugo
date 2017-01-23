---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
layout: post.amp
mainclass: android
url: /programacion-android-trabajar-con/
tags:
- android usar boton para ir a otra actividad
- android view setonclicklistener example
- curso android pdf
- startactivityforresult android example
title: "Programaci\xF3n Android: Trabajar con actividades y pasar par\xE1metros entre
  ellas"
---

En el primer capítulo, vimos como crear nuestro primer proyecto en Android, el conocido [Hola Mundo][1], en esta entrada, vamos a ver como crear varias [actividades][2] y cómo hacer que se pasen parámetros las unas a las otras.

El proyecto con este ejemplo está disponible para su descarga (Comentado paso a paso):

<a class="aligncenter download-button" href="https://elbauldelprogramador.com/capitulo2-intents-y-bundles/" rel="nofollow"> Download &ldquo;Capitulo2 Intents Y Bundles&rdquo; <small>capitulo2_intents_y_bundles.zip &ndash; Downloaded 1272 times &ndash; </small> </a>

Voy a explicar un poco por encima que hace cada fichero del proyecto:


<!--more--><!--ad-->

### ./res/layout/main.xml

```xml
< ?xml version="1.0" encoding="utf-8"?>
<linearlayout xmlns:android="http://schemas.android.com/apk/res/android" android:orientation="vertical" android:layout_width="fill_parent" android:layout_height="fill_parent">
<textview android:id="@+id/textView1" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/hello">
<button android:id="@+id/button1" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/cadena1">
</button><button android:id="@+id/button2" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/cadena2">
</button></textview></linearlayout>


```

En este layout principal vamos a añadir dos botones que nos servirán para lanzar las nuevas actividades que creemos después.

### ./res/layout/segunda_actividad.xml

```xml
< ?xml version="1.0" encoding="utf-8"?>
<linearlayout xmlns:android="http://schemas.android.com/apk/res/android" android:orientation="vertical" android:layout_width="fill_parent" android:layout_height="fill_parent">
<textview android:id="@+id/textView1" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/cadena1">
</textview><textview android:id="@+id/params" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/hello">
<button android:id="@+id/boton" android:layout_width="fill_parent" android:layout_height="wrap_content" android:text="@string/cadena1">
</button></textview></linearlayout>


```

Este layout vamos a usarlo para mostrar los parámetros que pasemos de una actividad a otra

### ./src/mainActivity.java

```java
package com.elbauldelprogramador.actividades;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;

public class mainActivity extends Activity {

   protected static final int REQUEST_CODE = 10;

   @Override
   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.main);

      // Capturamos los objetos gráficos que vamos a usar
      Button button1 = (Button) findViewById(R.id.button1);
      Button button2 = (Button) findViewById(R.id.button2);

      // Fijamos un evento onclick para el button1, cada vez que
      // lo pulsemos se llamará a este método (que abrirá una actividad)
      button1.setOnClickListener(new OnClickListener() {
         public void onClick(View v) {
            Intent intent = new Intent(mainActivity.this, Activity1.class);
            startActivity(intent);
         }
      });

      //button2 pasará parámetros a otra actividad, y los devolverá
      button2.setOnClickListener(new OnClickListener() {
         public void onClick(View v) {
            Intent intent = new Intent(mainActivity.this, ParametrosActivity.class);

            // damos valor al parámetro a pasar
            intent.putExtra("param1", "valor del parámetro 1 (viene de mainActivity)");
            /*
             * Inicia una actividad que devolverá un resultado cuando
             * haya terminado. Cuando la actividad termina, se llama al método
             * onActivityResult() con el requestCode dado.
             * El uso de un requestCode negativo es lo mismo que llamar a
             * startActivity(intent) (la actividad no se iniciará como una
             * sub-actividad).
             */
            startActivityForResult(intent, REQUEST_CODE);
         }
      });
   }

   /*
    * Éste método se llama cuando la actividad que iniciamos con un startActivityForResult
    * finaliza, dandi el REQUEST_CODE con el que llamó, el resultCode se devuelve, junto con
    * algunos datos adicionales, el resultCode será RESULT_CANCELED si la actividad devuelve
    * eso explícitamente, si no devuelve ningún resultado o si la operación finalizó de forma inesperada.
    */
   @Override
   protected void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      if (requestCode == REQUEST_CODE) {
         // cogemos el valor devuelto por la otra actividad
         String result = data.getStringExtra("result");
         // enseñamos al usuario el resultado
         Toast.makeText(this, "ParametrosActivity devolvió: " + result, Toast.LENGTH_LONG).show();
      }
   }
}


```

En esta clase vamos a modificar el comportamiento de los botones, añadiendoles listeners para cuando el usuario haga click en ellos.

Por último, vamos a crear otras dos actividades, la primera (./src/activity1.java), no va a hacer nada, solo mostrarse. La segunda (./src/ParametrosActivity.java), va a recibir un parámetro y devolver otro.

### ./src/activity1.java

```java
package com.elbauldelprogramador.actividades;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class Activity1 extends Activity {
   /** Called when the activity is first created. */
   @Override
   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.segunda_actividad);

      // Capturamos los objetos gráficos que vamos a usar
      TextView text = (TextView) findViewById(R.id.textView1);
      Button button = (Button) findViewById(R.id.boton);

      // Agregamos al textView un texto
      text.setText(R.string.cadena1);

      // Cambiamos el texto al botón
      button.setText(R.string.salir);

      // Evento onclick del botón, cuando se pulse, cerramos la actividad
      button.setOnClickListener(new OnClickListener() {
         public void onClick(View v) {
            finish();
         }
      });
   }
}



```

### ./src/ParametrosActivity.java

```java
package com.elbauldelprogramador.actividades;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class ParametrosActivity extends Activity {
   private static final int OK_RESULT_CODE = 1;
   @Override
   protected void onCreate(Bundle savedInstanceState) {
      // TODO Auto-generated method stub
      super.onCreate(savedInstanceState);
      setContentView(R.layout.segunda_actividad);

      // Capturamos los objetos gráficos que vamos a usar
      TextView text = (TextView) findViewById(R.id.textView1);
      Button button = (Button) findViewById(R.id.boton);
      TextView params = (TextView) findViewById(R.id.params);

      text.setText(R.string.cadena2);

      button.setText(R.string.salir);

      //Al pulsar el botón cerramos la ventana y volveremos a la anterior
      button.setOnClickListener(new OnClickListener() {
         public void onClick(View v) {
            //Cierra la actividad y la saca de la pila
            returnParams();
         }
      });

      // Mostramos los parámetros recibidos de la actividad mainActivity
      Bundle reicieveParams = getIntent().getExtras();
      params.setText(reicieveParams.getString("param1"));
   }

   protected void returnParams() {
      Intent intent = new Intent();
      intent.putExtra("result", "'Valor devuelto por ParametrosActivity'");
      setResult(OK_RESULT_CODE, intent);
      finish();
   }
}


```

* * *

#### Siguiente Tema: [Programación Android: Interfaz gráfica - Conceptos básicos][3]





 [1]: https://elbauldelprogramador.com/programacion-android-hola-mundo/
 [2]: https://elbauldelprogramador.com/fundamentos-programacion-android_17/
 [3]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica/
