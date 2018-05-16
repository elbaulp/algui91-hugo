+++
author = "alex"
title = "Aprendizaje no Supervisado y Detección de Anomalías: Reglas de Asociación Avanzadas"
date = "2018-04-03T12:50:58+02:00"
categories = ["datascience"]
mainclass = "datascience"
image = "rulesHier.png"
tags = ["aprendizaje no supervisado", "reglas de asociación"]
description = "En qué consisten las reglas de asociación en Aprendizaje Automático, tipos de reglas y medidas de calidad para evaluar los resultados de los algoritmos "
math = "true"
+++

> Este articulo forma parte de una serie de artículos sobre clustering, detección de anomalías y reglas de asociación. Originalmente forman parte de un trabajo para el __Máster Universitario Oficial en Ciencia de Datos e Ingeniería de Computadores__ de la Universidad de Granada en la asignatura _Aprendizaje no supervisado y detección de anomalías_. El resto de artículos son:

- [Clustering](/aprendizaje-nosupervisado-clustering/)
- [Detección de Anomalias](/aprendizaje-nosupervisado-anomalias/)
- [Reglas de Asociación](/aprendizaje-nosupervisado-reglas/)

Uno de los problemas de las reglas de asociación es la interpretabilidad, estos pueden venir derivados de los datos en sí, de los usuarios o de las propias medidas de evaluación.

**Los problemas derivados de los datos** residen en que hay varias formas de interpretar que si A \\(\rightarrow\\) B en función de las medidas de calidad usadas. Al ser patrones en los datos, la calidad de la regla dependerá de igual modo de la calidad de los datos. Algunos problemas derivados de **los datos** son:

-   **falta de variabilidad**, *items* muy frecuentes no aportan nada (Todos los clientes compran papel) o al contrario, *items* poco frecuentes tampoco aportan nada.
-   La **representabilidad** de los datos, es decir, que no haya suficientes datos.
-   **Sesgos muestrales**, es necesario escoger los *items* de forma aleatoria, no sesgarlos seleccionado compras de un periodo determinado, como las compras de enero, por ejemplo.

Por otra parte, **los problemas derivados del usuario** pueden deberse a que no se dispone de un experto en el dominio del problema para interpretar y valorar las reglas. Aún cuando se dispone de un experto, pueden ocasionarse **confusiones semánticas** en las que se interpretan mal las reglas o los valores de confianza etc.

<!--more--><!--ad-->

Los **problemas derivados de las medidas**, las reglas con soportes muy altos tienden a ser dudosas, ya que su valor tan elevado puede deberse a una **falta de variabilidad** en los datos. De igual modo, **la confianza** no siempre es fiable, una regla con una confianza del 84% puede parece buena, pero aún teniendo una regla con máxima confianza (conf = 1) puede que los *items* de A \\(\rightarrow\\) B sean independientes.

Para tratar de resolver estos problemas es necesario poder comparar la confianza de la regla con el soporte de su consecuente, dada A \\(\rightarrow\\) B, \\(p(B|A)\\) la confianza, \\(p(B)\\) el soporte de B, es necesario comprar ambas medidas, ya que \\(p(B)\\) es la probabilidad a priori, mientras que \\(p(B|A)\\) es solo la probabilidad de las reglas en las que aparece A. Si la $Conf(A \\(\rightarrow\\) B) = Sop(B)$ A y B son independientes y la regla no es representativa. Aunque la confianza por sí sola no vale para determinar si una regla es buena, sí que vale para descartar una regla mala.

# Medidas de calidad<a id="sec-4-1" name="sec-4-1"></a>

Existen dos grupos de medidas de Interés, **objetivas** y **subjetivas**. Las primeras tienen fundamento estadístico, mientras que las subjetivas solo tienen en cuenta los datos.

Entre las **medidas objetivas** se encuentran **La Confianza Confirmada**, establece hasta qué punto es útil A para predecir la presencia de B, la medida se da en un rango [-1, 1], donde 0 significa que son independientes, 1 dependencia total y -1 dependencia inversa (A predice &not; B). **Lift** mide el nivel de interés, pero al ser simétrica mide asociaciones, no implicaciones, por lo cual no es buena para realizar comparaciones. **Convicción** detecta la independencia estadística entre *items*, al igual que **lift** no está acotada en su salida, por lo que no es muy fiable. El **factor de certeza** mide la incertidumbre del conocimiento, tiene su origen en los **sitemas expertos**, la ventaja frente a las dos medidas anteriores es que está acotada en rangos [-1,1], donde 0 significa independencia estadística. Existen más medidas, estas son solo unas pocas. Por lo general, el análisis de la regla depende de la medida a usar. Es necesario usar medidas en función de la semántica que se quiere medir.

Las **medidas subjetivas** miden el interés de las reglas, suele ser necesaria la presencia de un experto que valore el interés de las mismas. Una de ellas es la **Utilidad**, en ella hay que tener en cuenta:

-   **Restricciones**: ¿Qué condiciones o qué contexto es necesario para que el patrón se cumpla?
-   **Tiempo de vida**: ¿Durante cuánto tiempo será útil la información dada por el patrón?
-   **Esfuerzo**: ¿Qué debemos hacer para actuar según nos muestre el patrón?
-   **Efectos laterales**: ¿Se puede prever algún efecto lateral?
-   **Impacto**: Desde la obtención del patrón, ¿se han producido cambios en la actualidad?
-   **Prontitud**: ¿Cuándo podemos actuar y utilizar la información que nos brinda el patrón?

Las **reglas inesperadas** son otro tipo de medida subjetiva, son aquellas que contradicen las creencias del usuario, pueden ser interesantes o no.

# Interpretaciones<a id="sec-4-2" name="sec-4-2"></a>

Esta sección se corresponde con el **marco formal** de las reglas de asociación, es decir, la definición teórica de las reglas, de forma abstracta. Para ello hay que asociar dicha abstracción con los datos, crear una asociación entre datos y reglas, es esto lo que genera una interpretación.

La forma más común es tabular los datos en una estructura, por ejemplo (salario, alto) \\(\rightarrow\\) (estudios, superiores), pero no es la única manera de representación. Se puede, por ejemplo, considerar la ausencia de datos con negaciones (&not; A), esta representación es útil para el análisis de grupos de reglas.

Otra forma de representación son las **reglas jerárquicas**, en esta representación se consideran grupos de *items* a distintos niveles. Por ejemplo, si los *items* son artículos de compra, un análisis a nivel de artículos individuales puede no dar información alguna. Sin embargo, a un nivel más alto se puedan extraer conclusiones útiles, un nivel más alto consiste en agrupar los distintos artículos según algún criterio (por marcas, por tipo de producto, tipos de pan, tipos de leche etc). De esta forma se establece una jerarquía en la que un *item* está compuesto por los *items* básicos y todas las categorias a las que pertenece, por ejemplo:
$$\text{(zumo, naranja, marca, comida)}$$
donde  *marca* y *comida* son categorías del *zumo*. En la figura <a href="#fig:rulesHier">1</a> muestra un ejemplo.

<figure>
        <a name="fig:rulesHier" href="/img/rulesHier.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/rulesHier.png"
            alt="Ejemplo de reglas jerárquicas. *Créd. Apuntes de clase*"
            title="Ejemplo de reglas jerárquicas. *Créd. Apuntes de clase*"
            sizes="(min-width: 736px) 736px, 100vw"
            width="736"
            height="411">
          </amp-img>
        </a>
        <figcaption>Ejemplo de reglas jerárquicas. *Créd. Apuntes de clase*</figcaption>
</figure>

Las **reglas secuenciales** se usan cuando **existe un orden** prefijado en los *items* de las transacciones. Ejemplos de reglas de este tipo son, si A,B y C aparecen en este **orden específico** \\(\rightarrow\\) X. Este tipo de reglas son útiles para analizar textos, ya que se extraen reglas como {Minería}{de} \\(\rightarrow\\) {Datos}, es decir, si se encuentra la palabra **Minería** seguida de **De** es muy probable que la siguiente palabra sea **datos**.

Otro tipo de reglas son las **Cuantitativas**, usadas con datos estructurados, con dominios numéricos, el problema de estos dominios es su valor semántico y soporte bajo. Para ello, se comentó que es útil dividir el dominio en intervalos y generar  pares (atributo, intervalo) en lugar de (atributo, valor), estos *items* deben estar ordenados. Los intervalos pueden se definidos por el experto para que puedan ser correctamente interpretados, o generarlos automáticamente.

Las **dependencias aproximadas**  definen patrones en  bases de datos relacionales, corresponden a dependencias funcionales con excepciones, es decir, si se sabe que V se encuentra en una fila se sabe que W está en la misma fila. En esta interpretación las reglas extraidas tienen la semántica de la dependencia funcional, es decir, los *items* son del tipo: Igualdad de variables en un par de tuplas.

La última interpretación son las **dependencias graduales**, representan asociaciones entre la variación (incrementos o decrementos) en los valores de los atributos, representando así correlaciones positivas o negativas. Se puede comparar con las **dependencias aproximadas** en cuanto a que esta en lugar de determinar si los valores son iguales, determina si son mayores o menores.

# Reglas de Asociación difusas<a id="sec-4-3" name="sec-4-3"></a>

Se usan para representar conceptos, por ejemplo, ¿cuando  es una persona alta?, si consideramos 180cm como alto, ¿una persona que mida 179,99 ya no es alta?, este es el problema que tratan los **conjuntos difusos**, la pertenencia o no de un elemento a un conjunto viene dada por un grado de certeza. La figura <a href="#fig:ruleFuzzy1">2</a> muestra un ejemplo en el que se define el rango en el que aumenta si una persona es alta o no, pero presenta el problema comentado anteriormente. Otra forma de representarlo es mediante una función discontinua, como muestra la figura <a href="#fig:ruleFuzzy2">3</a>, pero tampoco es ideal, lo mejor es una función gradual, como muestra la figura <a href="#fig:ruleFuzzy3">4</a>

<figure>
        <a name="fig:ruleFuzzy1" href="/img/ruleFuzzy1.jpg">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/ruleFuzzy1.jpg"
            alt="Rango en la que una persona se considera como alta"
            title="Rango en la que una persona se considera como alta"
            sizes="(min-width: 800px) 800px, 100vw"
            width="800"
            height="383">
          </amp-img>
        </a>
        <figcaption>Rango en la que una persona se considera como alta</figcaption>
</figure>

<figure>
        <a name="fig:ruleFuzzy2" href="/img/ruleFuzzy2.jpg">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/ruleFuzzy2.jpg"
            alt="Rango en la que una persona se considera como alta"
            title="Rango en la que una persona se considera como alta"
            sizes="(min-width: 800px) 800px, 100vw"
            width="800"
            height="383">
          </amp-img>
        </a>
        <figcaption>Rango en la que una persona se considera como alta</figcaption>
</figure>

<figure>
        <a name="fig:ruleFuzzy3" href="/img/ruleFuzzy3.jpg">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/ruleFuzzy3.jpg"
            alt="Rango en la que una persona se considera como alta. Cuando la línea empieza a subir, aumenta el grado en el que se considera a una persona alta."
            title="Rango en la que una persona se considera como alta. Cuando la línea empieza a subir, aumenta el grado en el que se considera a una persona alta."
            sizes="(min-width: 800px) 800px, 100vw"
            width="800"
            height="383">
          </amp-img>
        </a>
        <figcaption>Rango en la que una persona se considera como alta. Cuando la línea empieza a subir, aumenta el grado en el que se considera a una persona alta.</figcaption>
</figure>

Las reglas difusas aparecen solo cuando se consideran **conjuntos difusos** para definir algún concepto con *items*, transacciones etc, son conjuntos continuos. En este tipo de reglas el soporte depende mucho de dónde se establecen los cortes que definen los intervalos. **Semánticamente** los intervalos no corresponden con el concepto (30 años es joven, pero 31 no). Para dar solución a este problema se usan conjuntos difusos con **funciones de pertenencia**, como muestra la figura <a href="#fig:ruleFuzzy4">5</a>

<figure>
        <a name="fig:ruleFuzzy4" href="/img/ruleFuzzy4.jpg">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/ruleFuzzy4.jpg"
            alt="Particiones difusas con función de pertenencia. Cabe destacar que pueden existir solapamientos (Región roja)"
            title="Particiones difusas con función de pertenencia. Cabe destacar que pueden existir solapamientos (Región roja)"
            sizes="(min-width: 800px) 800px, 100vw"
            width="800"
            height="383">
          </amp-img>
        </a>
        <figcaption>Particiones difusas con función de pertenencia. Cabe destacar que pueden existir solapamientos (Región roja)</figcaption>
</figure>


# Evaluación de reglas por grupos<a id="sec-4-4" name="sec-4-4"></a>

El análisis de las reglas de asociación suele realizarse de forma individual, estudiando su novedad y potencial utilidad en base a los itemsets que la componen, las medidas **objetivas y subjetivas** realizadas sobre ellas, y el conocimiento previo del experto. Sin embargo, el análisis de conjuntos de reglas definidos según ciertos criterios puede proporcionar más información, con ciertas ventajas. Por ejemplo, ¿qué ocurre si aparecen ambas reglas A \\(\rightarrow\\) C y A \\(\rightarrow\\) &not; C? o A \\(\rightarrow\\) C y &not; C \\(\rightarrow\\) &not; A (contra recíproca), la última es lógicamente equivalente. Sin embargo, la logica formal y el conocimento de datos no son lo mismo, al buscar reglas en un conjunto de datos se puede deducir A \\(\rightarrow\\) B, pero no se sabe nada sobre &not; B \\(\rightarrow\\) A. El motivo es que &not; B \\(\rightarrow\\) A no aparece en las transacciones, es decir, las transacciones de A \\(\rightarrow\\) B son distintas a &not; B \\(\rightarrow\\) &not; A, aunque sean lógicamente equivalentes, por ello es necesario mirarlas por separado. En el caso de que ambas aparezcan se proporciona más soporte empírico de que el patrón se cumple, lo cual ocurre siempre que existen reglas lógicamente equivalentes.

# Bibliografía <a id="sec-5" name="sec-5"></a>

- [Cap 8. Introduction to Data Mining 1st edition by Tan, Pang-Ning, Steinbach, Michael, Kumar, Vipin](http://amzn.to/2F04PCT)
- [Data Mining, Southeast Asia Edition: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)](http://amzn.to/2sYPCAl)
- <https://en.wikipedia.org/wiki/Minkowski_distance>
- <https://en.wikipedia.org/wiki/Euclidean_distance>
- <https://en.wikipedia.org/wiki/Taxicab_geometry>
- <https://en.wikipedia.org/wiki/Chebyshev_distance>
- Apuntes de clase _Aprendizaje no supervisado y detección de anomalías_ del **Máster universitario en Ciencia de Datos e Ingeniería de Computadores de la Universidad de Granada***
