---
author: alex
amp:
  elements: [amp-youtube]
categories:
- dev
color: '#E64A19'
date: 2015-11-05 18:30:26
description: "Este art\xEDculo es parte de una pr\xE1ctica de una asignatura de mi
  facultad Nuevos Paradigmas de la Interacci\xF3n. El trabajo consiste en programar
  por primera vez una aplicaci\xF3n haciendo uso de una Kinect."
image: Primeros-Pasos-Programando-Con-Kinect.png
layout: post.amp
mainclass: dev
math: true
tags:
- programar kinect
- "programaci\xF3n kinect"
- tutorial kinect
- aplicaciones kinect
title: Primeros Pasos Programando Con Kinect
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Primeros-Pasos-Programando-Con-Kinect.png" title="{{ page.title }}" alt="{{ page.title }}" width="866px" height="163px" />
</figure>



>Este artículo es parte de una práctica de una asignatura de mi facultad __Nuevos Paradigmas de la Interacción__. El trabajo consiste en programar por primera vez una aplicación haciendo uso de una __Kinect__.

Esta vez vamos a hacer las cosas al revés, en el vídeo se muestra el resultado de la aplicación. Permite realizar presentaciones, ya sean _PDFs_ o _Power Points_ mediante la detección de gestos del usuario. Por defecto el esqueleto aparece en rojo. Esto significa que el procesamiento de gestos está desactivado. Mediante un pequeño gesto, se activa y el esqueleto se vuelve verde. A partir de ahora, doblando el codo derecho, avanzaremos una transparencia, mientras que con el codo izquierdo retrocedemos.

<amp-youtube
    data-videoid="Ws7lxY2jPUE"
    layout="responsive"
    width="480" height="270"></amp-youtube>

El código está en [github](https://github.com/algui91/grado_informatica_npi), y la práctica la hemos realizado Cristina H.G y Alejandro Alcalde.
{: .notice-info }

Como se puede ver, inicialmente no se nos hace caso, luego activamos el procesamiento y comenzamos a avanzar y retroceder transpacencias. Cada vez que se ejecuta un comando, se ilumina el brazo que ejecutó la acción.

## Descripción del código

Para esta primera práctica consistente en familiarizarse con _Kinect_ , nos hemos basado en un ejemplo de _Microsoft_ [1] en el que se permite controlar una presentación _Power Point_ mediante gestos. El proyecto original avanza o retrocede las diapositivas elevando el brazo derecho/izquierdo por encima del hombro derecho/izquierdo. Nosotros la hemos modificado para que los gestos sean los especificados más arriba.

Estando de frente en la _kinect_, con los brazos en posición normal, hay que subir la muñeca de forma que sobrepase la cadera, y luego volver a bajarla. El brazo derecho se usa para avanzar una diapositiva, mientras que el izquierdo retrocede. Para ello se hace uso de un _[framework](https://elbauldelprogramador.com/los-10-mejores-frameworks-gratis-de-aplicaciones-web/)_ simple que declara una relación entre una o varias articulaciones, el ejemplo que pusimos al principio implica la relación de dos articulaciones (muñeca y cadera) y la relación arriba y abajo. Los posibles tipos de relaciones entre articulaciones se definen en la siguiente enumeración:

```csharp

public enum JointRelationship
{
  None,
  Above,
  Below,
  LeftOf,
  RightOf,
  AboveAndRight,
  BelowAndRight,
  AboveAndLeft,
  BelowAndLeft
}

```

<!--more--><!--ad-->

La relación por defecto usada en el ejemplo se define en el siguiente fichero _XML_
```xml

<gestures gestureresettimeout="500">
<gesture description="Previous Bullet" maxexecutiontime="1000" mappedkeycode="PRIOR">
<gesturecomponent firstjoint="WristLeft" secondjoint="HipLeft" endingrelationship="BelowAndLeft" beginningrelationship="AboveAndLeft">
</gesturecomponent></gesture>
<gesture description="Next Bullet" maxexecutiontime="1000" mappedkeycode="NEXT">
<gesturecomponent firstjoint="WristRight" secondjoint="HipRight" endingrelationship="BelowAndRight" beginningrelationship="AboveAndRight">
</gesturecomponent></gesture>
</gestures>

```

Jugando con los atributos de la etiqueta `<gesturecomponent>` es posible cambiar el tipo de gesto que reconocerá el programa, tanto articulaciones como la relación entre ellas, o usar solo una única articulación.

Antes de comenzar una presentación en Power Point, o un PDF, hay que realizar un gesto que active el procesamiento. Para ello se ha definido un nuevo gesto consistente en desplazar la rodilla a la derecha del hombro derecho. Y su homólogo izquierdo para desactivar el procesamiento. Esto se define en el xml:

```xml

<gesture description="Ready Position" maxexecutiontime="1000" mappedkeycode="ACCEPT">
</gesture></gesturecomponent><gesturecomponent firstjoint="KneeRight" secondjoint="ShoulderRight" endingrelationship="LeftOf" beginningrelationship="RightOf">

<gesture description="Cancel Position" maxexecutiontime="1000" mappedkeycode="CANCEL">
</gesture></gesturecomponent><gesturecomponent firstjoint="KneeLeft" secondjoint="ShoulderLeft" endingrelationship="RightOf" beginningrelationship="LeftOf">


```

Para proporcionar _feedback_ al usuario, inicialmente el esqueleto está de color rojo. Se proporcionan una serie de instrucciones para que se active el procesamiento. Una vez activado, el esqueleto se pone de color verde. Cuando se detectan los gestos para avanzar o retroceder también cambia de color, aunque sólo la extremidad con la cual se realizó el gesto. Azul para avanzar y rosa para retroceder. Todos estos cambios de color se realizan en el método `AddSkeletonToDepthBitmap` como sigue:

```csharp

Pen pen = new Pen(Color.Red, 5);
var gobject = Graphics.FromImage(bitmap);

if (_readyGestureDetected)
{
  pen = new Pen(Color.Green, 3);
}
else if (isActive)
{
  pen = new Pen(Color.Red, 5);
}

```

Se intentó hacer uso de la distancia Euclídea para establecer umbrales de tal forma que cuando la distancia entre dos articulaciones superara dicho umbral, el movimiento se procesara:

\\[
  d = \sqrt{(p1-q1)^2 + (p2-q2)^2 + (p3-q3)^2}
\\]

## Problemas encontrados

* El principal problema encontrado ha sido a la hora de establecer umbrales, porque al usar la distacia Euclídea, ésta depende de la altura de la persona, y la distancia entre cada articulación varia en función de la persona. Considerando así en ocasiones el umbral como válido, siendo éste el mismo numéricamente.
* Se intentó que dos esqueletos participaran de forma independiente en la escena, pero no fue posible. Los gestos se procesaban independientemente de qué persona los realizara.
* Se ha intentado mostrar la imagen por pantalla en lugar del esqueleto. Pero al no estar la aplicación de base en formato _WPF_ no ha sido posible. Ya sea por desconocimiento o por la imposibilidad de mostar por pantalla el _stream_ de vídeo en un _PaintBox_.

### Referencias

[1] - Walt Smith, Simple Gesture Processing using the Kinect for Windows | [code.msdn.microsoft.com]( https://code.msdn.microsoft.com/Simple-Gesture-Processing-097c5527)
</gesturecomponent>
