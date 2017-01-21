---
author: alex
categories:
- algoritmos
- c
- inteligencia artificial
color: '#E64A19'
description: "Para hablar de este tipo de algoritmos, tengo que hacer una breve introducci\xF3n
  a lo que es un grafo y c\xF3mo se representa en un ordenador."
layout: post.amp
mainclass: dev
permalink: /algoritmos-de-caminos-cortos/
tags:
- algoritmo de dijkstra en c
- Algoritmo Dijkstra
- prim java algoritmo
title: Algoritmos de caminos cortos.
---

Para hablar de este tipo de algoritmos, tengo que hacer una breve introducción a lo que es un grafo y cómo se representa en un ordenador.

Un grafo en el ámbito de las ciencias de la computación es una estructura de datos, en concreto un tipo abstracto de datos (TDA), que consiste en un conjunto de nodos (también llamados vértices) y un conjunto de arcos (aristas) que establecen relaciones entre los nodos. El concepto de grafo TDA desciende directamente del concepto matemático de grafo.
Informalmente se define como G = (V, E), siendo los elementos de V los vértices, y los elementos de E, las aristas (edges en inglés). Formalmente, un grafo, G, se define como un par ordenado, G = (V, E), donde V es un conjunto finito y E es un conjunto que consta de dos elementos de V.

Existen diferentes implementaciones del tipo grafo: con una matriz de adyacencias (forma acotada) y con listas y multilistas de adyacencia (no acotadas).
Matriz de adyacencias: se asocia cada fila y cada columna a cada nodo del grafo, siendo los elementos de la matriz la relación entre los mismos, tomando los valores de 1 si existe la arista y 0 en caso contrario.

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/10/Matriz_de_adyacencia1.jpg" alt="" title="Matriz_de_adyacencia" width="546px" height="232px" />][1]

<!--more--><!--ad-->


&nbsp;

Una vez dicho esto, existen algoritmos que se dedican a buscar el camino mas corto en un espacio, entre dos puntos dado, el coger un camino u otro conlleva un valor de mas o menos alto, es decir no es lo mismo ir del nodo 1 al nodo 3 con un valor de 5 unidades(metros), que ir del nodo 1 pasando por el 2 y llegando al 3 teniendo 4 unidades(metros), es preferible coger el que tenga menos coste, para que sea el valor mas corto. Es decir que el problema consiste en encontrar un camino entre dos vértices (o nodos) de tal manera que la suma de los pesos de las aristas que lo constituyen es mínima. Un ejemplo es encontrar el camino más rápido para ir de una ciudad a otra en un mapa. En este caso, los vértices representan las ciudades, y las aristas las carreteras que las unen, cuya ponderación viene dada por el tiempo que se emplea en atravesarlas.

Para solucionar este problema, los tres algoritmos mas conocidos son:

  1. Algoritmos de Dijkstra
  2. Algoritmo de Prim
  3. El algoritmo A*

El **algoritmo de Dijkstra** consiste en ir explorando todos los caminos más cortos que parten del vértice origen y que llevan a todos los demás vértices; cuando se obtiene el camino más corto desde el vértice origen, al resto de vértices que componen el grafo, el algoritmo se detiene.

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/10/Caminosmascortos1.jpg" alt="" title="Caminosmascortos" width="744px" height="500px" />][2]

#### Algoritmo de Dijkstra

```cpp
#include <string.h>
#include <fstream>
#include "grafo_heap.h"
using namespace std;

grafo obtenerGrafo (char * nombre){
    int tam;                            //Tamaño del grafo (número de nodos)
    int peso;                       //El peso de cada nodo
   const int TOPE_LEC = 1000;   //Tamaño máximo que va a leer en cada linea.
   char vector_aux[TOPE_LEC];   //Vector que almacenará el contenido de cada linea.
//Contador de las lineas, puesto que la que nos interesa es la 4 y seguir hasta las 7
   int cont_line=0;
   char * c;            //Variable que almacenará el tamaño de la matriz de adyacencia.

   ifstream fichero;// Abro el fichero.
   fichero.open(nombre);
   if(!fichero){
       cerr << "Se ha producido un error al abrir el fichero: " << nombre;
       exit(1);
   }

//Recorro hasta quedarme en la linea 7 para
//despues leer directamente la matriz de adyacencia
   while (cont_line < 7){
       fichero.getline(vector_aux, TOPE_LEC);
       cont_line++;
       if (cont_line == 4){ //La linea 4 está la dimensión.
           c = strchr(vector_aux, ':')+1;
           tam = atoi(c);
       }
   }


   grafo G(tam);      //Creo el grafo con el tamaño.

    //Asigno los pesos dados por la matriz de adyacencia
   for (int i = 0; i < tam; i++)
       for (int j = 0; j < tam; j++){
           fichero >> peso;  G.asignar_peso(i,j,peso);
       }

   fichero.close();

   return G;
}


void dijkstra(grafo & G, vertice s){
    vertice u;
    vector<vertice> P(G.size(), -1);      //Vector de soluciones.
    vector<distancia> D(G.size(),INFINITO);  // Vector de distancias
    heap Q(G.size());
    D[s]=0; //La distancia hasta el mismo es cero.
    P[s] = s; //Su camino es el mismo.

    for (vertice i = 0 ; i < G.size() ; i++ )
 //Relleno el heap.
        Q.insert(D[i],i);

    //Para cada nodo actualizo su peso buscando y lo introduzco en el heap actualizado
    while (!Q.empty()) {
        u = Q.erase_min().second;
        // Para cada nodo adyacente al vertice actual
        for ( vertice v=G.begin_ady(u);  v !=G.end_ady(u);  v++) {
            if (D[v] > D[u] + G.devolver_peso(u,v)){
                D[v] = D[u] + G.devolver_peso(u,v);
                P[v] = u;
                Q.update_heap(D[v], v);
            }
        }
    }

    //Mostramos el vector D de distancia.
    cout << "El vector de distancias es:n";
    for (vertice i = 0 ; i < G.size() ; i++ )
        cout << D[i] << " - ";

    //Mostramos el vector P de distancia.
    cout << "nnEl vector de soluciones es:n";
    for (vertice i = 0 ; i < G.size() ; i++ )
        cout << P[i] << " - ";


}



int main(int argc,char** argv){

  grafo G(obtenerGrafo(argv[1]));

  vertice org=3;
  cout << "Tamaño del Grafo"  << G.size() << endl;
  cout << "Llamo a Dijkstra (origen) " << org <<  endl << endl << endl;
  dijkstra(G,org);

}

```

<p >
  Para probar este algoritmo necesita una entrada de datos un archivo para probarlo.
</p>

El ** algoritmo de Prim ** encuentra un subconjunto de aristas que forman un árbol con todos los vértices, donde el peso total de todas las aristas en el árbol es el mínimo posible. Si el grafo no es conexo, entonces el algoritmo encontrará el árbol recubridor mínimo para uno de los componentes conexos que forman dicho grafo no conexo.

Por último el **algoritmo A***evalúa los nodos combinando g(n), el coste para alcanzar el nodo, y h(n), el costo de ir al nodo objetivo:

<p >
  F(n)= g(n) + h(n)
</p>
<p >
  Ya que la g(n) nos da el coste del camino desde el nodo inicio al nodo n, y la h(n) el coste estimado del camino más barato desde n al objetivo, tenemos:
</p>
<p >
  F(n) = coste ms barato estimado de la solución a tráves de n.
</p>
<p >
  Así, si tratamos de encontrar la solución mas barata, es razonable intentar primero el nodo con el valor más bajo de g(n) + h(n). Resulta que esta estrategia es más que razonable: con tal de que la función heurística h(n) satisfaga ciertas condiciones, la búsqueda A* es tanto completa como óptima.
</p>



 [1]: https://elbauldelprogramador.com/img/2012/10/Matriz_de_adyacencia1.jpg
 [2]: https://elbauldelprogramador.com/img/2012/10/Caminosmascortos1.jpg


</distancia></vertice></fstream></string.h>
