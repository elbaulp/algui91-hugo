---
author: alex
categories:
- android
- how to
color: '#689F38'
date: '2016-01-01'
description: "Hace tiempo que habl\xE9 de c\xF3mo crear un adapter simple, y otro
  un poco m\xE1s personalizado en Android. En esta entrada se ver\xE1 c\xF3mo crear
  un adapter desde cero, con algunas funcionalidades m\xE1s."
image: 2012/09/principal1.png
lastmod: 2016-08-10
layout: post.amp
mainclass: android
url: /adapter-personalizado-en-android/
redirect_from: /how-to/adapter-personalizado-en-android/
tags:
- adapter android
- adapter getview android
- android checkbox style
- android lista con checkbox
- android listview con imagenes
- android listview example
- curso android pdf
- custom adapter
- list adapter
- "listview setlistadapter espa\xF1ol"
- manual android parcelable
- simple adapter android ejemplo
title: "C\xF3mo crear un adapter personalizado en Android"
---

Hace tiempo que hablé de cómo crear un [adapter simple][1], y [otro][2] un poco más personalizado en [Android][3].

En esta entrada se verá cómo crear un adapter desde cero, con algunas funcionalidades más.

Para este ejemplo, se necesita mostrar en un listview los siguientes datos:

- _Un CheckBox_
- _Dos TextView, uno para mostrar el título de una entrada, y otro para la fecha de publicación_
- _Un ImageView que mostrará un iconito de un calendario._

<!--more--><!--ad-->

Terminada, la aplicación de prueba debe quedar algo así:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" class="aligncenter  wp-image-964" title="principal" src="/img/2012/09/principal1.png" alt="adapter android" width="484px" height="807px"></amp-img>
</figure>

Antes de nada, hay que crear un [layout][4] que define cómo ha de verse cada fila del ListView:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<relativelayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/LinearLayout1"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="#999999"
    android:padding="2dp">

   <checkbox
       android:id="@+id/leido"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_centervertical="true"
       android:focusable="false"/>

   <textview
       android:id="@+id/tvTitulo"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_centervertical="true"
       android:layout_torightof="@id/leido"
       android:text="Titulo del post"
       android:textappearance="?android:attr/textAppearanceMedium" />

   <textview
       android:id="@+id/tvFecha_publicacion"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_alignparentright="true"
       android:layout_below="@+id/tvTitulo"
       android:paddingtop="10dp"
       android:text="25/05/2012"
       android:textappearance="?android:attr/textAppearanceSmall" />

   <imageview
       android:id="@+id/ivCalendar"
       android:layout_width="22dp"
       android:layout_height="22dp"
       android:layout_aligntop="@+id/tvFecha_publicacion"
       android:layout_margintop="10dp"
       android:layout_toleftof="@+id/tvFecha_publicacion"
       android:contentdescription="@string/imagen_content_description"
       android:src="@drawable/calendar" />
</relativelayout>
```

Creando así el aspecto deseado para cada línea del ListView:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="customrow" src="/img/2012/09/customrow1.png" alt="adapter android" width="307px" height="50px"></amp-img>
</figure>

El primer paso es crear una clase que representará los datos a almacenar:

```java
package com.example.adapter;

import android.os.Parcel;
import android.os.Parcelable;

public class PostData implements Parcelable {

    private String fecha_publicacion;
   private String titulo;
  private boolean leido;

  public PostData(String fecha, String equip, boolean checked) {
      this.fecha_publicacion = fecha;
     this.titulo = equip;
        this.leido = checked;

   }

    public PostData(Parcel in){
     this.titulo= in.readString();
       this.fecha_publicacion = in.readString();
       this.leido = in.readInt() == 1 ? true:false;
    }

   public void setFecha(String fecha) {
        this.fecha_publicacion = fecha;
 }

   public String getFecha() {
      return fecha_publicacion;
   }

   public void setChecked(boolean value) {
     this.leido = value;
 }

   public boolean getChecked() {
       return leido;
   }

   public String getEquipos() {
        return titulo;
  }

   public void setEquipos(String equipos) {
        this.titulo = equipos;
  }

   @Override
   public int describeContents() {
     return 0;
   }

   @Override
   public void writeToParcel(Parcel dest, int flags) {
     dest.writeString(getEquipos());
     dest.writeString(getFecha());
       dest.writeInt(getChecked() ? 1 : 0);
    }

   public static final Parcelable.Creator<postdata> CREATOR = new Parcelable.Creator</postdata><postdata>() {
     public PostData createFromParcel(Parcel in) {
           return new PostData(in);
        }

       public PostData[] newArray(int size) {
          return new PostData[size];
      }
   };
}
```

La razón por la que se implementa `Parcelable` se verá más adelante, el resto del código es sencillo, el constructor, y los getters y setters correspondientes a cada miembro de la clase.

Una vez definido el objeto con el que se va a trabajar, se creará otra clase extendiendo de `BaseAdapter`, que permite crear un adapter a medida.

El objetivo del adapter consiste en rellenar objetos `View` con los datos a mostrar. En este ejemplo, los datos son instancias de la clase `PostData`. Abajo se muestra la implementación del adapter y una explicación:

```java
package com.example.adapter;

import java.util.ArrayList;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.TextView;

import com.example.customadapter.R;

public class PostAdapter extends BaseAdapter
{

 static class ViewHolder
 {
       TextView tvFecha_pub;
       TextView tvtitulo_post;
     CheckBox cb;
    }

   private static final String TAG = "CustomAdapter";
  private static int convertViewCounter = 0;

  private ArrayList</postdata><postdata> data;
   private LayoutInflater inflater = null;

 public PostAdapter(Context c, ArrayList</postdata><postdata> d)
    {
       Log.v(TAG, "Constructing CustomAdapter");

       this.data = d;
      inflater = LayoutInflater.from(c);
  }

   @Override
   public int getCount()
   {
       Log.v(TAG, "in getCount()");
        return data.size();
 }

   @Override
   public Object getItem(int position)
 {
       Log.v(TAG, "in getItem() for position " + position);
        return data.get(position);
  }

   @Override
   public long getItemId(int position)
 {
       Log.v(TAG, "in getItemId() for position " + position);
      return position;
    }

   @Override
   public int getViewTypeCount()
   {
       Log.v(TAG, "in getViewTypeCount()");
        return 1;
   }

   @Override
   public int getItemViewType(int position)
    {
       Log.v(TAG, "in getItemViewType() for position " + position);
        return 0;
   }

   @Override
   public void notifyDataSetChanged()
  {
       super.notifyDataSetChanged();
   }

   @Override
   public View getView(int position, View convertView, ViewGroup parent)
   {

       ViewHolder holder;

      Log.v(TAG, "in getView for position " + position + ", convertView is "
              + ((convertView == null) ? "null" : "being recycled"));

     if (convertView == null)
        {
           convertView = inflater.inflate(R.layout.list_row_posts, null);

          convertViewCounter++;
            Log.v(TAG, convertViewCounter + " convertViews have been created");

            holder = new ViewHolder();

          holder.tvFecha_pub = (TextView) convertView
                 .findViewById(R.id.tvFecha_publicacion);
            holder.tvtitulo_post = (TextView) convertView
                   .findViewById(R.id.tvTitulo);
           holder.cb = (CheckBox) convertView.findViewById(R.id.leido);
            holder.cb.setOnClickListener(checkListener);

            convertView.setTag(holder);

     } else
          holder = (ViewHolder) convertView.getTag();

     // Para porde hacer click en el checkbox
        PostData d = (PostData) getItem(position);
      holder.cb.setTag(d);
        // Setting all values in listview
       holder.tvFecha_pub.setText(data.get(position).getFecha());
      holder.tvtitulo_post.setText(data.get(position).getEquipos());
      holder.cb.setChecked(data.get(position).getChecked());

      return convertView;
 }

   public void setCheck(int position)
  {
       PostData d = data.get(position);

        d.setChecked(!d.getChecked());
      notifyDataSetChanged();
 }

   public void checkAll(boolean state)
 {
       for (int i = 0; i < data.size(); i++)
           data.get(i).setChecked(state);
  }

   public void cancelSelectedPost()
    {

       int i = 0;
      while (i < getCount())
      {
           if (data.get(i).getChecked())
           {
               data.remove(data.indexOf(data.get(i)));
         } else
              i++;
        }
       notifyDataSetChanged();

 }

   public boolean haveSomethingSelected()
  {
       for (int i = 0; i < data.size(); i++)
           if (data.get(i).getChecked())
               return true;
        return false;
   }

   /**
  * Este método es para poder seleccionar una fila directamente con el
    * checkbox en lugar de tener que pulsar en la liste en sí
   */
 private OnClickListener checkListener = new OnClickListener()
   {

       @Override
       public void onClick(View v)
     {
           PostData d = (PostData) v.getTag();
         d.setChecked(!d.getChecked());
      }
   };
}
```

Al instanciar el adapter, en este caso `PostAdapter`, se guarda el `LayoutInflater`, útil para mejorar el rendimiento cuando se cree un objeto `View` para devolverlo al `ListView`. Cuando los datos vienen de forma externa al adapter, hay que pasarlos al constructor (`ArrayList d `). Terminando con el constructor, es costumbre guardar el contexto de la aplicación por si hiciera falta, aunque este no es el caso.

Algo muy recomendable que hay que crear al implementar un adapter, es un objeto al que por costumbre se suele llamar `ViewHolder`, destinado a retener los datos en los objetos `View`. Quizá parezca un poco abstracto, pero básicamente es como cachear los datos que ya se han creado y asociado a sus respectivas `Views` para mejorar el renderizado cuando se dibuje el `ListView`. Esta clase estática, deberá tener tantos miembros (y del mismo tipo) como `Views` tenga el layout creado más arriba. Es decir, si se añade otro CheckBox, en el `ViewHolder` deberá crearse también.

El funcionamiento interno del adapter es el siguiente; Cuando se establece un adaptador, ya sea con `setListAdapter()`, `Listview.setAdapter()` o cualquier otro, es el el propio objeto `View` (en este ejemplo un `ListView`) el que llama a los métodos del adapter para rellenarse con los datos correspondientes. Llama al método `getCount()` para saber el número de objetos a mostrar. También llama a `getViewTypeCount()` para determinar el número de Views distintas serán mostradas en la lista. En este caso, sólamente hay un tipo de vista, el layout definido al principio de la entrada, por eso éste método devuelve un 1. Si la lista mostrara un separador entre fila y fila, u otro tipo de dato que requiriera de un layout distinto, `getViewTypeCount()` debería devolver el número apropiado.

El método `getItemViewType(int position)` está íntimamente relacionado con el anterior, ya que gestiona qué tipo de View hay en una determinada posición, en este ejemplo solo hay una, luego devuelve un 0, si hubiera dos tipos de Views a representar, este método devolvería 0 ó 1 dependiendo del tipo de View en dicha posición, si hubiera 3, devolvería 0, 1 ó 2 (Es como si fuera un índice para identificar el tipo de View).

El método más importante es `getView()`, una vez que se ha determinado cuantos elementos hay disponibles, el ListView empieza a solicitar datos. Aquí es cuando entra en juego el `ViewHolder` y el reciclaje de Views. El ListView solo muestra tantas Views hijas como quepan en la pantalla, por tanto, si se disponen de 100 filas de datos a mostrar y en la pantalla solo se pueden mostrar 10, se llama a `getView()` 10 veces.

Es fácil de comprobar lo dicho en el parrafo anterior mirando el logcat durante la ejecución del programa. Al iniciarlo, se llama a `getView()` tantas veces como datos entren en la pantalla, conforme se desplaza el ListView para mostrar más datos también se llama a dicho método y llegará un momento en el que se empezará a reciclar los Views gracias al `ViewHolder` lo cual aumenta el rendimiendo de la aplicación.

El reciclaje de Views consiste en lo siguiente. Si `convertView` es un valor no nulo dentro de `getView()`, significa que el ListView está reusando el objeto View, evitanto inflar de nuevo el layout XML y hacer las llamadas a `findViewById()` para cada View de la fila, en este caso, dos TextView y un CheckBox. Al vincular el objeto `ViewHolder` a un View (con el método `setTag()`) se reciclará mucho más rápido la próxima vez que sea necesario mostrarla. Así, sólo hace falta recuperar el `ViewHolder` y asignarle los datos correspondientes al View.

Una vez explicado cómo funciona el adaptador voy a explicar en detalle lo que hacen algunas funciones y cómo resolver algunos problemas típicos. Que nombro a continuación:

* [Activar checkBox al pulsar en el propio checkbox o en una fila de la lista][6]
* [Mantener el estado de los checkBox al desplazar la lista][7]
* [Mantener el estado de los checkbox al girar la pantalla][8]

<a name="estadoCheckBox"></a>

# Activar checkBox al pulsar en una fila de la lista

El principal problema que hay cuando se añade un checkBox a un ListView, es que dicho CheckBox tiene la propiedad de requerir el foco, impidiento que el listView se comporte correctamente. La forma de solucionar este problema es tan sencilla como quitar el foco al CheckBox:

```xml
<checkbox
    android:id="@+id/leido"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_centervertical="true"
    android:focusable="false"/>
```

Es necesario hacer un cambio más, y es crear un evento on click y asociarlo al checkbox:

```java
private OnClickListener checkListener = new OnClickListener()
{

   @Override
   public void onClick(View v)
   {
      PostData d = (PostData) v.getTag();
      d.setChecked(!d.getChecked());
   }
};
```

Se asocia en el método `getView()`:

```java
holder.cb.setOnClickListener(checkListener);
```

De esta forma se puede hacer click tanto en el checkbox como en una fila de la lista.

<a name="desplazarLista"></a>

# Mantener el estado de los checkBox al desplazar la lista

Ahora se puede activar el checkbox de las dos formas mencionadas anteriormente, pero hay otro problema, si activamos algún checkbox y desplazamos la lista arriba o abajo, ocultando la fila activada, se pierde el estado del checkbox.

Este problema se debe a que no se está almacenando el estado del checkbox en los datos que maneja el adapter. Para resolverlo, se deben crear un conjunto de métodos que interactuen con los datos de la clase `PostData`, y que hagan uso de los getters y setters de dicha clase. En concreto son estos tres métodos, `setCheck()`, `checkAll()` y `cancelSelectecPost()`. Que se usan en los siguientes casos:

En el evento que se lanza al pulsar un elemento de la lista (`onListItemClick()`), se llama desde el adapter al método `setCheck()` así: `adapter.setCheck(position);` para que se actualize el valor del objeto `PostData` en esa posición, como se vio más arriba, PostData consta de tres miembros, dos strings y un booleano. Con lo cual, al pulsar en un elemento se actualiza el valor del booleano que representa el estado del checkbox. El código del método es el siguiente:

```java
public void setCheck(int position)
{
   PostData d = data.get(position);

   d.setChecked(!d.getChecked());
   notifyDataSetChanged();
}
```

Simplemente cambia el valor del booleano y notifica al ListView de que los datos han cambiado y debe actualizarse. `CheckAll()` es similar, activa o desactiva todos los checkBox dependiendo del parametro booleano que reciba. Y `cancelSelectedPost()` elimina del ListView los elementos con el checkbox activo.
<a name="SavedInstanceState"></a>

# Mantener el estado de los checkbox al girar la pantalla

Por último, hay otro problema a la hora de mantener los checkbox activados al girar la pantalla. Se debe a que cada vez que cambia la orientación del teléfono, la [activity][9] se crea de nuevo (se llama al método `onCreate()`).

Para mantener los datos se necesita hacer uso de `onSaveInstanceState`, el cual se llama justo antes de destruir la actividad, permietiendo guardar los datos para recuperarlos posteriormente desde `onRestoreInstanceState()` o `onCreate()`

Aquí es donde cobra sentido la implementación de <a href="http://developer.android.com/reference/android/os/Parcelable.html" target="_blank">Parcelable</a> de la clase PostData. Cuyo requisito es la implementación de dos métodos para escribir y leer los miembros del objeto PostData desde un `Parcel` y una clase interna llamada <a href="http://developer.android.com/reference/android/os/Parcelable.Creator.html" target="_blank">CREATOR</a>.

Una vez implementado estos métodos, se podrá guardar el estado de los datos así:

```java
@Override
protected void onSaveInstanceState(Bundle outState) {
   outState.putParcelableArrayList("savedData", data);
   super.onSaveInstanceState(outState);
}
```

y recuperarlos en `onCreate()`:

```java
@Override
public void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   //...
   if (savedInstanceState == null){
      data = new ArrayList</checkbox></postdata><postdata>();

      data.add(new PostData("19/09/2012", "Moborobo, herramienta de Administración Integrada para Android en el PC" , false));
      data.add(new PostData("23/09/2012", "Cómo crear shortcodes en WordPress que soporten parámetros" , false));
      data.add(new PostData("30/09/2012", "Todos los lugares donde deberías habilitar la Autenticación de Dos Factores ahora mismo" , false));
      data.add(new PostData("07/10/2012", "Ocultar archivos dentro de una imagen" , false));
      data.add(new PostData("21/10/2012", "Top 10 de las Mejores Herramientas en la Línea de Comandos" , false));
      data.add(new PostData("28/10/2012", "Enlaces de la semana ( II )" , false));
      data.add(new PostData("04/11/2012", "Nueva Guía: Your Guide to Google Analytics" , false));
      data.add(new PostData("11/11/2012", "Personalizar el Error 404 en wordpress" , false));
      data.add(new PostData("18/11/2012", "Humor gráfico – Informáticos, Programadores, geek… – 9GAG.COM Parte (III)" , false));
      data.add(new PostData("25/11/2012", "Basta con las Tablas Arcoiris: lo que necesitas saber sobre esquemas de contraseñas seguras" , false));

      adapter = new PostAdapter(MainActivity.this, data);
   } else {
      data = savedInstanceState.getParcelableArrayList("savedData");
      adapter = new PostAdapter(MainActivity.this, data);
   }
      setListAdapter(adapter);
}
```

Eso es todo, espero que haya sido una entrada de utilidad para los lectores, si tienes alguna duda o se te ocurre alguna otra forma de hacerlo, no dudes en dejar tu comentario.

# Referencias

- *Android: Checkable Linear Layout* »» <a href="http://tokudu.com/2010/android-checkable-linear-layout/" target="_blank">Visitar sitio</a>
- *Android ListView and ListActivity - Tutorial* »» <a href="http://www.vogella.com/articles/AndroidListView/article.html" target="_blank">Visitar sitio</a>
- *Saving state of ArrayList of custom objects* »» <a href="http://stackoverflow.com/questions/3469947/saving-state-of-arraylist-of-custom-objects" target="_blank">Visitar sitio</a>
- *AndroidBook* »» <a href="http://www.androidbook.com" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_28/
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica-2/
 [3]: https://elbauldelprogramador.com/curso-programacion-android/
 [4]: https://elbauldelprogramador.com/programacion-android-recursos-layout/
 [5]: https://elbauldelprogramador.com/img/2012/09/customrow1.png
 [6]: #estadoCheckBox
 [7]: #desplazarLista
 [8]: #SavedInstanceState
 [9]: https://elbauldelprogramador.com/fundamentos-programacion-android-ciclo/
