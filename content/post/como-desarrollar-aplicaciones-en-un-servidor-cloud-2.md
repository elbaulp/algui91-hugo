---
author: alex
categories:
- java
date: '2016-01-01'
lastmod: 2017-03-20T10:02:21+01:00
mainclass: servidores
url: /como-desarrollar-aplicaciones-en-un-servidor-cloud-2/
tags:
- aplicaciones cliente servidor
- desarrollo backend
- servidores cloud
title: "C\xF3mo desarrollar aplicaciones en un servidor Cloud"
---

En éste artículo vamos a ver cómo configurar un servidor cloud para ejecutar una aplicación básica a modo de ejemplo. Será el típico juego de adivinar qué número ha pensado el oponente, escrito en Java. Para el lado servidor, he elegido el servicio cloud de [Arsys][1], bastante sencillo de usar. Ya que permite crear servidores a base de clicks, e incrementar los recursos de cada servidor para que se ajusten a nuestras necesidades.

<!--more--><!--ad-->

# Configurar el servidor

## Crear el tipo de servidor

En éste caso, elegiremos un servidor con Debian 6, y una instalación base.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/1.-Creación-de-un-servidor-Cloud.png" alt="1. Creación de un servidor Cloud" width="817px" height="448px" />

## Configurar la capacidad del servidor

Para el ejemplo concreto, no necestiamos grandes recursos, así que fijaremos todo al mínimo.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/2.-Configuración-capacidad-servidor-Cloud.png" alt="2. Configuración capacidad servidor Cloud" width="817px" height="575px" />

## Establecer la contraseña de usuario

Por último, solo resta proporcionar una contraseña al usuario **root**.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/3.-Finalización-de-la-puesta-en-marcha-del-servidor-cloud.png" alt="3. Finalización de la puesta en marcha del servidor cloud" width="815px" height="581px" />

# Código del programa del lado servidor

El fichero `Servidor.java`, código encargado de aceptar las peticiones de nuevos jugadores.

```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Servidor {

  public static void main(String[] args) {

    ServerSocket socketServidor;
    Socket socketServicio = null;
    int port = 8989;

    try {
      socketServidor = new ServerSocket(port);
      do {
        socketServicio = socketServidor.accept();
        Procesador procesador = new Procesador(socketServicio);
        procesador.start();

      } while (true);

    } catch (IOException e) {
      System.err.println("Error al escuchar en el puerto " + port);
    }
  }
}

```

El fichero `Procesador.java` es el encargado de procesar cada una de las peticiones entrantes en un hilo separado.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Random;
import java.util.Scanner;

public class Procesador extends Thread {

  private Socket mServiceSock;

  private Random mRandom;
  private int mThougtNumber;
  private int mMyGuessedNumber;

  private final int MAX_NUMBER = 100;
  private final int IS_SMALLER = 0;
  private final int IS_GREATER = 1;
  private final int IS_EQUAL = 2;

  public Procesador(Socket socketServicio) {
    this.mServiceSock = socketServicio;
    mRandom = new Random();
    mThougtNumber = mRandom.nextInt(MAX_NUMBER);
    System.out.println("Server number " + mThougtNumber + " for player " + socketServicio);
  }

  public void run() {

    try {
      PrintWriter outPrinter = new PrintWriter(
        mServiceSock.getOutputStream(), true);
        BufferedReader inReader = new BufferedReader(new InputStreamReader(
          mServiceSock.getInputStream()));

          boolean noWinner = true;

          while (noWinner) {

            // Get the answer for my guessed number and his guessed number
            // from the client
            String clientResponseCodeAndGuessedNumber = inReader.readLine();

            Scanner parseResponse = new Scanner(
              clientResponseCodeAndGuessedNumber);

              int responseCode = parseResponse.nextInt();
              int clientGuessed = parseResponse.nextInt();
              parseResponse.close();

              // Hint for the client
              String serverResponseCode;
              if (clientGuessed == mThougtNumber) {
                serverResponseCode = Integer.toString(IS_EQUAL);
                noWinner = false;
              } else if (clientGuessed > mThougtNumber) {
                serverResponseCode = Integer.toString(IS_SMALLER);
              } else {
                  serverResponseCode = Integer.toString(IS_GREATER);
              }

              // See if I won
              if (responseCode == IS_EQUAL) {
                outPrinter.println(serverResponseCode + " " + -1);
                noWinner = false;
              } else if (responseCode == IS_GREATER) {
                mMyGuessedNumber = randInt(mMyGuessedNumber + 1, MAX_NUMBER);
              } else if (responseCode == IS_SMALLER) {
                mMyGuessedNumber = randInt(0, mMyGuessedNumber - 1);
              } else { // First connection, the server has not send any number
                mMyGuessedNumber = mRandom.nextInt(MAX_NUMBER);
              }
              outPrinter.println(serverResponseCode + " " + mMyGuessedNumber);
          }

          System.out.println("Closing connection for " + mServiceSock);
          mServiceSock.close();

    } catch (IOException e) {
      System.err.println("Error al obtener los flujso de entrada/salida.");
    }
  }

  /**
  * Returns a pseudo-random number between min and max, inclusive. The
  * difference between min and max can be at most
  * <code>Integer.MAX_VALUE - 1</code>.
  *
  * @param min Minimum value
  * @param max Maximum value. Must be greater than min.
  * @return Integer between min and max, inclusive.
  * @see java.util.Random#nextInt(int)
  * @author http://stackoverflow.com/a/363692/1612432
  */
  public static int randInt(int min, int max) {

    // NOTE: Usually this should be a field rather than a method
    // variable so that it is not re-seeded every call.
    Random rand = new Random();

    // nextInt is normally exclusive of the top value,
    // so add 1 to make it inclusive
    int randomNum = rand.nextInt((max - min) + 1) + min;

    return randomNum;
  }
}

```

El código para el lado del cliente es el siguiente:

```java
//package pregunta5;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Random;
import java.util.Scanner;

public class Cliente {

  public static void main(String[] args) {

    final int IS_SMALLER = 0;
    final int IS_GREATER = 1;
    final int IS_EQUAL = 2;

    String host = "82.223.79.233";
    int port = 8989;

    Socket socketServicio = null;

    Random random = new Random();
    final int MAX_NUMBER = 100;

    int myThougtNumber = random.nextInt(MAX_NUMBER);
    System.out.println("Mi numero es: " + myThougtNumber);

    try {

      socketServicio = new Socket(host, port);

      PrintWriter outPrinter = new PrintWriter(
      socketServicio.getOutputStream(), true);
      BufferedReader inReader = new BufferedReader(new InputStreamReader(socketServicio.getInputStream()));

      System.out.println("ncual es el numero del servidor entre 0 y " + MAX_NUMBER);
      Scanner readInt = new Scanner(System.in);
      int myGuessedNumber = readInt.nextInt();

      outPrinter.println(Integer.toString(-1) + " " + myGuessedNumber);

      boolean noWinner = true;

      while (noWinner) {

        String serverResponseCodeAndGuessedNumber = inReader.readLine();

        Scanner parseResponse = new Scanner(
        serverResponseCodeAndGuessedNumber);

        int responseCode = parseResponse.nextInt();
        int serverGuessed = parseResponse.nextInt();

        parseResponse.close();

        if (responseCode == IS_EQUAL) {
          System.out.println("+ Servidor: Mi número es igual, has ganado, adios");
          noWinner = false;
        } else if (responseCode == IS_GREATER) {
          System.out.println("+ Servidor: Mi número es mayor, introduce otro:");
        } else {
          System.out.println("+ Servidor: Mi número es menor, introduce otro:");
        }

        if (noWinner)
          System.out.println("+ Servidor dice " + serverGuessed + ", y el mio es "
        + myThougtNumber);

        String clientResponseCode;
        if (serverGuessed == myThougtNumber) {
          clientResponseCode = Integer.toString(IS_EQUAL);
          System.out.println("Ha ganado el servidor! bye");
          noWinner = false;
        } else if (serverGuessed > myThougtNumber) {
          clientResponseCode = Integer.toString(IS_SMALLER);
        } else {
          clientResponseCode = Integer.toString(IS_GREATER);
        }

        // Ask the client for a new number
        if (noWinner)
          myGuessedNumber = readInt.nextInt();
        outPrinter.println(clientResponseCode + " " + myGuessedNumber);
    }

    // socketServicio.close();
    readInt.close();

    System.out.println("Hasta pronto!!");

    } catch (UnknownHostException e) {
      System.err.println("Error: Nombre de host no encontrado.");
    } catch (IOException e) {
      System.err.println("Error de entrada/salida al abrir el socket.");
    }
  }
}

```

# Enviar el programa al servidor.

Para el servidor únicamente nos hacen falta los ficheros `Servidor.java` y `Procesador.java`, podemos enviarlos con *scp*:

```bash
scp Servidor.java Procesador.java root@ip:

```

## Compilar el programa en el servidor

Accedemos al servidor mediante ssh y compilamos el programa:

```bash
javac Servidor.java
javac Procesador.java

```

## Ejecutar el programa servidor

```bash
java Servidor

```

# En el lado cliente

En la máquina que hará de cliente, compilamos el programa `Cliente.java`:

```bash
javac Cliente.java

```

y lo ejecutamos:

```bash
java Cliente

```

Sin embargo, no funcionará, ya que el programa usa el puerto 8989, el cual no está permitido explícitamente por el firewall, para ello, bastaría con añadir una regla a iptables:

```bash
iptables -A INPUT -m state --state NEW -p tcp --dport 8989 -j ACCEPT

```

O, desde Arsys, en políticas de firewall añadir lo siguiente:

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/5.-Configuración-puerto.png" alt="5. Configuración puerto" width="343px" height="45px" />

# Captura de pantalla del juego en marcha

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2015/01/6.-Ejempli-programa.png" alt="6. Ejemplo programa" width="653px" height="863px" />



 [1]: http://www.arsys.es/cloud/cloudbuilder/?utm_source=cooperation&utm;_medium=baul&utm;_term=desarrollarapps&utm;_content=online&utm;_campaign=cloud "Servidores Cloud"
