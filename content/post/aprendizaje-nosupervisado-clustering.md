+++
author = "alex"
title = "Aprendizaje no Supervisado y Detección de Anomalías: ¿Qué es el Clustering?"
date = "2018-03-05T10:56:17+01:00"
lastmod = "2018-03-06T12:39:12+01:00"
categories = ["datascience"]
mainclass = "datascience"
image = "clustering-similar-posts-sklearn-python.jpg"
tags = ["clustering", "aprendizaje no supervisado"]
description = "En qué consiste el clustering o agrupamiento en Aprendizaje Automático, tipos de clustering y medidas de calidad para evaluar los resultados de los algoritmos "
math = true
+++

> Este articulo forma parte de una serie de artículos sobre clustering, detección de anomalías y reglas de asociación. Originalmente forman parte de un trabajo para el __Máster Universitario Oficial en Ciencia de Datos e Ingeniería de Computadores__ de la Universidad de Granada en la asignatura _Aprendizaje no supervisado y detección de anomalías_. El resto de artículos son:

- Detección de anomalías (Próximamente)
- Reglas de Asociación (Próximamente)
- Reglas de Asociación Avanzadas (Próximamente)

El aprendizaje automático se distingue en dos tipos. **Supervisado**, donde se dispone de información sobre la clase a la que pertenece una instancia o **no supervisado**, donde esta información no está disponible. Estos apuntes se centran en el último tipo. En la figura \ref{fig:classTree} se muestra un árbol de tipos de clasificaciones.

<figure>
        <a href="/img/classTree.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/classTree.png"
            alt="Árbol de tipos de clasificaciones"
            title="Árbol de tipos de clasificaciones"
            sizes="(min-width: 910px) 910px, 100vw"
            width="910"
            height="715">
          </amp-img>
        </a>
        <figcaption>Árbol de tipos de clasificaciones</figcaption>
</figure>

# Clustering<a id="sec-1" name="sec-1"></a>

*Clustering* intenta encontrar patrones en los datos que formen grupos claramente separados. Encontrar estos grupos tiene varias aplicaciones. Por ejemplo si los datos tratan sobre clientes, cada grupo encontrado podría usarse para realizar una segmentación de clientes en marketing, y ofrecer así distintos productos a cada grupo. Otra posible aplicación es agrupar documentos por temática, donde cada *cluster* o grupo pertenece a un tipo de documento. En este tipo de aplicaciones *clustering* se usa como aplicación final, sin embargo puede usarse como paso previo a otras técnicas de aprendizaje. Algunos ejemplos son exploración de datos y preprocesamiento de datos.

Uno de los problemas del *clustering* es su subjetividad. En la Figura de abajo aparece un conjunto de datos, pero bajo este mismo conjunto se pueden hacer agrupamientos diferentes.

<figure>
        <a href="/img/clustering-agrupamientos.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/clustering-agrupamientos.png"
            alt="Agrupar es subjetivo. Créd. Prof. Juan Carlos Cubero"
            title="Agrupar es subjetivo. Créd. Prof. Juan Carlos Cubero"
            sizes="(min-width: 1034px) 1034px, 100vw"
            width="1034"
            height="628">
          </amp-img>
        </a>
        <figcaption>Agrupar es subjetivo. Créd. Prof. Juan Carlos Cubero</figcaption>
</figure>

<!--more--><!--ad-->

## Medidas de similitud<a id="sec-1-1" name="sec-1-1"></a>

Una solución al problema descrito en la sección anterior es definir una buena medida de similitud. Para ello es necesario usar únicamente los atributos adecuados, no es necesario usar todos los atributos para calcular la similitud de una instancia frente a otra. También es importante tener en cuenta las magnitudes de cada atributo como paso previo a calcular la similitud, y por tanto es necesario normalizar. Principalmente hay dos formas de normalizar un conjunto de datos para atributos continuos. El método *Min-Max* y *z-score*. Estas normalizaciones se deben llevar a cabo para cada atributo del conjunto de datos. Es recomendable eliminar cualquier **outlier**, ya que puede afectar mucho al proceso de normalización. De los dos anteriores, es recomendable usar *z-score*, ya que preserva el rango de los datos.

Para crear medidas de similitud se consideran la semejanzas o distancias. A mayor valor de semejanza, más se parecen los dos puntos en comparación, sin embargo, a mayor distancia, menor parecido. Es común usar medidas de distancia para descubrir cómo de semejantes son dos puntos. Toda medida de distancia debe cumplir una serie de propiedades, listadas a continuación.

-   No negativa: \(d(x,y) \geq 0\)
-   Reflexiva: \(d(x,y) = 0\text{ sii } x = y\)
-   Simétrica: \(d(x,y) = d(y,x)\)
-   Desigualdad triangular: \(d(x,y) \leq d(x,z) + d(z,y)\)

La desigualdad triangular puede comprenderse mejor visualmente en la figura \ref{fig:triangle}. Es decir, la suma de dos de los lados del triángulo siempre va a ser mayor o igual a la del lado restante. Como muestra la figura, conforme menos área tiene el triángulo, más cercana es la suma de dos lados al lado restante.

<figure>
        <a href="/img/triangle.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/triangle.png"
            alt="Desigualdad triangular explicada visualmente. Créd. Wikipedia"
            title="Desigualdad triangular explicada visualmente. Créd. Wikipedia"
            sizes="(min-width: 497px) 497px, 100vw"
            width="497"
            height="480">
          </amp-img>
        </a>
        <figcaption>Desigualdad triangular explicada visualmente. Créd. Wikipedia</figcaption>
</figure>

### Medidas de distancia<a id="sec-1-1-1" name="sec-1-1-1"></a>

Las principales medidas de distancia son:

- *Euclídea* o \(L_2\): \(d_2(x,y) = \sqrt{\sum_{j=1}^J(x_j - y_j)^2}\)
- *Manhattan* o \(L_1\): \(d_1(x,y) = \sum_{j=1}^J|x_j - y_j|\)
- *Chebyshev* o \(L_{\infty}\): \(d_\infty = \text{máx}_{j\dots J}|x_j - y_j|\)
- *Minkowski* o Lr-norm: \(d_p(x,y) = \left ( \sum_{j=1}^J|x_j - y_j|^p\right )^\frac{1}{p}, p \geq 1\)

La distancia Euclídea es la línea recta entre dos puntos. En la distancia Manhattan la distancia entre dos puntos es la suma en valor absoluto de las diferencias de sus coordenadas cartesianas. La Figura \ref{fig:maneu} muestra cómo pueden existir varios caminos a dos puntos usando Manhattan, pero solo uno y el más corto por Euclídea.

<figure>
        <a href="/img/maneu.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/maneu.png"
            alt="Distancias Manhattan y Euclidea. Las líneas roja, azul y amarilla tienen distancia Manhattan 12, la menor posible. La verde tiene distancia Euclídea 8.49. *Créd. [Wikipedia]"
            title="Distancias Manhattan y Euclidea. Las líneas roja, azul y amarilla tienen distancia Manhattan 12, la menor posible. La verde tiene distancia Euclídea 8.49. *Créd. [Wikipedia]"
            sizes="(min-width: 480px) 480px, 100vw"
            width="480"
            height="480">
          </amp-img>
        </a>
        <figcaption>Distancias Manhattan y Euclidea. Las líneas roja, azul y amarilla tienen distancia Manhattan 12, la menor posible. La verde tiene distancia Euclídea 8.49. *Créd. [Wikipedia]</figcaption>
</figure>

La distancia de Minkowski es una generalización de las dos anteriores

En la distancia de Chebyshev la distancia entre dos puntos es la mayor de sus diferencias a lo largo de cualquiera de sus dimensiones coordenadas. También conocida como la distancia del tablero de ajedrez, por coincidir con el número de movimientos que puede hacer el rey para moverse por el tablero, como muestra la figura \ref{fig:chess}.

<figure>
        <a href="/img/chess.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/chess.png"
            alt="Distancia de Chebyshev. *Créd. Wikipedia*"
            title="Distancia de Chebyshev. *Créd. Wikipedia*"
            sizes="(min-width: 647px) 647px, 100vw"
            width="647"
            height="651">
          </amp-img>
        </a>
        <figcaption>Distancia de Chebyshev. *Créd. Wikipedia*</figcaption>
</figure>

Por último la distancia de Minkowski es una generalización de las anteriores. Cuando \(p = 1\) corresponde con la distancia de Manhattan, para \(p = 2\) distancia Euclídea, y cuando \(p \to \infty\) corresponde con la distancia de Chebyshev. En la figura \ref{fig:Minkowski} aparecen distintas distancias para varios valores de \(p\), en esta imagen se aprecia la distancia Manhattan para \(p=1\), Euclídea para \(p=2\) y Chebyshev para \(p=\infty\).

<figure>
        <a href="/img/minkos.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/minkos.png"
            alt="Distintos valores de \(p\) para la distancia de Minkowski. *Créd. Wikipedia*"
            title="Distintos valores de \(p\) para la distancia de Minkowski. *Créd. Wikipedia*"
            sizes="(min-width: 1387px) 1387px, 100vw"
            width="1387"
            height="300">
          </amp-img>
        </a>
        <figcaption>Distintos valores de \(p\) para la distancia de Minkowski. *Créd. Wikipedia*</figcaption>
</figure>

## Tipos de Clustering<a id="sec-1-2" name="sec-1-2"></a>

Dentro de la clasificación no supervisada se distinguen principalmente los siguientes tipos de *clustering*:

-   **Agrupamiento por particiones**: Una simple división del conjunto de datos en sub conjuntos disjuntos (No solapados) de tal forma que cada punto del conjunto pertenece a uno de dichos subconjuntos (o *clusters*). La figura \ref{fig:clustPart} es un ejemplo de este tipo de agrupamiento.
    -   **Basados en densidad**: En este tipo de *clustering* un *cluster* es una región densa de objetos rodeados por una región de baja densidad. Suele usarse cuando hay ruido y *outliers* presentes en los datos.
    -   **Basados en Grafos**: Los datos se representan como un gráfo, los nodos son los puntos y los enlaces representan una conexión entre ambos. Un grupo de objetos conectados los unos con los otros pero no conectados con el resto de puntos en el conjunto de datos forma un *cluster*. Para definir los grupos es necesario que cada objeto de un *cluster* esté más cerca de cualquier otro punto de su grupo que a un punto de otro *cluster*. Esta técnica tiene problemas en presencia de ruido u *outliers*.
    -   **Mínimo error cuadrático**: En este algoritmo se usa la minimización del error cuadrático para determinar a qué *cluster* pertenece el punto. Esta técnica la usa el algoritmo K-Medias.
-   **Jerárquico**: Si en el agrupamiento por particiones se permite que cada *cluster* tenga sub-clusters se obtiene un *clustering* jerárquico. Consiste en permitir que los *clusters* puedan anidarse, organizado en forma de árbol. Cada nodo del árbol, un *cluster* en este caso a exepción de los nodos hoja, forman la unión de sus hijos (los *sub-clusters*). La raíz del árbol es el *cluster* conteniendo a todos los datos. Los nodos hoja suelen corresponder con un único dato, pero no es obligatorio. La figura \ref{fig:clustHie} muestra un ejemplo de este tipo de *clustering*. La figura \ref{fig:clustHie}(d) es un ejemplo de *clustering* jerárquico, el nodo raíz contendría todos los puntos, el nodo a la izquierda está formado por un *cluster* de tres *sub-clusters*. Los métodos jerárquicos se clasifican en **aglomerativos** o **divisivos**. El primero considera cada punto un *cluster* y en cada paso fusiona los pares más cercanos como un *cluster*. Esta técnica requiere de una forma de medir la proximidad entre dos *clusters*. El segundo comienza con todos los datos como un solo *cluster* y subdivide hasta quedarse con puntos individuales como *clusters*. Las técnicas aglomerativas son las más usadas, por esta razón se explican a continuación los distintos métodos. La figura \ref{fig:clustHieAgg} los ilustra.
    -   **Enlace Simple**: La proximidad entre dos *clusters* viene dada por la distancia entre los dos puntos más cercanos de cada *cluster*.
    -   **Enlace Completo**: Análogo al anterior, pero usa la distancia de los dos puntos más lejanos de cada *cluster.*
    -   **Enlace Ponderado**: Usa las distancias pares a pares de todos los puntos en cada *cluster*.
    -   **Método de Ward**: Mide la proximidad entre dos *clusters* usando el incremento del error cuadrático medio producido al unir dos *clusters*.

<figure>
        <a href="/img/clustHieAgg.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/clustHieAgg.png"
            alt="Tipos de medidas de proximidad para clustering aglomerativo"
            title="Tipos de medidas de proximidad para clustering aglomerativo"
            sizes="(min-width: 1181px) 1181px, 100vw"
            width="1181"
            height="238">
          </amp-img>
        </a>
        <figcaption>Tipos de medidas de proximidad para clustering aglomerativo</figcaption>
</figure>

<figure>
        <a href="/img/clustPart.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/clustPart.png"
            alt="Agrupamiento por particiones. Cred. Transparencias de clase."
            title="Agrupamiento por particiones. Cred. Transparencias de clase."
            sizes="(min-width: 1022px) 1022px, 100vw"
            width="1022"
            height="142">
          </amp-img>
        </a>
        <figcaption>Agrupamiento por particiones. Cred. Transparencias de clase.</figcaption>
</figure>

<figure>
        <a href="/img/clustHie.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/clustHie.png"
            alt="Distintos tipos de clustering para los mismos datos"
            title="Distintos tipos de clustering para los mismos datos"
            sizes="(min-width: 843px) 843px, 100vw"
            width="843"
            height="419">
          </amp-img>
        </a>
        <figcaption>Distintos tipos de clustering para los mismos datos</figcaption>
</figure>

## Algoritmos de *clustering*<a id="sec-1-3" name="sec-1-3"></a>

### K-Means<a id="sec-1-3-1" name="sec-1-3-1"></a>

K-Means es un un algoritmo de *clustering* por particiones. Tiene un parámetro de entrada, `k`, indicando el número de *clusters* a generar, por tanto es necesario conocer a priori el número de grupos a encontrar. Cada *cluster* está representado por su centroide (centro geométrico del *cluster*). Los centroides pueden ser puntos reales o no, en caso de ser un punto real del conjunto de datos se denominan menoides.  En cada iteración del algoritmo dichos centroides se recalculan hasta llegar a un criterio de parada. La figura \ref{fig:kmeansEx} muestra ejemplos de varias iteraciones de K-Means, en él se ilustra el proceso de actualización de los centroides.


<figure>
        <a href="/img/kmeansEx.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/kmeansEx.png"
            alt="Ejemplo ejecución de k-means"
            title="Ejemplo ejecución de k-means"
            sizes="(min-width: 1120px) 1120px, 100vw"
            width="1120"
            height="411">
          </amp-img>
        </a>
        <figcaption>Ejemplo ejecución de k-means</figcaption>
</figure>

#### **Descripción del algoritmo**<a id="sec-1-3-1-1" name="sec-1-3-1-1"></a>

K-Means se compone de dos fases principales:

El proceso de inicialización consta de dos pasos. Primeramente se escoge el número de centroides (k) y se asignan aleatoriamente, como muestra la figura \ref{fig:kmeansEx}(a). Una vez colocados los a cada punto se le asigna su correspondiente *cluster* usando la media como medida de proximidad. Posteriormente se  recalculan los centroides con los puntos asignados y se actualizan.

El proceso iterativo actualiza los centroides en cada iteración mientras los centroides cambien. En cada iteración se calcula la distancia de todos los puntos a los k centroides, formando k grupos y asignando a cada punto su centroide más cercano.

#### **Asignación de clusters a los puntos**<a id="sec-1-3-1-2" name="sec-1-3-1-2"></a>

Para asignar a un punto el *cluster* más cercano es necesario usar una medida de proximidad, la más común es la distancia Euclídea (\(L_2\)), aunque no es la única y la elección depende del tipo de datos. Al re-calcular los centroides de cada *cluster* se optimiza una **función objetivo**, por ejemplo minimizar la distancias al cuadrado de cada punto a su *cluster* más cercano, como muestra la siguiente ecuación:
\[SSE = \sum^K_{i=1}\sum_{\textbf{x}\in C_i} dist \left ( c_i, x \right )^2\]
donde \(C_i\) es el i-ésimo *cluster*, \(c_i\) es el centróide del *cluster* \(C_i\) y \(\textbf{x}\) es un punto y \(dist\) es la distancia.

Con esta función objetivo, se calcula el error de cada punto, es decir, su distancia euclídea al *cluster* más cercano, luego se calcula la suma total de los errores al cuadrado. Con este dato, y dados dos conjuntos de *clusters* distintos generados por el algoritmo, K-Means escoge aquel con menor error cuadrático.

Dada esta función objetivo, lo ideal es resolver el problema de optimización y encontrar el óptimo global, sin embargo es computacionalmente imposible de realizar. Por ello se realizan aproximaciones, como **gradiente descendente**. Esta técnica consiste en escoger una solución inicial y repetir estos dos pasos: Calcular el cambio en la solución que mejor optimizar la función objetivo (Mediante derivadas) y actualizar la solución.

#### **Elección de los centroides iniciales**<a id="sec-1-3-1-3" name="sec-1-3-1-3"></a>

Elegir los centroides iniciales al azar usualmente no da buenos resultados, ya que el SSE variará notablemente en función de qué centroides iniciales se escojan. Una posible solución consiste en lanzar el algoritmo varias veces con distintos centroides iniciales y escoger los mejores, pero el problema sigue existiendo debido a la naturaleza aleatoria de este proceso. Otra alternativa es estimar seleccionar el primero punto de forma aleatoria, o calcular el centroide usando todos los puntos. Posteriormente, para cada centroide inicial, seleccionar el punto más alejado de cualquiera de los centroides iniciales ya seleccionados. De esta forma está garantizado elegir un conjunto de centroides iniciales aleatorios y separados entre sí.

#### **Elección del k óptimo**<a id="sec-1-3-1-4" name="sec-1-3-1-4"></a>

No hay ninguna forma de obtener el `k` óptimo salvo prueba y error. Sin embargo, se pueden usar algunas técnicas que suelen dar buenos resultados. Un ejemplo de ello es la técnica del codo. Se lanza el algoritmo para varios `k` y se genera un gráfico de cada `k` junto a su error. Un buen `k` debería ser el que se corresponda con un [codo](https://elbauldelprogramador.com/mostar-articulos-relacionados-blog/ "Mostrar artículos similares usando Clustering con sklearn") en el gráfico. La figura \ref{fig:kmeansElbow} muestra un ejemplo.

<figure>
        <a href="/img/kmeansElbow.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/kmeansElbow.png"
            alt="Método del codo para elección de k"
            title="Método del codo para elección de k"
            sizes="(min-width: 1039px) 1039px, 100vw"
            width="1039"
            height="510">
          </amp-img>
        </a>
        <figcaption>Método del codo para elección de k</figcaption>
</figure>

#### **Problemas de K-Means**<a id="sec-1-3-1-5" name="sec-1-3-1-5"></a>

Los principales problemas de este algoritmo son los *outliers*, ya que alteran las media de la distancia bastante. Una posible solución es usar la mediana como medida de proximidad en lugar de la media, en dicho caso es necesario usar la distancia de Manhattan. Una posible solución es eliminar dichos *outliers*, pero dependiendo del tipo de datos esto puede ser otro problema en sí mismo. Otra forma es usar menoides en lugar de centroides. Al usar un dato existente como centroide se minimiza el error introducido por los *outliers*.

Cuando se tratan datos no numéricos, es posible usar k-modes. Esta variación del algoritmo escoge como centroide el valor de moda en el conjunto. El punto fuerte de esta técnica es que es muy robusto a *outliers*.

#### **Pre y Post procesamiento requerido**<a id="sec-1-3-1-6" name="sec-1-3-1-6"></a>

Debido a que K-Means usa distancias, es necesario normalizar los datos para que todas contribuyan en igual medida, de lo contrario los atributos con mayores magnitudes tienen a dominar las decisiones del algoritmo.

En cuanto al post procesamiento, es posible eliminar *clusters* demasiado pequeños, y tratarlos como *clusters outliers*, dividir *clusters* con un elevado SSE en varios o combinar aquellos con un SSE bajo.

### DBSCAN<a id="sec-1-3-2" name="sec-1-3-2"></a>

Este algoritmo es de la familia jerárquica del *clustering*, concretamente **basado en densidad**. Su principal característica es detectar regiones de puntos densas separadas de otras regiones poco densas. Al contrario que K-Means, detecta automáticamente el número de *clusters*. Debido a que las regiones poco densas son descartadas, no produce un *clustering* completo, es decir, habrá puntos sin clasificar.

DBSCAN está basado en una aproximación basada en el centro. Consiste en medir la densidad como el número de puntos que caen dentro de un radio especificado. El radio por tanto, es un parámetro del algoritmo que se debe ajustar. Una vez definido el radio, un punto puede caer en el interior de una región densa, en el borde o completamente fuera. A estos puntos se les llama puntos *core*, *border* o *noise*, respectivamente ( en español Principales, frontera o ruido). La figura \ref{fig:dbscanPoints} muestra un ejemplo de cada uno de ellos.
-   **Core Points**: Corresponden a los puntos dentro de la región densa. Para ser un punto *core* debe haber un número mínimo de puntos definidos como parámetro en su vecindario, que viene dado por el radio.
-   **Border Points**: Aunque no es un *core point*, cae en el entorno de un *core point*.
-   **Noise Points**: Un punto que no es ni *core* ni *border*.

<figure>
        <a href="/img/dbscanPoints.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/dbscanPoints.png"
            alt="Tipos de puntos en DBSCAN"
            title="Tipos de puntos en DBSCAN"
            sizes="(min-width: 990px) 990px, 100vw"
            width="990"
            height="770">
          </amp-img>
        </a>
        <figcaption>Tipos de puntos en DBSCAN</figcaption>
</figure>

#### **Descipción del algoritmo**.<a id="sec-1-3-2-1" name="sec-1-3-2-1"></a>

Para cualquier par de puntos *core* lo suficientemente cercanos entre sí &#x2013; dentro de un radio definido &#x2013; se colocan en el mismo *cluster*. Análogamente, cualquier punto *border* cercano a un *core* se asigna al mismo *cluster* del *core*. Los puntos de ruido, se descartan, por ello se indicó en el párrafo anterior que DBSCAN no es un *clustering* completo.

#### **Selección de parámetros**.<a id="sec-1-3-2-2" name="sec-1-3-2-2"></a>

DBSCAN necesita de dos parámetros antes de ser ejecutado, *MinPts* y *Eps*, definiendo el número mínimo de puntos necesarios para considerar a un punto como *core* y el radio, respectivamente. Lo más usual es observar cómo evoluciona la distancia de un punto a sus k-ésismos vecinos más cercanos (k-distancia). Para los puntos que forman parte de un *cluster*, el valor k-distancia será pequeño si *k* no es mayor que el tamaño del *cluster*. Para los puntos que no pertenecen al *cluster*, la k-distancia será elevada. Por tanto, de forma visual es posible determinar el valor del parámetro *Eps*, como muestra la figura \ref{fig:dbscanEps}, y tomando el valor de `k` como *MinPts*.

<figure>
        <a href="/img/dbscanEps.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/dbscanEps.png"
            alt="Elección de Eps y MinPts"
            title="Elección de Eps y MinPts"
            sizes="(min-width: 453px) 453px, 100vw"
            width="453"
            height="364">
          </amp-img>
        </a>
        <figcaption>Elección de Eps y MinPts</figcaption>
</figure>

#### **Pros y Contras de DBSCAN**.<a id="sec-1-3-2-3" name="sec-1-3-2-3"></a>

Que DBSCAN al use una aproximación basada en densidad le proporciona resistencia al ruido y es capaz de trabajar con *clusters* de tamaños y formas arbitrarias, por tanto puede encontrar *clusters* que K-Means no podría. Sin embargo, DBSCAN encuentra dificultades al trabajar con *clusters* de distintas densidades. De igual manera, no funciona bien cuando los datos son de gran dimensionalidad, ya que medir la densidad en espacios de gran dimensión es difícil.

## Evaluación de resultados<a id="sec-1-4" name="sec-1-4"></a>

Para la evaluación del resultado de un *clustering* es necesario tener en cuenta varios aspectos, entre ellos:
1.  Determinar la **tendencia del *clustering***, es decir, distinguir si realmente existe una estructura no aleatoria en los datos.
2.  Determinar el número correcto de *clusters*.
3.  Evaluar si realmente el resultado del *clustering* corresponde con los patrones de los datos, sin referenciar a información externa (**Criterios internos**).
4.  Comparar los resultados del *clustering* usando información externa, como etiquetas de las clases (**criterios externos**).
5.  Comprar dos conjuntos de *clusters* y determinar cual es mejor.

Debido a que las técnicas 1,2 y 3 no usan información externa, son técnicas **no supervisadas**, la cuarta sin embargo necesita información externa, y por tanto es **supervisada**. La quita puede considerarse un híbrido, ya que puede realizarse de forma supervisada o no supervisada.

Las **técnicas no supervisadas** tratan me medir si la estructura del *clustering* es adecuada sin información externa. Un ejemplo de ello es mediante el uso de SSE. Usando esta medida es posible definir la **cohesión** del *cluster*, la cual determina cómo están de juntos los puntos del *cluster* así como la **separación**, que mide cómo de separado está un *cluster* con respecto a otro. Para realizar estas mediciones pueden usarse o no los centroides, como muestra la figura \ref{fig:clustEvalUns}

<figure>
        <a href="/img/clustEvalUns.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/clustEvalUns.png"
            alt="Formas de medir la cohesión y separación. *Créd. J.C Cubero*"
            title="Formas de medir la cohesión y separación. *Créd. J.C Cubero*"
            sizes="(min-width: 993px) 993px, 100vw"
            width="993"
            height="603">
          </amp-img>
        </a>
        <figcaption>Formas de medir la cohesión y separación. *Créd. J.C Cubero*</figcaption>
</figure>

En cuanto a las **técnicas supervisadas**, usando información externa, como por ejemplo datos etiquetados, mide hasta qué punto el *clustering* consiguió descubrir la estructura de los datos. Un ejemplo de este tipo de técnica es la **entropía**, la cual mide cómo de bien coinciden las etiquetas de los *clusters* con unos datos etiquetados previamente.

Por último, comparar dos conjuntos de *clusterings* puede hacerse de forma supervisada o no supervisada. Por ejemplo, lanzar dos veces K-Means y compararlos usando SSE o entropía.

# Erratas

- Gracias a [@josealberto4444](https://gitlab.com/josealberto4444 "Enlace al gitlab de JoseAlberto4444") por resaltar que faltaba la propiedad de no negatividad en las distancias.

# Bibliografía <a id="sec-5" name="sec-5"></a>

- [Cap 8. Introduction to Data Mining 1st edition by Tan, Pang-Ning, Steinbach, Michael, Kumar, Vipin](http://amzn.to/2F04PCT)
- [Data Mining, Southeast Asia Edition: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)](http://amzn.to/2sYPCAl)
- <https://en.wikipedia.org/wiki/Minkowski_distance>
- <https://en.wikipedia.org/wiki/Euclidean_distance>
- <https://en.wikipedia.org/wiki/Taxicab_geometry>
- <https://en.wikipedia.org/wiki/Chebyshev_distance>
- Apuntes de clase _Aprendizaje no supervisado y detección de anomalías_ del **Máster universitario en Ciencia de Datos e Ingeniería de Computadores de la Universidad de Granada***
