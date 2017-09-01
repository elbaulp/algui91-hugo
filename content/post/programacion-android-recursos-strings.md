---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-09-01T12:25:23+01:00
mainclass: android
url: /programacion-android-recursos-strings/
tags:
- curso android pdf
- recursos android
- strings android
title: "Programación Android: Recursos - Strings"
---

# Introducción

Como ya hemos visto, los recursos juegan un papel muy importante en la arquitectura Android. Un recurso en Android es un archivo (como un fichero de música) o un valor (como el título de un Diálogo) que está ligado a una aplicación ejecutable. Estos archivos están ligados a un ejecutable de tal manera que podemos cambiarlos sin necesidad de recompilar la aplicación.

Los ejemplos de recursos más familiares son cadenas de texto, colores e imágenes. En lugar de escribir las cadenas de texto en el código fuente, usamos sus IDs. Esta indirección nos permite cambiar el valor de la cadena sin tener que cambiar el código fuente.

Existen mucho recursos en Android, que vamos a ver a lo largo de las etradas posteriores. Empezaremos por un recurso muy común, los string:

<!--more--><!--ad-->

# Recursos string

Android permite definir strings en uno o más archivos XML de recursos. Estos archivos están bajo el directorio ***./res/values***. El nombre del archivo XML para este tipo de recurso puede ser cualquiera, pero por convención se suele llamar ***strings.xml***. Veamos un ejemplo de este fichero:

```xml
<?xml version="1.0" encoding="utf­8"?>
<resources>
    <string name="hello">Hello</string>
    <string name="app_name">Hello_app</string>
</resources>
```

Cuando este archivo se crea o modifica, el plugin ADT de eclipse automáticamente creará o actualizará una clase java de nuestra aplicación llamada ***R.java*** alojada en el directorio ./gen, que contiene los IDs únicos para las dos cadenas que acabamos de crear.

Para el fichero strings.xml que acabamos de crear, tendremos lo siguiente en la clase R:

```java
package nombre.de.nuestro.paquete;
public final class R {
   //.. otras entradas dependiendo de tu proyecto y aplicación

   public static final class string {
      //.. otras entradas dependiendo de tu proyecto y aplicación
      public static final int app_name=0x7f040001;
      public static final int hello=0x7f040000;
      //.. otras entradas dependiendo de tu proyecto y aplicación
   }
   //.. otras entradas dependiendo de tu proyecto y aplicación
}
```

Como vemos como primero R.java define una clase principal en el paquete raiz: ***public final class R***. Depues, define una clase interna llamada ***public static final class string***. R.java crea esta clase estática interna como espacio de nombres para guardar los IDs de los recursos string.

La definición de los dos ***public static final int*** llamados app_name y hello son los IDs de los recursos que representan nuestras cadenas de texto. Podemos usar estos IDs en cualquier lugar de nuestro código mediante ***R.string.hello o R.string.app_name***

La estructura del fichero string.xml es muy fácil de seguir. Tenemos un elemento raiz llamado `<resources>`, seguido por uno o más elementos hijos `<string>`. Cada elemento `<string>` tiene una propiedad llamada ***name*** que será la que usará como identificador R.java.

Para comprobar que se permiten varios recursos de string en el directorio values, vamos a crear otro fichero llamado strings1.xml con lo siguiente:

```xml
<?xml version="1.0" encoding="utf­8"?>
<resources>
    <string name="hello1">Hello1</string>
    <string name="app_name1">Hello_app1</string>
</resources>
```

Ahora, el plugin ADT de eclipse se encargará de actualizar el fichero R.java, que contendrá lo siguiente:

```java
package nombre.de.nuestro.paquete;
public final class R {
   //.. otras entradas dependiendo de tu proyecto y aplicación

   public static final class string {
      //.. otras entradas dependiendo de tu proyecto y aplicación
      public static final int app_name=0x7f040001;
      public static final int hello=0x7f040000;
      public static final int app_name1=0x7f040006;
      public static final int hello1=0x7f040005;
      //.. otras entradas dependiendo de tu proyecto y aplicación
   }
   //.. otras entradas dependiendo de tu proyecto y aplicación
}
```

# Siguiente Tema: [Programación Android: Recursos - Layout][1]

 [1]: https://elbauldelprogramador.com/programacion-android-recursos-layout/
