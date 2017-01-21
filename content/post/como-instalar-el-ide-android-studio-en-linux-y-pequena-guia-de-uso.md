---
author: alex
categories:
- android
- how to
color: '#689F38'
layout: post.amp
mainclass: android
permalink: /como-instalar-el-ide-android-studio-en-linux-y-pequena-guia-de-uso/
tags:
- caracteristicas android Studio
- guia android studio
- instalar android studio
- manuales android studio
- tutorial android studio
title: "C\xF3mo instalar el IDE Android Studio en Linux y peque\xF1a gu\xEDa de uso"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/AndroidStudio.png" alt="AndroidStudio" width="402px" height="302px" />
Ayer en el Google I/O 2013 presentaron Android Studio, un IDE basado en IntelliJIDEA. Ya está disponible para descargar en <a href="http://developer.android.com/sdk/installing/studio.html" target="_blank">developer.android.com</a>. He estado probándolo y me ha gustado bastante. Hoy voy a explicar cómo instalar este IDE en Linux, y un pequeño tutorial de uso.

Descargamos el IDE ([Linux][1]) | ([Windows][2]). Lo descomprimimos y ejecutamos el el fichero *studio.sh*, que se encuentra en la carpeta *bin*. En Linux se recomienda instalar el JDK de Oracle. Para instalarlo seguimos los siguientes pasos:

<!--more--><!--ad-->

### Instalar el JDK de ORACLE en Linux desde repositorio

Introducimos en la terminal los siguientes comandos:

```bash
su -
echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu precise main" | tee -a /etc/apt/sources.list
echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu precise main" | tee -a /etc/apt/sources.list
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886
apt-get update
apt-get install oracle-java7-installer

```

Para configurar automáticamente la variables de entorno, instalamos el siguiente paquete:

```bash
sudo apt-get install oracle-java7-set-default

```

Con esto ya deberíamos tener listo el JDK, lanzamos Android Studio y veremos algo como esto:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/AndroidStudioIDE-1024x734.png" alt="AndroidStudioIDE" width="1024px" height="734px" />][3]

### Exportar proyectos de eclipse e importarlos Android Studio

Una vez hecho esto, lo más probable es que queramos importar los proyectos que teníamos en eclipse a Android Studio, para ello es necesario actualizar el plugin ADT en eclipse, y luego seguir estos pasos:

  1. Seleccionar **File » Export**.
  2. En la ventana que aparece, abrir **Android** y seleccionar **Generate Gradle
    build files**.
  3. Seleccionar los proyectos a exportar y hacer click en **Finish**.

En Android Studio, importamos el proyecto:

  1. Seleccionar **File » Import**.
  2. Localizar el proyecto a importar
  3. Seleccionar ** Create project from existing sources**

La estructura de los proyectos ha cambiado respecto a como [estaba organizado en eclipse][4]. Ahora, prácticamente todos los archivos se encuentran bajo el directorio `src/`, incluyendo la carpeta `res/` y el *[AndroidManifest][5]*. Estos cambios se deben al sistema Grandle, cuya guía se puede consultar <a href="http://tools.android.com/tech-docs/new-build-system/user-guide" target="_blank">aquí</a>.

Algunas de las características nuevas de este IDE es la posiblidad de visualizar cómo se verá nuestra aplicación en distintos dispositivos, para ello abrimos un archivo de *layout*, abajo hay una pestaña llamada *text*, la seleccionamos y podremos editar el archivo manualmente. A la derecha hay otra pestaña llamada *Preview*, la abrimos y veremos algo como esto:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/LayoutPreviewAndroidStudio-1024x733.png" alt="LayoutPreviewAndroidStudio" width="1024px" height="733px" />][6]

También es posible visualizar la interfaz de la aplicación para distintas APIs, la anterior era para la API 17, esta para a 10:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/AndroidStudioPreviewAPI10-1024x735.png" alt="AndroidStudioPreviewAPI10" width="1024px" height="735px" />][7]

De igual modo, podemos seleccionar qué idioma mostrar en la interfaz para asegurarnos de que la aplicación se verá bien en todos los idiomas.

Otra de las características que resulta de lo más cómoda es mostrar las cadenas de texto que escribimos en el código mediante `R.string.`, dejando el ratón encima del texto veremos el identificadorL:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/05/Screenshot-from-2013-05-16-121607-1024x735.png" alt="Mostrar cadenas de Texto AndroidStudio" width="1024px" height="735px" />][8]

Para terminar os dejo unas cuantas combinaciones de teclas para ahorrar tiempo al programar:

<table>
<tr>
<th>
      Action
    </th>
<th>
      Android Studio Key Command
    </th>
</tr>
<tr>
<td>
      Command look-up (autocomplete command name)
    </td>
<td>
      CTRL + SHIFT + A
    </td>
</tr>
<tr>
<td>
      Project quick fix
    </td>
<td>
      ALT + ENTER
    </td>
</tr>
<tr>
<td>
      Reformat code
    </td>
<td>
      CTRL + ALT + L (Win)<br /> OPTION + CMD + L (Mac)
    </td>
</tr>
<tr>
<td>
      Show docs for selected API
    </td>
<td>
      CTRL + Q (Win)<br /> F1 (Mac)
    </td>
</tr>
<tr>
<td>
      Show parameters for selected method
    </td>
<td>
      CTRL + P
    </td>
</tr>
<tr>
<td>
      Generate method
    </td>
<td>
      ALT + Insert (Win)<br /> CMD + N (Mac)
    </td>
</tr>
<tr>
<td>
      Jump to source
    </td>
<td>
      F4 (Win)<br /> CMD + down-arrow (Mac)
    </td>
</tr>
<tr>
<td>
      Delete line
    </td>
<td>
      CTRL + Y (Win)<br /> CMD + Backspace (Mac)
    </td>
</tr>
<tr>
<td>
      Search by symbol name
    </td>
<td>
      CTRL + ALT + SHIFT + N (Win)<br /> OPTION + CMD + O (Mac)
    </td>
</tr>
</table>
<table>
<tr>
<th>
      Action
    </th>
<th>
      Android Studio Key Command
    </th>
</tr>
<tr>
<td>
      Build
    </td>
<td>
      CTRL + F9 (Win)<br /> CMD + F9 (Mac)
    </td>
</tr>
<tr>
<td>
      Build and run
    </td>
<td>
      SHIFT + F10 (Win)<br /> CTRL + R (Mac)
    </td>
</tr>
<tr>
<td>
      Toggle project visibility
    </td>
<td>
      ALT + 1 (Win)<br /> CMD + 1 (Mac)
    </td>
</tr>
<tr>
<td>
      Navigate open tabs
    </td>
<td>
      ALT + left-arrow; ALT + right-arrow (Win)<br /> CTRL + left-arrow; CTRL + right-arrow (Mac)
    </td>
</tr>
</table>

### Conclusiones

Aunque Android Studio está todavía en desarrollo, promete mucho y voy a empezar a usarlo como IDE por defecto. ¿Qué opináis vosotros? ¿Lo habéis probado?, compartid vuestra experiencia en los comentarios.

#### Referencias

*Instalar JDK en Debian* »» <a href="http://www.webupd8.org/2012/06/how-to-install-oracle-java-7-in-debian.html" target="_blank">webupd8</a>



 [1]: http://dl.google.com/android/studio/android-studio-bundle-130.677228-linux.tgz
 [2]: http://dl.google.com/android/studio/android-studio-bundle-130.677228-windows.exe
 [3]: https://elbauldelprogramador.com/img/2013/05/AndroidStudioIDE.png
 [4]: https://elbauldelprogramador.com/programacion-android-hola-mundo/
 [5]: https://elbauldelprogramador.com/fundamentos-programacion-android_16/
 [6]: https://elbauldelprogramador.com/img/2013/05/LayoutPreviewAndroidStudio.png
 [7]: https://elbauldelprogramador.com/img/2013/05/AndroidStudioPreviewAPI10.png
 [8]: https://elbauldelprogramador.com/img/2013/05/Screenshot-from-2013-05-16-121607.png
