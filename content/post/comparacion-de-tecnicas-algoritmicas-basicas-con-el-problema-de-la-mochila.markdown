---
author: marta
categories:
- dev
date: 2015-07-08 11:40:40
lastmod: 2017-03-27T16:57:12+01:00
description: "Este art\xEDculo se basa en las pr\xE1cticas que he hecho para una asignatura  llamada *Algor\xEDtmica*. Dichas pr\xE1cticas consist\xEDan en realizar el problema  de la Mochila usando las t\xE9cnicas algor\xEDtmicas que ve\xEDamos en la asignatura."
image: "Comparaci\xF3n de t\xE9cnicas algor\xEDtmicas b\xE1sicas con el problema de  la Mochila.png"
mainclass: dev
math: true
tags:
- mochila
- "algor\xEDtmica"
- "t\xE9cnicas algor\xEDtmicas"
- problema de la mochila
- greedy
- voraces
- Branch and bound
- "programaci\xF3n din\xE1mica"
title: "Comparaci\xF3n de t\xE9cnicas algor\xEDtmicas b\xE1sicas con el problema de  la Mochila"
---

<figure>
    <amp-img sizes="(min-width: 600px) 600px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Comparación de técnicas algorítmicas básicas con el problema de la Mochila.png" title="Comparaci\xF3n de t\xE9cnicas algor\xEDtmicas b\xE1sicas con el problema de  la Mochila" alt="Comparaci\xF3n de t\xE9cnicas algor\xEDtmicas b\xE1sicas con el problema de  la Mochila" width="600px" height="520px" />
    <figcaption>Créditos de la imagen Wikipedia</figcaption>
</figure>

Este artículo se basa en las prácticas que he hecho para una asignatura llamada *Algorítmica*. Dichas prácticas consistían en realizar el problema de la Mochila usando las técnicas algorítmicas que veíamos en la asignatura.

¿En qué consiste el problema de la mochila? Tenemos una mochila con una determinada capacidad y un conjunto de objetos para meter en la mochila. Cada objeto tiene asociado un peso y un beneficio. El problema consiste en llenar la mochila de tal forma que el beneficio obtenido sea el **máximo**.

<!--more--><!--ad-->

Las distintas técnicas algorítmicas que hemos usado para implementar este problema han sido:

# Algoritmos voraces

Los algoritmos voraces son la idea más intuitiva y fácil de implementar: tenemos una colección de objetos candidatos a solución, unas determinadas condiciones que debe cumplir la solución y un conjunto de objetos solución, que es un subconjunto de la primera colección de objetos. El ejemplo que me dieron en clase fue el siguiente: vamos al súper a comprar 2kg de patatas. Vamos cogiendo patatas que nos gusten y las vamos echando a la bolsa hasta llegar a los 2 kg. Con este tipo de algoritmos no examinamos toda la colección de objetos candidatos, por eso son bastante rápidos. El inconveniente que tienen es que tampoco nos dan la solución óptima, aunque dan aproximaciones bastante buenas.

En el caso del problema de la mochila, se implementaría de la siguiente forma:

1. Ordenamos nuestro conjunto de objetos candidatos (una lista de objetos con un peso y un beneficio) de mayor cociente $$\frac{beneficio}{peso}$$ al menor.
2. Vamos cogiendo objetos hasta llenar la mochila.
3. Ahora tenemos dos opciones: si el siguiente objeto ya no cabe completo en la mochila podemos quedarnos con una fracción de él (obteniendo un beneficio igual a $$(pesototal - pesoactual)/pesoobjeto$$) o no meter ningún objeto más en la mochila. La primera opción se la conoce como _mochila fraccional_ y la segunda, como _mochila 0/1_.

```cpp
list<float> Mochila (int lim_peso, list<Objeto> & objetos) {
    list<float> sol;
    int peso_actual = 0;
    list<Objeto>::iterator it;

    for (it=objetos.begin(); it!=objetos.end() && lim_peso > peso_actual; ++it) {
        if ((peso_actual + (*it).peso) <= lim_peso) {
            sol.push_back(1);
            peso_actual += (*it).peso;
        }

        else {
            sol.push_back((lim_peso-peso_actual)/((*it).peso));
            peso_actual = lim_peso;
        }
    }

    while (it != objetos.end()){
        sol.push_back(0);
        ++it;
    }

    return sol;
}
```

Así obtenemos una lista donde especificamos qué fracción de cada objeto de nuestra lista inicial hemos tomado para la solución.

# Programación dinámica

La programación dinámica es, por decirlo de una forma intuitiva, una manera iterativa de implementar algoritmos recursivos. Además tiene una ventaja sobre la recursividad: no repetimos operaciones ya hechas, sino que todos los cálculos que hacemos, los vamos guardando en una tabla y así nos ahorramos un montón de operaciones (piensa en el árbol recursivo que sale al implementar Fibonacci de manera recursiva).

En el problema de la mochila, la ecuación recursiva que deberíamos seguir sería la siguiente:

\\[
\text{Mochila(k,m) =}
\begin{cases}
0 & \text{si } k = 0 \text{ ó } m = 0,\newline
-\infty & \text{si } k<0 \text{ ó } m<0\newline
max\{Mochila(k-1,m), b_k + Mochila(k-1,m-p_k)\}
\end{cases}
\\]

Es decir, el caso base sería o bien no tener ningún objeto ($$k = 0$$) o que el peso de nuestra mochila sea 0 ($$m = 0$$). El caso general sería quedarnos con lo que más beneficio nos dé: o coger el objeto ($$Mochila (k-1, m-p_k)$$) o no cogerlo ($$Mochila(k-1, m)$$).

Con esta función rellenamos la tabla de beneficios, pero no sabemos qué objetos cogemos y cuáles no.

```cpp
vector<vector<unsigned> > Mochila(vector<Elemento> & elems, unsigned m) {
    unsigned i = 0, j = 0;
    vector<vector<unsigned> > V(elems.size()+1);
    // inicializamos los casos base
    for (i=0; i<=elems.size(); i++) {
        V.at(i).resize(m+1);
        V.at(i).at(0) = 0;
    }

    for (j=0; j<=m; j++)
        V.at(0).at(j) = 0;

    // rellenamos la tabla
    for (i=1; i<=elems.size(); i++) {
        for (j=1; j<=m; j++) {
            // el objeto no cabe en la mochila
            int aux = j-elems[i-1].peso;
            if (aux < 0)
                V.at(i).at(j) = V.at(i-1).at(j);
            else {
                unsigned ben = elems.at(i-1).beneficio+(V.at(i-1).at(j-elems[i-1].peso));
                V.at(i).at(j) = Max(V.at(i-1).at(j), ben);
            }
        }
    }

    return V;
}
```

Para saber qué objetos cogemos y cuáles no, usamos la siguiente función:

```cpp
vector<unsigned> Solucion (vector<vector<unsigned> > & mochila, vector<Elemento> & elems) {
    vector<unsigned> sol(elems.size());

    int j = mochila.at(0).size()-1;
    for (int i=mochila.size()-1; i>0; i--) {
        if (mochila.at(i).at(j) == mochila.at(i-1).at(j))
            sol.at(i-1) = 0;
        else { // if (mochila.at(i).at(j) == mochila.at(i-1).at(j.elems[i-1].peso))+elems[i-1].beneficio)
            sol.at(i-1) = 1;
            j -= elems[i-1].peso;
        }
    }

    return sol;
}
```

# Branch & Bound

Los algoritmos Branch & Bound, a partir de un árbol de soluciones, funcionan de la siguiente manera: a partir de una cota inferior (que determina lo mínimo que podemos encontrar si vamos por esa rama del árbol) y una cota superior (que determina lo máximo que podemos encontrar en esa rama) van podando (según estemos maximizando o minimizando) ramas de manera que, cuanta más precisión tengamos estimando cotas, menos nodos del árbol exploraremos.

En el problema de la mochila, para estimar las cotas podemos hacer lo siguiente:

1. Para hacer la cota superior, usamos un algoritmo voraz fraccional + la suma de los beneficios de los objetos que hemos seleccionado hasta el momento
2. Para hacer la cota inferior, lo mismo pero con un algoritmo voraz 0/1.

Así, la función para explorar el árbol sería la siguiente:

```cpp
vector<bool> Mochila(list<Elemento> & elementos, unsigned m) {
    Nodo inic = NodoInicial(elementos, m);
    int C = inic.CI;
    priority_queue<Nodo> LNV;
    LNV.push(inic);
    int s = numeric_limits<int>::min();
    vector<bool> resultado;

    while (!LNV.empty()) {
        Nodo x = LNV.top();
        LNV.pop();
        if (x.CS >= C) {
            for (unsigned k = 0; k < 2; k++) {
                bool elec = (k==0) ? false : true;
                Nodo y = Generar(x, elec, elementos, m);
                if (y.nivel == elementos.size()-1 && y.valor_actual > s) {
                    s = y.valor_actual;
                    C = (C >= s) ? C : s;
                    resultado = y.tupla;
                }

                else if (y.nivel < elementos.size()-1 && y.CS >= C) {
                    C = (C >= y.CI) ? C : y.CI;
                    LNV.push(y);
                }
            }
        }
    }

    return resultado;
}
```

Como véis, no generamos todo el árbol, sino que vamos generando nodos sobre la marcha según vamos explorando. La función para generar un nodo es:

```cpp
Nodo Generar (Nodo & nodo_actual, bool eleccion, list<Elemento> & objs, double m) {
    Nodo res = Nodo(0, 0, nodo_actual.nivel+1, 0, 0, nodo_actual.tupla);

    // cogemos el objeto que estamos considerando
    list<Elemento>::iterator obj_it = objs.begin();
    for (int k=0; k<res.nivel; k++) ++obj_it;

    // generamos una lista con los objetos restantes que procesara el greedy
    list<Elemento> aux; list<Elemento>::iterator ax = obj_it;
    ++ax;
    for (list<Elemento>::iterator a = ax; a != objs.end(); ++a) {
        aux.push_back(*a);
    }

    res.tupla.at(res.nivel) = eleccion;

    if (!eleccion) {
        res.valor_actual = nodo_actual.valor_actual;
        res.peso_actual = nodo_actual.peso_actual;
    }

    else /*if (eleccion)*/ {
        res.valor_actual = nodo_actual.valor_actual + (*obj_it).beneficio;
        res.peso_actual = nodo_actual.peso_actual + (*obj_it).peso;
    }

    res.CI = res.valor_actual + Greedy01((m - res.peso_actual), aux);
    res.CS = res.valor_actual + GreedyFraccional((m - res.peso_actual), aux);


    if (res.peso_actual > m) {
        res.CI = numeric_limits<int>::min();
        res.CS = numeric_limits<int>::min();
        res.valor_actual = numeric_limits<int>::min();
    }

    return res;
}
```

La solución de nuestro programa sería la tupla del último nodo que exploremos.

## Ejemplos de ejecución con cada algoritmo

Tras ver por encima en qué consiste cada algoritmo, vamos a pasar a ejecutar cada uno con un mismo ejemplo y ver las diferencias en tiempos de ejecución y en el resultado obtenido.

El ejemplo a usar será el siguiente: Tenemos una mochila con una capacidad de 11 kg y los siguientes objetos:

* Un objeto con peso 6 y beneficio 3
* Un objeto con peso 4 y beneficio 2
* Un objeto con peso 3 y beneficio 7
* Un objeto con peso 2 y beneficio 4

## Solución con Algoritmos Voraces

La salida que obtenemos en terminal es la siguiente:

```bash
[marta@marta-PC BaulP]$ ./mochila_voraz 7 3 4 2 2 4 3 6 11
La proporcion de cada uno que cogemos es:
Peso: 3 Beneficio: 7(2.33333) -> 1
Peso: 2 Beneficio: 4(2) -> 1
Peso: 4 Beneficio: 2(0.5) -> 1
Peso: 6 Beneficio: 3(0.5) -> 0.333333
El beneficio total es, por tanto 14
Tiempo: 8e-06
```

Este resultado tiene un pequeño problema, tenemos dos objetos con la misma proporción $$\frac{beneficio}{peso}$$ por lo tanto se queda con el primero que entramos por terminal (el objeto con beneficio 2 y peso 4), pero sin embargo, obtendríamos mayor beneficio si usásemos el objeto con beneficio 3 y peso 6.

# Solución con Programación dinámica.

La salida obtenida en terminal es la siguiente:

```bash

[marta@marta-PC BaulP]$ ./mochila_din 7 3 4 2 2 4 3 6 11
   0    1       2       3       4       5       6       7       8       9       10      11
----------------------------------------------------------------------------------------------
0| 0    0       0       0       0       0       0       0       0       0       0       0
1| 0    0       0       7       7       7       7       7       7       7       7       7
2| 0    0       4       7       7       11      11      11      11      11      11      11
3| 0    0       4       7       7       11      11      11      11      13      13      13
4| 0    0       4       7       7       11      11      11      11      13      13      14
Los objetos utilizados son:
Usamos el objeto Peso: 3        Beneficio: 7
Usamos el objeto Peso: 2        Beneficio: 4
NO usamos el objeto Peso: 4     Beneficio: 2
Usamos el objeto Peso: 6        Beneficio: 3
Tiempo: 3e-06
```

La tabla obtenida debemos interpretarla de la siguiente forma:

* Las filas representan los objetos que tenemos
* Las columnas, pesos de la mochila

Así, por ejemplo, si nos fijamos en la posición de la tabla fila 3, columna 4 tendremos un beneficio de 7. Esta solución sólo tiene en cuenta que tenemos una mochila con peso 3 y que sólo tenemos los 2 primeros objetos que insertamos por terminal. Así, la tabla va creciendo añadiendo cada vez más peso y más objetos hasta llegar a la esquina inferior derecha (en este caso fila 5 y columna 12) donde tendremos el beneficio total obtenido con el peso que le hemos dado a la mochila y teniendo en cuenta todos los objetos.

Como vemos en la tabla obtenemos "el mismo" beneficio que con algoritmos voraces, pero en realidad, no es así, ya que con algoritmos voraces cogemos una pequeña parte del objeto con beneficio 3 y peso 6 cuando en realidad eso nunca se hace (imagina que pides una guitarra y te traen un día las cuerdas, otro día el mástil y así...).

Por tanto, con programación dinámica hemos afinado bastante la solución obtenida con algoritmos voraces, hasta el punto de llegar a tener la solución óptima.

# Solución con Branch & Bound

La salida obtenida por terminal es la siguiente:

```bash

[marta@marta-PC BaulP]$ ./mochila_bb 7 3 4 2 2 4 3 6 11
Peso de la mochila: 11
Los objetos utilizados son:
Usamos el objetoBeneficio = 7   Peso = 3
Usamos el objetoBeneficio = 4   Peso = 2
Usamos el objetoBeneficio = 3   Peso = 6
Tiempo: 2.7e-05

```

De nuevo hemos obtenido la solución óptima al problema. En esta versión, el tiempo es un poco mayor a las demás, pero éste siempre dependerá de cómo establezcamos las cotas y del número de nodos del árbol que exploremos.

Los tiempos de ejecución obtenidos no son comparables del todo, pues hemos usado un ejemplo con muy pocos objetos y además, sólo hemos hecho una ejecución, por lo que alguno de los tiempos podría haberse visto afectado por una interrupción del sistema operativo.

# Conclusión

Estas técnicas algorítmicas clásicas nos sirven para encontrar la solución al problema de la mochila en un tiempo razonable. Aunque en el caso del algoritmo voraz, en este problema (dependiendo de los objetos de entrada) nos da una solución aproximada u óptima. Branch & Bound y Programación Dinámica nos aseguran la solución óptima pero tienen sus pros y sus contras:

* La programación dinámica, al usar una matriz para guardar los valores que va calculando, está limitada por el tamaño de la memoria de nuestro ordenador
* En Branch & Bound, si no definimos una buena estrategia de cotas y de poda, exploraremos muchísimos nodos y el tiempo de ejecución se nos subirá por las nubes.
