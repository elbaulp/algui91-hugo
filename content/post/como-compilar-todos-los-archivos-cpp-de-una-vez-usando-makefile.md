---
author: alex
categories:
- c
- how to
color: '#E64A19'
date: '2016-01-01'
layout: post.amp
mainclass: dev
permalink: /como-compilar-todos-los-archivos-cpp-de-una-vez-usando-makefile/
tags:
- compilar ficheros cpp makefile
- crear makefile
- tutorial makefile
title: "C\xF3mo compilar todos los archivos CPP de una vez usando MakeFile"
---

Los makefile sirven para automatizar el proceso de compilación de un proyecto estableciendo unas reglas que dictan cómo y en qué orden han de crearse los ficheros objetos, librerías y binarios.

La creación de un fichero MakeFile puede llegar a ser compleja conforme va incrementando el tamaño del proyecto. En este artículo vamos a ver cómo se pueden compilar con una sola regla todos los archivos cpp del proyecto.

<!--more--><!--ad-->

Se irá mostrando línea a línea el fichero MakeFile para ir explicándolo y luego se mostrará todo:

```make
BIN       = bin
SRC 	  = src
OBJ 	  = obj
CXX 	  = g++
CPPFLAGS  = -Wall -g -ansi

```

Con esto se establecen los nombres de los directorios correspondientes en la carpeta del proyecto. Nota: los directorios deben estar creados previamente.

```make
SOURCES = $(wildcard $(SRC)/*.cpp)
OBJS = $(addprefix $(OBJ)/, $(notdir $(SOURCES:.cpp=.o)))

```

Con esto almacenamos en la variable `SOURCES` todos los ficheros cpp que residan en el directorio *src*. En la variable `OBJS` se hacen varias cosas, `$(SOURCES:.cpp=.o)` reemplaza la extensión de los ficheros `.cpp` por `.o`, `$(notdir $(SOURCES:.cpp=.o))` elimina cualquier ruta que existiera para dejar únicamente el nombre del fichero, por ejemplo */src/fichero.cpp* pasaría a ser *fichero.cpp*. Con `$(addprefix $(OBJ)/` añadimos el prefijo indicado, en este caso *obj* al nombre del fichero, siguiendo con el ejemplo anterior, de *fichero.o* obtendríamos *obj/fichero.o*.

```make
target = programa
all: $(BIN)/$(target)

$(BIN)/$(target): $(OBJS)
  @echo Creando $@... con $^
  $(CXX) $(CPPFLAGS) $(OBJS) -o $@

```

Ésta regla define cómo compilar el programa final, para generar dicho programa dependemos de los ficheros objeto guardados en la variable `$(OBJS)`, *$@* contiene el nombre del destino (target), en este caso *bin/programa*.

```make
$(OBJ)/%.o: %.cpp
  @echo Creando $@... con $^
  $(CXX) $(CPPFLAGS) -c $< -o $@

```

Con esta regla se crean los ficheros objeto necesarios para la regla anterior. La regla crea objetos a partir de sus correspondientes cpps, de ahí `%.o : %.cpp`.

El makefile completo es el siguiente:

```make
BIN       = bin
SRC 	  = src
OBJ 	  = obj
CXX 	  = g++
CPPFLAGS  = -Wall -g -ansi
CFLAGS    = -Wall -O3 -c
SOURCES = $(wildcard *.cpp)
OBJS = $(addprefix $(OBJ)/, $(notdir $(SOURCES:.cpp=.o)))

target = programa

all: $(BIN)/$(target)

$(BIN)/$(target): $(OBJS)
  @echo Creando $@... con $^
  $(CXX) $(CPPFLAGS) $(OBJS) -o $@

$(OBJ)/%.o: %.cpp
  @echo Creando $@... con $^
  $(CXX) $(CPPFLAGS) -c $< -o $@

# ************ Limpieza ************
.PHONY: clean
clean :
  @echo Limpiando archivos intermedios...
  rm $(OBJ)/*
  rm $(SRC)/*.*~

```

La parte de limpieza simplemente elimina los ficheros generados automáticamente en el proceso de compilación.

#### Referencias

*Compile all CPP files using makefile under MinGW* »» <a href="http://stackoverflow.com/a/13109884/1612432" target="_blank">stackoverflow.com</a>
*Manual GNU Make* »» <a href="https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html" target="_blank">gnu.org</a>