+++
tags = ["scala"]
categories = ["dev"]
image = "scala_logo.png"
mainclass = "dev"
author = "alex"
description = "Scala por defecto no tiene una forma estándar de leer un fichero, a continuación muestro una posible solución."
date = "2017-05-16T10:25:24+02:00"
title = "Cómo escribir a un fichero en Scala"
+++

En mi último post hablé de [Cómo iterar múltiples colecciones en Scala](https://elbauldelprogramador.com/iterate-multiple-collections-scala/ "Iterar sobre varias colecciones en Scala"), uno de los muchos problemas que encontré desarrollando mi <a href="https://github.com/elbaulp/NLP_Dependency_Parsing" target="_blank" title="Parseo de dependencias en español">proyecto de fin de carrera.</a> Otro de los problemas que encontré fue al **escribir a un fichero** en **Scala**, la implementación estándar de Scala no tiene soporte para esta tarea, así que tuve que implementar mi propia manera de hacerlo.

# Primer enfoque

Como siempre, lo primero que hice fue buscar en *Stack Overflow* para saber cómo resolvía la gente este tipo de problema, <a href="http://stackoverflow.com/users/247533/rex-kerr" target="_blank" title="Rex kerr">Rex kerr</a> propone la siguiente implementación en la pregunta <a href="http://stackoverflow.com/questions/4604237/how-to-write-to-a-file-in-scala/4608061#4608061" target="_blank" title="How to write to a file in Scala?">How to write to a file in Scala?</a>:

```scala
def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit) {
  val p = new java.io.PrintWriter(f)
  try { op(p) } finally { p.close() }
}
```

y para usarlo:

```scala
import java.io._
val data = Array("Five","strings","in","a","file!")
printToFile(new File("example.txt")) { p =>
  data.foreach(p.println)
}
```

<!--more--><!--ad-->

# Mi enfoque

Basándome en la respuesta de *Rex kerr*, **modifiqué y adapté su código** y lo encapsulé en un `object` llamado `FileUtils`:

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

`FileUtils` encapsula dos métodos adicionales, `saveOject` y `getObject[T]`, el primero simplemente **guarda el objecto** que se le pasa como parámetro en un fichero, el último **devuelve el contenido** del fichero como una instancia de tipo `T`. La razón de estos dos métodos se debe a que necesitaba una forma de guardar las **características extraidas** por el modelo para ahorrar tiempo de cómputo en futuras ejecuciones del proyecto.

# Ejemplo de uso

A modo de ejemplo, mi objeto `FileUtils` se puede usar del siguiente modo (El código es del fichero <a href="https://github.com/elbaulp/NLP_Dependency_Parsing/blob/dev/src/main/scala/com/elbauldelprogramador/nlp/parser/DependencyParser.scala#L161" target="_blank" title="DependencyParser.scala">DependencyParser.scala</a>)

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

Con `(getClass.getResource("/XY") != null: @switch) match` compruebo si el fichero ya existe, de ser así, simplemente lo leo llamando a `FileUtils.getObject`, pasándole el tipo. De este modo ahorro tener que volver a llamar al método `eF`, encargado de extraer las características. Si el fichero no existe, extraigo las características con `eF` y luego las almaceno en un fichero llamando a `FileUtils.saveOject` para usos futuros.

Eso es todo, ¿conoces **algún otro modo de escribir/leer** ficheros en Scala?, deja un comentario!

# Recursos

- <a href="http://stackoverflow.com/questions/4604237/how-to-write-to-a-file-in-scala/" target="_blank" title="How to write to a file in Scala?">How to write to a file in Scala?</a>
