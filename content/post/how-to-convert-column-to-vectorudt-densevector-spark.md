+++
tags = ["spark", "scala"]
categories = ["dev"]
image = "sparklogo.png"
date = "2017-02-06T17:04:46+01:00"
title = "Cómo convertir una columna a VectorUDT/DenseVector en Spark"
mainclass = "dev"
author = "alex"
description = "Intentando entrenar un modelo de regresión lineal en Spark obtenía el siguiente el error “`Column features must be of type org.apache.spark.ml.linalg.VectorUDT`”, Me costó bastante encontrar una solución, pero finalmente conseguí solucionarlo"
+++

Estoy iniciándome en el mundo de `spark`, ojeando su librería `MLlib` decidí implementar una simple <a href="https://spark.apache.org/docs/latest/ml-classification-regression.html#linear-regression" target="_blank" title="Regresión lineal">Regresión lineal</a>. Aunque el ejemplo de su documentación parece sencillo, cuando intentaba leer mi propio csv con datos obtenía el siguiente error:

> Column features must be of type org.apache.spark.ml.linalg.VectorUDT

Tras varias horas buscando sin encontrar ninguna solución, al fin conseguí convertir la columna `features` a `VectorUDT`, así es como lo hice:

# Convertir una columna a VectorUDT en Spark

Primero preparamos el entorno:

```scala
val spark = SparkSession.builder.
  master("local")
  .appName("spark session example")
  .getOrCreate()

val df = spark.read.format("csv").
  option("header", "true").
  load(this.getClass.getResource("/generated_data.csv").getPath)

df.printSchema()
```

<!--more--><!--ad-->

El código de arriba simplemente configura una sesión `Spark` y lee el fichero `generated_data.csv`. Por último muestra el `schema` de los datos, el cual es:

```scala
root
 |-- ind_var_a: string (nullable = true)
 |-- ind_var_b: string (nullable = true)
 |-- ind_var_c: string (nullable = true)
 |-- ind_var_d: string (nullable = true)
 |-- ind_var_e: string (nullable = true)
 |-- ind_var_f: string (nullable = true)
 |-- ind_var_g: string (nullable = true)
 |-- ind_var_h: string (nullable = true)
 |-- dependent_var: string (nullable = true)
```

Como puede verse, `dependent_var` es de tipo `String`, pero debería ser de tipo `VectorUDT`, para convertirla se debe usar `VectorAssembler`:

```scala
val schema = new StructType()
 .add("features", new VectorUDT())

val toDouble = udf[Double, String]( _.toDouble)
val df2 = df.withColumn("dependent_var", toDouble(df("dependent_var")))

val assembler = new VectorAssembler().
  setInputCols(Array("dependent_var")).
  setOutputCol("features")

val out = assembler.transform(df2)

df2.printSchema()
out.printSchema()
```

El código de arriba declara un `schema` para la columna que vamos a convertir, luego creamos una `udf` (_User Defined Function_) para convertir los valores de la columna de `String` a `Double`. Por último, se crea un `VectorAssembler` y se transforma el _dataset_ al nuevo esquema. Para comprobar que de hecho hemos convertido el tipo, se imprime el esquema del _dataset_ `out`:

```scala
root
 |-- ind_var_a: string (nullable = true)
 |-- ind_var_b: string (nullable = true)
 |-- ind_var_c: string (nullable = true)
 |-- ind_var_d: string (nullable = true)
 |-- ind_var_e: string (nullable = true)
 |-- ind_var_f: string (nullable = true)
 |-- ind_var_g: string (nullable = true)
 |-- ind_var_h: string (nullable = true)
 |-- dependent_var: double (nullable = true)
 |-- features: vector (nullable = true)
```

# Código completo

El código completo es el siguiente:

```scala
package elbauldelprogramador

import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.regression.LinearRegression
import org.apache.spark.mllib.linalg.VectorUDT
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.types.StructType

object SimpleApp {
  def main(args: Array[String]): Unit = {

    val spark = SparkSession.builder.
      master("local")
      .appName("spark session example")
      .getOrCreate()

    val df = spark.read.format("csv").
      option("header", "true").
      load(this.getClass.getResource("/generated_data.csv").getPath)

    df.printSchema()

    val schema = new StructType()
     .add("features", new VectorUDT())

    val toDouble = udf[Double, String]( _.toDouble)
    val df2 = df.withColumn("dependent_var", toDouble(df("dependent_var")))

    val assembler = new VectorAssembler().
      setInputCols(Array("dependent_var")).
      setOutputCol("features")

    val out = assembler.transform(df2)

    df2.printSchema()
    out.printSchema()

    val lr = new LinearRegression()
      .setMaxIter(10)
      .setRegParam(0.3)
      .setElasticNetParam(0.8)

    // Fit the model
    val lrModel = lr.fit(out)

    spark.close()
  }
}
```

# Conclusión

Estoy seguro de que existen formas mejores de lograr esta conversión, pero soy nuevo en `spark` y esta fue la única que conseguí hacer funcionar. Si sabes de alguna mejor, escríbela en los comentarios!

# Referencias

- VectorAssembler | <a href="http://spark.apache.org/docs/latest/ml-features.html#vectorassembler" target="_blank" title="VectorAssembler Documentation">spark.apache.org</a>
- El dataset es el sacado del libro <a href="http://amzn.to/2kFpfde" target="_blank" title="Test Driven Machine Learning">Test Driven Machine Learning</a>
