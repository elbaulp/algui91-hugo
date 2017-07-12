---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-07-12T17:34:33+01:00
mainclass: android
url: /programacion-android-interfaz-grafica_11/
tags:
- "android diseñar gui"
- android programar ProgressDialog
- como hacer interfaces graficas en android
- curso android pdf
- interfaces de usuario android
- interfaz grafica en android
- layout android
- menu android
- notificaciones
- android
title: "Programación Android: Interfaz gráfica - Diálogos y notificaciones"
---

En ocasiones hay que mostrar mensajes al usuario para informarle del estado de la aplicación, o del estado de las operaciones que se estén llevando a cabo.

Android dispone de tres tipos de notificaciones:

<!--more--><!--ad-->

  * Notificaciones Toast.
  * Notificaciones en la barra de estado.
  * Ventanas de diálogo.

# Notificaciones Toast

Una notificación Toast es un mensaje que se muestra superpuesto en la pantalla. Solo ocupa el espacio necesario para mostrar la alerta, mientras tanto, la actividad que estaba visible puede seguir usándose. Este tipo de notificaciones se muestran durante un periodo de tiempo y desaparecen, no permiten interactuar con ellas. Debido a que un Toast se crea mediante un servicio en segundo plano, puede aparecer aunque la aplicación no esté visible.

A lo largo de todas las [entradas sobre Android][1], se ha usado mucho este típo de notificaciones:

```java
Toast.makeText(context, text, duration).show();

```

Para pasar el contexto, tenemos varias posibilidades, ***NombreActividad.this***, o ***getApplicationContext().***

Para fijar la duración del mensaje, usamos una de las dos constantes predefinidas, ***Toast.LENGTH\_SHORT ó Toast.LENGTH\_LONG***

En este caso, vamos a crear un layout personalizado para mostrar el Toast:

```xml
<linearlayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:id="@+id/toastLayout"
  android:orientation="horizontal"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:padding="10dp"
  android:background="#DAAA">

  <imageview android:layout_width="48px"
    android:layout_height="48px"
    android:src="@drawable/ok"
    android:padding="5dip"
    android:id="@+id/ok"/>

  <textview android:id="@+id/textview"
    android:layout_width="wrap_content"
    android:layout_height="fill_parent"
    android:text="Toast con layout personalizado"
    android:textColor="#fff"
    android:gravity="center_vertical|center_horizontal"/>

</linearlayout>
```

Hay que asignar un id al LinearLayout, que usaremos posteriormente. También hemos creado un ImageView para mostrar un icono, y un TextView para mostrar el mensaje.

El siguiente paso es inflar este layout desde el código:

```java
LayoutInflater inflater = getLayoutInflater();
View layout = inflater.inflate(
   R.layout.toast_layout
   ,(ViewGroup) findViewById(R.id.toastLayout));

Toast toast = new Toast(getApplicationContext());
toast.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
toast.setDuration(Toast.LENGTH_LONG);
toast.setView(layout);
toast.show();

```

Listo, al ejecutar la aplicación tendremos un Toast como este:


<figure>
    <a href="https://2.bp.blogspot.com/-r66Zg6aP020/ThsyX24tuCI/AAAAAAAAArk/wWEypxjYmdo/s1600/toastPersonalizado.png"  ><amp-img sizes="(min-width: 240px) 240px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Toast notification Android " title="Toast notification Android"  height="400" width="240" src="https://2.bp.blogspot.com/-r66Zg6aP020/ThsyX24tuCI/AAAAAAAAArk/wWEypxjYmdo/s400/toastPersonalizado.png" /></a>
</figure>


Para saber más acerca de los mensajes toast puede visitar: <a href="https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/toasts.html" target="_blank" title="https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/toasts.html">https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/toasts.html</a>

# Notificaciones en la barra de estado

Este tipo de notificaciones muestran un icono en la barra de estado, cuando desplegamos esta barra, veremos el icono acompañado de un texto descriptivo indicando que ha pasado algo (Como que hemos recibido un nuevo mensaje, o un correo electrónico).

Los pasos necesarios para crear este tipo de notificaciones son, usar el gestor de notificaciones del sistema (NotificationManager) y posteriormente crear un objeto Notification en el que configuraremos nuestra notificación. Vamos a ver como hacerlo.

```java
NotificationManager mNotificationManager =
    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

//Agregando el icono, texto y momento para lanzar la notificación
int icon = R.drawable.ok;
CharSequence tickerText = "Notification Bar";
long when = System.currentTimeMillis();

Notification notification = new Notification(icon, tickerText, when);

Context context = getApplicationContext();
CharSequence contentTitle = "Notificación en barra";
CharSequence contentText = "Mensaje corto de la notificación";

//Agregando sonido
notification.defaults |= Notification.DEFAULT_SOUND;
//Agregando vibración
notification.defaults |= Notification.DEFAULT_VIBRATE;

Intent notificationIntent = new Intent(this, NotificacionesActivity.class);
PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);
notification.setLatestEventInfo(context, contentTitle, contentText, contentIntent);

mNotificationManager.notify(HELLO_ID, notification);

```

El resultado es el siguiente:

<div class="separator" >
<a href="https://3.bp.blogspot.com/-pCGwTzNQ89w/Ths04zdOqMI/AAAAAAAAArs/Y1tFR9TKe5I/s1600/notificationBar.png"  ><amp-img sizes="(min-width: 240px) 240px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="notification bar Android" alt="notification bar Android"  height="400" width="240" src="https://3.bp.blogspot.com/-pCGwTzNQ89w/Ths04zdOqMI/AAAAAAAAArs/Y1tFR9TKe5I/s400/notificationBar.png" /></a>
</div>

Al igual que los Toast, se puede crear un layout personalizado, para más información visite: <a href="https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/notifications.html" target="_blank" title="https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/notifications.html">https://web.archive.org/web/20151121170738/http://developer.android.com/guide/topics/ui/notifiers/notifications.html</a>

# Diálogos

Por último, vamos a ver los diálogos, que son ventanas que se muestran delante de las actividades, y pueden recibir acciones del usuario, hay varios tipos:

  * AlertDialog
  * ProgressDialog
  * DatePickerDialog
  * TimePickerDialog

Si necesitamos un Diálogo que no sea uno de los de arriba, podemos extender de la clase ***Dialog***, y crear el nuestro propio.

La clase Activity implementa métodos para gestionar los dialogos, son:

  * ***onCreateDialog(int):*** Encargado de crear el diálogo.
  * ***onPrepareDialog(int):*** Llamado justo antes de mostrarlo.
  * ***showDialog(int):*** Para mostrarlo.
  * ***dismissDialog(int):*** cierra el diálogo, guardando su estado.
  * ***removeDialog(int):*** cierra el dialogo elminándolo por completo.

Vamos a ver un ejemplo de AlertDialog, que preguntará si queremos salir de la aplicación:

```java
AlertDialog.Builder dialog = new AlertDialog.Builder(this);

dialog.setMessage("¿Salir?");
dialog.setCancelable(false);
dialog.setPositiveButton("Si", new DialogInterface.OnClickListener() {

  @Override
  public void onClick(DialogInterface dialog, int which) {
     NotificacionesActivity.this.finish();
  }
});
dialog.setNegativeButton("No", new DialogInterface.OnClickListener() {

   @Override
   public void onClick(DialogInterface dialog, int which) {
      dialog.cancel();
   }
});
dialog.show();

```

<div class="separator" >
<a href="https://1.bp.blogspot.com/-GhH6GUJdti0/Ths8m7mMf6I/AAAAAAAAAr0/Ox9Cn6gaLTA/s1600/alertDialog.png"  ><amp-img sizes="(min-width: 240px) 240px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="alertDialog Android" title="AlertDialog android"  height="400" width="240" src="https://1.bp.blogspot.com/-GhH6GUJdti0/Ths8m7mMf6I/AAAAAAAAAr0/Ox9Cn6gaLTA/s400/alertDialog.png" /></a>
</div>

También vamos a ver un ProgressDialog, indefinido (Que nunca termina).

```java
ProgressDialog.show(
             NotificacionesActivity.this
            ,"ProgressDialog"
            ,"Ejemplo diálogo de progreso"
            ,true
            ,true);

```

Los dos últimos parámetros son para que el diálogo sea indeterminado, y para que se pueda cerrar con la flecha de &#8220;atrás&#8221; del terminal.

<div class="separator" >
    <a href="https://1.bp.blogspot.com/-uf-rVH41HfM/Ths-BUGmQ9I/AAAAAAAAAr8/7JsOXm7ScKs/s1600/progressDialog.png"  ><amp-img sizes="(min-width: 240px) 240px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  height="400" width="240" src="https://1.bp.blogspot.com/-uf-rVH41HfM/Ths-BUGmQ9I/AAAAAAAAAr8/7JsOXm7ScKs/s400/progressDialog.png" /></a>
</div>

Se puede descargar el proyecto de esta entrada aquí:

<a class="aligncenter download-button" href="https://elbauldelprogramador.com/" rel="nofollow"> Download &ldquo;Notificaciones&rdquo; <small>Notificaciones.zip &ndash; Downloaded 2066 times &ndash; </small> </a>

# Siguiente Tema: [Programación Android: Interfaz gráfica - Estilos y Temas][2]

 [1]: https://elbauldelprogramador.com/guia-de-desarrollo-android
 [2]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_18/
