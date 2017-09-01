---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-09-01T12:24:03+01:00
mainclass: android
url: /programacion-android-recursos-recursos/
tags:
- curso android pdf
title: "Programación Android: Recursos - Recursos y cambios de configuración"
---

Los recursos ayudan a la localización. Por ejemplo, podemos tener valores para strings que cambien en función del idioma configurado en el terminal. Los recursos Android generalizan esta idea para cualquier configuración del dispositivo, el idioma es tan solo otra configuración más. Otro ejemplo de cambios de configuración se dá cuando el dispositivo cambia de posición (de vertical a horizontal o viceversa). El modo vertical se suela llamar portrait y el horizontal landscape.

Android permite elegir distintas configuraciones de layout basandose en el tipo de layout. Y ambos tendrán el mismo ID de recurso. Esto se consigue usando directorios diferentes para cada configuración. Vamos a verlo con un ejemplo:


<!--more--><!--ad-->

```bash
/res/layout/main_layout.xml
/res/layout-port/main_layout.xml
/res/layout-land/main_layout.xml
```

Aunque hay tres archivos layout separados, solo se generará un único ID para ellos en R.java. Este ID será de la forma ***R.layout.main_layout***

Sin embargo, cuando recuperemos el layout correspondiente a este ID, obtendremos el layout apropiado para la configuración actual del dispositivo.

En el ejemplo anterior, las extensiones de los directorios *-port* y *-land* se llaman *configuration qualifiers*. Estos clasificadores (qualifiers), se tienen que separar del directorio original añadiendo un guión (-) a su nombre. Los recursos para los que especificamos estos clasificadores de configuración se llaman recursos alternativos. Los recursos almacenados en el directorio de recursos sin los clasificadores de configuración se llaman recursos por defecto.

En la siguiente lista se muestran los clasificadores de configuración disponibles:

  * mccAAA: AAA es el código del pais del dispositivo
  * mncAAA: AAA es el código de red
  * en-rUS: Idioma y región
  * small, normal, large, xlarge: Tamaño de pantalla.
  * long, notlong: Tipo de pantalla
  * port, land: Posicion vertical o horizontal (portrait y landscape)
  * car, desk: Tipo de acomplamiento.
  * night, notnight: Día o noche
  * ldpi, mdpi, hdpi, xhdpi, nodpi: Densidad de pantalla.
  * notouch, stylus, finger: Tipo de pantalla
  * keysexposed, keysoft, keyshidden: Tipo de teclado
  * nokeys, qwerty, 12key: Cantidad de teclas
  * navexposed, navhidden: Teclas de navegación ocultas o al descubierto
  * nonav, dpad, trackball, wheel: Tipo de navegación del dispositivo (trackball es la bolita que se usa como ratón)
  * v3, v4, v7: Nivel API

Con los clasificadores mostrados arriba, podemos crear directorios de recursos como los siguientes:

```bash
/res/layout-mcc312-mnc222-en-rUs
/res/layout-ldpi
/res/layout-hdpi
/res/layout-car
```

Para saber nuestra localización actual podemos ejecutar una aplicación que viene instalada en el emulador android. La encontramos en el menú de aplicaciones y se llama Custom Locale.

<figure>
    <amp-img sizes="(min-width: 485px) 485px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" width="485" height="800" src="https://4.bp.blogspot.com/-Q3bB0guwyaU/TrufmiBkv0I/AAAAAAAABjA/kQypC8CXIbU/s800/Screenshot.png"></amp-img>
</figure>

Dado un ID de recurso, Android usa un algoritmo para elegir el adecuado. Si deseas saber más acerca de este tema puedes visitar la siguiente dirección <a target="_blank" href="http://developer.android.com/guide/topics/resources/providing-resources.html#AlternativeResources">http://developer.android.com/guide/topics/resources/providing-resources.html#AlternativeResources</a>, pero voy a dar unas reglas básicas.

La primera regla es que los clasificadores mostrados arriba están en orden de precedencia. Veamos un ejemplo de como funciona la precedencia:

```bash
/res/layout/main_layout.xml
/res/layout-port/main_layout.xml
/res/layout-en/main_layout.xml
```

En este listado, el archivo *main_layout.xml* está disponible para dos variaciones posibles. Una variación para el idioma y otra para la orientación. Veamos que layout se selecciona si tenemos el dispositivo en vertical.

Incluso si el dispositivo está en vertical, Android va a elegir el layout que reside en la carpeta *layout-en*, ya que en la lista de clasificadores que vimos anteriormente el idioma está por delante del modo portrait (Vertical). En la <a target="_blank" href="http://developer.android.com/guide/topics/resources/providing-resources.html#AlternativeResources">dirección</a> dada anteriormente se encuentra todo esto explicado más detalladamente.

Ahora vamos a ver algunas reglas de precedencia con unos ejemplos de recursos strings. Pero los recursos string son recursos basados en ids individuales, mientras que los ids de layout se basan en los archivos. Para probar la precedencia con recursos string, vamos a definir cinco Ids para las siguientes variaciones:*default, en, en\_us, port, en\_port*. Los cinco recursos son los siguientes:

  * *teststring_all:* Este ID estará en todas las variaciones del directorio values, incluyendo el default.
  * *testport_port:* Estará en las variaciones default y -port
  * *t1_enport:* Estará en las variaciones default, -en y -port
  * *t1\_1\_en_port:* Estará en las variaciones defaul y en -en-port
  * *t2:* Solo en default

El siguiente código muestra las variaciones del directorio values:

```xml
// values/string.xml
<resources xmlns="http://schemas.android.com/apk/res/android">
   <string name="teststring_all">teststring in root</string>
   <string name="t1_enport">t1 in root</string>
   <string name="t1_1_en_port">t1_1 in root</string>
   <string name="t2">t2 in root</string>
   <string name="testport_port">testport in root</string>
</resources>

// values­en/string_en.xml
<resources xmlns="http://schemas.android.com/apk/res/android">
 <string name="teststring_all">teststring­en</string>
 <string name="t1_enport">t1_en</string>
 <string name="t1_1_en_port">t1_1_en</string>
</resources>

// values­en­rUS/string_en_us.xml
<resources xmlns="http://schemas.android.com/apk/res/android">
<string name="teststring_all">test­en­us</string>
</resources>

// values­port/string_port.xml
<resources xmlns="http://schemas.android.com/apk/res/android">
 <string name="teststring_all">test­en­us­port</string>
 <string name="testport_port">testport­port</string>
 <string name="t1_enport">t1_port</string>
 <string name="t1_1_en_port">t1_1_port</string>
</resources>

// values/string_en_port.xml
<resources xmlns="http://schemas.android.com/apk/res/android">
 <string name="teststring_all">test­en­port</string>
 <string name="t1_1_en_port">t1_1_en_port</string>
</resources>
```

El listado siguiente muestra el archivo R.java para estos recursos:

```java
public static final class string {
        public static final int t1_1_en_port=0x7f070004;
        public static final int t1_enport=0x7f070003;
        public static final int t2=0x7f070005;
        public static final int testport_port=0x7f070006;
        public static final int teststring_all=0x7f070002;
}
```

Como se aprecia, aunque hemos definido muchos strings, solo se han generado cinco IDs. A continuación se describe el comportamiento para cada string, que se ha probado con en_US y el modo portrait:

  * *teststring_all:* Este ID aparece en las cinco variaciones, ya que aparece en todas. En nuestra configuración, se escogerá del directorio values-en-rUS. Basandonos en las reglas de precedencia, tener un directorio concreto para un idioma va por delante de las variaciones en, port y en-port
  * *testport_port:* Este ID está en las variaciones default y -port. Ya que no hay ningún directorio que no se encuentra en ningún directorio que empiece por -en, la variación -port tendrá precedencia frente a default, por lo tanto se escogerá el valor desde la variación -port. SI estuviera en en una de las variaciones -en, sería esta última la que se escogería.
  * *t1_enport:* Este Id está en tres variaciones, default, -en y -port. Debido a que se encuentra en -en y -port al mismo tiempo, se escogerá el valor de -en
  * *t1\_1\_en_port:* Este ID se encuentra en cuatro variaciones, default, -port, -en y -en-port. El que toma precedencia frente a todos aquí es -en-port
  * *t2:* Este ID se encuentra solo en default, por lo tanto se elige el valor de ahí.

El SDK de Android tiene algoritmos más detallados aún, sin embargo, con este ejemplo se ha mostrado lo esencial. La clave está en darse cuenta de la precedencia de cada variación sobre otra. A continuación, para aquellos que deseen ampliar información dejo unas URLs de referencia:

# Referencias

  * <a target="_blank" href="http://developer.android.com/guide/topics/resources/index.html">Índice de recursos Android</a>
  * <a target="_blank" href="http://developer.android.com/guide/topics/resources/available-resources.html">Tipos de recursos Android</a>
  * <a target="_blank" href="http://developer.android.com/reference/android/content/res/Resources.html">Distintos métodos para leer recursos</a>.
  * <a target="_blank" href="http://developer.android.com/reference/android/R.html">Recursos definidos en el nucleo de la plataforma Android</a>
  * <a target="_blank" href="http://androidbook.com/item/3542">Understanding Android Resource Arrays, Plurals, Configuration qualifiers</a>
  * <a target="_blank" href="http://androidbook.com/akc/filestorage/satya/documentfiles/3540/ProAndroid3_Ch04_TestProvider.zip">Descargar proyecto de ejemplo para testear los recursos</a>
