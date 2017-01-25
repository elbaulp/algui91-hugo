---
author: alex
categories:
- java
color: '#D32F2F'
date: 2016-02-16 20:05:38
description: "Enunciado: se facilitar\xE1n las coordenadas de una serie de puntos
  GPS (latitud/longitud) mediante c\xF3digos QR a la appGPSQR que iniciar\xE1 autom\xE1ticamente
  la navegaci\xF3n GPS hacia dicho punto, debe guardar el recorrido realizado y mostrarlo
  en un mapa al finalizar el mismo. En el anexo I ten\xE9is ejemplos de los c\xF3digos
  QR que se deben detectar, en la defensa ser\xE1n distintos."
image: npi/gqsqr_read.png

mainclass: java
modified: null
tags:
- programar navegador gps android
- tutorial gps android
- leer QR code en android zxing
- calcular rutas gps android
title: Crear Un Navegador GPS Que Dibuje El Camino Seguido en Android
---

>La siguiente aplicación es parte de una práctica de la asignatura “Nuevos Paradigmas de la Interacción” de la facultad de Ingeniería Informática de Granada (ETSIIT) Otras aplicaciones de la práctica son:

- [Brújula Compass](/brujula-android-asr-voz)
- [Photo Gesture](/patron-desbloqueo-android)
- [Movement Sound](/giroscopio-acelerometro-movimientos-android)

Si te interesa android, puedes echar un vistazo a los cursos disponibles en el blog, [Android1](/curso-programacion-android/ "Curso de Android"), [Android2](/android/ "Curso nuevo de Android")
{: .notice-info }

## GPSQR

_Enunciado: se facilitarán las coordenadas de una serie de puntos GPS (latitud/longitud) mediante códigos QR a la appGPSQR que iniciará automáticamente la navegación GPS hacia dicho punto, debe guardar el recorrido realizado y mostrarlo en un mapa al finalizar el mismo. En el anexo I tenéis ejemplos de los códigos QR que se deben detectar, en la defensa serán distintos._

En esta aplicación se lee un destino mediante códigos QR, tras esto, se puede iniciar la navegación con _Google Maps_ (Usando la librería [Android-GoogleDirectionLibrary](https://github.com/akexorcist/Android-GoogleDirectionLibrary)). En la aplicación se muestran dos mapas. En el de abajo aparece el destino al que debemos llegar, además, se va dibujando un camino por el que el usuario va pasando. En el mapa de arriba se ve el mapa desde el punto de vista _StreetView_. Veamos la aplicación:

<figure>
<a href="/img/npi/gpsQr.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/gpsQr.png" title="GPSQR" alt="GPSQR" width="338px" height="600px" /></a>
<span class="image-credit">GPSQR</span>
</figure>
<!--more--><!--ad-->

El _Floating Action Button_ de abajo a la izquierda lanza el lector de QRs, que usa una simplificación de la librería _Zxing_. Cuando se escanea una localización, veremos lo siguiente:

<figure>
<a href="/img/npi/gqsqr_read.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/npi/gqsqr_read.png" title="Codigo QR leido con el destino" alt="Codigo QR leido con el destino" width="360px" height="600px" /></a>
<span class="image-credit">Codigo QR leido con el destino</span>
</figure>

Una vez leido el QR, solo resta pulsar el marcador rojo para iniciar la navegación con _Google Maps_. La ruta calculada por la _API_ de _Google_ es la azul, mientras que la ruta real tomada por el usuario aparecerá en rojo.

### Implementación

Esta aplicación tiene dos clases, una para la primera y única pantalla y otra es un servicio que se ejecuta en segundo plano, encargado de obtener la localicación del usuario a un intervalo regular. Echemos primero un vistazo al Servicio.

#### Clase LocationUpdaterService.java

Extiende de `Service` e implementa las siguientes interfaces:

```java
public class LocationUpdaterService extends Service implements
        GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        LocationListener {
          // ....
        }
```

Con nombres bastantes descriptivos. Al iniciar el servicio, en su método `onCreate` se construye el cliente para la API de google del siguiente modo:

```java
/**
 * Builds a GoogleApiClient. Uses the {@code #addApi} method to request the
 * LocationServices API.
 */
protected synchronized void buildGoogleApiClient() {
    if (BuildConfig.DEBUG) {
        Log.d(TAG, "Building GoogleApiClient");
    }
    mGoogleApiClient = new GoogleApiClient.Builder(this)
            .addConnectionCallbacks(this)
            .addOnConnectionFailedListener(this)
            .addApi(LocationServices.API)
            .build();
    createLocationRequest();
}
```

También se inicializa el `BroadcastManager` que usaremos para enviar las actualizaciones de la posición a la pantalla principal.

```java
mBroadcaster = LocalBroadcastManager.getInstance(this);
```

El método `onCreate` se llama una única vez, al crear el servicio. Los comandos a ejecutar se colocan en el método `onStartCommand`, este metodo lo crearemos como _Sticky_, de modo que si el sistema finaliza el proceso del servicio, se volverá a ejecutar, volviendo así a obtener actualizaciones de localización:

```java
@Override
public int onStartCommand(Intent intent, int flags, int startId) {
    super.onStartCommand(intent, flags, startId);
    if (BuildConfig.DEBUG) {
        Log.d(TAG, "OnStartCommand");
    }

    if (mGoogleApiClient.isConnected()) {
      LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient,
              mLocationRequest, this);
    }

    return START_STICKY;
}
```

Una vez hecho esto, se llamarán a las interfaces implementadas con los datos necesarios para obtener la localización actual, en este caso la interfaz que nos interesa es `onLocationChanged`:

```java
@Override
public void onLocationChanged(Location location) {
    mCurrentLocation = location;
    mLastUpdateTime = DateFormat.getTimeInstance().format(new Date());
    sendResult(new LatLng(mCurrentLocation.getLatitude(), mCurrentLocation.getLongitude()));

    if (BuildConfig.DEBUG) {
        Log.d(TAG, mCurrentLocation.getLatitude() + ", " + mCurrentLocation.getLongitude());
    }
}
```

El método `sendResult` se usa para emitir un `Broadcast` al sistema y que la aplicación sea capaz de recibir el mensaje, incluso si no está en primer plano:

```java
/**
 * This method send the current location to the activity who called the service, This way the
 * location can be used in the UI.
 *
 * @param message The location
 */
private void sendResult(LatLng message) {
    Intent intent = new Intent(COPA_RESULT);
    if (message != null)
        intent.putExtra(COPA_MESSAGE, message);
    mBroadcaster.sendBroadcast(intent);
}
```

Por último para que el Servicio funcione debemos registrarlo en el _Manifest_ añadiendo la siguiente etiqueta:

```xml
<application>
<!--//....-->
<service android:name=".LocationUpdaterService">
<!--//....-->
</service></application>
```

#### Clase MapsActivity.java

Esta clase es la interfaz gráfica de la aplicación y donde se muestran los dos mapas, para poder trabajar con ellos se implementan las siguientes interfaces:

```java
public class MapsActivity extends FragmentActivity implements
        OnMapReadyCallback,
        StreetViewPanorama.OnStreetViewPanoramaChangeListener,
        OnStreetViewPanoramaReadyCallback {

      private GoogleMap mMap;
      private StreetViewPanorama mStreetViewPanorama;

      // ...
}
```

Antes de poder trabajar con cualquiera de los mapas hemos de esperar a que estén inicializados, el momento de hacer esta inicialización es cuando el sistema llama a `OnMapReadyCallback, OnStreetViewPanoramaReadyCallback`:

```java
/**
 * Manipulates the map once available.
 * This callback is triggered when the map is ready to be used.
 * This is where we can add markers or lines, add listeners or move the camera.
 * If Google Play services is not installed on the device, the user will be prompted to install
 * it inside the SupportMapFragment. This method will only be triggered once the user has
 * installed Google Play services and returned to the app.
 */
@Override
public void onMapReady(GoogleMap googleMap) {
    mMap = googleMap;
    mMap.setMapType(GoogleMap.MAP_TYPE_HYBRID);
    UiSettings uiSettings = mMap.getUiSettings();
    uiSettings.setMapToolbarEnabled(true);
    uiSettings.setZoomControlsEnabled(true);
}

@Override
public void onStreetViewPanoramaReady(StreetViewPanorama panorama) {
    mStreetViewPanorama = panorama;
    mStreetViewPanorama.setOnStreetViewPanoramaChangeListener(this);
    mStreetViewPanorama.setStreetNamesEnabled(true);
}
```

Entre otras cosas, en el método `onCreate` inicializamos el `BroadcastReceiver` que nos permitirá recibir actualizaciones desde el servicio, e iniciamos el servicio:

```java
@Override
protected void onCreate(final Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_maps);
//  ...
    mLocationReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            mPreviousLocation = mCurrentLocation;
            mCurrentLocation = intent.getParcelableExtra(LocationUpdaterService.COPA_MESSAGE);
            updateMap();
            mLocationsList.add(mCurrentLocation);

            if (BuildConfig.DEBUG) {
                Log.d(TAG, "LocationList size: " + mLocationsList.size());
            }
        }
    };

    mRequestLocationIntent = new Intent(this, LocationUpdaterService.class);
    startService(mRequestLocationIntent);
// ...
}
```

La función `updateMap` es la encargada de dibujar las líneas del camino seguido por el usuario.

##### Iniciar la navegación hasta destino

Cuando se lanza el lector QR y se obtiene el destino, se crea una ruta a seguir, en esta ruta es posible hacerla siguiendo el camino mostrado en el mapa, o lanzando la navegación con _Google Maps_. Para lo último, es neceario pulsar sobre el marcador de destino y posteriormente pulsar el icono de _Google Maps_:

```java
LatLng firstLocation = new LatLng(mCoord[0], mCoord[1]);
mMap.addMarker(new MarkerOptions().position(firstLocation).title("Dest"));
mMap.moveCamera(CameraUpdateFactory.newLatLng(firstLocation));
mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(firstLocation, 21.0f));

GoogleDirection.withServerKey(getString(R.string.google_maps_server_key))
        .from(mCurrentLocation)
        .to(new LatLng(mCoord[0], mCoord[1]))
        .transportMode(TransportMode.WALKING)
        .execute(new DirectionCallback() {
            @Override
            public void onDirectionSuccess(Direction direction) {
                if (direction.isOK()) {
                    Toast.makeText(getApplicationContext(), "DIRECTION KOK", Toast.LENGTH_LONG).show();
                    ArrayList<latlng> directionPositionList = direction.getRouteList().get(0).getLegList().get(0).getDirectionPoint();
                    PolylineOptions polylineOptions = DirectionConverter.createPolyline(getApplicationContext(), directionPositionList, 5, Color.BLUE);
                    mMap.addPolyline(polylineOptions);
                } else {
                    Toast.makeText(getApplicationContext(), "NOT OK" + direction.getStatus(), Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onDirectionFailure(Throwable t) {
                Toast.makeText(getApplicationContext(), "Failure", Toast.LENGTH_LONG).show();
            }
        });
```

##### Permisos requeridos para el AndroidManifest

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION">
```

### Referencias y agradecimientos

- [github.com/algui91/GPSQR](https://github.com/algui91/grado_informatica_npi/tree/master/Android/GPSQR "Código en Github")
- [stackoverflow.com](http://stackoverflow.com/a/14695943/1612432 "Android update activity UI from service")
- [github.com/googlesamples/android-play-location](https://github.com/googlesamples/android-play-location/tree/master/LocationUpdates "Ejemplos de Google")
- [github.com/akexorcist/Android-GoogleDirectionLibrary](https://github.com/akexorcist/Android-GoogleDirectionLibrary "Android-GoogleDirectionLibrary")
- [gist.github.com/blackcj](https://gist.github.com/blackcj/20efe2ac885c7297a676#gistcomment-1666537)
- [github.com/googlemaps/android-samples](https://github.com/googlemaps/android-samples "Ejemplos de google Maps de Google")
- [Icono QR](http://www.iconarchive.com/show/windows-8-icons-by-icons8/Ecommerce-Qr-Code-icon.html)
</uses-permission></latlng>
