---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
layout: post.amp
mainclass: android
url: /programacion-android-interfaz-grafica_25/
tags:
- adapter android
- "android dise\xF1ar gui"
- como hacer interfaces graficas en android
- curso android pdf
- definicion del metodo setonitemclicklistener
- interfaces de usuario android
- interfaz grafica en android
- layout android
- menu android
title: "Programaci\xF3n Android: Interfaz gr\xE1fica - Componentes gr\xE1ficos y Eventos"
---

[Ya hemos visto][1] que todos los componentes visuales descienden del objeto View, que proporciona una interfaz para que podemos interactuar con ellos.

Para que nuestras aplicaciones sean funcionales, necesitamos responder a los eventos que el usuario dispare al interactuar con nuestro programa, en Android, esto se consigue mediante los ***Listeners***, que serán llamados cada vez que se produzca un evento.


<!--more--><!--ad-->

Por ejemplo, un listener muy común será ***setOnClickListener()***, que responderá cada vez que se pulse sobre la vista a la que se lo aplicamos, como un botón, o una imágen. Hay muchos tipos de listener, ***setOnKeyListener()*** (Para eventos de teclado), ***setOnItemClicklistener()*** (Para eventos al seleccionar un elemento de una lista) etc etc.

[En los ejemplos mostrados hasta ahora][2], solo hemos visto objetos de tipo **TexView**, vamos a ver unos cuantos más (En cada ejemplo pondré la definición XML del objeto, y su manipulación mediante código):

### Button

Botones simples, para realizar acciones al pulsar sobre ellos.

```xml
<button android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Púlsame" android:layout_centerinparent="true" android:id="@+id/button1">

```

```java
//Recoger el botón en una variable para usarlo
        final Button button1 = (Button) findViewById(R.id.button1);

        button1.setOnClickListener(new OnClickListener() {

         @Override
         public void onClick(View arg0) {
            Toast.makeText(
                  button1.getContext()
                  , "Me has pulsado " + ++contador + " veces."
                  , Toast.LENGTH_SHORT)
                  .show();
         }
      });

```

En este caso, hemos declarado una variable como miembro de la clase, (***public int contador = 0;***), para que cada vez que pulsemos el botón nos salga un mensaje con el número de veces que lo hemos pulsado:

<div class="separator" >
<a href="https://2.bp.blogspot.com/-PjwBUdkujQ8/TgTXxxpUc7I/AAAAAAAAAqA/8Kp4-XQJOF4/s1600/botnoes.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  alt="Evento onClick botón" title="Evento onClick botón" height="400" width="244" src="https://2.bp.blogspot.com/-PjwBUdkujQ8/TgTXxxpUc7I/AAAAAAAAAqA/8Kp4-XQJOF4/s400/botnoes.png" /></a>
</div>

### EditText

Son campos de texto en los que el usuario puede escribir.

```xml
<edittext android:layout_width="200dip" android:layout_height="wrap_content" android:layout_above="@id/button1" android:id="@+id/editText1" android:layout_centerinparent="true">

```

```java
final EditText editText1 = (EditText) findViewById(R.id.editText1);

 editText1.setOnKeyListener(new OnKeyListener() {

         @Override
         public boolean onKey(View arg0, int arg1, KeyEvent arg2) {
            if (arg1 == KeyEvent.KEYCODE_ENTER){
               Toast.makeText(
                     editText1.getContext()
                     , "Escribiste: " + editText1.getText()
                     , Toast.LENGTH_SHORT)
                     .show();
               return true;
            }
            return false;
         }
      });

```

Lo que hemos hecho con este EditText, es fijarle un onKeyListener, que comprobará (con el if), que hemos pulsado la tecla enter, y si es cierto, mostrar el texto escrito:

<div class="separator" >
<a href="https://2.bp.blogspot.com/-iZ_aYmpCNUA/TgTbkhTZXRI/AAAAAAAAAqI/5_ycBPJAZaQ/s1600/onKeyListener.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="242" src="https://2.bp.blogspot.com/-iZ_aYmpCNUA/TgTbkhTZXRI/AAAAAAAAAqI/5_ycBPJAZaQ/s400/onKeyListener.png" /></a>
</div>

### ImageView

Nos permite mostrar imágenes en la pantalla.

```xml
<imageview android:id="@+id/imageView" android:layout_width="wrap_content" android:layout_height="wrap_content" android:src="@drawable/icon">

```

```java
final ImageView imageView1 = (ImageView) findViewById(R.id.imageView);
imageView1.setImageResource(R.drawable.icon);

```

El icono es el que viene por defecto al crear un proyecto. Este es el resultado:

<div class="separator" >
<a href="https://2.bp.blogspot.com/-Gjh19FWfN9s/TgYPUIHd8nI/AAAAAAAAAqQ/-tN7V-Fz_KU/s1600/ImageView.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Ejemplo ImageView" title="Ejemplo ImageView"  height="400" width="299" src="https://2.bp.blogspot.com/-Gjh19FWfN9s/TgYPUIHd8nI/AAAAAAAAAqQ/-tN7V-Fz_KU/s400/ImageView.png" /></a>
</div>

### CheckBox

Es un tipo de botón con dos estados, activo o inactivo, practicamente tiene el mismo comportamiento de un botón, una de sus características es que podemos comprobar si el botón esta activo o no:

```xml
<checkbox android:layout_height="wrap_content" android:layout_width="wrap_content" android:text="CheckBox" android:layout_centerinparent="true" android:layout_below="@id/button1" android:id="@+id/checkBox1">

```

```java
final CheckBox checkbox1 = (CheckBox) findViewById(R.id.checkBox1);
checkbox1.setOnCheckedChangeListener(new OnCheckedChangeListener() {

   @Override
   public void onCheckedChanged(CompoundButton arg0, boolean checked) {
      if (checked) Toast.makeText(checkbox1.getContext(), "Activo", Toast.LENGTH_LONG).show();
      else Toast.makeText(checkbox1.getContext(), "Inactivo", Toast.LENGTH_SHORT).show();
   }
});

```

En este caso, hemos usado como listener onCheckedChanged, que se ejecutará cada vez que el estado del checkbox cambie.

<div class="separator" >
<a href="https://3.bp.blogspot.com/-RVlpxkRmpiU/TgYZa-VfDRI/AAAAAAAAAqY/9Go0syOziVY/s1600/CheckBox.png"  ><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="243" src="https://3.bp.blogspot.com/-RVlpxkRmpiU/TgYZa-VfDRI/AAAAAAAAAqY/9Go0syOziVY/s400/CheckBox.png" /></a>
</div>

Estos son los componentes gráficos básicos, también disponemos de RadioButton, ToggleButton (Parecidos a los checkBox, pero con una luz que se ilumina al estar activos, y con la característica de que el texto cambia dependiendo de su estado, aunque esto se puede conseguir con el checkbox facilmente.)

En general con echar un vistazo a los métodos y listeners de cada componente, y con la documentación que ofrece javadoc en eclipse, lograremos entender como funciona cada uno, y podremos usarlos fácilmente.

<a class="aligncenter download-button" href="https://elbauldelprogramador.com/" rel="nofollow"> Download &ldquo;EjemploComponentesGraficos&rdquo; <small>ejemploComponentesGraficos.zip &ndash; Downloaded 1421 times &ndash; </small> </a>

* * *

#### Siguiente Tema: [Programación Android: Interfaz gráfica - Adapters I][3]

 [1]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica/
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_23/
 [3]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_28



</checkbox></imageview></edittext></button>
