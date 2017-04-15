---
author: alex
categories:
- android
- how to
- opensource
color: '#689F38'
date: '2016-01-01'

mainclass: android
url: /programacion-android-como-se-resuelven/
tags:
- android ejemplo intent filter
- curso android pdf
- ejemplo intentfilter implicito
- resolver uri en android
title: "Programación Android: Cómo se resuelven los Intents"
---

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive"  src="/img/2013/07/iconoAndroid.png"  id="logo"  class="icono" width="128px" height="128px" />

Vamos a ver que estratégias usa Android para encontrar la actividad que corresponde a un intent basándose en los intent-filter. Para resolver este problema, se establece una jerarquía. En el primer lugar de dicha jerarquía se encuentra el nombre del componente que se adjunta al intent. Este tipo de intent son explícitos, y dado que ya se sabe el nombre del componente, el resto de datos asociados al intent se ignoran. Por el contrario, cuando el intent no disponga de nombre de componente asociado, será un intent implícito, para este tipo de intents hay diversas formas de encontrar la actividad correspondiente.


<!--more--><!--ad-->

La regla básica es que la acción, categoría o datos característicos de un intent deben coincidir, o estar presentes, en los intent-filter de la actividad. De forma análoga a los íntents, un intent-filter puede establecer varias acciones, categorías y atributos. Lo que quiere decir que una misma actividad (con varios intent-filters), puede ser válida y por lo tanto responder a intents de distinto tipo. Vamos a ver los distintos critérios que se siguen para considerar si el intent coincide con el intent-filter:

### Action

Si un intent tiene una acción establecida, el intent-filter debe tener esa acción declarada o no tener ninguna acción definida. Es decir, si una actividad no tiene declarado ningún intent filter, se considera una opción para cualquier intent con una acción.

### Data

Si no se especifica ningún tipo de dato en un intent-filter, éste no coincidirá con ningún intent que sí que tenga establecido cualquier tipo de dato adicional. Es decir, esa actividad solo se considerará una opción para los intent que no tengan especificado ningún dato.

### Data type

Para que se considere como coincidencia un tipo de dato, el intent debe ser uno de los tipos de datos declarados en el intent-filter. Para determinar el tipo de dato android tiene dos formas. La primera es determinar el tipo de dato a partir de la URI (si la URI es una content URI) o si la URI es un fichero (file://&#8230;). La segunda es mirar en el tipo de dato explícito del intent. Para que esto funcione correctamente el intent no debe tener una URI de datos adjunta, ya que se toma automáticamente cuando llamamos al método *setType()* en el intent. Es posible cubrir multitud de subtipos con *.

### Data scheme

Para que un esquema de datos coincida (data scheme), el esquema de datos ha de estar presente tanto en el intent como en el intent-filter de la actividad. Un esquema de datos es la primera parte de una URI, por ejemplo, *http://, file://, content://, ftp://* etc. Los intent no tienen definido ningún método para establecer el esquema de datos, ya que viene dado por la URI del intent.

En el caso de que el esquema sea del tipo *content: ó file:*, se considera una coincidencia independientemente de lo que se especifique en el intent-filter. Se aplica esta regla porque cada componente debe saber como leer datos desde urls del tipo *content* o *file*, ya que son locales al dispositivo.

### Data Authority

En el caso de que no se especifique authority alguno en el intent-filter, se obtendrá una coincidéncia para cualquier data URI authority. Si por el contrario se especifica en el intent-filter, como ejemplo pongamos *www.elbauldelprogramador.org*, entonces se considerará una coincidencia un esquema de datos y una authority.

Un ejemplo fácil para comprender esto podría ser que tengamos esto declarado como authority en el intent-filter *www.elbauldelprogramador.org*, y como esquema de datos *https*, todo intent fallará si usamos lo siguiente, */path*, ya que el esquema de datos *http* no está declarado.

### Data Path

Ningún path (ruta) especificado en el intent-filter resultará ser una coincidencia para cualquier path entrante. Para validar un intent, el esquema de datos, el authority y el path trabajan juntos. Es decir en *http://elbauldelprogramador.org/path* los tres trabajan juntos para validar el intent.

### Intent Categories

Cada [categoría][1] debe estar presente en el intent-filter. En el caso de que en el intent-filter no exista ninguna categoría especificada, esa actividad solo será una coincidencia para los intent que no tengan ninguna categoría especificada. Sin embargo, hay que tener en cuenta que los [intent implícitos][2] que se pasan **startActivity()** contienen al menos una categoría que es *android.intent-category.DEFAULT*. Por lo tanto, hemos de tener en cuenta que si queremos llamar a una actividad mediante un intent implícito debemos registrar dicha categoría en el intent-filter.

Si una actividad no tiene declarada la categoría por defecto, pero conocemos su nombre de componente, podémos llamarle mediante un intent explícito.

* * *

#### Siguiente Tema: [Ejemplo de uso de ACTION_PICK][3]





 [1]: https://elbauldelprogramador.com/programacion-android-intents-categorias
 [2]: https://elbauldelprogramador.com/programacion-android-intents-conceptos
 [3]: https://elbauldelprogramador.com/programacion-android-ejemplos-de-uso-de/
