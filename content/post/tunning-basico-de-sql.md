---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-12-12'
lastmod: 2016-09-03
layout: post.amp
mainclass: BaseDeDatos
permalink: /tunning-basico-de-sql/
tags:
- que es tuning sql
title: "Tunning b\xE1sico de SQL"
---

Hemos llegado al fin del temario de base de datos, todo lo que he ido escribiendo a lo largo de estos meses lo encontrarás en la página de [Base de Datos][1]. El último tema de este curso va a tratar de __Tunning básico de SQL__.

## Tunning básico de SQL

Una de las tareas más importantes de las propias de un desarrollador de bases de datos es la de puesta a punto o tuning. Hay que tener en cuenta que las sentencias SQL pueden llegar a ser muy complejas y conforme el esquema de base de datos va creciendo las sentencias son más complejas y confusas. Por es difícil escribir la sentencia correcta a la primera.

<!--more--><!--ad-->

Por todo ello después de tener cada uno de los procesos escrito, hay que pasar por una etapa de tuning en la que se revisan todas las sentencias SQL para poder optimizarlas conforme a la experiencia adquirida.

Tanto por cantidad como por complejidad, la mayoría de las optimizaciones deben hacerse sobre sentencias `SELECT`, ya que son (por regla general) las responsables de la mayor pérdida de tiempos.

A continuación se dan unas normas básicas para escribir sentencias `SELECT` optimizadas.

- Las condiciones (tanto de filtro como de join) deben ir siempre en el orden en que esté definido el índice. Si no hubiese índice por las columnas utilizadas, se puede estudiar la posibilidad de añadirlo, ya que tener índices de más sólo penaliza los tiempos de inserción, actualización y borrado, pero no de consulta.
- Evitar la condiciones `IN ( SELECT...)` sustituyéndolas por `joins`.
- Colocar la tabla que devuelve menor número de registros en el último lugar del [FROM][2].
- Una consulta cualificada con la cláusula `DISTINTC` debe ser ordenada por el servidor aunque no se incluya la cláusula [`ORDER BY`][3].

 [1]: https://elbauldelprogramador.com/bases-de-datos/
 [2]: https://elbauldelprogramador.com/consulta-de-datos-clausula-from/
 [3]: https://elbauldelprogramador.com/consulta-de-datos-clausula-having-y/