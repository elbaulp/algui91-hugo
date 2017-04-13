---
author: alex
categories:
- android
- articulos
color: '#689F38'
date: 2015-12-11 10:47:00
description: "En el anterior artículo hablamos de cómo reducir el tama\xF1o
  de una aplicación Android eliminando recursos sin usar. En el blog de Cyril Mottier
  encontré un artículo muy interesante con varios consejos para reducir el tama\xF1o
  del APK y optimizar el código en producción. A continuación pasamos a traducir
  las partes importantes."
image: hotlink-ok/Pon-a-dieta-a-tus-APKs.png
lastmod: 2015-12-11

mainclass: android
url: /pon-dieta-tus-apks/
tags:
- android
- optimizar APK
- reducir peso APK
- "tama\xF1o del APK"
title: Pon a dieta a tus APKs
---

<figure>
<a href="/img/2014/08/Pon-a-dieta-a-tus-APKs.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/08/Pon-a-dieta-a-tus-APKs.png" title="{{ page.title }}" alt="{{ page.title }}" width="1024px" height="576px" /></a>
<span class="image-credit">Crédito de la imagen: Cyril</span>
</figure>

En el anterior artículo hablamos de cómo reducir el tamaño de una aplicación Android [eliminando recursos sin usar][1]. En el blog de **[Cyril Mottier][2]** encontré un artículo muy interesante con varios consejos para reducir el tamaño del *APK* y optimizar el código en [producción][3]. A continuación pasamos a traducir las partes importantes:

<!--more--><!--ad-->

No es ningún secreto que las aplicaciones cada vez ocupan más espacio. Las primeras aplicaciones solían ocupar unas **2MB** en las versiones iniciales de [Android][4]. Ahora es bastante común ver aplicaciones que pesan entre 10 y 20MB. Éste incremento en el tamaño es una consecuencia directa tanto de las expectativas del usuario como de la adquisición de experiencia por parte de los desarrolladores. Las principales razones del aumento en el tamaño de los **APKs** son:

  * Más categorías *dpi* (*[l\|m\|tv\|h\|x\|xx\|xxx]dpi*).
  * La evolución de la plataforma Android, herramientas de desarrollo y el ecosistema de librerías.
  * Las incesantes expectativas del usuario en cuanto a *Interfaces Gráficas* (UI) de mayor calidad.
  * etc..etc..

Publicar aplicaciones *ligeras* en la **Play Store** es una buena práctica a la que todo buen programador debería prestar atención al diseñar una aplicación. ¿Por qué?.

  * Primero, porque es sinónimo de un código base simple, mantenible y probado (*future-proof*).
  * Segundo, porque los programadores por norma general preferirán mantenerse por debajo del límite actual de la Play Store, 50MB por **APK** si no quieren tener que usar descargas adicionales.
  * Por último, porque vivimos en un mundo de restricciones:
      * Ancho de banda limitado.
      * Espacio en disco limitado.
      * etc.

A menor el tamaño del APK, mayor la velocidad de descarga, menor la frustración del usuario y, lo más importante, mejores valoraciones.

En muchos (si no todos) los casos, el crecimiento en tamaño es obligatorio para cumplir los *requerimientos y expectativas del usuario*. Sin embargo, **Cyril** está convencido de que el peso de un APK crece, en general, a mayor velocidad que las expectativas del usuario. De hecho, la mayoría de aplicaciones en **Play Store** ocupan el doble o más de lo que deberían. A continuación se discutirán algunas técnicas/reglas que se pueden usar para reducir el tamaño final de la aplicación.

## EL formato APK

Antes de realizar ninguna optimización, es importante entender el formato del APK. A grandes rasgos, un **APK** es un fichero archivado compuesto de varios ficheros de forma comprimida. Como programador, se pueden ver fácilmente sus contenidos descomprimiéndolo con el comando `unzip`.

Éste es el aspecto del **APK** tras ejecutar `unzip <app.apk>`:

```bash
/assets
/lib
  /armeabi
  /armeabi-v7a
  /x86
  /mips
/META-INF
  MANIFEST.MF
  CERT.RSA
  CERT.SF
/res
AndroidManifest.xml
classes.dex
resources.arsc

```

La mayor parte del contenido anterior debe resultar familiar a todo programador. Refleja la estructura del proyecto que se puede observar durante el desarrollo. [/assets][5], `/lib`, [/res][6], [AndroidManifest.xml][7]. `classes.dex` contiene la versión compilada (dex) del código en Java y `resources.arsc` los recursos precompilados, por ejemplo XML binarios (values, XML drawables etc).

Debido a que el **APK** es un fichero archivado simple, significa que tiene dos tamaños, el tamaño comprimido y el descomprimido. Ambos son importantes, pero en éste artículo nos centraremos en el tamaño comprimido. A menor tamaño del APK, menor tamaño de la versión descomprimida.

<div class="clearfix">
</div>
<div class="hr">
</div>
<div class="clearfix">
</div>

## Reducir el tamaño del APK

Ésto puede llevarse a cabo con diversas técnicas. Ya que cada aplicación es distinta, no hay una regla absoluta para hacer “adelgazar” a un **APK**. No obstante, el **APK** se compone de 3 componentes sobre los que podemos actuar:

  * Código fuente en Java.
  * Recursos/Assets
  * Código nativo

Los consejos que mostramos a continuación consisten en minimizar la cantidad de espacio usado por cada uno de éstos componentes. Minimizando así el tamaño del APK.

### Ten un código con buena higiene

Probablemente sea muy obvio, pero el hábito de tener un código limpio es el primer paso para reducir el tamaño de la aplicación final. “*Conoce tu código como la palma de tu mano*”. Deshazte de todas las librerías de dependencias sin usar. Haz el código mejor día tras día. Límpialo continuamente. Centrase en en mantener un código base limpio y actualizado es por lo general la mejor forma de producir **APKs** más pequeños conteniendo únicamente lo estrictamente necesario para la aplicación.

Conseguir ésto es generalmente más fácil cuando se empieza un proyecto desde cero. Es más difícil contra más viejo es el proyecto. De hecho, proyectos con gran trasfondo histórico tienden a tratar con trozos de código *muertos* y/o prácticamente inútiles. Afortunadamente, existen algunas herramientas para ayudarnos a hacer la colada&#8230;

### Ejecutar Proguard

**Proguard** es una herramienta extremadamente útil que [ofusca][8], optimiza y reduce el código en tiempo de compilación. Una de sus características principales para reducir el tamaño es el *Tree-Shaking*. **Proguard** básicamente recorre todos los directorios con código para detectar trozos que no se usan. Todos los que encuentre (es decir, los no usados) se eliminan del **APK** final. **Proguard** también renombra campos, [clases][9] e interfaces para hacer el código lo más ligero posible.

Como habrás adivinado **Proguard** es extremadamente útil y eficiente. Pero un gran poder conlleva una gran responsabilidad. Muchos desarrolladores consideran **Proguard** una herramienta muy molesta porque, por defecto, rompe aplicaciones que se basan fuertemente en [reflexión][10]. Depende de los desarrolladores el configurar **Proguard** para especificar en qué clases, campos etc puede realizar las optimizaciones.

### Usar Lint extensamente

**Proguard** trabaja en la lado Java. Desafortunadamente, no opera en el lado de los recursos. Como consecuencia, si una imagen `my_image` en `res/drawable` no se usa, **Proguard** solo elimina su referencia en la clase `R`, pero no la imagen.

**Lint** es un analizador de código estático que ayuda a detectar recursos sin usar con una simple llamada a `./gradlew lint`. Genera un informe en HTML, en la sección “*UnusedResources*” estarán listados todos los recursos. Es seguro borrar dichos recursos siempre que no se accedan a ellos mediante reflexión en el código.

**Lint** analiza recuros (ficheros en el directorio `/res`) pero ignora los assets (Ficheros en `/assets`). Debido a que los assets se acceden mediante su nombre en lugar de una referencia Java o XML (Ver [Recursos compilados y no compilados][11]). Y por ello **Lint** no puede determinar si un asset se usa en el proyecto. Ésto es tarea del programador.

> **Nota del traductor**: Existen otras herramientas para eliminar los recursos sin usar automáticamente, como la vista en el artículo “ELIMINAR RECURSOS SIN USAR EN ANDROID” mencionado al principio de éste artículo.

### Ser obstinado con los recursos

Android soporta un gran número de dispositivos. De hecho, ha sido diseñado para soportar dispositivos independientemente de su configuración: [Densidad de pantalla][12], forma de la pantalla, tamaño etc. En Android 4.4, el framework soporta nativamente varias densidades: **ldpi, mdpi, tvdpi, hdpi, xhdpi, xxhdpi** y **xxxhdpi**. Aunque que Android las soporte no quiere decir que haya que exportar todos los assets a cada una de ellas.

No tengas miedo a no soportar algunas densidades si sabes que será usada por un porcentaje muy pequeño de gente. **Cyril** solo soporta **hdpi, xhdpi** y **xxhdpi** en sus aplicaciones. Ésto no es un problema para dispositivos con otras densidades porque Android calcula automáticamente los recursos escalando los existentes para otras densidades.

El punto principal detrás de la regla **hdpi/xhdpi/xxhdpi** es simple. Primero, (Cyril) cubre el 80% de sus usuarios. Segundo, **xxxhdpi** hasta el momento existe solamente como algo para el futuro. En densidades más bajas, como **ldpi** o **mdpi**, no importa cuanto esfuerzo se gaste en crear los recursos, el resultado será tan malo como dejar que sea Android el encargado de escalar hacia abajo desde **hdpi**.

De igual manera, tener una única variante de una imagen en `drawable-nodpi` puede conseguir reducir el espacio. Es posible permitirse ésto en raros casos, si la imagen se va a mostrar muy pocas veces, por ejemplo.

### Minimizar configuraciones de recursos

El desarrollo en Android a menudo recae en el uso de librerías externas como la *Android Support Library*, *Google Play Services*, *Facebook SDK*, etc. Todas éstas librerías traen recursos que no son necesariamente útiles a nuestra aplicación. Por ejemplo, *Google Play Services* viene con traducciones para idiomas que tu aplicación no soporta. También usa recursos **mdpi**, por ejemplo, que pueden no ser de utilidad en nuestra aplicación.

Desde la versión **0.7** del plugin **Gradle**, es posible pasar información sobre qué configuraciones son necesarias para nuestra aplicación al *build system*. Ésto es posible gracias a las configuraciones en `resConfig` y `resConfigs`. El archivo `build.gradle` de abajo previene que `aapt` empaquete recursos que no coincidan con los que usa la aplicación:

```groovy
defaultConfig {
    // ...
    resConfigs "en", "de", "fr", "it"
    resConfigs "nodpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"
}

```

### Comprimir imágenes

**Aapt** viene con un [compresor de imágenes lossless][13]. Por ejemplo, una imagen PNG que no requiera de más de 256 colores puede convertirse en otra con una paleta de colores 8-bits (*8 bits = 1B = 256 valores*). Aunque **aapt** haga ésto por nosotros, sería buena idea optimizar además la imagen por nuestra cuenta, para ello hay varias herramientas, como *pngquant*, *imageAlpha*, *imageOptim* o *optipng*.

Android tiene un tipo especial de imágenes: [*9-patches*][14]. Para optimizar éstas imágenes basta con decirle al diseñador que reduzca al mínimo las áreas “estirables” y el contenido.

### Limitar el número de arquitecturas

Android trata generalmente con Java, pero en ciertas ocasiones es necesario usar [código nativo][15]. En el ecosistema actual de Android bastará con desarrollar para las arquitecturas armabi y x86. En [éste artículo][16] se puede encontrar más información sobre el tema.

### Re-usar siempre que sea posible

Ésta sea quizá una de las optimizaciones principales más importantes que se aprenden al empezar en el desarrollo móvil. En un `ListView` o `RecyclerView`, re-usar ayuda a mantener un *scrolling* fluido (Más sobre el reciclaje de vistas en el artículo [Crear un adapter personalizado][17]). Re-usar puede además ayudar a reducir el tamaño final del **APK**. Por ejemplo, Android provee de varias utilidades para colorear un asset ya sea usando `android:tint` y `android:tintmode` en Android L o `ColorFilter` en todas las veriones.

También es posible evitar guardar recursos que solo sean rotaciones de otro. Digamos que tenemos dos imágenes llamadas `ic_arrow_expand` y `ic_arrow_collapse`:

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/08/PON-A-DIETA-A-TUS-APKS-Rotaciones-de-recursos.png" alt="PON A DIETA A TUS APKS - Rotaciones de recursos" width="512px" height="384px" />

Podemos deshacernos fácilmente de `ic_arrow_collapse` creando un `RotateDrawable` basándonos en `ic_arrow_expand`. Ésta técnica también reduce la cantidad de tiempo necesaria por el diseñador, ya que solo tendrá que crear una única imagen, y crearemos las versiones rotadas con:

```xml
<?xml version='1.0' encoding='utf-8'?>
<rotate xmlns:android="http://schemas.android.com/apk/res/android" android:drawable="@drawable/ic_arrow_expand" android:fromdegrees="180" android:pivotx="50%" android:pivoty="50%" android:todegrees="180">

```

### Renderizar en código cuando sea necesario

En ciertas ocasiones renderizar gráficos directamente desde código puede conllevar un gran beneficio. Uno de los mejores ejemplos de una ganancia colosal en peso son las animaciones *frame-by-frame*. **Cyril** ha estado trabajando recientemente con *Android Wear* y ha echado un vistazo a la [*Android Wearable support library*][18]. Como las otras librerías, contiene varias clases útiles cuando se trabaja con dispositivos *wearables*.

Desafortunadamente, después de crear un “Hola Mundo” básico, notó que el **APK** resultante pesaba más de **1.5MB**. Tras investigar en `wearable-support.aar`, descubrió que se empaquetan dos animaciones *frame-by-frame* en 3 densidades distintas: Una animación para notificar “Éxito” (31 frames) y otra “Abrir en teléfono” (54 frames).

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/08/Pon-a-Diata-a-tus-APKs-Renderizar-en-código-cuando-sea-necesario-wearable-support.png" alt="Pon a Dieta a tus APKs Renderizar en código cuando sea necesario wearable support" width="1596px" height="1236px" />

La animación para el “éxito” se construye con un `AnimationDrawable` definido en un XML:

```xml
<?xml version='1.0' encoding='utf-8'?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android" android:oneshot="true">
<item android:drawable="@drawable/generic_confirmation_00163" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00164" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00165" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00166" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00167" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00168" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00169" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00170" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00171" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00172" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00173" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00174" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00175" android:duration="333">
</item><item android:drawable="@drawable/generic_confirmation_00185" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00186" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00187" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00188" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00189" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00190" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00191" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00192" android:duration="33">
</item><item android:drawable="@drawable/generic_confirmation_00193" android:duration="33">
</item></animation-list>

```

Lo malo es, que cada *frame* se muestra durante 33ms, lo que hace que la animación se ejecute a 30fps. Mostrar un *frame* cada 16ms habría resultado en una librería dos veces más pesada. El *frame* `generic_confirmation_00175` (línea 15) se muestra durante 333ms, le sigue `generic_confirmation_00185`. Ésta es una gran optimización que evita que 9 *frames* (del 176 al 184 incluidos) se empaqueten en la aplicación. Desafortunadamente, `wearable-support.aar` contiene estos 9 *frames* que no son usados para 3 densidades.

Realizar la animación mediante código requiere de más tiempo de desarrollo. sin embargo, puede reducir notablemente la cantidad de assets del **APK** y además mantener una animación fluida a 60fps. Al momento de traducir éste artículo, Android no proporciona una herramienta que permita renderizar éstas animaciones de forma sencilla. Esperemos que estén trabajando en ello.

### Ir aún más lejos

Todas las técnicas descritas arriba están enfocadas principalmente en la aplicación/librería. ¿Se podría ir más lejos si tuviéramos control total sobre la cadena de distribución?. Seguramente se podría, pero implicaría algún trabajo en el lado del servidor, o más específicamente, en el lado de la *Play Store*. Por ejemplo, la *Play Store* podría tener un sistema de paquetes que empaquetara únicamente las librerías nativas necesarias para cada dispositivo.

Otra posibilidad sería empaquetar solamente la configuración necesaria para el dispositivo. Desafortunadamente, eso rompería por completo con una de las funcionalidades más importantes de Android: *Cambios de configuración en caliente*. De hecho, Android se diseñó para tratar con cambios de configuración en tiempo de ejecución (Idioma, orientación etc). Por ejemplo, eliminar recursos no compatibles con la densidad de pantalla del dispositivo sería un gran benefício. Sin embargo, las aplicaciones en Android son capaces de tratar con cambios en la [densidad de pantalla][19] sobre la marcha. Incluso si descartáramos esta capacidad, tendríamos que seguir tratando con los *drawables* definidos para densidades distintas que las del dispositivo que instala la aplicación. Además de aquellos que tengan más de una cualificador de densidad (orientación, menor anchura etc.).

El empaquetado del **APK** del lado del servidor parece extremadamente potente. Pero es muy arriesgado porque el **APK** final entregado al usuario sería completamente distinto al enviado por el desarrollador a la *Play Store*. Entregar un **APK** con algunos recursos/assets eliminados simplemente rompería las aplicaciones.

### Conclusión

El diseño trata de obtener lo mejor posible a partir de un conjunto de restricciones. El peso/tamaño de un **APK** es claramente una de esas restricciones. No hay que tener miedo de empeorar un aspecto de la aplicación para mejorar otros. Por ejemplo, no hay que dudar en reducir la calidad del renderizado de la UI si como consecuencia se logra reducir el tamaño del APK y la aplicación se hace más fluida. El 99% de los usuarios no notarán que la calidad ha bajado, pero sí notarán que la aplicación va más fluida. Al fin y al cabo, una aplicación se juzga por su totalidad, no por la suma de ciertos aspecto por separado.

> Gracias al [Cyril][20] por permitirme traducir su artículo original *“Putting Your APKs on Diet”*

#### Referencias

*Putting Your APKs on Diet por Cyril Mottier* »» <a href="http://cyrilmottier.com/2014/08/26/putting-your-apks-on-diet/" target="_blank">cyrilmottier.com</a>



 [1]: https://elbauldelprogramador.com/eliminar-recursos-sin-usar-en-android/ "Eliminar recursos sin usar en Android"
 [2]: http://cyrilmottier.com/ "Blog de Cyril"
 [3]: https://elbauldelprogramador.com/crear-un-entorno-de-desarrollo-para-wordpress-con-git-capistrano-y-wp-deploy/ "Crear un entorno de desarrollo para WordPress con Git, Capistrano y Wp-Deploy"
 [4]: https://elbauldelprogramador.com/curso-programacion-android/ "Curso Android"
 [5]: https://elbauldelprogramador.com/programacion-android-recursos-trabajar_04/ "Trabajar con recursos Assets"
 [6]: https://elbauldelprogramador.com/programacion-android-recursos/ "Introducción a los recursos Android"
 [7]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/ "Qué es el AndroidManifest.xml"
 [8]: https://elbauldelprogramador.com/desafio-de-ingenieria-inversa-en-c-soluciones/ "Ofuscamiento de código"
 [9]: https://elbauldelprogramador.com/clases-y-objetos-introduccion/ "Introducción a las Clases"
 [10]: http://en.wikipedia.org/wiki/Reflection_(computer_programming) "Definición de Reflexión"
 [11]: https://elbauldelprogramador.com/programacion-android-recursos-2/ "Recursos compilados y no compilados"
 [12]: http://sebastien-gabriel.com/designers-guide-to-dpi/home "Designers guide to DPI"
 [13]: https://elbauldelprogramador.com/cual-es-la-diferencia-entre-los-distintos-formatos-de-audio-y-cual-deberia-elegir/ "¿Cual es la diferencia entre los distintos formatos de audio, y cual debería elegir?"
 [14]: https://developer.android.com/tools/help/draw9patch.html "Documentación Android"
 [15]: https://elbauldelprogramador.com/introduccion-al-ndk-de-android/ "Introducción al NDK de Android"
 [16]: http://blog.algolia.com/android-ndk-how-to-reduce-libs-size/ "Android NDK How to reduce libs size"
 [17]: https://elbauldelprogramador.com/adapter-personalizado-en-android/ "Crear un adapter personalizado"
 [18]: https://developer.android.com/training/wearables/apps/layouts.html#UiLibrary
 [19]: http://developer.android.com/reference/android/content/pm/ActivityInfo.html#CONFIG_DENSITY "CONFIG_DENSITY"
 [20]: https://twitter.com/cyrilmottier "@cyrilmottier"
