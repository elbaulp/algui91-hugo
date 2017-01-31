---
author: alex
categories:
- dev
date: 2017-01-31
description: "Working on a Machine Learning Assignment in which I needed to implement Stochastic Gradient Descent (_SDG_) for logistic regresion I faced the folowing problem."
image: Como-Acceder-a-Una-Variable-Desde-Dentro-De-Una-Funcion-en-R.png
mainclass: dev
lastmod: 2017-01-31
tags:
- R
- Global variable in R
- Access function variable in R
- Machine Learning
- SDG
- Gradient Descent
title: "How to modify a variable inside a function in R"
---

Lets suppose the following `R` snippet:

```r
SGD <- function(...) {
  # Stochastic gradient descent
  #

  w <- matrix(rep(0,3))

  # ...

  update <- function(x) {
    # Here we need to modify w
  }

  while (above.tolerance) {
    w.old <- w
    apply(data, 1, update)
    # ...
  }
  w
}
```

The above code does not work, although `update` function can see the value of `w`, which is in `SDG` scope, can not modify its value, what `update` modifies its a local copy of `w` in its scope. For `SDG` to work, we need to update `w` for each point and that in `SDG` scope this new value is reflected.

For the code to work, at first I thought in declaring `w` as a global variable with `<<-` operator, which is a bad idea, because `w` would be global to the entire `R` program. In this case, we only that `w` can be modified by `update` function. So searching I found a workaround to create a local environment to the function `SDG`, and then use it inside `update`, here is the code:

```r
SGD <- function(...) {
  # Stochastic gradient descent
  #

  w.env <- new.env()
  w.env$w <- matrix(rep(0,3))

  # ...

  update <- function(x) {
    # Here we need to modify w
    # Using w.env$w
  }

  while (above.tolerance) {
    w.old <- w.env$w
    apply(data, 1, update)
    # ...
  }
  w.env$w
}
```

With this little change, `update` is accessing and modifying `w`, updating it correctly in each `apply` iteration.

Hope it helps.

# Bibliography

- Advanced environments in R | <a href="http://adv-r.had.co.nz/Environments.html" target="_blank" title="Advanced environments in R">adv-r.had.co.nz</a>
