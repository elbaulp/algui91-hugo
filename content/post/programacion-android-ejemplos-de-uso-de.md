---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-08-13

mainclass: android
url: /programacion-android-ejemplos-de-uso-de/
aliases: /opensource/programacion-android-ejemplos-de-uso-de/
tags:
- action_pick activity ejemplo
- action_pick activity example
- android listview example
- como filtrar un action_pick
- curso android pdf
- startactivityforresult android example
title: "Programación Android - Ejemplo de uso de ACTION_PICK"
---

La idea de ACTION_PICK es lanzar una actividad que muestre una liste de objetos a seleccionar para que el usuario elija uno de ellos. Una vez elegido, la actividad devuelve la URI del elemento elegido. Así se permite reusar la interfaz gráfica.

Se debe indicar usando MIME types la colección de datos que vamos a usar, el cual apuntará a un cursor parecido a este:

```bash
vnd.android.cursor.dir/vnd.favsites.site
```

<!--more--><!--ad-->

LA actividad es la encargada de recuperar los datos desde el [CV][1] basandose en la URI.

Para este tipo de [acción][2]**(ACTION_PICK)**, no podemos usar **startActivity()**, ya que no devuelve resultado alguno debido a que abre la nueva actividad en un hilo separado. Es decir, **startActivity()** es una llamada asíncrona que no usa callbacks para indicar qué ha pasado en la actividad invocada.

Por lo tanto debemos usar **startActivityForResult()**, que sí que tiene callback. Este método acepta dos parámetros, el primero es el intent que queremos lanzar, y el segundo es un requestCode. Cuando la actividad que hemos lanzado finalize, se llamará en la actividad desde la que se lanzó el intent a **onActivityResult()** con el requestCode que le proporcionamos. La cabecera de este método de callback es la siguiente:

```java
protected void onActivityResult (int requestCode, int resultCode, Intent data)

```

Donde el primer argumento es el código que le hemos pasado a **startActivityForResult()**, el segundo argumento (resultcode), puede ser *RESULT\_OK, RESULT\_CANCELED* o un código propio. Si decidimos usar un código propio, debe empezar en *RESULT\_FIRST\_USER*. El tercer parámetro contiene cualquier dato adicional que la actividad invocada devuelva. Para *ACTION_PICK* tendremos una URI apuntando a un elemento.

Para este ejemplo de uso de ACTION_PICK, es necesario tener instalada la aplicación **NotePad**, que está disponible para instalar en los ejemplos que vienen al instalar el SDK:

```java
public static void invokePick(Activity activity)
{
   Intent pickIntent = new Intent(Intent.ACTION_PICK);
   int requestCode = 1;
   pickIntent.setData(Uri.parse(
      "content://com.google.provider.NotePad/notes"));
   activity.startActivityForResult(pickIntent, requestCode);
}

protected void onActivityResult(int requestCode
   ,int resultCode
   ,Intent outputIntent)
{
   //Llamamos a super para informar a la clase padre que la llamada a la actividad a finalizado
   super.onActivityResult(requestCode, resultCode, outputIntent);
   IntentsUtils.parseResult(this, requestCode, resultCode, outputIntent);
}

public static void parseResult(MainActivity activity
 , int requestCode
 , int resultCode
 , Intent outputIntent)
{
   if (requestCode != 1){
      Log.d("Test", "cualquier otra cosa ha llamado a este método, no nosotros");
      return;
   }
   if (resultCode != Activity.RESULT_OK){
      Log.d("test", "ResultCode no es OK: " + resultCode);
      return;
   }

   Log.d("Test", "Resulcode es OK:" + resultCode);
   Uri selectedUri = outputIntent.getData();
   Log.d("test", "La uri de salida:" + selectedUri.toString());

   //Mostramos la nota
   outputIntent.setAction(Intent.ACTION_VIEW);
   startActivity(outputIntent);
}
```

Las constantes **RESTULT\_OK, RESULT\_CANCEL Y RESULT\_FIRST\_USER** están definidas en la clase de la Actividad y sus respectivos valores son:

```java
RESTULT_OK         = -1;
RESULT_CANCEL      =  0;
RESULT_FIRST_USER  =  1;
```

Por otro lado, en la aplicación **notePad**, debe haber un código devuelva un valor en el caso de que se haya llamado a la actividad desde un intent con ACTION_PICK como acción:

```java
@Override
protected void onListItemClick(ListView l, View v, int position, long id){
   Uri uri = ContentUris.withAppendedId(getIntent().getData(), id);

   String action = getIntent().getAction();
   if(Intent.ACTION_PICK.equals(action) || Intent.ACTION_GET_CONTENT.equals(action))
      //devolvemos la nota seleccionada
      setResult(RESULT_OK, new Intent().setData(uri));
   else
      //Lanzamos una actividad para ver, editar la nota
      startActivity(new Intent(Intent.ACTION_EDIT, uri));
}
```

 [1]: https://elbauldelprogramador.com/programacion-android-implementando-un
 [2]: https://elbauldelprogramador.com/programacion-android-como-se-resuelven
