---
author: jordi
categories:
- dev
mainclass: dev
date: 2015-07-06 19:00:00
lastmod: 2017-09-28T17:59:25+01:00
description: "¿Conoces el SDK PlugPDF? Esta API te permite trabajar con documentos  PDF de forma nativa, tanto en Android como en iOS."
image: "Lector PDF Android con barra de navegación.jpg"
tags:
- pdf
- java
title: "Cómo Programar Un Completo Lector PDF en Android"
---

¿Conoces el SDK PlugPDF? Esta API te permite trabajar con documentos PDF de forma nativa, tanto en [Android](/curso-programacion-android "Curso android") como en iOS.

En este tutorial te vamos a enseñar cómo poner en tus apps Android un completo lector y visor de documentos PDF, totalmente funcional, que incluye una barra de navegación con todo lo siguiente:

- Bloquear la rotación del documento
- Elegir el modo de visionado: 1, 2 o 4 páginas por pantalla
- Brillo
- Búsqueda de texto
- Insertar anotaciones: subrayar o tachar texto, dibujar a mano alzada, etc.

<!--more--><!--ad-->

<figure>
    <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Lector PDF Android con barra de navegación.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 1. Lector PDF Android que incluye una barra de navegación con varios controles</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Bloquear la rotación.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 2. Bloquear la rotación</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Modo de visualización de la página.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 3. Modo de visualización</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Brillo.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 4. Brillo</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/outline.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 5. Outline</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Búsqueda de texto.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 6. Búsqueda de texto</figcaption>
</figure>


<figure>
  <amp-img sizes="(min-width: 960px) 960px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Insertar anotaciones.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="960px" height="560px" />
  <figcaption>Figura 7. Insertar anotaciones: subrayar texto, tachado, dibujo a mano alzada, etc.</figcaption>
</figure>


¡Ya verás que con PlugPDF es muy sencillo! Haremos lo anterior con un par de líneas de código. Asumimos, eso sí, que cuentas con conocimientos básicos en programación Android.

Para ampliar esta información, no dudes en visitar la serie de posts titulada **[Building Android PDF Apps](https://plugpdf.com/tag/building-android-pdf-apps/)**, allí encontrarás ejemplos más sencillos que te ayudarán a seguir este how-to con más facilidad.

# Consigue tu licencia PlugPDF gratis #

El primer paso para poner en marcha tus aplicaciones PlugPDF es conseguir una licencia de uso.

En **[este enlace](https://plugpdf.com/download/ "¡Consigue una licencia de prueba de 30 días!")** puedes conseguir una licencia de prueba durante 30 días. Por otro lado, si eres un desarrollador independiente (indie), en [**este otro enlace**](https://plugpdf.com/indie-license-req/ "Consigue una licencia indie") tienes a tu disposición una licencia indie para uso personal, sin límite de tiempo, que incluye todas las características del SDK.

Cuando solicitas tu licencia de uso, entonces ya te puedes descargar el SDK, y luego, solo tienes que inicializarlo en tu aplicación; por ejemplo, en el método `onCreate` de tu actividad principal.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // init PlugPDF
    try {
        PlugPDF.init(getApplicationContext(),
        "YOUR_PLUGPDF_LICENSE_HERE");
    } catch (PlugPDFException.InvalidLicense ex) {
        Log.e("PlugPDF", "Invalid license exception", ex);
    }
    // your code here...
}
```

En aplicaciones Android más complejas que cuentan con varias clases, es recomendable ejecutar el método `PlugPDF.init` dentro de una clase que extienda de `Application` para que dicha inicialización tenga un alcance global, y no tengas que ejecutarla en todas y cada una de las actividades de tu app.

# Crear un proyecto Android nuevo e importar PlugPDF #

Ahora vamos a crear un proyecto Android nuevo que llamaremos `SimpleDocumentReader`, y justo a continuación, importaremos PlugPDF como un módulo nuevo. La estructura de la aplicación tiene que quedar como sigue.

<figure>
  <amp-img sizes="(min-width: 429px) 429px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Estructura de la aplicación.jpg" title="Cómo Programar Un Completo Lector PDF en Android" alt="Cómo Programar Un Completo Lector PDF en Android" width="429px" height="562px" />
  <figcaption>Figura 8. Estructura de la aplicación</figcaption>
</figure>

No olvides añadir la dependencia `compile project(':plugpdf')` en tu archivo `build.gradle (Module: app)`

```java
dependencies {
        compile fileTree(dir: 'libs', include: ['*.jar'])
        compile 'com.android.support:appcompat-v7:22.0.0'
        compile project(':plugpdf')
    }
```

# ¿Qué viene con la librería PDF? #

El SDK incorpora **[esta jerarquía de clases](https://plugpdf.com/devrefs/android/annotated.html)** Java con la funcionalidad PDF que puedes esperar en un API de estas características: añadir anotaciones, crear documentos PDF, añadir propiedades a tus documentos PDF, poner páginas e imágenes, etc.

Pero además de lo anterior, PlugPDF viene con una serie de clases Java que tienen como objetivo facilitar la vida al desarrollador. Estas clases están disponibles en **com.epapyrus.plugpdf** y son las siguientes:

- `AnnotSettingMenu`
- `OutlineAdapter`
- `PasswordDialog`
- `SimpleDocumentReader`
- `SimpleDocumentReaderListener`
- `SimpleReaderControlPanel`
- `SimpleReaderControlView`
- `SimpleReaderFactory`

Concretamente, la clase estrella de la lista anterior, por decirlo de alguna manera, es `SimpleDocumentReader`. Esta clase es la que implementa toda la funcionalidad que muestran las figuras 1-7 anteriores.

Para más detalles, puedes echar un vistazo al código fuente del archivo `SimpleDocumentReader` y también consultar la documentación de PlugPDF, así entenderás rápidamente cómo se utiliza tal o cual clase del SDK.

# Mi primer editor PDF nativo #

Entonces, dicho todo lo anterior, tan solo hay que instanciar un objeto de tipo `SimpleDocumentReader`, tal y como muestra el código que viene a continuación.

```java
package com.mycompany.simpledocumentreader;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import com.epapyrus.plugpdf.SimpleDocumentReader;
import com.epapyrus.plugpdf.SimpleDocumentReaderListener;
import com.epapyrus.plugpdf.SimpleReaderFactory;
import com.epapyrus.plugpdf.core.PlugPDF;
import com.epapyrus.plugpdf.core.PlugPDFException;
import com.epapyrus.plugpdf.core.viewer.DocumentState;

public class MainActivity extends Activity {

	private SimpleDocumentReader mReader;
	private Button selectFileButton;
	final int ACTIVITY_CHOOSE_FILE = 1;

	@Override
	protected void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		// init PlugPDF
		try {
			PlugPDF.init(getApplicationContext(),
				"YOUR_PLUGPDF_LICENSE_HERE");
		} catch (PlugPDFException.InvalidLicense ex) {
			Log.e("PlugPDF", "Invalid license exception", ex);
		}

		selectFileButton = (Button) findViewById(R.id.selectFileButton);

		selectFileButton.setOnClickListener(new View.OnClickListener() {@Override
			public void onClick(View arg0) {
				Intent chooseFile = new Intent(Intent.ACTION_GET_CONTENT);
				chooseFile.setType("application/pdf");
				startActivityForResult(Intent.createChooser(chooseFile, "Choose a file"), ACTIVITY_CHOOSE_FILE);
			}
		});

	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		// Check which request we're responding to
		if (requestCode == ACTIVITY_CHOOSE_FILE) {
			// Make sure the request was successful
			if (resultCode == RESULT_OK) {
				// get the file uri
				Uri fileUri = data.getData();
				// launch the PDF viewer
				mReader = SimpleReaderFactory.createSimpleViewer(this, listener);
				mReader.openFile(fileUri.getPath(), "");
			}
		}
	}

	/**
	 * listener receiving event notifications on completion of PDF document loading on a {@link SimpleDocumentReader}
	 */
	private SimpleDocumentReaderListener listener = new SimpleDocumentReaderListener() {

		@Override
		public void onLoadFinish(DocumentState.OPEN state) {
			Log.i("PlugPDF", "[INFO] Open " + state);
		}
	};

	@Override
	protected void onDestroy() {
		if (mReader.getDocument() != null) {
			mReader.save();
			mReader.clear();
		}
		super.onDestroy();
	}
}
```

Como ves, la magia está en estas dos líneas:

```java
// launch the PDF viewer
mReader = SimpleReaderFactory.createSimpleViewer(this, listener);
mReader.openFile(fileUri.getPath(), "");
```

¡Ya lo tenemos! Esperamos que hayas podido correr este lector PDF nativo en tu Android, en pocos minutos. Si te gustó este post estás invitado/a a compartirlo con tus amigos/as. Muchas gracias.
