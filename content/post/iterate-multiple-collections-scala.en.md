+++
tags = ["scala", "python", "howto"]
categories = ["dev"]
mainclass = "dev"
image = "scala_logo.png"
author = "alex"
description = "What is the Idiomatic way of iterate through multiple collections in scala?"
date = "2017-05-08T12:12:30+01:00"
lastmod = "2017-10-05T16:29:51+01:00"
title = "How to iterate through multiple collections in Scala"
+++

When I first started working with [scala](https://elbauldelprogramador.com/en/tags/scala "post about scala scala") I've found myself unable to do trivial things I have being doing in other languages I already known. That is the most frustrating part of learning a new programming language, in my opinion.

# Iterate through multiple collections at once in python

One common thing to do is iterate through two collections at a time. The [pythonic](https://elbauldelprogramador.com/en/tags/python "post about python") way of doing this is simple:

```python
collection1 = (1, 2, 3, 4, 5)
collection2 = ('a', 'b', 'c', 'd', 'e')

for i,j in zip(collection1, collection2):
     print i,j
```

which result is:

```python
1 a
2 b
3 c
4 d
5 e
```

<!--more--><!--ad-->

# Iterate through multiple collections at once in scala

Now, what is the _idiomatic_ way of doing it in _scala_?. In my case I needed to iterate through the collection and also have the index of the current item being iterated, this can be achieved with the method `zipWithIndex`, then call `zipped` along with any collection you want to iterate at the same time:

```scala
private val tree: Vector[Node] = {
  val indexedWords = words.zipWithIndex

  (indexedWords, tags, dep).zipped.map {
    (w, t, d) =>
      new Node(w._1, w._2, t, d)
  }
}
```

In the example above I am __zipping__ together three collections `(indexedWords, tags, dep)`, which correspond with types `((String, Int), String, Int)`.

Before I knew about the _idiomatic_ way I was iterating trough the collection in a ugly way:

```scala
/** Constituent tree of this sentence; includes head words */
private val tree: Vector[Node] = words.map(w => {
   val i = words.indexOf(w)
   new Node(w, i, tags.head, 0)
})
```

> This code is part of my final project in Computer Engineering, it was about creating a <a href="https://en.wikipedia.org/wiki/Dependency_grammar" target="_blank" title="Dependency Parsing">Dependency Parser</a>, you can check it on [GitHub](https://elbauldelprogramador.com/en/tags/github "Posts about github"): <a href="https://github.com/elbaulp/NLP_Dependency_Parsing" target="_blank" title="NLP_Dependency_Parsing">NLP_Dependency_Parsing</a>

# References

- <a href="http://stackoverflow.com/questions/17199534/scala-for-loop-over-two-lists-simultaneously" target="_blank" title="Scala for loop over two lists simultaneously">Scala for loop over two lists simultaneously</a>
