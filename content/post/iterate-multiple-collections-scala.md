+++
tags = ["scala", "python"]
image = "scala_logo.png"
categories = ["dev", "how to"]
mainclass = "dev"
author = "alex"
description = "¿Cual es la forma más Idiomática de iterar varias colecciones a la vez en Scala?"
date = "2017-05-08T12:12:39+01:00"
title = "Cómo iterar sobre varias colecciones en Scala"
+++

Cuando empecé a trabajar con [scala](https://elbauldelprogramador.com/tags/scala "artículos sobre scala") me encontré con que me resultaba difícil resolver problemas triviales, fáciles de resolver en lenguajes que ya conocía. Supongo que esa es la parte más frustrante de aprender un lenguaje nuevo, al menos en mi opinión.

# Iterar sobre varias colecciones a la vez en python

Uno de esos problemas triviales es iterar sobre dos colecciones al mismo tiempo. La forma más “[_pythonic_](https://elbauldelprogramador.com/tags/python "Artículos sobre python")” es simple:

```python
collection1 = (1,2,3,4,5)
collection2 = ('a','b','c','d','e')

for i,j in zip(collection1, collection2):
     print i,j
```

que resulta en:

```python
1 a
2 b
3 c
4 d
5 e
```

# Iterar sobre varias colecciones a la vez en scala

<!--more--><!--ad-->

Ahora bien, ¿cual es la forma _idiomática_ de hacerlo en _scala_?. En mi caso concreto necesitaba iterar sobre la colección y además disponer del índice del elemento actual, esto se puede conseguir con el método `zipWithIndex`, y luego llamar a `zipped` para convertirlos en tuplas junto a las demás colecciones sobre las que queramos iterar:

```scala
private val tree: Vector[Node] = {
  val indexedWords = words.zipWithIndex

  (indexedWords, tags, dep).zipped.map {
    (w, t, d) =>
      new Node(w._1, w._2, t, d)
  }
}
```

En el ejemplo de arriba estoy juntando tres colecciones a la vez `(indexedWords, tags, dep)`, que son del tipo `((String, Int), String, Int)`.

Antes de conocer la forma _idiomática_ estaba iterando de este modo bastante feo:

```scala
/** Constituent tree of this sentence; includes head words */
private val tree: Vector[Node] = words.map(w => {
   val i = words.indexOf(w)
   new Node(w, i, tags.head, 0)
})
```

> Estas porciones de código son parte de mi trabajo de fin de Grado, el proyecto consistía en crear un <a href="https://en.wikipedia.org/wiki/Dependency_grammar" target="_blank" title="Dependency Parsing">Parseo de Dependencias</a> para el Castellano, puedes ver el proyecto completo en [GitHub](https://elbauldelprogramador.com/tags/github "Artículos sobre Github"): <a href="https://github.com/elbaulp/NLP_Dependency_Parsing" target="_blank" title="NLP_Dependency_Parsing">NLP_Dependency_Parsing</a>

# Referencias

- <a href="http://stackoverflow.com/questions/17199534/scala-for-loop-over-two-lists-simultaneously" target="_blank" title="Scala for loop over two lists simultaneously">Scala for loop over two lists simultaneously</a>
