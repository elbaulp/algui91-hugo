---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-02-17 06:25:54
description: "Reconozca un patr\xF3n de gestos sobre pantalla de vuestra elecci\xF3n.
  Una vez detectado el patr\xF3n se debe ejecutar la aplicaci\xF3n de c\xE1mara y
  realizar autom\xE1ticamente una foto transcurridos 3 segundos. Los gestos a detectar
  son similares a los que se realizan con la pantalla de bloqueo Android, cuanto m\xE1s
  complejo sea el que se detecta mejor puntuaci\xF3n tendr\xE1."
image: npi/drawingPatter.png
layout: post.amp
mainclass: java
modified: null
tags:
- tutorial patrones android
- patternlock android
- "echar foto tras cuenta atr\xE1s android"
- "programar patr\xF3n de bloqueo android"
title: "Crear Un Patr\xF3n De Desbloqueo Android"
---

>La siguiente aplicación es parte de una práctica de la asignatura “Nuevos Paradigmas de la Interacción” de la facultad de Ingeniería Informática de Granada (ETSIIT) Otras aplicaciones de la práctica son:

- [Brújula Compass](/brujula-android-asr-voz)
- [GPS QR](/programar-navegador-gps-android)
- [Movement Sound](/giroscopio-acelerometro-movimientos-android)

<!--more--><!--ad-->

Si te interesa android, puedes echar un vistazo a los cursos disponibles en el blog, [Android1](/curso-programacion-android/ "Curso de Android"), [Android2](/android/ "Curso nuevo de Android")
{: .notice-info }

## Photo Gesture

_Enunciado: reconozca un patrón de gestos sobre pantalla de vuestra elección. Una vez detectado el patrón se debe ejecutar la aplicación de cámara y realizar automáticamente una foto transcurridos 3 segundos. Los gestos a detectar son similares a los que se realizan con la pantalla de bloqueo Android, cuanto más complejo sea el que se detecta mejor puntuación tendrá._

Veamos un vídeo de la aplicación funcioando:

<amp-youtube
    data-videoid="j3w9ai3LHyU"
    layout="responsive"
    width="480" height="270"></amp-youtube>

Para realizar esta aplicación se ha usado una librería llamada [PatterLock](https://github.com/DreaminginCodeZH/PatternLock).

En esta aplicación se le pide al usuario que establezca un patrón de bloqueo, puede ser tan complejo como el patrón de bloqueo usado en [Android](/curso-programacion-android/ "Curso de Android"). Una vez establecido, cuando se introduzca correctamente la aplicación tomará una foto a los 3 segundos. A continuación mostramos la pantalla principal de la aplicación.

<figure>
<a href="/img/npi/photoGesture.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/photoGesture.png" title="Pantalla principal de photoGesture" alt="Pantalla principal de photoGesture" width="338px" height="600px" /></a>
<span class="image-credit">Pantalla principal de photoGesture</span>
</figure>

Al pulsar _“Establecer patrón”_ veremos lo siguiente:

<figure>
<a href="/img/npi/setPattern.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/setPattern.png" title="Establecer patrón" alt="Establecer patrón" width="338px" height="600px" /></a>
<span class="image-credit">Establecer patrón</span>
</figure>

Es posible hacer que el patrón no sea visible cuando lo introducimos, para añadir una capa extra de seguridad.

Cuando pulsemos _Establecer patrón_ se nos pedirá que lo dibujemos dos veces, para confirmarlo:

<figure>
<a href="/img/npi/drawingPatter.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/drawingPatter.png" title="Dibujando el patrón" alt="Dibujando el patrón" width="338px" height="600px" /></a>
<span class="image-credit">Dibujando el patrón</span>
</figure>

Hecho esto, cuando volvamos a la pantalla principal, en lugar de “Establecer patrón” aparecerá “Echar foto”. Si pulsamos sobre ese botón, se nos pide el patrón establecido. Si se introduce bien, aparecerá la cámara con una cuenta atrás, al llegar a 0 se echará una foto:

<figure>
<a href="/img/npi/countdown.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/countdown.png" title="Cuenta atrás para echar la foto" alt="Cuenta atrás para echar la foto" width="338px" height="600px" /></a>
<span class="image-credit">Cuenta atrás para echar la foto</span>
</figure>

La foto se guardará en la galería.

### Implementación

Se ha reutilizado el ejemplo que el autor de la librería creo para demostar su uso, y se ha modificado para ajustarlo a los requisitos de la práctica. Para ello, cuando se introduce correctamente el parón, se incia la actividad de hacer una foto:

```java
@Override
protected boolean isPatternCorrect(List<patternview.cell> pattern) {

    boolean isCorrect = PatternLockUtils.isPatternCorrect(pattern, this);
    if (isCorrect) {
        startActivity(new Intent(this, MakePhotoActivity.class));
    }

    return isCorrect;
}
```

En la actividad `MakePhotoActivity` se muestra la pantalla dividida en dos, arriba aparece la cámara y abajo una cuenta atrás de 3 segundos, cuando esta cuenta atrás llegue a cero, se hará la foto.

En el método `onCreate` se inicializa la cámara se crean dos _callbacks_, uno que se ejecuta al hacer la foto y otro para reproducir un sonido al echar la foto:

```java
mPicture = new Camera.PictureCallback() {

    @Override
    public void onPictureTaken(byte[] data, Camera camera) {

        File pictureFile = getOutputMediaFile(MEDIA_TYPE_IMAGE);
        if (pictureFile == null) {
            Log.e(TAG, "Error creating media file, check storage permissions: ");
            return;
        }

        try {
            FileOutputStream fos = new FileOutputStream(pictureFile);
            fos.write(data);
            fos.close();

            new MediaScannerWrapper(getApplicationContext(), pictureFile.getPath(), "image/jpeg").scan();
        } catch (FileNotFoundException e) {
            Log.d(TAG, "File not found: " + e.getMessage());
        } catch (IOException e) {
            Log.d(TAG, "Error accessing file: " + e.getMessage());
        }

    }
};

mShutterSound = MediaPlayer.create(this, R.raw.shut);

mShutter = new Camera.ShutterCallback() {
    @Override
    public void onShutter() {
        mShutterSound.start();
    }
};
```

Al llegar la cuenta atrás a cero, se llama al método `takePicture` de la cámara y se le pasan los _callbacks anteriores_:

```java
mCamera.takePicture(mShutter, null, mPicture);
```

##### Mostrando una vista previa de la cámara

Para crear la parte superior de la pantalla, en la que se muestra una vista previa de la cámara, hay que crear una clase extendiendo de `SurfaceView` que hemos llamado `CameraPreview`, esta clase implementa la interfaz `SurfaceHolder.Callback`:

```java
/** A basic Camera preview class */
public class CameraPreview extends SurfaceView implements SurfaceHolder.Callback {

    private SurfaceHolder mHolder;
    private Camera mCamera;

    public CameraPreview(Context context, Camera camera) {
        super(context);
        mCamera = camera;

        mCamera.setDisplayOrientation(90);
        // Install a SurfaceHolder.Callback so we get notified when the
        // underlying surface is created and destroyed.
        mHolder = getHolder();
        mHolder.addCallback(this);
        // deprecated setting, but required on Android versions prior to 3.0
        mHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
    }

    public void surfaceCreated(SurfaceHolder holder) {
        // The Surface has been created, now tell the camera where to draw the preview.
        try {
            mCamera.setPreviewDisplay(holder);
            mCamera.startPreview();
        } catch (IOException e) {
            Log.d("TAG", "Error setting camera preview: " + e.getMessage());
        }
    }

    public void surfaceDestroyed(SurfaceHolder holder) {
        // empty. Take care of releasing the Camera preview in your activity.
        mCamera.release();
    }

    public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {
        // If your preview can change or rotate, take care of those events here.
        // Make sure to stop the preview before resizing or reformatting it.

        if (mHolder.getSurface() == null) {
            // preview surface does not exist
            return;
        }

        // stop preview before making changes
        try {
            mCamera.stopPreview();
        } catch (Exception e) {
            // ignore: tried to stop a non-existent preview
        }

        // set preview size and make any resize, rotate or
        // reformatting changes here

        // start preview with new settings
        try {
            mCamera.setPreviewDisplay(mHolder);
            mCamera.startPreview();

        } catch (Exception e) {
            Log.d("TAG", "Error starting camera preview: " + e.getMessage());
        }
    }
}
```

##### Permisos requeridos para el AndroidManifest

```xml
<uses-permission android:name="android.permission.CAMERA">
</uses-permission><uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE">
```

### Referencias

- Código de la aplicación \| [github.com/algui91/photoGesture](https://github.com/algui91/grado_informatica_npi/tree/master/Android/PhotoGesture)
- Página oficial de Android \| [developer.android.com/guide/topics/media/camera](http://developer.android.com/guide/topics/media/camera.html)
- Librería PatternLock \| [github.com/DreaminginCodeZH/PatternLock](https://github.com/DreaminginCodeZH/PatternLock)
</uses-permission></patternview.cell>
