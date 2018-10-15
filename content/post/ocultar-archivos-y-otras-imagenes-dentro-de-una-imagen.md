---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-06T13:52:56+01:00
url: /ocultar-archivos-y-otras-imagenes-dentro-de-una-imagen/
aliases: /programacion/ocultar-archivos-y-otras-imagenes-dentro-de-una-imagen/
tags:
- c
- estenografía
title: Ocultar archivos dentro de una imagen
---

<figure>
    <img sizes="(min-width: 395px) 395px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="winzip_xp_encrypt_icon" src="/img/2012/09/winzip_xp_encrypt_icon11.gif" alt="" width="395px" height="380px"></img>
</figure>

Hace unos meses publiqué una <a href="/ocultarrevelar-informacion-dentro-de/" target="_blank">entrada</a> en la que explicaba (Sin mostar código) una práctica que me mandaron en la asignatura metodología de la programación.

En estos meses de verano he ido modificando esta práctica para cambiarle la funcionalidad y así poder compartirla con vosotros.

La práctica original consistía en ocultar mensajes dentro de una imágen de tipo PGM o PPM, que no usan compresión, lo que permite modificar los bits menos significativos de cada pixel sin que el ojo humano perciba el cambio de color y permitiendo almacenar información en él.

Despues de las modificaciones que hice, permite ocultar archivos de texto ( y cualquier archivo que esté únicamente compuesto por *char* o *unsigner char.*)

Empecemos explicando la estructura del directorio:

* doc
* imágenes
* include
  * codificar.h
  * imagenES.h
* src
  * codificar.cpp
  * imagenES.cpp
  * ocultar.cpp
  * revelar.cpp
* Makefile

La carpeta doc contiene la documentación generada con doxygen, en imágenes evidentemente las imágenes a usar, el directorio *include* contiene los archivos de cabecera **codificar.h**, (con la declaración de las funciones que ocultarán y revelarán los datos ocultos) y **imagenES.h** (Tanto este archivo como su correspondiente cpp los facilitó la facultad para poder leer y escribir en imágenes de tipo PPM y PGM). La carpeta **src** contiene 4 archivos, **ocultar.cpp** y **revelar.cpp** son los dos programas a usar cuando queramos ocultar o revelar la información de una imagen. En **codificar.cpp** se definen las operaciones mencionadas anteriormente. Por último el **Makefile** define las reglas para compilar todo.

A continuación paso a describir uno a uno los archivos :

<!--more--><!--ad-->


# *./include/codificar.h*

```cpp
/**
  * @file codificar.h
  * @brief Fichero cabecera que oculta/revela mensajes
  *
  * @author Alejandro Alcalde Barros
  *    @date 16/03/2012
  *
  */

#ifndef CODIFICAR_H_
#define CODIFICAR_H_
#include <iostream>

int get_file_size(std::ifstream& );

int ocultar(unsigned char[],int , char[]);

int revelar(unsigned char[],int, char[], int);

#endif /* CODIFICAR_H_ */
```

- `int get_file_size(std::ifstream& );` será útil para obtener el tamaño en bytes del fichero a ocultar.
- `int ocultar(unsigned char[],int , char[]);` se encarga de ocultar el archivo en sí, el primer parámetro es el buffer de la imagen (contiene el valor de los píxeles), el segundo el tamaño de la imagen y el tercero el nombre del archivo a ocultar.

# *./src/codificar.cpp*

```cpp
/*
 * @file codificar.cpp
 * @brief Encargada de codificar y descodificar mensajes ocultos
 *  Created on: Mar 15, 2012
 *      @
 */
#include "../include/codificar.h"
#include <fstream>
#include <string.h>

using namespace std;

const bool WRITE_FROM_FILE = true;
const bool WRITE_FROM_ARRAY = false;

//TODO hacer que ifstream sea opcional
int write_bit_by_bit(unsigned char buffer[], ifstream& f, int from, int to, char sms[], bool type){

    unsigned short int indiceLetra        = 0;
    unsigned char mask                    = 0x80; //Empezamos por el bit más significativo (10000000)

    char* file_buffer = 0;

    if(type){ //Write file data
        int number_of_bytes_to_read = to;//get_file_size(f);
        file_buffer = new char[number_of_bytes_to_read];
        f.read(file_buffer, number_of_bytes_to_read);
    }

    const char* place_to_get_stuff_from = type ? file_buffer : sms;
    char letra = place_to_get_stuff_from[0];
    int indice = from;

    for (int i = 0; i < to; i++) {
        for (int k = 7; k >= 0; k--){
            char c = (letra & mask) >> k;
            mask >>= 1;

            buffer[indice] &= 0xfe; //hacemos 0 último bit con máscara 11111110
            buffer[indice++] ^= c;
        }
        letra = place_to_get_stuff_from[++indiceLetra];//letra = sms[++indiceLetra];
        mask = 0x80;
    }
    if (file_buffer) delete[] file_buffer;
    place_to_get_stuff_from = 0;

    return indice;
}


int ocultar(unsigned char buffer[],int tamImage, char sms[]){

    ifstream f(sms);

    if (f) {

        strcpy(sms,basename(sms));

        //Cabecera que indica el comienzo del nombre del archivo
        buffer[0] = 0xff;

        //Calculo el pixel donde tiene que terminar el nombre del archivo
        int fin_cabecera = strlen(sms) * 8 +1;
        buffer[fin_cabecera] = 0xff;

        //Escribo el nombre del archivo a ocultar
        write_bit_by_bit(buffer, f, 1, strlen(sms), sms, WRITE_FROM_ARRAY);

        int tamanio_en_bytes = get_file_size(f) /** 8*/;
        int datos_fichero = fin_cabecera + 1;
        int ind = write_bit_by_bit(buffer, f, datos_fichero, tamanio_en_bytes, sms, WRITE_FROM_FILE);

        //Escribo 0xff para indicar EOF de los datos
        char eof = 0x7f;
        char* fin_contenido = &eof;

        write_bit_by_bit(buffer, f, ind, 1, fin_contenido, WRITE_FROM_ARRAY);
    }
    return 0;
}

//____________________________________________________________________________

int revelar(unsigned char buffer[], int tamImage, char sms[], int tamSMS){

    int indice_sms            = 0;
    char value                = 0;

    unsigned char* ptr;
    int in = 1;
    ptr = buffer;

    //Me posiciono en la pos siguiete del nombre del archivo, donde empieza el contenido del mismo.
    while(ptr[in++] != 0xff);
    ptr = 0;

    int i = 1;
    while (i != in-1){
        for (int k = 8; k > 0; k--)
            value = value << 1 | (buffer[i++] & 0x01); //vamos almacenando en value los 8 bits
        sms[indice_sms++] = value;
        value = 0;
        if (indice_sms > tamSMS)
            return -1; //cadena de mayor tamaño que que la cadena donde almacenarlo
    }

    //Ahora en sms está el nombre del fichero, lo creamos:.
    ofstream f(sms);
    if (f) {
        //seguimos leyendo hasta que encontremos un byte a 0x7f, que indica el fin del archivo
        bool fin_datos = false;
        int indice = in;
        value = 0;
        for (int i = in; i < tamImage && !fin_datos; i++) {
            for (int k = 0; k < 8; k++)
                value = value << 1 | (buffer[indice++] & 0x01); //vamos almacenando en value los 8 bits
            if (value == 0x7f) {
                fin_datos = true;
                continue;
            }
            f.write(&value;, 1); //TODO, ir almacenanto en array y luego escribir a archivo
            value = 0;
        }
    }

    return 0;
}

//Calcula el tamaño en bytes del fichero
int get_file_size(ifstream& f){
    f.seekg(0, std::ios_base::end);
    size_t size = f.tellg();
    f.seekg(0, std::ios_base::beg);

    return size;
}
```

En este archivo se definen las funciones mencionadas en el .h, es la base del programa y por esa razón voy a detenerme más en él para explicarlo lo mejor posible.

Empecemos por ocultar:

```cpp
    int ocultar(unsigned char buffer[],int tamImage, char archivo[]){

    ifstream f(archivo);

    if (f) {

        strcpy(archivo,basename(archivo));
        buffer[0] = 0xff;

        int fin_cabecera = strlen(archivo) * 8 +1;
        buffer[fin_cabecera] = 0xff;

        write_bit_by_bit(buffer, f, 1, strlen(archivo), archivo, WRITE_FROM_ARRAY);

        int tamanio_en_bytes = get_file_size(f);
        int datos_fichero = fin_cabecera + 1;
        int ind = write_bit_by_bit(buffer, f, datos_fichero, tamanio_en_bytes, archivo, WRITE_FROM_FILE);

        char eof = 0x7f;
        char* fin_contenido = &eof;

        write_bit_by_bit(buffer, f, ind, 1, fin_contenido, WRITE_FROM_ARRAY);
    }
    return 0;
}
```

Comenzamos abriendo el nombre del archivo que se pasa como parámetro, si se lee con éxito, elimina la ruta del archivo para quedarse solo con el nombre `strcpy(archivo,basename(archivo));`.

Esta función ocultará tanto el nombre del archivo como el contenido, para diferenciarlos, marqué con un píxel en blanco **0xff** el punto en el que se empieza a ocultar el nombre del fichero, y una vez terminado se vuelve a marcar otro píxel en blanco. De esta forma entre estos dos píxeles se sabe que se encuentra el nombre del archivo.

Es el momento de explicar cómo se oculta la información. Como dije, las imágenes PGM y PPM representan el valor de los píxeles con **unsigned char** (1 byte), que da un rango de valores del 0 al 255, (0 negro, 255 blanco). Supongamos que queremos ocultar el caracter **H** (01001000 en binario). Se necesitan 8 píxeles para almacenar este caracter ya que cada bit del caracter **H** se guardará en el último bit de cada píxel (el menos significativo).

Por ejemplo, si hay 8 píxeles negros (`11111111, 11111111, 11111111, 11111111, 11111111, 11111111, 11111111, 11111111`), tras ocultar el caracter **H** quedará (`11111110, 11111111, 11111110, 11111110, 11111111, 11111110, 11111110, 11111110`).

Como solo varía el color del píxel en un bit, no se aprecia el cambio.

Sabiendo esto, se calcula donde terminará la cabecera que contendrá el nombre del fichero con `strlen(archivo) * 8 +1` (Como cada caracter necesita 8 bytes para ser almacenado, multiplicamos por 8 la longitud del nombre del fichero para conocer cuantos píxeles necesita)

La función `write_bit_by_bit()` desempeña el nucleo del programa, la cual conseguí optimizar bastante preguntando por stackoverflow (Enlace abajo en las referencias).

El bucle for de esta función itera sobre los píxeles de la imagen y almacena la información a ocultar. Usando una máscara ((0x80)<sub>16</sub> -> (10000000)<sub>2</sub>) extraemos el bit más significativo del caracter a ocultar y se guarda en una variable (Desplazandolo en número de bits correspondientes). Veamoslo mejor con un ejemplo, de nuevo con el caracter **H**:

```cpp
for (int k = 7; k >= 0; k--){
    char c = (letra & mask) >> k;
    mask >>= 1;

    buffer[indice] &= 0xfe; //hacemos 0 último bit con máscara 11111110
    buffer[indice++] ^= c;
}
```

Esto es lo que pasa en la primera iteración en la variable c (suponiendo que letra='H'):
`char c = (01001000 & 10000000) >> 7`. La operación lógica entre paréntesis extrae el bit más significativo (el primero), en este caso 0, y se desplaza 7 posiciones a la derecha (en este caso no tiene sentido), finalmente se almacena en `c` un cero.

Pero veamos otra iteración más: `char c = (01001000 & 01000000) >> 6`. En cada iteración la máscara se desplaza un bit para obtener el siguiente valor de la letra, en este caso el segundo bit. La operación entre paréntesis es `01000000`, y se desplaza 6 posiciones para terminar almacenando en `c` el correspondiente valor del bit, 1 en este caso.

Por último, para guardar el valor de `c` en el bit menos significativo del píxel, aplicamos otra máscara al píxel para hacer cero dicho bit (`(0xfe)<sub>16</sub> -> (11111110)<sub>2</sub>`) y se guarda el valor de `c` con otra operación lógica (`píxel XOR c`).

La función `write_bit_by_bit()` actua de forma distinta según el valor de un parámetro. Si se pasa la constante `WRITE_FROM_FILE`, ocultará en la imagen los datos de un fichero (el contenido), por el contrario, si se pasa `WRITE_FROM_ARRAY` ocultará el nombre del fichero.

Para terminar con la función `ocultar()`, es necesario escribir algún valor que actue a modo de EOF (End Of File), y así saber cuando parar de descifrar los datos ocultos a la hora de revelarlos. He usado el valor (0x7f<sub>16</sub>) para tal fin. Este valor se almacena en la imagen de la misma forma que el resto de datos, por lo que necesita 8 píxeles.

Expliquemos ahora cómo se revelan los datos:

```cpp
    int revelar(unsigned char buffer[], int tamImage, char sms[], int tamSMS){

    int indice_sms            = 0;
    char value            = 0;

    unsigned char* ptr;
    int in = 1;
    ptr = buffer;

    //Me posiciono en la pos siguiete del nombre del archivo, donde empieza el contenido del mismo.
    while(ptr[in++] != 0xff);
    ptr = 0;

    int i = 1;
    while (i != in-1){
        for (int k = 8; k > 0; k--)
            value = value << 1 | (buffer[i++] & 0x01); //vamos almacenando en value los 8 bits
        sms[indice_sms++] = value;
        value = 0;
        if (indice_sms > tamSMS)
            return -1; //cadena de mayor tamaño que que la cadena donde almacenarlo
    }

    //Ahora en sms está el nombre del fichero, lo creamos:.
    ofstream f(sms);
    if (f) {
        //seguimos leyendo hasta que encontremos un byte a 0x7f, que indica el fin del archivo
        bool fin_datos = false;
        int indice = in;
        value = 0;
        for (int i = in; i < tamImage && !fin_datos; i++) {
            for (int k = 0; k < 8; k++)
                value = value << 1 | (buffer[indice++] & 0x01);
            if (value == 0x7f) {
                fin_datos = true;
                continue;
            }
            f.write(&value;, 1); //TODO, ir almacenanto en array y luego escribir a archivo
            value = 0;
        }
    }

    return 0;
}
```

Al estar delimitado por una cabecera el nombre del archivo, se usa un puntero para buscar en qué posición se encuentra el píxel blanco que determina el fin del nombre del fichero. Con un for se recorren los píxeles entre dicha cabecera para extraer el nombre y escribirlo con `ofstream` al disco duro. El proceso de extracción de los bits es similar a ocultar, usando máscaras.

Para detectar cuando acaba el contenido del archivo, en el segundo for se comprueba si el caracter extraido es igual a `0x7f` (valor que ocultamos al final de la función anterior).

Es el momento de ver un ejemplo:

Se va a ocultar el archivo llamado `Nombre_fichero`, cuyo contenido es:

```bash
$ cat Nombre_fichero
Contenido del fichero
```

`ocultar` espera dos parámetros, la imagen de entrada y el nombre de la imagen con el archivo oculto:

```bash
$ ./ocultar imagenEntrada.pgm imagenSalida
Nombre_fichero
Ocultando...Se ha ocultado correctamente el archivo Nombre_fichero en imagenSalida.pgm

$ ls
doc  imagenEntrada.pgm  imagenes  imagenSalida.pgm  include  Makefile  Nombre_fichero  obj  ocultar  README.md  revelar  src
```

En la imagen de salida se pueden apreciar los dos píxeles blancos que contienen el nombre del archivo:

<figure>
    <img sizes="(min-width: 416px) 416px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/09/Screenshot-from-2012-09-13-1902101.png" alt="" title="Screenshot from 2012-09-13 19:02:10" width="416px" height="469px"></img>
</figure>

Para revelar la información, usamos el programa para tal propósito, que espera un único parámetro, la imagen con los datos ocultos:

```bash
$ ./revelar imagenSalida.pgm
Descifrado el archivo: Nombre_fichero en la imagen imagenSalida.pgm

$ ls
doc  imagenEntrada.pgm  imagenes  imagenSalida.pgm  include  Makefile  Nombre_fichero  obj  ocultar  README.md  revelar  src
```

Como indica, ha descifrado un fichero de nombre **Nombre_fichero**, con el comando `ls` vemos efectivamente que ha creado el fichero, y su contenido es:

```bash
$ cat Nombre_fichero
Contenido del fichero
```

Este programa no tiene un uso útil, meramente acadámico, el proyecto es accesible en su repositorio en gitHub.

# Referencias:

- <a href="https://github.com/elbaulp/Hide-file-in-Photo" target="_blank">Repositorio en GitHub</a>
- <a href="http://stackoverflow.com/questions/12042950/substitute-an-instruction-depending-on-a-condition" target="_blank">Pregunta en StackOverflow</a>
