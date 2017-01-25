---
author: alex
categories:
- android
- aplicaciones
color: '#689F38'
date: '2016-01-01'
description: "\xDAltimamente recibo muchos correos haciendome preguntas sobre cuestiones
  sobre Android, eso me alegra, ya que significa que la gente lee el blog y se interesa
  por el contenido, pero sinceramente, no dispongo del tiempo (ni tampoco del conocimiento)
  suficiente para responder a todas ellas. Por eso, aprovechando que encontr\xE9 un
  art\xEDculo en ingl\xE9s que nombraba los 10 errores comunes de los nuevos programadores
  en esta plataforma. Aqu\xED los dejo traducidos, ya que son de lectura recomendable:"
lastmod: 2016-10-26

mainclass: android
url: /los-10-errores-de-novato-que-todo/
tags:
- curso android pdf
title: "10 errores de novato que todo desarrollador Android deber\xEDa evitar"
---

Últimamente recibo muchos correos haciendome preguntas sobre cuestiones sobre Android, eso me alegra, ya que significa que la gente lee el blog y se interesa por el contenido, pero sinceramente, no dispongo del tiempo (ni tampoco del conocimiento) suficiente para responder a todas ellas. Por eso, aprovechando que encontré un artículo en inglés que nombraba los 10 errores comunes de los nuevos programadores en esta plataforma. Aquí los dejo traducidos, ya que son de lectura recomendable:



### 1. No leer la documentación de Android

La web de <a target="_blank" href="http://developer.android.com/index.html">Android para desarrolladores</a> está ahí para ayudarte. Mucha de la información se puede descargar con las SDK tools y también está disponible online (esta última es la mejor opción ya que está en continua actualización). La documentación es mucho más que una referencia de la API Javadoc. Incluye muchas guías, tutoriales, vídeos y mucho otro material que puede ayudarnos a crear aplicaciones Android.

Recientemente se ha incluido <a target="_blank" href="http://developer.android.com/training/index.html">Android Training</a>, que organiza tutoriales dentro de clases y lecciones para guiarnos a resolver problemas o implementar características particulares.

<!--more--><!--ad-->

### 2. No familiarizarse con la herramientas de Android

El SDK de Android es más que una librería que se usa para compilar aplicaciones para que funcionen en teléfonos Android, ofrece docenas de herramientas para ayudar en la construcción de las aplicaciones. Algunas de ellas ayudan a diseñar gráficos y diseños de pantalla. Otras herramientas son vía línea de comandos, las cuales proporcionan aceso fácil al emulador o el hardware del dispositivo.Y otras que ayudan al ajuste de rendimiento y perfiles.

Puedes encontrar más información sobre muchas de estas <a target="_blank" href="http://www.developer.com/ws/android/development-tools/">herramientas</a> en la d<a target="_blank" href="https://developer.android.com/guide/developing/tools/index.html">ocumentación del SDK</a>.

### 3. No pedir ayuda a la comunidad Android

La comunidad Android es muy amplia y amigable. Cuando tienes preguntas que la documentación del SDK no puede responder, es muy recomendable buscar ayuda en StackOverflow.com, la cual tiene una <a target="_blank" href="http://stackoverflow.com/questions/tagged/android">sección para Android</a>. Otros recursos que pueden servir de ayuda son la <a target="_blank" href="https://developer.android.com/resources/community-groups.html#ApplicationDeveloperLists">lista de correo de google</a> y sítios con tutoriales, los cuales puedes encontrar en el <a target="_blank" href="http://www.developer.com/ws/android">centro para desarrolladores Android</a>.

### 4. Ser perezoso porque las aplicaciones Android están escritas en Java

Java puede que sea un lenguaje de alto nivel con una máquina virtual que intenta hacer el desarrollo lo más sencillo posible, pero no por ello has de ser un programador perezoso. Las directrices de programación estándares siguen aplicandose. La mayoría de los dispositivos Android tienen una capacidad limitada de procesamiento y capacidad de almacenamiento en comparación con los ordenadores tradicionales, por lo tanto las prácticas incorrectas o ineficientes de programación tienen un impacto mucho mayor en el rendimiento general y en la experiencia del usuario.

### 5. Asumir que los proyectos de desarrollo para móviles se pueden hacer con poco dinero.

***Pantalla pequeña != proyecto pequeño***. Muchos desarrolladores nuevos en los dispositivos móviles (y, desgraciadamente sus jefes) piensan erróneamente que todos los proyectos para móviles se pueden terminar en un fin de semana por un único estudiante hasta arriba de cafeína. Sin embargo, la verdad es que la mayoría de los proyectos que tienen éxito requieren especificaciones funcionales, horarios, control de errores, ingenieros dedicados, diseñadores dedicados, probadores de control de calidad y un plan de lanzamiento y mantenimiento al igual que los proyectos tracidionales de desarrollo de software.

### 6. Usar un prototipo como base para una aplicación Android.

No es la primera vez que se ve una aplicación que básicamente era un [hola mundo][1] con un montón de código de ejemplo pegado en lugares aleatorios.

Tómate el tiempo para aprender y experimentar con la plataforma Android en primer lugar. Luego, siéntate con tu equipo y piensa en lo que queréis realmente crear y empezar desde cero. En última instancia, se ahorrará en tiempo y quebraderos de cabeza y obtendrás un código de alta calidad fácilmente mantenible para el futuro.

### 7. Pobre integración con el Sistema Operativo

La plataforma Android proporciona muchas características a los desarrolladores para integrar sus aplicaciones estrechamente con el sistema y otras aplicaciones. Aprovecha los <a target="_blank" href="http://www.developer.com/ws/article.php/3833306/Creating-a-Home-Screen-App-Widget-on-Android.htm">widgets</a> de la pantalla principal, [proveedores de contenidos][2], manejadores de [intents][3] y otras características. Asegúrate de que cualquier tipo de contenido que la aplicación maneja pueda aparecer en el menú &#8220;Compartir&#8221;. Usar estas características de la plataforma diferencia tu aplicación de la mayoría. Además, los usuarios verán y participarán con tu aplicación con más frecuencia si es fácil acceder a ella.

### 8. Definir inadecuadamente los detalles de configuración de la aplicación.

El Android Manifest es el archivo principal para la configuración de una aplicación, pero esta información es incorrecta frecuentemente incluso en aplicaciones publicadas. Muchos desarrolladores no especifican correctamente las características de dispositivos que soportan.

Otro error común que se produce en el Android Manifest es registrar permisos que no son necesarios. Estos errores pueden causar que la aplicación se publique incorrectamente en el ANdroid Market, dando como resultado menor puntuaciones de los usuarios, entre otras cosas.

### 9. Desarrollar una aplicación de iPhone para Android

Todos lo hemos visto. Bajas una aplicación para tu brillante Android nuevo, pero intenta paracerse y comportarse exáctamente como una aplicación típica de iOS. Eso no está bien. La plataforma Android tiene su propio diseño y comportamiento, que es el que usuario espera &#8212; ya que para eso se compró un dispositivo Android. Estas aplicaciones con frecuencia no tienen widgets, content providers y otras características únicas de Android (Vea #7), lo cual hace parecer que ésta aplicación está aún más fuera de lugar.

### 10. No seguir manteniendo la aplicación después de publicarla.

¿Has notado cuantas aplicaciones no llegan a actualizarse nunca, mientras que otras se actualizan constantemente? Para que una aplicación sea relevante para los usuarios, los desarrolladores deben seguir actualizandolas. La plataforma Android sigue madurando a un ritmo constante. Presta atención a las comunicaciones del Androd Market, que a menudo resaltan los cambios necesarios que los desarrolladores necesita hacer. Sin actualizaciones, muchas aplicaciones se quedarán atrás. Asegúrate de que tu aplicación no es una de ellas.

### Recomendación para los nuevos en Android

La mejor manera de evitar errores es ser consciente del peligro de cometerlos en primer luguar. Se han listado 10 de los errores más comunes. Simplemente sé consciente de ellos te ayudará a inculcártelos a tí y a tu equipo.

Fuente: <a target="_blank" href="http://www.developer.com/ws/android/programming/5-common-android-newbie-mistakes.html">developer.com</a>

 [1]: https://elbauldelprogramador.com/programacion-android-hola-mundo/
 [2]: https://elbauldelprogramador.com/programacion-android-proveedores-de
 [3]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
