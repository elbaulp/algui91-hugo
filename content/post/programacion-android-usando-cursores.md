---
author: alex
categories:
- android
- opensource
date: '2016-01-01'
lastmod: 2017-09-01T12:27:38+01:00
mainclass: android
url: /programacion-android-usando-cursores/
tags:
- curso android pdf
- Cursores Android
title: "Programación Android: Usando cursores"
---

Cosas a saber sobre un cursor Android:

  * Un cursor es una colección de filas.
  * Es necesario usar ***moveToFirst()*** antes de leer cualquier dato del cursor ya que éste comienza posicionado antes de la primera fila.
  * Es necesario conocer los nombres de las columnas.
  * También es necesario conocer los tipos de las columnas.
  * Todos los métodos de acceso a los campos se basan en números de columnas, por lo que se necesita convertir el nombre de la columna a un número.
  * El cursor es un cursor aleatorio, es decir, podemos movernos por él hacia delante, hacia atrás o saltar de una posición a otra.
  * Dado que el cursor es de tipo aleatorio, podemos solicitar el número de registros que contiene.

El cursor tiene unos métodos que nos permiten navegar por él. A continuación vemos como comprobar si el cursor está vacío y cómo navegar por él fila a fila en caso de no estarlo.


<!--more--><!--ad-->

```java
if (cur.moveToFirst() == false){
   //el cursor está vacío
   return;
}

//El cursor ahora apunta a la primera fila
// Accedemos a las columnas
int nameColumnIndex = cur.getColumnIndex(People.NAME);
String name = cur.getString(nameColumnIndex);


//Veamos ahora como iterar sobre un cursor
while(cur.moveToNext()){
   //El curosr se ha movido correctamente
   //Accedemos a los campos
}

```

En el ejemplo de arriba se asume que el cursor está posicionado antes de la primera fila. Para posicionarlo en la primera fila usamos ***moteToFirst()***. Este método devuelve ***false*** si el cursor está vacío. Después usamos ***moveToNext()*** repetitivamente para avanzar en el cursor.

Para ayudarnos a saber donde se encuentra el cursor, Android proporciona los siguientes métodos:

```bash
isBeforeFirst()
isAfterLast()
isClosed()
```

Haciendo uso de estos métodos podemos recorrer el cursor con un *for* en lugar de con un *while:*

```java
// Obtenemos los índices de las columnas
int nameColumn = cur.getColumnIndex(People.NAME);
int phoneColumn = cur.getColumnIndex(People.NUMBER);

//Recorremos el cursor
for(cur.moveToFirst(); !cur.isAfterLast(); cur.moveToNext()){
   String name = cur.getString(nameColumn);
   String phoneNumber = cur.getString(phoneColumn);
}
```

Por último, para obtener el número de registros que hay en el cursor, podemos usar el método ***getCount().***

# Siguiente Tema: [Usando la cláusula Where][1]

 [1]: https://elbauldelprogramador.com/programacion-android-usando-la-clausula/
