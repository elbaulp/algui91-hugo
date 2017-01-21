---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-02-18 08:32:53
description: "Una appMovimientoSonido que reconozca un patr\xF3n de movimientos de
  vuestra elecci\xF3n usando el giroscopio y/o el aceler\xF3metro, una vez detectado
  el patr\xF3n, se reproducir\xE1 un sonido"
image: npi/movementSound.png
layout: post.amp
mainclass: java
modified: null
tags:
- tutorial acelerometro android
- tutorial giroscopio android
- "detectar rotaci\xF3n giroscopio android"
- detectar golpe acelerometro android
title: "Utilizando El Aceler\xF3metro Y Giroscopio en Android Para Detectar Movimientos"
---

>La siguiente aplicación es parte de una práctica de la asignatura “Nuevos Paradigmas de la Interacción” de la facultad de Ingeniería Informática de Granada (ETSIIT) Otras aplicaciones de la práctica son:

- [Brújula Compass](/brujula-android-asr-voz)
- [GPS QR](/programar-navegador-gps-android)
- [Photo Gesture](/patron-desbloqueo-android)

<!--more--><!--ad-->

Si te interesa android, puedes echar un vistazo a los cursos disponibles en el blog, [Android1](/curso-programacion-android/ "Curso de Android"), [Android2](/android/ "Curso nuevo de Android")
{: .notice-info }

_Enunciado: Una appMovimientoSonido que reconozca un patrón de movimientos de vuestra elección usando el giroscopio y/o el acelerómetro, una vez detectado el patrón, se reproducirá un sonido._

## Movement Sound

En esta aplicación se usa el acelerómetro y el giroscopio, para mostrar sus valores por pantalla. El giroscopio es capaz de detectar una rotación del dispositivo, al hacerlo, reproduce un sonido. Por contra, el acelerómetro detecta una sacudida del dispositivo y reproduce un sonido distinto. Debido a que no en todos los dispositivos se obtienen valores precisos para los sensores, solo se mostrarán aquellos que tengan sentido.

<figure>
<a href="/img/npi/movementSound.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/movementSound.png" title="Aplicación Movement Sound" alt="Aplicación Movement Sound" width="338px" height="600px" /></a>
<span class="image-credit">Aplicación Movement Sound</span>
</figure>

### Implementación

#### Para instanciar ambos sensores en el `onCreate`:

```java
// Get the sensors to use
mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
mSensorAcc = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
mSensorGyr = mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
```

Cuando el tengamos datos nuevos de los sensores, los actualizaremos en el `onSensorChanged`:

```java
@Override
public void onSensorChanged(SensorEvent event) {

    if (event.accuracy == SensorManager.SENSOR_STATUS_UNRELIABLE) {

        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            mAccx.setText(R.string.act_main_no_acuracy);
            mAccy.setText(R.string.act_main_no_acuracy);
            mAccz.setText(R.string.act_main_no_acuracy);
        } else if (event.sensor.getType() == Sensor.TYPE_GYROSCOPE) {
            mGyrox.setText(R.string.act_main_no_acuracy);
            mGyroy.setText(R.string.act_main_no_acuracy);
            mGyroz.setText(R.string.act_main_no_acuracy);
        }
        return;
    }

    if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
        mAccx.setText("x = " + Float.toString(event.values[0]));
        mAccy.setText("y = " + Float.toString(event.values[1]));
        mAccz.setText("z = " + Float.toString(event.values[2]));
        detectShake(event);
    } else if (event.sensor.getType() == Sensor.TYPE_GYROSCOPE) {
        mGyrox.setText("x = " + Float.toString(event.values[0]));
        mGyroy.setText("y = " + Float.toString(event.values[1]));
        mGyroz.setText("z = " + Float.toString(event.values[2]));
        detectRotation(event);
    }

}
```

Si el acelerómetro está activo, se intentará detectar una sacudida del dispositivo y se reproducirá un sonido, en el caso del giroscopio, se pretende detectar una rotación del dispositivo. Estos patrones se reconocen con las siguientes funciones:

```java
// References:
//  - http://jasonmcreynolds.com/?p=388
//  - http://code.tutsplus.com/tutorials/using-the-accelerometer-on-android--mobile-22125

/**
 * Detect a shake based on the ACCELEROMETER sensor
 *
 * @param event
 */
private void detectShake(SensorEvent event) {
    long now = System.currentTimeMillis();

    if ((now - mShakeTime) > SHAKE_WAIT_TIME_MS) {
        mShakeTime = now;

        float gX = event.values[0] / SensorManager.GRAVITY_EARTH;
        float gY = event.values[1] / SensorManager.GRAVITY_EARTH;
        float gZ = event.values[2] / SensorManager.GRAVITY_EARTH;

        // gForce will be close to 1 when there is no movement
        double gForce = Math.sqrt(gX * gX + gY * gY + gZ * gZ);

        // Change background color if gForce exceeds threshold;
        // otherwise, reset the color
        if (gForce > SHAKE_THRESHOLD) {
            soundAcc.start();
        }
    }
}

/**
 * Detect a rotation in on the GYROSCOPE sensor
 *
 * @param event
 */
private void detectRotation(SensorEvent event) {
    long now = System.currentTimeMillis();

    if ((now - mRotationTime) > ROTATION_WAIT_TIME_MS) {
        mRotationTime = now;

        // Change background color if rate of rotation around any
        // axis and in any direction exceeds threshold;
        // otherwise, reset the color
        if (Math.abs(event.values[0]) > ROTATION_THRESHOLD ||
                Math.abs(event.values[1]) > ROTATION_THRESHOLD ||
                Math.abs(event.values[2]) > ROTATION_THRESHOLD) {
            soundGyro.start();
        }
    }
}
```

##### Permisos requeridos para el AndroidManifest

```xml
<uses-permission android:name="android.hardware.sensor.gyroscope">
</uses-permission><uses-permission android:name="android.hardware.sensor.accelerometer">
```


### Referencias

- Código de la aplicación \| [github.com/algui91/movementSound](https://github.com/algui91/grado_informatica_npi/tree/master/Android/MovementSound)
- AndroidWearMotionSensors \| [github.com/drejkim](https://github.com/drejkim/AndroidWearMotionSensors)
</uses-permission>
