---
author: alex
categories:
- android
- how to
color: '#689F38'
date: '2016-12-12'
layout: post.amp
mainclass: android
permalink: /ndk-gdb-depurar-aplicaciones-en-el-nkd-de-android/
tags:
- como depurar jni android
- depurar aplicaciones con ndk-gdb
- depurar codigo nativo android ndk-gdb
- tutorial ndk-gdb
title: NDK-gdb - Depurar aplicaciones en el NKD de Android
---

En el artículo [Introducción al NDK de Android][1] se explicaron las nociones básicas del NDK, hoy vamos a ver un ejemplo un poco más complejo en el que aprenderemos a depurar código nativo en aplicaciones [Android][2]. La aplicación de ejemplo actuará como servidor esperando conexiones mediante *telnet*. Cuando un cliente se conecte al dispositivo a través *telnet*, será posible enviar y recibir mensajes. Así como ejecutar dos comandos, *ip_de <dominio>*, que devolverá la *IP* de dicho dominio, y *adios*, que finalizará la conexión.


<!--more--><!--ad-->

El proyecto está disponible para descargar en <a href="https://github.com/algui91/androidSimpleServerNDKExample" target="_blank">GitHub</a>. He de decir que el código [C][3] usado en el ejemplo es una adaptación de un trozo de código del libro *<a href="http://www.amazon.es/gp/product/1593271441/ref=as_li_ss_tl?ie=UTF8&tag=elbaudelpro-21&linkCode=as2&camp=3626&creative=24822&creativeASIN=1593271441" target="_blank">Hacking: The Art of Exploitation</a>*, concretamente el ejemplo *simple_server.c* de la sección *0x425 A simple Server Example*.

Dicho esto, empezaremos creando un proyecto en eclipse, y a la actividad principal le añadiremos el siguiente código:

```java
private static final String TAG = "SimpleServer";
    private TextView mTextView;
    private Button mButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mTextView = (TextView) findViewById(R.id.textView2);
    }

    public void onClick(View target) {
        switch (target.getId()) {
            case R.id.button1:

                mTextView.setText("Ejecuta 'telnet <ip> 7890' desde el pc");
                mButton = (Button) findViewById(R.id.button1);
                mButton.setEnabled(false);

                new AsyncTask<void>() {
                    @Override
                    protected String doInBackground(Void... params) {
                        return startTelnetSession();
                    }

                    @Override
                    protected void onPostExecute(String result) {
                        mTextView.setText(result);
                        mButton.setEnabled(true);
                    }
                }.execute();

                break;
            default:
                break;
        }
    }

    public native String startTelnetSession();

    static {
        Log.d(TAG, "libsServer loaded.");
        System.loadLibrary("sServer");
    }
}

```

Por ahora es bastante sencillo, tenemos un [*TextView* y un *Button*][4] en la interfaz. Con el primero mostraremos un log de los datos transferidos durante la sesión *telnet*, y con el botón conectaremos y desconectaremos la sesión. El método

```java
startTelnetSession()
```

es el que está implementado en C y por ello se declara como

```java
public native String startTelnetSession();
```

en la *[Activity][5]*.

El hecho de crear un *AsyncTask* impide que la interfaz gráfica se quede bloqueada durante la conexión *telnet*, ya que el servidor se ejecuta en un hilo distinto.

Veamos ahora el código C, que implementa el servidor:

```c
#include <jni.h>

#include <android>log.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <sys</android>socket.h>
#include <netinet>in.h>
#include <arpa</netinet>inet.h>
#include <netdb.h>

#include "hacking.h"

#define PORT 7890  // the port users will be connecting to
const char* TAG = "SimpleServer.c";
int command_log_pos = 0;

void
addToLog(char log[], char *new_entry) {
  /* Almacenar todo lo transmitido en la conexión */
  strcpy(log + command_log_pos, new_entry);
  command_log_pos += strlen(new_entry);
}

char*
startServer(void) {
  int sockfd = 0, new_sockfd;  // listen on sock_fd, new connection on new_fd
  struct sockaddr_in host_addr, client_addr;   // my address information
  socklen_t sin_size;
  int recv_length = 1, yes = 1;
  char buffer[1024];
  char command_log[16384];
  command_log_pos = 0;

  __android_log_write(ANDROID_LOG_INFO, TAG, "Iniciando servidor");

  if ((sockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1)
    __android_log_write(ANDROID_LOG_ERROR, TAG, "Fatal en socket");

  if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes;, sizeof(int)) == -1)
    __android_log_write(ANDROID_LOG_ERROR, TAG, "Fatal en setsockopt");

  host_addr.sin_family = AF_INET;       // host byte order
  host_addr.sin_port = htons(PORT);   // short, network byte order
  host_addr.sin_addr.s_addr = INADDR_ANY;  // automatically fill with my IP
  memset(&(host_addr.sin_zero), '\0', 8);  // zero the rest of the struct

  if (bind(sockfd, (struct sockaddr *) &host;_addr, sizeof(struct sockaddr))
      == -1)
    __android_log_write(ANDROID_LOG_ERROR, TAG, "Fatal en bind");

  if (listen(sockfd, 5) == -1)
    __android_log_write(ANDROID_LOG_ERROR, TAG, "fatal en listen");

  while (1) {    // Accept loop
    sin_size = sizeof(struct sockaddr_in);
    new_sockfd = accept(sockfd, (struct sockaddr *) &client;_addr, &sin;_size);
    if (new_sockfd == -1)
      __android_log_write(ANDROID_LOG_ERROR, TAG, "Fatal en accpct");

    __android_log_print(ANDROID_LOG_INFO, TAG,
                        "server: conexión de %s en puerto %d\n",
                        inet_ntoa(client_addr.sin_addr),
                        ntohs(client_addr.sin_port));

    send(new_sockfd, "Bienvenido!\n", 12, 0);
    recv_length = recv(new_sockfd, &buffer;, 1024, 0);

    while (recv_length > 0) {
      buffer[recv_length] = 0;
      addToLog(command_log, buffer);

      if (strncasecmp(buffer, "adios", 5) == 0) {
        send(new_sockfd, "Adios!\n", 7, 0);
        __android_log_print(ANDROID_LOG_INFO, TAG,
                            "Conexión finalizada con %s:%d",
                            inet_ntoa(client_addr.sin_addr),
                            ntohs(client_addr.sin_port));
        close(new_sockfd);
        close(sockfd);
        return command_log;
      } else if (strncasecmp(buffer, "ip_de ", 6) == 0) {
        struct hostent *host_info;
        struct in_addr *address;
        char *url = buffer + 6;  // quito ip_de

        memset(url + (strlen(url) - 2), '\0', 2);  // quito \r\n
        host_info = gethostbyname(url);

        if (host_info == NULL) {
          __android_log_print(ANDROID_LOG_WARN, TAG, "Couldn't lookup %s\n",
                              url);
          char *fail = "No se pudo resolver el nombre de dominio de ";
          char *errorMessage = (char*) ec_malloc(strlen(url) + strlen(fail));
          memset(errorMessage, '\0', strlen(errorMessage));

          strcat(errorMessage, fail);
          strcat(errorMessage, url);
          strcat(errorMessage, "\n");

          addToLog(command_log, errorMessage);
          send(new_sockfd, errorMessage, strlen(errorMessage), 0);
          //free(errorMessage);
        } else {
          address = (struct in_addr *) (host_info->h_addr);
          __android_log_print(ANDROID_LOG_INFO, TAG, "%s has address %s \n",
                              host_info->h_name, inet_ntoa(*address));
          char *host = strcat(url, " has address ");
          strcat(host, inet_ntoa(*address));
          addToLog(command_log, strcat(host, "\n"));
          send(new_sockfd, host, strlen(host), 0);
        }
      }
      __android_log_print(ANDROID_LOG_INFO, TAG,
                          "Recibidos %d bytes mensaje: %s", recv_length,
                          buffer);
      recv_length = recv(new_sockfd, &buffer;, 1024, 0);
    }
    close(new_sockfd);
    close(sockfd);
    __android_log_write(ANDROID_LOG_INFO, TAG, "closed");

  }
  return 0;
}

jstring
Java_com_elbauldelprogramador_simpleserver_MainActivity_startTelnetSession(
    JNIEnv* env, jobject thiz) {
  char *bf = startServer();
  return (*env)->NewStringUTF(env, bf);
}

```

Consta de 3 métodos,

```c
jstring Java_com_elbauldelprogramador_simpleserver_MainActivity_startTelnetSession()
```

que será llamado desde la activity principal y simplemente llama al método

```c
char *startServer()
```

que ejecuta el servidor esperando a que devuelva un log de los datos transmitidos durante la conexión. Una vez finalizada, el método *startTelnetSession* devuelve el log al código Java para mostrarlo en pantalla. Por último la función

```c
void addToLog()
```

es la encargada de realizar el registro de todos los mensajes enviados durante la sesión *telnet*.

Ya está todo listo, falta crear el *Android.mk* como sigue:

```make
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := sServer
LOCAL_SRC_FILES := sServer.c
LOCAL_LDLIBS := -llog

include $(BUILD_SHARED_LIBRARY)

```

La línea

```make
LOCAL_LDLIBS := -llog
```

enlaza la librería que permite imprimir mensajes de log al logcat desde C/C++ usando las funciones

```c
__android_log_print()
__android_log_write()

```

La diferencia entre ellas está en que la primera permite que formateemos la cadena de texto de forma similar a la función *printf*. Estas funciones están declaradas en */CARPETA-NDK/platforms/android-14/arch-arm/usr/include/android/log.h*:

```c
/*
 * Send a simple string to the log.
 */
int __android_log_write(int prio, const char *tag, const char *text);
/*
 * Send a formatted string to the log, used like printf(fmt,...)
 */
int __android_log_print(int prio, const char *tag,  const char *fmt, ...)
#if defined(__GNUC__)
    __attribute__ ((format(printf, 3, 4)))
#endif
    ;

```

La prioridad del log (Equivalente en java a Log.d, Log.e, Log.w etc) se establece mediante la siguiente enumeración:

```c
/*
 * Android log priority values, in ascending priority order.
 */
typedef enum android_LogPriority {
    ANDROID_LOG_UNKNOWN = 0,
    ANDROID_LOG_DEFAULT,    /* only for SetMinPriority() */
    ANDROID_LOG_VERBOSE,
    ANDROID_LOG_DEBUG,
    ANDROID_LOG_INFO,
    ANDROID_LOG_WARN,
    ANDROID_LOG_ERROR,
    ANDROID_LOG_FATAL,
    ANDROID_LOG_SILENT,     /* only for SetMinPriority(); must be last */
} android_LogPriority;

```

### Compilando la aplicación con ndk-build

Nos situamos en el directorio del proyecto y ejecutamos:

```bash
ndk-build && ant debug && adb install -r bin/MainActivity-debug.apk

```

Si todo está bien, la aplicación deberá estar instalada en el dispositivo.

### Depurando la aplicación con ndk-gdb

El comando para iniciar el depurador es

```bash
ndk-gdb --start --verbose

```

que automáticamente iniciará la aplicación en el dispositivo y nos mostrará el *prompt* de *gdb* en el pc. Llegados a este punto, debemos situar un *breakpoint* en el lugar deseado, por ejemplo en la función *addToLog*, en la línea 21. Establecemos el *breakpoint* y dejamos que la aplicación sigua ejecutándose:

```bash
(gdb) b 21
Breakpoint 1 at 0x4f023160: file jni/sServer.c, line 21.
(gdb) c
Continuing

```

Pulsamos el botón *Conectar* en el móvil y abrimos un terminal para conectamos a nuestro dipositivo mediante telnet:

```bash
$ telnet 192.168.1.34 7890
Trying 192.168.1.34...
Connected to 192.168.1.34.
Escape character is '^]'.
Bienvenido!

```

Intentamos averiguar la dirección IP de algunas webs:

```bash
ip_de elbauldelprogramador.com

```

Al pulsar enter, se detiene la ejecución del programa debido al *breakpoint* en la línea 21

```bash
Breakpoint 1, addToLog (log=0x54b38c1c "", new_entry=0x54b3881c "ip_de elbauldelprogramador.com\r\n") at jni/sServer.c:21
21   addToLog(char log[], char *new_entry) {
(gdb)

```

GDB espera a que le demos instrucciones, examinamos el contenido de los parámetros de la función *addToLog*:

```bash
(gdb) x /s log
0x54b38c1c:     ""
(gdb) x /s new_entry
0x54b3881c:  "ip_de elbauldelprogramador.com\r\n"
(gdb) s
23      strcpy(log + command_log_pos, new_entry);
(gdb) display /s log
1: x/s log  0x54b38c1c:  ""
(gdb) display /s new_entry
2: x/s new_entry  0x54b3881c:  "ip_de elbauldelprogramador.com\r\n"
(gdb) s
24      command_log_pos += strlen(new_entry);
2: x/s new_entry  0x54b3881c:     "ip_de elbauldelprogramador.com\r\n"
1: x/s log  0x54b38c1c:   "ip_de elbauldelprogramador.com\r\n"
(gdb)
25 }
2: x/s new_entry  0x54b3881c:   "ip_de elbauldelprogramador.com\r\n"
1: x/s log  0x54b38c1c:   "ip_de elbauldelprogramador.com\r\n"
(gdb)

```

Como vemos simplemente se ha copiado el comando ejecutado a un buffer que llevará el registro de datos transmitidos en la sesión *telnet*. Continuamos la ejecución del programa:

```bash
(gdb) c
Continuing.

Breakpoint 1, addToLog (log=0x54b38c1c "ip_de elbauldelprogramador.com\r\n", new_entry=0x54b38822 "elbauldelprogramador.com has address 5.39.89.44\n")
    at jni/sServer.c:21
21 addToLog(char log[], char *new_entry) {
2: x/s new_entry  0x54b38822:     "elbauldelprogramador.com has address 5.39.89.44\n"
1: x/s log  0x54b38c1c:     "ip_de elbauldelprogramador.com\r\n"

```

y vuelve a saltar el *breakpoint*, esta vez con la respuesta del comando informándonos de cual es la dirección ip del dominio introducido. Al salir de la función, el buffer de log contendrá la cadena: *&#8220;ip_de elbauldelprogramador.com\r\nelbauldelprogramador.com has address 5.39.89.44\n&#8221;*

Por último continuemos la ejecución y escribimos unos cuantos comandos más:

```bash
ip_de gooip_de google.com
google.com has address 173.194.41.226
ip_de elbauldelprogramador.org
No se pudo resolver el nombre de dominio de elbauldelprogramador.org
google.com has address 173.194.41.226
ip_de elbauldelprogramador.org
No se pudo resolver el nombre de dominio de elbauldelprogramador.org
adios

```

Con el comando adios terminamos la sesión, y el buffer ha registrado toda la comunicación y contiene:

```bash
(gdb) x /2s command_log
0x54b38c1c:     "ip_de elbauldelprogramador.com\r\nelbauldelprogramador.com has address 5.39.89.44\nip_de google.com\r\ngoogle.com has address 173.194.41.226\nip_de elbauldelprogramador.org\r\nNo se pudo resolver el nombre de"...
0x54b38ce4:    " dominio de elbauldelprogramador.org\nadios\r\n"

```

y se muestra en la pantalla del dispositivo:

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/06/Screenshot_2013-06-17-17-20-53-180x300.png" alt="tutorial ndk-gdb" width="180px" height="300px" />][6]

Con esto concluye el artículo, espero que haya sido de utilidad.

#### Referencias

*Repositorio en GitHub del ejemplo* »» <a href="https://github.com/algui91/androidSimpleServerNDKExample" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/introduccion-al-ndk-de-android/ "Introducción al NDK de Android"
 [2]: https://elbauldelprogramador.com/android/
 [3]: https://elbauldelprogramador.com/lenguaje-c/
 [4]: https://elbauldelprogramador.com/programacion-android-interfaz-grafica_25/
 [5]: https://elbauldelprogramador.com/fundamentos-programacion-android_17/
 [6]: https://elbauldelprogramador.com/img/2013/06/Screenshot_2013-06-17-17-20-53.png


</netdb.h></jni.h></void></ip></dominio>