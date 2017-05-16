+++
tags = ["scala", "howto"]
categories = ["dev"]
image = "scala_logo.png"
mainclass = "dev"
author = "alex"
description = "Standard Scala does not have a built-in feature to write to files, here is an approach to do it."
date = "2017-05-16T10:25:24+02:00"
title = "How to write to a file in Scala"
+++

In my last post I talked about [how to iterate through multiple collections in scala](https://elbauldelprogramador.com/en/iterate-multiple-collections-scala/ "iterate multiple collections in Scala"), a problem I faced when working on my <a href="https://github.com/elbaulp/NLP_Dependency_Parsing" target="_blank" title="NLP depdendency parsing">final project</a>. Other problem I faced was writing to a file in **Scala**, since standard Scala does not have this feature, I had to implement it and added to my personal library.

# First approach

The first step I made was, as always, **search on _Stack Overflow_** to know how other people were solving this problem, <a href="http://stackoverflow.com/users/247533/rex-kerr" target="_blank" title="Rex kerr">Rex kerr</a> proposed this implementation on the question <a href="http://stackoverflow.com/questions/4604237/how-to-write-to-a-file-in-scala/4608061#4608061" target="_blank" title="How to write to a file in Scala?">How to write to a file in Scala?</a>:

```scala
def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit) {
  val p = new java.io.PrintWriter(f)
  try { op(p) } finally { p.close() }
}
```

and to use it:

```scala
import java.io._
val data = Array("Five","strings","in","a","file!")
printToFile(new File("example.txt")) { p =>
  data.foreach(p.println)
}
```

<!--more--><!--ad-->

# My approach

Based on *Rex Kerr* solution, I **modified and adapted** his code and encapsulate it in a `object` called `FileUtils`:

```scala
object FileUtils {
  def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit): Unit = {
    val p = new java.io.PrintWriter(f)
    try {
      op(p)
    } finally {
      p.close()
    }
  }

  def saveOject(o: Any): Unit = {
    val oos = new ObjectOutputStream(new FileOutputStream("src/main/resources/XY"))
    try {
      oos.writeObject(o)
    } finally {
      oos.close()
    }
  }

  def getObject[T]:T = {
    val ois = new ObjectInputStream(getClass.getResource("/XY").openStream())
    try {
      val r = ois.readObject.asInstanceOf[T]
      r
    } finally {
      ois.close()
    }
  }
}
```

`FileUtils` encapsulates two additional methods, `saveOject` and `getObject[T]`, the former simply **save the object** passed in as parameter and store it in a file, the latter **returns the contents** of the file as an instance of type `T`. The reason to do this was because I needed to store the **extracted features** of the model in order to save computation time in future runs.

# Example of use

As an example, my `FileUtils` object can be used as follows (this snippet of code is from <a href="https://github.com/elbaulp/NLP_Dependency_Parsing/blob/dev/src/main/scala/com/elbauldelprogramador/nlp/parser/DependencyParser.scala#L161" target="_blank" title="DependencyParser.scala">DependencyParser.scala</a>):

```scala
(getClass.getResource("/XY") != null: @switch) match {
  case true => FileUtils.getObject[(Map[String, Vector[Vector[Int]]], Map[String, DblVector])]
  case false =>
    val result = eF(Map.empty[String, Vector[Vector[Int]]].withDefaultValue(Vector.empty[Vector[Int]]),
                   Map.empty[String, DblVector].withDefaultValue(Vector.empty[Double]),
                   sentences)
    FileUtils.saveOject(result)
    result
}
```

With `(getClass.getResource("/XY") != null: @switch) match` I am testing if the file already exists, if it does, I simply call `FileUtils.getObject` and pass in the type, saving the time to compute again the features for the model with the method `eF`. If the file was not present, I extract the features calling `eF` and then save them with `FileUtils.saveOject` for future use.

That's it, is there **another way you write/read** files in scala? Let me know in the comments!

# Resources

- <a href="http://stackoverflow.com/questions/4604237/how-to-write-to-a-file-in-scala/" target="_blank" title="How to write to a file in Scala?">How to write to a file in Scala?</a>
