---
author: alex
categories:
- android
color: '#689F38'
date: '2016-01-01'
description: "C\xF3mo crear dialogos de selecci\xF3n de fecha y hora en versiones
  inferiores a Android 3.0 con la librer\xEDa de soporte."
lastmod: 2016-08-14

mainclass: android
url: /crear-dialogfragment-compatibles-con-versiones-inferiores-a-android-3-0/
tags:
- "android librer\xEDa de compatibilidad"
- android timepickerdialog dialogfragment example
- curso android pdf
- DataPickerDialog
- DialogFragment
- supportv4
- TimeoPickerDialog
title: Crear DialogFragment compatibles con versiones inferiores a Android 3.0
---

En un proyecto reciente he tenido que trabajar con las librerías de compatibilidad de Android, en este caso para crear diálogos que permitan elegir fecha y hora, como estos:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/11/pickers1.png" alt="" title="pickers" width="400px" height="186px"></amp-img>
</figure>

En Android recomiendan usar un <a href="http://developer.android.com/reference/android/support/v4/app/DialogFragment.html" title="DialogFrgment" target="_blank">`DialogFragment`</a>, que permite mostrar éstos diálogos en distintos layouts. Si pretendes que tu aplicación soporte este tipo de diálogos para versiones inferiores a Android 3.0, debes usar el DialogFragment mencionado anteriormente, si por lo contrario tu aplicación usa un *minSdkVersion* igual o superior a 11, puedes usar este otro <a href="http://developer.android.com/reference/android/app/DialogFragment.html" target="_blank">`DialogFragment`</a>. En este artículo se va a tratar la versión para soportar versiones anteriores a la 3.0.



## Requisitos previos

Antes de empezar, es necesario descargar <a href="http://developer.android.com/tools/extras/support-library.html" target="_blank">Support Library</a> y agregarlas a nuestro proyecto Android (En eclipse, botón derecho en el proyecto &rsaquo;&rsaquo; propiedades &rsaquo;&rsaquo; Java Build Path &rsaquo;&rsaquo; lib).

Otra forma de agregar la librería es hacer click derecho en el **proyecto » Android Tools » Add support library**.

Dicho esto, comencemos con el <a href="http://developer.android.com/reference/android/app/TimePickerDialog.html" target="_blank"><code><strong>TimePickerDialog</strong></code></a>

<!--more--><!--ad-->

## Crear un TimePickerDialog

El primer paso es crear una clase *fragment* que herede de *DialogFragment* y devuelva un <em>TimePickerDialog</em> desde el método <a href="http://developer.android.com/reference/android/support/v4/app/DialogFragment.html#onCreateDialog%28android.os.Bundle%29" target="_blank"><code><em> onCreateDialog()</em></code></a> del *fragment*:

```java
import android.app.Dialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.text.format.DateFormat;
import android.widget.TimePicker;

import java.util.Calendar;

public class TimePickerFragment extends DialogFragment implements
        TimePickerDialog.OnTimeSetListener
{

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState)
    {
        // Use the current time as the default values for the picker
        final Calendar c = Calendar.getInstance();
        int hour = c.get(Calendar.HOUR_OF_DAY);
        int minute = c.get(Calendar.MINUTE);

        // Create a new instance of TimePickerDialog and return it
        return new TimePickerDialog(getActivity(), this, hour, minute,
                DateFormat.is24HourFormat(getActivity()));
    }

    public void onTimeSet(TimePicker view, int hourOfDay, int minute)
    {
    }
}
```

Para cerciorarnos que se está usando la librería de compatibilidad, basta con ver el `import android.support.v4.app.DialogFragment;`

Por ahora dejaremos el método `onTimeSet` vacío; pasemos a crear la interfaz. A modo de ejemplo, crearemos un botón que muestre el dialogo cuando sea pulsado:

```xml
<button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:onclick="mostrarDialogoDeTiempo"
    android:text="Diálogo de tiempo"/>
```

Luego, creamos el método `mostrarDialogoDeTiempo` que será llamado al pulsar el botón:

```java
public void mostrarDialogoDeTiempo(View v) {
   DialogFragment newFragment = new TimePickerFragment();
   newFragment.show(getSupportFragmentManager(), "timePicker");
}

```

Llegados a este punto, es importante saber qué clase hemos de importar. Ya que el objetivo buscado es lograr compatibilidad entre las distintas versiones de android, para que la interfaz de la aplicación sea la misma en cualquier versión, la clase a importar es `import android.support.v4.app.DialogFragment;`. De lo contrario, sería `import android.app.DialogFragment;` Otro aspecto importante de cara a la compatibilidad, es la llamada a <a href="http://developer.android.com/reference/android/support/v4/app/FragmentActivity.html#getSupportFragmentManager%28%29" target="_blank">getSupportFragmentManager()</a> y que nuestra actividad herede de **FragmentActivity** en lugar de **Activity**.

Para comprobar que funciona, lanzamos el emulador, en este caso, con la versión 2.3 de Android:

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/01/device-2013-01-12-1337262.png" alt="TimePickerFragment Suportv4" width="480" height="800"></amp-img>
</figure>

El proceso de creación de un **DatePickerDialog** es muy similar.

## Crear un DatePickerDialog

Definimos la clase:

```java
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.widget.DatePicker;

import java.util.Calendar;

public class DatePickerFragment extends DialogFragment
        implements DatePickerDialog.OnDateSetListener {

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the current date as the default date in the picker
        final Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);

        // Create a new instance of DatePickerDialog and return it
        return new DatePickerDialog(getActivity(), this, year, month, day);
    }

    public void onDateSet(DatePicker view, int year, int month, int day) {
        // Do something with the date chosen by the user
    }
}
```

Al igual que antes, creamos un botón que muestre el diálogo:

```xml
<button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:onclick="mostrarDialogoDeFecha"
    android:text="Diálogo de fecha"/>
```

He implementamos el método que responderá al pulsar el botón:

```java
public void mostrarDialogoDeFecha(View v){
   DialogFragment newFragment = new DatePickerFragment();
   newFragment.show(getSupportFragmentManager(), "datePicker");
}

```
<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/01/device-2013-01-12-1352432.png" alt="DateTimePicker supportv4 Android" width="480" height="800"></amp-img>
</figure>

Así de simple, es similar a crear un **timePickerDialog**.

## Referencias

- *developer.android* »» <a href="http://developer.android.com/guide/topics/ui/controls/pickers.html" target="_blank">Visitar sitio</a>
