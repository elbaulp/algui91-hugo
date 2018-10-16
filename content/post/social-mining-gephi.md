+++
title = "Análisis y Visualización Básica de una Red Social de Twitter con Gephi"
author = ["alex"]
description = "En este artículo se muestra un análisis de la red social de @elbaulp en Twitter."
date = 2018-10-16T18:54:00+02:00
lastmod = 2018-10-16T18:54:21+02:00
tags = ["community", "data-mininig"]
categories = ["datascience"]
url = "social-mining-gephi"
draft = false
mainclass = "datascience"
image = "gephi/comunities.png"
+++

> Este artículo es el resultado de un ejercicio para la asignatura _Minería de
> Medios Sociales_ en el máster en Ciencia de Datos de la UGR


## Análisis de la red {#análisis-de-la-red}

Esta red contiene un subconjunto de los seguidores de la cuenta [@elbaulp](https://twitter.com/ElBaulP) de Twitter, ya que por limitaciones de la API la descarga de la red de hasta segundo grado de conexión tardaba mucho.

El objetivo de este análisis es identificar a los actores más influyentes, que hacen de puente entre comunidades para poder expandir el número de seguidores de @ElbaulP


### Grado medio {#grado-medio}

-   N = 2132 nodos.
-   L = 6643 enlaces
-   Densidad = 0.001
-   Grado medio = 3.116, lo cual quiere decir que cada nodo de la red está conectado con otros 3 en media.

A continuación se muestran las gráficas de densidades de los grados.

[{{<figure src="/img/avgdegree/degree-distribution.png" width="600" height="400">}}](/img/avgdegree/degree-distribution.png)

En cuanto a grados totales, hay cuatro nodos que destacan, con un grado de mayor a 120. El nodo con mayor grado es de 161. Estos nodos se corresponden con _hubs_. La distribución de grados indica que se cumple la propiedad libre de escala. Muy pocos con muchas conexiones, y muchos con pocas conexiones.

[{{<figure src="/img/avgdegree/indegree-distribution.png" width="600" height="400">}}](/img/avgdegree/indegree-distribution.png)

Los nodos con mayor grado de entrada (Con mayor número de seguidores) tienen 120 y 160 seguidores, respectivamente.

[{{<figure src="/img/avgdegree/outdegree-distribution.png" width="600" height="400">}}](/img/avgdegree/outdegree-distribution.png)

Pasa absolutamente lo mismo para los grados de entrada y salida, en el caso de Twitter esto indica seguidores y seguidos. El usuario con más amigos tiene unos 99 amigos.


### Diámetro {#diámetro}

El diámetro de la red es de 13. Este valor representa la máxima distancia existente entre dos nodos en toda la red. La distancia media es de 4.5.

El histograma de distancias es el siguiente:

[{{<figure src="/img/diameter/Closeness-Centrality-Distribution.png" width="600" height="400">}}](/img/diameter/Closeness-Centrality-Distribution.png)

El diagrama de cercanía nos indica que hay bastantes nodos muy alejados del centro (entorno a unos 90). Otros, por contra, están muy situados en el centro de la red (unos 85). El resto de nodos se situan a los alrededores del centro de la red.


### Conectividad {#conectividad}

Se tienen 845 componentes conexas, la componente gigante agrupa 1261 nodos. El coeficiente de clustering medio es 0.068. En este caso es bajo, ya que la cuenta de twitter es de un blog, en lugar de una cuenta personal. El histograma CC es el siguiente:

[{{<figure src="/img/gephi/clustering.png" width="600" height="400">}}](/img/gephi/clustering.png)

Lo cual indica que en regiones poco pobladas el coeficiente de clustering es muy alto, ya que los nodos están más conectados entre ellos localmente. Por ello destaca un punto muy alto al principio de la gráfica.


## Centralidad de los actores {#centralidad-de-los-actores}

Los cinco primeros actores para las siguientes medidas son:

| Centralidad de Grado | Intermediación        | Cercanía           | Vector propio           |
|:---------------------|:----------------------|:-------------------|:------------------------|
| nixcraft: 161        | rootjaeger: 0.048     | programador4web: 1 | Makova\_: 1             |
| Makova\_: 151        | podcastlinux: 0.048   | KevinhoMorales: 1  | psicobyte\_: 0.966      |
| cenatic: 132         | Linuxneitor: 0.043    | elrne: 1           | Terceranexus6: 0.908    |
| Terceranexus6: 129   | Makova\_: 0.039       | Mrcoo16: 1         | NuriaStatgirl: 0.796    |
| LignuxSocial: 121    | Wdesarrollador: 0.038 | RodriKing14: 1     | Inter\_ferencias: 0.780 |

En cuanto a la **centralidad de grado**, no se tiene muy en cuenta, aunque refleja el número de conexiones de un actor, no tiene en cuenta la estructura global de la red.

Una medida bastante importante es la **intermediación**, estos actores hacen de puente entre otras regiones de la red. Por lo cual pueden conectar distintas comunidades entre sí. En el caso que nos ocupa (Twitter), si conseguimos que uno de estos actores nos mencione o nos haga RT, nuestro tweet podrá llegar a otro tipo de usuarios que quizá estén interesados en nuestras ideas.

La **cercanía** mide cómo de cerca está un actor del centro de la red. En este caso no nos sirve de mucho, ya que todos los nodos tienen la misma medida.

Por último, la **centralidad de vector propio** es una medida recursiva que asigna importancia a un nodo en función de la importancia de sus vecinos. Es decir, tiene en cuenta la calidad de las conexiones, en lugar de la cantidad. El primer actor tiene un valor de esta medida de 1, lo cual indica que es el nodo más importante y con el mayor número de conexiones importantes. Luego es un actor a tener en cuenta en la red.


## Detección de comunidades {#detección-de-comunidades}

Para la detección de comunidades se ha usado un factor de resolución de 1.99 para obtener un total de 5 comunidades. Se ha elegido este valor de resolución debido a que valores inferiores resultaban en un mayor número de comunidades, pero muchas de ellas formadas por dos nodos. El valor para la modularidad es de un 0.436, lo cual es un buen valor.

La proporción de nodos en cada comunidad es la siguiente:

-   40.85%
-   21.39%
-   17.5%
-   10.98%
-   9.15%
-   0.14%

La distribución de modularidad se observa en la siguiente imagen:

[{{<figure src="/img/mod/communities-size-distribution.png" width="600" height="400">}}](/img/mod/communities-size-distribution.png)

Todas tienen un tamaño razonable salvo una, demasiado pequeña.

La siguiente imagen muestra el grafo coloreado en función de a qué comunidad
pertenece cada nodo:

[{{<figure src="/img/gephi/comunities.png" width="768" height="1116">}}](/img/gephi/comunities.png)

Analizando la red, se puede apreciar que la comunidad de arriba (Azul celeste) pertenece a nodos relacionados con la ETSIIT. Algunos miembros de esta comunidad hacen de puente (Son nodos con mucha intermediación) con otras comunidades. Por ejemplo, Makova\_ y Linuxneitor hacen de puente con la comunidad morada, esta comunidad está más relacionada con usuarios de Linux y blogs de Linux. NataliaDiazRodrz hace de puente de la comunidad de la ETSIIT con la comunidad verde, más relacionada con la temática de Ciencia de Datos. Esto tiene sentido, ya que NataliaDiazRodrz estudió en la ETSIIT y trabaja en Ciencia de Datos, concretamente en temas de NLP. La comunidad Amarilla está relacionada con programación.


## Gráficos adicionales {#gráficos-adicionales}

En la siguiente gráfica se muestra la red dispuesta con los colores en función del valor del vector propio, y el tamaño de los nodos como la intermediación:

[{{<figure src="/img/gephi/color-eige-size-betwenn.png" width="538" height="792">}}](/img/gephi/color-eige-size-betwenn.png)

En la siguiente figura se muestra a la inversa, color la intermediación, tamaño el vector propio:

[{{<figure src="/img/gephi/color-betwenn-size-eigen.png" width="644" height="760">}}](/img/gephi/color-betwenn-size-eigen.png)

Considero que las medidas más importantes son el valor de vector propio y la
intermediación, la siguiente gráfica muestra cómo están relacionadas entre
ellas. A mayor valor para ambas mejor, más importante es el nodo:

[{{<figure src="/img/gephi/eigenvsbt.png" width="1024" height="570">}}](/img/gephi/eigenvsbt.png)

[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"