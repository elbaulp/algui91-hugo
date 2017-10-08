---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-08T19:09:29+01:00
description: "Cuando estaba en el primer curso de la facultad, hicimos una práctica  en la asignatura Fundamentos de la Programación que consistía en resolver  un laberinto almacenado en un fichero. Me gustó bastante hacer ese programa y  lo comparto en el blog para los curiosos que quieran ver cómo funciona."
image: 2013/11/cpp.png
url: /resolver-laberintos-en-c/
tags:
- c
title: Resolver laberintos en C++
---

<figure>
    <a href="/img/2013/11/cpp.png"><amp-img sizes="(min-width: 128px) 128px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/11/cpp.png" title="Resolver laberintos en C++" alt="Resolver laberintos en C++" width="128px" height="128px" /></a>
</figure>

Cuando estaba en el primer curso de la facultad, hicimos una práctica en la asignatura Fundamentos de la Programación que consistía en resolver un laberinto almacenado en un fichero. Me gustó bastante hacer ese programa y lo comparto en el blog para los curiosos que quieran ver cómo funciona.

<!--more--><!--ad-->

# Formato del laberinto en el fichero

Los ficheros que almacenan el laberinto tienen el siguiente formato:

```bash
7 7
ppppppp
pellllp
plplppp
plplllp
plplppp
pllllsp
ppppppp

```

Donde:

  * Los dos primeros números representan el tamaño del laberinto, en este caso 7&#215;7.
  * p representa una pared.
  * l representa una celda libre, por la que se puede pasar.
  * e representa la entrada al laberinto.
  * s representa la salida.

# Programa principal

Dado esto, es posible implementar un programa que lea el fichero, cree una matriz representando el laberinto e intente resolverlo. Esto se podría hacer con:

```cpp
#include <iostream>
#include <vector>

#include "Laberinto.h"

using namespace std;

int main()
{
    unsigned int FIL, COL;
    cin >> FIL >> COL;

    Laberinto lab('+',' ','#',FIL,COL);
    lab.printLab();
    lab.resolverLaberinto();
    lab.printLabResuelto();
    return 0;
}

```

# Ejemplo de uso

La clase *Laberinto* la veremos en breve. Básicamente, se lee el fichero, almacenando el tamaño que tiene y se construye un laberinto de dicho tamaño y cambiando la representación del laberinto, es decir `Laberinto lab('+',' ','#',FIL,COL);` crea un laberinto de tamaño *FILxCOL*, cuya representación será un *#* para el camino que conduce a la salida, + para las paredes y un espacio en blanco para las celdas libres. La siguiente línea imprime el laberinto sin resolver, quedando así:

```bash
./bin/laberinto < labs/lab_peque.txt
+++++++
+e    +
+ + +++
+ +   +
+ + +++
+    s+
+++++++

```

Las dos siguientes líneas resuelven e imprimen el laberinto con el camino hacia la salida:

```cpp
LABERINTO RESUELTO:
+++++++
+e##  +
+ +#+++
+ +#  +
+ +#+++
+  ##s+
+++++++

```

En caso de que el laberinto no tenga solución se informa de ello:

```bash
./bin/laberinto < labs/lab_sinsolucion.txt
+++++++
+e  +s+
+++++++
El laberinto no tiene salida

```

# Clase Laberinto

La definición del Laberinto es la siguiente:

```cpp
#include <vector>

class Laberinto{

private:
    std::vector<std::vector<int> > path;
    std::vector<std::vector<char> > laberinto;
    char shapeP,
         shapeL,
         shapeC;

    void addPathToLab(unsigned int,unsigned int);
    std::vector<int> findEnter() const;
    void cargarLaberinto(unsigned int,unsigned int);

public:
    Laberinto(char p, char l, char c, int x, int y){
        setShapeC(c);
        setShapeP(p);
        setShapeL(l);
        cargarLaberinto(x,y);
    }

    void resolverLaberinto();
    void printLab() const;
    void printLabResuelto() const;

    //Getters y setters
    void setShapeP(char p)    { (*this).shapeP = p; }
    void setShapeL(char l)    { (*this).shapeL = l; }
    void setShapeC(char c)    { (*this).shapeC = c; }

    char getShapeP() const    { return (*this).shapeP; }
    char getShapeL() const    { return (*this).shapeL; }
    char getShapeC() const    { return (*this).shapeC; }
};
```

En `path` se almacena el camino recorrido hasta el momento. Internamente, se crea una matriz de igual tamaño que el laberinto, pero *booleana* que irá llevando la cuenta de los lugares por los que ha pasado.

La implementación:

```cpp
#include <iostream>

#include "Laberinto.h"

using namespace std;

void Laberinto::cargarLaberinto(unsigned int FIL,unsigned int COL){
    (*this).laberinto.assign(FIL,vector<char>(COL));
        for(unsigned int i=0; i < FIL; i++)
            for(unsigned int j=0; j < COL; j++){
                char car;
                cin >> car;
                if (car != 'e' && car != 's')
                   (*this).laberinto[i][j] = (car == 'p' ? getShapeP() : getShapeL());
                else
                    (*this).laberinto[i][j] = car;
            }
}

void Laberinto::printLab() const{
    for(unsigned int i=0; i < (*this).laberinto.size(); i++){
        for(unsigned int j=0; j < (*this).laberinto[i].size(); j++)
            cout << (*this).laberinto[i][j];
        cout << endl;
    }
}

void Laberinto::printLabResuelto() const{
    if(!(*this).path.empty()){
        //Añadir el camino al laberinto
        cout << "LABERINTO RESUELTO: "<< endl;
        printLab();
    }
    else
        cout << "El laberinto no tiene salida" << endl;
}


void Laberinto::resolverLaberinto(){

    vector<vector<bool> > recorrido((*this).laberinto.size(), vector<bool>((*this).laberinto[0].size(),false));


    (*this).path.push_back(findEnter());
    recorrido[path[0][0]][path[0][1]] = true;

    vector<int> ultimoPath;
    while(!(*this).path.empty() &&
          (*this).laberinto[(*this).path[(*this).path.size()-1][0]][(*this).path[(*this).path.size()-1][1]] != 's'){
        ultimoPath.clear();
        ultimoPath.push_back((*this).path[(*this).path.size()-1][0]);
        ultimoPath.push_back((*this).path[(*this).path.size()-1][1]);

        //Elemento a la izquierda de la ultima posicion de (*this).path
        if(((*this).laberinto[ultimoPath[0]][ultimoPath[1]-1] != getShapeP())
           && (!recorrido[ultimoPath[0]][ultimoPath[1]-1])){
            ultimoPath[1] = ultimoPath[1]-1;
            (*this).path.push_back(ultimoPath);
            recorrido[ultimoPath[0]][ultimoPath[1]] = true;
        }
        //Elemento a la derecha
        else if ((*this).laberinto[ultimoPath[0]][ultimoPath[1]+1] != getShapeP()
           && !recorrido[ultimoPath[0]][ultimoPath[1]+1]){
            ultimoPath[1] = ultimoPath[1]+1;
            (*this).path.push_back(ultimoPath);
            recorrido[ultimoPath[0]][ultimoPath[1]] = true;
        }
        //Elemento de arriba
        else if ((*this).laberinto[ultimoPath[0]-1][ultimoPath[1]] != getShapeP()
           && !recorrido[ultimoPath[0]-1][ultimoPath[1]]){
            ultimoPath[0] = ultimoPath[0]-1;
            (*this).path.push_back(ultimoPath);
            recorrido[ultimoPath[0]][ultimoPath[1]] = true;
        }//Elemento de abajo
        else if ((*this).laberinto[ultimoPath[0]+1][ultimoPath[1]] != getShapeP()
           && !recorrido[ultimoPath[0]+1][ultimoPath[1]]){
            ultimoPath[0] = ultimoPath[0]+1;
            (*this).path.push_back(ultimoPath);
            recorrido[ultimoPath[0]][ultimoPath[1]] = true;
        }else
            (*this).path.pop_back();
    }

    if(!(*this).path.empty()){
        //Añadir el camino al laberinto
        for(unsigned int i=0; i < (*this).laberinto.size(); i++)
            for(unsigned int j=0; j < (*this).laberinto[i].size(); j++)
                addPathToLab(i,j);
    }
}

vector<int> Laberinto::findEnter() const{
    //Buscamos la entrada
    bool encontrada = false;
    vector<int> pos;
    for(unsigned int i=0; i < (*this).laberinto.size() && !encontrada; i++)
        for(unsigned int j=0; j < (*this).laberinto[i].size() && !encontrada; j++)
            if((*this).laberinto[i][j] == 'e'){
                pos.push_back(i);
                pos.push_back(j);
                encontrada = true;
            }
    return pos;
}

void Laberinto::addPathToLab(unsigned int i, unsigned int j){
    for (unsigned int k=0; k < (*this).path.size(); k++)
        if((*this).path[k][0] == i && (*this).path[k][1] == j
           && (*this).laberinto[i][j] != 'e' && (*this).laberinto[i][j] != 's')
            (*this).laberinto[i][j] = getShapeC();
}
```

# Más ejemplos

```latex
./bin/laberinto < labs/laberinto1.txt
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+e  +     +       +               +     +               +             +   +   + +
+ +++ + +++ +++ +++ +++++++++++ +++ +++ + +++ +++++++++ + +++++ +++++ + + + + + +
+     + +     + +   + +       +       + + +   +     +   + +     +   + + +   +   +
+++++++ + +++++ + +++ + +++++ +++++++++ + + +++ +++ +++ +++ +++++ + + + +++++++ +
+       + + +   +   + + +   + +         + +   + + +   +   +       + +   + +     +
+ +++++++ + + +++++ + + +++ + + +++++++ + +++ + + +++ +++ +++++++++ +++++ + +++++
+       + + +       + +   +     + +     + + +       + + +   +   +   +     + +   +
+ +++++ + + +++++++++ +++ +++++++ + +++++ + +++++++++ + +++ + + + +++ + + + + + +
+     + + +         +   +   + +   + +   + +     +   + +   +   + +   + + + + + + +
+++++ + + + +++ +++ +++ +++ + + + + +++ + + + +++ + + + +++++++ +++ + + +++ +++ +
+ +   +   + + + +       +   + + + +     + + +   + +   + +   +   +   + +   +     +
+ + +++++++ + + +++++++++ +++ + + +++++ + +++++ + +++++ + + + +++ +++ +++ +++++ +
+ + +         + +         +     +     + +     + +   + +   +   +   + +   +       +
+ + + +++++++++ + +++++++ +++++++ + +++ +++++ + +++ + + +++++++++ + +++ +++++++++
+ + +   +   +   + +       +     + +       +   +   + + +   +       +     +     + +
+ + +++++ + + + + +++++++++ +++ +++++++++ + +++ +++ + +++ +++ +++++ +++++ +++ + +
+   +     + + + +         +   + +       + +   +   + +         +   +     +   + + +
+ +++ +++++ + + +++++++++ +++ + + +++++ +++++ +++ + +++++++++++ + +++++ +++ + + +
+     +       +         +     +       +           +         +   +           +  s+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
LABERINTO RESUELTO:
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+e  +###  +#####  +#############  +#####+###############+      #######+###+###+ +
+#+++#+#+++#+++#+++#+++++++++++#+++#+++#+#+++ +++++++++#+ +++++#+++++#+#+#+#+#+ +
+#####+#+###  +#+###+ +#######+#####  +#+#+   +     +  #+ +#####+###+#+#+###+###+
+++++++#+#+++++#+#+++ +#+++++#+++++++++#+#+ +++ +++ +++#+++#+++++#+#+#+#+++++++#+
+#######+#+ +###+###+ +#+   +#+#########+#+   + + +   +###+#######+#+###+ +#####+
+#+++++++#+ +#+++++#+ +#+++ +#+#+++++++ +#+++ + + +++ +++#+++++++++#+++++ +#+++++
+#######+#+ +#######+ +###+  ###+ +     +#+ +       + + +###+###+###+###  +#+   +
+ +++++#+#+ +++++++++ +++#+++++++ + +++++#+ +++++++++ + +++#+#+#+#+++#+#+ +#+ + +
+     +#+#+         +   +###+ +   + +   +#+     +   + +   +###+#+###+#+#+ +#+ + +
+++++ +#+#+ +++ +++ +++ +++#+ + + + +++ +#+ + +++ + + + +++++++#+++#+#+#+++#+++ +
+ +   +###+ + + +       +###+ + + +     +#+ +   + +   + +###+###+###+#+###+#####+
+ + +++++++ + + +++++++++#+++ + + +++++ +#+++++ + +++++ +#+#+#+++#+++#+++#+++++#+
+ + +         + +#########+     +     + +#####+ +   + +###+###+  #+ +###+#######+
+ + + +++++++++ +#+++++++ +++++++ + +++ +++++#+ +++ + +#+++++++++#+ +++#+++++++++
+ + +   +   +   +#+       +#####+ +       +###+   + + +###+  #####+#####+#####+ +
+ + +++++ + + + +#+++++++++#+++#+++++++++ +#+++ +++ + +++#+++#+++++#+++++#+++#+ +
+   +     + + + +#########+###+#+#######+ +###+   + +    #####+   +#####+###+#+ +
+ +++ +++++ + + +++++++++#+++#+#+#+++++#+++++#+++ + +++++++++++ + +++++#+++#+#+ +
+     +       +         +#####+###    +#######    +         +   +      #####+##s+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


./bin/laberinto < labs/laberinto2.txt
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+e    +                     +       +   +           +           +             +     +               +
+ +++ +++++ +++++ +++++++++ + +++++ + + + +++ +++++++ + + +++++ +++++++ +++++++ +++ + +++++ +++++++ +
+   + +   +   +   +     +   +     + + +   + +         + + +   +   +     +       +   + +     +     + +
+++ + + + +++++ +++ +++ + +++++++++ + +++++ +++++++++++ +++ + +++ + +++ + +++++++ +++ + +++++ +++ + +
+   +   + +   +     + + +           + +           +     +   +   +   +   + +   + + + + +     +   + + +
+ +++++++ + + +++ +++ + +++++++++++ + + +++ +++++ + +++++ +++++ +++++ +++ + + + + + + +++++ +++ + + +
+     +   + +   + +   +           + + + +   +   + +       +     +   +   +   + + + +     +   +   + + +
+ +++ + +++ +++ + +++ +++++++ +++ +++ +++ +++ + +++++++++++ +++++ +++++ +++++ + + +++++++ +++ +++ + +
+ + + + +   + + +     + +   +   +   +   + +   +         + +   +       + +     + +     +   + +   + + +
+ + + + +++ + + +++++ + + + +++ +++ +++ + + +++++++ +++ + +++ +++++++ + + +++++ +++++ + +++ + + +++ +
+ + + + +   + +   +     + +   + +     + +   +   +   + +   + +   +     + + + +       +   +   + +     +
+ + + + + +++ +++ + +++++ +++ +++ +++ + +++++ + + +++ +++ + +++ + +++++ + + + +++++ +++++ + + +++++++
+ + + + +   +     + +   + +   +   +   +       + + +           + +   +   + +       +       + + +   + +
+ + + + +++ + +++++ + + + +++ + +++ +++++++++++ + +++++++++++++ + + + +++ +++++++++ +++++++ + + + + +
+   + +     +     + + + +   + +   +       +     + +   +         + + + + +         + +   +   +   +   +
+++ + +++++++++++ +++ + + + + + + +++++++++ +++++ + + + + +++++++++ + + +++++++++ + + + + + +++++++ +
+   + +   +           + + + + + +         +   +   + +   + + + +     + +         + + + +   + + +     +
+++++ + + + +++++++++++ +++ + +++++++++ + +++ + +++ +++++ + + + + +++ + +++ +++++ +++ +++++ + + +++++
+     + +   + +     + +     +   +     + +   + +   + +     + +   +     + +   +     +   +   + + +   + +
+ +++++ +++++ + +++ + +++++++++ + +++ +++++ + +++ + + +++++ +++++++ +++++ +++ +++++ +++ + + + +++ + +
+   +   +     +   + +       +     +       +       + + +   +       +       +   +     +   + +   +   + +
+ + + +++ +++ +++ + + +++ +++ +++++++++++ +++++++ + + + +++++++++ +++ +++++ +++++++ + + +++++ + +++ +
+ + +   + +   +   + +   + +   + +     +   +     + + +   +       +   + +     +   +   + +     + +   + +
+ + +++ +++ +++ +++ + + +++ +++ + +++ +++ + +++ +++ + +++ +++++ +++ +++ +++++ + + +++ +++++ + +++ + +
+ +   +     +   + + + +     +   + + +   +   +       + +   +   +   +     +     +   +       +     + + +
+ +++ +++++++ +++ + +++++++ +++ + + +++ +++++++++++++ + +++ +++ +++++++++++++ +++++ +++++++ +++++ + +
+   + +     + +   + +     +     + +   +   +         + + +     +     +         +   +   +   + +   + + +
+++ + + +++ + + + + + +++ +++++++ +++ +++ + +++++++ +++ +++++ +++++ + + +++++++ + +++++ + +++ + + + +
+   +     +     + +     +               +         +               +   +         +       +     +    s+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
LABERINTO RESUELTO:
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+e    +                     +       +   +           +           +             +     +               +
+#+++ +++++ +++++ +++++++++ + +++++ + + + +++ +++++++ + + +++++ +++++++ +++++++ +++ + +++++ +++++++ +
+###+ +   +   +   +     +   +     + + +   + +         + + +   +   +     +       +   + +     +     + +
+++#+ + + +++++ +++ +++ + +++++++++ + +++++ +++++++++++ +++ + +++ + +++ + +++++++ +++ + +++++ +++ + +
+###+   + +   +     + + +           + +           +     +   +   +   +   + +   + + + + +     +   + + +
+#+++++++ + + +++ +++ + +++++++++++ + + +++ +++++ + +++++ +++++ +++++ +++ + + + + + + +++++ +++ + + +
+#####+   + +   + +   +           + + + +   +   + +       +     +   +   +   + + + +     +   +   + + +
+ +++#+ +++ +++ + +++ +++++++ +++ +++ +++ +++ + +++++++++++ +++++ +++++ +++++ + + +++++++ +++ +++ + +
+ + +#+ +   + + +     + +   +   +   +   + +   +         + +   +       + +     + +     +   + +   + + +
+ + +#+ +++ + + +++++ + + + +++ +++ +++ + + +++++++ +++ + +++ +++++++ + + +++++ +++++ + +++ + + +++ +
+ + +#+ +   + +   +     + +   + +     + +   +   +   + +   + +   +     + + + +       +   +   + +     +
+ + +#+ + +++ +++ + +++++ +++ +++ +++ + +++++ + + +++ +++ + +++ + +++++ + + + +++++ +++++ + + +++++++
+ + +#+ +   +     + +   + +   +   +   +       + + +           + +   +   + +       +       + + +   + +
+ + +#+ +++ + +++++ + + + +++ + +++ +++++++++++ + +++++++++++++ + + + +++ +++++++++ +++++++ + + + + +
+   +#+     +     + + + +   + +   +       +     + +   +         + + + + +         + +   +   +   +   +
+++ +#+++++++++++ +++ + + + + + + +++++++++ +++++ + + + + +++++++++ + + +++++++++ + + + + + +++++++ +
+   +#+   +           + + + + + +         +   +   + +   + + + +     + +         + + + +   + + +     +
+++++#+ + + +++++++++++ +++ + +++++++++ + +++ + +++ +++++ + + + + +++ + +++ +++++ +++ +++++ + + +++++
+#####+ +   + +#####+ +     +   +     + +   + +   + +     + +   +     + +   +     +   +   + + +   + +
+#+++++ +++++ +#+++#+ +++++++++ + +++ +++++ + +++ + + +++++ +++++++ +++++ +++ +++++ +++ + + + +++ + +
+###+   +     +###+#+       +     +       +       + + +   +       +       +   +     +   + +   +   + +
+ +#+ +++ +++ +++#+#+ +++ +++ +++++++++++ +++++++ + + + +++++++++ +++ +++++ +++++++ + + +++++ + +++ +
+ +#+   + +   +###+#+   + +   + +#####+   +     + + +   +#######+   + +     +   +   + +     + +   + +
+ +#+++ +++ +++#+++#+ + +++ +++ +#+++#+++ + +++ +++ + +++#+++++#+++ +++ +++++ + + +++ +++++ + +++ + +
+ +###+     +###+ +#+ +     +   +#+ +###+   +       + +###+   +#  +     +     +   +       +     + + +
+ +++#+++++++#+++ +#+++++++ +++ +#+ +++#+++++++++++++ +#+++ +++#+++++++++++++ +++++ +++++++ +++++ + +
+   +#+#####+#+   +#+#####+     +#+   +###+#########+ +#+     +#####+###      +###+   +###+ +###+ + +
+++ +#+#+++#+#+ + +#+#+++#+++++++#+++ +++#+#+++++++#+++#+++++ +++++#+#+#+++++++#+#+++++#+#+++#+#+ + +
+   +###  +###  + +###  +#########      +###      +#####          +###+#########+#######+#####+####s+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


```

# Referencias

Asignatura fundamentos de la programación de la Universidad de Granada.
