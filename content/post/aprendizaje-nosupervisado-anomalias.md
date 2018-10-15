+++
author = "alex"
title = "Aprendizaje no Supervisado y Detección de Anomalías: ¿Qué es una Anomalía?"
date = "2018-03-12T09:39:48+01:00"
lastmod = "2018-04-03T12:48:35+02:00"
categories = ["datascience"]
mainclass = "datascience"
image = "anoClust.png"
tags = ["aprendizaje no supervisado", "anomalías"]
description = "En qué consiste la detección de Anomalías en Aprendizaje Automático, tipos de Anomalías y medidas de calidad para evaluar los resultados de los algoritmos "
math = true
+++

> Este articulo forma parte de una serie de artículos sobre clustering, detección de anomalías y reglas de asociación. Originalmente forman parte de un trabajo para el __Máster Universitario Oficial en Ciencia de Datos e Ingeniería de Computadores__ de la Universidad de Granada en la asignatura _Aprendizaje no supervisado y detección de anomalías_. El resto de artículos son:

- [Clustering](https://elbauldelprogramador.com/aprendizaje-nosupervisado-clustering/)
- [Reglas de Asociación](https://elbauldelprogramador.com/aprendizaje-nosupervisado-reglas/)
- [Reglas de Asociación Avanzadas](https://elbauldelprogramador.com/aprendizaje-nosupervisado-reglas-avanzadas/)

Antes de comenzar es necesario definir qué es una **anomalía**: Una anomalía es un dato muy distinto del resto. Esto puede deberse a fallos en mediciones, o a la propia naturaleza del dato. Por ejemplo, una intrusión a un sistema informático puede considerarse una anomalía, ya que por norma general el resto de actividades en dicho sistema serán legítimas. Por lo general, un dato se considera anómalo si escapa a los rangos de normalidad del resto de los datos.

El tratamiento de los datos anómalos debe hacerse con cuidado, ya que en ocasiones se podrá descartar (cuando son errores de medición) y en otras será importante (Introsiones/ataques a un sistema).

Ciertas técnicas de aprendizaje son más robustas frente a datos anómalos que otras. Un ejemplo de ello es la **regresión lineal**, la presencia de un dato anómalo afectará en gran medida al resultado del modelo, ya que este dato anómalo *“tirará”* de la línea de regresión hacia él. Como muestra la <a href="#fig:anoReg">Figura 1</a>

<figure>
        <a id="fig:anoReg" href="/img/anoReg.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/anoReg.png"
            alt="Cómo afecta un dato anómalo a una regresión"
            title="Cómo afecta un dato anómalo a una regresión"
            sizes="(min-width: 870px) 870px, 100vw"
            width="870"
            height="471">
          </img>
        </a>
        <figcaption>Cómo afecta un dato anómalo a una regresión</figcaption>
</figure>

También ocurre en *clustering*, ya que los datos anómalos desplazan los centroides hacia ellos (<a href="#fig:anoClust">Figura 2</a>).

<figure>
        <a id="fig:anoClust" href="/img/anoClust.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/anoClust.png"
            alt="Cómo afecta un dato anómalo al *clustering*"
            title="Cómo afecta un dato anómalo al *clustering*"
            sizes="(min-width: 562px) 562px, 100vw"
            width="562"
            height="179">
          </img>
        </a>
        <figcaption>Cómo afecta un dato anómalo al *clustering*</figcaption>
</figure>

Una buena analogía en este campo es encontrar una aguja en un pajar. Esa sería la forma fácil de encontrar una anomalía, ya que al menos se sabe que hay que encontrar una aguja. Pero en muchas ocasiones no se sabe **qué es lo que se debe encontrar.**

<!--more--><!--ad-->

# Aplicaciones<a id="sec-2-1" name="sec-2-1"></a>

Algunas aplicaciones son los **Sistemas de detección de intrusiones en red** (*Network Intrusion Detection Systems [NIDS]* ). Cuando se conoce el tipo de anomalía los NIDS son basados en firmas, pero también existen sin conocer previamente el tipo de anomalía a detectar. Este documento se centrará en la última, NIDS basados en detección de anomalías. Ejemplos de este tipo de sistemas son:

-   Detectar intrusiones de red.
-   Fraude en tarjetas de crédito.
-   Detectar brotes de epidemias.
-   Análisis de regiones sospechosas en imágenes (Como radiografías).
-   Video vigilancia.

# Métodos supervisados<a id="sec-2-2" name="sec-2-2"></a>

Cuando se conoce la existencia de anomalías en los datos, y se sabe cuales son, las técnicas usadas son de clasifiación supervisada. En este tipo de problemas se tienen dos conjuntos de datos, uno de entrenamiento y otro de test. Como se dispone de toda la información, los datos están etiquetados en función de si son anomalía o no. Con estos datos se construye un modelo que aprenda a distinguir ente un dato anómalo y uno legítimo.

Una situación muy común en este tipo de datos es que están desbalanceados. Existen muchos más datos legítimos que anómalos, lo cual sesga el resultado del modelo. Este tipo de problemas se conoce como **calsificación desbalanceada**. Principalmente existen dos métodos para lidiar con este problema. **Métodos basados en Instancias** y **basados en algoritmos.** El primero consiste en modificar los datos antes de pasarlos al algoritmo, mientras que el segundo usa los datos originales sobre un algoritmo modificado.

## Basados en Instancias<a id="sec-2-2-1" name="sec-2-2-1"></a>

La forma de modificar los datos antes de pasarlos al algoritmo consiste en eliminar instancias de la clase mayoritaria (*undersampling*) o crear instancias artificiales de la clase minoritaria (*oversampling*). Algunos métodos de *underasmpling* son *Tomek-links, CNN y NCL*, de *oversampling* SMOTE, aunque este último realiza un *undersampling* a la clase mayoritaria a la vez de un *oversampling* de la clase minoritaria.

## Basados en Algoritmos<a id="sec-2-2-2" name="sec-2-2-2"></a>

En este caso no se alteran los datos, pero asignan distintos pesos a cada instancia mediante una **función de coste, bagging oo boosting**. Los métodos que usan la función de coste asignan costes muy altos a las clases minoritarias. **Bagging** incluye más instancias de la clase minoritaria en cada paso del algoritmos de *bagging*. Por contra, **Boosting** asigna más peso a las instancias de la clase minoritaria en cada paso. También existen alternativas híbridas, como **SmoteBoosting, SmoteBagging**  etc.

## Métricas de evaluación<a id="sec-2-2-3" name="sec-2-2-3"></a>

En este tipo de problemas la precisión del modelo no es importante, ya que un modelo sencillo que etiquete todas las instancias como legítimas podría tener un 99.9% de precisión en los casos en los que la anomalía esté presente el 0.1% del tiempo, y aún con este porcentaje de precisión no se estaría detectando ninguna anomalía. Esto es debido al desbalanceo entre las clases. Debido a ello es necesario usar otro tipo de métricas, como *Recall, Precisión, F-Measure, ROC etc*.

# Métodos semi-supervisados<a id="sec-2-3" name="sec-2-3"></a>

Se conoce la existencia de anomalías, pero no se encuentran en el conjunto de datos. Con este conjunto de datos se define “\*la normalidad\*” del entorno. Por ejemplo, en datos de red, lo normal es que todo el tráfico sea legítimo, y sin saturaciones. El problema en esta situación es saber cómo modelar un “\*comportamiento normal\*”. Para ello hay varias técnicas, basadas en clasificación, en reglas de asociación, en máquinas de soporte vectorial.

Los **modelos de clasificación** en el caso de conjuntos de datos correctamente balanceados sufre de cometer demasiados falsos positivos. Cuando un nuevo dato llega al modelo de clasificación, y éste lo clasifica incorrectamente, el dato se considera como una anomalía, lo cual no tiene por qué ser cierto. Para mejorar este modelo, se suelen usar clasificadores basados en reglas. Los clasificadores basados en reglas proporcionan más información cuando un dato se clasifica incorrectamente, informan en qué grado se considera al dato  anómalo, por ejemplo, en un 80%. Otra forma de abordar el problema es mediante la generación de **máquinas de estados finitos**, cuando llega un nuevo dato se comprueba contra esa máquina de estados finitos para determinar la legitimidad o no legitimidad. Un ejemplo de este tipo de modelos se encuentra en la <a href="#fig:anoSemi">Figura 3</a>

<figure>
        <a id="fig:anoSemi" href="/img/anoSemi.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/anoSemi.png"
            alt="Máquina de estados finitos para modelar tráfico FTP"
            title="Máquina de estados finitos para modelar tráfico FTP"
            sizes="(min-width: 428px) 428px, 100vw"
            width="428"
            height="390">
          </img>
        </a>
        <figcaption>Máquina de estados finitos para modelar tráfico FTP</figcaption>
</figure>

Los métodos **basados en reglas** buscan patrones frecuentes y reglas de asociación. Uno de estos métodos es **LERAD**. **LERAD** aprende reglas que encuentran eventos extraños en una serie temporal.

Los métodos basados en **kernel** como Máquinas de Soporte Vectoriales asumen la existencia de una única clase definida como comportamiento normal. Este comportamiento normal se construye estableciendo una región en el espacio. Todo punto que caiga en ese espacio será considerado normal. Por contra, cuando un punto cae fuera de la región es considerado anómalo. Un ejemplo de la definición de este espacio se muestra en la <a href="#fig:anoSVM">Figura 4</a>. Gracias a la potencia de los **kernels** es posible definir distintos tipos de regiones en el espacio para realizar la detección.

<figure>
        <a id="fig:anoSVM" href="/img/anoSVM.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/anoSVM.png"
            alt="SVMs para detección de Anomalías"
            title="SVMs para detección de Anomalías"
            sizes="(min-width: 404px) 404px, 100vw"
            width="404"
            height="342">
          </img>
        </a>
        <figcaption>SVMs para detección de Anomalías</figcaption>
</figure>

Es posible construir modelos basándose en **los datos históricos**. En este tipo de métodos se asume como anomalía cualquier evento que no se haya producido en el pasado. Para ello se lleva un recuento de los eventos ocurridos y se comparan con los datos históricos para intentar detectar anomalías.

# Métodos no supervisados<a id="sec-2-4" name="sec-2-4"></a>

Se dispone de anomalías en el conjunto, pero no están etiquetadas, no se conoce a priori si un dato es una anomalía o no, es decir, tanto anomalías como comportamientos legítimos están mezclados. En este campo existen también varias alternativas, las cuales se pasan a describir a continuación.

## Aproximaciones gráficas<a id="sec-2-4-1" name="sec-2-4-1"></a>

Como su nombre indica consiste en inspeccionar visualmente los datos para determinar cuales son los datos anómalos. Su principal desventaja es la cantidad de tiempo a invertir, y que es subjetivo. Para poder usar esta aproximación es necesario reducir/resumir la información a una dimensión que pueda ser visualizada (1D, 2D o 3D), y por tanto se está perdiendo información que puede resultar relevante. Una de las aproximaciones visuales más útiles es el *biplot*, que muestra una proyección a dos dimensiones de la varianza que aporta cada atributo. La <a href="#fig:anoBiplot">figura 5</a> muestra un *biplot*, la longitud de los vectores para cada atributo muestra la dirección más fuerte de los datos. Si dos atributos son ortogonales significa que no están correlados, lo cual implica que ambos pueden usarse en la construcción del modelo para obtener mejores resultados. Por contra, si dos atributos van en la misma dirección y tienen similares longitudes, están correlados, o negativamente correlados si van en direcciones opuestas.

<figure>
        <a id="fig:anoBiplot" href="/img/anoBiplot.png">
          <img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/anoBiplot.png"
            alt="Biplot. **Var1** y **Var6** están muy poco correlacionadas, mientras que **Var1** y **Var10** sí lo están    *Créd. <https://sukhbinder.wordpress.com/2016/03/02/biplot-in-python-revisited/>*"
            title="Biplot. **Var1** y **Var6** están muy poco correlacionadas, mientras que **Var1** y **Var10** sí lo están    *Créd. <https://sukhbinder.wordpress.com/2016/03/02/biplot-in-python-revisited/>*"
            sizes="(min-width: 1476px) 1476px, 100vw"
            width="1476"
            height="1024">
          </img>
        </a>
        <figcaption>Biplot. **Var1** y **Var6** están muy poco correlacionadas, mientras que **Var1** y **Var10** sí lo están    *Créd. <a href="https://sukhbinder.wordpress.com/2016/03/02/biplot-in-python-revisited/">sukhbinder</a></figcaption>
</figure>

## Aproximaciones paramétricas<a id="sec-2-4-2" name="sec-2-4-2"></a>

Estas aproximaciones asumen un modelo paramétrico describiendo la distribución de los datos y usan tests estadísticos para determinar si un punto es  un *outlier* con un nivel de significancia. Dichos tests dependen de la distribución inherente, sus parámetros y número de *outliers* esperados. Entre los tests que consideran una sola variable se encuentran el **test de Grubb**, que considera un solo *outlier*, este test sufre de enmascaramiento (la media puede enmascarar *outliers*) , los tests de **Tietjen y Moore** consideran k *outliers* y sufren de *swamping* (de forma similar, la media oculta *outliers*). Cuando hay varias dimensiones (p dimensiones) se considera la **distancia de Mahalanobis**. En p dimensiones, un punto que sea considerado *outlier* en uno de sus atributos seguirá siéndolo aunque en cualquiera de sus atributos restantes no sea considerado *outlier*, o cuando sea *outlier* en varios de sus atributos.

El problema de los tests del párrafo anterior es que necesitan de una medida de distancia multivariante. Además, para poder calcular una matriz de covarianza de forma correcta es necesario eliminar los *outliers*, de lo contrario la matriz no será correcta y proporcionará información falsa.

## Aproximaciones basadas en vecinos cercanos<a id="sec-2-4-3" name="sec-2-4-3"></a>

Las aproximaciones anteriores asumen una distribución normal de los datos, pero en muchos casos la distribución no es normal, e incluso se desconoce. Si se añade el hecho de dimensiones muy altas, los datos no suelen seguir una distribución multivariante específica. Aquí hay dos formas de obtener los vecinos, mediante una **función de distancia** que mide la cercanía entre dos puntos o asignando una puntuación de anomalía a un punto en función de su distancia frente al resto de puntos vecinos.

## Aproximaciones basadas en *clustering*<a id="sec-2-4-4" name="sec-2-4-4"></a>

En esta aproximación primero se construyen los *cluster* mediante cualquier técnica de *clustering*, posteriormente se mide la distancia de un punto a su centroide para determinar si se trata de una anomalía. Se debe elegir con cuidado la medida de distancia. La **distancia Euclídea** no tiene en cuenta la densidad, por tanto es aconsejable usar la **distancia relativa** (La distancia relativa es la relación entre la distancia del punto del centroide a la distancia mediana de todos los puntos del *cluster*  desde el centroide).

# Evaluación<a id="sec-2-5" name="sec-2-5"></a>

En detección de anomalías no basta obtener simplemente el porcentaje de acierto, es necesaria una matriz de confusión en la que se pueda observar la tasa de **falsos positivos** y **falsos negativos**. Dado que lo importante en este tipo de problema es detectar la anomalía es necesario observar el comportamiento de la precisión para detectar la anomalía. Para ello se usa la fórmula \\(\frac{TP}{TP + FP}\\), que indica qué porcentaje en la predicción de anomalías es correcto, siendo TP un acierto verdadero y FP un falso positivo, a más cercana de 1 esta medida mejor. Es interesante fijarse en el *Recall* (\\(\frac{TP}{TP + FN}\\)) que mide el porcentaje de anomalías detectadas, ya sean bien clasificadas o no. La proporción de falsos positivos \\(\frac{FP}{FP + TN}\\) mide el porcentaje de clases normales que fueron clasificadas como anomalías. Por último, la especifidad (\\(\frac{TN}{TN + FP}\\)) indica el porcentaje de clases normales detectadas. No es posible mejorar todas las medidas anteriores simultáneamente (Cuando aumente la precisión, el *Recall* va a decaer, ya que son inversos). Para atajar este problema se usa la medida \\(F_1\\) -Score, la cual intenta encontar un equilibrio entre *Recall* y precisión. Para terminar de aclarar estos conceptos, obtener una fiabilidad del \\(99\%\\) en una enfermedad que ocurren en una de cada \\(10000\\) no es fiable, ya que se equivocará una vez de cada \\(1000\\). Cuando se habla de anomalías que aparecen muy poco el modelo va a cometer muchos falsos positivos, la solución a este problema es usar información adicional como la **probabilidad a priori de la anomalía, porcentaje de acierto y tasa de falsos positivos.**

# Bibliografía <a id="sec-5" name="sec-5"></a>

- [Cap 8. Introduction to Data Mining 1st edition by Tan, Pang-Ning, Steinbach, Michael, Kumar, Vipin](http://amzn.to/2F04PCT)
- [Data Mining, Southeast Asia Edition: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)](http://amzn.to/2sYPCAl)
- <https://en.wikipedia.org/wiki/Minkowski_distance>
- <https://en.wikipedia.org/wiki/Euclidean_distance>
- <https://en.wikipedia.org/wiki/Taxicab_geometry>
- <https://en.wikipedia.org/wiki/Chebyshev_distance>
- Apuntes de clase _Aprendizaje no supervisado y detección de anomalías_ del **Máster universitario en Ciencia de Datos e Ingeniería de Computadores de la Universidad de Granada***
