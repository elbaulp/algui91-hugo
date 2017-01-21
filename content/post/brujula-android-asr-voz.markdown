---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-02-15 19:36:34
description: "Enunciado: se debe identificar mediante interfaz vocal un punto cardinal
  (Norte, Sur, Este y Oeste) y el porcentaje de error (cantidad entera) en la detecci\xF3n
  del punto, solo el n\xFAmero, por ejemplo \u201CNorte diez\u201D. Una vez reconocido
  el patr\xF3n vocal se debe mostrar una br\xFAjula para que el usuario se oriente
  en la direcci\xF3n indicada, cuando lo realice se le debe indicar que ya se ha conseguido."
image: hotlink-ok/Crear-Una-Brujula-Con-Reconocimiento-De-Voz-en-Android.png
layout: post.amp
mainclass: java
modified: null
tags:
- brujula android
- crear brujula android
- programar brujula android
- reconocimiento de voz android
- tutorial ASR android
title: "Crear Una Br\xFAjula Con Reconocimiento De Voz en Android"
---

<figure>
<a href="/img/hotlink-ok/Crear-Una-Brujula-Con-Reconocimiento-De-Voz-en-Android.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Crear-Una-Brujula-Con-Reconocimiento-De-Voz-en-Android.png" title="{{ page.title }}" alt="{{ page.title }}" width="336px" height="285px" /></a>
</figure>



>La siguiente aplicación es parte de una práctica de la asignatura “Nuevos Paradigmas de la Interacción” de la facultad de Ingeniería Informática de Granada (ETSIIT) Otras aplicaciones de la práctica son:

- [GPS QR](/programar-navegador-gps-android)
- [Photo Gesture](/patron-desbloqueo-android)
- [Movement Sound](/giroscopio-acelerometro-movimientos-android)

Si te interesa android, puedes echar un vistazo a los cursos disponibles en el blog, [Android1](/curso-programacion-android/ "Curso de Android"), [Android2](/android/ "Curso nuevo de Android")
{: .notice-info }

## Brujula Compass

_Enunciado: se debe identificar mediante interfaz vocal un punto cardinal (Norte, Sur, Este y Oeste) y el porcentaje de error (cantidad entera) en la detección del punto, solo el número, por ejemplo “Norte diez”. Una vez reconocido el patrón vocal se debe mostrar una brújula para que el usuario se oriente en la dirección indicada, cuando lo realice se le debe indicar que ya se ha conseguido._

Empecemos con un video de la aplicación funcionando:

<amp-youtube
    data-videoid="PSAfGnKJN0M"
    layout="responsive"
    width="480" height="270"></amp-youtube>

Para realizar esta aplicación se ha tomado como base la brújula de la _ROM_ MIUI. Se le ha añadido el reconocimiento de voz (_ASR_) y se modificó la la interfaz de la brújula para que mostrara hacia donde tiene que dirigirse el usuario en función del comando de voz. Veamos la primera pantalla:

<!--more--><!--ad-->

## Inicio de la aplicación

<figure>
<a href="/img/npi/inicioBrujula.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/inicioBrujula.png" title="Primera pantalla de la aplicación brújula" alt="Primera pantalla de la aplicación brújula" width="338px" height="600px" /></a>
<span class="image-credit">Primera pantalla de la aplicación brújula</span>
</figure>


Al mostrarse esta pantalla, el usuario debe proporcionar un comando de voz, por ejemplo _“Norte 10”_. Tras dar el comando, en la brujula se añadirá un marcador indicando dónde está el Norte + 10 grados. Además de esto, mediante una voz, se le irá indicando al usuario si debe girar a la derecha/izquierda o va en la dirección correcta:

<figure>
<a href="/img/npi/norte10.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/norte10.png" title="Indicaciones en la brujula" alt="Indicaciones en la brujula" width="338px" height="600px" /></a>
<span class="image-credit">Indicaciones en la brujula</span>
</figure>


Como vemos en la imagen, aparece un indicador rojo situado en el norte + 10 grados. Veamos otro ejemplo, Norte 45:

<figure>
<a href="/img/npi/norte45.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/norte45.png" title="Indicaciones en la brujula" alt="Indicaciones en la brujula" width="338px" height="600px" /></a>
<span class="image-credit">Indicaciones en la brujula</span>
</figure>


Para dar nuevas instrucciones de voz basta con tocar la brújula.

En la parte inferior de la pantalla, aparece el comando de voz reconocido.

## Implementación

Se han necesitado de tres clases, La principal que implementa la actividad (`CompassActivity`), donde reside prácticamente toda la lógica de la aplicación. En ella se hace uso de los sensores magnético y el acelerómetro. La otra clase ha es una extensión de la clase `ImageVew` para crear nuestra propia vista, en este caso el compás y el indicador de la dirección indicada por el usuario.

## Clase CompassActivity.java

Esta clase es la principal y en la que se realiza toda la lógica, en ella se declarar y registran los sensores a usar (El magnético y el acelerómetro). Ambos se obtienen en el método `onCreate` del siguiente modo:

```java
private SensorManager mSensorManager;
private Sensor mMagneticSensor;
private Sensor mAccelerometer;

//...

mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
mMagneticSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
```

Para poder obtener actualizaciones frecuentes de los datos de los sensores es necesario declarar un `SensorEventListener` y registrarlo en el sistema, declararemos un único _listener_ que será usado por los dos sensores:

```java
private SensorEventListener mMagneticSensorEventListener = new SensorEventListener() {

    @Override
    public void onSensorChanged(SensorEvent event) {

        if (event.sensor == mMagneticSensor) {
            System.arraycopy(event.values, 0, mLastMagnetometer, 0, event.values.length);
            mLastMagnetometerSet = true;
        } else if (event.sensor == mAccelerometer) {
            System.arraycopy(event.values, 0, mLastAccelerometer, 0, event.values.length);
            mLastAccelerometerSet = true;
        }

        if (mLastAccelerometerSet && mLastMagnetometerSet) {
            SensorManager.getRotationMatrix(mR, null, mLastAccelerometer, mLastMagnetometer);
            SensorManager.getOrientation(mR, mOrientation);
            float azimuthInRadians = mOrientation[0];
            float azimuthInDegress = (float) (Math.toDegrees(azimuthInRadians) + 360) % 360;

            mTargetDirection = -azimuthInDegress;
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
};
```

La función `onSensorChanged` será llamada cada vez que se actualicen los datos de los sensores.

Una vez tenemos una referencia a los sensores y el _listener_ creado, hay que registrarlos en el método `onResume` y des-registrarlos en el `onPause`:

```java
@Override
protected void onResume() {
    super.onResume();

    if (mMagneticSensor != null) {
        mSensorManager.registerListener(mMagneticSensorEventListener, mMagneticSensor,
                SensorManager.SENSOR_DELAY_GAME);
    }
    if (mAccelerometer != null) {
        mSensorManager.registerListener(mMagneticSensorEventListener, mAccelerometer,
                SensorManager.SENSOR_DELAY_GAME);
    }
    // ...
}

@Override
protected void onPause() {
    super.onPause();

    if (mMagneticSensor != null) {
        mSensorManager.unregisterListener(mMagneticSensorEventListener);
    }
    if (mAccelerometer != null) {
        mSensorManager.unregisterListener(mMagneticSensorEventListener);
    }

    // ...
}
```

El reconocimiento de voz se inicializa en el siguiente método:

```java
/**
 * Starts listening for any user input.
 * When it recognizes something, the <code>processAsrResult</code> method is invoked.
 * If there is any error, the <code>processAsrError</code> method is invoked.
 */
private void startListening() {
    Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
    intent.putExtra(RecognizerIntent.EXTRA_PROMPT, getString(R.string.asr_prompt));
    intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 2);

    try {
        startActivityForResult(intent, REQUEST_RECOGNIZE);
    } catch (ActivityNotFoundException e) {
        //If no recognizer exists, download from Google Play
        showDownloadDialog();
    }
}
```

Esto intentará lanzar el reconocedor de voz, si el dispositivo no lo tiene instalado lanzará un diálogo pidiendo al usuario que lo instale:

```java
private void showDownloadDialog() {
    AlertDialog.Builder builder =
            new AlertDialog.Builder(this);
    builder.setTitle(R.string.asr_download_title);
    builder.setMessage(R.string.asr_download_msg);
    builder.setPositiveButton(android.R.string.yes,
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog,
                                    int which) {
                    //Download, for example, Google Voice Search
                    Intent marketIntent =
                            new Intent(Intent.ACTION_VIEW);
                    marketIntent.setData(
                            Uri.parse("market://details?"
                                    + "id=com.google.android.voicesearch"));
                }
            });
    builder.setNegativeButton(android.R.string.no, null);
    builder.create().show();
}
```

Una vez que el usuario habla, se recoge el resultado en el `onActivityResult` y decidimos cómo interpretarlo, en este caso se parsea de forma bastante primitiva si el usuario dijo _este, norte, sur u oeste_ junto al número de grados:

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_RECOGNIZE &&
            resultCode == Activity.RESULT_OK) {
        ArrayList<string> matches =
                data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);

        String[] tokens = matches.get(0).split(" ");

        if (tokens.length == 2) {
            mHeadedDirection = Float.parseFloat(tokens[1]);
            mLocationTextView.setText(String.format(getString(R.string.heading_text), matches.get(0)));

            switch (tokens[0].toLowerCase()) {
                case "este":
                    mHeadedDirection += 90;
                    break;
                case "sur":
                case "surf":
                    mHeadedDirection += 180;
                    break;
                case "oeste":
                    mHeadedDirection += 270;
                    break;
            }

            Toast.makeText(this, R.string.asr_ask_again,
                    Toast.LENGTH_LONG).show();

        } else {
            Toast.makeText(this, R.string.asr_error,
                    Toast.LENGTH_LONG).show();
        }
    }
}
```

El punto cardinal junto con los grados servirán para situar el indicador que muestre al usuario hacia dónde debe dirigirse.

Para lograr el efecto de giro de la brújula, se rota la imagen con cada actualización de los sensores:

```java
protected Runnable mCompassViewUpdater = new Runnable() {
    @Override
    public void run() {
        if (mPointer != null && !mStopDrawing) {
            if (mDirection != mTargetDirection) {

                // calculate the short routine
                float to = mTargetDirection;
                if (to - mDirection > 180) {
                    to -= 360;
                } else if (to - mDirection < -180) {
                    to += 360;
                }

                // limit the max speed to MAX_ROTATE_DEGREE
                float distance = to - mDirection;
                float MAX_ROATE_DEGREE = 1.0f;
                if (Math.abs(distance) > MAX_ROATE_DEGREE) {
                    distance = distance > 0 ? MAX_ROATE_DEGREE : (-1.0f * MAX_ROATE_DEGREE);
                }

                // need to slow down if the distance is short
                mDirection = normalizeDegree(mDirection
                        + ((to - mDirection) * mInterpolator.getInterpolation(Math
                        .abs(distance) > MAX_ROATE_DEGREE ? 0.4f : 0.3f)));
                mPointer.updateDirection(mDirection);

                if (mHeadedDirection != -1) {
                    mUserHint.updateDirection(mDirection + mHeadedDirection);
                }
            }
            updateDirection();
            mHandlerCompass.postDelayed(mCompassViewUpdater, 20);
        }
    }
};
```

Como vemos, el `Runnable` se llama a sí mismo para mantenerse en ejecución `mHandlerCompass.postDelayed(mCompassViewUpdater, 20);`, de igual modo, habrá que escibir esta línea en el método `onResume`.

Los métodos `updateDirection` son métodos definidos en las clases que veremos ahora, que representan la brujula y el indicador.

## Clase CompassView.java

Los dos métodos más importantes de esta clase son:

```java
@Override
protected void onDraw(Canvas canvas) {
    if (compass == null) {
        compass = getDrawable();
        compass.setBounds(0, 0, getWidth(), getHeight());
    }

    canvas.save();
    canvas.rotate(mDirection, getWidth() / 2, getHeight() / 2);
    compass.draw(canvas);
    canvas.restore();
}

public void updateDirection(float direction) {
    mDirection = direction;
    invalidate();
}
```

que se encargan de rotar la brújula cada vez que se llama al método `updateDirection` desde el `Runnable`  visto anteriormente.

## Permisos requeridos para el AndroidManifest

```xml
<uses-permission android:name="android.permission.VIBRATE">
</uses-permission><uses-permission android:name="android.permission.INTERNET">
</uses-permission><uses-permission android:name="android.permission.ACCESS_NETWORK_STATE">
```

## Referencias

- Comass de MIUI \| [github.com/MiCode](https://github.com/MiCode/Compass "Código en github")
- Pro Android 5 \| [amazon.es](http://www.amazon.es/gp/product/1430246804/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=1430246804&linkCode;=as2&tag;=bmab-21 "Ver libro en Amazon")
- Código de la aplicación \| [github.com/algui91/BrujulaCompass](https://github.com/algui91/grado_informatica_npi/tree/master/Android/BrujulaCompass "Código en Github para BrujulaCompass")
</uses-permission></string>
