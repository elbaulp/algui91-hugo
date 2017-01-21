---
author: alex
categories:
- java
color: '#D32F2F'
description: "En este art\xEDculo veremos un poco sobre el manejo de excepciones en
  java, esto es esencial para toda programaci\xF3n b\xE1sica en java, una excepci\xF3n
  es un indicador que tenemos de que algo ha ido mal en nuestro c\xF3digo. Con lo
  cual podremos controlarlas y capturarlas para poder tratar con ellas e indicar lo
  que se tiene que hacer."
lastmod: 2015-12-24
layout: post.amp
mainclass: java
permalink: /manejar-excepciones-en-java/
tags:
- errores java
- excepciones java
- finally java
- try catch java
title: Manejar excepciones en Java
---

> Éste artículo es una colaboración de [Jonathan Melgoza.][1]

## Introducción

En este artículo veremos un poco sobre el manejo de excepciones en java, esto es esencial para toda programación básica en java, una excepción es un indicador que tenemos de que algo ha ido mal en nuestro código. Con lo cual podremos controlarlas y capturarlas para poder tratar con ellas e indicar lo que se tiene que hacer.

<!--more--><!--ad-->

### Instrucción Try - Catch

Cuando sabemos que un código podría lanzar un error, como por ejemplo una división entre cero, debemos encerrarla entre un bloque `try-catch`. Veamos un ejemplo:

```java
int a = 5 / 0;

```

esta linea nos lanzaría la siguiente excepción: `Exception in thread "main" java.lang.ArithmeticException: / by zero`

Si en cambio atrapamos esta excepción podremos controlarla:

```java
try{
    int a = 5 / 0;
}catch(ArithmeticException err){
    int a = 0;
}

```

### El Bloque Finally

`Finally` se utiliza cuando el programador solicita ciertos recursos al sistema que se deben liberar, y se coloca después del último bloque `catch`. Veamos un ejemplo en el que intentamos leer un archivo:

```java
FileReader lector = null;
try {
    lector = new FileReader("archivo.txt");
    int i=0;
    while(i != -1){
        i = lector.read();
        System.out.println((char) i );
    }
} catch (IOException e) {
    System.out.println("Error");
} finally {
    if(lector != null){
            lector.close();
    }
}

```

el código contenido en `finally` se ejecutará tras terminar el bloque `try`, haya habido o no excepción, lo que permite liberar los recursos reservados para abrir el archivo. (Más sobre finally en la [documentación de Oracle][2])

### La Cláusula Throws

Esta cláusula advierte de las excepciones que podría lanzar un método, van entre la declaración del método y su cuerpo (pueden ser varias), así:

```java
public static void metodo() throws ArithmeticException{
    try{
        int a = 5 / 0;
    }catch(ArithmeticException err){
        int a = 0;
    }
}

```

### La palabra clave throw

`throw` nos permite lanzar una excepción propia, esto lo veremos en el siguiente ejemplo en el que aprovechamos para englobar todo lo visto aquí:

```java
public static void main(String[] args) {
    int a;
    try{
        a = dividir(5,0);
    }catch(MalNumeroADividir err){
        System.out.println(err);
    }finally{
        a = 0;
    }
    System.out.println("Valor de a = "+a);
}

public static int dividir(int a, int b)throws MalNumeroADividir{
    if(b == 0){
        throw new MalNumeroADividir();
    }
    return a / b;
}

public static class MalNumeroADividir extends Exception {
    MalNumeroADividir() {
       super("No es posible dividir entre cero");
   }
}


```

Como vimos el manejo de las excepciones en java no es algo difícil de implementar.



 [1]: http://jonathanmelgoza.com/blog/ "Blog del colaborador"
 [2]: http://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html "Finally Oracle"
