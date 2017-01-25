---
author: alex
categories:
- android
color: '#689F38'
date: '2016-01-01'
description: Un GridView es una AdapterView capaz de organizar datos en forma de cuadricula
  para mejorar la accesibilidad del usuario. A diferencia de un ListView, este contenedor
  permite scrolling horizontal y vertical en sus interacciones.
image: 2014/11/gridview-scrolling-horizontal.png
lastmod: 2015-12-23

mainclass: android
url: /crear-un-gridview-con-adaptador-personalizado-en-android/
tags:
- adaptador gridview
- crear gridview
- gridview android
title: Crear un GridView con Adaptador personalizado en Android
---

> Éste artículo es una colaboración de **James Revelo Urrea**. Su blog es <a href="http://www.hermosaprogramacion.com" title="Blog del colaborador" target="_blank">www.hermosaprogramacion.com</a>. Muchas gracias.

<figure>
<a href="/img/2014/11/gridview-scrolling-horizontal.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/11/gridview-scrolling-horizontal.png" title="{{ page.title }}" alt="{{ page.title }}" width="700px" height="350px" /></a>
</figure>

# Poblar un GridView con un Adaptador de ImageViews en Android

Un `GridView` es una `AdapterView` capaz de organizar datos en forma de cuadricula para mejorar la accesibilidad del usuario. A diferencia de un `ListView`, este contenedor permite scrolling horizontal y vertical en sus interacciones.

Si sigues leyendo este artículo aprenderás a crear un `GridView` cuyos elementos sean imágenes en miniatura. Al ser seleccionadas el usuario visualizará la imagen en tamaño real. Este ejemplo comprende la creación un layout efectivo para un GridView, la implementación de un [adaptador personalizado][1] con elementos [ImageView][2] y la comunicación con [Intents][3] para acceder a los detalles completos de cada imagen.

<!--more--><!--ad-->

## Diseño de un GridView en Android

Como se venía diciendo, un **GridView** organiza los elementos en forma de grilla. Por lo general se encuentran en aplicaciones que muestran una galería de imágenes seleccionables o en aplicaciones que presentan productos a sus clientes.

Son considerados mejor alternativa que las listas, si se desea aprovechar el espacio de dispositivos con tamaños de pantalla amplios como las tabletas. O cuando un dispositivo se encuentra en estado **LandScape**.

### Scrolling Vertical

El despliegue por defecto de los elementos de un GridView es vertical. El orden de los elementos va de izquierda a derecha y así mismo se definen los indices (basados en inicio 0) en nuestras estructuras de datos relacionadas.

<figure>
<a href="/img/2014/11/gridview-scrolling-horizontal.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/11/gridview-scrolling-horizontal.png" title="{{ page.title }}" alt="{{ page.title }}" width="700px" height="350px" /></a>
</figure>

Como ves, en el anterior ejemplo se comienza en la parte superior izquierda con el indice 0 hasta terminar el recorrido de izquierda a derecha en la parte inferior derecha con el indice 5.

### Scrolling Horizontal

En este caso se recorre el Grid en función de cada fila. Lo que quiere decir que accederemos a las posiciones de arriba hacia abajo.

<figure>
<a href="/img/2014/11/gridview-scrolling-horizontal.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/11/gridview-scrolling-horizontal.png" title="{{ page.title }}" alt="{{ page.title }}" width="700px" height="350px" /></a>
</figure>

La ilustración muestra el recorrido vertical de los elementos.

## Diseño de una actividad basada en un GridView

A continuación comenzaremos a crear una aplicación de ejemplo que contenga un `GridView`. Se trata de una aplicación que muestra algunas fotos que han sido guardadas hipotéticamente por el usuario. Si el usuario presiona uno de los elementos, se despliega una actividad nueva que muestra la foto en tamaño original.

A la actividad basada en el `GridView` se le ha denominado `Main` y a aquella que despliega la imagen completa se le llamó `Details`. Puedes descargar el proyecto completo desde el siguiente enlace:

[Descargar Código][4]

En el archivo de diseño de `Main` se escribirá un layout cuyo nodo principal sea un elemento `<gridview>`. Veamos:

```xml
</gridview><gridview xmlns:android="http://schemas.android.com/apk/res/android" android:id="@+id/gridview" android:layout_width="match_parent" android:layout_height="match_parent" android:columnwidth="90dp" android:numcolumns="auto_fit" android:verticalspacing="10dp" android:horizontalspacing="10dp" android:stretchmode="columnWidth" android:gravity="center">

```

La distribución de nuestros elementos se ve afectada en el GridView por los siguientes atributos descriptivos:

  * `android:columnWidth`: Es el ancho de cada columna de la cuadrícula.
  * `android:numColumns`: Se refiere a la cantidad de columnas que deseas establecer en tu GridView. Aunque podemos usar un número entero predeterminado, también es posible usar la bandera `"auto_fit"`, la cual ajusta el número de columnas dependiendo de las dimensiones de la pantalla del dispositivo.
  * `android:verticalSpacing`: Espacio vertical entre las fila del GridView.
  * `android:horizontalSpacing`: Espacio horizontal entre las columnas del GridView.
  * `android:stretchMode`: Define el modo en que se extenderán las columnas con en relación al layout si existe algún espacio vacío. Para su valor puedes usar las siguientes constantes:

| Constante             | Descripción                                          |
| --------------------- | ---------------------------------------------------- |
| `none`                | No se aplica un modo de extensión                    |
| `spacingWidth`        | Se extiende el espacio que existe entre cada columna |
| `columnWidth`         | El espacio se reparte equitativamente                |
| `spacingWidthUniform` | Se reparte el espacio uniformemente                  |

  * `android:gravity`: Define la ubicación del contenido dentro de cada celda. Existen muchos valores que puedes utilizar, entre ellos: `top`, `rigth`, `left`, `bottom` y `center`.
    Por otra parte, el layout para `Details` consta simplemente de un `ImageView` como nodo raíz:

```xml
<imageview xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="match_parent" android:contentdescription="@string/imageDesc" android:id="@+id/originalImage">

```

## Crear un Adaptador personalizado para el GridView

El siguiente paso es crear un adaptador que infle Image Views a partir de los recursos de nuestro proyecto. Para ello crearás una nueva clase llamada `ImageAdapter` y la extenderás de `BaseAdapter`. La idea es declarar un array que relacione los identificadores de cada recurso drawable con un indice.

Este concepto facilitará el trabajo para poblar el GridView , ya que podemos controlar el orden de aparición de las imágenes. Teniendo esto en mente, la definición de la clase se verá de la siguiente forma:

```java
public class ImageAdapter extends BaseAdapter {
    // Contexto de la aplicación
    private Context mContext;

    // Array de identificadores
    private Integer[] mThumbIds = {
            R.drawable.e1,R.drawable.e2, R.drawable.e3,
            R.drawable.e4,R.drawable.e5, R.drawable.e6,
            R.drawable.e7,R.drawable.e8, R.drawable.e9,
            R.drawable.e10,R.drawable.e11, R.drawable.e12,
            R.drawable.e13,R.drawable.e14, R.drawable.e15,
            R.drawable.e1,R.drawable.e2, R.drawable.e3,
            R.drawable.e4,R.drawable.e5, R.drawable.e6,
            R.drawable.e7,R.drawable.e8, R.drawable.e9
    };

    public ImageAdapter(Context c) {
        mContext = c;
    }

    public int getCount() {
        return mThumbIds.length;
    }

    public Object getItem(int position) {
        return null;
    }

    public long getItemId(int position) {
        return 0;
    }

    public int getThumbId(int position){return mThumbIds[position];}

    public View getView(int position, View convertView, ViewGroup parent) {
        //ImageView a retornar
        ImageView imageView;

        if (convertView == null) {
            /*
            Crear un nuevo Image View de 90x90
            y con recorte alrededor del centro
             */
            imageView = new ImageView(mContext);
            imageView.setLayoutParams(new GridView.LayoutParams(90,90));
            imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        } else {
            imageView = (ImageView) convertView;
        }

        //Setear la imagen desde el recurso drawable
        imageView.setImageResource(mThumbIds[position]);
        return imageView;
    }

}

```

El adaptador establece por defecto los métodos `getItem()` y `getItemId()` debido a que no se está usando fuentes de datos estructuradas como una lista o mapa hash.

La lógica del método `getView()` es sencilla. Por cada item del GridView se crea un nuevo `ImageView` con un tamaño de `90x90` y un tipo de escala `CENTER_CROP`. Esto significa que el tamaño total de la imagen será recortado conservando su proporción con respecto al centro, si en algún momento llega a ser necesario.

Luego de ello solo seteas el contenido con el método `setImageResource(),` apuntando hacia nuestro array de identificadores con la posición actual.

## Visualizar la imagen original en otra Actividad

Para que `Details` se entere de que imagen debemos expandir, es necesario enviar la posición del recurso drawable desde `Main`. La forma de averiguar la posición es mediante la sobrescritura del método `onItemClick()` de la interfaz `OnItemClickListener`.
Recuerda que este método recibe como parámetro la posición del item presionado. Así que obtendremos la instancia del `GridView` y la relacionaremos con una nueva escucha en el método `onCreate()`:

```java
/*
Seteando el adaptador al GridView
 */
GridView gridview = (GridView) findViewById(R.id.gridview);
gridview.setAdapter(new ImageAdapter(this));

/*
Creando una nueva escucha para los elementos del Grid
 */
gridview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    public void onItemClick(AdapterView<? ?> parent, View v, int position, long id) {
        /*
        Iniciar una nueva actividad al presionar la foto
         */
        Intent i = new Intent(Main.this, Details.class);
        i.putExtra("position",position);//Posición del elemento
        startActivity(i);

    }
});

```

Si observas, el `Intent` creado en `onItemClick()` lleva consigo el valor de la posición del item actualmente procesado y luego se inicia la actividad `Details`. Finalmente recibes ese valor desde `onCreate()`en `Details` y asignas el recurso drawable con la referencia:

```java
/*
Recibiendo el identificador de la imagen
 */
Intent i = getIntent();
int position = i.getIntExtra("position", -1);// -1 si no se encontró la referencia
ImageAdapter adapter = new ImageAdapter(this);

/*
Seteando el recurso en el ImageView
 */
ImageView originalImage = (ImageView)findViewById(R.id.originalImage);
originalImage.setImageResource(adapter.getThumbId(position));

```

Ahora solo ejecuta la aplicación y prueba su funcionamiento.


 [1]: https://elbauldelprogramador.com/adapter-personalizado-en-android/ "Cómo crear un adapter personalizado en Android"
 [2]: https://elbauldelprogramador.com/optimizando-la-interfaz-android-compound-drawables/ "Optimizando la interfaz Android – Compound Drawables"
 [3]: https://elbauldelprogramador.com/programacion-android-intents-conceptos/ "Programación Android: Intents – Conceptos básicos"
 [4]: https://www.dropbox.com/s/e56vsfojei6z2ow/Pics.rar?dl=0


</imageview></gridview>
