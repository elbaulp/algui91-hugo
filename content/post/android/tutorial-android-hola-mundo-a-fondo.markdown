---
author: alex
amp:
  elements: [amp-youtube]
categories: android
color: '#689F38'
date: 2016-01-11 07:16:24
description: "En el art\xEDculo anterior se dieron unas nociones b\xE1sicas de Android,
  sus compoenentes principales etc. En este art\xEDculo examinaremos a fondo una aplicaci\xF3n
  muy simple. Se componone de dos pantallas, en una de ellas se pide al usuario que
  introduzca un texto, dicho texto se enviar\xE1 a otra pantalla."
image: android/layouthelloworldandroid.png
layout: post.amp
mainclass: android
modified: null
tags:
- Curso de Android
- "programaci\xF3n Android"
- tutoriales Android
- hola mundo Android
- fragments Android
title: Tutorial Android - Hola Mundo a Fondo
---

<figure>
  <a href="/img/2014/01/iconoAndroid.png"><amp-img layout="responsive" src="/img/2014/01/iconoAndroid.png" title="{{ page.title }}" alt="{{ page.title }}" /></a>
</figure>

En el [artículo anterior](/android/conceptos-basicos/) se dieron unas nociones básicas de Android, sus componentes principales etc. En este artículo examinaremos a fondo una aplicación muy simple. Se componone de dos pantallas, en una de ellas se pide al usuario que introduzca un texto, dicho texto se enviará a otra pantalla. He aquí el resultado:

<amp-youtube
    data-videoid="WZLHJ9kuYQE"
    layout="responsive"
    width="480" height="270"></amp-youtube>

<!--more--><!--ad-->

# Creación de las pantallas en Android

## Pantalla principal

Empezaremos creando la primera pantalla que verá el usuario al acceder a la aplicación. En este caso consiste en una caja de texto (_EditText_) y un botón:

```xml

<!-- ./layout/activity_hello_world_main -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:paddingBottom="@dimen/activity_vertical_margin"
              android:paddingLeft="@dimen/activity_horizontal_margin"
              android:paddingRight="@dimen/activity_horizontal_margin"
              android:paddingTop="@dimen/activity_vertical_margin"
              tools:context=".MainActivity">
  <EditText
          android:id="@+id/edit_message"
          android:layout_width="0dip"
          android:layout_height="wrap_content"
          android:layout_weight="1"
          android:hint="@string/edit_message"/>

  <Button
          android:id="@+id/send_button"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/button_send"/>
</LinearLayout>

```

Un `LinearLayout` especifica cómo se ordenarán las vistas que hay dentro de él. Hay dos tipos, vertical u horizontal. Si no se especifica nada por defecto es horizontal, lo cual significa que se irán colocando las vistas una debajo de otra. En nuestro caso, el _EditText_ estará colocado encima del botón.

`android:layout_weight="1"` especifica el peso que tiene esta vista (La cantidad de espacio que debería ocupar).

El valor es relativo al espacio ocupado por las vistas hermanas. Por ejemplo, una vista con un peso de 2 y otra de 1. La suma es 3, la primera vista ocupará 2/3 del espacio libre y la segunda el resto. Si añadimos otra vista con peso 1, ahora la suma es 4 y la primera estará ocupando 1/2 (2/4) del espacio restante, y las otras dos 1/4.

Si dejamos todos los valores por defecto y especificamos un valor != 0 en una vista, dicha vista ocupará todo el espacio restante.

Si usamos `weight`, hay que poner un `width` de 0dip para mejorar el rendimiento, ya que no es necesario calcular éste valor.

El resultado de este `layout` es:

<figure>
  <a href="/img/android/layouthelloworldandroid.png"><amp-img layout="responsive" src="/img/android/layouthelloworldandroid.png" title="{{ page.title }}" alt="{{ page.title }}" /></a>
</figure>

## Segunda pantalla

A esta pantalla se enviará el mensaje escrito en la anterior. Se define con el siguiente código:

```xml

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingBottom="@dimen/activity_vertical_margin"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                tools:context=".DisplayMessageActivity">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/hello_world"/>

</RelativeLayout>

```

Es más simple que la anterior, simplemente tiene un `TextView` que será usado para mostrar el texto recibido. Para saber más sobre cómo trabajar con `layouts` puedes visitar el artículo [interfaz gráfica - layouts](/programacion-android-interfaz-grafica_23/ "Programación Android: Interfaz gráfica – Layouts").

# Implementación de la lógica de las pantallas

## Código fuente para la pantalla principal

Veamos ahora cómo implementar el funcionamiento de la pantalla principal. Al crear el proyecto también se crea un fichero .java de nombre _MainActivity_ en la mayoría de los casos. Aquí se ha cambiado el nombre por _HelloWorldMain_, con el siguiente código:

```java

public class HelloWorldMain extends Fragment {

    public final static String EXTRA_MESSAGE = "com.tutorial.holamundo.MESSAGE";

    private Button mButton;

    private OnClickListener mOnClickListener;

    public static HelloWorldMain newInstance() {
        HelloWorldMain fragment = new HelloWorldMain();

        return fragment;
    }

    public HelloWorldMain() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        // Especificamos qué interfaz vamos a usar, el xml corresponde al visto más arriba
        final View root = inflater.inflate(R.layout.activity_hello_world_main, container, false);

        // Obtenemos una referencia al botón para poder usarlo
        mButton = (Button) root.findViewById(R.id.send_button);

        // Implementamos el OnClickListener para definir qué se
        // hará al pulsar la vista asociada a este listener
        mOnClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
                /**
                 * Un intent proporciona una forma de enlazar componentes separados. Representa
                 * la intención de una aplicación de hacer algo. Pueden usarse
                 * para muchas cosas, entre ellas para lanzar otra activity.
                 */
                // Los parámetros son el contexto y la activity a lanzar.
                Intent intent = new Intent(view.getContext(), DisplayMessageActivity.class);

                /**
                 * Obtenemos una referencia del EditText declarado en XML.
                 * findViewById devuelve un objeto View, por tanto es necesario
                 * realizar un casting al tipo de vista que nos interesa.
                 */
                EditText editText = (EditText) root.findViewById(R.id.edit_message);
                // Obtener el valor introducido por el usuario
                String message = editText.getText().toString();
                /**
                 * Los intent pueden llevar información consigo, para que el
                 * componente que los reciba pueda usala. En este caso al intent
                 * le adjuntaremos el mensaje escrito en el edittext. El primer
                 * argurmento es el nombre que identificará al mensaje adjunto,
                 * así el otro componente podrá obtenerlo y usarlo.
                 */
                intent.putExtra(EXTRA_MESSAGE, message);
                // lanzamos la actividad
                startActivity(intent);
            }
        };

        // Establecer el evento onClickListener al botón.
        mButton.setOnClickListener(mOnClickListener);

        return root;
    }
}

```

Lo que vemos en la declaración de una clase, que hereda de _Fragment_. Los _Fragments_ son un concepto introducido en Android 3 que pretendía modularizar aún más una pantalla (_Activity_). El obetivo es poder reutilzar más código. Si en una pantalla, supongamos, disponemos de dos botones abajo (Aceptar, Cancelar) y dichos botones queremos reutilzarlos a lo largo de muchas pantallas, bastaría con crearlos en un _Fragment_. De usar una _Activity_  sería necesario copiar y pegar el código de ambos botones en todas y cada una de las pantallas en las que quisieremos los botones.

Se definen unos cuantos atributos de la clase, (Un botón, un `onClickListener` y un identificador para el mensaje a enviar). El único método obligatorio de implementar en un _Fragment_ es `onCreateView`, en él se define la interfaz gráfica del _Fragment_ y se inicializan los componenetes. El funcionamiento está explicado en los comentarios del código.

Una vez se pulse el botón, se lanzará la segunda pantalla, veamos qué hace.

## Código fuente de la segunda pantalla

```java

/**
 * Clase que hereda de la clase Activity, por lo cual dispondrá de
 * interfaz de usuario. Al crear una Activity, Android invoca a una serie de
 * métodos, entre ellos <i>oncreate()</i>. El ciclo de vida de una activity se
 * puede ver en <a href="http://developer.android.com/reference/android/app/Activity.html#ActivityLifecycle">Activity
 * Lifecycle</a>
 *
 * @author Alejandro Alcalde
 * @see http://developer.android.com/reference/android/app/Activity.html#ActivityLifecycle
 */
public class DisplayMessageActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /**
         * Toda Activity se invoca mediante un intent, independientemente de
         * cómo el usuario haya llegado hasta ella. Se puede obtener el intent
         * con el método getIntent() y obtener la información adjunta.
         */
        Intent intent = getIntent();
        String message = intent.getStringExtra(HelloWorldMain.EXTRA_MESSAGE);

        /**
         * En esta ocasión, vamos a ver cómo crear la interfaz desde código en
         * lugar de XML. Para ello declaramos un TextView que mostrará el
         * mensaje y lo añadiremos a la raiz de la activity con
         * setContentView().
         */
        TextView textView = new TextView(this);
        textView.setTextSize(40);
        textView.setText(message);

        // Establecer el TextView como interfaz de la actividad
        setContentView(textView);
    }
}

```

En este caso, en lugar de un _Fragment_ tenemos una _Activity_. Como vemos, se recupera la información enviada desde la primera pantalla usando el identificador que le asociamos (*EXTRA_MESSAGE*. Luego, en vez de establecer la interfaz gráfica mediante un fichero XML, se realiza mediante programación, por lo tanto, el XML de la segunda pantalla que vimos arriba no se usa. Aunque es posible implementar la interfaz desde código se recomienda hacerlo desde XML siempre que sea posible.

Esto es todo, solo resta ver el *AndroidManifest*, el fichero que recoge todas las propiedades de una apliación en android:

# El AndroidManifest

```xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="es.tformacion.helloworld">

    <application android:allowBackup="true"
                 android:label="@string/app_name">
        <activity
                android:theme="@android:style/Theme.Holo.Light"
                android:name="es.tformacion.helloworld.HelloWorldMain"
                android:label="@string/app_name">

            <intent-filter>
                <action android:name="es.tformacion.helloworld.HelloWorldMain"/>
                <category android:name="android.intent.category.DEFAULT"/>
            </intent-filter>

        </activity>

        <activity
                android:theme="@android:style/Theme.Holo.Light"
                android:name="es.tformacion.helloworld.DisplayMessageActivity"
                android:label="@string/app_name">
        </activity>
    </application>

</manifest>

```

En este fichero se definen las pantallas que la aplicación va a usar, así como los permisos que necesita (En este caso ninguno).

El código de este artículo podéis encontrarlo en el repositorio de [Github Curso de Android](https://github.com/algui91/CursoAndroid/tree/master/Ejemplos/MainApp/helloworld "Curso de  Android repositorio")
{: .notice-info }
