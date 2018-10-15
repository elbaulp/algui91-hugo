+++
author = "alex"
title = "Aprendizaje no Supervisado y Detección de Anomalías: Reglas de Asociación"
date = "2018-03-21T12:15:14+01:00"
lastmod = "2018-04-03T12:50:20+02:00"
categories = ["datascience"]
mainclass = "datascience"
image = "rulesMaximals.jpg"
tags = ["aprendizaje no supervisado", "reglas de asociación"]
description = "En qué consisten las reglas de asociación en Aprendizaje Automático, tipos de reglas y medidas de calidad para evaluar los resultados de los algoritmos "
math = "true"
+++

> Este articulo forma parte de una serie de artículos sobre clustering, detección de anomalías y reglas de asociación. Originalmente forman parte de un trabajo para el __Máster Universitario Oficial en Ciencia de Datos e Ingeniería de Computadores__ de la Universidad de Granada en la asignatura _Aprendizaje no supervisado y detección de anomalías_. El resto de artículos son:

- [Clustering](https://elbauldelprogramador.com/aprendizaje-nosupervisado-clustering/)
- [Detección de Anomalias](https://elbauldelprogramador.com/aprendizaje-nosupervisado-anomalias/)
- [Reglas de Asociación Avanzadas](https://elbauldelprogramador.com/aprendizaje-nosupervisado-reglas-avanzadas/)

Las reglas de asociación se usan para aportar conocimiento que ayude a la toma de decisiones. Ejemplos en los que este tipo de métodos resulta útil es para conocer las tendencias de compra de los clientes. Otra aplicación es en tareas de predicción, como deducir los estudios de una persona en función de su salario. **Minería de textos** para asociar la presencia de términos en documentos etc.

Este tipo de modelos se usa cuando prima la interpretabilidad del modelo, y son modelos predictivos. Es habitual usarlo **conjuntos difusos**. A diferencia de los árboles, que parten el espacio, las **reglas cubren parte del espacio**, disponiendo de un grado de cubrimiento y un acierto. Disponer de un **grado de cubrimiento** significa que las regiones de decisión pueden **solaparse o dejar zonas sin cubrir**, de ahí que sean muy usadas en problemas difusos.

<!--more--><!--ad-->

# Definición<a id="sec-3-1" name="sec-3-1"></a>

Las reglas de asociación son una de las técnicas más usadas para extraer conocimiento a partir de bases de datos grandes. Identifican relaciones existentes entre los datos, llamados *items*. Se trata de una técnica de **aprendizaje no supervisado**. Una regla se define como \\(X \rightarrow Y\\), donde \\(X\\) e \\(Y\\) son conjuntos de *items* disjuntos \\(X\mathcal{\cap} Y = \emptyset\\). Un ejemplo: \\(\text{Pan} \rightarrow \text{Mantequilla}\\) Cuando se compra pan, se compra mantequilla.

En sus inicios, las reglas de asociación se aplicaron a datos de supermercados, ya que a estos les interesa saber qué productos suelen comprar los clientes, para ponerlos unos junto a otros y así reducir el tiempo de compra del cliente. En el caso de un supermercado, **los artículos** son los *items* y el conjunto de **cestas de la compra** son las transacciones. Cada transacción es un subconjunto de *items*, llamado *itemset*. Por ejemplo Leche y pan \\(\rightarrow\\) mantequilla.

Los pasos a seguir antes de aplicar reglas de asociación es determinar qué datos de la base da datos son los *items* y cuales las **transacciones**. Los *items* son los elementos a asociar, *pan, mantequilla, aceite&#x2026;* mientras que las transacciones son particularidades de la relación entre *items* (la lista de la compra concreta).

Los *items* pueden ser de varios tipos. Cuando cada registro es un listado de elementos, como en el caso de productos de la compra, no existen variables, un *item* se corresponde con un producto. Cuando existen variables con rangos, el *item* es un par (atributo, valor), por ejemplo una variable **puesto**, con valores *estudiante, jefe, trabajador* tendría como *items* (Puesto, estudiante), (Puesto, jefe) y (puesto, trabajador). Ejemplos de reglas usando *items* de este tipo son: (Salario, alto) \\(\rightarrow\\) (Estudios, Superiores). De la regla anterior se pueden deducir dos cosas: Todo el que tiene un salario alto tiene estudios superiores, o un salario alto implica estudios superiores.

# Medidas Clásicas: Soporte y Confianza<a id="sec-3-2" name="sec-3-2"></a>

El **soporte** de un *itemset* mide la frecuencia del *item* o *itemset* en la base de datos, es decir, la probabilidad de que el *itemset* X esté en el conjunto de transacciones (\\(p(X)\\)). El **soporte de una regla de asociación** (X \\(\rightarrow\\) Y ) es la frecuencia con la que ocurre el *itemset* \\(X \cup Y\\). Es decir, la probabilidad de que el *itemset* \\(X \cup Y\\) esté en el conjunto de transacciones (\\(p(X\wedge Y)\\)). La **confianza** define cómo de fiable es la regla, es decir, cómo de seguro está el modelo de que cuando se da \\(X\\) va a ocurrir \\(Y\\). Es útil comprobar la confianza en ambos sentidos de la regla, es decir, dado X \\(\rightarrow\\) Y comprobar tanto \\(Conf(X, Y)\\), como \\(Conf(Y, X)\\). Como regla general, una confianza superior al 80% es buena, aunque esto es subjetivo y depende del problema y el experto.

Definidas las medidas clásicas, la extracción de las reglas se lleva a cabo a partir de un conjunto de transacciones T. Dado ese conjunto se desea encontrar todas las reglas que cumplan:

-   `minSup`: Definido como Soporte \\(\geq\\) soporte mínimo.
-   `minConf`: Definida como Confianza \\(\geq\\) confianza mínima.

Ambos valores los debe definir el experto del problema.

Lo más sencillo es resolver este problema mediante fuerza bruta (Generar todas la reglas posibles, calcular para cada una de ellas el soporte y confianza y descartar las que no superen los umbrales anteriores). Sin embargo es inviable para problemas grandes. El enfoque basado en dos pasos **genera primero todos los *itemset* frecuentes** (aquellos con un soporte mayor o igual al umbral `minSup`), posteriormente **genera las reglas con una confianza alta** basándose en los *itemset* anteriores. El problema de esta aproximación es que el número de combinaciones posibles es de \\(2^d\\), siendo \\(d\\) el número de *items*, y por tanto la generación de los *itemset* es costosa.

Dado a la inviabilidad de resolver el problema mediante fuerza bruta, es necesario **reducir el número de candidatos posibles** (de los \\(2^d\\) usar técnicas de poda para reducir el espacio), el **número de transacciones** y el **número de comparaciones**.

# Métodos Clásicos de extracción de reglas<a id="sec-3-3" name="sec-3-3"></a>

## Algoritmo Apriori<a id="sec-3-3-1" name="sec-3-3-1"></a>

## Definición<a id="sec-3-3-1-1" name="sec-3-3-1-1"></a>

El primer método clásico se llama **Apriori**, es el que peor funciona de todos, pero del que más versiones existen. Se basa en la propiedad de **anti monotonía del soporte**, es decir, si un *itemset* es frecuente, entonces todos sus subconjuntos deben serlo también:

$$X\subseteq Y \Rightarrow sop(X) \geq sop(Y)$$

## Algoritmo<a id="sec-3-3-1-2" name="sec-3-3-1-2"></a>

El algoritmo funciona del siguiente modo:
En memoria mantiene dos tablas, \\(L_k\\) guarda el conjunto de *k-itemsets* frecuentes, \\(C_k\\) almacena el conjunto de *k-itemsets* candidatos a ser frecuentes. El algoritmo (Suponiendo `k=1` ):

1.  Generar \\(L_1\\) (*itemsets* frecuentes de longitud 1)
2.  Repetir hasta que no se encuentren más *itemsets* nuevos:
    1.  Generar el conjunto C(k+1) de *itemsets* candidatos a partir de \\(L_k\\), combinando solo aquellos que se diferencien en el último *item*.
    2.  Calcular el soporte de cada candidato.
    3.  Eliminar los candidatos infrecuentes.
    4.  Incrementar k en 1.

La <a href="#fig:rulesApriori">figura 1</a> muestra un ejemplo.

<figure>
        <a name="fig:rulesApriori" href="/img/rulesApriori.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/rulesApriori.png"
            alt="Ejemplo algoritmo Apriori. *Créd. Rafa Alcalá, Profesor Reglas de Asociación*"
            title="Ejemplo algoritmo Apriori. *Créd. Rafa Alcalá, Profesor Reglas de Asociación*"
            sizes="(min-width: 1357px) 1357px, 100vw"
            width="1357"
            height="830">
          </img>
        </a>
        <figcaption>Ejemplo algoritmo Apriori. *Créd. Rafa Alcalá, Profesor Reglas de Asociación*</figcaption>
</figure>

## Eficiencia<a id="sec-3-3-1-3" name="sec-3-3-1-3"></a>

La **elección del umbral** para el soporte mínimo debe ser adecuada, umbrales demasiado bajos dan lugar a muchos *itemsets* e incrementará la complejidad. El **número de *items* en la base da datos** es un factor importante y afecta al rendimiento del algoritmo. De igual manera, el **tamaño de la base de datos** puede hacer incrementar considerablemente el tiempo de ejecución, ya que **apriori** realiza múltiples pasadas a toda la base de datos. Por último, la **longitud de las transacciones** puede aumentar la longitud de los *itemsets* frecuentes, requiriendo de más espacio para almacenarlos.

## Algoritmo Eclat<a id="sec-3-3-2" name="sec-3-3-2"></a>

Este algoritmo es igual que **Apriori** pero mejora el cálculo del soporte obteniendo el mismo resultado. Para cada *item* almacena en una lista en qué transacción aparece dicho *item*, de esta forma se reduce el tiempo de cómputo sacrificando más memoria.

## Algoritmo FP-Growth<a id="sec-3-3-3" name="sec-3-3-3"></a>

## Definición<a id="sec-3-3-3-1" name="sec-3-3-3-1"></a>

Este algoritmo genera una representación comprimida de la base da datos mediante árboles. Mantiene una **tabla cabecera** donde para cada *item* hay una lista enlazando a todos los nodos del grafo en el cual aparece dicho *item*. Además, el **grafo de transacciones** resume las transacciones en la base de datos junto con el soporte del *itemset* que se forma siguiendo el camino desde la raíz del grafo hasta el nodo en cuestión. Como **requisito**, los *items* deben estar ordenados. De todos los métodos vistos, **FP-Growth** es el más eficiente.

## Extracción de *itemsets* frecuentes<a id="sec-3-3-3-2" name="sec-3-3-3-2"></a>

En este algoritmo se realiza en dos fases. Primero se calcula el soporte de los *items* que aparecen en la **tabla cabecera**, recorriendo la lista almacenada en la tabla. Posteriormente, para cada *item* superando el umbral de soporte, se extraen las ramas del árbol donde aparece el *item* y se reajusta el soporte de todos los *items* que aparecen en las ramas. Se genera un nuevo árbol considerando las ramas extraidas y se extraen los *itemsets* que superen el umbral de soporte mínimo.

# Conjuntos maximales y cerrados<a id="sec-3-4" name="sec-3-4"></a>

Los *itemsets Maximales* son aquellos *itemsets* frecuentes para los que ninguno de sus **superconjuntos** inmediatos son frecuentes. La <a href="#fig:rulesMaximals">Figura 2</a> muestra un ejemplo. Las ventajas de usar conjuntos maximales es la reducción del espacio, ya que a partir de los *itemsets* frecuentes maximales se pueden deducir los *itemsets* frecuentes. Como desventaja no se conoce el soporte de los *itemsets* frecuentes, hay que volver a calcularlo.

<figure>
        <a name="fig:rulesMaximals" href="/img/rulesMaximals.jpg">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/rulesMaximals.jpg"
            alt="En azul: *itemsets* frecuentes, en amarillo: *Itemsets Maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            title="En azul: *itemsets* frecuentes, en amarillo: *Itemsets Maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            sizes="(min-width: 612px) 612px, 100vw"
            width="612"
            height="454">
          </img>
        </a>
        <figcaption>En azul: *itemsets* frecuentes, en amarillo: *Itemsets Maximales*. *Créd: <a href="http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html">hypertextbookshop</a></figcaption>
</figure>

Los *itemsets cerrados* son los *itemsets* frecuentes para los que ninguno de sus superconjuntos inmediatos tienen soporte igual al de ellos. Cabe destacar que todo *itemset maximal* es también cerrado. La <a href="#fig:rulesCerrados">figura 3</a> muestra un ejemplo. La ventaja de los *itemsets cerrados* es que no es necesario volver a calcular el soporte, mientras que como desventaja necesitan más espacio, al haber más cerrados que maximales.

<figure>
    <a name="fig:rulesCerrados" href="/img/rulesCerrados.jpg">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/rulesCerrados.jpg"
            alt="En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            title="En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            sizes="(min-width: 677px) 677px, 100vw"
            width="677"
            height="509">
          </img>
        </a>
        <figcaption>En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: <a href="http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html">hypertextbookshop</a></figcaption>
</figure>

Para terminar, estos dos conjuntos están relacionados, como muestra la <a href="#fig:rulesCerrMax">Figura 4</a>, los maximales son un subconjunto de los cerrados.

<figure>
        <a name="fig:rulesCerrMax" href="/img/rulesCerrMax.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/rulesCerrMax.png"
            alt="En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            title="En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: [hypertextbookshop](http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html)"
            sizes="(min-width: 677px) 677px, 100vw"
            width="677"
            height="509">
          </img>
        </a>
        <figcaption>En azul: *itemsets cerrados*, en amarillo: *Itemsets maximales*. *Créd: <a href="http://www.hypertextbookshop.com/dataminingbook/public_version/contents/chapters/chapter002/section004/blue/page001.html">hypertextbookshop</a></figcaption>
</figure>

# Generación de reglas<a id="sec-3-5" name="sec-3-5"></a>

A partir de los *itemsets* frecuentes se generan todas las reglas posibles y solo se quedan las que superen los umbrales de confianza mínimo. Por lo general es preferible general reglas con un solo elemento en el consecuente (ABC \\(\rightarrow\\) D), pero nada impide que exista más de un objeto en el consecuente, sin embargo, de este modo se generarán bastantes más reglas posibles. Como beneficio a generar reglas con un solo elemento en el consecuente se obtienen reglas más interpretables, ya que AB \\(\rightarrow\\) CD \\(\equiv\\) AB \\(\rightarrow\\) C y AB \\(\rightarrow\\) D.

# Problemas abiertos<a id="sec-3-6" name="sec-3-6"></a>

Todo el contenido anterior es para reglas de **asociación binarias**, es decir, valores categóricos. Pero la mayoría de problemas reales contienen variables numéricas y las reglas no serán buenas. Para ello hay que dividir el domino de los atributos en intervalos, como se describió anteriormente (Puesto, Estudiante) etc y usar conjuntos difusos.

En cuanto a las **medidas de calidad** para evaluar reglas de asociación se debe tener cuidado. Por lo general se deben usar varias medidas de calidad que se complementen a la hora de evaluar la calidad de una regla, estas medidas, entre otras son *lift, factor de certeza&#x2026;*

# Consejos<a id="sec-3-7" name="sec-3-7"></a>

- Si al generar reglas hay *items* con soporte demasiado altos es mejor no tener en cuanta dichos *items*. Por ejemplo, si un producto se compra el 100% de las veces, no merece la pena añadirlo a los *itemsets*, ya que no va a aportar información útil.
- Antes de comenzar un problema de reglas de asociación, lo más importante es tener claro qué queremos encontrar en los datos y conocer el problema presente.

# Bibliografía <a id="sec-5" name="sec-5"></a>

- [Cap 8. Introduction to Data Mining 1st edition by Tan, Pang-Ning, Steinbach, Michael, Kumar, Vipin](http://amzn.to/2F04PCT)
- [Data Mining, Southeast Asia Edition: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)](http://amzn.to/2sYPCAl)
- <https://en.wikipedia.org/wiki/Minkowski_distance>
- <https://en.wikipedia.org/wiki/Euclidean_distance>
- <https://en.wikipedia.org/wiki/Taxicab_geometry>
- <https://en.wikipedia.org/wiki/Chebyshev_distance>
- Apuntes de clase _Aprendizaje no supervisado y detección de anomalías_ del **Máster universitario en Ciencia de Datos e Ingeniería de Computadores de la Universidad de Granada***
