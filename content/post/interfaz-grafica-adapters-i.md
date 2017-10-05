---
author: alex
categories:
- android
- dev
mainclass: android
date: '2016-01-01'
lastmod: 2017-10-05T12:30:12+01:00
url: /programacion-android-interfaz-grafica_28/
tags:
- adapter android
- layout android
- menu android
title: "Programación Android: Interfaz gráfica - Adapters I"
---

Un objeto Adaptador actúa como puente entre un AdapterView y los datos de una Vista (View). El adaptador permite el acceso a los elementos de datos, éste también es responsable de crear una vista para cada elemento en la colección de datos.

Se puede decir, que los adaptadores son colecciones de datos, que asignamos a una vista para que ésta los muestre, por ejemplo, podemos crear un ArrayAdapter a partir de un array de string ya creado y con datos, y asignar este adaptador a un ListView, así, el ListView mostrará los datos del array.

<!--more--><!--ad-->

Mediante el uso de ***Adapters*** definimos una forma común de acceder a colecciones de datos.

Para que quede más claro este concepto, vamos a verlo mediante un ejemplo:

Primero creamos el layout, que va a contener un ListView con un Id ya definido por android, y un TextView también con un id ya definido.

```xml
<linearlayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical">

    <listview
        android:id="@android:id/list"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent">

        <textview
            android:id="@android:id/empty"
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"/>
    </listview>
</linearlayout>
```

Ahora, el código donde creamos el adaptador, y lo asociamos al ListView:

```java
package app.elbauldelprogramador.adapters;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

public class AdaptadoresActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        //Array que asociaremos al adaptador
        String[] array = new String[] {
              "Elemento 1"
             ,"Elemento 2"
             ,"Elemento 3"
             ,"Elemento 4"
             ,"Elemento 5"
             ,"Elemento 6"
        };

        //Creación del adaptador, vamos a escoger el layout
        //simple_list_item_1, que los mostr
        ListAdapter adaptador = new ArrayAdapter<string>(
              this, android.R.layout.simple_list_item_1, array);

        //Asociamos el adaptador a la vista.
        ListView lv = (ListView) findViewById(android.R.id.list);
        lv.setAdapter(adaptador);
    }
}
```

Como vemos, al crear el arrayAdapter, tenemos que pasar tres parámetros, el contexto, un layout que se usará para dibujar cada item (en este caso ***simple\_list\_item_1***, que ya viene definido por android), más adelante veremos como crear los nuestros propios, y como tercer parámetro la colección de datos.

Aprovechando que en la anterior [entrada hablamos de los eventos][1], voy a explicar como fijar un evento onclick para cada elemento de la lista.

```java
//Evento que se disparará al pulsar en un elemento de la lista
lv.setOnItemClickListener(new OnItemClickListener() {

   @Override
   public void onItemClick(AdapterView< ?> arg0, View arg1, int arg2,
      long arg3) {

      ListAdapter la = (ListAdapter) arg0.getAdapter();

      Toast.makeText(
         arg1.getContext()
         ,la.getItem(arg2).toString()
         ,Toast.LENGTH_LONG)
         .show();

   };
});

```

Para realizar este tipo de cosas, android proporciona una clase llamada ListActivity, este tipo de clase necesita que exista una vista con el id ya definido por Android ***@android:id/list*** y otra con el id *****@android:id/empty* (Tal y como lo definimos en nuestro layout), así, si el adaptador que le asiganamos a la lista no tiene datos, se mostrará al usuario la vista empty, el código quedaría de la siguiente manera:

```java
package app.elbauldelprogramador.adapters;

import android.app.ListActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

public class AdaptadoresActivity extends ListActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        //Array que asociaremos al adaptador
        String[] array = new String[] {
              "Elemento 1"
             ,"Elemento 2"
             ,"Elemento 3"
             ,"Elemento 4"
             ,"Elemento 5"
             ,"Elemento 6"
        };

        //Creación del adaptador, vamos a escoger el layout
        //simple_list_item_1, que los mostr
        ListAdapter adaptador = new ArrayAdapter<string>(
              this, android.R.layout.simple_list_item_1, array);

        //Asociamos el adaptador a la vista.
        ListView lv = (ListView) findViewById(android.R.id.list);
        lv.setAdapter(adaptador);

    }
    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
      super.onListItemClick(l, v, position, id);

      Toast.makeText(
            AdaptadoresActivity.this
            ,l.getItemAtPosition(position).toString()
            ,Toast.LENGTH_LONG)
            .show();
    }
}
```

El resultado de este código es el siguiente, para una adaptador con datos:

<figure>
    <amp-img sizes="(min-width: 480px) 480px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  alt="Adaptadores Android" title="Adaptadores Android" height="800" width="480" src="https://2.bp.blogspot.com/-p_QGLZLQNbY/TgojF5KyZKI/AAAAAAAAAqg/zUY-4oCbZhE/s800/Adaptadores.png"></amp-img>
</figure>

Y para un adaptador sin datos:

<figure>
    <amp-img sizes="(min-width: 480px) 480px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" height="800" width="480" src="https://2.bp.blogspot.com/-gB_egWAdpUc/TgojWE4FONI/AAAAAAAAAqo/fhfy9j6sQeE/s800/listaVacia.png"></amp-img>
</figure>

# Siguiente Tema: [Programación Android: Interfaz gráfica - Adapters II][2]

 [1]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_25/
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica-2/
