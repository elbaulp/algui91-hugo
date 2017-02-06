+++
tags = ["spark", "scala"]
categories = ["dev"]
image = "sparklogo.png"
date = "2017-02-06T17:04:46+01:00"
lastmod = "2017-02-06"
title = "How to convert a column to VectorUDT/DenseVector in Spark"
mainclass = "dev"
author = "alex"
description = "Trying to fit a Linear Regression model in Spark I kept getting the error “`Column features must be of type org.apache.spark.ml.linalg.VectorUDT`”, I struggled looking for a solution, but finally found the key. "
+++

I'm starting to use `spark` and was reading its documentation for its <a href="https://spark.apache.org/docs/latest/ml-classification-regression.html#linear-regression" target="_blank" title="MlLib linearRegression">`MLlib` library</a>. At first it seemed simple enough to use, but when reading a `csv` file with the training data I kept getting the below error:

> Column features must be of type org.apache.spark.ml.linalg.VectorUDT

After hours of searching how to convert my `features` column into `VectorUDT` I finally found the solution. Here is how I did it.

# Convert a column to VectorUDT in Spark

First, lets prepare the environment:

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

The code above just set up a `SparkSession` and loads the data from the file `generated_data.csv`. Last it prints the schema of that data, which is:

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

As it can be seen, `dependent_var`'s type is `String`, it must be `VectorUDT`. In order to convert it we must use `VectorAssembler`:

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

Above a `schema` for the column is defined, which would be of `VectorUDT` type, then a `udf` (User Defined Function) is created in order to convert its values from `String` to `Double`. Last, a `VectorAssembler` is created and the dataframe is transformed to the new `Scheme`. By printing the `schema` of `out` we see that the type now its the correct:

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

# Full code

The entire code is below:

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

# Other method

I've just discovered other way of achieving the same result:

```scala
val df = spark.read.format("csv").
  option("header", "true").
  option("inferSchema", "true").
  load(getClass.getResource("/generated_data.csv").getPath)
val df1 = df.select("dependent_var", "ind_var_d")
val formula = new RFormula().
  setFormula("dependent_var ~ ind_var_d").
  setFeaturesCol("features").
  setLabelCol("label")
val train = formula.fit(df1).transform(df1)
```

Now, `train` will have two additional columns, `features` and `label`, and `features`'s type would be `Vector`.


# End notes

I am sure there is a better and cleaner way of doing this, but as I am just a beginner with `spark` that did the trick for me. If you know a better solution, write it in the comments!

# References

- VectorAssembler | <a href="http://spark.apache.org/docs/latest/ml-features.html#vectorassembler" target="_blank" title="VectorAssembler Documentation">spark.apache.org</a>
- Training data is from the book <a href="http://amzn.to/2kKFAgi" target="_blank" title="Test Driven Machine Learning">Test Driven Machine Learning</a>
