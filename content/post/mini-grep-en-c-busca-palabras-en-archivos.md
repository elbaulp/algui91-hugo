---
author: alex
categories:
- aplicaciones
- c
- opensource
date: '2016-01-01'
lastmod: 2017-07-08T08:12:04+01:00
mainclass: dev
url: /mini-grep-en-c-busca-palabras-en-archivos/
tags:
- comandos
- cpp
- grep
title: Mini grep en C++, busca palabras en archivos
---

Aquí os dejo un pequeño ejercício en C++, se trata de crear un programa que actue básicamente como el comando grep de linux, pero mucho más simple. Se usa de la siguiente forma:

Para buscar una palabra:

```bash
grep palabra fichero1 < [ficheros2...]>
```

Para buscar frases:

```bash
grep "palabra1 palabra2..." fichero1 < [ficheros2...]>
```

Un ejemplo de ejecución:

```bash
hkr-> ./grep cout max.php grep.cpp smtp.cpp
grep.cpp(22)     cout << "Uso: grep <palabra a buscar"> <firchero1><ficheros...>]>" << endl;
grep.cpp(56)     cout << nombre << "(" << nlinea << ") t" << remove_left_white_spaces(cadena) << endl;
smtp.cpp(56)     cout << "socket created";
smtp.cpp(75)     cout << "Connectedn";
```

El programa nos indica el fichero en el que se encontró la palabra, el número de línea y la linea en sí.

Código:

```cpp
//============================================================================
// Name        : grep.cpp
// Author      : Alex
// Version     :
// Description : Mini Grep
//============================================================================

#include <iostream>
#include <string>
#include <fstream>

using namespace std;

char* remove_left_white_spaces(char*);
void grep(const char*, const char*);

int
main(int argc, char* argv[])
{
      if (argc < 3){
         cout << "Uso: grep <palabra a buscar> <firchero1><ficheros...>]>" << endl;
         return -1;
      } else {
         for (int i = 2; i < argc; i++)
            grep(argv[1], argv[i]);
      }
}

char*
remove_left_white_spaces(char cad[])
{
   char* temp = new char[500];

   int indice = 0;

   for (unsigned int i = 0; cad[i] ; i++)
       if (cad[i] != ' ' || cad[i+1] != ' ')
         temp[indice++] = cad[i];

   return temp;
}

void
grep(const char* palabra, const char* nombre)
{
   ifstream fichero(nombre);
   char cadena[500];
   int nlinea = 0;

   if (fichero){
      while(fichero){
         fichero.getline(cadena, 500);
         nlinea++;
         if (fichero)
            if (strstr(cadena, palabra))
               cout << nombre << "(" << nlinea << ") t" << remove_left_white_spaces(cadena) << endl;
      }
```
