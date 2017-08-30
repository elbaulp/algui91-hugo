---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-08-30T10:51:59+01:00
mainclass: android
url: /programacion-android-intents-conceptos/
tags:
- android ejemplo intent filter
- curso android pdf
- ejemplo intentfilter implicito
- uso de intents android
title: "Programación Android: Intents - Conceptos básicos"
---

Un intent sirve para invocar componentes, en android entendemos por componentes las [activities,][1] Que son componentes de UI [Interfaz gráfica], services, Código ejecutándose en segundo plano, broadcast receivers, Código que responde a un mensaje de transmisión [Broadcast messages] y [proveedores de contenido][2], código que abstráe los datos.

# Introducción a los Intents

<!--more--><!--ad-->

Como mecanismo para invocar componentes, los intents son bastante fáciles de comprender. Básicamente nos permiten llamar a aplicaciones externas a la nuestra, lanzar eventos a los que otras aplicaciones puedan responder, lanzar alarmas etc.

Vamos a mostrar un ejemplo, supongamos que tenemos la siguiente activity:

```java
public class MiActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.MiActivity);
    }
}
```

El layout *R.Layout.MiActivity* debe estar declarado y ser un archivo de layout valido. Una vez creado este archivo de layout, es necesario registrarlo en el [AndroidManifest][3], que será algo así:

```xml
<activity
    android:name=".MiActivity"
    android:label="Mi Activity">
    <intent-filter>
        <action android:name="nuestra.accion.nombreAccion"/>
        <category android:name="android.intent.category.DEFAULT" />
    </intent>
</activity>
```

Al registrar la activity en el AndroidManifest, registramos también una acción que podremos usar para invocar a dicha actividad. El diseñador de la actividad puede asignar el nombre que crea conveniente a la acción. Ahora que ya está todo listo, podemos lanzar un intent para llamar a esta actividad:

```java
public static void invokeMiActivity(Activity activity){
   String actionName= "nuestra.accion.nombreAccion";
   Intent intent = new Intent(actionName);
   activity.startActivity(intent);
}
```

> La convención que se usa para nombrar una acción suele ser `<nombredenuestropaquete>.intent.action.NOMBRE_ACCION</nombredenuestropaquete>`

Una vez que se invoca a la actividad, ésta tiene la posibilidad de recuperar el intent que la llamó. Y podemos recuperarlo del siguiente modo:

```java
//Este código se inserta en el método onCreate() de la actividad.
Intent intent = this.getIntent();
if (intent == null){
   Log.d("Tag", "La actividad no se ha llamado mediante un intent.")
}
```

# Intents disponibles en Android

En <a target="_blank" href="http://developer.android.com/guide/appendix/g-app-intents.html">developer.android.com/guide/appendix/g-app-intents.html</a> se puede encontrar una lista con las aplicaciones disponibles en Android junto con los intents que las invocan. Por ejemplo, para el navegador web, tenemos dos acciones, **VIEW ** y **WEB_SEARCH**, que abren el navegador en una url específica o realizan una búsqueda.

En el caso del dialer (marcador), tenemos las acciones CALL y DIAL, que vienen dadas por la URI *tel:numero\_de\_teléfono*, la diferencia entre estas dos acciones, es que CALL realiza la llamada al número de la URI, y DIAL solo lo marca, pero no realiza la llamada.

Vamos a ver ejemplos de intents que invocan a las aplicaciones mencionadas en la documentación de Android:

```java
public static void invokeWebBrowser(Activity activity){
   Intent intent = new Intent(Intent.ACTION_VIEW);
   intent.setData(Uri.parse("http://www.google.com"));
   activity.startActivity(intent);
}

public static void invokeWebSearch(Activity activity){
   Intent intent = new Intent(Intent.ACTION_WEB_SEARCH);
   intent.setData(Uri.parse("http://www.google.com"));
   activity.startActivity(intent);
}

public static void dial(Activity activity){
   Intent intent = new Intent(Intent.ACTION_DIAL);
   activity.startActivity(intent);
}

public static void call(Activity activity){
   Intent intent = new Intent(Intent.ACTION_CALL);
   intent.setData(Uri.parse("tel:555-555-555"));
   activity.startActivity(intent);
}

public static void showMapAtLatLong(Activity activity){
   Intent intent = new Intent(Intent.ACTION_VIEW);
   intent.setData(Uri.parse("geo:0,0?z=4&q;=restaurantes"));
   activity.startActivity(intent);
}
```

# Composición de los intents

Un intent está formado por una acción, datos (que se representan mediante URIs), datos extra en pares clave/valor y un nombre de clase explícito, llamado nombre del componente.

> Es necesario aclarar algo, cuando un intent trae consigo un nombre de componente, se le llama intent explícito. Cuando no lo lleva y depende de la acción y los datos se llama intent implícito.

# Intents y Data URIs

Como vimos un poco más arriba los URIs para las acciones ACTION\_DIAL y ACTION\_CALL tienen la estructura *tel:número*, y la manera de usar esta URI en el intent para pasarla como dato es la siguiente:

```java
intent.setData(Uri.parse("tel:555-555-555"));
```

El nombre de las acciones normalmente suele ser un String o un String constante con el nombre del paquete como prefijo.

La sección de *datos* de un intent no son datos realmente, se trata de punteros a datos. Está representado por un string que representa una URI. Una Uri de un intent puede contener argumentos, como las urls de las web.

# Acciones genéricas

Vamos a volver a ver el código que invoca al navegador web para analizarlo más en profundidad:

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("http://www.google.com"));
activity.startActivity(intent);
```

En este caso, ACTION_VEW parece una accíon muy genérica, Android se las ingenia para averiguar a qué actividad llamar en base a esta acción haciendo uso de la composición de la URI. Para ello, mira el esquema que posee la URI, que en este caso es http y pregunta a todas las actividades para saber cual de ellas comprende este esquema. Por lo tanto, la actividad del navegador deberá tener registrada la acción VIEW junto con el esquema de datos de http:

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="http" />
        <data android:scheme="https" />
    </intent>
</activity>
```

SE puede obtener más informacion del elemento *data* en <a target="_blank" href="http://developer.android.com/guide/topics/manifest/data-element.html">developer.android.com/guide/topics/manifest/data-element.html</a>

# Infomación extra

Los intents admiten además de las acciones y datos, un atributo adicional llamado *extras*. Este tipo de dato viene dado por la forma clave/valor, en la cual el nombre de la clave normalmente suele empezar con el nombre del paquete y el valor puede ser de cualqueira de los tipos fundamentales u objetos arbitrários, siempre que se implemente la inrefaz android.os.Parcelable. Esta información extra se representa mediante la clase *android.os.Bundle*

```java
//Obtener un bundle
Bundle b = intent.getExtras();

//Colocar un bundle en un intent
Bundle b2 = new Bundle();

//Rellenar el bundle con datos fundamentales
putExtra(String name, boolean value);
putExtra(String name, int value);
putExtra(String name, double value);
putExtra(String name, String value);

//Otros tipos de datos
putExtra(String name, int[] value);
putExtra(String name, float[] value);
putExtra(String name, Serializable value);
putExtra(String name, Parcelable value);
putExtra(String name, Bundle value);

//Añadir bundles de otros intents
putExtra(String name, Intent otroIntent);

//Añadir el bundle al intent
intent.putExtras(b2)
```

getExtras devuelve el bundle que contenga el intent. Si el intent ya tiene un bundle, putExtras transfiere los pares clave/valor adicionales del bundle nuevo al que ya existía. Si no existe ningun bundle asociado, putExtras creará uno y copiará todos los valores.

La clase intent tiene declarados unas claves extras que acompañan a ciertas acciones, pueden verse en [developer.android.com/reference/android/content/Intent.html#EXTRA\_ALARM\_COUNT][4]. Por ejemplo EXTRA_SUBJECT nos permite almacenar el asunto de un email. El valor de esta clave es *android.intent.extra.SUBJECT*.

# Usar componentes para invocar directamente una activity

Una forma más directa de iniciar una actividad es mediante el su ComponentName, que es una abstracción del nombre del paquete y de la clase. Existen varios métodos para realizar esta acción en la clase Intent:

```java
setComponent(ComponentName name);
SeClassName(String packName, String className);
setClassName(Context context, String ClassName);
setClass(Context context, Class classObject);
```

Se puede usar el nombre de una clase directamente sin necesidad de construir un ComponentName. Por ejemplo, si tenemos la siguiente actividad:

```java
public class MiActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.MiActivity);
    }
}
```

Podemos usar el siguiente código para llamarla:

```java
Intent intent = new Intent(activity, MiActivity.class);
activity.start(intent);
```

Así, cualquier intent podrá iniciar la actividad, pero para ello, debemos registrar dicha actividad en el AndroidManifest así:

```xml
<activity android:name=".MiActivity" android:label="Mi Activity" />
```

Sin ningún tipo de intent-filter, ya que estos no son necesarios cuando se invoca a una actividad directamente mediante el nombre de su clase. Recordad que este intent es de tipo explícito.

# Siguiente Tema: [Intents - Categorías][5]

 [1]: https://elbauldelprogramador.com/programacion-android-trabajar-con/
 [2]: https://elbauldelprogramador.com/programacion-android-proveedores-de
 [3]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
 [4]: http://developer.android.com/reference/android/content/Intent.html#EXTRA_ALARM_COUNT
 [5]: https://elbauldelprogramador.com/programacion-android-intents-categorias/
